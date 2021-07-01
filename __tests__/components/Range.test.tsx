import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Range } from '../../src';

const inputName = 'test';
const inputType = 'text';

let mockHandleChange = jest.fn();

describe('<Input /> Tests', () => {
  it(`should render input type: "${inputType}" with testid: "${inputName}"`, () => {
    render(
      <Range
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
});
