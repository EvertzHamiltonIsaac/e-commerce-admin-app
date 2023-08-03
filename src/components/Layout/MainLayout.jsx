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
import { getInitials } from "../../utils/GetInitials";
import useHideContainer from "../../hooks/useHideContainer";
const { Header, Sider, Content } = Layout;

/**
 * @typedef {Object} IHandleOnClick
 * @property {string} key
 *
 * @param {IHandleOnClick} key
 */

const DropDownItems = [
  // {
  //   className: "dropdown_item_link",
  //   title: "View Profile",
  //   href: "",
  //   isSeparator: false,
  //   icon: <FontAwesomeIcon icon={faUser} />,
  // },
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
    href: "/auth/sign-in",
    onClick: () => {
      localStorage.clear();
    },
    isSeparator: false,
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
  },
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [showDropDown, setshowDropDown] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const {ref, isVisible, setVisible} = useHideContainer();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleOnClick = ({ key }) => {
    if (key === "signout") {
      console.log(key);
      //! Nada Todavia
    } else {
      navigate(key);
    }
  };

  return (
    <Layout>
      <Sider
        className={`shadow-sm sider_responsive ${collapsed && "sider"}`}
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
          {isBroken && (
            <div
              onClick={() => setCollapsed(!collapsed)}
              style={{
                width: "30px",
                margin: "10px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon icon={faBars} className="fs-1" />
            </div>
          )}
          <div className="layout-header-user-info-container dropdown user-select-none" ref={ref} >
            <div className="image_profile" style={{ cursor: "pointer" }} onClick={() => setVisible(!isVisible)}>
              {user?.images ? (
                <img
                  src={user?.images[0].url ? user?.images[0].url : "/persona-e1533759204552.jpg"}
                  alt=""
                />
              ) : (
                <div className="circle">
                  <span
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="fs-6 fw-bold"
                  >
                    {getInitials(`${user?.firstName} ${user?.lastName}`)}
                  </span>
                </div>
              )}
            </div>

            <div
              className="header-user-info-container"
              style={{ cursor: "pointer" }}
              onClick={() => setVisible(!isVisible)}
            >
              <span className="fw-bold text-light">{`${user?.firstName} ${user?.lastName}`}</span>
              <span className="text-light">{user?.email}</span>
            </div>
            {isVisible && (
              <DropDown
                items={DropDownItems}
                render={
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: '#EEEEEE',
                      alignItems: "center",
                      gap: ".5em",
                      height: "70px",
                      padding: '10px'
                    }}
                  >
                    <div className="image_profile">
                      {user?.images ? (
                        <img
                          src={
                            user?.images ? "" : "/persona-e1533759204552.jpg"
                          }
                          alt=""
                        />
                      ) : (
                        <div
                          className="circle"
                          style={{
                            backgroundColor: "var(--color-blue-secundary)",
                          }}
                        >
                          <span
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            className="fs-6 fw-bold text-light"
                          >
                            {getInitials(
                              `${user?.firstName} ${user?.lastName}`
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      className="dropdown-user-info-container"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="fw-bold ">{`${user?.firstName} ${user?.lastName}`}</span>
                      <span className="">{user?.email}</span>
                    </div>
                  </div>
                }
              />
            )}
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
