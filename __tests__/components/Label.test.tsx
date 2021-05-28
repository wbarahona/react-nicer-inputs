import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Label, Input } from '../../src';

const elementName = 'test-label';
const labelContent = 'Your Name:';

let mockHandleChange = jest.fn();

describe('<Label /> Tests', () => {
  it(`should render a label element with testid: "${elementName}"`, () => {
    render(
      <Label
        htmlFor="testing-id"
        className="testing-class"
        data-testid={elementName}
      >
        {labelContent}
      </Label>
    );
    const label = screen.queryByTestId(elementName);

    beforeEach(() => {
      mockHandleChange = jest.fn();
    });

    expect(label).toBeDefined();
  });

  it(`should render a label element with testid: "${elementName}" and text: "${labelContent}"`, () => {
    render(
      <>
        <Label
          htmlFor={elementName}
          className="testing-class"
          data-testid={elementName}
        >
          {labelContent}
        </Label>
        <Input
          type="text"
          name={elementName}
          inputChange={() => {}}
          data-testid="testing-input"
          attrs={{ placeholder: 'testing-input' }}
        />
      </>
    );
    const label = screen.getByText(labelContent);
    const input = screen.getByPlaceholderText('testing-input');

    expect(label).toBeDefined();
    expect(label).toHaveTextContent('Your Name:');
    userEvent.click(label);
    expect(input).toHaveFocus();
  });
});
