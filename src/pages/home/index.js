import React, { useEffect, useState } from "react";
import { Navbar, DataUserList } from "../../component";
import {
  Row,
  Col,
  Tag,
  Button,
  Card,
  Comment,
  Spin,
  Avatar,
  Alert,
} from "antd";
import axios from "../../utils/axios";

function Home() {
  const [dataTab, setDataTab] = useState([
    {
      id: 1,
      title: "Users List",
    },
    {
      id: 2,
      title: "Full User Profile",
    },
    {
      id: 3,
      title: "Posts List",
    },
    {
      id: 4,
      title: "User Posts",
    },
    {
      id: 5,
      title: "Comments List",
    },
    {
      id: 6,
      title: "Tag List",
    },
    {
      id: 7,
      title: "Post by Tag",
    },
  ]);
  const [isActive, setIsActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    isShow: false,
    msg: "",
  });

  const [dataUserList, setDataUserList] = useState([]);
  const [dataFullUserProfile, setDataFullUserProfile] = useState({});
  const [dataPostsList, setDataPostsList] = useState([]);
  const [dataUserPosts, setDataUserPosts] = useState([]);
  const [dataCommentList, setDataCommentList] = useState([]);
  const [dataTagList, setDataTagList] = useState([]);
  const [dataPostByTag, setDataPostByTag] = useState([]);

  const getAllData = async () => {
    setIsLoading(true);
    try {
      // [1]
      const userList = await axios.get("user?limit=10");
      setDataUserList(userList.data.data);

      // [2]
      const fullUserProfile = await axios.get("user/60d0fe4f5311236168a109ca");
      setDataFullUserProfile(fullUserProfile.data);

      // [3]
      const postsList = await axios.get("post?limit=10");
      setDataPostsList(postsList.data.data);

      // [4]
      const userPosts = await axios.get(
        "user/60d0fe4f5311236168a109ca/post?limit=10"
      );
      setDataUserPosts(userPosts.data.data);

      // [5]
      const commentList = await axios.get(
        "post/60d21af267d0d8992e610b8d/comment?limit=10"
      );
      setDataCommentList(commentList.data.data);

      // [6]
      const tagList = await axios.get("tag?limit=10");
      setDataTagList(tagList.data.data);

      // [7]
      const postByTag = await axios.get("tag/water/post?limit=10");
      setDataPostByTag(postByTag.data.data);
      console.log(postByTag.data.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError({
        isShow: true,
        msg: error.response.data.error,
      });
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
        <Col span={24} md={8}>
          {dataTab.map((item) => (
            <Row key={item.id} style={{ marginBottom: "20px" }}>
              <Button
                type="primary"
                ghost={item.id !== isActive}
                onClick={() => setIsActive(item.id)}
              >
                {item.title}
              </Button>
            </Row>
          ))}
        </Col>

        {isLoading ? (
          <Col span={24} md={16}>
            <Spin tip="Loading..." size="large" />
          </Col>
        ) : isError.isShow ? (
          <Col>
            <Alert
              message="Error"
              description={`${isError.msg}/Kesalahan app-id (kemungkinan sudah kedaluwarsa)`}
              type="error"
              showIcon
            />
          </Col>
        ) : (
          <Col span={24} md={16}>
            {isActive === 1 && (
              <Row gutter={20}>
                {dataUserList?.map((item) => (
                  <Col key={item.id}>
                    <DataUserList
                      img={item.picture}
                      name={`${item.title}. ${item.firstName} ${item.lastName}`}
                      id={item.id}
                    />
                  </Col>
                ))}
              </Row>
            )}

            {isActive === 2 && (
              <Card
                hoverable
                style={{ width: 400 }}
                cover={
                  <img
                    alt={`${dataFullUserProfile.title} ${dataFullUserProfile.firstName} ${dataFullUserProfile.lastName}`}
                    src={dataFullUserProfile.picture}
                  />
                }
              >
                <Card.Meta
                  title={`${dataFullUserProfile.title}. ${dataFullUserProfile.firstName} ${dataFullUserProfile.lastName}`}
                  description={dataFullUserProfile.id}
                />

                <hr />

                <Row>
                  <Col>
                    Gender: {dataFullUserProfile.gender}
                    <br /> Date of birth:{" "}
                    {dataFullUserProfile.dateOfBirth.split("T")[0]}
                    <br /> Register date:{" "}
                    {dataFullUserProfile.registerDate.split("T")[0]}
                    <br />
                    Email: {dataFullUserProfile.email}
                    <br /> Phone: {dataFullUserProfile.phone}
                    <hr />
                    Address State: {dataFullUserProfile.location.state}
                    <br /> Street: {dataFullUserProfile.location.street}
                    <br /> City: {dataFullUserProfile.location.city}
                    <br /> Country: {dataFullUserProfile.location.country}
                    <br /> Timezone: {dataFullUserProfile.location.timezone}
                  </Col>
                </Row>
              </Card>
            )}

            {isActive === 3 && (
              <Row gutter={20}>
                {dataPostsList.map((item) => (
                  <Col key={item.id}>
                    <Card
                      style={{ width: 300, marginBottom: 20 }}
                      cover={<img alt="pic" src={item.image} />}
                    >
                      <Card.Meta
                        avatar={<Avatar src={item.owner.picture} />}
                        title={`${item.owner.title}. ${item.owner.firstName} ${item.owner.lastName}`}
                        description={item.publishDate}
                      />

                      <p style={{ marginTop: "10px" }}>{item.text}</p>

                      {item.tags.map((item, index) => (
                        <Tag key={index} style={{ margin: "10px" }}>
                          {item}
                        </Tag>
                      ))}

                      <p>{item.likes} likes</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {isActive === 4 && (
              <Row gutter={20}>
                {dataUserPosts.map((item) => (
                  <Col key={item.id}>
                    <Card
                      style={{ width: 300, marginBottom: 20 }}
                      cover={<img alt="pic" src={item.image} />}
                    >
                      <Card.Meta
                        avatar={<Avatar src={item.owner.picture} />}
                        title={`${item.owner.title}. ${item.owner.firstName} ${item.owner.lastName}`}
                        description={item.publishDate}
                      />

                      <p style={{ marginTop: "10px" }}>{item.text}</p>

                      {item.tags.map((item, index) => (
                        <Tag key={index} style={{ margin: "10px" }}>
                          {item}
                        </Tag>
                      ))}

                      <p>{item.likes} likes</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {isActive === 5 && (
              <Row gutter={20}>
                {dataCommentList.map((item) => (
                  <Col key={item.id}>
                    <Comment
                      avatar={item.owner.picture}
                      author={`${item.owner.firstName} ${item.owner.lastName}`}
                      content={item.message}
                      datetime={item.publishDate}
                    />
                  </Col>
                ))}
              </Row>
            )}

            {isActive === 6 && (
              <Row gutter={10}>
                {dataTagList?.map((item, index) => (
                  <Col key={index}>
                    <Tag style={{ marginBottom: "10px" }}>{item}</Tag>
                  </Col>
                ))}
              </Row>
            )}

            {isActive === 7 && (
              <Row gutter={20}>
                {dataPostByTag.map((item) => (
                  <Col key={item.id}>
                    <Card
                      style={{ width: 300, marginBottom: 20 }}
                      cover={<img alt="pic" src={item.image} />}
                    >
                      <Card.Meta
                        avatar={<Avatar src={item.owner.picture} />}
                        title={`${item.owner.title}. ${item.owner.firstName} ${item.owner.lastName}`}
                        description={item.publishDate}
                      />

                      <p style={{ marginTop: "10px" }}>{item.text}</p>

                      {item.tags.map((item, index) => (
                        <Tag key={index} style={{ margin: "10px" }}>
                          {item}
                        </Tag>
                      ))}

                      <p>{item.likes} likes</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Home;
