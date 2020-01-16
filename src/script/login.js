class Login {
    constructor() {
        this.$username = $('input[name="loginname"]');
        this.$password = $('input[name="loginpassword"]');
        // this.$username = $('input[name="name"]');
        // this.$password = $('input[name="password"]');
    }
    init() {
        $('.login').on('click', () => {
            console.log(this.$username.val());
            $.ajax({
                type: 'post',
                url: 'http://10.31.152.20/wangyiyanxuan/php/login.php',
                data: {
                    user: this.$username.val(),
                    pass: this.$password.val()
                }
            }).done((result) => {
                if (result) {
                    location.href = 'index.html';
                    localStorage.setItem('username', $('.username').val());
                } else {
                    console.log('fail')

                    $('.password').val('');
                    alert('用户名或者密码错误');
                    // $('span').html('用户名或者密码错误').css('color', 'green');
                }
            });
        });
    }
}

export {
    Login
}