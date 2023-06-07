import React, { ReactNode } from 'react';
import { DatePicker } from 'antd';

interface CustomDatePickerProps extends React.ComponentProps<typeof DatePicker> {
  getPopupContainer?: () => HTMLElement | null;
  children?: ReactNode;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ getPopupContainer, ...props }) => {
  const customGetPopupContainer = () => {
    const field = document.querySelector('.ant-layout-content.sc-jTjUTQ.fHDxoc');
    console.log(field);

    return field || document.body;
  };

  return <DatePicker getPopupContainer={customGetPopupContainer} {...props} />;
};

export default CustomDatePicker;
