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
exports.CalendarContext = void 0;
var react_1 = __importStar(require("react"));
var moment_1 = __importDefault(require("moment"));
var CalendarContextDefoValues = {
    date: '',
    saveDate: function () { },
    getDate: function () { return new Date(); },
};
exports.CalendarContext = react_1.createContext(CalendarContextDefoValues);
var CalendarProvider = function (_a) {
    var children = _a.children, dateRange = _a.dateRange, onDateSelect = _a.onDateSelect;
    var _b = react_1.useState(''), date = _b[0], setDate = _b[1];
    var _c = react_1.useState(''), startDate = _c[0], setStartDate = _c[1];
    var _d = react_1.useState(''), endDate = _d[0], setEndDate = _d[1];
    var _e = react_1.useState(false), hasSelectedFirstRange = _e[0], setHasSelectedFirstRange = _e[1];
    var saveDate = function (newDate) {
        if (dateRange) {
            var mNewDate = moment_1.default(newDate);
            var mStartDate = moment_1.default(startDate);
            var mEndDate = moment_1.default(endDate);
            var returnRange = {
                startDate: startDate,
                endDate: endDate,
            };
            if (!hasSelectedFirstRange && !mNewDate.isSame(mEndDate)) {
                if (mNewDate.isAfter(mEndDate)) {
                    setEndDate('');
                    returnRange.endDate = '';
                }
                setStartDate(newDate);
                setHasSelectedFirstRange(true);
                returnRange.startDate = newDate;
            }
            else if (!mNewDate.isSame(mStartDate)) {
                if (mNewDate.isBefore(mStartDate)) {
                    setEndDate(startDate);
                    setStartDate(newDate);
                    returnRange.endDate = startDate;
                    returnRange.startDate = newDate;
                }
                else {
                    setEndDate(newDate);
                    returnRange.endDate = newDate;
                }
                setHasSelectedFirstRange(false);
            }
            onDateSelect(returnRange);
        }
        else {
            setDate(newDate);
            onDateSelect(newDate);
        }
    };
    var getDate = function () { return date; };
    return (react_1.default.createElement(exports.CalendarContext.Provider, { value: {
            date: date,
            saveDate: saveDate,
            getDate: getDate,
        } }, children));
};
exports.default = CalendarProvider;
