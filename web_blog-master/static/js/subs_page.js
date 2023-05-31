'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var url = "http://localhost:8080/subs_page_cl_serv/";

var Subs = function (_React$Component) {
    _inherits(Subs, _React$Component);

    //Create class Subs
    function Subs(props) {
        _classCallCheck(this, Subs);

        var _this = _possibleConstructorReturn(this, (Subs.__proto__ || Object.getPrototypeOf(Subs)).call(this, props));

        _this.state = {
            subs: null //User subs
        };
        // Эта привязка обязательна для работы `this` в колбэке.
        _this.unSub = _this.unSub.bind(_this);
        return _this;
    }

    _createClass(Subs, [{
        key: "getSubs",
        value: function getSubs() {
            var _this2 = this;

            // Using fetch in React
            var body = void 0;
            if (window.location.href.split("/")[3] == "subscriptions") {
                body = {
                    "type": "mySubs",
                    "link": window.location.href
                };
            } else if (window.location.href.split("/")[3] == "subscribers") {
                body = {
                    "type": "subsOnMe",
                    "link": window.location.href
                };
            }

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                _this2.setState({
                    subs: response.subs
                });
            }).then(function (response) {
                if (window.location.href.split("/")[3] == "subscriptions") {
                    _this2.setState({
                        subs: _this2.state.subs.map(function (sub) {
                            return React.createElement(
                                "li",
                                { id: sub[0], className: "user_sub sub_name", onClick: _this2.openSub },
                                sub[1],
                                React.createElement(
                                    "button",
                                    { name: sub[0], "class": "btn btn_theme_base1 btn_theme_base btn__text", type: "button", id: "unsub_but", onClick: _this2.unSub },
                                    "\u041E\u0442\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
                                )
                            );
                        })
                    });
                } else if (window.location.href.split("/")[3] == "subscribers") {
                    _this2.setState({
                        subs: _this2.state.subs.map(function (sub) {
                            return React.createElement(
                                "li",
                                { id: sub[0], className: "user_sub sub_name", onClick: _this2.openSub },
                                sub[1]
                            );
                        })
                    });
                }
            });
        }
    }, {
        key: "openSub",
        value: function openSub(e) {
            if (e.target.tagName == "LI") {
                window.location.href = "http://localhost:8080/?profile=" + e.target.id;
            }
        }
    }, {
        key: "unSub",
        value: function unSub(e) {
            var _this3 = this;

            e.preventDefault();
            console.log();
            var body = {
                "type": "unSub",
                "subs": e.target.name,
                "link": window.location.href
            };

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                _this3.getSubs(); //Reload posts
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.getSubs();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "ul",
                null,
                this.state.subs
            );
        }
    }]);

    return Subs;
}(React.Component);

var mainElement = document.querySelector('#main');
ReactDOM.render(React.createElement(Subs, null), mainElement);