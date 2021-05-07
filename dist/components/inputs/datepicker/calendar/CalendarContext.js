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
exports.CalendarContext = void 0;
var react_1 = __importStar(require("react"));
var moment_1 = __importDefault(require("moment"));
var defoDateRange = {
    startDate: '',
    endDate: '',
};
var CalendarContextDefoValues = {
    date: '',
    saveDate: function () { },
    saveHoverDate: function () { },
    getDate: function () { return new Date(); },
    getDateRange: function () { return defoDateRange; },
    isDateRange: false,
    isDateSelected: function () { return false; },
    isDateWithinRange: function () { return false; },
    isDateSelectable: function () { return true; },
    isSelectedDateStartDate: function () { return false; },
    isSelectedDateEndDate: function () { return false; },
    startDate: '',
    endDate: '',
    minNights: undefined,
    maxNights: undefined,
    minDate: undefined,
    maxDate: undefined,
    hoverDate: '',
    disabledDates: [],
    buildMonthsPanes: function () { },
    getPrevPaneMonths: function () { return []; },
    getCurrentPaneMonths: function () { return []; },
    getNextPaneMonths: function () { return []; },
    movePrev: function () { },
    moveNext: function () { },
    canNavigatePrev: function () { return true; },
    canNavigateNext: function () { return true; },
    whatCalendarHeader: function () { },
    currPaneMonths: [],
    disableNavigationOnDateBoundary: false,
    getWeekdayName: function () { return ''; },
    isWeekend: function () { return false; },
};
exports.CalendarContext = react_1.createContext(CalendarContextDefoValues);
var CalendarProvider = function (_a) {
    var children = _a.children, _b = _a.format, format = _b === void 0 ? 'MM-DD-YYYY' : _b, dateRange = _a.dateRange, onDateSelect = _a.onDateSelect, minNights = _a.minNights, maxNights = _a.maxNights, minDate = _a.minDate, maxDate = _a.maxDate, monthsToDisplay = _a.monthsToDisplay, dateProp = _a.date, _c = _a.disabledDates, disabledDates = _c === void 0 ? [] : _c, monthHeader = _a.monthHeader, disableNavigationOnDateBoundary = _a.disableNavigationOnDateBoundary;
    var rawNow = moment_1.default().startOf('month').toDate();
    var initDate = minDate ? moment_1.default(minDate, format, true).toDate() : rawNow;
    var monthGap = monthsToDisplay || 1;
    var _d = react_1.useState('test'), t = _d[0], setT = _d[1];
    var _e = react_1.useState(''), date = _e[0], setDate = _e[1];
    var _f = react_1.useState(''), startDate = _f[0], setStartDate = _f[1];
    var _g = react_1.useState(''), endDate = _g[0], setEndDate = _g[1];
    var _h = react_1.useState(false), hasSelectedFirstRange = _h[0], setHasSelectedFirstRange = _h[1];
    var _j = react_1.useState(''), hoverDate = _j[0], setHoverDate = _j[1];
    var _k = react_1.useState([]), prevPaneMonths = _k[0], setPrevPaneMonths = _k[1];
    var _l = react_1.useState([]), currPaneMonths = _l[0], setCurrPaneMonths = _l[1];
    var _m = react_1.useState([]), nextPaneMonths = _m[0], setNextPaneMonths = _m[1];
    var _o = react_1.useState(initDate), initialDate = _o[0], setInitialDate = _o[1];
    var _p = react_1.useState(moment_1.default(initDate, format, true)), defaultMonth = _p[0], setDefaultMonth = _p[1];
    var _q = react_1.useState(initDate.getMonth() + 1), defoMM = _q[0], setDefoMM = _q[1];
    var _r = react_1.useState(initDate.getFullYear()), defoYYYY = _r[0], setDefoYYYY = _r[1];
    var setMonth = function (month) {
        var initDate = initialDate.getDate();
        var daDate = initDate < 10 ? "0" + initDate : initDate;
        var convertedMonth = parseInt(month, 10);
        var daMonth = convertedMonth < 10 ? "0" + convertedMonth : convertedMonth;
        var daRawDate = daMonth + "-" + daDate + "-" + defoYYYY;
        var mNewDate = moment_1.default(daRawDate, format, true);
        //TODO: validate incoming selection vs date ranges between minDate and maxDate, decide either allow select the date throwing some warn or do not allow the selection
        setDefaultMonth(mNewDate);
        setDefoMM(month);
        setInitialDate(mNewDate.clone().startOf('month').toDate());
        buildMonthsPanes(mNewDate.clone().startOf('month').toDate());
    };
    var setYear = function (year) {
        var initMonth = defoMM;
        var initDate = initialDate.getDate();
        var daMonth = initMonth < 10 ? "0" + initMonth : initMonth;
        var daDate = initDate < 10 ? "0" + initDate : initDate;
        var daRawDate = daMonth + "-" + daDate + "-" + year;
        var mNewDate = moment_1.default(daRawDate, format, true);
        //TODO: validate incoming selection vs date ranges between minDate and maxDate, decide either allow select the date throwing some warn or do not allow the selection
        setDefaultMonth(mNewDate);
        setDefoYYYY(year);
        setInitialDate(mNewDate.clone().startOf('month').toDate());
        buildMonthsPanes(mNewDate.clone().startOf('month').toDate());
    };
    var whatCalendarHeader = function (mm) {
        return monthHeader ? (monthHeader({ setMonth: setMonth, setYear: setYear, month: mm })) : (react_1.default.createElement(react_1.default.Fragment, null,
            mm.format('MMMM'),
            " ",
            mm.format('YYYY')));
    };
    var saveDate = function (newDate) {
        if (dateRange) {
            var mNewDate = moment_1.default(newDate);
            var mStartDate = moment_1.default(startDate);
            var mEndDate = moment_1.default(endDate);
            var returnRange = {
                startDate: startDate,
                endDate: endDate,
            };
            if (!hasSelectedFirstRange && !mNewDate.isSame(mEndDate)) {
                // if user has NOT selected any first date and newdate is NOT the same as endDate
                if (mNewDate.isAfter(mEndDate)) {
                    // user has selected a date that is past endDate, so we reset a new
                    // selection in the date range, set endDate as empty then...
                    setEndDate('');
                    returnRange.endDate = '';
                }
                // ... then set normally the new date as startDate
                if (!hasDateRangeDisabled(newDate, startDate)) {
                    setStartDate(newDate);
                    setHasSelectedFirstRange(true);
                    returnRange.startDate = newDate;
                }
                else {
                    setStartDate('');
                    setEndDate('');
                    setHasSelectedFirstRange(false);
                    returnRange.startDate = '';
                    returnRange.endDate = '';
                }
                if (minNights || maxNights) {
                    setEndDate('');
                    returnRange.endDate = '';
                }
            }
            else if (!mNewDate.isSame(mStartDate)) {
                // if new date is NOT the same as startDate
                if (mNewDate.isBefore(mStartDate)) {
                    // Invert selection as the user has selected a new date that is before
                    // previously selected date
                    if (!hasDateRangeDisabled(newDate, startDate)) {
                        setStartDate(newDate);
                        setEndDate(startDate);
                        returnRange.startDate = newDate;
                        returnRange.endDate = startDate;
                    }
                }
                else {
                    // welp, this is before startDate so normally set it as endDate
                    if (!hasDateRangeDisabled(startDate, newDate)) {
                        setEndDate(newDate);
                        returnRange.endDate = newDate;
                    }
                }
                setHasSelectedFirstRange(false);
            }
            onDateSelect(returnRange);
        }
        else {
            setDate(newDate);
            onDateSelect(newDate);
        }
    };
    var saveHoverDate = function (newDate) {
        setHoverDate(newDate);
    };
    var getDate = function () { return date; };
    var getDateRange = function () {
        return {
            startDate: startDate,
            endDate: endDate,
        };
    };
    var isDateRange = dateRange ? true : false;
    var isDateInDisabled = function (theDate) {
        var mTheDate = moment_1.default(theDate);
        var ret = false;
        if (disabledDates.length > 0) {
            ret =
                disabledDates.filter(function (date) { return moment_1.default(date, format, true).isSame(mTheDate); })
                    .length > 0;
        }
        return ret;
    };
    var hasDateRangeDisabled = function (start, end) {
        var mStartDate = moment_1.default(start);
        var mEndDate = moment_1.default(end);
        var selectable = false;
        if (mStartDate.isValid() && mEndDate.isValid()) {
            while (!selectable && mStartDate.isBefore(mEndDate)) {
                mStartDate.add(1, 'day');
                selectable = isDateInDisabled(mStartDate.toDate());
            }
        }
        return selectable;
    };
    var getMinSelectableDate = function () {
        var mMinDate = moment_1.default(minDate, format, true);
        var ret = moment_1.default();
        var selectable = true;
        while (selectable) {
            mMinDate.add(1, 'days');
            ret = mMinDate;
            selectable = isDateInDisabled(mMinDate.toDate());
        }
        return ret;
    };
    var getMaxSelectableDate = function () {
        var mMaxDate = moment_1.default(maxDate, format, true);
        var ret = moment_1.default();
        var selectable = true;
        while (selectable) {
            mMaxDate.subtract(1, 'days');
            ret = mMaxDate;
            selectable = isDateInDisabled(mMaxDate.toDate());
        }
        return ret;
    };
    var isDateSelectable = function (theDate) {
        var mTheDate = moment_1.default(theDate);
        var mMinDate = moment_1.default(minDate, format, true);
        var mMaxDate = moment_1.default(maxDate, format, true);
        var mStartDate = moment_1.default(startDate);
        var minNites = minNights || -99999;
        var maxNites = maxNights || 99999;
        var dateIsAfterMinDate = true;
        var dateIsBeforeMaxDate = true;
        var foundInDisabledDates = true;
        var dateIsBetweenNightRange = true;
        // if this date belongs in disableDates
        foundInDisabledDates = !isDateInDisabled(theDate);
        // if only mindate is sent
        if (mMinDate.isValid()) {
            dateIsAfterMinDate = mTheDate.isSameOrAfter(mMinDate);
        }
        // if only maxdate is sent
        if (mMaxDate.isValid()) {
            dateIsBeforeMaxDate = mTheDate.isSameOrBefore(mMaxDate);
        }
        // validations when calendar is dateRange
        if (isDateRange && mStartDate.isValid()) {
            // const mMinSelectableDate = getMinSelectableDate();
            var mMaxSelectableDate = getMaxSelectableDate();
            var lastDaySelected = mMaxSelectableDate.isSame(mStartDate);
            var mMinSelectableDate = lastDaySelected
                ? mStartDate.clone().subtract(maxNites, 'days')
                : mStartDate.clone().add(minNites, 'days');
            mMaxSelectableDate = lastDaySelected
                ? mStartDate.clone().subtract(minNites, 'days')
                : mStartDate.clone().add(maxNites, 'days');
            dateIsBetweenNightRange = mTheDate.isBetween(mMinSelectableDate, mMaxSelectableDate, 'days', '[]');
        }
        return (foundInDisabledDates &&
            dateIsAfterMinDate &&
            dateIsBeforeMaxDate &&
            dateIsBetweenNightRange);
    };
    var isDateSelected = function (theDate) {
        // is dateRange
        if (dateRange) {
            var mStartDate = moment_1.default(startDate);
            var mEndDate = moment_1.default(endDate);
            var mTheDate = moment_1.default(theDate);
            return mStartDate.isSame(mTheDate) || mEndDate.isSame(mTheDate);
        }
        else {
            // is regular selector compare vs state: date value
            var mTheDate = moment_1.default(theDate);
            var mDate = moment_1.default(date);
            return mTheDate.isSame(mDate);
        }
    };
    var isDateWithinRange = function (theDate) {
        // is dateRange
        if (dateRange) {
            var mStartDate = moment_1.default(startDate);
            var mEndDate = moment_1.default(endDate);
            var mTheDate = moment_1.default(theDate);
            return mTheDate.isBetween(mStartDate, mEndDate);
        }
        return false;
    };
    var isSelectedDateStartDate = function (theDate) {
        // is dateRange
        if (dateRange) {
            var mStartDate = moment_1.default(startDate);
            var mTheDate = moment_1.default(theDate);
            return mStartDate.isSame(mTheDate);
        }
        return false;
    };
    var isSelectedDateEndDate = function (theDate) {
        // is dateRange
        if (dateRange) {
            var mEndDate = moment_1.default(endDate);
            var mTheDate = moment_1.default(theDate);
            return mEndDate.isSame(mTheDate);
        }
        return false;
    };
    var setDefaultDate = function () {
        if (dateRange && dateProp) {
            var _a = dateProp, startDate_1 = _a.startDate, endDate_1 = _a.endDate;
            setStartDate(moment_1.default(startDate_1, format, true).toDate());
            setEndDate(moment_1.default(endDate_1, format, true).toDate());
        }
        else {
            var theDate = dateProp;
            setDate(moment_1.default(theDate, format, true).toDate());
        }
    };
    var getPrevPaneMonths = function () { return prevPaneMonths; };
    var getCurrentPaneMonths = function () { return currPaneMonths; };
    var getNextPaneMonths = function () { return nextPaneMonths; };
    var canNavigateNext = function () {
        var mInitialDate = moment_1.default(initialDate).add(monthGap, 'months');
        var mMaxDate = moment_1.default(maxDate, format, true);
        if (disableNavigationOnDateBoundary) {
            return (mInitialDate.isSameOrBefore(mMaxDate) && disableNavigationOnDateBoundary);
        }
        else {
            return true;
        }
    };
    var moveNext = function () {
        var mInitialDate = moment_1.default(initialDate).add(monthGap, 'months');
        var canNavigate = canNavigateNext();
        if (canNavigate) {
            var newInitialDate = mInitialDate.toDate();
            setInitialDate(newInitialDate);
            buildMonthsPanes(newInitialDate);
        }
    };
    var canNavigatePrev = function () {
        var mInitialDate = moment_1.default(initialDate).subtract(monthGap, 'months');
        var mMinDate = moment_1.default(minDate, format, true);
        if (disableNavigationOnDateBoundary) {
            return (mInitialDate.isSameOrAfter(mMinDate) && disableNavigationOnDateBoundary);
        }
        else {
            return true;
        }
    };
    var movePrev = function () {
        var mInitialDate = moment_1.default(initialDate).subtract(monthGap, 'months');
        var canNavigate = canNavigatePrev();
        if (canNavigate) {
            var newInitialDate = mInitialDate.toDate();
            setInitialDate(newInitialDate);
            buildMonthsPanes(newInitialDate);
        }
    };
    var buildMonthsPanes = function (currentPaneMonth) {
        var cursorMonth = currentPaneMonth || initialDate;
        var mInitialCurrMonth = moment_1.default(cursorMonth);
        var mInitialPrevMonth = moment_1.default(cursorMonth).subtract(monthGap, 'months');
        var mInitialNextMonth = moment_1.default(cursorMonth).add(monthGap, 'months');
        var currPaneMonthsArr = [];
        var prevPaneMonthsArr = [];
        var nextPaneMonthArr = [];
        currPaneMonthsArr.push(mInitialCurrMonth);
        prevPaneMonthsArr.push(mInitialPrevMonth);
        nextPaneMonthArr.push(mInitialNextMonth);
        if (monthGap > 1) {
            for (var i = 1; i < monthGap; ++i) {
                currPaneMonthsArr.push(mInitialCurrMonth.clone().add(i, 'months'));
                prevPaneMonthsArr.push(mInitialPrevMonth.clone().add(i, 'months'));
                nextPaneMonthArr.push(mInitialNextMonth.clone().add(i, 'months'));
            }
        }
        setCurrPaneMonths(currPaneMonthsArr);
        setPrevPaneMonths(prevPaneMonthsArr);
        setNextPaneMonths(nextPaneMonthArr);
    };
    var isWeekend = function (date) {
        var weekday = moment_1.default(date).format('dddd').toLowerCase();
        return weekday === 'saturday' || weekday === 'sunday';
    };
    var getWeekdayName = function (date) { return moment_1.default(date).format('dddd').toLowerCase(); };
    react_1.useEffect(function () {
        setDefaultDate();
        buildMonthsPanes();
    }, [dateProp, disabledDates]);
    return (react_1.default.createElement(exports.CalendarContext.Provider, { value: {
            date: date,
            saveDate: saveDate,
            saveHoverDate: saveHoverDate,
            getDate: getDate,
            isDateRange: isDateRange,
            isDateSelectable: isDateSelectable,
            isDateSelected: isDateSelected,
            isDateWithinRange: isDateWithinRange,
            isSelectedDateStartDate: isSelectedDateStartDate,
            isSelectedDateEndDate: isSelectedDateEndDate,
            getDateRange: getDateRange,
            startDate: startDate,
            endDate: endDate,
            minNights: minNights,
            maxNights: maxNights,
            minDate: minDate,
            maxDate: maxDate,
            hoverDate: hoverDate,
            disabledDates: disabledDates,
            buildMonthsPanes: buildMonthsPanes,
            getPrevPaneMonths: getPrevPaneMonths,
            getCurrentPaneMonths: getCurrentPaneMonths,
            getNextPaneMonths: getNextPaneMonths,
            movePrev: movePrev,
            moveNext: moveNext,
            canNavigatePrev: canNavigatePrev,
            canNavigateNext: canNavigateNext,
            whatCalendarHeader: whatCalendarHeader,
            currPaneMonths: currPaneMonths,
            disableNavigationOnDateBoundary: disableNavigationOnDateBoundary,
            getWeekdayName: getWeekdayName,
            isWeekend: isWeekend,
        } }, children));
};
exports.default = CalendarProvider;
