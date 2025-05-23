import { connectToDB } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';
import { Teach, Course } from '@/app/lib/types';

export async function POST(req: Request) {
    const pool = await connectToDB();
    const conn = await pool.getConnection();
    try {
        const { id, name, duration, type, year, semester, teachers} = await req.json();
        console.log(`Received data: ${id}, ${name}, ${duration}, ${type}, ${teachers}`);
        const totalDuration=teachers.reduce((sum:number, teacher:Teach)=> sum +Number(teacher.time),0);
        console.log(`Total amount: ${totalDuration}`);
        if(duration!=totalDuration){
            return NextResponse.json({message:"总课时不匹配"},{status:400});
        }
        interface TeachResult extends RowDataPacket {
            name: string | null;
        }
        const teacherNames=(teachers as Teach[]).map(part=>part.name);
        const [names] = await conn.query<TeachResult[]>(
            `SELECT 姓名 AS name FROM teacher WHERE 姓名 IN (?)`,
            [teacherNames]
        );
        console.log(names[0])
        console.log(`Names: ${names.map(row => row.name).join(', ')}`);
        const existingNames = new Set(names.map(row => row.name));
        const missingNames = (teacherNames as string[]).filter(name => !existingNames.has(name));
        if (missingNames.length > 0) {
            console.log(`Missing teachers: ${missingNames.join(', ')}`);
            return NextResponse.json(
                { message: `The following teachers do not exist: ${missingNames.join(', ')}` },
                { status: 400 }
            );
        }
        // 数据库事务
        await conn.beginTransaction();
        await conn.query(
            'INSERT INTO course VALUES (?,?,?,?)',
            [id, name, duration, type]
        );
        (teachers as Teach[]).forEach(async (teacher,index) => {
            interface AuthorIdResult extends RowDataPacket {
                id: number | null;
            }
            const [authorIdRows] = await conn.query<AuthorIdResult[]>('SELECT 工号 AS id FROM teacher WHERE 姓名 = ?', teacher.name);
            const authorId = authorIdRows[0].id;
            conn.query('INSERT INTO teaching VALUES (?,?,?,?,?)',[authorId, id, year, semester, teacher.time])
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
        console.log(`删除请求 - 课程号: ${id}, 工号: ${teacher}`);
        // 2. 获取连接
        conn = await pool.getConnection();
        // 3. 开始事务
        await conn.beginTransaction();
        // 4. 执行删除前先检查记录是否存在
        interface res extends RowDataPacket{
            courseId: string;
            teacherId: string;
        }
        const [existing] = await conn.query<res[]>(
            'SELECT 课程号 AS courseId, 工号 AS teacherId FROM teaching WHERE 课程号 = ? AND 工号 = ? LIMIT 1',
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
        const deleteResult = await conn.query(
            'DELETE FROM teaching WHERE 课程号 = ? AND 工号 = ?',
            [id, teacher]
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