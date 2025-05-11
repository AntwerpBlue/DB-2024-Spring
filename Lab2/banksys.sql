/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2024/5/6 16:14:37                            */
/*==============================================================*/


drop table if exists Branch;

drop table if exists ���ÿ��˻�;

drop table if exists �����˻�;

drop table if exists �ͻ�;

drop table if exists ��ϵ��;

drop table if exists ����;

drop table if exists ����;

/*==============================================================*/
/* Table: Branch                                                */
/*==============================================================*/
create table Branch
(
   ֧������                 text not null,
   ����                   text,
   primary key (֧������)
);

/*==============================================================*/
/* Table: ���ÿ��˻�                                                 */
/*==============================================================*/
create table ���ÿ��˻�
(
   ֧������                 text,
   ����                   text,
   ���֤��                 text,
   ͸֧��                  float(8,2),
   �˻���                  text,
   �˻����                 text,
   ���                   float(8,2),
   ��������                 date,
   ����������               date
);

/*==============================================================*/
/* Table: �����˻�                                                  */
/*==============================================================*/
create table �����˻�
(
   ֧������                 text,
   ����                   text,
   ���֤��                 text,
   ����                   float,
   ��������                 text,
   �˻���                  text,
   �˻����                 text,
   ���                   float(8,2),
   ��������                 date,
   ����������               date
);

/*==============================================================*/
/* Table: �ͻ�                                                    */
/*==============================================================*/
create table �ͻ�
(
   ���֤��                 text not null,
   ��ͬ��                  text,
   ��ϵ��_���֤��             text,
   ����                   text,
   ��ϵ�绰                 numeric(11,0),
   primary key (���֤��)
);

/*==============================================================*/
/* Table: ��ϵ��                                                   */
/*==============================================================*/
create table ��ϵ��
(
   ���֤��                 text not null,
   ����                   text,
   �ֻ���                  numeric(11,0),
   Email                text,
   ��ͻ���ϵ                text,
   primary key (���֤��)
);

/*==============================================================*/
/* Table: ����                                                    */
/*==============================================================*/
create table ����
(
   ��ͬ��                  text not null,
   ����                   text,
   �ܶ�                   float(8,2),
   ��������                 date,
   ������                 float(8,2),
   primary key (��ͬ��)
);

/*==============================================================*/
/* Table: ����                                                    */
/*==============================================================*/
create table ����
(
   ��������                 text,
   ���ź�                  text not null,
   ֧������                 text,
   ���ž���                 text,
   primary key (���ź�)
);

alter table ���ÿ��˻� add constraint FK_����2 foreign key (֧������)
      references Branch (֧������) on delete restrict on update restrict;

alter table ���ÿ��˻� add constraint FK_ӵ���˻�2 foreign key (���֤��)
      references �ͻ� (���֤��) on delete restrict on update restrict;

alter table �����˻� add constraint FK_���� foreign key (֧������)
      references Branch (֧������) on delete restrict on update restrict;

alter table �����˻� add constraint FK_ӵ���˻� foreign key (���֤��)
      references �ͻ� (���֤��) on delete restrict on update restrict;

alter table �ͻ� add constraint FK_��� foreign key (��ͬ��)
      references ���� (��ͬ��) on delete restrict on update restrict;

alter table �ͻ� add constraint FK_�ͻ���ϵ�� foreign key (��ϵ��_���֤��)
      references ��ϵ�� (���֤��) on delete restrict on update restrict;

alter table ��ϵ�� add constraint FK_�ͻ���ϵ��2 foreign key (���֤��)
      references �ͻ� (���֤��) on delete restrict on update restrict;

alter table ���� add constraint FK_���� foreign key (֧������)
      references Branch (֧������) on delete restrict on update restrict;

