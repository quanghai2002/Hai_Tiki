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
  checkAll: PropTypes.bool,
  setCheckAll: PropTypes.func,
  setListId: PropTypes.func,
  listID: PropTypes.array,
  listChecked: PropTypes.array,
  setListChecked: PropTypes.func,
  listCardTest: PropTypes.array,
  listCheckedBox: PropTypes.array,
  setListCheckedBox: PropTypes.func,
  sumPriceCard: PropTypes.array,
  setSumPriceCard: PropTypes.func,
};

function OneCard({
  detailsPhone,
  checkAll,
  setCheckAll,
  setListId,
  listID,
  listChecked,
  setListChecked,
  listCardTest,
  listCheckedBox,
  setListCheckedBox,
  sumPriceCard,
  setSumPriceCard,
}) {
  // xử lý khi click tăng hoặc giảm số lượng sản phẩm
  // khi chọn tăng hoặc giảm số lượn sản phẩm

  // số lượng sản phẩm trong còn trong kho kho
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
    //
    setNewPricePhone(newPrice);
  }, [value]);

  /* --------------------------------------------------------------------------------------------------- */
  // XỬ LÝ KHI CLICK VÀO CÁC NÚT CHECK BOX
  const [checkGetSumPrice, setGetCheckSumPrice] = useState(false);
  //  handleCheckBox

  // lưu giá trị check box hiện tại

  const handleCheckBox = (e) => {
    const productId = detailsPhone?.id;
    setCheckAll(false);

    setGetCheckSumPrice(e?.target?.checked);
    // danh sách các check box đã chọn
    // nếu như check bằng false thì xóa đi 1 phần tử trong list đó
    if (e?.target?.checked === false) {
      setListChecked((prev) => {
        return prev.slice(0, prev?.length - 1);
      });

      // Xóa ID khỏi danh sách
      const index = listCheckedBox.indexOf(productId);
      if (index !== -1) {
        listCheckedBox.splice(index, 1);
        setListCheckedBox(listCheckedBox);
      }
    }

    // nếu khi click mà là true => thêm 1 true đó vào danh sách
    else {
      setListChecked((prev) => {
        return [...prev, e?.target?.checked];
      });

      // Nếu checkbox con đã được chọn
      // Thêm ID vào danh sách
      setListCheckedBox((prev) => {
        return [...prev, productId];
      });
    }
  };

  // get list id => danh sách sản phẩm
  useEffect(() => {
    if (checkAll) {
      setListId((prevIds) => {
        return [...prevIds, detailsPhone?.id];
      });
    } else {
      setListId((prevIds) => {
        return prevIds.filter((id) => {
          return id !== detailsPhone?.id;
        });
      });
    }
  }, [checkAll]);

  // get sum price
  // Lấy tổng giá trị của từng đơn hàng
  useEffect(() => {
    const newSumPrice = newPricePhone;

    if (checkGetSumPrice) {
      // if (sumPriceCard?.length < listCardTest?.length) {

      setSumPriceCard((prev) => {
        //
        const test = {
          id: detailsPhone?.id,
          newSumPrice,
        };
        const indexs = prev?.findIndex((item) => {
          return item.id === detailsPhone?.id;
        });

        // console.log('index', indexs);
        if (indexs !== -1) {
          let new1 = {
            id: prev[indexs]?.id,
            newSumPrice,
          };
          // const oldPrice = [([...prev][indexs] = new1)];
          const oldPrice = prev?.splice(indexs, 1, new1);
          // console.log('old Sum Price:', prev);
          // return [(prev[indexs] = new1)];
          return [...prev];
        } else {
          setSumPriceCard([...prev, test]);
          // return [...prev, test];
        }
      });
      // }
      // setSumPriceCard((prev) => {
      //   return [...prev, newSumPrice];
      // });
      // Cập nhật lại sumPriceCard với updatedSumPriceCard
      // setSumPriceCard(updatedSumPriceCard);
    } else {
      setSumPriceCard((prev) => {
        // console.log('giá trị false', prev);
        // console.log('id false:', detailsPhone?.id);

        return prev?.filter((item) => {
          return item?.id !== detailsPhone?.id;
        });
      });
    }
    // console.log('sumPriceCard', sumPriceCard);
  }, [checkGetSumPrice, newPricePhone]);

  //
  return (
    <Box className={clsx(style.wrapListAllCard)}>
      {/* info phone */}
      <Box className={clsx(style.wrapInfo)}>
        {/* check box */}
        <Checkbox
          className={clsx(style.checkBox)}
          checked={checkAll || listCheckedBox.includes(detailsPhone?.id)}
          onChange={handleCheckBox}
        />

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
      <Box
        className={clsx(style.wrapRemove)}
        onClick={() => {
          console.log('id sản phẩm:', detailsPhone?.id);
        }}
      >
        <img src={removeIcon} alt="icon remove" className={clsx(style.icon)} />
      </Box>
    </Box>
  );
}

export default memo(OneCard);
