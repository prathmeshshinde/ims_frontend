import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const selectedKey = useLocation().pathname;

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const highlight = () => {
    if (selectedKey === "/") {
      return ["1"];
    } else if (selectedKey === "/about") {
      return ["2"];
    } else if (selectedKey === "/setting") {
      return ["3"];
    } else if (selectedKey === "/profile") {
      return ["4"];
    }
  };

  const items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      key: "2",
      icon: <TeamOutlined />,
      label: "About",
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Setting",
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => {
        navigate("/dashboard");
      },
    },
  ];
  return (
    <Layout className="layout">
      <Header style={{ padding: 0 }}>
        <Row className="row">
          <Col xs={20} sm={20} md={4}>
            <div className="logo">IMS</div>
          </Col>
          <Col xs={0} sm={0} md={8}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              selectedKeys={highlight()}
              items={items}
            />
          </Col>
          <Col xs={4} sm={2} md={0}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
        <Drawer
          title="Menu"
          placement="right"
          onClick={onClose}
          onClose={onClose}
          open={visible}
        >
          <Menu
            mode="vertical"
            defaultSelectedKeys={["1"]}
            selectedKeys={highlight()}
            items={items}
          />
        </Drawer>
      </Header>
    </Layout>
  );
};

export default Navbar;
