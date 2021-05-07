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
exports.Calendar = void 0;
var react_1 = __importDefault(require("react"));
var calendarSlider_1 = __importDefault(require("./calendarSlider"));
var calendarNavigation_1 = __importDefault(require("./calendarNavigation"));
var CalendarContext_1 = __importDefault(require("./CalendarContext"));
/**
 * Calendar Component
 * @alias Calendar
 * @param {CalendarProps} props - all props
 * @param {number} [monthsToDisplay] - Optional. Is the ammount of months to render
 * @param {Function} [monthHeader] - Optional. Is header of each month, must return JSX
 * @param {boolean} [dateRange] - Optional. Defines the behavior of this calendar, select two dates or single date
 * @param {Function} onDateSelect - Non native change handler performed by the library, will return an object with startDate and endDate properties IF dateRange prop is present, else will return the date selected.
 * @param {string} [minDate] - Optional. Defines the minimum date this calendar will handle
 * @param {string} [maxDate] - Optional. Defines the maximum date this calendar will handle
 * @param {string} [format] - Optional. Is the date format that this calendar will handle
 * @param {number} [minNights] - Optional. Is the minimum nights allowable to select by this calendar
 * @param {number} [maxNights] - Optional. Is the maximum nights allowable to select by this calendar
 * @param {(string | Date | DateRange)} [date] - Optional. Is the calendar value or date, if sent the calendar will take this date as default and mark it as selected
 * @param {ReactNode} [prevButton] - Optional. Allows to customize the navigation button for previous calendar dates
 * @param {ReactNode} [nextButton] - Optional. Allows to customize the navigation button for next calendar dates
 * @param {boolean} [disableNavigationOnDateBoundary] - Optional. Defines navigation behavior, if sent the calendar wont navigate to previous dates before minDate or upcoming dates after maxDate
 * @param {string[]} [disabledDates] - Optional. Is the array of dates that this calendar will mark as unallowable to be selected
 * @param {string} [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param {string} [calendarClassName] - Optional. Is the class needed in each of the calendar wrappers
 * @returns {React.FunctionComponentElement} Returns a calendar that allows dates selection or two if its a date range
 */
var Calendar = function (_a) {
    var monthsToDisplay = _a.monthsToDisplay, monthHeader = _a.monthHeader, dateRange = _a.dateRange, minDate = _a.minDate, maxDate = _a.maxDate, format = _a.format, minNights = _a.minNights, maxNights = _a.maxNights, onDateSelect = _a.onDateSelect, date = _a.date, prevButton = _a.prevButton, nextButton = _a.nextButton, disableNavigationOnDateBoundary = _a.disableNavigationOnDateBoundary, disabledDates = _a.disabledDates, className = _a.className, calendarClassName = _a.calendarClassName, props = __rest(_a, ["monthsToDisplay", "monthHeader", "dateRange", "minDate", "maxDate", "format", "minNights", "maxNights", "onDateSelect", "date", "prevButton", "nextButton", "disableNavigationOnDateBoundary", "disabledDates", "className", "calendarClassName"]);
    return (react_1.default.createElement(CalendarContext_1.default, { onDateSelect: onDateSelect, dateRange: dateRange, monthsToDisplay: monthsToDisplay, minNights: minNights, maxNights: maxNights, minDate: minDate, maxDate: maxDate, format: format, date: date, disabledDates: disabledDates || [], monthHeader: monthHeader, disableNavigationOnDateBoundary: disableNavigationOnDateBoundary },
        react_1.default.createElement("div", __assign({ className: (className || '') + " calendar-wrapper" }, props),
            react_1.default.createElement(calendarNavigation_1.default, { prev: prevButton, next: nextButton }),
            react_1.default.createElement(calendarSlider_1.default, { calendarClassName: calendarClassName }))));
};
exports.Calendar = Calendar;
exports.default = exports.Calendar;
