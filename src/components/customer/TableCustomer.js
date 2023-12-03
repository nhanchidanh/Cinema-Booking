import { Badge, Modal, Select, Table, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import customerApi from "../../api/customerApi";
import openAddressApi from "../../api/openApi";
import { setReload } from "../../redux/actions";
import { useRoleHook } from "../../utils/useRoleHook.js";
import ModelDetailCustomer from "./ModelCustomerDetail";

const { Option } = Select;

const TableCustomer = ({ keySearch }) => {
  const [listCustomer, setListCustomer] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [showModalDetailCustomer, setShowModalDetailCustomer] = useState(false);
  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);
  const { isEmployee } = useRoleHook();
  const showModalDetail = (e) => {
    setShowModalDetailCustomer(true);
    setSelectedId(e);
  };

  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "code",
      render: (val, record) => {
        return (
          <a
            onClick={() => {
              showModalDetail(record.id);
            }}
          >
            {val}
          </a>
        );
      },
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    // {
    //   title: "Địa chỉ",
    //   dataIndex: "address",
    // },
    {
      title: "Email",
      dataIndex: "email",
      render: (val) => {
        if (val === null || val === "undefined") {
          return "-";
        } else {
          return val;
        }
      },
    },
    {
      title: "Cấp bậc",
      dataIndex: "rank",
      key: "rank",
      render: (rank) => {
        let color = "";
        if (rank === "START") {
          color = "green";
        }
        if (rank === "SILVER") {
          color = "silver";
        }
        if (rank === "GOLD") {
          color = "gold";
        }

        return (
          <Tag color={color} key={rank}>
            {rank?.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: "START",
          value: "START",
        },
        {
          text: "SILVER",
          value: "SILVER",
        },
        {
          text: "GOLD",
          value: "GOLD",
        },
      ],
      onFilter: (value, record) => record.rank.indexOf(value) === 0,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (val, record) => {
        let color = "";
        let text = "";
        if (val === false) {
          text = "Hoạt động";
          color = "green";
        } else {
          text = "Ngừng hoạt động";
          color = "red";
        }
        return (
          <>
            <Badge color={color} />
            <Select
              value={val}
              style={{
                width: "90%",
              }}
              bordered={false}
              onChange={(value) => {
                handleChangeStatus(value, record);
              }}
            >
              <Option value={false}>Hoạt động</Option>
              <Option value={true}>Ngừng hoạt động</Option>
            </Select>
          </>
        );
      },
      filters: [
        {
          text: "Hoạt động",
          value: false,
        },
        {
          text: "Ngừng hoạt động",
          value: true,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];
  const columnsForEmployee = [
    {
      title: "Mã khách hàng",
      dataIndex: "code",
      render: (val, record) => {
        return (
          <a
            onClick={() => {
              showModalDetail(record.id);
            }}
          >
            {val}
          </a>
        );
      },
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
      // render: (val, record) => {
      //   return (
      //     <a
      //       onClick={() => {
      //         showModalDetail(record.id);
      //       }}
      //     >
      //       {val}
      //     </a>
      //   );
      // },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    // {
    //   title: "Địa chỉ",
    //   dataIndex: "address",
    // },
    {
      title: "Email",
      dataIndex: "email",
      render: (val) => {
        if (val === null || val === "undefined") {
          return "-";
        } else {
          return val;
        }
      },
    },
    {
      title: "Cấp bậc",
      dataIndex: "rank",
      key: "rank",
      render: (rank) => {
        let color = "";
        if (rank === "START") {
          color = "green";
        }
        if (rank === "SILVER") {
          color = "silver";
        }
        if (rank === "GOLD") {
          color = "gold";
        }
        return (
          <Tag color={color} key={rank}>
            {rank?.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: "START",
          value: "START",
        },
        {
          text: "SILVER",
          value: "SILVER",
        },
        {
          text: "GOLD",
          value: "GOLD",
        },
      ],
      onFilter: (value, record) => record.rank.indexOf(value) === 0,
    },
  ];

  const handleChangeStatus = async (value, record) => {
    const updateStatus = async () => {
      try {
        const rs = await customerApi.updateCustomer(record.id, {
          isDeleted: value,
        });
        if (rs) {
          message.success("Cập nhật thành công");
          depatch(setReload(!reload));
        } else {
          message.error("Cập nhật thất bại");
        }
      } catch (error) {
        message.error("Cập nhật thất bại");
      }
    };
    updateStatus();
  };

  useEffect(() => {
    //get list customer in here
    const fetchListCustomer = async () => {
      try {
        const response = await customerApi.getCustomers(keySearch);
        console.log("response: ", response);
        const data = await Promise.all(
          response.map(async (item, index) => {
            let address;
            if (item.city_id && item.district_id && item.ward_id) {
              try {
                const ward = await openAddressApi.getWardByCode(item?.ward_id);
                const district = await openAddressApi.getDistrictByCode(
                  item?.district_id
                );
                const city = await openAddressApi.getProvinceByCode(
                  item?.city_id
                );
                item.ward_id = ward?.name;
                item.district_id = district?.name;
                item.city_id = city?.name;

                address = ` ${item?.ward_id + ", "} ${
                  item?.district_id + ", "
                } ${item?.city_id}`;
              } catch (error) {
                address = "";
              }
            } else {
              address = "";
            }
            return {
              key: index,
              id: item.id,
              name: `${item.firstName} ${item.lastName}`,
              phone: item.phone,
              address: address || "-",
              email: item.email || "-",
              dob: item.dob,
              rank: item.Rank?.nameRank,
              image: item.image,
              status: item.isDeleted,
              code: item.code,
            };
          })
        );
        setListCustomer(data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchListCustomer();
  }, [reload, keySearch]);

  //model
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    const fetchDeleteCustomer = async () => {
      try {
        const response = await customerApi.deleteCustomer(selectedId);
        if (+response === 1) {
          depatch(setReload(!reload));
        } else {
          setTimeout(() => {
            message.success("Xóa thất bại");
          }, 1000);
        }
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchDeleteCustomer();
    setTimeout(() => {
      message.success("Xóa thành công");
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Table
        columns={isEmployee ? columnsForEmployee : columns}
        dataSource={listCustomer}
      />

      <Modal
        title="Xóa khách hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn xóa khách hàng không?</p>
      </Modal>
      {showModalDetailCustomer && (
        <ModelDetailCustomer
          showModalDetailCustomer={showModalDetailCustomer}
          setShowModalDetailCustomer={setShowModalDetailCustomer}
          selectedId={selectedId}
        />
      )}
    </div>
  );
};
export default TableCustomer;
