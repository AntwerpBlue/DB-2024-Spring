/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2024/6/21 10:07:13                           */
/*==============================================================*/


drop table if exists �����γ�;

drop table if exists ��������;

drop table if exists �е���Ŀ;

drop table if exists ��ʦ;

drop table if exists ����;

drop table if exists �γ�;

drop table if exists ��Ŀ;

/*==============================================================*/
/* Table: �����γ�                                                  */
/*==============================================================*/
create table �����γ�
(
   ����                   char(5) not null,
   �γ̺�                  char(128) not null,
   ���                   int,
   ѧ��                   int,
   �е�ѧʱ                 int,
   primary key (����, �γ̺�)
);

/*==============================================================*/
/* Table: ��������                                                  */
/*==============================================================*/
create table ��������
(
   ����                   char(5) not null,
   ���                   int not null,
   ��������                 int,
   �Ƿ�ͨѶ����               bool,
   primary key (����, ���)
);

/*==============================================================*/
/* Table: �е���Ŀ                                                  */
/*==============================================================*/
create table �е���Ŀ
(
   ����                   char(5) not null,
   ��Ŀ��                  char(128) not null,
   �е�����                 float,
   ��Ŀ����                 int,
   primary key (����, ��Ŀ��)
);

/*==============================================================*/
/* Table: ��ʦ                                                    */
/*==============================================================*/
create table ��ʦ
(
   ����                   char(5) not null,
   ����                   char(128),
   �Ա�                   int,
   ְ��                   int,
   primary key (����)
);

/*==============================================================*/
/* Table: ����                                                    */
/*==============================================================*/
create table ����
(
   ���                   int not null,
   ��������                 char(128),
   ����Դ                  char(128),
   �������                 date,
   ����                   int,
   ����                   int,
   primary key (���)
);

/*==============================================================*/
/* Table: �γ�                                                    */
/*==============================================================*/
create table �γ�
(
   �γ̺�                  char(128) not null,
   �γ�����                 char(128),
   ѧʱ��                  int,
   �γ�����                 int,
   primary key (�γ̺�)
);

/*==============================================================*/
/* Table: ��Ŀ                                                    */
/*==============================================================*/
create table ��Ŀ
(
   ��Ŀ��                  char(128) not null,
   ��Ŀ����                 char(128),
   ��Ŀ��Դ                 char(128),
   ��Ŀ����                 int,
   �ܾ���                  float,
   ��ʼ���                 int,
   �������                 int,
   primary key (��Ŀ��)
);

alter table �����γ� add constraint FK_�����γ� foreign key (����)
      references ��ʦ (����) on delete restrict on update restrict;

alter table �����γ� add constraint FK_�����γ�2 foreign key (�γ̺�)
      references �γ� (�γ̺�) on delete restrict on update restrict;

alter table �������� add constraint FK_�������� foreign key (����)
      references ��ʦ (����) on delete restrict on update restrict;

alter table �������� add constraint FK_��������2 foreign key (���)
      references ���� (���) on delete restrict on update restrict;

alter table �е���Ŀ add constraint FK_�е���Ŀ foreign key (����)
      references ��ʦ (����) on delete restrict on update restrict;

alter table �е���Ŀ add constraint FK_�е���Ŀ2 foreign key (��Ŀ��)
      references ��Ŀ (��Ŀ��) on delete restrict on update restrict;

