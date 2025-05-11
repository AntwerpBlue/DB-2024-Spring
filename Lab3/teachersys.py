from Ui_untitled import *
from PyQt5.QtWidgets import QMainWindow, QMessageBox, QTreeWidgetItem, QFileDialog
from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import QDate, QTime, Qt
from PyQt5 import QtCore
import sys
import mysql.connector
import decimal

def devide_author(string):
    authors=str(string).split(',')
    return authors

def merge_author(authors):
    return ','.join(authors)

def to_date(string):
    date = str(string).split('-')
    return date[0] + '/' + date[1] + '/' + date[2][0:2]

def equal(left, right, String=True):
    if right == '':
        return 'True'
    else:
        return left + ' = ' + to_str(right, String)

def to_str(value, String=True):
    if String:
        return '\'' + value + '\''
    else:
        return value

class MainWindow(QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setupUi(self)
        self.setWindowTitle('教师科研教学管理系统')
        self.bind_up()
        self.query = ""
        self.file_path = ''
        self.op = [' = ', ' != ', ' > ', ' < ']

    def bind_up(self):
        self.button_add_paper.clicked.connect(self.add_paper)
        self.button_search_paper.clicked.connect(self.select_paper)
        self.button_delete_paper.clicked.connect(self.delete_paper)
        self.button_clear_paper.clicked.connect(self.clear_paper)

        self.button_add_course.clicked.connect(self.add_course)
        self.button_search_course.clicked.connect(self.select_course)
        self.button_delete_course.clicked.connect(self.delete_course)
        self.button_refresh_course.clicked.connect(self.clear_course)

        self.button_add_prog.clicked.connect(self.add_prog)
        self.button_search_prog.clicked.connect(self.select_prog)
        self.button_delete_prog.clicked.connect(self.delete_prog)
        self.button_refresh_prog.clicked.connect(self.clear_prog)

        self.button_search_stat.clicked.connect(self.select_stat)
        self.button_stat_clear.clicked.connect(self.clear_stat)


    def execute(self, receive):
        global db
        result = []
        try:
            cursor = db.cursor()
            cursor.execute(self.query)
            if receive:
                result = cursor.fetchall()
            else:
                result = True
            db.commit()
            cursor.close()
        except mysql.connector.Error as err:
            self.error_input(f'SQL执行失败: {err}')
            return False
        self.last = ''
        return result

    def error_input(self, err_msg):
        QMessageBox.information(self, "错误提示", err_msg, QMessageBox.Yes | QMessageBox.No)


    ## paper manage

    def add_paper(self):
        if self.lineEdit_paper_name.text() == '' or self.lineEdit_paper_number.text() == '' or self.lineEdit_author.text() == '':
            self.error_input('输入信息不足!')
            return
        if self.lineEdit_paper_cat.text() not in ['1','2','3','4','5','6']:
            self.error_input('论文级别输入错误!')
            return
        if self.lineEdit_paper_type.text() not in ['1','2','3','4']:
            self.error_input('论文类型输入错误!')
            return
        reply = QMessageBox.question(self, '确认', "确定执行操作?", QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if reply == QMessageBox.No:
            return
        self.query = 'insert into 论文(序号, 论文名称,发表源,发表年份,类型,级别) Values(' + to_str(self.lineEdit_paper_number.text()) + ', ' + to_str(self.lineEdit_paper_name.text()) + ', ' + to_str(self.lineEdit_paper_source.text()) + ', ' + to_str(self.lineEdit_pub_year.text()) + ', ' + to_str(self.lineEdit_paper_type.text()) + ', ' + to_str(self.lineEdit_paper_cat.text()) +')'
        self.execute(False)
        authors=devide_author(self.lineEdit_author.text())
        idx=1
        for author in authors:
            iscontact='1' if author==self.lineEdit_contact_author.text() else '0'
            self.query = 'insert into 发表论文(工号,序号,论文排名,是否通讯作者) Values(' + to_str(author) + ', ' + to_str(self.lineEdit_paper_number.text()) + ', ' + to_str(str(idx))+','+iscontact+')'
            idx+=1
            self.execute(False)

    def select_paper(self):
        self.query = 'select * from 论文 where ' + equal('序号', self.lineEdit_paper_number.text())
        query_result = self.execute(True)
        if status == 0 and query_result is not None:
            self.show_paper(query_result)

    def show_paper(self, result):
        self.tree_widget_papers.clear()
        L = []
        for row in result:
            L.append(QTreeWidgetItem([str(row[0]), str(row[1]), str(row[2]), str(row[3]), str(row[4]), str(row[5])]))
        self.tree_widget_papers.addTopLevelItems(L)

    def delete_paper(self):
        self.select_paper()
        reply = QMessageBox.question(self, '确认', "确定执行操作?", QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if reply == QMessageBox.No:
            return
        self.query = 'delete from 发表论文 where ' + equal('序号', self.lineEdit_paper_number.text())
        if not self.execute(False):
            self.error_input('具体原因：论文存在关联的教师信息')
        self.query = 'delete from 论文 where ' + equal('序号', self.lineEdit_paper_number.text())
        if not self.execute(False):
            self.error_input('具体原因：论文存在关联的教师信息')
        self.tree_widget_papers.clear()

    def clear_paper(self):
        self.lineEdit_author.setText('')
        self.lineEdit_contact_author.setText('')
        self.lineEdit_paper_cat.setText('')
        self.lineEdit_paper_name.setText('')
        self.lineEdit_paper_number.setText('')
        self.lineEdit_paper_source.setText('')
        self.lineEdit_paper_type.setText('')
        self.lineEdit_pub_year.setText('')


    ## program manage

    def add_prog(self):
        if self.lineEdit_prog_id.text() == '' or self.lineEdit_prog_teacher_number.text() == '' or self.lineEdit_prog_rank.text() == '':
            self.error_input('输入信息不足!')
            return
        reply = QMessageBox.question(self, '确认', "确定执行操作?", QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if reply == QMessageBox.No:
            return
        self.query = 'select * from 项目 where ' + equal('项目号', self.lineEdit_prog_id.text())
        query_result=self.execute(True)
        if status==0 and query_result is not None:
            total=query_result[0][4]
        self.query='select * from 承担项目 where '+equal('项目号',self.lineEdit_prog_id.text())
        query_result=self.execute(True)
        cur_sum=0
        if status==0 and query_result is not None:
            for row in query_result:
                cur_sum+=row[2]

        if self.lineEdit_prog_cur.text() == '':
            if cur_sum>=total:
                self.error_input('具体原因：项目经费已满')
                return
            else:
                cur=total-cur_sum
        else:
            cur=float(self.lineEdit_prog_cur.text())
            if cur+cur_sum>total:
                self.error_input('具体原因：项目经费不足')
                return
            
        rank=self.lineEdit_prog_rank.text()
        self.query='select * from 承担项目 where '+equal('项目号',self.lineEdit_prog_id.text())
        query_result=self.execute(True)
        if status==0 and query_result is not None:
            for row in query_result:
                if rank==row[3]:
                    self.error_input('具体原因：项目排名已存在')
                    return

        self.query = 'insert into 承担项目(工号,项目号, 承担经费,项目排名) Values(' + to_str(self.lineEdit_prog_teacher_number.text()) + ', ' + to_str(self.lineEdit_prog_id.text()) + ', ' + to_str(str(cur)) + ', ' + to_str(self.lineEdit_prog_rank.text()) +')'
        self.execute(False)

    def select_prog(self):
        self.query = 'select * from 项目 where ' + equal('项目号', self.lineEdit_prog_id.text())
        query_result = self.execute(True)
        if status == 0 and query_result is not None:
            self.show_prog(query_result)

    def show_prog(self, result):
        self.tree_widget_prog.clear()
        L = []
        for row in result:
            L.append(QTreeWidgetItem([str(row[0]), str(row[1]), str(row[2]), str(row[3]), str(row[4]), str(row[5]), str(row[6])]))
        self.tree_widget_prog.addTopLevelItems(L)

    def delete_prog(self):
        self.select_prog()
        reply = QMessageBox.question(self, '确认', "确定执行操作?", QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if reply == QMessageBox.No:
            return
        self.query = 'delete from 承担项目 where ' + equal('序号', self.lineEdit_prog_id.text())
        if not self.execute(False):
            self.error_input('具体原因：项目存在关联的教师信息')
            return
        self.query = 'delete from 项目 where ' + equal('序号', self.lineEdit_prog_id.text())
        if not self.execute(False):
            self.error_input('具体原因：项目存在关联的教师信息')
            return

        self.tree_widget_prog.clear()

    def clear_prog(self):
        self.lineEdit_prog_cur.setText('')
        self.lineEdit_prog_id.setText('')
        self.lineEdit_prog_rank.setText('')
        self.lineEdit_prog_teacher_number.setText('')


    ## course manage

    def add_course(self):
        if self.lineEdit_course_id.text() == '' or self.lineEdit_course_teacher_no.text() == '' or self.lineEdit_course_year.text()=='' or self.lineEdit_course_semester.text()=='':
            self.error_input('输入信息不足!')
            return
        cur=int(self.lineEdit_course_time.text())
        reply = QMessageBox.question(self, '确认', "确定执行操作?", QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if reply == QMessageBox.No:
            return
        self.query = 'select * from 课程 where ' + equal('课程号', self.lineEdit_course_id.text())
        query_result = self.execute(True)
        if status == 0 and query_result is not None:
            total=int(query_result[0][2])
        self.query = 'select * from 主讲课程 where ' + equal('课程号', self.lineEdit_course_id.text())+' and '+equal('年份',self.lineEdit_course_year.text())+' and '+equal('学期',self.lineEdit_course_semester.text())
        query_result = self.execute(True)
        if status == 0 and query_result is not None:
            cur_sum=0
            for row in query_result:
                cur_sum+=int(row[4])
        if cur_sum>=total:
            self.error_input('具体原因：课时已满')
            return
        else:
            if cur>total-cur_sum:
                self.error_input('具体原因: 课时已满')
                return
        self.query = 'insert into 主讲课程(工号,课程号, 年份,学期,承担学时) Values(' + to_str(self.lineEdit_course_teacher_no.text()) + ', ' + to_str(self.lineEdit_course_id.text()) + ', ' + to_str(self.lineEdit_course_year.text()) + ', ' + to_str(self.lineEdit_course_semester.text()) +', ' + to_str(str(cur)) +')'
        self.execute(False)

    def select_course(self):
        self.query = 'select * from 课程 where ' + equal('课程号', self.lineEdit_course_id.text())
        query_result = self.execute(True)
        if status == 0 and query_result is not None:
            self.show_course(query_result)

    def show_course(self, result):
        self.tree_widget_course.clear()
        L = []
        for row in result:
            L.append(QTreeWidgetItem([str(row[0]), str(row[1]), str(row[2]), str(row[3])]))
        self.tree_widget_course.addTopLevelItems(L)

    def delete_course(self):
        self.select_prog()
        reply = QMessageBox.question(self, '确认', "确定执行操作?", QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if reply == QMessageBox.No:
            return
        self.query = 'delete from 主讲课程 where ' + equal('课程号', self.lineEdit_course_id.text())+' and '+equal('工号', self.lineEdit_course_teacher_no.text())
        if not self.execute(False):
            self.error_input('具体原因：项目存在关联的教师信息')
            return
        self.tree_widget_course.clear()

    def clear_course(self):
        self.lineEdit_course_id.setText('')
        self.lineEdit_course_semester.setText('')
        self.lineEdit_course_teacher_no.setText('')
        self.lineEdit_course_time.setText('')
        self.lineEdit_course_year.setText('')

    # statistic 
    def select_stat(self):
        if self.lineEdit_stat_id.text()=='':
            self.error_input('请输入教师工号！')
            return
        if self.lineEdit_stat_year.text() == '':
            ybegin='1900-01-01'
            yend='2025-01-01'
        else:
            years=self.lineEdit_stat_year.text().split('-')
            ybegin=str(years[0])+'-01-01'
            yend=str(years[1])+'-12-31'
        self.tree_widget_stat_course.clear()
        self.tree_widget_stat_prog.clear()
        self.tree_widget_stat_paper.clear()
        L=[]
        self.query='select 论文.论文名称,论文.发表年份,论文.发表源,发表论文.论文排名,发表论文.是否通讯作者 from 论文,发表论文 where 论文.序号=发表论文.序号 and 发表论文.工号='+to_str(self.lineEdit_stat_id.text())+' and 论文.发表年份>='+to_str(ybegin)+' and 论文.发表年份<='+to_str(yend)
        query_result=self.execute(True)
        if status==0 and query_result is not None:
            for row in query_result:
                L.append(QTreeWidgetItem([str(row[0]), str(row[1]), str(row[2]), str(row[3]), str(row[4])]))
        self.tree_widget_stat_paper.addTopLevelItems(L)

        L=[]
        self.query='select 项目.项目名称,项目.项目来源,承担项目.承担经费,承担项目.项目排名,项目.开始年份,项目.结束年份 from 项目,承担项目 where 项目.项目号=承担项目.项目号 and 承担项目.工号='+to_str(self.lineEdit_stat_id.text())+' and ((项目.开始年份>='+to_str(ybegin)+' and 项目.开始年份<='+to_str(yend)+') or (项目.结束年份>='+to_str(ybegin)+' and 项目.结束年份<='+to_str(yend)+'))'
        query_result=self.execute(True)
        if status==0 and query_result is not None:
            for row in query_result:
                L.append(QTreeWidgetItem([str(row[0]), str(row[1]), str(row[2]), str(row[3]), str(row[4]), str(row[5])]))
        self.tree_widget_stat_prog.addTopLevelItems(L)

        L=[]
        self.query='select 课程.课程号,课程.课程名称,主讲课程.年份,主讲课程.学期,主讲课程.承担学时 from 课程,主讲课程 where 课程.课程号=主讲课程.课程号 and 主讲课程.工号='+to_str(self.lineEdit_stat_id.text())+' and 主讲课程.年份>='+to_str(ybegin)+' and 主讲课程.年份<='+to_str(yend)
        query_result=self.execute(True)
        if status==0 and query_result is not None:
            for row in query_result:
                L.append(QTreeWidgetItem([str(row[0]), str(row[1]), str(row[2]), str(row[3]), str(row[4])]))
        self.tree_widget_stat_course.addTopLevelItems(L)    

    def clear_stat(self):
        self.lineEdit_stat_id.setText('')
        self.lineEdit_stat_year.setText('')

if __name__ == "__main__":
    try:
        db = mysql.connector.connect(
            host="localhost",  # 确保主机地址与 Workbench 中的一致
            user="root",
            password="root",  # 请替换为实际的密码
            database="teachersys",  # 修改为你的数据库名称
            charset="utf8",
            auth_plugin='mysql_native_password'
        )
        print("Connected successfully!")
        status = 0
    except mysql.connector.Error as err:
        status = 1
        print(f"Failed to connect to the database: {err}")

    app = QtWidgets.QApplication(sys.argv)
    MainWindow = MainWindow()
    MainWindow.show()
    sys.exit(app.exec_())

    if status == 0:
        db.close()
