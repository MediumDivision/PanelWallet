grunt.initConfig({
        browserify: {
            app: {
                options: {
                    shim: {
                        jquery: {
                            path: 'bower_components/jquery/jquery.js',
                            exports: '$'
                        },
                        underscore: {
                            path: 'bower_components/underscore/underscore.js',
                            exports: '_'
                        },
                        backbone: {
                            path: 'bower_components/backbone/backbone.js',
                            exports: 'Backbone',
                            depends: {
                                underscore: 'underscore'
                            }
                        },
                        'backbone.babysitter': {
                            path: 'bower_components/backbone.babysitter/lib/backbone.babysitter.js',
                            exports: 'Backbone.Babysitter',
                            depends: {
                                backbone: 'Backbone'
                            }
                        },
                        'backbone.wreqr': {
                            path: 'bower_components/backbone.wreqr/lib/backbone.wreqr.js',
                            exports: 'Backbone.Wreqr',
                            depends: {
                                backbone: 'Backbone'
                            }
                        },
                        'backbone.marionette': {
                            path: 'bower_components/backbone.marionette/lib/backbone.marionette.js',
                            exports: 'Marionette',
                            depends: {
                                jquery: '$',
                                backbone: 'Backbone',
                                underscore: '_'
                            }
                        }
                    }
                },
                src: ['src/js/app.js'],
                dest: 'build/js/bundle.js'
            }
        },
    }
