import PropTypes from 'prop-types';
import { memo, lazy, useState, useEffect, useRef } from 'react';
import style from './Info.module.scss';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axiosClient from '~/apis/axiosClient';
import getTokenCookie from '~/utils/getTokenCookie';
import { Alert } from 'antd';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Form, Input, Upload, Select, Spin, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import BackTop from '~/components/BackTop';
import userApi from '~/apis/userApi.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const Header = lazy(() => import('~/components/Header'));
// const Footer = lazy(() => import('~/components/Footer'));
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { IconHisToryOrder } from '~/assets/iconSVG.jsx';
import editImage from '~/assets/images/editImage.png';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '~/redux/userSlice.js';

// PropTypes
Info.propTypes = {};

function Info(props) {
  const dispatch = useDispatch();
  //  --- LẤY THÔNG TIN CỦA USER TRONG REDUX ---ĐỂ HIỆN THỊ RA BÊN TABBAR BÊN PHẢI ---
  const userLogin = useSelector((state) => state?.userAuth?.user);

  // -------------------UPDATE Image Avartar-----------------

  // trước khi update ảnh
  const beforeUpload = (file) => {
    // kiểm tra đúng là ảnh jpg,png
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên tệp JPG/PNG!');
    }
    // check size của ảnh
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Hình ảnh phải nhỏ hơn 2MB!');
    // }
    return isJpgOrPng;
  };
  // image để hiển thị preview
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(userLogin?.img_url ? userLogin?.img_url : '');
  const [isAlert, setIsAlert] = useState(false);

  //  ---CẬP NHẬT ẢNH ĐẠI DIỆN USER ---
  // ---------ACTION UPDATE IMAGES --------
  const hanldeUpdateImage = (info) => {
    // Tạo một đối tượng FormData để gửi tệp tin và token
    const formData = new FormData();

    formData.append('image_urls', info); // upload 1 ảnh => tải lên 1 ảnh đại diện

    setLoading(true);
    axiosClient
      .post('/phone/uploadurl/url', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Đặt tiêu đề Content-Type
        },
      })
      .then((response) => {
        // set lại để hiển thị ảnh ra PREVIEW GIAO DIỆN
        setImageUrl(response?.data[0]);

        //  SAU KHI TẢI ĐƯỢC ẢNH TRÊN SERVER => CẬP NHẬT LẠI ẢNH CHO USER --
        const dataUpdateImageUser = {
          _id: userLogin?._id,
          img_url: response?.data[0],
        };

        // -- CẬP NHẬT USER ---
        userApi
          .updateOneUser(dataUpdateImageUser)
          .then((res) => {
            // console.log('cập nhật ảnh đại diện lên DB thành công', res);
            setLoading(false);
            setIsAlert(true);
            // -- LƯU LẠI THÔNG TIN USER VÀO REDUX --
            dispatch(updateUser(res?.data));
          })
          .catch((err) => {
            console.log('cập nhật ảnh đại diện thất bại', err);
          });
      })
      .catch((err) => {
        console.log('update ảnh thất bại', err);
        setLoading(false);
      });
  };

  // SAU 3S setTimeout đóng Alert đi
  useEffect(() => {
    const id = setTimeout(() => {
      setIsAlert(false);
    }, 3000);

    () => {
      return clearTimeout(id);
    };
  });

  // khi không có ảnh mặc định hiện thị nút UPLOAD
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
          fontSize: '1.6rem',
        }}
      >
        Upload
      </div>
    </div>
  );

  // ---------------------- REACT HOOK FORM ------------
  // ------YUP-VALIDAION
  // yup validation
  // validation form yup => schema
  const regexPhoneNumber = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
  const schema = yup.object().shape({
    nameUser: yup.string().required('Họ & Tên không được để trống !'),
    phoneNumber: yup
      .string()
      .matches(regexPhoneNumber, 'Nhập đúng định dạng số điện thoại')
      .required('Nhập số điện thoại'),
    thanhpho: yup.string().required('Vui lòng chọn Tỉnh/Thành phố !'),
    quanhuyen: yup.string().required('Vui lòng chọn Quận/Huyện !'),
    phuongxa: yup.string().required('Vui lòng chọn Phường/Xã !'),
    diachi_cuthe: yup.string().required('Vui lòng nhập địa chỉ !'),
  });
  // react hook form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // nếu có data => truyền vào => lấy data đó, còn mặc đinh là ''
    defaultValues: {
      nameUser: userLogin?.username ? userLogin?.username : '',
      phoneNumber: userLogin?.phoneNumber ? userLogin?.phoneNumber : '',
    }, // Thêm defaultValues ở đây
  });

  //  --- CẬP NHẬT CÁC THÔNG TIN KHÁC CỦA USER ---
  const onSubmit = (data) => {
    setLoading(true);
    // --- DATA ĐỂ CẬP NHẬT LẠI THÔNG TIN USER --
    const newData = {
      _id: userLogin?._id,
      username: data?.nameUser,
      phoneNumber: data?.phoneNumber,
      address: {
        Tỉnh_Thành_phố: data?.thanhpho,
        Quận_Huyện: data?.quanhuyen,
        Phường_Xã: data?.phuongxa,
        Địa_chỉ: data?.diachi_cuthe,
      },
    };

    // -- CẬP NHẬT USER LÊN SERVER ---
    userApi
      .updateOneUser(newData)
      .then((res) => {
        setLoading(false);
        toast.success('Cập nhật thông tin thành công', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // -- LƯU LẠI THÔNG TIN USER VÀO REDUX --
        dispatch(updateUser(res?.data));
      })
      .catch((err) => {
        setLoading(false);
        console.log('cập nhật thông tin user thất bại', err);
        toast.error('Cập nhật thông tin thất bại', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  // -------------ĐỊA CHỈ GIAO HÀNG -----------
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

  // ---- RETURN JSX------
  return (
    <Box className={clsx(style.wrapPageInfo)}>
      {/* Header Info */}
      <Header />

      {/* Content PageInfo */}
      <Box className={clsx(style.mainPageInfo)}>
        <Box className={clsx(style.contentPageInfo)}>
          {/* breadcrumb */}
          <Box className={clsx(style.breadcrumb)}>
            <Link to="/" className={clsx(style.linkBreadcrumb)}>
              <Typography
                className={clsx(style.text)}
                color={(theme) => theme?.palette?.text?.primary6}
                sx={{
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Trang chủ
              </Typography>
            </Link>

            <ArrowForwardIosIcon
              className={clsx(style.icon)}
              sx={{
                color: (theme) => theme?.palette?.text?.primary6,
              }}
            />
            <Link to="/info" className={clsx(style.linkBreadcrumb)}>
              <Typography
                className={clsx(style.text)}
                color={(theme) => theme?.palette?.text?.primary4}
                sx={{
                  fontWeight: '500',
                }}
              >
                Thông tin tài khoản
              </Typography>
            </Link>
          </Box>

          {/* edit account */}
          <Box className={clsx(style.wrapAccount)}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, lg: 2 }}>
              {/* slider bar account */}
              <Grid lg={2.6}>
                <Box className={clsx(style.sideBar)}>
                  {/* box avartar */}
                  <Box className={clsx(style.headerAvartar)}>
                    <Avatar srcSet={userLogin?.img_url ? userLogin?.img_url : ''} className={clsx(style.avatar)} />
                    <Box className={clsx(style.infoUser)}>
                      <Typography className={clsx(style.text1)}>Tài khoản của</Typography>
                      <Typography className={clsx(style.text2)}>
                        {userLogin?.username ? userLogin?.username : ''}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Box select */}
                  <Box className={clsx(style.selectSideBar)}>
                    <Link className={clsx(style.link)} to="/info">
                      <Box className={clsx(style.liSidebar, style.active)}>
                        <PersonIcon className={clsx(style.icon)} />
                        <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                          Thông tin tài khoản
                        </Typography>
                      </Box>
                    </Link>
                    <Link className={clsx(style.link)} to="/order/history">
                      <Box
                        className={clsx(style.liSidebar)}
                        sx={{
                          '& svg': {
                            width: '24px',
                            height: '24px',
                            color: 'rgb(155, 155, 155)',
                          },
                        }}
                      >
                        <IconHisToryOrder className={clsx(style.icon)} />
                        <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                          Quản lý đơn hàng
                        </Typography>
                      </Box>
                    </Link>
                  </Box>
                </Box>
              </Grid>
              {/* container account */}
              <Grid lg={9.4}>
                {/* KHI ĐANG CẬP NHẬT THÔNG TIN HIỂN THỊ SPIN RA NHÉ */}
                {loading ? (
                  <Spin>
                    <Box className={clsx(style.container)}>
                      {/* header */}
                      <Typography className={clsx(style.label)}>Thông tin tài khoản</Typography>
                      {/* Info */}
                      <Box className={clsx(style.infoPage)}>
                        <Box className={clsx(style.info)}>
                          <Typography className={clsx(style.title)} color={(theme) => theme?.palette?.text?.primary6}>
                            Thông tin cá nhân
                          </Typography>
                          {/*  */}
                          <Box className={clsx(style.accountInfo)}>
                            {/* update image url */}
                            <Box className={clsx(style.wrapUpdateImage)}>
                              <Upload
                                name="avatar"
                                listType="picture-circle"
                                className={clsx(style.avatarUpload)}
                                showUploadList={false}
                                // action="http://localhost:8080/api/phone/uploadurl/url"
                                action={hanldeUpdateImage}
                                beforeUpload={beforeUpload}
                                // onChange={handleChange}
                              >
                                {imageUrl ? (
                                  <Box className={clsx(style.imageUpdloadSuccess)}>
                                    <img
                                      src={imageUrl}
                                      alt="avatar"
                                      style={{
                                        width: '100%',
                                        borderRadius: '50%',
                                        // border: '3px solid rgb(194, 225, 255)',
                                      }}
                                      className={clsx(style.imageActive)}
                                    />
                                    <Box className={clsx(style.wrapImageEdit)}>
                                      <img src={editImage} alt="edit" className={clsx(style.iconEdit)} />
                                    </Box>
                                  </Box>
                                ) : (
                                  uploadButton
                                )}
                              </Upload>
                              {/* THÔNG BÁO HIỆN THỊ KHI CẬP NHẬT ẢNH ĐẠI DIỆN THÀNH CÔNG */}
                              {isAlert && (
                                <Alert
                                  className={clsx(style.wrapAletUpdateImage)}
                                  message="Cập nhật ảnh đại diện thành công"
                                  type="success"
                                  showIcon
                                  closable
                                />
                              )}
                            </Box>
                            {/* Form UPDATE info user */}
                            <Box className={clsx(style.wrapFormUpdate)}>
                              {/* form */}
                              <Form onFinish={handleSubmit(onSubmit)} className={clsx(style.wrapForm)}>
                                {/* TÊN USER UPDATE*/}
                                <Form.Item
                                  label="Họ & Tên"
                                  name="nameUser"
                                  validateStatus={errors.nameUser ? 'error' : ''}
                                  help={errors.nameUser && errors.nameUser.message}
                                  htmlFor="nameUser"
                                >
                                  <Controller
                                    name="nameUser"
                                    control={control}
                                    render={({ field }) => (
                                      <Input {...field} placeholder="Họ & Tên" id="nameUser" allowClear />
                                    )}
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
                                <Form.Item>
                                  {/* nếu có truyền phone xuống => hiện thị nút Update => còn lại mặc định là thêm sản phẩm */}

                                  <Button
                                    type="primary"
                                    htmltype="submit"
                                    variant="contained"
                                    className={clsx(style.btnAdd)}
                                  >
                                    Lưu thay đổi
                                  </Button>
                                </Form.Item>
                              </Form>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Spin>
                ) : (
                  <Box className={clsx(style.container)}>
                    {/* header */}
                    <Typography className={clsx(style.label)}>Thông tin tài khoản</Typography>
                    {/* Info */}
                    <Box className={clsx(style.infoPage)}>
                      <Box className={clsx(style.info)}>
                        <Typography className={clsx(style.title)} color={(theme) => theme?.palette?.text?.primary6}>
                          Thông tin cá nhân
                        </Typography>
                        {/*  */}
                        <Box className={clsx(style.accountInfo)}>
                          {/* update image url */}
                          <Box className={clsx(style.wrapUpdateImage)}>
                            <Upload
                              name="avatar"
                              listType="picture-circle"
                              className={clsx(style.avatarUpload)}
                              showUploadList={false}
                              // action="http://localhost:8080/api/phone/uploadurl/url"
                              action={hanldeUpdateImage}
                              beforeUpload={beforeUpload}
                              // onChange={handleChange}
                            >
                              {imageUrl ? (
                                <Box className={clsx(style.imageUpdloadSuccess)}>
                                  <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                      width: '100%',
                                      borderRadius: '50%',
                                      // border: '3px solid rgb(194, 225, 255)',
                                    }}
                                    className={clsx(style.imageActive)}
                                  />
                                  <Box className={clsx(style.wrapImageEdit)}>
                                    <img src={editImage} alt="edit" className={clsx(style.iconEdit)} />
                                  </Box>
                                </Box>
                              ) : (
                                uploadButton
                              )}
                            </Upload>
                            {/* THÔNG BÁO HIỆN THỊ KHI CẬP NHẬT ẢNH ĐẠI DIỆN THÀNH CÔNG */}
                            {isAlert && (
                              <Alert
                                className={clsx(style.wrapAletUpdateImage)}
                                message="Cập nhật ảnh đại diện thành công"
                                type="success"
                                showIcon
                                closable
                              />
                            )}
                          </Box>
                          {/* Form UPDATE info user */}
                          <Box className={clsx(style.wrapFormUpdate)}>
                            {/* form */}
                            <Form onFinish={handleSubmit(onSubmit)} className={clsx(style.wrapForm)}>
                              {/* TÊN USER UPDATE*/}
                              <Form.Item
                                label="Họ & Tên"
                                name="nameUser"
                                validateStatus={errors.nameUser ? 'error' : ''}
                                help={errors.nameUser && errors.nameUser.message}
                                htmlFor="nameUser"
                              >
                                <Controller
                                  name="nameUser"
                                  control={control}
                                  render={({ field }) => (
                                    <Input {...field} placeholder="Họ & Tên" id="nameUser" allowClear />
                                  )}
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
                              <Form.Item>
                                {/* nếu có truyền phone xuống => hiện thị nút Update => còn lại mặc định là thêm sản phẩm */}

                                <Button
                                  type="primary"
                                  htmltype="submit"
                                  variant="contained"
                                  className={clsx(style.btnAdd)}
                                >
                                  Lưu thay đổi
                                </Button>
                              </Form.Item>
                            </Form>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Back top */}
      <BackTop />

      {/* ToastContainer */}
      <ToastContainer />
    </Box>
  );
}

export default memo(Info);
