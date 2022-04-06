# React Nicer Inputs

An easy to use library to quickly create react forms 📝, its the new level from react-nice-inputs.

![npm](https://img.shields.io/npm/v/react-nicer-inputs)
[![React Nicer Inputs Actions Status](https://img.shields.io/github/workflow/status/wbarahona/react-nicer-inputs/%E2%9A%9B%F0%9F%8F%97%20publish?style=flat-square)](https://github.com/wbarahona/react-nicer-inputs/actions)
![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/react-nicer-inputs)
![NPM](https://img.shields.io/npm/l/react-nicer-inputs)

---

## Installing React Nicer Inputs

```sh
npm i -D react-nicer-inputs
```

Now import the inputs as you would regularly do by:

```js
import { Input } from 'react-nicer-inputs';
```

Now you are good to go. Create the first input as:

```js
<Input
  type="text"
  name="example"
  className="col-12 example-class"
  inputChange={({ value, name, e }) => {
    console.log(value, name, e);
  }}
  attrs={{
    placeholder: 'enter a value',
  }}
/>
```

🎇 Nice! You must now have a simple text input like so:

![simple text input](https://drive.google.com/uc?export=view&id=17mXqlbHCd3K_XPzVLcPunQkcMh48Zk7E)

And when you type in the console must display the value you type in, the name of the input and the Syntetic Event. Awesome! 😀

---

## Local Development Install

When you want to cooperate and create or update or patch the components you may fork this repo.

### install dev dependencies

```sh
npm i -D
```

This will install all dev dependencies to start working.

### install yalc

```sh
npm i -g yalc
```

[Yalc](https://www.npmjs.com/package/yalc) is a perfect tool to develop libraries, it helps with bad dependencies resolutions between node environments therefore this library needs it in order to work locally by building yalc local repo and linking it into the example folder app.

### create a react app

Inside the root directory create a react app called `example`:

```sh
npx create-react-app example
```

This way you can see the actual render in browser of any input you are updating and creating.

### add react-nicer-inputs to yalc local repo and link to example

To add react-nicer-inputs to yalc local repo just run on root:

```sh
yalc add react-nicer-inputs
```

Now to link this into the example app run:

```sh
$ cd example
$ yalc link react-nicer-inputs
```

### run dev script on root dir

To fire the library dev compilation run at the root directory:

```sh
npm run dev
```

To fire jest at watch mode run at the root directory in separate bash window:

```sh
npm run test-w
```

To start the example react app, in yet another bash window run:

```sh
$ cd example
$ npm start
```

Nice! Let's get hackin' 👨🏽‍💻

---

## The Components 🧰

So each component renders different inputs for you to use and each have common props which will be discussed next but for particular props check each component definition in the next section.

- `type="" {string}` This defines the type of the input being rendered, is passed to the native HTML5 type attribute; now some components do not require this or prefer the usage of a dedicated component for an specific input. Refer to each component description below what case it is for the component you are currently using.

- `name="fname" {string}` This sets the name of this input as well it is assigned to the HTML5 name and id attributes, additionally it is returned as well on the `inputChange` prop.

- `className="col-12 col-md-5" {string}` This is as you might know the class this component will have, normally the prop is assigned to the input or to the wrapper of the component such as `InputGroup`, `Password`, `Autocomplete`, `Datepicker` for example. Some components do have internal wrap blocks and those can have classNames to but the prop name might differ in each case, refer then to each component specific prop dictionary below.

  **_Observation: each input do have the `input` utility class by default so you can paint with CSS the actual input as you see fit._**

- `inputChange={} {Function}` This is the way the input return the value back. This is a semantic name for onChange (due to the implementation of TS it needed to be named as **inputChange**). You may destructure the params to:

```js
{
  e, name, value;
}
// e: This is the syntetic event from the input
// name: This is the name of the input, helpful if you are storing a model of the form in the state and you have a single function that handles input change
// value: The value from the input
```

- `attrs={{placeholder: 'Enter your name'}} {Object}` This is the list of HTML5 attributes the input can handle, you can send here as much as you need.

- `value={fnameVal} {string}` This is the initial value you need this input to start with, it is ignored as soon the input changes.

- `...props` Any other props from react you see you might need to pass along to the input are spreaded internally. The handle or callback is for you to write.

Now we are about to see what input components are in store for you from `'react-nicer-inputs'`.

---

### Input

As we saw in the example above this input is very helpful when you are creating classic text inputs, number, date or textarea, for the latter the input will render a proper `<textarea>` tag element. While you can create radios, checkboxes and password with this component you should favor the `<InputGroup>` component for radios and checkboxes and `<Password>` for well... pwds!

Let's see what props this component may handle in particular:

- `cols {string | number}` When you define this Input to be textarea it will handle the columns the textarea will have

- `rows {string | number}` Same as cols.

- `mask {Regex}` This prop will help the component to hide certain characters visible on the input based on a regex you provide in order to capture whatever matches on the value string and replace it with the `maskChar` value.
  For example: `mask=".{3}$"` this Regex will select the last three characters in the input and replace it with discs each character. So let's say the user types in: `reactjs` therefore the value **_VISIBLE_** will be `reac●●●` while the returned value on `inputChange` will be still string **`reactjs`**.

**_Observation: Do not missuse this functionality for a password input._**

- `maskChar {string} defaults to '●'` This prop altogether with mask allows to change the matching characters with whatever character you might need: asterisks, dashes, periods... etc.

---

### Select

This component creates a `<select>` dropdown for you. Since this is straight forward there is no more to explain for it, let's dive into the props this component use in particular aside from the common ones described above:

- `options={[ {label: 'Option 1 1️⃣', value: '1'} ]} {Array}` This is an array of objects that define the select options, additional you may send **'attrs'** a third property on each option Object. That property is spreaded on the `<option>` tag.

- `defaultLabel="Pick your favorite option" {string}` This is the default option label on the Select.

### OptGroup and Option

These two components help you create more semantic accurate inputs rather than just a simple list of options when you send the options prop to the `<Select >`. Nest these boys inside the **Select** component and you are ready to go.

---

### InputGroup

If you need to create checkboxes and radiobutton groups this component will aid you in no time, the component renders a box with rows of radio ⏺ or checkbox ☑ inputs aside of a label for each element. So the props this input need are:

- `options={[ {label: 'Option 1 1️⃣', value: '1'} ]} {Array}` Idem as `<select>` This is an array of objects that define the select options, additional you may send **'attrs'** a third property on each option Object. That property is spreaded on the `<option>` tag.

**_Observation: This component value prop and the value returned on the inputChange function may differ wether it is a radio or checkbox_**

For checkboxes since conceptually it is a multi option selectable it will return on the inputChange function a string of the selected options separated by a commas, the same as the value prop, it will take a comma separated string of the values to be preselected by the component.

For radio buttons as its a single option selectable out of a group of option this will return on inputChange function a normal string, no commas. The value prop can be a single string of one of the options.

### Checkbox & Radio

The checkbox and radio button components allow for you to create single checkbox and single radio, providing a more semantic approach for your inputs. The value grouping falls to your hands but you could wrap these `<Checkbox>` or `<Radio>` components inside a `<InputGroup>` component, be aware of the `type` prop for **InputGroup**. Do not mix `<InputGroup>` type="radio" with `<Checkboxes>`.

- `labelClassName="col-8" {string}` Optional. Is the class appended to the label element

---

### Autocomplete

This component allows a large list of options to be browsable by typing in the textbox, reducing the ammount of options available as the user type by matching the string to any possible option.

![alt text](https://drive.google.com/uc?export=view&id=1YN8dvAaVcZ21VI8fN5InMEtLXikLw5GT)

This component needs the following props:

- `options={[ {label: 'Option 1 1️⃣', value: '1'} ]} {Array}` Idem as `<select> and <InputGroup>` This is an array of objects that define the options available to pick, from there the options are reduced as the user types in.

---

### Password

The password component is unique and helpful, following the way Edge browser allows the behavior natively to toggle show/hide the visibility of the characters on the input, this component includes a native button that allows such toggling the password to be visible or set back to be hidden.

Some props are the same as the input component but this contains the following:

- `showIcon="👁" {ReactNode} defaults to 'hide'` This is the icon to be displayed when the password is hidden
- `hideIcon="❌" {ReactNode} defaults to 'show'` This is the invers as showIcon, it displays when the password is visible
- `noToggle {boolean} defaults to false` This defines if you need the toggle button or not.

---

### Label and Feedback

These are simple components you can use to work along with any input.
The label component can take className and also requires only:

- `htmlFor="fname" {string}` This is of course the id of the input this label belongs to.

The feedback component allows to display a text and its usage is to be part of the FormGroup as a way to display messages about this input, can take className but nothing else, it will render a `<span>` element with whatever text you send to it.

---

### Datepicker

This component allows the user to select a date or a date range, depending on the `dateRange` prop the behavior of the component do change into two scenarios:

- If no `dateRange` prop is sent then it will display a single text input that when the user sets focus on displays a calendar element below, as soon as the user do select one date it will trigger the `inputChange` function and return the formatted date as value.
- If `dateRange` is sent then two inputs are displayed and the calendar accepts two dates to be selected, on each selection the component triggers the `inputChange` function but this time the value is an object like so:

```js
{
  startDate: '05-30-2021',
  endDate: '06-02-2021'
}
```

This component takes a handful of props that mutate its behavior, let's see:

- `format="DD-MM-YYYY" {string}` Allows formatting for the dates that this component will return.
- `maxDate="05-29-2021" {string}` Is the maximum date allowable to select by this datepicker
- `minDate="07-30-2021" {string}` Is the minimum date allowable to select by this datepicker
- `bottomPanel={} {Function}` Is the panel below the calendar, it prompts the user to clear selection and confirm to close calendar, must return JSX, this function can take an object as parameter, this object contains `{clearSelections, confirmSelections}` each functions can close the calendar and confirmSelections will trigger inputChange and return the value of the selected date/s. This way you return a block of JSX for further customization of the bottom panel.
- `minNights={3} {number}` Is the minimum nights allowable to select by this calendar
- `maxNights={10} {number}` Is the maximum nights allowable to select by this calendar
- `monthsToDisplay={3} {number}` Is the ammount of months to be displayed
- `disabledDates={['06-01-2021']} {Array}` Is the array of dates that this calendar will mark as unallowable to be selected
- `monthHeader={} {Function}` This allows you to create a custom header that could allow users to change months and years quickly, the function must return JSX, this function can take an object as params which contains `{ setYear, setMonth, month }`.
  - setYear is a function that takes a string of the year you want to set
  - setMonth is a function that takes a string of the month you want to set
  - month is a [momentjs](https://momentjs.com/) object that you can use to get the current month information.
- `prevButton={<JSX />} {ReactNode}` Allows to customize the navigation button for previous calendar dates
- `nextButton={<JSX />} {ReactNode}` Allows to customize the navigation button for next calendar dates
- `disableNavigationOnDateBoundary {boolean}` This prop disables the calendar navigation along with maxDate / minDate when the user has reached either the maxDate meaning that the user cant go any more into the future or cant go into the past if has reached the minDate.
- `calendarComponentClassName="col-12" {string}` Is the class that the calendar wrapper(which contains the month/months, navigation arrows... etc) below the input can have
- `calendarClassName="col-12 col-md-6" {string}` Is the class that each of the months can have, allows for further customization on each of the months wrappers

---

### Calendar

This is a calendar element that you can use to make your own implementations of date picker without the `<DatePicker>` component in favor of your own ways.
All the props explained in the `<DatePicker>` component are almost the same.

- `className="custom-calendar" {string}` This class is appended to the wrapper of this calendar component.
- `calendarClassName="col-12 col-md-4" {string}` Is the class that each of the months can have, allows for further customization on each of the months wrappers

---

### DropDownDates

This component is kinda special, sometimes somewhere there is the need to select a date in a very unique way. Selects. Yep! So, we got you covered, here this component renders three different selects for each of the segments of the date, month, day and year. The value of each select depends of the props as well. Let's take a peek:

- `format="DD-MM-YY" {string}` Allows formatting for the dates that this component will return.
- `maxDate="05-29-2021" {string}` Is the maximum date allowable to select by this datepicker
- `minDate="07-30-2021" {string}` Is the minimum date allowable to select by this datepicker
- `ddClassName="col-3" {string}` This className is appended to the wrapper of the Day selector
- `mmClassName="col-3" {string}` The same as day selector
- `yyClassName="col-6" {string}` The same as day selector
- `ddLabel="Pick day:" {string}` This is the text of the `<label>` element above the day `<select>`
- `mmLabel="Pick month:" {string}` The same as day Label
- `yyLabel="Pick year:" {string}` The same as day Label
- `ddDefaultLabel="Day..." {string}` This prop allows to customize the default text on the `<Select>` component
- `mmDefaultLabel="Month..." {string}` The same as Day Default Label
- `yyDefaultLabel="Year..." {string}` The same as Day Default Label
- `displayOrder="DD-MM-YYYY" {string}` This allows to customize the order of rendering of each selector
- `mmmm {boolean}` If you need the month element to have words instead of numbers

**_Observation: The options react to maxDate and minDate and its options are rerendered to disallow user selecting dates out of boundaries._**

---

### Google Captcha

This component will help you to create a google captcha validation before any form is submitted. It works with v2 and v3 APIs. Let us see the props:

For v2 the purpose is to have a check element that provides a challenge under certain circumstances which are in google side, that said the props you need to create one is:

- `publicKey="AAAABBBCCCC" {string}` This defines the key to be used for this captcha element, check 👉🏽 [google recaptcha docs](https://developers.google.com/recaptcha/docs/v3).
- `theme="dark" {string} defaults to 'light'` Is the color scheme this captcha element will have, the values could be light | dark as per google recaptcha docs
- `captchaSize="compact" {string} defaults to 'normal'` Is the size of this captcha element, the values could be compact | normal | invisible as per docs
- `getResponse={} {Function}` Is the function that returns the token google returned after the challenge is completed

For v3 the challenge is not visible as per the docs, and it must trigger on form submit, so the way we play the game in this one is different, we wrap the `<Submit>` component around captcha component, we use the v3 prop.

- `v3 {boolean}` Helps to define what API version is going to be used

---

### Submit

This component provide an in-house approach to submit your forms, this way you can submit forms regularly or with google recaptcha protection.
The unique prop is just one, let's take a look at that now:

- `formSubmit={} {Function}` This function is triggered when you click the submit button, using v3 captcha it will return the captchaToken.

Check the example:

```jsx
<Grecaptcha publicKey="AAAABBBBCCCCCDDDDEEEE111222333" v3>
  <Submit
    className="blue-big"
    formSubmit={({ captchaToken }) => {
      // Your logic to submit the form
    }}
  >
    Send Form
  </Submit>
</Grecaptcha>
```

The submit component is now part of the Grecaptcha protection, this way, when the button is clicked it will fetch to google for the token, then it will run the formSubmit Function returning the captchaToken in v3 captcha API.

**_Observation: a simple submit does not require to be wrapped around with `<Grecaptcha >` component, the formSubmit function does not need to destructure the captchaToken either._**

---

### Form Group

This is a component that is composed of three elemental components.

```jsx
<Label>
  <Input> ||
  <Select> ||
  <InputGroup> ||
  <Password> ||
  <Autocomplete> ||
  <Datepicker> ||
  <DropDownDates>
<Feedback>
```

So, it utilizes all the props explained for each component above.

---

### Form

This component allows you to create forms, all Input component within the <Form> tags are added to a **formModel** object, the model updates when user interacts with the inputs, this allows a very flexible access to everything regarding the form, values, validations, used inputs or pristine inputs.

- `model="login" {string}` Optional - Name for the form model, defaults to "defaultModel"
- `formSubmit={() => {}} {Function}` This function will run when <Submit> button component is added to the form
- `useModel={() => {}} {Function}` Optional - A pseudoHook that allows the consuming of the form model and its state

A simple login form can be created as:

```jsx
<Form
  model="login"
  className="col-12"
  formSubmit={handleFormSubmit}
  useModel={useModel}
>
  <Input
    name="username"
    type="text"
    className="col-6"
    data-testid="username"
    inputChange={handleInputChange}
    validate={['required']}
  />
  <Password
    name="password"
    className="col-6"
    data-testid="password"
    inputChange={handleInputChange}
    validate={['required']}
  />
  <Submit className="col-6" data-testid="submit">
    Send Form
  </Submit>
</Form>
```

Where handleFormSubmit is a function that can receive back on sync if the form is valid or invalid, destructure the params {isInvalid, isValid, formModel}; isInvalid and isValid those booleans will tell if the form is ready to be posted and the action is on your side, meanwhile formModel contains all the form model properties for you to use in case you want to work with the form model after the user clicks submit.

useModel is invoked everytime the form model updates, telling you what input identifier has changed and from there you could access to each input model values:

```js
{
  type: string,
  valid: boolean,
  invalid: boolean,
  pristine: boolean,
  touched: boolean,
  dirty: boolean,
  validate: Array,
  value: string | number | null,
  summary: Array
}
```

- type is this input type.
- valid is a boolean that represent what the result of the validation Array is.
- invalid is a boolean and is a more verbose approach and works as helper, inverse of valid.
- pristine is a boolean, indicates if this input has not been interacted with yet.
- touched is the inverse of pristine.
- validate array contains the current validations this input must run each change.
- value, the value the input holds
- summary is an array of results for each element in the validate array.

This is an example of what could be the form model in the forementioned login form:

```js
{
   "fields":{
      "username":{
         "type":"text",
         "valid":true,
         "invalid":false,
         "pristine":false,
         "touched":true,
         "dirty":false,
         "validate":[
            "required"
         ],
         "value":"reactdev",
         "summary":{
            "required":true
         }
      },
      "password":{
         "type":"password",
         "valid":null,
         "invalid":null,
         "pristine":true,
         "touched":false,
         "dirty":false,
         "validate":[
            "required",
         ],
         "value":null
      },
   },
   "isValid":true,
   "isInvalid":false
}
```

From this example you can determine that username has been filled whereas password has not been touched yet. This object is at your disposal and you can do as you see fit on your side of things.

## Upcoming components:

- Form (Beta)
- Custom options for Autocomplete
- Input type range

## CODE SANDBOX 🛠

Have a spin: check this **_codesandbox_**

[![Edit wonderful-benji-t2ow1](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/wonderful-benji-t2ow1?fontsize=14&hidenavigation=1&theme=dark)
