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
exports.InputGroup = void 0;
var react_1 = __importStar(require("react"));
/**
 * Input Group Component
 * @alias InputGroup
 * @param {InputGroupProps} props - all props
 * @param {string} type - Can be only "checkbox" || "radio"
 * @param {string} name - Is the input name
 * @param {string} className - Optional. Is the class needed, its appended to the component wrapper
 * @param {object[]} options - Is the array of options, it takes an array of objects with label and value properties, this accepts attrs for each option
 * @param inputChange - Non native change handler performed by the library, will return the event, the input name and the value, for checkboxes it will return a comma separated string of each value selected by the user
 * @param {(string | number)} value - Optional. Is the input value, if sent the input will take this value as default, for checkboxes it needs a comma separated value, for radios just the radio value
 * @returns {React.FunctionComponentElement} Returns a list of checkbox or radio button list
 */
var InputGroup = function (_a) {
    var type = _a.type, name = _a.name, className = _a.className, inputChange = _a.inputChange, options = _a.options, value = _a.value, props = __rest(_a, ["type", "name", "className", "inputChange", "options", "value"]);
    var _b = react_1.useState([]), optionValueArray = _b[0], setOptionValueArray = _b[1];
    var classNames = name + " " + className;
    var resetAllOptions = function () {
        var arr = [];
        options.map(function (_a) {
            var value = _a.value, label = _a.label;
            arr.push({ label: label, value: value, checked: false });
        });
        return arr;
    };
    var buildInputArray = function (rawInputValue, init) {
        if (init === void 0) { init = false; }
        var inputValues = ("" + rawInputValue).split(',');
        var arr = [];
        var response = '';
        arr = resetAllOptions();
        if (!init) {
            optionValueArray.map(function (_a, i) {
                var checked = _a.checked;
                arr[i].checked = checked;
            });
        }
        inputValues.map(function (val) {
            var _a;
            var i = options.findIndex(function (_a) {
                var value = _a.value;
                return value === val;
            });
            if (i >= 0 && type === 'checkbox') {
                arr[i].checked = !arr[i].checked;
                arr.map(function (_a) {
                    var value = _a.value, checked = _a.checked;
                    if (checked) {
                        response += value + ",";
                    }
                });
                response = response.slice(0, -1);
            }
            else if (i >= 0 && type === 'radio') {
                arr = resetAllOptions();
                arr[i].checked = true;
                response = "" + ((_a = arr.find(function (_a) {
                    var checked = _a.checked;
                    return checked;
                })) === null || _a === void 0 ? void 0 : _a.value);
            }
        });
        // const index = options.findIndex(({value}) => value === rawInputValue);
        // if (index >= 0 && type === 'checkbox') {
        //   optionValueArray.map(({checked}, i) => {
        //     arr[i].checked = checked;
        //   });
        //   arr[index].checked = !arr[index].checked;
        //   arr.map(({value, checked}) => {
        //     if (checked) {response += `${value},`;}
        //   });
        //   response = response.slice(0, -1);
        // } else if (index >= 0 && type === 'radio') {
        //   arr[index].checked = true;
        //   response = `${arr.find(({checked}) => checked)?.value}`;
        // }
        setOptionValueArray(arr);
        return response;
    };
    var handleChange = function (e) {
        var currentInputValue = e.currentTarget.value;
        var value = buildInputArray(currentInputValue);
        inputChange({ e: e, name: name, value: value });
    };
    react_1.useEffect(function () {
        buildInputArray(value, true);
    }, [value]);
    return (react_1.default.createElement("div", { className: "inputgroup-wrapper " + classNames }, options.map(function (_a, i) {
        var lbl = _a.label, value = _a.value, attrs = _a.attrs;
        var checked = optionValueArray[i]
            ? optionValueArray[i].checked
            : false;
        return (react_1.default.createElement("div", { key: value, className: "inputgroup-row inputgroup-row-" + value },
            react_1.default.createElement("input", __assign({ type: type, name: name, id: name + "-" + value, className: "input " + type + "-" + value, value: value }, attrs, { checked: checked, onChange: handleChange, "data-testid": name + "-inputgroup-options" })),
            react_1.default.createElement("label", { htmlFor: name + "-" + value, className: "label-" + value }, lbl)));
    })));
};
exports.InputGroup = InputGroup;
exports.default = exports.InputGroup;
