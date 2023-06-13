import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { ItemsLayout } from "../../utils/ItemsLayout";
import './layoutStyles.css';

const { Header, Sider, Content } = Layout;



const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();

  console.log(ItemsLayout);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: 'var(--color-black-main)'}}>
        <div className="logo" style={{
          display: 'flex', 
          justifyContent: 'center', 
          gap: `${collapsed === false ? '1em' : '0em'}`, 
          alignItems: 'center',
          backgroundColor: 'var(--color-red-wine)',
          padding: '2.5em'
          }}>
          <div style={{ width: '50px', backgroundColor: 'white', padding: '5px', borderRadius: '.5em' }}><img style={{ width: '100%' }} src="https://companieslogo.com/img/orig/AMZN-e9f942e4.png?t=1632523695" alt="Imagen" /></div>
          <div style={{width: `${collapsed ? '0em' : 'auto'}`, overflow: 'hidden', transition: 'width 1s ease'}}>
            <h6>Ginger Admin</h6>
          </div>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[""]} items={ItemsLayout} className="admin__options"/>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: 'white'
            // background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            backgroundColor: 'white'
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
