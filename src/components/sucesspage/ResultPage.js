import { Button, Result, Row } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import styled from "styled-components";
import openAddressApi from "../../api/openApi";
import orderApi from "../../api/orderApi";
import "./Telidon Hv Italic.ttf";
import "./index.scss";

const ResultPage = ({ setCurrent, setIsSucess, idOrder }) => {
  const booking = useSelector((state) => state.booking);
  let componentRef = useRef();
  const [order, setOrder] = useState(null);
  console.log("order: ", order);
  const [orderDetail, setOrderDetail] = useState([]);
  const [detailSeatNomal, setDetailSeatNomal] = useState([]);
  const [detailSeatVip, setDetailSeatVip] = useState([]);

  const getAddress = async (address) => {
    const city = await openAddressApi.getProvinceByCode(address.city_id);
    const district = await openAddressApi.getDistrictByCode(
      address.district_id
    );
    const ward = await openAddressApi.getWardByCode(address.ward_id);
    return `${ward?.name + " /"} ${district?.name + " /"} ${city?.name}`;
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderApi.getById(idOrder);
        if (res) {
          // const { city_id, district_id, ward_id } = res.ShowMovie.Show.Cinema;
          // const address = { city_id, district_id, ward_id };
          // const addressCinema = await getAddress(address);
          // res.addressCinema = res?.ShowMovie?.Show?.Cinema?.address;
          const { duration } = res.ShowMovie.Show.Movie;
          const { showTime } = res.ShowMovie.ShowTime;
          const startTime = moment(showTime, "HH:mm");
          const endTime = moment(startTime).add(duration, "minutes");
          res.endTime = moment(endTime).format("HH:mm");
          res.createdAt = moment(res.createdAt).format("DD/MM/YYYY HH:mm");
          res.showDate = moment(res.ShowMovie.showDate).format("DD/MM/YYYY");
          const name = res.Customer?.firstName + res.Customer?.lastName;
          if (name === "NN") {
            res.customerName = "Khách vãng lai";
          }
          // res.totalPrice = res.totalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          const totalPrice = res.totalPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          res.totalPrice = totalPrice;

          setOrder(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const fetchOrderDetail = async () => {
      const res = await orderApi.getDetail(idOrder);
      console.log("orderDetail in rspage", res);
      if (res) {
        let listSeat = [];
        res.forEach((item) => {
          if (item.type === 1) {
            listSeat.push({
              position:
                item?.CinemaHallSeat?.seatColumn +
                item?.CinemaHallSeat?.seatRow,
              qty: item.qty,
              price: item.price,
              productType: item?.Product?.productName,
              productCode: item?.Product?.productCode,
            });
          }
          return {
            listSeat,
          };
        });
        setOrderDetail(listSeat);
        // listSeat.forEach((item) => {
        //   if (item.productCode === "G001") {
        //     setDetailSeatNomal();
        //   } else {
        //     setDetailSeatVip((detailSeatVip) => [...detailSeatVip, item]);
        //   }
        // });
        const listNormal = listSeat.filter(
          (item) => item.productCode === "PRD00001"
        );
        const listVip = listSeat.filter(
          (item) => item.productCode === "PRD00003"
        );
        setDetailSeatNomal(listNormal);
        setDetailSeatVip(listVip);
      }
    };
    fetchOrder();
    fetchOrderDetail();
  }, []);

  const PageBreakWrapper = styled.div`
    && {
      page-break-after: always;
    }
  `;

  const PrintTemplate = ({
    detail,
    orderTmp,
    idOrderTmp,
    seatNomal,
    seatVip,
  }) => {
    return (
      <>
        {order && (
          <>
            <div
              className="print_ticket"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontFamily: "Telidon",
              }}
            >
              <div
                className="print print-top"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "10px" }}>THE VAO</span>
                <span style={{ fontSize: "10px" }}>PHONG CHIEU PHIM</span>
                <span
                  style={{
                    fontSize: "10px",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  {orderTmp?.ShowMovie?.Show?.Cinema?.name}
                </span>
              </div>
              <Row className="print-content">
                <span>{orderTmp?.ShowMovie?.Show?.Cinema?.address}</span>
              </Row>
              <Row className="print-content">
                <span>{orderTmp?.createdAt}</span>
              </Row>
              <Row className="print-content">
                <span>Nhân viên:</span>
                <span>
                  {orderTmp.Staff.firstName + " " + orderTmp.Staff.lastName}
                </span>
              </Row>
              <Row className="print-content">
                <span>Khách hàng:</span>
                <span>
                  {" "}
                  {orderTmp?.customerName
                    ? orderTmp?.customerName
                    : orderTmp?.Customer?.firstName +
                      " " +
                      orderTmp?.Customer?.lastName}
                </span>
              </Row>
              <Row className="print-content">
                <span>
                  ============================================================
                </span>
              </Row>
              <Row className="print-content content-body">
                <span>{orderTmp.ShowMovie.Show.Movie.nameMovie}</span>
                <span style={{ marginLeft: "5px" }}>
                  [{orderTmp.ShowMovie.Show.Movie.classify.substring(0, 3)}]
                </span>
              </Row>
              <Row className="print-content">
                <span>{orderTmp.showDate}</span>
                <span style={{ marginLeft: "5px" }}>
                  {orderTmp.ShowMovie.ShowTime.showTime} - {orderTmp.endTime}
                </span>
              </Row>
              <Row className="print-content content-body">
                <span>Room-{orderTmp.ShowMovie.Show.CinemaHall.type}</span>
                <span style={{ marginLeft: "5px" }}>
                  {orderTmp.ShowMovie.Show.CinemaHall.name}
                </span>
              </Row>
              {seatNomal.length > 0 && (
                <>
                  <Row className="print-content">
                    <span>
                      ============================================================
                    </span>
                  </Row>
                  <Row
                    className="print-content content-body"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "normal",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        {seatNomal.map((item, index) => (
                          <>
                            {item?.position}
                            {index < seatNomal.length - 1 ? ", " : ""}
                          </>
                        ))}
                      </span>
                      <span>{seatNomal.length} ghế đơn</span>
                      {/* <span>{seatNomal[0]?.productCode}</span>
                      <span>{seatNomal[0]?.price * seatNomal.length}</span> */}
                    </div>
                  </Row>
                  <Row className="print-content">
                    <span>
                      -----------------------------------------------------------
                    </span>
                  </Row>
                </>
              )}
              {seatVip.length > 0 && (
                <>
                  <Row
                    className="print-content content-body"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "normal",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        {seatVip.map((item, index) => (
                          <>
                            {item?.position}
                            {index < seatVip.length - 1 ? ", " : ""}
                          </>
                        ))}
                      </span>
                      <span>{seatVip.length} ghế đôi</span>
                      {/* <span>{seatVip[0]?.productCode}</span>
                      <span>{seatVip[0]?.price * seatVip.length}</span> */}
                    </div>
                  </Row>
                  <Row className="print-content">
                    <span>
                      ============================================================
                    </span>
                  </Row>
                </>
              )}
              <Row
                className="print-content"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <QRCode size={50} value={idOrderTmp} viewBox={`0 0 256 256`} />
              </Row>
              <Row
                className="print-content"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "5px",
                }}
              >
                <span>www.galaxycine.vn - Hotline: 19001234</span>
                <span>THANK YOU FOR CHOOSING US TODAY !</span>
              </Row>
            </div>
            <PageBreakWrapper>&nbsp;</PageBreakWrapper>
          </>
        )}
      </>
    );
  };

  class ComponentToPrint extends React.Component {
    render() {
      if (order) {
        const template = (
          <PrintTemplate
            detail={orderDetail}
            orderTmp={order}
            idOrderTmp={idOrder}
            seatNomal={detailSeatNomal}
            seatVip={detailSeatVip}
          />
        );
        return <div>{template}</div>;
      }
    }
  }

  const handleReset = () => {
    setCurrent(0);
    setIsSucess(false);
  };

  return (
    <Result
      status="success"
      title="Đặt vé thành công!"
      extra={[
        <Button type="primary" key="console" onClick={handleReset}>
          Đặt tiếp
        </Button>,
        <>
          <ReactToPrint
            trigger={() => <Button type="primary">In vé</Button>}
            content={() => componentRef}
            pageStyle="@page {
              size: 52mm 74mm;
              }
              @media print {
              @page {  size: a8 landscape;
                  margin: 0mm !important;
              }
              @media all {
                              .pagebreak {
                                overflow: visible; 
                              }
                          }
                      }
              }`;"
          />
          <div style={{ display: "none" }}>
            {order && <ComponentToPrint ref={(el) => (componentRef = el)} />}
          </div>
        </>,
      ]}
    />
  );
};

export default ResultPage;
