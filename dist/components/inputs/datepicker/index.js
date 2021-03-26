"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePicker = void 0;
var react_1 = __importDefault(require("react"));
var daterange_1 = __importDefault(require("./daterange"));
/**
 * Date Picker Component
 * @alias DatePicker
 * @param {DatePickerProps} props - all props
 * @param {string} type - Can be only "date" || "datetime"
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value, for checkboxes it will return a comma separated string of each value selected by the user
 * @param {string} [native] - Optional. Defines the visual aspect of the component, if it will render native dates or text based input
 * @param {DateRangeProps} [dateRange] - Optional. Defines the behavior of this component, date ranges allows to select 2 dates, therefore there will be two inputs rendered
 * @param {(string | number)} value - Optional. Is the input value, if sent the input will take this value as default, for checkboxes it needs a comma separated value, for radios just the radio value
 * @returns {React.FunctionComponentElement} Returns an input that allows dates selection or two if its a date range
 */
var DatePicker = function (_a) {
    var type = _a.type, name = _a.name, className = _a.className, inputChange = _a.inputChange, native = _a.native, dateRange = _a.dateRange, attrs = _a.attrs, value = _a.value, props = __rest(_a, ["type", "name", "className", "inputChange", "native", "dateRange", "attrs", "value"]);
    var inputType = native ? type : 'text';
    var handleChange = function (e) {
        var currentTarget = e.currentTarget;
        var value = currentTarget.value;
        inputChange({ e: e, name: name, value: value });
    };
    // TODO: make a context of all this to avoid prop drilling
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !dateRange && (react_1.default.createElement("div", { className: "datepicker-wrapper " + className },
            react_1.default.createElement("input", __assign({}, props, { type: inputType, name: name, id: name, className: "input datepicker-input " + name, onChange: handleChange })))),
        dateRange && (react_1.default.createElement("div", { className: "datepicker-wrapper " + className },
            react_1.default.createElement(daterange_1.default, __assign({ type: inputType, onChange: handleChange }, dateRange))))));
};
exports.DatePicker = DatePicker;
exports.default = exports.DatePicker;
