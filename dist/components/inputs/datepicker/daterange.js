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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = void 0;
var react_1 = __importDefault(require("react"));
var DateRange = function (_a) {
    var type = _a.type, startDate = _a.startDate, endDate = _a.endDate, startDateVal = _a.startDateVal, endDateVal = _a.endDateVal, displayCalendar = _a.displayCalendar;
    var startDateName = startDate.name, startDateClassName = startDate.className, startDateAttrs = startDate.attrs;
    var endDateName = endDate.name, endDateClassName = endDate.className, endDateAttrs = endDate.attrs;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", __assign({ type: type, name: startDateName, id: startDateName, "aria-label": startDateName, className: "input datepicker-input " + startDateName + " " + startDateClassName, onChange: function () { }, onFocusCapture: displayCalendar, value: startDateVal }, startDateAttrs)),
        react_1.default.createElement("input", __assign({ type: type, name: endDateName, id: endDateName, "aria-label": endDateName, className: "input datepicker-input " + endDateName + " " + endDateClassName, onChange: function () { }, onFocusCapture: displayCalendar, value: endDateVal }, endDateAttrs))));
};
exports.DateRange = DateRange;
exports.default = exports.DateRange;
