import {
  AppstoreAddOutlined,
  DashboardTwoTone,
  DesktopOutlined,
  HomeOutlined,
  LogoutOutlined,
  PieChartOutlined,
  ProfileOutlined,
  ProjectOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, Modal, Typography, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IndexBooking from "../components/booking/IndexBooking";
import IndexRouteHall from "../components/cinemahall/IndexRoute";
import IndexCustomer from "../components/customer";
import IndexDashboard from "../components/dashboard";
import IndexEmployee from "../components/employee/IndexEmployee";
import IndexFilm from "../components/film/IndexFilm";
import IndexRoutePrice from "../components/price/IndexRoutePrice";
import IndexProduct from "../components/product";
import IndexRoutePro from "../components/promotion/IndexRoutePro";
import IndexRouter from "../components/show/IndexRouter";
import IndexTicketRefund from "../components/ticketsRefund/IndexFilm";
import UserInfo from "../components/user/UserIndex";
import tokenService from "../service/token.service";
import "./HomePageStyle.scss";

import { ToastContainer } from "react-toastify";
import RevenueComponent from "../components/statistic/RevenueComponent";
import CustomerStatitisComponent from "../components/statistic/customer/CustomerStatitisComponent";
import FilmStatisticComponent from "../components/statistic/film/FilmStatisticComponent";
import PromotionStatitisComponent from "../components/statistic/promotion/PromotionStatitisComponent";
import RefundStatitisComponent from "../components/statistic/refund/RefundStatitisComponent";
import IndexTicket from "../components/tickets/IndexFilm";
import { MESSAGE_NOT_ACCEPT } from "../constant";
import { notifyWarn } from "../utils/Notifi";
const { Header, Content, Footer, Sider } = Layout;

const { Text } = Typography;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "1", <DashboardTwoTone />),
  getItem("Quản lý vé", "sub00", <DesktopOutlined />, [
    getItem("Đặt vé", "2"),
    getItem("Vé đã đặt", "9"),
    getItem("Vé hoàn trả", "10"),
  ]),

  // getItem("Quản lý phim", "sub1", <UserOutlined />, [
  //   getItem("Danh sách phim", "3"),
  //   getItem("Quản lý suất chiếu", "4"),
  // ]),
  // getItem("Quản lý rạp", "sub4", <HomeOutlined />, [getItem("Rạp", "13")]),

  getItem("Quản lý khuyến mãi", "19", <ThunderboltOutlined />),

  getItem("Quản lý khách hàng", "11", <TeamOutlined />),

  getItem("Quản lý sản phẩm", "12", <ProjectOutlined />, [
    getItem("Sản phẩm", "20"),
    getItem("Bảng giá", "21"),
  ]),

  getItem("Thống kê", "18", <PieChartOutlined />, [
    getItem("Doanh số bán hàng", "1000"),
    getItem("Khuyến mãi", "1001"),
    getItem("Phim", "1002"),
    getItem("Khách hàng", "1003"),
    getItem("Vé hoàn trả", "1004"),
  ]),
];

const itemManager = [
  getItem("Dashboard", "1", <DashboardTwoTone />),
  getItem("Quản lý vé", "sub00", <DesktopOutlined />, [
    // getItem("Đặt vé", "2"),
    getItem("Vé đã đặt", "9"),
    getItem("Vé hoàn trả", "10"),
  ]),

  getItem("Quản lý phim", "3", <VideoCameraOutlined />),
  // getItem("Quản lý phim", "sub1", <UserOutlined />, [
  // ]),
  getItem("Quản lý suất chiếu", "4", <AppstoreAddOutlined />),

  getItem("Quản lý rạp", "13", <HomeOutlined />),

  getItem("Quản lý khuyến mãi", "19", <ThunderboltOutlined />),

  getItem("Quản lý khách hàng", "11", <TeamOutlined />),

  getItem("Quản lý sản phẩm", "12", <ProjectOutlined />, [
    getItem("Sản phẩm", "20"),
    getItem("Bảng giá", "21"),
  ]),
  // getItem("Hệ thống", "sub100", <ProjectOutlined />, [
  //   getItem("Nhân viên", "15"),
  // ]),
  getItem("Quản lý nhân viên", "15", <UserOutlined />),
  getItem("Thống kê", "18", <PieChartOutlined />, [
    getItem("Doanh số bán hàng", "1000"),
    getItem("Khuyến mãi", "1001"),
    getItem("Phim", "1002"),
    getItem("Khách hàng", "1003"),
    getItem("Vé hoàn trả", "1004"),
  ]),
];

const HomePage = () => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.user);
  const cinema = useSelector((state) => state.cinema);
  const isBooking = useSelector((state) => state.isBooking);

  //model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleLogout();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [open, setOpen] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  //click item in tabbar -> render component
  const [itemClicked, setItemClicked] = useState(1);

  //onclich item in menu
  function onClick(info) {
    if (itemClicked !== 2 && isBooking) {
      notifyWarn(MESSAGE_NOT_ACCEPT);
    } else {
      setItemClicked(+info.key);
    }
  }

  const onClickMenuUser = (info) => {
    //if user click logout
    if (info.key === "logout") {
      //show model
      showModal();
    } else if (info.key === "profile") {
    } else if (info.key === " setting") {
    }
  };

  // console.log("home page");
  const RenderHome = () => {
    if (itemClicked === 1) {
      return <IndexDashboard />;
    } else if (itemClicked === 2) {
      return <IndexBooking />;
    } else if (itemClicked === 11) {
      return <IndexCustomer />;
    } else if (itemClicked === 11) {
    } else if (itemClicked === 15) {
      return <IndexEmployee />;
    } else if (itemClicked === 3) {
      return <IndexFilm />;
    } else if (itemClicked === 4) {
      return <IndexRouter />;
    } else if (itemClicked === 100) {
      return <UserInfo />;
    } else if (itemClicked === 19) {
      return <IndexRoutePro />;
    } else if (itemClicked === 20) {
      return <IndexProduct />;
    } else if (itemClicked === 21) {
      return <IndexRoutePrice />;
    } else if (itemClicked === 13) {
      return <IndexRouteHall />;
    } else if (itemClicked === 9) {
      return <IndexTicket />;
    } else if (itemClicked === 10) {
      return <IndexTicketRefund />;
    } else if (itemClicked === 1000) {
      return <RevenueComponent />;
    } else if (itemClicked === 1003) {
      return <CustomerStatitisComponent />;
    } else if (itemClicked === 1002) {
      return <FilmStatisticComponent />;
    } else if (itemClicked === 1001) {
      return <PromotionStatitisComponent />;
    } else if (itemClicked === 1004) {
      return <RefundStatitisComponent />;
    }
    return <IndexDashboard />;
  };

  //handle show info user
  const handleUserInfo = () => {
    //console.log("user info");
    setItemClicked(100);
  };

  //handle logout
  const handleLogout = () => {
    //redict to login page
    navigator("/login");
    //delete user in local storage
    tokenService.removeUser();
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/account-setting") {
      setItemClicked(100);
    }
  }, []);

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="scroll-bar"
      >
        <div
          style={{
            // height: 24,
            textAlign: "center",
            margin: 16,
            background: "#001529",
          }}
        >
          <img
            src="https://www.galaxycine.vn/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fgalaxy-logo-mobile.074abeac.png&w=128&q=75"
            alt="logo"
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={user?.position === 1 ? itemManager : items}
          onClick={onClick}
          style={{
            "& li": {
              paddingLeft: 0,
            },
            "&& .ant-menu-item": {
              paddingLeft: 0,
            },
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              padding: "0 1rem",
            }}
          >
            <div>
              <p style={{ fontWeight: "700", fontSize: "16px" }}>
                {user?.position === 1 ? "QUẢN LÝ" : cinema?.name}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{
                  marginRight: "1rem",
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                Hi,{" "}
                {user?.firstName?.toLowerCase() +
                  " " +
                  user?.lastName?.toLowerCase()}
              </p>

              <Dropdown
                overlay={
                  <>
                    <Menu onClick={onClickMenuUser}>
                      <Menu.Item key="0">
                        <div style={{ width: "20rem", display: "flex" }}>
                          {user?.image ? (
                            <Avatar
                              src={<img src={user?.image} />}
                              style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",

                                width: "35px",
                                height: "35px",
                                marginRight: "12px",
                              }}
                            >
                              {user?.lastName}
                            </Avatar>
                          ) : (
                            <Avatar
                              style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",

                                width: "35px",
                                height: "35px",
                                marginRight: "12px",
                              }}
                            >
                              {user?.lastName?.substring(0, 1)}
                            </Avatar>
                          )}
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Text
                              style={{
                                fontWeight: "500",
                                color: "#333",
                                textTransform: "capitalize",
                              }}
                            >
                              {user?.firstName?.toLowerCase() +
                                " " +
                                user?.lastName?.toLowerCase()}
                            </Text>
                            <Text
                              style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#abb4bc",
                              }}
                            >
                              {user?.position === 1 ? "Quản Lý" : "Nhân Viên"}
                            </Text>
                          </div>
                        </div>
                      </Menu.Item>

                      <Menu.Item
                        key="profile"
                        style={{ padding: " 12px 12px" }}
                        onClick={() => handleUserInfo()}
                      >
                        {" "}
                        <div onClick={() => handleUserInfo()}>
                          <ProfileOutlined />
                          <Text style={{ marginLeft: "12px" }}>Thông tin</Text>
                        </div>
                      </Menu.Item>
                      {/* <Menu.Item
                        key="setting"
                        style={{ padding: " 12px 12px" }}
                      >
                        {" "}
                        <div>
                          <SettingOutlined />
                          <Text style={{ marginLeft: "12px" }}>Cài đặt</Text>
                        </div>
                      </Menu.Item> */}
                      <Menu.Item key="logout" style={{ padding: " 12px 12px" }}>
                        <div onClick={() => showModal()}>
                          <LogoutOutlined />
                          <Text style={{ marginLeft: "12px" }}>Đăng xuất</Text>
                        </div>
                      </Menu.Item>
                    </Menu>
                  </>
                }
                trigger={["click"]}
              >
                <div
                  className="avt_group"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "0.5rem",

                    justifyContent: "space-between",
                  }}
                >
                  {user?.image ? (
                    <Avatar
                      src={<img src={user?.image} />}
                      style={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",

                        width: "35px",
                        height: "35px",
                        marginRight: "12px",
                      }}
                    >
                      {user?.lastName}
                    </Avatar>
                  ) : (
                    <Avatar
                      style={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",

                        width: "35px",
                        height: "35px",
                        marginRight: "12px",
                      }}
                    >
                      {user?.lastName?.substring(0, 1)}
                    </Avatar>
                  )}
                  <Text
                    style={{
                      fontWeight: "500",
                      color: "#333",
                      textTransform: "capitalize",
                    }}
                  >
                    {user?.firstName?.toLowerCase() +
                      " " +
                      user?.lastName?.toLowerCase()}
                  </Text>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            padding: "0 16px",
            overflow: "auto",
          }}
        >
          <div
            style={{
              //padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
            }}
          >
            <RenderHome />
          </div>
        </Content>
      </Layout>
      <Modal
        title="Đăng xuất"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn đăng xuất không?</p>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Layout>
  );
};
export default HomePage;
