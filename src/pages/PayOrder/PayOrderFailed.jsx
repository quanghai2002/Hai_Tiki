import React from 'react';
import PropTypes from 'prop-types';

PayOrderFailed.propTypes = {};

function PayOrderFailed(props) {
  return (
    <div>
      <h1
        style={{
          color: 'red',
        }}
      >
        Thanh Toán Thất Bại
      </h1>
    </div>
  );
}

export default PayOrderFailed;
