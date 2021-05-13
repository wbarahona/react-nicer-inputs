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
exports.MM = void 0;
var react_1 = __importStar(require("react"));
var select_1 = __importDefault(require("../select"));
var DropdowndatesContext_1 = require("./DropdowndatesContext");
var MM = function () {
    var _a = react_1.useContext(DropdowndatesContext_1.DropDownDatesContext), mmClassName = _a.mmClassName, mmDefaultLabel = _a.mmDefaultLabel, mmLabel = _a.mmLabel, name = _a.name, mmOptions = _a.mmOptions, handleMMChange = _a.handleMMChange, mmValue = _a.mmValue;
    var groupName = name + "-mm-select";
    return (react_1.default.createElement("div", { className: mmClassName + " " + name + "-mm-select-wrapper" },
        react_1.default.createElement("label", { htmlFor: groupName }, mmLabel),
        react_1.default.createElement(select_1.default, { name: groupName, className: groupName, options: mmOptions, defaultLabel: mmDefaultLabel, inputChange: handleMMChange, value: mmValue })));
};
exports.MM = MM;
exports.default = exports.MM;
