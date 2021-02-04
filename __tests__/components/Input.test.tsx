import React, {ChangeEvent} from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import { mocked } from 'ts-jest/utils'
import {Input} from '../../src';

const inputName = 'test'
const inputType = 'text';
const inputValue = "some text value";

interface ChangeParams {
  e: ChangeEvent<HTMLInputElement>,
  name: string,
  value: string | number
}

let mockHandleChange = jest.fn();

describe('<Input /> Tests', () => {
  it(`should render input type: "${inputType}" with testid: "${inputName}"`, () => {
    render(<Input type={inputType} name={inputName} className="testing-class" inputChange={mockHandleChange}/>);
    const input = screen.queryByTestId(inputName);

    beforeEach(() => {
      mockHandleChange = jest.fn();
    })
    expect(input).toBeDefined();
  });

  it('should change input value to: "some text value"', () => {
    const {getByLabelText} = render(<Input type={inputType} name={inputName} className="testing-class" inputChange={mockHandleChange}/>);
    const input = getByLabelText(inputName) as HTMLInputElement;

    fireEvent.change(input, {target: {value: inputValue}});
    
    expect(input.value).toBe('some text value');
    
    // expect(mockHandleChange).toHaveBeenCalledWith(expectedChangeParams);
  });

  it(`should call the inputChange prop function and return the parameters: "name" with value: "${inputName}" and "value": "${inputValue}"`, () => {
    const {getByLabelText} = render(<Input type={inputType} name={inputName} className="testing-class" inputChange={mockHandleChange}/>);
    const input = getByLabelText(inputName) as HTMLInputElement;

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.change(input, {target: {value: inputValue}});
    expect(mockHandleChange).toBeCalledTimes(1);
    
    const {name, value} = mockHandleChange.mock.calls[0][0];

    expect(value).toBe('some text value');
    expect(name).toBe(inputName);
  })
});