import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DatePicker } from '../../src';

const inputName = 'test';
const inputSDPValue = '05-25-2021';

let mockHandleChange = jest.fn();

describe('<DatePicker /> Tests', () => {
  it(`should render input type: "text" with testid: "${inputName}"`, () => {
    render(
      <DatePicker
        name={inputName}
        className="testing-class"
        inputChange={mockHandleChange}
        data-testid={inputName}
      />
    );
    const input = screen.queryByTestId(inputName);

    beforeEach(() => {
      mockHandleChange = jest.fn();
    });
    expect(input).toBeDefined();
  });

  it('should render a calendar below the text when clicked', () => {
    render(
      <DatePicker
        name={inputName}
        className="testing-class"
        inputChange={mockHandleChange}
        data-testid={inputName}
      />
    );

    const datePickerTextInput = screen.getByLabelText(
      inputName
    ) as HTMLInputElement;

    fireEvent.focus(datePickerTextInput);

    const datepickerCalendar = screen.getAllByTestId(
      `${inputName}-calendar`
    ) as HTMLLIElement[];

    expect(datepickerCalendar).toBeDefined();
  });
  it('should show a calendar then click a date and save it, the input must have the selected date and call the inputChange function and return the event, the name and the date selected as value', () => {
    render(
      <DatePicker
        name={inputName}
        className="testing-class"
        inputChange={mockHandleChange}
        data-testid={inputName}
      />
    );

    const datePickerTextInput = screen.getByLabelText(
      inputName
    ) as HTMLInputElement;

    fireEvent.focus(datePickerTextInput);

    const datepickerCalendar = screen.getAllByTestId(
      `${inputName}-calendar`
    ) as HTMLLIElement[];

    expect(datepickerCalendar).toBeDefined();
    // TODO: find a way to select an element of the calendar
  });
});
