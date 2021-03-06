module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      src: 'src',
      dist: 'dist',
      temp: 'temp'
    },


    watch: {
      build: {
        files: ['<%= config.src %>/**/*.{html,css,js}'],
        tasks: ['build']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          // Not looking for jQuery changes for optim
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/css/{,*/}*.css'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    replace: {
      js_playground: {
        files: [
          {
            expand: true, 
            cwd: "src/",
            src: [
                '**/*',
                '!**/*.swp'
            ],
            dest: '<%= config.temp %>'
          }
        ]
        ,
      }
    },

    copy: {
      options : {
        noProcess: [
        ]
      },
      js_playground: {
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/',
            src: [
              '**/*.{png,gif,jpg,ico,psd}'
            ],
            dest: '<%= config.temp %>'
          },
          {
            expand: true,
            cwd: '<%= config.temp %>/',
            src: [
              '**/*',
              '!**/*.swp'
            ],
            dest: '<%= config.dist %>',
            filter: "isFile"
          },
          {
            expand: true,
            cwd: 'bower_components/',
            src: [
              '**/*',
            ],
            dest: '<%= config.dist %>'
          }
        ]
      }
    },

    'gh-pages': {
        js_playground: {
          options: {
            base: '<%= config.dist %>',
            branch: 'gh-pages',
            message: 'Grunt deploy <%= grunt.template.today() %>'
          },
          src: ['**']
        }
    },

    prettify: {
      options: {
        condense: true,
        indent: 2,
        indent_char: ' ',
        wrap_line_length: 78,
        brace_style: 'expand',
        unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
      },
      // Prettify a directory of files 
      js_playground: {
        expand: true,
        cwd: '<%= config.temp %>/',
        src: [ '**/*.html' ],
        dest: '<%= config.temp %>',
      }
    },

    uglify: {
      js_playground: {
        files: [{
          expand: true,
          cwd: '<%= config.temp %>/',
          src: [ '**/*.js' ],
          dest: '<%= config.temp %>',
        }]
      }
    },

    clean: [
      '<%= config.dist %>/**/*.*',
      '<%= config.temp %>/**/*.*',
    ]

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', [
      'clean',
      'replace', 
      'prettify',
      //'uglify',
      'copy'
  ]);

  grunt.registerTask('deploy', [
      'default', 
      'gh-pages' 
  ]);

  grunt.registerTask('server', [
    'build',
    'connect:livereload',
    'watch'
  ]);
  
  grunt.registerTask('test', [
    'build'
  ]);
  
  grunt.registerTask('default', [
    'build'
  ]);
};
