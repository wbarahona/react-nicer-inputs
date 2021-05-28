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
exports.Input = void 0;
var react_1 = __importStar(require("react"));
/**
 * Input Component
 * @param {InputProps} props - all props
 * @param {string} type - Can be any type of input defined in HTML5 spec, "checkbox" or "radio" are not recommended
 * @param {string} name - Is the input name
 * @param {string} [className] - Optional. Is the class needed, its appended to the component element
 * @param {Function} inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param {Object} [attrs] - Optional. Are all attributes this input can have they are appended to the input not the wrapper
 * @param {number} [cols] - Optional. Is the number of columns in case of textarea
 * @param {number} [rows] - Optional. Is the number of rows in case of textarea
 * @param {RegExp} [mask] - Optional. Is the regex that will mask this input with discs. THIS DOES NOT AFFECT the returned value to inputChange
 * @param {string} [maskChar] - Optional. Is the special character that is used by the input to mask the text displayed
 * @param {string | number} [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns an ```<input />``` element
 */
var Input = function (_a) {
    var type = _a.type, name = _a.name, className = _a.className, inputChange = _a.inputChange, attrs = _a.attrs, cols = _a.cols, rows = _a.rows, mask = _a.mask, _b = _a.maskChar, maskChar = _b === void 0 ? '●' : _b, value = _a.value, onBlurCapture = _a.onBlurCapture, onFocusCapture = _a.onFocusCapture, props = __rest(_a, ["type", "name", "className", "inputChange", "attrs", "cols", "rows", "mask", "maskChar", "value", "onBlurCapture", "onFocusCapture"]);
    var _c = react_1.useState(''), inputValue = _c[0], setInputValue = _c[1];
    var _d = react_1.useState(''), cleanValue = _d[0], setCleanValue = _d[1];
    var _e = react_1.useState(''), maskedValue = _e[0], setMaskedValue = _e[1];
    var classNames = "input " + name + " " + (className ? className : '');
    var getMask = function (val) {
        if (mask && val) {
            var reg = new RegExp(mask, 'i');
            var strVal = "" + val;
            if (reg.test(strVal)) {
                var matchVal_1 = strVal.match(reg) || [''];
                var output = strVal.replace(reg, function () {
                    return matchVal_1[0].replace(/./g, maskChar);
                });
                setMaskedValue(output);
                return output;
            }
            else {
                setMaskedValue("" + val);
                return "" + val;
            }
        }
        else {
            setMaskedValue("" + val);
        }
    };
    var validateValue = function (val) {
        setInputValue(val || '');
        setCleanValue(val || '');
        getMask(val || '');
    };
    var setDefoValue = function (val) {
        if (value && value !== '') {
            setCleanValue(val || '');
            var masked = getMask(val || '');
            setInputValue(masked || '');
        }
    };
    var handleChange = function (e) {
        var rawValue = e.currentTarget.value;
        var value = type === 'number' ? Number(rawValue) : rawValue;
        validateValue(value);
        inputChange({ e: e, name: name, value: value });
    };
    var handleFocus = function () {
        setInputValue(cleanValue);
    };
    var handleBlur = function () {
        setInputValue(maskedValue);
    };
    react_1.useEffect(function () {
        setDefoValue(value);
    }, [value]);
    if (type === 'textarea') {
        return (react_1.default.createElement("textarea", { name: name, id: name, className: classNames, "aria-label": name, "aria-describedBy": name + "-help", cols: cols, rows: rows, onChange: handleChange, 
            // defaultValue={value}
            value: inputValue }));
    }
    else {
        return (react_1.default.createElement("input", __assign({}, props, { type: type, name: name, id: name, className: classNames, "aria-label": name, "aria-describedby": name + "-help", onChange: handleChange, onFocusCapture: mask ? handleFocus : onFocusCapture, onBlurCapture: mask ? handleBlur : onBlurCapture, value: inputValue }, attrs)));
    }
};
exports.Input = Input;
exports.default = exports.Input;
