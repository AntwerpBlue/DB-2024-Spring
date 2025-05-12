'use client'; // 必须声明为客户端组件

import { Layout, Menu, theme}  from 'antd';
import { FileWordOutlined, ProjectOutlined , TeamOutlined , BarChartOutlined } from '@ant-design/icons';
import { useState } from 'react';

import PaperManagement from '@/components/paperManagement';
import ProjectManagement from '@/components/projectManagement';
import CourseManagement from '@/components/courseManagement';
import Statistics from '@/components/statistics';

const { Header, Content, Sider } = Layout;


// 定义菜单项
const menuItems = [
  {
    key: '1',
    icon: <FileWordOutlined />,
    label: '论文发表',
    component: <PaperManagement />
  },
  {
    key: '2',
    icon: <ProjectOutlined />,
    label: '承担项目',
    component: <ProjectManagement />
  },
  {
    key: '3',
    icon: <TeamOutlined />,
    label: '主讲课程',
    component: <CourseManagement />
  },
  {
    key: '4',
    icon: <BarChartOutlined />,
    label: '统计查询',
    component: <Statistics />
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [selectedKey, setSelectedKey] = useState('1');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentComponent = menuItems.find(item => item.key === selectedKey)?.component;

  return (
    <html>
      <body>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => console.log(broken)}
            onCollapse={(collapsed, type) => console.log(collapsed, type)}
          >
            <div className="demo-logo-vertical" />
            <Menu 
              theme="dark" 
              mode="inline" 
              selectedKeys={[selectedKey]} 
              onClick={({ key }) => setSelectedKey(key)}
              items={menuItems.map(item=>({
                key: item.key,
                icon: item.icon,
                label: item.label
              }))} />
          </Sider>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ padding: 24 }}>
            {currentComponent}
          </Content>
        </Layout>
      </body>
    </html>
  );
}

