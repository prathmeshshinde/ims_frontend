import React from "react";
import { MailOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ISignUp } from "../Interface/ISignUp";
import { ImsService } from "../Services/ImsServices";
const { Title, Text } = Typography;

interface IProps {
  failed: any;
  success: any;
}

const SignUp: React.FC<IProps> = ({ failed, success }) => {
  const navigate = useNavigate();

  const createPointsTableForUser = (localStore: any) => {
    const userPointDetails = {
      user_id: localStore,
      js_point: 0,
      react_point: 0,
      html_point: 0,
      css_point: 0,
    };

    ImsService.postUserOnPointsTable(userPointDetails)
      .then((res) => {
        if (res && res.data) {
          success("Registered Successfully");
          navigate("/");
        }
      })
      .catch((error) => {
        failed(error.message);
      });
  };

  const onFinish = (values: ISignUp) => {
    if (values.mobileNo.length !== 10) {
      return failed("Please enter valid mobile number");
    }

    ImsService.signup(values)
      .then((res) => {
        if (res && res.data) {
          createPointsTableForUser(res.data[2]);
        }
      })
      .catch((err) => {
        failed(err.message);
      });
  };

  return (
    <div className="login-page">
      <div className="signup-card">
        <Title
          level={3}
          style={{
            textAlign: "center",
            padding: "0px 0px 10px 0px",
            margin: "0px",
            color: "#1677ff",
          }}
        >
          Sign Up
        </Title>
        <Title
          level={5}
          type="danger"
          style={{
            textAlign: "center",
            margin: "0px 0px 10px 0px",
          }}
        ></Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Flex gap="middle">
            <Form.Item
              name="fname"
              rules={[
                {
                  required: true,
                  message: "Please enter your first name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="First Name"
                className="sign-field"
              />
            </Form.Item>
            <Form.Item
              name="lname"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Last Name"
                className="sign-field"
              />
            </Form.Item>
          </Flex>
          <Form.Item
            name="emailId"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please enter your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="sign-field"
            />
          </Form.Item>
          <Form.Item
            name="mobileNo"
            rules={[
              {
                required: true,
                message: "Please enter your mobile number!",
              },
            ]}
          >
            <Input
              prefix={<MobileOutlined className="site-form-item-icon" />}
              placeholder="Mobile No"
              className="sign-field"
              type="number"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Text type="warning">
              Plese enter your correct email <br />
              you will receive an username and password on it.
            </Text>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
