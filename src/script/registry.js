class Registry {
    constructor() {
        this.$user = $('input[name="username"]');
        this.$psw = $('input[name="password"]');
        this.$tel = $('input[name="telephpone"]');
        this.$email = $('input[name="email"]');
        this.$userflag = true;
        this.$upswflag = true;
        this.$telflag = true;
        this.$emailflag = true;
    }
    init() {
        this.$user.on('blur', () => {
            $.ajax({
                type: 'post',
                url: 'http://10.31.152.20/wangyiyanxuan/php/registry.php',
                data: {
                    username: this.$user.val()
                }
            }).done((result)=> {
                console.log(this.$user.val());
                if (!result) { 
                    $('span').html('√').css('color', 'green');
               
                    this.$userflag = true;
                } else {
                    $('span').html('用户名已经存在').css('color', 'red');
                    this.$userflag = false;
                }
            });
        });

        $('form').on('submit', function () {
            if (this.$user.val() == '') {
                $('span').html('请输入用户名').css('color', 'red');
                $userflag = false;
            };
            if (!this.$userflag) {
                return false;
            }
        });
    }
}

export {
    Registry
}