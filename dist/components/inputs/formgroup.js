"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormGroup = void 0;
var react_1 = __importDefault(require("react"));
var input_1 = __importDefault(require("./input"));
var inputgroup_1 = __importDefault(require("./inputgroup"));
var label_1 = __importDefault(require("./label"));
var password_1 = __importDefault(require("./password"));
var select_1 = __importDefault(require("./select"));
var feedback_1 = __importDefault(require("./feedback"));
var autocomplete_1 = __importDefault(require("./autocomplete"));
var dropdowndates_1 = __importDefault(require("./dropdowndates"));
var datepicker_1 = __importDefault(require("./datepicker"));
var FormGroup = function (_a) {
    var type = _a.type, name = _a.name, className = _a.className, inputChange = _a.inputChange, labelText = _a.labelText, feedbackText = _a.feedbackText, labelClassName = _a.labelClassName, inputClassName = _a.inputClassName, feedbackClassName = _a.feedbackClassName, cols = _a.cols, rows = _a.rows, mask = _a.mask, maskChar = _a.maskChar, defaultLabel = _a.defaultLabel, showIcon = _a.showIcon, hideIcon = _a.hideIcon, minDate = _a.minDate, maxDate = _a.maxDate, format = _a.format, displayOrder = _a.displayOrder, ddClassName = _a.ddClassName, mmClassName = _a.mmClassName, yyClassName = _a.yyClassName, ddLabel = _a.ddLabel, mmLabel = _a.mmLabel, yyLabel = _a.yyLabel, ddDefaultLabel = _a.ddDefaultLabel, mmDefaultLabel = _a.mmDefaultLabel, yyDefaultLabel = _a.yyDefaultLabel, mmmm = _a.mmmm, dateRange = _a.dateRange, minNights = _a.minNights, maxNights = _a.maxNights, bottomPanel = _a.bottomPanel, monthHeader = _a.monthHeader, monthsToDisplay = _a.monthsToDisplay, disabledDates = _a.disabledDates, prevButton = _a.prevButton, nextButton = _a.nextButton, disableNavigationOnDateBoundary = _a.disableNavigationOnDateBoundary, calendarComponentClassName = _a.calendarComponentClassName, calendarClassName = _a.calendarClassName, attrs = _a.attrs, options = _a.options, value = _a.value;
    var classNames = "form-group " + className;
    var renderInput = function (inputType) {
        switch (inputType) {
            case 'textarea':
                return (react_1.default.createElement(input_1.default, { type: "textarea", name: name, className: inputClassName, inputChange: inputChange, cols: cols, rows: rows, attrs: attrs, value: value }));
            case 'checkbox' || 'radio':
                return (react_1.default.createElement(inputgroup_1.default, { type: type, name: name, className: inputClassName, inputChange: inputChange, options: options, value: value }));
            case 'select':
                return (react_1.default.createElement(select_1.default, { name: name, className: inputClassName, inputChange: inputChange, defaultLabel: defaultLabel, options: options, attrs: attrs, value: value }));
            case 'autocomplete':
                return (react_1.default.createElement(autocomplete_1.default, { name: name, className: inputClassName, inputChange: inputChange, options: options, attrs: attrs, value: value }));
            case 'password':
                return (react_1.default.createElement(password_1.default, { name: name, className: inputClassName, inputChange: inputChange, showIcon: showIcon, hideIcon: hideIcon, attrs: attrs, value: value }));
            case 'dropdowndates':
                return (react_1.default.createElement(dropdowndates_1.default, { name: name, minDate: minDate, maxDate: maxDate, className: inputClassName, format: format, displayOrder: displayOrder, ddClassName: ddClassName, mmClassName: mmClassName, yyClassName: yyClassName, ddLabel: ddLabel, mmLabel: mmLabel, yyLabel: yyLabel, ddDefaultLabel: ddDefaultLabel, mmDefaultLabel: mmDefaultLabel, yyDefaultLabel: yyDefaultLabel, mmmm: mmmm, inputChange: inputChange, value: value }));
            case 'datepicker':
                return (react_1.default.createElement(datepicker_1.default, { name: name, className: inputClassName, inputChange: inputChange, format: format, dateRange: dateRange, bottomPanel: bottomPanel, minDate: minDate, maxDate: maxDate, monthsToDisplay: monthsToDisplay, minNights: minNights, maxNights: maxNights, disabledDates: disabledDates, monthHeader: monthHeader, prevButton: prevButton, nextButton: nextButton, disableNavigationOnDateBoundary: disableNavigationOnDateBoundary, calendarComponentClassName: calendarComponentClassName, calendarClassName: calendarClassName }));
            default:
                return (react_1.default.createElement(input_1.default, { type: type, name: name, className: inputClassName, inputChange: inputChange, mask: mask, maskChar: maskChar, attrs: attrs, value: value }));
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classNames },
            react_1.default.createElement(label_1.default, { htmlFor: name, className: labelClassName }, labelText),
            renderInput(type),
            react_1.default.createElement(feedback_1.default, { id: name + "-help", className: feedbackClassName }, feedbackText))));
};
exports.FormGroup = FormGroup;
exports.default = exports.FormGroup;
