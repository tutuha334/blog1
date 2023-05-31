'use strict';

class Auth extends React.Component { //Create class Auth
    render() {
        return (
            <div className="auth_form">
                <TabList />
                <Log />
                <Reg />
            </div>
        );
    }
}

class TabList extends React.Component { //Create class TabList
    render() {
      return (
        <ul className="tab-list" id="tab-list">
            <li className="active"><a className="tab-control" href="#tab-1" ><h3 className="tabs-h">Вход</h3></a></li>
            <li><a className="tab-control" href="#tab-2"><h3 className="tabs-h">Регистрация</h3></a></li>
        </ul>
      );
    }
}

class Log extends React.Component { //Create class Log
    render() {
      return (
        <div className="tab-panel active wrapper" id="tab-1">
            <form id="log_form">
                <input class="input-box__input-text" type="text" placeholder="login" id="login"/>
                <br />
                <input class="input-box__input-text" type="password" placeholder="password" id="password"/>
                <div id="error_log"></div>
                <button class="btn btn_theme_base" type="button" id="log_but"><span class="btn__text">Log in</span></button>
            </form>
        </div>
      );
    }
}

class Reg extends React.Component { //Create class Reg
    render() {
      return (
        <div className="tab-panel wrapper" id="tab-2">
            <form id="reg_form">
                <input class="input-box__input-text" type="text" placeholder="name" id="name"/>
                <br />
                <input class="input-box__input-text" type="text" placeholder="login" id="login_reg"/>
                <br />
                <input class="input-box__input-text" type="password" placeholder="password" id="password_reg"/>
                <br />
                <input class="input-box__input-text" type="password" placeholder="repeat password" id="password_reg_reapeat"/>
                <div id="error_reg"></div>
                <button class="btn btn_theme_base" type="button" id="reg_but"><span class="btn__text">Registration</span></button>         
            </form>
        </div>
      );
    }
}

let mainElement = document.querySelector('#main');
ReactDOM.render(<Auth />, mainElement);
