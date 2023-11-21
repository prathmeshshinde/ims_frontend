import React, { useState } from "react";
import "./App.css";
import Login from "./Pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { message } from "antd";
import SignUp from "./Pages/SignUp";
import Navbar from "./Navbar/Navbar";
import { AuthProvider } from "./Context/AuthContext";
import JavascriptTest from "./Pages/JavascriptTest";
import ReactTest from "./Pages/ReactTest";
import HtmlTest from "./Pages/HtmlTest";
import CssTest from "./Pages/CssTest";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const [javascriptPoint, setJavascriptPoint] = useState(0);
  const [htmlPoint, setHtmlPoint] = useState(0);
  const [cssPoint, setCssPoint] = useState(0);
  const [reactPoint, setReactPoint] = useState(0);

  const success = (text: string) => {
    messageApi.open({
      type: "success",
      content: text,
      className: "custom-class",
      duration: 5,
    });
  };

  const failed = (text: string) => {
    messageApi.open({
      type: "error",
      content: text,
      className: "custom-class",
      duration: 5,
    });
  };

  return (
    <AuthProvider>
      <div className="App">
        {contextHolder}

        {location.pathname !== "/" && location.pathname !== "/signup" ? (
          <Navbar />
        ) : null}

        <Routes>
          <Route
            path="/"
            element={<Login success={success} failed={failed} />}
          />
          <Route
            path="/signup"
            element={<SignUp failed={failed} success={success} />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                javascriptPoint={javascriptPoint}
                htmlPoint={htmlPoint}
                cssPoint={cssPoint}
                reactPoint={reactPoint}
                setCssPoint={setCssPoint}
                setHtmlPoint={setHtmlPoint}
                setReactPoint={setReactPoint}
                setJavascriptPoint={setJavascriptPoint}
              />
            }
          />
          <Route
            path="/javascript"
            element={<JavascriptTest success={success} failed={failed} />}
          />
          <Route
            path="/react"
            element={<ReactTest success={success} failed={failed} />}
          />

          <Route
            path="/html"
            element={<HtmlTest success={success} failed={failed} />}
          />

          <Route
            path="/css"
            element={<CssTest success={success} failed={failed} />}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
