module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        express: {
            options: {
                // Override defaults here
            },
            web: {
                options: {
                    script: 'server.js'
                }
            }
        },
        watch: {
            cssfe: {
                files: [
                    'public/assets/css/bootstrap*.css',
                    'public/assets/css/custom.css'
                ],
                tasks: ['cssmin']
            },
            jsfe: {
                files: [
                    'public/app/js/angular/angular.min.js',
                    'public/app/js/angular-ui/angular-ui-router.min.js',
                    'public/app/js/angular-ui/ui-bootstrap-tpls-0.11.2.min.js',
                    'public/app/js/angular/angular-cookies.min.js',
                    'public/app/js/oc-lazyload/ocLazyLoad.min.js',
                    'public/app/js/app.js',
                    'public/app/js/controllers.js',
                    'public/app/js/directives.js',
                    'public/app/js/factory.js',
                    'public/app/js/services.js',
                    'public/app/js/custom.js'
                ],
                tasks: ['uglify']
            },
            imgfe: {
                files: [
                    'public/assets/images/**/*'
                ]
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'public/assets/css/**/*',
                    'public/app/js/angular.min.js',
                    'public/assets/images/**/*',
                    'views/**/*',
                    'public/app/tpls/**/*'
                ]
            },
            web: {
                files: [
                    'config/*'
                ],
                tasks: [
                    'express:web'
                ],
                options: {
                    nospawn: true,
                    atBegin: true
                }
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! twitch-mean <%=grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'public/assets/css/bootstrap.min.css': [
                        'public/assets/css/bootstrap*.css',
                        'public/assets/css/custom.css'
                    ]
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/app/js/angular.min.js': [
                        'public/app/js/angular/angular.min.js',
                        'public/app/js/angular/angular-cookies.min.js',
                        'public/app/js/angular/angular-resource.min.js',
                        'public/app/js/angular-ui/angular-ui-router.min.js',
                        'public/app/js/angular-ui/ui-bootstrap-tpls-0.11.2.min.js',
                        'public/app/js/angular/angular-cookies.min.js',
                        'public/app/js/oc-lazyload/ocLazyLoad.min.js',
                        'public/app/js/app.js',
                        'public/app/js/controllers.js',
                        'public/app/js/directives.js',
                        'public/app/js/factory.js',
                        'public/app/js/services.js'
                    ]
                },
                options: {
                    mangle: false
                }
            }
        },
        parallel: {
            web: {
                options: {
                    stream: true
                },
                tasks: [{
                    grunt: true,
                    args: ['watch:cssfe']
                }, {
                    grunt: true,
                    args: ['watch:jsfe']
                }, {
                    grunt: true,
                    args: ['watch:imgfe']
                }, {
                    grunt: true,
                    args: ['watch:livereload']
                }, {
                    grunt: true,
                    args: ['watch:web']
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('web', 'launch webserver and watch tasks', [
        'cssmin',
        'uglify',
        'parallel:web',
    ]);

    grunt.registerTask('minify', 'css and js minify', [
        'cssmin',
        'uglify'
    ]);

    grunt.registerTask('default', ['web']);
};