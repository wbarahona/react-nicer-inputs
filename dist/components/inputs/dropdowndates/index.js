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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDownDates = void 0;
var react_1 = __importStar(require("react"));
var moment_1 = __importDefault(require("moment"));
var DropdowndatesContext_1 = __importDefault(require("./DropdowndatesContext"));
var DropDownSelectRow_1 = __importDefault(require("./DropDownSelectRow"));
var DropDownDates = function (_a) {
    var name = _a.name, className = _a.className, inputChange = _a.inputChange, _b = _a.format, format = _b === void 0 ? 'MM-DD-YYYY' : _b, _c = _a.maxDate, maxDate = _c === void 0 ? moment_1.default().endOf('year').format('MM-DD-YYYY') : _c, _d = _a.minDate, minDate = _d === void 0 ? '01-01-1900' : _d, attrs = _a.attrs, value = _a.value, _e = _a.ddClassName, ddClassName = _e === void 0 ? '' : _e, _f = _a.mmClassName, mmClassName = _f === void 0 ? '' : _f, _g = _a.yyClassName, yyClassName = _g === void 0 ? '' : _g, _h = _a.ddLabel, ddLabel = _h === void 0 ? 'DD:' : _h, _j = _a.mmLabel, mmLabel = _j === void 0 ? 'MM:' : _j, _k = _a.yyLabel, yyLabel = _k === void 0 ? 'YYYY:' : _k, _l = _a.ddDefaultLabel, ddDefaultLabel = _l === void 0 ? 'Pick a day...' : _l, _m = _a.mmDefaultLabel, mmDefaultLabel = _m === void 0 ? 'Pick a month...' : _m, _o = _a.yyDefaultLabel, yyDefaultLabel = _o === void 0 ? 'Pick a year...' : _o, _p = _a.displayOrder, displayOrder = _p === void 0 ? 'MM-DD-YY' : _p, _q = _a.mmmm, mmmm = _q === void 0 ? false : _q, props = __rest(_a, ["name", "className", "inputChange", "format", "maxDate", "minDate", "attrs", "value", "ddClassName", "mmClassName", "yyClassName", "ddLabel", "mmLabel", "yyLabel", "ddDefaultLabel", "mmDefaultLabel", "yyDefaultLabel", "displayOrder", "mmmm"]);
    var dropDownDatesRef = react_1.useRef(null);
    return (react_1.default.createElement(DropdowndatesContext_1.default, { name: name, inputChange: inputChange, format: format, maxDate: maxDate, minDate: minDate, attrs: attrs, value: value, ddClassName: ddClassName, mmClassName: mmClassName, yyClassName: yyClassName, ddLabel: ddLabel, mmLabel: mmLabel, yyLabel: yyLabel, ddDefaultLabel: ddDefaultLabel, mmDefaultLabel: mmDefaultLabel, yyDefaultLabel: yyDefaultLabel, displayOrder: displayOrder, mmmm: mmmm, dropDownDatesRef: dropDownDatesRef || props.ref },
        react_1.default.createElement("div", __assign({ className: (className || '') + " dropdowndates-wrapper", ref: dropDownDatesRef }, attrs, props),
            react_1.default.createElement("input", { type: "hidden", name: name, id: name, value: value }),
            react_1.default.createElement(DropDownSelectRow_1.default, null))));
};
exports.DropDownDates = DropDownDates;
exports.default = exports.DropDownDates;
