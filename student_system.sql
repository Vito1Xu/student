/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : student_system

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 18/05/2023 11:32:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banke
-- ----------------------------
DROP TABLE IF EXISTS `banke`;
CREATE TABLE `banke`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `teacherid` bigint NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC, `bname` ASC, `teacherid` ASC) USING BTREE,
  INDEX `id_2`(`id` ASC, `bname` ASC) USING BTREE,
  INDEX `fk_banke_teacher`(`teacherid` ASC) USING BTREE,
  CONSTRAINT `fk_banke_teacher` FOREIGN KEY (`teacherid`) REFERENCES `teacher` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banke
-- ----------------------------
INSERT INTO `banke` VALUES (1, '20', 100, 'https://tse2-mm.cn.bing.net/th/id/OIP-C.oiQ-W_5BGcSq0X4z7T_WcwHaJ4?w=148&h=197&c=7&r=0&o=5&dpr=2.5&pid=1.7');
INSERT INTO `banke` VALUES (2, '21大学计算机基础', 8, 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JCHc7Mb1GQkXdb4yB48AMQHaJ4?w=148&h=197&c=7&r=0&o=5&dpr=2.5&pid=1.7');
INSERT INTO `banke` VALUES (3, '19高等数学', 22, 'https://tse2-mm.cn.bing.net/th/id/OIP-C.KL05LPMjdYCio0HM85b1bgHaJ5?w=138&h=184&c=7&r=0&o=5&dpr=2.5&pid=1.7');
INSERT INTO `banke` VALUES (4, '22 UI设计入门一', 100, 'https://tse1-mm.cn.bing.net/th/id/OIP-C.6alv6MHJnVziuDDyuvQ_7QHaE6?https://tse2-mm.cn.bing.net/th/id/OIP-C.hDfFIAI7WZWik8Ls9MvhVgHaJ6?w=142&h=190&c=7&r=0&o=5&dpr=2.5&pid=1.7');
INSERT INTO `banke` VALUES (7, 'C程序设计', 100, 'https://tse2-mm.cn.bing.net/th/id/OIP-C.1WYt5szA0SwwVUr1uuEnRQAAAA?w=141&h=180&c=7&r=0&o=5&dpr=2.5&pid=1.7');
INSERT INTO `banke` VALUES (8, '基础有机化学', 100, 'https://tse1-mm.cn.bing.net/th/id/OIP-C.hZ1qGPAlQ9ZSALJxdFSVUwHaKU?w=128&h=180&c=7&r=0&o=5&dpr=2.5&pid=1.7');
INSERT INTO `banke` VALUES (9, '模电基础', 100, 'https://tse1-mm.cn.bing.net/th/id/OIP-C.ugtdc5o4I96878-tVpTfIQHaJ2?w=152&h=202&c=7&r=0&o=5&dpr=2.5&pid=1.7');
INSERT INTO `banke` VALUES (13, '大学日语', 100, 'https://tse4-mm.cn.bing.net/th/id/OIP-C.vVT7GRwOc5_PczvNu9A1pQHaKd?w=139&h=197&c=7&r=0&o=5&dpr=2.5&pid=1.7');
INSERT INTO `banke` VALUES (16, '18 数据结构', 100, 'https://img0.baidu.com/it/u=4286583474,3342802968&fm=253&fmt=auto&app=138&f=JPEG?w=333&h=500');
INSERT INTO `banke` VALUES (17, '18Vue.Js', 100, 'https://img0.baidu.com/it/u=2921584338,1929625476&fm=253&fmt=auto&app=138&f=JPEG?w=476&h=651');
INSERT INTO `banke` VALUES (21, '19信息安全', 15, NULL);
INSERT INTO `banke` VALUES (24, '22', 4, '');
INSERT INTO `banke` VALUES (25, '222', 100, '');

-- ----------------------------
-- Table structure for liaotian
-- ----------------------------
DROP TABLE IF EXISTS `liaotian`;
CREATE TABLE `liaotian`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sendid` bigint NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sendtime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bankeid` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_banke_chat`(`bankeid` ASC) USING BTREE,
  INDEX `fk_stu_chat`(`sendid` ASC) USING BTREE COMMENT '学生发送',
  CONSTRAINT `fk_banke_chat` FOREIGN KEY (`bankeid`) REFERENCES `banke` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_stu_chat` FOREIGN KEY (`sendid`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of liaotian
-- ----------------------------
INSERT INTO `liaotian` VALUES (60, NULL, '吴彦祖伤害', '2023/04/15 21:18:15', 24);
INSERT INTO `liaotian` VALUES (61, NULL, 'hello word', '2023/04/16 15:35:10', 1);
INSERT INTO `liaotian` VALUES (62, 2, '纳尼', '2023/04/16 15:35:17', 1);
INSERT INTO `liaotian` VALUES (63, 2, '我叫吴彦祖', '2023/04/16 15:38:56', 1);
INSERT INTO `liaotian` VALUES (64, 5, 'hi 吴彦祖 我叫伊利丹', '2023/04/16 15:38:56', 1);
INSERT INTO `liaotian` VALUES (65, NULL, '上课！ 上课！', '2023/04/16 15:39:10', 1);
INSERT INTO `liaotian` VALUES (66, 5, '好的', '2023/04/16 15:38:56', 1);
INSERT INTO `liaotian` VALUES (68, 2, 'gjhgjh ', '2023/05/06 20:14:30', 4);
INSERT INTO `liaotian` VALUES (69, NULL, 'dsfsdf', '2023/05/06 19:52:50', 4);
INSERT INTO `liaotian` VALUES (70, 5, '格式发给对方', '2023/05/06 20:14:30', 4);
INSERT INTO `liaotian` VALUES (71, 2, '43242', '2023/05/07 14:54:36', 4);

-- ----------------------------
-- Table structure for sb
-- ----------------------------
DROP TABLE IF EXISTS `sb`;
CREATE TABLE `sb`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `studentid` bigint NOT NULL,
  `bankeid` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_student_sb`(`studentid` ASC) USING BTREE,
  INDEX `fk_banke_sb`(`bankeid` ASC) USING BTREE,
  CONSTRAINT `fk_banke_sb` FOREIGN KEY (`bankeid`) REFERENCES `banke` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_student_sb` FOREIGN KEY (`studentid`) REFERENCES `student` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sb
-- ----------------------------
INSERT INTO `sb` VALUES (1, 2, 4);
INSERT INTO `sb` VALUES (2, 2, 2);
INSERT INTO `sb` VALUES (3, 3, 1);
INSERT INTO `sb` VALUES (4, 2, 3);
INSERT INTO `sb` VALUES (5, 1, 2);
INSERT INTO `sb` VALUES (6, 7, 1);
INSERT INTO `sb` VALUES (10, 1, 1);
INSERT INTO `sb` VALUES (14, 33, 7);
INSERT INTO `sb` VALUES (15, 6, 1);
INSERT INTO `sb` VALUES (16, 2, 8);
INSERT INTO `sb` VALUES (19, 2, 1);
INSERT INTO `sb` VALUES (21, 5, 1);
INSERT INTO `sb` VALUES (23, 8, 1);
INSERT INTO `sb` VALUES (24, 11, 1);
INSERT INTO `sb` VALUES (25, 19, 1);
INSERT INTO `sb` VALUES (26, 35, 1);
INSERT INTO `sb` VALUES (27, 36, 1);
INSERT INTO `sb` VALUES (28, 38, 1);
INSERT INTO `sb` VALUES (29, 25, 1);
INSERT INTO `sb` VALUES (30, 5, 7);
INSERT INTO `sb` VALUES (31, 9, 7);
INSERT INTO `sb` VALUES (32, 19, 2);
INSERT INTO `sb` VALUES (33, 19, 3);
INSERT INTO `sb` VALUES (35, 19, 13);
INSERT INTO `sb` VALUES (36, 22, 16);
INSERT INTO `sb` VALUES (38, 20, 7);
INSERT INTO `sb` VALUES (40, 4, 1);
INSERT INTO `sb` VALUES (41, 19, 4);
INSERT INTO `sb` VALUES (42, 1, 24);
INSERT INTO `sb` VALUES (43, 2, 24);
INSERT INTO `sb` VALUES (44, 21, 24);
INSERT INTO `sb` VALUES (45, 7, 1);
INSERT INTO `sb` VALUES (46, 15, 1);
INSERT INTO `sb` VALUES (47, 6, 4);
INSERT INTO `sb` VALUES (49, 24, 4);
INSERT INTO `sb` VALUES (50, 18, 1);
INSERT INTO `sb` VALUES (51, 34, 1);
INSERT INTO `sb` VALUES (52, 5, 17);
INSERT INTO `sb` VALUES (55, 5, 16);
INSERT INTO `sb` VALUES (56, 5, 13);
INSERT INTO `sb` VALUES (58, 5, 4);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `sname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `place` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC, `number` ASC, `sname` ASC, `place` ASC) USING BTREE,
  INDEX `id_2`(`id` ASC, `place` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, '101', '极寒幽魂', '123456', '21计算机1班', 'https://img1.baidu.com/it/u=2491966515,2418724295&fm=253&fmt=auto&app=138&f=JPEG?w=482&h=353');
INSERT INTO `student` VALUES (2, '102', '吴彦祖', '123456', '20纺服1班', 'https://tse3-mm.cn.bing.net/th/id/OIP-C.chuhHUbPtdkcdLN2X_s8NQEsDh?w=203&h=152&c=7&r=0&o=5&dpr=2.5&pid=1.7');
INSERT INTO `student` VALUES (3, '103', '蝙蝠骑士', '666666', '19国贸1班', 'https://img0.baidu.com/it/u=626809394,4279716207&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500');
INSERT INTO `student` VALUES (4, '104', '冰女', '666666', '18法学2班', 'https://img0.baidu.com/it/u=3308463198,1220766145&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=938');
INSERT INTO `student` VALUES (5, '105', '伊利丹', '666666', '20日语2班', 'https://img1.baidu.com/it/u=3159536774,4040382238&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=300');
INSERT INTO `student` VALUES (6, '106', '恐惧魔王', '666666', '21计算机1班', 'https://img0.baidu.com/it/u=2457648359,793684798&fm=253&fmt=auto&app=138&f=JPEG?https://img0.baidu.com/it/u=550295185,3813914865&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=392');
INSERT INTO `student` VALUES (7, '107', '影魔', '666666', '22土木工程3班', 'https://img0.baidu.com/it/u=2665988406,3777153056&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800');
INSERT INTO `student` VALUES (8, '108', '小鹿', '666666', '18英语1班', 'https://img2.baidu.com/it/u=4150571406,4021096005&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=866');
INSERT INTO `student` VALUES (9, '109', '白虎', '666666', '20软件工程1班', 'https://img0.baidu.com/it/u=3876112716,3590708178&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400');
INSERT INTO `student` VALUES (10, '110', '先知', '666666', '20软件工程1班', 'https://img0.baidu.com/it/u=256367190,3929199926&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500');
INSERT INTO `student` VALUES (11, '111', '蓝胖子', '666666', '21计算机1班', 'https://img2.baidu.com/it/u=609409869,3777935190&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=866');
INSERT INTO `student` VALUES (12, '112', '火女', '666666', '20软件工程1班', 'https://img2.baidu.com/it/u=4042325169,122395737&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=888');
INSERT INTO `student` VALUES (13, '113', '恶魔巫师', '666666', '22土木工程3班', 'https://img2.baidu.com/it/u=1928159689,616407545&fm=253&fmt=auto&app=138&f=JPEG?w=404&h=700');
INSERT INTO `student` VALUES (14, '114', '死灵法师', '666666', '21计算机1班', 'https://img1.baidu.com/it/u=2658571806,3935405251&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889');
INSERT INTO `student` VALUES (15, '115', '黑鸟', '666666', '18英语1班', 'https://img1.baidu.com/it/u=2956483719,2263707115&fm=253&fmt=auto&app=138&f=PNG?w=500&h=520');
INSERT INTO `student` VALUES (16, '116', '仙女龙', '666666', '19电子信息工程2班', 'https://img1.baidu.com/it/u=2202888198,1469785050&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=693');
INSERT INTO `student` VALUES (17, '117', '谜团', '666666', '18英语1班', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.gamersky.com%2Fimage2009b%2F12%2F20091201a_1%2F048.jpg&refer=http%3A%2F%2Fimg1.gamersky.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683733273&t=1cb9d18f6c92e4a55b564375e7299253');
INSERT INTO `student` VALUES (18, '118', '痛苦女王', '666666', '21计算机1班', 'https://img1.baidu.com/it/u=1920444965,1173489455&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500');
INSERT INTO `student` VALUES (19, '119', '火猫', '666666', '22土木工程3班', 'https://img1.baidu.com/it/u=3751804728,2532507233&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=866');
INSERT INTO `student` VALUES (20, '120', '双头龙', '666666', '20软件工程1班', 'https://img1.baidu.com/it/u=3365372047,2999465439&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500');
INSERT INTO `student` VALUES (21, '121', '沉默术士', '666666', '21计算机1班', 'https://img0.baidu.com/it/u=3148857755,594288214&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=938');
INSERT INTO `student` VALUES (22, '122', '小Y', '666666', '20软件工程1班', 'https://img1.baidu.com/it/u=2527700362,2252251841&fm=253&fmt=auto&app=138&f=JPEG?w=735&h=500');
INSERT INTO `student` VALUES (23, '123', '蓝猫', '666666', '19电子信息工程2班', 'https://img0.baidu.com/it/u=1801624984,4285489166&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500');
INSERT INTO `student` VALUES (24, '124', '骷髅王', '666666', '20软件工程1班', 'https://img1.baidu.com/it/u=763180415,3407842113&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=866');
INSERT INTO `student` VALUES (25, '125', '骷髅射手', '666666', '22信息安全2班', 'https://img2.baidu.com/it/u=1116520480,1758992199&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300');
INSERT INTO `student` VALUES (32, '465454', '美杜莎', '666666', '21计算机1班', 'https://img1.baidu.com/it/u=2587584545,1378178822&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=731');
INSERT INTO `student` VALUES (33, '45646546', '巫医', '666666', '22信息安全2班', 'https://img1.baidu.com/it/u=4056414875,2515978230&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=866');
INSERT INTO `student` VALUES (34, NULL, '小甜甜鸭', '666666', '19电子信息工程2班', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKlahv40V253cHOucRia2IGPqXh3ciaAtC35Z5UhdkzDfT8DI2vrmYdicW9ePmd8XdgE7eWaTeMh4XfQ/132');
INSERT INTO `student` VALUES (35, NULL, '风行者', '666666', '22信息安全2班', 'https://img2.baidu.com/it/u=827421759,15899665&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=686');
INSERT INTO `student` VALUES (36, NULL, '宙斯', '666666', '22信息安全2班', 'https://img2.baidu.com/it/u=2339261653,154418786&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=315');
INSERT INTO `student` VALUES (37, NULL, '矮子', '666666', '22信息安全2班', 'https://img1.baidu.com/it/u=2566192051,475216821&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=648');
INSERT INTO `student` VALUES (38, '1', '幽鬼', '666666', '22信息安全2班', 'https://img2.baidu.com/it/u=852627782,23151844&fm=253&fmt=auto&app=138&f=JPEG?w=355&h=500');
INSERT INTO `student` VALUES (39, '202', '敌法师', '123456', '20西班牙语', NULL);

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `tname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 102 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (2, '102', '李四', '666666', NULL);
INSERT INTO `teacher` VALUES (3, '103', '王五', '5666', NULL);
INSERT INTO `teacher` VALUES (4, '104', '马六', '2166', NULL);
INSERT INTO `teacher` VALUES (5, '105', '赵七', '6666', NULL);
INSERT INTO `teacher` VALUES (6, '106', '陈八', '4452543', NULL);
INSERT INTO `teacher` VALUES (7, '107', '朱九', '45254', NULL);
INSERT INTO `teacher` VALUES (8, '108', '小红', '5423', NULL);
INSERT INTO `teacher` VALUES (9, '109', '小强', '5423', NULL);
INSERT INTO `teacher` VALUES (10, '110', '大白', '175423524', NULL);
INSERT INTO `teacher` VALUES (11, '111', '小花', '2035243', NULL);
INSERT INTO `teacher` VALUES (12, '112', '小新', '74234', NULL);
INSERT INTO `teacher` VALUES (13, '113', '小黄', '1434234', NULL);
INSERT INTO `teacher` VALUES (14, '114', '张太难', '203243', NULL);
INSERT INTO `teacher` VALUES (15, '115', '张杰', '4032', NULL);
INSERT INTO `teacher` VALUES (16, '116', '谢娜', '40232', NULL);
INSERT INTO `teacher` VALUES (17, '117', '周杰伦', '4124324', NULL);
INSERT INTO `teacher` VALUES (19, '119', '陈翔', '3243243', NULL);
INSERT INTO `teacher` VALUES (20, '120', '王炸', '32243243', NULL);
INSERT INTO `teacher` VALUES (21, '121', '毛台', '45243243', NULL);
INSERT INTO `teacher` VALUES (22, '122', '冷萌', '2923243', NULL);
INSERT INTO `teacher` VALUES (23, '123', '灰太狼', '35232', NULL);
INSERT INTO `teacher` VALUES (24, '124', '蕉太狼', '1824324', NULL);
INSERT INTO `teacher` VALUES (25, '125', '红太狼', '35243243', NULL);
INSERT INTO `teacher` VALUES (27, '6', '6', '1', NULL);
INSERT INTO `teacher` VALUES (100, '21621121', '刘亦菲', '666666', 'https://tse3-mm.cn.bing.net/th/id/OIP-C.hhA4STblluH7mnyvGaMMCwHaLi?w=115&h=180&c=7&r=0&o=5&dpr=2.5&pid=1.7');
INSERT INTO `teacher` VALUES (102, '222', '霍建华', '666666', NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin', '202cb962ac59075b964b07152d234b70');
INSERT INTO `user` VALUES ('666666', 'f379eaf3c831b04de153469d1bec345e');
INSERT INTO `user` VALUES ('admin1', 'e10adc3949ba59abbe56e057f20f883e');

-- ----------------------------
-- Table structure for zuoyefabu
-- ----------------------------
DROP TABLE IF EXISTS `zuoyefabu`;
CREATE TABLE `zuoyefabu`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `zuoyeneirong` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fabudate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `bankeid` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_fabu_banke`(`bankeid` ASC) USING BTREE,
  CONSTRAINT `fk_fabu_banke` FOREIGN KEY (`bankeid`) REFERENCES `banke` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of zuoyefabu
-- ----------------------------
INSERT INTO `zuoyefabu` VALUES (19, '叙述一件自己亲身经历的、涉及运用道德修养或法律知识协调处理人际关系 (或恋爱关系.家庭关系、工作关系等)的成功事例，然后谈谈自己的感受和从中得到的有益启示。 (不少于1500字，本题记平时成绩: 70分)', '2023/04/11 20:57:36', 1);
INSERT INTO `zuoyefabu` VALUES (20, '二、、我学习《思想道德修养与法律基础》课的收获与体会，以及对本课程教学的若干看法和建议。 (不少于500字;本题记平时成绩: 30分) 三、制作题: 根据教材的内容，自选某一章中的某一节，将其制作成PPT课件，张数为15 - 20张。 (本题记期中成绩: 50分。要求: 完成后，', '2023/04/11 20:58:21', 1);
INSERT INTO `zuoyefabu` VALUES (21, '1.计算机中位、字节、字、字长的含义是什么?2.', '2023/04/11 21:04:01', 2);
INSERT INTO `zuoyefabu` VALUES (22, '微型计算机系统采用的是什么布局? 并简朴描述', '2023/04/11 21:04:11', 2);
INSERT INTO `zuoyefabu` VALUES (23, '1.确定下列各函数中哪些是偶函数，哪些是奇函数:l f(x)=a* +ax(a>0);2. f(x)=mnl-x1+x+x=-mx=-A()./(x)=n3.设f(x)= arccosx,g()= sinx,试求复合函数f(g(x)),g(f(x))的定义域和值域', '2023/04/11 21:08:05', 3);
INSERT INTO `zuoyefabu` VALUES (24, '三角形判断 输入三条边的长，输出这三条边是否构成等边三角形、等腰三角形、真角三角形、普通三角形，还是不能构成三角形 整数 a,b,c的值 等边三角形、等腰三角形、直角三角形、普通三角形，或不能构成三角形 556 等边三角形', '2023/04/11 21:12:03', 7);
INSERT INTO `zuoyefabu` VALUES (25, '[论述题] 请把短文翻译成中文: (1)最近の若者の仗、市小苏九办一龙上了亡才。新社の仁上为七、学校仁都若者加无七以石为L以飞寸。[日本人体老方苦为。] 上小方意加南的主才。(2)日本人体、外国的人办5、尹小不儿勤勉本国民上考无与礼七口为上了亡寸。[日本人吐?色事兰为。]七、离打', '2023/04/11 21:14:42', 13);
INSERT INTO `zuoyefabu` VALUES (28, '好的', '2023/04/12 18:39:22', 1);
INSERT INTO `zuoyefabu` VALUES (29, '或哈哈', '2023-07-17', 1);
INSERT INTO `zuoyefabu` VALUES (30, '大苏打撒旦', '2023/04/14 16:12:17', 1);
INSERT INTO `zuoyefabu` VALUES (31, '沙发沙发沙发分为氛围', '2023/05/06 20:42:32', 4);

-- ----------------------------
-- Table structure for zuoyetijiao
-- ----------------------------
DROP TABLE IF EXISTS `zuoyetijiao`;
CREATE TABLE `zuoyetijiao`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `daan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `grade` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fabuid` bigint NOT NULL,
  `studentid` bigint NOT NULL,
  `tijiaodate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_tijiao_fabu`(`fabuid` ASC) USING BTREE,
  INDEX `fk_tijiao_student`(`studentid` ASC) USING BTREE,
  CONSTRAINT `fk_tijiao_fabu` FOREIGN KEY (`fabuid`) REFERENCES `zuoyefabu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tijiao_student` FOREIGN KEY (`studentid`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 578 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of zuoyetijiao
-- ----------------------------
INSERT INTO `zuoyetijiao` VALUES (568, '答:采用的冯·诺依曼布局。采用二进制编码，把程序和数据存储在存储器中，确立了“存储程序”的思想，现在的计算机大片面都是以“存储程序”原理的为根基的冯·诺依曼型计算机。 运算器用于实现要求计算机完成的全体运算，包括算术、规律等各种运算;存储器用于存放需要计算机执行的命令和运算的各种', NULL, 22, 16, '2023/04/11 20:58:48');
INSERT INTO `zuoyetijiao` VALUES (569, '解:·f(-x)=a+a =f(x)..f(x)=a +a为偶函数2. f(x)=mnl-x1+x+x=-mx=-A()./(x)=n解:f(-x)=In为奇函数.+X3. f(x)= ln(x+ 1+x3) 解:·f(-x)=In-x+ I+x=I=-Ix+/I+x=-f(x)', NULL, 23, 20, '2023/04/11 20:58:48');
INSERT INTO `zuoyetijiao` VALUES (570, '#include <stdio.h>int main( ) { int a, b,c; scanf(\"%d%d%d\",&a,&b,&c);if(a==b&&b==c) printf(\"1\");else if(a+b>c&&a+c>b&&b+c>a)if(a==b b==ca==c', NULL, 24, 19, '2023/04/11 20:58:48');
INSERT INTO `zuoyetijiao` VALUES (571, '(1)最近，年轻人的职业观象是有了很大变化。据报社的调查，上专科学校的年轻人似乎有所增加。 有一种意见认为:”日本人劳动过度”。(2)日本人好象被外国人看作是十分勤劳的国民。也有”日本人劳动过度”的说法。但是最近年轻人的职业观似乎发生了很大的变化。每年，只要临近就业的季节，报社等', NULL, 25, 19, '2023/04/11 20:58:48');
INSERT INTO `zuoyetijiao` VALUES (574, '我这这里', '100', 19, 2, NULL);
INSERT INTO `zuoyetijiao` VALUES (575, '我在这里', NULL, 19, 5, '2023/04/13 15:17:45');
INSERT INTO `zuoyetijiao` VALUES (576, '会尽快还是自己开车打发士大夫就卡霍夫会计师大后方速度发货速度解放后是否会是活动方式的飞机喀什的回复可见撒谎反抗精神烦得很撒法和爱克发贺卡的活佛为哈佛违法和未婚夫欧文返回沃尔夫和配合反扒分红撒地方好法师发四点发hi分配回复排行反派和覅是粉红色发安抚', NULL, 19, 19, '2023/04/14 13:58:52');
INSERT INTO `zuoyetijiao` VALUES (577, '或者', NULL, 19, 19, '2023/04/14 13:59:43');
INSERT INTO `zuoyetijiao` VALUES (578, '331', NULL, 31, 2, '2023/05/07 14:54:36');

SET FOREIGN_KEY_CHECKS = 1;
