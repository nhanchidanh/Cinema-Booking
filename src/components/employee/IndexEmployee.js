import React, { useEffect, useState } from "react";
import { Input, Col, Row, Typography, Button, Modal, Select } from "antd";

import {
  SearchOutlined,
  PlusSquareFilled,
  UserAddOutlined,
  ToolOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import TableCustomer from "../customer/TableCustomer";
import ModelAddCustomer from "../customer/ModelAddCustomer";
import TableEmployee from "./TableEmployee";
import ModelAddEmployee from "./ModelAddEmployee";
import cinameApi from "../../api/cinemaApi";

const { Title, Text } = Typography;
const IndexEmployee = () => {
  const [showModalAddEmployee, setShowModalAddEmployee] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [listCinema, setListCinema] = useState([]);
  const [cinemaPicker, setCinemaPicker] = useState([]);

  const showModal = () => {
    setShowModalAddEmployee(true);
  };

  const fetchCinema = async () => {
    const res = await cinameApi.getCinemaActive();
    if (res) {
      const data = res.map((item, index) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setListCinema(data);
    }
  };

  useEffect(() => {
    fetchCinema();
  }, []);

  const onChangeCinema = (value) => {
    if (value === undefined) {
      setCinemaPicker([]);
    } else {
      setCinemaPicker(value);
    }
  };

  return (
    <div className="site-card-wrapper">
      <Title level={5} style={{ marginBottom: "1rem" }}>
        Quản lý nhân viên
      </Title>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 16,
          lg: 16,
        }}
      >
        <Col span={6}>
          <Input
            placeholder="Nhập tên..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col span={6}>
          <Select
            placeholder="Lọc theo chi nhánh"
            style={{
              width: "200px",
            }}
            options={listCinema}
            allowClear
            onChange={onChangeCinema}
          />
        </Col>
        <Col span={10}></Col>
        <Col span={2}>
          <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
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
          <TableEmployee cinemaPicker={cinemaPicker} searchText={searchText} />
        </Col>
      </Row>
      {showModalAddEmployee && (
        <ModelAddEmployee
          showModalAddEmployee={showModalAddEmployee}
          setShowModalAddEmployee={setShowModalAddEmployee}
        />
      )}
    </div>
  );
};
export default IndexEmployee;
