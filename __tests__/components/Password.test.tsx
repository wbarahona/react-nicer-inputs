import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Password } from '../../src';

const inputName = 'password';
const inputValue = 'some text value';

let mockHandleChange = jest.fn();

describe('<Password /> Tests', () => {
  it(`should render input type: "password" with testid: "${inputName}"`, () => {
    render(
      <Password
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
      <Password
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
      <Password
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

  it('should toggle from password type to text type becoming visible and hidden when clicking the button', () => {
    render(
      <Password
        name={inputName}
        className="testing-class"
        data-testid={inputName}
        inputChange={mockHandleChange}
      />
    );
    const input = screen.getByLabelText(inputName) as HTMLInputElement;
    const button = screen.getByText('show');

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.change(input, { target: { value: inputValue } });
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name, value } = mockHandleChange.mock.calls[0][0];

    expect(value).toBe('some text value');
    expect(name).toBe(inputName);

    fireEvent.click(button);

    expect(input.type).toBe('text');

    fireEvent.click(button);

    expect(input.type).toBe('password');
  });

  it('should display a simple password input, no toggle button, yet allows change normally.', () => {
    render(
      <Password
        name={inputName}
        className="testing-class"
        data-testid={inputName}
        inputChange={mockHandleChange}
        noToggle
      />
    );
    const input = screen.getByLabelText(inputName) as HTMLInputElement;
    const button = screen.queryByText('button');

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.change(input, { target: { value: inputValue } });
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name, value } = mockHandleChange.mock.calls[0][0];

    expect(value).toBe('some text value');
    expect(name).toBe(inputName);
    expect(button).not.toBeInTheDocument();
  });
});
