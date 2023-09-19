// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import style from './Card.module.scss';
// import clsx from 'clsx';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
// import Rating from '@mui/material/Rating';
// import Box from '@mui/material/Box';

// CardItem.propTypes = {
//   phoneItem: PropTypes.object.isRequired,
// };

// function CardItem({ phoneItem }) {
//   const [value, setValue] = useState(4);

//   // chuyển đỗi từ số sang string => có dấu ngăn cách
//   const number = phoneItem?.price;
//   const formattedNumber = number.toLocaleString('vi-VN');
//   // console.log(formattedNumber);

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           sx={{
//             width: '100%',
//           }}
//           component="img"
//           height="227"
//           image={phoneItem?.image_urls[0]}
//           alt="green iguana"
//         />

//         <CardContent
//           sx={{
//             mt: '-10px',
//             padding: '13px',
//           }}
//         >
//           <Typography
//             variant="h6"
//             color="text.secondary"
//             sx={{
//               fontSize: '1.4rem',
//               textAlign: 'center',
//               display: '-webkit-box',
//               WebkitBoxOrient: 'vertical',
//               WebkitLineClamp: 2,
//               overflow: 'hidden',
//               textOverflow: 'ellipsis',
//             }}
//             // noWrap
//           >
//             {phoneItem?.name}
//           </Typography>
//           <Rating
//             name="read-only"
//             value={value}
//             readOnly
//             sx={{
//               fontSize: '5.8rem',
//               width: '100%',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           />
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               mt: '6px',
//             }}
//           >
//             <Typography
//               variant="h4"
//               color={(theme) => theme.palette.primary}
//               sx={{
//                 position: 'relative',
//                 fontSize: '3rem',
//                 display: 'flex',
//               }}
//             >
//               <span
//                 style={{
//                   marginRight: '9px',
//                 }}
//               >
//                 {formattedNumber}
//               </span>
//               <span
//                 style={{
//                   textDecoration: 'underline',
//                   position: 'absolute',
//                   top: '50%',
//                   transform: 'translateY(-79%)',
//                   right: '-1%',
//                   fontSize: '1.5rem',
//                 }}
//               >
//                 đ
//               </span>
//             </Typography>

//             <Typography variant="h4" color={(theme) => theme.palette.primary} className={clsx(style.percents)}>
//               <span>-</span>
//               <span>{phoneItem?.promotion}</span>
//               {/* <span>%</span> */}
//             </Typography>
//           </Box>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

// export default CardItem;
