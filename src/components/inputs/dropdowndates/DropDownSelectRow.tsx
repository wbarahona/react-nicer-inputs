import React, { FC, useContext } from 'react';
import { DropDownDatesContext } from './DropdowndatesContext';
import { DropdowndateContextType } from '../../../types';

export const DropDownSelectRow: FC = () => {
  const { getElement } =
    useContext<DropdowndateContextType>(DropDownDatesContext);

  return (
    <div className="row">
      {getElement(0)}
      {getElement(1)}
      {getElement(2)}
    </div>
  );
};

export default DropDownSelectRow;
