import React, { useEffect, useState } from "react";

import { Col, Drawer, Form, Row, Space, Table } from "antd";

import moment from "moment";
import orderApi from "../../api/orderApi";
import promotionRsApi from "../../api/promotionRs";

const ModelDetailMovie = ({
  showModalDetailMovie,
  setShowModalDetailMovie,
  selectedId,
}) => {
  const [form] = Form.useForm();

  const [orderDetailSeat, setOrderDetailSeat] = useState([]);
  const [orderDetailProduct, setOrderDetailProduct] = useState([]);
  const [orderDetailPromotion, setOrderDetailPromotion] = useState([]);
  const [order, setOrder] = useState({});

  const columnsSeat = [
    {
      title: "Vị trí",
      dataIndex: "position",
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (val) => {
        return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
    {
      title: "Loại ghế",
      dataIndex: "productType",
    },
  ];

  const columnsProduct = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "qtyProduct",
    },
    {
      title: "Giá",
      dataIndex: "priceProduct",
      render: (val) => {
        return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
  ];

  const columnsPromotion = [
    {
      title: "Mã khuyến mãi",
      dataIndex: "promotionCode",
    },
    {
      title: "Tên khuyến mãi",
      dataIndex: "name",
    },
    {
      title: "Tiền giảm",
      dataIndex: "discount",
      render: (val) => {
        return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
  ];

  const onClose = () => {
    setShowModalDetailMovie(false);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderApi.getById(selectedId);
        if (res) {
          res.createdAt = moment(res.createdAt).format("DD/MM/YYYY HH:mm");
          res.showDate = moment(res.ShowMovie.showDate).format("DD/MM/YYYY");
          res.refundDate = moment(res.refundDate).format("DD/MM/YYYY HH:mm");
          const name = `${res.Customer?.firstName} ${res.Customer?.lastName}`;
          const totatBefore =
            Number(res.totalPrice) + Number(res.totalDiscount);
          res.totalBefore = totatBefore;
          if (name === "NN") {
            res.customerName = "Khách vãng lai";
          } else {
            res.customerName = name;
          }

          setOrder(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchOrderDetail = async () => {
      const res = await orderApi.getDetail(selectedId);
      if (res) {
        let listSeat = [];
        let listProduct = [];
        res.forEach((item) => {
          if (item.type === 1) {
            listSeat.push({
              position:
                item?.CinemaHallSeat?.seatColumn +
                item?.CinemaHallSeat?.seatRow,
              qty: item.qty,
              price: item.price,
              productType: item?.Product?.productName,
            });
          }
          if (item.type === 2) {
            listProduct.push({
              productCode: item?.Product?.productCode,
              name: item?.Product?.productName,
              qtyProduct: item.qtyProduct,
              priceProduct: item.priceProduct,
            });
          }
          return {
            listSeat,
            listProduct,
          };
        });
        setOrderDetailSeat(listSeat);
        setOrderDetailProduct(listProduct);
      }
    };

    const fetchPromotionRs = async () => {
      const res = await promotionRsApi.getByOrderId(selectedId);
      if (res) {
        let listPromotion = [];
        res.forEach((item) => {
          listPromotion.push({
            promotionCode: item?.PromotionLine?.promotionCode,
            name: item?.PromotionLine?.desc,
            discount: item.moneyDiscount,
          });
        });
        setOrderDetailPromotion(listPromotion);
      }
    };

    fetchPromotionRs();
    fetchOrder();
    fetchOrderDetail();
  }, [selectedId]);

  return (
    <>
      <Drawer
        title="Thông tin chi tiết vé hoàn trả"
        width={720}
        onClose={onClose}
        open={showModalDetailMovie}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Thông tin cơ bản
              </span>
            </Col>
          </Row>
        </Space>
        <Form form={form} id="myForm" layout="vertical">
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Mã hoán đơn:
                <span> {order?.code}</span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Ngày tạo:
                <span> {order?.createdAt} </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Nhân viên:
                <span>
                  {order?.Staff
                    ? ` ${order?.Staff?.firstName} ${order?.Staff?.lastName}`
                    : " Online"}
                </span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Khách hàng:
                <span> {order?.customerName} </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Rạp:
                <span> {order?.ShowMovie?.Show?.Cinema?.name} </span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Phòng chiếu:
                <span> {order?.ShowMovie?.Show?.CinemaHall?.name} </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Phim:
                <span> {order?.ShowMovie?.Show?.Movie?.nameMovie} </span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Suất chiếu:
                <span> {order?.ShowMovie?.ShowTime?.showTime} </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Ngày chiếu:
                <span> {order?.showDate} </span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Tổng tiền trước CK:
                <span>
                  {" "}
                  {order?.totalBefore
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"}
                </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Ngày trả:
                <span> {order?.refundDate} </span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Chiết khấu:
                <span>
                  {" "}
                  {order?.totalDiscount
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"}
                </span>
              </span>
            </Col>
            {/* <Col span={8}>
              <span>
                Tổng tiền hoàn trả:
                <span> {order?.totalPrice} </span>
              </span>
            </Col> */}
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}>
              <span>
                Lý do hoàn trả:
                <span> {order?.note} </span>
              </span>
            </Col>
            <Col span={8}>
              <span>
                Tổng tiền sau CK:
                <span>
                  {" "}
                  {order?.totalPrice
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"}{" "}
                </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "10px" }}>
            <Col span={16}></Col>
            <Col span={8}>
              <span>
                Tổng tiền hoàn trả:
                <span>
                  {" "}
                  {order?.totalPrice
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"}{" "}
                </span>
              </span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "10px" }}>
            <Col span={12}>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Danh sách ghế mua
              </span>
            </Col>
          </Row>
          <Row style={{ marginTop: "15px" }}>
            <Col span={24}>
              <Table
                columns={columnsSeat}
                dataSource={orderDetailSeat}
                size={"small"}
                pagination={false}
              />
            </Col>
          </Row>
          {orderDetailProduct.length > 0 && (
            <>
              <Row gutter={16} style={{ marginTop: "20px" }}>
                <Col span={12}>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Danh sách sản phẩm mua
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col span={24}>
                  <Table
                    columns={columnsProduct}
                    dataSource={orderDetailProduct}
                    size={"small"}
                    pagination={false}
                  />
                </Col>
              </Row>
            </>
          )}
          {orderDetailPromotion.length > 0 && (
            <>
              <Row gutter={16} style={{ marginTop: "20px" }}>
                <Col span={12}>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Danh sách khuyến mãi
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "15px" }}>
                <Col span={24}>
                  <Table
                    columns={columnsPromotion}
                    dataSource={orderDetailPromotion}
                    size={"small"}
                    pagination={false}
                  />
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Drawer>
    </>
  );
};
export default ModelDetailMovie;
