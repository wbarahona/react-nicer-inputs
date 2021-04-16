"use strict";
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
exports.Calendar = void 0;
var react_1 = __importStar(require("react"));
var moment_1 = __importDefault(require("moment"));
var month_1 = require("./month");
var CalendarContext_1 = __importDefault(require("./CalendarContext"));
var Calendar = function (_a) {
    var monthsToDisplay = _a.monthsToDisplay, monthHeader = _a.monthHeader, dateRange = _a.dateRange, minDate = _a.minDate, maxDate = _a.maxDate, onDateSelect = _a.onDateSelect;
    var rawNow = moment_1.default().toDate();
    var initialDate = minDate
        ? moment_1.default(minDate, 'MM-DD-YYYY', true).toDate()
        : rawNow;
    var _b = react_1.useState(moment_1.default(initialDate, 'MM-DD-YYYY', true)), defaultMonth = _b[0], setDefaultMonth = _b[1];
    var _c = react_1.useState(initialDate.getMonth() + 1), defoMM = _c[0], setDefoMM = _c[1];
    var _d = react_1.useState(initialDate.getFullYear()), defoYYYY = _d[0], setDefoYYYY = _d[1];
    var setMonth = function (month) {
        var initDate = initialDate.getDate();
        var daDate = initDate < 10 ? "0" + initDate : initDate;
        var convertedMonth = parseInt(month, 10);
        var daMonth = convertedMonth < 10 ? "0" + convertedMonth : convertedMonth;
        var daRawDate = daMonth + "-" + daDate + "-" + defoYYYY;
        var mNewDate = moment_1.default(daRawDate, 'MM-DD-YYYY', true);
        //TODO: validate incoming selection vs date ranges between minDate and maxDate, decide either allow select the date throwing some warn or do not allow the selection
        setDefaultMonth(mNewDate);
        setDefoMM(month);
    };
    var setYear = function (year) {
        var initMonth = defoMM;
        var initDate = initialDate.getDate();
        var daMonth = initMonth < 10 ? "0" + initMonth : initMonth;
        var daDate = initDate < 10 ? "0" + initDate : initDate;
        var daRawDate = daMonth + "-" + daDate + "-" + year;
        var mNewDate = moment_1.default(daRawDate, 'MM-DD-YYYY', true);
        //TODO: validate incoming selection vs date ranges between minDate and maxDate, decide either allow select the date throwing some warn or do not allow the selection
        setDefaultMonth(mNewDate);
        setDefoYYYY(year);
    };
    var whatCalendarHeader = function (mm) {
        return monthHeader ? (monthHeader({ setMonth: setMonth, setYear: setYear, month: mm })) : (react_1.default.createElement(react_1.default.Fragment, null,
            mm.format('MMMM'),
            " ",
            mm.format('YYYY')));
    };
    return (react_1.default.createElement(CalendarContext_1.default, { onDateSelect: onDateSelect, dateRange: dateRange },
        react_1.default.createElement("div", { className: "calendar-wrapper" },
            react_1.default.createElement("div", { className: "months-slider" }, __spreadArrays(Array(monthsToDisplay)).map(function (j, i) {
                var month = defaultMonth.clone().add(i, 'month');
                return (react_1.default.createElement(month_1.Month, { key: "calendar-" + i, month: month, monthHeader: whatCalendarHeader(month) }));
            })))));
};
exports.Calendar = Calendar;
exports.default = exports.Calendar;
