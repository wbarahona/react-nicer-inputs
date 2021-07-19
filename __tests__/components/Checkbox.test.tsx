import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Checkbox } from '../../src';

const inputName = 'test';
const inputValue = 'test-val';

let mockHandleChange = jest.fn();

describe('<Checkbox /> Tests', () => {
  it(`should render input type: "checkbox" with testid: "${inputName}"`, () => {
    render(
      <Checkbox
        name={inputName}
        className="testing-class"
        data-testid={inputName}
        inputChange={mockHandleChange}
        value={inputValue}
      />
    );
    const input = screen.queryByTestId(inputName);

    beforeEach(() => {
      mockHandleChange = jest.fn();
    });
    expect(input).toBeDefined();
  });

  it(`should call the inputChange prop function and return the parameters: "name" with value: "${inputName}" and "value": "${inputValue}"`, () => {
    render(
      <Checkbox
        name={inputName}
        className="testing-class"
        data-testid={inputName}
        inputChange={mockHandleChange}
        value={inputValue}
      />
    );
    const input = screen.getByLabelText(inputName) as HTMLInputElement;

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.click(input);
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name, value } = mockHandleChange.mock.calls[0][0];

    expect(value).toBe('test');
    expect(name).toBe(inputName);
  });

  it(`should call the inputChange prop function and return the parameters: "name" with value: "${inputName}" and "value": "${inputValue}" first time then if clicked again must return "value": "" (empty)`, () => {
    render(
      <Checkbox
        name={inputName}
        className="testing-class"
        data-testid={inputName}
        inputChange={mockHandleChange}
        value={inputValue}
      />
    );
    const input = screen.getByLabelText(inputName) as HTMLInputElement;

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.click(input);
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name, value } = mockHandleChange.mock.calls[0][0];

    expect(value).toBe('test');
    expect(name).toBe(inputName);

    fireEvent.click(input);
    expect(mockHandleChange).toBeCalledTimes(2);

    const { value: reValue } = mockHandleChange.mock.calls[1][0];

    expect(reValue).toBe('');
  });
});
