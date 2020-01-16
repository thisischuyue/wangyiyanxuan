;
//居家生活数据渲染
// (function ($) {
//     class Louti {
//         constructor() {
//             this.loutiBottom = $('.loutiBottom');
//             // this.clothesBottom = $('.clothesBottom');
//         }

//         init() {
          
//             $.ajax({
//                 url: 'http://10.31.152.20/wangyiyanxuan/php/life.php',
//                 dataType: 'json'
//             }).done((data) => {
               
//                 let $strhtml = "<ul class='loutiList'>";
//                 $.each(data, function (index, value) {
//                     $strhtml += `
//                     <li class="loutili">       
//                     <a href="details.html?sid=${value.sid}">
//                         <img class="nianhuojie" src="https://yanxuan.nosdn.127.net/8eca8742856212e6dce5bad69f9eecb0.png" alt="">
//                         <img class="loutiimage" src="${value.url}" alt="">
//                         <div class="priceInfo">
//                             <p>年货限时购</p>
//                             <span class="loutiPrice">¥989</span>
//                         </div>
    
//                         <div class="qianggou">
//                             1月11日22点开抢
//                         </div>
                       
//                     </a>
//                     <div class="loutiInfo">
//                         <div class="loutiItem">年货特惠</div>
//                         <h4>${value.title}</h4>
//                         <div class="PriceItem">
//                             <span class="salePrice">￥${value.price}</span>
//                         </div>
//                     </div>
//                 </li>`;
//                 });
//                 $strhtml += '</ul>';
//                 this.loutiBottom.html($strhtml);
          
//             });

//         }

//     }

//     new Louti().init();
// })(jQuery);



//居家生活轮播图
// (function ($) {
//     var $life = $('.lifeBanner');
//     var $picli = $('.lifeBanner ul li');
//     var $btnli = $('.lifeBanner ol li');
//     var $left = $('.lifeBanner-prev');
//     var $right = $('.lifeBanner-next');
//     var num = 0; //当前点击的索引
//     var $piclilength = $picli.size();
//     var timer = null;

//     $btnli.on('click', function () {
//         num = $(this).index();
//         tabswitch();
//     });

//     $right.on('click', function () {
//         num++;
//         if (num > $piclilength - 1) {
//             num = 0;
//         }
//         tabswitch();
//     });


//     $left.on('click', function () {
//         num--;
//         if (num < 0) {
//             num = $piclilength - 1;
//         }
//         tabswitch();
//     });

//     function tabswitch() {
//         $btnli.eq(num).addClass('active').siblings($btnli).removeClass('active');
//         $picli.eq(num).animate({ opacity: 1 }).siblings($picli).animate({ opacity: 0 });
//     }


//     timer = setInterval(function () {
//         $right.click();
//     }, 2000);

//     $life.hover(function () {
//         clearInterval(timer);
//     }, function () {
//         timer = setInterval(function () {
//             $right.click();
//         }, 2000);
//     });

// })(jQuery);

//主轮播图
(function ($) {
    var $banner = $('.banner');
    var $picli = $('.banner ul li');
    var $btnli = $('.banner ol li');
    var $left = $('.stick-prev');
    var $right = $('.stick-next');
    var num = 0; //当前点击的索引
    var $piclilength = $picli.size();
    var timer = null;

    $btnli.on('click', function () {
        num = $(this).index();
        tabswitch();
    });

    $right.on('click', function () {
        num++;
        if (num > $piclilength - 1) {
            num = 0;
        }
        tabswitch();
    });


    $left.on('click', function () {
        num--;
        if (num < 0) {
            num = $piclilength - 1;
        }
        tabswitch();
    });

    function tabswitch() {
        $btnli.eq(num).addClass('active').siblings($btnli).removeClass('active');
        $picli.eq(num).animate({ opacity: 1 }).siblings($picli).animate({ opacity: 0 });
    }


    timer = setInterval(function () {
        $right.click();
    }, 2000);

    $banner.hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(function () {
            $right.click();
        }, 2000);
    });

})(jQuery);

