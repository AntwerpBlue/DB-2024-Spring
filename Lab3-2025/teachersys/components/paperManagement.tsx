'use client';

import axios,{AxiosError} from 'axios';
import { Author, Paper } from '@/app/lib/types'
import { Form, Input, DatePicker, Button, Select, Radio, Space, message, RadioChangeEvent } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import '@ant-design/v5-patch-for-react-19';

const { Option } = Select;

export default function PaperManagement(){
    const [form] = Form.useForm<Paper>();
    const config = {
      rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
    };
    const addAuthor = () => {
      const currentAuthors = form.getFieldValue('authors') || [];
      form.setFieldsValue({
        authors: [...currentAuthors, { name: '', isCorresponding: false }]
      });
    }
    const handlecorrespondingChange = (e: RadioChangeEvent) => {
      const selectedIndex = e.target.value;
      const authors = form.getFieldValue('authors');
      const updatedAuthors:Author[] = authors.map((author:Author, index:number) => ({
        ...author,
        isCorresponding: index === selectedIndex
      }));
      
      form.setFieldsValue({
        authors: updatedAuthors,
        correspondingAuthorIndex: selectedIndex // 关键！保持Radio选中状态
      });
    }
    const handleSubmit = async () => {
      try{
        await form.validateFields();
        const values=form.getFieldsValue();
        console.log(values);
        const submissionData = {
          title: values.title,
          source: values.source,
          publishYear: values.publishYear?.format('YYYY'), // 日期转为年份字符串
          type: values.type,
          level: values.level,
          authors: values.authors.map((author)=> author.name),
          correspondingAuthorIndex: values.authors.findIndex(author=>author.isCorresponding),
        };
        console.log(submissionData);
        await axios.post('/api/paper', submissionData);
        message.success('论文信息提交成功');
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
          authors: [{name: '', isCorresponding: false}],
        }}
        style={{ maxWidth: 600 }}>
        <Form.Item label="论文名称" name="title" required={true}>
          <Input placeholder='输入论文名称'/>
        </Form.Item>
        <Form.Item label="发表源" name="source" required={true}>
          <Input placeholder='输入论文发表源'/>
        </Form.Item>
        <Form.Item label="发表年份" name='publishYear' {...config}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="论文类型" name='type' required={true}>
          <Select>
            <Option value="1">full paper</Option>
            <Option value="2">short paper</Option>
            <Option value="3">poster paper</Option>
            <Option value="4">demo paper</Option>
          </Select>
        </Form.Item>
        <Form.Item label="论文级别" name='level' required={true}>
          <Select>
            <Option value="1">CCF-A</Option>
            <Option value="2">CCF-B</Option>
            <Option value="3">CCF-C</Option>
            <Option value="4">中文CCF-A</Option>
            <Option value="5">中文CCF-B</Option>
            <Option value="6">无级别</Option>
          </Select>
        </Form.Item>
        <Form.List
          name="authors"
          rules={
            [{
              validator: async (_, authors: Author[]) => {
                if (!authors||authors.length === 0) {
                  return Promise.reject(new Error('至少需要 1 个作者'));
                }
                const hasCorresponding = authors.some(author => author?.isCorresponding);
                if (!hasCorresponding) {
                  return Promise.reject(new Error("请指定通讯作者"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              <Form.Item >
                <Radio.Group value={form.getFieldValue('correspondingAuthorIndex')} onChange={handlecorrespondingChange}>
                  <Space direction="vertical">
                    {fields.map((field, index) => {
                      const {key, ...restField} = field; 
                      return (
                        <Form.Item
                          label={index === 0 ? '作者' : ''}
                          required={true}
                          key={field.key}
                        >
                          <Space align='baseline'>
                            <Radio key={field.key} value={index}/>
                            <Form.Item
                              {...restField}
                              name={[field.name, 'name']}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "请输入作者姓名",
                                },
                              ]}
                              noStyle
                            >
                              <Input placeholder="作者姓名" style={{ width: '60%' }} />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                              />
                            )}
                          </Space>
                        </Form.Item>
                      )}
                    )}
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button type="dashed" onClick={addAuthor} style={{ width: '60%' }} icon={<PlusOutlined />} >
                  添加作者
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