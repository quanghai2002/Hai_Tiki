import PropTypes from 'prop-types';
import style from './CardPhone.module.scss';
import clsx from 'clsx';
import { memo, lazy, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FloatButton } from 'antd';
import { Steps } from 'antd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import { Checkbox } from 'antd';
import { Tooltip } from 'antd';

import removeIcon from '~/assets/images/removeIcon.svg';
const Header = lazy(() => import('~/components/Header'));
const Footer = lazy(() => import('~/components/Footer'));

// prop types
CardPhone.propTypes = {};

function CardPhone(props) {
  // trạng thái của thanh tiến trình => process => khi chọn mua hàng
  const [valueProcessStep, setvalueProcessStep] = useState(1);

  // action checked
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ['1', '2', '3'];
  const defaultCheckedList = ['1'];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const checkAll = plainOptions.length === checkedList.length;

  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  return (
    <Box>
      {/* header and navigation */}
      <Header />

      {/* card phone */}
      <Box className={clsx(style.wrapCardPhone)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
          {/* header card => label  */}
          <Grid lg={12}>
            <Typography className={clsx(style.headerCard)}>Giỏ hàng</Typography>
          </Grid>

          {/* wrap list card => danh sách đơn hàng trong => giỏ hàng */}
          <Grid container lg={8.8} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
            {/* các bước step=> mua hàng */}
            <Grid lg={12}>
              <Box className={clsx(style.wrapStepCard)}>
                <Steps
                  current={valueProcessStep}
                  items={[
                    {
                      icon: <></>,
                    },
                    {
                      icon: (
                        <Box
                          className={'wrapIcon1Step-Card'}
                          sx={{
                            position: 'relative',
                            backgroundColor: '#fff',
                            '&::after': {
                              content: '"Freeship 15K"',
                              display: 'block',
                              position: ' absolute',
                              top: '-19px',
                              left: '50%',
                              transform: 'translateX(-49%)',
                              whiteSpace: 'nowrap',
                              fontSize: '13px',
                              fontWeight: '500',
                              color: 'rgb(112, 166, 255)',
                            },
                          }}
                        >
                          <CheckCircleIcon className={clsx(style.icon)} />
                        </Box>
                      ),
                    },
                    {
                      // title: '299K',
                      icon: (
                        <Box
                          className={'wrapIcon2Step-Card'}
                          sx={{
                            position: 'relative',
                            backgroundColor: '#fff',
                            '&::after': {
                              content: '"Freeship 30K"',
                              display: 'block',
                              position: 'absolute',
                              top: '-19px',
                              right: 0,
                              whiteSpace: 'nowrap',
                              fontSize: '13px',
                              fontWeight: 500,
                              color: ' rgb(112, 166, 255)',
                            },
                          }}
                        >
                          <CheckCircleIcon className={clsx(style.icon)} />
                        </Box>
                      ),
                    },
                  ]}
                >
                  <Typography>Quang Hai 2002</Typography>
                </Steps>
                {/* label */}
                <Typography className={clsx(style.label0)}>Mua</Typography>
                <Typography className={clsx(style.label2)}>149K</Typography>
                <Typography className={clsx(style.label3)}>299K</Typography>
              </Box>
            </Grid>

            {/* header => action => list card */}
            <Grid lg={12}>
              <Box className={clsx(style.wrapActionCard)}>
                {/* checked */}
                <Box className={clsx(style.wrapChecked)}>
                  <Checkbox onChange={onCheckAllChange} checked={checkAll} className={clsx(style.checked)}>
                    Tất cả (17 sản phẩm)
                  </Checkbox>
                </Box>
                {/* đơn giá =>unitPrice */}
                <Typography className={clsx(style.unitPrice)}>Đơn giá</Typography>
                {/* số lượng */}
                <Typography className={clsx(style.quantity)}>Số lượng</Typography>
                {/* thành tiền => into money */}
                <Typography className={clsx(style.intoMoney)}>Thành tiền</Typography>
                {/* remove => icon */}
                <Tooltip title="Xóa mục đã chọn" placement="bottom" mouseEnterDelay={0}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <img src={removeIcon} alt="remove icon" className={clsx(style.removeIcon)} />
                  </Box>
                </Tooltip>
              </Box>
            </Grid>

            {/* contents list => card*/}
            <Grid lg={12}>
              <Box className={clsx(style.wrapListAllCard)}>
                {/*test các checked */}
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                <Typography>Đây là nội dung của các đơn hàng</Typography>
              </Box>
            </Grid>
          </Grid>

          {/* wrap details price phone*/}
          <Grid container lg={3.2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
            {/* address địa chỉ => giao hàng */}
            <Grid lg={12}>
              <Box className={clsx(style.wrapAddressCard)}>
                <Typography>đây là địa chỉ giao hàng</Typography>
              </Box>
            </Grid>

            {/* sum price => tổng giá trị đơn hàng */}
            <Grid lg={12}>
              <Box className={clsx(style.wrapSumPriceCard)}>
                <Typography>đây là nơi tính tổng giá trị đơn hàng</Typography>
              </Box>
            </Grid>

            {/* btn buy card => nút mua sản phẩm*/}
            <Grid lg={12}>
              <Box className={clsx(style.wrapBtnBuyPhone)}>
                <Typography>Btn mua sản phẩm</Typography>
              </Box>
            </Grid>
          </Grid>

          {/* footer */}
          <Grid lg={12}>
            <Footer />
          </Grid>
        </Grid>
      </Box>

      {/* back to top */}
      <FloatButton.BackTop duration={450} visibilityHeight={60} className={clsx(style.backTop)} />
    </Box>
  );
}

export default memo(CardPhone);
