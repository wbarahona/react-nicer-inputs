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
exports.DropDownDatesProvider = exports.DropDownDatesContext = void 0;
var react_1 = __importStar(require("react"));
var moment_1 = __importDefault(require("moment"));
var DD_1 = __importDefault(require("./DD"));
var MM_1 = __importDefault(require("./MM"));
var YY_1 = __importDefault(require("./YY"));
var DropdowndateContextDefoValues = {
    name: '',
    inputChange: function () { },
    format: '',
    maxDate: '',
    minDate: '',
    attrs: {},
    value: '',
    ddClassName: '',
    mmClassName: '',
    yyClassName: '',
    ddLabel: '',
    mmLabel: '',
    yyLabel: '',
    ddDefaultLabel: '',
    mmDefaultLabel: '',
    yyDefaultLabel: '',
    displayOrder: '',
    mmmm: false,
    getElement: function () { return react_1.default.createElement(react_1.default.Fragment, null); },
    ddOptions: [],
    ddValue: 0,
    handleDDChange: function () { },
    mmOptions: [],
    mmValue: 0,
    handleMMChange: function () { },
    yyOptions: [],
    yyValue: 0,
    handleYYChange: function () { },
};
exports.DropDownDatesContext = react_1.createContext(DropdowndateContextDefoValues);
var DropDownDatesProvider = function (_a) {
    var name = _a.name, children = _a.children, inputChange = _a.inputChange, format = _a.format, maxDate = _a.maxDate, minDate = _a.minDate, attrs = _a.attrs, value = _a.value, ddClassName = _a.ddClassName, mmClassName = _a.mmClassName, yyClassName = _a.yyClassName, ddLabel = _a.ddLabel, mmLabel = _a.mmLabel, yyLabel = _a.yyLabel, ddDefaultLabel = _a.ddDefaultLabel, mmDefaultLabel = _a.mmDefaultLabel, yyDefaultLabel = _a.yyDefaultLabel, displayOrder = _a.displayOrder, mmmm = _a.mmmm, dropDownDatesRef = _a.dropDownDatesRef;
    var internalFormat = 'MM-DD-YYYY';
    var _b = react_1.useState(0), ddValue = _b[0], setDDvalue = _b[1];
    var _c = react_1.useState(0), mmValue = _c[0], setMMValue = _c[1];
    var _d = react_1.useState(0), yyValue = _d[0], setYYValue = _d[1];
    var _e = react_1.useState(''), ddValueString = _e[0], setDDvalueString = _e[1];
    var _f = react_1.useState(''), mmValueString = _f[0], setMMValueString = _f[1];
    var _g = react_1.useState(''), yyValueString = _g[0], setYYValueString = _g[1];
    var _h = react_1.useState(0), minYear = _h[0], setMinYear = _h[1];
    var _j = react_1.useState(0), minMonth = _j[0], setMinMonth = _j[1];
    var _k = react_1.useState(0), minDay = _k[0], setMinDay = _k[1];
    var _l = react_1.useState(0), maxYear = _l[0], setMaxYear = _l[1];
    var _m = react_1.useState(0), maxMonth = _m[0], setMaxMonth = _m[1];
    var _o = react_1.useState(0), maxDay = _o[0], setMaxDay = _o[1];
    var _p = react_1.useState([]), ddOptions = _p[0], setDDOptions = _p[1];
    var _q = react_1.useState([]), mmOptions = _q[0], setMMOptions = _q[1];
    var _r = react_1.useState([]), yyOptions = _r[0], setYYOptions = _r[1];
    var getDateFormatElements = function () { return (displayOrder === null || displayOrder === void 0 ? void 0 : displayOrder.split('-')) || []; };
    var getElement = function (i) {
        var elem = getDateFormatElements()[i];
        switch (elem) {
            case 'MM' || 'mm':
                return react_1.default.createElement(MM_1.default, null);
            case 'DD' || 'dd':
                return react_1.default.createElement(DD_1.default, null);
            case 'YY' || 'yy' || 'YYYY' || 'yyyy':
                return react_1.default.createElement(YY_1.default, null);
            default:
                return (react_1.default.createElement("div", null, "Error: no element to display, check the format sent to displayOrder. You can only use MM, DD or YY separated by a dash \"-\""));
        }
    };
    var buildDateLimits = function () {
        var mMinDate = moment_1.default(minDate, format, true);
        setMinYear(parseInt(mMinDate.format('YYYY'), 10));
        setMinMonth(parseInt(mMinDate.format('MM'), 10));
        setMinDay(parseInt(mMinDate.format('DD'), 10));
        var mMaxDate = moment_1.default(maxDate, format, true);
        setMaxYear(parseInt(mMaxDate.format('YYYY'), 10));
        setMaxMonth(parseInt(mMaxDate.format('MM'), 10));
        setMaxDay(parseInt(mMaxDate.format('DD'), 10));
    };
    var buildFinalDate = function () {
        var dateString = mmValueString + "-" + ddValueString + "-" + yyValueString;
        var mDate = moment_1.default(dateString, internalFormat, true);
        if (mDate.isValid()) {
            inputChange({ e: dropDownDatesRef, name: name, value: mDate.format(format) });
        }
    };
    var addLeadZero = function (n) {
        return n < 10 ? "0" + n : "" + n;
    };
    // DAY RELATED FUNCTIONS
    var handleDDChange = function (_a) {
        var value = _a.value;
        var valueConverted = addLeadZero(value);
        setDDvalue(parseInt("" + value, 10));
        setDDvalueString(valueConverted);
    };
    var buildDDOptions = function (start, limit) {
        var ret = [];
        var s = start || 1;
        var l = limit || 31;
        var d = ddValue;
        for (var i = s; i <= l; ++i) {
            ret.push({ label: addLeadZero(i), value: i });
        }
        setDDOptions(ret);
        if (d < s || d > l) {
            setDDvalue(0);
            setDDvalueString('');
        }
    };
    // MONTH RELATED FUNCTIONS
    var handleMMChange = function (_a) {
        var value = _a.value;
        var stringValue = "" + value;
        var numericValue = parseInt(stringValue);
        var valueConverted = addLeadZero(numericValue);
        var dd = ddValue > 0 ? addLeadZero(ddValue) : '01';
        var yy = yyValue > 0 ? yyValue : 1900;
        var daysInMonth = moment_1.default(valueConverted + "-" + dd + "-" + yy, internalFormat, true).daysInMonth();
        setMMValue(numericValue);
        setMMValueString(valueConverted);
        // this here validates the incoming date limits and rebuilds options based on those limits
        if (yyValue === minYear && numericValue === minMonth) {
            buildDDOptions(minDay);
        }
        else if (yyValue === maxYear && numericValue === maxMonth) {
            buildDDOptions(1, maxDay);
        }
        else {
            buildDDOptions(undefined, daysInMonth);
        }
    };
    var buildMMOptions = function (start, limit) {
        var ret = [];
        var s = start || 1;
        var l = limit || 12;
        var mm = mmValue;
        for (var i = s; i <= l; ++i) {
            var label = mmmm
                ? moment_1.default(addLeadZero(i) + "-01-1985", internalFormat, true).format('MMMM')
                : addLeadZero(i);
            ret.push({ label: label, value: i });
        }
        setMMOptions(ret);
        if (mm < s || mm > l) {
            setMMValue(0);
            setMMValueString('');
        }
    };
    // YEAR RELATED FUNCTIONS
    var handleYYChange = function (_a) {
        var value = _a.value;
        var stringValue = "" + value;
        var numericValue = parseInt(stringValue, 10);
        setYYValue(numericValue);
        setYYValueString(stringValue);
        // this here validates the incoming date limits and rebuilds options based on those limits
        if (numericValue === minYear) {
            buildMMOptions(minMonth);
            if (mmValue <= minMonth) {
                buildDDOptions(minDay);
            }
        }
        else if (numericValue === maxYear) {
            buildMMOptions(undefined, maxMonth);
            if (mmValue >= maxMonth) {
                buildDDOptions(1, maxDay);
            }
        }
    };
    var buildYYOptions = function (start, limit) {
        var ret = [];
        var mStart = moment_1.default(minDate, format, true).isValid()
            ? moment_1.default(minDate, format, true)
            : moment_1.default(minDate, internalFormat, true);
        var mLimit = moment_1.default(maxDate, format, true).isValid()
            ? moment_1.default(maxDate, format, true)
            : moment_1.default(maxDate, internalFormat, true);
        var l = limit || parseInt(mLimit.format('YYYY'), 10);
        var s = start || parseInt(mStart.format('YYYY'), 10);
        var y = yyValue;
        for (var i = s; i <= l; ++i) {
            ret.push({ label: "" + i, value: i });
        }
        setYYOptions(ret);
        if (y < s || y > l) {
            setYYValue(0);
            setYYValueString('');
        }
    };
    var setDefaultValue = function () {
        var mDate = moment_1.default(value, format, true);
        if (mDate.isValid()) {
            var mm = mDate.format('MM');
            var dd = mDate.format('DD');
            var yy = mDate.format('YYYY');
            setMMValue(parseInt(mm, 10));
            setMMValueString(mm);
            setDDvalue(parseInt(dd, 10));
            setDDvalueString(dd);
            setYYValue(parseInt(yy, 10));
            setYYValueString(yy);
        }
    };
    var buildDropOptions = function () {
        buildDDOptions();
        buildMMOptions();
        buildYYOptions();
    };
    react_1.useEffect(function () {
        buildDropOptions();
    }, []);
    react_1.useEffect(function () {
        buildFinalDate();
    }, [mmValueString, ddValueString, yyValueString]);
    react_1.useEffect(function () {
        buildDateLimits();
        setDefaultValue();
    }, [minDate, maxDate, value]);
    return (react_1.default.createElement(exports.DropDownDatesContext.Provider, { value: {
            name: name,
            inputChange: inputChange,
            format: format,
            maxDate: maxDate,
            minDate: minDate,
            attrs: attrs,
            value: value,
            ddClassName: ddClassName,
            mmClassName: mmClassName,
            yyClassName: yyClassName,
            ddLabel: ddLabel,
            mmLabel: mmLabel,
            yyLabel: yyLabel,
            ddDefaultLabel: ddDefaultLabel,
            mmDefaultLabel: mmDefaultLabel,
            yyDefaultLabel: yyDefaultLabel,
            getElement: getElement,
            displayOrder: displayOrder,
            mmmm: mmmm,
            ddOptions: ddOptions,
            handleDDChange: handleDDChange,
            ddValue: ddValue,
            mmOptions: mmOptions,
            handleMMChange: handleMMChange,
            mmValue: mmValue,
            yyOptions: yyOptions,
            handleYYChange: handleYYChange,
            yyValue: yyValue,
        } }, children));
};
exports.DropDownDatesProvider = DropDownDatesProvider;
exports.default = exports.DropDownDatesProvider;
