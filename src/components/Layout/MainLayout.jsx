import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { ItemsLayout } from "../../utils/ItemsLayout";
import './layoutStyles.css';
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { IoIosNotifications } from "react-icons/io"
import DropDown from "../app/dropdown/DropDown";

/**
   * @typedef {Object} IHandleOnClick
   * @property {string} key
   * 
   * @param {IHandleOnClick} key 
   */

const DropDownItems = [
  {
    className: 'dropdown-item',
    title: 'View Profile',
    href: '',
    isSeparator: false
  },
  {
    className: '',
    title: '',
    href: '',
    isSeparator: true
  },
  {
    className: 'dropdown-item',
    title: 'Sign Out',
    href: '',
    isSeparator: false
  },
]

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showDropDown, setshowDropDown] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();
  const navigate = useNavigate();

  const handleOnClick = ({ key }) => {
    if (key === 'signout') {
      //! Nada Todavia
    } else {
      navigate(key);
    }
  };

  //! En la linea 33 debes hacer una logica para que coja la inicial del primer nombre y el primer apellido.
  //! Centrarlo un poco mas tambien.
  return (
    <Layout>
      <Sider className="shadow-sm" trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'var(--color-blue-secundary)' }}>
        <div className="logo shadow-sm p-1">
          <img className={`${collapsed ? '' : 'logo_image_none_collapsed'}`} src={`${collapsed ? '' : '/logo_column.png'}`} alt="Imagen" onClick={() => setCollapsed(!collapsed)} />
        </div>
        <Menu

          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          items={ItemsLayout}
          className="admin__options mt-1"
          onClick={(key) => handleOnClick(key)}

        />
      </Sider>
      <Layout>
        <Header className="layout-header shadow-sm">
          <div className="layout-header-user-info-container">
            <div className="header-notification-icon-container position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge rounded-circle p-1 position-absolute">3</span>
            </div>
            <div className="header-user-info-img-container" style={{ cursor: 'pointer' }} onClick={() => setshowDropDown(!showDropDown)}>
              <img src="/persona-e1533759204552.jpg" alt="" />
            </div>
            <div className="header-user-info-container " style={{ cursor: 'pointer' }} onClick={() => setshowDropDown(!showDropDown)}>
              <h6>Evertz Hamilton</h6>
              <p>EvertzHamilton@gmail.com</p>
            </div>
            {
              <div style={{position: 'absolute', top: '8%', right: '10%'}}>
                <DropDown items={DropDownItems} />
              </div>
            }
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
