import React, { FC, useRef } from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { InputGroup, Checkbox, Radio } from '../../src';

const inputName = 'test';
const inputValue = 'option1';
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

const newOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

let mockHandleChange = jest.fn();

describe('<InputGroup /> Tests', () => {
  beforeEach(() => {
    mockHandleChange = jest.fn();
  });

  it(`should render an input group of checkbox with testid: "${inputName}-inputgroup-options"`, () => {
    render(
      <InputGroup
        type="checkbox"
        className="testing-class"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
      />
    );

    const input = screen.getAllByTestId(`${inputName}-inputgroup-options`);

    expect(input).toBeDefined();
  });

  it(`should select all options of checkbox and return to inputChange the value selected`, () => {
    render(
      <InputGroup
        type="checkbox"
        className="testingclass"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
      />
    );

    const allCheckboxes = screen.getAllByTestId(
      `${inputName}-inputgroup-options`
    );

    expect(mockHandleChange).toBeCalledTimes(0);
    allCheckboxes.map(checkbox => {
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });
    expect(mockHandleChange).toBeCalledTimes(2);

    const { name, value } = mockHandleChange.mock.calls[1][0];

    expect(value).toBe('option1,option2');
    expect(name).toBe('test');
  });
  it('should check "Option 1" if value prop is sent as "option1" corresponding to a value on the option array', () => {
    render(
      <InputGroup
        type="checkbox"
        className="testingclass"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
        value="option1"
      />
    );

    const allCheckboxes = screen.getAllByTestId(
      `${inputName}-inputgroup-options`
    );
    const option1 = allCheckboxes[0];

    expect(option1).toBeChecked();
  });
  it('should select an option from the radio buttons and return to inputChange ', () => {
    render(
      <InputGroup
        type="radio"
        className="testingclass"
        name={inputName}
        data-testid={inputName}
        options={options}
        inputChange={mockHandleChange}
      />
    );

    const allRadioButtons = screen.getAllByTestId(
      `${inputName}-inputgroup-options`
    );
    const option1 = allRadioButtons[0];

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.click(option1);
    expect(option1).toBeChecked();
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name, value } = mockHandleChange.mock.calls[0][0];

    expect(value).toBe('option1');
    expect(name).toBe('test');
  });

  it('should render 2 options first then when changing the options prop there should be three options, last one can be selectable', () => {
    interface TestOptions {
      value: string;
      label: string;
    }
    interface InputGroupRerenderProps {
      opts: TestOptions[];
    }

    let counterid = 1;

    const InputGroupRerender: FC<InputGroupRerenderProps> = ({
      opts,
    }: InputGroupRerenderProps) => {
      const id = useRef(counterid);
      return (
        <div>
          <span data-testid="instance-id">{id.current}</span>
          <InputGroup
            type="radio"
            className="testingclass"
            name={inputName}
            data-testid={inputName}
            options={opts}
            inputChange={mockHandleChange}
          />
        </div>
      );
    };
    const { rerender } = render(<InputGroupRerender opts={options} />);

    const allRadioButtons = screen.getAllByTestId(
      `${inputName}-inputgroup-options`
    );

    expect(allRadioButtons.length).toBe(2);
    rerender(<InputGroupRerender opts={newOptions} />);
    const newAllRadioButtons = screen.getAllByTestId(
      `${inputName}-inputgroup-options`
    );
    const instanceid = screen.getByTestId('instance-id');

    expect(newAllRadioButtons.length).toBe(3);
    expect(instanceid).toHaveTextContent('1');

    const option3 = newAllRadioButtons[2];

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.click(option3);
    expect(option3).toBeChecked();
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name, value } = mockHandleChange.mock.calls[0][0];

    expect(value).toBe('option3');
    expect(name).toBe('test');
  });

  it('should render two checkboxes for foods, allow selection and return the selected value through inputChange', () => {
    render(
      <InputGroup
        type="checkbox"
        name="food"
        className="row"
        inputChange={mockHandleChange}
        data-testid="food"
      >
        <div className="col-6">
          <Checkbox
            name="food"
            className="checkbox-test"
            inputChange={() => {}}
            value="pizza 🍕"
            data-testid="food-inputgroup-options"
          >
            Pizza <span>🍕</span>
          </Checkbox>
        </div>
        <div className="col-6">
          <Checkbox
            name="food"
            className="checkbox-test"
            inputChange={() => {}}
            value="hamburger 🍔"
            data-testid="food-inputgroup-options"
          >
            Hamburger <span>🍔</span>
          </Checkbox>
        </div>
      </InputGroup>
    );

    const allCheckboxes = screen.getAllByTestId('food-inputgroup-options');

    allCheckboxes.forEach(checkbox => {
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });
    expect(mockHandleChange).toBeCalledTimes(2);

    const { name, value } = mockHandleChange.mock.calls[1][0];

    expect(value).toBe('pizza 🍕,hamburger 🍔');
    expect(name).toBe('food');
  });

  it('should render two radio buttons for drinks, allow selection and return the selected value through inputChange', () => {
    render(
      <InputGroup
        type="radio"
        name="drinks"
        inputChange={mockHandleChange}
        data-testid="drinks"
      >
        <div className="row">
          <div className="col-6">
            <Radio
              name="radio"
              className="radio-test"
              inputChange={() => {}}
              data-testid="drinks-inputgroup-options"
              value="beer 🍺"
            >
              beer <span>🍺</span>
            </Radio>
          </div>
          <div className="col-6">
            <Radio
              name="radio"
              className="radio-test"
              inputChange={() => {}}
              data-testid="drinks-inputgroup-options"
              value="wine 🍷"
            >
              wine <span>🍷</span>
            </Radio>
          </div>
        </div>
      </InputGroup>
    );

    const allRadioButtons = screen.getAllByTestId('drinks-inputgroup-options');
    const option1 = allRadioButtons[0];
    const option2 = allRadioButtons[1];

    expect(mockHandleChange).toBeCalledTimes(0);
    fireEvent.click(option1);
    expect(option1).toBeChecked();
    expect(mockHandleChange).toBeCalledTimes(1);

    const { name: nameOpt1, value: valueOpt1 } =
      mockHandleChange.mock.calls[0][0];

    expect(valueOpt1).toBe('beer 🍺');
    expect(nameOpt1).toBe('drinks');

    fireEvent.click(option2);
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
    expect(mockHandleChange).toBeCalledTimes(2);

    const { name: nameOpt2, value: valueOpt2 } =
      mockHandleChange.mock.calls[1][0];

    expect(valueOpt2).toBe('wine 🍷');
    expect(nameOpt2).toBe('drinks');
  });
});
