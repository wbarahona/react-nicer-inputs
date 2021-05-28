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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
var react_1 = __importStar(require("react"));
/**
 * Password Component
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param {Object} [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {ReactNode} [showIcon] - Optional. Is the icon to be displayed when the password text is hidden
 * @param {ReactNode} [hideIcon] - Optional. Is the icon to be displayed when the password text is shown
 * @param {string} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```<input type="password" />``` element
 */
var Password = function (_a) {
    var name = _a.name, className = _a.className, inputChange = _a.inputChange, attrs = _a.attrs, value = _a.value, _b = _a.showIcon, showIcon = _b === void 0 ? 'hide' : _b, _c = _a.hideIcon, hideIcon = _c === void 0 ? 'show' : _c, props = __rest(_a, ["name", "className", "inputChange", "attrs", "value", "showIcon", "hideIcon"]);
    var classNames = "input " + name + " " + (className ? className : '');
    var _d = react_1.useState(''), inputValue = _d[0], setInputValue = _d[1];
    var _e = react_1.useState(false), pwdVisible = _e[0], setPwdVisible = _e[1];
    var _f = react_1.useState(__assign({}, attrs)), finalAttrs = _f[0], setFinalAttrs = _f[1];
    var toggleVisible = function () {
        if (!pwdVisible) {
            setFinalAttrs(__assign(__assign({}, attrs), { autoComplete: 'off' }));
        }
        else {
            setFinalAttrs(__assign({}, attrs));
        }
        setPwdVisible(!pwdVisible);
    };
    var handleChange = function (e) {
        var value = e.currentTarget.value;
        inputChange({ e: e, name: name, value: value });
        setInputValue(value);
    };
    var setDefoValue = function (val) {
        if (val && val !== '') {
            setInputValue(val || '');
        }
    };
    react_1.useEffect(function () {
        setDefoValue(value);
    }, [value]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", __assign({}, props, { type: pwdVisible ? 'text' : 'password', name: name, id: name, className: classNames, "aria-label": name, onChange: handleChange, value: inputValue }, finalAttrs)),
        react_1.default.createElement("button", { onClick: toggleVisible }, pwdVisible ? hideIcon : showIcon)));
};
exports.Password = Password;
exports.default = exports.Password;
