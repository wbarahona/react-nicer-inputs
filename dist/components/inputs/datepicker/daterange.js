"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = void 0;
var react_1 = __importDefault(require("react"));
var DateRange = function (_a) {
    var type = _a.type, onChange = _a.onChange, startDate = _a.startDate, endDate = _a.endDate;
    var startDateName = startDate.name, startDateClassName = startDate.className;
    var endDateName = endDate.name, endDateClassName = endDate.className;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { type: type, name: startDateName, id: startDateName, className: "input datepicker-input " + startDateName + " " + startDateClassName, onChange: onChange }),
        react_1.default.createElement("input", { type: type, name: endDateName, id: endDateName, className: "input datepicker-input " + endDateName + " " + endDateClassName, onChange: onChange })));
};
exports.DateRange = DateRange;
exports.default = exports.DateRange;
