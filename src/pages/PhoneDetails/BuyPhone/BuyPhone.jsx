import PropTypes from 'prop-types';
import style from '../PhoneDetails.module.scss';
import clsx from 'clsx';
import { memo, lazy, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrderReview } from '~/redux/OrderPreview.js';

// propTypes
BuyPhone.propTypes = {
  phoneDetails: PropTypes.object,
};

function BuyPhone({ phoneDetails }) {
  // THÔNG TIN SẢN PHẨM
  // console.log('thông tin sp:', phoneDetails);
  // số lượng sản phẩm trong kho
  const [quantityPhone, setQuanityPhone] = useState(phoneDetails?.stock_quantity);

  // giá mặc định của 1 sản phẩm =>ban đầu
  const pricePhone = phoneDetails?.price;
  // pricePhone để render ra màn hình
  const [newPricePhone, setNewPricePhone] = useState(pricePhone);
  // console.log({ newPricePhone });
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

  // --------------KIỂM TRA XEM USER ĐÃ ĐĂNG NHẬP CHƯA ----NẾU CHƯA BẮT ĐĂNG NHẬP MỚI CHO MUA HÀNG ---------
  const infoUser = useSelector((state) => state?.userAuth?.user);
  const isUserLogin = Boolean(infoUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // -------------KHI USER CLICK VÀO MUA SẢN PHẨM -------------
  const handleClickBuyPhone = () => {
    // ----NẾU ĐÃ ĐĂNG NHẬP MỚI CHO THỰC HIỆN TIẾP MUA SẢN PHẨM -----
    if (isUserLogin) {
      // nếu đã đăng nhập lấy thông tin sản phẩm cần mua
      const infoPhone = {
        _id: phoneDetails?._id,
        name: phoneDetails?.name,
        img: phoneDetails?.image_urls[0],
        quantityBuyPhone: value,
        sumPrice: newPricePhone,
      };
      // console.log('mua sản phẩm', infoPhone);

      // lưu sản phẩm tạm thời vào redux
      dispatch(addOrderReview(infoPhone));

      // ---CHUYỂN ĐẾN TRANG THANH TOÁN ----------
      navigate('/payment');
    } else {
      navigate('/login');
    }
  };
  // -------------KHI USER CLICK THÊM VÀO GIỎ HÀNG-------
  const handleClickAddCart = () => {
    // ----NẾU ĐÃ ĐĂNG NHẬP MỚI CHO THỰC HIỆN TIẾP ----
    if (isUserLogin) {
      console.log('thêm sản phẩm giỏ hàng');
    } else {
      navigate('/login');
    }
  };
  //contents
  return (
    <Box className={clsx(style.wrapBuyPhone)}>
      {/* header */}
      <Box className={clsx(style.wrapHeader)}>
        <img src={phoneDetails?.image_urls[0]} alt="anh" className={clsx(style.img)} />
        <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
          {phoneDetails?.mau_sac}
        </Typography>
      </Box>

      {/* content */}
      <Box className={clsx(style.wrapContents)}>
        <Box className={clsx(style.wrapQuantity)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
            Kho:
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            {quantityPhone}
          </Typography>
        </Box>
        <Typography className={clsx(style.label)} color={(theme) => theme?.palette?.text?.primary4}>
          Số lượng
        </Typography>
        {/* quantity */}

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

        {/* sum price */}
        <Box className={clsx(style.sumPrice)}>
          <Typography className={clsx(style.label)} color={(theme) => theme?.palette?.text?.primary4}>
            Tạm tính
          </Typography>
          <Box className={clsx(style.wrapNumber)}>
            <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
              {formatPricePhone}
            </Typography>
            <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
              ₫
            </Typography>
          </Box>
        </Box>
        {/* action buy phone */}
        <Box className={clsx(style.wrapActionBuy)}>
          <Button
            variant="contained"
            className={clsx(style.btn, style.btnBuy)}
            color="secondary"
            onClick={handleClickBuyPhone}
          >
            Mua Ngay
          </Button>
          <Button variant="outlined" className={clsx(style.btn, style.btnCard)} onClick={handleClickAddCart}>
            Thêm vào giỏ
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(BuyPhone);
