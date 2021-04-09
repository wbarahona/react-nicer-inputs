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
exports.Calendar = void 0;
var react_1 = __importDefault(require("react"));
var moment_1 = __importDefault(require("moment"));
var month_1 = require("./month");
var defaultMonth = moment_1.default();
var Calendar = function (_a) {
    var monthsToDisplay = _a.monthsToDisplay, monthHeader = _a.monthHeader;
    return (react_1.default.createElement("div", { className: "calendar-wrapper" },
        react_1.default.createElement("div", { className: "months-slider" }, __spreadArrays(Array(monthsToDisplay)).map(function (j, i) {
            var month = defaultMonth.clone().add(i, 'month');
            return (react_1.default.createElement(month_1.Month, { key: "calendar-" + i, month: month, monthHeader: monthHeader }));
        }))));
};
exports.Calendar = Calendar;
exports.default = exports.Calendar;
