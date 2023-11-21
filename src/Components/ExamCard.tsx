import React from "react";
import { Flex, Typography } from "antd";

const { Title, Text } = Typography;

interface IProps {
  logo: any;
  img: any;
  text: string;
  points: string;
}

const ExamCard: React.FC<IProps> = ({ logo, img, text, points }) => {
  return (
    <div className="exam-card">
      <div
        className="header-card"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      {logo}
      <Flex
        justify="space-between"
        align="items-center"
        style={{ padding: "10px 20px 20px 20px" }}
      >
        <div style={{ color: "#fff" }}>
          <Title level={4} style={{ color: "#fff" }}>
            {text}
          </Title>
          <Text style={{ fontWeight: 500 }}>10 Questions</Text>
        </div>
        <div style={{ marginTop: "5px" }}>
          <Text style={{ fontWeight: 400, color: "#fff" }}>{points}</Text>
        </div>
      </Flex>
    </div>
  );
};

export default ExamCard;
