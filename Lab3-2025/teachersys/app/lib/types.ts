import {Dayjs} from 'dayjs';

export interface Author {
    name: string;
    isCorresponding: boolean; // 是否通讯作者
}
export interface Paper {
    title: string;
    source: string;
    publishYear: Dayjs;
    type: string;
    level: string;
    authors: Author[];
    correspondingAuthorIndex: number;
}
export interface Part {
    name: string;
    amount: number;
}
export interface Project{
    id: string;
    name: string;
    source: string;
    type: string;
    totalFunding: number;
    startYear: Dayjs;
    endYear: Dayjs;
    participants: Part[];
}
export interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
}
export interface Teach{
    name: string;
    time: number;
}
export interface Course{
    id: string;
    name: string;
    type: string;
    duration: number;
    teachers: Teach[];
    year: number;
    semester: number;
}

export interface TeacherBasicInfo {
  teacherId: string;
  name: string;
  gender: number;
  position: number;
}

export interface CourseInfo {
  courseId: string;
  courseName: string;
  courseType: number;
  year: string;
  semester: string;
  hours: number;
}

export interface PaperInfo {
  paperId: string;
  paperTitle: string;
  journalName: string;
  publishYear: string;
  rank: string;
  paperType: number;
  paperLevel: number;
  correspond: boolean;
}

export interface ProjectInfo {
  projectId: string;
  projectName: string;
  projectType: string;
  projectSource: string;
  dateRange: string;
  totalFunding: number;
  funding: number;
}

export interface staticResponse{
    success: boolean;
    teacherInfo?: TeacherBasicInfo;
    projectInfo?: ProjectInfo[];
    paperInfo?: PaperInfo[];
    courseInfo?: CourseInfo[];
}