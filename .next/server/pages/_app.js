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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./contexts/ThemeContext.tsx":
/*!***********************************!*\
  !*** ./contexts/ThemeContext.tsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),\n/* harmony export */   useTheme: () => (/* binding */ useTheme)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction ThemeProvider({ children }) {\n    const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"dark\");\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    // Load theme from localStorage on mount\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        setMounted(true);\n        // Only access localStorage in browser\n        if (false) {}\n    }, []);\n    // Update document class and localStorage when theme changes\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!mounted || \"undefined\" === \"undefined\") return;\n        const root = document.documentElement;\n        if (theme === \"dark\") {\n            root.classList.add(\"dark\");\n            root.classList.remove(\"light\");\n        } else {\n            root.classList.add(\"light\");\n            root.classList.remove(\"dark\");\n        }\n        localStorage.setItem(\"theme\", theme);\n    }, [\n        theme,\n        mounted\n    ]);\n    const toggleTheme = ()=>{\n        setTheme((prev)=>prev === \"dark\" ? \"light\" : \"dark\");\n    };\n    // Prevent flash of unstyled content - render children immediately on server\n    // but wait for mount on client\n    if (true) {\n        // Server-side: render immediately with dark theme\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n            value: {\n                theme: \"dark\",\n                toggleTheme\n            },\n            children: children\n        }, void 0, false, {\n            fileName: \"/Users/lukepetzer/Personal-Website-Updated/contexts/ThemeContext.tsx\",\n            lineNumber: 58,\n            columnNumber: 7\n        }, this);\n    }\n    // Client-side: wait for mount to prevent hydration mismatch\n    if (!mounted) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n            value: {\n                theme: \"dark\",\n                toggleTheme\n            },\n            children: children\n        }, void 0, false, {\n            fileName: \"/Users/lukepetzer/Personal-Website-Updated/contexts/ThemeContext.tsx\",\n            lineNumber: 67,\n            columnNumber: 7\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            theme,\n            toggleTheme\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/lukepetzer/Personal-Website-Updated/contexts/ThemeContext.tsx\",\n        lineNumber: 74,\n        columnNumber: 5\n    }, this);\n}\nfunction useTheme() {\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);\n    if (context === undefined) {\n        throw new Error(\"useTheme must be used within a ThemeProvider\");\n    }\n    return context;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9UaGVtZUNvbnRleHQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBOEU7QUFTOUUsTUFBTUssNkJBQWVKLG9EQUFhQSxDQUErQks7QUFFMUQsU0FBU0MsY0FBYyxFQUFFQyxRQUFRLEVBQWlDO0lBQ3ZFLE1BQU0sQ0FBQ0MsT0FBT0MsU0FBUyxHQUFHTiwrQ0FBUUEsQ0FBUTtJQUMxQyxNQUFNLENBQUNPLFNBQVNDLFdBQVcsR0FBR1IsK0NBQVFBLENBQUM7SUFFdkMsd0NBQXdDO0lBQ3hDRCxnREFBU0EsQ0FBQztRQUNSUyxXQUFXO1FBRVgsc0NBQXNDO1FBQ3RDLElBQUksS0FBa0IsRUFBYSxFQVFsQztJQUNILEdBQUcsRUFBRTtJQUVMLDREQUE0RDtJQUM1RFQsZ0RBQVNBLENBQUM7UUFDUixJQUFJLENBQUNRLFdBQVcsZ0JBQWtCLGFBQWE7UUFFL0MsTUFBTUssT0FBT0MsU0FBU0MsZUFBZTtRQUVyQyxJQUFJVCxVQUFVLFFBQVE7WUFDcEJPLEtBQUtHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDO1lBQ25CSixLQUFLRyxTQUFTLENBQUNFLE1BQU0sQ0FBQztRQUN4QixPQUFPO1lBQ0xMLEtBQUtHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDO1lBQ25CSixLQUFLRyxTQUFTLENBQUNFLE1BQU0sQ0FBQztRQUN4QjtRQUVBUCxhQUFhUSxPQUFPLENBQUMsU0FBU2I7SUFDaEMsR0FBRztRQUFDQTtRQUFPRTtLQUFRO0lBRW5CLE1BQU1ZLGNBQWM7UUFDbEJiLFNBQVNjLENBQUFBLE9BQVFBLFNBQVMsU0FBUyxVQUFVO0lBQy9DO0lBRUEsNEVBQTRFO0lBQzVFLCtCQUErQjtJQUMvQixJQUFJLElBQWtCLEVBQWE7UUFDakMsa0RBQWtEO1FBQ2xELHFCQUNFLDhEQUFDbkIsYUFBYW9CLFFBQVE7WUFBQ0MsT0FBTztnQkFBRWpCLE9BQU87Z0JBQVFjO1lBQVk7c0JBQ3hEZjs7Ozs7O0lBR1A7SUFFQSw0REFBNEQ7SUFDNUQsSUFBSSxDQUFDRyxTQUFTO1FBQ1oscUJBQ0UsOERBQUNOLGFBQWFvQixRQUFRO1lBQUNDLE9BQU87Z0JBQUVqQixPQUFPO2dCQUFRYztZQUFZO3NCQUN4RGY7Ozs7OztJQUdQO0lBRUEscUJBQ0UsOERBQUNILGFBQWFvQixRQUFRO1FBQUNDLE9BQU87WUFBRWpCO1lBQU9jO1FBQVk7a0JBQ2hEZjs7Ozs7O0FBR1A7QUFFTyxTQUFTbUI7SUFDZCxNQUFNQyxVQUFVMUIsaURBQVVBLENBQUNHO0lBQzNCLElBQUl1QixZQUFZdEIsV0FBVztRQUN6QixNQUFNLElBQUl1QixNQUFNO0lBQ2xCO0lBQ0EsT0FBT0Q7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL2xwd2Vic3R1ZGlvLW5leHRqcy8uL2NvbnRleHRzL1RoZW1lQ29udGV4dC50c3g/OTI1NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxudHlwZSBUaGVtZSA9ICdsaWdodCcgfCAnZGFyayc7XG5cbmludGVyZmFjZSBUaGVtZUNvbnRleHRUeXBlIHtcbiAgdGhlbWU6IFRoZW1lO1xuICB0b2dnbGVUaGVtZTogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgVGhlbWVDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxUaGVtZUNvbnRleHRUeXBlIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG5leHBvcnQgZnVuY3Rpb24gVGhlbWVQcm92aWRlcih7IGNoaWxkcmVuIH06IHsgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9KSB7XG4gIGNvbnN0IFt0aGVtZSwgc2V0VGhlbWVdID0gdXNlU3RhdGU8VGhlbWU+KCdkYXJrJyk7XG4gIGNvbnN0IFttb3VudGVkLCBzZXRNb3VudGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBMb2FkIHRoZW1lIGZyb20gbG9jYWxTdG9yYWdlIG9uIG1vdW50XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0TW91bnRlZCh0cnVlKTtcblxuICAgIC8vIE9ubHkgYWNjZXNzIGxvY2FsU3RvcmFnZSBpbiBicm93c2VyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBzYXZlZFRoZW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RoZW1lJykgYXMgVGhlbWUgfCBudWxsO1xuICAgICAgaWYgKHNhdmVkVGhlbWUpIHtcbiAgICAgICAgc2V0VGhlbWUoc2F2ZWRUaGVtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEZWZhdWx0IHRvIGRhcmsgbW9kZVxuICAgICAgICBzZXRUaGVtZSgnZGFyaycpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW10pO1xuXG4gIC8vIFVwZGF0ZSBkb2N1bWVudCBjbGFzcyBhbmQgbG9jYWxTdG9yYWdlIHdoZW4gdGhlbWUgY2hhbmdlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbW91bnRlZCB8fCB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgIGlmICh0aGVtZSA9PT0gJ2RhcmsnKSB7XG4gICAgICByb290LmNsYXNzTGlzdC5hZGQoJ2RhcmsnKTtcbiAgICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZSgnbGlnaHQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdC5jbGFzc0xpc3QuYWRkKCdsaWdodCcpO1xuICAgICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrJyk7XG4gICAgfVxuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RoZW1lJywgdGhlbWUpO1xuICB9LCBbdGhlbWUsIG1vdW50ZWRdKTtcblxuICBjb25zdCB0b2dnbGVUaGVtZSA9ICgpID0+IHtcbiAgICBzZXRUaGVtZShwcmV2ID0+IHByZXYgPT09ICdkYXJrJyA/ICdsaWdodCcgOiAnZGFyaycpO1xuICB9O1xuXG4gIC8vIFByZXZlbnQgZmxhc2ggb2YgdW5zdHlsZWQgY29udGVudCAtIHJlbmRlciBjaGlsZHJlbiBpbW1lZGlhdGVseSBvbiBzZXJ2ZXJcbiAgLy8gYnV0IHdhaXQgZm9yIG1vdW50IG9uIGNsaWVudFxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBTZXJ2ZXItc2lkZTogcmVuZGVyIGltbWVkaWF0ZWx5IHdpdGggZGFyayB0aGVtZVxuICAgIHJldHVybiAoXG4gICAgICA8VGhlbWVDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHRoZW1lOiAnZGFyaycsIHRvZ2dsZVRoZW1lIH19PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L1RoZW1lQ29udGV4dC5Qcm92aWRlcj5cbiAgICApO1xuICB9XG5cbiAgLy8gQ2xpZW50LXNpZGU6IHdhaXQgZm9yIG1vdW50IHRvIHByZXZlbnQgaHlkcmF0aW9uIG1pc21hdGNoXG4gIGlmICghbW91bnRlZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8VGhlbWVDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHRoZW1lOiAnZGFyaycsIHRvZ2dsZVRoZW1lIH19PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L1RoZW1lQ29udGV4dC5Qcm92aWRlcj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8VGhlbWVDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHRoZW1lLCB0b2dnbGVUaGVtZSB9fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1RoZW1lQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRoZW1lKCkge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChUaGVtZUNvbnRleHQpO1xuICBpZiAoY29udGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VUaGVtZSBtdXN0IGJlIHVzZWQgd2l0aGluIGEgVGhlbWVQcm92aWRlcicpO1xuICB9XG4gIHJldHVybiBjb250ZXh0O1xufVxuXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiVGhlbWVDb250ZXh0IiwidW5kZWZpbmVkIiwiVGhlbWVQcm92aWRlciIsImNoaWxkcmVuIiwidGhlbWUiLCJzZXRUaGVtZSIsIm1vdW50ZWQiLCJzZXRNb3VudGVkIiwic2F2ZWRUaGVtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJyb290IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJzZXRJdGVtIiwidG9nZ2xlVGhlbWUiLCJwcmV2IiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZVRoZW1lIiwiY29udGV4dCIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./contexts/ThemeContext.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet-async */ \"react-helmet-async\");\n/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_helmet_async__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _contexts_ThemeContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/ThemeContext */ \"./contexts/ThemeContext.tsx\");\n/* harmony import */ var _src_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/index.css */ \"./src/index.css\");\n/* harmony import */ var _src_index_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_index_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_helmet_async__WEBPACK_IMPORTED_MODULE_1__.HelmetProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_ThemeContext__WEBPACK_IMPORTED_MODULE_2__.ThemeProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_app.tsx\",\n                lineNumber: 10,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_app.tsx\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/lukepetzer/Personal-Website-Updated/pages/_app.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDb0Q7QUFDSztBQUMvQjtBQUUxQixTQUFTRSxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQy9DLHFCQUNFLDhEQUFDSiw4REFBY0E7a0JBQ2IsNEVBQUNDLGlFQUFhQTtzQkFDWiw0RUFBQ0U7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7OztBQUloQztBQUVBLGlFQUFlRixLQUFLQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHB3ZWJzdHVkaW8tbmV4dGpzLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnO1xuaW1wb3J0IHsgSGVsbWV0UHJvdmlkZXIgfSBmcm9tICdyZWFjdC1oZWxtZXQtYXN5bmMnO1xuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHRzL1RoZW1lQ29udGV4dCc7XG5pbXBvcnQgJy4uL3NyYy9pbmRleC5jc3MnO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPEhlbG1ldFByb3ZpZGVyPlxuICAgICAgPFRoZW1lUHJvdmlkZXI+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICA8L0hlbG1ldFByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDsiXSwibmFtZXMiOlsiSGVsbWV0UHJvdmlkZXIiLCJUaGVtZVByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-helmet-async":
/*!*************************************!*\
  !*** external "react-helmet-async" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-helmet-async");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();