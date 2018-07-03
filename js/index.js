// 绑定事件的函数
function addEvent(obj,xEvent,fn) {
    if(obj.attachEvent){//IE
        obj.attachEvent('on'+xEvent,fn);
    }else{//FF Chrome
        obj.addEventListener(xEvent,fn,false);
    }
}
// 根据浏览器大小改变页面高度
var height=null;
function changeHeight() {
    height=parseInt($(window).height());
    $('.container-box').css('height',height+'px');
    $('.mask').css('height',height/2+'px')
}
// 获取容器移动长度
function getTransY() {
    var transY=$('.container')[0].style.transform;
    transY=parseInt(transY.replace(/[^0-9]/ig,""));
    return transY;
}
// 判断logo，菜单，下翻样式
function setHeadAndFoot() {
    var transY=getTransY();
    if(transY==4*height){
        $('.nextPage').hide();
    }
    if(transY<=3*height){
        $('.nextPage').show();
    }
    if(transY>height/2){
        $('.logo').attr('src','image/logo_orange.png');
        $('.menuOpen').attr('src','image/menuOpen_gray.png');
        $('.footer a').css('color','gray');
    }else {
        $('.logo').attr('src','image/logo_white.png');
        $('.menuOpen').attr('src','image/menuOpen.png');
        $('.footer a').css('color','#fff');
    }
}
// 底部照片墙计算
function changeWidth() {
    var width=$(window).width();
    var liLength=$('.img-list li').length;
    var liIndex=parseInt($('span.img-index').html());
    $('.img-list li').css('width',parseInt(width/2)+'px');
    var liWidth=parseInt($('.img-list li').css('width'));
    var listWidth=liWidth*liLength;
    var imgAreaHeight=parseInt(liWidth*5/10);
    $('.page-five .img-area').css({'height':imgAreaHeight+'px','margin-top':-imgAreaHeight/2+'px','line-height':imgAreaHeight+'px'});
    var ulLeft=liWidth/2;
    $('.img-list').css('width',listWidth+'px');
    $('.img-list').css('left',ulLeft+'px');
    // 点击切换照片
    $('.change-img span').click(function (e) {
        var tar=$(e.target);
        if(tar.hasClass('disabled')){return;}
        var left=parseInt($('.img-list').css('left'));
        var listLeft;
        if(tar.hasClass('next-img')){
            if(liIndex==liLength){return;}
            liIndex++;
            listLeft=left-liWidth;
        }else {
            if(liIndex==1){return;}
            liIndex--;
            listLeft=left+liWidth;
        }
        $('span.img-index').html(liIndex);
        var liClass='.img-list li:nth-child('+liIndex+') .img-index';
        if(liIndex==liLength){
            $('.next-img').addClass('disabled');
        }else {
            $('.next-img').removeClass('disabled');
        }
        if(liIndex==1){
            $('.prev-img').addClass('disabled');
            $('span.img-index').css('left','16%')
            $('span.img-index').removeClass('hide');
            $('.img-list .img-index').addClass('hide');
        }else {
            $('.prev-img').removeClass('disabled');
            $('span.img-index').addClass('hide');
            $(liClass).removeClass('hide').parents('li').siblings().children('.img-index').addClass('hide');
        }
        if(liIndex>1){
            // $('.img-index').css('left','26.2%')
        }
        $('.img-list').css('left',listLeft+'px');
    });
}
// 业务介绍点击
function changeBusiness() {
    $('.bus-list li').click(function () {
        var t=$(this);
        t.addClass('active').siblings().removeClass('active');
        var index=t.attr('id').split('_')[1];
        var detailClass='.bus-detail li:nth-child('+index+')';
        $('.business_img').attr('src','image/business_'+index+'.png');
        $(detailClass).removeClass('hide').siblings().addClass('hide');
    });
    $('.page-three .mask-box span').click(function () {
        var t=$(this);
        var index=parseInt($('.bus-list li.active').attr('id').split('_')[1]);
        var liLength=$('.bus-list li').length;
        if(t.hasClass('prev')){
            if(index==1){
                return;
            }
            index--;
        }else {
            if(index==liLength){
                return;
            }
            index++;
        }
        var detailClass='.bus-detail li:nth-child('+index+')';
        $(detailClass).removeClass('hide').siblings().addClass('hide');
        $('.business_img').attr('src','image/business_'+index+'.png');
        var liId='#business_'+index;
        $(liId).addClass('active').siblings().removeClass('active');
    })
}
//业务点击特效
// 控制页面滚动
var is_running=false;
function onMouseWheel(e) {
    if(is_running==false){ is_running=true;}
    var e = e || window.event;
    var down= e.wheelDelta?e.wheelDelta<0:e.detail>0;
    var transY=getTransY();
    var now;
    if(down){//下
        if(transY>=4*height){return;}
        now=transY+height;
    }else{//上
        now=transY-height;
    }
    setTimeout(function () {
        $('.container').css("transform","translateY(-"+now+"px)");
        setHeadAndFoot();
        var transy=parseInt(getTransY());
        var pageIndex=Math.round(transy/height);
        var moveClass='.container-box:nth-child('+(pageIndex+1)+')';
        $(moveClass).addClass('move-active').siblings().removeClass('move-active');
    },300);
    if(e.preventDefault){/*FF 和 Chrome*/
        e.preventDefault();// 阻止默认事件
    }
    is_running=false;
}
//点击按钮翻下一页
function clickPage() {
    $('.nextPage').click(function () {
        var transY=getTransY();
        if(transY>=4*height){return;}
        var now=transY+height;
        $('.container').css("transform","translateY(-"+now+"px)");
        setHeadAndFoot();
    });
    $('.mask-list li').click(function () {
        var t=$(this);
        var i=$('.mask-list li').index(t);
        var now=i*height;
        $('.container').css("transform","translateY(-"+now+"px)");
        $('.mask').addClass('hide');
        setHeadAndFoot();
        var moveClass='.container-box:nth-child('+(i+1)+')';
        $(moveClass).addClass('move-active').siblings().removeClass('move-active');
    })
}
// 获得当前地址
// function getCity() {
//     var location=returnCitySN["cname"].split('省');
//     var p=location[0];
//     var c=location[1];
//     c=c.substr(0,c.length-1);
//     var h=p+'-'+c;
//     $('.location h4').html(h)
// }
// 改变页面大小时，调整
function resizeTransY() {
    var transy=parseInt(getTransY());
    var pageIndex=Math.round(transy/height);
    if(pageIndex>=5){
        pageIndex=4;
    }
    var newTransY=pageIndex*height;
    // console.log(2,newTransY,height);
    $('.container').css("transform","translateY(-"+newTransY+"px)");
    var moveClass='.container-box:nth-child('+pageIndex+')';
    $(moveClass).addClass('move-active').siblings().removeClass('move-active');
}

$(function () {
//     getCity();
    changeHeight();
    changeWidth();
    changeBusiness();
    clickPage();
    // 鼠标滚动
    var div=$('.container')[0];
    addEvent(div,'mousewheel',onMouseWheel);
    addEvent(div,'DOMMouseScroll',onMouseWheel);
    // video播放控制
    // $('.video-btn img').click(function () {
    //     var video=$('#video');
    //     var videoO=$('#video')[0];
    //     if(video.hasClass('play')){
    //         videoO.pause();
    //         video.removeClass('play');
    //     }else {
    //         videoO.play();
    //         video.addClass('play');
    //     }
    // });
    // 菜单开关
    $('.menuOpen').click(function () {
        $('.mask').removeClass('hide');
    });
    $('.close-mask').click(function () {
        $('.mask').addClass('hide');
    });

});
$(window).resize(function () {
    changeHeight();
    // changeWidth();
    resizeTransY();
});

