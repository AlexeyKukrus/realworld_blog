import React from 'react';
import { Alert } from 'antd';

import classes from './errors.module.scss';

const Errors = ({ message }) => {
  return (
    <div className={classes.error}>
      <Alert message="Error" description={message} type="error" showIcon />
    </div>
  );
};

export default Errors;
