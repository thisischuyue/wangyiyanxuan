
class Render {
    constructor() {
        this.loutiBottom = $('.loutiBottom');
    }
    init() {
        $.ajax({
            url: 'http://10.31.152.20/wangyiyanxuan/php/life.php',
            dataType: 'json'
        }).done((data) => { 
            console.log(1234567) 
            let $strhtml = "<ul class='loutiList'>";
            $.each(data, function (index, value) {
                $strhtml += `
                <li class="loutili">       
                <a href="details.html?sid=${value.sid}">
                    <img class="nianhuojie" src="https://yanxuan.nosdn.127.net/8eca8742856212e6dce5bad69f9eecb0.png" alt="">
                    <img class="loutiimage" src="${value.url}" alt="">
                    <div class="priceInfo">
                        <p>年货限时购</p>
                        <span class="loutiPrice">¥989</span>
                    </div>

                    <div class="qianggou">
                        1月11日22点开抢
                    </div>
                   
                </a>
                <div class="loutiInfo">
                    <div class="loutiItem">年货特惠</div>
                    <h4>${value.title}</h4>
                    <div class="PriceItem">
                        <span class="salePrice">￥${value.price}</span>
                    </div>
                </div>
            </li>`;
            });
            $strhtml += '</ul>';
            this.loutiBottom.html($strhtml);   
        });
    }
}


// //提供模块对外的接口
export {
    Render
}
