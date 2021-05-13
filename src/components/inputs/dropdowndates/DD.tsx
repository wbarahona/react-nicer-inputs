import React, { FC, useContext } from 'react';
import Select from '../select';
import { DropDownDatesContext } from './DropdowndatesContext';
import { DropdowndateContextType } from '../../../types';

export const DD: FC = () => {
  const {
    ddClassName,
    ddDefaultLabel,
    ddLabel,
    name,
    ddOptions,
    handleDDChange,
    ddValue,
  } = useContext<DropdowndateContextType>(DropDownDatesContext);
  const groupName = `${name}-dd-select`;

  return (
    <div className={`${ddClassName} ${name}-dd-select-wrapper`}>
      <label htmlFor={groupName}>{ddLabel}</label>
      <Select
        name={groupName}
        className={groupName}
        options={ddOptions}
        defaultLabel={ddDefaultLabel}
        inputChange={handleDDChange}
        value={ddValue}
      />
    </div>
  );
};

export default DD;
