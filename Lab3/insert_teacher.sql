use teachersys;

insert into 教师 values('001','张',1,6);
insert into 教师 values('002','王',2,4);
insert into 教师 values('003','李',1,5);
insert into 教师 values('004','赵',1,3);
insert into 教师 values('005','刘',2,7);
insert into 教师 values('006','周',1,11);
insert into 教师 values('007','吴',2,8);
insert into 教师 values('008','郑',2,6);

insert into 课程 values('M1001','M1',80,1);
insert into 课程 values('M1002','M2',80,1);
insert into 课程 values('M1003','M3',60,1);
insert into 课程 values('CS1001','CS1',80,1);
insert into 课程 values('CS1002','CS2',40,1);
insert into 课程 values('M2001','MM1',80,2);
insert into 课程 values('EE2001','EM1',80,2);
insert into 课程 values('CS2001','CSM1',80,2);

insert into 项目 values('P1001','P1','CAS',5,1000,2000,2002);
insert into 项目 values('P1002','P2','CAS',2,2000,2004,2006);
insert into 项目 values('P1003','P3','USTC',3,100,2003,2004);
insert into 项目 values('P1004','P4','USTC',1,300,2010,2015);
insert into 项目 values('P1005','P5','CAS',5,1200,2018,2021);
insert into 项目 values('P1006','P6','UCAS',3,100,2001,2002);
insert into 项目 values('P1007','P7','NSFC',4,500,2007,2009);
insert into 项目 values('P1008','P8','NSFC',5,600,2014,2018);
insert into 项目 values('P1001','P1','CAS',1,300,2018,2023);


COMMIT;