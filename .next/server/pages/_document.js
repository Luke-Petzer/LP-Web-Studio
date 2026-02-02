"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./pages/_document.tsx":
/*!*****************************!*\
  !*** ./pages/_document.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Document)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Document() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n        lang: \"en\",\n        className: \"light\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"preconnect\",\n                        href: \"https://fonts.googleapis.com\"\n                    }, void 0, false, {\n                        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                        lineNumber: 8,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"preconnect\",\n                        href: \"https://fonts.gstatic.com\",\n                        crossOrigin: \"anonymous\"\n                    }, void 0, false, {\n                        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                        lineNumber: 9,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"preconnect\",\n                        href: \"https://connect.facebook.net\"\n                    }, void 0, false, {\n                        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                        lineNumber: 10,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"dns-prefetch\",\n                        href: \"https://www.facebook.com\"\n                    }, void 0, false, {\n                        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                        lineNumber: 13,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n                        dangerouslySetInnerHTML: {\n                            __html: `\n              !function(f,b,e,v,n,t,s)\n              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n              n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n              n.queue=[];t=b.createElement(e);t.async=!0;\n              t.src=v;s=b.getElementsByTagName(e)[0];\n              s.parentNode.insertBefore(t,s)}(window, document,'script',\n              'https://connect.facebook.net/en_US/fbevents.js');\n              fbq('init', '1462119881508675');\n              fbq('track', 'PageView');\n            `\n                        }\n                    }, void 0, false, {\n                        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                        lineNumber: 16,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"noscript\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                            height: \"1\",\n                            width: \"1\",\n                            style: {\n                                display: \"none\"\n                            },\n                            alt: \"\",\n                            src: \"https://www.facebook.com/tr?id=1462119881508675&ev=PageView&noscript=1\"\n                        }, void 0, false, {\n                            fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                            lineNumber: 33,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n                        dangerouslySetInnerHTML: {\n                            __html: `\n              (function() {\n                try {\n                  var theme = localStorage.getItem('theme') || 'light';\n                  document.documentElement.classList.add(theme);\n                  if (theme === 'dark') {\n                    document.documentElement.classList.remove('light');\n                  } else {\n                    document.documentElement.classList.remove('dark');\n                  }\n                } catch (e) {}\n              })();\n            `\n                        }\n                    }, void 0, false, {\n                        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                        lineNumber: 43,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                lineNumber: 6,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                        lineNumber: 62,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                        lineNumber: 63,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n                lineNumber: 61,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_document.tsx\",\n        lineNumber: 5,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZG9jdW1lbnQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUE2RDtBQUU5QyxTQUFTSTtJQUN0QixxQkFDRSw4REFBQ0osK0NBQUlBO1FBQUNLLE1BQUs7UUFBS0MsV0FBVTs7MEJBQ3hCLDhEQUFDTCwrQ0FBSUE7O2tDQUVILDhEQUFDTTt3QkFBS0MsS0FBSTt3QkFBYUMsTUFBSzs7Ozs7O2tDQUM1Qiw4REFBQ0Y7d0JBQUtDLEtBQUk7d0JBQWFDLE1BQUs7d0JBQTRCQyxhQUFZOzs7Ozs7a0NBQ3BFLDhEQUFDSDt3QkFBS0MsS0FBSTt3QkFBYUMsTUFBSzs7Ozs7O2tDQUc1Qiw4REFBQ0Y7d0JBQUtDLEtBQUk7d0JBQWVDLE1BQUs7Ozs7OztrQ0FHOUIsOERBQUNFO3dCQUNDQyx5QkFBeUI7NEJBQ3ZCQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7O1lBV1QsQ0FBQzt3QkFDSDs7Ozs7O2tDQUVGLDhEQUFDQztrQ0FDQyw0RUFBQ0M7NEJBQ0NDLFFBQU87NEJBQ1BDLE9BQU07NEJBQ05DLE9BQU87Z0NBQUVDLFNBQVM7NEJBQU87NEJBQ3pCQyxLQUFJOzRCQUNKQyxLQUFJOzs7Ozs7Ozs7OztrQ0FLUiw4REFBQ1Y7d0JBQ0NDLHlCQUF5Qjs0QkFDdkJDLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7O1lBWVQsQ0FBQzt3QkFDSDs7Ozs7Ozs7Ozs7OzBCQUdKLDhEQUFDUzs7a0NBQ0MsOERBQUNwQiwrQ0FBSUE7Ozs7O2tDQUNMLDhEQUFDQyxxREFBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSW5CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHB3ZWJzdHVkaW8tbmV4dGpzLy4vcGFnZXMvX2RvY3VtZW50LnRzeD9kMzdkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0bWwsIEhlYWQsIE1haW4sIE5leHRTY3JpcHQgfSBmcm9tICduZXh0L2RvY3VtZW50JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRG9jdW1lbnQoKSB7XG4gIHJldHVybiAoXG4gICAgPEh0bWwgbGFuZz1cImVuXCIgY2xhc3NOYW1lPVwibGlnaHRcIj5cbiAgICAgIDxIZWFkPlxuICAgICAgICB7LyogUHJlY29ubmVjdCB0byBleHRlcm5hbCBkb21haW5zIGZvciBmYXN0ZXIgbG9hZGluZyAqL31cbiAgICAgICAgPGxpbmsgcmVsPVwicHJlY29ubmVjdFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tXCIgLz5cbiAgICAgICAgPGxpbmsgcmVsPVwicHJlY29ubmVjdFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tXCIgY3Jvc3NPcmlnaW49XCJhbm9ueW1vdXNcIiAvPlxuICAgICAgICA8bGluayByZWw9XCJwcmVjb25uZWN0XCIgaHJlZj1cImh0dHBzOi8vY29ubmVjdC5mYWNlYm9vay5uZXRcIiAvPlxuXG4gICAgICAgIHsvKiBETlMgUHJlZmV0Y2ggZm9yIGV4dGVybmFsIHJlc291cmNlcyAqL31cbiAgICAgICAgPGxpbmsgcmVsPVwiZG5zLXByZWZldGNoXCIgaHJlZj1cImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbVwiIC8+XG5cbiAgICAgICAgey8qIE1ldGEgUGl4ZWwgQ29kZSAqL31cbiAgICAgICAgPHNjcmlwdFxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XG4gICAgICAgICAgICBfX2h0bWw6IGBcbiAgICAgICAgICAgICAgIWZ1bmN0aW9uKGYsYixlLHYsbix0LHMpXG4gICAgICAgICAgICAgIHtpZihmLmZicSlyZXR1cm47bj1mLmZicT1mdW5jdGlvbigpe24uY2FsbE1ldGhvZD9cbiAgICAgICAgICAgICAgbi5jYWxsTWV0aG9kLmFwcGx5KG4sYXJndW1lbnRzKTpuLnF1ZXVlLnB1c2goYXJndW1lbnRzKX07XG4gICAgICAgICAgICAgIGlmKCFmLl9mYnEpZi5fZmJxPW47bi5wdXNoPW47bi5sb2FkZWQ9ITA7bi52ZXJzaW9uPScyLjAnO1xuICAgICAgICAgICAgICBuLnF1ZXVlPVtdO3Q9Yi5jcmVhdGVFbGVtZW50KGUpO3QuYXN5bmM9ITA7XG4gICAgICAgICAgICAgIHQuc3JjPXY7cz1iLmdldEVsZW1lbnRzQnlUYWdOYW1lKGUpWzBdO1xuICAgICAgICAgICAgICBzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHQscyl9KHdpbmRvdywgZG9jdW1lbnQsJ3NjcmlwdCcsXG4gICAgICAgICAgICAgICdodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL2ZiZXZlbnRzLmpzJyk7XG4gICAgICAgICAgICAgIGZicSgnaW5pdCcsICcxNDYyMTE5ODgxNTA4Njc1Jyk7XG4gICAgICAgICAgICAgIGZicSgndHJhY2snLCAnUGFnZVZpZXcnKTtcbiAgICAgICAgICAgIGAsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICAgPG5vc2NyaXB0PlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIGhlaWdodD1cIjFcIlxuICAgICAgICAgICAgd2lkdGg9XCIxXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS90cj9pZD0xNDYyMTE5ODgxNTA4Njc1JmV2PVBhZ2VWaWV3Jm5vc2NyaXB0PTFcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvbm9zY3JpcHQ+XG5cbiAgICAgICAgey8qIFByZXZlbnQgZmxhc2ggb2YgdW5zdHlsZWQgY29udGVudCBieSBhcHBseWluZyB0aGVtZSBiZWZvcmUgUmVhY3QgaHlkcmF0ZXMgKi99XG4gICAgICAgIDxzY3JpcHRcbiAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xuICAgICAgICAgICAgX19odG1sOiBgXG4gICAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgdmFyIHRoZW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RoZW1lJykgfHwgJ2xpZ2h0JztcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoZW1lKTtcbiAgICAgICAgICAgICAgICAgIGlmICh0aGVtZSA9PT0gJ2RhcmsnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsaWdodCcpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmsnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgYCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9IZWFkPlxuICAgICAgPGJvZHk+XG4gICAgICAgIDxNYWluIC8+XG4gICAgICAgIDxOZXh0U2NyaXB0IC8+XG4gICAgICA8L2JvZHk+XG4gICAgPC9IdG1sPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIkh0bWwiLCJIZWFkIiwiTWFpbiIsIk5leHRTY3JpcHQiLCJEb2N1bWVudCIsImxhbmciLCJjbGFzc05hbWUiLCJsaW5rIiwicmVsIiwiaHJlZiIsImNyb3NzT3JpZ2luIiwic2NyaXB0IiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJfX2h0bWwiLCJub3NjcmlwdCIsImltZyIsImhlaWdodCIsIndpZHRoIiwic3R5bGUiLCJkaXNwbGF5IiwiYWx0Iiwic3JjIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_document.tsx\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_document.tsx")));
module.exports = __webpack_exports__;

})();