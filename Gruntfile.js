/*global module */


module.exports = function( grunt ) {
	"use strict";

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);



	grunt.initConfig({

		uglify: {
			options: {
				mangle: {
					except: ['mSwipeSlider']
				}
			},
			dist: {
				files: {
					'build/jquery.m-swipe.min.js': 'jquery.m-swipe.js'
				}
			}
		},

		watch: {
			loadFiles: {
				files: ['index.html','*.js','*.css']
			},
			options: {
				// Start a live reload server on the default port 35729
				livereload: 1337,
			}
		},

		// grunt-contrib-connect will serve the files of the project
		// on specified port and hostname and injects the live reload script
		connect: {
			all: {
				options:{
					port: 9000,
					hostname: "0.0.0.0",
					middleware: function(connect, options) {
						return [
							require('connect-livereload')({
								port: grunt.config.get("watch.options.livereload")
								// ignore: ['Gruntfile.js']
							})
							// Serve the project folder
							,connect.static(options.base)
						];
					}
				}			
			}
		},

		open: {
			all: {
				path: 'http://localhost:<%= connect.all.options.port%>'
			}
		}
	});

	// build
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');


	grunt.registerTask('build', 'uglify');

	// dev server / auto reload
	grunt.registerTask('dev', ['connect', 'open', 'watch']);
	grunt.registerTask('default', 'dev');
};