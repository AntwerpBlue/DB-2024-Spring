/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2024/6/21 10:07:13                           */
/*==============================================================*/


drop table if exists 主讲课程;

drop table if exists 发表论文;

drop table if exists 承担项目;

drop table if exists 教师;

drop table if exists 论文;

drop table if exists 课程;

drop table if exists 项目;

/*==============================================================*/
/* Table: 主讲课程                                                  */
/*==============================================================*/
create table 主讲课程
(
   工号                   char(5) not null,
   课程号                  char(128) not null,
   年份                   int,
   学期                   int,
   承担学时                 int,
   primary key (工号, 课程号)
);

/*==============================================================*/
/* Table: 发表论文                                                  */
/*==============================================================*/
create table 发表论文
(
   工号                   char(5) not null,
   序号                   int not null,
   论文排名                 int,
   是否通讯作者               bool,
   primary key (工号, 序号)
);

/*==============================================================*/
/* Table: 承担项目                                                  */
/*==============================================================*/
create table 承担项目
(
   工号                   char(5) not null,
   项目号                  char(128) not null,
   承担经费                 float,
   项目排名                 int,
   primary key (工号, 项目号)
);

/*==============================================================*/
/* Table: 教师                                                    */
/*==============================================================*/
create table 教师
(
   工号                   char(5) not null,
   姓名                   char(128),
   性别                   int,
   职称                   int,
   primary key (工号)
);

/*==============================================================*/
/* Table: 论文                                                    */
/*==============================================================*/
create table 论文
(
   序号                   int not null,
   论文名称                 char(128),
   发表源                  char(128),
   发表年份                 date,
   类型                   int,
   级别                   int,
   primary key (序号)
);

/*==============================================================*/
/* Table: 课程                                                    */
/*==============================================================*/
create table 课程
(
   课程号                  char(128) not null,
   课程名称                 char(128),
   学时数                  int,
   课程性质                 int,
   primary key (课程号)
);

/*==============================================================*/
/* Table: 项目                                                    */
/*==============================================================*/
create table 项目
(
   项目号                  char(128) not null,
   项目名称                 char(128),
   项目来源                 char(128),
   项目类型                 int,
   总经费                  float,
   开始年份                 int,
   结束年份                 int,
   primary key (项目号)
);

alter table 主讲课程 add constraint FK_主讲课程 foreign key (工号)
      references 教师 (工号) on delete restrict on update restrict;

alter table 主讲课程 add constraint FK_主讲课程2 foreign key (课程号)
      references 课程 (课程号) on delete restrict on update restrict;

alter table 发表论文 add constraint FK_发表论文 foreign key (工号)
      references 教师 (工号) on delete restrict on update restrict;

alter table 发表论文 add constraint FK_发表论文2 foreign key (序号)
      references 论文 (序号) on delete restrict on update restrict;

alter table 承担项目 add constraint FK_承担项目 foreign key (工号)
      references 教师 (工号) on delete restrict on update restrict;

alter table 承担项目 add constraint FK_承担项目2 foreign key (项目号)
      references 项目 (项目号) on delete restrict on update restrict;

