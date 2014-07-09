window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var _window;
var _windowHeight = 0;
var _scrollTop = 0;
var _previousScrollTop = 0;
var _currentScene = 0;
var _sceneCompletion = 0;

var _scenes = [
    [{
        el: '#logo',
        transformString: '',
        dirty: false,
        transitions: [{
            property: 'rotate',
            currentValue: 0,
            beginValue: 0,
            endValue: 90,
            begin: 0.50,
            end: 0.75
        }, {
            property: 'translateY',
            currentValue: 0,
            beginValue: 0,
            endValue: -500,
            begin: 0.75,
            end: 1
        }, {
            property: 'scale',
            currentValue: 4,
            beginValue: 4,
            endValue: 1,
            begin: 0,
            end: 0.25
        }]
    }]
];

$(function() {

    _window = $(window);
    _windowHeight = _window.height();

    // Initialize scene container height
    $('.scene').each(function(idx, elem) {
        elem.style.height = _windowHeight + 'px';
    });

    requestAnimationFrame(calculate);

});

function calculate() {

    // Grab new scrollTop;
    _scrollTop = $('body').scrollTop();

    // If it is different we must recalculate
    if (_scrollTop != _previousScrollTop) {
        var rawDifference = _scrollTop / _windowHeight;
        _currentScene = Math.floor(rawDifference);
        _sceneCompletion = rawDifference - _currentScene;
        _previousScrollTop = _scrollTop;

        var scene = _scenes[_currentScene];
        if (scene) {
            // Iterate through all the 'actors' taking part in this scene.
            for (var i = 0; i < scene.length; i++) {
                var actor = scene[i];
                actor.transformString = '';

                for (var j = 0; j < actor.transitions.length; j++) {
                    var transition = actor.transitions[j];
                    var progress;

                    if (_sceneCompletion < transition.begin) {
                        progress = 0;
                    } else if (_sceneCompletion > transition.end) {
                        progress = transition.endValue - transition.beginValue;
                    } else {
                        progress = (transition.endValue - transition.beginValue) * ((_sceneCompletion - transition.begin) / (transition.end - transition.begin));
                    }

                    if (transition.currentValue != transition.beginValue + progress) {
                        actor.dirty = true;
                    }

                    transition.currentValue = transition.beginValue + progress;

                    var newTransform = transition.property + '(' + transition.currentValue.toFixed(2) + ') ';
                    if (transition.property === 'rotate') {
                        newTransform = newTransform.replace(')', 'deg)');
                    } else if (transition.property.indexOf('translate') >= 0) {
                        newTransform = newTransform.replace(')', 'px)');
                    }

                    actor.transformString += newTransform;
                }

                if (actor.dirty) {
                    actor.transformString += 'translateZ(0)';
                    $(actor.el).css('-webkit-transform', actor.transformString);
                    actor.dirty = false;
                }
            }
        }
    }

    // Finished calculations, reset scrollTop and kick off the render process.
    requestAnimationFrame(calculate);

}

function render() {
    requestAnimationFrame(calculate);
}
