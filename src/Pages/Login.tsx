import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { ImsService } from "../Services/ImsServices";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;
// oIRULNgWbB
interface IProps {
  success: any;
  failed: any;
}

const Login: React.FC<IProps> = ({ success, failed }) => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const loginDetails = { username: values.username, pass: values.pass };

    ImsService.login(loginDetails)
      .then((res) => {
        if (
          res &&
          res.data !== 0 &&
          res.data !== "Incorrect password" &&
          res.data !== "User not found"
        ) {
          if (values.remember === true) {
            localStorage.setItem("username", values.username);
          }
          sessionStorage.setItem("username", values.username);
          navigate("/dashboard");
          success("Logged in successfully!");
        } else {
          setError(res.data);
        }
      })
      .catch((err) => {
        failed(err.message);
      });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <Title
          level={3}
          style={{
            textAlign: "center",
            padding: "0px 0px 10px 0px",
            margin: "0px",
            color: "#1677ff",
          }}
        >
          Login
        </Title>
        <Title
          level={5}
          type="danger"
          style={{
            textAlign: "center",
            margin: "0px 0px 10px 0px",
          }}
        >
          {error}
        </Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              className="input-field"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="pass"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="/">
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/signup">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
