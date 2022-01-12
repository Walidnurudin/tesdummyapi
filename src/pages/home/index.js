import React, { useEffect } from "react";
import { Navbar } from "../../component";
import { Row, Col } from "antd";
import axios from "../../utils/axios";

function Home() {
  const getAllData = async () => {
    try {
      const userList = await axios.get("user?limit=10");
      console.log(userList);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <Navbar />
      <Row style={{ padding: "0 4%", marginTop: "50px" }}>
        <Col span={24} md={8} style={{ backgroundColor: "red" }}>
          1
        </Col>
        <Col span={24} md={16} style={{ backgroundColor: "black" }}>
          2
        </Col>
      </Row>
    </div>
  );
}

export default Home;
