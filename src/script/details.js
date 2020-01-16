class Details {
    constructor() {
        //接收sid
        this.sid = location.search.substring(1).split('=')[1];
        this.spic = $('#spic');
        this.bpic = $('#bpic');
        this.sf = $('#sf');
        this.bf = $('#bf');
        this.list = $('#list');
        this.list_ul = $('#list ul');
        this.count = $('#count');
    }

    init() {
        //将接收的sid传给后端。

        $.ajax({
            url: 'http://10.31.152.20/wangyiyanxuan/php/details.php',
            data: {
                sid: this.sid
            },
            dataType: 'json'
        }).done((objdata) => {
            $('#spic img').attr('src', objdata.url);
            $('#bf img').attr('src', objdata.url);
            $('.loadtitle').html(objdata.title);
            $('.loadpcp').html(objdata.price);
            let piclist = objdata.urls.split(',');
            let $strhtml = '';
            $.each(piclist, function (index, value) {
                $strhtml += `<li><img src="${value}" /></li>`;
            });

            this.list_ul.html($strhtml)

        });
        //执行添加购物车操作
        this.addcart();
    }
    //添加购物车操作
    addcart() {
        let goodsnum = []; //商品的数量
        let goodsid = []; //商品的编号
        //cartnum  cartsid:本地存储的key值
        function getcookie() {
            if (localStorage.getItem('cartnum') && localStorage.getItem('cartsid')) {
                goodsnum = localStorage.getItem('cartnum').split(',');
                goodsid = localStorage.getItem('cartsid').split(',');
            }
        }
        $('.p-btn a').on('click', () => {
            getcookie();
            if ($.inArray(this.sid, goodsid) === -1) { //第一次点击,将sid传入，取到数量直接传入
                goodsid.push(this.sid);
                localStorage.setItem('cartsid', goodsid); //存入sid
                goodsnum.push(this.count.val());
                localStorage.setItem('cartnum', goodsnum); //存入数量
            } else {
                let index = $.inArray(this.sid, goodsid); //当前sid在数组中对应的位置
                let newnum = parseInt(goodsnum[index]) + parseInt(this.count.val()); //原来存储的值+当前的值
                goodsnum[index] = newnum; //新的数量
                localStorage.setItem('cartnum', goodsnum); //存入数量
            }
        });
    }
}

class Fangdajing {
    constructor() {
        this.wrap = $('.wrap');
        this.spic = $('#spic');
        this.sf = $('#sf');
        this.bf = $('#bf');
        this.bpic = $('#bpic');
        this.left = $('#left');
        this.right = $('#right');
        this.ulmove = $('#list ul');
        this.list = $('#list ul li');
        this.ulist = $('#ulist');
    }
    init() {
        //1.鼠标移入移出显示隐藏小放和大放。
        let _this = this;
        this.spic.hover(() => {
            $('#sf,#bf').css('visibility', 'visible');

            //3.求小放的尺寸和比例
            this.sf.css({
                width: this.spic.outerWidth() * this.bf.outerWidth() / this.bpic.outerWidth(),
                height: this.spic.outerHeight() * this.bf.outerHeight() / this.bpic.outerHeight()
            });
            //求比例
            this.bili = this.bpic.outerWidth() / this.spic.outerWidth();

            // $(window).on('click', function (e) {
            //     console.log(e.pageX)
            //     console.log(e.pageY)
            // })

            //2.鼠标在小图中移动，小放跟随鼠标
            this.spic.on('mousemove', (e) => {
                let $l = e.pageX - this.wrap.offset().left - this.sf.width() / 2;
                let $t = e.pageY - this.wrap.offset().top - this.sf.height() / 2;
                if ($l < 0) {
                    $l = 0;
                } else if ($l >= this.spic.outerWidth() - this.sf.outerWidth()) {
                    $l = this.spic.outerWidth() - this.sf.outerWidth() - 2;
                }

                if ($t < 0) {
                    $t = 0;
                } else if ($t >= this.spic.outerHeight() - this.sf.outerHeight()) {
                    $t = this.spic.outerHeight() - this.sf.outerHeight() - 2;
                }

                this.sf.css({
                    left: $l,
                    top: $t
                });

                //大图进行赋值
                this.bpic.css({
                    left: -$l * this.bili,
                    top: -$t * this.bili
                });
            });
        }, () => {
            $('#sf,#bf').css('visibility', 'hidden');
        });


        //4.点击对应的li切换缩放的图片
        //#list ul li:委托的元素
        //$(this):委托的元素。
        // this.ulmove.on('click', 'li', function () {
        //     let $imgurl = $(this).find('img').attr('src');
        //     _this.spic.find('img').attr('src', $imgurl);
        //     _this.bpic.attr('src', $imgurl);
        // });


        //5.点击左右箭头，进行图片运动
        // let $num = 6; //可视的li的长度。
        // let $liwidth = this.list.eq(0).outerWidth(true); //1个li的宽度
        // if (this.list.size() <= $num) {
        //     this.right.css('color', '#fff');
        // }




        this.ulmove.on('click', 'li', function () {
            let $imgurl = $(this).find('img').attr('src');
            _this.spic.find('img').attr('src', $imgurl);
            _this.bpic.attr('src', $imgurl);
            // console.log($(this).find('img').outerWidth())
        });
        let $num = 6;

        this.ulist.on('click', '#right', function () {
      
            let $linum = $(this).siblings('#list').find('ul li').size();
          
            let $liwidth = $(this).siblings('#list').find('li').outerWidth(true);
           

            if ($linum <= $num) {
                _this.right.css('color', '#fff');
            }
            if ($linum > $num) {
                $num++;
                _this.left.css('color', '#333');
                if ($num === $linum) {
                    _this.right.css('color', '#fff');
                }
                _this.ulmove.animate({
                    left: -($num - 6) * $liwidth
                });
            }
        })

        this.ulist.on('click', '#left', function () {

            let $linum = $(this).siblings('#list').find('ul li').size();
            let $liwidth = $(this).siblings('#list').find('li').outerWidth(true);
            if ($num > 6) {
                $num--;
                _this.right.css('color', '#333');
                if ($num === 6) {
                    _this.left.css('color', '#fff');
                }
                _this.ulmove.animate({
                    left: -($num - 6) * $liwidth
                });
            }
        });


       
    }
}

// class Fangdajing {
//     constructor() {
//         this.wrap = $('.wrap');
//         this.spic = $('#spic'); //小图
//         this.sf = $('#sf'); //小放
//         this.bf = $('#bf'); //大放
//         this.bpic = $('#bpic'); //大图
//         this.ullist = $('#list ul');
//         this.list = $('#list li');
//         this.left = $('#left');
//         this.right = $('#right');
//     }

//     init() {
//         let _this = this;
//         //1.鼠标移入小图，显示小放和大放。移出同理
//         this.spic.hover(function () {
//             $('#sf,#bf').css('visibility', 'visible');

//             //3.鼠标移动，小放跟随
//             _this.spic.on('mousemove', function (ev) {
//                 _this.spicmove(ev);
//             });

//         }, function () {
//             $('#sf,#bf').css('visibility', 'hidden');
//         });

//         //2.求小放的尺寸。
//         this.sf.css({
//             width: this.spic.width() * this.bf.width() / this.bpic.width(),
//             height: this.spic.height() * this.bf.height() / this.bpic.height(),
//         });
//         //4.求比例
//         this.bili = this.bpic.width() / this.spic.width();

//         //5.给下面的列表li添加点击事件
//         // this.list.on('click', function () {
//         //     _this.changepicurl($(this));
//         // });

//         this.ullist.on('click', 'li img', function () {
//             $('#spic img').get(0).src = $(this).get(0).src;
//             $('#bf img').get(0).src = $(this).get(0).src;        
//         });


//         //6.给right按钮添加事件
//         this.num = 6; //可视的图片长度
//         //返回值:eq(index|-index)获取第N个元素
//         // this.liwidth = this.list.eq(0).outerWidth(); //1个li的宽度
//         this.liwidth =56;
//         //长度小于6，无需显示左右按钮
//         if (this.list.length <= 6) {
//             this.right.css('color', '#fff');
//         }

//         this.right.on('click', function () {
//             _this.rightclick();
//         });

//         //7.给left按钮添加事件
//         this.left.on('click', function () {
//             _this.leftclick();
//         });
//     }
//     spicmove(ev) {
//         let l = ev.pageX - this.wrap.offset().left - this.sf.width() / 2;
//         let t = ev.pageY - this.wrap.offset().top - this.sf.height() / 2;
//         if (l < 0) {
//             l = 0;
//         } else if (l >= this.spic.width() - this.sf.width()) {
//             l = this.spic.width() - this.sf.width();
//         }
//         if (t < 0) {
//             t = 0;
//         } else if (t >= this.spic.height() - this.sf.height()) {
//             t = this.spic.height() - this.sf.height();
//         }

//         this.sf.css({
//             left: l,
//             top: t
//         });

//         this.bpic.css({
//             left: -l * this.bili,
//             top: -t * this.bili
//         })
//     }


//     changepicurl(obj) {
//         let $imgurl = obj.find('img').attr('src');
//         this.spic.find('img').attr('src', $imgurl);
//         this.bpic.attr('src', $imgurl);
//         //切换后重新设置小放的尺寸和比例
//         this.sf.css({
//             width: this.spic.width() * this.bf.width() / this.bpic.width(),
//             height: this.spic.height() * this.bf.height() / this.bpic.height(),
//         });
//         this.bili = this.bpic.width() / this.spic.width();
//     }


//     rightclick() {
//         if (this.list.length > this.num) {
//             this.num++;
//             this.left.css('color', '#333');
//             if (this.num === this.list.length) {
//                 this.right.css('color', '#fff');
//             }
//             this.ullist.animate({
//                 left: -this.liwidth * (this.num - 6)
//             });
//         }
//     }

//     leftclick() {
//         if (this.num > 6) {
//             this.num--;
//             this.right.css('color', '#333');
//             if (this.num === 6) {
//                 this.left.css('color', '#fff');
//             }
//             this.ullist.animate({
//                 left: -this.liwidth * (this.num - 6)
//             });
//         }
//     }

// }


export {
    Details,
    Fangdajing
}