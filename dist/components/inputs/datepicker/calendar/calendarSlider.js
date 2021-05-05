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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarSlider = void 0;
var react_1 = __importStar(require("react"));
var CalendarContext_1 = require("./CalendarContext");
var month_1 = require("./month");
// TODO: add animation later to slide
var CalendarSlider = function () {
    var _a = react_1.useContext(CalendarContext_1.CalendarContext), getPrevPaneMonths = _a.getPrevPaneMonths, getCurrentPaneMonths = _a.getCurrentPaneMonths, getNextPaneMonths = _a.getNextPaneMonths, whatCalendarHeader = _a.whatCalendarHeader;
    // const prevPaneMonths: Moment[] = getPrevPaneMonths();
    var currPaneMonths = getCurrentPaneMonths();
    // const nextPaneMonths: Moment[] = getNextPaneMonths();
    return (react_1.default.createElement("div", { className: "row months-slider" }, currPaneMonths.map(function (month, i) { return (react_1.default.createElement(month_1.Month, { key: "calendar-" + i, month: month, monthHeader: whatCalendarHeader(month) })); })));
};
exports.CalendarSlider = CalendarSlider;
exports.default = exports.CalendarSlider;
