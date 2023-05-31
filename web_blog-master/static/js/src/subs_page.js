'use strict';
let url = "http://localhost:8080/subs_page_cl_serv/"

class Subs extends React.Component { //Create class Subs
  constructor(props) {
    super(props);
    this.state = { 
        subs: null, //User subs
    };
    // Эта привязка обязательна для работы `this` в колбэке.
    this.unSub = this.unSub.bind(this);
  }

  getSubs() {
    // Using fetch in React
    let body;
    if (window.location.href.split("/")[3] == "subscriptions") {
        body = {
            "type":"mySubs",
            "link":window.location.href
        }
    } else if (window.location.href.split("/")[3] == "subscribers") {
        body = {
            "type":"subsOnMe",
            "link":window.location.href
        }
    }

    fetch(url, {
        method:"POST",
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((response) => {
        this.setState({
            subs: response.subs
        });
    })
    .then((response) => {
        if (window.location.href.split("/")[3] == "subscriptions") {
            this.setState({
                subs: this.state.subs.map((sub) =>
                    <li id={sub[0]} className="user_sub sub_name" onClick={this.openSub}> 
                        {sub[1]}
                        <button name={sub[0]} class="btn btn_theme_base1 btn_theme_base btn__text" type="button" id="unsub_but" onClick={this.unSub}>
                            Отписаться
                        </button>
                    </li>
                )
            });
        } else if (window.location.href.split("/")[3] == "subscribers") {
            this.setState({
                subs: this.state.subs.map((sub) =>
                    <li id={sub[0]} className="user_sub sub_name" onClick={this.openSub}> 
                        {sub[1]}
                    </li>
                )
            });
        }
    })
  }

    openSub(e) {
        if (e.target.tagName == "LI") {
            window.location.href = "http://localhost:8080/?profile="+e.target.id
        }
    }

    unSub(e) {
        e.preventDefault();
        console.log()
        let body = {
            "type":"unSub",
            "subs":e.target.name,
            "link":window.location.href
        }
            
        fetch(url, {
            method:"POST",
            body: JSON.stringify(body)
        })
        .then((response) => response.json())
        .then((response) => {
            this.getSubs(); //Reload posts
        })
    }

  componentDidMount() {
    this.getSubs();
    
  }

    render() {
        return (
            <ul>{this.state.subs}</ul>
        );
    }
}

let mainElement = document.querySelector('#main');
ReactDOM.render(<Subs />, mainElement);