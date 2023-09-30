import PropTypes from 'prop-types';
import style from './CardPhone.module.scss';
import clsx from 'clsx';
import { memo, lazy, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Checkbox, Modal, InputNumber } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import removeIcon from '~/assets/images/removeIcon.svg';
import iconNow from '~/assets/images/iconNow.png';
import { WaringIconDelteAll } from '~/assets/iconSVG.jsx';

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
  listSumPriceCheckAll: PropTypes.array,
  setListSumPriceCheckAll: PropTypes.func,
  setOneIDProducts: PropTypes.func,
  setListProductCard: PropTypes.func,
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
  listSumPriceCheckAll,
  setListSumPriceCheckAll,
  setOneIDProducts,
  setListProductCard,
}) {
  // ---------------------- TĂNG GIẢM SỐ LƯỢNG SẢN PHẨM--------------------------------------------------------
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

  // ----------------------------------------------------------------------------------------------------------------
  /* --------------------------------------------------------------------------------------------------- */
  //------------ XỬ LÝ KHI CLICK VÀO CÁC NÚT CHECK BOX ----------------------------------
  const [checkGetSumPrice, setGetCheckSumPrice] = useState(false);
  // console.log('checkGetSumPrice', checkGetSumPrice);

  //  handleCheckBox
  // lưu giá trị check box hiện tại

  const handleCheckBox = (e) => {
    const productId = detailsPhone?.id;
    setCheckAll(false);

    // set xem nó check vào nút check box con hay không => để tính tổng giá tiền cho đơn hàng
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

    // nếu khi click mà là true => thêm 1 TRUE đó vào danh sách
    // nếu checkked === TRUE => đã click vào nút checkBox con
    else {
      setListChecked((prev) => {
        return [...prev, e?.target?.checked];
      });

      // Nếu checkbox con đã được chọn
      // Thêm ID vào danh sách =>
      setListCheckedBox((prev) => {
        return [...prev, productId];
      });
    }

    // set id 1 sản phẩm khi click vào => checkbox
    // console.log('id 1 sản phẩm:', detailsPhone?.id);
    // setOneIDProducts(detailsPhone?.id);
    setOneIDProducts((prev) => {
      // console.log('giá trị cũ', prev);
      // console.log('listID', listID);
      // console.log('giá trị cũ', prev);
      // tìm kiếm xem id hiện tại => đã tồn tại chưa => nếu có rồi => xóa id đó khỏi list
      const prevIDTest = prev?.length === 0 ? listID : prev;
      const index = prevIDTest?.indexOf(detailsPhone?.id);
      // console.log('index', index);

      // console.log('prevIDTest', prevIDTest);
      // console.log('prev', prev);
      if (index !== -1) {
        const oldId = [...prevIDTest];
        oldId?.splice(index, 1);
        // console.log('giá trị cập nhật', oldId);
        return oldId;
      } else {
        const newListId = [...prev, detailsPhone?.id];
        // console.log('id chưa tồn tại lấy giá trị mới', newListId);
        return newListId;
      }
    });
  };

  // =-----------------------===
  useEffect(() => {
    const productId = detailsPhone?.id;
    if (checkAll) {
      setListCheckedBox((prev) => {
        return [...new Set([...prev, productId])];
      });

      // xóa reset lại list One ID
      setOneIDProducts([]);
    }
  }, [checkAll, detailsPhone?.id]);

  // get list id => danh sách sản phẩm =>  để lấy dánh sách id để xóa tất cả
  // lưu id danh sách sản phẩm đã chọn

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
  }, [checkAll, detailsPhone?.id, setListId]);

  /* ------------------------------XỬ LÝ TÍNH TỔNG TIỀN CHO CẢ ĐƠN HÀNG ---------------------------------  */
  // get sum price
  //------------------------------ Lấy tổng giá trị của từng đơn hàng khi Click Từng SẢN PHẨM-----------------------------
  useEffect(() => {
    // giá của 1 sản phẩm hiện tại
    const newSumPrice = newPricePhone;
    // nếu như khi click => chọn vào nút check box mới cho tính tổng tiền

    if (checkGetSumPrice) {
      setSumPriceCard((prev) => {
        // console.log('có lọt vào set check box lại');
        // giá sản phẩm của 1 đơn hàng + id sản phẩm đó
        const newOrderCard = {
          id: detailsPhone?.id,
          newSumPrice,
        };

        // tìm xem trong danh sách giá sản phẩm => có ID của đơn hàng đó chưa => tìm index
        const indexs = prev?.findIndex((item) => {
          return item?.id === detailsPhone?.id;
        });
        // console.log('index', indexs);
        // nếu !== -1 => tìm thấy id => sản phẩm đó đã tồn tại => thì chỉ CẬP NHẬT lại giá sản phẩm đó thôi, không thêm mới vào sumPriceCard

        // console.log('giá trị cũ', prev);
        // console.log('indexs', indexs);
        if (indexs !== -1 && prev?.length > 0) {
          // cập nhật lại giá sản phẩm mới
          let new1 = {
            id: prev[indexs]?.id,
            newSumPrice,
          };

          // CẬP NHẬT LẠI => GIÁ SẢN PHẨM VÀO ID ĐÓ
          prev?.splice(indexs, 1, new1);
          return [...prev];
        }
        // nếu không tìm thấy id sản phẩm đó => CHo Thêm mới vào
        else {
          return [...prev, newOrderCard];
        }
      });
    }
    // nếu click ngược lại => nút checkbox => FALSE => bỏ đi giá sản phẩm của đơn hàng đó
    else {
      setSumPriceCard((prev) => {
        // console.log('giá trị false', prev);
        // console.log('id false:', detailsPhone?.id);
        return prev?.filter((item) => {
          return item?.id !== detailsPhone?.id;
        });
      });
    }
    // console.log('sumPriceCard', sumPriceCard);
  }, [checkAll, checkGetSumPrice, detailsPhone, newPricePhone]);

  //  -----------------------------------------------------------------------------------------------------
  /* ---------------------------- TÍNH TỔNG ĐƠN HÀNG => KHI CLICK CHỌN TẤT CẢ SẢN PHẨM ---------------------*/
  useEffect(() => {
    // nếu click vào nút checkAll => chọn tất cả
    if (checkAll) {
      // console.log('listID', listID);
      const newSumPrice = newPricePhone;

      // giá sản phẩm của 1 đơn hàng + id sản phẩm đó
      const newOrderCard = {
        id: detailsPhone?.id,
        newSumPrice,
      };

      // lưu danh sách giá đơn hàng => khi click vào check all

      setListSumPriceCheckAll((prev) => {
        //  tìm id sản phẩm
        const index = prev?.findIndex((item) => {
          return item?.id === detailsPhone?.id;
        });
        //  tìm thấy sản phẩm cũ => cập nhật lại giá sản phẩm
        if (index !== -1) {
          prev?.splice(index, 1, {
            id: detailsPhone?.id,
            newSumPrice,
          });

          return [...prev];
        } else {
          // nếu không tìm thấy => cho thêm mới vào
          return [...prev, newOrderCard];
        }
      });
    }
    // nếu không click vào nút checkAll => checkALL bằng false
    else {
      const newSumPrice = newPricePhone;
      // thông tin giá => 1 sản phẩm
      const newOrderCard = {
        id: detailsPhone?.id,
        newSumPrice,
      };
      // console.log('listCheckedBox', listCheckedBox);
      // khi checkAll bằng false set => lại bằng []

      setListSumPriceCheckAll((prev) => {
        // console.log('giá trị cũ 1', prev);

        // console.log('index', listCheckedBox);

        const oldList = [...prev];
        const index = oldList?.findIndex((item) => {
          return item?.id === detailsPhone?.id;
        });

        if (index !== -1) {
          oldList?.splice(index, 1, {
            id: detailsPhone?.id,
            newSumPrice,
          });
          // console.log('giá trị cập nhật', oldList);
          return [...oldList];
        } else {
          // console.log('giá trị thêm mới', [...prev, newOrderCard]);
          return [...prev];
        }
      });

      // setSumPriceCard => cái này để hiển thị khi checkAll bằng false
      setSumPriceCard((prev) => {
        // console.log('id', listCheckedBox);
        // console.log('có lọt lần 2');

        // số phân tử được chọn => dựa vào check box
        if (listCheckedBox?.length === 0) {
          return [];
        } else {
          // tìm ra sản phẩm theo => số phần tử được chọn
          const test2 = listSumPriceCheckAll?.filter((item) => {
            return listCheckedBox?.includes(item?.id);
          });

          // tìm id sản phẩm => nếu sản phẩm đó click vào tăng hoặc giảm giá
          const index = test2?.findIndex((item) => {
            return item?.id === detailsPhone?.id;
          });

          // nếu tìm thấy id đã tồn tại => cập nhật lại giá sản phẩm đó => bằng giá mới nhất => set lại state
          if (index !== -1) {
            test2?.splice(index, 1, {
              id: detailsPhone?.id,
              newSumPrice,
            });
            // console.log('giá trị cập nhật', test2);
            return [...test2];
          } else {
            // nếu không tìm thấy thêm mới bằng giá trị trước đó
            // console.log('giá trị thêm mới', prev);
            return [...prev];
          }
        }
      });
    }
  }, [checkAll, checkGetSumPrice, newPricePhone, listCheckedBox?.length]);

  // -----------------------------------------
  // --------------------------------LẤY DANH SÁCH SẢN PHẨM ĐỂ THÊM VÀO CARD DATABASE ------------
  // DANH SÁCH ĐƠN HÀNG THEO ĐIỀU KIỆN => CHECKBOX CON
  useEffect(() => {
    // lưu sản phẩm đã chọn đó vào danh sách đơn hàng
    // nếu nút check box con bằng true > thêm mới hoặc update
    if (checkGetSumPrice) {
      const phoneProducts = {
        id: detailsPhone?.id,
        name: detailsPhone?.name,
        image: detailsPhone?.url,
        priceDefaults: detailsPhone?.price,
        priceAll: newPricePhone,
        sumQuantity: value,
      };
      // console.log({ phoneProducts });
      setListProductCard((prev) => {
        // console.log('giá trị cũ', prev);

        const index = prev?.findIndex((item) => {
          return item?.id === detailsPhone?.id;
        });

        // update
        const oldPhone = [...prev];
        if (index !== -1) {
          oldPhone?.splice(index, 1, phoneProducts);
          // console.log('update sản phẩm, UPDATE:', oldPhone);

          return oldPhone;
        } else {
          // thêm mới
          // console.log('sản phẩm chưa tồn tại, THÊM MỚI:', [...prev, phoneProducts]);
          return [...prev, phoneProducts];
        }
      });
    } else {
      const phoneProducts = {
        id: detailsPhone?.id,
        name: detailsPhone?.name,
        image: detailsPhone?.url,
        priceDefaults: detailsPhone?.price,
        priceAll: newPricePhone,
        sumQuantity: value,
      };

      setListProductCard((prev) => {
        const index = prev?.findIndex((item) => {
          return item?.id === detailsPhone?.id;
        });
        const oldPhone = [...prev];
        // console.log('GIÁ TRỊ CŨ =>ĐÂY LÀ CỦA CHECK BOX CON:', oldPhone);

        if (index !== -1) {
          oldPhone?.splice(index, 1, phoneProducts);
          // console.log('update sản phẩm, UPDATE:', oldPhone);

          return oldPhone;
        } else {
          // console.log('sản phẩm chưa tồn tại, THÊM MỚI:', [...prev, phoneProducts]);
          return [...prev, phoneProducts];
        }
      });
    }
  }, [detailsPhone, value, newPricePhone, checkGetSumPrice, listCheckedBox?.length, checkAll]);

  // danh sách đơn hàng => theo điều kiện => CHECK ALL
  useEffect(() => {
    // thêm mới hoặc update
    if (checkAll) {
      setListProductCard((prev) => {
        const phoneProducts = {
          id: detailsPhone?.id,
          name: detailsPhone?.name,
          image: detailsPhone?.url,
          priceDefaults: detailsPhone?.price,
          priceAll: newPricePhone,
          sumQuantity: value,
        };
        // console.log('giá trị cũ CHECK ALL', prev);

        const index = prev?.findIndex((item) => {
          return item?.id === detailsPhone?.id;
        });

        // update
        const oldPhone = [...prev];
        if (index !== -1) {
          oldPhone?.splice(index, 1, phoneProducts);
          // console.log('update sản phẩm CHECKALL, UPDATE:', oldPhone);

          return oldPhone;
        } else {
          // thêm mới
          // console.log('sản phẩm chưa tồn tại, THÊM MỚI CHECK ALL:', [...prev, phoneProducts]);
          return [...prev, phoneProducts];
        }
      });
    } else {
      setListProductCard((prev) => {
        const index = listCheckedBox;
        // console.log('index', listCheckedBox);
        const oldPhone = [...prev];
        // lọc ra các danh sách đơn hàng => theo list checkBox
        const newListPhone = oldPhone?.filter((item) => {
          return index?.includes(item?.id);
        });
        // console.log('giá trị MỚI  khi CHECK ALL BẰNG FALSE:', newListPhone);
        return newListPhone;
      });
    }
  }, [checkAll, value, newPricePhone, detailsPhone, checkGetSumPrice, listCheckedBox?.length]);

  // ---------------------------------------MODAL HIỆN THỊ XÓA 1 SẢN PHẨM ---------------------
  // modal hiển thị xóa tất cả => để Xác nhận chắc chắn người dùng sẽ xóa hay không
  const [isModal, setIsModal] = useState(false);
  //handleClickDeleteOne => khi click vào btn xóa 1 sản phẩm
  const handleClickDeleteOne = () => {
    setIsModal(true);
  };
  // click nút Hủy modal
  const handleCancelModal = () => {
    setIsModal(false);
  };

  // khi clik nút ----XÁC NHẬN ---- => đồng ý xóa nhiều SẢN PHẨM
  const handleClickOK = () => {
    console.log('id 1 sản phẩm cần xóa', detailsPhone?.id);
  };
  // RENDER JSX
  return (
    <Box className={clsx(style.wrapListAllCard)}>
      {/* info phone */}
      <Box className={clsx(style.wrapInfo)}>
        {/* check box */}
        <Checkbox
          className={clsx(style.checkBox)}
          checked={listCheckedBox.includes(detailsPhone?.id)}
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
      <Box className={clsx(style.wrapRemove)} onClick={handleClickDeleteOne}>
        <img src={removeIcon} alt="icon remove" className={clsx(style.icon)} />
      </Box>
      {/* modal xóa 1 sản phẩm */}
      <Modal
        centered
        open={isModal}
        onCancel={() => setIsModal(false)}
        className={clsx(style.wrapModal1)}
        okText="Xác nhận"
        cancelText="Hủy"
        icon={<WaringIconDelteAll />}
        footer={null}
        width={311}
      >
        <Box className={clsx(style.header)}>
          <WaringIconDelteAll className={clsx(style.icon)} />
          <Box className={clsx(style.contentHeader)}>
            <Typography className={clsx(style.text1)} color={(theme) => theme?.palette?.text?.primary4}>
              Xoá sản phẩm
            </Typography>
            <Typography className={clsx(style.text2)} color={(theme) => theme?.palette?.text?.primary10}>
              Bạn có muốn xóa sản phẩm đang chọn?
            </Typography>
          </Box>
        </Box>
        <Box className={clsx(style.actions)}>
          <Button variant="outlined" className={clsx(style.btn, style.btnOK)} onClick={handleClickOK}>
            Xác nhận
          </Button>
          <Button variant="contained" className={clsx(style.btn, style.btnCancel)} onClick={handleCancelModal}>
            Huỷ
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default memo(OneCard);
