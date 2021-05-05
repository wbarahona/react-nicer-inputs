"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
var react_1 = __importDefault(require("react"));
var calendarSlider_1 = __importDefault(require("./calendarSlider"));
var calendarNavigation_1 = __importDefault(require("./calendarNavigation"));
var CalendarContext_1 = __importDefault(require("./CalendarContext"));
var Calendar = function (_a) {
    var monthsToDisplay = _a.monthsToDisplay, monthHeader = _a.monthHeader, dateRange = _a.dateRange, minDate = _a.minDate, maxDate = _a.maxDate, format = _a.format, minNights = _a.minNights, maxNights = _a.maxNights, onDateSelect = _a.onDateSelect, date = _a.date, prevButton = _a.prevButton, nextButton = _a.nextButton, disableNavigationOnDateBoundary = _a.disableNavigationOnDateBoundary, disabledDates = _a.disabledDates;
    return (react_1.default.createElement(CalendarContext_1.default, { onDateSelect: onDateSelect, dateRange: dateRange, monthsToDisplay: monthsToDisplay, minNights: minNights, maxNights: maxNights, minDate: minDate, maxDate: maxDate, format: format, date: date, disabledDates: disabledDates || [], monthHeader: monthHeader, disableNavigationOnDateBoundary: disableNavigationOnDateBoundary },
        react_1.default.createElement("div", { className: "calendar-wrapper" },
            react_1.default.createElement(calendarNavigation_1.default, { prev: prevButton, next: nextButton }),
            react_1.default.createElement(calendarSlider_1.default, null))));
};
exports.Calendar = Calendar;
exports.default = exports.Calendar;
