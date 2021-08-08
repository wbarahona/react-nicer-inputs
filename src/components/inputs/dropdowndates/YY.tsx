import React, { FC, useContext, useEffect, useState } from 'react';
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
  const [inputReset, setInputReset] = useState<boolean>(false);
  const groupName = `${name}-yy-select`;

  useEffect(() => {
    if (yyValue === 0) {
      setInputReset(true);
    }
  }, [yyValue]);

  useEffect(() => {
    if (inputReset) {
      setInputReset(false);
    }
  }, [inputReset]);

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
        inputReset={inputReset}
      />
    </div>
  );
};

export default MM;
