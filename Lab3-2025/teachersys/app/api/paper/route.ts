import { connectToDB } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';

export async function POST(req: Request) {
    const pool = await connectToDB();
    const conn = await pool.getConnection();
    try {
        const { title, source, publishYear, type, level, authors, correspondingAuthorIndex } = await req.json();
        console.log(`Received paper data: ${title}, ${source}, ${publishYear}, ${type}, ${level}, ${authors}, ${correspondingAuthorIndex}`);
        const placeholders = authors.map(() => '?').join(',');
        interface AuthorResult extends RowDataPacket {
            name: string | null;
        }
        console.log(`Placeholders: ${placeholders}`);
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
    }
}