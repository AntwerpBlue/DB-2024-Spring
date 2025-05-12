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