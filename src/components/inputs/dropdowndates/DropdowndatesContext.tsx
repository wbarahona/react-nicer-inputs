import React, {
  FC,
  createContext,
  ReactNode,
  useState,
  useEffect,
  Ref,
} from 'react';
import m from 'moment';
import { useFormContext } from '../../form/FormContext';
import { useIsMount } from '../../../hooks/isMount';
import {
  DropdowndateContextType,
  ChangeParams,
  Attrs,
  Option,
  Validation,
} from '../../../types';
import DD from './DD';
import MM from './MM';
import YY from './YY';

export interface DropdowndatesContext {
  children?: ReactNode;
  name: string;
  inputChange: (args: ChangeParams) => void;
  format?: string;
  maxDate?: string;
  minDate?: string;
  attrs?: Attrs;
  value?: string | undefined;
  ddClassName?: string;
  mmClassName?: string;
  yyClassName?: string;
  ddLabel?: string;
  mmLabel?: string;
  yyLabel?: string;
  ddDefaultLabel?: string;
  mmDefaultLabel?: string;
  yyDefaultLabel?: string;
  displayOrder?: string;
  mmmm?: boolean;
  validate?: Validation[];
  dropDownDatesRef: Ref<HTMLDivElement>;
}

const DropdowndateContextDefoValues: DropdowndateContextType = {
  name: '',
  inputChange: () => {},
  format: '',
  maxDate: '',
  minDate: '',
  attrs: {},
  value: '',
  ddClassName: '',
  mmClassName: '',
  yyClassName: '',
  ddLabel: '',
  mmLabel: '',
  yyLabel: '',
  ddDefaultLabel: '',
  mmDefaultLabel: '',
  yyDefaultLabel: '',
  displayOrder: '',
  mmmm: false,
  getElement: () => <></>,
  ddOptions: [],
  ddValue: 0,
  handleDDChange: () => {},
  mmOptions: [],
  mmValue: 0,
  handleMMChange: () => {},
  yyOptions: [],
  yyValue: 0,
  handleYYChange: () => {},
};

export const DropDownDatesContext = createContext<DropdowndateContextType>(
  DropdowndateContextDefoValues
);

export const DropDownDatesProvider: FC<DropdowndatesContext> = ({
  name,
  children,
  inputChange,
  format,
  maxDate,
  minDate,
  attrs,
  value,
  ddClassName,
  mmClassName,
  yyClassName,
  ddLabel,
  mmLabel,
  yyLabel,
  ddDefaultLabel,
  mmDefaultLabel,
  yyDefaultLabel,
  displayOrder,
  mmmm,
  validate,
  dropDownDatesRef,
}: DropdowndatesContext) => {
  const internalFormat = 'MM-DD-YYYY';
  const [ddValue, setDDvalue] = useState<number>(0);
  const [mmValue, setMMValue] = useState<number>(0);
  const [yyValue, setYYValue] = useState<number>(0);
  const [ddValueString, setDDvalueString] = useState<string>('');
  const [mmValueString, setMMValueString] = useState<string>('');
  const [yyValueString, setYYValueString] = useState<string>('');
  const [minYear, setMinYear] = useState<number>(0);
  const [minMonth, setMinMonth] = useState<number>(0);
  const [minDay, setMinDay] = useState<number>(0);
  const [maxYear, setMaxYear] = useState<number>(0);
  const [maxMonth, setMaxMonth] = useState<number>(0);
  const [maxDay, setMaxDay] = useState<number>(0);
  const [ddOptions, setDDOptions] = useState<Option[]>([]);
  const [mmOptions, setMMOptions] = useState<Option[]>([]);
  const [yyOptions, setYYOptions] = useState<Option[]>([]);
  const { model, addToModel, updateModelInputValue, updateModelInput } =
    useFormContext();
  const isMount = useIsMount();

  const getDateFormatElements = (): string[] => displayOrder?.split('-') || [];
  const getElement = (i: number): ReactNode => {
    const elem = getDateFormatElements()[i];

    switch (elem) {
      case 'MM' || 'mm':
        return <MM />;
      case 'DD' || 'dd':
        return <DD />;
      case 'YY' || 'yy' || 'YYYY' || 'yyyy':
        return <YY />;
      default:
        return (
          <div>
            Error: no element to display, check the format sent to displayOrder.
            You can only use MM, DD or YY separated by a dash "-"
          </div>
        );
    }
  };

  const buildDateLimits = () => {
    const mMinDate = m(minDate, format, true);
    setMinYear(parseInt(mMinDate.format('YYYY'), 10));
    setMinMonth(parseInt(mMinDate.format('MM'), 10));
    setMinDay(parseInt(mMinDate.format('DD'), 10));

    const mMaxDate = m(maxDate, format, true);
    setMaxYear(parseInt(mMaxDate.format('YYYY'), 10));
    setMaxMonth(parseInt(mMaxDate.format('MM'), 10));
    setMaxDay(parseInt(mMaxDate.format('DD'), 10));
  };

  const buildFinalDate = () => {
    const dateString = `${mmValueString}-${ddValueString}-${yyValueString}`;
    const mDate = m(dateString, internalFormat, true);

    if (mDate.isValid()) {
      updateModelInputValue(name, mDate.format(format));
      inputChange({ e: dropDownDatesRef, name, value: mDate.format(format) });
    } else {
      setCompomponetAsInvalid(dateString);
    }
  };

  const addLeadZero = (n: number): string => {
    return n < 10 ? `0${n}` : `${n}`;
  };

  // DAY RELATED FUNCTIONS
  const handleDDChange = ({ value }: ChangeParams) => {
    const valueConverted = addLeadZero(value as number);
    const stringValue = `${value}`;
    const numericValue = isNaN(parseInt(stringValue))
      ? 0
      : parseInt(stringValue);

    setDDvalue(numericValue);
    setDDvalueString(valueConverted);
  };

  const buildDDOptions = (start?: number, limit?: number) => {
    const ret: Option[] = [];
    const s = start || 1;
    const l = limit || 31;
    const d = ddValue;

    for (let i = s; i <= l; ++i) {
      ret.push({ label: addLeadZero(i), value: i });
    }

    setDDOptions(ret);
    if (d < s || d > l) {
      setDDvalue(0);
      setDDvalueString('');
    }
  };

  // MONTH RELATED FUNCTIONS
  const handleMMChange = ({ value }: ChangeParams) => {
    const stringValue = `${value}`;
    const numericValue = isNaN(parseInt(stringValue))
      ? 0
      : parseInt(stringValue);
    const valueConverted = addLeadZero(numericValue);
    const dd = ddValue > 0 ? addLeadZero(ddValue) : '01';
    const yy = yyValue > 0 ? yyValue : 1900;
    const daysInMonth = m(
      `${valueConverted}-${dd}-${yy}`,
      internalFormat,
      true
    ).daysInMonth();

    setMMValue(numericValue);
    setMMValueString(valueConverted);

    // this here validates the incoming date limits and rebuilds options based on those limits
    if (yyValue === minYear && numericValue === minMonth) {
      buildDDOptions(minDay);
    } else if (yyValue === maxYear && numericValue === maxMonth) {
      buildDDOptions(1, maxDay);
    } else {
      buildDDOptions(undefined, daysInMonth);
    }
  };

  const buildMMOptions = (start?: number, limit?: number) => {
    const ret: Option[] = [];
    const s = start || 1;
    const l = limit || 12;
    const mm = mmValue;

    for (let i = s; i <= l; ++i) {
      const label = mmmm
        ? m(`${addLeadZero(i)}-01-1985`, internalFormat, true).format('MMMM')
        : addLeadZero(i);
      ret.push({ label, value: i });
    }

    setMMOptions(ret);
    if (mm < s || mm > l) {
      setMMValue(0);
      setMMValueString('');
    }
  };

  // YEAR RELATED FUNCTIONS
  const handleYYChange = ({ value }: ChangeParams) => {
    const stringValue = `${value}`;
    const numericValue = isNaN(parseInt(stringValue, 10))
      ? 0
      : parseInt(stringValue, 10);
    setYYValue(numericValue);
    setYYValueString(stringValue);

    // this here validates the incoming date limits and rebuilds options based on those limits
    if (numericValue === minYear) {
      buildMMOptions(minMonth);
      if (mmValue <= minMonth) {
        buildDDOptions(minDay);
      }
    } else if (numericValue === maxYear) {
      buildMMOptions(undefined, maxMonth);
      if (mmValue >= maxMonth) {
        buildDDOptions(1, maxDay);
      }
    }
  };

  const setCompomponetAsInvalid = (date: string) => {
    const mDate = m(date, format, true);

    if (!mDate.isValid()) {
      if (model) {
        updateModelInput(name, {
          type: 'dropdowndates',
          valid: false,
          invalid: true,
          pristine: false,
          touched: true,
          dirty: false,
          value: '',
        });
      }
    }
  };

  const buildYYOptions = (start?: number, limit?: number) => {
    const ret: Option[] = [];
    const mStart = m(minDate, format, true).isValid()
      ? m(minDate, format, true)
      : m(minDate, internalFormat, true);
    const mLimit = m(maxDate, format, true).isValid()
      ? m(maxDate, format, true)
      : m(maxDate, internalFormat, true);
    const l = limit || parseInt(mLimit.format('YYYY'), 10);
    const s = start || parseInt(mStart.format('YYYY'), 10);
    const y = yyValue;

    for (let i = s; i <= l; ++i) {
      ret.push({ label: `${i}`, value: i });
    }

    setYYOptions(ret);
    if (y < s || y > l) {
      setYYValue(0);
      setYYValueString('');
    }
  };

  const setDefaultValue = () => {
    const mDate = m(value, format, true);

    if (mDate.isValid()) {
      const mm = mDate.format('MM');
      const dd = mDate.format('DD');
      const yy = mDate.format('YYYY');
      setMMValue(parseInt(mm, 10));
      setMMValueString(mm);
      setDDvalue(parseInt(dd, 10));
      setDDvalueString(dd);
      setYYValue(parseInt(yy, 10));
      setYYValueString(yy);
    }
  };

  const buildDropOptions = () => {
    buildDDOptions();
    buildMMOptions();
    buildYYOptions();
  };

  const checkAndAddModel = () => {
    if (model) {
      addToModel(name, {
        type: 'dropdowndates',
        valid: null,
        invalid: null,
        pristine: true,
        touched: false,
        dirty: false,
        validate,
        value: value || null,
      });
    }
  };

  useEffect(() => {
    buildDropOptions();
  }, []);

  useEffect(() => {
    if (!isMount) {
      buildFinalDate();
    }
  }, [mmValueString, ddValueString, yyValueString]);

  useEffect(() => {
    buildDateLimits();
    setDefaultValue();
  }, [minDate, maxDate, value]);

  useEffect(() => {
    checkAndAddModel();
  }, [value, validate]);

  return (
    <DropDownDatesContext.Provider
      value={{
        name,
        inputChange,
        format,
        maxDate,
        minDate,
        attrs,
        value,
        ddClassName,
        mmClassName,
        yyClassName,
        ddLabel,
        mmLabel,
        yyLabel,
        ddDefaultLabel,
        mmDefaultLabel,
        yyDefaultLabel,
        getElement,
        displayOrder,
        mmmm,
        ddOptions,
        handleDDChange,
        ddValue,
        mmOptions,
        handleMMChange,
        mmValue,
        yyOptions,
        handleYYChange,
        yyValue,
      }}
    >
      {children}
    </DropDownDatesContext.Provider>
  );
};

export default DropDownDatesProvider;
