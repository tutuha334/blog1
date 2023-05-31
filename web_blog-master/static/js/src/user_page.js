'use strict';
let url = "http://localhost:8080/user_page_cl_serv/"

class UserInfo extends React.Component { //Create class UserInfo
  constructor(props) {
    super(props);
    this.state = { 
        name: null, //User name in our database
        posts: null, //User posts in our database
        checkUser: null, //User posts in our database
        isUser: null, //is user and sessiom match
        isSub: null, //is user sub on it
    };
    // Эта привязка обязательна для работы `this` в колбэке.
    this.addPost = this.addPost.bind(this);
    this.subOff = this.subOff.bind(this);
    this.subOn = this.subOn.bind(this);
  }

  mySubs() {
    // Using fetch in React
    let body = {
        "type":"mySubs",
        "link":window.location.href
    }

    fetch(url, {
        method:"POST",
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((response) => {
        window.location.href = response.redirect_url
    })
  }
  subsOnMe() {
    // Using fetch in React
    let body = {
        "type":"subsOnMe",
        "link":window.location.href
    }

    fetch(url, {
        method:"POST",
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((response) => {
        window.location.href = response.redirect_url
    })
  }

  checkPage() {
    // Using fetch in React
    let body = {
        "type":"checkPage",
        "link":window.location.href
    }

    fetch(url, {
        method:"POST",
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((response) => {
        this.setState({
            isUser: response.isUser,
            isSub: response.isSub
        });
    })
    .then((response) => {
        if (this.state.isSub) {
            this.setState({
                checkUser: <div>
                    <br />
                    <button class="btn btn_theme_base1 btn_theme_base" type="button" id="subOn" onClick={this.subOff}>
                        <span class="btn__text">Отписаться</span>
                    </button>  
                </div>
            });
        } else {
            this.setState({
                checkUser: <div>
                    <br />
                    <button class="btn btn_theme_base1 btn_theme_base" type="button" id="subOn" onClick={this.subOn}>
                        <span class="btn__text">Подписаться</span>
                    </button>  
                </div>
            });
        }
        
    })
  }

  getPosts() {
    // Using fetch in React
    let body = {
        "type":"getUser",
        "link":window.location.href
    }

    fetch(url, {
        method:"POST",
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((response) => {
        this.setState({
            name: response.name,
            posts: response.posts
        });
    })
    .then((response) => {
        this.setState({
            posts: this.state.posts.map((post) =>
                <li className="post">
                    <span className="post_name">{this.state.name}</span>
                    <div className="post_text">{post[1]}</div>
                </li>
            )
        });
    })
  }

    addPost(e) {
        e.preventDefault();
        if ($("#textarea").val()) {
            let body = {
                "type":"addPost",
                "text":$("#textarea").val(),
                "link":window.location.href
            }
            fetch(url, {
                method:"POST",
                body: JSON.stringify(body)
            })
            .then((response) => response.json())
            .then((response) => {
                $("#textarea").val("") // Clear textarea
                this.getPosts(); //Reload posts
            })
        }
    }

    subOff(e) {
        e.preventDefault();
        let body = {
            "type":"unSub",
            "link":window.location.href
        }
        fetch(url, {
            method:"POST",
            body: JSON.stringify(body)
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                checkUser: <div>
                    <br />
                    <button class="btn btn_theme_base1 btn_theme_base" type="button" id="subOn" onClick={this.subOn}>
                        <span class="btn__text">Подписаться</span>
                    </button>  
                </div>
            });
        })
    }

    subOn(e) {
        e.preventDefault();
        let body = {
            "type":"addSub",
            "link":window.location.href
        }
        fetch(url, {
            method:"POST",
            body: JSON.stringify(body)
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                checkUser: <div>
                    <br />
                    <button class="btn btn_theme_base1 btn_theme_base" type="button" id="subOn" onClick={this.subOff}>
                        <span class="btn__text">Отписаться</span>
                    </button>  
                </div>
            });
        })
    }

    
    

  componentDidMount() {
    this.getPosts();
    this.checkPage();
  }

    render() {
        if (this.state.isUser) {
            return (
                <div>
                    <div id="user_name">
                        {this.state.name}
                        <div id="mySubs" onClick={this.mySubs} className="subs">Подписки</div>
                        <div id="subsOnMe" onClick={this.subsOnMe} className="subs">Подписчики</div>
                        <textarea id="textarea" className="input-box__input-text" placeholder="Поделись своими мыслями"/>
                        <button class="btn btn_theme_base1 btn_theme_base" type="button" id="add_but" onClick={this.addPost}>
                            <span class="btn__text">Добавить запись</span>
                        </button> 
                    </div>
                    <ul>{this.state.posts}</ul>
                </div>
            );
        }
        return (
            <div>
                <div id="user_name">
                    {this.state.name}
                    <div id="mySubs" onClick={this.mySubs} className="subs">Подписки</div>
                    <div id="subsOnMe" onClick={this.subsOnMe} className="subs">Подписчики</div>
                    <br />
                    {this.state.checkUser}
                </div>
                <ul>{this.state.posts}</ul>
            </div>
        );
    }
}

let mainElement = document.querySelector('#main');
ReactDOM.render(<UserInfo />, mainElement);