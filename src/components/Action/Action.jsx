import PropTypes from 'prop-types';
import style from './Action.module.scss';
import clsx from 'clsx';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Modal } from 'antd';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';

import imgAction1 from '~/assets/images/action1.png';
import imgAction1_1 from '~/assets/images/action1.1.png';
import imgAction2 from '~/assets/images/action2.png';
import imgAction2_2 from '~/assets/images/action2.2.png';
import imgAction3 from '~/assets/images/action3.png';
import imgAction3_3 from '~/assets/images/action3.3.png';

import { useState } from 'react';
// đây là action => hiện thị trên đoạn danh sách điện thoại => thể hiện độ confident, (Độ tin cậy)
// propTypes
Action.propTypes = {};

function Action(props) {
  // handle xử lý đóng mở modal

  const [open, setOpen] = useState(false);
  // mở modal
  const showModal = () => {
    setOpen(true);
  };
  // đóng modal
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Box className={clsx(style.wrapAction)} onClick={showModal}>
        <Box className={clsx(style.wrapItem1)}>
          <Box className={clsx(style.action)}>
            <img src={imgAction1} alt="action" className={clsx(style.img)} />
            <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
              100% hàng chính hãng
            </Typography>
          </Box>
          <Box className={clsx(style.action)}>
            <img src={imgAction2} alt="action" className={clsx(style.img)} />
            <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
              Trợ lý cá nhân
            </Typography>
          </Box>
          <Box className={clsx(style.action)}>
            <img src={imgAction3} alt="action" className={clsx(style.img)} />
            <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
              Giao nhanh & đúng hẹn
            </Typography>
          </Box>
        </Box>

        <Box className={clsx(style.wrapItem2)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary7}>
            An tâm mua sắm
          </Typography>
          <ArrowForwardIosIcon
            className={clsx(style.icon)}
            sx={{
              color: (theme) => theme?.palette?.text?.primary6,
            }}
          />
        </Box>
      </Box>
      {/* modal */}

      <Modal
        width={566}
        open={open}
        closeIcon={false}
        onCancel={handleCancel}
        centered
        footer={null}
        className={clsx(style.wrapModalActions)}
      >
        <Box className={clsx(style.wrapHeader)}>
          <Typography className={clsx(style.text)} textAlign="center">
            An tâm mua sắm
          </Typography>
          <CloseIcon className={clsx(style.icon)} onClick={handleCancel} />
        </Box>

        <Divider />
        <Box className={clsx(style.wrapContent)}>
          <Box className={clsx(style.content)}>
            <img src={imgAction1_1} alt="anh" className={clsx(style.icon)} />
            <Box className={clsx(style.wrapText)}>
              <Typography className={clsx(style.textHeader)}>100% Hàng chính hãng</Typography>
              <Typography className={clsx(style.textContent)}>Hải Tiki xác thực nguồn gốc 100% sản phẩm.</Typography>
              <Typography className={clsx(style.textContent)}>Được mở hộp kiểm tra khi nhận hàng.</Typography>
              <Typography className={clsx(style.textContent)}>Cam kết hoàn tiền 111% cho hàng giả.</Typography>
              <Typography className={clsx(style.textContent)}>
                Đổi trả dễ dàng trong khung giờ đúng hẹn & hoàn toàn miễn phí.
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              paddingTop: '16px',
              marginBottom: '25px',
            }}
          />
          <Box className={clsx(style.content)}>
            <img src={imgAction2_2} alt="anh" className={clsx(style.icon)} />
            <Box className={clsx(style.wrapText)}>
              <Typography className={clsx(style.textHeader)}>Trợ lý cá nhân </Typography>
              <Typography className={clsx(style.textContent)}>
                Trợ lý cá nhân TikiCARE sẽ hỗ trợ trên mọi phương diện khi mua sắm ở Hải Tiki.
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              paddingTop: '16px',
              marginBottom: '25px',
            }}
          />
          <Box className={clsx(style.content)}>
            <img src={imgAction3_3} alt="anh" className={clsx(style.icon)} />
            <Box className={clsx(style.wrapText)}>
              <Typography className={clsx(style.textHeader)}>Giao nhanh & đúng hẹn</Typography>
              <Typography className={clsx(style.textContent)}>
                Hàng trăm ngàn sản phẩm TikiNow giao nhanh 2h.
              </Typography>
              <Typography className={clsx(style.textContent)}>
                Triệu sản phẩm được giao trong vòng một ngày, với khung giờ hẹn chính xác trong 04 tiếng.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box className={clsx(style.footerClose)}>
          <Typography className={clsx(style.text)} textAlign="center" onClick={handleCancel}>
            Đóng
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default memo(Action);
