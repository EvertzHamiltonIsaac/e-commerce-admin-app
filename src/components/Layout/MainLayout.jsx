import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { ItemsLayout } from "../../utils/ItemsLayout";
import './layoutStyles.css';
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { IoIosNotifications } from "react-icons/io"

/**
   * @typedef {Object} IHandleOnClick
   * @property {string} key
   * 
   * @param {IHandleOnClick} key 
   */

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();
  const navigate = useNavigate();

  const handleOnClick = ({key}) => {
    if(key === 'signout'){
      //! Nada Todavia
    }else{
      navigate(key);
    }
  };
  
  //! En la linea 33 debes hacer una logica para que coja la inicial del primer nombre y el primer apellido.
  //! Centrarlo un poco mas tambien.
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'var(--color-black-main)' }}>
        <div className="logo">
          <span>Hola</span>
          {/* <img style={{ width: '160px'}} src="public\Mesa de trabajo 7.png" alt="Imagen" /> */}
        </div>
        <Menu 
        
        theme="dark" 
        mode="inline" 
        defaultSelectedKeys={[""]} 
        items={ItemsLayout} 
        className="admin__options" 
        onClick={(key) => handleOnClick(key)}

        />
      </Sider>
      <Layout>
        <Header className="layout-header">
          <Button className="layout-header-sider-button" icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />} onClick={() => setCollapsed(!collapsed)} />

          <div className="layout-header-user-info-container">
            <div className="header-notification-icon-container position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge rounded-circle p-1 position-absolute">3</span>
            </div>

            <div className="header-user-info-img-container">
              <img src="public\persona-e1533759204552.jpg" alt="" />
            </div>
            <div className="header-user-info-container">
              <h6>Evertz Hamilton</h6>
              <p>EvertzHamilton@gmail.com</p>
            </div>
          </div>

        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            backgroundColor: 'white'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
