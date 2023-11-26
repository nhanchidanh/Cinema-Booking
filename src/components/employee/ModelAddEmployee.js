import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import openAddressApi from "../../api/openApi";
import useEmployeeHook from "./useEmployeeHook";

const ModelAddEmployee = ({
  showModalAddEmployee,
  setShowModalAddEmployee,
}) => {
  const {
    form,
    province,
    districts,
    wards,
    cinemas,
    provincePicked,
    districtPicked,
    onChangeDistrict,
    onChangeProvince,
    onSearch,
    onClose,
    handleSubmit,
    onChangeDate,
    handleChangePosition,
    yupSync,
  } = useEmployeeHook(showModalAddEmployee, setShowModalAddEmployee);

  return (
    <>
      <Drawer
        title="Thêm nhân viên"
        width={720}
        onClose={onClose}
        open={showModalAddEmployee}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button form="myFormAddLinePro" htmlType="submit" type="primary">
              Thêm
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          id="myFormAddLinePro"
          form={form}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="first_name"
                label="Họ và tên đệm"
                rules={[yupSync]}
              >
                <Input placeholder="Hãy nhập họ và tên đệm nhân viên..." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="last_name" label="Tên" rules={[yupSync]}>
                <Input placeholder="Hãy nhập tên nhân viên..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item rules={[yupSync]} name="phone" label="Số điện thoại">
                <Input placeholder="Hãy nhập số điện thoại..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item rules={[yupSync]} name="email" label="Email">
                <Input placeholder="Hãy nhập email..." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item rules={[yupSync]} name="cinema" label="Rạp chiếu phim">
                <Select
                  placeholder="Chọn rạp chiếu phim"
                  style={{
                    width: "100%",
                  }}
                  rules={[yupSync]}
                  options={cinemas}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="start_date"
                rules={[yupSync]}
                label="Ngày vào làm"
              >
                <DatePicker
                  onChange={onChangeDate}
                  style={{ width: "100%" }}
                  name="start_date"
                  placeholder="Chọn ngày vào làm"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item rules={[yupSync]} label="Tỉnh thành" name="city">
                <Select
                  showSearch
                  placeholder="Chọn tỉnh thành"
                  optionFilterProp="children"
                  onChange={onChangeProvince}
                  onSearch={onSearch}
                  style={{ width: "100%" }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  name="city"
                  options={province}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item rules={[yupSync]} label="Quận huyện" name="district">
                <Select
                  rules={[yupSync]}
                  showSearch
                  placeholder="Chọn quận huyện"
                  optionFilterProp="children"
                  onChange={onChangeDistrict}
                  onSearch={onSearch}
                  style={{ width: "100%" }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  name="district"
                  options={districts}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item rules={[yupSync]} label="Phường xã" name="ward">
                <Select
                  showSearch
                  placeholder="Chọn phường/xã"
                  optionFilterProp="children"
                  // onChange={onChange}
                  onSearch={onSearch}
                  style={{ width: "100%" }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={wards}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default ModelAddEmployee;
