import { memo } from 'react';
import PropTypes from 'prop-types';
import style from './DangVanChuyen.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import lichsudonhangtrong from '~/assets/images/lichsudonhangtrong.png';
import Divider from '@mui/material/Divider';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import Button from '@mui/material/Button';

// Proptypes
DangVanChuyen.propTypes = {};

function DangVanChuyen(props) {
  // ------------CLICK ĐỒNG Ý XÓA ĐƠN HÀNG ---------
  const handelAgreeDeleteOrder = (id) => {
    console.log('ID đơn hàng cần xóa', id);
  };

  // --------------------DATA TEST ĐỂ RENDER RA TẤT CẢ ĐƠN HÀNG -----------------
  const dataTest = [
    {
      id: 1,
      name: 'Nước súc họng miệng nano bạc PlasmaKare giảm rát họng, dịu cơn ho, phòng tái phát VlÊM họng chai 250ml',
      url: 'https://salt.tikicdn.com/cache/200x200/ts/product/7f/0f/76/229138797dd25d93835b075637050dde.png',
      soluongmua: 10,
      giaMacDinh: 135000,
      tonggiatri: 1350000,
      trangthai: {
        code: 1,
        title: 'Chờ Xác Nhận',
      },
    },
    {
      id: 2,
      name: 'Nước súc miệng Dr. Muối truyền thống (1000ml)-Ngừa viêm họng, sâu răng, loại vi khuẩn, trắng răng, hết hôi miệng',
      url: 'https://salt.tikicdn.com/cache/200x200/ts/product/20/f4/45/529288817076bfcc9484a8f048dd9426.jpg',
      soluongmua: 1,
      giaMacDinh: 26000,
      tonggiatri: 26000,
      trangthai: {
        code: 2,
        title: 'Đang giao hàng',
      },
    },
    {
      id: 3,
      name: 'Chuột không dây HXSJ T15 wireless 2.4G tự sạc pin siêu mỏng không gây tiếng ồn chuyên dùng cho Máy tính, pc, Laptop, Tivi - Hàng chính hãng - Đen',
      url: 'https://salt.tikicdn.com/cache/200x200/ts/product/85/8d/c2/3cbd22f4b1c64df1965c6d533738a3c0.jpg',
      soluongmua: 1,
      giaMacDinh: 182000,
      tonggiatri: 182000,
      trangthai: {
        code: 3,
        title: 'Giao hàng thành công',
      },
    },
    {
      id: 4,
      name: 'Kẹo dẻo trái cây hỗn hợp - Welch s Mixed Fruit Snack Chứa Vitamin A,C,E Giúp ăn ngon + bổ + khỏe (22,7g/gói)- Massel Official - 1 gói  lẻ',
      url: 'https://salt.tikicdn.com/cache/200x200/ts/product/fc/e3/3c/59eb482a1fd85fd9bd38534a7a6b2577.png',
      soluongmua: 2,
      giaMacDinh: 21000,
      tonggiatri: 42000,
      trangthai: {
        code: 4,
        title: 'Đã hủy',
      },
    },
    {
      id: 5,
      name: 'Điện Thoại Samsung Galaxy S20 FE (8GB/256GB) - Hàng Chính Hãng - Đã kích hoạt bảo hành điện tử',
      url: 'https://salt.tikicdn.com/cache/280x280/ts/product/50/a9/b8/c757cd53a900b0e0f8f09d19f940125b.jpg.webp',
      soluongmua: 1,
      giaMacDinh: 6990000,
      tonggiatri: 699000,
      trangthai: {
        code: 1,
        title: 'Chờ Xác Nhận',
      },
    },
    {
      id: 6,
      name: 'Điện thoại Realme C55 (6GB/128GB) - Hàng chính hãng',
      url: 'https://salt.tikicdn.com/cache/280x280/ts/product/2a/a1/3f/0316aa8136759cadc84b943a015148a8.jpg.webp',
      soluongmua: 1,
      giaMacDinh: 4100000,
      tonggiatri: 4100000,
      trangthai: {
        code: 1,
        title: 'Chờ Xác Nhận',
      },
    },
    {
      id: 8,
      name: 'Điện Thoại Oppo A77s (8GB/128GB)',
      url: 'https://salt.tikicdn.com/cache/280x280/ts/product/ce/ec/0c/f24a4d558fbfddfe667eeca21b06f041.jpg.webp',
      soluongmua: 1,
      giaMacDinh: 4850000,
      tonggiatri: 4850000,
      trangthai: {
        code: 2,
        title: 'Đang giao hàng',
      },
    },
    {
      id: 9,
      name: 'Điện thoại Realme C55 (6GB/128GB) - Hàng chính hãng',
      url: 'https://salt.tikicdn.com/cache/280x280/ts/product/4b/7c/b1/28c70b59ae12e05c3413c3e91a64ac10.jpg.webp',
      soluongmua: 1,
      giaMacDinh: 3990000,
      tonggiatri: 3990000,
      trangthai: {
        code: 2,
        title: 'Đang giao hàng',
      },
    },

    {
      id: 10,
      name: 'Điện thoại Samsung Galaxy S21 FE 5G (8GB/128GB) - Hàng chính hãng',
      url: 'https://salt.tikicdn.com/cache/280x280/ts/product/c6/95/af/e997e7d74c39f40cbd9b2e36b65f5ff1.jpg.webp',
      soluongmua: 1,
      giaMacDinh: 9000000,
      tonggiatri: 9000000,
      trangthai: {
        code: 3,
        title: 'Giao hàng thành công',
      },
    },
    {
      id: 11,
      name: 'Điện thoại Samsung Galaxy S21 FE 5G (8GB/128GB) - Hàng chính hãng',
      url: 'https://salt.tikicdn.com/cache/280x280/ts/product/c6/95/af/e997e7d74c39f40cbd9b2e36b65f5ff1.jpg.webp',
      soluongmua: 1,
      giaMacDinh: 9000000,
      tonggiatri: 9000000,
      trangthai: {
        code: 3,
        title: 'Giao hàng thành công',
      },
    },
    {
      id: 12,
      name: 'Điện thoại Samsung Galaxy S23 Ultra 5G (12GB/512GB)',
      url: 'https://salt.tikicdn.com/cache/280x280/ts/product/f5/4b/12/22ab9f1aba574346d5fcd53fd2fa0f4c.jpg.webp',
      soluongmua: 1,
      giaMacDinh: 26000000,
      tonggiatri: 26000000,
      trangthai: {
        code: 4,
        title: 'Đã hủy',
      },
    },
    {
      id: 13,
      name: 'Điện thoại Samsung Galaxy S23 Ultra 5G (12GB/512GB)',
      url: 'https://salt.tikicdn.com/cache/280x280/ts/product/f5/4b/12/22ab9f1aba574346d5fcd53fd2fa0f4c.jpg.webp',
      soluongmua: 1,
      giaMacDinh: 26000000,
      tonggiatri: 26000000,
      trangthai: {
        code: 4,
        title: 'Đã hủy',
      },
    },
  ];

  // LỌC RA CÁC ĐƠN HÀNG CÓ TRẠNG THÁI 2 => ĐANG VẬN CHUYỂN
  const DataSort = dataTest?.filter((item) => {
    return item?.trangthai.code === 21;
  });

  return (
    <Box className={clsx(style.wrapAllDangVanChuyen)}>
      {/* NẾU ĐƠN HÀNG CÓ SẢN PHẨM THÌ RENDER => KHÔN THÌ RENDER ĐƠN HÀNG TRỐNG */}
      {/* Khi có đơn hàng render ở đây */}
      {/* map qua tất cả sản phẩm ở đây */}
      {DataSort?.length > 0 ? (
        DataSort?.map((item) => {
          return (
            <Box className={clsx(style.dangvanchuyen)} key={item?.id}>
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

export default memo(DangVanChuyen);
