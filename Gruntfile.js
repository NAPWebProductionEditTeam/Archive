module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    html2js: {
        options: {
          globalname: 'Archive.templates'
        },
        main: {
            src: ['src/templates/**/*.hbs'],
            dest: 'tmp/templates.js'
        },
    },
    // replaces full file path key for templates with just the file's basename without ext.
    'string-replace': {
      dist: {
        files: {
            '<%= html2js.main.dest %>': '<%= html2js.main.dest %>'
        },
        options: {
            replacements: [
                {
                    pattern: /\["(.*)\/([^\/]+?)\.hbs"\]/,
                    replacement: '["$2"]'
                }
            ]
        }
      }
    },
    concat: {
      dist: {
        src: ['node_modules/handlebars/dist/handlebars.js', 'src/app/app.js', 'tmp/**/*.js', 'src/**/*.js'],
        dest: 'dist/archive.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/archive.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true
        }
      }
    },
    clean: ["tmp"],
    watch: {
      files: ['<%= jshint.files %>', 'src/templates/**/*.hbs'],
      tasks: ['jshint', 'html2js', 'string-replace', 'concat', 'uglify', 'clean']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-common-html2js');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint', 'html2js', 'concat', 'uglify', 'clean']);

};
