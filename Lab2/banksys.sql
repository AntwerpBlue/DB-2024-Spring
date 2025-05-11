/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2024/5/6 16:14:37                            */
/*==============================================================*/


drop table if exists Branch;

drop table if exists 信用卡账户;

drop table if exists 储蓄账户;

drop table if exists 客户;

drop table if exists 联系人;

drop table if exists 贷款;

drop table if exists 部门;

/*==============================================================*/
/* Table: Branch                                                */
/*==============================================================*/
create table Branch
(
   支行名称                 text not null,
   城市                   text,
   primary key (支行名称)
);

/*==============================================================*/
/* Table: 信用卡账户                                                 */
/*==============================================================*/
create table 信用卡账户
(
   支行名称                 text,
   工号                   text,
   身份证号                 text,
   透支额                  float(8,2),
   账户号                  text,
   账户类别                 text,
   余额                   float(8,2),
   开户日期                 date,
   最后访问日期               date
);

/*==============================================================*/
/* Table: 储蓄账户                                                  */
/*==============================================================*/
create table 储蓄账户
(
   支行名称                 text,
   工号                   text,
   身份证号                 text,
   利率                   float,
   货币类型                 text,
   账户号                  text,
   账户类别                 text,
   余额                   float(8,2),
   开户日期                 date,
   最后访问日期               date
);

/*==============================================================*/
/* Table: 客户                                                    */
/*==============================================================*/
create table 客户
(
   身份证号                 text not null,
   合同号                  text,
   联系人_身份证号             text,
   姓名                   text,
   联系电话                 numeric(11,0),
   primary key (身份证号)
);

/*==============================================================*/
/* Table: 联系人                                                   */
/*==============================================================*/
create table 联系人
(
   身份证号                 text not null,
   姓名                   text,
   手机号                  numeric(11,0),
   Email                text,
   与客户关系                text,
   primary key (身份证号)
);

/*==============================================================*/
/* Table: 贷款                                                    */
/*==============================================================*/
create table 贷款
(
   合同号                  text not null,
   工号                   text,
   总额                   float(8,2),
   拨款日期                 date,
   拨款金额                 float(8,2),
   primary key (合同号)
);

/*==============================================================*/
/* Table: 部门                                                    */
/*==============================================================*/
create table 部门
(
   部门名称                 text,
   部门号                  text not null,
   支行名称                 text,
   部门经理                 text,
   primary key (部门号)
);

alter table 信用卡账户 add constraint FK_开户2 foreign key (支行名称)
      references Branch (支行名称) on delete restrict on update restrict;

alter table 信用卡账户 add constraint FK_拥有账户2 foreign key (身份证号)
      references 客户 (身份证号) on delete restrict on update restrict;

alter table 储蓄账户 add constraint FK_开户 foreign key (支行名称)
      references Branch (支行名称) on delete restrict on update restrict;

alter table 储蓄账户 add constraint FK_拥有账户 foreign key (身份证号)
      references 客户 (身份证号) on delete restrict on update restrict;

alter table 客户 add constraint FK_借贷 foreign key (合同号)
      references 贷款 (合同号) on delete restrict on update restrict;

alter table 客户 add constraint FK_客户联系人 foreign key (联系人_身份证号)
      references 联系人 (身份证号) on delete restrict on update restrict;

alter table 联系人 add constraint FK_客户联系人2 foreign key (身份证号)
      references 客户 (身份证号) on delete restrict on update restrict;

alter table 部门 add constraint FK_下属 foreign key (支行名称)
      references Branch (支行名称) on delete restrict on update restrict;

