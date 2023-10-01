import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { memo, useState, useEffect } from 'react';
import clsx from 'clsx';
import style from './CardPhone.module.scss';
import Button from '@mui/material/Button';
import { Modal } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Input, Select, Spin } from 'antd';
import axios from 'axios';

// PropTypes
AddressUser.propTypes = {
  setAddressUserShip: PropTypes.func,
  // setIsModalOpenAddress: PropTypes.func,
  // isModalOpenAddress: PropTypes.bool,
};

function AddressUser({ setAddressUserShip }) {
  // validation form yup => schema
  const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
  // yup validation
  const schema = yup.object().shape({
    nameUser: yup.string().required('Nhập họ và tên !').min(3, 'Tên tối thiểu 3 kí tự !'),
    phoneNumber: yup
      .string()
      .matches(regexPhoneNumber, 'Nhập đúng định dạng số điện thoại')
      .required('Nhập số điện thoại'),
    thanhpho: yup.string().required('Vui lòng chọn Tỉnh/Thành phố !'),
    quanhuyen: yup.string().required('Vui lòng chọn Quận/Huyện !'),
    phuongxa: yup.string().required('Vui lòng chọn Phường/Xã !'),
    diachi_cuthe: yup.string().required('Vui lòng nhập địa chỉ !'),
  });

  // recat hook form
  // react hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    // nếu có data => truyền vào => lấy data đó, còn mặc đinh là ''
    defaultValues: {
      // thanhpho: 'Thái Nguyên',
    }, // Thêm defaultValues ở đây
  });

  //--------------------------------------------------- ----MODAL -----------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    // setIsModalOpenAddress(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    // setIsModalOpenAddress(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    // setIsModalOpenAddress(false);
  };
  // console.log({ errors });
  //-----------------------------------ON SUBMIT ------------------------------------------
  // onsubmit => click cập nhật địa chỉ giao hàng
  const onSubmit = async (data) => {
    // console.log('data', data);
    //  lưu địa chỉ giao hàng
    setAddressUserShip(data);

    /* đóng modal*/
    // setIsModalOpenAddress(false);

    setIsModalOpen(false);
  };

  // ----------------------------------------LẤY CÁC TỈNH THÀNH PHỐ----------------------
  // danh sách các tỉnh, thành phố. => get API
  const [city, setCity] = useState([]);
  // console.log({ city });

  // ----------------------------CHECK ĐÃ CHỌN TỈNH THÀNH PHỐ CHƯA--------------------------------
  // KIỂM TRA XEM ĐÃ CHỌN THÀNH PHỐ HAY CHƯA => ĐỂ HIỆN RA CHỌN QUẬN HUYỆN
  const [isCity, setIsCity] = useState(false);
  // console.log({ isCity });

  // ----------------------------------------------LẤY CÁC HUYỆN--------------------
  // Kiểm tra xem đã chọn Quận Huyện hay chưa => để hiển thị chọn Phường Xã
  const [isDistrict, setIsDistrict] = useState(false);
  // console.log({ isDistrict });
  // SET DANH SÁCH QUẬN HUYỆN => ĐỂ LỰA CHỌN
  // id của các thành phố => để lấy danh sách các huyện
  const [idCity, setIdCity] = useState('');
  // console.log({ idCity });
  // danh sách các huyện
  const [district, setDistrict] = useState([]);
  // console.log('danh sách các huyện', district);
  // console.log({ district });

  //------------------------------------------ DANH SÁCH CÁC PHƯỜNG XÃ----------------------
  const [listWards, setWards] = useState([]);
  // console.log('danh sách các PHƯỜNG XÃ:', listWards);
  // ----------------------------------------API GET LẤY CÁC TỈNH THÀNH PHỐ----------------------
  // get API lấy các TỈNH THÀNH PHỐ
  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/p')
      .then((response) => {
        // console.log('response', response?.data);
        const newCITY = response?.data?.map((item) => {
          return {
            code: item?.code,
            value: item?.name,
            label: item?.name,
          };
        });

        setCity(newCITY);
        // console.log({ newCITY });
      })
      .catch((errors) => {
        console.log('errors', errors);
      });
  }, []);

  // -----------------------------------GET API CÁC HUYỆN ------------------------------------
  useEffect(() => {
    axios
      .get(`https://provinces.open-api.vn/api/p/${idCity}?depth=2`)
      .then((response) => {
        // console.log('các HUYỆN', response?.data?.districts);

        const newDistricts = response?.data?.districts?.map((item) => {
          return {
            code: item?.code,
            value: item?.name,
            label: item?.name,
          };
        });

        // console.log('các HUYỆN', newDistricts);
        setDistrict(newDistricts);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, [idCity]);

  // -----------------------ONCHANGE THÀNH PHỐ ------------------------
  // ------------------------onChange Thành Phố -------------------
  // khi click thay đổi => lựa chọn thành phố => onChange thay đổi thành phố
  const handleChangCity = (value, e) => {
    // console.log('key thành phố là', e?.code);
    // nếu đã chọn thành phố => set ISCITY === true => để hiển thị ra chọn Quận Huyện
    // nếu true set ID của thành phố => để chuẩn bị lấy ra cấc huyện theo thành phố
    // khi onChange cũng xóa luôn quận huyện đi
    const boolean = Boolean(e?.code);
    setValue('quanhuyen', '');
    setValue('phuongxa', '');

    if (boolean) {
      setIdCity(e?.code);
    }
    // nếu chưa chọn thành phố thì sẽ xóa HUYỆN mặc định trước đó đi
    else {
      setValue('quanhuyen', '');
    }

    // set kiểm tra xem đã chọn thành phố đó chưa

    setIsCity(!!e?.code);
    setIsDistrict(false);
  };

  // --------------------------ONCHANGE QUẬN HUYỆN ---------------------
  // ----------------------------onChange Quận Huyện --------------------
  const hanldeChangeDistrict = (value, e) => {
    // console.log('id quận huyên', value);
    setValue('phuongxa', '');
    const boolean = Boolean(e?.code);
    // console.log('boolean quận huyện', boolean);
    setIsDistrict(boolean);
    if (boolean) {
      // setIdDistrict(value);
      // GET DANH SÁCH CÁC PHƯỜNG XÃ
      axios
        .get(`https://provinces.open-api.vn/api/d/${e?.code}?depth=2`)
        .then((response) => {
          // console.log('danh sách các PHƯỜNG XÃ', response?.data?.wards);
          const newWards = response?.data?.wards?.map((item) => {
            return {
              code: item?.code,
              value: item?.name,
              label: item?.name,
            };
          });
          setWards(newWards);
          // console.log('danh sách các PHƯỜNG XÃ', newWards);
        })
        .catch((err) => {
          console.log('erroe', err);
        });
    }
    // nếu chưa chọn thành phố thì sẽ xóa HUYỆN mặc định trước đó đi
    else {
      setValue('phuongxa', '');
    }
  };

  // ---------------------------------
  const { TextArea } = Input;
  // ---Đã tồn tại address chưa --------
  const [isAddress, setIsAddress] = useState([]);

  return (
    <Box className={clsx(style.wrapAddressUser)}>
      {/* nếu chưa địa chỉ giao hàng => bắt phải chọn =>mặc định là chưa có */}
      <Box className={clsx(style.noAddress)}>
        <Typography className={clsx(style.text)} color="secondary" textAlign="center">
          Vui lòng nhập địa chỉ giao hàng
        </Typography>
        <Button variant="outlined" className={clsx(style.btn)} onClick={showModal}>
          Nhập địa chỉ
        </Button>
        {/* modal hiển thị để cập nhật địa chỉ giao hàng */}
        <Modal
          title="Địa chỉ giao hàng"
          open={isModalOpen}
          // open={isModalOpenAddress}
          onOk={handleOk}
          onCancel={handleCancel}
          className={clsx(style.modalAddressUser)}
          footer={null}
          width={550}
          centered
        >
          {/* rect hook from */}
          <Form onFinish={handleSubmit(onSubmit)} className={clsx(style.wrapForm)}>
            {/* tên người nhận hàng*/}
            <Form.Item
              label="Họ tên"
              name="nameUser"
              validateStatus={errors.nameUser ? 'error' : ''}
              help={errors.nameUser && errors.nameUser.message}
              htmlFor="nameUser"
            >
              <Controller
                name="nameUser"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập họ và tên" id="nameUser" allowClear />}
              />
            </Form.Item>

            {/*số điện thoại di động */}
            <Form.Item
              label="Điện thoại di động"
              name="phoneNumber"
              validateStatus={errors.phoneNumber ? 'error' : ''}
              help={errors.phoneNumber && errors.phoneNumber.message}
              htmlFor="phoneNumber"
              step={2}
            >
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Nhập số điện thoại" id="phoneNumber" />
                  // <InputNumber {...field} placeholder="Nhập giá sản phẩm" id="pricePhone" size="middle" min={1} />
                )}
              />
            </Form.Item>

            {/* tỉnh thành phố*/}
            <Form.Item
              label="Tỉnh/Thành phố"
              name="thanhpho"
              validateStatus={errors.thanhpho ? 'error' : ''}
              help={errors.thanhpho && errors.thanhpho.message}
              htmlFor="thanhpho"
            >
              <Controller
                name="thanhpho"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      className={clsx(style.inputSelect)}
                      allowClear // cho phép hiển thị nút xóa
                      placeholder="Chọn Tỉnh/Thành phố"
                      id="thanhpho"
                      options={city}
                      onChange={(selectedValue, e) => {
                        field.onChange(selectedValue); // Cập nhật thủ công giá trị trong React Hook Form => xóa error đi
                        handleChangCity(selectedValue, e);
                      }}
                    />
                  );
                }}
              />
            </Form.Item>

            {/* quận huyện*/}
            <Form.Item
              label="Quận/Huyện"
              name="quanhuyen"
              validateStatus={errors.quanhuyen ? 'error' : ''}
              help={errors.quanhuyen && errors.quanhuyen.message}
              htmlFor="quanhuyen"
            >
              <Controller
                name="quanhuyen"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      className={clsx(style.inputSelect)}
                      allowClear // cho phép hiển thị nút xóa
                      placeholder="Chọn Quận/Huyện"
                      id="quanhuyen"
                      disabled={isCity === false ? true : false}
                      options={district}
                      onChange={(selectedValue, e) => {
                        field.onChange(selectedValue); // Cập nhật thủ công giá trị trong React Hook Form => xóa error đi
                        hanldeChangeDistrict(selectedValue, e);
                      }}
                    />
                  );
                }}
              />
            </Form.Item>

            {/* phường xã*/}
            <Form.Item
              label="Phường/Xã"
              name="phuongxa"
              validateStatus={errors.phuongxa ? 'error' : ''}
              help={errors.phuongxa && errors.phuongxa.message}
              htmlFor="phuongxa"
            >
              <Controller
                name="phuongxa"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      className={clsx(style.inputSelect)}
                      allowClear // cho phép hiển thị nút xóa
                      placeholder="Chọn Phường/Xã"
                      id="phuongxa"
                      disabled={isDistrict === false ? true : false}
                      options={listWards}
                      onChange={(selectedValue) => {
                        field.onChange(selectedValue); // Cập nhật thủ công giá trị trong React Hook Form => xóa error đi
                      }}
                    />
                  );
                }}
              />
            </Form.Item>

            {/* địa chỉ giao hàng, số nhà cụ thể*/}
            <Form.Item
              label="Địa chỉ"
              name="diachi_cuthe"
              validateStatus={errors.diachi_cuthe ? 'error' : ''}
              help={errors.diachi_cuthe && errors.diachi_cuthe.message}
              htmlFor="diachi_cuthe"
            >
              <Controller
                name="diachi_cuthe"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    rows={2}
                    placeholder="Ví dụ: Bưu điện, Phường Tiên Phong"
                    id="diachi_cuthe"
                    allowClear
                    // autoSize
                  />
                )}
              />
            </Form.Item>
            {/* button submit */}
            <Form.Item className={clsx(style.wrapBtn)} label=".">
              {/* nếu có truyền phone xuống => hiện thị nút Update => còn lại mặc định là thêm sản phẩm */}
              <Button type="primary" htmltype="submit" variant="contained" className={clsx(style.btnAdd)}>
                Cập nhật địa chỉ giao hàng
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Box>
    </Box>
  );
}

export default memo(AddressUser);
