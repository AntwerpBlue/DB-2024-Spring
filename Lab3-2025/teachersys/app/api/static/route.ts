import { connectToDB } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';
import { TeacherBasicInfo, ProjectInfo, PaperInfo, CourseInfo } from '@/app/lib/types';

export async function POST(req: Request) {
    const pool = await connectToDB();
    const conn = await pool.getConnection();
    try {
        const { teacherId, yearRange } = await req.json();
        const beginYear = yearRange[0];
        const endYear = yearRange[1];
        interface teacherResult extends RowDataPacket {
            name: string;
            gender: string;
            position: string;
        }
        conn.beginTransaction();
        const [res] = await conn.query<teacherResult[]>(
            `SELECT 姓名 AS name,性别 AS gender,职称 AS position FROM teacher WHERE 工号 = ?`,
            [teacherId]
        );
        if (res.length === 0) {
            return NextResponse.json({ success: false, message: '教师工号不存在'});
        }
        const teacherInfo: TeacherBasicInfo = {
            teacherId: teacherId,
            name: res[0].name,
            gender: Number(res[0].gender),
            position: Number(res[0].position),
        }
        //console.log(teacherInfo);

        interface courseResult extends RowDataPacket {
            courseId: string;
            courseName: string;
            courseType: number;
            year: string;
            semester: string;
            hours: string;
        }
        const [courseRes] = await conn.query<courseResult[]>(
            `SELECT 
                t.课程号 AS courseId, 
                c.课程名称 AS courseName, 
                t.年份 AS year, 
                t.学期 AS semester, 
                t.承担学时 AS hours,
                c.课程性质 AS courseType
            FROM teaching t
            INNER JOIN course c ON t.课程号 = c.课程号
            WHERE t.工号 = ?
              AND t.年份 BETWEEN ? AND ?
            ORDER BY t.年份 DESC, t.学期 ASC`,
            [teacherId, beginYear, endYear]
        );
        const courseInfo: CourseInfo[] = courseRes.map((row) => ({
            courseId: row.courseId,
            courseName: row.courseName,
            courseType: Number(row.courseType),
            year: row.year,
            semester: row.semester,
            hours: Number(row.hours),
        }));
        //console.log(courseInfo);

        interface projectResult extends RowDataPacket {
            projectId: string;
            projectName: string;
            projectSource: string;
            projectType: string;
            beginYear: string;
            endYear: string;
            totalFunding: string;
            funding: string;
        }
        const [projectRes] = await conn.query<projectResult[]>(
            `SELECT 
                p.项目号 AS projectId, 
                p.项目名称 AS projectName, 
                p.项目来源 AS projectSource, 
                p.项目类型 AS projectType, 
                p.开始年份 AS beginYear,
                p.结束年份 AS endYear,
                p.总经费 AS totalFunding,
                part.承担经费 AS funding
            FROM participation part
            INNER JOIN project p ON part.项目号 = p.项目号
            WHERE part.工号 = ?
              AND p.开始年份 >= ?
              AND p.结束年份 <= ?
            ORDER BY p.开始年份 DESC`,
            [teacherId, beginYear, endYear]
        );
        //console.log(projectRes);
        const projectInfo: ProjectInfo[] = projectRes.map((row) => ({
            projectId: row.projectId,
            projectName: row.projectName,
            projectSource: row.projectSource,
            projectType: row.projectType,
            dateRange: `${row.beginYear} - ${row.endYear}`,
            totalFunding: Number(row.totalFunding),
            funding: Number(row.funding),
        }))
        //console.log(projectInfo);
        interface paperResult extends RowDataPacket {
            paperTitle: string;
            paperId: string;
            journalName: string;
            publishYear: string;
            ranking: string;
            paperType: number;
            paperLevel: number;
            correspond: number;
        }
        const [paperRes] = await conn.query<paperResult[]>(
            `SELECT 
                p.论文名称 AS paperTitle,
                p.序号 AS paperId,
                p.发表源 AS journalName,
                p.发表年份 AS publishYear,
                pub.论文排名 AS ranking,
                p.类型 AS paperType,
                p.级别 AS paperLevel,
                pub.是否通讯作者 AS correspond
            FROM publishment pub
            INNER JOIN paper p ON pub.序号 = p.序号
            WHERE pub.工号 = ?
              AND p.发表年份 BETWEEN ? AND ?
            ORDER BY p.发表年份 DESC, pub.论文排名 ASC`,
            [teacherId, beginYear, endYear]
        );
        //console.log(paperRes);
        const paperInfo: PaperInfo[] = paperRes.map((row) => ({
            paperId: row.paperId,
            paperTitle: row.paperTitle,
            journalName: row.journalName,
            publishYear: row.publishYear,
            rank: row.ranking,
            paperType: row.paperType,
            paperLevel: row.paperLevel,
            correspond: row.correspond===1,
        }))
        conn.commit();
        return NextResponse.json({ success: true, teacherInfo: teacherInfo, projectInfo: projectInfo, paperInfo: paperInfo, courseInfo: courseInfo });
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