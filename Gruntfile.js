module.exports = function(grunt) {

  // Loads the necessary tasks for this Grunt file.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var _ref, _ref1, _ref2;

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ",
    baseDir: grunt.option('dir') || "dev",
    express: {
      options: {
        cmd: process.argv[0],
        port: 3000
      },
      dev: {
        options: {
          script: "server/server.js"
        }
      }
    },
    dev: {
      files: {
        base: "http://localhost:3000/",
        dir: (_ref1 = grunt.option('dir')) != null ? _ref1 : "",
        css: "css/main.css"
      }
    },
    files: {
      html: {},
      sass: {
        src: ["client/css/main.css"]
      },
      js: {}
    },
    copy: {
      main: {
        files: []
      }
    },
    concat: {
      css: {
        src: ["client/css/main.css"],
        dest: "generated/css/main.min.css"
      }
    },
    cssmin: {
      add_banner: {
        options: "<%= banner %>",
        files: {
          'generated/v6/css/main.min.css': ["client/css/main.css"]
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          noCache: true
        },
        files: [
          {
            expand: true,
            cwd: 'client/css',
            src: ['main.scss'],
            dest: 'client/css',
            ext: '.css'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      express: {
        files: ['server/server.js'],
        options: {
          spawn: true
        }
      },
      sass: {
        files: ["*/css/main.scss"],
        tasks: ["sass"],
        options: {
          spawn: true
        }
      }
    },
    server: {
      base: "" + (process.env.SERVER_BASE || 'public'),
      web: {
        port: 3000
      }
    }

  });
  grunt.option
  //grunt.loadTasks("tasks");

  grunt.registerTask('default', ['express:dev', 'sass', 'watch:sass']);
  //grunt.registerTask('subscriptions', ['express:dev', 'sass:subscriptions', 'watch:sass']);
  // grunt.registerTask("deploy", ["clean", "updateConfig", "sass", "requirejs", "copy:main", "sftp-deploy:config", "http", "sftp-deploy:build", "express:dev", "open", "watch"]);
  
};