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
var moment_1 = __importDefault(require("moment"));
var calendar_1 = __importDefault(require("./calendar"));
var daterange_1 = __importDefault(require("./daterange"));
/**
 * Date Picker Component
 * @alias DatePicker
 * @param {DatePickerProps} props - all props
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value, for checkboxes it will return a comma separated string of each value selected by the user
 * @param {DateRangeProps} [dateRange] - Optional. Defines the behavior of this component, date ranges allows to select 2 dates, therefore there will be two inputs rendered
 * @param {string} [format] - Optional. Is the date format that this input will handle and return to inputChange function, this will format the presentation date on inputs that are not native
 * @param {string} [maxDate] - Optional. Is the maximum date allowable to select by this datepicker
 * @param {string} [minDate] - Optional. Is the minimum date allowable to select by this datepicker
 * @param {(string | number)} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @param {Function} [bottomPanel] - Optional. Is the panel below the calendar, it prompts the user to clear selection and confirm to close calendar, must return JSX
 * @param {string | StringDateRange} [value] - Optional. Is the value for this datepicker
 * @param {number} [minNights] - Optional. Is the minimum nights allowable to select by this calendar
 * @param {number} [maxNights] - Optional. Is the maximum nights allowable to select by this calendar
 * @param {number} [monthsToDisplay] - Optional. Is the ammount of months to render
 * @param {string[]} [disabledDates] - Optional. Is the array of dates that this calendar will mark as unallowable to be selected
 * @param {Function} [monthHeader] - Optional. Is header of each month, must return JSX
 * @param {ReactNode} [prevButton] - Optional. Allows to customize the navigation button for previous calendar dates
 * @param {ReactNode} [nextButton] - Optional. Allows to customize the navigation button for next calendar dates
 * @param {boolean} [disableNavigationOnDateBoundary] - Optional. Defines navigation behavior, if sent the calendar wont navigate to previous dates before minDate or upcoming dates after maxDate
 * @param {string} [calendarComponentClassName] - Optional. Is the class that the calendar below the input will contain
 * @param {string} [calendarClassName] - Optional. Is the class needed in each of the calendar wrappers
 * @returns {React.FunctionComponentElement} Returns an input that allows dates selection or two if its a date range
 */
// TODO: type and native are closely together, find a way to work with native and type date and datetime
// @param {string} type - Can be only "date" || "datetime"
// @param {string} [native] - Optional. Defines the visual aspect of the component, if it will render native dates or text based input
var DatePicker = function (_a) {
    var name = _a.name, className = _a.className, inputChange = _a.inputChange, dateRange = _a.dateRange, _b = _a.format, format = _b === void 0 ? 'MM-DD-YYYY' : _b, maxDate = _a.maxDate, minDate = _a.minDate, attrs = _a.attrs, value = _a.value, bottomPanel = _a.bottomPanel, minNights = _a.minNights, maxNights = _a.maxNights, monthsToDisplay = _a.monthsToDisplay, disabledDates = _a.disabledDates, monthHeader = _a.monthHeader, prevButton = _a.prevButton, nextButton = _a.nextButton, disableNavigationOnDateBoundary = _a.disableNavigationOnDateBoundary, calendarComponentClassName = _a.calendarComponentClassName, calendarClassName = _a.calendarClassName, props = __rest(_a, ["name", "className", "inputChange", "dateRange", "format", "maxDate", "minDate", "attrs", "value", "bottomPanel", "minNights", "maxNights", "monthsToDisplay", "disabledDates", "monthHeader", "prevButton", "nextButton", "disableNavigationOnDateBoundary", "calendarComponentClassName", "calendarClassName"]);
    var isDateRange = Object.keys(dateRange || {}).length > 0 ? true : false;
    // const inputType = native ? type : 'text';
    var inputType = 'text';
    var defDate = isDateRange
        ? {
            startDate: '',
            endDate: '',
        }
        : '';
    var _c = react_1.useState(''), startDateVal = _c[0], setStartDateVal = _c[1];
    var _d = react_1.useState(''), endDateVal = _d[0], setEndDateVal = _d[1];
    var _e = react_1.useState(false), calendarVisible = _e[0], setCalendarVisible = _e[1];
    var _f = react_1.useState(defDate), date = _f[0], setDate = _f[1];
    var ref = react_1.useRef(null);
    var handleDateChange = function (calendarResp) {
        if (dateRange) {
            var _a = calendarResp, startDate = _a.startDate, endDate = _a.endDate;
            var mStartDate = moment_1.default(startDate);
            var mEndDate = moment_1.default(endDate);
            var stDate = mStartDate.isValid() ? mStartDate.format(format) : '';
            var edDate = mEndDate.isValid() ? mEndDate.format(format) : '';
            setStartDateVal(stDate);
            setEndDateVal(edDate);
            var value_1 = dateRange
                ? { startDate: stDate, endDate: edDate }
                : '';
            setDate(value_1);
            inputChange({ e: ref, name: name, value: value_1 });
        }
        else {
            var mDate = moment_1.default(calendarResp);
            var value_2 = mDate.isValid() ? mDate.format(format) : '';
            setDate(value_2);
            inputChange({ e: ref, name: name, value: value_2 });
        }
    };
    var handleDisplayCalendar = function () {
        setCalendarVisible(true);
    };
    var handleHideCalendar = function () {
        setCalendarVisible(false);
    };
    var hideAutomatically = function () {
        if ((!bottomPanel && startDateVal !== '' && endDateVal !== '') ||
            (!bottomPanel && date !== '')) {
            handleHideCalendar();
        }
    };
    function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
            handleHideCalendar();
        }
    }
    var registerMouseDown = function () {
        document.addEventListener('mousedown', handleClick);
    };
    var unRegisterMouseDown = function () {
        document.removeEventListener('mousedown', handleClick);
    };
    var clearSelections = function () {
        setStartDateVal('');
        setEndDateVal('');
        setDate(defDate);
    };
    var confirmSelections = function () {
        handleHideCalendar();
    };
    var whatBottomPanel = function () {
        return bottomPanel ? (bottomPanel({ clearSelections: clearSelections, confirmSelections: confirmSelections })) : (react_1.default.createElement(react_1.default.Fragment, null));
    };
    var setDefaultValue = function () {
        if (value && dateRange) {
            var startDate = value.startDate, endDate = value.endDate;
            setStartDateVal(startDate);
            setEndDateVal(endDate);
            setDate(value);
        }
        else if (value && !dateRange) {
            setDate(value);
        }
    };
    react_1.useEffect(function () {
        setDefaultValue();
    }, []);
    react_1.useEffect(function () {
        registerMouseDown();
        if (dateRange && date.startDate !== '' && date.endDate !== '') {
            hideAutomatically();
        }
        else if (!dateRange && date !== '') {
            hideAutomatically();
        }
        return function () {
            unRegisterMouseDown();
        };
    }, [date, startDateVal, endDateVal]);
    return (react_1.default.createElement("div", { className: "datepicker-wrapper " + className, ref: ref },
        react_1.default.createElement("div", { className: "row" },
            !dateRange && (react_1.default.createElement("input", __assign({}, props, { type: inputType, name: name, id: name, "aria-label": name, className: "input datepicker-input " + name, onChange: function () { }, onFocusCapture: handleDisplayCalendar, value: date }))),
            dateRange && (react_1.default.createElement(daterange_1.default, __assign({ type: inputType, displayCalendar: handleDisplayCalendar, startDateVal: startDateVal, endDateVal: endDateVal }, dateRange)))),
        calendarVisible && (react_1.default.createElement("div", { className: "row", "data-testid": name + "-calendar" },
            react_1.default.createElement(calendar_1.default, { dateRange: isDateRange, onDateSelect: handleDateChange, date: date, format: format, minDate: minDate, maxDate: maxDate, minNights: minNights, maxNights: maxNights, monthsToDisplay: monthsToDisplay, disabledDates: disabledDates, monthHeader: monthHeader, prevButton: prevButton, nextButton: nextButton, disableNavigationOnDateBoundary: disableNavigationOnDateBoundary, className: calendarComponentClassName, calendarClassName: calendarClassName }),
            whatBottomPanel()))));
};
exports.DatePicker = DatePicker;
exports.default = exports.DatePicker;
