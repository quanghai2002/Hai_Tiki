import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import style from './AddPhone.module.scss';
import clsx from 'clsx';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';

// import { NumericFormat } from 'react-number-format';
// import { NumberFormat } from 'react-number-format';

import ReactDOM from 'react-dom';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
// import { Checkbox, Input } from '@material-ui/core';
import { Input as AntdInput } from 'antd';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NumericFormat } from 'react-number-format';

// Sử dụng forwardRef để truyền ref vào function component
function AddPhone(props, ref) {
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
  });

  // react hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { namePhone: '', pricePhone: '' }, // Thêm defaultValues ở đây
  });

  console.log({ errors });
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      {/* 
        
        
        
        <Form.Item label="Ảnh sản phẩm" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
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
          </Upload>
        </Form.Item>

     
        <Form.Item label="Danh mục sản phẩm">
          <Input />
        </Form.Item>

        <Form.Item label="Thương hiệu ">
          <Input />
        </Form.Item>

        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>

        <Button>Thêm sản phẩm</Button>
      </Form> */}

      {/* <form onSubmit={handleSubmit(onSubmit)} className={clsx(style.wrapForm)}>
        <Box>
          <label>Tên sản phẩm</label>
          <Controller
            render={({ field }) => {
              return <Input {...field} placeholder="Nhập tên sản phẩm" />;
            }}
            name="namePhone"
            control={control}
            defaultValue=""
            rules={{
              required: 'Vui lòng nhập',
            }}
            className="materialUIInput"
          />
        </Box>

        <label>First Name</label>
        <Controller
          render={({ field }) => <AntdInput {...field} />}
          name="lastName"
          control={control}
          defaultValue=""
        />

        <label>Ice Cream Preference</label>
        <Controller
          name="iceCreamType"
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
              ]}
            />
          )}
          control={control}
          defaultValue=""
        />
      </form> */}
      <Form onFinish={handleSubmit(onSubmit)} className={clsx(style.wrapForm)}>
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
        >
          <Controller
            name="pricePhone"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Nhập giá sản phẩm" id="pricePhone" type="number" min={0} />
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
                step="0.01"
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
            render={({ field }) => (
              <Input {...field} placeholder="Nhập bộ nhớ" id="bo_nho" type="number" min={0} step="0.01" />
            )}
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
                step="0.01"
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
            render={({ field }) => (
              <Input {...field} placeholder="Nhập thông số RAM" id="RAM" type="number" min={0} step="0.01" />
            )}
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
            render={({ field }) => (
              <Input {...field} placeholder="Nhập thông số ROM" id="ROM" type="number" min={0} step="0.01" />
            )}
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
              <Input
                {...field}
                placeholder="Nhập số lượng sản phẩm "
                id="stock_quantity"
                type="number"
                min={0}
                step="0.01"
              />
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
                placeholder="Nhập khuyễn mãi cho sản phẩm "
                id="promotion"
                type="number"
                min={0}
                step="0.01"
              />
            )}
          />
        </Form.Item>
        {/* button submit */}
        <Form.Item>
          <Button type="primary" htmltype="submit" variant="contained">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Paper>
  );
}

export default React.forwardRef(AddPhone);
