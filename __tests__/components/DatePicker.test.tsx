import React from 'react';
import m from 'moment';
import { render, fireEvent, screen } from '@testing-library/react';
import { DatePicker } from '../../src';

const inputName = 'test';
const mToday = m();
const testIdFormat = 'YYYY-MM-DD';
const dateFormat = 'MM-DD-YYYY';

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

  it('should render a single calendar below the text when clicked', () => {
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

    const datepickerCalendarWrapper = screen.getAllByTestId(
      `${inputName}-calendar`
    ) as HTMLDivElement[];

    expect(datepickerCalendarWrapper).toBeDefined();
  });
  it('should show a single calendar then click a date and save it, the input must have the selected date and call the inputChange function and return the event, the name and the date selected as value', () => {
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

    const datepickerCalendarWrapper = screen.getAllByTestId(
      `${inputName}-calendar`
    ) as HTMLDivElement[];

    expect(datepickerCalendarWrapper).toBeDefined();

    const datepickerDateElement = screen.getAllByTestId(
      mToday.format(testIdFormat)
    ) as HTMLTableCellElement[];

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.click(datepickerDateElement[0]);
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name, value } = mockHandleChange.mock.calls[0][0];

    expect(datepickerCalendarWrapper).toBeDefined();
    expect(datepickerCalendarWrapper).toHaveLength(1);
    expect(datePickerTextInput.value).toBe(mToday.format(dateFormat));
    expect(name).toBe(inputName);
    expect(value).toBe(mToday.format(dateFormat));
  });

  it('should show a single calendar then click a date that is sent as non available, must not call inputChange function nor return anything', () => {
    const mSomeDisabledDate = mToday.clone().add(3, 'days');
    render(
      <DatePicker
        name={inputName}
        className="testing-class"
        inputChange={mockHandleChange}
        data-testid={inputName}
        disabledDates={[mSomeDisabledDate.format(dateFormat)]}
      />
    );

    const datePickerTextInput = screen.getByLabelText(
      inputName
    ) as HTMLInputElement;

    fireEvent.focus(datePickerTextInput);

    const datepickerCalendarWrapper = screen.getAllByTestId(
      `${inputName}-calendar`
    ) as HTMLDivElement[];

    expect(datepickerCalendarWrapper).toBeDefined();

    const datepickerDateElement = screen.getAllByTestId(
      mSomeDisabledDate.format(testIdFormat)
    ) as HTMLTableCellElement[];

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.click(datepickerDateElement[0]);
    expect(mockHandleChange).toBeCalledTimes(0);
  });

  it('it should display a calendar with two calendar elements', () => {
    render(
      <DatePicker
        name={inputName}
        className="testing-class"
        inputChange={mockHandleChange}
        data-testid={inputName}
        monthsToDisplay={2}
      />
    );

    const datePickerTextInput = screen.getByLabelText(
      inputName
    ) as HTMLInputElement;

    fireEvent.focus(datePickerTextInput);

    const datepickerCalendarWrapper = screen.getAllByTestId(
      `${inputName}-calendar`
    ) as HTMLDivElement[];

    expect(datepickerCalendarWrapper).toBeDefined();

    const datepickerCalendar = screen.getAllByTestId(
      'calendar-element'
    ) as HTMLDivElement[];

    expect(datepickerCalendar.length).toBe(2);
  });

  it('should display two text inputs for a dateRange picker, the calendar must have 2 calendar elements', () => {
    const dateRangeProp = {
      startDate: {
        type: 'text',
        name: 'checkin-date',
        className: 'some-class-checkin-date',
        inputChange: () => {},
      },
      endDate: {
        type: 'text',
        name: 'checkout-date',
        className: 'some-class-checkout-date',
        inputChange: () => {},
      },
    };

    render(
      <DatePicker
        name={inputName}
        className="testing-class"
        inputChange={mockHandleChange}
        format="MM-DD-YYYY"
        dateRange={dateRangeProp}
        monthsToDisplay={2}
      />
    );

    const datePickerStartDateTextInput = screen.getByLabelText(
      'checkin-date'
    ) as HTMLInputElement;
    const datePickerEndDateTextInput = screen.getByLabelText(
      'checkout-date'
    ) as HTMLInputElement;

    expect(datePickerStartDateTextInput).toBeDefined();
    expect(datePickerEndDateTextInput).toBeDefined();

    fireEvent.focus(datePickerStartDateTextInput);

    const datepickerCalendarWrapper = screen.getAllByTestId(
      `${inputName}-calendar`
    ) as HTMLDivElement[];

    expect(datepickerCalendarWrapper).toBeDefined();

    const datepickerCalendar = screen.getAllByTestId(
      'calendar-element'
    ) as HTMLDivElement[];

    expect(datepickerCalendar.length).toBe(2);
  });

  it('should display two text inputs for a dateRange picker, the calendar must have 2 calendar elements, must select starting date and end date, must return each on each selection', () => {
    const dateRangeProp = {
      startDate: {
        type: 'text',
        name: 'checkin-date',
        className: 'some-class-checkin-date',
        inputChange: () => {},
      },
      endDate: {
        type: 'text',
        name: 'checkout-date',
        className: 'some-class-checkout-date',
        inputChange: () => {},
      },
    };

    render(
      <DatePicker
        name={inputName}
        className="testing-class"
        inputChange={mockHandleChange}
        format="MM-DD-YYYY"
        dateRange={dateRangeProp}
        monthsToDisplay={2}
      />
    );

    const datePickerStartDateTextInput = screen.getByLabelText(
      'checkin-date'
    ) as HTMLInputElement;
    const datePickerEndDateTextInput = screen.getByLabelText(
      'checkout-date'
    ) as HTMLInputElement;

    expect(datePickerStartDateTextInput).toBeDefined();
    expect(datePickerEndDateTextInput).toBeDefined();

    fireEvent.focus(datePickerStartDateTextInput);

    const datepickerCalendarWrapper = screen.getAllByTestId(
      `${inputName}-calendar`
    ) as HTMLDivElement[];

    expect(datepickerCalendarWrapper).toBeDefined();

    const datepickerCalendar = screen.getAllByTestId(
      'calendar-element'
    ) as HTMLDivElement[];

    expect(datepickerCalendar.length).toBe(2);

    const datepickerStartDateElement = screen.getAllByTestId(
      mToday.format(testIdFormat)
    ) as HTMLTableCellElement[];

    const datepickerEndDateElement = screen.getAllByTestId(
      mToday.clone().add(3, 'days').format(testIdFormat)
    ) as HTMLTableCellElement[];

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.click(datepickerStartDateElement[0]);
    expect(mockHandleChange).toBeCalledTimes(1);

    const {
      name: startName,
      value: startValue,
    } = mockHandleChange.mock.calls[0][0];

    expect(startName).toBe(inputName);
    expect(startValue.startDate).toBe(mToday.format(dateFormat));
    expect(datePickerStartDateTextInput.value).toBe(mToday.format(dateFormat));
    expect(datePickerEndDateTextInput.value).toBe('');

    fireEvent.click(datepickerEndDateElement[0]);
    expect(mockHandleChange).toBeCalledTimes(2);

    const {
      name: endName,
      value: endValue,
    } = mockHandleChange.mock.calls[1][0];

    expect(endName).toBe(inputName);
    expect(endValue.endDate).toBe(
      mToday.clone().add(3, 'days').format(dateFormat)
    );
    expect(datePickerEndDateTextInput.value).toBe(
      mToday.clone().add(3, 'days').format(dateFormat)
    );
  });
});
