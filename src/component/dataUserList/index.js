import React from "react";
import { Card } from "antd";

function DataUserList({ img, name, id }) {
  return (
    <div>
      <Card
        hoverable
        style={{ width: 200 }}
        cover={<img alt={name} src={img} />}
      >
        <Card.Meta title={name} description={id} />
      </Card>
    </div>
  );
}

export default DataUserList;
