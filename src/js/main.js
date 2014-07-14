var $ = window.$ || {};
var Divector = require('./divector.js');

var controller = new Divector();
controller.onChangeScene = function(newSceneIndex) {

    // Queue current animating elements for cleanup
    var animatedElems = document.getElementsByClassName('rain');
    for (var i = 0; i < animatedElems.length; i++) {
        animatedElems[i].className += ' destroy';
    }

    // Switch to new animation if necessary
    if (newSceneIndex === 0) {
        randomCash();
    } else if (newSceneIndex === 1) {
        randomCards();
    }

};

var panel = controller.addActor('#panel');
var jeans = controller.addActor('#jeans');

var rfid1 = controller.addActor('#rfid1');
var rfid2 = controller.addActor('#rfid2');
var rfid3 = controller.addActor('#rfid3');

var cash1 = controller.addActor('#cash1');
var cashImage1 = controller.addActor('#cashImg1');
var cash2 = controller.addActor('#cash2');
var cashImage2 = controller.addActor('#cashImg2');
var cash3 = controller.addActor('#cash3');
var cashImage3 = controller.addActor('#cashImg3');
var cash4 = controller.addActor('#cash4');
var cashImage4 = controller.addActor('#cashImg4');
var cash5 = controller.addActor('#cash5');
var cashImage5 = controller.addActor('#cashImg5');
var card1 = controller.addActor('#credit-card');
var card2 = controller.addActor('#bank-card');
var card3 = controller.addActor('#transit-card');
var card4 = controller.addActor('#insurance-card');
var card5 = controller.addActor('#drivers-license-card');
var card6 = controller.addActor('#coin-card');

var _window = 0;
var _windowHeight = 0;
var _windowWidth = 0;
var PANEL_ASPECT_RATIO = 1.325;

document.addEventListener('DOMContentLoaded', function(){

    _windowHeight = window.innerHeight;
    _windowWidth = window.innerWidth;

    // Initialize scene container height
    var scenes = document.getElementsByClassName('scene');
    Array.prototype.forEach.call(scenes, function(el) {
        el.style.height = _windowHeight + 'px';
    });

    var quarterScreen = _windowWidth / 4;
    var panelHeight = _windowHeight / 2.5;
    var panelWidth = panelHeight * PANEL_ASPECT_RATIO;
    var thirdLeft = panelHeight;

    var panelElem = document.getElementById('panel');
    panelElem.style.height = panelHeight + 'px';
    panelElem.style.width = panelWidth + 'px';
    panelElem.style.marginTop = -1 * (panelHeight / 2) + 'px';
    panelElem.style.marginLeft = -1 * (panelWidth / 2) + 'px';

    var rfidContainer = document.getElementById('rfid-container');
    rfidContainer.style.height = panelHeight + 'px';
    rfidContainer.style.width = panelWidth + 'px';
    rfidContainer.style.marginTop = -1 * (panelHeight / 2) + 'px';
    rfidContainer.style.marginLeft = -1 * (panelWidth / 2) + 'px';

    // Initialize profile image depths
    var profiles = document.getElementsByClassName('profile');
    Array.prototype.forEach.call(profiles, function(el) {
        el.style.webkitTransform = 'rotateX(90deg) rotateZ(90deg) translateZ(' + Math.floor(panelHeight / 2) + 'px)';
    });

    document.addEventListener('webkitAnimationIteration', function(e) {
        var srcElement = e.srcElement;

        if (srcElement.className.indexOf('destroy') >= 0) {
            document.getElementById('animation-container').removeChild(srcElement);
        }
    });

    // Cash rain
    controller.addScene();

    // Card rain
    controller.addScene();

    // Introduce product
    controller.addScene()
        .addTransition(panel, {
            property: 'translateY',
            beginValue: _windowHeight * 1.5,
            endValue: 0,
            begin: 0,
            end: 1.0
        });

    // Zoom product
    controller.addScene()
        .addTransition(panel, {
            property: 'scale',
            beginValue: 0.5,
            endValue: 1,
            begin: 0,
            end: 0.75
        });

    // Rotate and push to side
    controller.addScene()
        .addTransition(panel, {
            property: 'rotateZ',
            beginValue: 0,
            endValue: -90,
            begin: 0,
            end: 0.5
        })
        .addTransition(panel, {
            property: 'translateY',
            beginValue: 0,
            endValue: -0.75 * panelHeight,
            begin: 0.5,
            end: 1.0
        });

    // Bring up cash
    controller.addScene()
        .addTransition(cash1, {
            property: 'translateX',
            beginValue: -1 * _windowHeight,
            endValue: 0,
            begin: 0,
            end: 0.2
        })
        .addTransition(cash2, {
            property: 'translateX',
            beginValue: -1 * _windowHeight,
            endValue: 0,
            begin: 0.2,
            end: 0.4
        })
        .addTransition(cash3, {
            property: 'translateX',
            beginValue: -1 * _windowHeight,
            endValue: 0,
            begin: 0.4,
            end: 0.6
        })
        .addTransition(cash4, {
            property: 'translateX',
            beginValue: -1 * _windowHeight,
            endValue: 0,
            begin: 0.6,
            end: 0.8
        })
        .addTransition(cash5, {
            property: 'translateX',
            beginValue: -1 * _windowHeight,
            endValue: 0,
            begin: 0.8,
            end: 1
        })
        .addTransition(cash1, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0
        })
        .addTransition(cash2, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0
        })
        .addTransition(cash3, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0
        })
        .addTransition(cash4, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0
        })
        .addTransition(cash5, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0
        });

    // rotate into neat stack, then slide under band.
    controller.addScene()
        .addTransition(cashImage1, {
            property: 'rotateZ',
            beginValue: 12,
            endValue: 0,
            begin: 0,
            end: 0.25
        })
        .addTransition(cashImage2, {
            property: 'rotateZ',
            beginValue: 6,
            endValue: 0,
            begin: 0,
            end: 0.25
        })
        .addTransition(cashImage3, {
            property: 'rotateZ',
            beginValue: 1,
            endValue: 0,
            begin: 0,
            end: 0.25
        })
        .addTransition(cashImage4, {
            property: 'rotateZ',
            beginValue: -7,
            endValue: 0,
            begin: 0,
            end: 0.25
        })
        .addTransition(cashImage5, {
            property: 'rotateZ',
            beginValue: -11,
            endValue: 0,
            begin: 0,
            end: 0.25
        })
        .addTransition(cash1, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: 0,
            begin: 0.5,
            end: 1.0
        })
        .addTransition(cash2, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: 0,
            begin: 0.5,
            end: 1.0
        })
        .addTransition(cash3, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: 0,
            begin: 0.5,
            end: 1.0
        })
        .addTransition(cash4, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: 0,
            begin: 0.5,
            end: 1.0
        })
        .addTransition(cash5, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: 0,
            begin: 0.5,
            end: 1.0
        });

    // flip entire panel to other side, hide 'crisp', reveal 'flexible'
    controller.addScene()
        .addTransition(panel, {
            property: 'rotateY',
            beginValue: 0,
            endValue: 180,
            begin: 0,
            end: 1
        });

    // Bring up cards
    controller.addScene()
        .addTransition(card1, {
            property: 'translateX',
            beginValue: 1 * _windowHeight,
            endValue: 0,
            begin: 0,
            end: 0.3
        })
        .addTransition(card2, {
            property: 'translateX',
            beginValue: 1 * _windowHeight,
            endValue: 0,
            begin: 0.1,
            end: 0.4
        })
        .addTransition(card3, {
            property: 'translateX',
            beginValue: 1 * _windowHeight,
            endValue: 0,
            begin: 0.2,
            end: 0.5
        })
        .addTransition(card1, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.7,
            begin: 0,
            end: 0
        })
        .addTransition(card2, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0
        })
        .addTransition(card3, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.3,
            begin: 0,
            end: 0
        })
        .addTransition(card4, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.7,
            begin: 0,
            end: 0
        })
        .addTransition(card5, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0
        })
        .addTransition(card6, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.3,
            begin: 0,
            end: 0
        })
        .addTransition(card1, {
            property: 'translateY',
            endValue: 0,
            beginValue: panelHeight * 1.7,
            begin: 0.5,
            end: 1
        })
        .addTransition(card2, {
            property: 'translateY',
            endValue: 0,
            beginValue: panelHeight * 1.5,
            begin: 0.5,
            end: 1
        })
        .addTransition(card3, {
            property: 'translateY',
            endValue: 0,
            beginValue: panelHeight * 1.3,
            begin: 0.5,
            end: 1
        });

    // Slide cards under band
    controller.addScene()
        .addTransition(card4, {
            property: 'translateX',
            beginValue: 1 * _windowHeight,
            endValue: 0,
            begin: 0,
            end: 0.3
        })
        .addTransition(card5, {
            property: 'translateX',
            beginValue: 1 * _windowHeight,
            endValue: 0,
            begin: 0.1,
            end: 0.4
        })
        .addTransition(card6, {
            property: 'translateX',
            beginValue: 1 * _windowHeight,
            endValue: 0,
            begin: 0.2,
            end: 0.5
        })
        .addTransition(card4, {
            property: 'translateY',
            endValue: 0,
            beginValue: panelHeight * 1.7,
            begin: 0.5,
            end: 1
        })
        .addTransition(card5, {
            property: 'translateY',
            endValue: 0,
            beginValue: panelHeight * 1.5,
            begin: 0.5,
            end: 1
        })
        .addTransition(card6, {
            property: 'translateY',
            endValue: 0,
            beginValue: panelHeight * 1.3,
            begin: 0.5,
            end: 1
        });

    // flip panel 90 degrees and push to other side, hide 'flexible', reveal 'safe'
    controller.addScene()
        .addTransition(panel, {
            property: 'rotateY',
            beginValue: 180,
            endValue: 90,
            begin: 0,
            end: 1
        })
        .addTransition(panel, {
            property: 'translateZ',
            beginValue: 0,
            endValue: -0.5 * panelHeight,
            begin: 0,
            end: 1
        });

    // Fade in RFID signals
    controller.addScene()
        .addTransition(rfid1, {
            property: 'opacity',
            beginValue: 0,
            endValue: 1,
            begin: 0,
            end: 0.33
        })
        .addTransition(rfid2, {
            property: 'opacity',
            beginValue: 0,
            endValue: 1,
            begin: 0.33,
            end: 0.66
        })
        .addTransition(rfid3, {
            property: 'opacity',
            beginValue: 0,
            endValue: 1,
            begin: 0.66,
            end: 1
        })
        .addTransition(rfid1, {
            property: 'scale',
            beginValue: 0.9,
            endValue: 1,
            begin: 0,
            end: 0.33
        })
        .addTransition(rfid2, {
            property: 'scale',
            beginValue: 0.9,
            endValue: 1,
            begin: 0.33,
            end: 0.66
        })
        .addTransition(rfid3, {
            property: 'scale',
            beginValue: 0.9,
            endValue: 1,
            begin: 0.66,
            end: 1
        });

    // And fade them out
    controller.addScene()
        .addTransition(rfid1, {
            property: 'opacity',
            beginValue: 1,
            endValue: 0,
            begin: 0,
            end: 0.33
        })
        .addTransition(rfid2, {
            property: 'opacity',
            beginValue: 1,
            endValue: 0,
            begin: 0.33,
            end: 0.66
        })
        .addTransition(rfid3, {
            property: 'opacity',
            beginValue: 1,
            endValue: 0,
            begin: 0.66,
            end: 1
        });

    // Rotate panel back to cash-side. Fade in jeans.
    controller.addScene()
        .addTransition(panel, {
            property: 'rotateY',
            beginValue: 90,
            endValue: 0,
            begin: 0,
            end: 1
        });

    // Rotate panel into jean pocket.
    controller.addScene()
        .addTransition(panel, {
            property: 'rotateZ',
            beginValue: -90,
            endValue: 90,
            begin: 0,
            end: 1
        });

    controller.initialize();
    controller.action(); //!

});

function randomCash() {
    for (var i = 0; i < 10; i++) {
        var srcSelector = Math.round(Math.random());
        var src = 'assets/images/cash-front.svg';
        if (srcSelector) {
            src = 'assets/images/cash-back.svg';
        }

        var div = document.createElement('div');
        div.className = 'rain';
        div.style.left = (Math.random() * (_windowWidth - (-100)) + (-100)) + 'px';
        div.style.webkitAnimationDelay = Math.random() * 5 + 's';
        div.style.webkitAnimationIterationCount = 'infinite';

        var img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.webkitTransform = 'scale(' + (Math.random() * (1 - 0.33) + 0.33) + ') rotate(' + Math.random() * 180 + 'deg)';

        div.appendChild(img);
        document.getElementById('animation-container').appendChild(div);
    }
}

function randomCards() {
    for (var i = 0; i < 10; i++) {
        var srcSelector = Math.round(Math.random() * 4);
        var src = 'assets/images/credit-card.svg';
        switch (srcSelector) {
            case 1:
                src = 'assets/images/bank-card.svg';
                break;
            case 2:
                src = 'assets/images/transit-card.svg';
                break;
            case 3:
                src = 'assets/images/insurance-card.svg';
                break;
            case 4:
                src = 'assets/images/drivers-license-card.svg';
                break;
        }

        var div = document.createElement('div');
        div.className = 'rain';
        div.style.left = (Math.random() * (_windowWidth - (-100)) + (-100)) + 'px';
        div.style.webkitAnimationDelay = Math.random() * 5 + 's';
        div.style.webkitAnimationIterationCount = 'infinite';

        var img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.webkitTransform = 'scale(' + (Math.random() * (1 - 0.33) + 0.33) + ') rotate(' + Math.random() * 180 + 'deg)';

        div.appendChild(img);
        document.getElementById('animation-container').appendChild(div);
    }
}
