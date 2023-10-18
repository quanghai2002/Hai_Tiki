import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './AllOrder.module.scss';
import clsx from 'clsx';
import Divider from '@mui/material/Divider';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import lichsudonhangtrong from '~/assets/images/lichsudonhangtrong.png';
import userApi from '~/apis/userApi.js';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import LazyOrder from '~/pages/OrderHistory/LazyOrder/LazyOrder.jsx';

// Proptypes
AllOrder.propTypes = {};

function AllOrder(props) {
  const [loading, setLoading] = useState(true);
  // lây ID USER
  const infoUser = useSelector((state) => state?.userAuth?.user);

  // -- LẤY DỮ LIỆU TẤT CẢ ĐƠN HÀNG CỦA 1 USER ĐÓ -----
  const [listAllOrder, setListAllOrder] = useState([]);

  useEffect(() => {
    userApi
      .getOneUser(infoUser?._id)
      .then((response) => {
        // console.log('thông tin user', response);
        setListAllOrder(response?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
      });
  }, []);

  // ------------CLICK ĐỒNG Ý XÓA ĐƠN HÀNG ---------
  const handelAgreeDeleteOrder = (id) => {
    console.log('ID đơn hàng cần xóa', id);
  };

  console.log(' danh sách đơn hàng của USER:', listAllOrder?.orders);
  // --------------------DATA TEST ĐỂ RENDER RA TẤT CẢ ĐƠN HÀNG -----------------
  const dataTest = listAllOrder?.orders?.map((order) => {
    return {
      id: order?._id,
      name: order?.products?.name,
      url: order?.products?.image,
      soluongmua: order?.products?.sumQuantity,
      giaMacDinh: order?.products?.priceDefaults,
      tonggiatri: order?.products?.priceAll,
      trangthai: {
        code: order?.status?.code,
        title: order?.status?.state,
      },
    };
  });

  // const dataTest = [
  //   {
  //     id: 1,
  //     name: 'Nước súc họng miệng nano bạc PlasmaKare giảm rát họng, dịu cơn ho, phòng tái phát VlÊM họng chai 250ml',
  //     url: 'https://salt.tikicdn.com/cache/200x200/ts/product/7f/0f/76/229138797dd25d93835b075637050dde.png',
  //     soluongmua: 10,
  //     giaMacDinh: 135000,
  //     tonggiatri: 1350000,
  //     trangthai: {
  //       code: 1,
  //       title: 'Chờ Xác Nhận',
  //     },
  //   },
  // ];

  // -------------JSX--------------

  return (
    // nếu đang tải dữ liệu thì hiển thị LAZY ORDER RA
    loading ? (
      <LazyOrder />
    ) : (
      // nếu đang tải thông tin đơn hàng thì hiển thị SPIN ra
      <Box className={clsx(style.containerAllOrder)}>
        {/* map qua tất cả sản phẩm ở đây */}
        {/* Nếu có đơn hàng thì render => Nếu không render Đơn Hàng Trống */}
        {dataTest?.length > 0 ? (
          dataTest?.map((item) => {
            return (
              <Box className={clsx(style.wrapAllOrder)} key={item?.id}>
                {/* header */}
                {/* Trạng thái 1 => Chờ xác nhận. 2 Đang Vận Chuyện. 3: Giao Hàng Thành Công. 4: Đã hủy */}
                <Box className={clsx(style.header)}>
                  {item?.trangthai?.code === 1 ? (
                    <Typography className={clsx(style.title)}>Chờ xác nhận</Typography>
                  ) : item?.trangthai?.code === 2 ? (
                    <Typography className={clsx(style.title)}>Đang vận chuyển</Typography>
                  ) : item?.trangthai?.code === 3 ? (
                    <Typography className={clsx(style.titleGiaoThanhCong)}>Giao hàng thành công</Typography>
                  ) : item?.trangthai?.code === 4 ? (
                    <Typography className={clsx(style.titleDahuy)}>Đã hủy</Typography>
                  ) : (
                    <></>
                  )}
                </Box>

                {/* contents */}
                <Box className={clsx(style.content)}>
                  <Divider
                    className={clsx(style.divider)}
                    sx={{
                      borderColor: (theme) => theme?.palette?.text?.primary12,
                    }}
                  />
                  <Box className={clsx(style.detailsPhone)}>
                    <Box className={clsx(style.wrapImg)}>
                      <img src={item?.url} alt="anh" className={clsx(style.img)} />
                      <Typography className={clsx(style.quantity)}>x{item?.soluongmua}</Typography>
                    </Box>
                    <Box className={clsx(style.info)}>
                      <Typography className={clsx(style.name)}>{item?.name}</Typography>

                      <Typography className={clsx(style.store)}>Quang Hải TIKI</Typography>
                    </Box>

                    <Box className={clsx(style.wrapPrice)}>
                      <Typography className={clsx(style.price)}>
                        {item?.giaMacDinh?.toLocaleString('vn-VN')} ₫
                      </Typography>
                    </Box>
                  </Box>

                  <Divider
                    className={clsx(style.divider)}
                    sx={{
                      borderColor: (theme) => theme?.palette?.text?.primary12,
                    }}
                  />
                </Box>

                {/* footer */}
                <Box className={clsx(style.footer)}>
                  <Box className={clsx(style.totalMoney)}>
                    <Typography className={clsx(style.title)}>Tổng tiền:</Typography>
                    <Typography className={clsx(style.total)}>{item?.tonggiatri?.toLocaleString('vn-VN')} ₫</Typography>
                  </Box>

                  {/* chỉ cho hiện thi nút HỦY ĐƠN HÀNG => khi CHỜ XÁC NHẬN => code === 1 */}
                  {item?.trangthai?.code === 1 ? (
                    <Box className={clsx(style.wrapHuy)}>
                      <Popconfirm
                        title="Bạn chắc chắn muốn hủy đơn hàng này ?"
                        icon={
                          <QuestionCircleOutlined
                            style={{
                              color: 'red',
                            }}
                          />
                        }
                        cancelText="Hủy"
                        okText="Đồng ý"
                        onConfirm={() => {
                          handelAgreeDeleteOrder(item?.id);
                        }}
                        className={clsx(style.confirmHuy)}
                      >
                        <Button className={clsx(style.btn)} color="secondary" variant="contained">
                          Hủy Đơn Hàng
                        </Button>
                      </Popconfirm>
                    </Box>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            );
          })
        ) : (
          // KHI KHÔNG CÓ ĐƠN HÀNG NÀO
          <Box className={clsx(style.wrapNoOrder)}>
            <img src={lichsudonhangtrong} alt="dang hang trong" className={clsx(style.img)} />
            <Typography className={clsx(style.text)}>Chưa có đơn hàng</Typography>
          </Box>
        )}
      </Box>
    )
  );
}

export default memo(AllOrder);
