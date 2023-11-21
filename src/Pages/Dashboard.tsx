import React, { useEffect, useState } from "react";
import ExamCard from "../Components/ExamCard";
import { Flex, Progress } from "antd";
import { ReactComponent as ReactLogo } from "../Assets/react.svg";
import { ReactComponent as HTMLLogo } from "../Assets/html.svg";
import { ReactComponent as CSSLogo } from "../Assets/css.svg";
import { ReactComponent as JavasciptLogo } from "../Assets/javascript.svg";
import reactImg from "../Assets/reactImg.jpg";
import htmlImg from "../Assets/htmlImg.webp";
import cssImg from "../Assets/cssImg.png";
import javascriptImg from "../Assets/javascriptImg.jpg";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { ImsService } from "../Services/ImsServices";

const { Title } = Typography;

const Dashboard: React.FC<any> = ({
  javascriptPoint,
  htmlPoint,
  cssPoint,
  reactPoint,
  setCssPoint,
  setHtmlPoint,
  setReactPoint,
  setJavascriptPoint,
}) => {
  const localStore = localStorage.getItem("username");

  const getUserPoints = async () => {
    await ImsService.getUsersPoint(localStore)
      .then((res) => {
        setCssPoint(res.data[0].css_point);
        setHtmlPoint(res.data[0].html_point);
        setReactPoint(res.data[0].react_point);
        setJavascriptPoint(res.data[0].js_point);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserPoints();
  }, []);

  return (
    <div>
      <Flex wrap="wrap" gap="small" justify="center">
        <Link to="/javascript">
          <ExamCard
            logo={
              <JavasciptLogo
                width={60}
                style={{
                  position: "absolute",
                  top: "15%",
                  left: "4%",
                  zIndex: 10,
                }}
              />
            }
            img={javascriptImg}
            text={"JavaScript"}
            points={"100 points"}
          />
        </Link>
        <Link to="/react">
          <ExamCard
            logo={
              <ReactLogo
                width={60}
                style={{
                  position: "absolute",
                  top: "15%",
                  left: "4%",
                  zIndex: 10,
                }}
              />
            }
            img={reactImg}
            text={"ReactJS"}
            points={"100 points"}
          />
        </Link>
        <Link to="/html">
          <ExamCard
            logo={
              <HTMLLogo
                width={60}
                style={{ position: "absolute", top: "15%", left: "4%" }}
              />
            }
            img={htmlImg}
            text={"HTML"}
            points={"100 points"}
          />
        </Link>
        <Link to="/css">
          <ExamCard
            logo={
              <CSSLogo
                width={60}
                style={{ position: "absolute", top: "15%", left: "4%" }}
              />
            }
            img={cssImg}
            text={"CSS"}
            points={"100 points"}
          />
        </Link>
      </Flex>
      <Flex wrap="wrap" gap="small" justify="center">
        <div style={{ margin: "20px 40px" }}>
          <Progress
            type="circle"
            percent={javascriptPoint}
            format={(percent) => (
              <p style={{ color: "#1677ff", fontSize: "20px" }}>
                {percent} Points
              </p>
            )}
          />
          <Title
            level={5}
            type="danger"
            style={{ textAlign: "center", margin: "10px 0px 0px 0px" }}
          >
            JavaScript Test
          </Title>
        </div>
        <div style={{ margin: "20px 40px" }}>
          <Progress
            type="circle"
            percent={htmlPoint}
            format={(percent) => (
              <p style={{ color: "#1677ff", fontSize: "20px" }}>
                {percent} Points
              </p>
            )}
          />
          <Title
            level={5}
            type="danger"
            style={{ textAlign: "center", margin: "10px 0px 0px 0px" }}
          >
            HTML Test
          </Title>
        </div>
        <div style={{ margin: "20px 40px" }}>
          <Progress
            type="circle"
            percent={reactPoint}
            format={(percent) => (
              <p style={{ color: "#1677ff", fontSize: "20px" }}>
                {percent} Points
              </p>
            )}
          />
          <Title
            level={5}
            type="danger"
            style={{ textAlign: "center", margin: "10px 0px 0px 0px" }}
          >
            React Test
          </Title>
        </div>
        <div style={{ margin: "20px 40px" }}>
          <Progress
            type="circle"
            percent={cssPoint}
            format={(percent) => (
              <p style={{ color: "#1677ff", fontSize: "20px" }}>
                {percent} Points
              </p>
            )}
          />
          <Title
            level={5}
            type="danger"
            style={{ textAlign: "center", margin: "10px 0px 0px 0px" }}
          >
            CSS Test
          </Title>
        </div>
      </Flex>
    </div>
  );
};

export default Dashboard;
