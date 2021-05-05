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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day = void 0;
var react_1 = __importStar(require("react"));
var CalendarContext_1 = require("./CalendarContext");
var moment_1 = __importDefault(require("moment"));
var Day = function (_a) {
    var date = _a.date, dateString = _a.dateString, dayNumber = _a.dayNumber, _b = _a.isSelectable, isSelectable = _b === void 0 ? true : _b;
    var _c = react_1.useContext(CalendarContext_1.CalendarContext), saveDate = _c.saveDate, startDate = _c.startDate, endDate = _c.endDate, saveHoverDate = _c.saveHoverDate, isDateSelectable = _c.isDateSelectable, isDateSelected = _c.isDateSelected, isDateWithinRange = _c.isDateWithinRange, isSelectedDateStartDate = _c.isSelectedDateStartDate, isSelectedDateEndDate = _c.isSelectedDateEndDate, minNights = _c.minNights, maxNights = _c.maxNights, minDate = _c.minDate, maxDate = _c.maxDate, ctxDate = _c.date, currPaneMonths = _c.currPaneMonths;
    var _d = react_1.useState('calendar-date'), className = _d[0], setClassName = _d[1];
    var handleClick = function (e) {
        if (isSelectable &&
            dayNumber !== '' &&
            isDateSelectable(date || new Date())) {
            var rawDate = e.currentTarget.getAttribute('data-date');
            var date_1 = moment_1.default(rawDate, 'YYYY-MM-DD', true).toDate();
            saveDate(date_1);
        }
    };
    var handleMouseEnter = function () {
        if (dayNumber !== '') {
            var mThisDate = moment_1.default(date);
            saveHoverDate(mThisDate.toDate());
        }
    };
    var handleMouseLeave = function () { };
    var buildClassName = function () {
        var classArray = ['calendar-date'];
        var theDate = date || new Date();
        if (!isDateSelectable(theDate)) {
            classArray.push('calendar-date--unselectable');
        }
        if (dayNumber === '') {
            classArray.push('calendar-date--empty calendar-date--unselectable');
        }
        else {
            if (isDateSelected(theDate)) {
                classArray.push('calendar-date--selected');
            }
            if (isDateWithinRange(theDate)) {
                classArray.push('calendar-date--between-date');
            }
            if (isSelectedDateStartDate(theDate)) {
                classArray.push('calendar-date--start-date');
            }
            if (isSelectedDateEndDate(theDate)) {
                classArray.push('calendar-date--end-date');
            }
        }
        setClassName(classArray.join(' '));
    };
    react_1.useEffect(function () {
        buildClassName();
    }, [
        ctxDate,
        startDate,
        endDate,
        minNights,
        maxNights,
        minDate,
        maxDate,
        currPaneMonths,
    ]);
    return (react_1.default.createElement("td", { "data-date": dateString, onClick: handleClick, 
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        className: className },
        react_1.default.createElement("time", { dateTime: dateString }, dayNumber)));
};
exports.Day = Day;
exports.default = exports.Day;
