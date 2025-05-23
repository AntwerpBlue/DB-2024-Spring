"use client";
import axios,{AxiosError} from 'axios';
import React, { useState } from 'react';
import { Form, Select, Input, DatePicker, Button, Table, message, Card, Space, Tabs, Popconfirm, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TabsProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { SearchOutlined, ReloadOutlined} from '@ant-design/icons';
import { TeacherBasicInfo, CourseInfo, PaperInfo, ProjectInfo, staticResponse } from '@/app/lib/types';
const { RangePicker } = DatePicker;
const { Option } = Select;

const TeacherQueryComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [teacherId, setTeacherId] = useState('');
  const [loading, setLoading] = useState(false);
  const [basicInfo, setBasicInfo] = useState<TeacherBasicInfo | null>(null);
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const [papers, setPapers] = useState<PaperInfo[]>([]);
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [editingKey, setEditingKey] = useState<string>('');
  const [editForm] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditType, setCurrentEditType] = useState<'course' | 'paper' | 'project'>('course');

  // 删除函数
  const handleDelete = async (type: 'course' | 'paper' | 'project', id: string, teacherId: string) => {
    try {
      await axios.delete(`/api/${type}`, { data: {id:id, teacher: teacherId} });
      message.success('删除成功');
      handleSearch(); // 重新加载数据
    } catch (error) {
      message.error('删除失败');
      console.error('删除错误:', error);
    }
  };

  // 编辑函数
  const handleEdit = (record: any, type: 'course' | 'paper' | 'project') => {
    setCurrentEditType(type);
    editForm.setFieldsValue(record);
    setEditModalVisible(true);
    setEditingKey(`${type}-${record.id || record.courseId || record.paperId || record.projectId}`);
  };

  // 保存编辑
  const handleSave = async (type: 'course' | 'paper' | 'project') => {
    try {
      const values = await editForm.validateFields();
      await axios.put(`/api/${type}`, values);
      message.success('更新成功');
      setEditingKey('');
      setEditModalVisible(false);
      handleSearch(); // 重新加载数据
    } catch (error) {
      message.error('更新失败');
      console.error('更新错误:', error);
    }
  };

  // 取消编辑
  const handleCancel = () => {
    setEditingKey('');
    setEditModalVisible(false);
  };

  const courseColumns: ColumnsType<CourseInfo> = [
    {
      title: '课程号',
      dataIndex: 'courseId',
      key: 'courseId',
      width: 100,
    },
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      width: 150,
    },
    {
      title: '主讲课时',
      dataIndex: 'hours',
      key: 'hours',
      width: 80,
    },
    {
      title: '学期',
      dataIndex: 'semester',
      key: 'semester',
      width: 100,
      render: (value) => {switch(value){
        case 1: return '秋季学期';
        case 2: return '春季学期';
        case 3: return '夏季学期';
      }}
    },
    {
      title: '授课学年',
      dataIndex: 'year',
      key: 'year',
      width: 100,
    },
    {
      title: '课程性质',
      dataIndex: 'courseType',
      key: 'courseType',
      width: 100,
      render: (value) => {switch(value){
        case 1: return '本科生课程';
        case 2: return '研究生课程';
      }}
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => {
        const editable = editingKey === `course-${record.courseId}`;
        return editable ? (
          <span>
            <Button
              type="link"
              onClick={() => handleSave('course')}
              style={{ marginRight: 8 }}
            >
              保存
            </Button>
            <Button type="link" onClick={handleCancel}>
              取消
            </Button>
          </span>
        ) : (
          <Space>
            <Button
              type="link"
              onClick={() => handleEdit(record, 'course')}
              disabled={editingKey !== ''}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={() => handleDelete('course', record.courseId, teacherId)}
            >
              <Button type="link" danger disabled={editingKey !== ''}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const paperColumns: ColumnsType<PaperInfo> = [
    {
      title: '论文标题',
      dataIndex: 'paperTitle',
      key: 'paperTitle',
      width: 200,
    },
    {
      title: '期刊名称',
      dataIndex: 'journalName',
      key: 'journalName',
      width: 150,
    },
    {
      title: '论文类型',
      dataIndex: 'paperType',
      key: 'paperType',
      width: 100,
      render: (value) => {switch(value){
        case 1: return 'full paper';
        case 2: return 'short paper';
        case 3: return 'poster paper';
        case 4: return 'demo paper';
      }}
    },
    {
      title: '论文级别',
      dataIndex: 'paperLevel',
      key: 'paperLevel',
      width: 80,
      render: (value) => {switch(value){
        case 1: return 'CCF-A';
        case 2: return 'CCF-B';
        case 3: return 'CCF-C';
        case 4: return '中文CCF-A';
        case 5: return '中文CCF-B';
        case 6: return '无级别';
      }}
    },
    {
      title: '发表时间',
      dataIndex: 'publishYear',
      key: 'publishYear',
      width: 80,
    },
    {
      title: '作者排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 100,
      render: (r)=>`第${r}作者`
    },
    {
      title: '是否通讯作者',
      dataIndex: 'correspond',
      key: 'correspond',
      width: 100,
      render: (value) => value ? '是' : '否',
    },
    {
    title: '操作',
    key: 'action',
    width: 150,
    render: (_, record) => {
      const editable = editingKey === `paper-${record.paperId}`;
      return editable ? (
        <span>
          <Button
            type="link"
            onClick={() => handleSave('paper')}
            style={{ marginRight: 8 }}
          >
            保存
          </Button>
          <Button type="link" onClick={handleCancel}>
            取消
          </Button>
        </span>
      ) : (
        <Space>
          <Button
            type="link"
            onClick={() => handleEdit(record, 'paper')}
            disabled={editingKey !== ''}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => handleDelete('paper', record.paperId, form.getFieldValue('teacherId'))}
          >
            <Button type="link" danger disabled={editingKey !== ''}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
  ];

  const projectColumns: ColumnsType<ProjectInfo> = [
    {
      title: '项目编号',
      dataIndex: 'projectId',
      key: 'projectId',
      width: 100,
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 200,
    },
    {
      title: '项目来源',
      dataIndex: 'projectSource',
      key: 'projectSource',
      width: 120,
    },
    {
      title: '项目类型',
      dataIndex: 'projectType',
      key: 'projectType',
      width: 120,
      render: (value) => {switch(value){
        case 1: return '国家级项目';
        case 2: return '省部级项目';
        case 3: return '市厅级项目';
        case 4: return '企业合作项目';
        case 5: return '其他类型项目';
      }}
    },
    {
      title: '起止年份',
      key: 'dateRange',
      dataIndex: 'dateRange',
      width: 200,
    },
    {
      title: '总经费(万元)',
      dataIndex: 'totalFunding',
      key: 'totalFunding',
      width: 120,
    },
    {
      title: '承担经费(万元)',
      dataIndex: 'funding',
      key: 'funding',
      width: 120,
    },
    {
    title: '操作',
    key: 'action',
    width: 150,
    render: (_, record) => {
      const editable = editingKey === `project-${record.projectId}`;
      return editable ? (
        <span>
          <Button
            type="link"
            onClick={() => handleSave('project')}
            style={{ marginRight: 8 }}
          >
            保存
          </Button>
          <Button type="link" onClick={handleCancel}>
            取消
          </Button>
        </span>
      ) : (
        <Space>
          <Button
            type="link"
            onClick={() => handleEdit(record, 'project')}
            disabled={editingKey !== ''}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => handleDelete('project', record.projectId, form.getFieldValue('teacherId'))}
          >
            <Button type="link" danger disabled={editingKey !== ''}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      );
    },
  },
  ];

  const handleSearch = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      const values = form.getFieldsValue();
      setTeacherId(values.teacherId);
      console.log(teacherId)
      const {yearRange} = values;
      const submissionData={
        teacherId: values.teacherId,
        yearRange: yearRange?yearRange.map((item:Dayjs)=>item.year()):[1900,2100],
      };
      const response=await axios.post('/api/static',submissionData);
      if (response.data.success===false) {
        message.error(response.data.message);
      }
      setBasicInfo(response.data.teacherInfo);
      setCourses(response.data.courseInfo);
      setPapers(response.data.paperInfo);
      setProjects(response.data.projectInfo);
    } catch (error) {
      message.error('查询失败，请稍后重试');
      console.error('查询错误:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setBasicInfo(null);
    setCourses([]);
    setPapers([]);
    setProjects([]);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '授课信息',
      children: (
        <Table
          columns={courseColumns}
          dataSource={courses}
          loading={loading}
          rowKey={(record)=>record.courseId}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 600 }}
        />
      ),
    },
    {
      key: '2',
      label: '论文信息',
      children: (
        <Table
          columns={paperColumns}
          dataSource={papers}
          loading={loading}
          rowKey={(record)=>record.paperId}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
        />
      ),
    },
    {
      key: '3',
      label: '项目信息',
      children: (
        <Table
          columns={projectColumns}
          dataSource={projects}
          loading={loading}
          rowKey={(record)=>record.projectId}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 900 }}
        />
      ),
    },
  ];

  return (
    <Card title="教师信息综合查询" >
      <Form
        form={form}
        layout="inline"
        onFinish={handleSearch}
        initialValues={{
          startDate: dayjs().subtract(1, 'year'),
        }}
      >
        <Form.Item 
          label="教师工号" 
          name="teacherId"
          rules={[{ required: true, message: '请输入教师工号' }]}
        >
          <Input placeholder="请输入教师工号" allowClear style={{ width: 180 }} />
        </Form.Item>
        
        <Form.Item label="时间范围查询" name="yearRange">
          <RangePicker
            picker="year"
            id={{
              start: 'startYear',
              end: 'endYear',
            }}
            onFocus={(_, info) => {
              console.log('Focus:', info.range);
            }}
            onBlur={(_, info) => {
              console.log('Blur:', info.range);
            }}
          />
        </Form.Item>
        
        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              icon={<SearchOutlined />} 
              htmlType="submit"
              loading={loading}
            >
              查询
            </Button>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleReset}
              disabled={loading}
            >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      
      {basicInfo && (
        <div style={{ margin: '24px 0', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
          <h3>教师基本信息</h3>
          <p><strong>工号：</strong>{basicInfo.teacherId}</p>
          <p><strong>姓名：</strong>{basicInfo.name}</p>
          <p><strong>性别：</strong>{basicInfo.gender===1?'男':'女'}</p>
          <p><strong>职称：</strong>{basicInfo.position===1?'博士后':
            basicInfo.position===2?'助教':
            basicInfo.position===3?'讲师':
            basicInfo.position===4?'副教授':
            basicInfo.position===5?'特任教授':
            basicInfo.position===6?'教授':
            basicInfo.position===7?'助理研究员':
            basicInfo.position===8?'特任副研究员':
            basicInfo.position===9?'副研究员':
            basicInfo.position===10?'特任研究员':
            basicInfo.position===11?'研究员':'其他'}</p>
        </div>
      )}
      
      <div style={{ marginTop: 24 }}>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
      <Modal
        title={`编辑${currentEditType === 'course' ? '课程' : currentEditType === 'paper' ? '论文' : '项目'}信息`}
        open={editModalVisible}
        onOk={() => handleSave(currentEditType)}
        onCancel={handleCancel}
        width={800}
      >
        <Form form={editForm} layout="vertical">
          {currentEditType === 'course' && (
            <>
              <Form.Item label="授课学期" name="semester" required={true}>
                <Select>
                  <Option value="1">秋季学期</Option>
                  <Option value="2">春季学期</Option>
                  <Option value="3">夏季学期</Option>
                </Select>
              </Form.Item>
              <Form.Item label="授课学年" name="year" required={true}>
                <Input placeholder='输入课程授课学年'/>
              </Form.Item>
            </>
          )}
          {currentEditType === 'paper' && (
            <>
              <Form.Item name="paperTitle" label="论文标题" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="journalName" label="期刊名称" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              {/* 其他论文字段 */}
            </>
          )}
          {currentEditType === 'project' && (
            <>
              <Form.Item name="projectId" label="项目编号" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="projectName" label="项目名称" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              {/* 其他项目字段 */}
            </>
          )}
        </Form>
      </Modal>
    </Card>
  );
};

export default TeacherQueryComponent;