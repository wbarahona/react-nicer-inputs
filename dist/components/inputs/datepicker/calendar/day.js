"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day = void 0;
var react_1 = __importDefault(require("react"));
var Day = function (_a) {
    var date = _a.date;
    return react_1.default.createElement("td", null, date);
};
exports.Day = Day;
exports.default = exports.Day;
