/*jshint undef:false*/
module.exports = function(grunt) {
	// Load task deps
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc-to-markdown');

	// Configure
	var
		pkg = grunt.file.readJSON('package.json'),
		files = [
			'src/header.frag.js',
			'src/main.js',
			'src/footer.frag.js'
		],
		dir = {
			src: 'src',
			dist: 'dist',
			test: 'test'
		},
		config = {
			pkg:pkg, files:files, dir:dir,
			uglify : {
				unminified : {
					options: {
						banner:grunt.file.read('src/header.frag'),
						footer:grunt.file.read('src/footer.frag'),
						preserveComments:true,
						mangle:false,
						compress:false,
						beautify:true
					},
					files: {
						'<%= dir.dist %>/distract.js': files
					}
				},
				minified : {
					options: {
						banner:grunt.file.read('src/header.frag'),
						footer:grunt.file.read('src/footer.frag'),
						report:'gzip',
						preserveComments:false,
						mangle:true,
						compress:true,
						beautify:false
					},
					files: {
						'<%= dir.dist %>/distract.min.js': files
					}
				}
			},
			jsdoc2md: {
				oneOutputFile: {
					options: {
						index: true
					},
					src: "src/main.js",
					dest: "dist/docs.md"
				}
			},
			clean: {
				all: [dir.dist]
			},
			watch: {
				js: {
					files : files.concat('<%= dir.test %>/**/*'),
					tasks : 'release'
				}
			}
		};

	// Initialize
	grunt.initConfig(config);

	// Export tasks
	grunt.registerTask('release', ['clean', 'uglify', 'jsdoc2md']);
	grunt.registerTask('default', ['release']);
};
