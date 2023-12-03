import { Breadcrumb, Button, Col, Input, Row, Typography } from "antd";
import React, { useState } from "react";

import { PlusSquareOutlined, SearchOutlined } from "@ant-design/icons";
import ModelAddPromotionHeader from "./ModelAddPromotionHeader";
import TablePromotionHeader from "./TablePromotionHeader";
const { Title, Text } = Typography;
const dateFormat = "YYYY/MM/DD";
const IndexCinemaHall = ({ setTab, selectedIdCinema, statusDb }) => {
  const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);
  const [keyword, setKeyword] = useState("");

  const showModal = () => {
    setShowModalAddCustomer(true);
  };

  const handleRouter = (value) => {
    setTab(value);
  };

  return (
    <div className="site-card-wrapper">
      <Breadcrumb style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Breadcrumb.Item>
          <a
            onClick={() => {
              handleRouter(0);
            }}
          >
            Rạp
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Phòng chiếu</Breadcrumb.Item>
      </Breadcrumb>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={12}>
          <Input
            placeholder="Nhập tên phòng chiếu hoặc loại phòng"
            prefix={<SearchOutlined />}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                setKeyword(e.target.value);
              }
            }}
          />
        </Col>
        <Col span={10}></Col>
        <Col span={2}>
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            onClick={showModal}
            title="Thêm phòng chiếu mới"
          >
            Thêm
          </Button>
        </Col>
      </Row>

      <Row
        style={{ margin: "1rem 0 1rem 0" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={24}>
          <TablePromotionHeader
            keyword={keyword}
            setTab={setTab}
            selectedIdCinema={selectedIdCinema}
            statusDb={statusDb}
          />
        </Col>
      </Row>
      {showModalAddCustomer ? (
        <ModelAddPromotionHeader
          showModalAddCustomer={showModalAddCustomer}
          setShowModalAddCustomer={setShowModalAddCustomer}
          selectedIdCinema={selectedIdCinema}
        />
      ) : null}
    </div>
  );
};
export default IndexCinemaHall;
