import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Radio } from '../../src';

const inputName = 'test';
const inputValue = 'test-val';

let mockHandleChange = jest.fn();

describe('<Checkbox /> Tests', () => {
  it(`should render input type: "radio" with testid: "${inputName}"`, () => {
    render(
      <Radio
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
      <Radio
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

    expect(value).toBe('test-val');
    expect(name).toBe(inputName);
  });
});
