'use strict';
let url = "http://localhost:8080/auth_cl_serv/"

class Header extends React.Component { //Create class Header
  render() {
    return (
      <header>
          <div id="logo"/>
          <span id="header_text">Блог Веб-разрабочика</span>
          <Log />
      </header>
    );
  }
}

class Log extends React.Component { //Create class Log
  constructor(props) {
    super(props);
    this.state = { login: false }; //Check if the user is authorized
  }

  componentDidMount() {
    // Using fetch in React
    let body = {
      "type":"isLog"
    }

    fetch(url, {
      method:"POST",
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((response) => {
      // console.log(response);
      this.setState({login: response.isLog});
    })
    .then((response) => {
      this.logOut(); //Log out the user 
    })

  }

  logOut() {
    let body = {
      "type":"logout"
    }
    
    $('#log_out').on('click', function (e) { //add event listener
      e.preventDefault();
      console.log(1);
      fetch("http://localhost:8080/auth_cl_serv/", {
        method:"POST",
        body: JSON.stringify(body)
      })
      .then((response) => response.json())
      .then((response) => {
        window.location.href = response.redirect_url; //redirect page to auth
      })  
    })
  }

  render() {
    if (this.state.login) {
      return (
        <div id="log_out" className="log_out"/>
      );
    }

    return (
      <div id="log_user" className="log_in"/>
    );
  }
}

class Footer extends React.Component { //Create class Footer
  render() {
    return (
      <footer>
        <span id="footer_text">Этот сайт разработал [Ваше имя]</span>
      </footer>
    );
  }
}

class Main extends React.Component { //Create class Main
  render() {
    return (
      <div id="main">
      </div>
    );
  }
}

class Page extends React.Component { //Create class Page
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

let rootElement = document.querySelector('#root');
ReactDOM.render(<Page />, rootElement);