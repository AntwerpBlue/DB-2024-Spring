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
    }
}