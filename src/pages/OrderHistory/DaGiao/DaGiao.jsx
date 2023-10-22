import { memo } from 'react';
import PropTypes from 'prop-types';
import style from './DaGiao.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import lichsudonhangtrong from '~/assets/images/lichsudonhangtrong.png';
import Divider from '@mui/material/Divider';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import Button from '@mui/material/Button';
import LazyOrder from '~/pages/OrderHistory/LazyOrder/LazyOrder.jsx';

// Proptypes
DaGiao.propTypes = {
  keyTab: PropTypes.number,
  listAllOrder: PropTypes.object,
  loading: PropTypes.bool,
};

function DaGiao({ keyTab, listAllOrder, loading }) {
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
  // LỌC RA CÁC ĐƠN HÀNG CÓ TRẠNG THÁI 3 => ĐÃ GIAO
  const DataSort = dataTest?.filter((item) => {
    return item?.trangthai.code === 3;
  });

  // console.log('Thông tin các đơn hàng của USER -- ĐÃ GIAO LÀ:', DataSort);
  // ------------CLICK ĐỒNG Ý XÓA ĐƠN HÀNG ---------
  const handelAgreeDeleteOrder = (id) => {
    console.log('ID đơn hàng HỦY LÀ', id);
  };

  // --- RENDER JSX --
  //  ---HIỂN THỊ LAZY LOADING KHI ĐANG TẢI DỮ LIỆU TỪ SERVER ---
  return loading ? (
    <LazyOrder />
  ) : (
    <Box className={clsx(style.wrapAllDaGiao)}>
      {/* NẾU ĐƠN HÀNG CÓ SẢN PHẨM THÌ RENDER => KHÔN THÌ RENDER ĐƠN HÀNG TRỐNG */}
      {/* Khi có đơn hàng render ở đây */}
      {/* map qua tất cả sản phẩm ở đây */}
      {DataSort?.length > 0 ? (
        DataSort?.map((item) => {
          return (
            <Box className={clsx(style.dagiao)} key={item?.id}>
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
                    <Typography className={clsx(style.price)}>{item?.giaMacDinh?.toLocaleString('vn-VN')} ₫</Typography>
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
  );
}

export default memo(DaGiao);
