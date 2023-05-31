'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Auth = function (_React$Component) {
    _inherits(Auth, _React$Component);

    function Auth() {
        _classCallCheck(this, Auth);

        return _possibleConstructorReturn(this, (Auth.__proto__ || Object.getPrototypeOf(Auth)).apply(this, arguments));
    }

    _createClass(Auth, [{
        key: "render",
        //Create class Auth
        value: function render() {
            return React.createElement(
                "div",
                { className: "auth_form" },
                React.createElement(TabList, null),
                React.createElement(Log, null),
                React.createElement(Reg, null)
            );
        }
    }]);

    return Auth;
}(React.Component);

var TabList = function (_React$Component2) {
    _inherits(TabList, _React$Component2);

    function TabList() {
        _classCallCheck(this, TabList);

        return _possibleConstructorReturn(this, (TabList.__proto__ || Object.getPrototypeOf(TabList)).apply(this, arguments));
    }

    _createClass(TabList, [{
        key: "render",
        //Create class TabList
        value: function render() {
            return React.createElement(
                "ul",
                { className: "tab-list", id: "tab-list" },
                React.createElement(
                    "li",
                    { className: "active" },
                    React.createElement(
                        "a",
                        { className: "tab-control", href: "#tab-1" },
                        React.createElement(
                            "h3",
                            { className: "tabs-h" },
                            "\u0412\u0445\u043E\u0434"
                        )
                    )
                ),
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { className: "tab-control", href: "#tab-2" },
                        React.createElement(
                            "h3",
                            { className: "tabs-h" },
                            "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F"
                        )
                    )
                )
            );
        }
    }]);

    return TabList;
}(React.Component);

var Log = function (_React$Component3) {
    _inherits(Log, _React$Component3);

    function Log() {
        _classCallCheck(this, Log);

        return _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).apply(this, arguments));
    }

    _createClass(Log, [{
        key: "render",
        //Create class Log
        value: function render() {
            return React.createElement(
                "div",
                { className: "tab-panel active wrapper", id: "tab-1" },
                React.createElement(
                    "form",
                    { id: "log_form" },
                    React.createElement("input", { "class": "input-box__input-text", type: "text", placeholder: "login", id: "login" }),
                    React.createElement("br", null),
                    React.createElement("input", { "class": "input-box__input-text", type: "password", placeholder: "password", id: "password" }),
                    React.createElement("div", { id: "error_log" }),
                    React.createElement(
                        "button",
                        { "class": "btn btn_theme_base", type: "button", id: "log_but" },
                        React.createElement(
                            "span",
                            { "class": "btn__text" },
                            "Log in"
                        )
                    )
                )
            );
        }
    }]);

    return Log;
}(React.Component);

var Reg = function (_React$Component4) {
    _inherits(Reg, _React$Component4);

    function Reg() {
        _classCallCheck(this, Reg);

        return _possibleConstructorReturn(this, (Reg.__proto__ || Object.getPrototypeOf(Reg)).apply(this, arguments));
    }

    _createClass(Reg, [{
        key: "render",
        //Create class Reg
        value: function render() {
            return React.createElement(
                "div",
                { className: "tab-panel wrapper", id: "tab-2" },
                React.createElement(
                    "form",
                    { id: "reg_form" },
                    React.createElement("input", { "class": "input-box__input-text", type: "text", placeholder: "name", id: "name" }),
                    React.createElement("br", null),
                    React.createElement("input", { "class": "input-box__input-text", type: "text", placeholder: "login", id: "login_reg" }),
                    React.createElement("br", null),
                    React.createElement("input", { "class": "input-box__input-text", type: "password", placeholder: "password", id: "password_reg" }),
                    React.createElement("br", null),
                    React.createElement("input", { "class": "input-box__input-text", type: "password", placeholder: "repeat password", id: "password_reg_reapeat" }),
                    React.createElement("div", { id: "error_reg" }),
                    React.createElement(
                        "button",
                        { "class": "btn btn_theme_base", type: "button", id: "reg_but" },
                        React.createElement(
                            "span",
                            { "class": "btn__text" },
                            "Registration"
                        )
                    )
                )
            );
        }
    }]);

    return Reg;
}(React.Component);

var mainElement = document.querySelector('#main');
ReactDOM.render(React.createElement(Auth, null), mainElement);