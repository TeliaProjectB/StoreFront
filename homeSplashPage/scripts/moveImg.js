00 //let's build the chutes
for (var i = 0; i < 50; ++i) {
    $('<div/>', {
        class: 'chute'
    }).appendTo('#splash');
}

//cache a few static values
var box = $('#splash');
var width = box.width();
var height = box.height();
var chute = $('.chute');

//our main animation "loop"

chute.each(function foo() {

    //generate random values
    var top = (Math.random() * height) | 0;
    var left = (Math.random() * width) | 0;
    var time = Math.random() * (800 - 400) + 400 | 0;

    //animate
    //we introduce a random value so that they aren't moving together
    //after the animation, we call foo for the current element
    //to animate the current element again
    $(this).animate({
        left: left,
        top: top
    }, time, foo);
});