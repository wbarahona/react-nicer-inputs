"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Week = void 0;
var react_1 = __importDefault(require("react"));
var moment_1 = __importDefault(require("moment"));
var day_1 = __importDefault(require("./day"));
var Week = function (_a) {
    var _b = _a.week, week = _b === void 0 ? [] : _b, month = _a.month;
    var getDate = function (date) {
        var ret = '';
        var weekMonth = date.getMonth() + 1;
        ret = weekMonth === month ? "" + date.getDate() : '';
        return ret;
    };
    return (react_1.default.createElement("tr", null, week.map(function (date, i) { return (react_1.default.createElement(day_1.default, { key: "day-" + i, date: date, dateString: moment_1.default(date).format('YYYY-MM-DD'), dayNumber: getDate(date) })); })));
};
exports.Week = Week;
exports.default = exports.Week;
