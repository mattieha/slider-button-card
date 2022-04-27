/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
var twoDigitsOptional = "[1-9]\\d?";
var twoDigits = "\\d\\d";
var threeDigits = "\\d{3}";
var fourDigits = "\\d{4}";
var word = "[^\\s]+";
var literal = /\[([^]*?)\]/gm;
function shorten(arr, sLen) {
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        newArr.push(arr[i].substr(0, sLen));
    }
    return newArr;
}
var monthUpdate = function (arrName) { return function (v, i18n) {
    var lowerCaseArr = i18n[arrName].map(function (v) { return v.toLowerCase(); });
    var index = lowerCaseArr.indexOf(v.toLowerCase());
    if (index > -1) {
        return index;
    }
    return null;
}; };
function assign(origObj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var obj = args_1[_a];
        for (var key in obj) {
            // @ts-ignore ex
            origObj[key] = obj[key];
        }
    }
    return origObj;
}
var dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
var monthNamesShort = shorten(monthNames, 3);
var dayNamesShort = shorten(dayNames, 3);
var defaultI18n = {
    dayNamesShort: dayNamesShort,
    dayNames: dayNames,
    monthNamesShort: monthNamesShort,
    monthNames: monthNames,
    amPm: ["am", "pm"],
    DoFn: function (dayOfMonth) {
        return (dayOfMonth +
            ["th", "st", "nd", "rd"][dayOfMonth % 10 > 3
                ? 0
                : ((dayOfMonth - (dayOfMonth % 10) !== 10 ? 1 : 0) * dayOfMonth) % 10]);
    }
};
var globalI18n = assign({}, defaultI18n);
var setGlobalDateI18n = function (i18n) {
    return (globalI18n = assign(globalI18n, i18n));
};
var regexEscape = function (str) {
    return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
};
var pad = function (val, len) {
    if (len === void 0) { len = 2; }
    val = String(val);
    while (val.length < len) {
        val = "0" + val;
    }
    return val;
};
var formatFlags = {
    D: function (dateObj) { return String(dateObj.getDate()); },
    DD: function (dateObj) { return pad(dateObj.getDate()); },
    Do: function (dateObj, i18n) {
        return i18n.DoFn(dateObj.getDate());
    },
    d: function (dateObj) { return String(dateObj.getDay()); },
    dd: function (dateObj) { return pad(dateObj.getDay()); },
    ddd: function (dateObj, i18n) {
        return i18n.dayNamesShort[dateObj.getDay()];
    },
    dddd: function (dateObj, i18n) {
        return i18n.dayNames[dateObj.getDay()];
    },
    M: function (dateObj) { return String(dateObj.getMonth() + 1); },
    MM: function (dateObj) { return pad(dateObj.getMonth() + 1); },
    MMM: function (dateObj, i18n) {
        return i18n.monthNamesShort[dateObj.getMonth()];
    },
    MMMM: function (dateObj, i18n) {
        return i18n.monthNames[dateObj.getMonth()];
    },
    YY: function (dateObj) {
        return pad(String(dateObj.getFullYear()), 4).substr(2);
    },
    YYYY: function (dateObj) { return pad(dateObj.getFullYear(), 4); },
    h: function (dateObj) { return String(dateObj.getHours() % 12 || 12); },
    hh: function (dateObj) { return pad(dateObj.getHours() % 12 || 12); },
    H: function (dateObj) { return String(dateObj.getHours()); },
    HH: function (dateObj) { return pad(dateObj.getHours()); },
    m: function (dateObj) { return String(dateObj.getMinutes()); },
    mm: function (dateObj) { return pad(dateObj.getMinutes()); },
    s: function (dateObj) { return String(dateObj.getSeconds()); },
    ss: function (dateObj) { return pad(dateObj.getSeconds()); },
    S: function (dateObj) {
        return String(Math.round(dateObj.getMilliseconds() / 100));
    },
    SS: function (dateObj) {
        return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
    },
    SSS: function (dateObj) { return pad(dateObj.getMilliseconds(), 3); },
    a: function (dateObj, i18n) {
        return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
    },
    A: function (dateObj, i18n) {
        return dateObj.getHours() < 12
            ? i18n.amPm[0].toUpperCase()
            : i18n.amPm[1].toUpperCase();
    },
    ZZ: function (dateObj) {
        var offset = dateObj.getTimezoneOffset();
        return ((offset > 0 ? "-" : "+") +
            pad(Math.floor(Math.abs(offset) / 60) * 100 + (Math.abs(offset) % 60), 4));
    },
    Z: function (dateObj) {
        var offset = dateObj.getTimezoneOffset();
        return ((offset > 0 ? "-" : "+") +
            pad(Math.floor(Math.abs(offset) / 60), 2) +
            ":" +
            pad(Math.abs(offset) % 60, 2));
    }
};
var monthParse = function (v) { return +v - 1; };
var emptyDigits = [null, twoDigitsOptional];
var emptyWord = [null, word];
var amPm = [
    "isPm",
    word,
    function (v, i18n) {
        var val = v.toLowerCase();
        if (val === i18n.amPm[0]) {
            return 0;
        }
        else if (val === i18n.amPm[1]) {
            return 1;
        }
        return null;
    }
];
var timezoneOffset = [
    "timezoneOffset",
    "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
    function (v) {
        var parts = (v + "").match(/([+-]|\d\d)/gi);
        if (parts) {
            var minutes = +parts[1] * 60 + parseInt(parts[2], 10);
            return parts[0] === "+" ? minutes : -minutes;
        }
        return 0;
    }
];
var parseFlags = {
    D: ["day", twoDigitsOptional],
    DD: ["day", twoDigits],
    Do: ["day", twoDigitsOptional + word, function (v) { return parseInt(v, 10); }],
    M: ["month", twoDigitsOptional, monthParse],
    MM: ["month", twoDigits, monthParse],
    YY: [
        "year",
        twoDigits,
        function (v) {
            var now = new Date();
            var cent = +("" + now.getFullYear()).substr(0, 2);
            return +("" + (+v > 68 ? cent - 1 : cent) + v);
        }
    ],
    h: ["hour", twoDigitsOptional, undefined, "isPm"],
    hh: ["hour", twoDigits, undefined, "isPm"],
    H: ["hour", twoDigitsOptional],
    HH: ["hour", twoDigits],
    m: ["minute", twoDigitsOptional],
    mm: ["minute", twoDigits],
    s: ["second", twoDigitsOptional],
    ss: ["second", twoDigits],
    YYYY: ["year", fourDigits],
    S: ["millisecond", "\\d", function (v) { return +v * 100; }],
    SS: ["millisecond", twoDigits, function (v) { return +v * 10; }],
    SSS: ["millisecond", threeDigits],
    d: emptyDigits,
    dd: emptyDigits,
    ddd: emptyWord,
    dddd: emptyWord,
    MMM: ["month", word, monthUpdate("monthNamesShort")],
    MMMM: ["month", word, monthUpdate("monthNames")],
    a: amPm,
    A: amPm,
    ZZ: timezoneOffset,
    Z: timezoneOffset
};
// Some common format strings
var globalMasks = {
    default: "ddd MMM DD YYYY HH:mm:ss",
    shortDate: "M/D/YY",
    mediumDate: "MMM D, YYYY",
    longDate: "MMMM D, YYYY",
    fullDate: "dddd, MMMM D, YYYY",
    isoDate: "YYYY-MM-DD",
    isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
    shortTime: "HH:mm",
    mediumTime: "HH:mm:ss",
    longTime: "HH:mm:ss.SSS"
};
var setGlobalDateMasks = function (masks) { return assign(globalMasks, masks); };
/***
 * Format a date
 * @method format
 * @param {Date|number} dateObj
 * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
 * @returns {string} Formatted date string
 */
var format = function (dateObj, mask, i18n) {
    if (mask === void 0) { mask = globalMasks["default"]; }
    if (i18n === void 0) { i18n = {}; }
    if (typeof dateObj === "number") {
        dateObj = new Date(dateObj);
    }
    if (Object.prototype.toString.call(dateObj) !== "[object Date]" ||
        isNaN(dateObj.getTime())) {
        throw new Error("Invalid Date pass to format");
    }
    mask = globalMasks[mask] || mask;
    var literals = [];
    // Make literals inactive by replacing them with @@@
    mask = mask.replace(literal, function ($0, $1) {
        literals.push($1);
        return "@@@";
    });
    var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
    // Apply formatting rules
    mask = mask.replace(token, function ($0) {
        return formatFlags[$0](dateObj, combinedI18nSettings);
    });
    // Inline literal values back into the formatted value
    return mask.replace(/@@@/g, function () { return literals.shift(); });
};
/**
 * Parse a date string into a Javascript Date object /
 * @method parse
 * @param {string} dateStr Date string
 * @param {string} format Date parse format
 * @param {i18n} I18nSettingsOptional Full or subset of I18N settings
 * @returns {Date|null} Returns Date object. Returns null what date string is invalid or doesn't match format
 */
function parse(dateStr, format, i18n) {
    if (i18n === void 0) { i18n = {}; }
    if (typeof format !== "string") {
        throw new Error("Invalid format in fecha parse");
    }
    // Check to see if the format is actually a mask
    format = globalMasks[format] || format;
    // Avoid regular expression denial of service, fail early for really long strings
    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
    if (dateStr.length > 1000) {
        return null;
    }
    // Default to the beginning of the year.
    var today = new Date();
    var dateInfo = {
        year: today.getFullYear(),
        month: 0,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        isPm: null,
        timezoneOffset: null
    };
    var parseInfo = [];
    var literals = [];
    // Replace all the literals with @@@. Hopefully a string that won't exist in the format
    var newFormat = format.replace(literal, function ($0, $1) {
        literals.push(regexEscape($1));
        return "@@@";
    });
    var specifiedFields = {};
    var requiredFields = {};
    // Change every token that we find into the correct regex
    newFormat = regexEscape(newFormat).replace(token, function ($0) {
        var info = parseFlags[$0];
        var field = info[0], regex = info[1], requiredField = info[3];
        // Check if the person has specified the same field twice. This will lead to confusing results.
        if (specifiedFields[field]) {
            throw new Error("Invalid format. " + field + " specified twice in format");
        }
        specifiedFields[field] = true;
        // Check if there are any required fields. For instance, 12 hour time requires AM/PM specified
        if (requiredField) {
            requiredFields[requiredField] = true;
        }
        parseInfo.push(info);
        return "(" + regex + ")";
    });
    // Check all the required fields are present
    Object.keys(requiredFields).forEach(function (field) {
        if (!specifiedFields[field]) {
            throw new Error("Invalid format. " + field + " is required in specified format");
        }
    });
    // Add back all the literals after
    newFormat = newFormat.replace(/@@@/g, function () { return literals.shift(); });
    // Check if the date string matches the format. If it doesn't return null
    var matches = dateStr.match(new RegExp(newFormat, "i"));
    if (!matches) {
        return null;
    }
    var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
    // For each match, call the parser function for that date part
    for (var i = 1; i < matches.length; i++) {
        var _a = parseInfo[i - 1], field = _a[0], parser = _a[2];
        var value = parser
            ? parser(matches[i], combinedI18nSettings)
            : +matches[i];
        // If the parser can't make sense of the value, return null
        if (value == null) {
            return null;
        }
        dateInfo[field] = value;
    }
    if (dateInfo.isPm === 1 && dateInfo.hour != null && +dateInfo.hour !== 12) {
        dateInfo.hour = +dateInfo.hour + 12;
    }
    else if (dateInfo.isPm === 0 && +dateInfo.hour === 12) {
        dateInfo.hour = 0;
    }
    var dateWithoutTZ = new Date(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute, dateInfo.second, dateInfo.millisecond);
    var validateFields = [
        ["month", "getMonth"],
        ["day", "getDate"],
        ["hour", "getHours"],
        ["minute", "getMinutes"],
        ["second", "getSeconds"]
    ];
    for (var i = 0, len = validateFields.length; i < len; i++) {
        // Check to make sure the date field is within the allowed range. Javascript dates allows values
        // outside the allowed range. If the values don't match the value was invalid
        if (specifiedFields[validateFields[i][0]] &&
            dateInfo[validateFields[i][0]] !== dateWithoutTZ[validateFields[i][1]]()) {
            return null;
        }
    }
    if (dateInfo.timezoneOffset == null) {
        return dateWithoutTZ;
    }
    return new Date(Date.UTC(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute - dateInfo.timezoneOffset, dateInfo.second, dateInfo.millisecond));
}
var fecha = {
    format: format,
    parse: parse,
    defaultI18n: defaultI18n,
    setGlobalDateI18n: setGlobalDateI18n,
    setGlobalDateMasks: setGlobalDateMasks
};

(function(){try{(new Date).toLocaleDateString("i");}catch(e){return "RangeError"===e.name}return !1})()?function(e,t){return e.toLocaleDateString(t,{year:"numeric",month:"long",day:"numeric"})}:function(t){return fecha.format(t,"mediumDate")};(function(){try{(new Date).toLocaleString("i");}catch(e){return "RangeError"===e.name}return !1})()?function(e,t){return e.toLocaleString(t,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"haDateTime")};(function(){try{(new Date).toLocaleTimeString("i");}catch(e){return "RangeError"===e.name}return !1})()?function(e,t){return e.toLocaleTimeString(t,{hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"shortTime")};var h=function(e,t,a,r){void 0===r&&(r=!1),e._themes||(e._themes={});var n=t.default_theme;("default"===a||a&&t.themes[a])&&(n=a);var s=Object.assign({},e._themes);if("default"!==n){var i=t.themes[n];Object.keys(i).forEach(function(t){var a="--"+t;e._themes[a]="",s[a]=i[t];});}if(e.updateStyles?e.updateStyles(s):window.ShadyCSS&&window.ShadyCSS.styleSubtree(e,s),r){var o=document.querySelector("meta[name=theme-color]");if(o){o.hasAttribute("default-content")||o.setAttribute("default-content",o.getAttribute("content"));var c=s["--primary-color"]||o.getAttribute("default-content");o.setAttribute("content",c);}}};function f(e){return e.substr(0,e.indexOf("."))}function v(e){return f(e.entity_id)}var _="hass:bookmark",D=["closed","locked","off"],q=function(e,t,a,r){r=r||{},a=null==a?{}:a;var n=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=a,e.dispatchEvent(n),n},L={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function O(e,t){if(e in L)return L[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return "hass:bell-plus";case"armed_night":return "hass:bell-sleep";case"disarmed":return "hass:bell-outline";case"triggered":return "hass:bell-ring";default:return "hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return "closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return "hass:emoticon-dead";case"sleeping":return "hass:sleep";case"initializing":return "hass:timer-sand";default:return "hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),_}}var B=function(e){q(window,"haptic",e);},U=function(e,t,a){void 0===a&&(a=!1),a?history.replaceState(null,"",t):history.pushState(null,"",t),q(window,"location-changed",{replace:a});},V=function(e,t,a){void 0===a&&(a=!0);var r,n=f(t),s="group"===n?"homeassistant":n;switch(n){case"lock":r=a?"unlock":"lock";break;case"cover":r=a?"open_cover":"close_cover";break;default:r=a?"turn_on":"turn_off";}return e.callService(s,r,{entity_id:t})},W=function(e,t){var a=D.includes(e.states[t].state);return V(e,t,a)},Y=function(e,t,a,r){if(r||(r={action:"more-info"}),!r.confirmation||r.confirmation.exemptions&&r.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(B("warning"),confirm(r.confirmation.text||"Are you sure you want to "+r.action+"?")))switch(r.action){case"more-info":(a.entity||a.camera_image)&&q(e,"hass-more-info",{entityId:a.entity?a.entity:a.camera_image});break;case"navigate":r.navigation_path&&U(0,r.navigation_path);break;case"url":r.url_path&&window.open(r.url_path);break;case"toggle":a.entity&&(W(t,a.entity),B("success"));break;case"call-service":if(!r.service)return void B("failure");var n=r.service.split(".",2);t.callService(n[0],n[1],r.service_data),B("success");break;case"fire-dom-event":q(e,"ll-custom",r);}},G=function(e,t,a,r){var n;"double_tap"===r&&a.double_tap_action?n=a.double_tap_action:"hold"===r&&a.hold_action?n=a.hold_action:"tap"===r&&a.tap_action&&(n=a.tap_action),Y(e,t,a,n);};function K(e,t,a){if(t.has("config")||a)return !0;if(e.config.entity){var r=t.get("hass");return !r||r.states[e.config.entity]!==e.hass.states[e.config.entity]}return !1}var Z={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},$={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return O("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Z)return Z[t];if("battery"===t){var a=Number(e.state);if(isNaN(a))return "hass:battery-unknown";var r=10*Math.round(a/10);return r>=100?"hass:battery":r<=0?"hass:battery-alert":"hass:battery-"+r}var n=e.attributes.unit_of_measurement;return "°C"===n||"°F"===n?"hass:thermometer":O("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?O("input_datetime"):"hass:calendar":"hass:clock"}},ee=function(e){if(!e)return _;if(e.attributes.icon)return e.attributes.icon;var t=f(e.entity_id);return t in $?$[t](e):O(t,e.state)};

var toStringFunction = Function.prototype.toString;
var create = Object.create, defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols, getPrototypeOf = Object.getPrototypeOf;
var _a$1 = Object.prototype, hasOwnProperty = _a$1.hasOwnProperty, propertyIsEnumerable = _a$1.propertyIsEnumerable;
/**
 * @enum
 *
 * @const {Object} SUPPORTS
 *
 * @property {boolean} SYMBOL_PROPERTIES are symbol properties supported
 * @property {boolean} WEAKMAP is WeakMap supported
 */
var SUPPORTS = {
    SYMBOL_PROPERTIES: typeof getOwnPropertySymbols === 'function',
    WEAKMAP: typeof WeakMap === 'function',
};
/**
 * @function createCache
 *
 * @description
 * get a new cache object to prevent circular references
 *
 * @returns the new cache object
 */
var createCache = function () {
    if (SUPPORTS.WEAKMAP) {
        return new WeakMap();
    }
    // tiny implementation of WeakMap
    var object = create({
        has: function (key) { return !!~object._keys.indexOf(key); },
        set: function (key, value) {
            object._keys.push(key);
            object._values.push(value);
        },
        get: function (key) { return object._values[object._keys.indexOf(key)]; },
    });
    object._keys = [];
    object._values = [];
    return object;
};
/**
 * @function getCleanClone
 *
 * @description
 * get an empty version of the object with the same prototype it has
 *
 * @param object the object to build a clean clone from
 * @param realm the realm the object resides in
 * @returns the empty cloned object
 */
var getCleanClone = function (object, realm) {
    if (!object.constructor) {
        return create(null);
    }
    var Constructor = object.constructor;
    var prototype = object.__proto__ || getPrototypeOf(object);
    if (Constructor === realm.Object) {
        return prototype === realm.Object.prototype ? {} : create(prototype);
    }
    if (~toStringFunction.call(Constructor).indexOf('[native code]')) {
        try {
            return new Constructor();
        }
        catch (_a) { }
    }
    return create(prototype);
};
/**
 * @function getObjectCloneLoose
 *
 * @description
 * get a copy of the object based on loose rules, meaning all enumerable keys
 * and symbols are copied, but property descriptors are not considered
 *
 * @param object the object to clone
 * @param realm the realm the object resides in
 * @param handleCopy the function that handles copying the object
 * @returns the copied object
 */
var getObjectCloneLoose = function (object, realm, handleCopy, cache) {
    var clone = getCleanClone(object, realm);
    // set in the cache immediately to be able to reuse the object recursively
    cache.set(object, clone);
    for (var key in object) {
        if (hasOwnProperty.call(object, key)) {
            clone[key] = handleCopy(object[key], cache);
        }
    }
    if (SUPPORTS.SYMBOL_PROPERTIES) {
        var symbols = getOwnPropertySymbols(object);
        var length_1 = symbols.length;
        if (length_1) {
            for (var index = 0, symbol = void 0; index < length_1; index++) {
                symbol = symbols[index];
                if (propertyIsEnumerable.call(object, symbol)) {
                    clone[symbol] = handleCopy(object[symbol], cache);
                }
            }
        }
    }
    return clone;
};
/**
 * @function getObjectCloneStrict
 *
 * @description
 * get a copy of the object based on strict rules, meaning all keys and symbols
 * are copied based on the original property descriptors
 *
 * @param object the object to clone
 * @param realm the realm the object resides in
 * @param handleCopy the function that handles copying the object
 * @returns the copied object
 */
var getObjectCloneStrict = function (object, realm, handleCopy, cache) {
    var clone = getCleanClone(object, realm);
    // set in the cache immediately to be able to reuse the object recursively
    cache.set(object, clone);
    var properties = SUPPORTS.SYMBOL_PROPERTIES
        ? getOwnPropertyNames(object).concat(getOwnPropertySymbols(object))
        : getOwnPropertyNames(object);
    var length = properties.length;
    if (length) {
        for (var index = 0, property = void 0, descriptor = void 0; index < length; index++) {
            property = properties[index];
            if (property !== 'callee' && property !== 'caller') {
                descriptor = getOwnPropertyDescriptor(object, property);
                if (descriptor) {
                    // Only clone the value if actually a value, not a getter / setter.
                    if (!descriptor.get && !descriptor.set) {
                        descriptor.value = handleCopy(object[property], cache);
                    }
                    try {
                        defineProperty(clone, property, descriptor);
                    }
                    catch (error) {
                        // Tee above can fail on node in edge cases, so fall back to the loose assignment.
                        clone[property] = descriptor.value;
                    }
                }
                else {
                    // In extra edge cases where the property descriptor cannot be retrived, fall back to
                    // the loose assignment.
                    clone[property] = handleCopy(object[property], cache);
                }
            }
        }
    }
    return clone;
};
/**
 * @function getRegExpFlags
 *
 * @description
 * get the flags to apply to the copied regexp
 *
 * @param regExp the regexp to get the flags of
 * @returns the flags for the regexp
 */
var getRegExpFlags = function (regExp) {
    var flags = '';
    if (regExp.global) {
        flags += 'g';
    }
    if (regExp.ignoreCase) {
        flags += 'i';
    }
    if (regExp.multiline) {
        flags += 'm';
    }
    if (regExp.unicode) {
        flags += 'u';
    }
    if (regExp.sticky) {
        flags += 'y';
    }
    return flags;
};

// utils
var isArray = Array.isArray;
var GLOBAL_THIS = (function () {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    if (console && console.error) {
        console.error('Unable to locate global object, returning "this".');
    }
})();
/**
 * @function copy
 *
 * @description
 * copy an object deeply as much as possible
 *
 * If `strict` is applied, then all properties (including non-enumerable ones)
 * are copied with their original property descriptors on both objects and arrays.
 *
 * The object is compared to the global constructors in the `realm` provided,
 * and the native constructor is always used to ensure that extensions of native
 * objects (allows in ES2015+) are maintained.
 *
 * @param object the object to copy
 * @param [options] the options for copying with
 * @param [options.isStrict] should the copy be strict
 * @param [options.realm] the realm (this) object the object is copied from
 * @returns the copied object
 */
function copy(object, options) {
    // manually coalesced instead of default parameters for performance
    var isStrict = !!(options && options.isStrict);
    var realm = (options && options.realm) || GLOBAL_THIS;
    var getObjectClone = isStrict
        ? getObjectCloneStrict
        : getObjectCloneLoose;
    /**
     * @function handleCopy
     *
     * @description
     * copy the object recursively based on its type
     *
     * @param object the object to copy
     * @returns the copied object
     */
    var handleCopy = function (object, cache) {
        if (!object || typeof object !== 'object') {
            return object;
        }
        if (cache.has(object)) {
            return cache.get(object);
        }
        var Constructor = object.constructor;
        // plain objects
        if (Constructor === realm.Object) {
            return getObjectClone(object, realm, handleCopy, cache);
        }
        var clone;
        // arrays
        if (isArray(object)) {
            // if strict, include non-standard properties
            if (isStrict) {
                return getObjectCloneStrict(object, realm, handleCopy, cache);
            }
            var length_1 = object.length;
            clone = new Constructor();
            cache.set(object, clone);
            for (var index = 0; index < length_1; index++) {
                clone[index] = handleCopy(object[index], cache);
            }
            return clone;
        }
        // dates
        if (object instanceof realm.Date) {
            return new Constructor(object.getTime());
        }
        // regexps
        if (object instanceof realm.RegExp) {
            clone = new Constructor(object.source, object.flags || getRegExpFlags(object));
            clone.lastIndex = object.lastIndex;
            return clone;
        }
        // maps
        if (realm.Map && object instanceof realm.Map) {
            clone = new Constructor();
            cache.set(object, clone);
            object.forEach(function (value, key) {
                clone.set(key, handleCopy(value, cache));
            });
            return clone;
        }
        // sets
        if (realm.Set && object instanceof realm.Set) {
            clone = new Constructor();
            cache.set(object, clone);
            object.forEach(function (value) {
                clone.add(handleCopy(value, cache));
            });
            return clone;
        }
        // blobs
        if (realm.Blob && object instanceof realm.Blob) {
            return object.slice(0, object.size, object.type);
        }
        // buffers (node-only)
        if (realm.Buffer && realm.Buffer.isBuffer(object)) {
            clone = realm.Buffer.allocUnsafe
                ? realm.Buffer.allocUnsafe(object.length)
                : new Constructor(object.length);
            cache.set(object, clone);
            object.copy(clone);
            return clone;
        }
        // arraybuffers / dataviews
        if (realm.ArrayBuffer) {
            // dataviews
            if (realm.ArrayBuffer.isView(object)) {
                clone = new Constructor(object.buffer.slice(0));
                cache.set(object, clone);
                return clone;
            }
            // arraybuffers
            if (object instanceof realm.ArrayBuffer) {
                clone = object.slice(0);
                cache.set(object, clone);
                return clone;
            }
        }
        // if the object cannot / should not be cloned, don't
        if (
        // promise-like
        typeof object.then === 'function' ||
            // errors
            object instanceof Error ||
            // weakmaps
            (realm.WeakMap && object instanceof realm.WeakMap) ||
            // weaksets
            (realm.WeakSet && object instanceof realm.WeakSet)) {
            return object;
        }
        // assume anything left is a custom constructor
        return getObjectClone(object, realm, handleCopy, cache);
    };
    return handleCopy(object, createCache());
}
// Adding reference to allow usage in CommonJS libraries compiled using TSC, which
// expects there to be a default property on the exported object. See
// [#37](https://github.com/planttheidea/fast-copy/issues/37) for details.
copy.default = copy;
/**
 * @function strictCopy
 *
 * @description
 * copy the object with `strict` option pre-applied
 *
 * @param object the object to copy
 * @param [options] the options for copying with
 * @param [options.realm] the realm (this) object the object is copied from
 * @returns the copied object
 */
copy.strict = function strictCopy(object, options) {
    return copy(object, {
        isStrict: true,
        realm: options ? options.realm : void 0,
    });
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = 
// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (isTemplatePartActive(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari does not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes &&
    trustedTypes.createPolicy('lit-html', { createHTML: (s) => s });
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment position.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        let value = this.getHTML();
        if (policy !== undefined) {
            // this is secure because `this.strings` is a TemplateStringsArray.
            // TODO: validate this when
            // https://github.com/tc39/proposal-array-is-template-object is
            // implemented.
            value = policy.createHTML(value);
        }
        template.innerHTML = value;
        return template;
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        const parts = this.parts;
        // If we're assigning an attribute via syntax like:
        //    attr="${foo}"  or  attr=${foo}
        // but not
        //    attr="${foo} ${bar}" or attr="${foo} baz"
        // then we don't want to coerce the attribute value into one long
        // string. Instead we want to just return the value itself directly,
        // so that sanitizeDOMValue can get the actual value rather than
        // String(value)
        // The exception is if v is an array, in which case we do want to smash
        // it together into a string without calling String() on the array.
        //
        // This also allows trusted values (when using TrustedTypes) being
        // assigned to DOM sinks without being stringified in the process.
        if (l === 1 && strings[0] === '' && strings[1] === '') {
            const v = parts[0].value;
            if (typeof v === 'symbol') {
                return String(v);
            }
            if (typeof v === 'string' || !isIterable(v)) {
                return v;
            }
        }
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render$1 = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.4.1');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new Template(result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                removeNodesFromTemplate(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName);
    // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.
    const templateElement = !!template ? template.element : document.createElement('template');
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    const { length } = styles;
    // If there are no styles, skip unnecessary work
    if (length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        //
        // ShadyCSS will only update styles containing @apply in the template
        // given to `prepareTemplateStyles`. If no lit Template was given,
        // ShadyCSS will not be able to update uses of @apply in any relevant
        // template. However, this is not a problem because we only create the
        // template for the purpose of supporting `prepareAdoptedCssText`,
        // which doesn't support @apply at all.
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    const content = templateElement.content;
    if (!!template) {
        insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
    }
    else {
        content.insertBefore(condensedStyle, content.firstChild);
    }
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');
    if (window.ShadyCSS.nativeShadow && style !== null) {
        // When in native Shadow DOM, ensure the style created by ShadyCSS is
        // included in initially rendered output (`renderedDOM`).
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else if (!!template) {
        // When no style is left in the template, parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // There can be no style in the template in 2 cases (1) when Shady DOM
        // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
        // is in use ShadyCSS removes the style if it contains no content.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        content.insertBefore(condensedStyle, content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        removeNodesFromTemplate(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render = (result, container, options) => {
    if (!options || typeof options !== 'object' || !options.scopeName) {
        throw new Error('The `scopeName` option is required.');
    }
    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping = compatibleShadyCSSVersion &&
        container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
        !!container.host;
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render$1(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = parts.get(renderContainer);
        parts.delete(renderContainer);
        // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
        // that should apply to `renderContainer` even if the rendered value is
        // not a TemplateInstance. However, it will only insert scoped styles
        // into the document if `prepareTemplateStyles` has already been called
        // for the given scope name.
        const template = part.value instanceof TemplateInstance ?
            part.value.template :
            undefined;
        prepareTemplateStyles(scopeName, renderContainer, template);
        removeNodes(container, container.firstChild);
        container.appendChild(renderContainer);
        parts.set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                // Type assert to adhere to Bazel's "must type assert JSON parse" rule.
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        const descriptor = this.getPropertyDescriptor(name, key, options);
        if (descriptor !== undefined) {
            Object.defineProperty(this.prototype, name, descriptor);
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */
    static getPropertyDescriptor(name, key, options) {
        return {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                return this[key];
            },
            set(value) {
                const oldValue = this[name];
                this[key] = value;
                this
                    .requestUpdateInternal(name, oldValue, options);
            },
            configurable: true,
            enumerable: true
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */
    static getPropertyOptions(name) {
        return this._classProperties && this._classProperties.get(name) ||
            defaultPropertyDeclaration;
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (!superCtor.hasOwnProperty(finalized)) {
            superCtor.finalize();
        }
        this[finalized] = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._updateState = 0;
        this._updatePromise =
            new Promise((res) => this._enableUpdatingResolver = res);
        this._changedProperties = new Map();
        this._saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this.requestUpdateInternal();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        // Ensure first connection completes an update. Updates cannot complete
        // before connection.
        this.enableUpdating();
    }
    enableUpdating() {
        if (this._enableUpdatingResolver !== undefined) {
            this._enableUpdatingResolver();
            this._enableUpdatingResolver = undefined;
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        // tslint:disable-next-line:no-unnecessary-type-assertion
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor.getPropertyOptions(propName);
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * This protected version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    requestUpdateInternal(name, oldValue, options) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            const ctor = this.constructor;
            options = options || ctor.getPropertyOptions(name);
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._updatePromise = this._enqueueUpdate();
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name, oldValue) {
        this.requestUpdateInternal(name, oldValue);
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this._updatePromise;
        }
        catch (e) {
            // Ignore any previous errors. We only care that the previous cycle is
            // done. Any error should have been handled in the previous update.
        }
        const result = this.performUpdate();
        // If `performUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this._hasRequestedUpdate;
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */
    performUpdate() {
        // Abort any update if one is not pending when this is called.
        // This can happen if `performUpdate` is called early to "flush"
        // the update.
        if (!this._hasRequestedUpdate) {
            return;
        }
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            }
            else {
                this._markUpdated();
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this._markUpdated();
            throw e;
        }
        if (shouldUpdate) {
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     * @deprecated Override `getUpdateComplete()` instead for forward
     *     compatibility with `lit-element` 3.0 / `@lit/reactive-element`.
     */
    _getUpdateComplete() {
        return this.getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async getUpdateComplete() {
     *       await super.getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */
    getUpdateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
        this._markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement[_a] = true;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
    window.customElements.define(tagName, clazz);
    // Cast as any because TS doesn't recognize the return type as being a
    // subtype of the decorated class when clazz is typed as
    // `Constructor<HTMLElement>` for some reason.
    // `Constructor<HTMLElement>` is helpful to make sure the decorator is
    // applied to elements however.
    // tslint:disable-next-line:no-any
    return clazz;
};
const standardCustomElement = (tagName, descriptor) => {
    const { kind, elements } = descriptor;
    return {
        kind,
        elements,
        // This callback is called once the class is otherwise fully defined
        finisher(clazz) {
            window.customElements.define(tagName, clazz);
        }
    };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```
 * @customElement('my-element')
 * class MyElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The name of the custom element to define.
 */
const customElement = (tagName) => (classOrDescriptor) => (typeof classOrDescriptor === 'function') ?
    legacyCustomElement(tagName, classOrDescriptor) :
    standardCustomElement(tagName, classOrDescriptor);
const standardProperty = (options, element) => {
    // When decorating an accessor, pass it through and add property metadata.
    // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
    // stomp over the user's accessor.
    if (element.kind === 'method' && element.descriptor &&
        !('value' in element.descriptor)) {
        return Object.assign(Object.assign({}, element), { finisher(clazz) {
                clazz.createProperty(element.key, options);
            } });
    }
    else {
        // createProperty() takes care of defining the property, but we still
        // must return some kind of descriptor, so return a descriptor for an
        // unused prototype field. The finisher calls createProperty().
        return {
            kind: 'field',
            key: Symbol(),
            placement: 'own',
            descriptor: {},
            // When @babel/plugin-proposal-decorators implements initializers,
            // do this instead of the initializer below. See:
            // https://github.com/babel/babel/issues/9260 extras: [
            //   {
            //     kind: 'initializer',
            //     placement: 'own',
            //     initializer: descriptor.initializer,
            //   }
            // ],
            initializer() {
                if (typeof element.initializer === 'function') {
                    this[element.key] = element.initializer.call(this);
                }
            },
            finisher(clazz) {
                clazz.createProperty(element.key, options);
            }
        };
    }
};
const legacyProperty = (options, proto, name) => {
    proto.constructor
        .createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
 * supplied to configure property features.
 *
 * This decorator should only be used for public fields. Private or protected
 * fields should use the [[`internalProperty`]] decorator.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @property({ type: Boolean })
 *   clicked = false;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */
function property(options) {
    // tslint:disable-next-line:no-any decorator
    return (protoOrDescriptor, name) => (name !== undefined) ?
        legacyProperty(options, protoOrDescriptor, name) :
        standardProperty(options, protoOrDescriptor);
}
/**
 * Declares a private or protected property that still triggers updates to the
 * element when it changes.
 *
 * Properties declared this way must not be used from HTML or HTML templating
 * systems, they're solely for properties internal to the element. These
 * properties may be renamed by optimization tools like the Closure Compiler.
 * @category Decorator
 * @deprecated `internalProperty` has been renamed to `state` in lit-element
 *     3.0. Please update to `state` now to be compatible with 3.0.
 */
function internalProperty(options) {
    return property({ attribute: false, hasChanged: options === null || options === void 0 ? void 0 : options.hasChanged });
}
/**
 * Declares a private or protected property that still triggers updates to the
 * element when it changes.
 *
 * Properties declared this way must not be used from HTML or HTML templating
 * systems, they're solely for properties internal to the element. These
 * properties may be renamed by optimization tools like the Closure Compiler.
 * @category Decorator
 */
const state$9 = (options) => internalProperty(options);
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 * @param cache An optional boolean which when true performs the DOM query only
 * once and caches the result.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 *
 * ```ts
 * class MyElement {
 *   @query('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */
function query(selector, cache) {
    return (protoOrDescriptor, 
    // tslint:disable-next-line:no-any decorator
    name) => {
        const descriptor = {
            get() {
                return this.renderRoot.querySelector(selector);
            },
            enumerable: true,
            configurable: true,
        };
        if (cache) {
            const prop = name !== undefined ? name : protoOrDescriptor.key;
            const key = typeof prop === 'symbol' ? Symbol() : `__${prop}`;
            descriptor.get = function () {
                if (this[key] === undefined) {
                    (this[key] =
                        this.renderRoot.querySelector(selector));
                }
                return this[key];
            };
        }
        return (name !== undefined) ?
            legacyQuery(descriptor, protoOrDescriptor, name) :
            standardQuery(descriptor, protoOrDescriptor);
    };
}
const legacyQuery = (descriptor, proto, name) => {
    Object.defineProperty(proto, name, descriptor);
};
const standardQuery = (descriptor, element) => ({
    kind: 'method',
    placement: 'prototype',
    key: element.key,
    descriptor,
});

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = (window.ShadowRoot) &&
    (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
    ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken) {
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        if (this._styleSheet === undefined) {
            // Note, if `supportsAdoptingStyleSheets` is true then we assume
            // CSSStyleSheet is constructable.
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            }
            else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
const unsafeCSS = (value) => {
    return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
        return value.cssText;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
};
/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */
const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.5.1');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */
const renderNotImplemented = {};
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */
class LitElement extends UpdatingElement {
    /**
     * Return the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * @nocollapse
     */
    static getStyles() {
        return this.styles;
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Only gather styles once per class
        if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
            return;
        }
        // Take care not to call `this.getStyles()` multiple times since this
        // generates new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.getStyles();
        if (Array.isArray(userStyles)) {
            // De-duplicate styles preserving the _last_ instance in the set.
            // This is a performance optimization to avoid duplicated styles that can
            // occur especially when composing via subclassing.
            // The last item is kept to try to preserve the cascade order with the
            // assumption that it's most important that last added styles override
            // previous styles.
            const addStyles = (styles, set) => styles.reduceRight((set, s) => 
            // Note: On IE set.add() does not return the set
            Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set);
            // Array.from does not work on Set in IE, otherwise return
            // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
            const set = addStyles(userStyles, new Set());
            const styles = [];
            set.forEach((v) => styles.unshift(v));
            this._styles = styles;
        }
        else {
            this._styles = userStyles === undefined ? [] : [userStyles];
        }
        // Ensure that there are no invalid CSSStyleSheet instances here. They are
        // invalid in two conditions.
        // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
        //     this is impossible to check except via .replaceSync or use
        // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
        //     false)
        this._styles = this._styles.map((s) => {
            if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
                // Flatten the cssText from the passed constructible stylesheet (or
                // undetectable non-constructible stylesheet). The user might have
                // expected to update their stylesheets over time, but the alternative
                // is a crash.
                const cssText = Array.prototype.slice.call(s.cssRules)
                    .reduce((css, rule) => css + rule.cssText, '');
                return unsafeCSS(cssText);
            }
            return s;
        });
    }
    /**
     * Performs element initialization. By default this calls
     * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
     * captures any pre-set values for registered properties.
     */
    initialize() {
        super.initialize();
        this.constructor._getUniqueStyles();
        this.renderRoot = this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow(this.constructor.shadowRootOptions);
    }
    /**
     * Applies styling to the element shadowRoot using the [[`styles`]]
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (supportsAdoptingStyleSheets) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const templateResult = this.render();
        super.update(changedProperties);
        // If render is not implemented by the component, don't call lit-html render
        if (templateResult !== renderNotImplemented) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `NodePart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     */
    render() {
        return renderNotImplemented;
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */
LitElement['finalized'] = true;
/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */
LitElement.render = render;
/** @nocollapse */
LitElement.shadowRootOptions = { mode: 'open' };

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IE11 doesn't support classList on SVG elements, so we emulate it with a Set
class ClassList {
    constructor(element) {
        this.classes = new Set();
        this.changed = false;
        this.element = element;
        const classList = (element.getAttribute('class') || '').split(/\s+/);
        for (const cls of classList) {
            this.classes.add(cls);
        }
    }
    add(cls) {
        this.classes.add(cls);
        this.changed = true;
    }
    remove(cls) {
        this.classes.delete(cls);
        this.changed = true;
    }
    commit() {
        if (this.changed) {
            let classString = '';
            this.classes.forEach((cls) => classString += cls + ' ');
            this.element.setAttribute('class', classString);
        }
    }
}
/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */
const previousClassesCache = new WeakMap();
/**
 * A directive that applies CSS classes. This must be used in the `class`
 * attribute and must be the only part used in the attribute. It takes each
 * property in the `classInfo` argument and adds the property name to the
 * element's `class` if the property value is truthy; if the property value is
 * falsey, the property name is removed from the element's `class`. For example
 * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
 * @param classInfo {ClassInfo}
 */
const classMap = directive((classInfo) => (part) => {
    if (!(part instanceof AttributePart) || (part instanceof PropertyPart) ||
        part.committer.name !== 'class' || part.committer.parts.length > 1) {
        throw new Error('The `classMap` directive must be used in the `class` attribute ' +
            'and must be the only part in the attribute.');
    }
    const { committer } = part;
    const { element } = committer;
    let previousClasses = previousClassesCache.get(part);
    if (previousClasses === undefined) {
        // Write static classes once
        // Use setAttribute() because className isn't a string on SVG elements
        element.setAttribute('class', committer.strings.join(' '));
        previousClassesCache.set(part, previousClasses = new Set());
    }
    const classList = (element.classList || new ClassList(element));
    // Remove old classes that no longer apply
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousClasses.forEach((name) => {
        if (!(name in classInfo)) {
            classList.remove(name);
            previousClasses.delete(name);
        }
    });
    // Add or remove classes based on their classMap value
    for (const name in classInfo) {
        const value = classInfo[name];
        if (value != previousClasses.has(name)) {
            // We explicitly want a loose truthy check of `value` because it seems
            // more convenient that '' and 0 are skipped.
            if (value) {
                classList.add(name);
                previousClasses.add(name);
            }
            else {
                classList.remove(name);
                previousClasses.delete(name);
            }
        }
    }
    if (typeof classList.commit === 'function') {
        classList.commit();
    }
});

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const previousValues = new WeakMap();
/**
 * For AttributeParts, sets the attribute if the value is defined and removes
 * the attribute if the value is undefined.
 *
 * For other part types, this directive is a no-op.
 */
const ifDefined = directive((value) => (part) => {
    const previousValue = previousValues.get(part);
    if (value === undefined && part instanceof AttributePart) {
        // If the value is undefined, remove the attribute, but only if the value
        // was previously defined.
        if (previousValue !== undefined || !previousValues.has(part)) {
            const name = part.committer.name;
            part.committer.element.removeAttribute(name);
        }
    }
    else if (value !== previousValue) {
        part.setValue(value);
    }
    previousValues.set(part, value);
});

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Stores the StyleInfo object applied to a given AttributePart.
 * Used to unset existing values when a new StyleInfo object is applied.
 */
const previousStylePropertyCache = new WeakMap();
/**
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the `styleInfo`
 * object and adds the property values as CSS properties. Property names with
 * dashes (`-`) are assumed to be valid CSS property names and set on the
 * element's style object using `setProperty()`. Names without dashes are
 * assumed to be camelCased JavaScript property names and set on the element's
 * style object using property assignment, allowing the style object to
 * translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo {StyleInfo}
 */
const styleMap = directive((styleInfo) => (part) => {
    if (!(part instanceof AttributePart) || (part instanceof PropertyPart) ||
        part.committer.name !== 'style' || part.committer.parts.length > 1) {
        throw new Error('The `styleMap` directive must be used in the style attribute ' +
            'and must be the only part in the attribute.');
    }
    const { committer } = part;
    const { style } = committer.element;
    let previousStyleProperties = previousStylePropertyCache.get(part);
    if (previousStyleProperties === undefined) {
        // Write static styles once
        style.cssText = committer.strings.join(' ');
        previousStylePropertyCache.set(part, previousStyleProperties = new Set());
    }
    // Remove old properties that no longer exist in styleInfo
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousStyleProperties.forEach((name) => {
        if (!(name in styleInfo)) {
            previousStyleProperties.delete(name);
            if (name.indexOf('-') === -1) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style[name] = null;
            }
            else {
                style.removeProperty(name);
            }
        }
    });
    // Add or update properties
    for (const name in styleInfo) {
        previousStyleProperties.add(name);
        if (name.indexOf('-') === -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style[name] = styleInfo[name];
        }
        else {
            style.setProperty(name, styleInfo[name]);
        }
    }
});

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
class ActionHandler extends HTMLElement {
    constructor() {
        super();
        this.holdTime = 500;
        this.held = false;
        this.ripple = document.createElement('mwc-ripple');
    }
    connectedCallback() {
        Object.assign(this.style, {
            position: 'absolute',
            width: isTouch ? '100px' : '50px',
            height: isTouch ? '100px' : '50px',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: '999',
        });
        this.appendChild(this.ripple);
        this.ripple.primary = true;
        ['touchcancel', 'mouseout', 'mouseup', 'touchmove', 'mousewheel', 'wheel', 'scroll'].forEach(ev => {
            document.addEventListener(ev, () => {
                clearTimeout(this.timer);
                this.stopAnimation();
                this.timer = undefined;
            }, { passive: true });
        });
    }
    bind(element, options) {
        if (element.actionHandler) {
            return;
        }
        element.actionHandler = true;
        element.addEventListener('contextmenu', (ev) => {
            const e = ev || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
            e.returnValue = false;
            return false;
        });
        const start = (ev) => {
            this.held = false;
            let x;
            let y;
            if (ev.touches) {
                x = ev.touches[0].pageX;
                y = ev.touches[0].pageY;
            }
            else {
                x = ev.pageX;
                y = ev.pageY;
            }
            this.timer = window.setTimeout(() => {
                this.startAnimation(x, y);
                this.held = true;
            }, this.holdTime);
        };
        const end = (ev) => {
            // Prevent mouse event if touch event
            ev.preventDefault();
            if (['touchend', 'touchcancel'].includes(ev.type) && this.timer === undefined) {
                return;
            }
            clearTimeout(this.timer);
            this.stopAnimation();
            this.timer = undefined;
            if (this.held) {
                q(element, 'action', { action: 'hold' });
            }
            else if (options.hasDoubleClick) {
                if ((ev.type === 'click' && ev.detail < 2) || !this.dblClickTimeout) {
                    this.dblClickTimeout = window.setTimeout(() => {
                        this.dblClickTimeout = undefined;
                        q(element, 'action', { action: 'tap' });
                    }, 250);
                }
                else {
                    clearTimeout(this.dblClickTimeout);
                    this.dblClickTimeout = undefined;
                    q(element, 'action', { action: 'double_tap' });
                }
            }
            else {
                q(element, 'action', { action: 'tap' });
            }
        };
        const handleEnter = (ev) => {
            if (ev.keyCode !== 13) {
                return;
            }
            end(ev);
        };
        element.addEventListener('touchstart', start, { passive: true });
        element.addEventListener('touchend', end);
        element.addEventListener('touchcancel', end);
        element.addEventListener('mousedown', start, { passive: true });
        element.addEventListener('click', end);
        element.addEventListener('keyup', handleEnter);
    }
    startAnimation(x, y) {
        Object.assign(this.style, {
            left: `${x}px`,
            top: `${y}px`,
            display: null,
        });
        this.ripple.disabled = false;
        this.ripple.active = true;
        this.ripple.unbounded = true;
    }
    stopAnimation() {
        this.ripple.active = false;
        this.ripple.disabled = true;
        this.style.display = 'none';
    }
}
// TODO You need to replace all instances of "action-handler-boilerplate" with "action-handler-<your card name>"
customElements.define('action-handler-slider-button', ActionHandler);
const getActionHandler = () => {
    const body = document.body;
    if (body.querySelector('action-handler-slider-button')) {
        return body.querySelector('action-handler-slider-button');
    }
    const actionhandler = document.createElement('action-handler-slider-button');
    body.appendChild(actionhandler);
    return actionhandler;
};
const actionHandlerBind = (element, options) => {
    const actionhandler = getActionHandler();
    if (!actionhandler) {
        return;
    }
    actionhandler.bind(element, options);
};
const actionHandler = directive((options = {}) => (part) => {
    actionHandlerBind(part.committer.element, options);
});

var version = "1.10.3";

const CARD_VERSION = version;

var ActionButtonMode;
(function (ActionButtonMode) {
    ActionButtonMode["TOGGLE"] = "toggle";
    ActionButtonMode["CUSTOM"] = "custom";
})(ActionButtonMode || (ActionButtonMode = {}));
var SliderDirections;
(function (SliderDirections) {
    SliderDirections["LEFT_RIGHT"] = "left-right";
    SliderDirections["TOP_BOTTOM"] = "top-bottom";
    SliderDirections["BOTTOM_TOP"] = "bottom-top";
})(SliderDirections || (SliderDirections = {}));
var SliderBackground;
(function (SliderBackground) {
    SliderBackground["SOLID"] = "solid";
    SliderBackground["GRADIENT"] = "gradient";
    SliderBackground["TRIANGLE"] = "triangle";
    SliderBackground["STRIPED"] = "striped";
    SliderBackground["CUSTOM"] = "custom";
})(SliderBackground || (SliderBackground = {}));
var Domain;
(function (Domain) {
    Domain["LIGHT"] = "light";
    Domain["SWITCH"] = "switch";
    Domain["FAN"] = "fan";
    Domain["COVER"] = "cover";
    Domain["INPUT_BOOLEAN"] = "input_boolean";
    Domain["INPUT_NUMBER"] = "input_number";
    Domain["MEDIA_PLAYER"] = "media_player";
    Domain["CLIMATE"] = "climate";
    Domain["LOCK"] = "lock";
})(Domain || (Domain = {}));
const ActionButtonConfigDefault = {
    mode: ActionButtonMode.TOGGLE,
    icon: 'mdi:power',
    show: true,
    show_spinner: true,
    tap_action: {
        action: 'toggle'
    },
};
const IconConfigDefault = {
    show: true,
    use_state_color: true,
    tap_action: {
        action: 'more-info'
    },
};
const SliderConfigDefault = {
    direction: SliderDirections.LEFT_RIGHT,
    background: SliderBackground.SOLID,
    use_percentage_bg_opacity: false,
    use_state_color: false,
    show_track: false,
    toggle_on_click: false,
    force_square: false,
};
const SliderConfigDefaultDomain = new Map([
    [Domain.LIGHT, {
            direction: SliderDirections.LEFT_RIGHT,
            background: SliderBackground.GRADIENT,
            use_state_color: true,
            use_percentage_bg_opacity: false,
            show_track: false,
            toggle_on_click: false,
            force_square: false,
        }],
    [Domain.FAN, {
            direction: SliderDirections.LEFT_RIGHT,
            background: SliderBackground.SOLID,
            use_state_color: false,
            use_percentage_bg_opacity: false,
            show_track: false,
            toggle_on_click: false,
            force_square: false,
        }],
    [Domain.SWITCH, {
            direction: SliderDirections.LEFT_RIGHT,
            background: SliderBackground.SOLID,
            use_state_color: false,
            use_percentage_bg_opacity: false,
            show_track: false,
            toggle_on_click: true,
            force_square: false,
        }],
    [Domain.COVER, {
            direction: SliderDirections.TOP_BOTTOM,
            background: SliderBackground.STRIPED,
            use_state_color: false,
            use_percentage_bg_opacity: false,
            toggle_on_click: false,
            show_track: false,
            force_square: false,
            invert: true,
        }],
    [Domain.INPUT_BOOLEAN, {
            direction: SliderDirections.LEFT_RIGHT,
            background: SliderBackground.SOLID,
            use_state_color: false,
            use_percentage_bg_opacity: false,
            show_track: false,
            toggle_on_click: true,
            force_square: false,
        }],
    [Domain.INPUT_NUMBER, {
            direction: SliderDirections.LEFT_RIGHT,
            background: SliderBackground.SOLID,
            use_state_color: false,
            use_percentage_bg_opacity: false,
            show_track: false,
            toggle_on_click: false,
            force_square: false,
        }],
    [Domain.MEDIA_PLAYER, {
            direction: SliderDirections.LEFT_RIGHT,
            background: SliderBackground.TRIANGLE,
            use_state_color: false,
            use_percentage_bg_opacity: false,
            show_track: true,
            toggle_on_click: false,
            force_square: false,
        }],
    [Domain.LOCK, {
            direction: SliderDirections.LEFT_RIGHT,
            background: SliderBackground.SOLID,
            use_state_color: false,
            use_percentage_bg_opacity: false,
            show_track: false,
            toggle_on_click: true,
            force_square: false,
        }],
    [Domain.CLIMATE, {
            direction: SliderDirections.LEFT_RIGHT,
            background: SliderBackground.TRIANGLE,
            use_state_color: false,
            use_percentage_bg_opacity: false,
            show_track: true,
            toggle_on_click: false,
            force_square: false,
        }],
]);
var LightAttributes;
(function (LightAttributes) {
    LightAttributes["COLOR_TEMP"] = "color_temp";
    LightAttributes["BRIGHTNESS"] = "brightness";
    LightAttributes["BRIGHTNESS_PCT"] = "brightness_pct";
    LightAttributes["HUE"] = "hue";
    LightAttributes["SATURATION"] = "saturation";
    LightAttributes["ON_OFF"] = "onoff";
})(LightAttributes || (LightAttributes = {}));
var LightColorModes;
(function (LightColorModes) {
    LightColorModes["COLOR_TEMP"] = "color_temp";
    LightColorModes["BRIGHTNESS"] = "brightness";
    LightColorModes["HS"] = "hs";
    LightColorModes["ON_OFF"] = "onoff";
})(LightColorModes || (LightColorModes = {}));
var CoverAttributes;
(function (CoverAttributes) {
    CoverAttributes["POSITION"] = "position";
    CoverAttributes["TILT"] = "tilt";
})(CoverAttributes || (CoverAttributes = {}));

/**
 * Take input from [0, n] and return it as [0, 1]
 * @hidden
 */
function bound01(n, max) {
    if (isOnePointZero(n)) {
        n = '100%';
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    // Automatically convert percentage into number
    if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
    }
    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }
    // Convert into [0, 1] range if it isn't already
    if (max === 360) {
        // If n is a hue given in degrees,
        // wrap around out-of-range values into [0, 360] range
        // then convert into [0, 1].
        n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
    }
    else {
        // If n not a hue given in degrees
        // Convert into [0, 1] range if it isn't already.
        n = (n % max) / parseFloat(String(max));
    }
    return n;
}
/**
 * Force a number between 0 and 1
 * @hidden
 */
function clamp01(val) {
    return Math.min(1, Math.max(0, val));
}
/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */
function isOnePointZero(n) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
/**
 * Check to see if string passed in is a percentage
 * @hidden
 */
function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
}
/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * @hidden
 */
function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }
    return a;
}
/**
 * Replace a decimal with it's percentage value
 * @hidden
 */
function convertToPercentage(n) {
    if (n <= 1) {
        return Number(n) * 100 + "%";
    }
    return n;
}
/**
 * Force a hex value to have 2 characters
 * @hidden
 */
function pad2(c) {
    return c.length === 1 ? '0' + c : String(c);
}

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * *Returns:* { r, g, b } in [0, 255]
 */
function rgbToRgb(r, g, b) {
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255,
    };
}
/**
 * Converts an RGB color value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 */
function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
        s = 0;
        h = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}
function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}
/**
 * Converts an HSL color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
        // achromatic
        g = l;
        b = l;
        r = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color value to HSV
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 */
function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}
/**
 * Converts an HSV color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */
function rgbToHex(r, g, b, allow3Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
    ];
    // Return a 3 character hex if possible
    if (allow3Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color plus alpha transparency to hex
 *
 * Assumes r, g, b are contained in the set [0, 255] and
 * a in [0, 1]. Returns a 4 or 8 character rgba hex
 */
// eslint-disable-next-line max-params
function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
        pad2(convertDecimalToHex(a)),
    ];
    // Return a 4 character hex if possible
    if (allow4Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1)) &&
        hex[3].startsWith(hex[3].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join('');
}
/** Converts a decimal to a hex value */
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
/** Converts a hex value to a decimal */
function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */
function parseIntFromHex(val) {
    return parseInt(val, 16);
}
function numberInputToObject(color) {
    return {
        r: color >> 16,
        g: (color & 0xff00) >> 8,
        b: color & 0xff,
    };
}

// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
/**
 * @hidden
 */
var names = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    goldenrod: '#daa520',
    gold: '#ffd700',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavenderblush: '#fff0f5',
    lavender: '#e6e6fa',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};

/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 */
function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === 'string') {
        color = stringInputToObject(color);
    }
    if (typeof color === 'object') {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = 'hsv';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = 'hsl';
        }
        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
        }
    }
    a = boundAlpha(a);
    return {
        ok: ok,
        format: color.format || format,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a: a,
    };
}
// <http://www.w3.org/TR/css3-values/#integers>
var CSS_INTEGER = '[-\\+]?\\d+%?';
// <http://www.w3.org/TR/css3-values/#number-value>
var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};
/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */
function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
        return false;
    }
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
    }
    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match = matchers.rgb.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: convertHexToDecimal(match[4] + match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    return false;
}
/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */
function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
}

var TinyColor = /** @class */ (function () {
    function TinyColor(color, opts) {
        if (color === void 0) { color = ''; }
        if (opts === void 0) { opts = {}; }
        var _a;
        // If input is already a tinycolor, return itself
        if (color instanceof TinyColor) {
            // eslint-disable-next-line no-constructor-return
            return color;
        }
        if (typeof color === 'number') {
            color = numberInputToObject(color);
        }
        this.originalInput = color;
        var rgb = inputToRGB(color);
        this.originalInput = color;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.a = rgb.a;
        this.roundA = Math.round(100 * this.a) / 100;
        this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
        this.gradientType = opts.gradientType;
        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this.r < 1) {
            this.r = Math.round(this.r);
        }
        if (this.g < 1) {
            this.g = Math.round(this.g);
        }
        if (this.b < 1) {
            this.b = Math.round(this.b);
        }
        this.isValid = rgb.ok;
    }
    TinyColor.prototype.isDark = function () {
        return this.getBrightness() < 128;
    };
    TinyColor.prototype.isLight = function () {
        return !this.isDark();
    };
    /**
     * Returns the perceived brightness of the color, from 0-255.
     */
    TinyColor.prototype.getBrightness = function () {
        // http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    };
    /**
     * Returns the perceived luminance of a color, from 0-1.
     */
    TinyColor.prototype.getLuminance = function () {
        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var R;
        var G;
        var B;
        var RsRGB = rgb.r / 255;
        var GsRGB = rgb.g / 255;
        var BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    /**
     * Returns the alpha value of a color, from 0-1.
     */
    TinyColor.prototype.getAlpha = function () {
        return this.a;
    };
    /**
     * Sets the alpha value on the current color.
     *
     * @param alpha - The new alpha value. The accepted range is 0-1.
     */
    TinyColor.prototype.setAlpha = function (alpha) {
        this.a = boundAlpha(alpha);
        this.roundA = Math.round(100 * this.a) / 100;
        return this;
    };
    /**
     * Returns the object as a HSVA object.
     */
    TinyColor.prototype.toHsv = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    /**
     * Returns the hsva values interpolated into a string with the following format:
     * "hsva(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHsvString = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        var h = Math.round(hsv.h * 360);
        var s = Math.round(hsv.s * 100);
        var v = Math.round(hsv.v * 100);
        return this.a === 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this.roundA + ")";
    };
    /**
     * Returns the object as a HSLA object.
     */
    TinyColor.prototype.toHsl = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    /**
     * Returns the hsla values interpolated into a string with the following format:
     * "hsla(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHslString = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        var h = Math.round(hsl.h * 360);
        var s = Math.round(hsl.s * 100);
        var l = Math.round(hsl.l * 100);
        return this.a === 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this.roundA + ")";
    };
    /**
     * Returns the hex value of the color.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHex = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    /**
     * Returns the hex value of the color -with a # appened.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHexString = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return '#' + this.toHex(allow3Char);
    };
    /**
     * Returns the hex 8 value of the color.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8 = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    /**
     * Returns the hex 8 value of the color -with a # appened.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8String = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return '#' + this.toHex8(allow4Char);
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toRgb = function () {
        return {
            r: Math.round(this.r),
            g: Math.round(this.g),
            b: Math.round(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA values interpolated into a string with the following format:
     * "RGBA(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toRgbString = function () {
        var r = Math.round(this.r);
        var g = Math.round(this.g);
        var b = Math.round(this.b);
        return this.a === 1 ? "rgb(" + r + ", " + g + ", " + b + ")" : "rgba(" + r + ", " + g + ", " + b + ", " + this.roundA + ")";
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toPercentageRgb = function () {
        var fmt = function (x) { return Math.round(bound01(x, 255) * 100) + "%"; };
        return {
            r: fmt(this.r),
            g: fmt(this.g),
            b: fmt(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA relative values interpolated into a string
     */
    TinyColor.prototype.toPercentageRgbString = function () {
        var rnd = function (x) { return Math.round(bound01(x, 255) * 100); };
        return this.a === 1
            ? "rgb(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%)"
            : "rgba(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%, " + this.roundA + ")";
    };
    /**
     * The 'real' name of the color -if there is one.
     */
    TinyColor.prototype.toName = function () {
        if (this.a === 0) {
            return 'transparent';
        }
        if (this.a < 1) {
            return false;
        }
        var hex = '#' + rgbToHex(this.r, this.g, this.b, false);
        for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (hex === value) {
                return key;
            }
        }
        return false;
    };
    TinyColor.prototype.toString = function (format) {
        var formatSet = Boolean(format);
        format = format !== null && format !== void 0 ? format : this.format;
        var formattedString = false;
        var hasAlpha = this.a < 1 && this.a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');
        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === 'name' && this.a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === 'rgb') {
            formattedString = this.toRgbString();
        }
        if (format === 'prgb') {
            formattedString = this.toPercentageRgbString();
        }
        if (format === 'hex' || format === 'hex6') {
            formattedString = this.toHexString();
        }
        if (format === 'hex3') {
            formattedString = this.toHexString(true);
        }
        if (format === 'hex4') {
            formattedString = this.toHex8String(true);
        }
        if (format === 'hex8') {
            formattedString = this.toHex8String();
        }
        if (format === 'name') {
            formattedString = this.toName();
        }
        if (format === 'hsl') {
            formattedString = this.toHslString();
        }
        if (format === 'hsv') {
            formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
    };
    TinyColor.prototype.toNumber = function () {
        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor.prototype.clone = function () {
        return new TinyColor(this.toString());
    };
    /**
     * Lighten the color a given amount. Providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.lighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Brighten the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.brighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var rgb = this.toRgb();
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return new TinyColor(rgb);
    };
    /**
     * Darken the color a given amount, from 0 to 100.
     * Providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.darken = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Mix the color with pure white, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.tint = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('white', amount);
    };
    /**
     * Mix the color with pure black, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.shade = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('black', amount);
    };
    /**
     * Desaturate the color a given amount, from 0 to 100.
     * Providing 100 will is the same as calling greyscale
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.desaturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Saturate the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.saturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Completely desaturates a color into greyscale.
     * Same as calling `desaturate(100)`
     */
    TinyColor.prototype.greyscale = function () {
        return this.desaturate(100);
    };
    /**
     * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
     * Values outside of this range will be wrapped into this range.
     */
    TinyColor.prototype.spin = function (amount) {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return new TinyColor(hsl);
    };
    /**
     * Mix the current color a given amount with another color, from 0 to 100.
     * 0 means no mixing (return current color).
     */
    TinyColor.prototype.mix = function (color, amount) {
        if (amount === void 0) { amount = 50; }
        var rgb1 = this.toRgb();
        var rgb2 = new TinyColor(color).toRgb();
        var p = amount / 100;
        var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a,
        };
        return new TinyColor(rgba);
    };
    TinyColor.prototype.analogous = function (results, slices) {
        if (results === void 0) { results = 6; }
        if (slices === void 0) { slices = 30; }
        var hsl = this.toHsl();
        var part = 360 / slices;
        var ret = [this];
        for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(new TinyColor(hsl));
        }
        return ret;
    };
    /**
     * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
     */
    TinyColor.prototype.complement = function () {
        var hsl = this.toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return new TinyColor(hsl);
    };
    TinyColor.prototype.monochromatic = function (results) {
        if (results === void 0) { results = 6; }
        var hsv = this.toHsv();
        var h = hsv.h;
        var s = hsv.s;
        var v = hsv.v;
        var res = [];
        var modification = 1 / results;
        while (results--) {
            res.push(new TinyColor({ h: h, s: s, v: v }));
            v = (v + modification) % 1;
        }
        return res;
    };
    TinyColor.prototype.splitcomplement = function () {
        var hsl = this.toHsl();
        var h = hsl.h;
        return [
            this,
            new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
            new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }),
        ];
    };
    /**
     * Compute how the color would appear on a background
     */
    TinyColor.prototype.onBackground = function (background) {
        var fg = this.toRgb();
        var bg = new TinyColor(background).toRgb();
        return new TinyColor({
            r: bg.r + (fg.r - bg.r) * fg.a,
            g: bg.g + (fg.g - bg.g) * fg.a,
            b: bg.b + (fg.b - bg.b) * fg.a,
        });
    };
    /**
     * Alias for `polyad(3)`
     */
    TinyColor.prototype.triad = function () {
        return this.polyad(3);
    };
    /**
     * Alias for `polyad(4)`
     */
    TinyColor.prototype.tetrad = function () {
        return this.polyad(4);
    };
    /**
     * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
     * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
     */
    TinyColor.prototype.polyad = function (n) {
        var hsl = this.toHsl();
        var h = hsl.h;
        var result = [this];
        var increment = 360 / n;
        for (var i = 1; i < n; i++) {
            result.push(new TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
        }
        return result;
    };
    /**
     * compare color vs current color
     */
    TinyColor.prototype.equals = function (color) {
        return this.toRgbString() === new TinyColor(color).toRgbString();
    };
    return TinyColor;
}());
// kept for backwards compatability with v1
function tinycolor(color, opts) {
    if (color === void 0) { color = ''; }
    if (opts === void 0) { opts = {}; }
    return new TinyColor(color, opts);
}

function getEnumValues(enumeration) {
    return Object.keys(enumeration).map(key => enumeration[key]).filter(value => typeof value === 'string');
}
const applyPatch = (data, path, value) => {
    if (path.length === 1) {
        data[path[0]] = value;
        return;
    }
    if (!data[path[0]]) {
        data[path[0]] = {};
    }
    // eslint-disable-next-line consistent-return
    return applyPatch(data[path[0]], path.slice(1), value);
};
function getSliderDefaultForEntity(entity) {
    const domain = f(entity) || Domain.LIGHT;
    const cfg = SliderConfigDefaultDomain.get(domain) || SliderConfigDefault;
    return copy(cfg);
}
function getLightColorBasedOnTemperature(current, min, max) {
    const high = new TinyColor('rgb(255, 160, 0)'); // orange-ish
    const low = new TinyColor('rgb(166, 209, 255)'); // blue-ish
    const middle = new TinyColor('white');
    const mixAmount = ((current - min) / (max - min)) * 100;
    if (mixAmount < 50) {
        return tinycolor(low)
            .mix(middle, mixAmount * 2)
            .toRgbString();
    }
    else {
        return tinycolor(middle)
            .mix(high, (mixAmount - 50) * 2)
            .toRgbString();
    }
}
function toPercentage(value, min, max) {
    return (((value - min) / max) * 100); //.toFixed(2);
}
function percentageToValue(percent, min, max) {
    return Math.floor((percent * (max - min) / 100 + min));
}
const normalize = (value, min, max) => {
    if (isNaN(value) || isNaN(min) || isNaN(max)) {
        // Not a number, return 0
        return 0;
    }
    if (value > max)
        return max;
    if (value < min)
        return min;
    return value;
};
const capitalizeFirst = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

class Controller {
    constructor(config) {
        this._sliderPrevColor = '';
        this._config = config;
    }
    set hass(hass) {
        this._hass = hass;
    }
    get stateObj() {
        return this._hass.states[this._config.entity];
    }
    get domain() {
        return v(this.stateObj);
    }
    get name() {
        var _a, _b;
        return this._config.name ? this._config.name : ((_b = (_a = this.stateObj) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) ? this.stateObj.attributes.friendly_name : '';
    }
    get icon() {
        var _a, _b, _c;
        if (typeof ((_a = this._config.icon) === null || _a === void 0 ? void 0 : _a.icon) === 'string' && ((_b = this._config.icon) === null || _b === void 0 ? void 0 : _b.icon.length)) {
            return this._config.icon.icon;
        }
        return ((_c = this.stateObj.attributes) === null || _c === void 0 ? void 0 : _c.icon) ? this.stateObj.attributes.icon : O(this.domain, this.stateObj.state);
    }
    get value() {
        if (this._value) {
            return Math.round(this._value / this.step) * this.step;
        }
        return this.min;
    }
    set value(value) {
        if (value !== this.value) {
            this._value = value;
            // this._value = Math.round(value / this.step) * this.step;
        }
    }
    get targetValue() {
        if (this._targetValue === 0) {
            return 0;
        }
        if (this._targetValue) {
            return Math.round(this._targetValue / this.step) * this.step;
        }
        if (this.value) {
            return this.value;
        }
        return 0;
    }
    set targetValue(value) {
        if (value !== this.targetValue) {
            this._targetValue = value;
            // this._targetValue = Math.round(value / this.step) * this.step;
        }
    }
    get label() {
        return `${this.targetValue}`;
    }
    get hidden() {
        return false;
    }
    get hasSlider() {
        return true;
    }
    get hasToggle() {
        var _a, _b;
        return (_b = (_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.toggle_on_click) !== null && _b !== void 0 ? _b : false;
    }
    get toggleValue() {
        return this.value === this.min ? this.max : this.min;
    }
    get state() {
        var _a;
        return (_a = this.stateObj) === null || _a === void 0 ? void 0 : _a.state;
    }
    get isOff() {
        return this.percentage === 0;
    }
    get isUnavailable() {
        return this.state ? this.state === 'unavailable' : true;
    }
    get isSliderDisabled() {
        return this.isUnavailable ? this.isUnavailable : this.hasToggle;
    }
    get min() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : this._min) !== null && _c !== void 0 ? _c : 0;
    }
    get max() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.max) !== null && _b !== void 0 ? _b : this._max) !== null && _c !== void 0 ? _c : 100;
    }
    get step() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.step) !== null && _b !== void 0 ? _b : this._step) !== null && _c !== void 0 ? _c : 5;
    }
    get invert() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.invert) !== null && _b !== void 0 ? _b : this._invert) !== null && _c !== void 0 ? _c : false;
    }
    get isValuePercentage() {
        return true;
    }
    get percentage() {
        return Math.round(((this.targetValue - (this.invert ? this.max : this.min)) * 100) / (this.max - this.min) * (this.invert ? -1 : 1));
    }
    get valueFromPercentage() {
        return percentageToValue(this.percentage, this.min, this.max);
    }
    get allowedAttributes() {
        return [];
    }
    get style() {
        return {
            icon: {
                filter: this.iconFilter,
                color: this.iconColor,
                rotateSpeed: this.iconRotateSpeed,
            },
            slider: {
                filter: this.sliderFilter,
                color: this.sliderColor,
            },
        };
    }
    get iconFilter() {
        var _a;
        if (!((_a = this._config.icon) === null || _a === void 0 ? void 0 : _a.use_state_color) || this.percentage === 0) {
            return 'brightness(100%)';
        }
        return `brightness(${(this.percentage + 100) / 2}%)`;
    }
    get iconColor() {
        var _a;
        if ((_a = this._config.icon) === null || _a === void 0 ? void 0 : _a.use_state_color) {
            if (this.stateObj.attributes.hs_color) {
                const [hue, sat] = this.stateObj.attributes.hs_color;
                if (sat > 10) {
                    return `hsl(${hue}, 100%, ${100 - sat / 2}%)`;
                }
            }
            else if (this.percentage > 0) {
                return 'var(--paper-item-icon-active-color, #fdd835)';
            }
            else {
                return 'var(--paper-item-icon-color, #44739e)';
            }
        }
        return '';
    }
    get iconRotateSpeed() {
        return '0s';
    }
    get sliderFilter() {
        var _a;
        if (!((_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.use_percentage_bg_opacity) || this.percentage === 0 || this._config.slider.background === SliderBackground.GRADIENT) {
            return 'brightness(100%)';
        }
        return `brightness(${(this.percentage + 100) / 2}%)`;
    }
    get sliderColor() {
        var _a;
        if ((_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.use_state_color) {
            if (this.stateObj.attributes.hs_color) {
                const [hue, sat] = this.stateObj.attributes.hs_color;
                if (sat > 10) {
                    const color = `hsl(${hue}, 100%, ${100 - sat / 2}%)`;
                    this._sliderPrevColor = color;
                    return color;
                }
            }
            else if (this.stateObj.attributes.color_temp &&
                this.stateObj.attributes.min_mireds &&
                this.stateObj.attributes.max_mireds) {
                const color = getLightColorBasedOnTemperature(this.stateObj.attributes.color_temp, this.stateObj.attributes.min_mireds, this.stateObj.attributes.max_mireds);
                this._sliderPrevColor = color;
                return color;
            }
            else if (this._sliderPrevColor.startsWith('hsl') || this._sliderPrevColor.startsWith('rgb')) {
                return this._sliderPrevColor;
            }
        }
        return 'inherit';
    }
    moveSlider(event, { left, top, width, height }) {
        let percentage = this.calcMovementPercentage(event, { left, top, width, height });
        percentage = this.applyStep(percentage);
        percentage = normalize(percentage, 0, 100);
        if (!this.isValuePercentage) {
            percentage = percentageToValue(percentage, this.min, this.max);
        }
        return percentage;
    }
    calcMovementPercentage(event, { left, top, width, height }) {
        var _a;
        let percentage;
        switch ((_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.direction) {
            case SliderDirections.LEFT_RIGHT:
                percentage = toPercentage(event.clientX, left, width);
                if (this.invert) {
                    percentage = 100 - percentage;
                }
                break;
            case SliderDirections.TOP_BOTTOM:
                percentage = toPercentage(event.clientY, top, height);
                if (this.invert) {
                    percentage = 100 - percentage;
                }
                break;
            case SliderDirections.BOTTOM_TOP:
                percentage = toPercentage(event.clientY, top, height);
                if (!this.invert) {
                    percentage = 100 - percentage;
                }
                break;
        }
        return percentage;
    }
    applyStep(value) {
        return Math.round(value / this.step) * this.step;
    }
    log(name = '', value = '') {
        if (this._config.debug) {
            console.log(`${this._config.entity}: ${name}`, value);
        }
    }
}

class ClimateController extends Controller {
    constructor() {
        super(...arguments);
        this._invert = false;
    }
    get _value() {
        return this.stateObj.attributes.temperature;
    }
    set _value(value) {
        this._hass.callService('climate', 'set_temperature', {
            // eslint-disable-next-line @typescript-eslint/camelcase
            entity_id: this.stateObj.entity_id,
            temperature: value,
        });
    }
    get isOff() {
        return D.includes(this.state);
    }
    get _step() {
        var _a;
        return ((_a = this.stateObj.attributes) === null || _a === void 0 ? void 0 : _a.target_temp_step) || 1;
    }
    get _min() {
        var _a;
        return ((_a = this.stateObj.attributes) === null || _a === void 0 ? void 0 : _a.min_temp) || 7;
    }
    get _max() {
        var _a;
        return ((_a = this.stateObj.attributes) === null || _a === void 0 ? void 0 : _a.max_temp) || 35;
    }
    get isValuePercentage() {
        return false;
    }
    get label() {
        const unit = this._hass.config.unit_system.temperature;
        const mode = capitalizeFirst(this.state);
        // const current = this.stateObj.attributes?.current_temperature ? ` | ${this.stateObj.attributes.current_temperature}${unit}` : '';
        return `${this.targetValue}${unit} | ${mode}`;
    }
}

class CoverController extends Controller {
    constructor() {
        super(...arguments);
        this._min = 0;
        this._invert = true;
    }
    get attribute() {
        var _a, _b, _c, _d;
        if (((_b = (_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.attribute) === null || _b === void 0 ? void 0 : _b.length) && this.allowedAttributes.includes((_c = this._config.slider) === null || _c === void 0 ? void 0 : _c.attribute)) {
            return (_d = this._config.slider) === null || _d === void 0 ? void 0 : _d.attribute;
        }
        return CoverAttributes.POSITION;
    }
    get icon() {
        var _a, _b;
        if (typeof ((_a = this._config.icon) === null || _a === void 0 ? void 0 : _a.icon) === 'string' && ((_b = this._config.icon) === null || _b === void 0 ? void 0 : _b.icon.length)) {
            return this._config.icon.icon;
        }
        return ee(this.stateObj);
    }
    get allowedAttributes() {
        return getEnumValues(CoverAttributes);
    }
    get _value() {
        var _a;
        switch (this.attribute) {
            case CoverAttributes.POSITION:
                return ((_a = this.stateObj) === null || _a === void 0 ? void 0 : _a.state) === 'closed'
                    ? 0
                    : this.stateObj.attributes.current_position;
            case CoverAttributes.TILT:
                return this.stateObj.attributes.current_tilt_position;
            default:
                return 0;
        }
    }
    set _value(value) {
        if (!this.hasSlider) {
            const service = value > 0 ? 'open_cover' : 'close_cover';
            this._hass.callService('cover', service, {
                // eslint-disable-next-line @typescript-eslint/camelcase
                entity_id: this.stateObj.entity_id
            });
        }
        else {
            switch (this.attribute) {
                case CoverAttributes.POSITION:
                    this._hass.callService('cover', 'set_cover_position', {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        entity_id: this.stateObj.entity_id,
                        position: value
                    });
                    break;
                case CoverAttributes.TILT:
                    this._hass.callService('cover', 'set_cover_tilt_position', {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        entity_id: this.stateObj.entity_id,
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        tilt_position: value
                    });
                    break;
            }
        }
    }
    get _step() {
        return 1;
    }
    get label() {
        const defaultLabel = this._hass.localize(`component.cover.state._.${this.state}`);
        const closedLabel = this._hass.localize('component.cover.state._.closed');
        const openLabel = this._hass.localize('component.cover.state._.open');
        if (!this.hasSlider) {
            return defaultLabel;
        }
        switch (this.attribute) {
            case CoverAttributes.POSITION:
                if (this.percentage === 0) {
                    return this.invert ? openLabel : closedLabel;
                }
                if (this.percentage === 100) {
                    return this.invert ? closedLabel : openLabel;
                }
                return `${this.percentage}%`;
            case CoverAttributes.TILT:
                return `${this.percentage}`;
        }
        return defaultLabel;
    }
    get hasSlider() {
        switch (this.attribute) {
            case CoverAttributes.POSITION:
                if ('current_position' in this.stateObj.attributes) {
                    return true;
                }
                if ('supported_features' in this.stateObj.attributes &&
                    this.stateObj.attributes.supported_features & 4) {
                    return true;
                }
                break;
            case CoverAttributes.TILT:
                if ('current_tilt_position' in this.stateObj.attributes) {
                    return true;
                }
                if ('supported_features' in this.stateObj.attributes &&
                    this.stateObj.attributes.supported_features & 128) {
                    return true;
                }
                break;
            default:
                return false;
        }
        return false;
    }
    get _max() {
        return this.hasSlider ? 100 : 1;
    }
}

class FanController extends Controller {
    constructor() {
        super(...arguments);
        this._min = 0;
        this._invert = false;
    }
    get _value() {
        return this.isUnavailable || D.includes(this.state)
            ? 0
            : this.hasSlider ? this.stateObj.attributes.percentage : 1;
    }
    set _value(value) {
        const service = value > 0 ? 'turn_on' : 'turn_off';
        if (value > 0 && this.hasSlider) {
            this._hass.callService('fan', 'set_percentage', {
                // eslint-disable-next-line @typescript-eslint/camelcase
                entity_id: this.stateObj.entity_id,
                percentage: value
            });
        }
        else {
            this._hass.callService('fan', service, {
                // eslint-disable-next-line @typescript-eslint/camelcase
                entity_id: this.stateObj.entity_id
            });
        }
    }
    get _step() {
        return this.stateObj.attributes.percentage_step;
    }
    get label() {
        if (this.percentage > 0) {
            if (this.hasSlider) {
                return `${this.percentage}%`;
            }
            else {
                return this._hass.localize('component.fan.state._.on');
            }
        }
        return this._hass.localize('component.fan.state._.off');
    }
    get hasSlider() {
        return 'speed' in this.stateObj.attributes;
    }
    get _max() {
        return this.hasSlider ? 100 : 1;
    }
    get iconRotateSpeed() {
        let speed = 0;
        if (this.percentage > 0) {
            speed = 3 - ((this.percentage / 100) * 2);
        }
        return `${speed}s`;
    }
}

class InputBooleanController extends Controller {
    constructor() {
        super(...arguments);
        this._min = 0;
        this._max = 1;
        this._invert = false;
    }
    get _value() {
        return !D.includes(this.stateObj.state)
            ? 1
            : 0;
    }
    set _value(value) {
        const service = value > 0 ? 'turn_on' : 'turn_off';
        this._hass.callService('input_boolean', service, {
            // eslint-disable-next-line @typescript-eslint/camelcase
            entity_id: this.stateObj.entity_id
        });
    }
    get _step() {
        return 1;
    }
    get label() {
        if (this.percentage > 0) {
            return this._hass.localize('component.input_boolean.state._.on');
        }
        return this._hass.localize('component.input_boolean.state._.off');
    }
}

class InputNumberController extends Controller {
    constructor() {
        super(...arguments);
        this._invert = false;
    }
    get _value() {
        return this.stateObj.state;
    }
    set _value(value) {
        this._hass.callService('input_number', 'set_value', {
            // eslint-disable-next-line @typescript-eslint/camelcase
            entity_id: this.stateObj.entity_id,
            value: value,
        });
    }
    get _min() {
        return this.stateObj.attributes.min;
    }
    get _max() {
        return this.stateObj.attributes.max;
    }
    get isValuePercentage() {
        return false;
    }
    get _step() {
        return this.stateObj.attributes.step;
    }
    get label() {
        return this.stateObj.attributes.unit_of_measurement ? `${this.targetValue} ${this.stateObj.attributes.unit_of_measurement}` : `${this.targetValue}`;
    }
}

const HS_INDEX = {
    hue: 0,
    saturation: 1
};
class LightController extends Controller {
    constructor() {
        super(...arguments);
        this._step = 1;
        this._invert = false;
    }
    get attribute() {
        var _a, _b, _c, _d, _e;
        const attr = (_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.attribute;
        let useAttr = LightAttributes.BRIGHTNESS_PCT;
        let supported = [];
        if (Array.isArray((_c = (_b = this.stateObj) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.supported_color_modes)) {
            supported = (_e = (_d = this.stateObj) === null || _d === void 0 ? void 0 : _d.attributes) === null || _e === void 0 ? void 0 : _e.supported_color_modes;
        }
        if (supported.length === 1 && supported[0] === LightAttributes.ON_OFF) {
            useAttr = LightAttributes.ON_OFF;
        }
        if ((attr === null || attr === void 0 ? void 0 : attr.length) && this.allowedAttributes.includes(attr)) {
            useAttr = attr;
            switch (attr) {
                case LightAttributes.COLOR_TEMP:
                    if (!supported.includes('color_temp')) {
                        useAttr = LightAttributes.BRIGHTNESS_PCT;
                    }
                    break;
                case LightAttributes.HUE:
                case LightAttributes.SATURATION:
                    if (!supported.includes('hs')) {
                        useAttr = LightAttributes.BRIGHTNESS_PCT;
                    }
                    break;
            }
        }
        return useAttr;
    }
    get allowedAttributes() {
        return getEnumValues(LightAttributes);
    }
    get colorMode() {
        var _a, _b;
        return (_b = (_a = this.stateObj) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.color_mode;
    }
    get _value() {
        if (!this.stateObj || D.includes(this.state)) {
            return this.isValuePercentage ? 0 : this.min;
        }
        const attr = this.stateObj.attributes;
        switch (this.attribute) {
            case LightAttributes.COLOR_TEMP:
                return attr.color_temp ? Math.round(attr.color_temp) : this.min;
            case LightAttributes.BRIGHTNESS:
                return Math.round(attr.brightness);
            case LightAttributes.BRIGHTNESS_PCT:
                return Math.round((attr.brightness * 100.0) / 255);
            case LightAttributes.ON_OFF:
                return 1;
            case LightAttributes.HUE:
            case LightAttributes.SATURATION:
                return attr.hs_color
                    ? Math.round(attr.hs_color[HS_INDEX[this.attribute]])
                    : 0;
            default:
                return 0;
        }
    }
    set _value(value) {
        if (!this.stateObj) {
            return;
        }
        let attr = this.attribute;
        let _value;
        let service = value > 0 ? 'turn_on' : 'turn_off';
        let data = {
            // eslint-disable-next-line @typescript-eslint/camelcase
            entity_id: this.stateObj.entity_id,
        };
        switch (attr) {
            case LightAttributes.BRIGHTNESS:
            case LightAttributes.BRIGHTNESS_PCT:
                value =
                    attr === LightAttributes.BRIGHTNESS
                        ? Math.round(value)
                        : Math.round((value / 100.0) * 255);
                if (!value) {
                    service = 'turn_off';
                }
                else {
                    attr = 'brightness';
                    data = Object.assign(Object.assign({}, data), { [attr]: value });
                }
                break;
            case LightAttributes.HUE:
            case LightAttributes.SATURATION:
                _value = this.stateObj.attributes.hs_color || [0, 0];
                _value[HS_INDEX[attr]] = value;
                value = _value;
                attr = 'hs_color';
                service = 'turn_on';
                data = Object.assign(Object.assign({}, data), { [attr]: value });
                break;
            case LightAttributes.COLOR_TEMP:
                attr = 'color_temp';
                service = 'turn_on';
                data = Object.assign(Object.assign({}, data), { [attr]: value });
                break;
        }
        this._hass.callService('light', service, Object.assign({}, data));
    }
    get _min() {
        var _a;
        switch (this.attribute) {
            case LightAttributes.COLOR_TEMP:
                return this.stateObj ? ((_a = this.stateObj.attributes) === null || _a === void 0 ? void 0 : _a.min_mireds) ? this.stateObj.attributes.min_mireds : 153 : 153;
            default:
                return 0;
        }
    }
    get _max() {
        var _a;
        switch (this.attribute) {
            case LightAttributes.COLOR_TEMP:
                return this.stateObj ? ((_a = this.stateObj.attributes) === null || _a === void 0 ? void 0 : _a.max_mireds) ? this.stateObj.attributes.max_mireds : 500 : 500;
            case LightAttributes.BRIGHTNESS:
                return 255;
            case LightAttributes.HUE:
                return 360;
            case LightAttributes.ON_OFF:
                return 1;
            default:
                return 100;
        }
    }
    get isValuePercentage() {
        switch (this.attribute) {
            case LightAttributes.COLOR_TEMP:
            case LightAttributes.HUE:
            case LightAttributes.BRIGHTNESS:
                return false;
            default:
                return true;
        }
    }
    get isOff() {
        switch (this.attribute) {
            case LightAttributes.COLOR_TEMP:
            case LightAttributes.HUE:
            case LightAttributes.SATURATION:
            case LightAttributes.BRIGHTNESS:
            case LightAttributes.ON_OFF:
                return D.includes(this.state);
            default:
                return this.colorMode === LightColorModes.ON_OFF ? D.includes(this.state) : this.percentage === 0;
        }
    }
    get label() {
        if (this.isOff) {
            return this._hass.localize('component.light.state._.off');
        }
        if (this.colorMode === LightColorModes.ON_OFF) {
            return this._hass.localize('component.light.state._.on');
        }
        switch (this.attribute) {
            case LightAttributes.ON_OFF:
                return this._hass.localize('component.light.state._.on');
            case LightAttributes.COLOR_TEMP:
            case LightAttributes.BRIGHTNESS:
                return `${this.targetValue}`;
            case LightAttributes.BRIGHTNESS_PCT:
            case LightAttributes.SATURATION:
                return `${this.targetValue}%`;
            case LightAttributes.HUE:
                return `${this.targetValue}°`;
            default:
                return `${this.targetValue}`;
        }
    }
    get hasToggle() {
        var _a, _b, _c, _d, _e, _f;
        let supported = [];
        if (Array.isArray((_b = (_a = this.stateObj) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.supported_color_modes)) {
            supported = (_d = (_c = this.stateObj) === null || _c === void 0 ? void 0 : _c.attributes) === null || _d === void 0 ? void 0 : _d.supported_color_modes;
        }
        if (supported.length === 1 && supported[0] === LightAttributes.ON_OFF) {
            return true;
        }
        return (_f = (_e = this._config.slider) === null || _e === void 0 ? void 0 : _e.toggle_on_click) !== null && _f !== void 0 ? _f : false;
    }
    get hasSlider() {
        var _a, _b;
        if (!this.stateObj) {
            return false;
        }
        switch (this.attribute) {
            case LightAttributes.ON_OFF:
                return false;
            case LightAttributes.BRIGHTNESS:
            case LightAttributes.BRIGHTNESS_PCT:
                if ('brightness' in this.stateObj.attributes) {
                    return true;
                }
                return !!('supported_features' in this.stateObj.attributes &&
                    ((_b = (_a = this.stateObj) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.supported_features) & 1);
            case LightAttributes.COLOR_TEMP:
                if ('color_temp' in this.stateObj.attributes) {
                    return true;
                }
                return !!('supported_features' in this.stateObj.attributes &&
                    this.stateObj.attributes.supported_features & 2);
            case LightAttributes.HUE:
            case LightAttributes.SATURATION:
                if ('hs_color' in this.stateObj.attributes) {
                    return true;
                }
                return !!('supported_features' in this.stateObj.attributes &&
                    this.stateObj.attributes.supported_features & 16);
            default:
                return false;
        }
    }
    get sliderColor() {
        var _a;
        let returnColor = 'inherit';
        if ((_a = this._config.slider) === null || _a === void 0 ? void 0 : _a.use_state_color) {
            if (this.stateObj.attributes.hs_color && this.attribute !== LightAttributes.COLOR_TEMP) {
                const [hue, sat] = this.stateObj.attributes.hs_color;
                let useHue = hue;
                let useSat = sat;
                switch (this.attribute) {
                    case LightAttributes.HUE:
                        useHue = this.valueFromPercentage;
                        break;
                    case LightAttributes.SATURATION:
                        useSat = this.percentage;
                        break;
                }
                if (useSat > 10) {
                    returnColor = `hsl(${useHue}, 100%, ${100 - useSat / 2}%)`;
                    this._sliderPrevColor = returnColor;
                }
            }
            else if (this.attribute === LightAttributes.HUE || this.attribute === LightAttributes.SATURATION) {
                let useHue = 0;
                let useSat = 20;
                switch (this.attribute) {
                    case LightAttributes.HUE:
                        useHue = this.valueFromPercentage;
                        break;
                    case LightAttributes.SATURATION:
                        useSat = this.percentage;
                        break;
                }
                if (useSat > 10) {
                    returnColor = `hsl(${useHue}, 100%, ${100 - useSat / 2}%)`;
                    this._sliderPrevColor = returnColor;
                }
            }
            else if (this.stateObj.attributes.color_temp &&
                this.stateObj.attributes.min_mireds &&
                this.stateObj.attributes.max_mireds) {
                returnColor = getLightColorBasedOnTemperature(this.attribute === LightAttributes.COLOR_TEMP ? this.valueFromPercentage : this.stateObj.attributes.color_temp, this.stateObj.attributes.min_mireds, this.stateObj.attributes.max_mireds);
                this._sliderPrevColor = returnColor;
            }
            else if (this.attribute === LightAttributes.COLOR_TEMP) {
                returnColor = getLightColorBasedOnTemperature(this.valueFromPercentage, 153, 500);
                this._sliderPrevColor = returnColor;
            }
            else if (this._sliderPrevColor.startsWith('hsl') || this._sliderPrevColor.startsWith('rgb')) {
                returnColor = this._sliderPrevColor;
            }
        }
        return returnColor;
    }
}

class LockController extends Controller {
    constructor() {
        super(...arguments);
        this._min = 0;
        this._max = 1;
        this._invert = false;
    }
    get _value() {
        return !D.includes(this.stateObj.state)
            ? 1
            : 0;
    }
    set _value(value) {
        const service = value > 0 ? 'lock' : 'unlock';
        this._hass.callService('lock', service, {
            // eslint-disable-next-line @typescript-eslint/camelcase
            entity_id: this.stateObj.entity_id
        });
    }
    get _step() {
        return 1;
    }
    get label() {
        if (this.percentage > 0) {
            return this._hass.localize('component.lock.state._.unlocked');
        }
        return this._hass.localize('component.lock.state._.locked');
    }
}

/* eslint-disable @typescript-eslint/camelcase */
class MediaController extends Controller {
    constructor() {
        super(...arguments);
        this._min = 0;
        this._max = 100;
        this._step = 1;
        this._invert = false;
    }
    get _value() {
        var _a, _b;
        return this.isUnavailable || ((_b = (_a = this.stateObj) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.is_volume_muted)
            ? 0
            : Math.floor(parseFloat(Number.parseFloat(this.stateObj.attributes.volume_level).toPrecision(2)) * 100.0);
    }
    set _value(value) {
        value = value / 100.0;
        this._hass.callService('media_player', 'volume_set', {
            entity_id: this.stateObj.entity_id,
            volume_level: value,
        });
        if (value)
            this._hass.callService('media_player', 'volume_mute', {
                entity_id: this.stateObj.entity_id,
                is_volume_muted: false,
            });
    }
    get isOff() {
        return this.stateObj.state === 'off';
    }
    get label() {
        if (this.stateObj.attributes.is_volume_muted)
            return '-';
        return !!this.stateObj.attributes.volume_level
            ? `${this.percentage}%`
            : this._hass.localize(`component.media_player.state._.${this.state}`);
    }
}

class SwitchController extends Controller {
    constructor() {
        super(...arguments);
        this._min = 0;
        this._max = 1;
        this._invert = false;
    }
    get _value() {
        return !D.includes(this.stateObj.state)
            ? 1
            : 0;
    }
    set _value(value) {
        const service = value > 0 ? 'turn_on' : 'turn_off';
        this._hass.callService('switch', service, {
            // eslint-disable-next-line @typescript-eslint/camelcase
            entity_id: this.stateObj.entity_id
        });
    }
    get _step() {
        return 1;
    }
    get label() {
        if (this.percentage > 0) {
            return this._hass.localize('component.switch.state._.on');
        }
        return this._hass.localize('component.switch.state._.off');
    }
}

class ControllerFactory {
    static getInstance(config) {
        const domain = f(config.entity);
        const mapping = {
            [Domain.LIGHT]: LightController,
            [Domain.FAN]: FanController,
            [Domain.SWITCH]: SwitchController,
            [Domain.COVER]: CoverController,
            [Domain.INPUT_BOOLEAN]: InputBooleanController,
            [Domain.INPUT_NUMBER]: InputNumberController,
            [Domain.MEDIA_PLAYER]: MediaController,
            [Domain.CLIMATE]: ClimateController,
            [Domain.LOCK]: LockController,
        };
        if (typeof mapping[domain] === 'undefined') {
            throw new Error(`Unsupported entity type: ${domain}`);
        }
        return new mapping[domain](config);
    }
}

var common$8 = {
	version: "v",
	invalid_configuration: "Invalid configuration",
	show_warning: "Show Warning",
	show_error: "Show Error"
};
var tabs$8 = {
	general: {
		title: "General",
		entity: "Entity (Required)",
		name: "Name (Optional)",
		show_name: "Show name?",
		show_state: "Show state?",
		compact: "Compact?"
	},
	icon: {
		title: "Icon",
		icon: "Icon (Optional)",
		show_icon: "Show icon?",
		use_state_color: "Use state color?",
		tap_action: "Tap action"
	},
	slider: {
		title: "Slider",
		direction: "Direction",
		background: "Background",
		use_brightness: "Use brightness?",
		show_track: "Show track?",
		toggle_on_click: "Act as a toggle (disable sliding)",
		force_square: "Force square?"
	},
	action_button: {
		title: "Action button",
		mode: "Mode",
		icon: "Icon",
		show_button: "Show button?",
		show_spinner: "Show spinner?",
		tap_action: "Tap action"
	}
};
var state$8 = {
	off: "Off",
	on: "On"
};
var direction$8 = {
	"left-right": "Left to right",
	"top-bottom": "Top to bottom",
	"bottom-top": "Bottom to top"
};
var background$8 = {
	striped: "Striped",
	gradient: "Gradient",
	solid: "Solid",
	triangle: "Triangle",
	custom: "Custom"
};
var mode$8 = {
	toggle: "Toggle",
	custom: "Custom"
};
var en = {
	common: common$8,
	tabs: tabs$8,
	state: state$8,
	direction: direction$8,
	background: background$8,
	mode: mode$8
};

var en$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$8,
    tabs: tabs$8,
    state: state$8,
    direction: direction$8,
    background: background$8,
    mode: mode$8,
    'default': en
});

var common$7 = {
	version: "v",
	invalid_configuration: "Ungültige Konfiguration",
	show_warning: "Zeige Warnung",
	show_error: "Zeige Fehler"
};
var tabs$7 = {
	general: {
		title: "Allgemein",
		entity: "Entiät (vorgeschrieben)",
		name: "Name (optional)",
		show_name: "Namen zeigen?",
		show_state: "Zustand zeigen?",
		compact: "Kompakt?"
	},
	icon: {
		title: "Icon",
		icon: "Icon (optional)",
		show_icon: "Icon zeigen?",
		use_state_color: "Zustandsfarbe verwenden?",
		tap_action: "Tap action"
	},
	slider: {
		title: "Schieberegler",
		direction: "Richtung",
		background: "Hintergrund",
		use_brightness: "Helligkeit benutzen?",
		show_track: "Spur anzeigen?",
		toggle_on_click: "Als Schalter benutzen (schieben deaktivieren)",
		force_square: "Quadrat erzwingen?"
	},
	action_button: {
		title: "Action-Knopf",
		mode: "Modus",
		icon: "Icon",
		show_button: "Knopf zeigen?",
		show_spinner: "Spinner anzeigen?",
		tap_action: "Tap action"
	}
};
var state$7 = {
	off: "Aus",
	on: "An"
};
var direction$7 = {
	"left-right": "Links nach Rechts",
	"top-bottom": "Oben nach Unten",
	"bottom-top": "Unten nach Oben"
};
var background$7 = {
	striped: "gestreift",
	gradient: "Farbverlauf",
	solid: "Einfarbig",
	triangle: "Dreieck",
	custom: "benuzerdefiniert"
};
var mode$7 = {
	toggle: "Umschalter",
	custom: "benuzerdefiniert"
};
var de = {
	common: common$7,
	tabs: tabs$7,
	state: state$7,
	direction: direction$7,
	background: background$7,
	mode: mode$7
};

var de$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$7,
    tabs: tabs$7,
    state: state$7,
    direction: direction$7,
    background: background$7,
    mode: mode$7,
    'default': de
});

var common$6 = {
	version: "v",
	invalid_configuration: "Configuration incorrecte",
	show_warning: "Afficher les avertissement",
	show_error: "Afficher les erreurs"
};
var tabs$6 = {
	general: {
		title: "Général",
		entity: "Entité (Obligatoire)",
		name: "Nom (Optionnel)",
		show_name: "Afficher le nom ?",
		show_state: "Afficher l'état ?",
		compact: "Compact ?"
	},
	icon: {
		title: "Icône",
		icon: "Icône (Optionnel)",
		show_icon: "Afficher l'icône ?",
		use_state_color: "Afficher la couleur d'état?",
		tap_action: "Action"
	},
	slider: {
		title: "Curseur",
		direction: "Direction",
		background: "Fond",
		use_brightness: "Utiliser la luminosité ?",
		show_track: "Afficher le chemin ?",
		toggle_on_click: "Agir comme un bouton (désactive le curseur)",
		force_square: "Forcer carré ?"
	},
	action_button: {
		title: "Bouton d'action",
		mode: "Mode",
		icon: "Icône",
		show_button: "Afficher le bouton ?",
		show_spinner: "Afficher spinner ?",
		tap_action: "Action"
	}
};
var state$6 = {
	off: "Inactif",
	on: "Actif"
};
var direction$6 = {
	"left-right": "gauche à droite",
	"top-bottom": "haut à bas",
	"bottom-top": "Bas à haut"
};
var background$6 = {
	striped: "Rayures",
	gradient: "Dégradé",
	solid: "Uni",
	triangle: "Triangle",
	custom: "Personnalisé"
};
var mode$6 = {
	toggle: "Bascule",
	custom: "Personnalisé"
};
var fr = {
	common: common$6,
	tabs: tabs$6,
	state: state$6,
	direction: direction$6,
	background: background$6,
	mode: mode$6
};

var fr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$6,
    tabs: tabs$6,
    state: state$6,
    direction: direction$6,
    background: background$6,
    mode: mode$6,
    'default': fr
});

var common$5 = {
	version: "v",
	invalid_configuration: "תצורה לא חוקית",
	show_warning: "הצג אזהרה",
	show_error: "הצג שגיאה"
};
var tabs$5 = {
	general: {
		title: "כללי",
		entity: "ישיות (נדרש)",
		name: "שם (אופציונלי)",
		show_name: "להציג שם?",
		show_state: "להציג מצב?",
		compact: "קוֹמפָּקטִי?"
	},
	icon: {
		title: "סמליל",
		icon: "סמליל (אופציונלי)",
		show_icon: "להציג סמליל?",
		use_state_color: "להשתמש בצבע מצב?",
		tap_action: "פעולה בהקשה"
	},
	slider: {
		title: "גלילה",
		direction: "כיוון",
		background: "רקע",
		use_brightness: "להשתמש בבהירות?",
		show_track: "להציג מסלול?",
		toggle_on_click: "פעל כמתג (השבת החלקה)",
		force_square: "כוח מרובע?"
	},
	action_button: {
		title: "כפתור פעולה",
		mode: "מצב",
		icon: "סמליל",
		show_button: "להציג כפתור?",
		show_spinner: "להציג ספינר?",
		tap_action: "פעולה בהקשה"
	}
};
var state$5 = {
	off: "כבוי",
	on: "פועל"
};
var direction$5 = {
	"left-right": "שמאל לימין",
	"top-bottom": "מלמעלה למטה",
	"bottom-top": "מלמטה למעלה"
};
var background$5 = {
	striped: "מפוספס",
	gradient: "שיפוע",
	solid: "מוצק",
	triangle: "משולש",
	custom: "מותאם אישית"
};
var mode$5 = {
	toggle: "החלפה",
	custom: "מותאם אישית"
};
var he = {
	common: common$5,
	tabs: tabs$5,
	state: state$5,
	direction: direction$5,
	background: background$5,
	mode: mode$5
};

var he$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$5,
    tabs: tabs$5,
    state: state$5,
    direction: direction$5,
    background: background$5,
    mode: mode$5,
    'default': he
});

var common$4 = {
	version: "v",
	invalid_configuration: "Ongeldige configuratie",
	show_warning: "Toon waarschuwing",
	show_error: "Toon fout"
};
var tabs$4 = {
	general: {
		title: "Algemeen",
		entity: "Entiteit (Verplicht)",
		name: "Naam (Optioneel)",
		show_name: "Toon naam?",
		show_state: "Toon status?",
		compact: "Compact?"
	},
	icon: {
		title: "Icoon",
		icon: "Icoon (Optioneel)",
		show_icon: "Toon icoon?",
		use_state_color: "Gebruik status kleur?",
		tap_action: "Tap actie"
	},
	slider: {
		title: "Schuifregelaar",
		direction: "Richting",
		background: "Actergrond",
		use_brightness: "Gebruik helderheid?",
		show_track: "Toon spoor?",
		toggle_on_click: "Fungeren als een schakelaar (schuiven uitschakelen)",
		force_square: "Forceer vierkant?"
	},
	action_button: {
		title: "Actie button",
		mode: "Modus",
		icon: "Icoon",
		show_button: "Toon button?",
		show_spinner: "Toon spinner?",
		tap_action: "Tap actie"
	}
};
var state$4 = {
	off: "Uit",
	on: "Aan"
};
var direction$4 = {
	"left-right": "Links naar rechts",
	"top-bottom": "Boven naar onder",
	"bottom-top": "Onder naar boven"
};
var background$4 = {
	striped: "Gestreept",
	gradient: "Verloop",
	solid: "Vast",
	triangle: "Driehoek",
	custom: "Aangepast"
};
var mode$4 = {
	toggle: "Schakelaar",
	custom: "Aangepast"
};
var nl = {
	common: common$4,
	tabs: tabs$4,
	state: state$4,
	direction: direction$4,
	background: background$4,
	mode: mode$4
};

var nl$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$4,
    tabs: tabs$4,
    state: state$4,
    direction: direction$4,
    background: background$4,
    mode: mode$4,
    'default': nl
});

var common$3 = {
	version: "v",
	invalid_configuration: "Nieprawidłowa konfiguracja",
	show_warning: "Pokaż ostrzeżenia",
	show_error: "Pokaż błędy"
};
var tabs$3 = {
	general: {
		title: "Ogólne",
		entity: "Encja (Wymagana)",
		name: "Nazwa (Opcjonalna)",
		show_name: "Pokazać nazwę?",
		show_state: "Pokazać stan?",
		compact: "Kompaktowy?"
	},
	icon: {
		title: "Ikona",
		icon: "Ikona (Opcjonalna)",
		show_icon: "Pokazać ikonę?",
		use_state_color: "Uzyć kolor stanu?",
		tap_action: "Akcja kliknięcia"
	},
	slider: {
		title: "Suwak",
		direction: "Kierunek",
		background: "Tło",
		use_brightness: "Użyć jasności?",
		show_track: "Pokazać ślad?",
		toggle_on_click: "Działaj jako przełącznik (wyłącz przesuwanie)",
		force_square: "Wymusić kwadrat?"
	},
	action_button: {
		title: "Przycisk akcji",
		mode: "Tryb",
		icon: "Ikona",
		show_button: "Pokazać przycisk?",
		show_spinner: "Pokazać spinner?",
		tap_action: "Akcja kliknięcia"
	}
};
var state$3 = {
	off: "Wyłączony",
	on: "Włączony"
};
var direction$3 = {
	"left-right": "Z lewej do prawej",
	"top-bottom": "Z góry na dół",
	"bottom-top": "Z dołu do góry"
};
var background$3 = {
	striped: "W paski",
	gradient: "Gradient",
	solid: "Pełne tło",
	triangle: "Trójkąt",
	custom: "Ustawienia własne"
};
var mode$3 = {
	toggle: "Przełącznik",
	custom: "Ustawienia własne"
};
var pl = {
	common: common$3,
	tabs: tabs$3,
	state: state$3,
	direction: direction$3,
	background: background$3,
	mode: mode$3
};

var pl$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$3,
    tabs: tabs$3,
    state: state$3,
    direction: direction$3,
    background: background$3,
    mode: mode$3,
    'default': pl
});

var common$2 = {
	version: "v",
	invalid_configuration: "Configuração Inválida",
	show_warning: "Mostrar Aviso",
	show_error: "Mostrar Erro"
};
var tabs$2 = {
	general: {
		title: "Geral",
		entity: "Entidade (Obrigatório)",
		name: "Nome (Opcional)",
		show_name: "Mostrar Nome?",
		show_state: "Mostrar Estado?",
		compact: "Compactar?"
	},
	icon: {
		title: "Ícone",
		icon: "Ícone (Opcional)",
		show_icon: "Mostrar Ícone?",
		use_state_color: "Usar Cor de Estado?",
		tap_action: "Ação de Toque"
	},
	slider: {
		title: "Slider",
		direction: "Direção",
		background: "Fundo",
		use_brightness: "Usar Brilho?",
		show_track: "Mostrar Acompanhamento?",
		toggle_on_click: "Atua como um alternador (desative o deslizamento)",
		force_square: "Forçar Quadrado?"
	},
	action_button: {
		title: "Botão de Ação",
		mode: "Modo",
		icon: "Ícone",
		show_button: "Mostrar Botão?",
		show_spinner: "Mostrar Spinner?",
		tap_action: "Ação de Toque"
	}
};
var state$2 = {
	off: "Desligar",
	on: "Ligar"
};
var direction$2 = {
	"left-right": "Esquerda para a Direita",
	"top-bottom": "De Cima para Baixo",
	"bottom-top": "De Baixo para Cima"
};
var background$2 = {
	striped: "Listrado",
	gradient: "Gradiente",
	solid: "Sólido",
	triangle: "Triângulo",
	custom: "Personalizado"
};
var mode$2 = {
	toggle: "Alternancia",
	custom: "Personalizado"
};
var pt = {
	common: common$2,
	tabs: tabs$2,
	state: state$2,
	direction: direction$2,
	background: background$2,
	mode: mode$2
};

var pt$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$2,
    tabs: tabs$2,
    state: state$2,
    direction: direction$2,
    background: background$2,
    mode: mode$2,
    'default': pt
});

var common$1 = {
	version: "v",
	invalid_configuration: "Неверная конфигурация",
	show_warning: "Показать предупреждения",
	show_error: "Показать ошибки"
};
var tabs$1 = {
	general: {
		title: "Общие",
		entity: "Объект (обязательно)",
		name: "Имя (Опционально)",
		show_name: "Отображать имя?",
		show_state: "Отображать статус?",
		compact: "Компактный?"
	},
	icon: {
		title: "Иконка",
		icon: "Иконка (Опционально)",
		show_icon: "Показать иконку?",
		use_state_color: "Использовать цвет статуса?",
		tap_action: "Действие по нажатию"
	},
	slider: {
		title: "Слайдер",
		direction: "Направление",
		background: "Фон",
		use_brightness: "Использовать яркость?",
		show_track: "Показать трек?",
		toggle_on_click: "Действовать как переключатель (отключить скольжение)",
		force_square: "Отображать квадратным?"
	},
	action_button: {
		title: "Кнопка действия",
		mode: "Режим",
		icon: "Иконка",
		show_button: "Отобразить кнопку?",
		show_spinner: "Отобразить спиннер?",
		tap_action: "Действие по нажатию"
	}
};
var state$1 = {
	off: "Выкл",
	on: "Вкл"
};
var direction$1 = {
	"left-right": "Слева направо",
	"top-bottom": "Сверху вниз",
	"bottom-top": "Снизу вверх"
};
var background$1 = {
	striped: "Полосатый",
	gradient: "Градиент",
	solid: "Сплошной цвет",
	triangle: "Треугольник",
	custom: "Свои настройки"
};
var mode$1 = {
	toggle: "Переключатель",
	custom: "Свои настройки"
};
var ru = {
	common: common$1,
	tabs: tabs$1,
	state: state$1,
	direction: direction$1,
	background: background$1,
	mode: mode$1
};

var ru$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$1,
    tabs: tabs$1,
    state: state$1,
    direction: direction$1,
    background: background$1,
    mode: mode$1,
    'default': ru
});

var common = {
	version: "v",
	invalid_configuration: "유효하지 않은 설정입니다",
	show_warning: "경고 표시",
	show_error: "에러 표시"
};
var tabs = {
	general: {
		title: "일반",
		entity: "구성 요소 (필수)",
		name: "이름 (옵션)",
		show_name: "이름 표시",
		show_state: "상태 표시",
		compact: "슬림 모드"
	},
	icon: {
		title: "아이콘",
		icon: "아이콘 (옵션)",
		show_icon: "아이콘 표시",
		use_state_color: "상태 색상 사용",
		tap_action: "탭 액션"
	},
	slider: {
		title: "슬라이더",
		direction: "방향 지정",
		background: "배경",
		use_brightness: "밝기 사용",
		show_track: "범위 표시",
		toggle_on_click: "토글 버튼으로 동작(슬라이더 비활성화)",
		force_square: "정사각형 모양으로 고정"
	},
	action_button: {
		title: "액션 버튼",
		mode: "모드",
		icon: "아이콘",
		show_button: "버튼 표시",
		show_spinner: "로딩 스피너 표시",
		tap_action: "탭 액셥"
	}
};
var state = {
	off: "꺼짐",
	on: "켜짐"
};
var direction = {
	"left-right": "왼쪽에서 오른쪽",
	"top-bottom": "위에서 아래",
	"bottom-top": "아래에서 위"
};
var background = {
	striped: "줄무늬",
	gradient: "그레디언트",
	solid: "단색",
	triangle: "삼각형",
	custom: "커스텀"
};
var mode = {
	toggle: "토글 모드",
	custom: "커스텀 모드"
};
var ko = {
	common: common,
	tabs: tabs,
	state: state,
	direction: direction,
	background: background,
	mode: mode
};

var ko$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common,
    tabs: tabs,
    state: state,
    direction: direction,
    background: background,
    mode: mode,
    'default': ko
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languages = {
    en: en$1,
    de: de$1,
    fr: fr$1,
    he: he$1,
    nl: nl$1,
    pl: pl$1,
    pt: pt$1,
    ru: ru$1,
    ko: ko$1,
};
function localize(string, search = '', replace = '') {
    const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');
    let translated;
    try {
        translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
    }
    catch (e) {
        translated = string.split('.').reduce((o, i) => o[i], languages['en']);
    }
    if (translated === undefined)
        translated = string.split('.').reduce((o, i) => o[i], languages['en']);
    if (search !== '' && replace !== '') {
        translated = translated.replace(search, replace);
    }
    return translated;
}

let SliderButtonCardEditor = class SliderButtonCardEditor extends LitElement {
    constructor() {
        super(...arguments);
        this._initialized = false;
        this.directions = getEnumValues(SliderDirections);
        this.backgrounds = getEnumValues(SliderBackground);
        this.actionModes = getEnumValues(ActionButtonMode);
        this.actions = [
            "more-info",
            "toggle",
            "navigate",
            "url",
            "call-service",
            "none",
        ];
    }
    async setConfig(config) {
        this._config = config;
        if (this._helpers === undefined) {
            await this.loadCardHelpers();
        }
    }
    shouldUpdate() {
        if (!this._initialized) {
            this._initialize();
        }
        return true;
    }
    get _name() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.name) || '';
    }
    get _show_name() {
        var _a, _b;
        return typeof ((_a = this._config) === null || _a === void 0 ? void 0 : _a.show_name) === 'undefined' ? true : (_b = this._config) === null || _b === void 0 ? void 0 : _b.show_name;
    }
    get _show_state() {
        var _a, _b;
        return typeof ((_a = this._config) === null || _a === void 0 ? void 0 : _a.show_state) === 'undefined' ? true : (_b = this._config) === null || _b === void 0 ? void 0 : _b.show_state;
    }
    get _compact() {
        var _a, _b;
        return typeof ((_a = this._config) === null || _a === void 0 ? void 0 : _a.compact) !== 'boolean' ? false : (_b = this._config) === null || _b === void 0 ? void 0 : _b.compact;
    }
    get _entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.entity) || '';
    }
    get _icon() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.icon) || IconConfigDefault;
    }
    get _slider() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.slider) || SliderConfigDefault;
    }
    get _action_button() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.action_button) || ActionButtonConfigDefault;
    }
    render() {
        var _a, _b;
        if (!this.hass || !this._helpers) {
            return html ``;
        }
        // The climate more-info has ha-switch and paper-dropdown-menu elements that are lazy loaded unless explicitly done here
        this._helpers.importMoreInfoControl('climate');
        return html `
      <div class="card-config">
        <div class="tabs">
          <div class="tab">
            <input type="checkbox" id="entity" class="tab-checkbox">
            <label class="tab-label" for="entity">${localize('tabs.general.title')}</label>
            <div class="tab-content">
              <ha-entity-picker
                .hass=${this.hass}
                .includeDomains=${getEnumValues(Domain)}
                .value=${this._entity}
                .configValue=${'entity'}
                label="${localize('tabs.general.entity')}"
                allow-custom-entity
                @value-changed=${this._valueChangedEntity}
              ></ha-entity-picker>
              <paper-input
                label="${localize('tabs.general.name')}"
                .value=${this._name}
                .placeholder=${this._name || ((_b = (_a = this.hass.states[this._entity]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name)}
                .configValue=${'name'}
                @value-changed=${this._valueChanged}
              ></paper-input>
              <div class="side-by-side">
                <ha-formfield .label=${localize('tabs.general.show_name')}>
                  <ha-switch
                    .checked=${this._show_name}
                    .configValue=${'show_name'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${localize('tabs.general.show_state')}>
                  <ha-switch
                    .checked=${this._show_state}
                    .configValue=${'show_state'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${localize('tabs.general.compact')}>
                  <ha-switch
                    .checked=${this._compact}
                    .configValue=${'compact'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            </div>
          </div>

          <div class="tab">
            <input type="checkbox" id="icon" class="tab-checkbox">
            <label class="tab-label" for="icon">${localize('tabs.icon.title')}</label>
            <div class="tab-content">
              <ha-icon-input
              label="${localize('tabs.icon.icon')}"
              .value=${this._icon.icon}
              .placeholder=${this._icon.icon || ee(this.hass.states[this._entity])}
              .configValue=${'icon.icon'}
              @value-changed=${this._valueChanged}
              >
              </ha-icon-input>
              <div class="side-by-side">
                <ha-formfield label="${localize('tabs.icon.show_icon')}">
                  <ha-switch
                    .checked=${this._icon.show}
                    .configValue=${'icon.show'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                ${this.renderStateColor('icon')}
              </div>
              <hui-action-editor
                label="${localize('tabs.icon.tap_action')}"
                .hass=${this.hass}
                .config=${this._icon.tap_action}
                .actions=${this.actions}
                .configValue=${"icon.tap_action"}
                @value-changed=${this._valueChanged}
              ></hui-action-editor>
            </div>
          </div>
          
          <div class="tab">
            <input type="checkbox" id="slider" class="tab-checkbox">
            <label class="tab-label" for="slider">${localize('tabs.slider.title')}</label>
            <div class="tab-content">
              <div class="side-by-side">
                <paper-dropdown-menu
                  label="${localize('tabs.slider.direction')}"
                >
                  <paper-listbox 
                    slot="dropdown-content" 
                    attr-for-selected="item-value"
                    .configValue=${'slider.direction'}
                    @selected-item-changed=${this._valueChangedSelect}
                    .selected=${this._slider.direction}
                  >
                    ${this.directions.map(direction => {
            return html `
                        <paper-item .itemValue=${direction}>${localize(`direction.${direction}`)}</paper-item>
                      `;
        })}
                  </paper-listbox>
                </paper-dropdown-menu>
                <paper-dropdown-menu
                  label="${localize('tabs.slider.background')}"
                >
                  <paper-listbox
                    slot="dropdown-content"
                    attr-for-selected="item-value"
                    .configValue=${'slider.background'}
                    @selected-item-changed=${this._valueChangedSelect}
                    .selected=${this._slider.background}
                  >
                    ${this.backgrounds.map(background => {
            return html `
                        <paper-item .itemValue=${background}>${localize(`background.${background}`)}</paper-item>
                      `;
        })}
                  </paper-listbox>
                </paper-dropdown-menu>

              </div>
              <div class="side-by-side">
                ${this.renderBrightness('slider')}
                ${this.renderStateColor('slider')}
                <ha-formfield .label=${localize('tabs.slider.show_track')}>
                  <ha-switch
                    .checked=${this._slider.show_track}
                    .configValue=${'slider.show_track'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${localize('tabs.slider.toggle_on_click')}>
                  <ha-switch
                    .checked=${this._slider.toggle_on_click}
                    .configValue=${'slider.toggle_on_click'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${localize('tabs.slider.force_square')}>
                  <ha-switch
                    .checked=${this._slider.force_square}
                    .configValue=${'slider.force_square'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            </div>
          </div>
          
          <div class="tab">
            <input type="checkbox" id="action" class="tab-checkbox">
            <label class="tab-label" for="action">${localize('tabs.action_button.title')}</label>
            <div class="tab-content">
              <paper-dropdown-menu
                label="${localize('tabs.action_button.mode')}"
              >
                <paper-listbox
                  slot="dropdown-content"
                  attr-for-selected="item-value"
                  .configValue=${'action_button.mode'}
                  @selected-item-changed=${this._valueChangedSelect}
                  .selected=${this._action_button.mode}
                >
                  ${this.actionModes.map(mode => {
            return html `
                        <paper-item .itemValue=${mode}>${localize(`mode.${mode}`)}</paper-item>
                      `;
        })}
                </paper-listbox>
              </paper-dropdown-menu>              
              ${this._action_button.mode === ActionButtonMode.CUSTOM
            ? html `
                  <ha-icon-input
                    label="${localize('tabs.action_button.icon')}"
                    .value=${this._action_button.icon}
                    .placeholder=${this._action_button.icon || 'mdi:power'}
                    .configValue=${'action_button.icon'}
                    @value-changed=${this._valueChanged}
                  >
                  </ha-icon-input>
                `
            :
                ''}
              <div class="side-by-side">
                <ha-formfield .label=${localize('tabs.action_button.show_button')}>
                  <ha-switch
                    .checked=${this._action_button.show}
                    .configValue=${'action_button.show'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                ${this._action_button.mode === ActionButtonMode.CUSTOM
            ? html `
                    <ha-formfield .label=${localize('tabs.action_button.show_spinner')}>
                      <ha-switch
                        .checked=${this._action_button.show_spinner}
                        .configValue=${'action_button.show_spinner'}
                        @change=${this._valueChanged}
                      ></ha-switch>
                    </ha-formfield>
                `
            :
                ''}
              </div>
              ${this._action_button.mode === ActionButtonMode.CUSTOM
            ? html `
                  <hui-action-editor
                    label="${localize('tabs.action_button.tap_action')}"
                    .hass=${this.hass}
                    .config=${this._action_button.tap_action}
                    .actions=${this.actions}
                    .configValue=${"action_button.tap_action"}
                    @value-changed=${this._valueChanged}
                  ></hui-action-editor>
                `
            :
                ''}
            </div>
          </div>
        </div>
      </div>
    `;
    }
    renderBrightness(path) {
        const item = this[`_${path}`];
        return html `
      <ha-formfield .label=${localize('tabs.slider.use_brightness')}>
        <ha-switch
          .checked=${item.use_percentage_bg_opacity}
          .configValue="${path}.use_percentage_bg_opacity"
          @change=${this._valueChanged}
        ></ha-switch>
      </ha-formfield>
    `;
    }
    renderStateColor(path) {
        const item = this[`_${path}`];
        return html `
      <ha-formfield .label=${localize('tabs.icon.use_state_color')}>
        <ha-switch
          .checked=${item.use_state_color}
          .configValue="${path}.use_state_color"
          @change=${this._valueChanged}
        ></ha-switch>
      </ha-formfield>
    `;
    }
    _initialize() {
        if (this.hass === undefined)
            return;
        if (this._config === undefined)
            return;
        if (this._helpers === undefined)
            return;
        this._initialized = true;
    }
    async loadCardHelpers() {
        this._helpers = await window.loadCardHelpers();
    }
    _valueChangedSelect(ev) {
        var _a;
        const value = ev.detail.value;
        if (!value) {
            return;
        }
        this._changeValue((_a = value.parentElement) === null || _a === void 0 ? void 0 : _a.configValue, value.itemValue);
    }
    _valueChangedEntity(ev) {
        var _a, _b;
        const target = ev.target;
        const value = (_a = ev.detail) === null || _a === void 0 ? void 0 : _a.value;
        const updateDefaults = f(value) !== f(((_b = this._config) === null || _b === void 0 ? void 0 : _b.entity) || 'light.dummy');
        this._changeValue('name', '');
        this._changeValue('icon.icon', '');
        this._changeValue(target.configValue, value);
        if (updateDefaults) {
            const cfg = copy(this._config);
            applyPatch(cfg, ['slider'], getSliderDefaultForEntity(value));
            this._config = cfg;
            q(this, 'config-changed', { config: this._config });
        }
    }
    _valueChanged(ev) {
        var _a;
        const target = ev.target;
        const value = (_a = ev.detail) === null || _a === void 0 ? void 0 : _a.value;
        this._changeValue(target.configValue, target.checked !== undefined ? target.checked : value);
    }
    _changeValue(configValue, value) {
        if (!this._config || !this.hass) {
            return;
        }
        if (this[`_${configValue}`] !== undefined && this[`_${configValue}`] === value) {
            return;
        }
        if (configValue) {
            const cfg = copy(this._config);
            applyPatch(cfg, [...configValue.split('.')], value);
            this._config = cfg;
            if (value === '') {
                delete this._config[configValue];
            }
        }
        q(this, 'config-changed', { config: this._config });
    }
    static get styles() {
        return css `
      ha-switch {
        padding: 16px 6px;
      }
      .side-by-side {
        display: flex;
        flex-flow: row wrap;
      }
      .side-by-side > * {
        padding-right: 8px;
        width: 50%;
        flex-flow: column wrap;
        box-sizing: border-box;
      }
      .side-by-side > *:last-child {
        flex: 1;
        padding-right: 0;
      }
      .suffix {
        margin: 0 8px;
      }
      .group {
        padding: 15px;
        border: 1px solid var(--primary-text-color)
      }
      .tabs {
        overflow: hidden;        
      }
      .tab {
        width: 100%;
        color: var(--primary-text-color);
        overflow: hidden;
      }
      .tab-label {
        display: flex;
        justify-content: space-between;
        padding: 1em 1em 1em 0em;
        border-bottom: 1px solid var(--secondary-text-color);
        font-weight: bold;
        cursor: pointer;
      }
      .tab-label:hover {
        /*background: #1a252f;*/
      }
      .tab-label::after {
        content: "❯";
        width: 1em;
        height: 1em;
        text-align: center;
        transition: all 0.35s;
      }
      .tab-content {
        max-height: 0;
        padding: 0 1em;
        background: var(--secondary-background-color);
        transition: all 0.35s;
      }
      input.tab-checkbox {
        position: absolute;
        opacity: 0;
        z-index: -1;
      }      
      input.tab-checkbox:checked + .tab-label {
        border-color: var(--accent-color);
      }
      input.tab-checkbox:checked + .tab-label::after {
        transform: rotate(90deg);
      }
      input.tab-checkbox:checked ~ .tab-content {
        max-height: 100vh;
        padding: 1em;
      }      
    `;
    }
};
__decorate([
    property({ attribute: false })
], SliderButtonCardEditor.prototype, "hass", void 0);
__decorate([
    state$9()
], SliderButtonCardEditor.prototype, "_config", void 0);
__decorate([
    state$9()
], SliderButtonCardEditor.prototype, "_helpers", void 0);
SliderButtonCardEditor = __decorate([
    customElement('slider-button-card-editor')
], SliderButtonCardEditor);

/* eslint no-console: 0 */
console.info(`%c  SLIDER-BUTTON-CARD %c ${localize('common.version')}${CARD_VERSION} %c`, 'background-color: #555;color: #fff;padding: 3px 2px 3px 3px;border: 1px solid #555;border-radius: 3px 0 0 3px;font-family: Roboto,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)', 'background-color: transparent;color: #555;padding: 3px 3px 3px 2px;border: 1px solid #555; border-radius: 0 3px 3px 0;font-family: Roboto,Verdana,Geneva,sans-serif', 'background-color: transparent');
// This puts your card into the UI card picker dialog
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'slider-button-card',
    name: 'Slider button Card',
    description: 'A button card with slider',
    preview: true,
});
let SliderButtonCard = class SliderButtonCard extends LitElement {
    constructor() {
        super(...arguments);
        this.changing = false;
        this.changed = false;
    }
    static async getConfigElement() {
        return document.createElement('slider-button-card-editor');
    }
    static getStubConfig(hass, entities) {
        const entity = entities.find(item => item.startsWith('light')) || '';
        return {
            entity: entity,
            slider: getSliderDefaultForEntity(entity),
            // eslint-disable-next-line @typescript-eslint/camelcase
            show_name: true,
            // eslint-disable-next-line @typescript-eslint/camelcase
            show_state: true,
            compact: false,
            icon: copy(IconConfigDefault),
            // eslint-disable-next-line @typescript-eslint/camelcase
            action_button: copy(ActionButtonConfigDefault),
        };
    }
    getCardSize() {
        return 0;
    }
    setConfig(config) {
        if (!config) {
            throw new Error(localize('common.invalid_configuration'));
        }
        if (!config.entity) {
            throw new Error(localize('common.invalid_configuration'));
        }
        this.config = Object.assign({ slider: getSliderDefaultForEntity(config.entity), icon: copy(IconConfigDefault), 
            // eslint-disable-next-line @typescript-eslint/camelcase
            show_name: true, 
            // eslint-disable-next-line @typescript-eslint/camelcase
            show_state: true, compact: false, 
            // eslint-disable-next-line @typescript-eslint/camelcase
            action_button: copy(ActionButtonConfigDefault), debug: false }, config);
        this.ctrl = ControllerFactory.getInstance(this.config);
    }
    shouldUpdate(changedProps) {
        if (!this.config) {
            return false;
        }
        const oldHass = changedProps.get('hass');
        if (!oldHass ||
            oldHass.themes !== this.hass.themes ||
            oldHass.language !== this.hass.language) {
            this.ctrl.log('shouldUpdate', 'forced true');
            return true;
        }
        return K(this, changedProps, false);
    }
    updated(changedProps) {
        this.updateValue(this.ctrl.value, false);
        this.animateActionEnd();
        const oldHass = changedProps.get('hass');
        const oldConfig = changedProps.get('config');
        if ((oldHass === null || oldHass === void 0 ? void 0 : oldHass.themes) !== this.hass.themes ||
            (oldConfig === null || oldConfig === void 0 ? void 0 : oldConfig.theme) !== this.config.theme) {
            this.ctrl.log('Theme', 'updated');
            h(this, this.hass.themes, this.config.theme);
        }
        this.ctrl.log('Updated', this.ctrl.value);
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
    }
    render() {
        var _a, _b, _c, _d, _e;
        this.ctrl.hass = this.hass;
        if (!this.ctrl.stateObj) {
            return this._showError(localize('common.show_error'));
        }
        return html `
      <ha-card
        tabindex="0"
        .label=${`SliderButton: ${this.config.entity || 'No Entity Defined'}`}
        class="${classMap({ 'square': ((_a = this.config.slider) === null || _a === void 0 ? void 0 : _a.force_square) || false, 'hide-name': !this.config.show_name, 'hide-state': !this.config.show_state, 'hide-action': !((_b = this.config.action_button) === null || _b === void 0 ? void 0 : _b.show), 'compact': this.config.compact === true })}"
      >
        <div class="button ${classMap({ off: this.ctrl.isOff, unavailable: this.ctrl.isUnavailable })}"
             style=${styleMap({
            '--slider-value': `${this.ctrl.percentage}%`,
            '--slider-bg-filter': this.ctrl.style.slider.filter,
            '--slider-color': this.ctrl.style.slider.color,
            '--icon-filter': this.ctrl.style.icon.filter,
            '--icon-color': this.ctrl.style.icon.color,
        })}
             >
          <div class="slider"
               data-show-track="${(_c = this.config.slider) === null || _c === void 0 ? void 0 : _c.show_track}"
               data-mode="${(_d = this.config.slider) === null || _d === void 0 ? void 0 : _d.direction}"
               data-background="${(_e = this.config.slider) === null || _e === void 0 ? void 0 : _e.background}"
               data-is-toggle="${this.ctrl.hasToggle}"
               @pointerdown=${this.onPointerDown}
               @pointermove=${this.onPointerMove}
               @pointerup=${this.onPointerUp}
          >
            ${this.ctrl.hasToggle
            ? html `
                <div class="toggle-overlay" @click=${this.handleClick}></div>
                `
            : ''}
            <div class="slider-bg"></div>
            <div class="slider-thumb"></div>           
          </div>
          ${this.renderText()}
          ${this.renderAction()}
          ${this.renderIcon()}
        </div>
      </ha-card>
    `;
    }
    renderText() {
        if (!this.config.show_name && !this.config.show_state) {
            return html ``;
        }
        return html `
          <div class="text">
            ${this.config.show_name
            ? html `
                <div class="name">${this.ctrl.name}</div>
                `
            : ''}
            ${this.config.show_state
            ? html `
                <div class="state">
                  ${this.ctrl.isUnavailable
                ? html `
                    ${this.hass.localize('state.default.unavailable')}
                    ` : html `
                    ${this.ctrl.label}
                  `}
                </div>
                `
            : ''}
          </div>
    `;
    }
    renderIcon() {
        var _a;
        if (((_a = this.config.icon) === null || _a === void 0 ? void 0 : _a.show) === false) {
            return html ``;
        }
        let hasPicture = false;
        let backgroundImage = '';
        if (this.ctrl.stateObj.attributes.entity_picture) {
            backgroundImage = `url(${this.ctrl.stateObj.attributes.entity_picture})`;
            hasPicture = true;
        }
        return html `
      <div class="icon ${classMap({ 'has-picture': hasPicture })}"
           @action=${(e) => this._handleAction(e, this.config.icon)}
           .actionHandler=${actionHandler({
            hasHold: false,
            hasDoubleClick: false,
        })}
           style=${styleMap({
            'background-image': `${backgroundImage}`,
        })}
           >
        <ha-icon
          tabindex="-1"
          data-domain=${v(this.ctrl.stateObj)}
          data-state=${ifDefined(this.ctrl.stateObj ? this.ctrl.state : undefined)}          
          .icon=${this.ctrl.icon}
        />
      </div>
    `;
    }
    renderAction() {
        var _a, _b, _c, _d, _e;
        if (((_a = this.config.action_button) === null || _a === void 0 ? void 0 : _a.show) === false) {
            return html ``;
        }
        if (((_b = this.config.action_button) === null || _b === void 0 ? void 0 : _b.mode) === ActionButtonMode.TOGGLE) {
            return html `
        <div class="action">
          <ha-switch
            .disabled=${this.ctrl.isUnavailable}
            .checked=${!D.includes(this.ctrl.state)}
            @change=${this._toggle}
          ></ha-switch>
        </div>
      `;
        }
        return html `
      <div class="action"
           @action=${(e) => this._handleAction(e, this.config.action_button)}
           .actionHandler=${actionHandler({
            hasHold: false,
            hasDoubleClick: false,
        })}           
           >
        <ha-icon
          tabindex="-1"
          .icon=${((_c = this.config.action_button) === null || _c === void 0 ? void 0 : _c.icon) || 'mdi:power'}
        ></ha-icon>
        ${typeof ((_d = this.config.action_button) === null || _d === void 0 ? void 0 : _d.show_spinner) === 'undefined' || ((_e = this.config.action_button) === null || _e === void 0 ? void 0 : _e.show_spinner)
            ? html `
            <svg class="circular-loader" viewBox="25 25 50 50">
              <circle class="loader-path" cx="50" cy="50" r="20"></circle>
            </svg>
                `
            : ''}
      </div>
    `;
    }
    _handleAction(ev, config) {
        var _a;
        if (this.hass && this.config && ev.detail.action) {
            if (((_a = config.tap_action) === null || _a === void 0 ? void 0 : _a.action) === 'toggle' && !this.ctrl.isUnavailable) {
                this.animateActionStart();
            }
            G(this, this.hass, Object.assign(Object.assign({}, config), { entity: this.config.entity }), ev.detail.action);
        }
    }
    async handleClick(ev) {
        if (this.ctrl.hasToggle && !this.ctrl.isUnavailable) {
            ev.preventDefault();
            this.animateActionStart();
            this.ctrl.log('Toggle');
            await W(this.hass, this.config.entity);
            // this.setStateValue(this.ctrl.toggleValue);
        }
    }
    _toggle() {
        if (this.hass && this.config) {
            // eslint-disable-next-line @typescript-eslint/camelcase
            G(this, this.hass, { tap_action: { action: 'toggle' }, entity: this.config.entity }, 'tap');
        }
    }
    setStateValue(value) {
        this.ctrl.log('setStateValue', value);
        this.updateValue(value, false);
        this.ctrl.value = value;
        this.animateActionStart();
    }
    animateActionStart() {
        this.animateActionEnd();
        if (this.action) {
            this.action.classList.add('loading');
        }
    }
    animateActionEnd() {
        if (this.action) {
            clearTimeout(this.actionTimeout);
            this.actionTimeout = setTimeout(() => {
                this.action.classList.remove('loading');
            }, 750);
        }
    }
    updateValue(value, changing = true) {
        this.changing = changing;
        this.changed = !changing;
        this.ctrl.log('updateValue', value);
        this.ctrl.targetValue = value;
        if (!this.button) {
            return;
        }
        this.button.classList.remove('off');
        if (changing) {
            this.button.classList.add('changing');
        }
        else {
            this.button.classList.remove('changing');
            if (this.ctrl.isOff) {
                this.button.classList.add('off');
            }
        }
        if (this.stateText) {
            this.stateText.innerHTML = this.ctrl.isUnavailable ? `${this.hass.localize('state.default.unavailable')}` : this.ctrl.label;
        }
        this.button.style.setProperty('--slider-value', `${this.ctrl.percentage}%`);
        this.button.style.setProperty('--slider-bg-filter', this.ctrl.style.slider.filter);
        this.button.style.setProperty('--slider-color', this.ctrl.style.slider.color);
        this.button.style.setProperty('--icon-filter', this.ctrl.style.icon.filter);
        this.button.style.setProperty('--icon-color', this.ctrl.style.icon.color);
        this.button.style.setProperty('--icon-rotate-speed', this.ctrl.style.icon.rotateSpeed || '0s');
    }
    _showError(error) {
        const errorCard = document.createElement('hui-error-card');
        errorCard.setConfig({
            type: 'error',
            error,
            origConfig: this.config
        });
        return html `
      ${errorCard}
    `;
    }
    getColorFromVariable(color) {
        if (typeof color !== 'undefined' && color.substring(0, 3) === 'var') {
            let varColor = window.getComputedStyle(this).getPropertyValue(color.substring(4).slice(0, -1)).trim();
            if (!varColor.length) {
                varColor = window.getComputedStyle(document.documentElement).getPropertyValue(color.substring(4).slice(0, -1)).trim();
            }
            return varColor;
        }
        return color;
    }
    onPointerDown(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.ctrl.isSliderDisabled) {
            return;
        }
        this.slider.setPointerCapture(event.pointerId);
    }
    onPointerUp(event) {
        if (this.ctrl.isSliderDisabled) {
            return;
        }
        this.setStateValue(this.ctrl.targetValue);
        this.slider.releasePointerCapture(event.pointerId);
    }
    onPointerMove(event) {
        if (this.ctrl.isSliderDisabled) {
            return;
        }
        if (!this.slider.hasPointerCapture(event.pointerId))
            return;
        const { left, top, width, height } = this.slider.getBoundingClientRect();
        const percentage = this.ctrl.moveSlider(event, { left, top, width, height });
        this.ctrl.log('onPointerMove', percentage);
        this.updateValue(percentage);
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    static get styles() {
        return css `
    ha-card {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      min-height: 7rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      touch-action: none;
      overflow: hidden;      
      --mdc-icon-size: 2.2em;
    }
    ha-card.square {
      aspect-ratio: 1 / 1;
    }
    ha-card.compact {
      min-height: 3rem !important;
    }    
    :host {
      --slider-bg-default-color: var(--primary-color, rgb(95, 124, 171));
      --slider-bg: var(--slider-color);
      --slider-bg-filter: brightness(100%);
      --slider-bg-direction: to right;
      --slider-track-color: #2b374e; 
      --slider-tracker-color: transparent;
      --slider-value: 0%;
      --slider-transition-duration: 0.2s;      
      /*--label-text-shadow: rgb(255 255 255 / 10%) -1px -1px 1px, rgb(0 0 0 / 50%) 1px 1px 1px;*/
      /*--label-color-on: var(--primary-text-color, white);*/
      /*--label-color-off: var(--primary-text-color, white);*/
      --icon-filter: brightness(100%);
      --icon-color: var(--paper-item-icon-color);
      --icon-rotate-speed: 0s;
      /*--state-color-on: #BAC0C6; */
      /*--state-color-off: var(--disabled-text-color);*/
      /*--state-text-shadow: rgb(255 255 255 / 10%) -1px -1px 1px, rgb(0 0 0 / 50%) 1px 1px 1px;*/
      --btn-bg-color-off: rgba(43,55,78,1);
      --btn-bg-color-on: #20293c;
      /*--action-icon-color-on: var(--paper-item-icon-color, black);*/
      /*--action-icon-color-off: var(--paper-item-icon-color, black);*/      
      /*--action-spinner-color: var(--label-badge-text-color, white);*/
    }
    /* --- BUTTON --- */
    
    .button {
      position: relative;
      padding: 0.8rem;
      box-sizing: border-box;
      height: 100%;
      min-height: 7rem;
      width: 100%;
      display: block;
      overflow: hidden;           
      transition: all 0.2s ease-in-out;
      touch-action: none;
    }
    ha-card.compact .button {
      min-height: 3rem !important;
    }
    .button.off {
      background-color: var(--btn-bg-color-off);
    }
    
    /* --- ICON --- */
    
    .icon {
      position: relative;
      cursor: pointer;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      box-sizing: border-box;
      padding: 0;
      outline: none;
      animation: var(--icon-rotate-speed, 0s) linear 0s infinite normal both running rotate;
      -webkit-tap-highlight-color: transparent;
    }
    .icon ha-icon {
      filter: var(--icon-filter, brightness(100%));
      color: var(--icon-color);
      transition: color 0.4s ease-in-out 0s, filter 0.2s linear 0s;
    }
    .icon.has-picture {
      background-size: cover;
      border-radius: 50%;
    }
    .icon.has-picture ha-icon{
      display: none;
    }
    .unavailable .icon ha-icon {
      color: var(--disabled-text-color);
    }
    .compact .icon {
      float: left;
    }

    /* --- TEXT --- */
    
    .text {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0.8rem;
      pointer-events: none;
      user-select: none;
      font-size: 1.1rem;
      line-height: 1.3rem;
      max-width: calc(100% - 2em);
      /*text-shadow: rgb(255 255 255 / 10%) -1px -1px 1px, rgb(0 0 0 / 50%) 1px 1px 1px;*/
    }
    .compact .text {
      position: relative;
      top: 0.5rem;
      left: 0.5rem;
      display: inline-block;
      padding: 0;
      height: 1.3rem;
      width: 100%;
      overflow: hidden;
      max-width: calc(100% - 4em);
    }
    .compact.hide-action .text {         
      max-width: calc(100% - 2em);      
    }    

    /* --- LABEL --- */
    
    .name {
      color: var(--label-color-on, var(--primary-text-color, white));      
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-shadow: var(--label-text-shadow, none);
    }
    .off .name {
      color: var(--label-color-off, var(--primary-text-color, white));
    }
    .unavailable.off .name,
    .unavailable .name {
      color: var(--disabled-text-color);
    }
    .compact .name {
      display: inline-block;   
      max-width: calc(100% - 3.5em);
    }    
    
    /* --- STATE --- */
    
    .state {      
      color: var(--state-color-on, var(--label-badge-text-color, white));      
      text-overflow: ellipsis;
      white-space: nowrap;
      text-shadow: var(--state-text-shadow);
      transition: font-size 0.1s ease-in-out;
    }
    .changing .state {
      font-size: 150%;
    }
    .off .state {
      color: var(--state-color-off, var(--disabled-text-color));
    }
    .unavailable .state {
      color: var(--disabled-text-color);
    }
    .compact .state {
      display: inline-block;
      max-width: calc(100% - 0em);
      overflow: hidden;
    }
    
    
    /* --- SLIDER --- */    
    
    .slider {
      position: absolute;      
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      background-color: var( --ha-card-background, var(--card-background-color, var(--btn-bg-color-on, black)) );
      cursor: ew-resize;
      z-index: 0;
    }
    .slider[data-mode="bottom-top"] {
      cursor: ns-resize;     
    }
    .slider[data-mode="top-bottom"] {
      cursor: ns-resize;
    }
    .slider:active {
      cursor: grabbing;
    }
    
    /* --- SLIDER OVERLAY --- */      
      
    .slider .toggle-overlay {
      position: absolute;      
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      cursor: pointer;
      opacity: 0;
      z-index: 999;    
    }
    
    /* --- SLIDER BACKGROUND --- */   
     
    .slider-bg {       
      position: absolute;
      top: 0;
      left: 0px;
      height: 100%;
      width: 100%;
      background: var(--slider-bg);
      background-size: var(--slider-bg-size, 100% 100%);
      background-color: var(--slider-bg-color, transparent);
      background-position: var(--slider-bg-position, 0 0);
      filter: var(--slider-bg-filter, brightness(100%));
    }
    .off .slider .slider-bg {
      background-color: var( --ha-card-background, var(--card-background-color, var(--btn-bg-color-off, black)) );
    }
    .slider[data-background="solid"] .slider-bg {            
      --slider-bg-color: var(--slider-color);
    }
    .slider[data-background="triangle"] .slider-bg {      
      --slider-bg-direction: to bottom right;    
      --slider-bg: linear-gradient(var(--slider-bg-direction), transparent 0%, transparent 50%, var(--slider-color) 50%, var(--slider-color) 100%);
      border-right: 0px solid;
    }    
    .slider[data-background="triangle"][data-mode="bottom-top"] .slider-bg {
      --slider-bg-direction: to top left;      
    }    
    .slider[data-background="triangle"][data-mode="top-bottom"] .slider-bg {
      --slider-bg-direction: to bottom left;      
    }
    .slider[data-background="custom"] .slider-bg {    
      --slider-bg: repeating-linear-gradient(-45deg, var(--slider-color) 0, var(--slider-color) 1px, var(--slider-color) 0, transparent 10%);
      --slider-bg-size: 30px 30px;
    }    
    .slider[data-background="gradient"] .slider-bg {
      --slider-bg: linear-gradient(var(--slider-bg-direction), rgba(0, 0, 0, 0) -10%, var(--slider-color) 100%);
    }    
    .slider[data-background="striped"] .slider-bg {
      --slider-bg: linear-gradient(var(--slider-bg-direction), var(--slider-color), var(--slider-color) 50%, transparent 50%, transparent);
      --slider-bg-size: 4px 100%;
    }
    .slider[data-background="striped"][data-mode="bottom-top"] .slider-bg,
    .slider[data-background="striped"][data-mode="top-bottom"] .slider-bg {      
      --slider-bg-size: 100% 4px;
    }    
    .slider[data-mode="bottom-top"] .slider-bg {
      --slider-bg-direction: to top;      
    }    
    .slider[data-mode="top-bottom"] .slider-bg {
      --slider-bg-direction: to bottom;      
    }
    
    /* --- SLIDER THUMB --- */        
    
    .slider-thumb {
      position: relative;
      width: 100%;
      height: 100%;      
      transform: translateX(var(--slider-value));
      background: transparent;
      transition: transform var(--slider-transition-duration) ease-in;
    }
    .changing .slider .slider-thumb {
      transition: none;
    }    
    .slider[data-mode="top-bottom"] .slider-thumb {
      transform: translateY(var(--slider-value)) !important;
    }
    .slider[data-mode="bottom-top"] .slider-thumb {
      transform: translateY(calc(var(--slider-value) * -1))  !important;
    }
    
    .slider-thumb:before {
      content: '';
      position: absolute;
      top: 0;
      left: -2px;
      height: 100%;
      width: 2px;          
      background: var(--slider-color);
      opacity: 0;       
      transition: opacity 0.2s ease-in-out 0s;   
      box-shadow: var(--slider-color) 0px 1px 5px 1px;
      z-index: 999;
    }
    .slider[data-mode="top-bottom"] .slider-thumb:before {
      top: -2px;
      left: 0px;
      height: 2px;
      width: 100%;              
    }    
    .changing .slider-thumb:before {
      opacity: 0.5;    
    }
    .off.changing .slider-thumb:before {
      opacity: 0;    
    }
    
    .slider-thumb:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0px;
      height: 100%;
      width: 100%;          
      background: var( --ha-card-background, var(--card-background-color, var(--btn-bg-color-on, black)) );
      opacity: 1;            
    }
    .slider[data-show-track="true"] .slider-thumb:after {
      opacity: 0.9;
    }
    .off .slider[data-show-track="true"] .slider-thumb:after {
      opacity: 1;
    }
                  
    /* --- ACTION BUTTON --- */      
              
    .action {
      position: relative;
      float: right;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      color: var(--action-icon-color-on, var(--paper-item-icon-color, black));
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }    
    .action ha-switch {
      position: absolute;
      right: 0;
      top: 5px;
    }    
    .off .action {
      color: var(--action-icon-color-off, var(--paper-item-icon-color, black));
    }
    .unavailable .action {
      color: var(--disabled-text-color);
    }
    

    .circular-loader {
      position: absolute;
      left: -8px;
      top: -8px;
      width: calc(var(--mdc-icon-size, 24px) + 16px);
      height: calc(var(--mdc-icon-size, 24px) + 16px);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      animation: rotate 2s linear infinite; 
    }   
    .action.loading .circular-loader {
      opacity: 1;      
    }    

    .loader-path {
      fill: none;
      stroke-width: 2px;
      stroke: var(--action-spinner-color, var(--label-badge-text-color, white));
      animation: animate-stroke 1.5s ease-in-out infinite both;        
      stroke-linecap: round;
    }
    
    /* --- MISC --- */    
    
    .unavailable .slider .toggle-overlay,
    .unavailable .action,
    .unavailable .action ha-switch,    
    .unavailable .slider {
      cursor: not-allowed !important;
    }
    
    
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes animate-stroke {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124;
      }
    }     
    `;
    }
};
__decorate([
    property({ attribute: false })
], SliderButtonCard.prototype, "hass", void 0);
__decorate([
    state$9()
], SliderButtonCard.prototype, "config", void 0);
__decorate([
    query('.state')
], SliderButtonCard.prototype, "stateText", void 0);
__decorate([
    query('.button')
], SliderButtonCard.prototype, "button", void 0);
__decorate([
    query('.action')
], SliderButtonCard.prototype, "action", void 0);
__decorate([
    query('.slider')
], SliderButtonCard.prototype, "slider", void 0);
SliderButtonCard = __decorate([
    customElement('slider-button-card')
], SliderButtonCard);

export { SliderButtonCard };
