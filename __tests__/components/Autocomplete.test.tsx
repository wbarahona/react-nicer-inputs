import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Autocomplete} from '../../src';

const inputName = 'test';
const inputValue = "option1";
const textInputValue = "Option 1";
const options = [
  {value: 'option1', label: 'Option 1'},
  {value: 'option2', label: 'Option 2'},
];

let mockHandleChange = jest.fn();

describe('<Autocomplete /> Tests', () => {
  it(`should render autocomplete input with testid: "${inputName}"`, () => {
    render(<Autocomplete name={inputName} className="testing-class" data-testid={inputName} options={options} inputChange={mockHandleChange}/>);
    const input = screen.queryByTestId(inputName);

    beforeEach(() => {
      mockHandleChange = jest.fn();
    })
    expect(input).toBeDefined();
  });

  it('should render all options available when clicking on the input', () => {
    const {getByLabelText, getAllByTestId} = render(<Autocomplete name={inputName} className="testing-class" data-testid={inputName} options={options} inputChange={mockHandleChange} />);
    const autocompleteTextInput = getByLabelText(inputName) as HTMLInputElement;

    fireEvent.click(autocompleteTextInput);

    const autocompleteOptions = getAllByTestId(`${inputName}-autocomplete-options`) as HTMLLIElement[];
    const autocompleteOptionsLen = autocompleteOptions.length;
    const optionsLen = options.length;

    expect(autocompleteOptionsLen).toBe(optionsLen);
  })

  it(`should change the text input value to "${textInputValue}" and render options that match only one option`, () => {
    const {getByLabelText, getAllByTestId} = render(<Autocomplete name={inputName} className="testing-class" data-testid={inputName} options={options} inputChange={mockHandleChange} />);
    const autocompleteTextInput = getByLabelText(inputName) as HTMLInputElement;

    fireEvent.click(autocompleteTextInput);
    fireEvent.change(autocompleteTextInput, {target: {value: textInputValue}});

    const autocompleteOptions = getAllByTestId(`${inputName}-autocomplete-options`) as HTMLLIElement[];
    const autocompleteOptionsLen = autocompleteOptions.length;
    const optionsLen = options.filter(({label}) => label.toLowerCase().includes(textInputValue.toLocaleLowerCase())).length;
    
    expect(autocompleteTextInput.value).toBe(textInputValue);
    expect(autocompleteOptionsLen).toBe(optionsLen);
  })

  it(`should set input value to be "${textInputValue}" when prop value is sent and is not empty and was found on the option array`, () => {
    const {getByLabelText} = render(<Autocomplete name={inputName} className="testing-class" data-testid={inputName} options={options} inputChange={mockHandleChange} value={inputValue} />);
    const autocompleteTextInput = getByLabelText(inputName) as HTMLInputElement;

    expect(autocompleteTextInput.value).toBe(textInputValue);
  })

  it(`should change the text input value to "${textInputValue}" and render options that match only one option, then select one option available and hide all options`, () => {
    const {getByLabelText, getAllByTestId, container} = render(<Autocomplete name={inputName} className="testing-class" data-testid={inputName} options={options} inputChange={mockHandleChange} />);
    const autocompleteTextInput = getByLabelText(inputName) as HTMLInputElement;

    fireEvent.click(autocompleteTextInput);
    fireEvent.change(autocompleteTextInput, {target: {value: textInputValue}});

    const autocompleteOptions = getAllByTestId(`${inputName}-autocomplete-options`) as HTMLLIElement[];
    const autocompleteOptionsLen = autocompleteOptions.length;
    const optionsLen = options.filter(({label}) => label.toLocaleLowerCase().includes(textInputValue.toLowerCase())).length;
    const availableOption = autocompleteOptions[0];

    expect(autocompleteOptionsLen).toBe(optionsLen);

    fireEvent.click(availableOption);

    const newAutocompleteOptions = screen.queryByRole('listitem');

    expect(newAutocompleteOptions).toBeNull();
  })

  it('should display the options list after text input is clicked, when click outside it should hfide options', () => {
    const {getByLabelText, getAllByTestId, container} = render(<Autocomplete name={inputName} className="testing-class" data-testid={inputName} options={options} inputChange={mockHandleChange} />);
    const autocompleteTextInput = getByLabelText(inputName) as HTMLInputElement;

    fireEvent.click(autocompleteTextInput);

    const autocompleteOptions = getAllByTestId(`${inputName}-autocomplete-options`) as HTMLLIElement[];
    const autocompleteOptionsLen = autocompleteOptions.length;
    const optionsLen = options.length;

    expect(autocompleteOptionsLen).toBe(optionsLen);

    fireEvent.click(document.body);

    const newAutocompleteOptions = screen.queryAllByRole('listitem');

    expect(newAutocompleteOptions).toBeNull();
  })
});