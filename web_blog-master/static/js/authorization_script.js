// switching tabs
$('.tab-list').each(function(){                
    let $this = $(this);                       
    let $tab = $this.find('li.active');        
    let $link = $tab.find('a');                
    let $panel = $($link.attr('href'));        
    $this.on('click', '.tab-control', function(e) { 
        e.preventDefault();                           
        let $link = $(this),                          
            id = this.hash;                           
        if (id && !$link.is('.active')) {            
            $panel.removeClass('active');              
            $tab.removeClass('active');                
            $panel = $(id).addClass('active');         
            $tab = $link.parent().addClass('active');  
        }
    });
});

$('#reg_but').on('click', function (e) {
    e.preventDefault();
    $('#error_reg').text("")
    if ($('#password_reg').val() != $('#password_reg_reapeat').val()){ // check password matching
        $('#error_reg').text("Пароли не совпадают")
        return;
    }
    registration_user();
})

async function registration_user() {
    let name = $("#name").val();
    let login = $("#login_reg").val();
    let password = $("#password_reg").val();
    let body = {
        "type":"registration",
        "login":login,
        "name":name,
        "password":password
    }
    const response = await fetch(url, {
        method:"POST",
        body: JSON.stringify(body)
    })
    let res = await response.json();
    if (res.error == 'User already exist') {
        $('#error_reg').text("Пользователь с таким логином уже существует")
    } else {
        await console.log(res);
        window.location.href = await res.redirect_url; 
    }
}

$('#log_but').on('click', function (e) {
    e.preventDefault();
    $('#error_log').text("")
    login_user();
})

async function login_user() {
    let login = $("#login").val();
    let password = $("#password").val();
    let body = {
        "type":"login",
        "login":login,
        "password":password
    }
    const response = await fetch(url, {
        method:"POST",
        body: JSON.stringify(body)
    })
    let res = await response.json();
    if (res.error == 'Incorrect login or password') {
        $('#error_log').text("Неправильный логин или пароль")
    } else {
        await console.log(res);
        window.location.href = await res.redirect_url; 
    }
}