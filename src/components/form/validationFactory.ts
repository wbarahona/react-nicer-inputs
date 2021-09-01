import {
  Validation,
  ValidationElement,
  InputValue,
  DateRange,
  ValidationResponse,
  ValidationSummaryElement,
  FormModel,
} from '../../types';

export type AnyInputType = InputValue | Date | DateRange | FileList | File[];

export interface UnitProps {
  [key: string]: number;
}

export interface AssertionsProps {
  [key: string]: (value: AnyInputType, limit?: string | number) => boolean;
}

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const numberRegex = /^[0-9]*$/;

const isEmptyString = (v: string) => typeof v === 'string' && v !== '';

const isValidNumber = (v: number) => typeof v === 'number' && v !== undefined;

const isValidDate = (v: DateRange, s: string, e: string) =>
  typeof v === 'object' &&
  s !== undefined &&
  s !== '' &&
  typeof v === 'object' &&
  e !== undefined &&
  e !== '';

function binaryUnitParser(unit: string): number {
  const ammount = parseFloat(
    unit.replaceAll(/(B|KB|MB|GB|b|kb|mb|gb|kB|mB|gB)/g, '')
  );
  const binaryUnitFormat: string = unit.slice(-2);
  const unitPrefix: string = binaryUnitFormat.split('')[0].toUpperCase();
  const unitDictionary: UnitProps = {
    K: 1024,
    M: Math.pow(1024, 2),
    G: Math.pow(1024, 3),
  };
  const requiredAmmount = ammount * unitDictionary[unitPrefix];

  return requiredAmmount;
}

export const Assertions: AssertionsProps = {
  required: (value: AnyInputType): boolean => {
    const valueStr = value as string;
    const valueNum = value as number;
    const valueDateRange = value as DateRange;
    const startDateStr = valueDateRange.startDate as string;
    const endDateStr = valueDateRange.endDate as string;
    const valueFile = value as FileList;

    return (
      isEmptyString(valueStr) ||
      isValidNumber(valueNum) ||
      isValidDate(valueDateRange, startDateStr, endDateStr) ||
      valueFile.length > 0
    );
  },
  email: (value: AnyInputType): boolean => {
    const valueStr = value as string;

    return emailRegex.test(valueStr);
  },
  max: (value: AnyInputType, limit = 0): boolean => {
    if (typeof value === 'string') {
      return value !== '' ? value.length <= limit : true;
    } else if (typeof value !== 'undefined') {
      return value <= limit;
    } else {
      return false;
    }
  },
  min: (value: AnyInputType, limit = 0): boolean => {
    if (typeof value === 'string') {
      return value !== '' ? value.length >= limit : true;
    } else if (typeof value !== 'undefined') {
      return value >= limit;
    } else {
      return false;
    }
  },
  equals: (value: AnyInputType, limit = ''): boolean => {
    return value === limit;
  },
  number: (value: AnyInputType): boolean => {
    const valueStr = value as string;

    return numberRegex.test(valueStr);
  },
  pattern: (value: AnyInputType, limit): boolean => {
    const valueStr = value as string;
    const regex = limit as string;
    const newRegex = new RegExp(regex);
    let resp = true;

    if (value !== '') {
      resp = newRegex.test(valueStr);
    }

    return resp;
  },
  alpha: (value: AnyInputType): boolean => {
    const valueStr = value as string;

    return /^[A-Za-z]+$/i.test(valueStr);
  },
  alphaNumeric: (value: AnyInputType): boolean => {
    const valueStr = value as string;

    return /^[0-9A-Z]+$/i.test(valueStr);
  },
  name: (value: AnyInputType): boolean => {
    const valueStr = value as string;

    return /^[a-z\u00C0-\u02AB'´`]+\.?\s?([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i.test(
      valueStr
    );
  },
  maxfilesize: (value: AnyInputType, limit): boolean => {
    const valueFileArr = value as File[];
    const res = true;

    const byteUnits = binaryUnitParser(`${limit}`);

    for (let i = 0; i < valueFileArr.length; i++) {
      const file = valueFileArr[i];
      const { size } = file;

      if (size > byteUnits) return false;
    }

    return res;
  },
  minfilesize: (value: AnyInputType, limit): boolean => {
    const valueFileArr = value as File[];
    const res = true;

    const byteUnits = binaryUnitParser(`${limit}`);

    for (let i = 0; i < valueFileArr.length; i++) {
      const file = valueFileArr[i];
      const { size } = file;

      if (size < byteUnits) return false;
    }

    return res;
  },
  extension: (value: AnyInputType, limit): boolean => {
    const valueFileArr = value as FileList;
    const extension = `${limit}`;
    let res = true;

    for (let i = 0; i < valueFileArr.length; i++) {
      const file = valueFileArr[i];
      const { name } = file;
      const fileExt = name.split('.').pop();

      if (fileExt?.toLowerCase() !== extension.toLowerCase()) {
        return false;
      }
    }

    return res;
  },
};

export const runStringRule = (rule: string, value: AnyInputType): boolean => {
  const daRule = Assertions[rule];
  let res = true;

  if (typeof daRule === 'function') {
    res = daRule(value);
  } else {
    console.warn(
      `Rule "${rule}" not found in validation dictionary, try one of the following: name, alphaNumeric, alpha, pattern, number, equals, min, max, email, required`
    );
    res = true;
  }

  return res;
};

export const runObjectRule = (
  rule: string,
  boundary: number,
  value: AnyInputType
): boolean => {
  const daRule = Assertions[rule];

  let res = true;

  if (typeof daRule === 'function') {
    res = daRule(value, boundary);
  } else {
    console.warn(
      `Rule "${rule}" not found in validation dictionary, try one of the following: name, alphaNumeric, alpha, pattern, number, equals, min, max, email, required`
    );
    res = true;
  }

  return res;

  // if (!daRule) {
  //   console.warn(
  //     `Rule "${rule}" not found in validation dictionary, try one of the following: name, alphaNumeric, alpha, pattern, number, equals, min, max, email, required`
  //   );
  // }

  // return daRule ? daRule(value, boundary) : false;
};

export const ValidationFactory = {
  validateInput: (
    value: AnyInputType,
    validate: Validation[] = []
  ): ValidationResponse => {
    const summary: ValidationSummaryElement = {};
    let valid = false;

    if (validate.length > 0) {
      validate.map(validation => {
        const ruleType = typeof validation;

        switch (ruleType) {
          case 'string':
            const ruleStr = validation as string;
            const strResp = runStringRule(ruleStr, value);

            summary[ruleStr] = strResp;
            break;
          case 'object':
            const ruleObjName = Object.keys(validation)[0] as string;
            const validat = validation as ValidationElement;
            const ruleObjValNumber = validat[ruleObjName] as number;
            const ruleObjValFn = validat[ruleObjName] as Function;

            if (
              typeof ruleObjValNumber === 'number' &&
              typeof ruleObjValFn === 'number'
            ) {
              const objNumResp = runObjectRule(
                ruleObjName,
                ruleObjValNumber,
                value
              );

              summary[ruleObjName] = objNumResp;
            }

            if (
              typeof ruleObjValNumber === 'function' &&
              typeof ruleObjValFn === 'function'
            ) {
              const objFnResp = ruleObjValFn(value);

              summary[ruleObjName] = objFnResp;
            }

            if (
              typeof ruleObjValNumber === 'string' &&
              typeof ruleObjValFn === 'string'
            ) {
              const objNumResp = runObjectRule(
                ruleObjName,
                ruleObjValNumber,
                value
              );

              summary[ruleObjName] = objNumResp;
            }

            break;
          default:
            break;
        }
      });

      for (const el in summary) {
        if (Object.prototype.hasOwnProperty.call(summary, el)) {
          const value = summary[el];

          valid = value;
          if (!value) {
            break;
          }
        }
      }
    } else {
      valid = true;
    }

    return { valid, summary };
  },
  validateForm: (model: FormModel, name: string): boolean => {
    const { fields } = model[name];

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const fieldElem = fields[field];

        if (
          fieldElem.validate &&
          fieldElem.pristine &&
          fieldElem.valid === null
        ) {
          // return false when element needs validation, is still pristine meaning valid is null, the input has not been interacted with
          return false;
        }
        if (
          fieldElem.validate &&
          fieldElem.touched &&
          fieldElem.valid !== null &&
          !fieldElem.valid
        ) {
          // return false when element needs validation, it has been interacted with however the validation returned false
          return false;
        }
        if (
          fieldElem.validate &&
          fieldElem.pristine &&
          fieldElem.valid !== null &&
          !fieldElem.valid
        ) {
          // return false when element needs validation, its pristine but the validation is false, meaning user clicked on submit
          return false;
        }
      }
    }

    return true;
  },
};

export default ValidationFactory;
export const validateInput = ValidationFactory.validateInput;
export const validateForm = ValidationFactory.validateForm;
