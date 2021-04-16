"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Month = void 0;
var react_1 = __importDefault(require("react"));
var moment_1 = __importDefault(require("moment"));
var week_1 = __importDefault(require("./week"));
var calendarHeader_1 = __importDefault(require("./calendarHeader"));
var Month = function (_a) {
    var month = _a.month, monthHeader = _a.monthHeader, locale = _a.locale;
    moment_1.default.locale(locale);
    var weekDays = moment_1.default.weekdays();
    var thisMonth = month.month() + 1;
    var thisYear = month.year();
    var startDateOfMonth = moment_1.default(month).startOf('month');
    var endDateOfMonth = moment_1.default(month).endOf('month');
    var buildMonthWeeks = function () {
        var ret = [];
        var weekArray = [];
        var firstDateOfRenderingMonth = moment_1.default(startDateOfMonth).startOf('week');
        var lastDateOfRenderingMonth = moment_1.default(endDateOfMonth).endOf('week');
        var cursorDate = firstDateOfRenderingMonth.clone();
        while (cursorDate.isBefore(lastDateOfRenderingMonth)) {
            var lastDateOfCursorWeek = moment_1.default(cursorDate).endOf('week');
            var isLastDateOfCursorWeek = cursorDate.format('MM-DD-YYYY') ===
                lastDateOfCursorWeek.format('MM-DD-YYYY');
            weekArray.push(cursorDate.toDate());
            if (isLastDateOfCursorWeek) {
                ret.push(weekArray);
                weekArray = [];
            }
            cursorDate.add(1, 'day');
        }
        return ret;
    };
    var week = buildMonthWeeks();
    var weeksInMonth = week.length;
    return (react_1.default.createElement("table", null,
        react_1.default.createElement(calendarHeader_1.default, null, monthHeader),
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null, weekDays.map(function (weekDay, i) { return (react_1.default.createElement("td", { key: "th-" + i }, weekDay)); }))),
        react_1.default.createElement("tbody", null, __spreadArrays(Array(weeksInMonth)).map(function (e, i) { return (react_1.default.createElement(week_1.default, { key: "week-" + i, week: week[i], month: thisMonth })); }))));
};
exports.Month = Month;
exports.default = exports.Month;
