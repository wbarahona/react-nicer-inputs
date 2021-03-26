"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePickerContext = void 0;
var react_1 = require("react");
var _a = react_1.useState(''), inputValue = _a[0], setInputValue = _a[1];
var _b = react_1.useState(''), startDate = _b[0], setStartDate = _b[1];
var _c = react_1.useState(''), endDate = _c[0], setEndDate = _c[1];
var handleChange = function (e) {
    var currentTarget = e.currentTarget;
    var value = currentTarget.value;
    console.log(value);
};
exports.DatePickerContext = react_1.createContext({ inputValue: inputValue, setInputValue: setInputValue, startDate: startDate, setStartDate: setStartDate, endDate: endDate, setEndDate: setEndDate, handleChange: handleChange });
exports.default = exports.DatePickerContext;
