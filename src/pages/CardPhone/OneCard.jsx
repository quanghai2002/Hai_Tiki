import PropTypes from 'prop-types';
import style from './CardPhone.module.scss';
import clsx from 'clsx';
import { memo, lazy, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Checkbox } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { InputNumber } from 'antd';

import removeIcon from '~/assets/images/removeIcon.svg';
import iconNow from '~/assets/images/iconNow.png';

OneCard.propTypes = {
  detailsPhone: PropTypes.object.isRequired,
  sumPriceCard: PropTypes.number,
  setSumPriceCard: PropTypes.func,
};

function OneCard({ detailsPhone, sumPriceCard, setSumPriceCard }) {
  // xử lý khi click tăng hoặc giảm số lượng sản phẩm
  // khi chọn tăng hoặc giảm số lượn sản phẩm

  // số lượng sản phẩm trong kho
  const [quantityPhone, setQuanityPhone] = useState(detailsPhone?.quantity);

  // giá mặc định của 1 sản phẩm =>ban đầu
  const pricePhone = detailsPhone?.price;
  const pricePhoneFormatDefault = pricePhone.toLocaleString('vi-VN');
  // pricePhone để render ra màn hình
  const [newPricePhone, setNewPricePhone] = useState(pricePhone);
  // chuyển từ number => sang string => render
  const formatPricePhone = newPricePhone.toLocaleString('vi-VN');

  // input quantity => khi nhập số lượng sản phẩm => để mua => mặc định là 1 sản phẩm
  const [value, setValue] = useState(1);

  // khi onchangr input => quantity
  const onChangeInput = (values) => {
    if (!isNaN(values)) {
      // Kiểm tra giới hạn min và max
      if (values >= 1 && values <= quantityPhone) {
        // console.log('value:', value);
        setValue(values);
      }
    }
  };

  // Ngăn người dùng nhập giá trị nhỏ hơn 1 bằng cách chặn sự kiện nút - trên bàn phím
  const onInputKeyDown = (e) => {
    if (e.keyCode === 109 || e.keyCode === 189 || e.keyCode === 69 || e.keyCode === 231) {
      e.preventDefault();
    }
  };

  // Khi click vào nút giảm đi sản phẩm
  const handleClickMinus = () => {
    // Kiểm tra giới hạn min và max
    if (value >= 2 && value <= quantityPhone) {
      // console.log('value:', value);
      setValue((prev) => {
        return prev - 1;
      });
    }
  };

  // Khi click vào nút TĂNG 1 sản phẩm
  const handleClickAdd = () => {
    // Kiểm tra giới hạn min và max
    if (value >= 1 && value < quantityPhone) {
      // console.log('value:', value);
      setValue((prev) => {
        return prev + 1;
      });
    }
  };

  // thay đổi lại giá điện thoại => sau khi đã chọn số lượng sản phẩm
  useEffect(() => {
    const newPrice = Number.parseFloat(pricePhone) * Number.parseInt(value);
    setNewPricePhone(newPrice);
  }, [value]);

  //
  return (
    <Box className={clsx(style.wrapListAllCard)}>
      {/* info phone */}
      <Box className={clsx(style.wrapInfo)}>
        <Checkbox className={clsx(style.checkBox)} />
        <img className={clsx(style.img)} src={detailsPhone?.url} alt="anh" />
        <Box className={clsx(style.contents)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
            {detailsPhone?.name}
          </Typography>
          <Box className={clsx(style.wrapIcon)}>
            <img src={iconNow} alt="iconNow" className={clsx(style.icon)} />
            <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
              Giao siêu tốc 3h
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* đơn giá, unit price */}
      <Box className={clsx(style.wrapUnitPrice)}>
        <Typography className={clsx(style.number)} color={(theme) => theme?.palette?.text?.primary4}>
          {pricePhoneFormatDefault}
        </Typography>
        <Typography className={clsx(style.vnd)} color={(theme) => theme?.palette?.text?.primary4}>
          ₫
        </Typography>
      </Box>

      {/* chọn số lượng sản phẩm => quantity */}
      <Box className={clsx(style.wrapQuantityAll)}>
        <Box
          className={clsx(style.quantity)}
          sx={{
            '& .Mui-disabled': {
              color: (theme) => theme?.palette?.text?.primary8,
              borderColor: (theme) => theme?.palette?.text?.primary9,
            },
          }}
        >
          {/* - */}
          <Button variant="outlined" className={clsx(style.btn)} onClick={handleClickMinus} disabled={value === 1}>
            <RemoveIcon />
          </Button>

          {/* input number */}
          <InputNumber
            min={1}
            max={quantityPhone}
            defaultValue={value}
            value={value}
            onChange={onChangeInput}
            type="number"
            onKeyDown={onInputKeyDown}
            className={clsx(style.input)}
          />
          {/* + */}
          <Button
            variant="outlined"
            className={clsx(style.btn)}
            onClick={handleClickAdd}
            disabled={value === quantityPhone}
          >
            <AddIcon />
          </Button>
        </Box>

        <Box className={clsx(style.wrapQuantity)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
            Kho:
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            {quantityPhone}
          </Typography>
        </Box>
      </Box>

      {/* tổng tiền sản phẩm */}
      <Box className={clsx(style.wrapSumPrice)}>
        <Typography className={clsx(style.text)} color="secondary">
          {formatPricePhone}
        </Typography>
        <Typography className={clsx(style.vnd)} color="secondary">
          ₫
        </Typography>
      </Box>

      {/* btn remove */}
      <Box className={clsx(style.wrapRemove)}>
        <img src={removeIcon} alt="icon remove" className={clsx(style.icon)} />
      </Box>
    </Box>
  );
}

export default memo(OneCard);
