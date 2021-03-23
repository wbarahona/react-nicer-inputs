import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { InputGroup } from '../../src';

const inputName = 'test';
const inputValue = 'option1';
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

let mockHandleChange = jest.fn();

describe('<InputGroup /> Tests', () => {
  beforeEach(() => {
    mockHandleChange = jest.fn();
  });

  it(`should render an input group of checkbox with testid: "${inputName}-inputgroup-options"`, () => {
    render(
      <InputGroup
        type="checkbox"
        className="testing-class"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
      />
    );

    const input = screen.getAllByTestId(`${inputName}-inputgroup-options`);

    expect(input).toBeDefined();
  });

  it(`should select all options of checkbox and return to inputChange the value selected`, () => {
    render(
      <InputGroup
        type="checkbox"
        className="testingclass"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
      />
    );

    const allCheckboxes = screen.getAllByTestId(
      `${inputName}-inputgroup-options`
    );

    expect(mockHandleChange).toBeCalledTimes(0);
    allCheckboxes.map(checkbox => {
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });
    expect(mockHandleChange).toBeCalledTimes(2);

    const { name, value } = mockHandleChange.mock.calls[1][0];

    expect(value).toBe('option1,option2');
    expect(name).toBe('test');
  });
  it('should check "Option 1" if value prop is sent as "option1" corresponding to a value on the option array', () => {
    render(
      <InputGroup
        type="checkbox"
        className="testingclass"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
        value="option1"
      />
    );

    const allCheckboxes = screen.getAllByTestId(
      `${inputName}-inputgroup-options`
    );
    const option1 = allCheckboxes[0];

    expect(option1).toBeChecked();
  });
  it('should select an option from the radio buttons and return to inputChange ', () => {
    render(
      <InputGroup
        type="radio"
        className="testingclass"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
      />
    );

    const allRadioButtons = screen.getAllByTestId(
      `${inputName}-inputgroup-options`
    );
    const option1 = allRadioButtons[0];

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.click(option1);
    expect(option1).toBeChecked();
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name, value } = mockHandleChange.mock.calls[0][0];

    expect(value).toBe('option1');
    expect(name).toBe('test');
  });
});
