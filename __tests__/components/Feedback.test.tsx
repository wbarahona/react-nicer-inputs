import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Feedback } from '../../src';

const elementName = 'test-feedback';
const feedbackContent = 'This is a content text';

let mockHandleChange = jest.fn();

describe('<Feedback /> Tests', () => {
  it(`should render a feedback span block with testid: "${elementName}"`, () => {
    render(
      <Feedback className="testing-class" data-testid={elementName}>
        {feedbackContent}
      </Feedback>
    );
    const feedback = screen.queryByTestId(elementName);

    beforeEach(() => {
      mockHandleChange = jest.fn();
    });

    expect(feedback).toBeDefined();
  });

  it(`should render a feedback span block with testid: "${elementName}" and text: "${feedbackContent}"`, () => {
    render(
      <Feedback className="testing-class" data-testid={elementName}>
        {feedbackContent}
      </Feedback>
    );
    const feedback = screen.queryByTestId(elementName);

    expect(feedback).toBeDefined();
    expect(feedback).toHaveTextContent('This is a content text');
  });
});
