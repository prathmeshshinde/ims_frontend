import { RadioChangeEvent, Space } from "antd";
import React, { useState } from "react";
import { IQuestions } from "../Interface/IQuestions";
import { Typography, Radio } from "antd";

const { Title, Text } = Typography;

interface IProps {
  question: IQuestions;
  ans: any;
  setAns: any;
}

const Questions: React.FC<IProps> = ({ question, setAns, ans }) => {
  const [value, setValue] = useState();

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);

    ans.map((item: any, index: any) => {
      if (item.question_id === question.question_id) {
        ans.splice(index, 1);
      }
    });

    setAns((prevState: any) => [
      ...prevState,
      {
        question_id: question.question_id,
        correct: e.target.value,
      },
    ]);
  };

  return (
    <div style={{ margin: "30px 50px" }}>
      <div style={{ display: "flex" }}>
        <p style={{ margin: "0px 10px 0px 0px" }}>{question.question_id}.</p>
        <p>{question.question}</p>
      </div>
      <div style={{ margin: "10px 0px" }}>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={"a"}>{question.a}</Radio>
            <Radio value={"b"}>{question.b}</Radio>
            <Radio value={"c"}>{question.c}</Radio>
            <Radio value={"d"}>{question.d}</Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Questions;
