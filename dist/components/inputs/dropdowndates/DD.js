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
exports.DD = void 0;
var react_1 = __importStar(require("react"));
var select_1 = __importDefault(require("../select"));
var DropdowndatesContext_1 = require("./DropdowndatesContext");
var DD = function () {
    var _a = react_1.useContext(DropdowndatesContext_1.DropDownDatesContext), ddClassName = _a.ddClassName, ddDefaultLabel = _a.ddDefaultLabel, ddLabel = _a.ddLabel, name = _a.name, ddOptions = _a.ddOptions, handleDDChange = _a.handleDDChange, ddValue = _a.ddValue;
    var groupName = name + "-dd-select";
    return (react_1.default.createElement("div", { className: ddClassName + " " + name + "-dd-select-wrapper" },
        react_1.default.createElement("label", { htmlFor: groupName }, ddLabel),
        react_1.default.createElement(select_1.default, { name: groupName, className: groupName, options: ddOptions, defaultLabel: ddDefaultLabel, inputChange: handleDDChange, value: ddValue })));
};
exports.DD = DD;
exports.default = exports.DD;
