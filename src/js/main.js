var $ = window.$ || {};
var Divector = require('./divector.js');

var controller = new Divector();
controller.onChangeScene = function(newSceneIndex) {

    // Queue current animating elements for cleanup
    // var animatedElems = document.getElementsByClassName('rain');
    // for (var i = 0; i < animatedElems.length; i++) {
    //     if (newSceneIndex > 2) {
    //         document.getElementById('animation-container').removeChild(animatedElems[i]);
    //     } else {
    //         animatedElems[i].className += ' destroy';
    //     }
    // }

    // // Switch to new animation if necessary
    // if (newSceneIndex === 0) {
    //     randomCash();
    // } else if (newSceneIndex === 1) {
    //     randomCards();
    // }

};

var logo = controller.addActor('#logo');
var kickstarterLogo = controller.addActor('#kickstarter-logo');
var header = controller.addActor('#header');
var subHeader = controller.addActor('#subheader');

var panel = controller.addActor('#panel');
var jeans = controller.addActor('#jeans');
var jeansPocket = controller.addActor('#jeans-pocket');
var cashContainer = controller.addActor('#cash-container');
var cardContainer = controller.addActor('#card-container');

var rfid1 = controller.addActor('#rfid1');
var rfid2 = controller.addActor('#rfid2');
var rfid3 = controller.addActor('#rfid3');

var cash1 = controller.addActor('#cash1');
var cashImageRight1 = controller.addActor('#cashImgRight1');
var cashImageLeft1 = controller.addActor('#cashImgLeft1');
var cash2 = controller.addActor('#cash2');
var cashImageRight2 = controller.addActor('#cashImgRight2');
var cashImageLeft2 = controller.addActor('#cashImgLeft2');
var cash3 = controller.addActor('#cash3');
var cashImageRight3 = controller.addActor('#cashImgRight3');
var cashImageLeft3 = controller.addActor('#cashImgLeft3');
var cash4 = controller.addActor('#cash4');
var cashImageRight4 = controller.addActor('#cashImgRight4');
var cashImageLeft4 = controller.addActor('#cashImgLeft4');
var cash5 = controller.addActor('#cash5');
var cashImageRight5 = controller.addActor('#cashImgRight5');
var cashImageLeft5 = controller.addActor('#cashImgLeft5');

var card1 = controller.addActor('#coin-card');
var card2 = controller.addActor('#credit-card');
var card3 = controller.addActor('#bank-card');
var card4 = controller.addActor('#transit-card');
var card5 = controller.addActor('#insurance-card');
var card6 = controller.addActor('#drivers-license-card');

var _window = 0;
var _windowHeight = 0;
var _windowWidth = 0;
var PANEL_ASPECT_RATIO = 1.325;

document.addEventListener('DOMContentLoaded', function() {

    _windowHeight = window.innerHeight;
    _windowWidth = window.innerWidth;

    // Initialize scene container height
    var scenes = document.getElementsByClassName('scene');
    Array.prototype.forEach.call(scenes, function(el) {
        el.style.height = _windowHeight + 'px';
        el.style.width = _windowWidth + 'px';
        el.style.maxWidth = _windowWidth + 'px';
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
    rfidContainer.style.marginLeft = -1 * (panelWidth / 4) + 'px';

    // Initialize jean dimensions
    var jeanEls = document.getElementsByClassName('jeans');
    var jeanWidth = panelHeight * 2.25;
    Array.prototype.forEach.call(jeanEls, function(el) {
        el.style.minWidth = jeanWidth + 'px';
        el.style.height = jeanWidth * 0.75 + 'px';
    });

    // Initialize profile image depths
    var profiles = document.getElementsByClassName('profile');
    Array.prototype.forEach.call(profiles, function(el) {
        el.style.webkitTransform = 'rotateX(90deg) rotateZ(90deg) translateZ(' + Math.floor(panelHeight / 2) + 'px)';
    });

    var cardZ = panelHeight * -0.065;
    var bandZ = (cardZ - 1) * -1;
    var eachCard = cardZ / 6;
    var licenseCard = document.getElementById('drivers-license-card');
    licenseCard.style.webkitTransform = 'rotateY(180deg) translateX(-5000px) translateZ(' + cardZ + 'px)';
    var bandEl = document.getElementById('back-band');
    bandEl.style.webkitTransform = 'rotateY(180deg) translateZ(' + bandZ + 'px)';

    // var bandLeft = document.getElementById('band-profile-left');
    // bandLeft.style.webkitTransform = 'rotateX(90deg) rotateZ(90deg) translateX(' + Math.floor(panelHeight * -0.04) + 'px) translateZ(' + Math.floor(panelHeight * 0.095) + 'px)';

    // var bandRight = document.getElementById('band-profile-right');
    // bandRight.style.webkitTransform = 'rotateX(90deg) rotateZ(90deg) translateX(' + Math.floor(panelHeight * 0.06) + 'px) translateZ(' + Math.floor(panelHeight * 0.095) + 'px)';

    // Cash rain
    controller.addScene()
        .addTransition(logo, {
            property: 'scale',
            beginValue: 1,
            endValue: 0.4,
            begin: 0.8,
            end: 0.9
        }).addTransition(kickstarterLogo, {
            property: 'scale',
            beginValue: 1,
            endValue: 0.75,
            begin: 0.8,
            end: 0.9
        });

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
        })
        .addTransition(cash1, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
        })
        .addTransition(cash2, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
        })
        .addTransition(cash3, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
        })
        .addTransition(cash4, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
        })
        .addTransition(cash5, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
        })
        .addTransition(card1, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
        })
        .addTransition(card2, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
        })
        .addTransition(card3, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
        })
        .addTransition(card4, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
        })
        .addTransition(card5, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
        })
        .addTransition(card6, {
            property: 'translateX',
            beginValue: -2 * _windowWidth,
            endValue: -2 * _windowWidth,
            begin: 0,
            end: 0
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
            endValue: panelHeight * 1.3,
            begin: 0,
            end: 0
        })
        .addTransition(cash2, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.4,
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
            endValue: panelHeight * 1.6,
            begin: 0,
            end: 0
        })
        .addTransition(cash5, {
            property: 'translateY',
            beginValue: 0,
            endValue: panelHeight * 1.7,
            begin: 0,
            end: 0
        });

    // stack, then fold in half
    controller.addScene()
        .addTransition(cash1, {
            property: 'translateY',
            beginValue: panelHeight * 1.3,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0.5
        })
        .addTransition(cash2, {
            property: 'translateY',
            beginValue: panelHeight * 1.4,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0.5
        })
        .addTransition(cash3, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0.5
        })
        .addTransition(cash4, {
            property: 'translateY',
            beginValue: panelHeight * 1.6,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0.5
        })
        .addTransition(cash5, {
            property: 'translateY',
            beginValue: panelHeight * 1.7,
            endValue: panelHeight * 1.5,
            begin: 0,
            end: 0.5
        })
        .addTransition(cashImageLeft1, {
            property: 'rotateY',
            beginValue: 0,
            endValue: -180,
            begin: 0.5,
            end: 1
        })
        .addTransition(cashImageLeft2, {
            property: 'rotateY',
            beginValue: 0,
            endValue: -180,
            begin: 0.5,
            end: 1
        })
        .addTransition(cashImageLeft3, {
            property: 'rotateY',
            beginValue: 0,
            endValue: -180,
            begin: 0.5,
            end: 1
        })
        .addTransition(cashImageLeft4, {
            property: 'rotateY',
            beginValue: 0,
            endValue: -180,
            begin: 0.5,
            end: 1
        })
        .addTransition(cashImageLeft5, {
            property: 'rotateY',
            beginValue: 0,
            endValue: -180,
            begin: 0.5,
            end: 1
        });

    // Slide under band
    controller.addScene()
        .addTransition(cashImageRight1, {
            property: 'rotateZ',
            beginValue: 0,
            endValue: 30,
            begin: 0,
            end: 0.25
        })
        .addTransition(cashImageRight2, {
            property: 'rotateZ',
            beginValue: 0,
            endValue: 30,
            begin: 0,
            end: 0.25
        })
        .addTransition(cashImageRight3, {
            property: 'rotateZ',
            beginValue: 0,
            endValue: 30,
            begin: 0,
            end: 0.25
        })
        .addTransition(cashImageRight4, {
            property: 'rotateZ',
            beginValue: 0,
            endValue: 30,
            begin: 0,
            end: 0.25
        })
        .addTransition(cashImageRight5, {
            property: 'rotateZ',
            beginValue: 0,
            endValue: 30,
            begin: 0,
            end: 0.25
        })
        .addTransition(cash1, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: panelHeight * 0.33,
            begin: 0,
            end: 1
        })
        .addTransition(cash2, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: panelHeight * 0.33,
            begin: 0,
            end: 1
        })
        .addTransition(cash3, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: panelHeight * 0.33,
            begin: 0,
            end: 1
        })
        .addTransition(cash4, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: panelHeight * 0.33,
            begin: 0,
            end: 1
        })
        .addTransition(cash5, {
            property: 'translateY',
            beginValue: panelHeight * 1.5,
            endValue: panelHeight * 0.33,
            begin: 0,
            end: 1
        });

    // flip entire panel to other side, tuck cash in.
    controller.addScene()
        .addTransition(panel, {
            property: 'rotateY',
            beginValue: 0,
            endValue: 180,
            begin: 0,
            end: 1
        })
        .addTransition(cash1, {
            property: 'translateY',
            beginValue: panelHeight * 0.33,
            endValue: 0,
            begin: 0.25,
            end: 0.5
        })
        .addTransition(cash2, {
            property: 'translateY',
            beginValue: panelHeight * 0.33,
            endValue: 0,
            begin: 0.25,
            end: 0.5
        }).addTransition(cash3, {
            property: 'translateY',
            beginValue: panelHeight * 0.33,
            endValue: 0,
            begin: 0.25,
            end: 0.5
        }).addTransition(cash4, {
            property: 'translateY',
            beginValue: panelHeight * 0.33,
            endValue: 0,
            begin: 0.25,
            end: 0.5
        }).addTransition(cash5, {
            property: 'translateY',
            beginValue: panelHeight * 0.33,
            endValue: 0,
            begin: 0.25,
            end: 0.5
        })
        .addTransition(cashImageRight1, {
            property: 'rotateZ',
            beginValue: 30,
            endValue: 0,
            begin: 0.25,
            end: 0.5
        })
        .addTransition(cashImageRight2, {
            property: 'rotateZ',
            beginValue: 30,
            endValue: 0,
            begin: 0.25,
            end: 0.5
        })
        .addTransition(cashImageRight3, {
            property: 'rotateZ',
            beginValue: 30,
            endValue: 0,
            begin: 0.25,
            end: 0.5
        })
        .addTransition(cashImageRight4, {
            property: 'rotateZ',
            beginValue: 30,
            endValue: 0,
            begin: 0.25,
            end: 0.5
        })
        .addTransition(cashImageRight5, {
            property: 'rotateZ',
            beginValue: 30,
            endValue: 0,
            begin: 0.25,
            end: 0.5
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

    // Rotate panel back to cash-side. Scale panel. Fade in jeans.
    controller.addScene()
        .addTransition(panel, {
            property: 'rotateY',
            beginValue: 90,
            endValue: 0,
            begin: 0,
            end: 0.5
        })
        .addTransition(panel, {
            property: 'scale',
            beginValue: 1,
            endValue: 0.62,
            begin: 0.5,
            end: 1
        })
        .addTransition(jeans, {
            property: 'translateY',
            beginValue: _windowHeight,
            endValue: _windowHeight / 2,
            begin: 0.5,
            end: 1
        })
        .addTransition(jeansPocket, {
            property: 'translateY',
            beginValue: _windowHeight,
            endValue: _windowHeight / 2,
            begin: 0.5,
            end: 1
        })
        .addTransition(jeansPocket, {
            property: 'opacity',
            beginValue: 0,
            endValue: 1,
            begin: 0,
            end: 0
        })
        .addTransition(jeans, {
            property: 'opacity',
            beginValue: 0,
            endValue: 1,
            begin: 0,
            end: 0
        });

    // Rotate panel into jean pocket.
    controller.addScene()
        .addTransition(panel, {
            property: 'rotateZ',
            beginValue: -90,
            endValue: 90,
            begin: 0,
            end: 1
        })
        .addTransition(jeans, {
            property: 'translateY',
            beginValue: _windowHeight / 2,
            endValue: 0,
            begin: 0,
            end: 0.5
        })
        .addTransition(jeansPocket, {
            property: 'translateY',
            beginValue: _windowHeight / 2,
            endValue: 0,
            begin: 0,
            end: 0.5
        });


    // Slide panel into pocket, and we're done!
    controller.addScene()
        .addTransition(jeans, {
            property: 'translateY',
            beginValue: 0,
            endValue: -1 * _windowHeight,
            begin: 0,
            end: 1
        })
        .addTransition(jeansPocket, {
            property: 'translateY',
            beginValue: 0,
            endValue: -1 * _windowHeight,
            begin: 0,
            end: 1
        })
        .addTransition(logo, {
            property: 'scale',
            beginValue: 0.4,
            endValue: 0.75,
            begin: 0.8,
            end: 0.9
        }).addTransition(kickstarterLogo, {
            property: 'scale',
            beginValue: 0.75,
            endValue: 1,
            begin: 0.8,
            end: 0.9
        });

    controller.initialize();
    randomCash();
    randomCards();
    controller.action(); //!

});

function randomCash() {
    for (var i = 0; i < 15; i++) {
        var srcSelector = Math.round(Math.random());
        var src = 'assets/images/cash-front.svg';
        if (srcSelector) {
            src = 'assets/images/cash-back.svg';
        }

        var div = document.createElement('div');
        div.className = 'rain';

        var top = Math.random() * _windowHeight;
        var left = Math.random() * _windowWidth;
        var randomScale = (Math.random() * (1 - 0.33) + 0.33);
        var blurRadius = (1 - randomScale) * 4;

        div.style.transform = 'translateX(' + left + 'px) translateY(' + top + 'px) translateZ(' + randomScale * 5 + 'px)';
        div.style.webkitTransform = 'translateX(' + left + 'px) translateY(' + top + 'px) translateZ(' + randomScale * 5 + 'px)';

        var img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        img.style.height = '100%';

        img.style.transform = 'scale(' + randomScale + ') rotate(' + Math.random() * 180 + 'deg)';
        img.style.webkitTransform = 'scale(' + randomScale + ') rotate(' + Math.random() * 180 + 'deg)';

        div.appendChild(img);
        document.getElementById('cash-container').appendChild(div);
    }
}

function randomCards() {
    for (var i = 0; i < 15; i++) {
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

        var topSeed = Math.random();
        var top = topSeed * _windowHeight;
        var maxWidth = (1 - topSeed) * _windowWidth;
        var halfMaxWidth = maxWidth * 0.5;
        var left = (_windowWidth * 0.5) + (Math.random() * (halfMaxWidth - (-1 * halfMaxWidth)) + (-1 * halfMaxWidth));
        var randomScale = (Math.random() * (1 - 0.33) + 0.33);
        var blurRadius = (1 - randomScale) * 3;

        var div = document.createElement('div');
        div.className = 'rain';
        div.style.transform = 'translateX(' + left + 'px) translateY(' + top + 'px) translateZ(' + randomScale * 5 + 'px)';
        div.style.webkitTransform = 'translateX(' + left + 'px) translateY(' + top + 'px) translateZ(' + randomScale * 5 + 'px)';

        var img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.transform = 'scale(' + randomScale + ') rotate(' + Math.random() * 180 + 'deg)';
        img.style.webkitTransform = 'scale(' + randomScale + ') rotate(' + Math.random() * 180 + 'deg)';

        div.appendChild(img);
        document.getElementById('card-container').appendChild(div);
    }
}
