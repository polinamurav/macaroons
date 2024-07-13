module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ['assets/css']
                },
                files: {
                    'dist/style.css': 'css/style.less'
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/style.min.css': ['dist/style.css']
                }
            }
        },
        clean: ['dist/style.css', 'dist/style.css.map'],
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['css/*.less'],
                tasks: ['default'],
            },
        },
    });


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'clean']);
};
