import React from "react";
import Home from "./page/Home/Home";
import Header from "./component/Header/Header";
import { Card, Layout } from "antd";

function App() {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {/* <Layout.Header>
          <Header />
        </Layout.Header> */}
        <Layout.Content style={{ flex: "1 0 auto" }}>
          {/* <Card
            style={{
              // width: "100vw",
              // height: "calc(100vh - 100px)",
              borderRadius: 0,
              flex: "1 0 auto",
            }}
          > */}
          <Card style={{ width: "100%", height: "100vh", borderRadius: 0 }}>
            <Home />
          </Card>
        </Layout.Content>
      </Layout>
    </>
  );
}

export default App;
