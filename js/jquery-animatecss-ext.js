// jquery-animatecss-ext.js: jQuery extension to use Animate.css animations
// Code from https://github.com/daneden/animate.css "Use with jQuery" section

$.fn.extend({
    animateCSS: function(animationName, callback) {
        let animationEnd = (function(el) {
            let animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (let t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});
