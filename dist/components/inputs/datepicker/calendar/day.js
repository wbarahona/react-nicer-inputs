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
    var date = _a.date, dateString = _a.dateString, dayNumber = _a.dayNumber;
    var saveDate = react_1.useContext(CalendarContext_1.CalendarContext).saveDate;
    var _b = react_1.useState(''), className = _b[0], setClassName = _b[1];
    var handleClick = function (e) {
        var rawDate = e.currentTarget.getAttribute('data-date');
        var date = moment_1.default(rawDate, 'YYYY-MM-DD', true).toDate();
        saveDate(date);
    };
    var handleMouseEnter = function () {
        console.log('mouse entered');
    };
    var handleMouseLeave = function () {
        console.log('mouse leave');
    };
    return (react_1.default.createElement("td", { "data-date": dateString, onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: className },
        react_1.default.createElement("time", { dateTime: dateString }, dayNumber)));
};
exports.Day = Day;
exports.default = exports.Day;
