# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'c:\Users\lenovo\Desktop\computer_file\database\Lab3\untitled.ui'
#
# Created by: PyQt5 UI code generator 5.15.9
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(800, 600)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.tabWidget = QtWidgets.QTabWidget(self.centralwidget)
        self.tabWidget.setGeometry(QtCore.QRect(10, 10, 801, 541))
        self.tabWidget.setObjectName("tabWidget")
        self.tab = QtWidgets.QWidget()
        self.tab.setObjectName("tab")
        self.label = QtWidgets.QLabel(self.tab)
        self.label.setGeometry(QtCore.QRect(40, 20, 54, 12))
        self.label.setObjectName("label")
        self.lineEdit_paper_name = QtWidgets.QLineEdit(self.tab)
        self.lineEdit_paper_name.setGeometry(QtCore.QRect(100, 20, 291, 20))
        self.lineEdit_paper_name.setObjectName("lineEdit_paper_name")
        self.label_2 = QtWidgets.QLabel(self.tab)
        self.label_2.setGeometry(QtCore.QRect(40, 50, 54, 12))
        self.label_2.setObjectName("label_2")
        self.label_3 = QtWidgets.QLabel(self.tab)
        self.label_3.setGeometry(QtCore.QRect(40, 110, 54, 12))
        self.label_3.setObjectName("label_3")
        self.lineEdit_paper_source = QtWidgets.QLineEdit(self.tab)
        self.lineEdit_paper_source.setGeometry(QtCore.QRect(100, 50, 291, 20))
        self.lineEdit_paper_source.setObjectName("lineEdit_paper_source")
        self.lineEdit_contact_author = QtWidgets.QLineEdit(self.tab)
        self.lineEdit_contact_author.setGeometry(QtCore.QRect(100, 110, 91, 20))
        self.lineEdit_contact_author.setObjectName("lineEdit_contact_author")
        self.label_4 = QtWidgets.QLabel(self.tab)
        self.label_4.setGeometry(QtCore.QRect(40, 140, 54, 12))
        self.label_4.setObjectName("label_4")
        self.lineEdit_author = QtWidgets.QLineEdit(self.tab)
        self.lineEdit_author.setGeometry(QtCore.QRect(100, 140, 91, 20))
        self.lineEdit_author.setObjectName("lineEdit_author")
        self.label_6 = QtWidgets.QLabel(self.tab)
        self.label_6.setGeometry(QtCore.QRect(40, 170, 54, 12))
        self.label_6.setObjectName("label_6")
        self.lineEdit_pub_year = QtWidgets.QLineEdit(self.tab)
        self.lineEdit_pub_year.setGeometry(QtCore.QRect(100, 170, 91, 20))
        self.lineEdit_pub_year.setObjectName("lineEdit_pub_year")
        self.label_7 = QtWidgets.QLabel(self.tab)
        self.label_7.setGeometry(QtCore.QRect(40, 200, 54, 12))
        self.label_7.setObjectName("label_7")
        self.label_8 = QtWidgets.QLabel(self.tab)
        self.label_8.setGeometry(QtCore.QRect(40, 230, 54, 12))
        self.label_8.setObjectName("label_8")
        self.lineEdit_paper_type = QtWidgets.QLineEdit(self.tab)
        self.lineEdit_paper_type.setGeometry(QtCore.QRect(100, 200, 91, 20))
        self.lineEdit_paper_type.setObjectName("lineEdit_paper_type")
        self.lineEdit_paper_cat = QtWidgets.QLineEdit(self.tab)
        self.lineEdit_paper_cat.setGeometry(QtCore.QRect(100, 230, 91, 20))
        self.lineEdit_paper_cat.setObjectName("lineEdit_paper_cat")
        self.button_add_paper = QtWidgets.QPushButton(self.tab)
        self.button_add_paper.setGeometry(QtCore.QRect(260, 100, 111, 51))
        self.button_add_paper.setObjectName("button_add_paper")
        self.tree_widget_papers = QtWidgets.QTreeWidget(self.tab)
        self.tree_widget_papers.setGeometry(QtCore.QRect(30, 270, 681, 192))
        self.tree_widget_papers.setObjectName("tree_widget_papers")
        self.button_search_paper = QtWidgets.QPushButton(self.tab)
        self.button_search_paper.setGeometry(QtCore.QRect(420, 100, 111, 51))
        self.button_search_paper.setObjectName("button_search_paper")
        self.button_delete_paper = QtWidgets.QPushButton(self.tab)
        self.button_delete_paper.setGeometry(QtCore.QRect(260, 180, 111, 51))
        self.button_delete_paper.setObjectName("button_delete_paper")
        self.label_5 = QtWidgets.QLabel(self.tab)
        self.label_5.setGeometry(QtCore.QRect(40, 80, 54, 12))
        self.label_5.setObjectName("label_5")
        self.lineEdit_paper_number = QtWidgets.QLineEdit(self.tab)
        self.lineEdit_paper_number.setGeometry(QtCore.QRect(100, 80, 91, 20))
        self.lineEdit_paper_number.setObjectName("lineEdit_paper_number")
        self.button_clear_paper = QtWidgets.QPushButton(self.tab)
        self.button_clear_paper.setGeometry(QtCore.QRect(420, 180, 111, 51))
        self.button_clear_paper.setObjectName("button_clear_paper")
        self.tabWidget.addTab(self.tab, "")
        self.tab_2 = QtWidgets.QWidget()
        self.tab_2.setObjectName("tab_2")
        self.label_9 = QtWidgets.QLabel(self.tab_2)
        self.label_9.setGeometry(QtCore.QRect(60, 30, 54, 12))
        self.label_9.setObjectName("label_9")
        self.lineEdit_prog_teacher_number = QtWidgets.QLineEdit(self.tab_2)
        self.lineEdit_prog_teacher_number.setGeometry(QtCore.QRect(130, 30, 113, 20))
        self.lineEdit_prog_teacher_number.setObjectName("lineEdit_prog_teacher_number")
        self.label_10 = QtWidgets.QLabel(self.tab_2)
        self.label_10.setGeometry(QtCore.QRect(60, 60, 54, 12))
        self.label_10.setObjectName("label_10")
        self.label_11 = QtWidgets.QLabel(self.tab_2)
        self.label_11.setGeometry(QtCore.QRect(60, 90, 54, 12))
        self.label_11.setObjectName("label_11")
        self.label_12 = QtWidgets.QLabel(self.tab_2)
        self.label_12.setGeometry(QtCore.QRect(60, 120, 54, 12))
        self.label_12.setObjectName("label_12")
        self.lineEdit_prog_id = QtWidgets.QLineEdit(self.tab_2)
        self.lineEdit_prog_id.setGeometry(QtCore.QRect(130, 60, 113, 20))
        self.lineEdit_prog_id.setObjectName("lineEdit_prog_id")
        self.lineEdit_prog_cur = QtWidgets.QLineEdit(self.tab_2)
        self.lineEdit_prog_cur.setGeometry(QtCore.QRect(130, 90, 113, 20))
        self.lineEdit_prog_cur.setObjectName("lineEdit_prog_cur")
        self.lineEdit_prog_rank = QtWidgets.QLineEdit(self.tab_2)
        self.lineEdit_prog_rank.setGeometry(QtCore.QRect(130, 120, 113, 20))
        self.lineEdit_prog_rank.setObjectName("lineEdit_prog_rank")
        self.button_add_prog = QtWidgets.QPushButton(self.tab_2)
        self.button_add_prog.setGeometry(QtCore.QRect(320, 30, 121, 51))
        self.button_add_prog.setObjectName("button_add_prog")
        self.button_delete_prog = QtWidgets.QPushButton(self.tab_2)
        self.button_delete_prog.setGeometry(QtCore.QRect(320, 90, 121, 51))
        self.button_delete_prog.setObjectName("button_delete_prog")
        self.button_search_prog = QtWidgets.QPushButton(self.tab_2)
        self.button_search_prog.setGeometry(QtCore.QRect(470, 30, 121, 51))
        self.button_search_prog.setObjectName("button_search_prog")
        self.button_refresh_prog = QtWidgets.QPushButton(self.tab_2)
        self.button_refresh_prog.setGeometry(QtCore.QRect(470, 90, 121, 51))
        self.button_refresh_prog.setObjectName("button_refresh_prog")
        self.tree_widget_prog = QtWidgets.QTreeWidget(self.tab_2)
        self.tree_widget_prog.setGeometry(QtCore.QRect(20, 180, 751, 291))
        self.tree_widget_prog.setObjectName("tree_widget_prog")
        self.tabWidget.addTab(self.tab_2, "")
        self.tab_5 = QtWidgets.QWidget()
        self.tab_5.setObjectName("tab_5")
        self.label_13 = QtWidgets.QLabel(self.tab_5)
        self.label_13.setGeometry(QtCore.QRect(60, 30, 54, 12))
        self.label_13.setObjectName("label_13")
        self.label_14 = QtWidgets.QLabel(self.tab_5)
        self.label_14.setGeometry(QtCore.QRect(60, 60, 54, 12))
        self.label_14.setObjectName("label_14")
        self.label_15 = QtWidgets.QLabel(self.tab_5)
        self.label_15.setGeometry(QtCore.QRect(60, 90, 54, 12))
        self.label_15.setObjectName("label_15")
        self.label_16 = QtWidgets.QLabel(self.tab_5)
        self.label_16.setGeometry(QtCore.QRect(60, 120, 54, 12))
        self.label_16.setObjectName("label_16")
        self.label_17 = QtWidgets.QLabel(self.tab_5)
        self.label_17.setGeometry(QtCore.QRect(60, 150, 54, 12))
        self.label_17.setObjectName("label_17")
        self.lineEdit_course_id = QtWidgets.QLineEdit(self.tab_5)
        self.lineEdit_course_id.setGeometry(QtCore.QRect(120, 30, 113, 20))
        self.lineEdit_course_id.setObjectName("lineEdit_course_id")
        self.lineEdit_course_teacher_no = QtWidgets.QLineEdit(self.tab_5)
        self.lineEdit_course_teacher_no.setGeometry(QtCore.QRect(120, 60, 113, 20))
        self.lineEdit_course_teacher_no.setObjectName("lineEdit_course_teacher_no")
        self.lineEdit_course_year = QtWidgets.QLineEdit(self.tab_5)
        self.lineEdit_course_year.setGeometry(QtCore.QRect(120, 90, 113, 20))
        self.lineEdit_course_year.setObjectName("lineEdit_course_year")
        self.lineEdit_course_semester = QtWidgets.QLineEdit(self.tab_5)
        self.lineEdit_course_semester.setGeometry(QtCore.QRect(120, 120, 113, 20))
        self.lineEdit_course_semester.setObjectName("lineEdit_course_semester")
        self.lineEdit_course_time = QtWidgets.QLineEdit(self.tab_5)
        self.lineEdit_course_time.setGeometry(QtCore.QRect(120, 150, 113, 20))
        self.lineEdit_course_time.setObjectName("lineEdit_course_time")
        self.button_add_course = QtWidgets.QPushButton(self.tab_5)
        self.button_add_course.setGeometry(QtCore.QRect(310, 30, 101, 51))
        self.button_add_course.setObjectName("button_add_course")
        self.button_delete_course = QtWidgets.QPushButton(self.tab_5)
        self.button_delete_course.setGeometry(QtCore.QRect(310, 100, 101, 51))
        self.button_delete_course.setObjectName("button_delete_course")
        self.button_search_course = QtWidgets.QPushButton(self.tab_5)
        self.button_search_course.setGeometry(QtCore.QRect(450, 30, 101, 51))
        self.button_search_course.setObjectName("button_search_course")
        self.button_refresh_course = QtWidgets.QPushButton(self.tab_5)
        self.button_refresh_course.setGeometry(QtCore.QRect(450, 100, 101, 51))
        self.button_refresh_course.setObjectName("button_refresh_course")
        self.tree_widget_course = QtWidgets.QTreeWidget(self.tab_5)
        self.tree_widget_course.setGeometry(QtCore.QRect(30, 190, 731, 271))
        self.tree_widget_course.setObjectName("tree_widget_course")
        self.tabWidget.addTab(self.tab_5, "")
        self.tab_6 = QtWidgets.QWidget()
        self.tab_6.setObjectName("tab_6")
        self.label_18 = QtWidgets.QLabel(self.tab_6)
        self.label_18.setGeometry(QtCore.QRect(50, 20, 54, 12))
        self.label_18.setObjectName("label_18")
        self.lineEdit_stat_id = QtWidgets.QLineEdit(self.tab_6)
        self.lineEdit_stat_id.setGeometry(QtCore.QRect(120, 20, 113, 20))
        self.lineEdit_stat_id.setObjectName("lineEdit_stat_id")
        self.label_19 = QtWidgets.QLabel(self.tab_6)
        self.label_19.setGeometry(QtCore.QRect(270, 20, 54, 12))
        self.label_19.setObjectName("label_19")
        self.lineEdit_stat_year = QtWidgets.QLineEdit(self.tab_6)
        self.lineEdit_stat_year.setGeometry(QtCore.QRect(340, 20, 113, 20))
        self.lineEdit_stat_year.setObjectName("lineEdit_stat_year")
        self.button_search_stat = QtWidgets.QPushButton(self.tab_6)
        self.button_search_stat.setGeometry(QtCore.QRect(510, 20, 75, 23))
        self.button_search_stat.setObjectName("button_search_stat")
        self.button_stat_clear = QtWidgets.QPushButton(self.tab_6)
        self.button_stat_clear.setGeometry(QtCore.QRect(600, 20, 75, 23))
        self.button_stat_clear.setObjectName("button_stat_clear")
        self.tree_widget_stat_paper = QtWidgets.QTreeWidget(self.tab_6)
        self.tree_widget_stat_paper.setGeometry(QtCore.QRect(40, 60, 721, 121))
        self.tree_widget_stat_paper.setObjectName("tree_widget_stat_paper")
        self.tree_widget_stat_prog = QtWidgets.QTreeWidget(self.tab_6)
        self.tree_widget_stat_prog.setGeometry(QtCore.QRect(40, 200, 721, 141))
        self.tree_widget_stat_prog.setObjectName("tree_widget_stat_prog")
        self.tree_widget_stat_course = QtWidgets.QTreeWidget(self.tab_6)
        self.tree_widget_stat_course.setGeometry(QtCore.QRect(40, 360, 721, 141))
        self.tree_widget_stat_course.setObjectName("tree_widget_stat_course")
        self.tabWidget.addTab(self.tab_6, "")
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 22))
        self.menubar.setObjectName("menubar")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        self.tabWidget.setCurrentIndex(3)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.label.setText(_translate("MainWindow", "论文名称"))
        self.label_2.setText(_translate("MainWindow", "发表源"))
        self.label_3.setText(_translate("MainWindow", "通讯作者"))
        self.label_4.setText(_translate("MainWindow", "作者"))
        self.label_6.setText(_translate("MainWindow", "发表年份"))
        self.label_7.setText(_translate("MainWindow", "类型"))
        self.label_8.setText(_translate("MainWindow", "级别"))
        self.button_add_paper.setText(_translate("MainWindow", "添加论文"))
        self.tree_widget_papers.headerItem().setText(0, _translate("MainWindow", "序号"))
        self.tree_widget_papers.headerItem().setText(1, _translate("MainWindow", "论文名称"))
        self.tree_widget_papers.headerItem().setText(2, _translate("MainWindow", "发表源"))
        self.tree_widget_papers.headerItem().setText(3, _translate("MainWindow", "发表年份"))
        self.tree_widget_papers.headerItem().setText(4, _translate("MainWindow", "论文类型"))
        self.tree_widget_papers.headerItem().setText(5, _translate("MainWindow", "论文级别"))
        self.button_search_paper.setText(_translate("MainWindow", "查询论文"))
        self.button_delete_paper.setText(_translate("MainWindow", "删除论文"))
        self.label_5.setText(_translate("MainWindow", "论文编号"))
        self.button_clear_paper.setText(_translate("MainWindow", "清空"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.tab), _translate("MainWindow", "发表论文"))
        self.label_9.setText(_translate("MainWindow", "教师工号"))
        self.label_10.setText(_translate("MainWindow", "项目号"))
        self.label_11.setText(_translate("MainWindow", "承担经费"))
        self.label_12.setText(_translate("MainWindow", "项目排名"))
        self.button_add_prog.setText(_translate("MainWindow", "添加项目"))
        self.button_delete_prog.setText(_translate("MainWindow", "删除项目"))
        self.button_search_prog.setText(_translate("MainWindow", "查找项目"))
        self.button_refresh_prog.setText(_translate("MainWindow", "清空"))
        self.tree_widget_prog.headerItem().setText(0, _translate("MainWindow", "项目号"))
        self.tree_widget_prog.headerItem().setText(1, _translate("MainWindow", "项目名称"))
        self.tree_widget_prog.headerItem().setText(2, _translate("MainWindow", "项目来源"))
        self.tree_widget_prog.headerItem().setText(3, _translate("MainWindow", "项目类型"))
        self.tree_widget_prog.headerItem().setText(4, _translate("MainWindow", "总经费"))
        self.tree_widget_prog.headerItem().setText(5, _translate("MainWindow", "开始年份"))
        self.tree_widget_prog.headerItem().setText(6, _translate("MainWindow", "结束年份"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.tab_2), _translate("MainWindow", "承担项目"))
        self.label_13.setText(_translate("MainWindow", "课程号"))
        self.label_14.setText(_translate("MainWindow", "工号"))
        self.label_15.setText(_translate("MainWindow", "年份"))
        self.label_16.setText(_translate("MainWindow", "学期"))
        self.label_17.setText(_translate("MainWindow", "承担学时"))
        self.button_add_course.setText(_translate("MainWindow", "添加课程"))
        self.button_delete_course.setText(_translate("MainWindow", "删除课程"))
        self.button_search_course.setText(_translate("MainWindow", "查询课程"))
        self.button_refresh_course.setText(_translate("MainWindow", "清空"))
        self.tree_widget_course.headerItem().setText(0, _translate("MainWindow", "课程号"))
        self.tree_widget_course.headerItem().setText(1, _translate("MainWindow", "课程名称"))
        self.tree_widget_course.headerItem().setText(2, _translate("MainWindow", "学时数"))
        self.tree_widget_course.headerItem().setText(3, _translate("MainWindow", "课程性质"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.tab_5), _translate("MainWindow", "主讲课程"))
        self.label_18.setText(_translate("MainWindow", "教师工号"))
        self.label_19.setText(_translate("MainWindow", "年份范围"))
        self.button_search_stat.setText(_translate("MainWindow", "查询"))
        self.button_stat_clear.setText(_translate("MainWindow", "清空"))
        self.tree_widget_stat_paper.headerItem().setText(0, _translate("MainWindow", "论文名称"))
        self.tree_widget_stat_paper.headerItem().setText(1, _translate("MainWindow", "发表年份"))
        self.tree_widget_stat_paper.headerItem().setText(2, _translate("MainWindow", "发表源"))
        self.tree_widget_stat_paper.headerItem().setText(3, _translate("MainWindow", "论文排名"))
        self.tree_widget_stat_paper.headerItem().setText(4, _translate("MainWindow", "是否通讯作者"))
        self.tree_widget_stat_prog.headerItem().setText(0, _translate("MainWindow", "项目名称"))
        self.tree_widget_stat_prog.headerItem().setText(1, _translate("MainWindow", "项目来源"))
        self.tree_widget_stat_prog.headerItem().setText(2, _translate("MainWindow", "承担经费"))
        self.tree_widget_stat_prog.headerItem().setText(3, _translate("MainWindow", "项目排名"))
        self.tree_widget_stat_prog.headerItem().setText(4, _translate("MainWindow", "开始年份"))
        self.tree_widget_stat_prog.headerItem().setText(5, _translate("MainWindow", "结束年份"))
        self.tree_widget_stat_course.headerItem().setText(0, _translate("MainWindow", "课程号"))
        self.tree_widget_stat_course.headerItem().setText(1, _translate("MainWindow", "课程名称"))
        self.tree_widget_stat_course.headerItem().setText(2, _translate("MainWindow", "年份"))
        self.tree_widget_stat_course.headerItem().setText(3, _translate("MainWindow", "学期"))
        self.tree_widget_stat_course.headerItem().setText(4, _translate("MainWindow", "承担学时"))
        self.tabWidget.setTabText(self.tabWidget.indexOf(self.tab_6), _translate("MainWindow", "统计查询"))
