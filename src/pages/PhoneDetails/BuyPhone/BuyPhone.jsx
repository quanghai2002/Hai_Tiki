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
import { addPhoneCart } from '~/redux/GioHang.js';
import { message } from 'antd';

// propTypes
BuyPhone.propTypes = {
  phoneDetails: PropTypes.object,
  setIsHidenNotify: PropTypes.func,
};

function BuyPhone({ phoneDetails, setIsHidenNotify }) {
  const dispatch = useDispatch();

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

  // -------------KHI USER CLICK VÀO MUA SẢN PHẨM -------------
  const handleClickBuyPhone = () => {
    // ----NẾU ĐÃ ĐĂNG NHẬP MỚI CHO THỰC HIỆN TIẾP MUA SẢN PHẨM -----
    if (isUserLogin) {
      // nếu đã đăng nhập lấy thông tin sản phẩm cần mua
      const infoPhone = {
        sumOrderList: newPricePhone,
        freeShip: 0,
        listProductCard: [
          {
            id: phoneDetails?._id,
            name: phoneDetails?.name,
            image: phoneDetails?.image_urls[0],
            sumQuantity: value,
            priceAll: newPricePhone,
            priceDefaults: pricePhone,
          },
        ],
      };
      console.log('mua 1 sản phẩm đơn hàng là:', infoPhone);

      // lưu sản phẩm tạm thời vào redux
      dispatch(addOrderReview(infoPhone));

      // ---CHUYỂN ĐẾN TRANG THANH TOÁN ----------
      navigate('/payment');
    } else {
      navigate('/login');
    }
  };

  // ---- KIỂM TRA XEM KHI THÊM SẢN PHẨM VÀO GIỎ HÀNG ĐÃ VƯỢT QUÁ SỐ LƯỢNG SẢN PHẨM ĐC MUA HAY CHƯA ---
  const listBuyPhone = useSelector((state) => state?.gioHang?.cartList);

  const phoneBuyCanMua = listBuyPhone?.find((item) => {
    return item?._id === phoneDetails?._id;
  });

  // ---THÔNG BÁO NẾU NHƯ THÊM SỐ LƯỢNG SẢN PHẨM VƯỢT QUÁ GIỚI HẠN ---
  const [messageApi, contextHolder] = message.useMessage({
    maxCount: 1,
  });
  // -------------KHI USER CLICK THÊM VÀO GIỎ HÀNG-------
  const handleClickAddCart = () => {
    // ----NẾU ĐÃ ĐĂNG NHẬP MỚI CHO THỰC HIỆN TIẾP ----
    if (isUserLogin) {
      // --KIỂM TRA XEM SỐ LƯỢNG SẢN PHẨM THÊM VÀO CÓ VƯỢT QUÁ GIỚI HẠN KHÔNG
      // --NẾU KHÔNG THÌ HIỆN THỊ POPUP THÊM GIỎ HÀNG THÀNH CÔNG--
      // ---NẾU VƯỢT QUÁ THÌ HIỂN THỊ => ĐÃ VƯỢT QUÁ GIỚI HẠN --
      if (phoneBuyCanMua?.soluongmua + value >= phoneDetails?.stock_quantity) {
        // đóng thông báo nếu đang hiện
        setIsHidenNotify(true);

        // hiện thị message số lượng mua sản phẩm vượt giới hạn
        messageApi.open({
          type: 'warning',
          content: `Số lượng mua tối đa cho sản phẩm này là ${phoneDetails?.stock_quantity}`,
          duration: 3,
        });
      } else {
        // ---Hiển thị thông báo là thêm đơn hàng thành công ---
        setIsHidenNotify(false);
      }

      // -- KHI CLICK THÊM GIỎ HÀNG => CUỘN VỀ ĐẦU TRANG
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      // ----dữ liệu sản phẩm cần thêm vào đơn hàng ----
      const dataAddCart = {
        _id: phoneDetails?._id,
        name: phoneDetails?.name,
        url: phoneDetails?.image_urls[0],
        price: phoneDetails?.price,
        quantity: phoneDetails?.stock_quantity,
        soluongmua: value,
      };

      // ---KHI CLICK THÊM VÀO GIỎ HÀNG SẼ LƯU CÁC SẢN PHẨM ĐƯỢC THÊM VÀO TRONG REDUX NHÉ -
      dispatch(addPhoneCart(dataAddCart));
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
        {/* Hiển thi thông báo khi thêm sản phẩm vượt quá giới hạn */}
        {contextHolder}
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
