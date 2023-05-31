'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var url = "http://localhost:8080/user_page_cl_serv/";

var UserInfo = function (_React$Component) {
    _inherits(UserInfo, _React$Component);

    //Create class UserInfo
    function UserInfo(props) {
        _classCallCheck(this, UserInfo);

        var _this = _possibleConstructorReturn(this, (UserInfo.__proto__ || Object.getPrototypeOf(UserInfo)).call(this, props));

        _this.state = {
            name: null, //User name in our database
            posts: null, //User posts in our database
            checkUser: null, //User posts in our database
            isUser: null, //is user and sessiom match
            isSub: null //is user sub on it
        };
        // Эта привязка обязательна для работы `this` в колбэке.
        _this.addPost = _this.addPost.bind(_this);
        _this.subOff = _this.subOff.bind(_this);
        _this.subOn = _this.subOn.bind(_this);
        return _this;
    }

    _createClass(UserInfo, [{
        key: "mySubs",
        value: function mySubs() {
            // Using fetch in React
            var body = {
                "type": "mySubs",
                "link": window.location.href
            };

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                window.location.href = response.redirect_url;
            });
        }
    }, {
        key: "subsOnMe",
        value: function subsOnMe() {
            // Using fetch in React
            var body = {
                "type": "subsOnMe",
                "link": window.location.href
            };

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                window.location.href = response.redirect_url;
            });
        }
    }, {
        key: "checkPage",
        value: function checkPage() {
            var _this2 = this;

            // Using fetch in React
            var body = {
                "type": "checkPage",
                "link": window.location.href
            };

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                _this2.setState({
                    isUser: response.isUser,
                    isSub: response.isSub
                });
            }).then(function (response) {
                if (_this2.state.isSub) {
                    _this2.setState({
                        checkUser: React.createElement(
                            "div",
                            null,
                            React.createElement("br", null),
                            React.createElement(
                                "button",
                                { "class": "btn btn_theme_base1 btn_theme_base", type: "button", id: "subOn", onClick: _this2.subOff },
                                React.createElement(
                                    "span",
                                    { "class": "btn__text" },
                                    "\u041E\u0442\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
                                )
                            )
                        )
                    });
                } else {
                    _this2.setState({
                        checkUser: React.createElement(
                            "div",
                            null,
                            React.createElement("br", null),
                            React.createElement(
                                "button",
                                { "class": "btn btn_theme_base1 btn_theme_base", type: "button", id: "subOn", onClick: _this2.subOn },
                                React.createElement(
                                    "span",
                                    { "class": "btn__text" },
                                    "\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
                                )
                            )
                        )
                    });
                }
            });
        }
    }, {
        key: "getPosts",
        value: function getPosts() {
            var _this3 = this;

            // Using fetch in React
            var body = {
                "type": "getUser",
                "link": window.location.href
            };

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                _this3.setState({
                    name: response.name,
                    posts: response.posts
                });
            }).then(function (response) {
                _this3.setState({
                    posts: _this3.state.posts.map(function (post) {
                        return React.createElement(
                            "li",
                            { className: "post" },
                            React.createElement(
                                "span",
                                { className: "post_name" },
                                _this3.state.name
                            ),
                            React.createElement(
                                "div",
                                { className: "post_text" },
                                post[1]
                            )
                        );
                    })
                });
            });
        }
    }, {
        key: "addPost",
        value: function addPost(e) {
            var _this4 = this;

            e.preventDefault();
            if ($("#textarea").val()) {
                var body = {
                    "type": "addPost",
                    "text": $("#textarea").val(),
                    "link": window.location.href
                };
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify(body)
                }).then(function (response) {
                    return response.json();
                }).then(function (response) {
                    $("#textarea").val(""); // Clear textarea
                    _this4.getPosts(); //Reload posts
                });
            }
        }
    }, {
        key: "subOff",
        value: function subOff(e) {
            var _this5 = this;

            e.preventDefault();
            var body = {
                "type": "unSub",
                "link": window.location.href
            };
            fetch(url, {
                method: "POST",
                body: JSON.stringify(body)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                _this5.setState({
                    checkUser: React.createElement(
                        "div",
                        null,
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { "class": "btn btn_theme_base1 btn_theme_base", type: "button", id: "subOn", onClick: _this5.subOn },
                            React.createElement(
                                "span",
                                { "class": "btn__text" },
                                "\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
                            )
                        )
                    )
                });
            });
        }
    }, {
        key: "subOn",
        value: function subOn(e) {
            var _this6 = this;

            e.preventDefault();
            var body = {
                "type": "addSub",
                "link": window.location.href
            };
            fetch(url, {
                method: "POST",
                body: JSON.stringify(body)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                _this6.setState({
                    checkUser: React.createElement(
                        "div",
                        null,
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { "class": "btn btn_theme_base1 btn_theme_base", type: "button", id: "subOn", onClick: _this6.subOff },
                            React.createElement(
                                "span",
                                { "class": "btn__text" },
                                "\u041E\u0442\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F"
                            )
                        )
                    )
                });
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.getPosts();
            this.checkPage();
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.isUser) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { id: "user_name" },
                        this.state.name,
                        React.createElement(
                            "div",
                            { id: "mySubs", onClick: this.mySubs, className: "subs" },
                            "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0438"
                        ),
                        React.createElement(
                            "div",
                            { id: "subsOnMe", onClick: this.subsOnMe, className: "subs" },
                            "\u041F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u0438"
                        ),
                        React.createElement("textarea", { id: "textarea", className: "input-box__input-text", placeholder: "\u041F\u043E\u0434\u0435\u043B\u0438\u0441\u044C \u0441\u0432\u043E\u0438\u043C\u0438 \u043C\u044B\u0441\u043B\u044F\u043C\u0438" }),
                        React.createElement(
                            "button",
                            { "class": "btn btn_theme_base1 btn_theme_base", type: "button", id: "add_but", onClick: this.addPost },
                            React.createElement(
                                "span",
                                { "class": "btn__text" },
                                "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C"
                            )
                        )
                    ),
                    React.createElement(
                        "ul",
                        null,
                        this.state.posts
                    )
                );
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { id: "user_name" },
                    this.state.name,
                    React.createElement(
                        "div",
                        { id: "mySubs", onClick: this.mySubs, className: "subs" },
                        "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0438"
                    ),
                    React.createElement(
                        "div",
                        { id: "subsOnMe", onClick: this.subsOnMe, className: "subs" },
                        "\u041F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u0438"
                    ),
                    React.createElement("br", null),
                    this.state.checkUser
                ),
                React.createElement(
                    "ul",
                    null,
                    this.state.posts
                )
            );
        }
    }]);

    return UserInfo;
}(React.Component);

var mainElement = document.querySelector('#main');
ReactDOM.render(React.createElement(UserInfo, null), mainElement);