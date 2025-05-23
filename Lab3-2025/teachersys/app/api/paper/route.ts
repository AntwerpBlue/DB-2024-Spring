import { connectToDB } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

export async function POST(req: Request) {
    const pool = await connectToDB();
    const conn = await pool.getConnection();
    try {
        const { title, source, publishYear, type, level, authors, correspondingAuthorIndex } = await req.json();
        console.log(`Received paper data: ${title}, ${source}, ${publishYear}, ${type}, ${level}, ${authors}, ${correspondingAuthorIndex}`);
        interface AuthorResult extends RowDataPacket {
            name: string | null;
        }
        const [names] = await conn.query<AuthorResult[]>(
            `SELECT 姓名 AS name FROM teacher WHERE 姓名 IN (?)`,
            [authors]
        );
        console.log(names[0])
        console.log(`Names: ${names.map(row => row.name).join(', ')}`);
        const existingNames = new Set(names.map(row => row.name));
        const missingAuthors = (authors as string[]).filter(name => !existingNames.has(name));
        if (missingAuthors.length > 0) {
            console.log(`Missing authors: ${missingAuthors.join(', ')}`);
            return NextResponse.json(
                { message: `The following authors do not exist: ${missingAuthors.join(', ')}` },
                { status: 400 }
            );
        }
        // 数据库事务
        await conn.beginTransaction();
        interface MaxIdResult extends RowDataPacket {
            max_id: number | null;
        }
        const [rows] = await conn.query<MaxIdResult[]>('SELECT MAX(序号) as max_id FROM paper');
        const maxId = rows[0].max_id || 0;
        // 插入论文
        await conn.query(
        'INSERT INTO paper VALUES (?,?,?,?,?,?)',
        [String(maxId+1), title, source, publishYear, type, level]
        );
        (authors as String[]).forEach(async (author,index) => {
            interface AuthorIdResult extends RowDataPacket {
                id: number | null;
            }
            const [authorIdRows] = await conn.query<AuthorIdResult[]>('SELECT 工号 AS id FROM teacher WHERE 姓名 = ?', author);
            const authorId = authorIdRows[0].id;
            const corres=index===correspondingAuthorIndex?1:0;
            conn.query('INSERT INTO publishment VALUES (?,?,?,?)',[authorId, String(maxId+1), String(index+1), corres])
        })
        await conn.commit();
        return NextResponse.json({ success: true });
    } catch (error) {
        await conn?.rollback();
        return NextResponse.json(
        { error: 'Database Error' },
        { status: 500 }
        );
    }finally{
        if (conn) {
            try {
                conn.release();
            } catch (releaseError) {
                console.error('释放连接失败:', releaseError);
            }
        }
    }
}

export async function DELETE(req: Request) {
    const pool = await connectToDB();
    let conn;
    try {
        // 1. 参数验证与解析
        const { id, teacher } = await req.json();
        if (!id || !teacher) {
            return NextResponse.json(
                { success: false, error: '缺少必要参数: id 或 teacher' },
                { status: 400 }
            );
        }
        console.log(`删除请求 - 论文序号: ${id}, 工号: ${teacher}`);
        // 2. 获取连接
        conn = await pool.getConnection();
        // 3. 开始事务
        await conn.beginTransaction();
        // 4. 执行删除前先检查记录是否存在
        interface res extends RowDataPacket{
            paperId: string;
            teacherId: string;
        }
        const [existing] = await conn.query<res[]>(
            'SELECT 序号 AS paperId, 工号 AS teacherId FROM publishment WHERE 序号 = ? AND 工号 = ? LIMIT 1',
            [id, teacher]
        );
        if (existing.length === 0) {
            await conn.rollback();
            return NextResponse.json(
                { success: false, error: '未找到匹配的记录' },
                { status: 404 }
            );
        }
        // 5. 执行删除
        await conn.query(
            'DELETE FROM publishment WHERE 序号 = ?',
            [id]
        );
        await conn.query(
            'DELETE FROM paper WHERE 序号 = ?',
            [id]
        );
        // 6. 提交事务
        await conn.commit();
        return NextResponse.json({ 
            success: true
        });
    } catch (error) {
        // 7. 错误处理
        console.error('删除操作错误:', error);
        if (conn) {
            try {
                await conn.rollback();
            } catch (rollbackError) {
                console.error('回滚事务失败:', rollbackError);
            }
        }
        return NextResponse.json({ 
                success: false, 
                error: error instanceof Error ? error.message : '数据库操作失败'
            },
            { status: 500 }
        );
    } finally {
        // 8. 确保连接释放
        if (conn) {
            try {
                conn.release();
            } catch (releaseError) {
                console.error('释放连接失败:', releaseError);
            }
        }
    }
}