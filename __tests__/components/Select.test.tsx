import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {Select} from '../../src';

const inputName = 'test'
const inputValue = "option1";
const options = [
  {value: 'option1', label: 'Option 1'},
  {value: 'option2', label: 'Option 2'},
];

let mockHandleChange = jest.fn();

describe('<Select /> Tests', () => {
  it(`should render a select control with testid: "${inputName}"`, () => {
    render(<Select name={inputName} className="testing-class" options={options} data-testid={inputName} inputChange={mockHandleChange}/>);
    const input = screen.queryByTestId(inputName);

    beforeEach(() => {
      mockHandleChange = jest.fn();
    })
    expect(input).toBeDefined();
  });

  it('should change select value to: "option1"', () => {
    const {getByLabelText} = render(<Select name={inputName} className="testing-class" options={options} data-testid={inputName} inputChange={mockHandleChange}/>);
    const input = getByLabelText(inputName) as HTMLSelectElement;

    fireEvent.change(input, {target: {value: inputValue}});
    
    expect(input.value).toBe('option1');
    
    // expect(mockHandleChange).toHaveBeenCalledWith(expectedChangeParams);
  });

  it(`should call the inputChange prop function and return the parameters: "name" with value: "${inputName}" and "value": "${inputValue}"`, () => {
    const {getByLabelText} = render(<Select name={inputName} className="testing-class" options={options} data-testid={inputName} inputChange={mockHandleChange}/>);
    const input = getByLabelText(inputName) as HTMLSelectElement;

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.change(input, {target: {value: inputValue}});
    expect(mockHandleChange).toBeCalledTimes(1);
    
    const {name, value} = mockHandleChange.mock.calls[0][0];

    expect(value).toBe('option1');
    expect(name).toBe(inputName);
  });

  // test value passed as prop and does not exist in options
  it(`should not break and keep default value if the prop value does not exist in options`, () => {
    const {getByLabelText} = render(<Select name={inputName} className="testing-class" options={options} data-testid={inputName} inputChange={mockHandleChange} value="option0"/>);
    const input = getByLabelText(inputName) as HTMLSelectElement;
    const {value} = input;

    expect(value).toBe('');
  });

  it(`should display value: "${inputValue}" by default as is sent in the value prop and it does exist in option array`, () => {
    const {getByLabelText} = render(<Select name={inputName} className="testing-class" options={options} data-testid={inputName} inputChange={mockHandleChange} value={inputValue} />);
    const input = getByLabelText(inputName) as HTMLSelectElement;
    const {value} = input;

    expect(value).toBe(inputValue);
  });
  
  it(`should have as many options based on the options prop, PLUS default option`, () => {
    const { getAllByTestId} = render(<Select name={inputName} className="testing-class" options={options} data-testid={inputName} inputChange={mockHandleChange}/>);
    const inputOptions = getAllByTestId(`${inputName}-options`);
    const inputOptionsLen = inputOptions.length;
    const optionsLen = options.length + 1;  // taking default option into account

    expect(inputOptionsLen).toBe(optionsLen);
  });
});