import { connectToDB } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';
import { TeacherBasicInfo, ProjectInfo, PaperInfo, CourseInfo } from '@/app/lib/types';

interface Response{
    success: boolean;
    teacherInfo?: TeacherBasicInfo;
    projectInfo?: ProjectInfo[];
    paperInfo?: PaperInfo[];
    courseInfo?: CourseInfo[];
}

export async function POST(req: Request) {
    const pool = await connectToDB();
    const conn = await pool.getConnection();
    try {
        const { teacherId, yearRange } = await req.json();
        const {beginYear, endYear} = yearRange;

        interface reqResult extends RowDataPacket {
            name: string;
            gender: string;
            position: string;
        }
        conn.beginTransaction();
        const [res] = await conn.query<reqResult[]>(
            `SELECT 姓名 AS name,性别 AS gender,职称 AS position FROM teacher WHERE 工号 = ?`,
            [teacherId]
        );
        if (res.length === 0) {
            return NextResponse.json({ success: false });
        }
        const teacherInfo: TeacherBasicInfo = {
            teacherId: teacherId,
            name: res[0].name,
            gender: res[0].gender,
            position: res[0].position,
        }

        const [projectRes] = await conn.query<RowDataPacket[]>(
            `SELECT 课程号 AS courseId, 课程名称 AS courseName, 年份 AS year, 学期 AS semester, 承担学时 AS hours FROM teaching, course WHERE 工号 = ?`,
            [teacherId]
        );

        conn.commit();
        return NextResponse.json({ success: true, teacherInfo });
    } catch (error) {
        await conn?.rollback();
        return NextResponse.json(
        { error: 'Database Error' },
        { status: 500 }
        );
    }
}