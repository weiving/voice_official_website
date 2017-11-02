var $index = (function (name) {
    "use strict";

    function center(obj) {
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = $(obj).height();
        var popupWidth = $(obj).width();
        $(obj).css({
            "position": "absolute",
            "top": (windowHeight - popupHeight) / 2 + $(document).scrollTop(),
            "left": (windowWidth - popupWidth) / 2
        });
    }

    return {
        init: function () {
            $("#system-slide").slide({
                mainCell: ".player-bd ul",
                effect: "leftLoop",
                autoPlay: true,
                trigger: "mouseover",
                easing: "easeInBack",
                delayTime: 1000,
                mouseOverStop: true,
                pnLoop: true
            });

            var weixing_url;
            $.ajax({
                url: "/v1/data/main/get_client_demo",
                type: "post",
                data: {},
                success: function (data) {
                    if (data.code === "200") {
                        weixing_url = data.url;
                        $(".weixing-ma").qrcode({
                            render: "canvas",
                            width: 104,
                            height: 103,
                            text: weixing_url
                        });
                        $("#display-code").qrcode({
                            render: "canvas",
                            width: 300,
                            height: 300,
                            text: weixing_url
                        });
                    }
                }
            });

            $("#login-btn").click(function () {
                location.href = "http://127.0.0.1:2050/v1/view/login.html";
            });

            //是否登录
            var this_cookie=cookie.get("username");
            if (this_cookie == null || this_cookie == undefined) {
                $(".user-wrap .user-login").removeClass("hidden");
                $(".user-wrap .has-login").addClass("hidden");
            } else {
                $(".p_username").text(this_cookie);
                $(".user-wrap .user-login").addClass("hidden");
                $(".user-wrap .has-login").removeClass("hidden");
            }

            $(".user-dropdown").hover(function () {
                $(this).addClass("current");
            }, function () {
                $(this).removeClass("current");
            })

            //退出登录
            $(".admin-esc").click(function () {
                cookie.delete("username");
                document.location.reload();
            });

            //聊天qq
            $('#close_im').bind('click', function () {
                $('#main-im').css("height", "0");
                $('#im_main').hide();
                $('#open_im').show();
            });
            $('#open_im').bind('click', function (e) {
                $('#main-im').css("height", "272");
                $('#im_main').show();
                $(this).hide();
            });
            $('.go-top').bind('click', function () {
                $(window).scrollTop(0);
            });
            $(".weixing-container").bind('mouseenter', function () {
                $('.weixing-show').show();
            })
            $(".weixing-container").bind('mouseleave', function () {
                $('.weixing-show').hide();
            });

            //弹出框
            $(".product-display").click(function (e) {
                e.preventDefault();
                $(".ui-mask").fadeIn();
                $("#code-popover").fadeIn();
                center($("#code-popover"));
            });

            $(".ui-mask").click(function () {
                $(".ui-mask").fadeOut();
                $("#code-popover").fadeOut();
            });
        }
    };
})();

$index.init();