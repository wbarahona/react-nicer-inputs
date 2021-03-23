import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Autocomplete } from '../../src';

const inputName = 'test';
const inputValue = 'option1';
const textInputValue = 'Option 1';
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

let mockHandleChange = jest.fn();

describe('<Autocomplete /> Tests', () => {
  beforeEach(() => {
    mockHandleChange = jest.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it(`should render autocomplete input with testid: "${inputName}"`, () => {
    render(
      <Autocomplete
        className="testing-class"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
      />
    );

    const input = screen.queryByTestId(inputName);

    expect(input).toBeDefined();
  });

  it('should render all options available when clicking on the input', () => {
    render(
      <Autocomplete
        className="testing-class"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
      />
    );
    const autocompleteTextInput = screen.getByLabelText(
      inputName
    ) as HTMLInputElement;

    fireEvent.click(autocompleteTextInput);

    const autocompleteOptions = screen.getAllByTestId(
      `${inputName}-autocomplete-options`
    ) as HTMLLIElement[];
    const autocompleteOptionsLen = autocompleteOptions.length;
    const optionsLen = options.length;

    expect(autocompleteOptionsLen).toBe(optionsLen);
  });

  it(`should change the text input value to "${textInputValue}" and render options that match only one option`, () => {
    render(
      <Autocomplete
        className="testing-class"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
        value={inputValue}
      />
    );
    const autocompleteTextInput = screen.getByLabelText(
      inputName
    ) as HTMLInputElement;

    fireEvent.click(autocompleteTextInput);
    fireEvent.change(autocompleteTextInput, {
      target: { value: textInputValue },
    });

    const autocompleteOptions = screen.getAllByTestId(
      `${inputName}-autocomplete-options`
    ) as HTMLLIElement[];
    const autocompleteOptionsLen = autocompleteOptions.length;

    expect(autocompleteTextInput.value).toBe('Option 1');
    expect(autocompleteOptionsLen).toBe(2);
  });

  it(`should set input value to be "${textInputValue}" when prop value is sent and is not empty and was found on the option array`, () => {
    render(
      <Autocomplete
        className="testing-class"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
        value={inputValue}
      />
    );
    const autocompleteTextInput = screen.getByLabelText(
      inputName
    ) as HTMLInputElement;

    expect(autocompleteTextInput.value).toBe('Option 1');
  });

  it(`should change the text input value to "${textInputValue}" and render options that match only one option, then select one option available and hide all options`, () => {
    render(
      <Autocomplete
        className="testing-class"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
        value={inputName}
      />
    );
    const autocompleteTextInput = screen.getByLabelText(
      inputName
    ) as HTMLInputElement;

    fireEvent.click(autocompleteTextInput);
    fireEvent.change(autocompleteTextInput, {
      target: { value: textInputValue },
    });

    const autocompleteOptions = screen.getAllByTestId(
      `${inputName}-autocomplete-options`
    ) as HTMLLIElement[];
    const autocompleteOptionsLen = autocompleteOptions.length;
    const optionsLen = options.filter(({ label }) =>
      label.toLocaleLowerCase().includes(textInputValue.toLowerCase())
    ).length;
    const availableOption = autocompleteOptions[0];

    expect(autocompleteOptionsLen).toBe(optionsLen);

    fireEvent.click(availableOption);

    const newAutocompleteOptions = screen.queryByRole('listitem');

    expect(newAutocompleteOptions).toBeNull();
  });

  it('should display the options list after text input is clicked, when click outside it should hide options', async () => {
    render(
      <Autocomplete
        className="testing-class"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
        value={inputName}
      />
    );
    const autocompleteTextInput: HTMLElement = screen.getByLabelText(inputName);

    fireEvent.click(autocompleteTextInput);

    const autocompleteOptions = screen.getAllByTestId(
      `${inputName}-autocomplete-options`
    ) as HTMLLIElement[];

    expect(autocompleteOptions.length).toBe(2);

    await fireEvent.click(autocompleteTextInput);
    await fireEvent.click(document.body);

    const newAutocompleteOptions = screen.queryAllByRole('listitem');

    expect(newAutocompleteOptions.length).toBe(0);
  });
});
