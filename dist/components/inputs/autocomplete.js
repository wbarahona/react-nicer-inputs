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
exports.Autocomplete = void 0;
var react_1 = __importStar(require("react"));
/**
 * Autocomplete Component
 * @param name - Is the input name
 * @param [className] - Optional. Is the class needed, its appended to the component wrapper
 * @param options - Is the array of options, it takes an array of objects with label and value properties, this accepts attrs for each option
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value
 * @param attrs - Are all attributes this input can have they are appended to the input not the wrapper
 * @param [value] - Optional. Is the input value, if sent the input will take this value as default
 * @returns {React.FunctionComponentElement} Returns a select element
 */
var Autocomplete = function (_a) {
    var name = _a.name, className = _a.className, options = _a.options, inputChange = _a.inputChange, attrs = _a.attrs, value = _a.value, props = __rest(_a, ["name", "className", "options", "inputChange", "attrs", "value"]);
    var _b = react_1.useState(false), optionsVisible = _b[0], setOptionsVisible = _b[1];
    var _c = react_1.useState(''), labelValue = _c[0], setLabelValue = _c[1];
    var _d = react_1.useState(options), allOptions = _d[0], setAllOptions = _d[1];
    var autocompleteRef = react_1.useRef(null);
    var toggleOptions = function () {
        setOptionsVisible(!optionsVisible);
    };
    var closeOptions = function () {
        setOptionsVisible(false);
    };
    function handleClick(e) {
        if (autocompleteRef.current &&
            !autocompleteRef.current.contains(e.target)) {
            closeOptions();
        }
    }
    var registerMouseDown = function () {
        document.addEventListener('mousedown', handleClick);
    };
    var unRegisterMouseDown = function () {
        document.removeEventListener('mousedown', handleClick);
    };
    var setValue = function (val) {
        if (value && value !== '') {
            var currentOptions = options.filter(function (_a) {
                var value = _a.value;
                return value === val;
            });
            if (currentOptions.length > 0) {
                var label = currentOptions[0].label;
                setLabelValue(label);
            }
        }
        else if (value && value === '') {
            setLabelValue('');
        }
    };
    var selectOption = function (e) {
        var value = e.currentTarget.getAttribute('data-value') || '';
        setValue(value);
        inputChange({ e: e, name: name, value: value });
        closeOptions();
    };
    var handleFocus = function (e) {
        if (labelValue.length > 0) {
            e.currentTarget.select();
        }
    };
    var handleChange = function (e) {
        var value = e.currentTarget.value;
        var currentOptions = options.filter(function (_a) {
            var label = _a.label;
            return label.toLowerCase().includes(value.toLowerCase());
        });
        setLabelValue(value);
        setAllOptions(currentOptions);
    };
    react_1.useEffect(function () {
        registerMouseDown();
        setValue(value);
        setAllOptions(options);
        return function () {
            unRegisterMouseDown();
        };
    }, [value, options]);
    return (react_1.default.createElement("div", { className: "autocomplete-wrapper " + className, ref: autocompleteRef },
        react_1.default.createElement("input", __assign({}, props, { name: name, id: name, className: "input autocomplete-input", "aria-label": name, onChange: handleChange, onClick: toggleOptions, onFocus: handleFocus, value: labelValue }, attrs)),
        optionsVisible && (react_1.default.createElement("ul", { className: "autocomplete-options" }, allOptions.map(function (_a) {
            var label = _a.label, value = _a.value, optAttrs = _a.attrs;
            return (react_1.default.createElement("li", __assign({ key: value, "data-value": value, "data-label": label, "data-testid": name + "-autocomplete-options", onClick: selectOption }, optAttrs), label));
        })))));
};
exports.Autocomplete = Autocomplete;
exports.default = exports.Autocomplete;
