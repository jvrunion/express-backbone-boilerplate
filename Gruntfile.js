'use strict';

module.exports = function(grunt){

  grunt.initConfig({

    meta: {
      client: {
        src: ['client/src/js/**/*.js', '!client/src/js/lib/**/*.js'],
        test: ['client/test/spec/**/*_spec.js', '!client/test/lib']
      },
      server: {
        src: 'server/src/**/*.js',
        test: 'server/test/**/*.js'
      },
      tasks: {
        src: 'tasks/**/*.js'
      },
      readme: {
        src: 'README.md'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      client: {
        src: [
          '<%= meta.client.src %>',
          '<%= meta.client.test %>'
        ]
      },
      server: {
        src: [
          '<%= meta.server.src %>',
          '<%= meta.server.test %>',
        ]
      },
      tasks: {
        src: '<%= meta.tasks.src %>'
      }
    },

    clean: {
      docs: {
        src: '_docs'
      },
      dist: {
        src: '_dist'
      },
      junitxml: {
        src: '_junitxml'
      },
      junitxml_client: {
        src: '_junitxml/cient'
      },
      junitxml_server: {
        src: '_junitxml/server'
      },
      coverage: {
        src: '_coverage'
      },
      coverage_client: {
        src: '_coverage/client'
      },
      coverage_server: {
        src: '_coverage/server'
      }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'client/src/sass',
          cssDir: 'client/src/css',
          outputStyle: 'expanded',
          noLineComments: false
        }
      },
      prod: {
        options: {
          sassDir: 'client/src/sass',
          cssDir: '_dist/client/src/css',
          outputStyle: 'compressed',
          noLineComments: true,
          force: true
        }
      }
    },

    watch: {
      readme: {
        files: 'README.md',
        tasks: 'docs'
      },
      sass: {
        files: 'client/src/sass/**/*.scss',
        tasks: 'compass:dev'
      },
      jsClient: {
        files: ['<%= meta.client.src %>', '<%= meta.client.test'],
        tasks: ['jshint:client', 'generate_specrunner', 'client:test', 'docs']
      },
      jsServer: {
        files: ['<%= meta.server.src %>', '<%= meta.server.test %>'],
        tasks: ['jshint:server', 'server:test', 'docs']
      },
      jsTasks: {
        files: '<%= meta.tasks.src %>',
        tasks: ['jshint:tasks', 'docs']
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'client/src/js',
          include: 'requireLib',
          mainConfigFile: 'client/src/js/config.js',
          name: 'main',
          out: '_dist/client/src/js/main.js',
          paths: {
            requireLib: '../../../bower_components/requirejs/require',
            infector: '../../../bower_components/infector/lib/infector',
            modernizr: '../../../bower_components/modernizr/modernizr',
            jquery: '../../../bower_components/jquery/jquery',
            underscore: '../../../bower_components/underscore/underscore',
            backbone: '../../../bower_components/backbone/backbone',
            handlebars: '../../../bower_components/handlebars/handlebars',
            text: '../../../bower_components/requirejs-text/text'
          }
        }
      }
    },

    copy: {
      dist: {
        files: [
          { expand: true, flatten: true, src: 'client/src/font/*', dest: '_dist/client/src/font/' },
          { src: ['server/**/*.js', '!server/test/**/*.js'], dest: '_dist/' }
        ]
      }
    },

    htmlrefs: {
      dist: {
        src: 'client/src/index.html',
        dest: '_dist/client/src/'
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      compile: {
        files: {
          '_dist/client/src/index.html': '_dist/client/src/index.html'
        }
      }
    },

    docker: {
      app: {
        src: [
          '<%= meta.client.src %>',
          '<%= meta.client.test %>',
          '<%= meta.server.src %>',
          '<%= meta.server.test %>',
          '<%= meta.tasks.src %>',
          'README.md'
        ],
        dest: '_docs',
        options: {
          onlyUpdated: true,
          colourScheme: 'default'
        }
      }
    },

    nodemon: {
      server: {
        options: {
          file: 'server/src/app.js',
          args: ['--ENV=development'],
          watchedExtensions: ['js'],
          watchedFolders: ['server/src'],
          debug: true,
          delayTime: 1
        }
      },
      nodeInspector: {
        options: {
          file: 'node-inspector.js',
          watchedExtensions: ['js'],
          watchedFolders: ['server/src'],
          exec: 'node-inspector',
        }
      }
    },

    concurrent: {
      nodemon: {
        options: {
          logConcurrentOutput: true,
        },
        tasks: [
          'nodemon:server',
          'nodemon:nodeInspector',
          'watch'
        ]
      }
    },

    istanbul: {
      options: {
        mochaFiles: 'server/test/spec/**/*_spec.js',
        mochaReporter: 'dot',
        mochaUi: 'bdd',
        root: 'server/src',
        runner: 'server/test/helpers/runner.js'
      },
      test: {
        options: {
          command: 'test'
        }
      },
      dev_cover: {
        options: {
          coverageOutputDir: '_coverage/server',
          command: 'cover',
          reportType: 'html'
        }
      },
      build_cover: {
        options: {
          coverageOutputDir: '_coverage/server',
          command: 'cover',
          reportType: 'cobertura'
        }
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js',
        runnerPort: 9100,
        background: false,
        singleRun: true
      },
      headless: {
        browsers: ['PhantomJS'],
        reporters: ['dots']
      },
      test: {
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        reporters: ['dots']
      },
      cover: {
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        reporters: ['dots', 'coverage'],
        coverageReporter: {
          type: 'html',
          dir: '_coverage/client',
        },
        preprocessors: {
          'client/src/js/collections/**/*.js': 'coverage',
          'client/src/js/core/**/*.js': 'coverage',
          'client/src/js/models/**/*.js': 'coverage',
          'client/src/js/views/**/*.js': 'coverage'
        }
      }
    },

    generate_specrunner: {
      src: '<%= meta.client.test %>',
      dest: 'client/test/SpecRunner.html',
      template: 'tasks/assets/SpecRunner.tmpl'
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-docker');
  grunt.loadNpmTasks('grunt-htmlrefs');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('dist', [
    'jshint',
    'test',
    'clean:dist',
    'requirejs',
    'compass:prod',
    'copy:dist',
    'htmlrefs:dist',
    'htmlmin'
  ]);
  grunt.registerTask('docs', ['docker']);
  grunt.registerTask('server:cover', ['clean:coverage_server', 'istanbul:dev_cover']);
  grunt.registerTask('server:test', ['istanbul:test']);
  grunt.registerTask('client:cover', ['clean:coverage_client', 'karma:cover']);
  grunt.registerTask('client:test', ['karma:test']);
  grunt.registerTask('test', ['client:test', 'server:test']);
  grunt.registerTask('test:headless', ['karma:headless', 'server:test']);
  grunt.registerTask('start', [
    'clean:dist',
    'clean:junitxml',
    'clean:coverage',
    'generate_specrunner',
    'clean:docs',
    'docs',
    'compass:dev',
    'concurrent:nodemon'
  ]);
};