/* global module: false */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2
                },
                files: {
                    // target.css file: source.less file
                    "build/development/main.css": "src/less/main.less"
                }
            },
            release: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // target.css file: source.less file
                    "build/release/receiver.css": "src/less/receiver.less"
                }
            }
        },

        uglify: {
            development: {
                options: {
                    beautify: true,
                    mangle: false
                },
                files: {
                    'build/development/main.js': ['src/js/*.js']
                }
            },
            release: {
                options: {
                    mangle: false
                },
                files: {
                    'build/release/main.js': ['src/js/*.js']
                }
            }
        },

        copy: {
            development: {
                files: [{
                    src: 'src/index.html',
                    dest: 'build/development/index.html'
                }, {
                    src: 'src/assets/images/*',
                    dest: 'build/development/assets/images/',
                    flatten: true,
                    filter: 'isFile',
                    expand: true
                }]
            },
            release: {
                files: [{
                    src: 'src/index.html',
                    dest: 'build/release/index.html'
                }, {
                    src: 'src/img/*',
                    dest: 'build/release/assets/images/',
                    flatten: true,
                    filter: 'isFile',
                    expand: true
                }]
            }
        },

        replace: {
            development: {
                options: {
                    patterns: [{
                        match: 'timestamp',
                        replacement: '<%= new Date().getTime() %>'
                    }, {
                        match: 'buildtimestamp',
                        replacement: '<%= grunt.template.today() %>'
                    }]
                },
                files: [{
                    src: ['src/index.html'],
                    dest: 'build/development/index.html'
                }]
            }
        },

        jshint: {
            options: {
                bitwise: false,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: 'nofunc',
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    // for node/browser compat
                    "global": false,
                    "require": false,
                    "module": false
                }
            },
            all: [
                'Gruntfile.js',
                'src/js/*.js'
            ]
        },

        browserify: {
            development: {
                files: {
                    'build/development/main.js': ['src/js/main.js']
                },
                options: {
                    debug: true
                }
            },
            release: {
                files: {
                    'build/release/main.js': ['src/js/main.js']
                },
                options: {
                    debug: false
                }
            }
        },

        clean: {
            development: ['build/development'],
            release: ['build/release']
        },

        watch: {
            styles: {
                files: ['src/less/*.less', 'src/js/*.js', 'src/*.html'],
                tasks: ['develop']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('build', ['jshint', 'clean:development', 'less:development', 'browserify:development', 'copy:development', 'replace:development']);
    grunt.registerTask('release', ['jshint', 'clean:release', 'less:release', 'uglify:release', 'copy:release']);
};
