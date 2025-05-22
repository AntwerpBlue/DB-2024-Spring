"use client";
import axios,{AxiosError} from 'axios';
import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Table, message, Card, Space, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { TeacherBasicInfo, CourseInfo, PaperInfo, ProjectInfo} from '@/app/lib/types';
const { RangePicker } = DatePicker;

const TeacherQueryComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [basicInfo, setBasicInfo] = useState<TeacherBasicInfo | null>(null);
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const [papers, setPapers] = useState<PaperInfo[]>([]);
  const [projects, setProjects] = useState<ProjectInfo[]>([]);

  const courseColumns: ColumnsType<CourseInfo> = [
    {
      title: '课程号',
      dataIndex: 'courseId',
      key: 'courseId',
      width: 100,
    },
    {
      title: '课程名',
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
      title: '发表时间',
      dataIndex: 'publishDate',
      key: 'publishDate',
      width: 120,
    },
    {
      title: '作者排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 150,
    },
    {
      title: '是否通讯作者',
      dataIndex: 'correspond',
      key: 'correspond',
      width: 100,
      render: (value) => value ? '是' : '否',
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
      title: '项目类型',
      dataIndex: 'projectType',
      key: 'projectType',
      width: 120,
    },
    {
      title: '项目来源',
      dataIndex: 'projectSource',
      key: 'projectSource',
      width: 120,
    },
    {
      title: '起止年份',
      key: 'dateRange',
      width: 200,
    },
    {
      title: '总经费(万元)',
      dataIndex: 'totalFunding',
      key: 'totalFunding',
      width: 120,
      render: (value) => (value / 10000).toFixed(2),
    },
    {
      title: '承担经费(万元)',
      dataIndex: 'funding',
      key: 'funding',
      width: 120,
      render: (value) => (value / 10000).toFixed(2),
    },
  ];

  const handleSearch = async (values: any) => {
    try {
      setLoading(true);
      const submissionData={
        teacherId: values.teacherId,
        yearRange: values.yearRange
      };
      const response=await axios.post('/api/static',submissionData);
      
      setBasicInfo(mockBasicInfo);
      setCourses(mockCourses);
      setPapers(mockPapers);
      setProjects(mockProjects);
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
          pagination={{ pageSize: 5 }}
          scroll={{ x: 600 }}
          bordered
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
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
          bordered
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
          pagination={{ pageSize: 5 }}
          scroll={{ x: 900 }}
          bordered
        />
      ),
    },
  ];

  return (
    <Card title="教师信息综合查询" bordered={false}>
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
        
        <Form.Item label="起始年份" name="yearRange">
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
          <p><strong>院系：</strong>{basicInfo.department}</p>
          <p><strong>职称：</strong>{basicInfo.position}</p>
        </div>
      )}
      
      <div style={{ marginTop: 24 }}>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </Card>
  );
};

export default TeacherQueryComponent;