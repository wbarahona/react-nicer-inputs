import React, { FC, useContext } from 'react';
import Select from '../select';
import { DropDownDatesContext } from './DropdowndatesContext';
import { DropdowndateContextType } from '../../../types';

export const MM: FC = () => {
  const {
    yyClassName,
    yyDefaultLabel,
    yyLabel,
    name,
    yyOptions,
    handleYYChange,
    yyValue,
  } = useContext<DropdowndateContextType>(DropDownDatesContext);
  const groupName = `${name}-yy-select`;

  return (
    <div className={`${yyClassName} ${name}-yy-select-wrapper`}>
      <label htmlFor={groupName}>{yyLabel}</label>
      <Select
        name={groupName}
        className={groupName}
        options={yyOptions}
        defaultLabel={yyDefaultLabel}
        inputChange={handleYYChange}
        value={yyValue}
      />
    </div>
  );
};

export default MM;
