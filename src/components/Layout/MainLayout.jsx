import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ItemsLayout } from "../../utils/ItemsLayout";
import DropDown from "../app/dropdown/DropDown";
import "./layoutStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const { Header, Sider, Content } = Layout;

/**
 * @typedef {Object} IHandleOnClick
 * @property {string} key
 *
 * @param {IHandleOnClick} key
 */

const DropDownItems = [
  {
    className: "dropdown_item_link",
    title: "View Profile",
    href: "",
    isSeparator: false,
    icon: <FontAwesomeIcon icon={faUser}/>
  },
  {
    className: "",
    title: "",
    href: "",
    isSeparator: true,
    icon: ''
  },
  {
    className: "dropdown_item_link",
    title: "Sign Out",
    href: "",
    isSeparator: false,
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />
  },
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showDropDown, setshowDropDown] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleOnClick = ({ key }) => {
    if (key === "signout") {
      //! Nada Todavia
    } else {
      navigate(key);
    }
  };

  //! En la linea 33 debes hacer una logica para que coja la inicial del primer nombre y el primer apellido.
  //! Centrarlo un poco mas tambien.
  return (
    <Layout>
      <Sider
        className="shadow-sm"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "var(--color-blue-secundary)" }}
      >
        <div className="logo shadow-sm p-1">
          <img
            className={`${collapsed ? "" : "logo_image_none_collapsed"}`}
            src={`${collapsed ? "" : "/logo_column.png"}`}
            alt="Imagen"
            onClick={() => setCollapsed(!collapsed)}
          />
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
          <div className="layout-header-user-info-container dropdown user-select-none">
            
            {/* <div className="header-notification-icon-container position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge rounded-circle p-1 position-absolute">
                3
              </span>
            </div> */}
            
            <div
              className="header-user-info-img-container"
              style={{ cursor: "pointer" }}
              onClick={() => setshowDropDown(!showDropDown)}
            >
              <img src="/persona-e1533759204552.jpg" alt="" />
            </div>
            
            <div
              className="header-user-info-container"
              style={{ cursor: "pointer" }}
              onClick={() => setshowDropDown(!showDropDown)}
              // role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"
            >
              <h6>Evertz Hamilton</h6>
              <p>EvertzHamilton@gmail.com</p>
            </div>
            {
              showDropDown && <DropDown items={DropDownItems} />
            }
          </div>   
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
