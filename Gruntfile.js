(function () {
    module.exports = function (grunt) {
        require('load-grunt-tasks')(grunt);
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),            
            version: {
                default: {
                    src: ['package.json']
                }
            },            
            cssmin: {
                default: {
                    files: {
                        'cmdr-themes.min.css': ['cmdr-themes.css']
                    }
                }
            },
            usebanner: {
                default: {
                    options: {
                        position: 'top',
                        banner: '/* <%= pkg.name %> | version <%= pkg.version %> | license <%= pkg.license %> | (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> | <%= pkg.homepage %> */'
                    },
                    files: {
                        src: 'dist/*.*'
                    }
                }
            },
            readpkg: {
                default: {}
            }
        });
        //Utils
        grunt.registerTask('readpkg', function () {
            grunt.config.set('pkg', grunt.file.readJSON('package.json'));
        });

        //build
        grunt.registerTask('build', ['cssmin', 'usebanner']);    
        
        //For releasing
        grunt.registerTask('release', ['release:patch']);
        grunt.registerTask('release:major', ['version::major', 'readpkg', 'build']);
        grunt.registerTask('release:minor', ['version::minor', 'readpkg', 'build']);
        grunt.registerTask('release:patch', ['version::patch', 'readpkg', 'build']);
    };
})();
