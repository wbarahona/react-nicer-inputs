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
exports.CalendarNavigation = void 0;
var react_1 = __importStar(require("react"));
var CalendarContext_1 = require("./CalendarContext");
var CalendarNavigation = function (_a) {
    var prev = _a.prev, next = _a.next;
    var _b = react_1.useContext(CalendarContext_1.CalendarContext), movePrev = _b.movePrev, moveNext = _b.moveNext, canNavigatePrev = _b.canNavigatePrev, canNavigateNext = _b.canNavigateNext;
    return (react_1.default.createElement("div", { className: "row calendar-navigation" },
        react_1.default.createElement("div", { className: "calendar-nav-button-wrapper calendar-prev-button-wrapper " + (!canNavigatePrev()
                ? 'calendar-nav-button-wrapper--disabled calendar-navigation-prev--disabled'
                : ''), onClick: movePrev }, prev ? prev : react_1.default.createElement("button", null, "<")),
        react_1.default.createElement("div", { className: "calendar-nav-button-wrapper calendar-next-button-wrapper " + (!canNavigateNext()
                ? 'calendar-nav-button-wrapper--disabled calendar-navigation-next--disabled'
                : ''), onClick: moveNext }, next ? next : react_1.default.createElement("button", null, ">"))));
};
exports.CalendarNavigation = CalendarNavigation;
exports.default = exports.CalendarNavigation;
