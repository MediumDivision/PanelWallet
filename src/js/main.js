var controller = new Divector();

var panel = controller.addActor('#panel');
var tagline = controller.addActor('#tagline');
var crisp = controller.addActor('#crisp');
var flexible = controller.addActor('#flexible');
var safe = controller.addActor('#safe');

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

$(function() {

    var _window = $(window);
    var _windowHeight = _window.height();
    var _windowWidth = _window.width();

    // Initialize scene container height
    $('.scene').each(function(idx, elem) {
        elem.style.height = _windowHeight + 'px';
    });

    var quarterScreen = _windowWidth / 4;
    var panelHeight = _windowHeight / 3;
    var panelWidth = panelHeight * 1.325;
    var thirdLeft = panelHeight;

    $('#panel').css({
        height: panelHeight,
        width: panelWidth,
        marginTop: -1 * (panelHeight / 2),
        marginLeft: -1 * (panelWidth / 2)
    });

    $('#crisp, #flexible').css({
        top: panelHeight / 2
    });

    // Zoom out logo, bring in tagline
    controller.addScene()
        .addTransition(panel, {
            property: 'scale',
            beginValue: 5,
            endValue: 1,
            begin: 0,
            end: 0.75
        })
        .addTransition(tagline, {
            property: 'translateY',
            beginValue: 0,
            endValue: -150,
            begin: 0.25,
            end: 0.75
        })
        .addTransition(tagline, {
            property: 'opacity',
            beginValue: 0,
            endValue: 1,
            begin: 0.35,
            end: 0.5
        });
    // *******************************

    // Clear tagline, rotate logo, push to side, bring in 'Crisp' text
    controller.addScene()
        .addTransition(tagline, {
            property: 'translateY',
            beginValue: -150,
            endValue: -350,
            begin: 0,
            end: 0.25
        })
        .addTransition(tagline, {
            property: 'opacity',
            beginValue: 1,
            endValue: 0,
            begin: 0,
            end: 0.2
        })
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
            endValue: -1 * quarterScreen,
            begin: 0.5,
            end: 1.0
        })
        .addTransition(crisp, {
            property: 'opacity',
            beginValue: 0,
            endValue: 1,
            begin: 0.75,
            end: 1
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
            endValue: quarterScreen * 2,
            begin: 0,
            end: 0
        })
        .addTransition(cash2, {
            property: 'translateY',
            beginValue: 0,
            endValue: quarterScreen * 2,
            begin: 0,
            end: 0
        })
        .addTransition(cash3, {
            property: 'translateY',
            beginValue: 0,
            endValue: quarterScreen * 2,
            begin: 0,
            end: 0
        })
        .addTransition(cash4, {
            property: 'translateY',
            beginValue: 0,
            endValue: quarterScreen * 2,
            begin: 0,
            end: 0
        })
        .addTransition(cash5, {
            property: 'translateY',
            beginValue: 0,
            endValue: quarterScreen * 2,
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
            beginValue: quarterScreen * 2,
            endValue: 0,
            begin: 0.5,
            end: 1.0
        })
        .addTransition(cash2, {
            property: 'translateY',
            beginValue: quarterScreen * 2,
            endValue: 0,
            begin: 0.5,
            end: 1.0
        })
        .addTransition(cash3, {
            property: 'translateY',
            beginValue: quarterScreen * 2,
            endValue: 0,
            begin: 0.5,
            end: 1.0
        })
        .addTransition(cash4, {
            property: 'translateY',
            beginValue: quarterScreen * 2,
            endValue: 0,
            begin: 0.5,
            end: 1.0
        })
        .addTransition(cash5, {
            property: 'translateY',
            beginValue: quarterScreen * 2,
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
        })
        .addTransition(crisp, {
            property: 'opacity',
            beginValue: 1,
            endValue: 0,
            begin: 0,
            end: 0.5
        })
        .addTransition(flexible, {
            property: 'opacity',
            beginValue: 0,
            endValue: 1,
            begin: 0.5,
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
        .addTransition(card4, {
            property: 'translateX',
            beginValue: 1 * _windowHeight,
            endValue: 0,
            begin: 0.3,
            end: 0.6
        })
        .addTransition(card5, {
            property: 'translateX',
            beginValue: 1 * _windowHeight,
            endValue: 0,
            begin: 0.4,
            end: 0.7
        })
        .addTransition(card6, {
            property: 'translateX',
            beginValue: 1 * _windowHeight,
            endValue: 0,
            begin: 0.5,
            end: 0.8
        })
        .addTransition(card1, {
            property: 'translateY',
            beginValue: 0,
            endValue: quarterScreen * 2.3,
            begin: 0,
            end: 0
        })
        .addTransition(card2, {
            property: 'translateY',
            beginValue: 0,
            endValue: quarterScreen * 2.1,
            begin: 0,
            end: 0
        })
        .addTransition(card3, {
            property: 'translateY',
            beginValue: 0,
            endValue: quarterScreen * 1.9,
            begin: 0,
            end: 0
        })
        .addTransition(card4, {
            property: 'translateY',
            beginValue: 0,
            endValue: quarterScreen * 1.7,
            begin: 0,
            end: 0
        })
        .addTransition(card5, {
            property: 'translateY',
            beginValue: 0,
            endValue: quarterScreen * 1.5,
            begin: 0,
            end: 0
        })
        .addTransition(card6, {
            property: 'translateY',
            beginValue: 0,
            endValue: quarterScreen * 1.3,
            begin: 0,
            end: 0
        });

    // Slide cards under band
    controller.addScene()
    .addTransition(card1, {
            property: 'translateY',
            endValue: 0,
            beginValue: quarterScreen * 2.3,
            begin: 0,
            end: 1
        })
        .addTransition(card2, {
            property: 'translateY',
            endValue: 0,
            beginValue: quarterScreen * 2.1,
            begin: 0,
            end: 1
        })
        .addTransition(card3, {
            property: 'translateY',
            endValue: 0,
            beginValue: quarterScreen * 1.9,
            begin: 0,
            end: 1
        })
        .addTransition(card4, {
            property: 'translateY',
            endValue: 0,
            beginValue: quarterScreen * 1.7,
            begin: 0,
            end: 1
        })
        .addTransition(card5, {
            property: 'translateY',
            endValue: 0,
            beginValue: quarterScreen * 1.5,
            begin: 0,
            end: 1
        })
        .addTransition(card6, {
            property: 'translateY',
            endValue: 0,
            beginValue: quarterScreen * 1.3,
            begin: 0,
            end: 1
        });

    controller.initialize();
    controller.action(); //!

});
