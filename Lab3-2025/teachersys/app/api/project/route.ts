import { connectToDB } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';
import { Part, Project } from '@/app/lib/types';

export async function POST(req: Request) {
    const pool = await connectToDB();
    const conn = await pool.getConnection();
    try {
        const { id, name, source, startYear, endYear, totalFunding, participants, type } = await req.json();
        console.log(`Received paper data: ${{ id, name, source, startYear, endYear, totalFunding, participants, type }}`);
        const totalamount=participants.reduce((sum:number, part:Part)=> sum + part.amount,0);
        if(totalamount!==totalFunding){
            return NextResponse.json({message:"经费金额不匹配"},{status:400});
        }
        interface PartsResult extends RowDataPacket {
            name: string | null;
        }
        const parts=(participants as Part[]).map(part=>part.name);
        const [names] = await conn.query<PartsResult[]>(
            `SELECT 姓名 AS name FROM teacher WHERE 姓名 IN (?)`,
            [parts]
        );
        console.log(names[0])
        console.log(`Names: ${names.map(row => row.name).join(', ')}`);
        const existingNames = new Set(names.map(row => row.name));
        const missingNames = (parts as string[]).filter(name => !existingNames.has(name));
        if (missingNames.length > 0) {
            console.log(`Missing participants: ${missingNames.join(', ')}`);
            return NextResponse.json(
                { message: `The following participants do not exist: ${missingNames.join(', ')}` },
                { status: 400 }
            );
        }
        // 数据库事务
        await conn.beginTransaction();
        await conn.query(
            'INSERT INTO project VALUES (?,?,?,?,?,?,?)',
            [id, name, source, type, totalFunding, startYear, endYear]
        );
        (participants as Part[]).forEach(async (part,index) => {
            interface AuthorIdResult extends RowDataPacket {
                id: number | null;
            }
            const [authorIdRows] = await conn.query<AuthorIdResult[]>('SELECT 工号 AS id FROM teacher WHERE 姓名 = ?', part.name);
            const authorId = authorIdRows[0].id;
            conn.query('INSERT INTO participation VALUES (?,?,?,?)',[authorId, id, part.amount, index+1])
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