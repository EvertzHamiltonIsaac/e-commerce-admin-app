import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ItemsLayout } from "../../utils/ItemsLayout";
import DropDown from "../app/dropdown/DropDown";
import "./layoutStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    className: "",
    title: "",
    href: "",
    isSeparator: true,
    icon: "",
  },
  {
    className: "dropdown_item_link",
    title: "Sign Out",
    href: "",
    isSeparator: false,
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
  },
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isBroken, setIsBroken] = useState(false)
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
        className={`shadow-sm ${collapsed && 'sider'}`}
         trigger={null}
        // collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setIsBroken(broken);
        }}
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed);
        }}
        style={{ backgroundColor: "var(--color-blue-secundary)" }}
      >
        <div className="logo shadow-sm p-1">
          <img
            className={`${
              collapsed ? "logo_image_collapsed" : "logo_image_none_collapsed"
            }`}
            src={`${collapsed ? "/Logo.png" : "/Logo_CL.png"}`}
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
          {
            isBroken &&
            <div onClick={() => setCollapsed(!collapsed)}
            style={{width: '30px', margin:'10px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesomeIcon icon={faBars} className="fs-1"/>
            </div>
          }
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
            {showDropDown && <DropDown items={DropDownItems} />}
          </div>
        </Header>

        <Content
          style={{
            margin: "24px",
            // padding: 24,
            minHeight: 280,
            backgroundColor: "white",
          }}
        >
          <Outlet />
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
