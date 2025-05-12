'use client';

import axios,{AxiosError} from 'axios';
import { Part, Project } from '@/app/lib/types'
import { Form, Input, DatePicker, Button, Select, Space, message} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import '@ant-design/v5-patch-for-react-19';

const { Option } = Select;

export default function ProjectManagement(){
    const [form] = Form.useForm<Project>();
    const config = {
      rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
    };
    const addParts = () => {
      const currentParts = form.getFieldValue('participants') || [];
      form.setFieldsValue({
        participants: [...currentParts, { name: '', amount: '' }],
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
          source: values.source,
          type: values.type,
          totalFunding: values.totalFunding,
          startYear: values.startYear.format('YYYY'),
          endYear: values.endYear.format('YYYY'),
          participants: values.participants,
        };
        console.log(submissionData);
        await axios.post('/api/project', submissionData);
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
          participants: [{name: '', amount: ''}],
        }}
        style={{ maxWidth: 600 }}>
        <Form.Item label="项目号" name="id" required={true}>
          <Input placeholder='输入项目号'/>
        </Form.Item>
        <Form.Item label="项目名称" name="name" required={true}>
          <Input placeholder='输入项目名称'/>
        </Form.Item>
        <Form.Item label="项目来源" name="source" required={true}>
          <Input placeholder='输入项目来源'/>
        </Form.Item>
        <Form.Item label="项目类型" name='type' required={true}>
          <Select>
            <Option value="1">国家级项目</Option>
            <Option value="2">省部级项目</Option>
            <Option value="3">市厅级项目</Option>
            <Option value="4">企业合作项目</Option>
            <Option value="5">其他类型项目</Option>
          </Select>
        </Form.Item>
        <Form.Item label="项目总经费" name="totalFunding" required={true}>
          <Input placeholder='输入项目总经费'/>
        </Form.Item>
        <Form.Item label="开始年份" name='startYear' {...config}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="结束年份" name='endYear' {...config}>
          <DatePicker />
        </Form.Item>
        <Form.List
          name="participants"
          rules={
            [{
              validator: async (_, participants: Part[]) => {
                if (!participants||participants.length === 0) {
                  return Promise.reject(new Error('至少需要 1 个参与者'));
                }
              },},]
            }
        >
          {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...restField },index) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                label={index===0 ? '项目参与者姓名': ''}
                {...restField}
                name={[name, 'name']}
                rules={[{ required: true, message: '缺少姓名' }]}
              >
                <Input placeholder="项目参与者姓名" />
              </Form.Item>
              <Form.Item
                label={index===0 ? '承担经费': ''}
                {...restField}
                name={[name, 'amount']}
                rules={[{ required: true, message: '缺少承担经费' }]}
              >
                <Input placeholder="参与者承担经费" />
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
                  添加参与者
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