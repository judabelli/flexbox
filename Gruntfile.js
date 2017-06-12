module.exports = function (grunt) {

  // Load all node modules related to Grunt
  require('load-grunt-tasks')(grunt);

  var options = {
    html: {
      files: {
        expand: true,
        cwd: 'html/',
        src: ['**/*.html'],
        dest: '_site/'
      }
    },
    styles:
      {
        scss: {
          srcMain: 'scss/main.scss',
          srcFiles: ['scss/**/*.scss', 'scss/**/*.scss'],
          dest: '_site/css/main.css',
          prod: '_site/css/main.min.css'
        }
      },
    site: {
      base: '_site',
      port: 9999,
      livereload: false
    }
  };

  // Project configuration.
  grunt.initConfig({
    assemble: {
      pages: {
        files: [options.html.files]
      }
    },
    sass: {
      options: {
        includePaths: ['node_modules']
      },
      scss: {
        src: options.styles.scss.srcMain,
        dest: options.styles.scss.dest
      }
    },
    group_css_media_queries: {
      scss: {
        src: options.styles.scss.dest,
        dest: options.styles.scss.prod
      }
    },
    cssnano: {
      scss: {
        src: options.styles.scss.prod,
        dest: options.styles.scss.prod
      }
    },
    watch: {
      hbs: {
        files: ['html/**/*.html'],
        tasks: ['assemble']
      },
      styles: {
        files: options.styles.scss.srcFiles,
        tasks: ['styles']
      },
      liveReload: {
        options: {livereload: false},
        files: ['_site/**/*']
      }
    },
    connect: {
      site: {
        options: options.site
      }
    }
  });

  // Styles new task
  grunt.registerTask('styles', function () {
    grunt.task.run('sass', 'group_css_media_queries', 'cssnano');
  });

  // Serve task
  grunt.registerTask('serve', ['connect', 'watch']);

  // Default task
  grunt.registerTask('default', function () {
    grunt.task.run('assemble', 'styles');
  });

};

