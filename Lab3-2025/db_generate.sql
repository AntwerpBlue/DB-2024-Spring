/*
 Navicat Premium Dump SQL

 Source Server         : myconn
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : teachersys

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 12/05/2025 12:41:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `课程号` char(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `课程名称` char(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `学时数` int NULL DEFAULT NULL,
  `课程性质` int NULL DEFAULT NULL,
  PRIMARY KEY (`课程号`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('CS1001', 'CS1', 80, 1);
INSERT INTO `course` VALUES ('CS1002', 'CS2', 40, 1);
INSERT INTO `course` VALUES ('CS2001', 'CSM1', 80, 2);
INSERT INTO `course` VALUES ('EE2001', 'EM1', 80, 2);
INSERT INTO `course` VALUES ('M1001', 'M1', 80, 1);
INSERT INTO `course` VALUES ('M1002', 'M2', 80, 1);
INSERT INTO `course` VALUES ('M1003', 'M3', 60, 1);
INSERT INTO `course` VALUES ('M2001', 'MM1', 80, 2);

-- ----------------------------
-- Table structure for paper
-- ----------------------------
DROP TABLE IF EXISTS `paper`;
CREATE TABLE `paper`  (
  `序号` int NOT NULL,
  `论文名称` char(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `发表源` char(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `发表年份` date NULL DEFAULT NULL,
  `类型` int NULL DEFAULT NULL,
  `级别` int NULL DEFAULT NULL,
  PRIMARY KEY (`序号`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of paper
-- ----------------------------
INSERT INTO `paper` VALUES (1, 'paper1', 'source1', '2002-01-01', 1, 1);
INSERT INTO `paper` VALUES (2, 'paper2', 'source2', '2020-02-01', 1, 2);
INSERT INTO `paper` VALUES (3, 'paper3', 'source3', '2020-03-01', 3, 1);
INSERT INTO `paper` VALUES (4, 'paper4', 'source4', '2021-03-01', 3, 3);
INSERT INTO `paper` VALUES (5, 'paper5', 'source5', '2020-03-01', 1, 3);
INSERT INTO `paper` VALUES (6, 'paper6', 's1', '2020-01-01', 1, 1);

-- ----------------------------
-- Table structure for participation
-- ----------------------------
DROP TABLE IF EXISTS `participation`;
CREATE TABLE `participation`  (
  `工号` char(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `项目号` char(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `承担经费` float NULL DEFAULT NULL,
  `项目排名` int NULL DEFAULT NULL,
  PRIMARY KEY (`工号`, `项目号`) USING BTREE,
  INDEX `FK_承担项目2`(`项目号` ASC) USING BTREE,
  CONSTRAINT `FK_承担项目` FOREIGN KEY (`工号`) REFERENCES `teacher` (`工号`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_承担项目2` FOREIGN KEY (`项目号`) REFERENCES `project` (`项目号`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of participation
-- ----------------------------
INSERT INTO `participation` VALUES ('001', 'P1001', 500, 1);
INSERT INTO `participation` VALUES ('001', 'P1002', 1200, 1);
INSERT INTO `participation` VALUES ('002', 'P1001', 500, 2);
INSERT INTO `participation` VALUES ('002', 'P1002', 100, 4);
INSERT INTO `participation` VALUES ('002', 'P1004', 200, 1);
INSERT INTO `participation` VALUES ('003', 'P1001', 10, 3);
INSERT INTO `participation` VALUES ('003', 'P1002', 100, 3);
INSERT INTO `participation` VALUES ('003', 'P1004', 100, 1);
INSERT INTO `participation` VALUES ('005', 'P1002', 600, 2);

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `项目号` char(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `项目名称` char(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `项目来源` char(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `项目类型` int NULL DEFAULT NULL,
  `总经费` float NULL DEFAULT NULL,
  `开始年份` int NULL DEFAULT NULL,
  `结束年份` int NULL DEFAULT NULL,
  PRIMARY KEY (`项目号`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('P1001', 'P1', 'CAS', 5, 1000, 2000, 2002);
INSERT INTO `project` VALUES ('P1002', 'P2', 'CAS', 2, 2000, 2004, 2006);
INSERT INTO `project` VALUES ('P1003', 'P3', 'USTC', 3, 100, 2003, 2004);
INSERT INTO `project` VALUES ('P1004', 'P4', 'USTC', 1, 300, 2010, 2015);
INSERT INTO `project` VALUES ('P1005', 'P5', 'CAS', 5, 1200, 2018, 2021);
INSERT INTO `project` VALUES ('P1006', 'P6', 'UCAS', 3, 100, 2001, 2002);
INSERT INTO `project` VALUES ('P1007', 'P7', 'NSFC', 4, 500, 2007, 2009);
INSERT INTO `project` VALUES ('P1008', 'P8', 'NSFC', 5, 600, 2014, 2018);

-- ----------------------------
-- Table structure for publishment
-- ----------------------------
DROP TABLE IF EXISTS `publishment`;
CREATE TABLE `publishment`  (
  `工号` char(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `序号` int NOT NULL,
  `论文排名` int NULL DEFAULT NULL,
  `是否通讯作者` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`工号`, `序号`) USING BTREE,
  INDEX `FK_发表论文2`(`序号` ASC) USING BTREE,
  CONSTRAINT `FK_发表论文` FOREIGN KEY (`工号`) REFERENCES `teacher` (`工号`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_发表论文2` FOREIGN KEY (`序号`) REFERENCES `paper` (`序号`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of publishment
-- ----------------------------
INSERT INTO `publishment` VALUES ('001', 1, 1, 1);
INSERT INTO `publishment` VALUES ('001', 2, 1, 0);
INSERT INTO `publishment` VALUES ('001', 3, 1, 0);
INSERT INTO `publishment` VALUES ('001', 4, 1, 1);
INSERT INTO `publishment` VALUES ('001', 5, 1, 1);
INSERT INTO `publishment` VALUES ('001', 6, 1, 1);
INSERT INTO `publishment` VALUES ('002', 1, 2, 0);
INSERT INTO `publishment` VALUES ('002', 2, 2, 1);
INSERT INTO `publishment` VALUES ('002', 3, 2, 1);
INSERT INTO `publishment` VALUES ('002', 4, 2, 0);
INSERT INTO `publishment` VALUES ('002', 5, 2, 0);
INSERT INTO `publishment` VALUES ('002', 6, 2, 0);
INSERT INTO `publishment` VALUES ('003', 2, 3, 0);
INSERT INTO `publishment` VALUES ('003', 6, 3, 0);
INSERT INTO `publishment` VALUES ('004', 3, 3, 0);
INSERT INTO `publishment` VALUES ('004', 4, 3, 0);

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `工号` char(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `姓名` char(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `性别` int NULL DEFAULT NULL,
  `职称` int NULL DEFAULT NULL,
  PRIMARY KEY (`工号`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('001', '张', 1, 6);
INSERT INTO `teacher` VALUES ('002', '王', 2, 4);
INSERT INTO `teacher` VALUES ('003', '李', 1, 5);
INSERT INTO `teacher` VALUES ('004', '赵', 1, 3);
INSERT INTO `teacher` VALUES ('005', '刘', 2, 7);
INSERT INTO `teacher` VALUES ('006', '周', 1, 11);
INSERT INTO `teacher` VALUES ('007', '吴', 2, 8);
INSERT INTO `teacher` VALUES ('008', '郑', 2, 6);

-- ----------------------------
-- Table structure for teaching
-- ----------------------------
DROP TABLE IF EXISTS `teaching`;
CREATE TABLE `teaching`  (
  `工号` char(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `课程号` char(128) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `年份` int NULL DEFAULT NULL,
  `学期` int NULL DEFAULT NULL,
  `承担学时` int NULL DEFAULT NULL,
  PRIMARY KEY (`工号`, `课程号`) USING BTREE,
  INDEX `FK_主讲课程2`(`课程号` ASC) USING BTREE,
  CONSTRAINT `FK_主讲课程` FOREIGN KEY (`工号`) REFERENCES `teacher` (`工号`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_主讲课程2` FOREIGN KEY (`课程号`) REFERENCES `course` (`课程号`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of teaching
-- ----------------------------
INSERT INTO `teaching` VALUES ('001', 'CS1001', 2023, 1, 80);
INSERT INTO `teaching` VALUES ('001', 'CS1002', 2021, 2, 20);
INSERT INTO `teaching` VALUES ('001', 'M2001', 2020, 2, 90);
INSERT INTO `teaching` VALUES ('002', 'CS1002', 2021, 2, 20);
INSERT INTO `teaching` VALUES ('002', 'M1001', 2021, 2, 40);
INSERT INTO `teaching` VALUES ('002', 'M1002', 2022, 1, 40);
INSERT INTO `teaching` VALUES ('002', 'M2001', 2020, 2, 10);
INSERT INTO `teaching` VALUES ('003', 'EE2001', 2022, 2, 50);
INSERT INTO `teaching` VALUES ('004', 'M1001', 2021, 2, 40);

SET FOREIGN_KEY_CHECKS = 1;
