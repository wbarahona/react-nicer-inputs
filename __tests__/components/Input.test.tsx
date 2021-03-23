import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Input } from '../../src';

const inputName = 'test';
const inputType = 'text';
const inputValue = 'some text value';

let mockHandleChange = jest.fn();

describe('<Input /> Tests', () => {
  it(`should render input type: "${inputType}" with testid: "${inputName}"`, () => {
    render(
      <Input
        type={inputType}
        name={inputName}
        className="testing-class"
        data-testid={inputName}
        inputChange={mockHandleChange}
      />
    );
    const input = screen.queryByTestId(inputName);

    beforeEach(() => {
      mockHandleChange = jest.fn();
    });
    expect(input).toBeDefined();
  });

  it('should change input value to: "some text value"', () => {
    render(
      <Input
        type={inputType}
        name={inputName}
        className="testing-class"
        data-testid={inputName}
        inputChange={mockHandleChange}
      />
    );
    const input = screen.getByLabelText(inputName) as HTMLInputElement;

    fireEvent.change(input, { target: { value: inputValue } });

    expect(input.value).toBe('some text value');
  });

  it(`should call the inputChange prop function and return the parameters: "name" with value: "${inputName}" and "value": "${inputValue}"`, () => {
    render(
      <Input
        type={inputType}
        name={inputName}
        className="testing-class"
        data-testid={inputName}
        inputChange={mockHandleChange}
      />
    );
    const input = screen.getByLabelText(inputName) as HTMLInputElement;

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.change(input, { target: { value: inputValue } });
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name, value } = mockHandleChange.mock.calls[0][0];

    expect(value).toBe('some text value');
    expect(name).toBe(inputName);
  });
});
