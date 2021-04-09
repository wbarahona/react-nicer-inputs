"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarHeader = void 0;
var react_1 = __importDefault(require("react"));
var test = function () {
    console.log('test');
};
var test1 = function () {
    console.log('test1');
};
var CalendarHeader = function (_a) {
    var month = _a.month, monthHeader = _a.monthHeader;
    var CustomHeader = react_1.default.createElement(react_1.default.Fragment, null);
    if (monthHeader) {
        CustomHeader = monthHeader(test, test1)();
    }
    var DefoHeader = function (_a) {
        var children = _a.children;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            children,
            month.format('MMMM'),
            " ",
            month.format('YYYY')));
    };
    return (react_1.default.createElement("caption", null,
        react_1.default.createElement(DefoHeader, null, CustomHeader)));
};
exports.CalendarHeader = CalendarHeader;
exports.default = exports.CalendarHeader;
