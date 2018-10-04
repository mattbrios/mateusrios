module.exports = function (grunt) {

    // VARIABLES
    var defaults = {
        base: 'mateusrios-new',
        src: 'src',
        preview: 'preview',
        dist: 'dist',
        includeOptions: {
            globals: {
                baseCss: './css',
                baseImg: './img',
                baseJs: './js',
            }
        },
    };

    // CONFIG
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        defaults: defaults,

        watch: {
            scripts: {
                files: ['<%= defaults.src %>/scripts/**/*'],
                tasks: [
                    'uglify:preview',
                    'concat:preview'
                ]
            },
            styles: {
                files: ['<%= defaults.src %>/styles/**/*'],
                tasks: [
                    'compass:preview',
                    'includereplace:preview',
                    'postcss:preview',
                    'inline:preview',
                ]
            },
            html: {
                files: ['<%= defaults.src %>/includes/**/*'],
                tasks: [
                    'compass:preview',
                    'includereplace:preview',
                    'inline:preview',
                ]
            },
            files: {
                files: [
                    '<%= defaults.src %>/images/**/*',
                    '<%= defaults.src %>/fonts/**/*',
                ],
                tasks: ['copy:preview']
            },
        },

        clean: {
            preview: ['<%= defaults.preview %>'],
            dist: ['<%= defaults.dist %>'],
            afterpreview: [
                '<%= defaults.preview %>/content',
                '<%= defaults.preview %>/css/inline',
                '<%= defaults.preview %>/css/bootstrap',
                '<%= defaults.preview %>/css/helpers',
                '<%= defaults.preview %>/css/layout',
                '<%= defaults.preview %>/js/third-party'
            ],
            afterdist: [
                '<%= defaults.dist %>/assets',
                '<%= defaults.dist %>/content',
                '<%= defaults.dist %>/css/inline',
                '<%= defaults.dist %>/css/bootstrap',
                '<%= defaults.dist %>/css/helpers',
                '<%= defaults.dist %>/css/layout',
                '<%= defaults.dist %>/js/third-party'
            ]
        },

        stripCssComments: {
            options: {
                preserve: false // <-- Option removes important comments.
            },
            preview: {
                files:{
                    '<%= defaults.preview %>/css/main.css': '<%= defaults.preview %>/css/main.css'
                }
            },
            dist: {
                files:{
                    '<%= defaults.preview %>/css/main.css': '<%= defaults.preview %>/css/main.css'
                }
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            preview: {
                files: [{
                    expand: true,
                    cwd: '<%= defaults.preview %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= defaults.preview %>/css',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= defaults.preview %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= defaults.preview %>/css',
                    ext: '.css'
                }]
            }
        },

        uglify: {
            preview: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= defaults.src %>/scripts',
                    src: '**/*.js',
                    dest: '<%= defaults.preview %>/js'
                }]
            },
            dist: {
                options: {
                    mangle: true,
                    compress: {
                        drop_console: false
                    },
                    beautify: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= defaults.src %>/scripts',
                    src: '**/*.js',
                    dest: '<%= defaults.dist %>/js'
                }]
            }
        },

        concat: {
            preview: {
                src: '<%= defaults.preview %>/js/third-party/*js',
                dest: '<%= defaults.preview %>/js/third-party.js',
            },
            dist: {
                src: '<%= defaults.dist %>/js/third-party/*js',
                dest: '<%= defaults.dist %>/js/third-party.js',
            },
        },

        compass: {
            preview: {
                options: {
                    sassDir: ['<%= defaults.src %>/styles/'],
                    cssDir: '<%= defaults.preview %>/css/'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sassDir: '<%= defaults.src %>/styles/',
                    cssDir: '<%= defaults.dist %>/css/'
                }
            },
            inlinepreview: {
                options: {
                    outputStyle: 'expanded',
                    sassDir: '<%= defaults.src %>/styles/inline',
                    cssDir: '<%= defaults.preview %>/css/'
                }
            },
            inlinedist: {
                options: {
                    outputStyle: 'compressed',
                    sassDir: '<%= defaults.src %>/styles/inline',
                    cssDir: '<%= defaults.dist %>/css/'
                }
            }
        },

        includereplace: {
            preview: {
                options: defaults.includeOptions,
                files: [{
                    cwd: '<%= defaults.src %>/includes/',
                    src: ['**/*.html'],
                    dest: '<%= defaults.preview %>/',
                    expand: true,
                }]
            },
            dist: {
                options: defaults.includeOptions,
                files: [{
                    cwd: '<%= defaults.src %>/includes/',
                    src: ['**/*.html'],
                    dest: '<%= defaults.dist %>/',
                    expand: true,
                }]
            }
        },

        copy: {
            preview: {
                files: [{
                    expand: true,
                    cwd: '<%= defaults.src %>',
                    src: [
                        'fonts/**',
                        'images/**',
                        'video/**',
                        'data/**',
                        'php/**'
                    ],
                    dest: '<%= defaults.preview %>/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= defaults.src %>',
                    src: [
                        'fonts/**',
                        'images/**',
                        'video/**',
                        'data/**',
                        'php/**',
                        'favicon.ico'
                    ],
                    dest: '<%= defaults.dist %>/'
                }]
            },
        },

        inline: {
            preview: {
                src: ['<%= defaults.preview %>/**/*.html']
            },
            dist: {
                src: ['<%= defaults.dist %>/**/*.html']
            },
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },

        postcss: {
            preview: {
                options: {
                    processors: [
                        require('autoprefixer')({ browsers: ['last 2 versions'] }),
                    ]
                },
                files: {
                    '<%= defaults.preview %>/css/main.css': '<%= defaults.preview %>/css/main.css',
                    '<%= defaults.preview %>/css/inline/inline_style.css': '<%= defaults.preview %>/css/inline/inline_style.css',
                }
            },
            dist: {
                options: {
                    processors: [
                        require('autoprefixer')({ browsers: ['last 2 versions'] }),
                        require('cssnano')()
                    ]
                },
                files: {
                    '<%= defaults.dist %>/css/main.css': '<%= defaults.dist %>/css/main.css',
                    '<%= defaults.dist %>/css/inline/inline_style.css': '<%= defaults.dist %>/css/inline/inline_style.css',
                }
            },
        }

    });

    // LOAD TASKS
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-strip-css-comments');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // DEV
    grunt.registerTask('dev', [
        'clean:preview',
        'uglify:preview',
        'concat:preview',
        'compass:preview',
        'includereplace:preview',
        'copy:preview',
        'postcss:preview',
        'inline:preview',
        'stripCssComments:preview',
        'cssmin:preview',
        'clean:afterpreview',
        'watch'
    ]);
    grunt.registerTask('dist', [
        'clean:dist',
        'uglify:dist',
        'concat:dist',
        'compass:dist',
        'includereplace:dist',
        'copy:dist',
        'postcss:dist',
        'inline:dist',
        'stripCssComments:dist',
        'cssmin:dist',
        'htmlmin:dist',
        'clean:afterdist'
    ]);
};