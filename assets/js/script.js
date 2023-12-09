// Window Scroll
var windowScroll = function () {
    $(window).scroll(function () {
        var scrollPos = $(this).scrollTop();
        var system ={win : false,mac : false,xll : false};
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        if(system.win||system.mac||system.xll){
            if ($(window).scrollTop() > 70)
            {
                $('.site-header').addClass('site-header-nav-scrolled');
            } else {
                $('.site-header').removeClass('site-header-nav-scrolled');
            }
        }else{
            if ($(window).scrollTop() > 40) 
            {
                $('.site-header').addClass('site-header-nav-scrolled-ph');
            } else {
                $('.site-header').removeClass('site-header-nav-scrolled-ph');
            }
        }
 });
};

$( document ).ready(function() {
    windowScroll();
    let fragment = window.location.hash;
    if (fragment == '#en') {
        $('.show-in-ja').hide();
        $('.show-in-en').show();
    } else {
        $('.show-in-ja').show();
        $('.show-in-en').hide();
    }

    $('a.change-to-en-btn').on('click', function() {
        $('.show-in-ja').hide();
        $('.show-in-en').show();
    });
    $('a.change-to-ja-btn').on('click', function() {
        $('.show-in-en').hide();
        $('.show-in-ja').show();
    });
    $('img.click-to-expand-img').on('click', function() {
        let imgUrl = $(this).attr('src');
        let $imageModal = $('#imageModal');
        $imageModal.find('img').attr('src', imgUrl);
        $imageModal.modal('show');
    });
    $('[data-dismiss="modal"]').on('click', function() {
        $(this).closest('.modal').modal('hide');
    })
});