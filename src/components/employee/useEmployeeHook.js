import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  Tag,
  InputNumber,
} from "antd";

import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import promotionApi from "../../api/promotionApi";
import rankApi from "../../api/rankApi";
import { CustomTagProps } from "rc-select/lib/BaseSelect";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../redux/actions";
import * as yup from "yup";
import {
  MESSAGE_REQUIRE_NAME,
  MESSAGE_WITHOUT_SPECIAL,
  NOT_EMPTY,
} from "../../utils/constants";
import { removeAscent } from "../../utils/FormatString";
import { notifyError } from "../../utils/Notifi";
import openAddressApi from "../../api/openApi";
import { createStaff } from "../../services/StaffFetch";
import cinameApi from "../../api/cinemaApi";
import staffApi from "../../api/staffApi";
import dayjs from "dayjs";

let schema = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .required(MESSAGE_REQUIRE_NAME("Họ và tên đệm")),
  last_name: yup.string().required(MESSAGE_REQUIRE_NAME("Tên")),
  email: yup
    .string()
    .trim()
    .required(MESSAGE_REQUIRE_NAME("Email"))
    .email("Email không hợp lệ."),
  phone: yup
    .string()
    .trim()
    .required(MESSAGE_REQUIRE_NAME("Số điện thoại"))
    .matches(/^\d{9,11}$/, "Số điện thoại không hợp lệ."),
  cinema: yup.string().trim().required(MESSAGE_REQUIRE_NAME("Rạp chiếu phim")),
  city: yup.string().trim().required(MESSAGE_REQUIRE_NAME("Tỉnh thành")),
  district: yup.string().trim().required(MESSAGE_REQUIRE_NAME("Quận huyện")),
  ward: yup.string().trim().required(MESSAGE_REQUIRE_NAME("Phường xã")),
  start_date: yup.string().required(MESSAGE_REQUIRE_NAME("Ngày vào làm")),
});

export const yupSync = {
  async validator({ field }, value) {
    if (field === "namePromotion") {
      value = removeAscent(value);
    }
    await schema.validateSyncAt(field, { [field]: value });
  },
};

const useEmployeeHook = (
  showModalAddCustomer,
  setShowModalAddCustomer,
  selectedId
) => {
  const [form] = Form.useForm();
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [provincePicked, setProvincePicked] = useState(0);
  const [districtPicked, setDistrictPicked] = useState(0);
  const [wardPicked, setWardPicked] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [dataEmployee, setDataEmployee] = useState({});

  const depatch = useDispatch();
  const reload = useSelector((state) => state.reload);
  const onChangeProvince = (value) => {
    console.log(`selected ${value}`);
    setProvincePicked(value);
  };
  const onChangeDistrict = (value) => {
    console.log(`selected ${value}`);
    setDistrictPicked(value);
  };

  const onChangeWard = (value) => {
    console.log(`selected ${value}`);
    setWardPicked(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClose = () => {
    setShowModalAddCustomer(false);
  };

  //change position
  const handleChangePosition = (value) => {
    console.log(`selected ${value}`);
  };

  //choise date start worling
  const onChangeDate = (date, dateString) => {
    setStartDate(dateString);
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await openAddressApi.getList("/p");

        //console.log(response);
        if (response) {
          const newResponse = response.map((val) => {
            return {
              value: val.code,
              label: val.name,
            };
          });
          setProvince(newResponse);
        }
      } catch (error) {
        console.log("Failed to fetch conversation list: ", error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (provincePicked !== 0) {
      const fetchConversations = async (id) => {
        try {
          const response = await openAddressApi.getList(`/p/${id}?depth=2`);

          console.log(response);
          if (response) {
            const { districts } = response;
            const newDistricts = districts.map((val) => {
              return {
                value: val.code,
                label: val.name,
              };
            });
            setDistricts(newDistricts);
          }
        } catch (error) {
          console.log("Failed to fetch conversation list: ", error);
        }
      };

      fetchConversations(provincePicked);
    }
  }, [provincePicked]);
  useEffect(() => {
    if (districtPicked !== 0) {
      const fetchConversations = async (id) => {
        try {
          const response = await openAddressApi.getList(`/d/${id}?depth=2`);

          console.log(response);
          if (response) {
            const { wards } = response;
            const newWards = wards.map((val) => {
              return {
                value: val.code,
                label: val.name,
              };
            });
            setWards(newWards);
          }
        } catch (error) {
          console.log("Failed to fetch conversation list: ", error);
        }
      };

      fetchConversations(districtPicked);
    }
  }, [districtPicked]);

  // Fetch list cinema
  const getListCinema = async () => {
    try {
      const response = await cinameApi.getCinemas();
      if (response) {
        const filteredCinema = response.map((item) => {
          if (item?.status === 1) {
            return {
              value: item.id,
              label: item.name,
            };
          }
        });
        setCinemas(filteredCinema);
      }
    } catch (error) {
      console.log("Failed to fetch cinema", error);
    }
  };
  useEffect(() => {
    getListCinema();
  }, []);

  // Fetch info employee
  const getListEmployee = async () => {
    try {
      const employee = await staffApi.getStaff(selectedId);
      if (employee) {
        setDataEmployee(employee);
        const city = await openAddressApi.getProvinceByCode(employee?.city_id);
        const district = await openAddressApi.getDistrictByCode(
          employee?.district_id
        );
        const ward = await openAddressApi.getWardByCode(employee?.ward_id);

        form.setFieldsValue({
          first_name: employee?.firstName,
          last_name: employee?.lastName,
          phone: employee?.phone,
          email: employee?.email,
          cinema: employee?.cinema_id,
          start_date: dayjs(employee?.start_date),
          city: city.name,
          district: district.name,
          ward: ward.name,
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getListEmployee();
  }, [selectedId]);

  const handleSubmit = async (val) => {
    const dataPayload = {
      email: val.email,
      password: "123456789",
      phone: val.phone,
      firstName: val.first_name,
      lastName: val.last_name,
      start_date: startDate,
      status: 1,
      position: 2,
      city_id: val.city,
      ward_id: val.ward,
      district_id: val.district,
      cinema_id: val.cinema,
      gender: "F",
      dob: "2001-09-30",
    };

    try {
      const rs = await createStaff(dataPayload);
      console.log(rs);
      if (rs) {
        message.success("Tạo mới thành công");
        setShowModalAddCustomer(false);
        depatch(setReload(!reload));
      }
    } catch (error) {
      console.log(error);
      if ("Email or Phone is exist" === error?.response?.data?.message) {
        notifyError("Email hoặc số điện thoại đã tồn tại.");
      } else {
        notifyError(error?.response?.data?.message);
      }
    }
  };

  const handleUpdate = async (val) => {
    console.log("val: ", val);
    console.log("typeof val.city: ", typeof val.city);
    const response = await staffApi.updateStaff(selectedId, {
      email: val.email,
      phone: val.phone,
      firstName: val.first_name,
      lastName: val.last_name,
      start_date: val.start_date,
      cinema_id: val.cinema,
      city_id: typeof val.city === "number" ? val.city : dataEmployee?.city_id,
      ward_id: typeof val.ward === "number" ? val.ward : dataEmployee?.ward_id,
      district_id:
        typeof val.district === "number"
          ? val.district
          : dataEmployee?.district_id,
    });
    console.log("response: ", response);
    if (response[0]) {
      message.success("Cập nhật thành công");
      setShowModalAddCustomer(false);
      depatch(setReload(!reload));
    }
  };

  return {
    form,
    province,
    districts,
    wards,
    cinemas,
    provincePicked,
    districtPicked,
    wardPicked,
    onChangeDistrict,
    onChangeDate,
    onChangeProvince,
    onChangeWard,
    onSearch,
    onClose,
    handleSubmit,
    handleUpdate,
    handleChangePosition,
    yupSync,
  };
};

export default useEmployeeHook;
