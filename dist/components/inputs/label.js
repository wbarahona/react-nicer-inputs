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
exports.Label = void 0;
var react_1 = __importDefault(require("react"));
/**
 * Label Component
 * @param {string} [htmlFor] - Is the prop that assigns this label to an input
 * @param [className] - Optional. Is the class needed, its appended to the component element
 * @returns {React.FunctionComponentElement} Returns a ```<label />``` to use along in the form
 */
var Label = function (_a) {
    var children = _a.children, htmlFor = _a.htmlFor, className = _a.className, props = __rest(_a, ["children", "htmlFor", "className"]);
    return (react_1.default.createElement("label", __assign({}, props, { htmlFor: htmlFor, className: className }), children));
};
exports.Label = Label;
exports.default = exports.Label;
