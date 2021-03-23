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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
var react_1 = __importDefault(require("react"));
/**
 * Input Component
 * @param type - Can be any type of input defined in HTML5 spec, "checkbox" or "radio" are not recommended
 * @param name - Is the input name
 * @param [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an input element
 */
var Input = function (_a) {
    var type = _a.type, name = _a.name, className = _a.className, inputChange = _a.inputChange, attrs = _a.attrs, props = __rest(_a, ["type", "name", "className", "inputChange", "attrs"]);
    var classNames = "input " + name + " " + className;
    var handleChange = function (e) {
        var rawValue = e.currentTarget.value;
        var value = type === 'number' ? Number(rawValue) : rawValue;
        inputChange({ e: e, name: name, value: value });
    };
    return (
    // TODO: add textarea
    react_1.default.createElement("input", __assign({}, props, { type: type, name: name, id: name, className: classNames, "aria-label": name, onChange: handleChange }, attrs)));
};
exports.Input = Input;
exports.default = exports.Input;
