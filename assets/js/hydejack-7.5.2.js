/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(0);
var hide = __webpack_require__(7);
var redefine = __webpack_require__(39);
var ctx = __webpack_require__(15);
var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
module.exports = __webpack_require__(0).Function.bind;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
// eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(21)('wks');
var uid = __webpack_require__(9);
var _Symbol = __webpack_require__(4).Symbol;
var USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(33);
var createDesc = __webpack_require__(38);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(5)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(11);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
module.exports = __webpack_require__(0).Array.forEach;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(16);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(15);
var IObject = __webpack_require__(10);
var toObject = __webpack_require__(18);
var toLength = __webpack_require__(19);
var asc = __webpack_require__(40);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res; // map
          else if (res) switch (TYPE) {
              case 3:
                return true; // some
              case 5:
                return val; // find
              case 6:
                return index; // findIndex
              case 2:
                result.push(val); // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function (it) {
  return Object(defined(it));
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(20);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(4);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(43) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(10);
var defined = __webpack_require__(12);
module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(22);
var toLength = __webpack_require__(19);
var toAbsoluteIndex = __webpack_require__(58);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(6)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(7)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(25);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: { channels: 3, labels: 'rgb' },
	hsl: { channels: 3, labels: 'hsl' },
	hsv: { channels: 3, labels: 'hsv' },
	hwb: { channels: 3, labels: 'hwb' },
	cmyk: { channels: 4, labels: 'cmyk' },
	xyz: { channels: 3, labels: 'xyz' },
	lab: { channels: 3, labels: 'lab' },
	lch: { channels: 3, labels: 'lch' },
	hex: { channels: 1, labels: ['hex'] },
	keyword: { channels: 1, labels: ['keyword'] },
	ansi16: { channels: 1, labels: ['ansi16'] },
	ansi256: { channels: 1, labels: ['ansi256'] },
	hcg: { channels: 3, labels: ['h', 'c', 'g'] },
	apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
	gray: { channels: 1, labels: ['gray'] }
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', { value: channels });
		Object.defineProperty(convert[model], 'labels', { value: labels });
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var v;

	if (max === 0) {
		s = 0;
	} else {
		s = delta / max * 1000 / 10;
	}

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	v = max / 255 * 1000 / 10;

	return [h, s, v];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
	g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
	b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

	var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
	var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
	var z = r * 0.0193 + g * 0.1192 + b * 0.9505;

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

	l = 116 * y - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= l <= 1 ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - s * f);
	var t = 255 * v * (1 - s * (1 - f));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= lmin <= 1 ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0:
			r = v;g = n;b = wh;break;
		case 1:
			r = n;g = v;b = wh;break;
		case 2:
			r = wh;g = v;b = n;break;
		case 3:
			r = wh;g = n;b = v;break;
		case 4:
			r = n;g = wh;b = v;break;
		case 5:
			r = v;g = wh;b = n;break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = x * 3.2406 + y * -1.5372 + z * -0.4986;
	g = x * -0.9689 + y * 1.8758 + z * 0.0415;
	b = x * 0.0557 + y * -0.2040 + z * 1.0570;

	// assume sRGB
	r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92;

	g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92;

	b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

	l = 116 * y - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round((r - 8) / 247 * 24) + 232;
	}

	var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = (color & 1) * mult * 255;
	var g = (color >> 1 & 1) * mult * 255;
	var b = (color >> 2 & 1) * mult * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = rem % 6 / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = integer >> 16 & 0xFF;
	var g = integer >> 8 & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = max - min;
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else if (max === r) {
		hue = (g - b) / chroma % 6;
	} else if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = h % 1 * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1;pure[1] = v;pure[2] = 0;break;
		case 1:
			pure[0] = w;pure[1] = 1;pure[2] = 0;break;
		case 2:
			pure[0] = 0;pure[1] = 1;pure[2] = v;break;
		case 3:
			pure[0] = 0;pure[1] = w;pure[2] = 1;break;
		case 4:
			pure[0] = v;pure[1] = 0;pure[2] = 1;break;
		default:
			pure[0] = 1;pure[1] = 0;pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};

convert.rgb.apple = function (rgb) {
	return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/web-animations-js/web-animations.min.js
var web_animations_min = __webpack_require__(28);
var web_animations_min_default = /*#__PURE__*/__webpack_require__.n(web_animations_min);

// EXTERNAL MODULE: ./_js/lib/modernizr-custom.js
var modernizr_custom = __webpack_require__(29);
var modernizr_custom_default = /*#__PURE__*/__webpack_require__.n(modernizr_custom);

// EXTERNAL MODULE: ./_js/lib/template-polyfill.js
var template_polyfill = __webpack_require__(30);
var template_polyfill_default = /*#__PURE__*/__webpack_require__.n(template_polyfill);

// EXTERNAL MODULE: ./node_modules/core-js/fn/array/for-each.js
var for_each = __webpack_require__(13);
var for_each_default = /*#__PURE__*/__webpack_require__.n(for_each);

// EXTERNAL MODULE: ./node_modules/core-js/fn/function/bind.js
var bind = __webpack_require__(3);
var bind_default = /*#__PURE__*/__webpack_require__.n(bind);

// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return _extendStatics(d, b);
};

function __extends(d, b) {
    _extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return _assign.apply(this, arguments);
};


function __rest(s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
}

function __metadata(metadataKey, metadataValue) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []),
        i,
        q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
    }, i;
    function verb(n) {
        if (g[n]) i[n] = function (v) {
            return new Promise(function (a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function () {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function (v) {
            return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
        } : f;
    }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
        i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function (v) {
            return new Promise(function (resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function (v) {
            resolve({ value: v, done: d });
        }, reject);
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    } else {
        cooked.raw = raw;
    }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }result.default = mod;
    return result;
}

function __importDefault(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
}
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isFunction.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
    return typeof x === 'function';
}
//# sourceMappingURL=isFunction.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/config.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config_config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = /*@__PURE__*/new Error();
            /*@__PURE__*/console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            /*@__PURE__*/console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    }
};
//# sourceMappingURL=config.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/hostReportError.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
    setTimeout(function () {
        throw err;
    });
}
//# sourceMappingURL=hostReportError.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Observer.js
/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */


var empty = {
    closed: true,
    next: function next(value) {},
    error: function error(err) {
        if (/* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.useDeprecatedSynchronousErrorHandling) {
            throw err;
        } else {
            /* Cannot get final name for export "hostReportError" in "./node_modules/rxjs/_esm5/internal/Observer.js" (known exports: empty, known reexports: ) */ undefined(err);
        }
    },
    complete: function complete() {}
};
//# sourceMappingURL=Observer.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isArray.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = Array.isArray || function (x) {
  return x && typeof x.length === 'number';
};
//# sourceMappingURL=isArray.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isObject.js
var isObject__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
    return x != null && (typeof x === 'undefined' ? 'undefined' : isObject__typeof(x)) === 'object';
}
//# sourceMappingURL=isObject.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/errorObject.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/tryCatch.js
/** PURE_IMPORTS_START _errorObject PURE_IMPORTS_END */

var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    } catch (e) {
        /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e = e;
        return /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
//# sourceMappingURL=tryCatch.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js
/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */

var UnsubscriptionError_UnsubscriptionError = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        var _this = _super.call(this, errors ? errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) {
            return i + 1 + ") " + err.toString();
        }).join('\n  ') : '') || this;
        _this.errors = errors;
        _this.name = 'UnsubscriptionError';
        Object.setPrototypeOf(_this, UnsubscriptionError.prototype);
        return _this;
    }
    return UnsubscriptionError;
}(Error);

//# sourceMappingURL=UnsubscriptionError.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Subscription.js
var Subscription__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_tryCatch,_util_errorObject,_util_UnsubscriptionError PURE_IMPORTS_END */






var Subscription_Subscription = /*@__PURE__*/function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents,
            _unsubscribe = _a._unsubscribe,
            _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        while (_parent) {
            _parent.remove(this);
            _parent = ++index < len && _parents[index] || null;
        }
        if (/* Cannot get final name for export "isFunction" in "./node_modules/rxjs/_esm5/internal/config.js" (known exports: config, known reexports: ) */ undefined(_unsubscribe)) {
            var trial = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(_unsubscribe).call(this);
            if (trial === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                hasErrors = true;
                errors = errors || (/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e instanceof /* Cannot get final name for export "UnsubscriptionError" in "./node_modules/rxjs/_esm5/internal/Subscription.js" (known exports: Subscription, known reexports: ) */ undefined ? flattenUnsubscriptionErrors(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e.errors) : [/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e]);
            }
        }
        if (/* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (/* Cannot get final name for export "isObject" in "./node_modules/rxjs/_esm5/internal/util/errorObject.js" (known exports: errorObject, known reexports: ) */ undefined(sub)) {
                    var trial = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(sub.unsubscribe).call(sub);
                    if (trial === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e;
                        if (err instanceof /* Cannot get final name for export "UnsubscriptionError" in "./node_modules/rxjs/_esm5/internal/Subscription.js" (known exports: Subscription, known reexports: ) */ undefined) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        } else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new /* Cannot get final name for export "UnsubscriptionError" in "./node_modules/rxjs/_esm5/internal/Subscription.js" (known exports: Subscription, known reexports: ) */ undefined(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        if (!teardown || teardown === Subscription.EMPTY) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown === 'undefined' ? 'undefined' : Subscription__typeof(teardown)) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                } else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                } else if (typeof subscription._addParent !== 'function') {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents;
        if (!_parent || _parent === parent) {
            this._parent = parent;
        } else if (!_parents) {
            this._parents = [parent];
        } else if (_parents.indexOf(parent) === -1) {
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription());
    return Subscription;
}();

function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) {
        return errs.concat(err instanceof /* Cannot get final name for export "UnsubscriptionError" in "./node_modules/rxjs/_esm5/internal/Subscription.js" (known exports: Subscription, known reexports: ) */ undefined ? err.errors : err);
    }, []);
}
//# sourceMappingURL=Subscription.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var rxSubscriber = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? /*@__PURE__*/Symbol.for('rxSubscriber') : '@@rxSubscriber';
var $$rxSubscriber = rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Subscriber.js
var Subscriber__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */







var Subscriber_Subscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
            case 0:
                _this.destination = /* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isArray.js" (known exports: isArray, known reexports: ) */ undefined;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = /* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isArray.js" (known exports: isArray, known reexports: ) */ undefined;
                    break;
                }
                if ((typeof destinationOrNext === 'undefined' ? 'undefined' : Subscriber__typeof(destinationOrNext)) === 'object') {
                    if (isTrustedSubscriber(destinationOrNext)) {
                        var trustedSubscriber = destinationOrNext[/* Cannot get final name for export "rxSubscriber" in "./node_modules/rxjs/_esm5/internal/Subscriber.js" (known exports: Subscriber, known reexports: ) */ undefined]();
                        _this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
                        _this.destination = trustedSubscriber;
                        trustedSubscriber.add(_this);
                    } else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new Subscriber_SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new Subscriber_SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[/* Cannot get final name for export "rxSubscriber" in "./node_modules/rxjs/_esm5/internal/Subscriber.js" (known exports: Subscriber, known reexports: ) */ undefined] = function () {
        return this;
    };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this,
            _parent = _a._parent,
            _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(/* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined);

var Subscriber_SafeSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (/* Cannot get final name for export "isFunction" in "./node_modules/rxjs/_esm5/internal/config.js" (known exports: config, known reexports: ) */ undefined(observerOrNext)) {
            next = observerOrNext;
        } else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== /* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isArray.js" (known exports: isArray, known reexports: ) */ undefined) {
                context = Object.create(observerOrNext);
                if (/* Cannot get final name for export "isFunction" in "./node_modules/rxjs/_esm5/internal/config.js" (known exports: config, known reexports: ) */ undefined(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!/* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = /* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                } else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            } else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                /* Cannot get final name for export "hostReportError" in "./node_modules/rxjs/_esm5/internal/Observer.js" (known exports: empty, known reexports: ) */ undefined(err);
            } else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                } else {
                    /* Cannot get final name for export "hostReportError" in "./node_modules/rxjs/_esm5/internal/Observer.js" (known exports: empty, known reexports: ) */ undefined(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function wrappedComplete() {
                    return _this._complete.call(_this._context);
                };
                if (!/* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                } else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            } else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        } catch (err) {
            this.unsubscribe();
            if (/* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.useDeprecatedSynchronousErrorHandling) {
                throw err;
            } else {
                /* Cannot get final name for export "hostReportError" in "./node_modules/rxjs/_esm5/internal/Observer.js" (known exports: empty, known reexports: ) */ undefined(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!/* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        } catch (err) {
            if (/* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            } else {
                /* Cannot get final name for export "hostReportError" in "./node_modules/rxjs/_esm5/internal/Observer.js" (known exports: empty, known reexports: ) */ undefined(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber_Subscriber);
function isTrustedSubscriber(obj) {
    return obj instanceof Subscriber_Subscriber || 'syncErrorThrowable' in obj && obj[/* Cannot get final name for export "rxSubscriber" in "./node_modules/rxjs/_esm5/internal/Subscriber.js" (known exports: Subscriber, known reexports: ) */ undefined];
}
//# sourceMappingURL=Subscriber.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/toSubscriber.js
/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */



function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof /* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined) {
            return nextOrObserver;
        }
        if (nextOrObserver[/* Cannot get final name for export "rxSubscriber" in "./node_modules/rxjs/_esm5/internal/Subscriber.js" (known exports: Subscriber, known reexports: ) */ undefined]) {
            return nextOrObserver[/* Cannot get final name for export "rxSubscriber" in "./node_modules/rxjs/_esm5/internal/Subscriber.js" (known exports: Subscriber, known reexports: ) */ undefined]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new /* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined(/* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isArray.js" (known exports: isArray, known reexports: ) */ undefined);
    }
    return new /* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined(nextOrObserver, error, complete);
}
//# sourceMappingURL=toSubscriber.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/symbol/observable.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var observable_observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
//# sourceMappingURL=observable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/noop.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() {}
//# sourceMappingURL=noop.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/pipe.js
/** PURE_IMPORTS_START _noop PURE_IMPORTS_END */

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (!fns) {
        return /* Cannot get final name for export "noop" in "./node_modules/rxjs/_esm5/internal/util/pipe.js" (known exports: pipe pipeFromArray, known reexports: ) */ undefined;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) {
            return fn(prev);
        }, input);
    };
}
//# sourceMappingURL=pipe.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Observable.js
/** PURE_IMPORTS_START _util_toSubscriber,_internal_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */




var Observable_Observable = /*@__PURE__*/function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = /* Cannot get final name for export "toSubscriber" in "./node_modules/rxjs/_esm5/internal/symbol/observable.js" (known exports: observable, known reexports: ) */ undefined(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        } else {
            sink.add(this.source || /* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (/* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        } catch (err) {
            if (/* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                } catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[/* Cannot get final name for export "observable" in "./node_modules/rxjs/_esm5/internal/util/noop.js" (known exports: noop, known reexports: ) */ undefined] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return /* Cannot get final name for export "pipeFromArray" in "./node_modules/rxjs/_esm5/internal/Observable.js" (known exports: Observable, known reexports: ) */ undefined(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) {
                return value = x;
            }, function (err) {
                return reject(err);
            }, function () {
                return resolve(value);
            });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}();

function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = /* Cannot get final name for export "config" in "./node_modules/rxjs/_esm5/internal/util/hostReportError.js" (known exports: hostReportError, known reexports: ) */ undefined.Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}
//# sourceMappingURL=Observable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js
/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */

var ObjectUnsubscribedError_ObjectUnsubscribedError = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var _this = _super.call(this, 'object unsubscribed') || this;
        _this.name = 'ObjectUnsubscribedError';
        Object.setPrototypeOf(_this, ObjectUnsubscribedError.prototype);
        return _this;
    }
    return ObjectUnsubscribedError;
}(Error);

//# sourceMappingURL=ObjectUnsubscribedError.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/SubjectSubscription.js
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */


var SubjectSubscription_SubjectSubscription = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        var _this = _super.call(this) || this;
        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(/* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=SubjectSubscription.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Subject.js
/** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */







var Subject_SubjectSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        return _this;
    }
    return SubjectSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);

var Subject_Subject = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.observers = [];
        _this.closed = false;
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype[/* Cannot get final name for export "rxSubscriber" in "./node_modules/rxjs/_esm5/internal/Subscriber.js" (known exports: Subscriber, known reexports: ) */ undefined] = function () {
        return new Subject_SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new Subject_AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new /* Cannot get final name for export "ObjectUnsubscribedError" in "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js" (known exports: SubjectSubscription, known reexports: ) */ undefined();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new /* Cannot get final name for export "ObjectUnsubscribedError" in "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js" (known exports: SubjectSubscription, known reexports: ) */ undefined();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new /* Cannot get final name for export "ObjectUnsubscribedError" in "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js" (known exports: SubjectSubscription, known reexports: ) */ undefined();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new /* Cannot get final name for export "ObjectUnsubscribedError" in "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js" (known exports: SubjectSubscription, known reexports: ) */ undefined();
        } else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new /* Cannot get final name for export "ObjectUnsubscribedError" in "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js" (known exports: SubjectSubscription, known reexports: ) */ undefined();
        } else if (this.hasError) {
            subscriber.error(this.thrownError);
            return /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined.EMPTY;
        } else if (this.isStopped) {
            subscriber.complete();
            return /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined.EMPTY;
        } else {
            this.observers.push(subscriber);
            return new /* Cannot get final name for export "SubjectSubscription" in "./node_modules/rxjs/_esm5/internal/Subject.js" (known exports: SubjectSubscriber Subject AnonymousSubject, known reexports: ) */ undefined(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new Subject_AnonymousSubject(destination, source);
    };
    return Subject;
}(/* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined);

var Subject_AnonymousSubject = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        } else {
            return /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject_Subject);

//# sourceMappingURL=Subject.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/refCount.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function refCount_refCount() {
    return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
    };
}
var RefCountOperator = /*@__PURE__*/function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new refCount_RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}();
var refCount_RefCountSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=refCount.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js
/** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */






var ConnectableObservable_ConnectableObservable = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        _this._isComplete = false;
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined();
            connection.add(this.source.subscribe(new ConnectableObservable_ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined.EMPTY;
            } else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return /* Cannot get final name for export "refCount" in "./node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js" (known exports: ConnectableObservable connectableObservableDescriptor, known reexports: ) */ undefined()(this);
    };
    return ConnectableObservable;
}(/* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined);

var connectableProto = ConnectableObservable_ConnectableObservable.prototype;
var connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: { value: connectableProto._isComplete, writable: true },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
};
var ConnectableObservable_ConnectableSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(/* Cannot get final name for export "SubjectSubscriber" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined);
var ConnectableObservable_RefCountOperator = /*@__PURE__*/function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new ConnectableObservable_RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}();
var ConnectableObservable_RefCountSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=ConnectableObservable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/groupBy.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */





function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return function (source) {
        return source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
    };
}
var GroupByOperator = /*@__PURE__*/function () {
    function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
    }
    GroupByOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new groupBy_GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
    };
    return GroupByOperator;
}();
var groupBy_GroupBySubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.elementSelector = elementSelector;
        _this.durationSelector = durationSelector;
        _this.subjectSelector = subjectSelector;
        _this.groups = null;
        _this.attemptedToUnsubscribe = false;
        _this.count = 0;
        return _this;
    }
    GroupBySubscriber.prototype._next = function (value) {
        var key;
        try {
            key = this.keySelector(value);
        } catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function (value, key) {
        var groups = this.groups;
        if (!groups) {
            groups = this.groups = new Map();
        }
        var group = groups.get(key);
        var element;
        if (this.elementSelector) {
            try {
                element = this.elementSelector(value);
            } catch (err) {
                this.error(err);
            }
        } else {
            element = value;
        }
        if (!group) {
            group = this.subjectSelector ? this.subjectSelector() : new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined();
            groups.set(key, group);
            var groupedObservable = new groupBy_GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
                var duration = void 0;
                try {
                    duration = this.durationSelector(new groupBy_GroupedObservable(key, group));
                } catch (err) {
                    this.error(err);
                    return;
                }
                this.add(duration.subscribe(new groupBy_GroupDurationSubscriber(key, group, this)));
            }
        }
        if (!group.closed) {
            group.next(element);
        }
    };
    GroupBySubscriber.prototype._error = function (err) {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                _super.prototype.unsubscribe.call(this);
            }
        }
    };
    return GroupBySubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
var groupBy_GroupDurationSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
        var _this = _super.call(this, group) || this;
        _this.key = key;
        _this.group = group;
        _this.parent = parent;
        return _this;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
        this.complete();
    };
    GroupDurationSubscriber.prototype._unsubscribe = function () {
        var _a = this,
            parent = _a.parent,
            key = _a.key;
        this.key = this.parent = null;
        if (parent) {
            parent.removeGroup(key);
        }
    };
    return GroupDurationSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
var groupBy_GroupedObservable = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.groupSubject = groupSubject;
        _this.refCountSubscription = refCountSubscription;
        return _this;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined();
        var _a = this,
            refCountSubscription = _a.refCountSubscription,
            groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new groupBy_InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    };
    return GroupedObservable;
}(/* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined);

var groupBy_InnerRefCountSubscription = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        parent.count++;
        return _this;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
        var parent = this.parent;
        if (!parent.closed && !this.closed) {
            _super.prototype.unsubscribe.call(this);
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    };
    return InnerRefCountSubscription;
}(/* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=groupBy.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/BehaviorSubject.js
/** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */



var BehaviorSubject_BehaviorSubject = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function get() {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        } else if (this.closed) {
            throw new /* Cannot get final name for export "ObjectUnsubscribedError" in "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js" (known exports: SubjectSubscription, known reexports: ) */ undefined();
        } else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(/* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined);

//# sourceMappingURL=BehaviorSubject.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/Action.js
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */


var Action_Action = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return this;
    };
    return Action;
}(/* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=Action.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js
/** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */


var AsyncAction_AsyncAction = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        return clearInterval(id) && undefined || undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        } else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        } catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(/* Cannot get final name for export "Action" in "./node_modules/rxjs/_esm5/internal/scheduler/AsyncAction.js" (known exports: AsyncAction, known reexports: ) */ undefined);

//# sourceMappingURL=AsyncAction.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js
/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */


var QueueAction_QueueAction = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
    };
    return QueueAction;
}(/* Cannot get final name for export "AsyncAction" in "./node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js" (known exports: QueueAction, known reexports: ) */ undefined);

//# sourceMappingURL=QueueAction.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Scheduler.js
var Scheduler = /*@__PURE__*/function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = Scheduler.now;
        }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () {
        return +new Date();
    };
    return Scheduler;
}();

//# sourceMappingURL=Scheduler.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js
/** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */


var AsyncScheduler_AsyncScheduler = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = /* Cannot get final name for export "Scheduler" in "./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js" (known exports: AsyncScheduler, known reexports: ) */ undefined.now;
        }
        var _this = _super.call(this, SchedulerAction, function () {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
                return AsyncScheduler.delegate.now();
            } else {
                return now();
            }
        }) || this;
        _this.actions = [];
        _this.active = false;
        _this.scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
            return AsyncScheduler.delegate.schedule(work, delay, state);
        } else {
            return _super.prototype.schedule.call(this, work, delay, state);
        }
    };
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift());
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(/* Cannot get final name for export "Scheduler" in "./node_modules/rxjs/_esm5/internal/scheduler/AsyncScheduler.js" (known exports: AsyncScheduler, known reexports: ) */ undefined);

//# sourceMappingURL=AsyncScheduler.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */


var QueueScheduler_QueueScheduler = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(/* Cannot get final name for export "AsyncScheduler" in "./node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js" (known exports: QueueScheduler, known reexports: ) */ undefined);

//# sourceMappingURL=QueueScheduler.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/queue.js
/** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */


var queue = /*@__PURE__*/new /* Cannot get final name for export "QueueScheduler" in "./node_modules/rxjs/_esm5/internal/scheduler/queue.js" (known exports: queue, known reexports: ) */ undefined(/* Cannot get final name for export "QueueAction" in "./node_modules/rxjs/_esm5/internal/Scheduler.js" (known exports: Scheduler, known reexports: ) */ undefined);
//# sourceMappingURL=queue.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/empty.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

var EMPTY = /*@__PURE__*/new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
    return subscriber.complete();
});
function empty_empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        return scheduler.schedule(function () {
            return subscriber.complete();
        });
    });
}
//# sourceMappingURL=empty.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isScheduler.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
//# sourceMappingURL=isScheduler.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var subscribeToArray = function subscribeToArray(array) {
    return function (subscriber) {
        for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        if (!subscriber.closed) {
            subscriber.complete();
        }
    };
};
//# sourceMappingURL=subscribeToArray.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromArray.js
/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToArray PURE_IMPORTS_END */



function fromArray(input, scheduler) {
    if (!scheduler) {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(/* Cannot get final name for export "subscribeToArray" in "./node_modules/rxjs/_esm5/internal/observable/fromArray.js" (known exports: fromArray, known reexports: ) */ undefined(input));
    } else {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
            var sub = new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined();
            var i = 0;
            sub.add(scheduler.schedule(function () {
                if (i === input.length) {
                    subscriber.complete();
                    return;
                }
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    sub.add(this.schedule());
                }
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromArray.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/scalar.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function scalar(value) {
    var result = new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        subscriber.next(value);
        subscriber.complete();
    });
    result._isScalar = true;
    result.value = value;
    return result;
}
//# sourceMappingURL=scalar.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/of.js
/** PURE_IMPORTS_START _util_isScheduler,_fromArray,_empty,_scalar PURE_IMPORTS_END */




function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args[args.length - 1];
    if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(scheduler)) {
        args.pop();
    } else {
        scheduler = undefined;
    }
    switch (args.length) {
        case 0:
            return /* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined(scheduler);
        case 1:
            return scheduler ? /* Cannot get final name for export "fromArray" in "./node_modules/rxjs/_esm5/internal/observable/scalar.js" (known exports: scalar, known reexports: ) */ undefined(args, scheduler) : /* Cannot get final name for export "scalar" in "./node_modules/rxjs/_esm5/internal/observable/of.js" (known exports: of, known reexports: ) */ undefined(args[0]);
        default:
            return /* Cannot get final name for export "fromArray" in "./node_modules/rxjs/_esm5/internal/observable/scalar.js" (known exports: scalar, known reexports: ) */ undefined(args, scheduler);
    }
}
//# sourceMappingURL=of.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/throwError.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function throwError(error, scheduler) {
    if (!scheduler) {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
            return subscriber.error(error);
        });
    } else {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
            return scheduler.schedule(dispatch, 0, { error: error, subscriber: subscriber });
        });
    }
}
function dispatch(_a) {
    var error = _a.error,
        subscriber = _a.subscriber;
    subscriber.error(error);
}
//# sourceMappingURL=throwError.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/Notification.js
/** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */



var Notification_Notification = /*@__PURE__*/function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        } else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return /* Cannot get final name for export "of" in "./node_modules/rxjs/_esm5/internal/observable/throwError.js" (known exports: throwError, known reexports: ) */ undefined(this.value);
            case 'E':
                return /* Cannot get final name for export "throwError" in "./node_modules/rxjs/_esm5/internal/Notification.js" (known exports: Notification, known reexports: ) */ undefined(this.error);
            case 'C':
                return /* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined();
        }
        throw new Error('unexpected notification kind value');
    };
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}();

//# sourceMappingURL=Notification.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/observeOn.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */



function observeOn(scheduler, delay) {
    if (delay === void 0) {
        delay = 0;
    }
    return function observeOnOperatorFunction(source) {
        return source.lift(new ObserveOnOperator(scheduler, delay));
    };
}
var ObserveOnOperator = /*@__PURE__*/function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new observeOn_ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}();

var observeOn_ObserveOnSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        var _this = _super.call(this, destination) || this;
        _this.scheduler = scheduler;
        _this.delay = delay;
        return _this;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification,
            destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(/* Cannot get final name for export "Notification" in "./node_modules/rxjs/_esm5/internal/operators/observeOn.js" (known exports: observeOn ObserveOnOperator ObserveOnSubscriber ObserveOnMessage, known reexports: ) */ undefined.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(/* Cannot get final name for export "Notification" in "./node_modules/rxjs/_esm5/internal/operators/observeOn.js" (known exports: observeOn ObserveOnOperator ObserveOnSubscriber ObserveOnMessage, known reexports: ) */ undefined.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(/* Cannot get final name for export "Notification" in "./node_modules/rxjs/_esm5/internal/operators/observeOn.js" (known exports: observeOn ObserveOnOperator ObserveOnSubscriber ObserveOnMessage, known reexports: ) */ undefined.createComplete());
    };
    return ObserveOnSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);

var ObserveOnMessage = /*@__PURE__*/function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}();

//# sourceMappingURL=observeOn.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/ReplaySubject.js
/** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */







var ReplaySubject_ReplaySubject = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) {
            bufferSize = Number.POSITIVE_INFINITY;
        }
        if (windowTime === void 0) {
            windowTime = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this) || this;
        _this.scheduler = scheduler;
        _this._events = [];
        _this._infiniteTimeWindow = false;
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;
        if (windowTime === Number.POSITIVE_INFINITY) {
            _this._infiniteTimeWindow = true;
            _this.next = _this.nextInfiniteTimeWindow;
        } else {
            _this.next = _this.nextTimeWindow;
        }
        return _this;
    }
    ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
        var _events = this._events;
        _events.push(value);
        if (_events.length > this._bufferSize) {
            _events.shift();
        }
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype.nextTimeWindow = function (value) {
        this._events.push(new ReplayEvent(this._getNow(), value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _infiniteTimeWindow = this._infiniteTimeWindow;
        var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var len = _events.length;
        var subscription;
        if (this.closed) {
            throw new /* Cannot get final name for export "ObjectUnsubscribedError" in "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js" (known exports: SubjectSubscription, known reexports: ) */ undefined();
        } else if (this.isStopped || this.hasError) {
            subscription = /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined.EMPTY;
        } else {
            this.observers.push(subscriber);
            subscription = new /* Cannot get final name for export "SubjectSubscription" in "./node_modules/rxjs/_esm5/internal/Subject.js" (known exports: SubjectSubscriber Subject AnonymousSubject, known reexports: ) */ undefined(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new /* Cannot get final name for export "ObserveOnSubscriber" in "./node_modules/rxjs/_esm5/internal/ReplaySubject.js" (known exports: ReplaySubject, known reexports: ) */ undefined(subscriber, scheduler));
        }
        if (_infiniteTimeWindow) {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i]);
            }
        } else {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i].value);
            }
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        } else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || /* Cannot get final name for export "queue" in "./node_modules/rxjs/_esm5/internal/observable/empty.js" (known exports: EMPTY empty emptyScheduled, known reexports: ) */ undefined).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        while (spliceCount < eventsCount) {
            if (now - _events[spliceCount].time < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(/* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined);

var ReplayEvent = /*@__PURE__*/function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}();
//# sourceMappingURL=ReplaySubject.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/AsyncSubject.js
/** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */



var AsyncSubject_AsyncSubject = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        _this.hasNext = false;
        _this.hasCompleted = false;
        return _this;
    }
    AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasError) {
            subscriber.error(this.thrownError);
            return /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined.EMPTY;
        } else if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
            subscriber.complete();
            return /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined.EMPTY;
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.hasCompleted) {
            this.value = value;
            this.hasNext = true;
        }
    };
    AsyncSubject.prototype.error = function (error) {
        if (!this.hasCompleted) {
            _super.prototype.error.call(this, error);
        }
    };
    AsyncSubject.prototype.complete = function () {
        this.hasCompleted = true;
        if (this.hasNext) {
            _super.prototype.next.call(this, this.value);
        }
        _super.prototype.complete.call(this);
    };
    return AsyncSubject;
}(/* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined);

//# sourceMappingURL=AsyncSubject.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/Immediate.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var nextHandle = 1;
var tasksByHandle = {};
function runIfPresent(handle) {
    var cb = tasksByHandle[handle];
    if (cb) {
        cb();
    }
}
var Immediate = {
    setImmediate: function setImmediate(cb) {
        var handle = nextHandle++;
        tasksByHandle[handle] = cb;
        Promise.resolve().then(function () {
            return runIfPresent(handle);
        });
        return handle;
    },
    clearImmediate: function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }
};
//# sourceMappingURL=Immediate.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsapAction.js
/** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */



var AsapAction_AsapAction = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = /* Cannot get final name for export "Immediate" in "./node_modules/rxjs/_esm5/internal/scheduler/AsapAction.js" (known exports: AsapAction, known reexports: ) */ undefined.setImmediate(scheduler.flush.bind(scheduler, null)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            /* Cannot get final name for export "Immediate" in "./node_modules/rxjs/_esm5/internal/scheduler/AsapAction.js" (known exports: AsapAction, known reexports: ) */ undefined.clearImmediate(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AsapAction;
}(/* Cannot get final name for export "AsyncAction" in "./node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js" (known exports: QueueAction, known reexports: ) */ undefined);

//# sourceMappingURL=AsapAction.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AsapScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */


var AsapScheduler_AsapScheduler = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AsapScheduler, _super);
    function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(/* Cannot get final name for export "AsyncScheduler" in "./node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js" (known exports: QueueScheduler, known reexports: ) */ undefined);

//# sourceMappingURL=AsapScheduler.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/asap.js
/** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */


var asap = /*@__PURE__*/new /* Cannot get final name for export "AsapScheduler" in "./node_modules/rxjs/_esm5/internal/scheduler/asap.js" (known exports: asap, known reexports: ) */ undefined(/* Cannot get final name for export "AsapAction" in "./node_modules/rxjs/_esm5/internal/scheduler/AsapScheduler.js" (known exports: AsapScheduler, known reexports: ) */ undefined);
//# sourceMappingURL=asap.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/async.js
/** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */


var async_async = /*@__PURE__*/new /* Cannot get final name for export "AsyncScheduler" in "./node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js" (known exports: QueueScheduler, known reexports: ) */ undefined(/* Cannot get final name for export "AsyncAction" in "./node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js" (known exports: QueueAction, known reexports: ) */ undefined);
//# sourceMappingURL=async.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js
/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */


var AnimationFrameAction_AnimationFrameAction = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () {
            return scheduler.flush(null);
        }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            cancelAnimationFrame(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(/* Cannot get final name for export "AsyncAction" in "./node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js" (known exports: QueueAction, known reexports: ) */ undefined);

//# sourceMappingURL=AnimationFrameAction.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */


var AnimationFrameScheduler_AnimationFrameScheduler = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(/* Cannot get final name for export "AsyncScheduler" in "./node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js" (known exports: QueueScheduler, known reexports: ) */ undefined);

//# sourceMappingURL=AnimationFrameScheduler.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/animationFrame.js
/** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */


var animationFrame = /*@__PURE__*/new /* Cannot get final name for export "AnimationFrameScheduler" in "./node_modules/rxjs/_esm5/internal/scheduler/animationFrame.js" (known exports: animationFrame, known reexports: ) */ undefined(/* Cannot get final name for export "AnimationFrameAction" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameScheduler.js" (known exports: AnimationFrameScheduler, known reexports: ) */ undefined);
//# sourceMappingURL=animationFrame.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/scheduler/VirtualTimeScheduler.js
/** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */



var VirtualTimeScheduler_VirtualTimeScheduler = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        if (SchedulerAction === void 0) {
            SchedulerAction = VirtualTimeScheduler_VirtualAction;
        }
        if (maxFrames === void 0) {
            maxFrames = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, SchedulerAction, function () {
            return _this.frame;
        }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this,
            actions = _a.actions,
            maxFrames = _a.maxFrames;
        var error, action;
        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        }
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(/* Cannot get final name for export "AsyncScheduler" in "./node_modules/rxjs/_esm5/internal/scheduler/QueueScheduler.js" (known exports: QueueScheduler, known reexports: ) */ undefined);

var VirtualTimeScheduler_VirtualAction = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) {
            index = scheduler.index += 1;
        }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.active = false;
        var action = new VirtualAction(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            } else if (a.index > b.index) {
                return 1;
            } else {
                return -1;
            }
        } else if (a.delay > b.delay) {
            return 1;
        } else {
            return -1;
        }
    };
    return VirtualAction;
}(/* Cannot get final name for export "AsyncAction" in "./node_modules/rxjs/_esm5/internal/scheduler/QueueAction.js" (known exports: QueueAction, known reexports: ) */ undefined);

//# sourceMappingURL=VirtualTimeScheduler.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/identity.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isObservable.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function isObservable(obj) {
    return !!obj && (obj instanceof /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined || typeof obj.lift === 'function' && typeof obj.subscribe === 'function');
}
//# sourceMappingURL=isObservable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js
/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */

var ArgumentOutOfRangeError_ArgumentOutOfRangeError = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        var _this = _super.call(this, 'argument out of range') || this;
        _this.name = 'ArgumentOutOfRangeError';
        Object.setPrototypeOf(_this, ArgumentOutOfRangeError.prototype);
        return _this;
    }
    return ArgumentOutOfRangeError;
}(Error);

//# sourceMappingURL=ArgumentOutOfRangeError.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/EmptyError.js
/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */

var EmptyError_EmptyError = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(EmptyError, _super);
    function EmptyError() {
        var _this = _super.call(this, 'no elements in sequence') || this;
        _this.name = 'EmptyError';
        Object.setPrototypeOf(_this, EmptyError.prototype);
        return _this;
    }
    return EmptyError;
}(Error);

//# sourceMappingURL=EmptyError.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/TimeoutError.js
/** PURE_IMPORTS_START tslib PURE_IMPORTS_END */

var TimeoutError_TimeoutError = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(TimeoutError, _super);
    function TimeoutError() {
        var _this = _super.call(this, 'Timeout has occurred') || this;
        _this.name = 'TimeoutError';
        Object.setPrototypeOf(_this, TimeoutError.prototype);
        return _this;
    }
    return TimeoutError;
}(Error);

//# sourceMappingURL=TimeoutError.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/map.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
var MapOperator = /*@__PURE__*/function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new map_MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}();

var map_MapSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=map.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/bindCallback.js
/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_isArray,_util_isScheduler PURE_IMPORTS_END */





function bindCallback(callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(resultSelector)) {
            scheduler = resultSelector;
        } else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindCallback(callbackFunc, scheduler).apply(void 0, args).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (args) {
                    return /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
                }));
            };
        }
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = this;
        var subject;
        var params = {
            context: context,
            subject: subject,
            callbackFunc: callbackFunc,
            scheduler: scheduler
        };
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
            if (!scheduler) {
                if (!subject) {
                    subject = new /* Cannot get final name for export "AsyncSubject" in "./node_modules/rxjs/_esm5/internal/util/Immediate.js" (known exports: Immediate, known reexports: ) */ undefined();
                    var handler = function handler() {
                        var innerArgs = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            innerArgs[_i] = arguments[_i];
                        }
                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    };
                    try {
                        callbackFunc.apply(context, args.concat([handler]));
                    } catch (err) {
                        subject.error(err);
                    }
                }
                return subject.subscribe(subscriber);
            } else {
                var state = {
                    args: args, subscriber: subscriber, params: params
                };
                return scheduler.schedule(bindCallback_dispatch, 0, state);
            }
        });
    };
}
function bindCallback_dispatch(state) {
    var _this = this;
    var self = this;
    var args = state.args,
        subscriber = state.subscriber,
        params = state.params;
    var callbackFunc = params.callbackFunc,
        context = params.context,
        scheduler = params.scheduler;
    var subject = params.subject;
    if (!subject) {
        subject = params.subject = new /* Cannot get final name for export "AsyncSubject" in "./node_modules/rxjs/_esm5/internal/util/Immediate.js" (known exports: Immediate, known reexports: ) */ undefined();
        var handler = function handler() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i] = arguments[_i];
            }
            var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
            _this.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
        };
        try {
            callbackFunc.apply(context, args.concat([handler]));
        } catch (err) {
            subject.error(err);
        }
    }
    this.add(subject.subscribe(subscriber));
}
function dispatchNext(state) {
    var value = state.value,
        subject = state.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(state) {
    var err = state.err,
        subject = state.subject;
    subject.error(err);
}
//# sourceMappingURL=bindCallback.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/bindNodeCallback.js
/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_isScheduler,_util_isArray PURE_IMPORTS_END */





function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(resultSelector)) {
            scheduler = resultSelector;
        } else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (args) {
                    return /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
                }));
            };
        }
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = {
            subject: undefined,
            args: args,
            callbackFunc: callbackFunc,
            scheduler: scheduler,
            context: this
        };
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
            var context = params.context;
            var subject = params.subject;
            if (!scheduler) {
                if (!subject) {
                    subject = params.subject = new /* Cannot get final name for export "AsyncSubject" in "./node_modules/rxjs/_esm5/internal/util/Immediate.js" (known exports: Immediate, known reexports: ) */ undefined();
                    var handler = function handler() {
                        var innerArgs = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            innerArgs[_i] = arguments[_i];
                        }
                        var err = innerArgs.shift();
                        if (err) {
                            subject.error(err);
                            return;
                        }
                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    };
                    try {
                        callbackFunc.apply(context, args.concat([handler]));
                    } catch (err) {
                        subject.error(err);
                    }
                }
                return subject.subscribe(subscriber);
            } else {
                return scheduler.schedule(bindNodeCallback_dispatch, 0, { params: params, subscriber: subscriber, context: context });
            }
        });
    };
}
function bindNodeCallback_dispatch(state) {
    var _this = this;
    var params = state.params,
        subscriber = state.subscriber,
        context = state.context;
    var callbackFunc = params.callbackFunc,
        args = params.args,
        scheduler = params.scheduler;
    var subject = params.subject;
    if (!subject) {
        subject = params.subject = new /* Cannot get final name for export "AsyncSubject" in "./node_modules/rxjs/_esm5/internal/util/Immediate.js" (known exports: Immediate, known reexports: ) */ undefined();
        var handler = function handler() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i] = arguments[_i];
            }
            var err = innerArgs.shift();
            if (err) {
                _this.add(scheduler.schedule(bindNodeCallback_dispatchError, 0, { err: err, subject: subject }));
            } else {
                var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
                _this.add(scheduler.schedule(bindNodeCallback_dispatchNext, 0, { value: value, subject: subject }));
            }
        };
        try {
            callbackFunc.apply(context, args.concat([handler]));
        } catch (err) {
            this.add(scheduler.schedule(bindNodeCallback_dispatchError, 0, { err: err, subject: subject }));
        }
    }
    this.add(subject.subscribe(subscriber));
}
function bindNodeCallback_dispatchNext(arg) {
    var value = arg.value,
        subject = arg.subject;
    subject.next(value);
    subject.complete();
}
function bindNodeCallback_dispatchError(arg) {
    var err = arg.err,
        subject = arg.subject;
    subject.error(err);
}
//# sourceMappingURL=bindNodeCallback.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/OuterSubscriber.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


var OuterSubscriber_OuterSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(OuterSubscriber, _super);
    function OuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=OuterSubscriber.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/InnerSubscriber.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


var InnerSubscriber_InnerSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=InnerSubscriber.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToPromise.js
/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */

var subscribeToPromise_subscribeToPromise = function subscribeToPromise(promise) {
    return function (subscriber) {
        promise.then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) {
            return subscriber.error(err);
        }).then(null, /* Cannot get final name for export "hostReportError" in "./node_modules/rxjs/_esm5/internal/Observer.js" (known exports: empty, known reexports: ) */ undefined);
        return subscriber;
    };
};
//# sourceMappingURL=subscribeToPromise.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/symbol/iterator.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator_iterator = /*@__PURE__*/getSymbolIterator();
var $$iterator = iterator_iterator;
//# sourceMappingURL=iterator.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

var subscribeToIterable_subscribeToIterable = function subscribeToIterable(iterable) {
    return function (subscriber) {
        var iterator = iterable[/* Cannot get final name for export "iterator" in "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js" (known exports: subscribeToIterable, known reexports: ) */ undefined]();
        do {
            var item = iterator.next();
            if (item.done) {
                subscriber.complete();
                break;
            }
            subscriber.next(item.value);
            if (subscriber.closed) {
                break;
            }
        } while (true);
        if (typeof iterator.return === 'function') {
            subscriber.add(function () {
                if (iterator.return) {
                    iterator.return();
                }
            });
        }
        return subscriber;
    };
};
//# sourceMappingURL=subscribeToIterable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

var subscribeToObservable_subscribeToObservable = function subscribeToObservable(obj) {
    return function (subscriber) {
        var obs = obj[/* Cannot get final name for export "observable" in "./node_modules/rxjs/_esm5/internal/util/noop.js" (known exports: noop, known reexports: ) */ undefined]();
        if (typeof obs.subscribe !== 'function') {
            throw new TypeError('Provided object does not correctly implement Symbol.observable');
        } else {
            return obs.subscribe(subscriber);
        }
    };
};
//# sourceMappingURL=subscribeToObservable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isArrayLike.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = function isArrayLike(x) {
  return x && typeof x.length === 'number' && typeof x !== 'function';
};
//# sourceMappingURL=isArrayLike.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isPromise.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
//# sourceMappingURL=isPromise.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeTo.js
/** PURE_IMPORTS_START _Observable,_subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */










var subscribeTo_subscribeTo = function subscribeTo(result) {
    if (result instanceof /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined) {
        return function (subscriber) {
            if (result._isScalar) {
                subscriber.next(result.value);
                subscriber.complete();
                return undefined;
            } else {
                return result.subscribe(subscriber);
            }
        };
    } else if (result && typeof result[/* Cannot get final name for export "observable" in "./node_modules/rxjs/_esm5/internal/util/noop.js" (known exports: noop, known reexports: ) */ undefined] === 'function') {
        return /* Cannot get final name for export "subscribeToObservable" in "./node_modules/rxjs/_esm5/internal/util/isArrayLike.js" (known exports: isArrayLike, known reexports: ) */ undefined(result);
    } else if (/* Cannot get final name for export "isArrayLike" in "./node_modules/rxjs/_esm5/internal/util/isPromise.js" (known exports: isPromise, known reexports: ) */ undefined(result)) {
        return /* Cannot get final name for export "subscribeToArray" in "./node_modules/rxjs/_esm5/internal/observable/fromArray.js" (known exports: fromArray, known reexports: ) */ undefined(result);
    } else if (/* Cannot get final name for export "isPromise" in "./node_modules/rxjs/_esm5/internal/util/subscribeTo.js" (known exports: subscribeTo, known reexports: ) */ undefined(result)) {
        return /* Cannot get final name for export "subscribeToPromise" in "./node_modules/rxjs/_esm5/internal/symbol/iterator.js" (known exports: getSymbolIterator iterator $$iterator, known reexports: ) */ undefined(result);
    } else if (result && typeof result[/* Cannot get final name for export "iterator" in "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js" (known exports: subscribeToIterable, known reexports: ) */ undefined] === 'function') {
        return /* Cannot get final name for export "subscribeToIterable" in "./node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js" (known exports: subscribeToObservable, known reexports: ) */ undefined(result);
    } else {
        var value = /* Cannot get final name for export "isObject" in "./node_modules/rxjs/_esm5/internal/util/errorObject.js" (known exports: errorObject, known reexports: ) */ undefined(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected." + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};
//# sourceMappingURL=subscribeTo.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js
/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo PURE_IMPORTS_END */


function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new /* Cannot get final name for export "InnerSubscriber" in "./node_modules/rxjs/_esm5/internal/util/subscribeToPromise.js" (known exports: subscribeToPromise, known reexports: ) */ undefined(outerSubscriber, outerValue, outerIndex);
    return /* Cannot get final name for export "subscribeTo" in "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js" (known exports: subscribeToResult, known reexports: ) */ undefined(result)(destination);
}
//# sourceMappingURL=subscribeToResult.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/combineLatest.js
/** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */






var NONE = {};
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var resultSelector = null;
    var scheduler = null;
    if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(observables[observables.length - 1])) {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        resultSelector = observables.pop();
    }
    if (observables.length === 1 && /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(observables[0])) {
        observables = observables[0];
    }
    return /* Cannot get final name for export "fromArray" in "./node_modules/rxjs/_esm5/internal/observable/scalar.js" (known exports: scalar, known reexports: ) */ undefined(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
}
var CombineLatestOperator = /*@__PURE__*/function () {
    function CombineLatestOperator(resultSelector) {
        this.resultSelector = resultSelector;
    }
    CombineLatestOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new combineLatest_CombineLatestSubscriber(subscriber, this.resultSelector));
    };
    return CombineLatestOperator;
}();

var combineLatest_CombineLatestSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, resultSelector) {
        var _this = _super.call(this, destination) || this;
        _this.resultSelector = resultSelector;
        _this.active = 0;
        _this.values = [];
        _this.observables = [];
        return _this;
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(NONE);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        } else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.resultSelector) {
                this._tryResultSelector(values);
            } else {
                this.destination.next(values.slice());
            }
        }
    };
    CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
        var result;
        try {
            result = this.resultSelector.apply(this, values);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=combineLatest.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isInteropObservable.js
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

function isInteropObservable(input) {
    return input && typeof input[/* Cannot get final name for export "observable" in "./node_modules/rxjs/_esm5/internal/util/noop.js" (known exports: noop, known reexports: ) */ undefined] === 'function';
}
//# sourceMappingURL=isInteropObservable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isIterable.js
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

function isIterable(input) {
    return input && typeof input[/* Cannot get final name for export "iterator" in "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js" (known exports: subscribeToIterable, known reexports: ) */ undefined] === 'function';
}
//# sourceMappingURL=isIterable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromPromise.js
/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToPromise PURE_IMPORTS_END */



function fromPromise(input, scheduler) {
    if (!scheduler) {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(/* Cannot get final name for export "subscribeToPromise" in "./node_modules/rxjs/_esm5/internal/symbol/iterator.js" (known exports: getSymbolIterator iterator $$iterator, known reexports: ) */ undefined(input));
    } else {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
            var sub = new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined();
            sub.add(scheduler.schedule(function () {
                return input.then(function (value) {
                    sub.add(scheduler.schedule(function () {
                        subscriber.next(value);
                        sub.add(scheduler.schedule(function () {
                            return subscriber.complete();
                        }));
                    }));
                }, function (err) {
                    sub.add(scheduler.schedule(function () {
                        return subscriber.error(err);
                    }));
                });
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromPromise.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromIterable.js
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator,_util_subscribeToIterable PURE_IMPORTS_END */




function fromIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    if (!scheduler) {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(/* Cannot get final name for export "subscribeToIterable" in "./node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js" (known exports: subscribeToObservable, known reexports: ) */ undefined(input));
    } else {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
            var sub = new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined();
            var iterator;
            sub.add(function () {
                if (iterator && typeof iterator.return === 'function') {
                    iterator.return();
                }
            });
            sub.add(scheduler.schedule(function () {
                iterator = input[/* Cannot get final name for export "iterator" in "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js" (known exports: subscribeToIterable, known reexports: ) */ undefined]();
                sub.add(scheduler.schedule(function () {
                    if (subscriber.closed) {
                        return;
                    }
                    var value;
                    var done;
                    try {
                        var result = iterator.next();
                        value = result.value;
                        done = result.done;
                    } catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (done) {
                        subscriber.complete();
                    } else {
                        subscriber.next(value);
                        this.schedule();
                    }
                }));
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromIterable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromObservable.js
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable,_util_subscribeToObservable PURE_IMPORTS_END */




function fromObservable(input, scheduler) {
    if (!scheduler) {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(/* Cannot get final name for export "subscribeToObservable" in "./node_modules/rxjs/_esm5/internal/util/isArrayLike.js" (known exports: isArrayLike, known reexports: ) */ undefined(input));
    } else {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
            var sub = new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined();
            sub.add(scheduler.schedule(function () {
                var observable = input[/* Cannot get final name for export "observable" in "./node_modules/rxjs/_esm5/internal/util/noop.js" (known exports: noop, known reexports: ) */ undefined]();
                sub.add(observable.subscribe({
                    next: function next(value) {
                        sub.add(scheduler.schedule(function () {
                            return subscriber.next(value);
                        }));
                    },
                    error: function error(err) {
                        sub.add(scheduler.schedule(function () {
                            return subscriber.error(err);
                        }));
                    },
                    complete: function complete() {
                        sub.add(scheduler.schedule(function () {
                            return subscriber.complete();
                        }));
                    }
                }));
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromObservable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/from.js
var from__typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** PURE_IMPORTS_START _Observable,_util_isPromise,_util_isArrayLike,_util_isInteropObservable,_util_isIterable,_fromArray,_fromPromise,_fromIterable,_fromObservable,_util_subscribeTo PURE_IMPORTS_END */










function from(input, scheduler) {
    if (!scheduler) {
        if (input instanceof /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined) {
            return input;
        }
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(/* Cannot get final name for export "subscribeTo" in "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js" (known exports: subscribeToResult, known reexports: ) */ undefined(input));
    }
    if (input != null) {
        if (/* Cannot get final name for export "isInteropObservable" in "./node_modules/rxjs/_esm5/internal/util/isIterable.js" (known exports: isIterable, known reexports: ) */ undefined(input)) {
            return /* Cannot get final name for export "fromObservable" in "./node_modules/rxjs/_esm5/internal/observable/from.js" (known exports: from, known reexports: ) */ undefined(input, scheduler);
        } else if (/* Cannot get final name for export "isPromise" in "./node_modules/rxjs/_esm5/internal/util/subscribeTo.js" (known exports: subscribeTo, known reexports: ) */ undefined(input)) {
            return /* Cannot get final name for export "fromPromise" in "./node_modules/rxjs/_esm5/internal/observable/fromIterable.js" (known exports: fromIterable, known reexports: ) */ undefined(input, scheduler);
        } else if (/* Cannot get final name for export "isArrayLike" in "./node_modules/rxjs/_esm5/internal/util/isPromise.js" (known exports: isPromise, known reexports: ) */ undefined(input)) {
            return /* Cannot get final name for export "fromArray" in "./node_modules/rxjs/_esm5/internal/observable/scalar.js" (known exports: scalar, known reexports: ) */ undefined(input, scheduler);
        } else if (/* Cannot get final name for export "isIterable" in "./node_modules/rxjs/_esm5/internal/observable/fromPromise.js" (known exports: fromPromise, known reexports: ) */ undefined(input) || typeof input === 'string') {
            return /* Cannot get final name for export "fromIterable" in "./node_modules/rxjs/_esm5/internal/observable/fromObservable.js" (known exports: fromObservable, known reexports: ) */ undefined(input, scheduler);
        }
    }
    throw new TypeError((input !== null && (typeof input === 'undefined' ? 'undefined' : from__typeof(input)) || input) + ' is not observable');
}
//# sourceMappingURL=from.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeMap.js
/** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_map,_observable_from PURE_IMPORTS_END */





function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'function') {
        return function (source) {
            return source.pipe(mergeMap(function (a, i) {
                return /* Cannot get final name for export "from" in "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js" (known exports: mergeMap MergeMapOperator MergeMapSubscriber, known reexports: ) */ undefined(project(a, i)).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (b, ii) {
                    return resultSelector(a, b, i, ii);
                }));
            }, concurrent));
        };
    } else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return function (source) {
        return source.lift(new MergeMapOperator(project, concurrent));
    };
}
var MergeMapOperator = /*@__PURE__*/function () {
    function MergeMapOperator(project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new mergeMap_MergeMapSubscriber(observer, this.project, this.concurrent));
    };
    return MergeMapOperator;
}();

var mergeMap_MergeMapSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        } else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=mergeMap.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeAll.js
/** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */


function mergeAll(concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return /* Cannot get final name for export "mergeMap" in "./node_modules/rxjs/_esm5/internal/operators/mergeAll.js" (known exports: mergeAll, known reexports: ) */ undefined(/* Cannot get final name for export "identity" in "./node_modules/rxjs/_esm5/internal/util/isObservable.js" (known exports: isObservable, known reexports: ) */ undefined, concurrent);
}
//# sourceMappingURL=mergeAll.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/concatAll.js
/** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

function concatAll() {
    return /* Cannot get final name for export "mergeAll" in "./node_modules/rxjs/_esm5/internal/operators/concatAll.js" (known exports: concatAll, known reexports: ) */ undefined(1);
}
//# sourceMappingURL=concatAll.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/concat.js
/** PURE_IMPORTS_START _util_isScheduler,_of,_from,_operators_concatAll PURE_IMPORTS_END */




function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    if (observables.length === 1 || observables.length === 2 && /* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(observables[1])) {
        return /* Cannot get final name for export "from" in "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js" (known exports: mergeMap MergeMapOperator MergeMapSubscriber, known reexports: ) */ undefined(observables[0]);
    }
    return /* Cannot get final name for export "concatAll" in "./node_modules/rxjs/_esm5/internal/observable/concat.js" (known exports: concat, known reexports: ) */ undefined()(/* Cannot get final name for export "of" in "./node_modules/rxjs/_esm5/internal/observable/throwError.js" (known exports: throwError, known reexports: ) */ undefined.apply(void 0, observables));
}
//# sourceMappingURL=concat.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/defer.js
/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */



function defer(observableFactory) {
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        var input;
        try {
            input = observableFactory();
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var source = input ? /* Cannot get final name for export "from" in "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js" (known exports: mergeMap MergeMapOperator MergeMapSubscriber, known reexports: ) */ undefined(input) : /* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined();
        return source.subscribe(subscriber);
    });
}
//# sourceMappingURL=defer.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/forkJoin.js
/** PURE_IMPORTS_START tslib,_Observable,_util_isArray,_empty,_util_subscribeToResult,_OuterSubscriber,_operators_map PURE_IMPORTS_END */







function forkJoin() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var resultSelector;
    if (typeof sources[sources.length - 1] === 'function') {
        resultSelector = sources.pop();
    }
    if (sources.length === 1 && /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(sources[0])) {
        sources = sources[0];
    }
    if (sources.length === 0) {
        return /* Cannot get final name for export "EMPTY" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined;
    }
    if (resultSelector) {
        return forkJoin(sources).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (args) {
            return resultSelector.apply(void 0, args);
        }));
    }
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        return new forkJoin_ForkJoinSubscriber(subscriber, sources);
    });
}
var forkJoin_ForkJoinSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources) {
        var _this = _super.call(this, destination) || this;
        _this.sources = sources;
        _this.completed = 0;
        _this.haveValues = 0;
        var len = sources.length;
        _this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(_this, source, null, i);
            if (innerSubscription) {
                _this.add(innerSubscription);
            }
        }
        return _this;
    }
    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
        var _a = this,
            destination = _a.destination,
            haveValues = _a.haveValues,
            values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            destination.next(values);
        }
        destination.complete();
    };
    return ForkJoinSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=forkJoin.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromEvent.js
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */




var fromEvent_toString = Object.prototype.toString;
function fromEvent(target, eventName, options, resultSelector) {
    if (/* Cannot get final name for export "isFunction" in "./node_modules/rxjs/_esm5/internal/config.js" (known exports: config, known reexports: ) */ undefined(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (args) {
            return /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
    }
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        function handler(e) {
            if (arguments.length > 1) {
                subscriber.next(Array.prototype.slice.call(arguments));
            } else {
                subscriber.next(e);
            }
        }
        setupSubscription(target, eventName, handler, subscriber, options);
    });
}
function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
    var unsubscribe;
    if (isEventTarget(sourceObj)) {
        var source_1 = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);
        unsubscribe = function unsubscribe() {
            return source_1.removeEventListener(eventName, handler, options);
        };
    } else if (isJQueryStyleEventEmitter(sourceObj)) {
        var source_2 = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = function unsubscribe() {
            return source_2.off(eventName, handler);
        };
    } else if (isNodeStyleEventEmitter(sourceObj)) {
        var source_3 = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = function unsubscribe() {
            return source_3.removeListener(eventName, handler);
        };
    } else if (sourceObj && sourceObj.length) {
        for (var i = 0, len = sourceObj.length; i < len; i++) {
            setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
    } else {
        throw new TypeError('Invalid event target');
    }
    subscriber.add(unsubscribe);
}
function isNodeStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isEventTarget(sourceObj) {
    return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
//# sourceMappingURL=fromEvent.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/fromEventPattern.js
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */




function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (args) {
            return /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
        }));
    }
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        var handler = function handler() {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue;
        try {
            retValue = addHandler(handler);
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
        if (!/* Cannot get final name for export "isFunction" in "./node_modules/rxjs/_esm5/internal/config.js" (known exports: config, known reexports: ) */ undefined(removeHandler)) {
            return undefined;
        }
        return function () {
            return removeHandler(handler, retValue);
        };
    });
}
//# sourceMappingURL=fromEventPattern.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/generate.js
/** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */



function generate(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
    var resultSelector;
    var initialState;
    if (arguments.length == 1) {
        var options = initialStateOrOptions;
        initialState = options.initialState;
        condition = options.condition;
        iterate = options.iterate;
        resultSelector = options.resultSelector || /* Cannot get final name for export "identity" in "./node_modules/rxjs/_esm5/internal/util/isObservable.js" (known exports: isObservable, known reexports: ) */ undefined;
        scheduler = options.scheduler;
    } else if (resultSelectorOrObservable === undefined || /* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(resultSelectorOrObservable)) {
        initialState = initialStateOrOptions;
        resultSelector = /* Cannot get final name for export "identity" in "./node_modules/rxjs/_esm5/internal/util/isObservable.js" (known exports: isObservable, known reexports: ) */ undefined;
        scheduler = resultSelectorOrObservable;
    } else {
        initialState = initialStateOrOptions;
        resultSelector = resultSelectorOrObservable;
    }
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        var state = initialState;
        if (scheduler) {
            return scheduler.schedule(generate_dispatch, 0, {
                subscriber: subscriber,
                iterate: iterate,
                condition: condition,
                resultSelector: resultSelector,
                state: state
            });
        }
        do {
            if (condition) {
                var conditionResult = void 0;
                try {
                    conditionResult = condition(state);
                } catch (err) {
                    subscriber.error(err);
                    return undefined;
                }
                if (!conditionResult) {
                    subscriber.complete();
                    break;
                }
            }
            var value = void 0;
            try {
                value = resultSelector(state);
            } catch (err) {
                subscriber.error(err);
                return undefined;
            }
            subscriber.next(value);
            if (subscriber.closed) {
                break;
            }
            try {
                state = iterate(state);
            } catch (err) {
                subscriber.error(err);
                return undefined;
            }
        } while (true);
        return undefined;
    });
}
function generate_dispatch(state) {
    var subscriber = state.subscriber,
        condition = state.condition;
    if (subscriber.closed) {
        return undefined;
    }
    if (state.needIterate) {
        try {
            state.state = state.iterate(state.state);
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
    } else {
        state.needIterate = true;
    }
    if (condition) {
        var conditionResult = void 0;
        try {
            conditionResult = condition(state.state);
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
        if (!conditionResult) {
            subscriber.complete();
            return undefined;
        }
        if (subscriber.closed) {
            return undefined;
        }
    }
    var value;
    try {
        value = state.resultSelector(state.state);
    } catch (err) {
        subscriber.error(err);
        return undefined;
    }
    if (subscriber.closed) {
        return undefined;
    }
    subscriber.next(value);
    if (subscriber.closed) {
        return undefined;
    }
    return this.schedule(state);
}
//# sourceMappingURL=generate.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/iif.js
/** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */


function iif(condition, trueResult, falseResult) {
    if (trueResult === void 0) {
        trueResult = /* Cannot get final name for export "EMPTY" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined;
    }
    if (falseResult === void 0) {
        falseResult = /* Cannot get final name for export "EMPTY" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined;
    }
    return /* Cannot get final name for export "defer" in "./node_modules/rxjs/_esm5/internal/observable/forkJoin.js" (known exports: forkJoin, known reexports: ) */ undefined(function () {
        return condition() ? trueResult : falseResult;
    });
}
//# sourceMappingURL=iif.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isNumeric.js
/** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */

function isNumeric(val) {
    return !/* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(val) && val - parseFloat(val) + 1 >= 0;
}
//# sourceMappingURL=isNumeric.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/interval.js
/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */



function interval(period, scheduler) {
    if (period === void 0) {
        period = 0;
    }
    if (scheduler === void 0) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    if (!/* Cannot get final name for export "isNumeric" in "./node_modules/rxjs/_esm5/internal/observable/interval.js" (known exports: interval, known reexports: ) */ undefined(period) || period < 0) {
        period = 0;
    }
    if (!scheduler || typeof scheduler.schedule !== 'function') {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        subscriber.add(scheduler.schedule(interval_dispatch, period, { subscriber: subscriber, counter: 0, period: period }));
        return subscriber;
    });
}
function interval_dispatch(state) {
    var subscriber = state.subscriber,
        counter = state.counter,
        period = state.period;
    subscriber.next(counter);
    this.schedule({ subscriber: subscriber, counter: counter + 1, period: period }, period);
}
//# sourceMappingURL=interval.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/merge.js
/** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */




function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    } else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined) {
        return observables[0];
    }
    return /* Cannot get final name for export "mergeAll" in "./node_modules/rxjs/_esm5/internal/operators/concatAll.js" (known exports: concatAll, known reexports: ) */ undefined(concurrent)(/* Cannot get final name for export "fromArray" in "./node_modules/rxjs/_esm5/internal/observable/scalar.js" (known exports: scalar, known reexports: ) */ undefined(observables, scheduler));
}
//# sourceMappingURL=merge.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/never.js
/** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */


var NEVER = /*@__PURE__*/new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(/* Cannot get final name for export "noop" in "./node_modules/rxjs/_esm5/internal/util/pipe.js" (known exports: pipe pipeFromArray, known reexports: ) */ undefined);
function never() {
    return NEVER;
}
//# sourceMappingURL=never.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/onErrorResumeNext.js
/** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */




function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    if (sources.length === 0) {
        return /* Cannot get final name for export "EMPTY" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined;
    }
    var first = sources[0],
        remainder = sources.slice(1);
    if (sources.length === 1 && /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(first)) {
        return onErrorResumeNext.apply(void 0, first);
    }
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        var subNext = function subNext() {
            return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber));
        };
        return /* Cannot get final name for export "from" in "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js" (known exports: mergeMap MergeMapOperator MergeMapSubscriber, known reexports: ) */ undefined(first).subscribe({
            next: function next(value) {
                subscriber.next(value);
            },
            error: subNext,
            complete: subNext
        });
    });
}
//# sourceMappingURL=onErrorResumeNext.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/pairs.js
/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */


function pairs(obj, scheduler) {
    if (!scheduler) {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length && !subscriber.closed; i++) {
                var key = keys[i];
                if (obj.hasOwnProperty(key)) {
                    subscriber.next([key, obj[key]]);
                }
            }
            subscriber.complete();
        });
    } else {
        return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
            var keys = Object.keys(obj);
            var subscription = new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined();
            subscription.add(scheduler.schedule(pairs_dispatch, 0, { keys: keys, index: 0, subscriber: subscriber, subscription: subscription, obj: obj }));
            return subscription;
        });
    }
}
function pairs_dispatch(state) {
    var keys = state.keys,
        index = state.index,
        subscriber = state.subscriber,
        subscription = state.subscription,
        obj = state.obj;
    if (!subscriber.closed) {
        if (index < keys.length) {
            var key = keys[index];
            subscriber.next([key, obj[key]]);
            subscription.add(this.schedule({ keys: keys, index: index + 1, subscriber: subscriber, subscription: subscription, obj: obj }));
        } else {
            subscriber.complete();
        }
    }
}
//# sourceMappingURL=pairs.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/race.js
/** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    if (observables.length === 1) {
        if (/* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(observables[0])) {
            observables = observables[0];
        } else {
            return observables[0];
        }
    }
    return /* Cannot get final name for export "fromArray" in "./node_modules/rxjs/_esm5/internal/observable/scalar.js" (known exports: scalar, known reexports: ) */ undefined(observables, undefined).lift(new RaceOperator());
}
var RaceOperator = /*@__PURE__*/function () {
    function RaceOperator() {}
    RaceOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new race_RaceSubscriber(subscriber));
    };
    return RaceOperator;
}();

var race_RaceSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(RaceSubscriber, _super);
    function RaceSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasFirst = false;
        _this.observables = [];
        _this.subscriptions = [];
        return _this;
    }
    RaceSubscriber.prototype._next = function (observable) {
        this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        } else {
            for (var i = 0; i < len && !this.hasFirst; i++) {
                var observable = observables[i];
                var subscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, observable, observable, i);
                if (this.subscriptions) {
                    this.subscriptions.push(subscription);
                }
                this.add(subscription);
            }
            this.observables = null;
        }
    };
    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (var i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    var subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    };
    return RaceSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=race.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/range.js
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function range(start, count, scheduler) {
    if (start === void 0) {
        start = 0;
    }
    if (count === void 0) {
        count = 0;
    }
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        var index = 0;
        var current = start;
        if (scheduler) {
            return scheduler.schedule(range_dispatch, 0, {
                index: index, count: count, start: start, subscriber: subscriber
            });
        } else {
            do {
                if (index++ >= count) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(current++);
                if (subscriber.closed) {
                    break;
                }
            } while (true);
        }
        return undefined;
    });
}
function range_dispatch(state) {
    var start = state.start,
        index = state.index,
        count = state.count,
        subscriber = state.subscriber;
    if (index >= count) {
        subscriber.complete();
        return;
    }
    subscriber.next(start);
    if (subscriber.closed) {
        return;
    }
    state.index = index + 1;
    state.start = start + 1;
    this.schedule(state);
}
//# sourceMappingURL=range.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/timer.js
/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */




function timer(dueTime, periodOrScheduler, scheduler) {
    if (dueTime === void 0) {
        dueTime = 0;
    }
    var period = -1;
    if (/* Cannot get final name for export "isNumeric" in "./node_modules/rxjs/_esm5/internal/observable/interval.js" (known exports: interval, known reexports: ) */ undefined(periodOrScheduler)) {
        period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
    } else if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(periodOrScheduler)) {
        scheduler = periodOrScheduler;
    }
    if (!/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(scheduler)) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        var due = /* Cannot get final name for export "isNumeric" in "./node_modules/rxjs/_esm5/internal/observable/interval.js" (known exports: interval, known reexports: ) */ undefined(dueTime) ? dueTime : +dueTime - scheduler.now();
        return scheduler.schedule(timer_dispatch, due, {
            index: 0, period: period, subscriber: subscriber
        });
    });
}
function timer_dispatch(state) {
    var index = state.index,
        period = state.period,
        subscriber = state.subscriber;
    subscriber.next(index);
    if (subscriber.closed) {
        return;
    } else if (period === -1) {
        return subscriber.complete();
    }
    state.index = index + 1;
    this.schedule(state, period);
}
//# sourceMappingURL=timer.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/using.js
/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */



function using(resourceFactory, observableFactory) {
    return new /* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined(function (subscriber) {
        var resource;
        try {
            resource = resourceFactory();
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var result;
        try {
            result = observableFactory(resource);
        } catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var source = result ? /* Cannot get final name for export "from" in "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js" (known exports: mergeMap MergeMapOperator MergeMapSubscriber, known reexports: ) */ undefined(result) : /* Cannot get final name for export "EMPTY" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined;
        var subscription = source.subscribe(subscriber);
        return function () {
            subscription.unsubscribe();
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
//# sourceMappingURL=using.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/zip.js
/** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_OuterSubscriber,_util_subscribeToResult,_.._internal_symbol_iterator PURE_IMPORTS_END */







function zip() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var resultSelector = observables[observables.length - 1];
    if (typeof resultSelector === 'function') {
        observables.pop();
    }
    return /* Cannot get final name for export "fromArray" in "./node_modules/rxjs/_esm5/internal/observable/scalar.js" (known exports: scalar, known reexports: ) */ undefined(observables, undefined).lift(new ZipOperator(resultSelector));
}
var ZipOperator = /*@__PURE__*/function () {
    function ZipOperator(resultSelector) {
        this.resultSelector = resultSelector;
    }
    ZipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new zip_ZipSubscriber(subscriber, this.resultSelector));
    };
    return ZipOperator;
}();

var zip_ZipSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ZipSubscriber, _super);
    function ZipSubscriber(destination, resultSelector, values) {
        if (values === void 0) {
            values = Object.create(null);
        }
        var _this = _super.call(this, destination) || this;
        _this.iterators = [];
        _this.active = 0;
        _this.resultSelector = typeof resultSelector === 'function' ? resultSelector : null;
        _this.values = values;
        return _this;
    }
    ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;
        if (/* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(value)) {
            iterators.push(new zip_StaticArrayIterator(value));
        } else if (typeof value[/* Cannot get final name for export "iterator" in "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js" (known exports: subscribeToIterable, known reexports: ) */ undefined] === 'function') {
            iterators.push(new StaticIterator(value[/* Cannot get final name for export "iterator" in "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js" (known exports: subscribeToIterable, known reexports: ) */ undefined]()));
        } else {
            iterators.push(new zip_ZipBufferIterator(this.destination, this, value));
        }
    };
    ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        if (len === 0) {
            this.destination.complete();
            return;
        }
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
                this.add(iterator.subscribe(iterator, i));
            } else {
                this.active--;
            }
        }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            var result = iterator.next();
            if (iterator.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        if (this.resultSelector) {
            this._tryresultSelector(args);
        } else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };
    ZipSubscriber.prototype._tryresultSelector = function (args) {
        var result;
        try {
            result = this.resultSelector.apply(this, args);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return ZipSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);

var StaticIterator = /*@__PURE__*/function () {
    function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
    }
    StaticIterator.prototype.hasValue = function () {
        return true;
    };
    StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };
    return StaticIterator;
}();
var zip_StaticArrayIterator = /*@__PURE__*/function () {
    function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    StaticArrayIterator.prototype[/* Cannot get final name for export "iterator" in "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js" (known exports: subscribeToIterable, known reexports: ) */ undefined] = function () {
        return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
    };
    StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
    };
    return StaticArrayIterator;
}();
var zip_ZipBufferIterator = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        _this.observable = observable;
        _this.stillUnsubscribed = true;
        _this.buffer = [];
        _this.isComplete = false;
        return _this;
    }
    ZipBufferIterator.prototype[/* Cannot get final name for export "iterator" in "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js" (known exports: subscribeToIterable, known reexports: ) */ undefined] = function () {
        return this;
    };
    ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { value: null, done: true };
        } else {
            return { value: buffer.shift(), done: false };
        }
    };
    ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        } else {
            this.destination.complete();
        }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
        return /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, this.observable, this, index);
    };
    return ZipBufferIterator;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=zip.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/index.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */





















































//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./_js/src/common.js
// # src / common.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Import what we need.




// Check the user agent for Safari and iOS Safari, to give them some special treatment...
var ua = navigator.userAgent.toLowerCase();
var isSafari = ua.indexOf('safari') > 0 && ua.indexOf('chrome') < 0;
var isMobileSafari = isSafari && ua.indexOf('mobile') > 0;
var isUCBrowser = ua.indexOf('ucbrowser') > 0;
var isFirefoxIOS = ua.indexOf('fxios') > 0 && ua.indexOf('safari') > 0;

// Takes an array of Modernizr feature tests and makes sure they all pass.
function hasFeatures(features) {
  var acc = true;

  features.forEach(function (feature) {
    var hasFeature = window.Modernizr[feature];
    if (!hasFeature && true) console.warn('Feature \'' + feature + '\' missing!');
    acc = acc && hasFeature;
  });

  return acc;
}

// Some functions to hide and show content.
function show() {
  this.style.display = 'block';
  this.style.visibility = 'visible';
}

function hide() {
  this.style.display = 'none';
  this.style.visibility = 'hidden';
}

function unshow() {
  this.style.display = '';
  this.style.visibility = '';
}

var unhide = unshow;

// Same as `el.innerHTML = ''`, but not quite so hacky.
function common_empty() {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }
}

// An observable wrapper for the WebAnimations API.
// Will return an observable that emits once when the animation finishes.
function animate(el, keyframes, options) {
  return /* Cannot get final name for export "Observable" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined.create(function (observer) {
    var anim = el.animate(keyframes, options);

    anim.addEventListener('finish', function (e) {
      observer.next(e);
      requestAnimationFrame(observer.complete.bind(observer));
    });

    return function () {
      if (anim.playState !== 'finished') anim.cancel();
    };
  });
}

// Returns a promise that can be resolved (rejected) after the fact,
// by calling its `resolve` (`reject`) function.
function getResolvablePromise() {
  var resolve = void 0,
      reject = void 0; // eslint-disable-line one-var, one-var-declaration-per-line
  var promise = new Promise(function (res, rej) {
    resolve = res;reject = rej;
  });
  promise.resolve = resolve;
  promise.reject = reject;
  return promise;
}
// CONCATENATED MODULE: ./_js/src/katex.js
// # src / katex.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.





var forEach = Array.prototype.forEach;


var REQUIREMENTS = ['classlist', 'eventlistener', 'queryselector'];

var featuresOk = /* Cannot get final name for export "hasFeatures" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined(REQUIREMENTS);
var katexJSLoaded = false;
var katexCSSLoaded = false;

function replaceMathBlock(el, tex) {
  el.outerHTML = window.katex.renderToString(tex, {
    displayMode: el.type === 'math/tex; mode=display'
  });
}

function renderKatex(el, tex) {
  try {
    var prev = el.previousElementSibling;
    replaceMathBlock(el, tex);
    if (prev && prev.classList && prev.classList.contains('MathJax_Preview')) {
      /* Cannot get final name for export "hide" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined.call(prev);
    }
  } catch (e) {
    // TODO: remove in production builds?
    console.error(e); // eslint-disable-line no-console
  } finally {
    el.style.willChange = '';
  }
}

function readTexSource(el) {
  return el.textContent.replace('% <![CDATA[', '').replace('%]]>', '');
}

function changeContent(mathBlocks) {
  // kramdown generates script tags with type "math/tex"
  forEach.call(mathBlocks, function (script) {
    var tex = readTexSource(script);
    renderKatex(script, tex);
  });
}

function upgradeMathBlocks() {
  if (featuresOk) {
    var mathBlocks = document.querySelectorAll('script[type^="math/tex"]');
    if (mathBlocks.length) {
      if (katexJSLoaded && katexCSSLoaded) {
        changeContent(mathBlocks);
      } else {
        window.loadJSDeferred(document.getElementById('_katexJS').href, function () {
          katexJSLoaded = true;
          if (katexJSLoaded && katexCSSLoaded) upgradeMathBlocks();
        });
        window.loadCSS(document.getElementById('_katexCSS').href).onload = function () {
          katexCSSLoaded = true;
          if (katexJSLoaded && katexCSSLoaded) upgradeMathBlocks();
        };
      }
    }
  }
}

upgradeMathBlocks();
// CONCATENATED MODULE: ./node_modules/qd-set/esm/index.js
var _Set = typeof Set !== 'undefined' && new Set([1]).size === 1 ? Set : function () {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  a = a.filter(function (x, i) {
    return i === a.indexOf(x);
  });
  a.size = a.length;
  a.has = function (x) {
    return a.indexOf(x) > -1;
  };
  a.add = function (x) {
    if (!a.has(x)) {
      a.size++;a.push(x);
    }return a;
  };
  a.delete = function (x) {
    var t = void 0;if (t = a.has(x)) {
      a.size--;a.splice(a.indexOf(x), 1);
    }return t;
  };
  a.clear = function () {
    while (a.pop()) {}a.size = 0;
  };
  return a;
};


// CONCATENATED MODULE: ./node_modules/hy-component/src/vanilla.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// # src / vanilla.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
// Licensed under MIT





var VanillaComponent = function VanillaComponent(el, props) {
  _classCallCheck(this, VanillaComponent);

  this.setupComponent(el, props);
  this.connectComponent();
};
// CONCATENATED MODULE: ./node_modules/create-element-x/factory.js
var factory_isArray = Array.isArray || function (arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};
var isHTMLCollection = function isHTMLCollection(arg) {
  return Object.prototype.toString.call(arg) === '[object HTMLCollection]';
};
var isNodeList = function isNodeList(arg) {
  return Object.prototype.toString.call(arg) === '[object NodeList]';
};

var createCreateElement = function createCreateElement(createElement, createTextNode) {
  function appendChild(c) {
    if (typeof c === 'string') this.appendChild(createTextNode(c));else this.appendChild(c);
  }

  return function (tagName, attributes) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    var el = createElement(tagName);

    for (var attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    } // Support old JSX sytax that wraps children in an array,
    // as 3rd parameter.
    var cs = children[0];
    var shouldCopy = void 0;
    if (factory_isArray(cs) || (shouldCopy = isHTMLCollection(cs)) || (shouldCopy = isNodeList(cs))) {
      // In case use user provides a `NodeList` or `HTMLCollection`,
      // appening will have the effect of removing the item the current
      // collection, which in turn will cause problems which `forEach`.
      // So we create a copy frist:
      if (shouldCopy) {
        cs = Array.prototype.slice.call(cs, 0);
      }
      Array.prototype.forEach.call(cs, appendChild, el);

      // Support new JSX syntax, where each child is an additional
      // function parameter.
    } else {
      Array.prototype.forEach.call(children, function (child) {
        if (typeof child === 'string') {
          el.appendChild(createTextNode(child));
        } else {
          el.appendChild(child);
        }
      });
    }

    return el;
  };
};

/* harmony default export */ var factory = (createCreateElement);
// CONCATENATED MODULE: ./node_modules/create-element-x/library.js


var createElement = /* Cannot get final name for export "createCreateElement" in "./node_modules/create-element-x/library.js" (known exports: createElement default, known reexports: ) */ undefined(document.createElement.bind(document), document.createTextNode.bind(document));
/* harmony default export */ var library = (createElement);
// CONCATENATED MODULE: ./node_modules/hy-component/src/component.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function component__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// # src / component.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
// Licensed under MIT

// import 'core-js/fn/array/for-each';
// import 'core-js/fn/object/assign';
// import 'core-js/fn/object/define-property';
// import 'core-js/fn/object/keys';





var COMPONENT_FEATURE_TESTS = new _Set(["customevent"]);

var sSymbol = Symbol || function (x) {
  return "_" + x;
};
var sRoot = sSymbol("sroot");
var sState = sSymbol("state");

window.process = window.process || {};
window.process.env = window.process.env || {};

window.requestIdleCallback = window.requestIdleCallback || function (f) {
  return window.setTimeout(f, 0);
};
window.cancelIdleCallback = window.cancelIdleCallback || window.clearTimeout;

var Component = function Component() {
  component__classCallCheck(this, Component);
};

var componentMixin = function componentMixin() {
  var C = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Component;
  return function (_C) {
    _inherits(_class, _C);

    function _class() {
      component__classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: "setupComponent",
      value: function setupComponent(el, state) {
        var defaults = this.constructor.defaults;


        if (true) {
          var _constructor = this.constructor,
              componentName = _constructor.componentName,
              sideEffects = _constructor.sideEffects;

          if (!componentName) {
            console.warn("Component needs to have a name, e.g. `my-tag`. To set a name, provide a static getter called `componentName`.");
          }
          if (!defaults) {
            console.warn("No default properties provided. Implement a static getter called `defaults`.");
          }
          if (!sideEffects) {
            console.warn("No side effects provided. Implement a static getter called `sideEffects`.");
          }
        }

        this[sState] = Object.assign({}, defaults, state);
        this.setupProperties(this);
        this[sRoot] = this.setupShadowDOM(el);
      }
    }, {
      key: "setupShadowDOM",
      value: function setupShadowDOM(el) {
        return el;
      }
    }, {
      key: "connectComponent",
      value: function connectComponent() {}
    }, {
      key: "disconnectComponent",
      value: function disconnectComponent() {}
    }, {
      key: "adoptComponent",
      value: function adoptComponent() {}
    }, {
      key: "getRoot",
      value: function getRoot() {
        return this[sRoot];
      }
    }, {
      key: "getEl",
      value: function getEl() {
        return this[sRoot];
      }
    }, {
      key: "fireEvent",
      value: function fireEvent(eventName, data) {
        var componentName = this.constructor.componentName;

        var event = new CustomEvent(componentName + "-" + eventName, data);
        this.el.dispatchEvent(event);
      }
    }, {
      key: "setInternalState",
      value: function setInternalState(key, value) {
        this[sState][key] = value;
      }
    }, {
      key: "setupProperties",
      value: function setupProperties() {
        var _this2 = this;

        var sideEffects = this.constructor.sideEffects;


        Object.keys(this[sState]).forEach(function (key) {
          var sideEffect = sideEffects[key];
          _this2.setupProperty(key, sideEffect);
        });
      }
    }, {
      key: "setupProperty",
      value: function setupProperty(key, sideEffect) {
        var _this3 = this;

        Object.defineProperty(this, key, {
          get: function get() {
            return _this3[sState][key];
          },
          set: function set(value) {
            var oldValue = _this3[sState][key];
            _this3.setInternalState(key, value);
            if (sideEffect) sideEffect.call(_this3, value, oldValue);
          },
          enumerable: true,
          configurable: true
        });
      }
    }, {
      key: "sroot",
      get: function get() {
        return this.getRoot();
      }
    }, {
      key: "el",
      get: function get() {
        return this.getEl();
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/hy-component/src/rxjs.js
var rxjs__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function rxjs__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function rxjs__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function rxjs__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / rxjs.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
// Licensed under MIT



var rxjs_rxjsMixin = function rxjsMixin(C) {
  return function (_C) {
    rxjs__inherits(_class, _C);

    function _class() {
      rxjs__classCallCheck(this, _class);

      return rxjs__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    rxjs__createClass(_class, [{
      key: "setupComponent",
      value: function setupComponent(el, opts) {
        var _this2 = this;

        var sideEffects = {};

        this.subjects = {};
        this.subjects.disconnect = new /* Cannot get final name for export "Subject" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined();
        this.subjects.document = new /* Cannot get final name for export "ReplaySubject" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined();

        Object.keys(this.constructor.types).map(function (key) {
          _this2.subjects[key] = new /* Cannot get final name for export "ReplaySubject" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(1);
          sideEffects[key] = function (x) {
            return _this2.subjects[key].next(x);
          };
        });

        Object.defineProperty(this.constructor, "sideEffects", {
          get: function get() {
            return sideEffects;
          },
          set: function set() {},
          enumerable: true,
          configurable: true
        });

        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "setupComponent", this).call(this, el, opts);
      }
    }, {
      key: "connectComponent",
      value: function connectComponent() {
        var _this3 = this;

        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "connectComponent", this).call(this);
        this.subjects.document.next(document);
        Object.keys(this.constructor.types).map(function (key) {
          return _this3.subjects[key].next(_this3[key]);
        });
      }
    }, {
      key: "disconnectComponent",
      value: function disconnectComponent() {
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "disconnectComponent", this).call(this);
        this.subjects.disconnect.next({});
      }
    }, {
      key: "adaptComponent",
      value: function adaptComponent() {
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "adaptComponent", this).call(this);
        this.subjects.document.next(document);
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/attr-types/array.js
var array_array = function array(attr) {
  if (attr == null) return null;

  var str = attr.trim().replace(/^\[?(.*?)\]?$/, '$1').split(',').map(function (x) {
    return x.trim();
  });

  return str || null;
};

array_array.stringify = function (a) {
  return a && a.length > 0 ? a.join(',') : null;
};

/* harmony default export */ var attr_types_array = (array_array);
// CONCATENATED MODULE: ./node_modules/attr-types/array-of.js


var array_of_arrayOf = function arrayOf(type) {
  var f = function f(attr) {
    if (attr == null) return null;
    var a = /* Cannot get final name for export "array" in "./node_modules/attr-types/array-of.js" (known exports: arrayOf default, known reexports: ) */ undefined(attr).map(type);
    if (a.reduce(function (r, x) {
      return r && x !== null;
    }, true)) {
      return a;
    }
    return null;
  };

  f.stringify = function (a) {
    var a2 = a && a.map && a.map(type.stringify);
    if (a2 && a2.reduce(function (r, x) {
      return r && x !== null;
    }, true)) {
      return /* Cannot get final name for export "array" in "./node_modules/attr-types/array-of.js" (known exports: arrayOf default, known reexports: ) */ undefined.stringify(a2);
    }
    return null;
  };

  return f;
};

/* harmony default export */ var array_of = (array_of_arrayOf);
// CONCATENATED MODULE: ./node_modules/attr-types/bool.js
var bool = function bool(attr) {
  if (attr == null) return false;
  var attr2 = attr.trim && attr.trim() || attr;
  return !(attr2 === 'false' || attr2 === 'null' || attr2 === 'undefined' || attr2 === '0' || attr2 === false);
};

bool.stringify = function (b) {
  return b ? '' : null;
};

/* harmony default export */ var attr_types_bool = (bool);
// CONCATENATED MODULE: ./node_modules/attr-types/number.js
var number = function number(attr) {
  if (attr == null) return null;
  return Number(attr);
};

number.stringify = function (n) {
  if (n == null) return null;
  return "" + n;
};

/* harmony default export */ var attr_types_number = (number);
// CONCATENATED MODULE: ./node_modules/attr-types/one-of.js
var oneOf = function oneOf(alts) {
  var f = function f(attr) {
    if (attr == null) return null;

    var i = alts.indexOf(attr);
    if (true && i === -1) {
      console.warn('\'' + attr + '\' is not \'oneOf\': ' + alts.join(', '));
    }

    return i > -1 ? alts[i] : null;
  };

  f.stringify = function (o) {
    return alts.indexOf(o) !== -1 ? o : null;
  };

  return f;
};

/* harmony default export */ var one_of = (oneOf);
// CONCATENATED MODULE: ./node_modules/attr-types/regex.js
var regex = function regex(attr) {
  if (attr == null) return null;
  var attr2 = attr.trim && attr.trim() || attr;
  var match = attr2.match(/^\/?(.*?)(\/([gimy]*))?$/);
  return new RegExp(match[1], match[3]);
};

regex.stringify = function (r) {
  return r && r.toString() || null;
};

/* harmony default export */ var attr_types_regex = (regex);
// CONCATENATED MODULE: ./node_modules/attr-types/string.js
var string = function string(attr) {
  return attr;
};

string.stringify = function (s) {
  return s;
};

/* harmony default export */ var attr_types_string = (string);
// CONCATENATED MODULE: ./node_modules/attr-types/index.js










/* harmony default export */ var attr_types = ({
  array: /* Cannot get final name for export "array" in "./node_modules/attr-types/array-of.js" (known exports: arrayOf default, known reexports: ) */ undefined, arrayOf: /* Cannot get final name for export "arrayOf" in "./node_modules/attr-types/bool.js" (known exports: bool default, known reexports: ) */ undefined, bool: /* Cannot get final name for export "bool" in "./node_modules/attr-types/number.js" (known exports: number default, known reexports: ) */ undefined, number: /* Cannot get final name for export "number" in "./node_modules/attr-types/one-of.js" (known exports: oneOf default, known reexports: ) */ undefined, oneOf: /* Cannot get final name for export "oneOf" in "./node_modules/attr-types/regex.js" (known exports: regex default, known reexports: ) */ undefined, regex: /* Cannot get final name for export "regex" in "./node_modules/attr-types/string.js" (known exports: string default, known reexports: ) */ undefined, string: string
});
// CONCATENATED MODULE: ./node_modules/hy-component/src/types.js



/* harmony default export */ var src_types = ({
  array: array_array,
  arrayOf: array_of_arrayOf,
  bool: bool,
  number: number,
  oneOf: oneOf,
  regex: regex,
  string: string
});
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/audit.js
/** PURE_IMPORTS_START tslib,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function audit(durationSelector) {
    return function auditOperatorFunction(source) {
        return source.lift(new AuditOperator(durationSelector));
    };
}
var AuditOperator = /*@__PURE__*/function () {
    function AuditOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    AuditOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new audit_AuditSubscriber(subscriber, this.durationSelector));
    };
    return AuditOperator;
}();
var audit_AuditSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AuditSubscriber, _super);
    function AuditSubscriber(destination, durationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        return _this;
    }
    AuditSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
        if (!this.throttled) {
            var duration = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(this.durationSelector)(value);
            if (duration === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                this.destination.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
            } else {
                var innerSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, duration);
                if (!innerSubscription || innerSubscription.closed) {
                    this.clearThrottle();
                } else {
                    this.add(this.throttled = innerSubscription);
                }
            }
        }
    };
    AuditSubscriber.prototype.clearThrottle = function () {
        var _a = this,
            value = _a.value,
            hasValue = _a.hasValue,
            throttled = _a.throttled;
        if (throttled) {
            this.remove(throttled);
            this.throttled = null;
            throttled.unsubscribe();
        }
        if (hasValue) {
            this.value = null;
            this.hasValue = false;
            this.destination.next(value);
        }
    };
    AuditSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        this.clearThrottle();
    };
    AuditSubscriber.prototype.notifyComplete = function () {
        this.clearThrottle();
    };
    return AuditSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=audit.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/auditTime.js
/** PURE_IMPORTS_START _scheduler_async,_audit,_observable_timer PURE_IMPORTS_END */



function auditTime(duration, scheduler) {
    if (scheduler === void 0) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    return /* Cannot get final name for export "audit" in "./node_modules/rxjs/_esm5/internal/operators/auditTime.js" (known exports: auditTime, known reexports: ) */ undefined(function () {
        return /* Cannot get final name for export "timer" in "./node_modules/rxjs/_esm5/internal/observable/using.js" (known exports: using, known reexports: ) */ undefined(duration, scheduler);
    });
}
//# sourceMappingURL=auditTime.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/buffer.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function buffer_buffer(closingNotifier) {
    return function bufferOperatorFunction(source) {
        return source.lift(new BufferOperator(closingNotifier));
    };
}
var BufferOperator = /*@__PURE__*/function () {
    function BufferOperator(closingNotifier) {
        this.closingNotifier = closingNotifier;
    }
    BufferOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new buffer_BufferSubscriber(subscriber, this.closingNotifier));
    };
    return BufferOperator;
}();
var buffer_BufferSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(BufferSubscriber, _super);
    function BufferSubscriber(destination, closingNotifier) {
        var _this = _super.call(this, destination) || this;
        _this.buffer = [];
        _this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(_this, closingNotifier));
        return _this;
    }
    BufferSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var buffer = this.buffer;
        this.buffer = [];
        this.destination.next(buffer);
    };
    return BufferSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=buffer.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/bufferCount.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) {
        startBufferEvery = null;
    }
    return function bufferCountOperatorFunction(source) {
        return source.lift(new BufferCountOperator(bufferSize, startBufferEvery));
    };
}
var BufferCountOperator = /*@__PURE__*/function () {
    function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        if (!startBufferEvery || bufferSize === startBufferEvery) {
            this.subscriberClass = bufferCount_BufferCountSubscriber;
        } else {
            this.subscriberClass = bufferCount_BufferSkipCountSubscriber;
        }
    }
    BufferCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
    };
    return BufferCountOperator;
}();
var bufferCount_BufferCountSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.buffer = [];
        return _this;
    }
    BufferCountSubscriber.prototype._next = function (value) {
        var buffer = this.buffer;
        buffer.push(value);
        if (buffer.length == this.bufferSize) {
            this.destination.next(buffer);
            this.buffer = [];
        }
    };
    BufferCountSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer.length > 0) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    return BufferCountSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
var bufferCount_BufferSkipCountSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(BufferSkipCountSubscriber, _super);
    function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.startBufferEvery = startBufferEvery;
        _this.buffers = [];
        _this.count = 0;
        return _this;
    }
    BufferSkipCountSubscriber.prototype._next = function (value) {
        var _a = this,
            bufferSize = _a.bufferSize,
            startBufferEvery = _a.startBufferEvery,
            buffers = _a.buffers,
            count = _a.count;
        this.count++;
        if (count % startBufferEvery === 0) {
            buffers.push([]);
        }
        for (var i = buffers.length; i--;) {
            var buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                buffers.splice(i, 1);
                this.destination.next(buffer);
            }
        }
    };
    BufferSkipCountSubscriber.prototype._complete = function () {
        var _a = this,
            buffers = _a.buffers,
            destination = _a.destination;
        while (buffers.length > 0) {
            var buffer = buffers.shift();
            if (buffer.length > 0) {
                destination.next(buffer);
            }
        }
        _super.prototype._complete.call(this);
    };
    return BufferSkipCountSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=bufferCount.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/bufferTime.js
/** PURE_IMPORTS_START tslib,_scheduler_async,_Subscriber,_util_isScheduler PURE_IMPORTS_END */




function bufferTime(bufferTimeSpan) {
    var length = arguments.length;
    var scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(arguments[arguments.length - 1])) {
        scheduler = arguments[arguments.length - 1];
        length--;
    }
    var bufferCreationInterval = null;
    if (length >= 2) {
        bufferCreationInterval = arguments[1];
    }
    var maxBufferSize = Number.POSITIVE_INFINITY;
    if (length >= 3) {
        maxBufferSize = arguments[2];
    }
    return function bufferTimeOperatorFunction(source) {
        return source.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
    };
}
var BufferTimeOperator = /*@__PURE__*/function () {
    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        this.bufferTimeSpan = bufferTimeSpan;
        this.bufferCreationInterval = bufferCreationInterval;
        this.maxBufferSize = maxBufferSize;
        this.scheduler = scheduler;
    }
    BufferTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new bufferTime_BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
    };
    return BufferTimeOperator;
}();
var Context = /*@__PURE__*/function () {
    function Context() {
        this.buffer = [];
    }
    return Context;
}();
var bufferTime_BufferTimeSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(BufferTimeSubscriber, _super);
    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.bufferTimeSpan = bufferTimeSpan;
        _this.bufferCreationInterval = bufferCreationInterval;
        _this.maxBufferSize = maxBufferSize;
        _this.scheduler = scheduler;
        _this.contexts = [];
        var context = _this.openContext();
        _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
        if (_this.timespanOnly) {
            var timeSpanOnlyState = { subscriber: _this, context: context, bufferTimeSpan: bufferTimeSpan };
            _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        } else {
            var closeState = { subscriber: _this, context: context };
            var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: _this, scheduler: scheduler };
            _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
            _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
        }
        return _this;
    }
    BufferTimeSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        var filledBufferContext;
        for (var i = 0; i < len; i++) {
            var context_1 = contexts[i];
            var buffer = context_1.buffer;
            buffer.push(value);
            if (buffer.length == this.maxBufferSize) {
                filledBufferContext = context_1;
            }
        }
        if (filledBufferContext) {
            this.onBufferFull(filledBufferContext);
        }
    };
    BufferTimeSubscriber.prototype._error = function (err) {
        this.contexts.length = 0;
        _super.prototype._error.call(this, err);
    };
    BufferTimeSubscriber.prototype._complete = function () {
        var _a = this,
            contexts = _a.contexts,
            destination = _a.destination;
        while (contexts.length > 0) {
            var context_2 = contexts.shift();
            destination.next(context_2.buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferTimeSubscriber.prototype._unsubscribe = function () {
        this.contexts = null;
    };
    BufferTimeSubscriber.prototype.onBufferFull = function (context) {
        this.closeContext(context);
        var closeAction = context.closeAction;
        closeAction.unsubscribe();
        this.remove(closeAction);
        if (!this.closed && this.timespanOnly) {
            context = this.openContext();
            var bufferTimeSpan = this.bufferTimeSpan;
            var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
            this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
        }
    };
    BufferTimeSubscriber.prototype.openContext = function () {
        var context = new Context();
        this.contexts.push(context);
        return context;
    };
    BufferTimeSubscriber.prototype.closeContext = function (context) {
        this.destination.next(context.buffer);
        var contexts = this.contexts;
        var spliceIndex = contexts ? contexts.indexOf(context) : -1;
        if (spliceIndex >= 0) {
            contexts.splice(contexts.indexOf(context), 1);
        }
    };
    return BufferTimeSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
function dispatchBufferTimeSpanOnly(state) {
    var subscriber = state.subscriber;
    var prevContext = state.context;
    if (prevContext) {
        subscriber.closeContext(prevContext);
    }
    if (!subscriber.closed) {
        state.context = subscriber.openContext();
        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
    }
}
function dispatchBufferCreation(state) {
    var bufferCreationInterval = state.bufferCreationInterval,
        bufferTimeSpan = state.bufferTimeSpan,
        subscriber = state.subscriber,
        scheduler = state.scheduler;
    var context = subscriber.openContext();
    var action = this;
    if (!subscriber.closed) {
        subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, context: context }));
        action.schedule(state, bufferCreationInterval);
    }
}
function dispatchBufferClose(arg) {
    var subscriber = arg.subscriber,
        context = arg.context;
    subscriber.closeContext(context);
}
//# sourceMappingURL=bufferTime.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/bufferToggle.js
/** PURE_IMPORTS_START tslib,_Subscription,_util_subscribeToResult,_OuterSubscriber PURE_IMPORTS_END */




function bufferToggle(openings, closingSelector) {
    return function bufferToggleOperatorFunction(source) {
        return source.lift(new BufferToggleOperator(openings, closingSelector));
    };
}
var BufferToggleOperator = /*@__PURE__*/function () {
    function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    BufferToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new bufferToggle_BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return BufferToggleOperator;
}();
var bufferToggle_BufferToggleSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(BufferToggleSubscriber, _super);
    function BufferToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(_this, openings));
        return _this;
    }
    BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
        }
    };
    BufferToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context_1 = contexts.shift();
            context_1.subscription.unsubscribe();
            context_1.buffer = null;
            context_1.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
    };
    BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context_2 = contexts.shift();
            this.destination.next(context_2.buffer);
            context_2.subscription.unsubscribe();
            context_2.buffer = null;
            context_2.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
    };
    BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
    };
    BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
        this.closeBuffer(innerSub.context);
    };
    BufferToggleSubscriber.prototype.openBuffer = function (value) {
        try {
            var closingSelector = this.closingSelector;
            var closingNotifier = closingSelector.call(this, value);
            if (closingNotifier) {
                this.trySubscribe(closingNotifier);
            }
        } catch (err) {
            this._error(err);
        }
    };
    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;
        if (contexts && context) {
            var buffer = context.buffer,
                subscription = context.subscription;
            this.destination.next(buffer);
            contexts.splice(contexts.indexOf(context), 1);
            this.remove(subscription);
            subscription.unsubscribe();
        }
    };
    BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined();
        var context = { buffer: buffer, subscription: subscription };
        contexts.push(context);
        var innerSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, closingNotifier, context);
        if (!innerSubscription || innerSubscription.closed) {
            this.closeBuffer(context);
        } else {
            innerSubscription.context = context;
            this.add(innerSubscription);
            subscription.add(innerSubscription);
        }
    };
    return BufferToggleSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=bufferToggle.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/bufferWhen.js
/** PURE_IMPORTS_START tslib,_Subscription,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */






function bufferWhen(closingSelector) {
    return function (source) {
        return source.lift(new BufferWhenOperator(closingSelector));
    };
}
var BufferWhenOperator = /*@__PURE__*/function () {
    function BufferWhenOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    BufferWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new bufferWhen_BufferWhenSubscriber(subscriber, this.closingSelector));
    };
    return BufferWhenOperator;
}();
var bufferWhen_BufferWhenSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(BufferWhenSubscriber, _super);
    function BufferWhenSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.closingSelector = closingSelector;
        _this.subscribing = false;
        _this.openBuffer();
        return _this;
    }
    BufferWhenSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferWhenSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferWhenSubscriber.prototype._unsubscribe = function () {
        this.buffer = null;
        this.subscribing = false;
    };
    BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openBuffer();
    };
    BufferWhenSubscriber.prototype.notifyComplete = function () {
        if (this.subscribing) {
            this.complete();
        } else {
            this.openBuffer();
        }
    };
    BufferWhenSubscriber.prototype.openBuffer = function () {
        var closingSubscription = this.closingSubscription;
        if (closingSubscription) {
            this.remove(closingSubscription);
            closingSubscription.unsubscribe();
        }
        var buffer = this.buffer;
        if (this.buffer) {
            this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(this.closingSelector)();
        if (closingNotifier === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
            this.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
        } else {
            closingSubscription = new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined();
            this.closingSubscription = closingSubscription;
            this.add(closingSubscription);
            this.subscribing = true;
            closingSubscription.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, closingNotifier));
            this.subscribing = false;
        }
    };
    return BufferWhenSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=bufferWhen.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/catchError.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function catchError(selector) {
    return function catchErrorOperatorFunction(source) {
        var operator = new CatchOperator(selector);
        var caught = source.lift(operator);
        return operator.caught = caught;
    };
}
var CatchOperator = /*@__PURE__*/function () {
    function CatchOperator(selector) {
        this.selector = selector;
    }
    CatchOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new catchError_CatchSubscriber(subscriber, this.selector, this.caught));
    };
    return CatchOperator;
}();
var catchError_CatchSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        var _this = _super.call(this, destination) || this;
        _this.selector = selector;
        _this.caught = caught;
        return _this;
    }
    CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var result = void 0;
            try {
                result = this.selector(err, this.caught);
            } catch (err2) {
                _super.prototype.error.call(this, err2);
                return;
            }
            this._unsubscribeAndRecycle();
            this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, result));
        }
    };
    return CatchSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=catchError.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/combineAll.js
/** PURE_IMPORTS_START _observable_combineLatest PURE_IMPORTS_END */

function combineAll(project) {
    return function (source) {
        return source.lift(new /* Cannot get final name for export "CombineLatestOperator" in "./node_modules/rxjs/_esm5/internal/util/isInteropObservable.js" (known exports: isInteropObservable, known reexports: ) */ undefined(project));
    };
}
//# sourceMappingURL=combineAll.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/combineLatest.js
/** PURE_IMPORTS_START _util_isArray,_observable_combineLatest,_observable_from PURE_IMPORTS_END */



var none = {};
function combineLatest_combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    if (observables.length === 1 && /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(observables[0])) {
        observables = observables[0].slice();
    }
    return function (source) {
        return source.lift.call(/* Cannot get final name for export "from" in "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js" (known exports: mergeMap MergeMapOperator MergeMapSubscriber, known reexports: ) */ undefined([source].concat(observables)), new /* Cannot get final name for export "CombineLatestOperator" in "./node_modules/rxjs/_esm5/internal/util/isInteropObservable.js" (known exports: isInteropObservable, known reexports: ) */ undefined(project));
    };
}
//# sourceMappingURL=combineLatest.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/concat.js
/** PURE_IMPORTS_START _observable_concat PURE_IMPORTS_END */

function concat_concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return function (source) {
        return source.lift.call(/* Cannot get final name for export "concat" in "./node_modules/rxjs/_esm5/internal/observable/defer.js" (known exports: defer, known reexports: ) */ undefined.apply(void 0, [source].concat(observables)));
    };
}
//# sourceMappingURL=concat.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/concatMap.js
/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

function concatMap(project, resultSelector) {
    return /* Cannot get final name for export "mergeMap" in "./node_modules/rxjs/_esm5/internal/operators/mergeAll.js" (known exports: mergeAll, known reexports: ) */ undefined(project, resultSelector, 1);
}
//# sourceMappingURL=concatMap.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/concatMapTo.js
/** PURE_IMPORTS_START _concatMap PURE_IMPORTS_END */

function concatMapTo(innerObservable, resultSelector) {
    return /* Cannot get final name for export "concatMap" in "./node_modules/rxjs/_esm5/internal/operators/concatMapTo.js" (known exports: concatMapTo, known reexports: ) */ undefined(function () {
        return innerObservable;
    }, resultSelector);
}
//# sourceMappingURL=concatMapTo.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/count.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function count_count(predicate) {
    return function (source) {
        return source.lift(new CountOperator(predicate, source));
    };
}
var CountOperator = /*@__PURE__*/function () {
    function CountOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    CountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new count_CountSubscriber(subscriber, this.predicate, this.source));
    };
    return CountOperator;
}();
var count_CountSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.count = 0;
        _this.index = 0;
        return _this;
    }
    CountSubscriber.prototype._next = function (value) {
        if (this.predicate) {
            this._tryPredicate(value);
        } else {
            this.count++;
        }
    };
    CountSubscriber.prototype._tryPredicate = function (value) {
        var result;
        try {
            result = this.predicate(value, this.index++, this.source);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.count++;
        }
    };
    CountSubscriber.prototype._complete = function () {
        this.destination.next(this.count);
        this.destination.complete();
    };
    return CountSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=count.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/debounce.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function debounce(durationSelector) {
    return function (source) {
        return source.lift(new DebounceOperator(durationSelector));
    };
}
var DebounceOperator = /*@__PURE__*/function () {
    function DebounceOperator(durationSelector) {
        this.durationSelector = durationSelector;
    }
    DebounceOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new debounce_DebounceSubscriber(subscriber, this.durationSelector));
    };
    return DebounceOperator;
}();
var debounce_DebounceSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(DebounceSubscriber, _super);
    function DebounceSubscriber(destination, durationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.durationSelector = durationSelector;
        _this.hasValue = false;
        _this.durationSubscription = null;
        return _this;
    }
    DebounceSubscriber.prototype._next = function (value) {
        try {
            var result = this.durationSelector.call(this, value);
            if (result) {
                this._tryNext(value, result);
            }
        } catch (err) {
            this.destination.error(err);
        }
    };
    DebounceSubscriber.prototype._complete = function () {
        this.emitValue();
        this.destination.complete();
    };
    DebounceSubscriber.prototype._tryNext = function (value, duration) {
        var subscription = this.durationSubscription;
        this.value = value;
        this.hasValue = true;
        if (subscription) {
            subscription.unsubscribe();
            this.remove(subscription);
        }
        subscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, duration);
        if (subscription && !subscription.closed) {
            this.add(this.durationSubscription = subscription);
        }
    };
    DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    };
    DebounceSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
    };
    DebounceSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
            var value = this.value;
            var subscription = this.durationSubscription;
            if (subscription) {
                this.durationSubscription = null;
                subscription.unsubscribe();
                this.remove(subscription);
            }
            this.value = null;
            this.hasValue = false;
            _super.prototype._next.call(this, value);
        }
    };
    return DebounceSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=debounce.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/debounceTime.js
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */



function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    return function (source) {
        return source.lift(new DebounceTimeOperator(dueTime, scheduler));
    };
}
var DebounceTimeOperator = /*@__PURE__*/function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new debounceTime_DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
}();
var debounceTime_DebounceTimeSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.dueTime = dueTime;
        _this.scheduler = scheduler;
        _this.debouncedSubscription = null;
        _this.lastValue = null;
        _this.hasValue = false;
        return _this;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(debounceTime_dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            var lastValue = this.lastValue;
            this.lastValue = null;
            this.hasValue = false;
            this.destination.next(lastValue);
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
function debounceTime_dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
//# sourceMappingURL=debounceTime.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/defaultIfEmpty.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) {
        defaultValue = null;
    }
    return function (source) {
        return source.lift(new DefaultIfEmptyOperator(defaultValue));
    };
}
var DefaultIfEmptyOperator = /*@__PURE__*/function () {
    function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new defaultIfEmpty_DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    };
    return DefaultIfEmptyOperator;
}();
var defaultIfEmpty_DefaultIfEmptySubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        var _this = _super.call(this, destination) || this;
        _this.defaultValue = defaultValue;
        _this.isEmpty = true;
        return _this;
    }
    DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=defaultIfEmpty.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/isDate.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
//# sourceMappingURL=isDate.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/delay.js
/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_Subscriber,_Notification PURE_IMPORTS_END */





function delay_delay(delay, scheduler) {
    if (scheduler === void 0) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    var absoluteDelay = /* Cannot get final name for export "isDate" in "./node_modules/rxjs/_esm5/internal/operators/delay.js" (known exports: delay, known reexports: ) */ undefined(delay);
    var delayFor = absoluteDelay ? +delay - scheduler.now() : Math.abs(delay);
    return function (source) {
        return source.lift(new DelayOperator(delayFor, scheduler));
    };
}
var DelayOperator = /*@__PURE__*/function () {
    function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new delay_DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
}();
var delay_DelaySubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.delay = delay;
        _this.scheduler = scheduler;
        _this.queue = [];
        _this.active = false;
        _this.errored = false;
        return _this;
    }
    DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
        } else {
            this.unsubscribe();
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(/* Cannot get final name for export "Notification" in "./node_modules/rxjs/_esm5/internal/operators/observeOn.js" (known exports: observeOn ObserveOnOperator ObserveOnSubscriber ObserveOnMessage, known reexports: ) */ undefined.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(/* Cannot get final name for export "Notification" in "./node_modules/rxjs/_esm5/internal/operators/observeOn.js" (known exports: observeOn ObserveOnOperator ObserveOnSubscriber ObserveOnMessage, known reexports: ) */ undefined.createComplete());
    };
    return DelaySubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
var DelayMessage = /*@__PURE__*/function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
}();
//# sourceMappingURL=delay.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/delayWhen.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return function (source) {
            return new delayWhen_SubscriptionDelayObservable(source, subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));
        };
    }
    return function (source) {
        return source.lift(new DelayWhenOperator(delayDurationSelector));
    };
}
var DelayWhenOperator = /*@__PURE__*/function () {
    function DelayWhenOperator(delayDurationSelector) {
        this.delayDurationSelector = delayDurationSelector;
    }
    DelayWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new delayWhen_DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    };
    return DelayWhenOperator;
}();
var delayWhen_DelayWhenSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(DelayWhenSubscriber, _super);
    function DelayWhenSubscriber(destination, delayDurationSelector) {
        var _this = _super.call(this, destination) || this;
        _this.delayDurationSelector = delayDurationSelector;
        _this.completed = false;
        _this.delayNotifierSubscriptions = [];
        return _this;
    }
    DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        var value = this.removeSubscription(innerSub);
        if (value) {
            this.destination.next(value);
        }
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype._next = function (value) {
        try {
            var delayNotifier = this.delayDurationSelector(value);
            if (delayNotifier) {
                this.tryDelay(delayNotifier, value);
            }
        } catch (err) {
            this.destination.error(err);
        }
    };
    DelayWhenSubscriber.prototype._complete = function () {
        this.completed = true;
        this.tryComplete();
    };
    DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
        subscription.unsubscribe();
        var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
        if (subscriptionIdx !== -1) {
            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
        }
        return subscription.outerValue;
    };
    DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
        var notifierSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, delayNotifier, value);
        if (notifierSubscription && !notifierSubscription.closed) {
            this.add(notifierSubscription);
            this.delayNotifierSubscriptions.push(notifierSubscription);
        }
    };
    DelayWhenSubscriber.prototype.tryComplete = function () {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
            this.destination.complete();
        }
    };
    return DelayWhenSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
var delayWhen_SubscriptionDelayObservable = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SubscriptionDelayObservable, _super);
    function SubscriptionDelayObservable(source, subscriptionDelay) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subscriptionDelay = subscriptionDelay;
        return _this;
    }
    SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
        this.subscriptionDelay.subscribe(new delayWhen_SubscriptionDelaySubscriber(subscriber, this.source));
    };
    return SubscriptionDelayObservable;
}(/* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined);
var delayWhen_SubscriptionDelaySubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SubscriptionDelaySubscriber, _super);
    function SubscriptionDelaySubscriber(parent, source) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.source = source;
        _this.sourceSubscribed = false;
        return _this;
    }
    SubscriptionDelaySubscriber.prototype._next = function (unused) {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype._error = function (err) {
        this.unsubscribe();
        this.parent.error(err);
    };
    SubscriptionDelaySubscriber.prototype._complete = function () {
        this.subscribeToSource();
    };
    SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
        if (!this.sourceSubscribed) {
            this.sourceSubscribed = true;
            this.unsubscribe();
            this.source.subscribe(this.parent);
        }
    };
    return SubscriptionDelaySubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=delayWhen.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/dematerialize.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function dematerialize() {
    return function dematerializeOperatorFunction(source) {
        return source.lift(new DeMaterializeOperator());
    };
}
var DeMaterializeOperator = /*@__PURE__*/function () {
    function DeMaterializeOperator() {}
    DeMaterializeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new dematerialize_DeMaterializeSubscriber(subscriber));
    };
    return DeMaterializeOperator;
}();
var dematerialize_DeMaterializeSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(DeMaterializeSubscriber, _super);
    function DeMaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    DeMaterializeSubscriber.prototype._next = function (value) {
        value.observe(this.destination);
    };
    return DeMaterializeSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=dematerialize.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/distinct.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function distinct(keySelector, flushes) {
    return function (source) {
        return source.lift(new DistinctOperator(keySelector, flushes));
    };
}
var DistinctOperator = /*@__PURE__*/function () {
    function DistinctOperator(keySelector, flushes) {
        this.keySelector = keySelector;
        this.flushes = flushes;
    }
    DistinctOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new distinct_DistinctSubscriber(subscriber, this.keySelector, this.flushes));
    };
    return DistinctOperator;
}();
var distinct_DistinctSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(DistinctSubscriber, _super);
    function DistinctSubscriber(destination, keySelector, flushes) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.values = new Set();
        if (flushes) {
            _this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(_this, flushes));
        }
        return _this;
    }
    DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values.clear();
    };
    DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DistinctSubscriber.prototype._next = function (value) {
        if (this.keySelector) {
            this._useKeySelector(value);
        } else {
            this._finalizeNext(value, value);
        }
    };
    DistinctSubscriber.prototype._useKeySelector = function (value) {
        var key;
        var destination = this.destination;
        try {
            key = this.keySelector(value);
        } catch (err) {
            destination.error(err);
            return;
        }
        this._finalizeNext(key, value);
    };
    DistinctSubscriber.prototype._finalizeNext = function (key, value) {
        var values = this.values;
        if (!values.has(key)) {
            values.add(key);
            this.destination.next(value);
        }
    };
    return DistinctSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=distinct.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/distinctUntilChanged.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_tryCatch,_util_errorObject PURE_IMPORTS_END */




function distinctUntilChanged(compare, keySelector) {
    return function (source) {
        return source.lift(new DistinctUntilChangedOperator(compare, keySelector));
    };
}
var DistinctUntilChangedOperator = /*@__PURE__*/function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new distinctUntilChanged_DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
}();
var distinctUntilChanged_DistinctUntilChangedSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.hasKey = false;
        if (typeof compare === 'function') {
            _this.compare = compare;
        }
        return _this;
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
            key = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(this.keySelector)(value);
            if (key === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                return this.destination.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
            }
        }
        var result = false;
        if (this.hasKey) {
            result = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(this.compare)(this.key, key);
            if (result === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                return this.destination.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
            }
        } else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=distinctUntilChanged.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/distinctUntilKeyChanged.js
/** PURE_IMPORTS_START _distinctUntilChanged PURE_IMPORTS_END */

function distinctUntilKeyChanged(key, compare) {
    return /* Cannot get final name for export "distinctUntilChanged" in "./node_modules/rxjs/_esm5/internal/operators/distinctUntilKeyChanged.js" (known exports: distinctUntilKeyChanged, known reexports: ) */ undefined(function (x, y) {
        return compare ? compare(x[key], y[key]) : x[key] === y[key];
    });
}
//# sourceMappingURL=distinctUntilKeyChanged.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/filter.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
var FilterOperator = /*@__PURE__*/function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new filter_FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}();
var filter_FilterSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
    }
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=filter.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/tap.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_noop,_util_isFunction PURE_IMPORTS_END */




function tap(nextOrObserver, error, complete) {
    return function tapOperatorFunction(source) {
        return source.lift(new DoOperator(nextOrObserver, error, complete));
    };
}
var DoOperator = /*@__PURE__*/function () {
    function DoOperator(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new tap_TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
}();
var tap_TapSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(TapSubscriber, _super);
    function TapSubscriber(destination, observerOrNext, error, complete) {
        var _this = _super.call(this, destination) || this;
        _this._tapNext = /* Cannot get final name for export "noop" in "./node_modules/rxjs/_esm5/internal/util/pipe.js" (known exports: pipe pipeFromArray, known reexports: ) */ undefined;
        _this._tapError = /* Cannot get final name for export "noop" in "./node_modules/rxjs/_esm5/internal/util/pipe.js" (known exports: pipe pipeFromArray, known reexports: ) */ undefined;
        _this._tapComplete = /* Cannot get final name for export "noop" in "./node_modules/rxjs/_esm5/internal/util/pipe.js" (known exports: pipe pipeFromArray, known reexports: ) */ undefined;
        _this._tapError = error || /* Cannot get final name for export "noop" in "./node_modules/rxjs/_esm5/internal/util/pipe.js" (known exports: pipe pipeFromArray, known reexports: ) */ undefined;
        _this._tapComplete = complete || /* Cannot get final name for export "noop" in "./node_modules/rxjs/_esm5/internal/util/pipe.js" (known exports: pipe pipeFromArray, known reexports: ) */ undefined;
        if (/* Cannot get final name for export "isFunction" in "./node_modules/rxjs/_esm5/internal/config.js" (known exports: config, known reexports: ) */ undefined(observerOrNext)) {
            _this._context = _this;
            _this._tapNext = observerOrNext;
        } else if (observerOrNext) {
            _this._context = observerOrNext;
            _this._tapNext = observerOrNext.next || /* Cannot get final name for export "noop" in "./node_modules/rxjs/_esm5/internal/util/pipe.js" (known exports: pipe pipeFromArray, known reexports: ) */ undefined;
            _this._tapError = observerOrNext.error || /* Cannot get final name for export "noop" in "./node_modules/rxjs/_esm5/internal/util/pipe.js" (known exports: pipe pipeFromArray, known reexports: ) */ undefined;
            _this._tapComplete = observerOrNext.complete || /* Cannot get final name for export "noop" in "./node_modules/rxjs/_esm5/internal/util/pipe.js" (known exports: pipe pipeFromArray, known reexports: ) */ undefined;
        }
        return _this;
    }
    TapSubscriber.prototype._next = function (value) {
        try {
            this._tapNext.call(this._context, value);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(value);
    };
    TapSubscriber.prototype._error = function (err) {
        try {
            this._tapError.call(this._context, err);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.error(err);
    };
    TapSubscriber.prototype._complete = function () {
        try {
            this._tapComplete.call(this._context);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        return this.destination.complete();
    };
    return TapSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=tap.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/throwIfEmpty.js
/** PURE_IMPORTS_START _tap,_util_EmptyError PURE_IMPORTS_END */


var throwIfEmpty_throwIfEmpty = function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) {
        errorFactory = defaultErrorFactory;
    }
    return /* Cannot get final name for export "tap" in "./node_modules/rxjs/_esm5/internal/operators/throwIfEmpty.js" (known exports: throwIfEmpty, known reexports: ) */ undefined({
        hasValue: false,
        next: function next() {
            this.hasValue = true;
        },
        complete: function complete() {
            if (!this.hasValue) {
                throw errorFactory();
            }
        }
    });
};
function defaultErrorFactory() {
    return new /* Cannot get final name for export "EmptyError" in "./node_modules/rxjs/_esm5/internal/util/TimeoutError.js" (known exports: TimeoutError, known reexports: ) */ undefined();
}
//# sourceMappingURL=throwIfEmpty.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/take.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */




function take(count) {
    return function (source) {
        if (count === 0) {
            return /* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined();
        } else {
            return source.lift(new take_TakeOperator(count));
        }
    };
}
var take_TakeOperator = /*@__PURE__*/function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new /* Cannot get final name for export "ArgumentOutOfRangeError" in "./node_modules/rxjs/_esm5/internal/util/EmptyError.js" (known exports: EmptyError, known reexports: ) */ undefined();
        }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new take_TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
}();
var take_TakeSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.count = 0;
        return _this;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        var count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=take.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/elementAt.js
/** PURE_IMPORTS_START _util_ArgumentOutOfRangeError,_filter,_throwIfEmpty,_defaultIfEmpty,_take PURE_IMPORTS_END */





function elementAt(index, defaultValue) {
    if (index < 0) {
        throw new /* Cannot get final name for export "ArgumentOutOfRangeError" in "./node_modules/rxjs/_esm5/internal/util/EmptyError.js" (known exports: EmptyError, known reexports: ) */ undefined();
    }
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(/* Cannot get final name for export "filter" in "./node_modules/rxjs/_esm5/internal/operators/tap.js" (known exports: tap, known reexports: ) */ undefined(function (v, i) {
            return i === index;
        }), /* Cannot get final name for export "take" in "./node_modules/rxjs/_esm5/internal/operators/elementAt.js" (known exports: elementAt, known reexports: ) */ undefined(1), hasDefaultValue ? /* Cannot get final name for export "defaultIfEmpty" in "./node_modules/rxjs/_esm5/internal/util/isDate.js" (known exports: isDate, known reexports: ) */ undefined(defaultValue) : /* Cannot get final name for export "throwIfEmpty" in "./node_modules/rxjs/_esm5/internal/operators/take.js" (known exports: take, known reexports: ) */ undefined(function () {
            return new /* Cannot get final name for export "ArgumentOutOfRangeError" in "./node_modules/rxjs/_esm5/internal/util/EmptyError.js" (known exports: EmptyError, known reexports: ) */ undefined();
        }));
    };
}
//# sourceMappingURL=elementAt.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/endWith.js
/** PURE_IMPORTS_START _observable_fromArray,_observable_scalar,_observable_empty,_observable_concat,_util_isScheduler PURE_IMPORTS_END */





function endWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i] = arguments[_i];
    }
    return function (source) {
        var scheduler = array[array.length - 1];
        if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(scheduler)) {
            array.pop();
        } else {
            scheduler = null;
        }
        var len = array.length;
        if (len === 1 && !scheduler) {
            return /* Cannot get final name for export "concat" in "./node_modules/rxjs/_esm5/internal/observable/defer.js" (known exports: defer, known reexports: ) */ undefined(source, /* Cannot get final name for export "scalar" in "./node_modules/rxjs/_esm5/internal/observable/of.js" (known exports: of, known reexports: ) */ undefined(array[0]));
        } else if (len > 0) {
            return /* Cannot get final name for export "concat" in "./node_modules/rxjs/_esm5/internal/observable/defer.js" (known exports: defer, known reexports: ) */ undefined(source, /* Cannot get final name for export "fromArray" in "./node_modules/rxjs/_esm5/internal/observable/scalar.js" (known exports: scalar, known reexports: ) */ undefined(array, scheduler));
        } else {
            return /* Cannot get final name for export "concat" in "./node_modules/rxjs/_esm5/internal/observable/defer.js" (known exports: defer, known reexports: ) */ undefined(source, /* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined(scheduler));
        }
    };
}
//# sourceMappingURL=endWith.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/every.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function every(predicate, thisArg) {
    return function (source) {
        return source.lift(new EveryOperator(predicate, thisArg, source));
    };
}
var EveryOperator = /*@__PURE__*/function () {
    function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    EveryOperator.prototype.call = function (observer, source) {
        return source.subscribe(new every_EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    };
    return EveryOperator;
}();
var every_EverySubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.source = source;
        _this.index = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
        var result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    };
    EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return EverySubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=every.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/exhaust.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function exhaust() {
    return function (source) {
        return source.lift(new SwitchFirstOperator());
    };
}
var SwitchFirstOperator = /*@__PURE__*/function () {
    function SwitchFirstOperator() {}
    SwitchFirstOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new exhaust_SwitchFirstSubscriber(subscriber));
    };
    return SwitchFirstOperator;
}();
var exhaust_SwitchFirstSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SwitchFirstSubscriber, _super);
    function SwitchFirstSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasCompleted = false;
        _this.hasSubscription = false;
        return _this;
    }
    SwitchFirstSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            this.hasSubscription = true;
            this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, value));
        }
    };
    SwitchFirstSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    };
    SwitchFirstSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return SwitchFirstSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=exhaust.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/exhaustMap.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult,_map,_observable_from PURE_IMPORTS_END */





function exhaustMap(project, resultSelector) {
    if (resultSelector) {
        return function (source) {
            return source.pipe(exhaustMap(function (a, i) {
                return /* Cannot get final name for export "from" in "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js" (known exports: mergeMap MergeMapOperator MergeMapSubscriber, known reexports: ) */ undefined(project(a, i)).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (b, ii) {
                    return resultSelector(a, b, i, ii);
                }));
            }));
        };
    }
    return function (source) {
        return source.lift(new ExhauseMapOperator(project));
    };
}
var ExhauseMapOperator = /*@__PURE__*/function () {
    function ExhauseMapOperator(project) {
        this.project = project;
    }
    ExhauseMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new exhaustMap_ExhaustMapSubscriber(subscriber, this.project));
    };
    return ExhauseMapOperator;
}();
var exhaustMap_ExhaustMapSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ExhaustMapSubscriber, _super);
    function ExhaustMapSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.hasSubscription = false;
        _this.hasCompleted = false;
        _this.index = 0;
        return _this;
    }
    ExhaustMapSubscriber.prototype._next = function (value) {
        if (!this.hasSubscription) {
            this.tryNext(value);
        }
    };
    ExhaustMapSubscriber.prototype.tryNext = function (value) {
        var index = this.index++;
        var destination = this.destination;
        try {
            var result = this.project(value, index);
            this.hasSubscription = true;
            this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, result, value, index));
        } catch (err) {
            destination.error(err);
        }
    };
    ExhaustMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    };
    ExhaustMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    ExhaustMapSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    ExhaustMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    };
    return ExhaustMapSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=exhaustMap.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/expand.js
/** PURE_IMPORTS_START tslib,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function expand(project, concurrent, scheduler) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    if (scheduler === void 0) {
        scheduler = undefined;
    }
    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
    return function (source) {
        return source.lift(new ExpandOperator(project, concurrent, scheduler));
    };
}
var ExpandOperator = /*@__PURE__*/function () {
    function ExpandOperator(project, concurrent, scheduler) {
        this.project = project;
        this.concurrent = concurrent;
        this.scheduler = scheduler;
    }
    ExpandOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new expand_ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
    };
    return ExpandOperator;
}();

var expand_ExpandSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ExpandSubscriber, _super);
    function ExpandSubscriber(destination, project, concurrent, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.scheduler = scheduler;
        _this.index = 0;
        _this.active = 0;
        _this.hasCompleted = false;
        if (concurrent < Number.POSITIVE_INFINITY) {
            _this.buffer = [];
        }
        return _this;
    }
    ExpandSubscriber.dispatch = function (arg) {
        var subscriber = arg.subscriber,
            result = arg.result,
            value = arg.value,
            index = arg.index;
        subscriber.subscribeToProjection(result, value, index);
    };
    ExpandSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (destination.closed) {
            this._complete();
            return;
        }
        var index = this.index++;
        if (this.active < this.concurrent) {
            destination.next(value);
            var result = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(this.project)(value, index);
            if (result === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                destination.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
            } else if (!this.scheduler) {
                this.subscribeToProjection(result, value, index);
            } else {
                var state = { subscriber: this, result: result, value: value, index: index };
                this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
            }
        } else {
            this.buffer.push(value);
        }
    };
    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
        this.active++;
        this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, result, value, index));
    };
    ExpandSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this._next(innerValue);
    };
    ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
        }
        if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
        }
    };
    return ExpandSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=expand.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/finalize.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription PURE_IMPORTS_END */



function finalize(callback) {
    return function (source) {
        return source.lift(new FinallyOperator(callback));
    };
}
var FinallyOperator = /*@__PURE__*/function () {
    function FinallyOperator(callback) {
        this.callback = callback;
    }
    FinallyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new finalize_FinallySubscriber(subscriber, this.callback));
    };
    return FinallyOperator;
}();
var finalize_FinallySubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(FinallySubscriber, _super);
    function FinallySubscriber(destination, callback) {
        var _this = _super.call(this, destination) || this;
        _this.add(new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined(callback));
        return _this;
    }
    return FinallySubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=finalize.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/find.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function find(predicate, thisArg) {
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate is not a function');
    }
    return function (source) {
        return source.lift(new FindValueOperator(predicate, source, false, thisArg));
    };
}
var FindValueOperator = /*@__PURE__*/function () {
    function FindValueOperator(predicate, source, yieldIndex, thisArg) {
        this.predicate = predicate;
        this.source = source;
        this.yieldIndex = yieldIndex;
        this.thisArg = thisArg;
    }
    FindValueOperator.prototype.call = function (observer, source) {
        return source.subscribe(new find_FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
    };
    return FindValueOperator;
}();

var find_FindValueSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(FindValueSubscriber, _super);
    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.yieldIndex = yieldIndex;
        _this.thisArg = thisArg;
        _this.index = 0;
        return _this;
    }
    FindValueSubscriber.prototype.notifyComplete = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
    };
    FindValueSubscriber.prototype._next = function (value) {
        var _a = this,
            predicate = _a.predicate,
            thisArg = _a.thisArg;
        var index = this.index++;
        try {
            var result = predicate.call(thisArg || this, value, index, this.source);
            if (result) {
                this.notifyComplete(this.yieldIndex ? index : value);
            }
        } catch (err) {
            this.destination.error(err);
        }
    };
    FindValueSubscriber.prototype._complete = function () {
        this.notifyComplete(this.yieldIndex ? -1 : undefined);
    };
    return FindValueSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=find.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/findIndex.js
/** PURE_IMPORTS_START _operators_find PURE_IMPORTS_END */

function findIndex(predicate, thisArg) {
    return function (source) {
        return source.lift(new /* Cannot get final name for export "FindValueOperator" in "./node_modules/rxjs/_esm5/internal/operators/findIndex.js" (known exports: findIndex, known reexports: ) */ undefined(predicate, source, true, thisArg));
    };
}
//# sourceMappingURL=findIndex.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/first.js
/** PURE_IMPORTS_START _util_EmptyError,_filter,_take,_defaultIfEmpty,_throwIfEmpty,_util_identity PURE_IMPORTS_END */






function first_first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? /* Cannot get final name for export "filter" in "./node_modules/rxjs/_esm5/internal/operators/tap.js" (known exports: tap, known reexports: ) */ undefined(function (v, i) {
            return predicate(v, i, source);
        }) : /* Cannot get final name for export "identity" in "./node_modules/rxjs/_esm5/internal/util/isObservable.js" (known exports: isObservable, known reexports: ) */ undefined, /* Cannot get final name for export "take" in "./node_modules/rxjs/_esm5/internal/operators/elementAt.js" (known exports: elementAt, known reexports: ) */ undefined(1), hasDefaultValue ? /* Cannot get final name for export "defaultIfEmpty" in "./node_modules/rxjs/_esm5/internal/util/isDate.js" (known exports: isDate, known reexports: ) */ undefined(defaultValue) : /* Cannot get final name for export "throwIfEmpty" in "./node_modules/rxjs/_esm5/internal/operators/take.js" (known exports: take, known reexports: ) */ undefined(function () {
            return new /* Cannot get final name for export "EmptyError" in "./node_modules/rxjs/_esm5/internal/util/TimeoutError.js" (known exports: TimeoutError, known reexports: ) */ undefined();
        }));
    };
}
//# sourceMappingURL=first.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/ignoreElements.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function ignoreElements() {
    return function ignoreElementsOperatorFunction(source) {
        return source.lift(new IgnoreElementsOperator());
    };
}
var IgnoreElementsOperator = /*@__PURE__*/function () {
    function IgnoreElementsOperator() {}
    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ignoreElements_IgnoreElementsSubscriber(subscriber));
    };
    return IgnoreElementsOperator;
}();
var ignoreElements_IgnoreElementsSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IgnoreElementsSubscriber.prototype._next = function (unused) {};
    return IgnoreElementsSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=ignoreElements.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/isEmpty.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function isEmpty() {
    return function (source) {
        return source.lift(new IsEmptyOperator());
    };
}
var IsEmptyOperator = /*@__PURE__*/function () {
    function IsEmptyOperator() {}
    IsEmptyOperator.prototype.call = function (observer, source) {
        return source.subscribe(new isEmpty_IsEmptySubscriber(observer));
    };
    return IsEmptyOperator;
}();
var isEmpty_IsEmptySubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(IsEmptySubscriber, _super);
    function IsEmptySubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
        var destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
    };
    IsEmptySubscriber.prototype._next = function (value) {
        this.notifyComplete(false);
    };
    IsEmptySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return IsEmptySubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=isEmpty.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/takeLast.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */




function takeLast(count) {
    return function takeLastOperatorFunction(source) {
        if (count === 0) {
            return /* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined();
        } else {
            return source.lift(new takeLast_TakeLastOperator(count));
        }
    };
}
var takeLast_TakeLastOperator = /*@__PURE__*/function () {
    function TakeLastOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new /* Cannot get final name for export "ArgumentOutOfRangeError" in "./node_modules/rxjs/_esm5/internal/util/EmptyError.js" (known exports: EmptyError, known reexports: ) */ undefined();
        }
    }
    TakeLastOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new takeLast_TakeLastSubscriber(subscriber, this.total));
    };
    return TakeLastOperator;
}();
var takeLast_TakeLastSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.ring = new Array();
        _this.count = 0;
        return _this;
    }
    TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        } else {
            var index = count % total;
            ring[index] = value;
        }
    };
    TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
                var idx = count++ % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    };
    return TakeLastSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=takeLast.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/last.js
/** PURE_IMPORTS_START _util_EmptyError,_filter,_takeLast,_throwIfEmpty,_defaultIfEmpty,_util_identity PURE_IMPORTS_END */






function last_last(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? /* Cannot get final name for export "filter" in "./node_modules/rxjs/_esm5/internal/operators/tap.js" (known exports: tap, known reexports: ) */ undefined(function (v, i) {
            return predicate(v, i, source);
        }) : /* Cannot get final name for export "identity" in "./node_modules/rxjs/_esm5/internal/util/isObservable.js" (known exports: isObservable, known reexports: ) */ undefined, /* Cannot get final name for export "takeLast" in "./node_modules/rxjs/_esm5/internal/operators/last.js" (known exports: last, known reexports: ) */ undefined(1), hasDefaultValue ? /* Cannot get final name for export "defaultIfEmpty" in "./node_modules/rxjs/_esm5/internal/util/isDate.js" (known exports: isDate, known reexports: ) */ undefined(defaultValue) : /* Cannot get final name for export "throwIfEmpty" in "./node_modules/rxjs/_esm5/internal/operators/take.js" (known exports: take, known reexports: ) */ undefined(function () {
            return new /* Cannot get final name for export "EmptyError" in "./node_modules/rxjs/_esm5/internal/util/TimeoutError.js" (known exports: TimeoutError, known reexports: ) */ undefined();
        }));
    };
}
//# sourceMappingURL=last.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/mapTo.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function mapTo(value) {
    return function (source) {
        return source.lift(new MapToOperator(value));
    };
}
var MapToOperator = /*@__PURE__*/function () {
    function MapToOperator(value) {
        this.value = value;
    }
    MapToOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new mapTo_MapToSubscriber(subscriber, this.value));
    };
    return MapToOperator;
}();
var mapTo_MapToSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(MapToSubscriber, _super);
    function MapToSubscriber(destination, value) {
        var _this = _super.call(this, destination) || this;
        _this.value = value;
        return _this;
    }
    MapToSubscriber.prototype._next = function (x) {
        this.destination.next(this.value);
    };
    return MapToSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=mapTo.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/materialize.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */



function materialize() {
    return function materializeOperatorFunction(source) {
        return source.lift(new MaterializeOperator());
    };
}
var MaterializeOperator = /*@__PURE__*/function () {
    function MaterializeOperator() {}
    MaterializeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new materialize_MaterializeSubscriber(subscriber));
    };
    return MaterializeOperator;
}();
var materialize_MaterializeSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(MaterializeSubscriber, _super);
    function MaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    MaterializeSubscriber.prototype._next = function (value) {
        this.destination.next(/* Cannot get final name for export "Notification" in "./node_modules/rxjs/_esm5/internal/operators/observeOn.js" (known exports: observeOn ObserveOnOperator ObserveOnSubscriber ObserveOnMessage, known reexports: ) */ undefined.createNext(value));
    };
    MaterializeSubscriber.prototype._error = function (err) {
        var destination = this.destination;
        destination.next(/* Cannot get final name for export "Notification" in "./node_modules/rxjs/_esm5/internal/operators/observeOn.js" (known exports: observeOn ObserveOnOperator ObserveOnSubscriber ObserveOnMessage, known reexports: ) */ undefined.createError(err));
        destination.complete();
    };
    MaterializeSubscriber.prototype._complete = function () {
        var destination = this.destination;
        destination.next(/* Cannot get final name for export "Notification" in "./node_modules/rxjs/_esm5/internal/operators/observeOn.js" (known exports: observeOn ObserveOnOperator ObserveOnSubscriber ObserveOnMessage, known reexports: ) */ undefined.createComplete());
        destination.complete();
    };
    return MaterializeSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=materialize.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/scan.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function scan(accumulator, seed) {
    var hasSeed = false;
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return function scanOperatorFunction(source) {
        return source.lift(new ScanOperator(accumulator, seed, hasSeed));
    };
}
var ScanOperator = /*@__PURE__*/function () {
    function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) {
            hasSeed = false;
        }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new scan_ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
}();
var scan_ScanSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this._seed = _seed;
        _this.hasSeed = hasSeed;
        _this.index = 0;
        return _this;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function get() {
            return this._seed;
        },
        set: function set(value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        } else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        } catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=scan.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/reduce.js
/** PURE_IMPORTS_START _scan,_takeLast,_defaultIfEmpty,_util_pipe PURE_IMPORTS_END */




function reduce(accumulator, seed) {
    if (arguments.length >= 2) {
        return function reduceOperatorFunctionWithSeed(source) {
            return /* Cannot get final name for export "pipe" in "./node_modules/rxjs/_esm5/internal/Observable.js" (known exports: Observable, known reexports: ) */ undefined(/* Cannot get final name for export "scan" in "./node_modules/rxjs/_esm5/internal/operators/reduce.js" (known exports: reduce, known reexports: ) */ undefined(accumulator, seed), /* Cannot get final name for export "takeLast" in "./node_modules/rxjs/_esm5/internal/operators/last.js" (known exports: last, known reexports: ) */ undefined(1), /* Cannot get final name for export "defaultIfEmpty" in "./node_modules/rxjs/_esm5/internal/util/isDate.js" (known exports: isDate, known reexports: ) */ undefined(seed))(source);
        };
    }
    return function reduceOperatorFunction(source) {
        return /* Cannot get final name for export "pipe" in "./node_modules/rxjs/_esm5/internal/Observable.js" (known exports: Observable, known reexports: ) */ undefined(/* Cannot get final name for export "scan" in "./node_modules/rxjs/_esm5/internal/operators/reduce.js" (known exports: reduce, known reexports: ) */ undefined(function (acc, value, index) {
            return accumulator(acc, value, index + 1);
        }), /* Cannot get final name for export "takeLast" in "./node_modules/rxjs/_esm5/internal/operators/last.js" (known exports: last, known reexports: ) */ undefined(1))(source);
    };
}
//# sourceMappingURL=reduce.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/max.js
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

function max_max(comparer) {
    var max = typeof comparer === 'function' ? function (x, y) {
        return comparer(x, y) > 0 ? x : y;
    } : function (x, y) {
        return x > y ? x : y;
    };
    return /* Cannot get final name for export "reduce" in "./node_modules/rxjs/_esm5/internal/operators/max.js" (known exports: max, known reexports: ) */ undefined(max);
}
//# sourceMappingURL=max.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/merge.js
/** PURE_IMPORTS_START _observable_merge PURE_IMPORTS_END */

function merge_merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return function (source) {
        return source.lift.call(/* Cannot get final name for export "merge" in "./node_modules/rxjs/_esm5/internal/observable/never.js" (known exports: NEVER never, known reexports: ) */ undefined.apply(void 0, [source].concat(observables)));
    };
}
//# sourceMappingURL=merge.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeMapTo.js
/** PURE_IMPORTS_START _mergeMap PURE_IMPORTS_END */

function mergeMapTo(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'function') {
        return /* Cannot get final name for export "mergeMap" in "./node_modules/rxjs/_esm5/internal/operators/mergeAll.js" (known exports: mergeAll, known reexports: ) */ undefined(function () {
            return innerObservable;
        }, resultSelector, concurrent);
    }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return /* Cannot get final name for export "mergeMap" in "./node_modules/rxjs/_esm5/internal/operators/mergeAll.js" (known exports: mergeAll, known reexports: ) */ undefined(function () {
        return innerObservable;
    }, concurrent);
}
//# sourceMappingURL=mergeMapTo.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/mergeScan.js
/** PURE_IMPORTS_START tslib,_util_tryCatch,_util_errorObject,_util_subscribeToResult,_OuterSubscriber PURE_IMPORTS_END */





function mergeScan(accumulator, seed, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return function (source) {
        return source.lift(new MergeScanOperator(accumulator, seed, concurrent));
    };
}
var MergeScanOperator = /*@__PURE__*/function () {
    function MergeScanOperator(accumulator, seed, concurrent) {
        this.accumulator = accumulator;
        this.seed = seed;
        this.concurrent = concurrent;
    }
    MergeScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new mergeScan_MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
    };
    return MergeScanOperator;
}();

var mergeScan_MergeScanSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(MergeScanSubscriber, _super);
    function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this.acc = acc;
        _this.concurrent = concurrent;
        _this.hasValue = false;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeScanSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            var index = this.index++;
            var ish = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(this.accumulator)(this.acc, value);
            var destination = this.destination;
            if (ish === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                destination.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
            } else {
                this.active++;
                this._innerSub(ish, value, index);
            }
        } else {
            this.buffer.push(value);
        }
    };
    MergeScanSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, ish, value, index));
    };
    MergeScanSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    };
    MergeScanSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var destination = this.destination;
        this.acc = innerValue;
        this.hasValue = true;
        destination.next(innerValue);
    };
    MergeScanSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        } else if (this.active === 0 && this.hasCompleted) {
            if (this.hasValue === false) {
                this.destination.next(this.acc);
            }
            this.destination.complete();
        }
    };
    return MergeScanSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);

//# sourceMappingURL=mergeScan.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/min.js
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

function min_min(comparer) {
    var min = typeof comparer === 'function' ? function (x, y) {
        return comparer(x, y) < 0 ? x : y;
    } : function (x, y) {
        return x < y ? x : y;
    };
    return /* Cannot get final name for export "reduce" in "./node_modules/rxjs/_esm5/internal/operators/max.js" (known exports: max, known reexports: ) */ undefined(min);
}
//# sourceMappingURL=min.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/multicast.js
/** PURE_IMPORTS_START _observable_ConnectableObservable PURE_IMPORTS_END */

function multicast(subjectOrSubjectFactory, selector) {
    return function multicastOperatorFunction(source) {
        var subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        } else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        if (typeof selector === 'function') {
            return source.lift(new MulticastOperator(subjectFactory, selector));
        }
        var connectable = Object.create(source, /* Cannot get final name for export "connectableObservableDescriptor" in "./node_modules/rxjs/_esm5/internal/operators/groupBy.js" (known exports: groupBy GroupedObservable, known reexports: ) */ undefined);
        connectable.source = source;
        connectable.subjectFactory = subjectFactory;
        return connectable;
    };
}
var MulticastOperator = /*@__PURE__*/function () {
    function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    };
    return MulticastOperator;
}();

//# sourceMappingURL=multicast.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js
/** PURE_IMPORTS_START tslib,_observable_from,_util_isArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function onErrorResumeNext_onErrorResumeNext() {
    var nextSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nextSources[_i] = arguments[_i];
    }
    if (nextSources.length === 1 && /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(nextSources[0])) {
        nextSources = nextSources[0];
    }
    return function (source) {
        return source.lift(new OnErrorResumeNextOperator(nextSources));
    };
}
function onErrorResumeNextStatic() {
    var nextSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nextSources[_i] = arguments[_i];
    }
    var source = null;
    if (nextSources.length === 1 && /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(nextSources[0])) {
        nextSources = nextSources[0];
    }
    source = nextSources.shift();
    return /* Cannot get final name for export "from" in "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js" (known exports: mergeMap MergeMapOperator MergeMapSubscriber, known reexports: ) */ undefined(source, null).lift(new OnErrorResumeNextOperator(nextSources));
}
var OnErrorResumeNextOperator = /*@__PURE__*/function () {
    function OnErrorResumeNextOperator(nextSources) {
        this.nextSources = nextSources;
    }
    OnErrorResumeNextOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new onErrorResumeNext_OnErrorResumeNextSubscriber(subscriber, this.nextSources));
    };
    return OnErrorResumeNextOperator;
}();
var onErrorResumeNext_OnErrorResumeNextSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(OnErrorResumeNextSubscriber, _super);
    function OnErrorResumeNextSubscriber(destination, nextSources) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.nextSources = nextSources;
        return _this;
    }
    OnErrorResumeNextSubscriber.prototype.notifyError = function (error, innerSub) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype.notifyComplete = function (innerSub) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype._error = function (err) {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype._complete = function () {
        this.subscribeToNextSource();
    };
    OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
        var next = this.nextSources.shift();
        if (next) {
            this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, next));
        } else {
            this.destination.complete();
        }
    };
    return OnErrorResumeNextSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=onErrorResumeNext.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/pairwise.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function pairwise() {
    return function (source) {
        return source.lift(new PairwiseOperator());
    };
}
var PairwiseOperator = /*@__PURE__*/function () {
    function PairwiseOperator() {}
    PairwiseOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new pairwise_PairwiseSubscriber(subscriber));
    };
    return PairwiseOperator;
}();
var pairwise_PairwiseSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(PairwiseSubscriber, _super);
    function PairwiseSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasPrev = false;
        return _this;
    }
    PairwiseSubscriber.prototype._next = function (value) {
        if (this.hasPrev) {
            this.destination.next([this.prev, value]);
        } else {
            this.hasPrev = true;
        }
        this.prev = value;
    };
    return PairwiseSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=pairwise.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/util/not.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function not(pred, thisArg) {
    function notPred() {
        return !notPred.pred.apply(notPred.thisArg, arguments);
    }
    notPred.pred = pred;
    notPred.thisArg = thisArg;
    return notPred;
}
//# sourceMappingURL=not.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/partition.js
/** PURE_IMPORTS_START _util_not,_filter PURE_IMPORTS_END */


function partition(predicate, thisArg) {
    return function (source) {
        return [/* Cannot get final name for export "filter" in "./node_modules/rxjs/_esm5/internal/operators/tap.js" (known exports: tap, known reexports: ) */ undefined(predicate, thisArg)(source), /* Cannot get final name for export "filter" in "./node_modules/rxjs/_esm5/internal/operators/tap.js" (known exports: tap, known reexports: ) */ undefined(/* Cannot get final name for export "not" in "./node_modules/rxjs/_esm5/internal/operators/partition.js" (known exports: partition, known reexports: ) */ undefined(predicate, thisArg))(source)];
    };
}
//# sourceMappingURL=partition.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/pluck.js
/** PURE_IMPORTS_START _map PURE_IMPORTS_END */

function pluck() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
        throw new Error('list of properties cannot be empty.');
    }
    return function (source) {
        return /* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(plucker(properties, length))(source);
    };
}
function plucker(props, length) {
    var mapper = function mapper(x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
            var p = currentProp[props[i]];
            if (typeof p !== 'undefined') {
                currentProp = p;
            } else {
                return undefined;
            }
        }
        return currentProp;
    };
    return mapper;
}
//# sourceMappingURL=pluck.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/publish.js
/** PURE_IMPORTS_START _Subject,_multicast PURE_IMPORTS_END */


function publish(selector) {
    return selector ? /* Cannot get final name for export "multicast" in "./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js" (known exports: onErrorResumeNext onErrorResumeNextStatic, known reexports: ) */ undefined(function () {
        return new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined();
    }, selector) : /* Cannot get final name for export "multicast" in "./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js" (known exports: onErrorResumeNext onErrorResumeNextStatic, known reexports: ) */ undefined(new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined());
}
//# sourceMappingURL=publish.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/publishBehavior.js
/** PURE_IMPORTS_START _BehaviorSubject,_multicast PURE_IMPORTS_END */


function publishBehavior(value) {
    return function (source) {
        return /* Cannot get final name for export "multicast" in "./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js" (known exports: onErrorResumeNext onErrorResumeNextStatic, known reexports: ) */ undefined(new /* Cannot get final name for export "BehaviorSubject" in "./node_modules/rxjs/_esm5/internal/scheduler/Action.js" (known exports: Action, known reexports: ) */ undefined(value))(source);
    };
}
//# sourceMappingURL=publishBehavior.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/publishLast.js
/** PURE_IMPORTS_START _AsyncSubject,_multicast PURE_IMPORTS_END */


function publishLast() {
    return function (source) {
        return /* Cannot get final name for export "multicast" in "./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js" (known exports: onErrorResumeNext onErrorResumeNextStatic, known reexports: ) */ undefined(new /* Cannot get final name for export "AsyncSubject" in "./node_modules/rxjs/_esm5/internal/util/Immediate.js" (known exports: Immediate, known reexports: ) */ undefined())(source);
    };
}
//# sourceMappingURL=publishLast.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/publishReplay.js
/** PURE_IMPORTS_START _ReplaySubject,_multicast PURE_IMPORTS_END */


function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
    if (selectorOrScheduler && typeof selectorOrScheduler !== 'function') {
        scheduler = selectorOrScheduler;
    }
    var selector = typeof selectorOrScheduler === 'function' ? selectorOrScheduler : undefined;
    var subject = new /* Cannot get final name for export "ReplaySubject" in "./node_modules/rxjs/_esm5/internal/AsyncSubject.js" (known exports: AsyncSubject, known reexports: ) */ undefined(bufferSize, windowTime, scheduler);
    return function (source) {
        return /* Cannot get final name for export "multicast" in "./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js" (known exports: onErrorResumeNext onErrorResumeNextStatic, known reexports: ) */ undefined(function () {
            return subject;
        }, selector)(source);
    };
}
//# sourceMappingURL=publishReplay.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/race.js
/** PURE_IMPORTS_START _util_isArray,_observable_race PURE_IMPORTS_END */


function race_race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return function raceOperatorFunction(source) {
        if (observables.length === 1 && /* Cannot get final name for export "isArray" in "./node_modules/rxjs/_esm5/internal/util/isObject.js" (known exports: isObject, known reexports: ) */ undefined(observables[0])) {
            observables = observables[0];
        }
        return source.lift.call(/* Cannot get final name for export "race" in "./node_modules/rxjs/_esm5/internal/observable/range.js" (known exports: range dispatch, known reexports: ) */ undefined.apply(void 0, [source].concat(observables)));
    };
}
//# sourceMappingURL=race.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/repeat.js
/** PURE_IMPORTS_START tslib,_Subscriber,_observable_empty PURE_IMPORTS_END */



function repeat(count) {
    if (count === void 0) {
        count = -1;
    }
    return function (source) {
        if (count === 0) {
            return /* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined();
        } else if (count < 0) {
            return source.lift(new RepeatOperator(-1, source));
        } else {
            return source.lift(new RepeatOperator(count - 1, source));
        }
    };
}
var RepeatOperator = /*@__PURE__*/function () {
    function RepeatOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RepeatOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new repeat_RepeatSubscriber(subscriber, this.count, this.source));
    };
    return RepeatOperator;
}();
var repeat_RepeatSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(RepeatSubscriber, _super);
    function RepeatSubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;
        _this.count = count;
        _this.source = source;
        return _this;
    }
    RepeatSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _a = this,
                source = _a.source,
                count = _a.count;
            if (count === 0) {
                return _super.prototype.complete.call(this);
            } else if (count > -1) {
                this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
        }
    };
    return RepeatSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=repeat.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/repeatWhen.js
/** PURE_IMPORTS_START tslib,_Subject,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */






function repeatWhen(notifier) {
    return function (source) {
        return source.lift(new RepeatWhenOperator(notifier));
    };
}
var RepeatWhenOperator = /*@__PURE__*/function () {
    function RepeatWhenOperator(notifier) {
        this.notifier = notifier;
    }
    RepeatWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new repeatWhen_RepeatWhenSubscriber(subscriber, this.notifier, source));
    };
    return RepeatWhenOperator;
}();
var repeatWhen_RepeatWhenSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(RepeatWhenSubscriber, _super);
    function RepeatWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;
        _this.notifier = notifier;
        _this.source = source;
        _this.sourceIsBeingSubscribedTo = true;
        return _this;
    }
    RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.sourceIsBeingSubscribedTo = true;
        this.source.subscribe(this);
    };
    RepeatWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        if (this.sourceIsBeingSubscribedTo === false) {
            return _super.prototype.complete.call(this);
        }
    };
    RepeatWhenSubscriber.prototype.complete = function () {
        this.sourceIsBeingSubscribedTo = false;
        if (!this.isStopped) {
            if (!this.retries) {
                this.subscribeToRetries();
            }
            if (!this.retriesSubscription || this.retriesSubscription.closed) {
                return _super.prototype.complete.call(this);
            }
            this._unsubscribeAndRecycle();
            this.notifications.next();
        }
    };
    RepeatWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this,
            notifications = _a.notifications,
            retriesSubscription = _a.retriesSubscription;
        if (notifications) {
            notifications.unsubscribe();
            this.notifications = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
        var _unsubscribe = this._unsubscribe;
        this._unsubscribe = null;
        _super.prototype._unsubscribeAndRecycle.call(this);
        this._unsubscribe = _unsubscribe;
        return this;
    };
    RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
        this.notifications = new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined();
        var retries = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(this.notifier)(this.notifications);
        if (retries === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
            return _super.prototype.complete.call(this);
        }
        this.retries = retries;
        this.retriesSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, retries);
    };
    return RepeatWhenSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=repeatWhen.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/retry.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function retry(count) {
    if (count === void 0) {
        count = -1;
    }
    return function (source) {
        return source.lift(new RetryOperator(count, source));
    };
}
var RetryOperator = /*@__PURE__*/function () {
    function RetryOperator(count, source) {
        this.count = count;
        this.source = source;
    }
    RetryOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new retry_RetrySubscriber(subscriber, this.count, this.source));
    };
    return RetryOperator;
}();
var retry_RetrySubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(RetrySubscriber, _super);
    function RetrySubscriber(destination, count, source) {
        var _this = _super.call(this, destination) || this;
        _this.count = count;
        _this.source = source;
        return _this;
    }
    RetrySubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _a = this,
                source = _a.source,
                count = _a.count;
            if (count === 0) {
                return _super.prototype.error.call(this, err);
            } else if (count > -1) {
                this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
        }
    };
    return RetrySubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=retry.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/retryWhen.js
/** PURE_IMPORTS_START tslib,_Subject,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */






function retryWhen(notifier) {
    return function (source) {
        return source.lift(new RetryWhenOperator(notifier, source));
    };
}
var RetryWhenOperator = /*@__PURE__*/function () {
    function RetryWhenOperator(notifier, source) {
        this.notifier = notifier;
        this.source = source;
    }
    RetryWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new retryWhen_RetryWhenSubscriber(subscriber, this.notifier, this.source));
    };
    return RetryWhenOperator;
}();
var retryWhen_RetryWhenSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(RetryWhenSubscriber, _super);
    function RetryWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;
        _this.notifier = notifier;
        _this.source = source;
        return _this;
    }
    RetryWhenSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var errors = this.errors;
            var retries = this.retries;
            var retriesSubscription = this.retriesSubscription;
            if (!retries) {
                errors = new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined();
                retries = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(this.notifier)(errors);
                if (retries === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                    return _super.prototype.error.call(this, /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
                }
                retriesSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, retries);
            } else {
                this.errors = null;
                this.retriesSubscription = null;
            }
            this._unsubscribeAndRecycle();
            this.errors = errors;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            errors.next(err);
        }
    };
    RetryWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this,
            errors = _a.errors,
            retriesSubscription = _a.retriesSubscription;
        if (errors) {
            errors.unsubscribe();
            this.errors = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var _unsubscribe = this._unsubscribe;
        this._unsubscribe = null;
        this._unsubscribeAndRecycle();
        this._unsubscribe = _unsubscribe;
        this.source.subscribe(this);
    };
    return RetryWhenSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=retryWhen.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/sample.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function sample(notifier) {
    return function (source) {
        return source.lift(new sample_SampleOperator(notifier));
    };
}
var sample_SampleOperator = /*@__PURE__*/function () {
    function SampleOperator(notifier) {
        this.notifier = notifier;
    }
    SampleOperator.prototype.call = function (subscriber, source) {
        var sampleSubscriber = new sample_SampleSubscriber(subscriber);
        var subscription = source.subscribe(sampleSubscriber);
        subscription.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(sampleSubscriber, this.notifier));
        return subscription;
    };
    return SampleOperator;
}();
var sample_SampleSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SampleSubscriber, _super);
    function SampleSubscriber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasValue = false;
        return _this;
    }
    SampleSubscriber.prototype._next = function (value) {
        this.value = value;
        this.hasValue = true;
    };
    SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.emitValue();
    };
    SampleSubscriber.prototype.notifyComplete = function () {
        this.emitValue();
    };
    SampleSubscriber.prototype.emitValue = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.value);
        }
    };
    return SampleSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=sample.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/sampleTime.js
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async PURE_IMPORTS_END */



function sampleTime(period, scheduler) {
    if (scheduler === void 0) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    return function (source) {
        return source.lift(new SampleTimeOperator(period, scheduler));
    };
}
var SampleTimeOperator = /*@__PURE__*/function () {
    function SampleTimeOperator(period, scheduler) {
        this.period = period;
        this.scheduler = scheduler;
    }
    SampleTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new sampleTime_SampleTimeSubscriber(subscriber, this.period, this.scheduler));
    };
    return SampleTimeOperator;
}();
var sampleTime_SampleTimeSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SampleTimeSubscriber, _super);
    function SampleTimeSubscriber(destination, period, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.period = period;
        _this.scheduler = scheduler;
        _this.hasValue = false;
        _this.add(scheduler.schedule(dispatchNotification, period, { subscriber: _this, period: period }));
        return _this;
    }
    SampleTimeSubscriber.prototype._next = function (value) {
        this.lastValue = value;
        this.hasValue = true;
    };
    SampleTimeSubscriber.prototype.notifyNext = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.lastValue);
        }
    };
    return SampleTimeSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
function dispatchNotification(state) {
    var subscriber = state.subscriber,
        period = state.period;
    subscriber.notifyNext();
    this.schedule(state, period);
}
//# sourceMappingURL=sampleTime.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/sequenceEqual.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_tryCatch,_util_errorObject PURE_IMPORTS_END */




function sequenceEqual(compareTo, comparor) {
    return function (source) {
        return source.lift(new SequenceEqualOperator(compareTo, comparor));
    };
}
var SequenceEqualOperator = /*@__PURE__*/function () {
    function SequenceEqualOperator(compareTo, comparor) {
        this.compareTo = compareTo;
        this.comparor = comparor;
    }
    SequenceEqualOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new sequenceEqual_SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
    };
    return SequenceEqualOperator;
}();

var sequenceEqual_SequenceEqualSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SequenceEqualSubscriber, _super);
    function SequenceEqualSubscriber(destination, compareTo, comparor) {
        var _this = _super.call(this, destination) || this;
        _this.compareTo = compareTo;
        _this.comparor = comparor;
        _this._a = [];
        _this._b = [];
        _this._oneComplete = false;
        _this.add(compareTo.subscribe(new sequenceEqual_SequenceEqualCompareToSubscriber(destination, _this)));
        return _this;
    }
    SequenceEqualSubscriber.prototype._next = function (value) {
        if (this._oneComplete && this._b.length === 0) {
            this.emit(false);
        } else {
            this._a.push(value);
            this.checkValues();
        }
    };
    SequenceEqualSubscriber.prototype._complete = function () {
        if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
        } else {
            this._oneComplete = true;
        }
    };
    SequenceEqualSubscriber.prototype.checkValues = function () {
        var _c = this,
            _a = _c._a,
            _b = _c._b,
            comparor = _c.comparor;
        while (_a.length > 0 && _b.length > 0) {
            var a = _a.shift();
            var b = _b.shift();
            var areEqual = false;
            if (comparor) {
                areEqual = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(comparor)(a, b);
                if (areEqual === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                    this.destination.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
                }
            } else {
                areEqual = a === b;
            }
            if (!areEqual) {
                this.emit(false);
            }
        }
    };
    SequenceEqualSubscriber.prototype.emit = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
    };
    SequenceEqualSubscriber.prototype.nextB = function (value) {
        if (this._oneComplete && this._a.length === 0) {
            this.emit(false);
        } else {
            this._b.push(value);
            this.checkValues();
        }
    };
    return SequenceEqualSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);

var sequenceEqual_SequenceEqualCompareToSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SequenceEqualCompareToSubscriber, _super);
    function SequenceEqualCompareToSubscriber(destination, parent) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        return _this;
    }
    SequenceEqualCompareToSubscriber.prototype._next = function (value) {
        this.parent.nextB(value);
    };
    SequenceEqualCompareToSubscriber.prototype._error = function (err) {
        this.parent.error(err);
    };
    SequenceEqualCompareToSubscriber.prototype._complete = function () {
        this.parent._complete();
    };
    return SequenceEqualCompareToSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=sequenceEqual.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/share.js
/** PURE_IMPORTS_START _multicast,_refCount,_Subject PURE_IMPORTS_END */



function shareSubjectFactory() {
    return new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined();
}
function share() {
    return function (source) {
        return /* Cannot get final name for export "refCount" in "./node_modules/rxjs/_esm5/internal/observable/ConnectableObservable.js" (known exports: ConnectableObservable connectableObservableDescriptor, known reexports: ) */ undefined()(/* Cannot get final name for export "multicast" in "./node_modules/rxjs/_esm5/internal/operators/onErrorResumeNext.js" (known exports: onErrorResumeNext onErrorResumeNextStatic, known reexports: ) */ undefined(shareSubjectFactory)(source));
    };
}
//# sourceMappingURL=share.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/shareReplay.js
/** PURE_IMPORTS_START _ReplaySubject PURE_IMPORTS_END */

function shareReplay(bufferSize, windowTime, scheduler) {
    return function (source) {
        return source.lift(shareReplayOperator(bufferSize, windowTime, scheduler));
    };
}
function shareReplayOperator(bufferSize, windowTime, scheduler) {
    var subject;
    var refCount = 0;
    var subscription;
    var hasError = false;
    var isComplete = false;
    return function shareReplayOperation(source) {
        refCount++;
        if (!subject || hasError) {
            hasError = false;
            subject = new /* Cannot get final name for export "ReplaySubject" in "./node_modules/rxjs/_esm5/internal/AsyncSubject.js" (known exports: AsyncSubject, known reexports: ) */ undefined(bufferSize, windowTime, scheduler);
            subscription = source.subscribe({
                next: function next(value) {
                    subject.next(value);
                },
                error: function error(err) {
                    hasError = true;
                    subject.error(err);
                },
                complete: function complete() {
                    isComplete = true;
                    subject.complete();
                }
            });
        }
        var innerSub = subject.subscribe(this);
        return function () {
            refCount--;
            innerSub.unsubscribe();
            if (subscription && refCount === 0 && isComplete) {
                subscription.unsubscribe();
            }
        };
    };
}
//# sourceMappingURL=shareReplay.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/single.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_EmptyError PURE_IMPORTS_END */



function single(predicate) {
    return function (source) {
        return source.lift(new SingleOperator(predicate, source));
    };
}
var SingleOperator = /*@__PURE__*/function () {
    function SingleOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    SingleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new single_SingleSubscriber(subscriber, this.predicate, this.source));
    };
    return SingleOperator;
}();
var single_SingleSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SingleSubscriber, _super);
    function SingleSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.seenValue = false;
        _this.index = 0;
        return _this;
    }
    SingleSubscriber.prototype.applySingleValue = function (value) {
        if (this.seenValue) {
            this.destination.error('Sequence contains more than one element');
        } else {
            this.seenValue = true;
            this.singleValue = value;
        }
    };
    SingleSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this.tryNext(value, index);
        } else {
            this.applySingleValue(value);
        }
    };
    SingleSubscriber.prototype.tryNext = function (value, index) {
        try {
            if (this.predicate(value, index, this.source)) {
                this.applySingleValue(value);
            }
        } catch (err) {
            this.destination.error(err);
        }
    };
    SingleSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : undefined);
            destination.complete();
        } else {
            destination.error(new /* Cannot get final name for export "EmptyError" in "./node_modules/rxjs/_esm5/internal/util/TimeoutError.js" (known exports: TimeoutError, known reexports: ) */ undefined());
        }
    };
    return SingleSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=single.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/skip.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function skip(count) {
    return function (source) {
        return source.lift(new SkipOperator(count));
    };
}
var SkipOperator = /*@__PURE__*/function () {
    function SkipOperator(total) {
        this.total = total;
    }
    SkipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new skip_SkipSubscriber(subscriber, this.total));
    };
    return SkipOperator;
}();
var skip_SkipSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.count = 0;
        return _this;
    }
    SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };
    return SkipSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=skip.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/skipLast.js
/** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError PURE_IMPORTS_END */



function skipLast(count) {
    return function (source) {
        return source.lift(new skipLast_SkipLastOperator(count));
    };
}
var skipLast_SkipLastOperator = /*@__PURE__*/function () {
    function SkipLastOperator(_skipCount) {
        this._skipCount = _skipCount;
        if (this._skipCount < 0) {
            throw new /* Cannot get final name for export "ArgumentOutOfRangeError" in "./node_modules/rxjs/_esm5/internal/util/EmptyError.js" (known exports: EmptyError, known reexports: ) */ undefined();
        }
    }
    SkipLastOperator.prototype.call = function (subscriber, source) {
        if (this._skipCount === 0) {
            return source.subscribe(new /* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined(subscriber));
        } else {
            return source.subscribe(new skipLast_SkipLastSubscriber(subscriber, this._skipCount));
        }
    };
    return SkipLastOperator;
}();
var skipLast_SkipLastSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SkipLastSubscriber, _super);
    function SkipLastSubscriber(destination, _skipCount) {
        var _this = _super.call(this, destination) || this;
        _this._skipCount = _skipCount;
        _this._count = 0;
        _this._ring = new Array(_skipCount);
        return _this;
    }
    SkipLastSubscriber.prototype._next = function (value) {
        var skipCount = this._skipCount;
        var count = this._count++;
        if (count < skipCount) {
            this._ring[count] = value;
        } else {
            var currentIndex = count % skipCount;
            var ring = this._ring;
            var oldValue = ring[currentIndex];
            ring[currentIndex] = value;
            this.destination.next(oldValue);
        }
    };
    return SkipLastSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=skipLast.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/skipUntil.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function skipUntil(notifier) {
    return function (source) {
        return source.lift(new SkipUntilOperator(notifier));
    };
}
var SkipUntilOperator = /*@__PURE__*/function () {
    function SkipUntilOperator(notifier) {
        this.notifier = notifier;
    }
    SkipUntilOperator.prototype.call = function (destination, source) {
        return source.subscribe(new skipUntil_SkipUntilSubscriber(destination, this.notifier));
    };
    return SkipUntilOperator;
}();
var skipUntil_SkipUntilSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SkipUntilSubscriber, _super);
    function SkipUntilSubscriber(destination, notifier) {
        var _this = _super.call(this, destination) || this;
        _this.hasValue = false;
        _this.add(_this.innerSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(_this, notifier));
        return _this;
    }
    SkipUntilSubscriber.prototype._next = function (value) {
        if (this.hasValue) {
            _super.prototype._next.call(this, value);
        }
    };
    SkipUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.hasValue = true;
        if (this.innerSubscription) {
            this.innerSubscription.unsubscribe();
        }
    };
    SkipUntilSubscriber.prototype.notifyComplete = function () {};
    return SkipUntilSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=skipUntil.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/skipWhile.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function skipWhile(predicate) {
    return function (source) {
        return source.lift(new SkipWhileOperator(predicate));
    };
}
var SkipWhileOperator = /*@__PURE__*/function () {
    function SkipWhileOperator(predicate) {
        this.predicate = predicate;
    }
    SkipWhileOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new skipWhile_SkipWhileSubscriber(subscriber, this.predicate));
    };
    return SkipWhileOperator;
}();
var skipWhile_SkipWhileSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SkipWhileSubscriber, _super);
    function SkipWhileSubscriber(destination, predicate) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.skipping = true;
        _this.index = 0;
        return _this;
    }
    SkipWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        if (this.skipping) {
            this.tryCallPredicate(value);
        }
        if (!this.skipping) {
            destination.next(value);
        }
    };
    SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
        try {
            var result = this.predicate(value, this.index++);
            this.skipping = Boolean(result);
        } catch (err) {
            this.destination.error(err);
        }
    };
    return SkipWhileSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=skipWhile.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/startWith.js
/** PURE_IMPORTS_START _observable_fromArray,_observable_scalar,_observable_empty,_observable_concat,_util_isScheduler PURE_IMPORTS_END */





function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i] = arguments[_i];
    }
    return function (source) {
        var scheduler = array[array.length - 1];
        if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(scheduler)) {
            array.pop();
        } else {
            scheduler = null;
        }
        var len = array.length;
        if (len === 1 && !scheduler) {
            return /* Cannot get final name for export "concat" in "./node_modules/rxjs/_esm5/internal/observable/defer.js" (known exports: defer, known reexports: ) */ undefined(/* Cannot get final name for export "scalar" in "./node_modules/rxjs/_esm5/internal/observable/of.js" (known exports: of, known reexports: ) */ undefined(array[0]), source);
        } else if (len > 0) {
            return /* Cannot get final name for export "concat" in "./node_modules/rxjs/_esm5/internal/observable/defer.js" (known exports: defer, known reexports: ) */ undefined(/* Cannot get final name for export "fromArray" in "./node_modules/rxjs/_esm5/internal/observable/scalar.js" (known exports: scalar, known reexports: ) */ undefined(array, scheduler), source);
        } else {
            return /* Cannot get final name for export "concat" in "./node_modules/rxjs/_esm5/internal/observable/defer.js" (known exports: defer, known reexports: ) */ undefined(/* Cannot get final name for export "empty" in "./node_modules/rxjs/_esm5/internal/util/isScheduler.js" (known exports: isScheduler, known reexports: ) */ undefined(scheduler), source);
        }
    };
}
//# sourceMappingURL=startWith.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/SubscribeOnObservable.js
/** PURE_IMPORTS_START tslib,_Observable,_scheduler_asap,_util_isNumeric PURE_IMPORTS_END */




var SubscribeOnObservable_SubscribeOnObservable = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SubscribeOnObservable, _super);
    function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) {
            delayTime = 0;
        }
        if (scheduler === void 0) {
            scheduler = /* Cannot get final name for export "asap" in "./node_modules/rxjs/_esm5/internal/scheduler/async.js" (known exports: async, known reexports: ) */ undefined;
        }
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.delayTime = delayTime;
        _this.scheduler = scheduler;
        if (!/* Cannot get final name for export "isNumeric" in "./node_modules/rxjs/_esm5/internal/observable/interval.js" (known exports: interval, known reexports: ) */ undefined(delayTime) || delayTime < 0) {
            _this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            _this.scheduler = /* Cannot get final name for export "asap" in "./node_modules/rxjs/_esm5/internal/scheduler/async.js" (known exports: async, known reexports: ) */ undefined;
        }
        return _this;
    }
    SubscribeOnObservable.create = function (source, delay, scheduler) {
        if (delay === void 0) {
            delay = 0;
        }
        if (scheduler === void 0) {
            scheduler = /* Cannot get final name for export "asap" in "./node_modules/rxjs/_esm5/internal/scheduler/async.js" (known exports: async, known reexports: ) */ undefined;
        }
        return new SubscribeOnObservable(source, delay, scheduler);
    };
    SubscribeOnObservable.dispatch = function (arg) {
        var source = arg.source,
            subscriber = arg.subscriber;
        return this.add(source.subscribe(subscriber));
    };
    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source: source, subscriber: subscriber
        });
    };
    return SubscribeOnObservable;
}(/* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined);

//# sourceMappingURL=SubscribeOnObservable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/subscribeOn.js
/** PURE_IMPORTS_START _observable_SubscribeOnObservable PURE_IMPORTS_END */

function subscribeOn(scheduler, delay) {
    if (delay === void 0) {
        delay = 0;
    }
    return function subscribeOnOperatorFunction(source) {
        return source.lift(new subscribeOn_SubscribeOnOperator(scheduler, delay));
    };
}
var subscribeOn_SubscribeOnOperator = /*@__PURE__*/function () {
    function SubscribeOnOperator(scheduler, delay) {
        this.scheduler = scheduler;
        this.delay = delay;
    }
    SubscribeOnOperator.prototype.call = function (subscriber, source) {
        return new /* Cannot get final name for export "SubscribeOnObservable" in "./node_modules/rxjs/_esm5/internal/operators/subscribeOn.js" (known exports: subscribeOn, known reexports: ) */ undefined(source, this.delay, this.scheduler).subscribe(subscriber);
    };
    return SubscribeOnOperator;
}();
//# sourceMappingURL=subscribeOn.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/switchMap.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult,_map,_observable_from PURE_IMPORTS_END */





function switchMap(project, resultSelector) {
    if (typeof resultSelector === 'function') {
        return function (source) {
            return source.pipe(switchMap(function (a, i) {
                return /* Cannot get final name for export "from" in "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js" (known exports: mergeMap MergeMapOperator MergeMapSubscriber, known reexports: ) */ undefined(project(a, i)).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (b, ii) {
                    return resultSelector(a, b, i, ii);
                }));
            }));
        };
    }
    return function (source) {
        return source.lift(new SwitchMapOperator(project));
    };
}
var SwitchMapOperator = /*@__PURE__*/function () {
    function SwitchMapOperator(project) {
        this.project = project;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new switchMap_SwitchMapSubscriber(subscriber, this.project));
    };
    return SwitchMapOperator;
}();
var switchMap_SwitchMapSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.index = 0;
        return _this;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        } catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    return SwitchMapSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=switchMap.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/switchAll.js
/** PURE_IMPORTS_START _switchMap,_util_identity PURE_IMPORTS_END */


function switchAll() {
    return /* Cannot get final name for export "switchMap" in "./node_modules/rxjs/_esm5/internal/operators/switchAll.js" (known exports: switchAll, known reexports: ) */ undefined(/* Cannot get final name for export "identity" in "./node_modules/rxjs/_esm5/internal/util/isObservable.js" (known exports: isObservable, known reexports: ) */ undefined);
}
//# sourceMappingURL=switchAll.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/switchMapTo.js
/** PURE_IMPORTS_START _switchMap PURE_IMPORTS_END */

function switchMapTo(innerObservable, resultSelector) {
    return resultSelector ? /* Cannot get final name for export "switchMap" in "./node_modules/rxjs/_esm5/internal/operators/switchAll.js" (known exports: switchAll, known reexports: ) */ undefined(function () {
        return innerObservable;
    }, resultSelector) : /* Cannot get final name for export "switchMap" in "./node_modules/rxjs/_esm5/internal/operators/switchAll.js" (known exports: switchAll, known reexports: ) */ undefined(function () {
        return innerObservable;
    });
}
//# sourceMappingURL=switchMapTo.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/takeUntil.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function takeUntil(notifier) {
    return function (source) {
        return source.lift(new takeUntil_TakeUntilOperator(notifier));
    };
}
var takeUntil_TakeUntilOperator = /*@__PURE__*/function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        var takeUntilSubscriber = new takeUntil_TakeUntilSubscriber(subscriber);
        var notifierSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(takeUntilSubscriber, this.notifier);
        if (notifierSubscription && !notifierSubscription.closed) {
            takeUntilSubscriber.add(notifierSubscription);
            return source.subscribe(takeUntilSubscriber);
        }
        return takeUntilSubscriber;
    };
    return TakeUntilOperator;
}();
var takeUntil_TakeUntilSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {};
    return TakeUntilSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=takeUntil.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/takeWhile.js
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function takeWhile(predicate) {
    return function (source) {
        return source.lift(new TakeWhileOperator(predicate));
    };
}
var TakeWhileOperator = /*@__PURE__*/function () {
    function TakeWhileOperator(predicate) {
        this.predicate = predicate;
    }
    TakeWhileOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new takeWhile_TakeWhileSubscriber(subscriber, this.predicate));
    };
    return TakeWhileOperator;
}();
var takeWhile_TakeWhileSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(TakeWhileSubscriber, _super);
    function TakeWhileSubscriber(destination, predicate) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.index = 0;
        return _this;
    }
    TakeWhileSubscriber.prototype._next = function (value) {
        var destination = this.destination;
        var result;
        try {
            result = this.predicate(value, this.index++);
        } catch (err) {
            destination.error(err);
            return;
        }
        this.nextOrComplete(value, result);
    };
    TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
        var destination = this.destination;
        if (Boolean(predicateResult)) {
            destination.next(value);
        } else {
            destination.complete();
        }
    };
    return TakeWhileSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=takeWhile.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/throttle.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



var defaultThrottleConfig = {
    leading: true,
    trailing: false
};
function throttle(durationSelector, config) {
    if (config === void 0) {
        config = defaultThrottleConfig;
    }
    return function (source) {
        return source.lift(new ThrottleOperator(durationSelector, config.leading, config.trailing));
    };
}
var ThrottleOperator = /*@__PURE__*/function () {
    function ThrottleOperator(durationSelector, leading, trailing) {
        this.durationSelector = durationSelector;
        this.leading = leading;
        this.trailing = trailing;
    }
    ThrottleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new throttle_ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
    };
    return ThrottleOperator;
}();
var throttle_ThrottleSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.durationSelector = durationSelector;
        _this._leading = _leading;
        _this._trailing = _trailing;
        _this._hasValue = false;
        return _this;
    }
    ThrottleSubscriber.prototype._next = function (value) {
        this._hasValue = true;
        this._sendValue = value;
        if (!this._throttled) {
            if (this._leading) {
                this.send();
            } else {
                this.throttle(value);
            }
        }
    };
    ThrottleSubscriber.prototype.send = function () {
        var _a = this,
            _hasValue = _a._hasValue,
            _sendValue = _a._sendValue;
        if (_hasValue) {
            this.destination.next(_sendValue);
            this.throttle(_sendValue);
        }
        this._hasValue = false;
        this._sendValue = null;
    };
    ThrottleSubscriber.prototype.throttle = function (value) {
        var duration = this.tryDurationSelector(value);
        if (duration) {
            this.add(this._throttled = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, duration));
        }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
        try {
            return this.durationSelector(value);
        } catch (err) {
            this.destination.error(err);
            return null;
        }
    };
    ThrottleSubscriber.prototype.throttlingDone = function () {
        var _a = this,
            _throttled = _a._throttled,
            _trailing = _a._trailing;
        if (_throttled) {
            _throttled.unsubscribe();
        }
        this._throttled = null;
        if (_trailing) {
            this.send();
        }
    };
    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.throttlingDone();
    };
    ThrottleSubscriber.prototype.notifyComplete = function () {
        this.throttlingDone();
    };
    return ThrottleSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=throttle.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/throttleTime.js
/** PURE_IMPORTS_START tslib,_Subscriber,_scheduler_async,_throttle PURE_IMPORTS_END */




function throttleTime(duration, scheduler, config) {
    if (scheduler === void 0) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    if (config === void 0) {
        config = /* Cannot get final name for export "defaultThrottleConfig" in "./node_modules/rxjs/_esm5/internal/operators/throttleTime.js" (known exports: throttleTime, known reexports: ) */ undefined;
    }
    return function (source) {
        return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing));
    };
}
var ThrottleTimeOperator = /*@__PURE__*/function () {
    function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
        this.duration = duration;
        this.scheduler = scheduler;
        this.leading = leading;
        this.trailing = trailing;
    }
    ThrottleTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new throttleTime_ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
    };
    return ThrottleTimeOperator;
}();
var throttleTime_ThrottleTimeSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(ThrottleTimeSubscriber, _super);
    function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
        var _this = _super.call(this, destination) || this;
        _this.duration = duration;
        _this.scheduler = scheduler;
        _this.leading = leading;
        _this.trailing = trailing;
        _this._hasTrailingValue = false;
        _this._trailingValue = null;
        return _this;
    }
    ThrottleTimeSubscriber.prototype._next = function (value) {
        if (this.throttled) {
            if (this.trailing) {
                this._trailingValue = value;
                this._hasTrailingValue = true;
            }
        } else {
            this.add(this.throttled = this.scheduler.schedule(throttleTime_dispatchNext, this.duration, { subscriber: this }));
            if (this.leading) {
                this.destination.next(value);
            }
        }
    };
    ThrottleTimeSubscriber.prototype._complete = function () {
        if (this._hasTrailingValue) {
            this.destination.next(this._trailingValue);
            this.destination.complete();
        } else {
            this.destination.complete();
        }
    };
    ThrottleTimeSubscriber.prototype.clearThrottle = function () {
        var throttled = this.throttled;
        if (throttled) {
            if (this.trailing && this._hasTrailingValue) {
                this.destination.next(this._trailingValue);
                this._trailingValue = null;
                this._hasTrailingValue = false;
            }
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    };
    return ThrottleTimeSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
function throttleTime_dispatchNext(arg) {
    var subscriber = arg.subscriber;
    subscriber.clearThrottle();
}
//# sourceMappingURL=throttleTime.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/timeInterval.js
/** PURE_IMPORTS_START _scheduler_async,_scan,_observable_defer,_map PURE_IMPORTS_END */




function timeInterval(scheduler) {
    if (scheduler === void 0) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    return function (source) {
        return /* Cannot get final name for export "defer" in "./node_modules/rxjs/_esm5/internal/observable/forkJoin.js" (known exports: forkJoin, known reexports: ) */ undefined(function () {
            return source.pipe(/* Cannot get final name for export "scan" in "./node_modules/rxjs/_esm5/internal/operators/reduce.js" (known exports: reduce, known reexports: ) */ undefined(function (_a, value) {
                var current = _a.current;
                return { value: value, current: scheduler.now(), last: current };
            }, { current: scheduler.now(), value: undefined, last: undefined }), /* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (_a) {
                var current = _a.current,
                    last = _a.last,
                    value = _a.value;
                return new TimeInterval(value, current - last);
            }));
        });
    };
}
var TimeInterval = /*@__PURE__*/function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}();

//# sourceMappingURL=timeInterval.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/timeoutWith.js
/** PURE_IMPORTS_START tslib,_scheduler_async,_util_isDate,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function timeoutWith(due, withObservable, scheduler) {
    if (scheduler === void 0) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    return function (source) {
        var absoluteTimeout = /* Cannot get final name for export "isDate" in "./node_modules/rxjs/_esm5/internal/operators/delay.js" (known exports: delay, known reexports: ) */ undefined(due);
        var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
        return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
    };
}
var TimeoutWithOperator = /*@__PURE__*/function () {
    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }
    TimeoutWithOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new timeoutWith_TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
    };
    return TimeoutWithOperator;
}();
var timeoutWith_TimeoutWithSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(TimeoutWithSubscriber, _super);
    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.absoluteTimeout = absoluteTimeout;
        _this.waitFor = waitFor;
        _this.withObservable = withObservable;
        _this.scheduler = scheduler;
        _this.action = null;
        _this.scheduleTimeout();
        return _this;
    }
    TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
        var withObservable = subscriber.withObservable;
        subscriber._unsubscribeAndRecycle();
        subscriber.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(subscriber, withObservable));
    };
    TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
        var action = this.action;
        if (action) {
            this.action = action.schedule(this, this.waitFor);
        } else {
            this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
        }
    };
    TimeoutWithSubscriber.prototype._next = function (value) {
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
        _super.prototype._next.call(this, value);
    };
    TimeoutWithSubscriber.prototype._unsubscribe = function () {
        this.action = null;
        this.scheduler = null;
        this.withObservable = null;
    };
    return TimeoutWithSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=timeoutWith.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/timeout.js
/** PURE_IMPORTS_START _scheduler_async,_util_TimeoutError,_timeoutWith,_observable_throwError PURE_IMPORTS_END */




function timeout(due, scheduler) {
    if (scheduler === void 0) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    return /* Cannot get final name for export "timeoutWith" in "./node_modules/rxjs/_esm5/internal/operators/timeout.js" (known exports: timeout, known reexports: ) */ undefined(due, /* Cannot get final name for export "throwError" in "./node_modules/rxjs/_esm5/internal/Notification.js" (known exports: Notification, known reexports: ) */ undefined(new /* Cannot get final name for export "TimeoutError" in "./node_modules/rxjs/_esm5/internal/operators/map.js" (known exports: map MapOperator, known reexports: ) */ undefined()), scheduler);
}
//# sourceMappingURL=timeout.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/timestamp.js
/** PURE_IMPORTS_START _scheduler_async,_map PURE_IMPORTS_END */


function timestamp(scheduler) {
    if (scheduler === void 0) {
        scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    }
    return /* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (value) {
        return new Timestamp(value, scheduler.now());
    });
}
var Timestamp = /*@__PURE__*/function () {
    function Timestamp(value, timestamp) {
        this.value = value;
        this.timestamp = timestamp;
    }
    return Timestamp;
}();

//# sourceMappingURL=timestamp.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/toArray.js
/** PURE_IMPORTS_START _reduce PURE_IMPORTS_END */

function toArrayReducer(arr, item, index) {
    if (index === 0) {
        return [item];
    }
    arr.push(item);
    return arr;
}
function toArray() {
    return /* Cannot get final name for export "reduce" in "./node_modules/rxjs/_esm5/internal/operators/max.js" (known exports: max, known reexports: ) */ undefined(toArrayReducer, []);
}
//# sourceMappingURL=toArray.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/window.js
/** PURE_IMPORTS_START tslib,_Subject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */




function window_window(windowBoundaries) {
    return function windowOperatorFunction(source) {
        return source.lift(new window_WindowOperator(windowBoundaries));
    };
}
var window_WindowOperator = /*@__PURE__*/function () {
    function WindowOperator(windowBoundaries) {
        this.windowBoundaries = windowBoundaries;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
        var windowSubscriber = new window_WindowSubscriber(subscriber);
        var sourceSubscription = source.subscribe(windowSubscriber);
        if (!sourceSubscription.closed) {
            windowSubscriber.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(windowSubscriber, this.windowBoundaries));
        }
        return sourceSubscription;
    };
    return WindowOperator;
}();
var window_WindowSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(WindowSubscriber, _super);
    function WindowSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.window = new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined();
        destination.next(_this.window);
        return _this;
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow();
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this._complete();
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
    };
    WindowSubscriber.prototype._unsubscribe = function () {
        this.window = null;
    };
    WindowSubscriber.prototype.openWindow = function () {
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var destination = this.destination;
        var newWindow = this.window = new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined();
        destination.next(newWindow);
    };
    return WindowSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=window.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/windowCount.js
/** PURE_IMPORTS_START tslib,_Subscriber,_Subject PURE_IMPORTS_END */



function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) {
        startWindowEvery = 0;
    }
    return function windowCountOperatorFunction(source) {
        return source.lift(new WindowCountOperator(windowSize, startWindowEvery));
    };
}
var WindowCountOperator = /*@__PURE__*/function () {
    function WindowCountOperator(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    WindowCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new windowCount_WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    };
    return WindowCountOperator;
}();
var windowCount_WindowCountSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.windowSize = windowSize;
        _this.startWindowEvery = startWindowEvery;
        _this.windows = [new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined()];
        _this.count = 0;
        destination.next(_this.windows[0]);
        return _this;
    }
    WindowCountSubscriber.prototype._next = function (value) {
        var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len && !this.closed; i++) {
            windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0 && !this.closed) {
            var window_1 = new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined();
            windows.push(window_1);
            destination.next(window_1);
        }
    };
    WindowCountSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().error(err);
            }
        }
        this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function () {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().complete();
            }
        }
        this.destination.complete();
    };
    WindowCountSubscriber.prototype._unsubscribe = function () {
        this.count = 0;
        this.windows = null;
    };
    return WindowCountSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=windowCount.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/windowTime.js
/** PURE_IMPORTS_START tslib,_Subject,_scheduler_async,_Subscriber,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */






function windowTime_windowTime(windowTimeSpan) {
    var scheduler = /* Cannot get final name for export "async" in "./node_modules/rxjs/_esm5/internal/scheduler/AnimationFrameAction.js" (known exports: AnimationFrameAction, known reexports: ) */ undefined;
    var windowCreationInterval = null;
    var maxWindowSize = Number.POSITIVE_INFINITY;
    if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(arguments[3])) {
        scheduler = arguments[3];
    }
    if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(arguments[2])) {
        scheduler = arguments[2];
    } else if (/* Cannot get final name for export "isNumeric" in "./node_modules/rxjs/_esm5/internal/observable/interval.js" (known exports: interval, known reexports: ) */ undefined(arguments[2])) {
        maxWindowSize = arguments[2];
    }
    if (/* Cannot get final name for export "isScheduler" in "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js" (known exports: subscribeToArray, known reexports: ) */ undefined(arguments[1])) {
        scheduler = arguments[1];
    } else if (/* Cannot get final name for export "isNumeric" in "./node_modules/rxjs/_esm5/internal/observable/interval.js" (known exports: interval, known reexports: ) */ undefined(arguments[1])) {
        windowCreationInterval = arguments[1];
    }
    return function windowTimeOperatorFunction(source) {
        return source.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
    };
}
var WindowTimeOperator = /*@__PURE__*/function () {
    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
        this.windowTimeSpan = windowTimeSpan;
        this.windowCreationInterval = windowCreationInterval;
        this.maxWindowSize = maxWindowSize;
        this.scheduler = scheduler;
    }
    WindowTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new windowTime_WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
    };
    return WindowTimeOperator;
}();
var windowTime_CountedSubject = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(CountedSubject, _super);
    function CountedSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._numberOfNextedValues = 0;
        return _this;
    }
    CountedSubject.prototype.next = function (value) {
        this._numberOfNextedValues++;
        _super.prototype.next.call(this, value);
    };
    Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
        get: function get() {
            return this._numberOfNextedValues;
        },
        enumerable: true,
        configurable: true
    });
    return CountedSubject;
}(/* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined);
var windowTime_WindowTimeSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(WindowTimeSubscriber, _super);
    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.windowTimeSpan = windowTimeSpan;
        _this.windowCreationInterval = windowCreationInterval;
        _this.maxWindowSize = maxWindowSize;
        _this.scheduler = scheduler;
        _this.windows = [];
        var window = _this.openWindow();
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            var closeState = { subscriber: _this, window: window, context: null };
            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: _this, scheduler: scheduler };
            _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
            _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
        } else {
            var timeSpanOnlyState = { subscriber: _this, window: window, windowTimeSpan: windowTimeSpan };
            _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
        }
        return _this;
    }
    WindowTimeSubscriber.prototype._next = function (value) {
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len; i++) {
            var window_1 = windows[i];
            if (!window_1.closed) {
                window_1.next(value);
                if (window_1.numberOfNextedValues >= this.maxWindowSize) {
                    this.closeWindow(window_1);
                }
            }
        }
    };
    WindowTimeSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        while (windows.length > 0) {
            windows.shift().error(err);
        }
        this.destination.error(err);
    };
    WindowTimeSubscriber.prototype._complete = function () {
        var windows = this.windows;
        while (windows.length > 0) {
            var window_2 = windows.shift();
            if (!window_2.closed) {
                window_2.complete();
            }
        }
        this.destination.complete();
    };
    WindowTimeSubscriber.prototype.openWindow = function () {
        var window = new windowTime_CountedSubject();
        this.windows.push(window);
        var destination = this.destination;
        destination.next(window);
        return window;
    };
    WindowTimeSubscriber.prototype.closeWindow = function (window) {
        window.complete();
        var windows = this.windows;
        windows.splice(windows.indexOf(window), 1);
    };
    return WindowTimeSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);
function dispatchWindowTimeSpanOnly(state) {
    var subscriber = state.subscriber,
        windowTimeSpan = state.windowTimeSpan,
        window = state.window;
    if (window) {
        subscriber.closeWindow(window);
    }
    state.window = subscriber.openWindow();
    this.schedule(state, windowTimeSpan);
}
function dispatchWindowCreation(state) {
    var windowTimeSpan = state.windowTimeSpan,
        subscriber = state.subscriber,
        scheduler = state.scheduler,
        windowCreationInterval = state.windowCreationInterval;
    var window = subscriber.openWindow();
    var action = this;
    var context = { action: action, subscription: null };
    var timeSpanState = { subscriber: subscriber, window: window, context: context };
    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
    action.add(context.subscription);
    action.schedule(state, windowCreationInterval);
}
function dispatchWindowClose(state) {
    var subscriber = state.subscriber,
        window = state.window,
        context = state.context;
    if (context && context.action && context.subscription) {
        context.action.remove(context.subscription);
    }
    subscriber.closeWindow(window);
}
//# sourceMappingURL=windowTime.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/windowToggle.js
/** PURE_IMPORTS_START tslib,_Subject,_Subscription,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */







function windowToggle(openings, closingSelector) {
    return function (source) {
        return source.lift(new WindowToggleOperator(openings, closingSelector));
    };
}
var WindowToggleOperator = /*@__PURE__*/function () {
    function WindowToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    WindowToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new windowToggle_WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return WindowToggleOperator;
}();
var windowToggle_WindowToggleSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(WindowToggleSubscriber, _super);
    function WindowToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(_this.openSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(_this, openings, openings));
        return _this;
    }
    WindowToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        if (contexts) {
            var len = contexts.length;
            for (var i = 0; i < len; i++) {
                contexts[i].window.next(value);
            }
        }
    };
    WindowToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context_1 = contexts[index];
                context_1.window.error(err);
                context_1.subscription.unsubscribe();
            }
        }
        _super.prototype._error.call(this, err);
    };
    WindowToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context_2 = contexts[index];
                context_2.window.complete();
                context_2.subscription.unsubscribe();
            }
        }
        _super.prototype._complete.call(this);
    };
    WindowToggleSubscriber.prototype._unsubscribe = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context_3 = contexts[index];
                context_3.window.unsubscribe();
                context_3.subscription.unsubscribe();
            }
        }
    };
    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
            var closingSelector = this.closingSelector;
            var closingNotifier = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(closingSelector)(innerValue);
            if (closingNotifier === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                return this.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
            } else {
                var window_1 = new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined();
                var subscription = new /* Cannot get final name for export "Subscription" in "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js" (known exports: rxSubscriber $$rxSubscriber, known reexports: ) */ undefined();
                var context_4 = { window: window_1, subscription: subscription };
                this.contexts.push(context_4);
                var innerSubscription = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, closingNotifier, context_4);
                if (innerSubscription.closed) {
                    this.closeWindow(this.contexts.length - 1);
                } else {
                    innerSubscription.context = context_4;
                    subscription.add(innerSubscription);
                }
                this.destination.next(window_1);
            }
        } else {
            this.closeWindow(this.contexts.indexOf(outerValue));
        }
    };
    WindowToggleSubscriber.prototype.notifyError = function (err) {
        this.error(err);
    };
    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
        if (inner !== this.openSubscription) {
            this.closeWindow(this.contexts.indexOf(inner.context));
        }
    };
    WindowToggleSubscriber.prototype.closeWindow = function (index) {
        if (index === -1) {
            return;
        }
        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window,
            subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
    };
    return WindowToggleSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=windowToggle.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/windowWhen.js
/** PURE_IMPORTS_START tslib,_Subject,_util_tryCatch,_util_errorObject,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */






function windowWhen(closingSelector) {
    return function windowWhenOperatorFunction(source) {
        return source.lift(new windowWhen_WindowOperator(closingSelector));
    };
}
var windowWhen_WindowOperator = /*@__PURE__*/function () {
    function WindowOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    WindowOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new windowWhen_WindowSubscriber(subscriber, this.closingSelector));
    };
    return WindowOperator;
}();
var windowWhen_WindowSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(WindowSubscriber, _super);
    function WindowSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.closingSelector = closingSelector;
        _this.openWindow();
        return _this;
    }
    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
        this.openWindow(innerSub);
    };
    WindowSubscriber.prototype._next = function (value) {
        this.window.next(value);
    };
    WindowSubscriber.prototype._error = function (err) {
        this.window.error(err);
        this.destination.error(err);
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype._complete = function () {
        this.window.complete();
        this.destination.complete();
        this.unsubscribeClosingNotification();
    };
    WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
        if (this.closingNotification) {
            this.closingNotification.unsubscribe();
        }
    };
    WindowSubscriber.prototype.openWindow = function (innerSub) {
        if (innerSub === void 0) {
            innerSub = null;
        }
        if (innerSub) {
            this.remove(innerSub);
            innerSub.unsubscribe();
        }
        var prevWindow = this.window;
        if (prevWindow) {
            prevWindow.complete();
        }
        var window = this.window = new /* Cannot get final name for export "Subject" in "./node_modules/rxjs/_esm5/internal/operators/refCount.js" (known exports: refCount, known reexports: ) */ undefined();
        this.destination.next(window);
        var closingNotifier = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(this.closingSelector)();
        if (closingNotifier === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
            var err = /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e;
            this.destination.error(err);
            this.window.error(err);
        } else {
            this.add(this.closingNotification = /* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(this, closingNotifier));
        }
    };
    return WindowSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=windowWhen.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/withLatestFrom.js
/** PURE_IMPORTS_START tslib,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */



function withLatestFrom() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (source) {
        var project;
        if (typeof args[args.length - 1] === 'function') {
            project = args.pop();
        }
        var observables = args;
        return source.lift(new WithLatestFromOperator(observables, project));
    };
}
var WithLatestFromOperator = /*@__PURE__*/function () {
    function WithLatestFromOperator(observables, project) {
        this.observables = observables;
        this.project = project;
    }
    WithLatestFromOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new withLatestFrom_WithLatestFromSubscriber(subscriber, this.observables, this.project));
    };
    return WithLatestFromOperator;
}();
var withLatestFrom_WithLatestFromSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(WithLatestFromSubscriber, _super);
    function WithLatestFromSubscriber(destination, observables, project) {
        var _this = _super.call(this, destination) || this;
        _this.observables = observables;
        _this.project = project;
        _this.toRespond = [];
        var len = observables.length;
        _this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            _this.toRespond.push(i);
        }
        for (var i = 0; i < len; i++) {
            var observable = observables[i];
            _this.add(/* Cannot get final name for export "subscribeToResult" in "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js" (known exports: combineLatest CombineLatestOperator CombineLatestSubscriber, known reexports: ) */ undefined(_this, observable, observable, i));
        }
        return _this;
    }
    WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        var toRespond = this.toRespond;
        if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
                toRespond.splice(found, 1);
            }
        }
    };
    WithLatestFromSubscriber.prototype.notifyComplete = function () {};
    WithLatestFromSubscriber.prototype._next = function (value) {
        if (this.toRespond.length === 0) {
            var args = [value].concat(this.values);
            if (this.project) {
                this._tryProject(args);
            } else {
                this.destination.next(args);
            }
        }
    };
    WithLatestFromSubscriber.prototype._tryProject = function (args) {
        var result;
        try {
            result = this.project.apply(this, args);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return WithLatestFromSubscriber;
}(/* Cannot get final name for export "OuterSubscriber" in "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js" (known exports: InnerSubscriber, known reexports: ) */ undefined);
//# sourceMappingURL=withLatestFrom.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/zip.js
/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

function zip_zip() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return function zipOperatorFunction(source) {
        return source.lift.call(zip.apply(void 0, [source].concat(observables)));
    };
}
//# sourceMappingURL=zip.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/operators/zipAll.js
/** PURE_IMPORTS_START _observable_zip PURE_IMPORTS_END */

function zipAll(project) {
    return function (source) {
        return source.lift(new /* Cannot get final name for export "ZipOperator" in "./node_modules/rxjs/_esm5/index.js" (known exports: , known reexports: Observable ConnectableObservable GroupedObservable observable Subject BehaviorSubject ReplaySubject AsyncSubject asapScheduler asyncScheduler queueScheduler animationFrameScheduler VirtualTimeScheduler VirtualAction Scheduler Subscription Subscriber Notification pipe noop identity isObservable ArgumentOutOfRangeError EmptyError ObjectUnsubscribedError UnsubscriptionError TimeoutError bindCallback bindNodeCallback combineLatest concat defer empty forkJoin from fromEvent fromEventPattern generate iif interval merge never of onErrorResumeNext pairs race range throwError timer using zip EMPTY NEVER config) */ undefined(project));
    };
}
//# sourceMappingURL=zipAll.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/operators/index.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */








































































































//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/rxjs-create-tween/esm/index.js
 // eslint-disable-line

/**
 * Creates an observable that emits samples from an easing function on every animation frame
 * for a duration `d` ms.
 *
 * The first value will be emitted on the next animation frame,
 * and is the value of the easing function at `t = 0`.
 * The final value is guaranteed to be the easing function at `t = d`.
 * The observable completes one frame after the final value was emitted.
 *
 * @param {function(t: number, b: number, c: number, d: number, [s]: number): number} easingFunction
 * - the easing fuction to sample from; can use any of Robert Penner's easing functions
     (without the `x` paramter)
 * @param {number} b - beginning value and 2nd parameter of the easing function
 * @param {number} c - change in value (or end value) and 3rd parameter of the easing function
 * @param {number} d - total duration of the tween in ms and 4th parameter of the easing function
 * @param {number} [s] - 5th parameter of the easing function (optional)
 * @return {Observable<number>} - an observable emitting samples of the easing function on
 *   animation frames for `d` ms.
 */
function createTween(easingFunction, b, c, d, s) {
  return /* Cannot get final name for export "Observable" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined.create(function (observer) {
    var startTime = void 0;
    var id = requestAnimationFrame(function sample(time) {
      startTime = startTime || time;
      var t = time - startTime;
      if (t < d) {
        observer.next(easingFunction(t, b, c, d, s));
        id = requestAnimationFrame(sample);
      } else {
        observer.next(easingFunction(d, b, c, d, s));
        id = requestAnimationFrame(function () {
          return observer.complete();
        });
      }
    });
    return function () {
      if (id) {
        cancelAnimationFrame(id);
      }
    };
  });
}

/* harmony default export */ var esm = (createTween);
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/common.js
// # src / common.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function easeOutSine(t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b; // eslint-disable-line
}
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/mixin/constants.js
// # src / mixin / constants.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// The base duration of the fling animation.
var BASE_DURATION = 200;

// We adjust the duration of the animation using the width of the drawer.
// There is no physics to this, but we know from testing that the animation starts to feel bad
// when the drawer increases in size.
// From testing we know that, if we increase the duration as a fraction of the drawer width,
// the animation stays smooth across common display sizes.
var WIDTH_CONTRIBUTION = 0.15;

// Minimum velocity of the drawer (in px/ms) when releasing to make it fling to opened/closed state.
var VELOCITY_THRESHOLD = 0.15;
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/mixin/operators.js
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

// # src / mixin / operators.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.





// ### Observable extensions
// #### Subscribe when
// This operator is like `filterWhen`, but it will unsubscribe from the source observable
// when the input observable emits `false`, and re-subscribe when it emits `true`.
var operators_subscribeWhen = function subscribeWhen(p$) {
  return function (source) {
    if (true && !p$) throw Error();
    return p$.pipe(/* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (p) {
      return p ? source : /* Cannot get final name for export "never" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined();
    }));
  };
};

// #### Filter when
// This operator is like `filter`, but it takes an observable of booleans as input,
// instead of a predicate function.
var operators_filterWhen = function filterWhen(p$) {
  for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    others[_key - 1] = arguments[_key];
  }

  return function (source) {
    if (true && !p$) throw Error();else if (others.length === 0) {
      return source.pipe(/* Cannot get final name for export "withLatestFrom" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(p$), /* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            p = _ref2[1];

        return p;
      }), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            x = _ref4[0];

        return x;
      }));

      // When providing more than one observable, the result observable will only emit values
      // when `every` input observable has emitted a truthy value.
    } else {
      return source.pipe(/* Cannot get final name for export "withLatestFrom" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined.apply(undefined, [p$].concat(others)), /* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref5) {
        var _ref6 = _toArray(_ref5),
            ps = _ref6.slice(1);

        return ps.every(function (p) {
          return p;
        });
      }), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 1),
            x = _ref8[0];

        return x;
      }));
    }
  };
};
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/mixin/calc.js
var calc__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var calc__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function calc__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function calc__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function calc__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / calc.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



// Using shorthands for common functions
var calc_min = Math.min.bind(Math);
var calc_max = Math.max.bind(Math);

var calc_calcMixin = function calcMixin(C) {
  return function (_C) {
    calc__inherits(_class, _C);

    function _class() {
      calc__classCallCheck(this, _class);

      return calc__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    calc__createClass(_class, [{
      key: "calcIsInRange",

      // #### Is in range?
      // Given a x-coordinate, `isInRange` will  determine whether it is within range from where
      // to pull the drawer. The x-coordinate *must* be larger than the lower bound,
      // but when the drawer is opened it may be anywhere on the screen.
      // Otherwise it must be below the upper bound.
      value: function calcIsInRange(clientX, opened) {
        switch (this.align) {
          case "left":
            return clientX > this.range[0] && (opened || clientX < this.range[1]);
          case "right":
            return clientX < window.innerWidth - this.range[0] && (opened || clientX > window.innerWidth - this.range[1]);
          default:
            throw Error();
        }
      }

      // #### Calculate 'Is swipe?'
      // If the start and end position are not the same x-coordinate, we call it a 'swipe'.
      // However, if a tap occures during an animation (i.e. `translateX` not in a resting position)
      // we treat it as a swipe as well. The reasons for this are pretty complex:
      // Basically, we want users the be able to stop the animation by putting a finger on the screen.
      // However, if they lift the finger again without swiping, the animation would not continue,
      // because it would not pass the condition below, unless we introduce the second term.
      // TODO: reuse isSlidign observable?

    }, {
      key: "calcIsSwipe",
      value: function calcIsSwipe(_ref) {
        var _ref2 = calc__slicedToArray(_ref, 3),
            endX = _ref2[0].clientX,
            startX = _ref2[1].clientX,
            translateX = _ref2[2];

        return endX !== startX || translateX > 0 && translateX < this.drawerWidth;
      }

      // #### Calculate 'Will open?'
      // Based on current velocity and position of the drawer,
      // should the drawer slide open, or snap back?
      // TODO: could incorporate the current open state of the drawer.

    }, {
      key: "calcWillOpen",
      value: function calcWillOpen(_ref3) {
        var _ref4 = calc__slicedToArray(_ref3, 4),
            translateX = _ref4[2],
            velocity = _ref4[3];

        switch (this.align) {
          case "left":
            {
              if (velocity > /* Cannot get final name for export "VELOCITY_THRESHOLD" in "./node_modules/hy-drawer/src/mixin/operators.js" (known exports: subscribeWhen filterWhen, known reexports: ) */ undefined) return true;else if (velocity < -/* Cannot get final name for export "VELOCITY_THRESHOLD" in "./node_modules/hy-drawer/src/mixin/operators.js" (known exports: subscribeWhen filterWhen, known reexports: ) */ undefined) return false;else if (translateX >= this.drawerWidth / 2) return true;else return false;
            }
          case "right":
            {
              if (-velocity > /* Cannot get final name for export "VELOCITY_THRESHOLD" in "./node_modules/hy-drawer/src/mixin/operators.js" (known exports: subscribeWhen filterWhen, known reexports: ) */ undefined) return true;else if (-velocity < -/* Cannot get final name for export "VELOCITY_THRESHOLD" in "./node_modules/hy-drawer/src/mixin/operators.js" (known exports: subscribeWhen filterWhen, known reexports: ) */ undefined) return false;else if (translateX <= -this.drawerWidth / 2) return true;else return false;
            }
          default:
            throw Error();
        }
      }

      // #### Calculate translate X
      // Calcuate the current position of the drawer,
      // by taking the difference between the current and starting postion of the finger,
      // then adding that difference to the starting position of the drawer.
      // This way, we avoid the drawer jumping to the finger, when "catching" it during an animation.
      // The function will also clip the position at 0 and the width of the drawer.

    }, {
      key: "calcTranslateX",
      value: function calcTranslateX(clientX, startX, startTranslateX) {
        switch (this.align) {
          case "left":
            {
              var deltaX = clientX - startX;
              var translateX = startTranslateX + deltaX;
              return calc_max(0, calc_min(this.drawerWidth, translateX));
            }
          case "right":
            {
              var _deltaX = clientX - startX;
              var _translateX = startTranslateX + _deltaX;
              return calc_min(0, calc_max(-this.drawerWidth, _translateX));
            }
          default:
            throw Error();
        }
      }

      // #### Get movable drawer width
      // One feature of hy-drawer is to allow the drawer to "peek" over the edge.
      // This effect is achieved by setting a smaller negative `left` (`right`) CSS property,
      // than is the width of the drawer,
      // The 'moveable' part of the drawer, then, is equal to the inverse of that property.
      // See [Styling](../../styling.md) for more.

    }, {
      key: "calcMovableDrawerWidth",
      value: function calcMovableDrawerWidth() {
        return -parseFloat(getComputedStyle(this.contentEl)[this.align]);
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/mixin/update.js
var update__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function update__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function update__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function update__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / update.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var hasCSSOM = "attributeStyleMap" in Element.prototype && "CSS" in window && CSS.number;

var update_updateMixin = function updateMixin(C) {
  return function (_C) {
    update__inherits(_class, _C);

    function _class() {
      update__classCallCheck(this, _class);

      return update__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    update__createClass(_class, [{
      key: "histId",
      value: function histId() {
        return this.el.id || this.constructor.componentName;
      }

      // #### Prepare and cleanup interaction
      // `prepareInteraction` causes various side effects before sliding the drawer.
      //
      // Note that the drawer receives the `hy-drawer-opened` CSS class when it is opened.
      // This class makes the drawer appear open by setting the CSS `left` (`right`) property, instead
      // of an absoulte `transform` value.
      // This way, the drawer's width can change while it is open without having to
      // recalculate `translateX` on every `resize`.
      // However, it has to be removed before we move the drawer via `translateX` again.

    }, {
      key: "prepareInteraction",
      value: function prepareInteraction() {
        if (hasCSSOM) {
          this.contentEl.attributeStyleMap.set("will-change", "transform");
          this.scrimEl.attributeStyleMap.set("will-change", "opacity");
        } else {
          this.contentEl.style.willChange = "transform";
          this.scrimEl.style.willChange = "opacity";
        }
        this.contentEl.classList.remove("hy-drawer-opened");
        this.fireEvent("prepare");
      }

      // Cleanup code after a completed interaction.
      // Will add/remove the beforementioned `hy-drawer-opened` class.

    }, {
      key: "cleanupInteraction",
      value: function cleanupInteraction(opened) {
        if (hasCSSOM) {
          this.contentEl.attributeStyleMap.delete("will-change");
          this.scrimEl.attributeStyleMap.delete("will-change");

          if (opened) {
            this.scrimEl.attributeStyleMap.set("pointer-events", new CSSKeywordValue("all"));
            this.contentEl.classList.add("hy-drawer-opened");
          } else {
            this.scrimEl.attributeStyleMap.delete("pointer-events");
            this.contentEl.classList.remove("hy-drawer-opened");
          }
        } else {
          this.scrimEl.style.willChange = "";
          this.contentEl.style.willChange = "";

          if (opened) {
            this.scrimEl.style.pointerEvents = "all";
            this.contentEl.classList.add("hy-drawer-opened");
          } else {
            this.scrimEl.style.pointerEvents = "";
            this.contentEl.classList.remove("hy-drawer-opened");
          }
        }

        // If the experimental back button feature is enabled we hack the history API,
        // so that it matches the state of the drawer...
        /*
        if (this._backButton) {
          const id = histId.call(this);
          const hash = `#${id}--opened`;
           if (opened && window.location.hash !== hash) {
            window.history.pushState({ [id]: true }, document.title, hash);
          }
           if (!opened
              && (window.history.state && window.history.state[histId.call(this)])
              && window.location.hash !== '') {
            window.history.back();
          }
        }
        */

        // Once we're finished cleaning up, we fire the `transitioned` event.
        this.fireEvent("transitioned", { detail: opened });
      }
      // #### Update DOM
      // In the end, we only modify two properties: The x-coordinate of the drawer,
      // and the opacity of the scrim, which is handled by `updateDOM`.

    }, {
      key: "updateDOM",
      value: function updateDOM(translateX) {
        this.translateX = translateX;

        var inv = this.align === "left" ? 1 : -1;
        var opacity = this.opacity = translateX / this.drawerWidth * inv;

        if (this.moveCallback) this.moveCallback({ translateX: translateX, opacity: opacity });
        /* this.fireEvent("move", { detail: { translateX, opacity } }); */

        if (hasCSSOM) {
          this.contentEl.attributeStyleMap.set("transform", new CSSTransformValue([new CSSTranslate(CSS.px(translateX), CSS.px(0))]));
          this.scrimEl.attributeStyleMap.set("opacity", this.opacity);
        } else {
          this.contentEl.style.transform = "translateX(" + translateX + "px)";
          this.scrimEl.style.opacity = this.opacity;
        }
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/mixin/observables.js
var observables__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var observables__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function observables__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function observables__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function observables__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / observables.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.







// Using shorthands for common functions
var abs = Math.abs.bind(Math);

// #### Get start observable
// The following function returns an observable of all "start" events.
// Usually, that's just `touchstart` event of the first finger touching the screen,
// however since the compontent also supports mouse events,
// we may listen for `mousedown` events.
var observables_baseObservablesMixin = function baseObservablesMixin(C) {
  return function (_C) {
    observables__inherits(_class, _C);

    function _class() {
      observables__classCallCheck(this, _class);

      return observables__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    observables__createClass(_class, [{
      key: "getStartObservable",
      value: function getStartObservable() {
        // Since the `mouseEvents` option may change at any point, we `switchMap` to reflect the changes.
        return /* Cannot get final name for export "combineLatest" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(this.subjects.document, this.subjects.mouseEvents).pipe(/* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref) {
          var _ref2 = observables__slicedToArray(_ref, 2),
              doc = _ref2[0],
              mouseEvents = _ref2[1];

          // The touchstart observable is passive since we won't be calling `preventDefault`.
          // Also, we're only interested in the first `touchstart`.
          var touchstart$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(doc, "touchstart", {
            passive: true
          }).pipe(/* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref3) {
            var touches = _ref3.touches;
            return touches.length === 1;
          }), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref4) {
            var touches = _ref4.touches;
            return touches[0];
          }));

          // If mouse events aren't enabled, we're done here.
          if (!mouseEvents) return touchstart$;

          // Otherwise we also include `mousedown` events in the output.
          var mousedown$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(doc, "mousedown").pipe(/* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (event) {
            return event.event = event, event;
          }));

          return /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(touchstart$, mousedown$);
        }));
      }

      // #### Get move observable
      // This function returns an observable of all move events. Usually that's just `touchmove`,
      // but may also include `mousemove` events while the mouse button is down.

    }, {
      key: "getMoveObservable",
      value: function getMoveObservable(start$, end$) {
        // Since the `mouseEvents` or `preventDefault` option may change at any point,
        // we `switchMap` to reflect the changes.
        // Nice: `combineLatest` provides us with the functionality of emitting
        // when either of the inputs change, but not before all inputs have their first value set.
        return /* Cannot get final name for export "combineLatest" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(this.subjects.document, this.subjects.mouseEvents, this.subjects.preventDefault).pipe(/* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref5) {
          var _ref6 = observables__slicedToArray(_ref5, 3),
              doc = _ref6[0],
              mouseEvents = _ref6[1],
              preventDefault = _ref6[2];

          // We're only keeping track of the first finger.
          // Should the user remove the finger that started the interaction, we use the next instead.
          // Note that this doesn't occur under normal circumstances,
          // and exists primarliy to ensure that the interaction continues without hiccups.
          // Note that the event listener is only passive when the `preventDefault` option is falsy.
          var touchmove$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(doc, "touchmove", { passive: !preventDefault }).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (e) {
            return e.touches[0].event = e, e.touches[0];
          }));

          // If mouse events aren't enabled, we're done here.
          if (!mouseEvents) return touchmove$;

          // Otherwise we listen for `mousemove` events,
          // but only those between a `start` and `end` event, i.e. while the user is sliding.
          // We unsubscribe form the source observable outside of those contraints.
          // Again, the listener is only marked as passive when the `preventDefault` option is falsy.
          var mousemove$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(doc, "mousemove", {
            passive: !preventDefault
          }).pipe(/* Cannot get final name for export "subscribeWhen" in "./node_modules/hy-drawer/src/mixin/calc.js" (known exports: calcMixin, known reexports: ) */ undefined(/* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(start$.pipe(/* Cannot get final name for export "mapTo" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(true)), end$.pipe(/* Cannot get final name for export "mapTo" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(false)))), /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (event) {
            return event.event = event, event;
          }));

          return /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(touchmove$, mousemove$);
        }));
      }

      // #### Get end observable
      // This function returns an observable of end events.
      // Usually, this is the `touchend` event of the last finger, but may also include `mouseup` events,
      // when the `mouseEvents` option is enabled.

    }, {
      key: "getEndObservable",
      value: function getEndObservable() {
        // Since the `mouseEvents` option may change at any point, we `switchMap` to reflect the changes.
        return /* Cannot get final name for export "combineLatest" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(this.subjects.document, this.subjects.mouseEvents).pipe(/* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref7) {
          var _ref8 = observables__slicedToArray(_ref7, 2),
              doc = _ref8[0],
              mouseEvents = _ref8[1];

          // We're only interested in the last `touchend`.
          // Otherwise there's at least one finger left on the screen,
          // that can be used to slide the drawer.
          var touchend$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(doc, "touchend", { passive: true }).pipe(/* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref9) {
            var touches = _ref9.touches;
            return touches.length === 0;
          }), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (event) {
            return event.changedTouches[0];
          }));

          // If mouse events aren't enabled, we're done here.
          if (!mouseEvents) return touchend$;

          // Otherwise we include `mouseup` events.
          var mouseup$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(doc, "mouseup", { passive: true });
          return /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(touchend$, mouseup$);
        }));
      }

      // #### Get "Is sliding?" observable
      // An observable that emits `true` when the user is *sliding* the drawer,
      // (i.e. moving the finger along the x-axis), or `false` when *scrolling* the page
      // (i.e. moving the finger along the y-axis).

    }, {
      key: "getIsSlidingObservable",
      value: function getIsSlidingObservable(move$, start$, end$) {
        return this.getIsSlidingObservable2(move$, start$).pipe(/* Cannot get final name for export "take" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(1), /* Cannot get final name for export "startWith" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(undefined), /* Cannot get final name for export "repeatWhen" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
          return end$;
        }));
      }
    }, {
      key: "getIsSlidingObservable2",
      value: function getIsSlidingObservable2(move$, start$) {
        var _this2 = this;

        // If the threshold options is set, we delay the decision until
        // the finger has moved at least `threshold` pixels in either direction.
        if (this.threshold) {
          return move$.pipe(/* Cannot get final name for export "withLatestFrom" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(start$), /* Cannot get final name for export "skipWhile" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref10) {
            var _ref11 = observables__slicedToArray(_ref10, 2),
                _ref11$ = _ref11[0],
                clientX = _ref11$.clientX,
                clientY = _ref11$.clientY,
                _ref11$2 = _ref11[1],
                startX = _ref11$2.clientX,
                startY = _ref11$2.clientY;

            return abs(startY - clientY) < _this2.threshold && abs(startX - clientX) < _this2.threshold;
          }), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref12) {
            var _ref13 = observables__slicedToArray(_ref12, 2),
                _ref13$ = _ref13[0],
                clientX = _ref13$.clientX,
                clientY = _ref13$.clientY,
                _ref13$2 = _ref13[1],
                startX = _ref13$2.clientX,
                startY = _ref13$2.clientY;

            return abs(startX - clientX) >= abs(startY - clientY);
          }));

          // If the threshold option is set to `0` (or `false`) we make a decision immediately.
          // This is intended for Safari and possibly other browsers that have a built-in threshold.
          // Additionally, Safari ignores all calls to `preventDefault`, except on the first move event
          // after a start event, so that we *have to* make a decision immediately.
        } else {
          return move$.pipe(/* Cannot get final name for export "withLatestFrom" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(start$), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref14) {
            var _ref15 = observables__slicedToArray(_ref14, 2),
                _ref15$ = _ref15[0],
                clientX = _ref15$.clientX,
                clientY = _ref15$.clientY,
                event = _ref15$.event,
                _ref15$2 = _ref15[1],
                startX = _ref15$2.clientX,
                startY = _ref15$2.clientY;

            var isSliding = abs(startX - clientX) >= abs(startY - clientY);
            if (_this2.preventDefault && isSliding) event.preventDefault();
            return isSliding;
          }));
        }
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/mixin/setup.js
var setup__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var setup__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function setup__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function setup__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function setup__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / setup.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// As mentioned before, we only import the RxJS function that we need.
















// ### Setup observables
// This function sets up the observable "pipeline".
var setup_setupObservablesMixin = function setupObservablesMixin(C) {
  return function (_baseObservablesMixin) {
    setup__inherits(_class, _baseObservablesMixin);

    function _class() {
      setup__classCallCheck(this, _class);

      return setup__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    setup__createClass(_class, [{
      key: "setupObservables",
      value: function setupObservables() {
        var _this2 = this;

        // An observable of resize events.
        var resize$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(window, "resize", { passive: true }).pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(), /* Cannot get final name for export "startWith" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined({}));

        // Keep measurements up-to-date.
        // Note that we need to temporarily remove the opened class to get the correct measures.
        resize$.pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect)).subscribe(function () {
          if (_this2.opened) _this2.contentEl.classList.remove("hy-drawer-opened");
          _this2.drawerWidth = _this2.calcMovableDrawerWidth();
          if (_this2.opened) _this2.contentEl.classList.add("hy-drawer-opened");
        });

        // Emitts a value every time you change the `persistent` property of the drawer.
        // Interally, we invert it and call it `active`.
        var active$ = this.subjects.persistent.pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (x) {
          return !x;
        }));

        // #### Start observable
        // Emits a value every time a start event *could* intiate an interaction.
        // Each emitted value is a hash containing a `clientX` and `clientY` key.
        var start$ = this.getStartObservable().pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect), /* Cannot get final name for export "filterWhen" in "./node_modules/hy-drawer/src/mixin/calc.js" (known exports: calcMixin, known reexports: ) */ undefined(active$), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

        // An observable that emits `true`, as long as the drawer isn't fully closed
        // (as long as the scrim is visible the user can still "catch" the drawer).
        // It references the yet-to-be-defined `translateX` obsevable, so we wrap it inside a `defer`.
        var isScrimVisible$ = /* Cannot get final name for export "defer" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(function () {
          return _this2.translateX$.pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (translateX) {
            return _this2.align === "left" ? translateX > 0 : translateX < _this2.drawerWidth;
          }));
        });

        // TODO: ...
        var isInRange$ = start$.pipe(/* Cannot get final name for export "withLatestFrom" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(isScrimVisible$), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref) {
          var _ref2 = setup__slicedToArray(_ref, 2),
              clientX = _ref2[0].clientX,
              isScrimVisible = _ref2[1];

          return _this2.calcIsInRange(clientX, isScrimVisible);
        }), /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (inRange) {
          if (inRange) {
            if (_this2.mouseEvents) _this2.contentEl.classList.add("hy-drawer-grabbing");
            _this2.prepareInteraction();
          }
        }), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

        // #### End observable
        // The observable of all relevant "end" events, i.e. the last `touchend` (or `mouseup`),
        var end$ = this.getEndObservable().pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect), /* Cannot get final name for export "filterWhen" in "./node_modules/hy-drawer/src/mixin/calc.js" (known exports: calcMixin, known reexports: ) */ undefined(active$, isInRange$), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

        // #### Move observable
        // The observable of all relevant "move" events.
        var move$ = this.getMoveObservable(start$, end$).pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect), /* Cannot get final name for export "filterWhen" in "./node_modules/hy-drawer/src/mixin/calc.js" (known exports: calcMixin, known reexports: ) */ undefined(active$, isInRange$), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

        // #### 'Is sliding?' observable
        // An observable that emits `true` when the user is *sliding* the drawer,
        // (i.e. moving the finger along the x-axis), or `false` when *scrolling* the page
        // (i.e. moving the finger along the y-axis), and `undefined` while we aren't sure yet.
        //
        // See [`getIsSlidingObservable`](./observables.md#get-is-sliding-observable).
        var isSliding$ = this.getIsSlidingObservable(move$, start$, end$).pipe(/* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (isSliding) {
          if (isSliding) _this2.fireEvent("slidestart", { detail: _this2.opened });
        }));

        // #### Translate X observable
        // The `translateX` observable is the central observable of this component.
        // It emits the current x-coordinate of the drawer, which
        // can be modified by either of 3 incoming observables:
        //
        // 1. the animation/tween observable, and
        // 2. The move observable (the user's finger/mouse moving across the screen),
        // 3. direct modifications of the `opened` state.
        //
        // It is wrapped in a `defer` because it depends on previous values of itself.
        this.translateX$ = /* Cannot get final name for export "defer" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(function () {
          return /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(
          // 1)
          // The tween observable can be used unmodified (see below),
          // but isn't defined yet, because it depends on previous values of `translateX$`.
          _this2.tween$,

          // 2)
          // We only let move events modify the drawer's position when we are sure
          // that the user is sliding. In case the `preventDefault` option is enabled,
          // this is also when we're sure to call `preventDefault`.
          move$.pipe(/* Cannot get final name for export "filterWhen" in "./node_modules/hy-drawer/src/mixin/calc.js" (known exports: calcMixin, known reexports: ) */ undefined(isSliding$), /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref3) {
            var event = _ref3.event;

            if (_this2.preventDefault) event.preventDefault();
          }), /* Cannot get final name for export "observeOn" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(/* Cannot get final name for export "animationFrameScheduler" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined),
          // Finally, we take the start position of the finger, the start position of the drawer,
          // and the current position of the finger to calculate the next `translateX` value.
          /* Cannot get final name for export "withLatestFrom" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(start$, _this2.startTranslateX$), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref4) {
            var _ref5 = setup__slicedToArray(_ref4, 3),
                clientX = _ref5[0].clientX,
                startX = _ref5[1].clientX,
                startTranslateX = _ref5[2];

            return _this2.calcTranslateX(clientX, startX, startTranslateX);
          })),

          // 3)
          // When the `opened` state changes, we "jump" to the new position,
          // which is either 0 (when closed) or the width of the drawer (when open).
          /* Cannot get final name for export "combineLatest" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(_this2.subjects.opened, _this2.subjects.align).pipe(
          // Usually the cleanup code would run at the end of the fling animation,
          // but since there is no animation in this case, we call it directly.
          /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref6) {
            var _ref7 = setup__slicedToArray(_ref6, 1),
                opened = _ref7[0];

            return _this2.cleanupInteraction(opened);
          }), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref8) {
            var _ref9 = setup__slicedToArray(_ref8, 2),
                opened = _ref9[0],
                align = _ref9[1];

            return !opened ? 0 : _this2.drawerWidth * (align === "left" ? 1 : -1);
          })));
        })
        // `share`ing the observable between many subscribers:
        .pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

        // The `translateX` value at the start of an interaction.
        // Typically this would be either 0 or `drawerWidth`, but since the user can initiate
        // an interaction *during the animation*, it could also be any value inbetween.
        // We obtain it by sampling the translate-x observable at the beginning of each interaction.
        this.startTranslateX$ = this.translateX$.pipe(/* Cannot get final name for export "sample" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(start$));

        // #### Tween observable
        // For the tween animations we first need an observable that tracks
        // the current velocity of the drawer,
        // which we will use to determine whether the drawer should flinging in its direction,
        // or snap back into place.
        var velocity$ = this.translateX$.pipe(/* Cannot get final name for export "timestamp" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(), /* Cannot get final name for export "pairwise" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(),
        // Since we are at the mercy of the browser firing move events,
        // we make sure that some time has passed since the last move event.
        /* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref10) {
          var _ref11 = setup__slicedToArray(_ref10, 2),
              prevTime = _ref11[0].timestamp,
              time = _ref11[1].timestamp;

          return time - prevTime > 0;
        }),
        // Now we are save to calculate the current velocity without divide by zero errors.
        /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref12) {
          var _ref13 = setup__slicedToArray(_ref12, 2),
              _ref13$ = _ref13[0],
              prevX = _ref13$.value,
              prevTime = _ref13$.timestamp,
              _ref13$2 = _ref13[1],
              x = _ref13$2.value,
              time = _ref13$2.timestamp;

          return (x - prevX) / (time - prevTime);
        }),
        // The initial velocity is zero.
        /* Cannot get final name for export "startWith" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(0));

        // TODO
        var willOpen$ = end$.pipe(/* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
          return _this2.contentEl.classList.remove("hy-drawer-grabbing");
        }), /* Cannot get final name for export "withLatestFrom" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(start$, this.translateX$, velocity$), /* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.calcIsSwipe.bind(this)), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.calcWillOpen.bind(this)),
        // TODO: only fire `slideend` event when slidestart fired as well?
        /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (willOpen) {
          return _this2.fireEvent("slideend", { detail: willOpen });
        }));

        // There are 2 things that can trigger an animation:
        // 1. The end of an interaction, i.e. the user releases the finger/mouse while moving the slider.
        // 2. A call to a method like `open` or `close` (represented by a value on the animate observable)
        //    Note that we call `prepareInteraction` manually here, because it wasn't triggered by a
        //    prior `touchdown`/`mousedown` event in this case.
        var tweenTrigger$ = /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(willOpen$, this.animateTo$.pipe(/* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.prepareInteraction.bind(this))));

        // We silently set the new `opened` state here,
        // so that the next interaction will do the right thing even while the animation is
        // still playing, e.g. a call to `toggle` will cancel the current animation
        // and initiate an animation to the opposite state.
        this.tween$ = tweenTrigger$.pipe(/* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (willOpen) {
          return _this2.setInternalState("opened", willOpen);
        }),
        // By using `switchMap` we ensure that subsequent events that trigger an animation
        // don't cause more than one animation to be played at a time.
        /* Cannot get final name for export "withLatestFrom" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.translateX$), /* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref14) {
          var _ref15 = setup__slicedToArray(_ref14, 2),
              opened = _ref15[0],
              translateX = _ref15[1];

          // We return a tween observable that runs cleanup code when it completes
          // --- unless a new interaction is initiated, in which case it is canceled.
          var inv = _this2.align === "left" ? 1 : -1;
          var endTranslateX = opened ? _this2.drawerWidth * inv : 0;
          var diffTranslateX = endTranslateX - translateX;
          var duration = /* Cannot get final name for export "BASE_DURATION" in "./node_modules/hy-drawer/src/mixin/operators.js" (known exports: subscribeWhen filterWhen, known reexports: ) */ undefined + _this2.drawerWidth * /* Cannot get final name for export "WIDTH_CONTRIBUTION" in "./node_modules/hy-drawer/src/mixin/operators.js" (known exports: subscribeWhen filterWhen, known reexports: ) */ undefined;

          return /* Cannot get final name for export "createTween" in "./node_modules/hy-drawer/src/common.js" (known exports: easeOutSine, known reexports: ) */ undefined(/* Cannot get final name for export "easeOutSine" in "./node_modules/hy-drawer/src/mixin/constants.js" (known exports: BASE_DURATION WIDTH_CONTRIBUTION VELOCITY_THRESHOLD, known reexports: ) */ undefined, translateX, diffTranslateX, duration).pipe(/* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined({ complete: function complete() {
              return _this2.subjects.opened.next(opened);
            } }), /* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(start$), /* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(_this2.subjects.align.pipe(/* Cannot get final name for export "skip" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(1))), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());
        }));

        // #### Subscriptions
        // Now we are ready to cause some side effects.
        //
        // The end result is always to update the (shadow) DOM, which happens here.
        // Note that the call to subscribe sets the whole process in motion,
        // and causes the code inside the above `defer` observables to run.
        this.translateX$.subscribe(this.updateDOM.bind(this));

        // A click on the scrim should close the drawer.
        /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(this.scrimEl, "click").pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect)).subscribe(function () {
          return _this2.close();
        });

        // Other than preventing sliding, setting `persistent` will also hide the scrim.
        active$.pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect)).subscribe(function (active) {
          _this2.scrimEl.style.display = active ? "block" : "none";
        });

        // Whenever the alignment of the drawer changes, update the CSS classes.
        this.subjects.align.pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect)).subscribe(function (align) {
          _this2.contentEl.classList.remove("hy-drawer-left");
          _this2.contentEl.classList.remove("hy-drawer-right");
          _this2.contentEl.classList.add("hy-drawer-" + align);
        });

        // If the experimental back button feature is enabled, handle popstate events...
        /*
          fromEvent(window, 'popstate')
            .pipe(
              takeUntil(this.subjects.disconnect),
              subscribeWhen(this.backButton$),
            )
            .subscribe(() => {
              const hash = `#${histId.call(this)}--opened`;
              const willOpen = window.location.hash === hash;
              if (willOpen !== this.opened) this.animateTo$.next(willOpen);
            });
          */

        // When drawing with mouse is enabled, we add the grab cursor to the drawer.
        // We also want to call `preventDefault` when `mousedown` is within the drawer range
        // to prevent text selection while sliding.
        this.subjects.mouseEvents.pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect), /* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (mouseEvents) {
          if (mouseEvents) _this2.contentEl.classList.add("hy-drawer-grab");else _this2.contentEl.classList.remove("hy-drawer-grab");

          return mouseEvents ? start$.pipe(/* Cannot get final name for export "withLatestFrom" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(isInRange$)) : /* Cannot get final name for export "never" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined();
        })).subscribe(function (_ref16) {
          var _ref17 = setup__slicedToArray(_ref16, 2),
              event = _ref17[0].event,
              isInRange = _ref17[1];

          if (isInRange && event) event.preventDefault();
        });

        // Now we set the initial opend state.
        // If the experimental back button feature is enabled, we check the location hash...
        /*
          if (this._backButton) {
            const hash = `#${histId.call(this)}--opened`;
            if (window.location.hash === hash) this.setInternalState('opened', true);
          }
          */

        // Firing an event to let the outside world know the drawer is ready.
        this.fireEvent("init", { detail: this.opened });
      }
    }]);

    return _class;
  }(/* Cannot get final name for export "baseObservablesMixin" in "./node_modules/hy-drawer/src/mixin/setup.js" (known exports: setupObservablesMixin, known reexports: ) */ undefined(/* Cannot get final name for export "updateMixin" in "./node_modules/hy-drawer/src/mixin/observables.js" (known exports: baseObservablesMixin, known reexports: ) */ undefined(/* Cannot get final name for export "calcMixin" in "./node_modules/hy-drawer/src/mixin/update.js" (known exports: updateMixin, known reexports: ) */ undefined(C))));
};
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/mixin/index.js
var mixin__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var mixin__get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function mixin__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function mixin__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function mixin__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// # src / mixin / index.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ## Overview
// This component is written in [RxJS] and reading its code requires some basic understanding
// of how RxJS works. It may also serve as an example of how to use RxJS.
//
// Other than RxJS, you should be familiar with [ES6 Mixin][esmixins],
// which is a clever way of using the ES6 class syntax to achieve inheritance-based mixins.
// The mixin in the main export of this file.

// ## Imports
// ES6+ functions that we use.
// import 'core-js/fn/array/from';
// import 'core-js/fn/function/bind';

// Importing the hy-compontent base libary,
// which helps with making multiple versions of the component (Vanilla JS, WebComponent, etc...).






// TODO


// A set of [Modernizr] tests that are required for this component to work.
var MIXIN_FEATURE_TESTS = new /* Cannot get final name for export "Set" in "./node_modules/hy-component/src/rxjs.js" (known exports: rxjsMixin, known reexports: ) */ undefined([].concat(_toConsumableArray(/* Cannot get final name for export "COMPONENT_FEATURE_TESTS" in "./node_modules/hy-component/src/rxjs.js" (known exports: rxjsMixin, known reexports: ) */ undefined), ["eventlistener", "queryselector", "requestanimationframe", "classlist", "opacity", "csstransforms", "csspointerevents"]));



// ## Drawer Mixin
var mixin_drawerMixin = function drawerMixin(C) {
  return function (_setupObservablesMixi) {
    mixin__inherits(_class, _setupObservablesMixi);

    function _class() {
      mixin__classCallCheck(this, _class);

      return mixin__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    mixin__createClass(_class, [{
      key: "setupComponent",


      // ### Setup
      // Overriding the setup function.
      value: function setupComponent(el, props) {
        mixin__get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "setupComponent", this).call(this, el, props);

        this.animateTo$ = new /* Cannot get final name for export "Subject" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined();

        // Cache DOM elements.
        this.scrimEl = this.sroot.querySelector(".hy-drawer-scrim");
        this.contentEl = this.sroot.querySelector(".hy-drawer-content");

        // Set the initial alignment class.
        this.contentEl.classList.add("hy-drawer-" + this.align);
      }

      // Calling the [setup observables function](./setup.md) function.

    }, {
      key: "connectComponent",
      value: function connectComponent() {
        this.setupObservables();

        // TODO: meh..
        mixin__get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "connectComponent", this).call(this);
      }

      // ### Methods
      // Public methods of this component. See [Methods](../../methods.md) for more.

    }, {
      key: "open",
      value: function open() {
        var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (animated) this.animateTo$.next(true);else this.opened = true;
      }
    }, {
      key: "close",
      value: function close() {
        var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (animated) this.animateTo$.next(false);else this.opened = false;
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (animated) this.animateTo$.next(!this.opened);else this.opened = !this.opened;
      }
    }], [{
      key: "componentName",

      // The name of the component (required by hy-component)
      get: function get() {
        return "hy-drawer";
      }

      // ### Options
      // The default values (and types) of the configuration options (required by hy-component)
      // See [Options](../../options.md) for usage information.

    }, {
      key: "types",
      get: function get() {
        return {
          opened: /* Cannot get final name for export "bool" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined,
          align: /* Cannot get final name for export "oneOf" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined(["left", "right"]),
          persistent: /* Cannot get final name for export "bool" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined,
          range: /* Cannot get final name for export "arrayOf" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined(/* Cannot get final name for export "number" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined),
          threshold: /* Cannot get final name for export "number" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined,
          preventDefault: /* Cannot get final name for export "bool" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined,
          mouseEvents: /* Cannot get final name for export "bool" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined
        };
      }
    }, {
      key: "defaults",
      get: function get() {
        return {
          opened: false,
          align: "left",
          persistent: false,
          range: [0, 100],
          threshold: 10,
          preventDefault: false,
          mouseEvents: false
        };
      }
    }]);

    return _class;
  }(/* Cannot get final name for export "setupObservablesMixin" in "./node_modules/hy-drawer/src/mixin/index.js" (known exports: MIXIN_FEATURE_TESTS drawerMixin, known reexports: Set) */ undefined(/* Cannot get final name for export "rxjsMixin" in "./node_modules/attr-types/array.js" (known exports: array default, known reexports: ) */ undefined(/* Cannot get final name for export "componentMixin" in "./node_modules/hy-component/src/rxjs.js" (known exports: rxjsMixin, known reexports: ) */ undefined(C))));
};

// [rxjs]: https://github.com/ReactiveX/rxjs
// [esmixins]: http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
// [modernizr]: https://modernizr.com/
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/vanilla/index.js
var vanilla__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function vanilla__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function vanilla__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function vanilla__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / vanilla / index.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// import 'core-js/fn/array/from';







var VANILLA_FEATURE_TESTS = /* Cannot get final name for export "MIXIN_FEATURE_TESTS" in "./node_modules/hy-drawer/src/vanilla/index.js" (known exports: VANILLA_FEATURE_TESTS HyDrawer, known reexports: Set) */ undefined;



var vanilla_HyDrawer = function (_drawerMixin) {
  vanilla__inherits(HyDrawer, _drawerMixin);

  function HyDrawer() {
    vanilla__classCallCheck(this, HyDrawer);

    return vanilla__possibleConstructorReturn(this, (HyDrawer.__proto__ || Object.getPrototypeOf(HyDrawer)).apply(this, arguments));
  }

  vanilla__createClass(HyDrawer, [{
    key: "setupShadowDOM",
    value: function setupShadowDOM(el) {
      if (!el) throw Error("No element provided");

      var df = new DocumentFragment();
      df.appendChild(/* Cannot get final name for export "createElement" in "./node_modules/hy-component/src/component.js" (known exports: COMPONENT_FEATURE_TESTS componentMixin, known reexports: Set) */ undefined("div", { class: "hy-drawer-scrim" }));
      df.appendChild(/* Cannot get final name for export "createElement" in "./node_modules/hy-component/src/component.js" (known exports: COMPONENT_FEATURE_TESTS componentMixin, known reexports: Set) */ undefined("div", { class: "hy-drawer-content" }, el.children));

      el.appendChild(df);

      return el;
    }
  }]);

  return HyDrawer;
}(/* Cannot get final name for export "drawerMixin" in "./node_modules/hy-drawer/src/vanilla/index.js" (known exports: VANILLA_FEATURE_TESTS HyDrawer, known reexports: Set) */ undefined(/* Cannot get final name for export "VanillaComponent" in "./node_modules/create-element-x/factory.js" (known exports: createCreateElement default, known reexports: ) */ undefined));
// CONCATENATED MODULE: ./node_modules/hy-component/src/common.js
// # src / common.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
// Licensed under MIT

/* eslint-disable no-plusplus */

function parseType(type, attr) {
  if (true && !type) {
    return console.warn("No type provided for attribute " + attr + ".");
  }
  return type ? type(attr) : attr;
}

function decamelize(str) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";

  return str.replace(/([a-z\d])([A-Z])/g, "$1" + sep + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + sep + "$2").toLowerCase();
}

function preserveCamelCase(strarg) {
  var str = strarg;
  var isLastCharLower = false;
  var isLastCharUpper = false;
  var isLastLastCharUpper = false;

  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i);

    if (isLastCharLower && /[a-zA-Z]/.test(c) && c.toUpperCase() === c) {
      str = str.substr(0, i) + "-" + str.substr(i);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i++;
    } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(c) && c.toLowerCase() === c) {
      str = str.substr(0, i - 1) + "-" + str.substr(i - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = c.toLowerCase() === c;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = c.toUpperCase() === c;
    }
  }

  return str;
}

function camelCase() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var str = [].map.call(args, function (x) {
    return x.trim();
  }).filter(function (x) {
    return x.length;
  }).join("-");

  if (str.length === 0) {
    return "";
  }

  if (str.length === 1) {
    return str.toLowerCase();
  }

  str = preserveCamelCase(str);

  return str.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
    return p1.toUpperCase();
  });
}
// CONCATENATED MODULE: ./node_modules/hy-component/src/custom-element.js
var custom_element__get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var custom_element__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function custom_element__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function custom_element__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function custom_element__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function custom_element__toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// # src / custom-element.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
// Licensed under MIT

// import 'core-js/fn/array/for-each';
// import 'core-js/fn/array/from';
// import 'core-js/fn/array/map';
// import 'core-js/fn/number/constructor';
// import 'core-js/fn/object/keys';
// import 'core-js/fn/object/set-prototype-of';
// import 'core-js/fn/reflect/construct';
// import 'core-js/fn/string/trim'; // used by camelcase








var CUSTOM_ELEMENT_FEATURE_TESTS = new _Set([].concat(custom_element__toConsumableArray(/* Cannot get final name for export "COMPONENT_FEATURE_TESTS" in "./node_modules/hy-component/src/rxjs.js" (known exports: rxjsMixin, known reexports: ) */ undefined), ["template", "customelements"]));

var circutBreaker = null;

var custom_element_customElementMixin = function customElementMixin(C) {
  return function (_C) {
    custom_element__inherits(_class, _C);

    custom_element__createClass(_class, null, [{
      key: "getObservedAttributes",
      value: function getObservedAttributes() {
        var types = this.types;

        return Object.keys(types).map(function (x) {
          return /* Cannot get final name for export "decamelize" in "./node_modules/hy-component/src/custom-element.js" (known exports: CUSTOM_ELEMENT_FEATURE_TESTS customElementMixin CustomElement fragmentFromString, known reexports: Set) */ undefined(x);
        });
      }
    }]);

    function _class() {
      var _ref;

      custom_element__classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = custom_element__possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

      _this.setupComponent(_this, _this.getStateFromAttributes());
      return _this;
    }

    custom_element__createClass(_class, [{
      key: "reflectAttribute",
      value: function reflectAttribute(key, val) {
        var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var attrName = /* Cannot get final name for export "decamelize" in "./node_modules/hy-component/src/custom-element.js" (known exports: CUSTOM_ELEMENT_FEATURE_TESTS customElementMixin CustomElement fragmentFromString, known reexports: Set) */ undefined(key);

        if (silent) circutBreaker = attrName;

        var types = this.constructor.types;

        var type = types[key];

        if (true && (!type || !type.stringify)) {
          console.warn("No type provided for key '" + key + "'");
        }

        var attr = type.stringify(val);

        if (attr == null) {
          this.removeAttribute(attrName);
        } else {
          this.setAttribute(attrName, attr);
        }
      }

      /*
      reflectAttributes() {
        const { types } = this.constructor;
        Object.keys(types).forEach(key => this.reflectAttribute(key, this[key], true));
      }
      */

    }, {
      key: "getStateFromAttributes",
      value: function getStateFromAttributes() {
        var _this2 = this;

        var types = this.constructor.types;


        var state = {};
        Object.keys(types).forEach(function (key) {
          var attrName = /* Cannot get final name for export "decamelize" in "./node_modules/hy-component/src/custom-element.js" (known exports: CUSTOM_ELEMENT_FEATURE_TESTS customElementMixin CustomElement fragmentFromString, known reexports: Set) */ undefined(key);
          var attr = _this2.hasAttribute(attrName) ? _this2.getAttribute(attrName) : null;
          var value = /* Cannot get final name for export "parseType" in "./node_modules/hy-component/src/custom-element.js" (known exports: CUSTOM_ELEMENT_FEATURE_TESTS customElementMixin CustomElement fragmentFromString, known reexports: Set) */ undefined(types[key], attr);
          if (value != null) state[key] = value;
        });

        return state;
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        /* this.reflectAttributes(); */
        this.connectComponent();
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.disconnectComponent();
      }
    }, {
      key: "adoptedCallback",
      value: function adoptedCallback() {
        this.adoptComponent();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attrName, oldAttr, attr) {
        if (circutBreaker === attrName) circutBreaker = null;else if (oldAttr !== attr) {
          var types = this.constructor.types;


          var key = /* Cannot get final name for export "camelCase" in "./node_modules/hy-component/src/custom-element.js" (known exports: CUSTOM_ELEMENT_FEATURE_TESTS customElementMixin CustomElement fragmentFromString, known reexports: Set) */ undefined(attrName);
          var value = /* Cannot get final name for export "parseType" in "./node_modules/hy-component/src/custom-element.js" (known exports: CUSTOM_ELEMENT_FEATURE_TESTS customElementMixin CustomElement fragmentFromString, known reexports: Set) */ undefined(types[key], attr);

          this[key] = value != null ? value : this.constructor.defaults[key];
        }
      }
    }, {
      key: "setInternalState",
      value: function setInternalState(key, value) {
        custom_element__get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "setInternalState", this).call(this, key, value);
        this.reflectAttribute(key, value, true);
      }
    }, {
      key: "setupShadowDOM",
      value: function setupShadowDOM(el) {
        var instance = this.getTemplate();
        if (instance) {
          if ("attachShadow" in Element.prototype) {
            el.attachShadow({ mode: "open" });
            el.shadowRoot.appendChild(instance);
            return el.shadowRoot;
          }
          if (true) console.warn("Component doesnt define a template. Intentional?");
          throw Error("ShadowDOM API not supported");
        }
        return el;
      }
    }, {
      key: "getEl",
      value: function getEl() {
        return this;
      }
    }, {
      key: "getTemplate",
      value: function getTemplate() {
        var componentName = this.constructor.componentName;

        return document.querySelector("link[href*=\"" + componentName + "\"]").import.querySelector("#" + componentName + "-template").content.cloneNode(true);
      }
    }, {
      key: "template",
      get: function get() {
        return this.getTemplate();
      }
    }]);

    return _class;
  }(C);
};

// This is a drop-in replacement for `HTMLElement` which is compatible with babel.
function CustomElement() {
  var HTMLElement = typeof window.HTMLElement === "function" ? window.HTMLElement : function () {};
  return Reflect.construct(HTMLElement, [], this.__proto__.constructor); // eslint-disable-line
}

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(CustomElement.prototype, HTMLElement.prototype);
  Object.setPrototypeOf(CustomElement, HTMLElement);
}

// TODO
function fragmentFromString(strHTML) {
  return document.createRange().createContextualFragment(strHTML);
}
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/webcomponent/template.js
var template = "<div class=\"hy-drawer-scrim\"></div> <div class=\"hy-drawer-content\"> <slot></slot> </div> <style> @media screen { .hy-drawer-scrim { position: fixed; top: 0; left: 0; height: 100vh; width: 100vw; z-index: 20; opacity: 0; pointer-events: none; background: rgba(0, 0, 0, 0.5); transform: translateX(0); -webkit-tap-highlight-color: transparent; } .hy-drawer-content { position: fixed; top: 0; height: 100vh; z-index: 30; overflow-x: hidden; overflow-y: auto; transform: translateX(0); width: 300px; background: #e8e8e8; box-shadow: 0 0 15px rgba(0, 0, 0, 0.25); contain: strict; -webkit-overflow-scrolling: touch; } .hy-drawer-content.hy-drawer-left { left: -300px; } .hy-drawer-content.hy-drawer-right { right: -300px; } .hy-drawer-content.hy-drawer-left.hy-drawer-opened { left: 0 !important; transform: translateX(0) !important; } .hy-drawer-content.hy-drawer-right.hy-drawer-opened { right: 0 !important; transform: translateX(0) !important; } .hy-drawer-grab { cursor: move; cursor: -webkit-grab; cursor: -moz-grab; cursor: grab; } .hy-drawer-grabbing { cursor: -webkit-grabbing; cursor: -moz-grabbing; cursor: grabbing; } } @media print { .hy-drawer-scrim { display: none !important; } .hy-drawer-content { transform: none !important; } } @media screen { .hy-drawer-content { @apply --hy-drawer-content-container; width: var(--hy-drawer-width, 300px); background: var(--hy-drawer-background, #e8e8e8); box-shadow: var(--hy-drawer-box-shadow, 0 0 15px rgba(0, 0, 0, 0.25)); z-index: var(--hy-drawer-z-index, 30); } .hy-drawer-content.hy-drawer-left { left: calc( -1 * var(--hy-drawer-slide-width, var(--hy-drawer-width, 300px)) ); } .hy-drawer-content.hy-drawer-right { right: calc( -1 * var(--hy-drawer-slide-width, var(--hy-drawer-width, 300px)) ); } .hy-drawer-scrim { @apply --hy-drawer-scrim-container; background: var(--hy-drawer-scrim-background, rgba(0, 0, 0, 0.5)); z-index: var(--hy-drawer-scrim-z-index, 20); } } </style>";
// CONCATENATED MODULE: ./node_modules/hy-drawer/src/webcomponent/index.js
var webcomponent__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function webcomponent__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function webcomponent__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function webcomponent__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function webcomponent__toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// # src / webcomponent / index.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// import 'core-js/fn/array/from';

// We start by importing form the hy-component library...


// ...and our own component.


// Unlike the [HTML Import version](./html-import.md), this version bundles the template
// as a string.


// The set of Modernizr feature tests required for *this* version of the component.
var WEBCOMPONENT_FEATURE_TESTS = new /* Cannot get final name for export "Set" in "./node_modules/hy-drawer/src/webcomponent/template.js" (known exports: template, known reexports: ) */ undefined([].concat(webcomponent__toConsumableArray(/* Cannot get final name for export "CUSTOM_ELEMENT_FEATURE_TESTS" in "./node_modules/hy-drawer/src/webcomponent/template.js" (known exports: template, known reexports: ) */ undefined), webcomponent__toConsumableArray(/* Cannot get final name for export "MIXIN_FEATURE_TESTS" in "./node_modules/hy-drawer/src/vanilla/index.js" (known exports: VANILLA_FEATURE_TESTS HyDrawer, known reexports: Set) */ undefined)));



// The exported class follows the HTML naming convetion.
// It is a combination of the `CustomElement` class (a wrapper around `HTMLElement` that
// doesn't break when piped through the babel transformer),
// our [`drawerMixin`](../mixin/index.md),
// and the `customElementMixin`, which is part of hy-component and handles things like
// reflecting options as HTML attributes, etc...
var webcomponent_HyDrawerElement = function (_customElementMixin) {
  webcomponent__inherits(HyDrawerElement, _customElementMixin);

  function HyDrawerElement() {
    webcomponent__classCallCheck(this, HyDrawerElement);

    return webcomponent__possibleConstructorReturn(this, (HyDrawerElement.__proto__ || Object.getPrototypeOf(HyDrawerElement)).apply(this, arguments));
  }

  webcomponent__createClass(HyDrawerElement, [{
    key: "getTemplate",


    // We override the `getTemplate` method and return a document fragment
    // obtained from parsing the template string.
    value: function getTemplate() {
      return /* Cannot get final name for export "fragmentFromString" in "./node_modules/hy-drawer/src/webcomponent/template.js" (known exports: template, known reexports: ) */ undefined(/* Cannot get final name for export "template" in "./node_modules/hy-drawer/src/webcomponent/index.js" (known exports: WEBCOMPONENT_FEATURE_TESTS HyDrawerElement, known reexports: Set) */ undefined);
    }
  }], [{
    key: "observedAttributes",

    // The CustomElements spec demands that we provide a list of attributes (i.e. our options).
    get: function get() {
      return this.getObservedAttributes();
    }
  }]);

  return HyDrawerElement;
}(/* Cannot get final name for export "customElementMixin" in "./node_modules/hy-drawer/src/webcomponent/template.js" (known exports: template, known reexports: ) */ undefined(/* Cannot get final name for export "drawerMixin" in "./node_modules/hy-drawer/src/vanilla/index.js" (known exports: VANILLA_FEATURE_TESTS HyDrawer, known reexports: Set) */ undefined(/* Cannot get final name for export "CustomElement" in "./node_modules/hy-drawer/src/webcomponent/template.js" (known exports: template, known reexports: ) */ undefined)));
// EXTERNAL MODULE: ./node_modules/hy-drawer/src/style.css
var style = __webpack_require__(48);
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./_js/src/drawer.js
function drawer__toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// # src / drawer.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ## Includes
// First, we patch the environment with some ES6+ functions we intend to use.


// We include our main component, hy-drawer,
// in both the vanilla JS and the WebComponent version (will decide later which one to use).
// Since they share most of their code, it's not a big deal in terms of file size.




// Next, we include `Observable` and the RxJS functions we inted to use on it.


// And some of our own helper functions/constants.


// A list of Modernizr tests that are required for the drawer to work.
var drawer_REQUIREMENTS = new /* Cannot get final name for export "Set" in "./node_modules/hy-component/src/common.js" (known exports: parseType decamelize camelCase, known reexports: ) */ undefined([].concat(drawer__toConsumableArray(/* Cannot get final name for export "VANILLA_FEATURE_TESTS" in "./node_modules/hy-component/src/common.js" (known exports: parseType decamelize camelCase, known reexports: ) */ undefined), ['cssremunit', 'classlist', 'eventlistener', 'matchmedia']));

// HACK: hard-coded SCSS break-point.
var MEDIA_QUERY = '(min-width: 64em)';

// ## Functions
// TODO
function resizeCallback() {
  var isDesktop = window.matchMedia(MEDIA_QUERY).matches;
  if (window._isDesktop !== isDesktop) {
    window._isDesktop = isDesktop;
    window._drawer.persistent = isDesktop;
    window._drawer.opened = isDesktop;
  }
}

// Callback for clicking the menu btton. Will toggle the drawer when on mobile.
function menuClickClallback(e) {
  if (!window._isDesktop) {
    e.preventDefault();
    window._drawer.toggle();
  }
}

// Determins the range from which to draw the drawer in pixels, counted from the left edge.
// It depends on the browser, e.g. Safari has a native guesture when sliding form the side,
// so we ignore the first 35 pixels (roughly the range for the native guesture).
function getRange() {
  if (/* Cannot get final name for export "isMobileSafari" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined && !navigator.standalone) {
    return [35, 135];
  }
  return [0, 150];
}

// This function sets y-drawer up as a WebComponent.
// First it sets the options as HTML attributes, then it `define`s the WebComponent.
function setupWebComponent(drawerEl) {
  if (window._isDesktop) drawerEl.setAttribute('opened', '');
  if (window._isDesktop) drawerEl.setAttribute('persistent', '');
  drawerEl.setAttribute('align', 'left');
  drawerEl.setAttribute('range', getRange().join(','));
  drawerEl.setAttribute('threshold', /* Cannot get final name for export "isSafari" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined ? 0 : 10);
  drawerEl.setAttribute('prevent-default', '');

  customElements.define('hy-drawer', /* unused reexport */undefined);
  return drawerEl;
}

// This function sets y-drawer up as a vanilla JS class.
function setupVanilla(drawerEl) {
  return new /* Cannot get final name for export "HyDrawer" in "./node_modules/hy-component/src/common.js" (known exports: parseType decamelize camelCase, known reexports: ) */ undefined(drawerEl, {
    opened: window._isDesktop,
    persistent: window._isDesktop,
    align: 'left',
    range: getRange(),
    threshold: /* Cannot get final name for export "isSafari" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined ? 0 : 10,
    preventDefault: true
  });
}

// ## Main
// First, we determine if the drawer is enabled,
// and whether the current user agent meets our requirements.
// UC Browser has even more invasive native swipe guestures than iOS Safari,
// (that ignore `preventDefault` on top of that...),
// so we disable the component alltogether. UC Mini is fine though.
if (!window._noDrawer && /* Cannot get final name for export "hasFeatures" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined(drawer_REQUIREMENTS) && !/* Cannot get final name for export "isUCBrowser" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined) {
  // Now we get a hold of some DOM elements
  var drawer_drawerEl = document.getElementsByTagName('hy-drawer')[0];
  var menuEl = document.getElementById('_menu');

  // We check the media query to determine wheter the drawer is active or not
  window._isDesktop = window.matchMedia(MEDIA_QUERY).matches;

  // Now we create the component.
  // If we have Custom Elements and ShadowDOM (v1) we use the WebComponent.
  window._drawer = 'customElements' in window && 'attachShadow' in Element.prototype ? setupWebComponent(drawer_drawerEl) : setupVanilla(drawer_drawerEl);

  // Some styles change when the drawer is loaded.
  // TODO: Check if we still need this. Also, maybe make this part of the component itself?
  drawer_drawerEl.classList.add('loaded');

  // You can uncomment the code below to lock document scrolling while sliding.
  // However, it's not as good as `preventDefault`,
  // as it won't prevent most mobile browsers from showing/hiding their addressbar,
  // causing expensive reflows/repaints...
  // NOTE: iOS Safari ignores this completely.
  /*
  if (!isSafari) {
    drawerEl.addEventListener('hy-drawer-slidestart', () => {
      document.body.style.overflowY = 'hidden';
    });
      drawerEl.addEventListener('hy-drawer-slideend', () => {
      document.body.style.overflowY = '';
    });
  }
  */

  // Adding the click callback to the menu button.
  menuEl.addEventListener('click', menuClickClallback);

  // Adding the resize callback to the resize event, but with a small delay.
  /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(window, 'resize', { passive: true }).subscribe(resizeCallback);
}
// EXTERNAL MODULE: ./node_modules/core-js/fn/object/assign.js
var object_assign = __webpack_require__(53);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/core-js/fn/string/includes.js
var includes = __webpack_require__(63);
var includes_default = /*#__PURE__*/__webpack_require__.n(includes);

// CONCATENATED MODULE: ./node_modules/hy-push-state/src/url.js
// # src / url.js
// Copyright 2013 Erik Arvidsson
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var url_URL = window.URL;

if (!url_URL || !url_URL.prototype || !("href" in url_URL.prototype)) {
  url_URL = function URL(url, base) {
    if (!url) throw new TypeError("Invalid argument");

    var doc = document.implementation.createHTMLDocument("");
    if (base) {
      var baseElement = doc.createElement("base");
      baseElement.href = base;
      doc.head.appendChild(baseElement);
    }
    var anchorElement = doc.createElement("a");
    anchorElement.href = url;
    doc.body.appendChild(anchorElement);

    if (anchorElement.protocol === ":" || !/:/.test(anchorElement.href)) throw new TypeError("Invalid URL");

    Object.defineProperty(this, "_anchorElement", { value: anchorElement });
  };

  url_URL.prototype = {
    toString: function toString() {
      return this.href;
    },

    get href() {
      return this._anchorElement.href;
    },
    set href(value) {
      this._anchorElement.href = value;
    },

    get protocol() {
      return this._anchorElement.protocol;
    },
    set protocol(value) {
      this._anchorElement.protocol = value;
    },

    /* NOT IMPLEMENTED
    get username() {
      return this._anchorElement.username;
    },
    set username(value) {
      this._anchorElement.username = value;
    },
     get password() {
      return this._anchorElement.password;
    },
    set password(value) {
      this._anchorElement.password = value;
    },
     get origin() {
      return this._anchorElement.origin;
    }, */

    get host() {
      return this._anchorElement.host;
    },
    set host(value) {
      this._anchorElement.host = value;
    },

    get hostname() {
      return this._anchorElement.hostname;
    },
    set hostname(value) {
      this._anchorElement.hostname = value;
    },

    get port() {
      return this._anchorElement.port;
    },
    set port(value) {
      this._anchorElement.port = value;
    },

    get pathname() {
      return this._anchorElement.pathname;
    },
    set pathname(value) {
      this._anchorElement.pathname = value;
    },

    get search() {
      return this._anchorElement.search;
    },
    set search(value) {
      this._anchorElement.search = value;
    },

    get hash() {
      return this._anchorElement.hash;
    },
    set hash(value) {
      this._anchorElement.hash = value;
    }
  };

  var oldURL = window.URL || window.webkitURL || window.mozURL;

  url_URL.createObjectURL = function (blob) {
    return oldURL.createObjectURL.apply(oldURL, arguments);
  };

  url_URL.revokeObjectURL = function (url) {
    return oldURL.revokeObjectURL.apply(oldURL, arguments);
  };

  Object.defineProperty(url_URL.prototype, "toString", { enumerable: false });
}
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/common.js
// # src / common.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var matches = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector;

// Checks if this element or any of its parents matches a given `selector`.
function matchesAncestors(selector) {
  var curr = this;
  while (curr !== document && curr !== document.documentElement) {
    if (matches.call(curr, selector)) return curr;
    curr = curr.parentNode;
  }
  return null;
}

// Consider a URL external if either the protocol, hostname or port is different.
function isExternal(_ref) {
  var protocol = _ref.protocol,
      host = _ref.host;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;

  return protocol !== location.protocol || host !== location.host;
}

function isHash(_ref2) {
  var hash = _ref2.hash,
      origin = _ref2.origin,
      pathname = _ref2.pathname;
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;

  return hash !== "" && origin === location.origin && pathname === location.pathname;
}

function getScrollHeight() {
  var h = document.documentElement;
  var b = document.body;
  var sh = "scrollHeight";
  return h[sh] || b[sh];
}

function getScrollLeft() {
  return window.pageXOffset || document.body.scrollLeft;
}

function getScrollTop() {
  return window.pageYOffset || document.body.scrollTop;
}

function common_fragmentFromString(strHTML) {
  return document.createRange().createContextualFragment(strHTML);
}
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/constants.js
// # src / mixin / constants.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// These are some 'types' that we use throught the component.
// Going with strings here instead of classes + instanceof / dynamic dispatch for simplicity.
var constants_INIT = "init";
var HINT = "hint";
var PUSH = "push";
var POP = "pop";
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/operators.js
// # src / mixin / operators.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.





// ### Observable extensions
// #### Unsubscribe when
// This operator unsubscribes from the source observable when `pauser$` emits a truthy value,
// and re-subscribes when it emits a falsy value.
var operators_unsubscribeWhen = function unsubscribeWhen(pauser$) {
  return function (source) {
    if (true && !pauser$) throw Error();
    return pauser$.pipe(/* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (paused) {
      return paused ? /* Cannot get final name for export "never" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined() : source;
    }));
  };
};

// #### Custom subscribe
// A custom subscribe function that will `recover` from an error and log it to the console.
// This is a line of last defense to make sure the entire pipeline/page doesn't crash.
/*
function subscribe(ne, er, co) {
  let res = this;
  if (process.env.DEBUG) res = this.pipe(tap({ error: e => console.error(e) }));
  return res
    .pipe(catchError((e, c) => c))
    .subscribe(ne, er, co);
}
*/
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/methods.js
var methods__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var methods__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function methods__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function methods__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function methods__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / methods.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.






// ## Functions
// What you will notice about the following helper functions is that many make reference to `this`.
// This is because they are invoked with the `::` operator, binding `this` to the component,
// effectively turning them into (private) methods. Since the final export is a mixin,
// we want to avoid potentially conflicting names as much as possible.

var methods_helperMixin = function helperMixin(C) {
  return function (_C) {
    methods__inherits(_class, _C);

    function _class() {
      methods__classCallCheck(this, _class);

      return methods__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    methods__createClass(_class, [{
      key: "histId",

      // Returns an identifier to mark frames on the history stack.
      value: function histId() {
        return this.el.id || this.constructor.componentName;
      }

      // ### Event filters

    }, {
      key: "shouldLoadAnchor",
      value: function shouldLoadAnchor(anchor, hrefRegex) {
        return anchor && anchor.target === "" && (!hrefRegex || anchor.href.search(hrefRegex) !== -1);
      }
    }, {
      key: "isPushEvent",
      value: function isPushEvent(_ref) {
        var url = _ref.url,
            anchor = _ref.anchor,
            _ref$event = _ref.event,
            metaKey = _ref$event.metaKey,
            ctrlKey = _ref$event.ctrlKey;

        return !metaKey && !ctrlKey && this.shouldLoadAnchor(anchor, this.hrefRegex) && !/* Cannot get final name for export "isExternal" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(url, this);
      }
    }, {
      key: "isHintEvent",
      value: function isHintEvent(_ref2) {
        var url = _ref2.url,
            anchor = _ref2.anchor;

        return this.shouldLoadAnchor(anchor, this.hrefRegex) && !/* Cannot get final name for export "isExternal" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(url, this) && !/* Cannot get final name for export "isHash" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(url, this);
      }

      // Determines if a pair of context's constitutes a hash change (vs. a page chagne)
      // We take as a hash change when the pathname of the URLs is the same,
      // and the `hash` isn't empty.

    }, {
      key: "isHashChange",
      value: function isHashChange(_ref3) {
        var _ref4 = methods__slicedToArray(_ref3, 2),
            prevPathname = _ref4[0].url.pathname,
            _ref4$ = _ref4[1],
            _ref4$$url = _ref4$.url,
            pathname = _ref4$$url.pathname,
            hash = _ref4$$url.hash,
            type = _ref4$.type;

        return pathname === prevPathname && (type === /* Cannot get final name for export "POP" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined || type === /* Cannot get final name for export "PUSH" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined && hash !== "");
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/scrolling.js
var scrolling__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function scrolling__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function scrolling__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function scrolling__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / scrolling.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.





// ### Managing scroll positions
// The following functions deal with managing the scroll position of the site.

var scrolling_scrollMixin = function scrollMixin(C) {
  return function (_C) {
    scrolling__inherits(_class, _C);

    function _class() {
      scrolling__classCallCheck(this, _class);

      return scrolling__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    scrolling__createClass(_class, [{
      key: "assignScrollPosition",

      // TODO: doc
      value: function assignScrollPosition(state) {
        var id = this.histId();
        return Object.assign(state, _defineProperty({}, id, Object.assign(state[id] || {}, {
          scrollTop: /* Cannot get final name for export "getScrollTop" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(),
          scrollHeight: /* Cannot get final name for export "getScrollHeight" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined()
        })));
      }

      // TODO

    }, {
      key: "manageScrollPostion",
      value: function manageScrollPostion(_ref) {
        var type = _ref.type,
            hash = _ref.url.hash;

        switch (type) {
          case /* Cannot get final name for export "PUSH" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined:
            // FIXME: make configurable
            this.scrollHashIntoView(hash, { behavior: "smooth", block: "start", inline: "nearest" });
            break;
          case /* Cannot get final name for export "POP" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined:
            {
              this.restoreScrollPostion();
              break;
            }
          case INIT:
            break;
          default:
            {
              if (true) console.warn("Type '" + type + "' not reconginzed.");
              break;
            }
        }
      }

      // Given a hash, find the element of the same id on the page, and scroll it into view.
      // If no hash is provided, scroll to the top instead.

    }, {
      key: "scrollHashIntoView",
      value: function scrollHashIntoView(hash, options) {
        if (hash) {
          var el = document.getElementById(hash.substr(1));
          if (el) el.scrollIntoView(options);else if (true) console.warn("Can't find element with id " + hash);
        } else {
          window.scroll(window.pageXOffset, 0);
        }
      }

      // Takes the current history state, and restores the scroll position.

    }, {
      key: "restoreScrollPostion",
      value: function restoreScrollPostion() {
        var id = this.histId();

        var _ref2 = window.history.state && window.history.state[id] || {},
            scrollTop = _ref2.scrollTop,
            scrollHeight = _ref2.scrollHeight;

        if (scrollTop != null) {
          // FIXME: Setting `min-height` to ensure that we can scroll back to the previous position?
          // FIXME: Use `attributeStyleMap`?
          /* document.body.style.minHeight = `${scrollHeight}px`; */
          window.scroll(window.pageXOffset, scrollTop);
        }
      }

      // Only restore position on page reload when the user hasn't started scorlling yet.

    }, {
      key: "restoreScrollPostionOnReload",
      value: function restoreScrollPostionOnReload() {
        var userHasScrolled = /* Cannot get final name for export "getScrollTop" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined() != 0;
        if (!userHasScrolled) this.restoreScrollPostion();
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/history.js
var history__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function history__defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function history__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function history__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function history__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / history.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ## Overview
// This file contains helper funtions related to managing the History API.

// ## Imports





var history_historyMixin = function historyMixin(C) {
  return function (_scrollMixin) {
    history__inherits(_class, _scrollMixin);

    function _class() {
      history__classCallCheck(this, _class);

      return history__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    history__createClass(_class, [{
      key: "updateHistoryState",

      // ## Update History state
      // add a new entry on the history stack, assuming the href is differnt.
      value: function updateHistoryState(_ref) {
        var type = _ref.type,
            replace = _ref.replace,
            href = _ref.url.href;

        if (/* Cannot get final name for export "isExternal" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(this)) return;

        switch (type) {
          case /* Cannot get final name for export "INIT" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined:
          case /* Cannot get final name for export "PUSH" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined:
            {
              var id = this.histId();
              var method = replace || href === window.location.href ? "replaceState" : "pushState";
              var state = Object.assign(window.history.state || {}, history__defineProperty({}, id, {}));
              window.history[method](state, document.title, href);
            }
          case /* Cannot get final name for export "POP" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined:
            break;
          default:
            {
              if (true) console.warn("Type '" + type + "' not reconginzed?");
              break;
            }
        }
      }

      // FIXME: use one updatehistory state function for both?

    }, {
      key: "updateHistoryStateHash",
      value: function updateHistoryStateHash(_ref2) {
        var type = _ref2.type,
            url = _ref2.url;

        if (/* Cannot get final name for export "isExternal" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(this)) return; // TODO: abort or not?

        if (type === /* Cannot get final name for export "PUSH" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined) {
          var id = this.histId();
          window.history.pushState(history__defineProperty({}, id, {}), document.title, url);
        }
      }
    }, {
      key: "updateHistoryTitle",
      value: function updateHistoryTitle(_ref3) {
        var type = _ref3.type,
            title = _ref3.title;

        document.title = title;

        if (!/* Cannot get final name for export "isExternal" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(this) && type === /* Cannot get final name for export "PUSH" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined) window.history.replaceState(window.history.state, title, window.location);
      }
    }, {
      key: "saveScrollPosition",
      value: function saveScrollPosition() {
        if (/* Cannot get final name for export "isExternal" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(this)) return;

        var state = this.assignScrollPosition(window.history.state || {});
        window.history.replaceState(state, document.title, window.location);
      }
    }]);

    return _class;
  }(/* Cannot get final name for export "scrollMixin" in "./node_modules/hy-push-state/src/mixin/history.js" (known exports: historyMixin, known reexports: ) */ undefined(C));
};
// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/internal/util/root.js
var root = __webpack_require__(68);

// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js
/** PURE_IMPORTS_START tslib,_.._util_root,_.._util_tryCatch,_.._util_errorObject,_.._Observable,_.._Subscriber,_.._operators_map PURE_IMPORTS_END */







function getCORSRequest() {
    if (/* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.XMLHttpRequest) {
        return new /* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.XMLHttpRequest();
    } else if (!!/* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.XDomainRequest) {
        return new /* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.XDomainRequest();
    } else {
        throw new Error('CORS is not supported by your browser');
    }
}
function getXMLHttpRequest() {
    if (/* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.XMLHttpRequest) {
        return new /* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.XMLHttpRequest();
    } else {
        var progId = void 0;
        try {
            var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
            for (var i = 0; i < 3; i++) {
                try {
                    progId = progIds[i];
                    if (new /* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.ActiveXObject(progId)) {
                        break;
                    }
                } catch (e) {}
            }
            return new /* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.ActiveXObject(progId);
        } catch (e) {
            throw new Error('XMLHttpRequest is not supported by your browser');
        }
    }
}
function ajaxGet(url, headers) {
    if (headers === void 0) {
        headers = null;
    }
    return new AjaxObservable_AjaxObservable({ method: 'GET', url: url, headers: headers });
}
function ajaxPost(url, body, headers) {
    return new AjaxObservable_AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
}
function ajaxDelete(url, headers) {
    return new AjaxObservable_AjaxObservable({ method: 'DELETE', url: url, headers: headers });
}
function ajaxPut(url, body, headers) {
    return new AjaxObservable_AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
}
function ajaxPatch(url, body, headers) {
    return new AjaxObservable_AjaxObservable({ method: 'PATCH', url: url, body: body, headers: headers });
}
var mapResponse = /*@__PURE__*//* Cannot get final name for export "map" in "./node_modules/rxjs/_esm5/internal/observable/bindCallback.js" (known exports: bindCallback, known reexports: ) */ undefined(function (x, index) {
    return x.response;
});
function ajaxGetJSON(url, headers) {
    return mapResponse(new AjaxObservable_AjaxObservable({
        method: 'GET',
        url: url,
        responseType: 'json',
        headers: headers
    }));
}
var AjaxObservable_AjaxObservable = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AjaxObservable, _super);
    function AjaxObservable(urlOrRequest) {
        var _this = _super.call(this) || this;
        var request = {
            async: true,
            createXHR: function createXHR() {
                return this.crossDomain ? getCORSRequest() : getXMLHttpRequest();
            },
            crossDomain: true,
            withCredentials: false,
            headers: {},
            method: 'GET',
            responseType: 'json',
            timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
            request.url = urlOrRequest;
        } else {
            for (var prop in urlOrRequest) {
                if (urlOrRequest.hasOwnProperty(prop)) {
                    request[prop] = urlOrRequest[prop];
                }
            }
        }
        _this.request = request;
        return _this;
    }
    AjaxObservable.prototype._subscribe = function (subscriber) {
        return new AjaxObservable_AjaxSubscriber(subscriber, this.request);
    };
    AjaxObservable.create = function () {
        var create = function create(urlOrRequest) {
            return new AjaxObservable(urlOrRequest);
        };
        create.get = ajaxGet;
        create.post = ajaxPost;
        create.delete = ajaxDelete;
        create.put = ajaxPut;
        create.patch = ajaxPatch;
        create.getJSON = ajaxGetJSON;
        return create;
    }();
    return AjaxObservable;
}(/* Cannot get final name for export "Observable" in "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js" (known exports: ObjectUnsubscribedError, known reexports: ) */ undefined);

var AjaxObservable_AjaxSubscriber = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AjaxSubscriber, _super);
    function AjaxSubscriber(destination, request) {
        var _this = _super.call(this, destination) || this;
        _this.request = request;
        _this.done = false;
        var headers = request.headers = request.headers || {};
        if (!request.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        if (!('Content-Type' in headers) && !(/* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.FormData && request.body instanceof /* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.FormData) && typeof request.body !== 'undefined') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        request.body = _this.serializeBody(request.body, request.headers['Content-Type']);
        _this.send();
        return _this;
    }
    AjaxSubscriber.prototype.next = function (e) {
        this.done = true;
        var _a = this,
            xhr = _a.xhr,
            request = _a.request,
            destination = _a.destination;
        var response = new AjaxResponse(e, xhr, request);
        destination.next(response);
    };
    AjaxSubscriber.prototype.send = function () {
        var _a = this,
            request = _a.request,
            _b = _a.request,
            user = _b.user,
            method = _b.method,
            url = _b.url,
            async = _b.async,
            password = _b.password,
            headers = _b.headers,
            body = _b.body;
        var createXHR = request.createXHR;
        var xhr = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(createXHR).call(request);
        if (xhr === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
            this.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
        } else {
            this.xhr = xhr;
            this.setupEvents(xhr, request);
            var result = void 0;
            if (user) {
                result = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(xhr.open).call(xhr, method, url, async, user, password);
            } else {
                result = /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(xhr.open).call(xhr, method, url, async);
            }
            if (result === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                this.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
                return null;
            }
            if (async) {
                xhr.timeout = request.timeout;
                xhr.responseType = request.responseType;
            }
            if ('withCredentials' in xhr) {
                xhr.withCredentials = !!request.withCredentials;
            }
            this.setHeaders(xhr, headers);
            result = body ? /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(xhr.send).call(xhr, body) : /* Cannot get final name for export "tryCatch" in "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js" (known exports: UnsubscriptionError, known reexports: ) */ undefined(xhr.send).call(xhr);
            if (result === /* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined) {
                this.error(/* Cannot get final name for export "errorObject" in "./node_modules/rxjs/_esm5/internal/util/tryCatch.js" (known exports: tryCatch, known reexports: ) */ undefined.e);
                return null;
            }
        }
        return xhr;
    };
    AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
        if (!body || typeof body === 'string') {
            return body;
        } else if (/* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.FormData && body instanceof /* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.FormData) {
            return body;
        }
        if (contentType) {
            var splitIndex = contentType.indexOf(';');
            if (splitIndex !== -1) {
                contentType = contentType.substring(0, splitIndex);
            }
        }
        switch (contentType) {
            case 'application/x-www-form-urlencoded':
                return Object.keys(body).map(function (key) {
                    return encodeURIComponent(key) + "=" + encodeURIComponent(body[key]);
                }).join('&');
            case 'application/json':
                return JSON.stringify(body);
            default:
                return body;
        }
    };
    AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
        for (var key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    };
    AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
        var progressSubscriber = request.progressSubscriber;
        function xhrTimeout(e) {
            var _a = xhrTimeout,
                subscriber = _a.subscriber,
                progressSubscriber = _a.progressSubscriber,
                request = _a.request;
            if (progressSubscriber) {
                progressSubscriber.error(e);
            }
            subscriber.error(new AjaxObservable_AjaxTimeoutError(this, request));
        }
        xhr.ontimeout = xhrTimeout;
        xhrTimeout.request = request;
        xhrTimeout.subscriber = this;
        xhrTimeout.progressSubscriber = progressSubscriber;
        if (xhr.upload && 'withCredentials' in xhr) {
            if (progressSubscriber) {
                var _xhrProgress_;
                _xhrProgress_ = function xhrProgress_1(e) {
                    var progressSubscriber = _xhrProgress_.progressSubscriber;
                    progressSubscriber.next(e);
                };
                if (/* Cannot get final name for export "root" in "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js" (known exports: ajaxGet ajaxPost ajaxDelete ajaxPut ajaxPatch ajaxGetJSON AjaxObservable AjaxSubscriber AjaxResponse AjaxError AjaxTimeoutError, known reexports: ) */ undefined.XDomainRequest) {
                    xhr.onprogress = _xhrProgress_;
                } else {
                    xhr.upload.onprogress = _xhrProgress_;
                }
                _xhrProgress_.progressSubscriber = progressSubscriber;
            }
            var _xhrError_;
            _xhrError_ = function xhrError_1(e) {
                var _a = _xhrError_,
                    progressSubscriber = _a.progressSubscriber,
                    subscriber = _a.subscriber,
                    request = _a.request;
                if (progressSubscriber) {
                    progressSubscriber.error(e);
                }
                subscriber.error(new AjaxObservable_AjaxError('ajax error', this, request));
            };
            xhr.onerror = _xhrError_;
            _xhrError_.request = request;
            _xhrError_.subscriber = this;
            _xhrError_.progressSubscriber = progressSubscriber;
        }
        function xhrReadyStateChange(e) {
            return;
        }
        xhr.onreadystatechange = xhrReadyStateChange;
        xhrReadyStateChange.subscriber = this;
        xhrReadyStateChange.progressSubscriber = progressSubscriber;
        xhrReadyStateChange.request = request;
        function xhrLoad(e) {
            var _a = xhrLoad,
                subscriber = _a.subscriber,
                progressSubscriber = _a.progressSubscriber,
                request = _a.request;
            if (this.readyState === 4) {
                var status_1 = this.status === 1223 ? 204 : this.status;
                var response = this.responseType === 'text' ? this.response || this.responseText : this.response;
                if (status_1 === 0) {
                    status_1 = response ? 200 : 0;
                }
                if (status_1 < 400) {
                    if (progressSubscriber) {
                        progressSubscriber.complete();
                    }
                    subscriber.next(e);
                    subscriber.complete();
                } else {
                    if (progressSubscriber) {
                        progressSubscriber.error(e);
                    }
                    subscriber.error(new AjaxObservable_AjaxError('ajax error ' + status_1, this, request));
                }
            }
        }
        xhr.onload = xhrLoad;
        xhrLoad.subscriber = this;
        xhrLoad.progressSubscriber = progressSubscriber;
        xhrLoad.request = request;
    };
    AjaxSubscriber.prototype.unsubscribe = function () {
        var _a = this,
            done = _a.done,
            xhr = _a.xhr;
        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
            xhr.abort();
        }
        _super.prototype.unsubscribe.call(this);
    };
    return AjaxSubscriber;
}(/* Cannot get final name for export "Subscriber" in "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js" (known exports: toSubscriber, known reexports: ) */ undefined);

var AjaxResponse = /*@__PURE__*/function () {
    function AjaxResponse(originalEvent, xhr, request) {
        this.originalEvent = originalEvent;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
        this.responseType = xhr.responseType || request.responseType;
        this.response = parseXhrResponse(this.responseType, xhr);
    }
    return AjaxResponse;
}();

var AjaxObservable_AjaxError = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AjaxError, _super);
    function AjaxError(message, xhr, request) {
        var _this = _super.call(this, message) || this;
        _this.name = 'AjaxError';
        _this.message = message;
        _this.xhr = xhr;
        _this.request = request;
        _this.status = xhr.status;
        _this.responseType = xhr.responseType || request.responseType;
        _this.response = parseXhrResponse(_this.responseType, xhr);
        Object.setPrototypeOf(_this, AjaxError.prototype);
        return _this;
    }
    return AjaxError;
}(Error);

function parseXhrResponse(responseType, xhr) {
    switch (responseType) {
        case 'json':
            if ('response' in xhr) {
                return xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
            } else {
                return JSON.parse(xhr.responseText || 'null');
            }
        case 'xml':
            return xhr.responseXML;
        case 'text':
        default:
            return 'response' in xhr ? xhr.response : xhr.responseText;
    }
}
var AjaxObservable_AjaxTimeoutError = /*@__PURE__*/function (_super) {
    /* Cannot get final name for export "__extends" in "./node_modules/rxjs/_esm5/internal/util/isFunction.js" (known exports: isFunction, known reexports: ) */ undefined(AjaxTimeoutError, _super);
    function AjaxTimeoutError(xhr, request) {
        var _this = _super.call(this, 'ajax timeout', xhr, request) || this;
        _this.name = 'AjaxTimeoutError';
        Object.setPrototypeOf(_this, AjaxTimeoutError.prototype);
        return _this;
    }
    return AjaxTimeoutError;
}(AjaxObservable_AjaxError);

//# sourceMappingURL=AjaxObservable.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/internal/observable/dom/ajax.js
/** PURE_IMPORTS_START _AjaxObservable PURE_IMPORTS_END */

var ajax = /* Cannot get final name for export "AjaxObservable" in "./node_modules/rxjs/_esm5/internal/observable/dom/ajax.js" (known exports: ajax, known reexports: ) */ undefined.create;
//# sourceMappingURL=ajax.js.map
// CONCATENATED MODULE: ./node_modules/rxjs/_esm5/ajax/index.js
/** PURE_IMPORTS_START  PURE_IMPORTS_END */


//# sourceMappingURL=index.js.map
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/fetching.js
var fetching__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var fetching__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function fetching__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fetching__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function fetching__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / fetching.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ## Overview
// This file contains helper functions related to fetching new content.

// ## Imports






var fetching_fetchMixin = function fetchMixin(C) {
  return function (_C) {
    fetching__inherits(_class, _C);

    function _class() {
      fetching__classCallCheck(this, _class);

      return fetching__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    fetching__createClass(_class, [{
      key: "makeRequest",

      // ## Fetching
      value: function makeRequest(context) {
        var _this2 = this;

        return /* Cannot get final name for export "ajax" in "./node_modules/hy-push-state/src/mixin/fetching.js" (known exports: fetchMixin, known reexports: ) */ undefined({
          method: "GET",
          responseType: "text",
          url: context.url,
          crossDomain: /* Cannot get final name for export "isExternal" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(this),
          headers: { Accept: "text/html" }
        }).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref) {
          var response = _ref.response;
          return Object.assign(context, { response: response });
        }), /* Cannot get final name for export "catchError" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (error) {
          return _this2.recoverIfResponse(context, error);
        }));
      }

      // The `ajax` method will throw when it encoutners an a 400+ status code,
      // however these are still valid responses from the server that can be shown using this component.
      // This assumes error pages have the same HTML strcuture as the other pages though.

    }, {
      key: "recoverIfResponse",
      value: function recoverIfResponse(context, error) {
        var status = error.status,
            xhr = error.xhr;

        // If we have a response, recover and continue with the pipeline.
        // HACK: Letting ~~servers~~ service workers respond with 598 to force a network error on the component.

        if (xhr && xhr.response && status > 400 && status < 598) {
          return /* Cannot get final name for export "of" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(Object.assign(context, { response: xhr.response }));
        }

        // If we don't have a response, this is an acutal error that should be dealt with.
        return /* Cannot get final name for export "of" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(Object.assign(context, { error: error }));
      }

      // This function returns the request that matches a given URL.
      // The way the pipeline is set up,
      // it is either the `latestPrefetch` value (when the request is already completed),
      // or the next value on the prefetch observable (when still in progress).

    }, {
      key: "getFetch$",
      value: function getFetch$(_ref2, latestPrefetch, prefetch$) {
        var href = _ref2.url.href;

        return href === latestPrefetch.url.href && latestPrefetch.error == null ? /* Cannot get final name for export "of" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(latestPrefetch) : prefetch$.pipe(/* Cannot get final name for export "take" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(1));
      }

      // Returns an observable that emits exactly one notice, which contains the response.
      // It will not emit until an (optional) page transition animation completes.

    }, {
      key: "getResponse",
      value: function getResponse(prefetch$, _ref3) {
        var _ref4 = fetching__slicedToArray(_ref3, 2),
            context = _ref4[0],
            latestPrefetch = _ref4[1];

        return /* Cannot get final name for export "zip" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(this.getFetch$(context, latestPrefetch, prefetch$).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (fetch) {
          return Object.assign(fetch, context);
        })), this.animPromise, function (x) {
          return x;
        });
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/script-hack.js
var script_hack__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var script_hack__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function script_hack__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function script_hack__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function script_hack__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / script-hack.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.





// ### Experimental script feature
// TODO
var script_hack_scriptMixin = function scriptMixin(C) {
  return function (_C) {
    script_hack__inherits(_class, _C);

    function _class() {
      script_hack__classCallCheck(this, _class);

      return script_hack__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    script_hack__createClass(_class, [{
      key: "tempRemoveScriptTags",

      // This function removes all script tags (as query'ed by `scriptSelector`) from the response.
      value: function tempRemoveScriptTags(replaceEls) {
        var _this2 = this;

        var scripts = [];

        replaceEls.forEach(function (docfrag) {
          return Array.from(docfrag.querySelectorAll(_this2.scriptSelector)).forEach(function (script) {
            var pair = [script, script.previousSibling];
            script.parentNode.removeChild(script);
            scripts.push(pair);
          });
        });

        return scripts;
      }

      // Attempts to (synchronously) insert a `script` tag into the DOM, *before* a given `ref` element.

    }, {
      key: "insertScript",
      value: function insertScript(_ref) {
        var _ref2 = script_hack__slicedToArray(_ref, 2),
            script = _ref2[0],
            ref = _ref2[1];

        // Temporarily overwrite `document.wirte` to simulate its behavior during the initial load.
        // This only works because scripts are inserted one-at-a-time (via `concatMap`).
        var originalWrite = document.write;

        document.write = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var temp = document.createElement("div");
          temp.innerHTML = args.join();
          Array.from(temp.childNodes).forEach(function (node) {
            ref.parentNode.insertBefore(node, ref.nextSibling);
          });
        };

        // If the script tag needs to fetch its source code, we insert it into the DOM,
        // but we return an observable that only completes once the script has fired its `load` event.
        return script.src !== "" ? /* Cannot get final name for export "Observable" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined.create(function (observer) {
          script.addEventListener("load", function (x) {
            document.write = originalWrite;
            observer.complete(x);
          });

          script.addEventListener("error", function (x) {
            document.write = originalWrite;
            observer.error(x);
          });

          ref.parentNode.insertBefore(script, ref.nextSibling);
        }) : // Otherwise we insert it into the DOM and reset the `document.write` function.
        /* Cannot get final name for export "of" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined({}).pipe(/* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
          ref.parentNode.insertBefore(script, ref.nextSibling);
          document.write = originalWrite;
        }));
      }

      // Takes a list of `script`--`ref` pairs, and inserts them into the DOM one-by-one.

    }, {
      key: "reinsertScriptTags",
      value: function reinsertScriptTags(context) {
        if (!this.scriptSelector) return /* Cannot get final name for export "of" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(context);

        var scripts = context.scripts;


        return /* Cannot get final name for export "from" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(scripts).pipe(/* Cannot get final name for export "concatMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.insertScript.bind(this)), /* Cannot get final name for export "catchError" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (error) {
          throw Object.assign(context, { error: error });
        })).toPromise().then(function () {
          return context;
        });
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/update.js
var update__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var mixin_update__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function mixin_update__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function mixin_update__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function mixin_update__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / update.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.





var mixin_update_updateMixin = function updateMixin(C) {
  return function (_scriptMixin) {
    mixin_update__inherits(_class, _scriptMixin);

    function _class() {
      mixin_update__classCallCheck(this, _class);

      return mixin_update__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    mixin_update__createClass(_class, [{
      key: "getTitle",

      // Extracts the title of the page
      value: function getTitle(fragment) {
        return (fragment.querySelector("title") || {}).textContent;
      }

      // Extracts the elements to be replaced

    }, {
      key: "getReplaceElements",
      value: function getReplaceElements(fragment) {
        if (this.replaceIds.length > 0) {
          return this.replaceIds.map(function (id) {
            return fragment.getElementById(id);
          });
        } else if (this.el.id) {
          return [fragment.getElementById(this.el.id)];
        } else {
          var index = Array.from(document.getElementsByTagName(this.el.tagName)).indexOf(this.el);
          return [fragment.querySelectorAll(this.el.tagName)[index]];
        }
      }

      // Takes the response string and turns it into document fragments
      // that can be inserted into the DOM.

    }, {
      key: "responseToContent",
      value: function responseToContent(context) {
        var response = context.response;


        var fragment = /* Cannot get final name for export "fragmentFromString" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(response);
        var title = this.getTitle(fragment);
        var replaceEls = this.getReplaceElements(fragment);

        if (replaceEls.some(function (x) {
          return x == null;
        })) {
          throw Object.assign(context, { replaceElMissing: true });
        }

        var scripts = this.scriptSelector ? this.tempRemoveScriptTags(replaceEls) : [];

        return Object.assign(context, { title: title, replaceEls: replaceEls, scripts: scripts });
      }

      // Replaces the old elments with the new one, one-by-one.

    }, {
      key: "replaceContentByIds",
      value: function replaceContentByIds(elements) {
        this.replaceIds.map(function (id) {
          return document.getElementById(id);
        }).forEach(function (oldElement, i) {
          return oldElement.parentNode.replaceChild(elements[i], oldElement);
        });
      }

      // When no `relaceIds` are set, replace the entire content of the component (slow).

    }, {
      key: "replaceContentWholesale",
      value: function replaceContentWholesale(_ref) {
        var _ref2 = update__slicedToArray(_ref, 1),
            el = _ref2[0];

        this.el.innerHTML = el.innerHTML;
      }

      // TODO: doc

    }, {
      key: "replaceContent",
      value: function replaceContent(replaceEls) {
        if (this.replaceIds.length > 0) {
          this.replaceContentByIds(replaceEls);
        } else {
          this.replaceContentWholesale(replaceEls);
        }
      }

      // TODO: doc

    }, {
      key: "updateDOM",
      value: function updateDOM(context) {
        try {
          var replaceEls = context.replaceEls;

          this.updateHistoryTitle(context);
          if (/* Cannot get final name for export "isExternal" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(this)) this.rewriteURLs(replaceEls);
          this.replaceContent(replaceEls);
        } catch (error) {
          throw Object.assign(context, { error: error });
        }
      }

      // When fetching documents from an external source,
      // relative URLs will be resolved relative to the current `window.location`.
      // We can rewrite URL to absolute urls

    }, {
      key: "rewriteURLs",
      value: function rewriteURLs(replaceEls) {
        var _this2 = this;

        replaceEls.forEach(function (el) {
          /* console.time(); */
          el.querySelectorAll("[href]").forEach(_this2.rewriteURL("href"));
          el.querySelectorAll("[src]").forEach(_this2.rewriteURL("src"));
          el.querySelectorAll("img[srcset]").forEach(_this2.rewriteURLSrcSet("srcset"));
          el.querySelectorAll("blockquote[cite]").forEach(_this2.rewriteURL("cite"));
          el.querySelectorAll("del[cite]").forEach(_this2.rewriteURL("cite"));
          el.querySelectorAll("ins[cite]").forEach(_this2.rewriteURL("cite"));
          el.querySelectorAll("q[cite]").forEach(_this2.rewriteURL("cite"));
          el.querySelectorAll("img[longdesc]").forEach(_this2.rewriteURL("longdesc"));
          el.querySelectorAll("frame[longdesc]").forEach(_this2.rewriteURL("longdesc"));
          el.querySelectorAll("iframe[longdesc]").forEach(_this2.rewriteURL("longdesc"));
          el.querySelectorAll("img[usemap]").forEach(_this2.rewriteURL("usemap"));
          el.querySelectorAll("input[usemap]").forEach(_this2.rewriteURL("usemap"));
          el.querySelectorAll("object[usemap]").forEach(_this2.rewriteURL("usemap"));
          el.querySelectorAll("form[action]").forEach(_this2.rewriteURL("action"));
          el.querySelectorAll("button[formaction]").forEach(_this2.rewriteURL("formaction"));
          el.querySelectorAll("input[formaction]").forEach(_this2.rewriteURL("formaction"));
          el.querySelectorAll("video[poster]").forEach(_this2.rewriteURL("poster"));
          el.querySelectorAll("object[data]").forEach(_this2.rewriteURL("data"));
          el.querySelectorAll("object[codebase]").forEach(_this2.rewriteURL("codebase"));
          el.querySelectorAll("object[archive]").forEach(_this2.rewriteURLList("archive"));
          /* console.timeEnd(); */
          /* el.querySelectorAll("command[icon]").forEach(this.rewriteURL("icon")); */ // obsolte
        });
      }
    }, {
      key: "rewriteURL",
      value: function rewriteURL(attr) {
        var _this3 = this;

        return function (el) {
          try {
            el.setAttribute(attr, new URL(el.getAttribute(attr), _this3.href).href);
          } catch (e) {
            if (true) console.warn("Couldn't rewrite URL in attribute " + attr + " on element", el);
          }
        };
      }
    }, {
      key: "rewriteURLSrcSet",
      value: function rewriteURLSrcSet(attr) {
        var _this4 = this;

        return function (el) {
          try {
            el.setAttribute(attr, el.getAttribute(attr).split(/\s*,\s*/).map(function (str) {
              var pair = str.split(/\s+/);
              pair[0] = new URL(pair[0], _this4.href).href;
              return pair.join(" ");
            }).join(", "));
          } catch (e) {
            if (true) console.warn("Couldn't rewrite URLs in attribute " + attr + " on element", el);
          }
        };
      }
    }, {
      key: "rewriteURLList",
      value: function rewriteURLList(attr) {
        var _this5 = this;

        return function (el) {
          try {
            el.setAttribute(attr, el.getAttribute(attr).split(/[\s,]+/).map(function (str) {
              return new URL(str, _this5.href).href;
            }).join(", "));
          } catch (e) {
            if (true) console.warn("Couldn't rewrite URLs in attribute " + attr + " on element", el);
          }
        };
      }
    }]);

    return _class;
  }(/* Cannot get final name for export "scriptMixin" in "./node_modules/hy-push-state/src/mixin/update.js" (known exports: updateMixin, known reexports: ) */ undefined(C));
};
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/events.js
var events__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function events__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function events__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function events__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / events.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



// ### Event functions
// These functions are called at various points along the observable pipeline to fire events,
// and cause other side effects.
var events_eventMixin = function eventMixin(C) {
  return function (_C) {
    events__inherits(_class, _C);

    function _class() {
      events__classCallCheck(this, _class);

      return events__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    events__createClass(_class, [{
      key: "onStart",

      // #### On start
      value: function onStart(context) {
        var _this2 = this;

        // By default, hy-push-state will wait at least `duration` ms before replacing the content,
        // so that animations have enough time to finish.
        // The behavior is encoded with a promise that resolves after `duration` ms.
        this.animPromise = /* Cannot get final name for export "timer" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(this.duration);

        // The `waitUntil` function lets users of this component override the animation promise.
        // This allows for event-based code execution, rather than timing-based, which prevents hiccups
        // and glitches when, for example, painting takes longer than expected.
        var waitUntil = function waitUntil(promise) {
          if (true && !(promise instanceof Promise || promise instanceof /* Cannot get final name for export "Observable" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined)) {
            console.warn("waitUntil expects a Promise as first argument.");
          }
          _this2.animPromise = promise;
        };

        this.fireEvent("start", {
          detail: Object.assign(context, { waitUntil: waitUntil })
        });
      }

      // Example usage of `waitUntil`:
      //
      // ```js
      // hyPushStateEl.addEventListener('hy-push-state-start', ({ detail }) => {
      //   const animPromise = new Promise((resolve) => {
      //     const anim = myContent.animate(...);
      //     anim.addEventListener('finish', resolve);
      //   });
      //   detail.waitUntil(animPromise);
      // });
      // ```
      // {:style="font-style:italic"}

      // #### Error callbacks
      // This function handles errors while trying to insert the new content into the document.
      // If the retrieved documened doesn't contain the ids we are looking for
      // we can't insert the content dynamically, so we tell the browser to open the link directly.

    }, {
      key: "onDOMError",
      value: function onDOMError(context) {
        var replaceElMissing = context.replaceElMissing,
            url = context.url;

        // Ideally you should prevent this situation by adding the
        // `no-push-state` CSS class
        // on links to documents that don't match the expected document layout.
        // This only serves as a fallback.

        if (replaceElMissing) {
          if (true) {
            var ids = this.replaceIds.concat(this.el.id || []).map(function (x) {
              return "#" + x;
            }).join(", ");
            console.warn("Couldn't find one or more ids of '" + ids + "' in the document at '" + window.location + "'. Opening the link directly.");
          }

          // To open the link directly, we first pop one entry off the browser history.
          // We have to do this because (some) browsers won't handle the back button correctly otherwise.
          // We then wait for a short time and change the document's location.
          // TODO: If we didn't call `pushState` optimistically we wouldn't have to do this.
          window.history.back();
          setTimeout(function () {
            document.location.href = url;
          }, 100);

          // If it's a different error, throw the generic `error` event.
        } else {
          if (true) console.error(context);
          this.fireEvent("error", { detail: context });
        }
      }

      // If there is a network error during (pre-) fetching, fire `networkerror` event.

    }, {
      key: "onNetworkError",
      value: function onNetworkError(context) {
        if (true) console.error(context);
        this.fireEvent("networkerror", { detail: context });
      }

      // When using the experimental script feature,
      // fire `scripterror` event if something goes wrong during script insertion.

    }, {
      key: "onError",
      value: function onError(context) {
        if (true) console.error(context);
        this.fireEvent("error", { detail: context });
      }

      // #### Others
      // These event callbacks simply fire an event and pass the context as `detail`.

    }, {
      key: "onReady",
      value: function onReady(context) {
        this.fireEvent("ready", { detail: context });
      }
    }, {
      key: "onAfter",
      value: function onAfter(context) {
        this.fireEvent("after", { detail: context });
      }
    }, {
      key: "onProgress",
      value: function onProgress(context) {
        this.fireEvent("progress", { detail: context });
      }
    }, {
      key: "onLoad",
      value: function onLoad(context) {
        this.fireEvent("load", { detail: context });
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/event-listeners.js
var event_listeners__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function event_listeners__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function event_listeners__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function event_listeners__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / event-listeners.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.





var event_listeners_eventListenersMixin = function eventListenersMixin(C) {
  return function (_C) {
    event_listeners__inherits(_class, _C);

    function _class() {
      event_listeners__classCallCheck(this, _class);

      return event_listeners__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    event_listeners__createClass(_class, [{
      key: "setupEventListeners",
      value: function setupEventListeners() {
        var _this2 = this;

        // #### Keeping track of links
        // We use a `MutationObserver` to keep track of all the links inside the component,
        // and put events on the `pushSubject` and `hintSubject` observables,
        // but first we need to check if `MutationObserver` is available.
        if ("MutationObserver" in window && "WeakSet" in window) {
          // A `Set` of `Element`s.
          // We use this to keep track of which links already have their event listeners registered.
          var links = new WeakSet();

          // Binding `next` functions to their `Subject`s,
          // so that we can pass them as callbacks directly. This is just for convenience.
          var pushNext = this.pushSubject.next.bind(this.pushSubject);
          var hintNext = this.hintSubject.next.bind(this.hintSubject);

          // We don't use `Observable.fromEvent` here to avoid creating too many observables.
          // Registering an unknown number of event listeners is somewhat debatable,
          // but we certainly don't want to make it wrose.
          // (The number could be brought down by using an `IntersectionObserver` in the future.
          // Also note that typically there will be an animation playing while this is happening,
          // so the effects are not easily noticed).
          //
          // In any case, `MutationObserver` and `Set` help us keep track of which links are children
          // of this component, so that we can reliably add and remove the event listeners.
          // The function to be called for every added node:
          var addLink = function addLink(link) {
            if (!links.has(link)) {
              links.add(link);
              link.addEventListener("click", pushNext);
              link.addEventListener("mouseenter", hintNext, { passive: true });
              link.addEventListener("touchstart", hintNext, { passive: true });
              link.addEventListener("focus", hintNext, { passive: true });

              // When fetching resources from an external domain, rewrite the link's href,
              // so that shift-click, etc works as expected.
              // if (isExternal(this)) {
              //   link.href = new URL(link.getAttribute("href"), this.href).href;
              // }
            }
          };

          var addListeners = function addListeners(addedNode) {
            if (addedNode instanceof Element) {
              if (/* Cannot get final name for export "matches" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined.call(addedNode, _this2.linkSelector)) {
                addLink(addedNode);
              } else {
                Array.from(addedNode.querySelectorAll(_this2.linkSelector)).forEach(addLink);
              }
            }
          };

          // Next, The function to be called for every removed node.
          // Usually the elments will be removed from the document altogher
          // when they are removed from this component,
          // but since we can't be sure, we remove the event listeners anyway.
          var removeLink = function removeLink(link) {
            links.delete(link);
            link.removeEventListener("click", pushNext);
            link.removeEventListener("mouseenter", hintNext, { passive: true });
            link.removeEventListener("touchstart", hintNext, { passive: true });
            link.removeEventListener("focus", hintNext, { passive: true });
          };

          var removeListeners = function removeListeners(removedNode) {
            if (removedNode instanceof Element) {
              if (/* Cannot get final name for export "matches" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined.call(removedNode, _this2.linkSelector)) {
                removeLink(removedNode);
              } else {
                Array.from(removedNode.querySelectorAll(_this2.linkSelector)).forEach(removeLink);
              }
            }
          };

          // An observable wrapper around the mutation observer.
          // We're only interested in nodes entering and leaving the entire subtree of this component,
          // but not attribute changes.
          /* Cannot get final name for export "Observable" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined.create(function (obs) {
            var next = obs.next.bind(obs);
            _this2.mutationObserver = new MutationObserver(function (mutations) {
              return Array.from(mutations).forEach(next);
            });
            _this2.mutationObserver.observe(_this2.el, {
              childList: true,
              subtree: true
            });
          })
          // For every mutation, we remove the event listeners of elements that go out of the component
          // (if any), and add event listeners to all elements that make it into the compnent (if any).
          .subscribe(function (_ref) {
            var addedNodes = _ref.addedNodes,
                removedNodes = _ref.removedNodes;

            Array.from(removedNodes).forEach(removeListeners.bind(_this2));
            Array.from(addedNodes).forEach(addListeners.bind(_this2));
          });

          // TODO
          this.subjects.linkSelector.subscribe(function () {
            // TODO
            Array.from(links).forEach(removeLink);

            // The mutation observer does not pick up the links that are already on the page,
            // so we add them manually here, once.
            addListeners.call(_this2, _this2.el);
          });

          // If we don't have `MutationObserver` and `Set`, we just register a `click` event listener
          // on the entire component, and check if a click occurred on one of our links.
          // Note that we can't reliably generate hints this way, so we don't.
        } else {
          this.el.addEventListener("click", function (event) {
            var anchor = /* Cannot get final name for export "matchesAncestors" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined.call(event.target, _this2.linkSelector);
            if (anchor && anchor.href) {
              event.currentTarget = anchor; // eslint-disable-line no-param-reassign
              pushSubject.next(event);
            }
          });
        }
      }
    }]);

    return _class;
  }(C);
};
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/setup.js
var mixin_setup__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var mixin_setup__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function mixin_setup__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function mixin_setup__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function mixin_setup__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / mixin / setup.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

















var mixin_setup_setupObservablesMixin = function setupObservablesMixin(C) {
  return function (_eventListenersMixin) {
    mixin_setup__inherits(_class, _eventListenersMixin);

    function _class() {
      mixin_setup__classCallCheck(this, _class);

      return mixin_setup__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    mixin_setup__createClass(_class, [{
      key: "compareContext",

      // A compare function for contexts, used in combination with `distinctUntilChanged`.
      // We use `cacheNr` as it is a convenient (hacky) way of circumventing
      // `distinctUntilChanged` when retrying requests.
      value: function compareContext(p, q) {
        return p.url.href === q.url.href && p.error === q.error && p.cacheNr === q.cacheNr;
      }

      // ### Setup observable
      // This functions sets up the core observable pipeline of this component.

    }, {
      key: "setupObservables",
      value: function setupObservables() {
        var _this2 = this;

        this.cacheNr = 1;

        // For now, we take for granted that we have a stream of all `PUSH` events (loading a new page by
        // clicking on a link) and `HINT` events (probable click on a link) which are `pushSubject` and
        // `hintSubject` respectively.
        this.pushSubject = new /* Cannot get final name for export "Subject" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined();
        this.hintSubject = new /* Cannot get final name for export "Subject" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined();

        // TODO: doc
        var push$ = this.pushSubject.pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (event) {
          return {
            type: /* Cannot get final name for export "PUSH" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined,
            url: new /* Cannot get final name for export "URL" in "./node_modules/hy-push-state/src/common.js" (known exports: matches matchesAncestors isExternal isHash getScrollHeight getScrollLeft getScrollTop fragmentFromString, known reexports: ) */ undefined(event.currentTarget.href, _this2.href),
            anchor: event.currentTarget,
            event: event,
            cacheNr: _this2.cacheNr
          };
        }), /* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.isPushEvent.bind(this)), /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref) {
          var event = _ref.event;

          event.preventDefault();
          _this2.saveScrollPosition();
        }));

        // In additon to `HINT` and `PUSH` events, there's also `POP` events, which are caused by
        // modifying the browser history, e.g. clicking the back button, etc.
        var pop$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(window, "popstate").pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect), /* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
          return window.history.state && window.history.state[_this2.histId()];
        }), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (event) {
          return {
            type: /* Cannot get final name for export "POP" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined,
            url: new /* Cannot get final name for export "URL" in "./node_modules/hy-push-state/src/common.js" (known exports: matches matchesAncestors isExternal isHash getScrollHeight getScrollLeft getScrollTop fragmentFromString, known reexports: ) */ undefined(window.location, _this2.href),
            event: event,
            cacheNr: _this2.cacheNr
          };
        }));

        var reload$ = this.reload$.pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect));

        // TODO: doc

        var _merge$pipe$map = /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(push$, pop$, reload$).pipe(/* Cannot get final name for export "startWith" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined({ url: new /* Cannot get final name for export "URL" in "./node_modules/hy-push-state/src/common.js" (known exports: matches matchesAncestors isExternal isHash getScrollHeight getScrollLeft getScrollTop fragmentFromString, known reexports: ) */ undefined(this.initialHref) }),
        // HACK: make hy-push-state mimic window.location?
        /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref2) {
          var url = _ref2.url;
          return _this2._url = url;
        }), /* Cannot get final name for export "pairwise" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(), /* Cannot get final name for export "partition" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.isHashChange)).map(function (obs$) {
          return obs$.pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref3) {
            var _ref4 = mixin_setup__slicedToArray(_ref3, 2),
                x = _ref4[1];

            return x;
          }), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());
        }),
            _merge$pipe$map2 = mixin_setup__slicedToArray(_merge$pipe$map, 2),
            hash$ = _merge$pipe$map2[0],
            page$ = _merge$pipe$map2[1];

        // We don't want to prefetch (i.e. use bandwidth) for a _possible_ page load,
        // while a _certain_ page load is going on.
        // The `pauser$` observable let's us achieve this.
        // Needs to be deferred b/c of "cyclical" dependency.


        var pauser$ = /* Cannot get final name for export "defer" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(function () {
          return (
            // A page change event means we want to pause prefetching, while
            // a response event means we want to resume prefetching.
            /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(page$.pipe(/* Cannot get final name for export "mapTo" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(true)), _this2.fetch$.pipe(/* Cannot get final name for export "mapTo" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(false)))
          );
        })
        // Start with `false`, i.e. we want the prefetch pipelien to be active
        .pipe(/* Cannot get final name for export "startWith" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(false), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

        // TODO: doc
        var hint$ = this.hintSubject.pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.subjects.disconnect), /* Cannot get final name for export "unsubscribeWhen" in "./node_modules/hy-push-state/src/mixin/methods.js" (known exports: helperMixin, known reexports: ) */ undefined(pauser$), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (event) {
          return {
            type: /* Cannot get final name for export "HINT" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined,
            url: new /* Cannot get final name for export "URL" in "./node_modules/hy-push-state/src/common.js" (known exports: matches matchesAncestors isExternal isHash getScrollHeight getScrollLeft getScrollTop fragmentFromString, known reexports: ) */ undefined(event.currentTarget.href, _this2.href),
            anchor: event.currentTarget,
            event: event,
            cacheNr: _this2.cacheNr
          };
        }), /* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.isHintEvent.bind(this)));

        // The stream of (pre-)fetch events.
        // Includes definitive page change events do deal with unexpected page changes.
        var prefetch$ = /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(hint$, page$).pipe(
        // Don't abort a request if the user "jiggles" over a link
        /* Cannot get final name for export "distinctUntilChanged" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.compareContext.bind(this)), /* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.makeRequest.bind(this)),
        // Start with some value so `withLatestFrom` below doesn't "block"
        /* Cannot get final name for export "startWith" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined({ url: {} }), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

        // TODO: doc
        this.fetch$ = page$.pipe(/* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (context) {
          _this2.updateHistoryState(context);
          _this2.onStart(context);
        }), /* Cannot get final name for export "withLatestFrom" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(prefetch$), /* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.getResponse.bind(this, prefetch$)), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

        // TODO: doc

        var _fetch$$pipe = this.fetch$.pipe(/* Cannot get final name for export "partition" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref5) {
          var error = _ref5.error;
          return !error;
        })),
            _fetch$$pipe2 = mixin_setup__slicedToArray(_fetch$$pipe, 2),
            fetchOk$ = _fetch$$pipe2[0],
            fetchError$ = _fetch$$pipe2[1];

        // TODO: doc


        var main$ = fetchOk$.pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.responseToContent.bind(this)), /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (context) {
          _this2.onReady(context);
          _this2.updateDOM(context);
          _this2.onAfter(context);
          _this2.manageScrollPostion(context);
        }), /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined({ error: function error(e) {
            return _this2.onDOMError(e);
          } }), /* Cannot get final name for export "catchError" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (e, c) {
          return c;
        }),

        // If the experimental script feature is enabled,
        // scripts tags have been stripped from the content,
        // and this is where we insert them again.
        /* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(this.reinsertScriptTags.bind(this)), /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined({ error: function error(e) {
            return _this2.onError(e);
          } }), /* Cannot get final name for export "catchError" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (e, c) {
          return c;
        }));

        // #### Subscriptions
        // Subscribe to main observables.
        main$.subscribe(this.onLoad.bind(this));

        // Subscribe to hash observables.
        hash$.subscribe(function (context) {
          _this2.updateHistoryStateHash(context);
          _this2.manageScrollPostion(context);
        });

        // Subscribe to the fetch error branch.
        fetchError$.subscribe(this.onNetworkError.bind(this));

        // Fire `progress` event when fetching takes longer than expected.
        page$.pipe(/* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (context) {
          return /* Cannot get final name for export "defer" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(function () {
            return _this2.animPromise;
          }).pipe(/* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(_this2.fetch$), /* Cannot get final name for export "mapTo" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(context));
        })).subscribe(this.onProgress.bind(this));

        // TODO: doc
        this.setupEventListeners();
      }
    }]);

    return _class;
  }(/* Cannot get final name for export "eventListenersMixin" in "./node_modules/hy-push-state/src/mixin/setup.js" (known exports: setupObservablesMixin, known reexports: ) */ undefined(/* Cannot get final name for export "eventMixin" in "./node_modules/hy-push-state/src/mixin/event-listeners.js" (known exports: eventListenersMixin, known reexports: ) */ undefined(/* Cannot get final name for export "updateMixin" in "./node_modules/hy-push-state/src/mixin/events.js" (known exports: eventMixin, known reexports: ) */ undefined(/* Cannot get final name for export "fetchMixin" in "./node_modules/hy-push-state/src/mixin/script-hack.js" (known exports: scriptMixin, known reexports: ) */ undefined(/* unused reexport */undefined(/* Cannot get final name for export "helperMixin" in "./node_modules/hy-push-state/src/mixin/scrolling.js" (known exports: scrollMixin, known reexports: ) */ undefined(C)))))));
};
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/mixin/index.js
var src_mixin__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var src_mixin__get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function src_mixin__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_mixin__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function src_mixin__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function mixin__toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// # src / mixin / index.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ## Overview
// This component is written in [RxJS] and reading its code requires some basic understanding
// of how RxJS works. It may also serve as an example of how to use RxJS.
//
// Other than RxJS, you should be familiar with [ES6 Mixin][esmixins],
// which is a clever way of using the ES6 class syntax to achieve inheritance-based mixins.
// The mixin in the main export of this file.

// ## Imports
// Including the patches for ES6+ functions, but
// there is a -lite version of the component that comes without these.
// import 'core-js/fn/array/for-each';
// import 'core-js/fn/array/from';
// import 'core-js/fn/function/bind';
// import 'core-js/fn/object/assign';

// Importing the hy-compontent base libary,
// which helps with making multiple versions of the component (Vanilla JS, WebComponent, etc...).







// Partial polyfill of the URL class. Only provides the most basic funtionality of `URL`,
// but sufficient for this compoennt.








// ## Constants
// A set of [Modernizr] tests that are required to run this component.
// These are the bare-minimum requirements, more ad-hoc features tests for optional behavior
// is part of the code below.
var mixin_MIXIN_FEATURE_TESTS = new /* Cannot get final name for export "Set" in "./node_modules/hy-component/src/rxjs.js" (known exports: rxjsMixin, known reexports: ) */ undefined([].concat(mixin__toConsumableArray(/* Cannot get final name for export "COMPONENT_FEATURE_TESTS" in "./node_modules/hy-component/src/rxjs.js" (known exports: rxjsMixin, known reexports: ) */ undefined), ["documentfragment", "eventlistener", "history", "promises", "queryselector", "requestanimationframe"]));



// Patching the document fragment's `getElementById` function, which is
// not implemented in all browsers, even some modern ones.
DocumentFragment.prototype.getElementById = DocumentFragment.prototype.getElementById || function getElementById(id) {
  return this.querySelector("#" + id);
};

// ## Push state mixin
var mixin_pushStateMixin = function pushStateMixin(C) {
  return function (_setupObservablesMixi) {
    src_mixin__inherits(_class, _setupObservablesMixi);

    function _class() {
      src_mixin__classCallCheck(this, _class);

      return src_mixin__possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    src_mixin__createClass(_class, [{
      key: "setupComponent",


      // ### Setup
      value: function setupComponent(el, props) {
        src_mixin__get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "setupComponent", this).call(this, el, props);

        this.saveScrollPosition = this.saveScrollPosition.bind(this);

        this.reload$ = new /* Cannot get final name for export "Subject" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined();
      }

      // This component has no shadow DOM, so we just return the element.

    }, {
      key: "setupShadowDOM",
      value: function setupShadowDOM(el) {
        return el;
      }

      // Overriding the setup function.

    }, {
      key: "connectComponent",
      value: function connectComponent() {
        if (true && !this.replaceIds && !this.el.id) console.warn("hy-push-state needs a 'replace-ids' or 'id' attribute.");

        // Setting up scroll restoration
        if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

        // Restore the last scroll position, if any.
        this.restoreScrollPostionOnReload();

        // Remember the current scroll position (for F5/reloads).
        window.addEventListener("beforeunload", this.saveScrollPosition);

        // Calling the [setup observables function](./setup.md) function.
        this.setupObservables();

        // TODO: meh...
        src_mixin__get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "connectComponent", this).call(this);

        // Setting the initial `history.state`.
        var url = new /* Cannot get final name for export "URL" in "./node_modules/hy-push-state/src/common.js" (known exports: matches matchesAncestors isExternal isHash getScrollHeight getScrollLeft getScrollTop fragmentFromString, known reexports: ) */ undefined(this.initialHref);
        this.updateHistoryState({ type: /* Cannot get final name for export "INIT" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined, replace: true, url: url });

        var replaceEls = this.getReplaceElements(document);
        if (/* Cannot get final name for export "isExternal" in "./node_modules/hy-push-state/src/mixin/constants.js" (known exports: INIT HINT PUSH POP, known reexports: ) */ undefined(this)) this.rewriteURLs(replaceEls);

        // After all this is done, we can fire the one-time `init` event...
        this.fireEvent("init");

        // ...and our custom `load` event, which gets fired on every page change.
        // We provide similar data as subsequent `load` events,
        // however we can't provide an `anchor` or `event`,
        // since this `load` event wasn't caused by a user interaction.
        this.onLoad({
          type: /* Cannot get final name for export "INIT" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined,
          title: this.getTitle(document),
          replaceEls: replaceEls,
          url: url,
          cacheNr: this.cacheNr
        });
      }
    }, {
      key: "disconnectComponent",
      value: function disconnectComponent() {
        src_mixin__get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "disconnectComponent", this).call(this);
        window.removeEventListener("beforeunload", this.saveScrollPosition);
      }

      // ### Methods
      // Public methods of this component. See [Methods](../../methods.md) for more.

    }, {
      key: "assign",
      value: function assign(url) {
        this.reload$.next({
          type: /* Cannot get final name for export "PUSH" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined,
          url: new /* Cannot get final name for export "URL" in "./node_modules/hy-push-state/src/common.js" (known exports: matches matchesAncestors isExternal isHash getScrollHeight getScrollLeft getScrollTop fragmentFromString, known reexports: ) */ undefined(url, this.href),
          cacheNr: ++this.cacheNr // eslint-disable-line no-plusplus
        });
      }
    }, {
      key: "reload",
      value: function reload() {
        this.reload$.next({
          type: /* Cannot get final name for export "PUSH" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined,
          url: new /* Cannot get final name for export "URL" in "./node_modules/hy-push-state/src/common.js" (known exports: matches matchesAncestors isExternal isHash getScrollHeight getScrollLeft getScrollTop fragmentFromString, known reexports: ) */ undefined(this.href),
          cacheNr: ++this.cacheNr, // eslint-disable-line no-plusplus
          replace: true
        });
      }
    }, {
      key: "replace",
      value: function replace(url) {
        this.reload$.next({
          type: /* Cannot get final name for export "PUSH" in "./node_modules/hy-push-state/src/mixin/operators.js" (known exports: unsubscribeWhen, known reexports: ) */ undefined,
          url: new /* Cannot get final name for export "URL" in "./node_modules/hy-push-state/src/common.js" (known exports: matches matchesAncestors isExternal isHash getScrollHeight getScrollLeft getScrollTop fragmentFromString, known reexports: ) */ undefined(url, this.href),
          cacheNr: ++this.cacheNr, // eslint-disable-line no-plusplus
          replace: true
        });
      }
    }, {
      key: "hash",


      // ### Properties
      // We expose the same properties as `window.location`
      // (in many ways this component can be thought of as a "replacement" for the global `Location` object).
      // Currently they are read-only.
      get: function get() {
        return this._url.hash;
      }
    }, {
      key: "host",
      get: function get() {
        return this._url.host;
      }
    }, {
      key: "hostname",
      get: function get() {
        return this._url.hostname;
      }
    }, {
      key: "href",
      get: function get() {
        return this._url.href;
      }
    }, {
      key: "origin",
      get: function get() {
        return this._url.origin;
      }
    }, {
      key: "pathname",
      get: function get() {
        return this._url.pathname;
      }
    }, {
      key: "port",
      get: function get() {
        return this._url.port;
      }
    }, {
      key: "protocol",
      get: function get() {
        return this._url.protocol;
      }
    }, {
      key: "search",
      get: function get() {
        return this._url.search;
      }
    }], [{
      key: "componentName",

      // The name of the component (required by hy-component)
      get: function get() {
        return "hy-push-state";
      }

      // ### Options
      // The default values (and types) of the configuration options (required by hy-component)
      // See [Options](../../options.md) for usage information.

    }, {
      key: "types",
      get: function get() {
        return {
          replaceIds: /* Cannot get final name for export "array" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined,
          linkSelector: /* Cannot get final name for export "string" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined,
          duration: /* Cannot get final name for export "number" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined,
          hrefRegex: /* Cannot get final name for export "regex" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined,
          scriptSelector: /* Cannot get final name for export "string" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined,
          initialHref: /* Cannot get final name for export "string" in "./node_modules/rxjs/_esm5/internal/operators/audit.js" (known exports: audit, known reexports: ) */ undefined
        };
      }
    }, {
      key: "defaults",
      get: function get() {
        return {
          replaceIds: [],
          linkSelector: "a[href]:not(.no-push-state)",
          duration: 0,
          hrefRegex: null,
          scriptSelector: null,
          initialHref: window.location.href
        };
      }
    }]);

    return _class;
  }(/* Cannot get final name for export "setupObservablesMixin" in "./node_modules/hy-push-state/src/mixin/index.js" (known exports: MIXIN_FEATURE_TESTS pushStateMixin, known reexports: INIT HINT PUSH POP Set) */ undefined(/* Cannot get final name for export "rxjsMixin" in "./node_modules/attr-types/array.js" (known exports: array default, known reexports: ) */ undefined(/* Cannot get final name for export "componentMixin" in "./node_modules/hy-component/src/rxjs.js" (known exports: rxjsMixin, known reexports: ) */ undefined(C))));
};

// [rxjs]: https://github.com/ReactiveX/rxjs
// [esmixins]: http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
// [modernizr]: https://modernizr.com/
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/vanilla/index.js
function src_vanilla__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_vanilla__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function src_vanilla__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// # src / vanilla / index.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// import 'core-js/fn/array/from';





var vanilla_VANILLA_FEATURE_TESTS = /* Cannot get final name for export "MIXIN_FEATURE_TESTS" in "./node_modules/hy-push-state/src/vanilla/index.js" (known exports: VANILLA_FEATURE_TESTS HyPushState, known reexports: Set) */ undefined;



var HyPushState = function (_pushStateMixin) {
  src_vanilla__inherits(HyPushState, _pushStateMixin);

  function HyPushState() {
    src_vanilla__classCallCheck(this, HyPushState);

    return src_vanilla__possibleConstructorReturn(this, (HyPushState.__proto__ || Object.getPrototypeOf(HyPushState)).apply(this, arguments));
  }

  return HyPushState;
}(/* Cannot get final name for export "pushStateMixin" in "./node_modules/hy-push-state/src/vanilla/index.js" (known exports: VANILLA_FEATURE_TESTS HyPushState, known reexports: Set) */ undefined(/* Cannot get final name for export "VanillaComponent" in "./node_modules/create-element-x/factory.js" (known exports: createCreateElement default, known reexports: ) */ undefined));
// CONCATENATED MODULE: ./node_modules/hy-push-state/src/webcomponent/index.js
var src_webcomponent__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function src_webcomponent__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_webcomponent__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function src_webcomponent__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function src_webcomponent__toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// # src / webcomponent / index.js
// Copyright (c) 2018 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// import 'core-js/fn/array/from';





var webcomponent_WEBCOMPONENT_FEATURE_TESTS = new /* Cannot get final name for export "Set" in "./node_modules/hy-drawer/src/webcomponent/template.js" (known exports: template, known reexports: ) */ undefined([].concat(src_webcomponent__toConsumableArray(/* Cannot get final name for export "CUSTOM_ELEMENT_FEATURE_TESTS" in "./node_modules/hy-drawer/src/webcomponent/template.js" (known exports: template, known reexports: ) */ undefined), src_webcomponent__toConsumableArray(/* Cannot get final name for export "MIXIN_FEATURE_TESTS" in "./node_modules/hy-push-state/src/vanilla/index.js" (known exports: VANILLA_FEATURE_TESTS HyPushState, known reexports: Set) */ undefined)));



var HyPushStateElement = function (_customElementMixin) {
  src_webcomponent__inherits(HyPushStateElement, _customElementMixin);

  function HyPushStateElement() {
    src_webcomponent__classCallCheck(this, HyPushStateElement);

    return src_webcomponent__possibleConstructorReturn(this, (HyPushStateElement.__proto__ || Object.getPrototypeOf(HyPushStateElement)).apply(this, arguments));
  }

  src_webcomponent__createClass(HyPushStateElement, [{
    key: "getTemplate",
    value: function getTemplate() {
      return null;
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return this.getObservedAttributes();
    }
  }]);

  return HyPushStateElement;
}(/* Cannot get final name for export "customElementMixin" in "./node_modules/hy-drawer/src/webcomponent/template.js" (known exports: template, known reexports: ) */ undefined(/* Cannot get final name for export "pushStateMixin" in "./node_modules/hy-push-state/src/vanilla/index.js" (known exports: VANILLA_FEATURE_TESTS HyPushState, known reexports: Set) */ undefined(/* Cannot get final name for export "CustomElement" in "./node_modules/hy-drawer/src/webcomponent/template.js" (known exports: template, known reexports: ) */ undefined)));
// EXTERNAL MODULE: ./node_modules/core-js/fn/array/find.js
var array_find = __webpack_require__(70);
var find_default = /*#__PURE__*/__webpack_require__.n(array_find);

// EXTERNAL MODULE: ./node_modules/color/index.js
var node_modules_color = __webpack_require__(72);
var color_default = /*#__PURE__*/__webpack_require__.n(node_modules_color);

// EXTERNAL MODULE: ./node_modules/elem-dataset/dist/index.js
var dist = __webpack_require__(78);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// CONCATENATED MODULE: ./_js/src/cross-fader.js
var cross_fader__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var cross_fader__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function cross_fader__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// # src / cross-fader.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.













var cross_fader_find = Array.prototype.find;


var BORDER_COLOR_FADE = 0.8;

function updateStyle() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$color = _ref.color,
      color = _ref$color === undefined ? '#4fb1ba' : _ref$color,
      themeColor = _ref.themeColor;

  if (this.themeColor) {
    this.themeColor.content = themeColor || color;
  }

  if (this.rules) {
    try {
      var c = dist_default()(color);
      var active = c.darken(0.1);

      // .content a
      this.rules[0].style.color = color;
      this.rules[0].style.borderColor = c.fade(BORDER_COLOR_FADE).string();

      // .content a:hover
      this.rules[1].style.borderColor = color;

      // :focus
      this.rules[2].style.outlineColor = color;

      // .btn-primary
      this.rules[3].style.backgroundColor = color;
      this.rules[3].style.borderColor = color;

      // .btn-primary:focus
      this.rules[4].style.boxShadow = '0 0 0 3px ' + c.fade(0.5);

      // .btn-primary:hover
      this.rules[5].style.backgroundColor = active;
      this.rules[5].style.borderColor = active;

      // .btn-primary:disabled
      this.rules[6].style.backgroundColor = color;
      this.rules[6].style.borderColor = color;

      // .btn-primary:active
      this.rules[7].style.backgroundColor = active;
      this.rules[7].style.borderColor = active;

      // ::selection or ::-moz-selection (assuming it is last in the list)
      this.rules[this.rules.length - 1].style.backgroundColor = color;
    } catch (e) {
      console.error(e);
    }
  }
}

// Given a dataset, generate some string we can use the check if anything has changed...
function pseudoHash(_ref2) {
  var background = _ref2.background,
      color = _ref2.color,
      image = _ref2.image,
      overlay = _ref2.overlay;

  return '' + color + (image || background) + (overlay === '' ? 'overlay' : '');
}

// Get an Observable that emits (once) when the `image` has been loaded,
// or just remite immediately if there is no image, or it hasn't changed.
// Note that the point is not to *use* the image object, just to make sure the image is in cache.
function cacheImage$(_ref3) {
  var background = _ref3.background,
      image = _ref3.image;

  if (background || !image || image === '' || image === 'none' || image === this.prevImage) {
    return /* Cannot get final name for export "of" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined({});
  }

  var imgObj = new Image();
  var image$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(imgObj, 'load').pipe(/* Cannot get final name for export "take" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(1), /* Cannot get final name for export "finalize" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
    imgObj.src = '';
  }));
  imgObj.src = image;

  return image$;
}

var cross_fader_CrossFader = function () {
  function CrossFader(fadeDuration) {
    cross_fader__classCallCheck(this, CrossFader);

    var main = document.getElementById('_main');
    var pageStyle = document.getElementById('_pageStyle');
    var styleSheet = cross_fader_find.call(document.styleSheets, function (ss) {
      return ss.ownerNode === pageStyle;
    }) || {};

    this.sidebar = document.getElementById('_sidebar');
    this.fadeDuration = fadeDuration;
    this.rules = styleSheet.cssRules || styleSheet.rules;
    this.prevHash = pseudoHash(cross_fader(main));

    this.themeColor = document.querySelector('meta[name="theme-color"]');
  }

  cross_fader__createClass(CrossFader, [{
    key: 'fetchImage',
    value: function fetchImage(main) {
      var dataset = cross_fader(main);
      var background = dataset.background,
          color = dataset.color,
          image = dataset.image,
          overlay = dataset.overlay;

      // HACK: Using `dataset` here to store some intermediate data

      var hash = pseudoHash(dataset);
      if (hash === this.prevHash) return common_empty();

      return cacheImage$.call(this, dataset).pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
        var div = document.createElement('div');
        div.classList.add('sidebar-bg');
        if (image !== 'none' && overlay === '') div.classList.add('sidebar-overlay');
        if (background) div.style.background = background;else {
          div.style.backgroundColor = color;
          if (image !== '' && image !== 'none') div.style.backgroundImage = 'url(' + image + ')';
        }
        return [div, dataset, hash];
      }));
    }
  }, {
    key: 'fade',
    value: function fade(_ref4, _ref5) {
      var _ref7 = cross_fader__slicedToArray(_ref4, 1),
          prevDiv = _ref7[0];

      var _ref6 = cross_fader__slicedToArray(_ref5, 3),
          div = _ref6[0],
          dataset = _ref6[1],
          hash = _ref6[2];

      prevDiv.parentNode.insertBefore(div, prevDiv.nextElementSibling);

      updateStyle.call(this, dataset);

      // Only update the prev hash after we're actually in the fade stage
      this.prevHash = hash;

      return /* Cannot get final name for export "animate" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined(div, [{ opacity: 0 }, { opacity: 1 }], {
        duration: this.fadeDuration
      }).pipe(/* Cannot get final name for export "finalize" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
        return prevDiv.parentNode.removeChild(prevDiv);
      }));
    }
  }]);

  return CrossFader;
}();

/* harmony default export */ var cross_fader = (cross_fader_CrossFader);
// CONCATENATED MODULE: ./_js/src/disqus.js
// # src / katex.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

function loadDisqus2() {
  window.DISQUS.reset({
    reload: true,
    config: function config() {
      this.page.url = window.location.href;
      this.page.title = document.title;
    }
  });
}

function loadDisqus() {
  if (document.getElementById('disqus_thread')) {
    if (window.DISQUS) {
      loadDisqus2();
    } else {
      window.disqus_config = function disqusConfig() {
        this.page.url = window.location.href;
        this.page.title = document.title;
      };
      window.loadJSDeferred(document.getElementById('_disqusJS').href);
    }
  }
}

loadDisqus();
// EXTERNAL MODULE: ./node_modules/core-js/fn/array/includes.js
var array_includes = __webpack_require__(79);
var array_includes_default = /*#__PURE__*/__webpack_require__.n(array_includes);

// CONCATENATED MODULE: ./_js/src/flip/title.js
var title__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// # src / flip / title.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.








var TITLE_SELECTOR = '.page-title, .post-title';

function setupFLIPTitle(start$, ready$, fadeIn$, _ref) {
  var animationMain = _ref.animationMain,
      settings = _ref.settings;

  if (!animationMain) return start$;

  var flip$ = start$.pipe(/* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref2) {
    var flipType = _ref2.flipType;
    return flipType === 'title';
  }), /* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref3) {
    var anchor = _ref3.anchor;

    if (!anchor) return /* Cannot get final name for export "of" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined({});

    var title = document.createElement('h1');

    title.classList.add('page-title');
    title.textContent = anchor.textContent;
    title.style.transformOrigin = 'left top';

    var page = animationMain.querySelector('.page');
    if (!page) return /* Cannot get final name for export "of" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined({});
    /* Cannot get final name for export "empty" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined.call(page);
    page.appendChild(title);
    animationMain.style.position = 'fixed';
    animationMain.style.opacity = 1;

    var first = anchor.getBoundingClientRect();
    var last = title.getBoundingClientRect();
    var firstFontSize = parseInt(getComputedStyle(anchor).fontSize, 10);
    var lastFontSize = parseInt(getComputedStyle(title).fontSize, 10);

    var invertX = first.left - last.left;
    var invertY = first.top - last.top;
    var invertScale = firstFontSize / lastFontSize;

    anchor.style.opacity = 0;

    var transform = [{ transform: 'translate3d(' + invertX + 'px, ' + invertY + 'px, 0) scale(' + invertScale + ')' }, { transform: 'translate3d(0, 0, 0) scale(1)' }];

    return /* Cannot get final name for export "animate" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined(title, transform, settings).pipe(/* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined({
      complete: function complete() {
        animationMain.style.position = 'absolute';
      }
    }));
  }));

  start$.pipe(/* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref4) {
    var flipType = _ref4.flipType;
    return ready$.pipe(/* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
      return flipType === 'title';
    }), /* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref5) {
      var _ref5$replaceEls = title__slicedToArray(_ref5.replaceEls, 1),
          main = _ref5$replaceEls[0];

      var title = main.querySelector(TITLE_SELECTOR);
      if (title) title.style.opacity = 0;
      return title;
    }), /* Cannot get final name for export "zip" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(fadeIn$, function (x) {
      return x;
    }), /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (title) {
      if (title) title.style.opacity = 1;
      animationMain.style.opacity = 0;
    }), /* Cannot get final name for export "finalize" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
      animationMain.style.opacity = 0;
    }));
  })).subscribe();

  return flip$;
}
// CONCATENATED MODULE: ./_js/src/flip/index.js
// # src / flip / index.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.









var FLIP_TYPES = ['title'];

function setupFLIP(start$, ready$, fadeIn$, options) {
  var other$ = start$.pipe(/* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref) {
    var flipType = _ref.flipType;
    return !FLIP_TYPES.includes(flipType);
  }));

  return /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(setupFLIP(start$, ready$, fadeIn$, options), other$);
}
// CONCATENATED MODULE: ./_js/src/push-state.js
var push_state__slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function push_state__toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// # src / push-state.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ## Overview
// This file sets up the hy-push-state component, which is responsible for dynimically changing
// the content when users click on internal links.
// However, the component only handles changing the content.
// Animating it, responding to errors and showing loading spinners is still up to us.

// ## Includes
// First, we patch the environment with some ES6+ functions we intend to use.





// We include our main component, hy-push-state,
// in both the vanilla JS and the WebComponent version (will decide later which one to use).
// Since they share most of their code, it's not a big deal in terms of file size.



// Next, we include `Observable` and the RxJS functions we inted to use on it.




// Some of our own helper functions and classes.






// ## Constants
// A list of Modernizr feature tests that are required for the push state feature to work.
var push_state_REQUIREMENTS = new _Set([].concat(push_state__toConsumableArray(/* Cannot get final name for export "VANILLA_FEATURE_TESTS" in "./node_modules/hy-push-state/src/webcomponent/index.js" (known exports: WEBCOMPONENT_FEATURE_TESTS HyPushStateElement, known reexports: Set) */ undefined), ['classlist', 'cssanimations', 'cssremunit', 'documentfragment', 'eventlistener', 'history', 'matchmedia', 'opacity', 'queryselector', 'requestanimationframe']));

var REPLACE_IDS = '_main';
var LINK_SELECTOR = 'a[href]:not(.external):not(.no-push-state)';
var SCRIPT_SELECTOR = 'script:not([type^="math/tex"])';
var HREF_REGEX = /^((?!(\/assets\/)).)*$/;
var DURATION = 250;

// Duration of cross-fading the sidebar background images.
var FADE_DURATION = 600;

// Time a user has to stay on the site before we send word to Google Analytics.
var GA_DELAY = 500;

// Details of the fade-out animation.
var FADE_OUT = [{ opacity: 1 }, { opacity: 0 }];

// Details of the fade-in animation.
var FADE_IN = [{ opacity: 0, transform: 'translateY(-3rem)' }, { opacity: 1, transform: 'translateY(0)' }];

// Settings as passed to the WebAnimations API.
var SETTINGS = {
  duration: DURATION,
  easing: 'cubic-bezier(0,0,0.32,1)'
};

// A CSS selector for headlines with ids.
var HEADING_SELECTOR = 'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]';

// We also setup some shorthands:
var push_state_forEach = Array.prototype.forEach;

var push_state_assign = Object.assign.bind(Object);

// ## Functions
// Takes a heading and adds a "#" link for permalinks:
function upgradeHeading(h) {
  var template = document.getElementById('_permalink-template');
  var df = document.importNode(template.content, true);
  var a = df.querySelector('.permalink');
  a.href = '#' + h.id;
  h.appendChild(df);
}

// Set up the DOM elements:
function setupAnimationMain(pushStateEl) {
  var template = document.getElementById('_animation-template');
  var animationMain = document.importNode(template.content, true);
  pushStateEl.parentNode.insertBefore(animationMain, pushStateEl);
  return pushStateEl.previousElementSibling;
}

function setupLoading(navbarEl) {
  var template = document.getElementById('_loading-template');
  var loading = document.importNode(template.content, true);
  navbarEl.appendChild(loading);
  return navbarEl.lastElementChild;
}

function setupErrorPage(main, _ref) {
  var pathname = _ref.pathname;

  var template = document.getElementById('_error-template');
  var error = document.importNode(template.content, true);
  var anchor = error.querySelector('.this-link');
  if (anchor) {
    anchor.href = pathname;
    anchor.textContent = pathname;
  }
  main.appendChild(error);
  return main.lastElementChild;
}

function setupButton(parent, templateId, clickFn) {
  var template = document.getElementById(templateId);
  var backButton = document.importNode(template.content, true);
  backButton.querySelector('.nav-btn').addEventListener('click', clickFn);
  parent.appendChild(backButton);
  return parent.lastElementChild;
}

// Get the FLIP type (currently 'title' or 'project') from an element.
function getFlipType(el) {
  if (!el || !el.classList) return null;
  if (el.classList.contains('flip-title')) return 'title';
  if (el.classList.contains('flip-project')) return 'project';
  return el.getAttribute && el.getAttribute('data-flip');
}

// Whether the content should be animated.
// Always for 'push' animations, only in 'standalone' mode for Safari (b/c it conflicts with
// the native forward/backward guestures).
function shouldAnimate(type) {
  return type === 'push' || navigator.standalone || !/* Cannot get final name for export "isSafari" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined;
}

// Similar to `shouldAnimate`, whether we use scroll restoration depends on whether it conflicts
// with native guestures.
function shouldRestoreScroll() {
  if (/* Cannot get final name for export "isSafari" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined) {
    return !!navigator.standalone;
  }
  return true;
}

function animateFadeOut(_ref2) {
  var type = _ref2.type,
      main = _ref2.main;

  return shouldAnimate(type) ? /* Cannot get final name for export "animate" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined(main, FADE_OUT, SETTINGS).pipe(/* Cannot get final name for export "mapTo" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined({ main: main })) : /* Cannot get final name for export "of" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined({ main: main });
}

function animateFadeIn(_ref3) {
  var type = _ref3.type,
      _ref3$replaceEls = push_state__slicedToArray(_ref3.replaceEls, 1),
      main = _ref3$replaceEls[0],
      flipType = _ref3.flipType;

  return shouldAnimate(type) ? /* Cannot get final name for export "animate" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined(main, FADE_IN, SETTINGS).pipe(/* Cannot get final name for export "mapTo" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined({ main: main, flipType: flipType })) : /* Cannot get final name for export "of" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined({ main: main, flipType: flipType });
}

// Before we register the WebComponent with the DOM, we set essential properties,
// some of which depend on browser, standalone mode, etc...
function push_state_setupWebComponent(pushStateEl) {
  pushStateEl.setAttribute('replace-ids', REPLACE_IDS);
  pushStateEl.setAttribute('link-selector', LINK_SELECTOR);
  pushStateEl.setAttribute('duration', DURATION);
  if (shouldRestoreScroll()) pushStateEl.setAttribute('scroll-restoration', '');
  pushStateEl.setAttribute('href-regex', HREF_REGEX);
  pushStateEl.setAttribute('script-selector', SCRIPT_SELECTOR);

  customElements.define('hy-push-state', /* unused reexport */undefined);
  return pushStateEl;
}

// Setting up hy-push-state as vanilla JS class.
function push_state_setupVanilla(pushStateEl) {
  return new /* Cannot get final name for export "HyPushState" in "./node_modules/hy-push-state/src/webcomponent/index.js" (known exports: WEBCOMPONENT_FEATURE_TESTS HyPushStateElement, known reexports: Set) */ undefined(pushStateEl, {
    replaceIds: REPLACE_IDS.split(','),
    linkSelector: LINK_SELECTOR,
    duration: DURATION,
    scrollRestoration: shouldRestoreScroll(),
    hrefRegex: HREF_REGEX,
    scriptSelector: SCRIPT_SELECTOR
  });
}

// ## Main
// First, we determine if push state is enabled,
// and if the current user agent meets our requirements.
if (!window._noPushState && /* Cannot get final name for export "hasFeatures" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined(push_state_REQUIREMENTS) && !/* Cannot get final name for export "isFirefoxIOS" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined) {
  // ### Setup
  // We save some variables and setup the DOM:
  var isStandalone = !!navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

  var push_state_pushStateEl = document.getElementsByTagName('hy-push-state')[0];
  var btnBarEl = document.querySelector('.navbar .content .nav-btn-bar');

  var push_state_animationMain = setupAnimationMain(push_state_pushStateEl);
  var loading = setupLoading(document.querySelector('.navbar .content'));

  // Show a back button when in standalone mode.
  if (isStandalone) {
    setupButton(btnBarEl, '_back-template', function () {
      return window.history.back();
    });
  }

  // Upgrade headlines to include headline-level `#` links.
  var initialMain = document.getElementById('_main');
  push_state_forEach.call(initialMain.querySelectorAll(HEADING_SELECTOR), upgradeHeading);

  // Remove the CSS fade-in class (to avoid playing it again)
  initialMain.classList.remove('fade-in');

  // Setting up the basic event observables.
  // In case of a start event we also add the `flipType` to the context,
  // so that we can use filter based on it later.
  var push_state_start$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(push_state_pushStateEl, 'hy-push-state-start').pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref4) {
    var detail = _ref4.detail;
    return push_state_assign(detail, { flipType: getFlipType(detail.anchor) });
  }), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

  var push_state_ready$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(push_state_pushStateEl, 'hy-push-state-ready').pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref5) {
    var detail = _ref5.detail;
    return detail;
  }), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

  var after$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(push_state_pushStateEl, 'hy-push-state-after').pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref6) {
    var detail = _ref6.detail;
    return detail;
  }), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

  var progress$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(push_state_pushStateEl, 'hy-push-state-progress').pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref7) {
    var detail = _ref7.detail;
    return detail;
  }), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

  var error$ = /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(push_state_pushStateEl, 'hy-push-state-networkerror').pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref8) {
    var detail = _ref8.detail;
    return detail;
  }), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

  // ### Fade main content out
  // A `start` occurs immediately after a user clicks on a link.
  // First we get a hold fo the current content.
  // TODO: Change hy-push-state to provide this as part of the event?
  var fadeOut$ = push_state_start$.pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (context) {
    return push_state_assign(context, { main: document.getElementById('_main') });
  }),

  // Next we have some side effects:
  // * Close the drawer if it's open (i.e. when clicking a link in the sidebar)
  // * Add the `active` class to the active entry in the sidebar (currently not in use)
  // * If we are going to animate the content, make some preparations.
  /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref9) {
    var type = _ref9.type,
        main = _ref9.main;

    if (!window._isDesktop && window._drawer && window._drawer.opened) {
      window._drawer.close();
    }

    if (shouldAnimate(type)) {
      main.style.pointerEvents = 'none';
      main.style.opacity = 0;
    }

    /*
    document.querySelectorAll('.sidebar-nav-item')
      ::forEach((item) => {
        if (window.location.href.includes(item.href)) item.classList.add('active');
        else item.classList.remove('active');
      });
    */
  }),

  // We don't want new animations to cancel the one currently in progress, so we use `exhaustMap`.
  // If we don't animate (i.e. `popstate` event in Safari) we just return `main`.
  /* Cannot get final name for export "exhaustMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(animateFadeOut),

  // After the animation is complete, we empty the current content and scroll to the top.
  /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref10) {
    var main = _ref10.main;

    /* Cannot get final name for export "empty" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined.call(main);
    window.scroll(window.pageXOffset, 0);
  }), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

  // ### Show loading spinner
  // Show loading spinner --- but only when fetching takes longer than `DURATION`.
  progress$.subscribe(function () {
    loading.style.display = 'block';
  });

  // ### Prepare showing the new content
  // The `ready` event occurs when we've received the content from the server
  // and it is parsed as a document fragment, but before we add it to the DOM.
  // This is were we can make some changes to the content without triggering repaints.
  push_state_ready$.subscribe(function (_ref11) {
    var _ref11$replaceEls = push_state__slicedToArray(_ref11.replaceEls, 1),
        main = _ref11$replaceEls[0];

    loading.style.display = 'none';
    main.classList.remove('fade-in');
    push_state_forEach.call(main.querySelectorAll(HEADING_SELECTOR), upgradeHeading);
    main.style.pointerEvents = 'none';
  });

  // ### Fade new content in
  // `after` new content is added to the DOM, start animating it.
  var push_state_fadeIn$ = after$.pipe(/* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(animateFadeIn), /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref12) {
    var main = _ref12.main;
    main.style.pointerEvents = '';
  }), /* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

  // In addition to fading the main content out,
  // there's also a FLIP animation playing when clicking certain links.
  // We set it up here because FLIP animation may do extra work after a `fadeIn` and/or cleanup
  // work when an error occurs.
  var push_state_flip$ = /* Cannot get final name for export "default" in "./_js/src/push-state.js" (known exports: , known reexports: ) */ undefined(push_state_start$, push_state_ready$, /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(push_state_fadeIn$, error$), {
    animationMain: push_state_animationMain,
    settings: SETTINGS
  }).pipe(/* Cannot get final name for export "share" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined());

  push_state_start$.pipe(/* Cannot get final name for export "map" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (context) {
    var promise = /* Cannot get final name for export "getResolvablePromise" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined();
    context.waitUntil(promise);
    return promise;
  }),
  // Every click starts a timer that lasts as long
  // as it takes for the FLIP and fade-out animations to complete.
  /* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (p) {
    return /* Cannot get final name for export "timer" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(DURATION).pipe(/* Cannot get final name for export "zip" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(fadeOut$, push_state_flip$, function () {
      return p;
    }));
  })
  // Once the animation have completed, we resolve the promise so that hy-push-state continues.
  ).subscribe(function (p) {
    return p.resolve();
  });

  // TODO: meh, keeping permanent subscription? turn into hot observable?
  fadeOut$.subscribe();
  push_state_flip$.subscribe();

  // ### Cross-fade the sidebar image
  // The cross fader has some internal state, i.e. it keeps track of DOM nodes,
  // so it is implemented as a class.
  var crossFader = new loadDisqus(FADE_DURATION);

  // There is no point in swapping out the image while it is still loading, so we only start
  // fetching the sidebar image `after` the new content was added to the DOM.
  // However, we also want to gurantee that we don't start cross-fading the image
  // while the fade-in animation is still playing, so we wait for `fadeIn`.
  // Also, we want to abort fetching the image whne the user has already `start`ed another request.
  // TODO: Maybe only abort `after` it becomes clear that the new site
  // is using a different background image?
  after$.pipe(/* Cannot get final name for export "switchMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref13) {
    var _ref13$replaceEls = push_state__slicedToArray(_ref13.replaceEls, 1),
        main = _ref13$replaceEls[0];

    return crossFader.fetchImage(main).pipe(/* Cannot get final name for export "zip" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(push_state_fadeIn$, function (x) {
      return x;
    }), /* Cannot get final name for export "takeUntil" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(push_state_start$));
  }),

  // Once we have both images, we take them `pairwise` and cross-fade.
  // We start with the initial sidebar image, which was part of HTML content.
  // Here we use `mergeMap`, because in edge cases there could be 3 or more images
  // being faded at the same time, but there is no reason to cancel the old ones.
  /* Cannot get final name for export "startWith" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined([document.querySelector('.sidebar-bg')]), /* Cannot get final name for export "pairwise" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(), /* Cannot get final name for export "mergeMap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function (_ref14) {
    var _ref15 = push_state__slicedToArray(_ref14, 2),
        prev = _ref15[0],
        curr = _ref15[1];

    return crossFader.fade(prev, curr);
  })).subscribe();

  // ### Upgrade math blocks
  // Once the content is faded in, upgrade the math blocks with KaTeX.
  // This can take a while and will trigger multiple repaints,
  // so we don't want to start until after the animation.
  push_state_fadeIn$.pipe(/* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(/* Cannot get final name for export "default" in "./node_modules/qd-set/esm/index.js" (known exports: Set, known reexports: ) */ undefined), /* Cannot get final name for export "tap" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(/* unused reexport */undefined),

  // Finally, after some debounce time, send a `pageview` to Google Analytics (if applicable).
  /* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
    return !!window.ga;
  }), /* Cannot get final name for export "debounceTime" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(GA_DELAY)).subscribe(function () {
    window.ga('set', 'page', window.location.pathname);
    window.ga('send', 'pageview');
  });

  // ### Show error page
  // In case of a network error, we don't want to show the browser's default offline page.
  error$.subscribe(function (_ref16) {
    var url = _ref16.url;

    loading.style.display = 'none';
    /* Cannot get final name for export "empty" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined.call(push_state_animationMain.querySelector('.page'));

    var main = document.getElementById('_main');
    /* Cannot get final name for export "empty" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined.call(main);
    main.style.pointerEvents = '';
    main.style.opacity = '';

    setupErrorPage(main, url);
  });

  // ### Safari special treatment
  // Safari doesn't support manual scroll restoration and it immediately jumps to the old scroll
  // position after the `popstate` event handler completes.
  // To make sure Safari can scroll to that position, the body needs to have sufficient height,
  // otherwise it will simply scroll to the bottom of the current page.
  if (/* Cannot get final name for export "isSafari" in "./_js/src/katex.js" (known exports: default, known reexports: ) */ undefined && !navigator.standalone) {
    // First, we make sure this the previous entry was pushed by us and wasn't a jump to a `#`:
    // Then we empty the content immediately to prevent flickering and
    // set the old `scrollHeigt` as the body's `minHeight`.
    /* Cannot get final name for export "fromEvent" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(window, 'popstate').pipe(/* Cannot get final name for export "filter" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(function () {
      return window.history.state && window.history.state['hy-push-state'] && !window.history.state['hy-push-state'].hash;
    })).subscribe(function () {
      var scrollHeight = window.history.state['hy-push-state'].scrollHeight;

      document.body.style.minHeight = scrollHeight + 'px';
    });

    // Once the content has been replaced (or an error occurred, etc), restore `minHeight`.
    /* Cannot get final name for export "merge" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined(after$, progress$, error$).pipe(/* Cannot get final name for export "observeOn" in "./node_modules/rxjs-create-tween/esm/index.js" (known exports: createTween default, known reexports: ) */ undefined(/* Cannot get final name for export "animationFrameScheduler" in "./_js/src/common.js" (known exports: isSafari isMobileSafari isUCBrowser isFirefoxIOS hasFeatures show hide unshow unhide empty animate getResolvablePromise, known reexports: ) */ undefined)).subscribe(function () {
      document.body.style.minHeight = '';
    });
  }

  // ### Create the component
  // If we have Custom Elements, use the WebComponent (it doesn't use ShadowDOM, so we are fine),
  // otherwise use the vanilla JS version.
  // TODO: there is weird flickering on iOS with the webcomp version. maybe use vanilla?
  window._pushState = 'customElements' in window ? push_state_setupWebComponent(push_state_pushStateEl) : push_state_setupVanilla(push_state_pushStateEl);
}
// CONCATENATED MODULE: ./_js/src/index.js
// # src / index.js
// Copyright (c) 2017 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.










/***/ }),
/* 28 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

!function (a, b) {
  var c = {},
      d = {};!function (a, b) {
    function c(a) {
      if ("number" == typeof a) return a;var b = {};for (var c in a) {
        b[c] = a[c];
      }return b;
    }function d() {
      this._delay = 0, this._endDelay = 0, this._fill = "none", this._iterationStart = 0, this._iterations = 1, this._duration = 0, this._playbackRate = 1, this._direction = "normal", this._easing = "linear", this._easingFunction = x;
    }function e() {
      return a.isDeprecated("Invalid timing inputs", "2016-03-02", "TypeError exceptions will be thrown instead.", !0);
    }function f(b, c, e) {
      var f = new d();return c && (f.fill = "both", f.duration = "auto"), "number" != typeof b || isNaN(b) ? void 0 !== b && Object.getOwnPropertyNames(b).forEach(function (c) {
        if ("auto" != b[c]) {
          if (("number" == typeof f[c] || "duration" == c) && ("number" != typeof b[c] || isNaN(b[c]))) return;if ("fill" == c && -1 == v.indexOf(b[c])) return;if ("direction" == c && -1 == w.indexOf(b[c])) return;if ("playbackRate" == c && 1 !== b[c] && a.isDeprecated("AnimationEffectTiming.playbackRate", "2014-11-28", "Use Animation.playbackRate instead.")) return;f[c] = b[c];
        }
      }) : f.duration = b, f;
    }function g(a) {
      return "number" == typeof a && (a = isNaN(a) ? { duration: 0 } : { duration: a }), a;
    }function h(b, c) {
      return b = a.numericTimingToObject(b), f(b, c);
    }function i(a, b, c, d) {
      return a < 0 || a > 1 || c < 0 || c > 1 ? x : function (e) {
        function f(a, b, c) {
          return 3 * a * (1 - c) * (1 - c) * c + 3 * b * (1 - c) * c * c + c * c * c;
        }if (e <= 0) {
          var g = 0;return a > 0 ? g = b / a : !b && c > 0 && (g = d / c), g * e;
        }if (e >= 1) {
          var h = 0;return c < 1 ? h = (d - 1) / (c - 1) : 1 == c && a < 1 && (h = (b - 1) / (a - 1)), 1 + h * (e - 1);
        }for (var i = 0, j = 1; i < j;) {
          var k = (i + j) / 2,
              l = f(a, c, k);if (Math.abs(e - l) < 1e-5) return f(b, d, k);l < e ? i = k : j = k;
        }return f(b, d, k);
      };
    }function j(a, b) {
      return function (c) {
        if (c >= 1) return 1;var d = 1 / a;return (c += b * d) - c % d;
      };
    }function k(a) {
      C || (C = document.createElement("div").style), C.animationTimingFunction = "", C.animationTimingFunction = a;var b = C.animationTimingFunction;if ("" == b && e()) throw new TypeError(a + " is not a valid value for easing");return b;
    }function l(a) {
      if ("linear" == a) return x;var b = E.exec(a);if (b) return i.apply(this, b.slice(1).map(Number));var c = F.exec(a);return c ? j(Number(c[1]), { start: y, middle: z, end: A }[c[2]]) : B[a] || x;
    }function m(a) {
      return Math.abs(n(a) / a.playbackRate);
    }function n(a) {
      return 0 === a.duration || 0 === a.iterations ? 0 : a.duration * a.iterations;
    }function o(a, b, c) {
      if (null == b) return G;var d = c.delay + a + c.endDelay;return b < Math.min(c.delay, d) ? H : b >= Math.min(c.delay + a, d) ? I : J;
    }function p(a, b, c, d, e) {
      switch (d) {case H:
          return "backwards" == b || "both" == b ? 0 : null;case J:
          return c - e;case I:
          return "forwards" == b || "both" == b ? a : null;case G:
          return null;}
    }function q(a, b, c, d, e) {
      var f = e;return 0 === a ? b !== H && (f += c) : f += d / a, f;
    }function r(a, b, c, d, e, f) {
      var g = a === 1 / 0 ? b % 1 : a % 1;return 0 !== g || c !== I || 0 === d || 0 === e && 0 !== f || (g = 1), g;
    }function s(a, b, c, d) {
      return a === I && b === 1 / 0 ? 1 / 0 : 1 === c ? Math.floor(d) - 1 : Math.floor(d);
    }function t(a, b, c) {
      var d = a;if ("normal" !== a && "reverse" !== a) {
        var e = b;"alternate-reverse" === a && (e += 1), d = "normal", e !== 1 / 0 && e % 2 != 0 && (d = "reverse");
      }return "normal" === d ? c : 1 - c;
    }function u(a, b, c) {
      var d = o(a, b, c),
          e = p(a, c.fill, b, d, c.delay);if (null === e) return null;var f = q(c.duration, d, c.iterations, e, c.iterationStart),
          g = r(f, c.iterationStart, d, c.iterations, e, c.duration),
          h = s(d, c.iterations, g, f),
          i = t(c.direction, h, g);return c._easingFunction(i);
    }var v = "backwards|forwards|both|none".split("|"),
        w = "reverse|alternate|alternate-reverse".split("|"),
        x = function x(a) {
      return a;
    };d.prototype = { _setMember: function _setMember(b, c) {
        this["_" + b] = c, this._effect && (this._effect._timingInput[b] = c, this._effect._timing = a.normalizeTimingInput(this._effect._timingInput), this._effect.activeDuration = a.calculateActiveDuration(this._effect._timing), this._effect._animation && this._effect._animation._rebuildUnderlyingAnimation());
      }, get playbackRate() {
        return this._playbackRate;
      }, set delay(a) {
        this._setMember("delay", a);
      }, get delay() {
        return this._delay;
      }, set endDelay(a) {
        this._setMember("endDelay", a);
      }, get endDelay() {
        return this._endDelay;
      }, set fill(a) {
        this._setMember("fill", a);
      }, get fill() {
        return this._fill;
      }, set iterationStart(a) {
        if ((isNaN(a) || a < 0) && e()) throw new TypeError("iterationStart must be a non-negative number, received: " + timing.iterationStart);this._setMember("iterationStart", a);
      }, get iterationStart() {
        return this._iterationStart;
      }, set duration(a) {
        if ("auto" != a && (isNaN(a) || a < 0) && e()) throw new TypeError("duration must be non-negative or auto, received: " + a);this._setMember("duration", a);
      }, get duration() {
        return this._duration;
      }, set direction(a) {
        this._setMember("direction", a);
      }, get direction() {
        return this._direction;
      }, set easing(a) {
        this._easingFunction = l(k(a)), this._setMember("easing", a);
      }, get easing() {
        return this._easing;
      }, set iterations(a) {
        if ((isNaN(a) || a < 0) && e()) throw new TypeError("iterations must be non-negative, received: " + a);this._setMember("iterations", a);
      }, get iterations() {
        return this._iterations;
      } };var y = 1,
        z = .5,
        A = 0,
        B = { ease: i(.25, .1, .25, 1), "ease-in": i(.42, 0, 1, 1), "ease-out": i(0, 0, .58, 1), "ease-in-out": i(.42, 0, .58, 1), "step-start": j(1, y), "step-middle": j(1, z), "step-end": j(1, A) },
        C = null,
        D = "\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*",
        E = new RegExp("cubic-bezier\\(" + D + "," + D + "," + D + "," + D + "\\)"),
        F = /steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/,
        G = 0,
        H = 1,
        I = 2,
        J = 3;a.cloneTimingInput = c, a.makeTiming = f, a.numericTimingToObject = g, a.normalizeTimingInput = h, a.calculateActiveDuration = m, a.calculateIterationProgress = u, a.calculatePhase = o, a.normalizeEasing = k, a.parseEasingFunction = l;
  }(c), function (a, b) {
    function c(a, b) {
      return a in k ? k[a][b] || b : b;
    }function d(a) {
      return "display" === a || 0 === a.lastIndexOf("animation", 0) || 0 === a.lastIndexOf("transition", 0);
    }function e(a, b, e) {
      if (!d(a)) {
        var f = h[a];if (f) {
          i.style[a] = b;for (var g in f) {
            var j = f[g],
                k = i.style[j];e[j] = c(j, k);
          }
        } else e[a] = c(a, b);
      }
    }function f(a) {
      var b = [];for (var c in a) {
        if (!(c in ["easing", "offset", "composite"])) {
          var d = a[c];Array.isArray(d) || (d = [d]);for (var e, f = d.length, g = 0; g < f; g++) {
            e = {}, e.offset = "offset" in a ? a.offset : 1 == f ? 1 : g / (f - 1), "easing" in a && (e.easing = a.easing), "composite" in a && (e.composite = a.composite), e[c] = d[g], b.push(e);
          }
        }
      }return b.sort(function (a, b) {
        return a.offset - b.offset;
      }), b;
    }function g(b) {
      function c() {
        var a = d.length;null == d[a - 1].offset && (d[a - 1].offset = 1), a > 1 && null == d[0].offset && (d[0].offset = 0);for (var b = 0, c = d[0].offset, e = 1; e < a; e++) {
          var f = d[e].offset;if (null != f) {
            for (var g = 1; g < e - b; g++) {
              d[b + g].offset = c + (f - c) * g / (e - b);
            }b = e, c = f;
          }
        }
      }if (null == b) return [];window.Symbol && Symbol.iterator && Array.prototype.from && b[Symbol.iterator] && (b = Array.from(b)), Array.isArray(b) || (b = f(b));for (var d = b.map(function (b) {
        var c = {};for (var d in b) {
          var f = b[d];if ("offset" == d) {
            if (null != f) {
              if (f = Number(f), !isFinite(f)) throw new TypeError("Keyframe offsets must be numbers.");if (f < 0 || f > 1) throw new TypeError("Keyframe offsets must be between 0 and 1.");
            }
          } else if ("composite" == d) {
            if ("add" == f || "accumulate" == f) throw { type: DOMException.NOT_SUPPORTED_ERR, name: "NotSupportedError", message: "add compositing is not supported" };if ("replace" != f) throw new TypeError("Invalid composite mode " + f + ".");
          } else f = "easing" == d ? a.normalizeEasing(f) : "" + f;e(d, f, c);
        }return void 0 == c.offset && (c.offset = null), void 0 == c.easing && (c.easing = "linear"), c;
      }), g = !0, h = -1 / 0, i = 0; i < d.length; i++) {
        var j = d[i].offset;if (null != j) {
          if (j < h) throw new TypeError("Keyframes are not loosely sorted by offset. Sort or specify offsets.");h = j;
        } else g = !1;
      }return d = d.filter(function (a) {
        return a.offset >= 0 && a.offset <= 1;
      }), g || c(), d;
    }var h = { background: ["backgroundImage", "backgroundPosition", "backgroundSize", "backgroundRepeat", "backgroundAttachment", "backgroundOrigin", "backgroundClip", "backgroundColor"], border: ["borderTopColor", "borderTopStyle", "borderTopWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth"], borderBottom: ["borderBottomWidth", "borderBottomStyle", "borderBottomColor"], borderColor: ["borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"], borderLeft: ["borderLeftWidth", "borderLeftStyle", "borderLeftColor"], borderRadius: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], borderRight: ["borderRightWidth", "borderRightStyle", "borderRightColor"], borderTop: ["borderTopWidth", "borderTopStyle", "borderTopColor"], borderWidth: ["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"], flex: ["flexGrow", "flexShrink", "flexBasis"], font: ["fontFamily", "fontSize", "fontStyle", "fontVariant", "fontWeight", "lineHeight"], margin: ["marginTop", "marginRight", "marginBottom", "marginLeft"], outline: ["outlineColor", "outlineStyle", "outlineWidth"], padding: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"] },
        i = document.createElementNS("http://www.w3.org/1999/xhtml", "div"),
        j = { thin: "1px", medium: "3px", thick: "5px" },
        k = { borderBottomWidth: j, borderLeftWidth: j, borderRightWidth: j, borderTopWidth: j, fontSize: { "xx-small": "60%", "x-small": "75%", small: "89%", medium: "100%", large: "120%", "x-large": "150%", "xx-large": "200%" }, fontWeight: { normal: "400", bold: "700" }, outlineWidth: j, textShadow: { none: "0px 0px 0px transparent" }, boxShadow: { none: "0px 0px 0px 0px transparent" } };a.convertToArrayForm = f, a.normalizeKeyframes = g;
  }(c), function (a) {
    var b = {};a.isDeprecated = function (a, c, d, e) {
      var f = e ? "are" : "is",
          g = new Date(),
          h = new Date(c);return h.setMonth(h.getMonth() + 3), !(g < h && (a in b || console.warn("Web Animations: " + a + " " + f + " deprecated and will stop working on " + h.toDateString() + ". " + d), b[a] = !0, 1));
    }, a.deprecated = function (b, c, d, e) {
      var f = e ? "are" : "is";if (a.isDeprecated(b, c, d, e)) throw new Error(b + " " + f + " no longer supported. " + d);
    };
  }(c), function () {
    if (document.documentElement.animate) {
      var a = document.documentElement.animate([], 0),
          b = !0;if (a && (b = !1, "play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState".split("|").forEach(function (c) {
        void 0 === a[c] && (b = !0);
      })), !b) return;
    }!function (a, b, c) {
      function d(a) {
        for (var b = {}, c = 0; c < a.length; c++) {
          for (var d in a[c]) {
            if ("offset" != d && "easing" != d && "composite" != d) {
              var e = { offset: a[c].offset, easing: a[c].easing, value: a[c][d] };b[d] = b[d] || [], b[d].push(e);
            }
          }
        }for (var f in b) {
          var g = b[f];if (0 != g[0].offset || 1 != g[g.length - 1].offset) throw { type: DOMException.NOT_SUPPORTED_ERR, name: "NotSupportedError", message: "Partial keyframes are not supported" };
        }return b;
      }function e(c) {
        var d = [];for (var e in c) {
          for (var f = c[e], g = 0; g < f.length - 1; g++) {
            var h = g,
                i = g + 1,
                j = f[h].offset,
                k = f[i].offset,
                l = j,
                m = k;0 == g && (l = -1 / 0, 0 == k && (i = h)), g == f.length - 2 && (m = 1 / 0, 1 == j && (h = i)), d.push({ applyFrom: l, applyTo: m, startOffset: f[h].offset, endOffset: f[i].offset, easingFunction: a.parseEasingFunction(f[h].easing), property: e, interpolation: b.propertyInterpolation(e, f[h].value, f[i].value) });
          }
        }return d.sort(function (a, b) {
          return a.startOffset - b.startOffset;
        }), d;
      }b.convertEffectInput = function (c) {
        var f = a.normalizeKeyframes(c),
            g = d(f),
            h = e(g);return function (a, c) {
          if (null != c) h.filter(function (a) {
            return c >= a.applyFrom && c < a.applyTo;
          }).forEach(function (d) {
            var e = c - d.startOffset,
                f = d.endOffset - d.startOffset,
                g = 0 == f ? 0 : d.easingFunction(e / f);b.apply(a, d.property, d.interpolation(g));
          });else for (var d in g) {
            "offset" != d && "easing" != d && "composite" != d && b.clear(a, d);
          }
        };
      };
    }(c, d), function (a, b, c) {
      function d(a) {
        return a.replace(/-(.)/g, function (a, b) {
          return b.toUpperCase();
        });
      }function e(a, b, c) {
        h[c] = h[c] || [], h[c].push([a, b]);
      }function f(a, b, c) {
        for (var f = 0; f < c.length; f++) {
          e(a, b, d(c[f]));
        }
      }function g(c, e, f) {
        var g = c;/-/.test(c) && !a.isDeprecated("Hyphenated property names", "2016-03-22", "Use camelCase instead.", !0) && (g = d(c)), "initial" != e && "initial" != f || ("initial" == e && (e = i[g]), "initial" == f && (f = i[g]));for (var j = e == f ? [] : h[g], k = 0; j && k < j.length; k++) {
          var l = j[k][0](e),
              m = j[k][0](f);if (void 0 !== l && void 0 !== m) {
            var n = j[k][1](l, m);if (n) {
              var o = b.Interpolation.apply(null, n);return function (a) {
                return 0 == a ? e : 1 == a ? f : o(a);
              };
            }
          }
        }return b.Interpolation(!1, !0, function (a) {
          return a ? f : e;
        });
      }var h = {};b.addPropertiesHandler = f;var i = { backgroundColor: "transparent", backgroundPosition: "0% 0%", borderBottomColor: "currentColor", borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", borderBottomWidth: "3px", borderLeftColor: "currentColor", borderLeftWidth: "3px", borderRightColor: "currentColor", borderRightWidth: "3px", borderSpacing: "2px", borderTopColor: "currentColor", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", borderTopWidth: "3px", bottom: "auto", clip: "rect(0px, 0px, 0px, 0px)", color: "black", fontSize: "100%", fontWeight: "400", height: "auto", left: "auto", letterSpacing: "normal", lineHeight: "120%", marginBottom: "0px", marginLeft: "0px", marginRight: "0px", marginTop: "0px", maxHeight: "none", maxWidth: "none", minHeight: "0px", minWidth: "0px", opacity: "1.0", outlineColor: "invert", outlineOffset: "0px", outlineWidth: "3px", paddingBottom: "0px", paddingLeft: "0px", paddingRight: "0px", paddingTop: "0px", right: "auto", strokeDasharray: "none", strokeDashoffset: "0px", textIndent: "0px", textShadow: "0px 0px 0px transparent", top: "auto", transform: "", verticalAlign: "0px", visibility: "visible", width: "auto", wordSpacing: "normal", zIndex: "auto" };b.propertyInterpolation = g;
    }(c, d), function (a, b, c) {
      function d(b) {
        var c = a.calculateActiveDuration(b),
            d = function d(_d) {
          return a.calculateIterationProgress(c, _d, b);
        };return d._totalDuration = b.delay + c + b.endDelay, d;
      }b.KeyframeEffect = function (c, e, f, g) {
        var h,
            i = d(a.normalizeTimingInput(f)),
            j = b.convertEffectInput(e),
            k = function k() {
          j(c, h);
        };return k._update = function (a) {
          return null !== (h = i(a));
        }, k._clear = function () {
          j(c, null);
        }, k._hasSameTarget = function (a) {
          return c === a;
        }, k._target = c, k._totalDuration = i._totalDuration, k._id = g, k;
      };
    }(c, d), function (a, b) {
      function c(a, b) {
        return !(!b.namespaceURI || -1 == b.namespaceURI.indexOf("/svg")) && (g in a || (a[g] = /Trident|MSIE|IEMobile|Edge|Android 4/i.test(a.navigator.userAgent)), a[g]);
      }function d(a, b, c) {
        c.enumerable = !0, c.configurable = !0, Object.defineProperty(a, b, c);
      }function e(a) {
        this._element = a, this._surrogateStyle = document.createElementNS("http://www.w3.org/1999/xhtml", "div").style, this._style = a.style, this._length = 0, this._isAnimatedProperty = {}, this._updateSvgTransformAttr = c(window, a), this._savedTransformAttr = null;for (var b = 0; b < this._style.length; b++) {
          var d = this._style[b];this._surrogateStyle[d] = this._style[d];
        }this._updateIndices();
      }function f(a) {
        if (!a._webAnimationsPatchedStyle) {
          var b = new e(a);try {
            d(a, "style", { get: function get() {
                return b;
              } });
          } catch (b) {
            a.style._set = function (b, c) {
              a.style[b] = c;
            }, a.style._clear = function (b) {
              a.style[b] = "";
            };
          }a._webAnimationsPatchedStyle = a.style;
        }
      }var g = "_webAnimationsUpdateSvgTransformAttr",
          h = { cssText: 1, length: 1, parentRule: 1 },
          i = { getPropertyCSSValue: 1, getPropertyPriority: 1, getPropertyValue: 1, item: 1, removeProperty: 1, setProperty: 1 },
          j = { removeProperty: 1, setProperty: 1 };e.prototype = { get cssText() {
          return this._surrogateStyle.cssText;
        }, set cssText(a) {
          for (var b = {}, c = 0; c < this._surrogateStyle.length; c++) {
            b[this._surrogateStyle[c]] = !0;
          }this._surrogateStyle.cssText = a, this._updateIndices();for (var c = 0; c < this._surrogateStyle.length; c++) {
            b[this._surrogateStyle[c]] = !0;
          }for (var d in b) {
            this._isAnimatedProperty[d] || this._style.setProperty(d, this._surrogateStyle.getPropertyValue(d));
          }
        }, get length() {
          return this._surrogateStyle.length;
        }, get parentRule() {
          return this._style.parentRule;
        }, _updateIndices: function _updateIndices() {
          for (; this._length < this._surrogateStyle.length;) {
            Object.defineProperty(this, this._length, { configurable: !0, enumerable: !1, get: function (a) {
                return function () {
                  return this._surrogateStyle[a];
                };
              }(this._length) }), this._length++;
          }for (; this._length > this._surrogateStyle.length;) {
            this._length--, Object.defineProperty(this, this._length, { configurable: !0, enumerable: !1, value: void 0 });
          }
        }, _set: function _set(b, c) {
          this._style[b] = c, this._isAnimatedProperty[b] = !0, this._updateSvgTransformAttr && "transform" == a.unprefixedPropertyName(b) && (null == this._savedTransformAttr && (this._savedTransformAttr = this._element.getAttribute("transform")), this._element.setAttribute("transform", a.transformToSvgMatrix(c)));
        }, _clear: function _clear(b) {
          this._style[b] = this._surrogateStyle[b], this._updateSvgTransformAttr && "transform" == a.unprefixedPropertyName(b) && (this._savedTransformAttr ? this._element.setAttribute("transform", this._savedTransformAttr) : this._element.removeAttribute("transform"), this._savedTransformAttr = null), delete this._isAnimatedProperty[b];
        } };for (var k in i) {
        e.prototype[k] = function (a, b) {
          return function () {
            var c = this._surrogateStyle[a].apply(this._surrogateStyle, arguments);return b && (this._isAnimatedProperty[arguments[0]] || this._style[a].apply(this._style, arguments), this._updateIndices()), c;
          };
        }(k, k in j);
      }for (var l in document.documentElement.style) {
        l in h || l in i || function (a) {
          d(e.prototype, a, { get: function get() {
              return this._surrogateStyle[a];
            }, set: function set(b) {
              this._surrogateStyle[a] = b, this._updateIndices(), this._isAnimatedProperty[a] || (this._style[a] = b);
            } });
        }(l);
      }a.apply = function (b, c, d) {
        f(b), b.style._set(a.propertyName(c), d);
      }, a.clear = function (b, c) {
        b._webAnimationsPatchedStyle && b.style._clear(a.propertyName(c));
      };
    }(d), function (a) {
      window.Element.prototype.animate = function (b, c) {
        var d = "";return c && c.id && (d = c.id), a.timeline._play(a.KeyframeEffect(this, b, c, d));
      };
    }(d), function (a, b) {
      function c(a, b, d) {
        if ("number" == typeof a && "number" == typeof b) return a * (1 - d) + b * d;if ("boolean" == typeof a && "boolean" == typeof b) return d < .5 ? a : b;if (a.length == b.length) {
          for (var e = [], f = 0; f < a.length; f++) {
            e.push(c(a[f], b[f], d));
          }return e;
        }throw "Mismatched interpolation arguments " + a + ":" + b;
      }a.Interpolation = function (a, b, d) {
        return function (e) {
          return d(c(a, b, e));
        };
      };
    }(d), function (a, b) {
      function c(a, b, c) {
        return Math.max(Math.min(a, c), b);
      }function d(b, d, e) {
        var f = a.dot(b, d);f = c(f, -1, 1);var g = [];if (1 === f) g = b;else for (var h = Math.acos(f), i = 1 * Math.sin(e * h) / Math.sqrt(1 - f * f), j = 0; j < 4; j++) {
          g.push(b[j] * (Math.cos(e * h) - f * i) + d[j] * i);
        }return g;
      }var e = function () {
        function a(a, b) {
          for (var c = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], d = 0; d < 4; d++) {
            for (var e = 0; e < 4; e++) {
              for (var f = 0; f < 4; f++) {
                c[d][e] += b[d][f] * a[f][e];
              }
            }
          }return c;
        }function b(a) {
          return 0 == a[0][2] && 0 == a[0][3] && 0 == a[1][2] && 0 == a[1][3] && 0 == a[2][0] && 0 == a[2][1] && 1 == a[2][2] && 0 == a[2][3] && 0 == a[3][2] && 1 == a[3][3];
        }function c(c, d, e, f, g) {
          for (var h = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], i = 0; i < 4; i++) {
            h[i][3] = g[i];
          }for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
              h[3][i] += c[j] * h[j][i];
            }
          }var k = f[0],
              l = f[1],
              m = f[2],
              n = f[3],
              o = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];o[0][0] = 1 - 2 * (l * l + m * m), o[0][1] = 2 * (k * l - m * n), o[0][2] = 2 * (k * m + l * n), o[1][0] = 2 * (k * l + m * n), o[1][1] = 1 - 2 * (k * k + m * m), o[1][2] = 2 * (l * m - k * n), o[2][0] = 2 * (k * m - l * n), o[2][1] = 2 * (l * m + k * n), o[2][2] = 1 - 2 * (k * k + l * l), h = a(h, o);var p = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];e[2] && (p[2][1] = e[2], h = a(h, p)), e[1] && (p[2][1] = 0, p[2][0] = e[0], h = a(h, p)), e[0] && (p[2][0] = 0, p[1][0] = e[0], h = a(h, p));for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
              h[i][j] *= d[i];
            }
          }return b(h) ? [h[0][0], h[0][1], h[1][0], h[1][1], h[3][0], h[3][1]] : h[0].concat(h[1], h[2], h[3]);
        }return c;
      }();a.composeMatrix = e, a.quat = d;
    }(d), function (a, b, c) {
      a.sequenceNumber = 0;var d = function d(a, b, c) {
        this.target = a, this.currentTime = b, this.timelineTime = c, this.type = "finish", this.bubbles = !1, this.cancelable = !1, this.currentTarget = a, this.defaultPrevented = !1, this.eventPhase = Event.AT_TARGET, this.timeStamp = Date.now();
      };b.Animation = function (b) {
        this.id = "", b && b._id && (this.id = b._id), this._sequenceNumber = a.sequenceNumber++, this._currentTime = 0, this._startTime = null, this._paused = !1, this._playbackRate = 1, this._inTimeline = !0, this._finishedFlag = !0, this.onfinish = null, this._finishHandlers = [], this._effect = b, this._inEffect = this._effect._update(0), this._idle = !0, this._currentTimePending = !1;
      }, b.Animation.prototype = { _ensureAlive: function _ensureAlive() {
          this.playbackRate < 0 && 0 === this.currentTime ? this._inEffect = this._effect._update(-1) : this._inEffect = this._effect._update(this.currentTime), this._inTimeline || !this._inEffect && this._finishedFlag || (this._inTimeline = !0, b.timeline._animations.push(this));
        }, _tickCurrentTime: function _tickCurrentTime(a, b) {
          a != this._currentTime && (this._currentTime = a, this._isFinished && !b && (this._currentTime = this._playbackRate > 0 ? this._totalDuration : 0), this._ensureAlive());
        }, get currentTime() {
          return this._idle || this._currentTimePending ? null : this._currentTime;
        }, set currentTime(a) {
          a = +a, isNaN(a) || (b.restart(), this._paused || null == this._startTime || (this._startTime = this._timeline.currentTime - a / this._playbackRate), this._currentTimePending = !1, this._currentTime != a && (this._idle && (this._idle = !1, this._paused = !0), this._tickCurrentTime(a, !0), b.applyDirtiedAnimation(this)));
        }, get startTime() {
          return this._startTime;
        }, set startTime(a) {
          a = +a, isNaN(a) || this._paused || this._idle || (this._startTime = a, this._tickCurrentTime((this._timeline.currentTime - this._startTime) * this.playbackRate), b.applyDirtiedAnimation(this));
        }, get playbackRate() {
          return this._playbackRate;
        }, set playbackRate(a) {
          if (a != this._playbackRate) {
            var c = this.currentTime;this._playbackRate = a, this._startTime = null, "paused" != this.playState && "idle" != this.playState && (this._finishedFlag = !1, this._idle = !1, this._ensureAlive(), b.applyDirtiedAnimation(this)), null != c && (this.currentTime = c);
          }
        }, get _isFinished() {
          return !this._idle && (this._playbackRate > 0 && this._currentTime >= this._totalDuration || this._playbackRate < 0 && this._currentTime <= 0);
        }, get _totalDuration() {
          return this._effect._totalDuration;
        }, get playState() {
          return this._idle ? "idle" : null == this._startTime && !this._paused && 0 != this.playbackRate || this._currentTimePending ? "pending" : this._paused ? "paused" : this._isFinished ? "finished" : "running";
        }, _rewind: function _rewind() {
          if (this._playbackRate >= 0) this._currentTime = 0;else {
            if (!(this._totalDuration < 1 / 0)) throw new DOMException("Unable to rewind negative playback rate animation with infinite duration", "InvalidStateError");this._currentTime = this._totalDuration;
          }
        }, play: function play() {
          this._paused = !1, (this._isFinished || this._idle) && (this._rewind(), this._startTime = null), this._finishedFlag = !1, this._idle = !1, this._ensureAlive(), b.applyDirtiedAnimation(this);
        }, pause: function pause() {
          this._isFinished || this._paused || this._idle ? this._idle && (this._rewind(), this._idle = !1) : this._currentTimePending = !0, this._startTime = null, this._paused = !0;
        }, finish: function finish() {
          this._idle || (this.currentTime = this._playbackRate > 0 ? this._totalDuration : 0, this._startTime = this._totalDuration - this.currentTime, this._currentTimePending = !1, b.applyDirtiedAnimation(this));
        }, cancel: function cancel() {
          this._inEffect && (this._inEffect = !1, this._idle = !0, this._paused = !1, this._isFinished = !0, this._finishedFlag = !0, this._currentTime = 0, this._startTime = null, this._effect._update(null), b.applyDirtiedAnimation(this));
        }, reverse: function reverse() {
          this.playbackRate *= -1, this.play();
        }, addEventListener: function addEventListener(a, b) {
          "function" == typeof b && "finish" == a && this._finishHandlers.push(b);
        }, removeEventListener: function removeEventListener(a, b) {
          if ("finish" == a) {
            var c = this._finishHandlers.indexOf(b);c >= 0 && this._finishHandlers.splice(c, 1);
          }
        }, _fireEvents: function _fireEvents(a) {
          if (this._isFinished) {
            if (!this._finishedFlag) {
              var b = new d(this, this._currentTime, a),
                  c = this._finishHandlers.concat(this.onfinish ? [this.onfinish] : []);setTimeout(function () {
                c.forEach(function (a) {
                  a.call(b.target, b);
                });
              }, 0), this._finishedFlag = !0;
            }
          } else this._finishedFlag = !1;
        }, _tick: function _tick(a, b) {
          this._idle || this._paused || (null == this._startTime ? b && (this.startTime = a - this._currentTime / this.playbackRate) : this._isFinished || this._tickCurrentTime((a - this._startTime) * this.playbackRate)), b && (this._currentTimePending = !1, this._fireEvents(a));
        }, get _needsTick() {
          return this.playState in { pending: 1, running: 1 } || !this._finishedFlag;
        }, _targetAnimations: function _targetAnimations() {
          var a = this._effect._target;return a._activeAnimations || (a._activeAnimations = []), a._activeAnimations;
        }, _markTarget: function _markTarget() {
          var a = this._targetAnimations();-1 === a.indexOf(this) && a.push(this);
        }, _unmarkTarget: function _unmarkTarget() {
          var a = this._targetAnimations(),
              b = a.indexOf(this);-1 !== b && a.splice(b, 1);
        } };
    }(c, d), function (a, b, c) {
      function d(a) {
        var b = j;j = [], a < q.currentTime && (a = q.currentTime), q._animations.sort(e), q._animations = h(a, !0, q._animations)[0], b.forEach(function (b) {
          b[1](a);
        }), g(), l = void 0;
      }function e(a, b) {
        return a._sequenceNumber - b._sequenceNumber;
      }function f() {
        this._animations = [], this.currentTime = window.performance && performance.now ? performance.now() : 0;
      }function g() {
        o.forEach(function (a) {
          a();
        }), o.length = 0;
      }function h(a, c, d) {
        p = !0, n = !1, b.timeline.currentTime = a, m = !1;var e = [],
            f = [],
            g = [],
            h = [];return d.forEach(function (b) {
          b._tick(a, c), b._inEffect ? (f.push(b._effect), b._markTarget()) : (e.push(b._effect), b._unmarkTarget()), b._needsTick && (m = !0);var d = b._inEffect || b._needsTick;b._inTimeline = d, d ? g.push(b) : h.push(b);
        }), o.push.apply(o, e), o.push.apply(o, f), m && requestAnimationFrame(function () {}), p = !1, [g, h];
      }var i = window.requestAnimationFrame,
          j = [],
          k = 0;window.requestAnimationFrame = function (a) {
        var b = k++;return 0 == j.length && i(d), j.push([b, a]), b;
      }, window.cancelAnimationFrame = function (a) {
        j.forEach(function (b) {
          b[0] == a && (b[1] = function () {});
        });
      }, f.prototype = { _play: function _play(c) {
          c._timing = a.normalizeTimingInput(c.timing);var d = new b.Animation(c);return d._idle = !1, d._timeline = this, this._animations.push(d), b.restart(), b.applyDirtiedAnimation(d), d;
        } };var l = void 0,
          m = !1,
          n = !1;b.restart = function () {
        return m || (m = !0, requestAnimationFrame(function () {}), n = !0), n;
      }, b.applyDirtiedAnimation = function (a) {
        if (!p) {
          a._markTarget();var c = a._targetAnimations();c.sort(e), h(b.timeline.currentTime, !1, c.slice())[1].forEach(function (a) {
            var b = q._animations.indexOf(a);-1 !== b && q._animations.splice(b, 1);
          }), g();
        }
      };var o = [],
          p = !1,
          q = new f();b.timeline = q;
    }(c, d), function (a, b) {
      function c(a, b) {
        for (var c = 0, d = 0; d < a.length; d++) {
          c += a[d] * b[d];
        }return c;
      }function d(a, b) {
        return [a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3], a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3], a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3], a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3], a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7], a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7], a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7], a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7], a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11], a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11], a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11], a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11], a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15], a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15], a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15], a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]];
      }function e(a) {
        var b = a.rad || 0;return ((a.deg || 0) / 360 + (a.grad || 0) / 400 + (a.turn || 0)) * (2 * Math.PI) + b;
      }function f(a) {
        switch (a.t) {case "rotatex":
            var b = e(a.d[0]);return [1, 0, 0, 0, 0, Math.cos(b), Math.sin(b), 0, 0, -Math.sin(b), Math.cos(b), 0, 0, 0, 0, 1];case "rotatey":
            var b = e(a.d[0]);return [Math.cos(b), 0, -Math.sin(b), 0, 0, 1, 0, 0, Math.sin(b), 0, Math.cos(b), 0, 0, 0, 0, 1];case "rotate":case "rotatez":
            var b = e(a.d[0]);return [Math.cos(b), Math.sin(b), 0, 0, -Math.sin(b), Math.cos(b), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];case "rotate3d":
            var c = a.d[0],
                d = a.d[1],
                f = a.d[2],
                b = e(a.d[3]),
                g = c * c + d * d + f * f;if (0 === g) c = 1, d = 0, f = 0;else if (1 !== g) {
              var h = Math.sqrt(g);c /= h, d /= h, f /= h;
            }var i = Math.sin(b / 2),
                j = i * Math.cos(b / 2),
                k = i * i;return [1 - 2 * (d * d + f * f) * k, 2 * (c * d * k + f * j), 2 * (c * f * k - d * j), 0, 2 * (c * d * k - f * j), 1 - 2 * (c * c + f * f) * k, 2 * (d * f * k + c * j), 0, 2 * (c * f * k + d * j), 2 * (d * f * k - c * j), 1 - 2 * (c * c + d * d) * k, 0, 0, 0, 0, 1];case "scale":
            return [a.d[0], 0, 0, 0, 0, a.d[1], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];case "scalex":
            return [a.d[0], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];case "scaley":
            return [1, 0, 0, 0, 0, a.d[0], 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];case "scalez":
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, a.d[0], 0, 0, 0, 0, 1];case "scale3d":
            return [a.d[0], 0, 0, 0, 0, a.d[1], 0, 0, 0, 0, a.d[2], 0, 0, 0, 0, 1];case "skew":
            var l = e(a.d[0]),
                m = e(a.d[1]);return [1, Math.tan(m), 0, 0, Math.tan(l), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];case "skewx":
            var b = e(a.d[0]);return [1, 0, 0, 0, Math.tan(b), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];case "skewy":
            var b = e(a.d[0]);return [1, Math.tan(b), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];case "translate":
            var c = a.d[0].px || 0,
                d = a.d[1].px || 0;return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c, d, 0, 1];case "translatex":
            var c = a.d[0].px || 0;return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c, 0, 0, 1];case "translatey":
            var d = a.d[0].px || 0;return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, d, 0, 1];case "translatez":
            var f = a.d[0].px || 0;return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, f, 1];case "translate3d":
            var c = a.d[0].px || 0,
                d = a.d[1].px || 0,
                f = a.d[2].px || 0;return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c, d, f, 1];case "perspective":
            return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, a.d[0].px ? -1 / a.d[0].px : 0, 0, 0, 0, 1];case "matrix":
            return [a.d[0], a.d[1], 0, 0, a.d[2], a.d[3], 0, 0, 0, 0, 1, 0, a.d[4], a.d[5], 0, 1];case "matrix3d":
            return a.d;}
      }function g(a) {
        return 0 === a.length ? [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] : a.map(f).reduce(d);
      }function h(a) {
        return [i(g(a))];
      }var i = function () {
        function a(a) {
          return a[0][0] * a[1][1] * a[2][2] + a[1][0] * a[2][1] * a[0][2] + a[2][0] * a[0][1] * a[1][2] - a[0][2] * a[1][1] * a[2][0] - a[1][2] * a[2][1] * a[0][0] - a[2][2] * a[0][1] * a[1][0];
        }function b(b) {
          for (var c = 1 / a(b), d = b[0][0], e = b[0][1], f = b[0][2], g = b[1][0], h = b[1][1], i = b[1][2], j = b[2][0], k = b[2][1], l = b[2][2], m = [[(h * l - i * k) * c, (f * k - e * l) * c, (e * i - f * h) * c, 0], [(i * j - g * l) * c, (d * l - f * j) * c, (f * g - d * i) * c, 0], [(g * k - h * j) * c, (j * e - d * k) * c, (d * h - e * g) * c, 0]], n = [], o = 0; o < 3; o++) {
            for (var p = 0, q = 0; q < 3; q++) {
              p += b[3][q] * m[q][o];
            }n.push(p);
          }return n.push(1), m.push(n), m;
        }function d(a) {
          return [[a[0][0], a[1][0], a[2][0], a[3][0]], [a[0][1], a[1][1], a[2][1], a[3][1]], [a[0][2], a[1][2], a[2][2], a[3][2]], [a[0][3], a[1][3], a[2][3], a[3][3]]];
        }function e(a, b) {
          for (var c = [], d = 0; d < 4; d++) {
            for (var e = 0, f = 0; f < 4; f++) {
              e += a[f] * b[f][d];
            }c.push(e);
          }return c;
        }function f(a) {
          var b = g(a);return [a[0] / b, a[1] / b, a[2] / b];
        }function g(a) {
          return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
        }function h(a, b, c, d) {
          return [c * a[0] + d * b[0], c * a[1] + d * b[1], c * a[2] + d * b[2]];
        }function i(a, b) {
          return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
        }function j(j) {
          var k = [j.slice(0, 4), j.slice(4, 8), j.slice(8, 12), j.slice(12, 16)];if (1 !== k[3][3]) return null;for (var l = [], m = 0; m < 4; m++) {
            l.push(k[m].slice());
          }for (var m = 0; m < 3; m++) {
            l[m][3] = 0;
          }if (0 === a(l)) return null;var n,
              o = [];k[0][3] || k[1][3] || k[2][3] ? (o.push(k[0][3]), o.push(k[1][3]), o.push(k[2][3]), o.push(k[3][3]), n = e(o, d(b(l)))) : n = [0, 0, 0, 1];var p = k[3].slice(0, 3),
              q = [];q.push(k[0].slice(0, 3));var r = [];r.push(g(q[0])), q[0] = f(q[0]);var s = [];q.push(k[1].slice(0, 3)), s.push(c(q[0], q[1])), q[1] = h(q[1], q[0], 1, -s[0]), r.push(g(q[1])), q[1] = f(q[1]), s[0] /= r[1], q.push(k[2].slice(0, 3)), s.push(c(q[0], q[2])), q[2] = h(q[2], q[0], 1, -s[1]), s.push(c(q[1], q[2])), q[2] = h(q[2], q[1], 1, -s[2]), r.push(g(q[2])), q[2] = f(q[2]), s[1] /= r[2], s[2] /= r[2];var t = i(q[1], q[2]);if (c(q[0], t) < 0) for (var m = 0; m < 3; m++) {
            r[m] *= -1, q[m][0] *= -1, q[m][1] *= -1, q[m][2] *= -1;
          }var u,
              v,
              w = q[0][0] + q[1][1] + q[2][2] + 1;return w > 1e-4 ? (u = .5 / Math.sqrt(w), v = [(q[2][1] - q[1][2]) * u, (q[0][2] - q[2][0]) * u, (q[1][0] - q[0][1]) * u, .25 / u]) : q[0][0] > q[1][1] && q[0][0] > q[2][2] ? (u = 2 * Math.sqrt(1 + q[0][0] - q[1][1] - q[2][2]), v = [.25 * u, (q[0][1] + q[1][0]) / u, (q[0][2] + q[2][0]) / u, (q[2][1] - q[1][2]) / u]) : q[1][1] > q[2][2] ? (u = 2 * Math.sqrt(1 + q[1][1] - q[0][0] - q[2][2]), v = [(q[0][1] + q[1][0]) / u, .25 * u, (q[1][2] + q[2][1]) / u, (q[0][2] - q[2][0]) / u]) : (u = 2 * Math.sqrt(1 + q[2][2] - q[0][0] - q[1][1]), v = [(q[0][2] + q[2][0]) / u, (q[1][2] + q[2][1]) / u, .25 * u, (q[1][0] - q[0][1]) / u]), [p, r, s, v, n];
        }return j;
      }();a.dot = c, a.makeMatrixDecomposition = h, a.transformListToMatrix = g;
    }(d), function (a) {
      function b(a, b) {
        var c = a.exec(b);if (c) return c = a.ignoreCase ? c[0].toLowerCase() : c[0], [c, b.substr(c.length)];
      }function c(a, b) {
        b = b.replace(/^\s*/, "");var c = a(b);if (c) return [c[0], c[1].replace(/^\s*/, "")];
      }function d(a, d, e) {
        a = c.bind(null, a);for (var f = [];;) {
          var g = a(e);if (!g) return [f, e];if (f.push(g[0]), e = g[1], !(g = b(d, e)) || "" == g[1]) return [f, e];e = g[1];
        }
      }function e(a, b) {
        for (var c = 0, d = 0; d < b.length && (!/\s|,/.test(b[d]) || 0 != c); d++) {
          if ("(" == b[d]) c++;else if (")" == b[d] && (c--, 0 == c && d++, c <= 0)) break;
        }var e = a(b.substr(0, d));return void 0 == e ? void 0 : [e, b.substr(d)];
      }function f(a, b) {
        for (var c = a, d = b; c && d;) {
          c > d ? c %= d : d %= c;
        }return c = a * b / (c + d);
      }function g(a) {
        return function (b) {
          var c = a(b);return c && (c[0] = void 0), c;
        };
      }function h(a, b) {
        return function (c) {
          return a(c) || [b, c];
        };
      }function i(b, c) {
        for (var d = [], e = 0; e < b.length; e++) {
          var f = a.consumeTrimmed(b[e], c);if (!f || "" == f[0]) return;void 0 !== f[0] && d.push(f[0]), c = f[1];
        }if ("" == c) return d;
      }function j(a, b, c, d, e) {
        for (var g = [], h = [], i = [], j = f(d.length, e.length), k = 0; k < j; k++) {
          var l = b(d[k % d.length], e[k % e.length]);if (!l) return;g.push(l[0]), h.push(l[1]), i.push(l[2]);
        }return [g, h, function (b) {
          var d = b.map(function (a, b) {
            return i[b](a);
          }).join(c);return a ? a(d) : d;
        }];
      }function k(a, b, c) {
        for (var d = [], e = [], f = [], g = 0, h = 0; h < c.length; h++) {
          if ("function" == typeof c[h]) {
            var i = c[h](a[g], b[g++]);d.push(i[0]), e.push(i[1]), f.push(i[2]);
          } else !function (a) {
            d.push(!1), e.push(!1), f.push(function () {
              return c[a];
            });
          }(h);
        }return [d, e, function (a) {
          for (var b = "", c = 0; c < a.length; c++) {
            b += f[c](a[c]);
          }return b;
        }];
      }a.consumeToken = b, a.consumeTrimmed = c, a.consumeRepeated = d, a.consumeParenthesised = e, a.ignore = g, a.optional = h, a.consumeList = i, a.mergeNestedRepeated = j.bind(null, null), a.mergeWrappedNestedRepeated = j, a.mergeList = k;
    }(d), function (a) {
      function b(b) {
        function c(b) {
          var c = a.consumeToken(/^inset/i, b);if (c) return d.inset = !0, c;var c = a.consumeLengthOrPercent(b);if (c) return d.lengths.push(c[0]), c;var c = a.consumeColor(b);return c ? (d.color = c[0], c) : void 0;
        }var d = { inset: !1, lengths: [], color: null },
            e = a.consumeRepeated(c, /^/, b);if (e && e[0].length) return [d, e[1]];
      }function c(c) {
        var d = a.consumeRepeated(b, /^,/, c);if (d && "" == d[1]) return d[0];
      }function d(b, c) {
        for (; b.lengths.length < Math.max(b.lengths.length, c.lengths.length);) {
          b.lengths.push({ px: 0 });
        }for (; c.lengths.length < Math.max(b.lengths.length, c.lengths.length);) {
          c.lengths.push({ px: 0 });
        }if (b.inset == c.inset && !!b.color == !!c.color) {
          for (var d, e = [], f = [[], 0], g = [[], 0], h = 0; h < b.lengths.length; h++) {
            var i = a.mergeDimensions(b.lengths[h], c.lengths[h], 2 == h);f[0].push(i[0]), g[0].push(i[1]), e.push(i[2]);
          }if (b.color && c.color) {
            var j = a.mergeColors(b.color, c.color);f[1] = j[0], g[1] = j[1], d = j[2];
          }return [f, g, function (a) {
            for (var c = b.inset ? "inset " : " ", f = 0; f < e.length; f++) {
              c += e[f](a[0][f]) + " ";
            }return d && (c += d(a[1])), c;
          }];
        }
      }function e(b, c, d, e) {
        function f(a) {
          return { inset: a, color: [0, 0, 0, 0], lengths: [{ px: 0 }, { px: 0 }, { px: 0 }, { px: 0 }] };
        }for (var g = [], h = [], i = 0; i < d.length || i < e.length; i++) {
          var j = d[i] || f(e[i].inset),
              k = e[i] || f(d[i].inset);g.push(j), h.push(k);
        }return a.mergeNestedRepeated(b, c, g, h);
      }var f = e.bind(null, d, ", ");a.addPropertiesHandler(c, f, ["box-shadow", "text-shadow"]);
    }(d), function (a, b) {
      function c(a) {
        return a.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
      }function d(a, b, c) {
        return Math.min(b, Math.max(a, c));
      }function e(a) {
        if (/^\s*[-+]?(\d*\.)?\d+\s*$/.test(a)) return Number(a);
      }function f(a, b) {
        return [a, b, c];
      }function g(a, b) {
        if (0 != a) return i(0, 1 / 0)(a, b);
      }function h(a, b) {
        return [a, b, function (a) {
          return Math.round(d(1, 1 / 0, a));
        }];
      }function i(a, b) {
        return function (e, f) {
          return [e, f, function (e) {
            return c(d(a, b, e));
          }];
        };
      }function j(a) {
        var b = a.trim().split(/\s*[\s,]\s*/);if (0 !== b.length) {
          for (var c = [], d = 0; d < b.length; d++) {
            var f = e(b[d]);if (void 0 === f) return;c.push(f);
          }return c;
        }
      }function k(a, b) {
        if (a.length == b.length) return [a, b, function (a) {
          return a.map(c).join(" ");
        }];
      }function l(a, b) {
        return [a, b, Math.round];
      }a.clamp = d, a.addPropertiesHandler(j, k, ["stroke-dasharray"]), a.addPropertiesHandler(e, i(0, 1 / 0), ["border-image-width", "line-height"]), a.addPropertiesHandler(e, i(0, 1), ["opacity", "shape-image-threshold"]), a.addPropertiesHandler(e, g, ["flex-grow", "flex-shrink"]), a.addPropertiesHandler(e, h, ["orphans", "widows"]), a.addPropertiesHandler(e, l, ["z-index"]), a.parseNumber = e, a.parseNumberList = j, a.mergeNumbers = f, a.numberToString = c;
    }(d), function (a, b) {
      function c(a, b) {
        if ("visible" == a || "visible" == b) return [0, 1, function (c) {
          return c <= 0 ? a : c >= 1 ? b : "visible";
        }];
      }a.addPropertiesHandler(String, c, ["visibility"]);
    }(d), function (a, b) {
      function c(a) {
        a = a.trim(), f.fillStyle = "#000", f.fillStyle = a;var b = f.fillStyle;if (f.fillStyle = "#fff", f.fillStyle = a, b == f.fillStyle) {
          f.fillRect(0, 0, 1, 1);var c = f.getImageData(0, 0, 1, 1).data;f.clearRect(0, 0, 1, 1);var d = c[3] / 255;return [c[0] * d, c[1] * d, c[2] * d, d];
        }
      }function d(b, c) {
        return [b, c, function (b) {
          function c(a) {
            return Math.max(0, Math.min(255, a));
          }if (b[3]) for (var d = 0; d < 3; d++) {
            b[d] = Math.round(c(b[d] / b[3]));
          }return b[3] = a.numberToString(a.clamp(0, 1, b[3])), "rgba(" + b.join(",") + ")";
        }];
      }var e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");e.width = e.height = 1;var f = e.getContext("2d");a.addPropertiesHandler(c, d, ["background-color", "border-bottom-color", "border-left-color", "border-right-color", "border-top-color", "color", "fill", "flood-color", "lighting-color", "outline-color", "stop-color", "stroke", "text-decoration-color"]), a.consumeColor = a.consumeParenthesised.bind(null, c), a.mergeColors = d;
    }(d), function (a, b) {
      function c(a) {
        function b() {
          var b = h.exec(a);g = b ? b[0] : void 0;
        }function c() {
          var a = Number(g);return b(), a;
        }function d() {
          if ("(" !== g) return c();b();var a = f();return ")" !== g ? NaN : (b(), a);
        }function e() {
          for (var a = d(); "*" === g || "/" === g;) {
            var c = g;b();var e = d();"*" === c ? a *= e : a /= e;
          }return a;
        }function f() {
          for (var a = e(); "+" === g || "-" === g;) {
            var c = g;b();var d = e();"+" === c ? a += d : a -= d;
          }return a;
        }var g,
            h = /([\+\-\w\.]+|[\(\)\*\/])/g;return b(), f();
      }function d(a, b) {
        if ("0" == (b = b.trim().toLowerCase()) && "px".search(a) >= 0) return { px: 0 };if (/^[^(]*$|^calc/.test(b)) {
          b = b.replace(/calc\(/g, "(");var d = {};b = b.replace(a, function (a) {
            return d[a] = null, "U" + a;
          });for (var e = "U(" + a.source + ")", f = b.replace(/[-+]?(\d*\.)?\d+([Ee][-+]?\d+)?/g, "N").replace(new RegExp("N" + e, "g"), "D").replace(/\s[+-]\s/g, "O").replace(/\s/g, ""), g = [/N\*(D)/g, /(N|D)[*\/]N/g, /(N|D)O\1/g, /\((N|D)\)/g], h = 0; h < g.length;) {
            g[h].test(f) ? (f = f.replace(g[h], "$1"), h = 0) : h++;
          }if ("D" == f) {
            for (var i in d) {
              var j = c(b.replace(new RegExp("U" + i, "g"), "").replace(new RegExp(e, "g"), "*0"));if (!isFinite(j)) return;d[i] = j;
            }return d;
          }
        }
      }function e(a, b) {
        return f(a, b, !0);
      }function f(b, c, d) {
        var e,
            f = [];for (e in b) {
          f.push(e);
        }for (e in c) {
          f.indexOf(e) < 0 && f.push(e);
        }return b = f.map(function (a) {
          return b[a] || 0;
        }), c = f.map(function (a) {
          return c[a] || 0;
        }), [b, c, function (b) {
          var c = b.map(function (c, e) {
            return 1 == b.length && d && (c = Math.max(c, 0)), a.numberToString(c) + f[e];
          }).join(" + ");return b.length > 1 ? "calc(" + c + ")" : c;
        }];
      }var g = "px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc",
          h = d.bind(null, new RegExp(g, "g")),
          i = d.bind(null, new RegExp(g + "|%", "g")),
          j = d.bind(null, /deg|rad|grad|turn/g);a.parseLength = h, a.parseLengthOrPercent = i, a.consumeLengthOrPercent = a.consumeParenthesised.bind(null, i), a.parseAngle = j, a.mergeDimensions = f;var k = a.consumeParenthesised.bind(null, h),
          l = a.consumeRepeated.bind(void 0, k, /^/),
          m = a.consumeRepeated.bind(void 0, l, /^,/);a.consumeSizePairList = m;var n = function n(a) {
        var b = m(a);if (b && "" == b[1]) return b[0];
      },
          o = a.mergeNestedRepeated.bind(void 0, e, " "),
          p = a.mergeNestedRepeated.bind(void 0, o, ",");a.mergeNonNegativeSizePair = o, a.addPropertiesHandler(n, p, ["background-size"]), a.addPropertiesHandler(i, e, ["border-bottom-width", "border-image-width", "border-left-width", "border-right-width", "border-top-width", "flex-basis", "font-size", "height", "line-height", "max-height", "max-width", "outline-width", "width"]), a.addPropertiesHandler(i, f, ["border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius", "bottom", "left", "letter-spacing", "margin-bottom", "margin-left", "margin-right", "margin-top", "min-height", "min-width", "outline-offset", "padding-bottom", "padding-left", "padding-right", "padding-top", "perspective", "right", "shape-margin", "stroke-dashoffset", "text-indent", "top", "vertical-align", "word-spacing"]);
    }(d), function (a, b) {
      function c(b) {
        return a.consumeLengthOrPercent(b) || a.consumeToken(/^auto/, b);
      }function d(b) {
        var d = a.consumeList([a.ignore(a.consumeToken.bind(null, /^rect/)), a.ignore(a.consumeToken.bind(null, /^\(/)), a.consumeRepeated.bind(null, c, /^,/), a.ignore(a.consumeToken.bind(null, /^\)/))], b);if (d && 4 == d[0].length) return d[0];
      }function e(b, c) {
        return "auto" == b || "auto" == c ? [!0, !1, function (d) {
          var e = d ? b : c;if ("auto" == e) return "auto";var f = a.mergeDimensions(e, e);return f[2](f[0]);
        }] : a.mergeDimensions(b, c);
      }function f(a) {
        return "rect(" + a + ")";
      }var g = a.mergeWrappedNestedRepeated.bind(null, f, e, ", ");a.parseBox = d, a.mergeBoxes = g, a.addPropertiesHandler(d, g, ["clip"]);
    }(d), function (a, b) {
      function c(a) {
        return function (b) {
          var c = 0;return a.map(function (a) {
            return a === k ? b[c++] : a;
          });
        };
      }function d(a) {
        return a;
      }function e(b) {
        if ("none" == (b = b.toLowerCase().trim())) return [];for (var c, d = /\s*(\w+)\(([^)]*)\)/g, e = [], f = 0; c = d.exec(b);) {
          if (c.index != f) return;f = c.index + c[0].length;var g = c[1],
              h = n[g];if (!h) return;var i = c[2].split(","),
              j = h[0];if (j.length < i.length) return;for (var k = [], o = 0; o < j.length; o++) {
            var p,
                q = i[o],
                r = j[o];if (void 0 === (p = q ? { A: function A(b) {
                return "0" == b.trim() ? m : a.parseAngle(b);
              }, N: a.parseNumber, T: a.parseLengthOrPercent, L: a.parseLength }[r.toUpperCase()](q) : { a: m, n: k[0], t: l }[r])) return;k.push(p);
          }if (e.push({ t: g, d: k }), d.lastIndex == b.length) return e;
        }
      }function f(a) {
        return a.toFixed(6).replace(".000000", "");
      }function g(b, c) {
        if (b.decompositionPair !== c) {
          b.decompositionPair = c;var d = a.makeMatrixDecomposition(b);
        }if (c.decompositionPair !== b) {
          c.decompositionPair = b;var e = a.makeMatrixDecomposition(c);
        }return null == d[0] || null == e[0] ? [[!1], [!0], function (a) {
          return a ? c[0].d : b[0].d;
        }] : (d[0].push(0), e[0].push(1), [d, e, function (b) {
          var c = a.quat(d[0][3], e[0][3], b[5]);return a.composeMatrix(b[0], b[1], b[2], c, b[4]).map(f).join(",");
        }]);
      }function h(a) {
        return a.replace(/[xy]/, "");
      }function i(a) {
        return a.replace(/(x|y|z|3d)?$/, "3d");
      }function j(b, c) {
        var d = a.makeMatrixDecomposition && !0,
            e = !1;if (!b.length || !c.length) {
          b.length || (e = !0, b = c, c = []);for (var f = 0; f < b.length; f++) {
            var j = b[f].t,
                k = b[f].d,
                l = "scale" == j.substr(0, 5) ? 1 : 0;c.push({ t: j, d: k.map(function (a) {
                if ("number" == typeof a) return l;var b = {};for (var c in a) {
                  b[c] = l;
                }return b;
              }) });
          }
        }var m = function m(a, b) {
          return "perspective" == a && "perspective" == b || ("matrix" == a || "matrix3d" == a) && ("matrix" == b || "matrix3d" == b);
        },
            o = [],
            p = [],
            q = [];if (b.length != c.length) {
          if (!d) return;var r = g(b, c);o = [r[0]], p = [r[1]], q = [["matrix", [r[2]]]];
        } else for (var f = 0; f < b.length; f++) {
          var j,
              s = b[f].t,
              t = c[f].t,
              u = b[f].d,
              v = c[f].d,
              w = n[s],
              x = n[t];if (m(s, t)) {
            if (!d) return;var r = g([b[f]], [c[f]]);o.push(r[0]), p.push(r[1]), q.push(["matrix", [r[2]]]);
          } else {
            if (s == t) j = s;else if (w[2] && x[2] && h(s) == h(t)) j = h(s), u = w[2](u), v = x[2](v);else {
              if (!w[1] || !x[1] || i(s) != i(t)) {
                if (!d) return;var r = g(b, c);o = [r[0]], p = [r[1]], q = [["matrix", [r[2]]]];break;
              }j = i(s), u = w[1](u), v = x[1](v);
            }for (var y = [], z = [], A = [], B = 0; B < u.length; B++) {
              var C = "number" == typeof u[B] ? a.mergeNumbers : a.mergeDimensions,
                  r = C(u[B], v[B]);y[B] = r[0], z[B] = r[1], A.push(r[2]);
            }o.push(y), p.push(z), q.push([j, A]);
          }
        }if (e) {
          var D = o;o = p, p = D;
        }return [o, p, function (a) {
          return a.map(function (a, b) {
            var c = a.map(function (a, c) {
              return q[b][1][c](a);
            }).join(",");return "matrix" == q[b][0] && 16 == c.split(",").length && (q[b][0] = "matrix3d"), q[b][0] + "(" + c + ")";
          }).join(" ");
        }];
      }var k = null,
          l = { px: 0 },
          m = { deg: 0 },
          n = { matrix: ["NNNNNN", [k, k, 0, 0, k, k, 0, 0, 0, 0, 1, 0, k, k, 0, 1], d], matrix3d: ["NNNNNNNNNNNNNNNN", d], rotate: ["A"], rotatex: ["A"], rotatey: ["A"], rotatez: ["A"], rotate3d: ["NNNA"], perspective: ["L"], scale: ["Nn", c([k, k, 1]), d], scalex: ["N", c([k, 1, 1]), c([k, 1])], scaley: ["N", c([1, k, 1]), c([1, k])], scalez: ["N", c([1, 1, k])], scale3d: ["NNN", d], skew: ["Aa", null, d], skewx: ["A", null, c([k, m])], skewy: ["A", null, c([m, k])], translate: ["Tt", c([k, k, l]), d], translatex: ["T", c([k, l, l]), c([k, l])], translatey: ["T", c([l, k, l]), c([l, k])], translatez: ["L", c([l, l, k])], translate3d: ["TTL", d] };a.addPropertiesHandler(e, j, ["transform"]), a.transformToSvgMatrix = function (b) {
        var c = a.transformListToMatrix(e(b));return "matrix(" + f(c[0]) + " " + f(c[1]) + " " + f(c[4]) + " " + f(c[5]) + " " + f(c[12]) + " " + f(c[13]) + ")";
      };
    }(d), function (a) {
      function b(a) {
        var b = Number(a);if (!(isNaN(b) || b < 100 || b > 900 || b % 100 != 0)) return b;
      }function c(b) {
        return b = 100 * Math.round(b / 100), b = a.clamp(100, 900, b), 400 === b ? "normal" : 700 === b ? "bold" : String(b);
      }function d(a, b) {
        return [a, b, c];
      }a.addPropertiesHandler(b, d, ["font-weight"]);
    }(d), function (a) {
      function b(a) {
        var b = {};for (var c in a) {
          b[c] = -a[c];
        }return b;
      }function c(b) {
        return a.consumeToken(/^(left|center|right|top|bottom)\b/i, b) || a.consumeLengthOrPercent(b);
      }function d(b, d) {
        var e = a.consumeRepeated(c, /^/, d);if (e && "" == e[1]) {
          var f = e[0];if (f[0] = f[0] || "center", f[1] = f[1] || "center", 3 == b && (f[2] = f[2] || { px: 0 }), f.length == b) {
            if (/top|bottom/.test(f[0]) || /left|right/.test(f[1])) {
              var h = f[0];f[0] = f[1], f[1] = h;
            }if (/left|right|center|Object/.test(f[0]) && /top|bottom|center|Object/.test(f[1])) return f.map(function (a) {
              return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? a : g[a];
            });
          }
        }
      }function e(d) {
        var e = a.consumeRepeated(c, /^/, d);if (e) {
          for (var f = e[0], h = [{ "%": 50 }, { "%": 50 }], i = 0, j = !1, k = 0; k < f.length; k++) {
            var l = f[k];"string" == typeof l ? (j = /bottom|right/.test(l), i = { left: 0, right: 0, center: i, top: 1, bottom: 1 }[l], h[i] = g[l], "center" == l && i++) : (j && (l = b(l), l["%"] = (l["%"] || 0) + 100), h[i] = l, i++, j = !1);
          }return [h, e[1]];
        }
      }function f(b) {
        var c = a.consumeRepeated(e, /^,/, b);if (c && "" == c[1]) return c[0];
      }var g = { left: { "%": 0 }, center: { "%": 50 }, right: { "%": 100 }, top: { "%": 0 }, bottom: { "%": 100 } },
          h = a.mergeNestedRepeated.bind(null, a.mergeDimensions, " ");a.addPropertiesHandler(d.bind(null, 3), h, ["transform-origin"]), a.addPropertiesHandler(d.bind(null, 2), h, ["perspective-origin"]), a.consumePosition = e, a.mergeOffsetList = h;var i = a.mergeNestedRepeated.bind(null, h, ", ");a.addPropertiesHandler(f, i, ["background-position", "object-position"]);
    }(d), function (a) {
      function b(b) {
        var c = a.consumeToken(/^circle/, b);if (c && c[0]) return ["circle"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0, /^\(/)), d, a.ignore(a.consumeToken.bind(void 0, /^at/)), a.consumePosition, a.ignore(a.consumeToken.bind(void 0, /^\)/))], c[1]));var f = a.consumeToken(/^ellipse/, b);if (f && f[0]) return ["ellipse"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0, /^\(/)), e, a.ignore(a.consumeToken.bind(void 0, /^at/)), a.consumePosition, a.ignore(a.consumeToken.bind(void 0, /^\)/))], f[1]));var g = a.consumeToken(/^polygon/, b);return g && g[0] ? ["polygon"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0, /^\(/)), a.optional(a.consumeToken.bind(void 0, /^nonzero\s*,|^evenodd\s*,/), "nonzero,"), a.consumeSizePairList, a.ignore(a.consumeToken.bind(void 0, /^\)/))], g[1])) : void 0;
      }function c(b, c) {
        if (b[0] === c[0]) return "circle" == b[0] ? a.mergeList(b.slice(1), c.slice(1), ["circle(", a.mergeDimensions, " at ", a.mergeOffsetList, ")"]) : "ellipse" == b[0] ? a.mergeList(b.slice(1), c.slice(1), ["ellipse(", a.mergeNonNegativeSizePair, " at ", a.mergeOffsetList, ")"]) : "polygon" == b[0] && b[1] == c[1] ? a.mergeList(b.slice(2), c.slice(2), ["polygon(", b[1], g, ")"]) : void 0;
      }var d = a.consumeParenthesised.bind(null, a.parseLengthOrPercent),
          e = a.consumeRepeated.bind(void 0, d, /^/),
          f = a.mergeNestedRepeated.bind(void 0, a.mergeDimensions, " "),
          g = a.mergeNestedRepeated.bind(void 0, f, ",");a.addPropertiesHandler(b, c, ["shape-outside"]);
    }(d), function (a, b) {
      function c(a, b) {
        b.concat([a]).forEach(function (b) {
          b in document.documentElement.style && (d[a] = b), e[b] = a;
        });
      }var d = {},
          e = {};c("transform", ["webkitTransform", "msTransform"]), c("transformOrigin", ["webkitTransformOrigin"]), c("perspective", ["webkitPerspective"]), c("perspectiveOrigin", ["webkitPerspectiveOrigin"]), a.propertyName = function (a) {
        return d[a] || a;
      }, a.unprefixedPropertyName = function (a) {
        return e[a] || a;
      };
    }(d);
  }(), function () {
    if (void 0 === document.createElement("div").animate([]).oncancel) {
      var a;if (window.performance && performance.now) var a = function a() {
        return performance.now();
      };else var a = function a() {
        return Date.now();
      };var b = function b(a, _b, c) {
        this.target = a, this.currentTime = _b, this.timelineTime = c, this.type = "cancel", this.bubbles = !1, this.cancelable = !1, this.currentTarget = a, this.defaultPrevented = !1, this.eventPhase = Event.AT_TARGET, this.timeStamp = Date.now();
      },
          c = window.Element.prototype.animate;window.Element.prototype.animate = function (d, e) {
        var f = c.call(this, d, e);f._cancelHandlers = [], f.oncancel = null;var g = f.cancel;f.cancel = function () {
          g.call(this);var c = new b(this, null, a()),
              d = this._cancelHandlers.concat(this.oncancel ? [this.oncancel] : []);setTimeout(function () {
            d.forEach(function (a) {
              a.call(c.target, c);
            });
          }, 0);
        };var h = f.addEventListener;f.addEventListener = function (a, b) {
          "function" == typeof b && "cancel" == a ? this._cancelHandlers.push(b) : h.call(this, a, b);
        };var i = f.removeEventListener;return f.removeEventListener = function (a, b) {
          if ("cancel" == a) {
            var c = this._cancelHandlers.indexOf(b);c >= 0 && this._cancelHandlers.splice(c, 1);
          } else i.call(this, a, b);
        }, f;
      };
    }
  }(), function (a) {
    var b = document.documentElement,
        c = null,
        d = !1;try {
      var e = getComputedStyle(b).getPropertyValue("opacity"),
          f = "0" == e ? "1" : "0";c = b.animate({ opacity: [f, f] }, { duration: 1 }), c.currentTime = 0, d = getComputedStyle(b).getPropertyValue("opacity") == f;
    } catch (a) {} finally {
      c && c.cancel();
    }if (!d) {
      var g = window.Element.prototype.animate;window.Element.prototype.animate = function (b, c) {
        return window.Symbol && Symbol.iterator && Array.prototype.from && b[Symbol.iterator] && (b = Array.from(b)), Array.isArray(b) || null === b || (b = a.convertToArrayForm(b)), g.call(this, b, c);
      };
    }
  }(c), b.true = a;
}({}, function () {
  return this;
}());
//# sourceMappingURL=web-animations.min.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// NOTE: This file has been modified to set `usePrefixes: false`!

/*!
 * modernizr v3.5.0
 * Build https://modernizr.com/download?-classlist-cssanimations-csspointerevents-cssremunit-csstransforms-customevent-documentfragment-eventlistener-history-matchmedia-opacity-promises-queryselector-requestanimationframe-touchevents-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;(function (window, document, undefined) {
  var tests = [];

  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.5.0',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix': '',
      'enableClasses': true,
      'enableJSClass': true,
      'usePrefixes': false
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function on(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function () {
        cb(self[test]);
      }, 0);
    },

    addTest: function addTest(name, fn, options) {
      tests.push({ name: name, fn: fn, options: options });
    },

    addAsyncTest: function addAsyncTest(fn) {
      tests.push({ name: null, fn: fn });
    }
  };

  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function Modernizr() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  /*!
  {
    "name": "CustomEvent",
    "property": "customevent",
    "tags": ["customevent"],
    "authors": ["Alberto Elias"],
    "notes": [{
      "name": "W3C DOM reference",
      "href": "https://www.w3.org/TR/DOM-Level-3-Events/#interface-CustomEvent"
    }, {
      "name": "MDN documentation",
      "href": "https://developer.mozilla.org/en/docs/Web/API/CustomEvent"
    }],
    "polyfills": ["eventlistener"]
  }
  !*/
  /* DOC
  
  Detects support for CustomEvent.
  
  */

  Modernizr.addTest('customevent', 'CustomEvent' in window && typeof window.CustomEvent === 'function');

  /*!
  {
    "name": "Event Listener",
    "property": "eventlistener",
    "authors": ["Andrew Betts (@triblondon)"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Registration-interfaces"
    }],
    "polyfills": ["eventlistener"]
  }
  !*/
  /* DOC
  Detects native support for addEventListener
  */

  Modernizr.addTest('eventlistener', 'addEventListener' in window);

  /*!
  {
    "name": "History API",
    "property": "history",
    "caniuse": "history",
    "tags": ["history"],
    "authors": ["Hay Kranen", "Alexander Farkas"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/html51/browsers.html#the-history-interface"
    }, {
      "name": "MDN documentation",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
    }],
    "polyfills": ["historyjs", "html5historyapi"]
  }
  !*/
  /* DOC
  Detects support for the History API for manipulating the browser session history.
  */

  Modernizr.addTest('history', function () {
    // Issue #733
    // The stock browser on Android 2.2 & 2.3, and 4.0.x returns positive on history support
    // Unfortunately support is really buggy and there is no clean way to detect
    // these bugs, so we fall back to a user agent sniff :(
    var ua = navigator.userAgent;

    // We only want Android 2 and 4.0, stock browser, and not Chrome which identifies
    // itself as 'Mobile Safari' as well, nor Windows Phone (issue #1471).
    if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1 &&
    // Since all documents on file:// share an origin, the History apis are
    // blocked there as well
    location.protocol !== 'file:') {
      return false;
    }

    // Return the regular check
    return window.history && 'pushState' in window.history;
  });

  /*!
  {
    "name": "QuerySelector",
    "property": "queryselector",
    "caniuse": "queryselector",
    "tags": ["queryselector"],
    "authors": ["Andrew Betts (@triblondon)"],
    "notes": [{
      "name" : "W3C Selectors reference",
      "href": "https://www.w3.org/TR/selectors-api/#queryselectorall"
    }],
    "polyfills": ["css-selector-engine"]
  }
  !*/
  /* DOC
  Detects support for querySelector.
  */

  Modernizr.addTest('queryselector', 'querySelector' in document && 'querySelectorAll' in document);

  /*!
  {
    "name": "ES6 Promises",
    "property": "promises",
    "caniuse": "promises",
    "polyfills": ["es6promises"],
    "authors": ["Krister Kari", "Jake Archibald"],
    "tags": ["es6"],
    "notes": [{
      "name": "The ES6 promises spec",
      "href": "https://github.com/domenic/promises-unwrapping"
    },{
      "name": "Chromium dashboard - ES6 Promises",
      "href": "https://www.chromestatus.com/features/5681726336532480"
    },{
      "name": "JavaScript Promises: There and back again - HTML5 Rocks",
      "href": "http://www.html5rocks.com/en/tutorials/es6/promises/"
    }]
  }
  !*/
  /* DOC
  Check if browser implements ECMAScript 6 Promises per specification.
  */

  Modernizr.addTest('promises', function () {
    return 'Promise' in window &&
    // Some of these methods are missing from
    // Firefox/Chrome experimental implementations
    'resolve' in window.Promise && 'reject' in window.Promise && 'all' in window.Promise && 'race' in window.Promise &&
    // Older version of the spec had a resolver object
    // as the arg rather than a function
    function () {
      var resolve;
      new window.Promise(function (r) {
        resolve = r;
      });
      return typeof resolve === 'function';
    }();
  });

  var classes = [];

  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === type;
  }
  ;

  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;

        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  ;

  /**
   * List of property values to set for css tests. See ticket #21
   * http://git.io/vUGl4
   *
   * @memberof Modernizr
   * @name Modernizr._prefixes
   * @optionName Modernizr._prefixes
   * @optionProp prefixes
   * @access public
   * @example
   *
   * Modernizr._prefixes is the internal list of prefixes that we test against
   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
   * an array of kebab-case vendor prefixes you can use within your code.
   *
   * Some common use cases include
   *
   * Generating all possible prefixed version of a CSS property
   * ```js
   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
   *
   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
   * ```
   *
   * Generating all possible prefixed version of a CSS value
   * ```js
   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
   *
   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
   * ```
   */

  // we use ['',''] rather than an empty array in order to allow a pattern of .`join()`ing prefixes to test
  // values in feature detects to continue to work
  var prefixes = ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];

  // expose these for the plugin API. Look in the source for how to join() them against your input
  ModernizrProto._prefixes = prefixes;

  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;

  /*!
  {
    "name": "classList",
    "caniuse": "classlist",
    "property": "classlist",
    "tags": ["dom"],
    "builderAliases": ["dataview_api"],
    "notes": [{
      "name": "MDN Docs",
      "href": "https://developer.mozilla.org/en/DOM/element.classList"
    }]
  }
  !*/

  Modernizr.addTest('classlist', 'classList' in docElement);

  /*!
  {
    "name": "Document Fragment",
    "property": "documentfragment",
    "notes": [{
      "name": "W3C DOM Level 1 Reference",
      "href": "https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-B63ED1A3"
    }, {
      "name": "SitePoint Reference",
      "href": "http://reference.sitepoint.com/javascript/DocumentFragment"
    }, {
      "name": "QuirksMode Compatibility Tables",
      "href": "http://www.quirksmode.org/m/w3c_core.html#t112"
    }],
    "authors": ["Ron Waldon (@jokeyrhyme)"],
    "knownBugs": ["false-positive on Blackberry 9500, see QuirksMode note"],
    "tags": []
  }
  !*/
  /* DOC
  Append multiple elements to the DOM within a single insertion.
  */

  Modernizr.addTest('documentfragment', function () {
    return 'createDocumentFragment' in document && 'appendChild' in docElement;
  });

  /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */

  function cssToDOM(name) {
    return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
      return m1 + m2.toUpperCase();
    }).replace(/^-/, '');
  }
  ;

  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';

  /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */

  function createElement() {
    if (typeof document.createElement !== 'function') {
      // This is the case in IE7, where the type of createElement is "object".
      // For this reason, we cannot call apply() as Object is not a Function.
      return document.createElement(arguments[0]);
    } else if (isSVG) {
      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
    } else {
      return document.createElement.apply(document, arguments);
    }
  }

  ;
  /*!
  {
    "name": "CSS Opacity",
    "caniuse": "css-opacity",
    "property": "opacity",
    "tags": ["css"]
  }
  !*/

  // Browsers that actually have CSS Opacity implemented have done so
  // according to spec, which means their return values are within the
  // range of [0.0,1.0] - including the leading zero.

  Modernizr.addTest('opacity', function () {
    var style = createElement('a').style;
    style.cssText = prefixes.join('opacity:.55;');

    // The non-literal . in this regex is intentional:
    // German Chrome returns this value as 0,55
    // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
    return (/^0.55$/.test(style.opacity)
    );
  });

  /*!
  {
    "name": "CSS Pointer Events",
    "caniuse": "pointer-events",
    "property": "csspointerevents",
    "authors": ["ausi"],
    "tags": ["css"],
    "builderAliases": ["css_pointerevents"],
    "notes": [
      {
        "name": "MDN Docs",
        "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events"
      },{
        "name": "Test Project Page",
        "href": "https://ausi.github.com/Feature-detection-technique-for-pointer-events/"
      },{
        "name": "Test Project Wiki",
        "href": "https://github.com/ausi/Feature-detection-technique-for-pointer-events/wiki"
      },
      {
        "name": "Related Github Issue",
        "href": "https://github.com/Modernizr/Modernizr/issues/80"
      }
    ]
  }
  !*/

  Modernizr.addTest('csspointerevents', function () {
    var style = createElement('a').style;
    style.cssText = 'pointer-events:auto';
    return style.pointerEvents === 'auto';
  });

  /*!
  {
    "name": "CSS Font rem Units",
    "caniuse": "rem",
    "authors": ["nsfmc"],
    "property": "cssremunit",
    "tags": ["css"],
    "builderAliases": ["css_remunit"],
    "notes": [{
      "name": "W3C Spec",
      "href": "https://www.w3.org/TR/css3-values/#relative0"
    },{
      "name": "Font Size with rem by Jonathan Snook",
      "href": "http://snook.ca/archives/html_and_css/font-size-with-rem"
    }]
  }
  !*/

  // "The 'rem' unit ('root em') is relative to the computed
  // value of the 'font-size' value of the root element."
  // you can test by checking if the prop was ditched

  Modernizr.addTest('cssremunit', function () {
    var style = createElement('a').style;
    try {
      style.fontSize = '3rem';
    } catch (e) {}
    return (/rem/.test(style.fontSize)
    );
  });

  /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */

  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if (!body) {
      // Can't use the real body create a fake one.
      body = createElement(isSVG ? 'svg' : 'body');
      body.fake = true;
    }

    return body;
  }

  ;

  /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */

  function injectElementWithStyles(rule, callback, nodes, testnames) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if (parseInt(nodes, 10)) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while (nodes--) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    style = createElement('style');
    style.type = 'text/css';
    style.id = 's' + mod;

    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).appendChild(style);
    body.appendChild(div);

    if (style.styleSheet) {
      style.styleSheet.cssText = rule;
    } else {
      style.appendChild(document.createTextNode(rule));
    }
    div.id = mod;

    if (body.fake) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if (body.fake) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      // eslint-disable-next-line
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;
  }

  ;

  /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */

  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;

  /*!
  {
    "name": "Touch Events",
    "property": "touchevents",
    "caniuse" : "touch",
    "tags": ["media", "attribute"],
    "notes": [{
      "name": "Touch Events spec",
      "href": "https://www.w3.org/TR/2013/WD-touch-events-20130124/"
    }],
    "warnings": [
      "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
    ],
    "knownBugs": [
      "False-positive on some configurations of Nokia N900",
      "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
    ]
  }
  !*/
  /* DOC
  Indicates if the browser supports the W3C Touch Events API.
  
  This *does not* necessarily reflect a touchscreen device:
  
  * Older touchscreen devices only emulate mouse events
  * Modern IE touch devices implement the Pointer Events API instead: use `Modernizr.pointerevents` to detect support for that
  * Some browsers & OS setups may enable touch APIs when no touchscreen is connected
  * Future browsers may implement other event models for touch interactions
  
  See this article: [You Can't Detect A Touchscreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).
  
  It's recommended to bind both mouse and touch/pointer events simultaneously – see [this HTML5 Rocks tutorial](http://www.html5rocks.com/en/mobile/touchandmouse/).
  
  This test will also return `true` for Firefox 4 Multitouch support.
  */

  // Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
  Modernizr.addTest('touchevents', function () {
    var bool;
    if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    } else {
      // include the 'heartz' as a way to have a non matching MQ to help terminate the join
      // https://git.io/vznFH
      var query = ['@media (', prefixes.join('touch-enabled),('), 'heartz', ')', '{#modernizr{top:9px;position:absolute}}'].join('');
      testStyles(query, function (node) {
        bool = node.offsetTop === 9;
      });
    }
    return bool;
  });

  /**
   * If the browsers follow the spec, then they would expose vendor-specific styles as:
   *   elem.style.WebkitBorderRadius
   * instead of something like the following (which is technically incorrect):
   *   elem.style.webkitBorderRadius
     * WebKit ghosts their properties in lowercase but Opera & Moz do not.
   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
   *   erik.eae.net/archives/2008/03/10/21.48.10/
     * More here: github.com/Modernizr/Modernizr/issues/issue/21
   *
   * @access private
   * @returns {string} The string representing the vendor-specific style properties
   */

  var omPrefixes = 'Moz O ms Webkit';

  var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : [];
  ModernizrProto._cssomPrefixes = cssomPrefixes;

  /**
   * atRule returns a given CSS property at-rule (eg @keyframes), possibly in
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @memberof Modernizr
   * @name Modernizr.atRule
   * @optionName Modernizr.atRule()
   * @optionProp atRule
   * @access public
   * @function atRule
   * @param {string} prop - String name of the @-rule to test for
   * @returns {string|boolean} The string representing the (possibly prefixed)
   * valid version of the @-rule, or `false` when it is unsupported.
   * @example
   * ```js
   *  var keyframes = Modernizr.atRule('@keyframes');
   *
   *  if (keyframes) {
   *    // keyframes are supported
   *    // could be `@-webkit-keyframes` or `@keyframes`
   *  } else {
   *    // keyframes === `false`
   *  }
   * ```
   *
   */

  var atRule = function atRule(prop) {
    var length = prefixes.length;
    var cssrule = window.CSSRule;
    var rule;

    if (typeof cssrule === 'undefined') {
      return undefined;
    }

    if (!prop) {
      return false;
    }

    // remove literal @ from beginning of provided property
    prop = prop.replace(/^@/, '');

    // CSSRules use underscores instead of dashes
    rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';

    if (rule in cssrule) {
      return '@' + prop;
    }

    for (var i = 0; i < length; i++) {
      // prefixes gives us something like -o-, and we want O_
      var prefix = prefixes[i];
      var thisRule = prefix.toUpperCase() + '_' + rule;

      if (thisRule in cssrule) {
        return '@-' + prefix.toLowerCase() + '-' + prop;
      }
    }

    return false;
  };

  ModernizrProto.atRule = atRule;

  /**
   * List of JavaScript DOM values used for tests
   *
   * @memberof Modernizr
   * @name Modernizr._domPrefixes
   * @optionName Modernizr._domPrefixes
   * @optionProp domPrefixes
   * @access public
   * @example
   *
   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
   * than kebab-case properties, all properties are their Capitalized variant
   *
   * ```js
   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
   * ```
   */

  var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : [];
  ModernizrProto._domPrefixes = domPrefixes;

  /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */

  function contains(str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  ;

  /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */

  function fnBind(fn, that) {
    return function () {
      return fn.apply(that, arguments);
    };
  }

  ;

  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *
   * @access private
   * @function testDOMProps
   * @param {array.<string>} props - An array of properties to test for
   * @param {object} obj - An object or Element you want to use to test the parameters again
   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
   * @returns {false|*} returns false if the prop is unsupported, otherwise the value that is supported
   */
  function testDOMProps(props, obj, elem) {
    var item;

    for (var i in props) {
      if (props[i] in obj) {

        // return the property name as a string
        if (elem === false) {
          return props[i];
        }

        item = obj[props[i]];

        // let's bind a function
        if (is(item, 'function')) {
          // bind to obj unless overriden
          return fnBind(item, elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  ;

  /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */

  var modElem = {
    elem: createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function () {
    delete modElem.elem;
  });

  var mStyle = {
    style: modElem.elem.style
  };

  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function () {
    delete mStyle.style;
  });

  /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */

  function domToCSS(name) {
    return name.replace(/([A-Z])/g, function (str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }
  ;

  /**
   * wrapper around getComputedStyle, to fix issues with Firefox returning null when
   * called inside of a hidden iframe
   *
   * @access private
   * @function computedStyle
   * @param {HTMLElement|SVGElement} - The element we want to find the computed styles of
   * @param {string|null} [pseudoSelector]- An optional pseudo element selector (e.g. :before), of null if none
   * @returns {CSSStyleDeclaration}
   */

  function computedStyle(elem, pseudo, prop) {
    var result;

    if ('getComputedStyle' in window) {
      result = getComputedStyle.call(window, elem, pseudo);
      var console = window.console;

      if (result !== null) {
        if (prop) {
          result = result.getPropertyValue(prop);
        }
      } else {
        if (console) {
          var method = console.error ? 'error' : 'log';
          console[method].call(console, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
        }
      }
    } else {
      result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
    }

    return result;
  }

  ;

  /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */

  // Accepts a list of property names and a single value
  // Returns `undefined` if native detection not available
  function nativeTestProps(props, value) {
    var i = props.length;
    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
    if ('CSS' in window && 'supports' in window.CSS) {
      // Try every prefixed variant of the property
      while (i--) {
        if (window.CSS.supports(domToCSS(props[i]), value)) {
          return true;
        }
      }
      return false;
    }
    // Otherwise fall back to at-rule (for Opera 12.x)
    else if ('CSSSupportsRule' in window) {
        // Build a condition string for every prefixed variant
        var conditionText = [];
        while (i--) {
          conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
        }
        conditionText = conditionText.join(' or ');
        return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function (node) {
          return computedStyle(node, null, 'position') == 'absolute';
        });
      }
    return undefined;
  }
  ;

  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Property names can be provided in either camelCase or kebab-case.

  function testProps(props, prefixed, value, skipValueTest) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);
      if (!is(result, 'undefined')) {
        return result;
      }
    }

    // Otherwise do it properly
    var afterInit, i, propsLength, prop, before;

    // If we don't have a style element, that means we're running async or after
    // the core tests, so we'll need to create our own elements to use

    // inside of an SVG element, in certain browsers, the `style` element is only
    // defined for valid tags. Therefore, if `modernizr` does not have one, we
    // fall back to a less used element and hope for the best.
    // for strict XHTML browsers the hardly used samp element is used
    var elems = ['modernizr', 'tspan', 'samp'];
    while (!mStyle.style && elems.length) {
      afterInit = true;
      mStyle.modElem = createElement(elems.shift());
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    propsLength = props.length;
    for (i = 0; i < propsLength; i++) {
      prop = props[i];
      before = mStyle.style[prop];

      if (contains(prop, '-')) {
        prop = cssToDOM(prop);
      }

      if (mStyle.style[prop] !== undefined) {

        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {

          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {}

          // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()
          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        }
        // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
      }
    }
    cleanElems();
    return false;
  }

  ;

  /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   *
   * @access private
   * @function testPropsAll
   * @param {string} prop - A string of the property to test for
   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
   * @param {string} [value] - A string of a css value
   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
   * @returns {false|string} returns the string version of the property, or false if it is unsupported
   */
  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    // did they call .prefixed('boxSizing') or are we just testing a prop?
    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
      return testProps(props, prefixed, value, skipValueTest);

      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
    } else {
      props = (prop + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  // Modernizr.testAllProps() investigates whether a given style property,
  // or any of its vendor-prefixed variants, is recognized
  //
  // Note that the property names must be provided in the camelCase variant.
  // Modernizr.testAllProps('boxSizing')
  ModernizrProto.testAllProps = testPropsAll;

  /**
   * prefixed returns the prefixed or nonprefixed property name variant of your input
   *
   * @memberof Modernizr
   * @name Modernizr.prefixed
   * @optionName Modernizr.prefixed()
   * @optionProp prefixed
   * @access public
   * @function prefixed
   * @param {string} prop - String name of the property to test for
   * @param {object} [obj] - An object to test for the prefixed properties on
   * @param {HTMLElement} [elem] - An element used to test specific properties against
   * @returns {string|false} The string representing the (possibly prefixed) valid
   * version of the property, or `false` when it is unsupported.
   * @example
   *
   * Modernizr.prefixed takes a string css value in the DOM style camelCase (as
   * opposed to the css style kebab-case) form and returns the (possibly prefixed)
   * version of that property that the browser actually supports.
   *
   * For example, in older Firefox...
   * ```js
   * prefixed('boxSizing')
   * ```
   * returns 'MozBoxSizing'
   *
   * In newer Firefox, as well as any other browser that support the unprefixed
   * version would simply return `boxSizing`. Any browser that does not support
   * the property at all, it will return `false`.
   *
   * By default, prefixed is checked against a DOM element. If you want to check
   * for a property on another object, just pass it as a second argument
   *
   * ```js
   * var rAF = prefixed('requestAnimationFrame', window);
   *
   * raf(function() {
   *  renderFunction();
   * })
   * ```
   *
   * Note that this will return _the actual function_ - not the name of the function.
   * If you need the actual name of the property, pass in `false` as a third argument
   *
   * ```js
   * var rAFProp = prefixed('requestAnimationFrame', window, false);
   *
   * rafProp === 'WebkitRequestAnimationFrame' // in older webkit
   * ```
   *
   * One common use case for prefixed is if you're trying to determine which transition
   * end event to bind to, you might do something like...
   * ```js
   * var transEndEventNames = {
   *     'WebkitTransition' : 'webkitTransitionEnd', * Saf 6, Android Browser
   *     'MozTransition'    : 'transitionend',       * only for FF < 15
   *     'transition'       : 'transitionend'        * IE10, Opera, Chrome, FF 15+, Saf 7+
   * };
   *
   * var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
   * ```
   *
   * If you want a similar lookup, but in kebab-case, you can use [prefixedCSS](#modernizr-prefixedcss).
   */

  var prefixed = ModernizrProto.prefixed = function (prop, obj, elem) {
    if (prop.indexOf('@') === 0) {
      return atRule(prop);
    }

    if (prop.indexOf('-') != -1) {
      // Convert kebab-case to camelCase
      prop = cssToDOM(prop);
    }
    if (!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
      return testPropsAll(prop, obj, elem);
    }
  };

  /*!
  {
    "name": "requestAnimationFrame",
    "property": "requestanimationframe",
    "aliases": ["raf"],
    "caniuse": "requestanimationframe",
    "tags": ["animation"],
    "authors": ["Addy Osmani"],
    "notes": [{
      "name": "W3C spec",
      "href": "https://www.w3.org/TR/animation-timing/"
    }],
    "polyfills": ["raf"]
  }
  !*/
  /* DOC
  Detects support for the `window.requestAnimationFrame` API, for offloading animation repainting to the browser for optimized performance.
  */

  Modernizr.addTest('requestanimationframe', !!prefixed('requestAnimationFrame', window), { aliases: ['raf'] });

  /*!
  {
    "name": "matchMedia",
    "property": "matchmedia",
    "caniuse" : "matchmedia",
    "tags": ["matchmedia"],
    "authors": ["Alberto Elias"],
    "notes": [{
      "name": "W3C CSSOM View Module",
      "href": "https://drafts.csswg.org/cssom-view/#the-mediaquerylist-interface"
    }, {
      "name": "MDN documentation",
      "href": "https://developer.mozilla.org/en-US/docs/Web/API/Window.matchMedia"
    }],
    "polyfills": ["matchmediajs"]
  }
  !*/
  /* DOC
  
  Detects support for matchMedia.
  
  */

  Modernizr.addTest('matchmedia', !!prefixed('matchMedia', window));

  /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */

  function testAllProps(prop, value, skipValueTest) {
    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
  }
  ModernizrProto.testAllProps = testAllProps;

  /*!
  {
    "name": "CSS Animations",
    "property": "cssanimations",
    "caniuse": "css-animation",
    "polyfills": ["transformie", "csssandpaper"],
    "tags": ["css"],
    "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
    "notes": [{
      "name" : "Article: 'Dispelling the Android CSS animation myths'",
      "href": "https://goo.gl/OGw5Gm"
    }]
  }
  !*/
  /* DOC
  Detects whether or not elements can be animated using CSS
  */

  Modernizr.addTest('cssanimations', testAllProps('animationName', 'a', true));

  /*!
  {
    "name": "CSS Transforms",
    "property": "csstransforms",
    "caniuse": "transforms2d",
    "tags": ["css"]
  }
  !*/

  Modernizr.addTest('csstransforms', function () {
    // Android < 3.0 is buggy, so we sniff and blacklist
    // http://git.io/hHzL7w
    return navigator.userAgent.indexOf('Android 2.') === -1 && testAllProps('transform', 'scale(1)', true);
  });

  // Run each test
  testRunner();

  delete ModernizrProto.addTest;
  delete ModernizrProto.addAsyncTest;

  // Run the things that are supposed to run after the tests
  for (var i = 0; i < Modernizr._q.length; i++) {
    Modernizr._q[i]();
  }

  // Leak Modernizr namespace
  window.Modernizr = Modernizr;

  ;
})(window, document);

/***/ }),
/* 30 */
/***/ (function(module, exports) {

if (!('content' in document.createElement('template'))) {
  var templates = document.getElementsByTagName('template');
  var plateLen = templates.length;

  for (var x = 0; x < plateLen; ++x) {
    var template = templates[x];
    var content = template.childNodes;
    var fragment = document.createDocumentFragment();

    while (content[0]) {
      fragment.appendChild(content[0]);
    }

    template.content = fragment;
  }
}

/***/ }),
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(1);
var $forEach = __webpack_require__(17)(0);
var STRICT = __webpack_require__(44)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(34);
var IE8_DOM_DEFINE = __webpack_require__(35);
var toPrimitive = __webpack_require__(37);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(5)(function () {
  return Object.defineProperty(__webpack_require__(36)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var document = __webpack_require__(4).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var hide = __webpack_require__(7);
var has = __webpack_require__(14);
var SRC = __webpack_require__(9)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(0).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(41);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var isArray = __webpack_require__(42);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }return C === undefined ? Array : C;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(11);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(5);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () {/* empty */}, 1) : method.call(null);
  });
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(1);

$export($export.P, 'Function', { bind: __webpack_require__(46) });

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(16);
var isObject = __webpack_require__(2);
var invoke = __webpack_require__(47);
var arraySlice = [].slice;
var factories = {};

var construct = function construct(F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) {
      n[i] = 'a[' + i + ']';
    } // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function bound() /* args... */{
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
                  var un = that === undefined;
                  switch (args.length) {
                                    case 0:
                                                      return un ? fn() : fn.call(that);
                                    case 1:
                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
                                    case 2:
                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                    case 3:
                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                    case 4:
                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                  }return fn.apply(that, args);
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(49);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(51)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../css-loader/index.js!./style.css", function() {
		var newContent = require("!!../../css-loader/index.js!./style.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50)(false);
// imports


// module
exports.push([module.i, "@media screen {\n  .hy-drawer-scrim {\n    position: fixed;\n    top: 0;\n    left: 0;\n    height: 100vh;\n    width: 100vw;\n    z-index: 20;\n    opacity: 0;\n    pointer-events: none;\n    background: rgba(0, 0, 0, 0.5);\n    transform: translateX(0);\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  .hy-drawer-content {\n    position: fixed;\n    top: 0;\n    height: 100vh;\n    z-index: 30;\n    overflow-x: hidden;\n    overflow-y: auto;\n    transform: translateX(0);\n    width: 300px;\n    background: #e8e8e8;\n    box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);\n    contain: strict;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .hy-drawer-content.hy-drawer-left {\n    left: -300px;\n  }\n\n  .hy-drawer-content.hy-drawer-right {\n    right: -300px;\n  }\n\n  .hy-drawer-content.hy-drawer-left.hy-drawer-opened {\n    left: 0 !important;\n    transform: translateX(0) !important;\n  }\n\n  .hy-drawer-content.hy-drawer-right.hy-drawer-opened {\n    right: 0 !important;\n    transform: translateX(0) !important;\n  }\n\n  .hy-drawer-grab {\n    cursor: move;\n    cursor: -webkit-grab;\n    cursor: -moz-grab;\n    cursor: grab;\n  }\n\n  .hy-drawer-grabbing {\n    cursor: -webkit-grabbing;\n    cursor: -moz-grabbing;\n    cursor: grabbing;\n  }\n}\n\n@media print {\n  .hy-drawer-scrim {\n    display: none !important;\n  }\n\n  .hy-drawer-content {\n    transform: none !important;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(52);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 52 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(55) });

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)

var getKeys = __webpack_require__(56);
var gOPS = __webpack_require__(61);
var pIE = __webpack_require__(62);
var toObject = __webpack_require__(18);
var IObject = __webpack_require__(10);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(5)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }return T;
} : $assign;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(57);
var enumBugKeys = __webpack_require__(60);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIObject = __webpack_require__(22);
var arrayIndexOf = __webpack_require__(23)(false);
var IE_PROTO = __webpack_require__(59)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(20);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(21)('keys');
var uid = __webpack_require__(9);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 60 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),
/* 61 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 62 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
module.exports = __webpack_require__(0).String.includes;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)


var $export = __webpack_require__(1);
var context = __webpack_require__(65);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(67)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(66);
var defined = __webpack_require__(12);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(2);
var cof = __webpack_require__(11);
var MATCH = __webpack_require__(6)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(6)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) {/* empty */}
  }return true;
};

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _root; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
/*@__PURE__*/(function () {
    if (!_root) {
        throw (/*@__PURE__*/new Error('RxJS could not find any global context (window, self, global)')
        );
    }
})();

//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(69)))

/***/ }),
/* 69 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
module.exports = __webpack_require__(0).Array.find;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $export = __webpack_require__(1);
var $find = __webpack_require__(17)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(24)(KEY);

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colorString = __webpack_require__(73);
var convert = __webpack_require__(76);

var _slice = [].slice;

var skippedModels = [
// to be honest, I don't really feel like keyword belongs in color convert, but eh.
'keyword',

// gray conflicts with some method names, and has its own method defined.
'gray',

// shouldn't really be in color-convert either...
'hex'];

var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
	hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in convert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (!obj) {
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = convert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = convert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [obj >> 16 & 0xFF, obj >> 8 & 0xFF, obj & 0xFF];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = convert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = convert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function toString() {
		return this.string();
	},

	toJSON: function toJSON() {
		return this[this.model]();
	},

	string: function string(places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function percentString(places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function array() {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function object() {
		var result = {};
		var channels = convert[this.model].channels;
		var labels = convert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function unitArray() {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function unitObject() {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function round(places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function alpha(val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) {
		return (val % 360 + 360) % 360;
	}), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function keyword(val) {
		if (arguments.length) {
			return new Color(val);
		}

		return convert[this.model].keyword(this.color);
	},

	hex: function hex(val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function rgbNumber() {
		var rgb = this.rgb().color;
		return (rgb[0] & 0xFF) << 16 | (rgb[1] & 0xFF) << 8 | rgb[2] & 0xFF;
	},

	luminosity: function luminosity() {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function contrast(color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function level(color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return contrastRatio >= 4.5 ? 'AA' : '';
	},

	isDark: function isDark() {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function isLight() {
		return !this.isDark();
	},

	negate: function negate() {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function lighten(ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function darken(ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function saturate(ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function desaturate(ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function whiten(ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function blacken(ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function grayscale() {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function fade(ratio) {
		return this.alpha(this.valpha - this.valpha * ratio);
	},

	opaquer: function opaquer(ratio) {
		return this.alpha(this.valpha + this.valpha * ratio);
	},

	rotate: function rotate(degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function mix(mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(convert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = convert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

module.exports = Color;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(25);
var swizzle = __webpack_require__(74);

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return { model: model, value: val };
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round(parseInt(hexAlpha, 16) / 255 * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round(parseInt(hexAlpha + hexAlpha, 16) / 255 * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) % 360 + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) % 360 + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return '#' + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : '');
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1 ? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')' : 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1 ? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)' : 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1 ? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)' : 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return str.length < 2 ? '0' + str : str;
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(75);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== 'String');
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var conversions = __webpack_require__(26);
var route = __webpack_require__(77);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function wrappedFn(args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function wrappedFn(args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', { value: conversions[fromModel].channels });
	Object.defineProperty(convert[fromModel], 'labels', { value: conversions[fromModel].labels });

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(26);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// <3 Modernizr
// https://raw.githubusercontent.com/Modernizr/Modernizr/master/feature-detects/dom/dataset.js

function useNative() {
	var elem = document.createElement('div');
	elem.setAttribute('data-a-b', 'c');

	return Boolean(elem.dataset && elem.dataset.aB === 'c');
}

function nativeDataset(element) {
	return element.dataset;
}

module.exports = useNative() ? nativeDataset : function (element) {
	var map = {};
	var attributes = element.attributes;

	function getter() {
		return this.value;
	}

	function setter(name, value) {
		if (typeof value === 'undefined') {
			this.removeAttribute(name);
		} else {
			this.setAttribute(name, value);
		}
	}

	for (var i = 0, j = attributes.length; i < j; i++) {
		var attribute = attributes[i];

		if (attribute) {
			var name = attribute.name;

			if (name.indexOf('data-') === 0) {
				var prop = name.slice(5).replace(/-./g, function (u) {
					return u.charAt(1).toUpperCase();
				});

				var value = attribute.value;

				Object.defineProperty(map, prop, {
					enumerable: true,
					get: getter.bind({ value: value || '' }),
					set: setter.bind(element, name)
				});
			}
		}
	}

	return map;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
module.exports = __webpack_require__(0).Array.includes;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes

var $export = __webpack_require__(1);
var $includes = __webpack_require__(23)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(24)('includes');

/***/ })
/******/ ]);
//# sourceMappingURL=hydejack-7.5.2.js.map