'use client';

import axios,{AxiosError} from 'axios';
import { Teach, Course } from '@/app/lib/types'
import { Form, Input, Button, Select, Space, message} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import '@ant-design/v5-patch-for-react-19';

const { Option } = Select;

export default function CourseManagement(){
    const [form] = Form.useForm<Course>();
    const addParts = () => {
      const currentTeachers = form.getFieldValue('teachers') || [];
      form.setFieldsValue({
        teachers: [...currentTeachers, { name: '', time: '' }],
      });
    }
    const handleSubmit = async () => {
      try{
        await form.validateFields();
        const values=form.getFieldsValue();
        console.log(values);
        const submissionData = {
          id: values.id,
          name: values.name,
          duration: values.duration,
          type: values.type,
          year: values.year,
          semester: values.semester,
          teachers: values.teachers
        };
        console.log(submissionData);
        await axios.post('/api/course', submissionData);
        message.success('项目信息提交成功');
        form.resetFields();
      }catch(error){
        console.log(error);
        if (error instanceof Error) {
          if (error.message.includes('validateFields')) return;
          message.error(`提交失败: ${error.message}`);
        } else if (axios.isAxiosError(error)) {
          // 后端返回的错误
          const serverError = error as AxiosError<{ message?: string }>;
          message.error(serverError.response?.data?.message || '服务器错误');
        } else {
          // 未知错误类型
          message.error('未知错误');
          console.error('Unexpected error:', error);
        }
      }
    }
    return (
      <Form
        layout='vertical'
        form={form}
        initialValues={{
          teachers: [{name: '', time: ''}],
        }}
        style={{ maxWidth: 600 }}>
        <Form.Item label="课程号" name="id" required={true}>
          <Input placeholder='输入课程号'/>
        </Form.Item>
        <Form.Item label="课程名称" name="name" required={true}>
          <Input placeholder='输入课程名称'/>
        </Form.Item>
        <Form.Item label="总学时" name="duration" required={true}>
          <Input placeholder='输入课程总学时'/>
        </Form.Item>
        <Form.Item label="课程性质" name='type' required={true}>
          <Select>
            <Option value="1">本科生课程</Option>
            <Option value="2">研究生课程</Option>
          </Select>
        </Form.Item>
        <Form.Item label="授课学年" name="year" required={true}>
          <Input placeholder='输入课程授课学年'/>
        </Form.Item>
        <Form.Item label="授课学期" name="semester" required={true}>
          <Select>
            <Option value="1">秋季学期</Option>
            <Option value="2">春季学期</Option>
            <Option value="3">夏季学期</Option>
          </Select>
        </Form.Item>
        <Form.List
          name="teachers"
          rules={
            [{
              validator: async (_, participants: Teach[]) => {
                if (!participants||participants.length === 0) {
                  return Promise.reject(new Error('至少需要 1 个教师'));
                }
              },},]
            }
        >
          {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...restField },index) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                label={index===0 ? '教师姓名': ''}
                {...restField}
                name={[name, 'name']}
                rules={[{ required: true, message: '缺少姓名' }]}
              >
                <Input placeholder="教师姓名" />
              </Form.Item>
              <Form.Item
                label={index===0 ? '承担学时': ''}
                {...restField}
                name={[name, 'time']}
                rules={[{ required: true, message: '缺少承担学时' }]}
              >
                <Input placeholder="承担学时" />
              </Form.Item>
              {fields.length > 1 && (
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(name)}
                />
              )}
            </Space>
          ))}
              <Form.Item>
                <Button type="dashed" onClick={addParts} style={{ width: '60%' }} icon={<PlusOutlined />} >
                  添加教师
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>提交</Button>
      </Form>
    );
}