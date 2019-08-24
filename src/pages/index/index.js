require('./css/index.css')
import axios from './myapi.js'

// (function(window, document) {
//     document.getElementById('toggle').addEventListener('click', function(e) {
//         document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
//         document.getElementById('toggle').classList.toggle('x');
//     });
// })(this, this.document);
$('.updata button').click(function() {
    var email = $('#email').val();
    var phone = $('#phone').val();
    var inputContent = $('#inputContent').val();
    console.log(email, phone, inputContent);
    // alert('提交成功');
    if (email && phone && inputContent) {
        alert('发送成功')
        $('#email').val('');
        $('#phone').val('');
        $('#inputContent').val('');
    } else {
        alert('请填写完整的消息')
    }
    // axios("websiteFeedback", { title: email, phone: phone, content: inputContent }).then((res) => {
    //     if (res.data.retCode == 200) {
    //         alert('提交成功');
    //         email = null;
    //         phone = null;
    //         inputContent = null;
    //     } else {
    //         alert('提交失败，请重试')
    //     }
    // })
});

function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
// document.onscroll = function() {
//     console.log(getScrollTop())
// }

function adada(dad) {
    var docHg = document.getElementById(dad);
    console.log(docHg)
    var docHgTop = docHg.offsetTop - document.documentElement.scrollTop;
    console.log(docHg)
    var windHg = getScrollTop();
    console.log(windHg)
    var newHg = windHg + docHgTop;
    console.log(newHg)
        // window.scrollTo(0, newHg);

    // document.documentElement.scrollTop = 200;
    console.log(document.documentElement.scrollTop)
    $('html,body').animate({
        scrollTop: newHg
    }, 1000)
}
$('ul li').mouseover(function(e) {
    var value = $(e.target).attr('id');
    if (value == 'li1') {
        $('.imgo').show();
    } else if (value == 'li2') {
        $('.imgt').show();
    } else if (value == 'li3') {
        $('.imgth').show();
    } else if (value == 'li4') {
        $('.imgf').show();
    } else if (value == 'li5') {
        $('.imgfiv').show();
    }

}).mouseout(function(e) {
    var value = $(e.target).attr('id');
    if (value == 'li1') {
        $('.imgo').hide();
    } else if (value == 'li2') {
        $('.imgt').hide();
    } else if (value == 'li3') {
        $('.imgth').hide();
    } else if (value == 'li4') {
        $('.imgf').hide();
    } else if (value == 'li5') {
        $('.imgfiv').hide();
    }
})

function a() {
    var $events = $("ul li").data("events");
    console.log($events)
    if ($events && $events["click"]) {　　 //your code here
    }
}
a();
$('li').click(function(e) {
    console.log('进入点击事件')
    var value = $(e.target).attr('id');
    var newValue = '';
    // $('ul li').unbind('mouseover mouseout');
    if (value == 'li1') {
        $('ul li').unbind('mouseover mouseout');
        newValue = 'nav1'
        $('#li1,.liSpan').addClass('liColor');
        $('#li2,#li3,#li4,#li5').removeClass('liColor');
        $('.imgo').css('display', 'block');
        $('.imgt,.imgth,.imgf,.imgfiv').css('display', 'none');
        // console.log($(this))
    } else if (value == 'li2') {
        $('ul li').unbind('mouseover mouseout');
        newValue = 'nav2';
        $('#li2,.liSpan').addClass('liColor');
        $('#li1,#li3,#li4,#li5').removeClass('liColor');
        $('.imgt').css('display', 'block');
        $('.imgo,.imgth,.imgf,.imgfiv').css('display', 'none');
    } else if (value == 'li3') {
        $('ul li').unbind('mouseover mouseout');
        newValue = 'nav3';
        $('#li3,.liSpan').addClass('liColor');
        $('#li2,#li1,#li4,#li5').removeClass('liColor');
        $('.imgth').css('display', 'block');
        $('.imgt,.imgo,.imgf,.imgfiv').css('display', 'none');
    } else if (value == 'li4') {
        $('ul li').unbind('mouseover mouseout');
        newValue = 'nav4';
        $('#li4,.liSpan').addClass('liColor');
        $('#li2,#li3,#li1,#li5').removeClass('liColor');
        $('.imgf').css('display', 'block');
        $('.imgt,.imgth,.imgo,.imgfiv').css('display', 'none');
    } else if (value == 'li5') {
        $('ul li').unbind('mouseover mouseout');
        newValue = 'nav5';
        $('#li5,.liSpan').addClass('liColor');
        $('#li2,#li3,#li4,#li1').removeClass('liColor');
        $('.imgfiv').css('display', 'block');
        $('.imgt,.imgth,.imgf,.imgo').css('display', 'none');
    }
    console.log(newValue)
    adada(newValue);
});

//导航条
// var x = 0
// $('.menu').click(function() {
//     x += 1;
//     if (x % 2 == 0) {
//         $('.nav ul').css('display', 'block');
//     } else {
//         $('.nav ul').css('display', 'none');
//     }

// });

// $(".menu").toggle(
//     function() {
//         $(this).css("background-color", "rgba(255,255,255,0.5)");
//         $(".nav ul").slideDown(200);
//     },
//     function() {
//         $(this).css("background-color", "transparent");
//         $(".nav ul").slideUp(200);
//     }
// );
// $(window).resize(function() {
//     if ($(this).width() > 767) $(".nav ul").show(500);
// });

var deviceWidth
setHtmlFontSize()

if (window.addEventListener) {
    window.addEventListener('resize', function() {
        setHtmlFontSize()
    }, false)
}

function setHtmlFontSize() {
    // 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
    deviceWidth = document.documentElement.clientWidth > 1920 ? 1920 : document.documentElement.clientWidth
    document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 19.20 + 'px !important'
    if (deviceWidth < 828) {
        document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 19.20 + 'px !important'
    }
}