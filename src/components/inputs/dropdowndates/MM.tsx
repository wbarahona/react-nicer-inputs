import React, { FC, useContext } from 'react';
import Select from '../select';
import { DropDownDatesContext } from './DropdowndatesContext';
import { DropdowndateContextType } from '../../../types';

export const MM: FC = () => {
  const {
    mmClassName,
    mmDefaultLabel,
    mmLabel,
    name,
    mmOptions,
    handleMMChange,
    mmValue,
  } = useContext<DropdowndateContextType>(DropDownDatesContext);
  const groupName = `${name}-mm-select`;

  return (
    <div className={`${mmClassName} ${name}-mm-select-wrapper`}>
      <label htmlFor={groupName}>{mmLabel}</label>
      <Select
        name={groupName}
        className={groupName}
        options={mmOptions}
        defaultLabel={mmDefaultLabel}
        inputChange={handleMMChange}
        value={mmValue}
      />
    </div>
  );
};

export default MM;
