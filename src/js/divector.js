(function(console, requestAnimationFrame) {

    function Divector() {

        this._window = null;
        this._updating = false;
        this._windowHeight = 0;
        this._playhead = 0;
        this._previousPlayhead = -1;
        this._currentScene = 0;
        this._previousScene = -1;
        this._sceneCompletion = 0;
        this._vendorPrefix = {};
        this._renderQueue = [];

        this.actors = [];
        this.scenes = [];

    }

    // Add an actor and returns it's ID for later use
    Divector.prototype.addActor = function(el) {
        var actor = new Actor(el);
        actor.id = this.actors.length;
        this.actors.push(actor);

        return actor;
    };

    Divector.prototype.action = function() {
        window.onscroll = this.update.bind(this);
    };

    Divector.prototype.update = function() {
        var rawDifference, actor, transitions, transition, i, j, k;

        // Grab new scrollTop;
        if (!this._updating) {
            this._updating = true;
            this._playhead = window.scrollY;

            // If it is different we must recalculate
            if (this._playhead !== this._previousPlayhead) {
                rawDifference = this._playhead / this._windowHeight;
                this._currentScene = rawDifference | 0; // Bitwise op in place of rounding (faster, I swear)
                this._sceneCompletion = rawDifference - this._currentScene;
                this._previousPlayhead = this._playhead;

                if (this._currentScene !== this._previousScene) {
                    // We are changing scenes.

                    // Fire off the callback if we have one
                    if (typeof this.onChangeScene === 'function') {
                        this.onChangeScene(this._currentScene);
                    }

                    // Spend a frame cleaning up and making sure everything is updated to expected positions.
                    // Iterate upwards through all actors with transitions before this scene,
                    // and make sure their current properties match the endValue.
                    // TODO: This might be overkill to go through ALL previous transitions. Give some thought to achieving this more intelligently.
                    for (i = 0; i < this.actors.length; i++) {
                        actor = this.actors[i];

                        for (j = 0; j < this._currentScene; j++) {
                            if (actor.transitions[j]) {
                                transitions = actor.transitions[j];

                                for (k = 0; k < transitions.length; k++) {
                                    transition = transitions[k];

                                    if (actor.properties[transition.property] !== transition.endValue) {
                                        actor.properties[transition.property] = transition.endValue;
                                        actor.dirty = true;
                                        if (this._renderQueue.indexOf(actor) < 0) {
                                            this._renderQueue.push(actor);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // If we are moving back up a scene also make sure all the properties match beginValues from the previous scene.
                    // and endValues from the currentScene.
                    // TODO: Is it enough to only capture the values from the previous scene?
                    // TODO: Seems like we're repeating a lot of very similar loops. Look into consolidating/optimizing.
                    if (this._currentScene < this._previousScene) {
                        for (i = 0; i < this.actors.length; i++) {
                            actor = this.actors[i];
                            transitions = actor.transitions[this._previousScene];

                            if (transitions) {
                                for (j = 0; j < transitions.length; j++) {
                                    transition = transitions[j];
                                    if (actor.properties[transition.property] !== transition.beginValue) {
                                        actor.properties[transition.property] = transition.beginValue;
                                        actor.dirty = true;
                                        if (this._renderQueue.indexOf(actor) < 0) {
                                            this._renderQueue.push(actor);
                                        }
                                    }
                                }
                            }

                            transitions = actor.transitions[this._currentScene];

                            if (transitions) {
                                for (j = 0; j < transitions.length; j++) {
                                    transition = transitions[j];
                                    if (actor.properties[transition.property] !== transition.endValue) {
                                        actor.properties[transition.property] = transition.endValue;
                                        actor.dirty = true;
                                        if (this._renderQueue.indexOf(actor) < 0) {
                                            this._renderQueue.push(actor);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (this.scenes[this._currentScene]) {
                    // Iterate through all the 'actors' that have transitions in this scene.
                    for (i = 0; i < this.actors.length; i++) {
                        if (this.actors[i].transitions[this._currentScene]) {
                            actor = this.actors[i];
                            transitions = actor.transitions[this._currentScene];

                            for (j = 0; j < transitions.length; j++) {
                                transition = transitions[j];
                                var progress;

                                if (this._sceneCompletion < transition.begin) {
                                    progress = 0;
                                } else if (this._sceneCompletion > transition.end) {
                                    progress = transition.endValue - transition.beginValue;
                                } else {
                                    progress = (transition.endValue - transition.beginValue) * ((this._sceneCompletion - transition.begin) / (transition.end - transition.begin));
                                }

                                if (actor.properties[transition.property] !== transition.beginValue + progress) {
                                    actor.properties[transition.property] = transition.beginValue + progress;
                                    actor.dirty = true;
                                    if (this._renderQueue.indexOf(actor) < 0) {
                                        this._renderQueue.push(actor);
                                    }
                                }
                            }
                        }
                    }
                }

                this._previousScene = this._currentScene;
            }

            // Re-render (if there are any changes)
            if (this._renderQueue.length) {
                requestAnimationFrame(this.render.bind(this));
            }

            this._updating = false;
        }

    };

    Divector.prototype.render = function() {
        var i, actor, transformString;

        for (i = 0; i < this._renderQueue.length; i++) {
            actor = this._renderQueue[i];
            actor.$el.style[this._vendorPrefix.js + 'Transform'] = actor.compileTransformString();
            actor.$el.style.opacity = actor.properties.opacity;
        }

        // Done. Empty out the _renderQueue.
        this._renderQueue = [];
    };

    Divector.prototype.addScene = function() {
        var scene;

        scene = new Scene(this);
        scene.id = this.scenes.length;
        this.scenes.push(scene);

        return scene;
    };

    Divector.prototype.initialize = function() {

        this._windowHeight = window.innerHeight;
        this._vendorPrefix = this.getVendorPrefix();

        for (var i = 0; i < this.actors.length; i++) {
            this.actors[i].initialize();
        }

    };

    Divector.prototype.getVendorPrefix = function() {
        var div, style, transformPrefix, getProp;

        div = document.createElement('div');
        document.body.appendChild(div);

        style = window.getComputedStyle(div, null);
        getProp = style.getPropertyValue.bind(style);
        transformPrefix = getProp("-webkit-transform") ? '-webkit-' :
            getProp("-moz-transform") ? '-moz-' :
            getProp("-ms-transform") ? '-ms-' :
            getProp("-o-transform") ? '-o-' :
            getProp("transform") ? '' : undefined;

        document.body.removeChild(div);
        return {
            css: transformPrefix,
            js: transformPrefix.replace(/-/g, '')
        };
    };

    function Scene(controller) {

        this.controller = controller;

    }

    Scene.prototype.addTransition = function(actor, options) {
        // Get a reference by either ID or passing the actor object itself
        actor = isNaN(actor) ? actor : this.controller.actors[actor];
        actor.addTransition(this.id, options);

        return this; // For chaining!
    };

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

    };

    Actor.prototype.initialize = function() {

        if (!this.$el) {
            this.$el = document.getElementById(this.el.replace('#', ''));
            this.initializeProperties();
        }

    };

    Actor.prototype.initializeProperties = function() {
        var transform, scaleX, skewX, skewY, scaleY, translateX, translateY, opacity, style;

        if (this.$el) {
            style = window.getComputedStyle(this.$el, null);
            transform = this.getTransform();
            opacity = Number(style.getPropertyValue("opacity"));
            this.$el.className += this.$el.className ? ' actor' : 'actor';
        }

        this.properties = {
            scale: transform ? transform.scale : 1,
            rotateX: transform ? transform.rotate.x : 0,
            rotateY: transform ? transform.rotate.y : 0,
            rotateZ: transform ? transform.rotate.z : 0,
            translateX: transform ? transform.translate.x : 0,
            translateY: transform ? transform.translate.y : 0,
            translateZ: transform ? transform.translate.z : 0,
            opacity: opacity ? opacity : 1
        };
    };

    Actor.prototype.getTransform = function() {

        var style = window.getComputedStyle(this.$el, null);
        var transform = style.getPropertyValue("-webkit-transform") ||
            style.getPropertyValue("-moz-transform") ||
            style.getPropertyValue("-ms-transform") ||
            style.getPropertyValue("-o-transform") ||
            style.getPropertyValue("transform") ||
            undefined;

        if (transform === 'none') {
            transform = undefined;
        }

        if (transform) {
            var matrix = parseMatrix(transform),
                rotateY = Math.asin(-matrix.m13),
                rotateX,
                rotateZ;

            if (Math.cos(rotateY) !== 0) {
                rotateX = Math.atan2(matrix.m23, matrix.m33);
                rotateZ = Math.atan2(matrix.m12, matrix.m11);
            } else {
                rotateX = Math.atan2(-matrix.m31, matrix.m22);
                rotateZ = 0;
            }
            return {
                rotate: {
                    x: rotateX * (180 / Math.PI),
                    y: rotateY * (180 / Math.PI),
                    z: rotateZ * (180 / Math.PI)
                },
                translate: {
                    x: matrix.m41,
                    y: matrix.m42,
                    z: matrix.m43
                },
                scale: Math.abs(matrix.m11)
            };

        } else {
            return undefined;
        }

    };

    /* Parses a matrix string and returns a 4x4 matrix
       borrowed from http://blog.keithclark.co.uk/calculating-element-vertex-data-from-css-transforms/
    ---------------------------------------------------------------- */

    function parseMatrix(matrixString) {
        var c = matrixString.split(/\s*[(),]\s*/).slice(1, -1),
            matrix;

        if (c.length === 6) {
            // 'matrix()' (3x2)
            matrix = {
                m11: +c[0],
                m21: +c[2],
                m31: 0,
                m41: +c[4],
                m12: +c[1],
                m22: +c[3],
                m32: 0,
                m42: +c[5],
                m13: 0,
                m23: 0,
                m33: 1,
                m43: 0,
                m14: 0,
                m24: 0,
                m34: 0,
                m44: 1
            };
        } else if (c.length === 16) {
            // matrix3d() (4x4)
            matrix = {
                m11: +c[0],
                m21: +c[4],
                m31: +c[8],
                m41: +c[12],
                m12: +c[1],
                m22: +c[5],
                m32: +c[9],
                m42: +c[13],
                m13: +c[2],
                m23: +c[6],
                m33: +c[10],
                m43: +c[14],
                m14: +c[3],
                m24: +c[7],
                m34: +c[11],
                m44: +c[15]
            };

        } else {
            // handle 'none' or invalid values.
            matrix = {
                m11: 1,
                m21: 0,
                m31: 0,
                m41: 0,
                m12: 0,
                m22: 1,
                m32: 0,
                m42: 0,
                m13: 0,
                m23: 0,
                m33: 1,
                m43: 0,
                m14: 0,
                m24: 0,
                m34: 0,
                m44: 1
            };
        }
        return matrix;
    }

    module.exports = Divector;

})(window.console, window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame);
