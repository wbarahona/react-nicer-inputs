import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Input, Password, Submit } from '../../src';
import { FormModel, ChangeParams } from '../../src/types';

const modelName = 'login';

let mockHandleFormSubmit = jest.fn();
let mockHandleUseModel = jest.fn();
let mockHandleChange = jest.fn();

interface SubmitParams {
  isValid: boolean;
  isInvalid: boolean;
}

describe('<Form /> Tests', () => {
  it(`should render a form: "${modelName}" with testid: "${modelName}"`, () => {
    render(
      <Form
        model={modelName}
        className="col-12"
        formSubmit={mockHandleFormSubmit}
        useModel={mockHandleUseModel}
      ></Form>
    );
    const loginForm = screen.queryByTestId(modelName);

    beforeEach(() => {
      mockHandleFormSubmit = jest.fn();
      mockHandleUseModel = jest.fn();
      mockHandleChange = jest.fn();
    });
    expect(loginForm).toBeDefined();
  });

  it(`should render a form: "${modelName}", useModel must return the form model, only one field must be filled therefore form must be invalid.`, () => {
    render(
      <Form
        model={modelName}
        className="col-12"
        formSubmit={mockHandleFormSubmit}
        useModel={mockHandleUseModel}
      >
        <Input
          name="username"
          type="text"
          className="col-6"
          data-testid="username"
          inputChange={mockHandleChange}
          validate={['required']}
        />
        <Password
          name="password"
          className="col-6"
          data-testid="password"
          inputChange={mockHandleChange}
          validate={['required']}
        />
      </Form>
    );
    const loginForm = screen.queryByTestId(modelName);

    expect(loginForm).toBeDefined();

    const usernameInput = screen.getByLabelText('username') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('password') as HTMLInputElement;

    expect(mockHandleChange).toBeCalledTimes(0);
    expect(mockHandleUseModel).toBeCalledTimes(1);
    fireEvent.change(usernameInput, { target: { value: 'myawesomeness' } });
    expect(mockHandleChange).toBeCalledTimes(1);
    expect(mockHandleUseModel).toBeCalledTimes(2);
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.change(passwordInput, { target: { value: '' } });

    const usernameChange: ChangeParams = mockHandleChange.mock.calls[0][0];
    const { login }: FormModel = mockHandleUseModel.mock.calls[1][0];

    const { fields, isValid } = login;

    // validate change on username
    expect(usernameChange.value).toBe('myawesomeness');
    expect(usernameChange.name).toBe('username');

    // validate form model fields
    expect(fields.username.value).toBe('myawesomeness');

    // validate form validity
    expect(isValid).toBeFalsy();
  });

  it(`should render a form: "${modelName}", useModel must return the form model, both inputs are filled therefore form must be valid.`, () => {
    render(
      <Form
        model={modelName}
        className="col-12"
        formSubmit={mockHandleFormSubmit}
        useModel={mockHandleUseModel}
      >
        <Input
          name="username"
          type="text"
          className="col-6"
          data-testid="username"
          inputChange={mockHandleChange}
          validate={['required']}
        />
        <Password
          name="password"
          className="col-6"
          data-testid="password"
          inputChange={mockHandleChange}
          validate={['required']}
        />
      </Form>
    );
    const loginForm = screen.queryByTestId(modelName);

    expect(loginForm).toBeDefined();

    const usernameInput = screen.getByLabelText('username') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('password') as HTMLInputElement;

    expect(mockHandleChange).toBeCalledTimes(0);
    expect(mockHandleUseModel).toBeCalledTimes(1);
    fireEvent.change(usernameInput, { target: { value: 'myawesomeness' } });
    expect(mockHandleChange).toBeCalledTimes(1);
    expect(mockHandleUseModel).toBeCalledTimes(2);
    fireEvent.change(passwordInput, { target: { value: 'Very$3cret!' } });
    expect(mockHandleChange).toBeCalledTimes(2);
    expect(mockHandleUseModel).toBeCalledTimes(3);

    const usernameChange: ChangeParams = mockHandleChange.mock.calls[0][0];
    const passwordChange: ChangeParams = mockHandleChange.mock.calls[1][0];
    const { login }: FormModel = mockHandleUseModel.mock.calls[2][0];
    const { fields, isValid } = login;

    // validate change on username
    expect(usernameChange.value).toBe('myawesomeness');
    expect(usernameChange.name).toBe('username');

    // validate change on password
    expect(passwordChange.value).toBe('Very$3cret!');
    expect(passwordChange.name).toBe('password');

    // validate form model fields
    expect(fields.username.value).toBe('myawesomeness');
    expect(fields.password.value).toBe('Very$3cret!');

    // validate form validity
    expect(isValid).toBeTruthy();
  });

  it(`should render a form: "${modelName}", useModel must return the form model, both inputs are filled therefore form must be valid.`, () => {
    render(
      <Form
        model={modelName}
        className="col-12"
        formSubmit={mockHandleFormSubmit}
        useModel={mockHandleUseModel}
      >
        <Input
          name="username"
          type="text"
          className="col-6"
          data-testid="username"
          inputChange={mockHandleChange}
          validate={['required']}
        />
        <Password
          name="password"
          className="col-6"
          data-testid="password"
          inputChange={mockHandleChange}
          validate={['required']}
        />
        <Submit className="col-6" data-testid="submit">
          Send Form
        </Submit>
      </Form>
    );
    const loginForm = screen.queryByTestId(modelName);

    expect(loginForm).toBeDefined();

    const usernameInput = screen.getByLabelText('username') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('password') as HTMLInputElement;
    const submitInput = screen.getByTestId('submit') as HTMLButtonElement;

    expect(mockHandleChange).toBeCalledTimes(0);
    expect(mockHandleUseModel).toBeCalledTimes(1);
    fireEvent.change(usernameInput, { target: { value: 'myawesomeness' } });
    expect(mockHandleChange).toBeCalledTimes(1);
    expect(mockHandleUseModel).toBeCalledTimes(2);
    fireEvent.change(passwordInput, { target: { value: 'Very$3cret!' } });
    expect(mockHandleChange).toBeCalledTimes(2);
    expect(mockHandleUseModel).toBeCalledTimes(3);

    const usernameChange: ChangeParams = mockHandleChange.mock.calls[0][0];
    const passwordChange: ChangeParams = mockHandleChange.mock.calls[1][0];
    const { login }: FormModel = mockHandleUseModel.mock.calls[2][0];
    const { fields, isValid } = login;

    expect(mockHandleFormSubmit).toBeCalledTimes(0);
    userEvent.click(submitInput);
    expect(mockHandleFormSubmit).toBeCalledTimes(1);

    const { isValid: submitIsValid }: SubmitParams =
      mockHandleFormSubmit.mock.calls[0][0];

    // validate submission parameter
    expect(submitIsValid).toBeTruthy();

    // validate change on username
    expect(usernameChange.value).toBe('myawesomeness');
    expect(usernameChange.name).toBe('username');

    // validate change on password
    expect(passwordChange.value).toBe('Very$3cret!');
    expect(passwordChange.name).toBe('password');

    // validate form model fields
    expect(fields.username.value).toBe('myawesomeness');
    expect(fields.password.value).toBe('Very$3cret!');

    // validate form validity
    expect(isValid).toBeTruthy();
  });

  it(`should render a form: "profile", useModel must return the form model, only fname and lname are required. Therefore email can be empty, form must be valid`, () => {
    render(
      <Form
        model="profile"
        className="col-12"
        formSubmit={mockHandleFormSubmit}
        useModel={mockHandleUseModel}
      >
        <Input
          name="fname"
          type="text"
          className="col-6"
          data-testid="fname"
          inputChange={mockHandleChange}
          validate={['required']}
        />
        <Input
          name="lname"
          type="text"
          className="col-6"
          data-testid="lname"
          inputChange={mockHandleChange}
          validate={['required']}
        />
        <Input
          name="email"
          type="email"
          className="col-6"
          data-testid="email"
          inputChange={mockHandleChange}
        />
        <Submit className="col-6" data-testid="submit">
          Send Form
        </Submit>
      </Form>
    );
    const loginForm = screen.queryByTestId(modelName);

    expect(loginForm).toBeDefined();

    const fnameInput = screen.getByLabelText('fname') as HTMLInputElement;
    const lnameInput = screen.getByLabelText('lname') as HTMLInputElement;
    const emailInput = screen.getByLabelText('email') as HTMLInputElement;
    const submitInput = screen.getByTestId('submit') as HTMLButtonElement;

    expect(mockHandleChange).toBeCalledTimes(0);
    expect(mockHandleUseModel).toBeCalledTimes(1);
    fireEvent.change(fnameInput, { target: { value: 'Willmer' } });
    expect(mockHandleChange).toBeCalledTimes(1);
    expect(mockHandleUseModel).toBeCalledTimes(2);
    fireEvent.change(lnameInput, { target: { value: 'Barahona' } });
    expect(mockHandleChange).toBeCalledTimes(2);
    expect(mockHandleUseModel).toBeCalledTimes(3);

    const usernameChange: ChangeParams = mockHandleChange.mock.calls[0][0];
    const passwordChange: ChangeParams = mockHandleChange.mock.calls[1][0];
    const { profile }: FormModel = mockHandleUseModel.mock.calls[2][0];
    const { fields, isValid } = profile;

    expect(mockHandleFormSubmit).toBeCalledTimes(0);
    userEvent.click(submitInput);
    expect(mockHandleFormSubmit).toBeCalledTimes(1);

    const { isValid: submitIsValid }: SubmitParams =
      mockHandleFormSubmit.mock.calls[0][0];

    // validate submission parameter
    expect(submitIsValid).toBeTruthy();

    // validate change on username
    expect(usernameChange.value).toBe('Willmer');
    expect(usernameChange.name).toBe('fname');

    // validate change on password
    expect(passwordChange.value).toBe('Barahona');
    expect(passwordChange.name).toBe('lname');

    // validate form model fields
    expect(fields.fname.value).toBe('Willmer');
    expect(fields.lname.value).toBe('Barahona');
    expect(fields.email.value).toBe(null);

    // validate form validity
    expect(isValid).toBeTruthy();
  });
});
