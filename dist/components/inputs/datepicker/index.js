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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var react_1 = __importStar(require("react"));
var daterange_1 = __importDefault(require("./daterange"));
var datepickercontext_1 = __importDefault(require("./datepickercontext"));
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
 * @param {string} [format] - Optional. Is the date format that this input will handle and return to inputChange function, this will format the presentation date on inputs that are not native
 * @param {string} [maxDate] - Optional. Is the maximum date allowable to select by this datepicker
 * @param {string} [minDate] - Optional. Is the minimum date allowable to select by this datepicker
 * @param {(string | number)} value - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an input that allows dates selection or two if its a date range
 */
var DatePicker = function (_a) {
    var type = _a.type, name = _a.name, className = _a.className, inputChange = _a.inputChange, native = _a.native, dateRange = _a.dateRange, format = _a.format, maxDate = _a.maxDate, minDate = _a.minDate, attrs = _a.attrs, value = _a.value, props = __rest(_a, ["type", "name", "className", "inputChange", "native", "dateRange", "format", "maxDate", "minDate", "attrs", "value"]);
    var inputType = native ? type : 'text';
    // const [inputValue, setInputValue] = useState<string | number>(value || '');
    // const [startDate, setStartDate] = useState<string>('');
    // const [endDate, setEndDate] = useState<string>('');
    // const validateDate = (date: Moment) => {
    //   let ret: Boolean = false;
    //   ret = date.isValid();
    //   return ret;
    // }
    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   const { currentTarget } = e;
    //   const { value } = currentTarget;
    //   const inFormat = (native) ? 'YYYY-MM-DD' : format
    //   const date: Moment = m(value, inFormat, true);
    //   const isValidDate = validateDate(date);
    //   const formattedVal: string = date.format(format);
    //   if (dateRange) {
    //     // handle both dates here and set stardate and  enddate here
    //   } else {
    //     // setInputValue(value);
    //     if (isValidDate) {
    //       inputChange({ e, name, value: formattedVal });
    //     }
    //   }
    // };
    var _b = react_1.useContext(datepickercontext_1.default), inputValue = _b.inputValue, handleChange = _b.handleChange;
    // TODO: make a context of all this to avoid prop drilling
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !dateRange && (react_1.default.createElement("div", { className: "datepicker-wrapper " + className },
            react_1.default.createElement("input", __assign({}, props, { type: inputType, name: name, id: name, className: "input datepicker-input " + name, onChange: handleChange, value: inputValue })))),
        dateRange && (react_1.default.createElement("div", { className: "datepicker-wrapper " + className },
            react_1.default.createElement(daterange_1.default, __assign({ type: inputType, onChange: handleChange }, dateRange))))));
};
exports.DatePicker = DatePicker;
exports.default = exports.DatePicker;
