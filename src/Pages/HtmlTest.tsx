import React, { useEffect, useState } from "react";
import { ImsService } from "../Services/ImsServices";
import { Button, Divider, Flex } from "antd";
import { IQuestions } from "../Interface/IQuestions";
import Questions from "../Components/Questions";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const HtmlTest: React.FC<any> = ({ success, failed }) => {
  const [questions, setQuestions] = useState<IQuestions[]>();
  const [ans, setAns] = useState([]);
  const localstore = localStorage.getItem("username");
  const navigate = useNavigate();

  const getHtmlQuestions = () => {
    ImsService.getHtmlTestQuestions()
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((error) => {
        failed(error.message);
      });
  };

  const submitHtmlTest = () => {
    if (ans.length === 0) return failed("Please select answers!");

    let score: number = 0;

    questions?.map((item) => {
      ans.map((answers: any) => {
        if (item.question_id === answers?.question_id) {
          if (item.correct === answers?.correct) {
            score = score + 10;
          }
        }
      });
    });

    const updatedPointObj = {
      username: localstore,
      test: "html_point",
      point: score,
    };

    ImsService.updateTestPoints(updatedPointObj)
      .then((res) => {
        if (res.data) {
          navigate("/dashboard");
          success("Test submitted successfully!");
        }
      })
      .catch((error) => {
        failed(error.message);
      });
  };

  useEffect(() => {
    getHtmlQuestions();
  }, []);

  return (
    <div className="questions-div">
      <Title
        level={2}
        style={{ color: "#1677ff", textAlign: "center", margin: "20px 0px" }}
      >
        HTML Test
      </Title>
      <p
        style={{ color: "#1677ff", textAlign: "center", margin: "20px 0px" }}
      ></p>
      <div>
        {questions?.map((question, index) => {
          return (
            <div key={index} style={{ margin: "0px 0px" }}>
              <Questions question={question} setAns={setAns} ans={ans} />
              <Divider style={{ borderWidth: 2 }} />
            </div>
          );
        })}

        <Flex
          justify="center"
          gap="small"
          wrap="wrap"
          style={{ marginBottom: "50px" }}
        >
          <Button type="primary" onClick={submitHtmlTest}>
            Submit Test
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default HtmlTest;
