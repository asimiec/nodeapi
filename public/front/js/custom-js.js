$(document).ready(function () {
    $('.vote-btn').click(function () {
        $(".popup").addClass("show");
        $(".vote-box").addClass("animation");
    });
    $('.green, .red, .yellow').click(function () {
        $(".vote-btn").addClass("selected");
        $(".vote-btn").unbind("click");
        $(".popup").removeClass("show");
        $(".vote-box").removeClass("animation");
    });
    $('.green').click(function () {
        $(".vote-btn").text("Yes");
    });
    $('.yellow').click(function () {
        $(".vote-btn").text("Not Sure");
    });
    $('.red').click(function () {
        $(".vote-btn").text("No");
    });
});