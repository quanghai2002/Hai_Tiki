import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import style from './AddPhone.module.scss';
import clsx from 'clsx';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { Form, Input, Upload, Select, Spin } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal } from 'antd';
import axiosClient from '~/apis/axiosClient.js';
import getTokenCookie from '~/utils/getTokenCookie';
import categoryApi from '~/apis/category.js';
import brandsApi from '~/apis/brands.js';
import phoneApi from '~/apis/phoneApi.js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// upload ảnh
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// Proptyoe
AddPhone.propTypes = {
  phoneBuyId: PropTypes.object,
};

// Sử dụng forwardRef để truyền ref vào function component
function AddPhone({ phoneBuyId }) {
  // thông tin sản phẩm để => chuẩn bị update
  console.log({ phoneBuyId });

  // token
  const token = getTokenCookie();
  const navigate = useNavigate();
  // yup validation
  const schema = yup.object().shape({
    namePhone: yup.string().required('Vui lòng nhập tên sản phẩm !').min(5, 'Nhập tối thiểu 5 kí tự cho sản phẩm !'),
    pricePhone: yup.string().required('Vui lòng nhập giá sản phẩm !'),
    description: yup
      .string()
      .required('Vui lòng nhập mô tả sản phẩm !')
      .min(5, 'Nhập tối thiểu 5 kí tự cho mô tả sản phẩm !'),
    dungluong_pin: yup.number().required('Vui lòng nhập dung lượng pin !'),
    mausac: yup.string().required('Vui lòng nhập màu sắc sản phẩm !'),
    bo_nho: yup.string().required('Vui lòng nhập bộ nhớ !'),
    kich_thuoc_man_hinh: yup.string().required('Vui lòng nhập kích thước màn hình !'),
    camera: yup.string().required('Vui lòng nhập thông số camera !'),
    CPU: yup.string().required('Vui lòng nhập thông số CPU !'),
    RAM: yup.string().required('Vui lòng nhập thông số RAM !'),
    ROM: yup.string().required('Vui lòng nhập thông số ROM !'),
    he_dieu_hanh: yup.string().required('Vui lòng nhập hệ điều hành!'),
    stock_quantity: yup.string().required('Vui lòng nhập số lượng sản phẩm !'),
    promotion: yup.string().required('Vui lòng nhập khuyễn mãi cho sản phẩm !'),
    category: yup.string().required('Vui lòng nhập danh mục sản phẩm !'),
    brand: yup.string().required('Vui lòng nhập tên thương hiệu sản phẩm !'),
  });

  // react hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // nếu có data => truyền vào => lấy data đó, còn mặc đinh là ''
    defaultValues: {
      namePhone: phoneBuyId ? phoneBuyId?.name : '',
      pricePhone: phoneBuyId ? phoneBuyId?.price : '',
      description: phoneBuyId ? phoneBuyId?.description : '',
      dungluong_pin: phoneBuyId ? phoneBuyId?.dung_luong_pin.split(' ')[0] : '',
      mausac: phoneBuyId ? phoneBuyId?.mau_sac : '',
      bo_nho: phoneBuyId ? phoneBuyId?.bo_nho : '',
      kich_thuoc_man_hinh: phoneBuyId ? phoneBuyId?.kich_thuoc_man_hinh : '',
      camera: phoneBuyId ? phoneBuyId?.camera : '',
      CPU: phoneBuyId ? phoneBuyId?.CPU : '',
      RAM: phoneBuyId ? phoneBuyId?.RAM : '',
      ROM: phoneBuyId ? phoneBuyId?.ROM : '',
      he_dieu_hanh: phoneBuyId ? phoneBuyId?.he_dieu_hanh : '',
      stock_quantity: phoneBuyId ? phoneBuyId?.stock_quantity : '',
      promotion: phoneBuyId ? phoneBuyId?.promotion.slice(0, phoneBuyId?.promotion.length - 1) : '',
      category: phoneBuyId ? phoneBuyId?.category?.name : '',
      brand: phoneBuyId ? phoneBuyId?.brand?.name : '',
      // image_urls: phoneBuyId ? phoneBuyId?.image_urls : '',
    }, // Thêm defaultValues ở đây bo_nho: '32GB'
  });

  // upload => ảnh
  const [uploadError, setUploadError] = useState(false);
  const uploadRef = useRef();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]); // nếu có thông tin url hình ảnh sản phẩm thì lấy
  const [listUrlImage, setListUrlImgae] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  // console.log({ fileList });
  const handleCancel = () => setPreviewOpen(false);

  // console.log({ uploadError });
  // xem privew hình ảnh
  const handlePreview = async (file) => {
    // console.log({ file });
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  // khi onchange hình ảnh =bắt buộc phải chọn ít nhất 1 ảnh => và requet lên server để lấy lại url hình ảnh
  const handleChange = ({ fileList: newFileList }) => {
    // số lượng ảnh đã chọn
    const countImage = newFileList.length;
    // console.log({ newFileList });
    // console.log({ countImage });
    // nếu có > 0 sản phẩm xóa error upload đi
    if (countImage > 0) {
      setUploadError(true);
    } else {
      setUploadError(false);
    }

    // khi vào onchange thay đổi hình ảnh => thì requet lấy lại danh sách url hình ảnh => cho đồng nhất

    // Tạo một đối tượng FormData để gửi tệp tin và token
    const formData = new FormData();

    // uploade => nhiều ảnh 1 lúc
    // Duyệt qua từng tệp trong fileList và thêm vào formData
    newFileList.forEach((file, index) => {
      formData.append('image_urls', file.originFileObj); // upload nhiều ảnh 1 lúc
    });
    // formData.append('image_urls', file); // upload 1 ảnh
    formData.append('token', token);

    axiosClient
      .post('/phone/uploadurl/url', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Đặt tiêu đề Content-Type
        },
      })
      .then((response) => {
        setListUrlImgae(response?.data);
        // onSuccess();
      })
      .catch((err) => {
        console.log(err);
        // onError();
      });

    return setFileList(newFileList);
  };

  console.log({ fileList });

  // khi dữ liệu đã đủ => gửi biểu mẫu

  // console.log('danh sách hình ảnh', fileList.length);
  // console.log({ listUrlImage });

  const onSubmit = async (data) => {
    setLoading(true);
    // nếu đã chọn ít nhất 1 ảnh => mới cho gửi data => nếu không foucs vào input giả gần đó
    if (uploadError) {
      // console.log({ data });
      // data creat category and brand
      const category = data?.category.trim().toUpperCase();
      const brand = data?.brand.trim().toUpperCase();
      // POST => tạo danh mục sản phẩm trước
      const paramCategory = {
        name: category,
        products: [], // chưa có sản phẩm để
      };

      // param thương hiệu sản phẩm
      const paramBrands = {
        name: brand,
        description: '',
        logo_url: '',
        products: [],
      };

      try {
        // add danh mục sản phẩm => và lấy id danh mục sản phẩm về
        const category = await categoryApi.insertCategory(paramCategory);
        const idCategory = category?.data?._id;

        // add thương hiệu ==> brand => và lấy id thương hiệu sản phẩm => brands
        const brand = await brandsApi.insertBrand(paramBrands);
        const idBrand = brand?.data?._id;

        // sau khi có id caterogy và id của brand => thêm sản phẩm mới thôi => yup !
        //new data => add phone
        const newData = {
          name: data?.namePhone,
          description: data?.description,
          price: Number.parseFloat(data?.pricePhone),
          dung_luong_pin: `${data?.dungluong_pin} mAh`,
          mau_sac: data?.mausac,
          bo_nho: data?.bo_nho,
          kich_thuoc_man_hinh: Number.parseFloat(data?.kich_thuoc_man_hinh),
          camera: `${data?.camera}MP`,
          CPU: data?.CPU,
          RAM: data?.RAM,
          ROM: data?.ROM,
          he_dieu_hanh: data?.he_dieu_hanh,
          stock_quantity: Number.parseInt(data?.stock_quantity),
          image_urls: listUrlImage,
          promotion: `${data?.promotion}%`,
          category: idCategory,
          brand: idBrand,
          reviews: [],
        };
        // thêm sản phẩm => lấy id của phone
        // console.log({ newData });
        const dataResponsePhone = await phoneApi.insetPhone(newData);
        // console.log({ dataResponsePhone });
        const idPhone = dataResponsePhone?.data?._id;

        // sau khi thêm sản phẩm thành công update ngược lại => thêm sản phẩm đó vào danh mục sản phẩm và thương hiệu đó
        // phải get danh mục sản phẩm trước sau đó mới => update lại => để bản tồn sản phẩm trong đó
        // let newParamCaterogy = {
        //   ...paramCategory,
        //   products: [...paramCategory.products, idPhone],
        // };
        // const updataCategory = await categoryApi.insertCategory(newParamCaterogy);
        // console.log({ updataCategory });

        setLoading(false);
        toast.success('Thêm sản phẩm thành công', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // chuyển đến trang xem các sản phẩm
        setTimeout(() => {
          navigate('/homepage');
        }, 3000);
        // navigatae => đến trang home
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error('Thêm sản phẩm thất bại thử lại !', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } else {
      uploadRef.current.focus();
    }
  };

  // button upload
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // custom requet gửi upload => sau đó lưu các ảnh đó vào => setListUrlImgae

  const customRequest = ({ onSuccess, onError }) => {
    // Tạo một đối tượng FormData để gửi tệp tin và token
    const formData = new FormData();

    // uploade => nhiều ảnh 1 lúc
    // Duyệt qua từng tệp trong fileList và thêm vào formData
    fileList.forEach((file, index) => {
      formData.append('image_urls', file.originFileObj); // upload nhiều ảnh 1 lúc
    });
    // formData.append('image_urls', file); // upload 1 ảnh
    formData.append('token', token);

    axiosClient
      .post('/phone/uploadurl/url', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Đặt tiêu đề Content-Type
        },
      })
      .then((response) => {
        setListUrlImgae(response?.data);
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        onError();
      });
  };

  // console.log({ errors });
  return (
    // khi đang loading => gửi yêu cầu đến server => hiện loading
    <Box
      sx={{
        backgroundColor: '#ffff',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2)',
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: 936,
        margin: 'auto',
      }}
    >
      {loading ? (
        <Spin>
          <Paper sx={{ maxWidth: 936, maxHeight: 520, marginRight: '6px', overflow: 'auto', boxShadow: 'none' }}>
            <Form onFinish={handleSubmit(onSubmit)} className={clsx(style.wrapForm)}>
              {/* url link sản phẩm*/}
              <Form.Item
                label="Ảnh sản phẩm"
                validateStatus={!uploadError ? 'error' : ''}
                help={!uploadError && 'Chọn ít nhất 1 ảnh cho sản phẩm'}
                // validateStatus={errors.image_urls ? 'error' : ''}
                // help={errors.image_urls && errors.image_urls.message}
                htmlFor="image_urls"
              >
                <Controller
                  name="image_urls"
                  control={control}
                  render={({ field }) => (
                    <Box className={clsx(style.wrapUpload)}>
                      <Upload
                        // action="http://localhost:8080/api/phone/uploadurl/url" // url tải lên
                        customRequest={customRequest}
                        listType="picture-card"
                        enctype="multipart/form-data"
                        name="image_urls"
                        fileList={fileList} // danh sách các tệp đc tải lên hoặc các ảnh mặc định ban đầu
                        onPreview={handlePreview}
                        onChange={handleChange}
                        maxCount={10} // Số lượng tối đa cho phép
                        multiple // cho phép upload nhiều
                        className={clsx({
                          [style.error]: uploadError === false,
                          // [style.error]: Boolean(errors.image_urls),
                        })}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>

                      {/* input ẩn để focus => khi chưa chọn ảnh nào */}
                      <input className={clsx(style.inputHide)} ref={uploadRef} />
                      {/*  */}
                      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                          alt="example"
                          style={{
                            width: '100%',
                          }}
                          src={previewImage}
                        />
                      </Modal>
                    </Box>
                  )}
                />
              </Form.Item>

              {/* tên sản phẩm */}
              <Form.Item
                label="Tên sản phẩm"
                name="namePhone"
                validateStatus={errors.namePhone ? 'error' : ''}
                help={errors.namePhone && errors.namePhone.message}
                htmlFor="namePhone"
              >
                <Controller
                  name="namePhone"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Tên sản phẩm" id="namePhone" />}
                />
              </Form.Item>

              {/* giá sản phẩm */}
              <Form.Item
                label="Giá sản phẩm"
                name="pricePhone"
                validateStatus={errors.pricePhone ? 'error' : ''}
                help={errors.pricePhone && errors.pricePhone.message}
                htmlFor="pricePhone"
                step={2}
              >
                <Controller
                  name="pricePhone"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Nhập giá sản phẩm" id="pricePhone" type="number" min={1} />
                    // <InputNumber {...field} placeholder="Nhập giá sản phẩm" id="pricePhone" size="middle" min={1} />
                  )}
                />
              </Form.Item>
              {/* mô tả sản phẩm */}
              <Form.Item
                label="Mô tả sản phẩm"
                name="description"
                validateStatus={errors.description ? 'error' : ''}
                help={errors.description && errors.description.message}
                htmlFor="description"
              >
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Nhập mô tả sản phẩm" id="description" />}
                />
              </Form.Item>

              {/* dung lượng pin */}
              <Form.Item
                label="Dung lượng pin"
                name="dungluong_pin"
                validateStatus={errors.dungluong_pin ? 'error' : ''}
                help={errors.dungluong_pin && errors.dungluong_pin.message}
                htmlFor="dungluong_pin"
              >
                <Controller
                  name="dungluong_pin"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập dung lượng pin sản phẩm"
                      id="dungluong_pin"
                      type="number"
                      min={0}
                    />
                  )}
                />
              </Form.Item>

              {/* màu sắc */}
              <Form.Item
                label="Màu sắc"
                name="mausac"
                validateStatus={errors.mausac ? 'error' : ''}
                help={errors.mausac && errors.mausac.message}
                htmlFor="mausac"
              >
                <Controller
                  name="mausac"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Nhập màu sắc sản phẩm" id="mausac" />}
                />
              </Form.Item>

              {/* bộ nhớ */}
              <Form.Item
                label="Bộ nhớ"
                name="bo_nho"
                validateStatus={errors.bo_nho ? 'error' : ''}
                help={errors.bo_nho && errors.bo_nho.message}
                htmlFor="bo_nho"
              >
                <Controller
                  name="bo_nho"
                  control={control}
                  render={({ field }) => {
                    // return <Input {...field} placeholder="Nhập bộ nhớ" id="bo_nho" type="number" min={0} />;
                    return (
                      // <Select {...field}>
                      //   <Select.Option value="32GB">32GB</Select.Option>
                      //   <Select.Option value="64GB">64GB</Select.Option>
                      //   <Select.Option value="1TB">1TB</Select.Option>
                      // </Select>
                      <Select
                        {...field}
                        // defaultValue="32GB"
                        className={clsx(style.inputSelect)}
                        allowClear // cho phép hiển thị nút xóa
                        placeholder="Chọn bộ nhớ sản phẩm"
                        id="bo_nho"
                        options={[
                          {
                            value: '32GB',
                            label: '32GB',
                          },
                          {
                            value: '64GB',
                            label: '64GB',
                          },
                          {
                            value: '1TB',
                            label: '1TB',
                          },
                        ]}
                      />
                    );
                  }}
                />
              </Form.Item>

              {/* kich_thuoc_man_hinh */}
              <Form.Item
                label="Kích thước mà hình"
                name="kich_thuoc_man_hinh"
                validateStatus={errors.kich_thuoc_man_hinh ? 'error' : ''}
                help={errors.kich_thuoc_man_hinh && errors.kich_thuoc_man_hinh.message}
                htmlFor="kich_thuoc_man_hinh"
              >
                <Controller
                  name="kich_thuoc_man_hinh"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập kích thước màn hình"
                      id="kich_thuoc_man_hinh"
                      type="number"
                      min={0}
                      step="0.1"
                    />
                  )}
                />
              </Form.Item>

              {/* camera */}
              <Form.Item
                label="Thông số camera"
                name="camera"
                validateStatus={errors.camera ? 'error' : ''}
                help={errors.camera && errors.camera.message}
                htmlFor="camera"
              >
                <Controller
                  name="camera"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Nhập thông số camera,Vd:48MP" id="camera" />}
                />
              </Form.Item>

              {/* CPU */}
              <Form.Item
                label="Thông số CPU"
                name="CPU"
                validateStatus={errors.CPU ? 'error' : ''}
                help={errors.CPU && errors.CPU.message}
                htmlFor="CPU"
              >
                <Controller
                  name="CPU"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Nhập thông số CPU,Vd:4 nhân 2.35 GHz & 4 nhân 1.8 GHz" id="CPU" />
                  )}
                />
              </Form.Item>
              {/* RAM */}
              <Form.Item
                label="Thông số RAM"
                name="RAM"
                validateStatus={errors.RAM ? 'error' : ''}
                help={errors.RAM && errors.RAM.message}
                htmlFor="RAM"
              >
                <Controller
                  name="RAM"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        className={clsx(style.inputSelect)}
                        allowClear // cho phép hiển thị nút xóa
                        placeholder="Chọn thông số RAM"
                        id="RAM"
                        options={[
                          {
                            value: '4GB',
                            label: '4GB',
                          },
                          {
                            value: '6GB',
                            label: '6GB',
                          },
                          {
                            value: '8GB',
                            label: '8GB',
                          },
                          {
                            value: '12GB',
                            label: '12GB',
                          },
                          {
                            value: '16GB',
                            label: '16GB',
                          },
                        ]}
                      />
                    );
                    // <Input {...field} placeholder="Nhập thông số RAM" id="RAM" type="number" min={0} />
                  }}
                />
              </Form.Item>

              {/* ROM */}
              <Form.Item
                label="Thông số ROM"
                name="ROM"
                validateStatus={errors.ROM ? 'error' : ''}
                help={errors.ROM && errors.ROM.message}
                htmlFor="ROM"
              >
                <Controller
                  name="ROM"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        className={clsx(style.inputSelect)}
                        allowClear // cho phép hiển thị nút xóa
                        placeholder="Chọn thông số ROM"
                        id="ROM"
                        options={[
                          {
                            value: '128GB',
                            label: '128GB',
                          },
                          {
                            value: '256GB',
                            label: '256GB',
                          },
                          {
                            value: '512GB',
                            label: '512GB',
                          },
                        ]}
                      />
                    );
                    // <Input {...field} placeholder="Nhập thông số ROM" id="ROM" type="number" min={0} />
                  }}
                />
              </Form.Item>

              {/* he_dieu_hanh */}
              <Form.Item
                label="Hệ điều hành"
                name="he_dieu_hanh"
                validateStatus={errors.he_dieu_hanh ? 'error' : ''}
                help={errors.he_dieu_hanh && errors.he_dieu_hanh.message}
                htmlFor="he_dieu_hanh"
              >
                <Controller
                  name="he_dieu_hanh"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Nhập thông số he_dieu_hanh" id="he_dieu_hanh" />
                  )}
                />
              </Form.Item>

              {/* số lượng sản phẩm */}
              <Form.Item
                label="Số lượng sản phẩm"
                name="stock_quantity"
                validateStatus={errors.stock_quantity ? 'error' : ''}
                help={errors.stock_quantity && errors.stock_quantity.message}
                htmlFor="stock_quantity"
              >
                <Controller
                  name="stock_quantity"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Nhập số lượng sản phẩm " id="stock_quantity" type="number" min={0} />
                  )}
                />
              </Form.Item>

              {/* khuyến mãi */}
              <Form.Item
                label="Khuyến mãi"
                name="promotion"
                validateStatus={errors.promotion ? 'error' : ''}
                help={errors.promotion && errors.promotion.message}
                htmlFor="promotion"
              >
                <Controller
                  name="promotion"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Nhập % khuyễn mãi cho sản phẩm: Vd:30% "
                      id="promotion"
                      type="number"
                      min={0}
                    />
                  )}
                />
              </Form.Item>

              {/* category => danh mục sản phẩm */}
              <Form.Item
                label="Danh mục sản phẩm"
                name="category"
                validateStatus={errors.category ? 'error' : ''}
                help={errors.category && errors.category.message}
                htmlFor="category"
              >
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Nhập danh mục sản phẩm " id="category" />}
                />
              </Form.Item>

              {/* brand => thương hiệu sản phẩm */}
              <Form.Item
                label="Thương hiệu sản phẩm"
                name="brand"
                validateStatus={errors.brand ? 'error' : ''}
                help={errors.brand && errors.brand.message}
                htmlFor="brand"
              >
                <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Nhập tên thương hiệu sản phẩm " id="brand" />}
                />
              </Form.Item>
              {/* button submit */}
              <Form.Item>
                <Button type="primary" htmltype="submit" variant="contained" className={clsx(style.btnAdd)}>
                  Thêm sản phẩm
                </Button>
              </Form.Item>
            </Form>
          </Paper>
        </Spin>
      ) : (
        <Paper sx={{ maxWidth: 936, maxHeight: 520, marginRight: '6px', overflow: 'auto', boxShadow: 'none' }}>
          <Form onFinish={handleSubmit(onSubmit)} className={clsx(style.wrapForm)}>
            {/* url link sản phẩm*/}
            <Form.Item
              label="Ảnh sản phẩm"
              validateStatus={!uploadError ? 'error' : ''}
              help={!uploadError && 'Chọn ít nhất 1 ảnh cho sản phẩm'}
              // validateStatus={errors.image_urls ? 'error' : ''}
              // help={errors.image_urls && errors.image_urls.message}
              htmlFor="image_urls"
            >
              <Controller
                name="image_urls"
                control={control}
                render={({ field }) => (
                  <Box className={clsx(style.wrapUpload)}>
                    <Upload
                      // action="http://localhost:8080/api/phone/uploadurl/url" // url tải lên
                      customRequest={customRequest}
                      listType="picture-card"
                      enctype="multipart/form-data"
                      name="image_urls"
                      fileList={fileList} // danh sách các tệp đc tải lên
                      onPreview={handlePreview}
                      onChange={handleChange}
                      maxCount={10} // Số lượng tối đa cho phép
                      multiple // cho phép upload nhiều
                      className={clsx({
                        [style.error]: uploadError === false,
                        // [style.error]: Boolean(errors.image_urls),
                      })}
                    >
                      {fileList.length >= 8 ? null : uploadButton}
                    </Upload>

                    {/* input ẩn để focus => khi chưa chọn ảnh nào */}
                    <input className={clsx(style.inputHide)} ref={uploadRef} />
                    {/*  */}
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <img
                        alt="example"
                        style={{
                          width: '100%',
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </Box>
                )}
              />
            </Form.Item>

            {/* tên sản phẩm */}
            <Form.Item
              label="Tên sản phẩm"
              name="namePhone"
              validateStatus={errors.namePhone ? 'error' : ''}
              help={errors.namePhone && errors.namePhone.message}
              htmlFor="namePhone"
            >
              <Controller
                name="namePhone"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Tên sản phẩm" id="namePhone" />}
              />
            </Form.Item>

            {/* giá sản phẩm */}
            <Form.Item
              label="Giá sản phẩm"
              name="pricePhone"
              validateStatus={errors.pricePhone ? 'error' : ''}
              help={errors.pricePhone && errors.pricePhone.message}
              htmlFor="pricePhone"
              step={2}
            >
              <Controller
                name="pricePhone"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Nhập giá sản phẩm" id="pricePhone" type="number" min={1} />
                  // <InputNumber {...field} placeholder="Nhập giá sản phẩm" id="pricePhone" size="middle" min={1} />
                )}
              />
            </Form.Item>
            {/* mô tả sản phẩm */}
            <Form.Item
              label="Mô tả sản phẩm"
              name="description"
              validateStatus={errors.description ? 'error' : ''}
              help={errors.description && errors.description.message}
              htmlFor="description"
            >
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập mô tả sản phẩm" id="description" />}
              />
            </Form.Item>

            {/* dung lượng pin */}
            <Form.Item
              label="Dung lượng pin"
              name="dungluong_pin"
              validateStatus={errors.dungluong_pin ? 'error' : ''}
              help={errors.dungluong_pin && errors.dungluong_pin.message}
              htmlFor="dungluong_pin"
            >
              <Controller
                name="dungluong_pin"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Nhập dung lượng pin sản phẩm"
                    id="dungluong_pin"
                    type="number"
                    min={0}
                  />
                )}
              />
            </Form.Item>

            {/* màu sắc */}
            <Form.Item
              label="Màu sắc"
              name="mausac"
              validateStatus={errors.mausac ? 'error' : ''}
              help={errors.mausac && errors.mausac.message}
              htmlFor="mausac"
            >
              <Controller
                name="mausac"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập màu sắc sản phẩm" id="mausac" />}
              />
            </Form.Item>

            {/* bộ nhớ */}
            <Form.Item
              label="Bộ nhớ"
              name="bo_nho"
              validateStatus={errors.bo_nho ? 'error' : ''}
              help={errors.bo_nho && errors.bo_nho.message}
              htmlFor="bo_nho"
            >
              <Controller
                name="bo_nho"
                control={control}
                render={({ field }) => {
                  // return <Input {...field} placeholder="Nhập bộ nhớ" id="bo_nho" type="number" min={0} />;
                  return (
                    // <Select {...field}>
                    //   <Select.Option value="32GB">32GB</Select.Option>
                    //   <Select.Option value="64GB">64GB</Select.Option>
                    //   <Select.Option value="1TB">1TB</Select.Option>
                    // </Select>
                    <Select
                      {...field}
                      // defaultValue="32GB"
                      className={clsx(style.inputSelect)}
                      allowClear // cho phép hiển thị nút xóa
                      placeholder="Chọn bộ nhớ sản phẩm"
                      id="bo_nho"
                      options={[
                        {
                          value: '32GB',
                          label: '32GB',
                        },
                        {
                          value: '64GB',
                          label: '64GB',
                        },
                        {
                          value: '1TB',
                          label: '1TB',
                        },
                      ]}
                    />
                  );
                }}
              />
            </Form.Item>

            {/* kich_thuoc_man_hinh */}
            <Form.Item
              label="Kích thước mà hình"
              name="kich_thuoc_man_hinh"
              validateStatus={errors.kich_thuoc_man_hinh ? 'error' : ''}
              help={errors.kich_thuoc_man_hinh && errors.kich_thuoc_man_hinh.message}
              htmlFor="kich_thuoc_man_hinh"
            >
              <Controller
                name="kich_thuoc_man_hinh"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Nhập kích thước màn hình"
                    id="kich_thuoc_man_hinh"
                    type="number"
                    min={0}
                    step="0.1"
                  />
                )}
              />
            </Form.Item>

            {/* camera */}
            <Form.Item
              label="Thông số camera"
              name="camera"
              validateStatus={errors.camera ? 'error' : ''}
              help={errors.camera && errors.camera.message}
              htmlFor="camera"
            >
              <Controller
                name="camera"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập thông số camera,Vd:48MP" id="camera" />}
              />
            </Form.Item>

            {/* CPU */}
            <Form.Item
              label="Thông số CPU"
              name="CPU"
              validateStatus={errors.CPU ? 'error' : ''}
              help={errors.CPU && errors.CPU.message}
              htmlFor="CPU"
            >
              <Controller
                name="CPU"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Nhập thông số CPU,Vd:4 nhân 2.35 GHz & 4 nhân 1.8 GHz" id="CPU" />
                )}
              />
            </Form.Item>
            {/* RAM */}
            <Form.Item
              label="Thông số RAM"
              name="RAM"
              validateStatus={errors.RAM ? 'error' : ''}
              help={errors.RAM && errors.RAM.message}
              htmlFor="RAM"
            >
              <Controller
                name="RAM"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      className={clsx(style.inputSelect)}
                      allowClear // cho phép hiển thị nút xóa
                      placeholder="Chọn thông số RAM"
                      id="RAM"
                      options={[
                        {
                          value: '4GB',
                          label: '4GB',
                        },
                        {
                          value: '6GB',
                          label: '6GB',
                        },
                        {
                          value: '8GB',
                          label: '8GB',
                        },
                        {
                          value: '12GB',
                          label: '12GB',
                        },
                        {
                          value: '16GB',
                          label: '16GB',
                        },
                      ]}
                    />
                  );
                  // <Input {...field} placeholder="Nhập thông số RAM" id="RAM" type="number" min={0} />
                }}
              />
            </Form.Item>

            {/* ROM */}
            <Form.Item
              label="Thông số ROM"
              name="ROM"
              validateStatus={errors.ROM ? 'error' : ''}
              help={errors.ROM && errors.ROM.message}
              htmlFor="ROM"
            >
              <Controller
                name="ROM"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      className={clsx(style.inputSelect)}
                      allowClear // cho phép hiển thị nút xóa
                      placeholder="Chọn thông số ROM"
                      id="ROM"
                      options={[
                        {
                          value: '128GB',
                          label: '128GB',
                        },
                        {
                          value: '256GB',
                          label: '256GB',
                        },
                        {
                          value: '512GB',
                          label: '512GB',
                        },
                      ]}
                    />
                  );
                  // <Input {...field} placeholder="Nhập thông số ROM" id="ROM" type="number" min={0} />
                }}
              />
            </Form.Item>

            {/* he_dieu_hanh */}
            <Form.Item
              label="Hệ điều hành"
              name="he_dieu_hanh"
              validateStatus={errors.he_dieu_hanh ? 'error' : ''}
              help={errors.he_dieu_hanh && errors.he_dieu_hanh.message}
              htmlFor="he_dieu_hanh"
            >
              <Controller
                name="he_dieu_hanh"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập thông số he_dieu_hanh" id="he_dieu_hanh" />}
              />
            </Form.Item>

            {/* số lượng sản phẩm */}
            <Form.Item
              label="Số lượng sản phẩm"
              name="stock_quantity"
              validateStatus={errors.stock_quantity ? 'error' : ''}
              help={errors.stock_quantity && errors.stock_quantity.message}
              htmlFor="stock_quantity"
            >
              <Controller
                name="stock_quantity"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Nhập số lượng sản phẩm " id="stock_quantity" type="number" min={0} />
                )}
              />
            </Form.Item>

            {/* khuyến mãi */}
            <Form.Item
              label="Khuyến mãi"
              name="promotion"
              validateStatus={errors.promotion ? 'error' : ''}
              help={errors.promotion && errors.promotion.message}
              htmlFor="promotion"
            >
              <Controller
                name="promotion"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Nhập % khuyễn mãi cho sản phẩm: Vd:30% "
                    id="promotion"
                    type="number"
                    min={0}
                  />
                )}
              />
            </Form.Item>

            {/* category => danh mục sản phẩm */}
            <Form.Item
              label="Danh mục sản phẩm"
              name="category"
              validateStatus={errors.category ? 'error' : ''}
              help={errors.category && errors.category.message}
              htmlFor="category"
            >
              <Controller
                name="category"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập danh mục sản phẩm " id="category" />}
              />
            </Form.Item>

            {/* brand => thương hiệu sản phẩm */}
            <Form.Item
              label="Thương hiệu sản phẩm"
              name="brand"
              validateStatus={errors.brand ? 'error' : ''}
              help={errors.brand && errors.brand.message}
              htmlFor="brand"
            >
              <Controller
                name="brand"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập tên thương hiệu sản phẩm " id="brand" />}
              />
            </Form.Item>
            {/* button submit */}
            <Form.Item>
              <Button type="primary" htmltype="submit" variant="contained" className={clsx(style.btnAdd)}>
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </Paper>
      )}
      <ToastContainer className={style.toastMessage} />;
    </Box>
  );
}

export default AddPhone;
