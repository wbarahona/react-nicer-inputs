import React, { FC, useRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUpload } from '../../src';

const inputName = 'fileupload';

let mockHandleChange = jest.fn();

describe('<File /> Tests', () => {
  it(`should render input type: "file" with testid: "${inputName}"`, () => {
    render(
      <FileUpload
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

  it('should allow file upload and return the value', () => {
    render(
      <FileUpload
        name={inputName}
        className="testing-class"
        data-testid={inputName}
        inputChange={mockHandleChange}
      />
    );
    const input = screen.getByLabelText(inputName) as HTMLInputElement;
    const file = new File([new ArrayBuffer(1)], 'file.jpg');

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.change(input, { target: { file } });
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name, value } = mockHandleChange.mock.calls[0][0];

    expect(value).toBeTruthy();

    expect(name).toBe(inputName);
  });
});
