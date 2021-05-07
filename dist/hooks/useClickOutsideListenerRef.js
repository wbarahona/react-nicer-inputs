"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickOutsideListenerRef = void 0;
var react_1 = require("react");
var useClickOutsideListenerRef = function (onClose) {
    var ref = react_1.useRef(null);
    var escapeListener = react_1.useCallback(function (e) {
        if (e.key === 'Escape') {
            onClose();
        }
    }, []);
    var clickListener = react_1.useCallback(function (e) {
        if (!ref.current.contains(e.target)) {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    }, [ref.current]);
    react_1.useEffect(function () {
        document.addEventListener('click', clickListener);
        document.addEventListener('keyup', escapeListener);
        return function () {
            document.removeEventListener('click', clickListener);
            document.removeEventListener('keyup', escapeListener);
        };
    }, []);
    return ref;
};
exports.useClickOutsideListenerRef = useClickOutsideListenerRef;
