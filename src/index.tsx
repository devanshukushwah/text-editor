import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Card, ConfigProvider, theme } from "antd";
import Header from "./component/Header/Header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
