import React, { FC, HTMLProps, useState } from 'react';
import { Attrs, ChangeParams } from '../../types';

export interface RangeProps extends HTMLProps<HTMLInputElement> {
  inputChange: (args: ChangeParams) => void;
  attrs?: Attrs;
  single?: boolean;
}

/**
 * Range Component
 * @param name - Is the input name
 * @param [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param attrs - Are all attributes this input can have they are appended to the input not the wrapper
 * @param {Array} [validate] - Optional. Is an array of entities to validate this input
 * @param {Array} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```range selector``` element
 */
export const Range: FC<RangeProps> = ({
  name,
  className,
  inputChange,
  attrs,
  noValidate,
  value,
  min,
  max,
  single,
}: RangeProps & HTMLProps<HTMLDivElement & HTMLInputElement>) => {
  const [valueMinNow, setValueMinNow] = useState<number>(0);
  const [valueMaxNow, setValueMaxNow] = useState<number>(0);
  const [valueMin, setValueMin] = useState<number | undefined>(
    min as number | undefined
  );
  const [valueMax, setValueMax] = useState<number | undefined>(
    min as number | undefined
  );
  const classNames = `range-input-wrapper ${name} ${className || ''}`;

  return (
    <div className={classNames}>
      <div
        className="min-handler__wrapper"
        aria-valuemin={valueMin}
        aria-valuenow={valueMinNow}
      >
        <div className="min-handler__bar-wrapper"></div>
        <div className="min-handler__button"></div>
      </div>
      {!single && (
        <div
          className="max-handler__wrapper"
          aria-valuemax={valueMax}
          aria-valuenow={valueMaxNow}
        >
          <div className="max-handler__bar-wrapper"></div>\
          <div className="max-handler__button"></div>
        </div>
      )}
    </div>
  );
};

export default Range;
