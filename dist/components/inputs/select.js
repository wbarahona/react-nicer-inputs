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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
var react_1 = __importDefault(require("react"));
/**
 * Select Component
 * @param name - Is the input name
 * @param className - Optional. Is the class needed, its appended to the component wrapper
 * @param options - Is the array of options, it takes an array of objects with label and value properties, this accepts attrs for each option
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param attrs - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param value - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns a ```<select />``` element
 */
var Select = function (_a) {
    var name = _a.name, className = _a.className, options = _a.options, defaultLabel = _a.defaultLabel, inputChange = _a.inputChange, attrs = _a.attrs, props = __rest(_a, ["name", "className", "options", "defaultLabel", "inputChange", "attrs"]);
    var classNames = "input " + name + " " + (className ? className : '');
    var handleChange = function (e) {
        var value = e.currentTarget.value;
        inputChange({ e: e, name: name, value: value });
    };
    var defoLabel = defaultLabel || 'Select an option...';
    var selectOptions = __spreadArrays([{ value: '', label: defoLabel }], options);
    return (react_1.default.createElement("div", { className: "select-wrapper " + classNames },
        react_1.default.createElement("select", __assign({}, props, { name: name, id: name, className: "select-element", "aria-label": name, onChange: handleChange }, attrs), selectOptions.map(function (_a) {
            var value = _a.value, label = _a.label;
            return (react_1.default.createElement("option", { key: value, value: value, "data-testid": name + "-options" }, label));
        }))));
};
exports.Select = Select;
exports.default = exports.Select;
