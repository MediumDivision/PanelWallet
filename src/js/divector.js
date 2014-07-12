window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function Divector() {

    this._window;
    this._windowHeight = 0;
    this._scrollTop = 0;
    this._previousScrollTop = 0;
    this._currentScene = 0;
    this._sceneCompletion = 0;

    this.actors = [];
    this.scenes = [];
    this.renderQueue = [];

}

// Add an actor and returns it's ID for later use
Divector.prototype.addActor = function(el) {
    var actor = new Actor(el);
    actor.id = this.actors.length;
    this.actors.push(actor);

    return actor;
};

Divector.prototype.action = function() {
    requestAnimationFrame(this.update.bind(this));
};

Divector.prototype.update = function() {
    var rawDifference, actor, i, j;

    // Grab new scrollTop;
    this._scrollTop = $('body').scrollTop();

    // If it is different we must recalculate
    if (this._scrollTop != this._previousScrollTop) {
        rawDifference = this._scrollTop / this._windowHeight;
        this._currentScene = rawDifference | 0; // Bitwise op in place of rounding (faster, I swear)
        this._sceneCompletion = rawDifference - this._currentScene;
        this._previousScrollTop = this._scrollTop;

        if (this.scenes[this._currentScene]) {
            // Iterate through all the 'actors' that have transitions in this scene.
            for (i = 0; i < this.actors.length; i++) {
                if (this.actors[i].transitions[this._currentScene]) {
                    actor = this.actors[i];
                    var transitions = actor.transitions[this._currentScene];

                    for (j = 0; j < transitions.length; j++) {
                        var transition = transitions[j];
                        var progress;

                        if (this._sceneCompletion < transition.begin) {
                            progress = 0;
                        } else if (this._sceneCompletion > transition.end) {
                            progress = transition.endValue - transition.beginValue;
                        } else {
                            progress = (transition.endValue - transition.beginValue) * ((this._sceneCompletion - transition.begin) / (transition.end - transition.begin));
                        }

                        if (actor.properties[transition.property] != transition.beginValue + progress) {
                            actor.properties[transition.property] = transition.beginValue + progress;
                            actor.dirty = true;
                            this.renderQueue.push(actor);
                        }
                    }
                }
            }
        }
    }

    // Re-render (if there are any changes)
    this.render();

};

Divector.prototype.render = function() {
    var i, actor, transformString;

    for (i = 0; i < this.renderQueue.length; i++) {
        actor = this.renderQueue[i];
        actor.$el.style.webkitTransform = actor.compileTransformString();
        actor.$el.style.opacity = actor.properties.opacity;
    }

    // Done. Empty out the renderQueue and kick off another update
    this.renderQueue = [];
    requestAnimationFrame(this.update.bind(this));
};

Divector.prototype.addScene = function() {

    var scene = new Scene(this);
    scene.id = this.scenes.length;
    this.scenes.push(scene);

    return scene;

};

Divector.prototype.initialize = function() {

    this._windowHeight = window.innerHeight;

    for (var i = 0; i < this.actors.length; i++) {
        this.actors[i].initialize();
    }

}

function Scene(controller) {

    this.controller = controller;

}

Scene.prototype.addTransition = function(actor, options) {
    var actor = isNaN(actor) ? actor : this.controller.actors[actor];
    actor.addTransition(this.id, options);

    return this; // For chaining!
}

function Actor(el) {

    this.el = el;
    this.dirty = false;
    this.transitions = [];

    // Go ahead and attempt to grab a reference here, might not work!
    this.initialize();

}

Actor.prototype.compileTransformString = function() {
    var property, transformString = '';

    for (property in this.properties) {
        switch (property) {
            case 'rotateX':
            case 'rotateY':
            case 'rotateZ':
                transformString += property + '(' + this.properties[property].toFixed(2) + 'deg) ';
                break;
            case 'translateX':
            case 'translateY':
            case 'translateZ':
                transformString += property + '(' + this.properties[property].toFixed(2) + 'px) ';
                break;
            case 'scale':
                transformString += property + '(' + this.properties[property].toFixed(2) + ') ';
                break;
            default:
                break;
        }
    }

    return transformString;
};

Actor.prototype.addTransition = function(sceneId, options) {

    if (!this.transitions[sceneId]) {
        this.transitions[sceneId] = [];
    }

    this.transitions[sceneId].push(options);

}

Actor.prototype.initialize = function() {

    if (!this.$el) {
        this.$el = document.getElementById(this.el.replace('#', ''));
        this.initializeProperties();
    }

}

Actor.prototype.initializeProperties = function() {
    var transform, scaleX, skewX, skewY, scaleY, translateX, translateY, opacity;

    if (this.$el) {
        this.$el.className += ' actor';

        var style = window.getComputedStyle(this.$el, null);
        transform = style.getPropertyValue("-webkit-transform") ||
            style.getPropertyValue("-moz-transform") ||
            style.getPropertyValue("-ms-transform") ||
            style.getPropertyValue("-o-transform") ||
            style.getPropertyValue("transform") ||
            undefined;

        if (transform === 'none') {
            transform = undefined;
        }

        if (transform) {
            console.log(transform);
            var values = transform.split('(')[1];
            values = values.split(')')[0];
            values = values.split(',');

            scaleX = Number(values[0]);
            skewX = Number(values[1]);
            skewY = Number(values[2]);
            scaleY = Number(values[3]);
            translateX = Number(values[4]);
            translateY = Number(values[5]);
        }

        opacity = Number(style.getPropertyValue("opacity"));
    }

    this.properties = {
        scale: transform ? scaleX : 1,
        rotateX: transform ? 0 : 0,
        rotateY: transform ? 0 : 0,
        rotateZ: transform ? Math.round(Math.atan2(skewX, scaleX) * (180 / Math.PI)) : 0,
        translateX: transform ? translateX : 0,
        translateY: transform ? translateY : 0,
        translateZ: this.id * 0.25,
        opacity: opacity ? opacity : 1
    };

    console.log(this.properties);
}
