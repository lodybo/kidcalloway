module.exports = function(grunt) {

  grunt.initConfig({
    // HTML
    codekit: {
	    dist: {
		    src: "src/kit/**/*.kit",
		    dest: "build/"
	    }
    },

    // Sass
    sass: {
	    options: {
		    sourceMap: true,
		    includePaths: require("node-neat").includePaths
	    },
	    dist: {
		    src: ["src/scss/kidcalloway.scss"],
		    dest: "build/css/kidcalloway.css"
	    }
    },
    postcss: {
	    options: {
        processors: [
          require('autoprefixer-core')({
            browsers: ['last 3 versions', 'ie 9', 'ie 10']
          })
        ],
		    map: true
	    },
	    dist: {
		    src: ["<%= sass.dist.dest %>"],
		    dest: "<%= sass.dist.dest %>"
	    }
    },
    sassdoc: {
	    docs: {
		    src: ["src/scss/**/*.scss"],
		    options: {
				dest: "docs/sassdoc/"
			}
    	}
    },

    // JS
    jshint: {
	    all: ["Gruntfile.js", "src/js/**/*.js"]
    },
    jasmine: {
	    js: {
		    src: ["src/js/scripts/app.js", "src/js/scripts/*.controller.js"],
		    options: {
			    specs: "src/js/specs/*.spec.js",
			    outfile: "test/jasmine/index.html",
			    vendor: [
				    "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js",
				    "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-resource.min.js",
				    "http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-mocks.js",
                    "http://cdnjs.cloudflare.com/ajax/libs/angular-messages/1.5.3/angular-messages.min.js"
			    ]
		    }
		}
    },
    uglify: {
	    production: {
		    options: {
			    sourceMap: true
		    },
		    files: {
			    "build/js/scripts.min.js" : ["src/js/scripts/**/*.js", "!src/js/scripts/agenda*.js"]
		    }
	    },
        debug: {
            options: {
                beautify: true,
                mangle: false,
                compress: false
            },
            files: {
			    "build/js/scripts.min.js" : ["src/js/scripts/**/*.js", "!src/js/scripts/agenda*.js"]
		    }
        }
    },

    // GENERIC
    clean: {
	    build: "build",
	    sassdoc: "docs/sassdoc",
	    jsdoc: "docs/jsdoc"
    },
    copy: {
	    img: {
		    files: [{
			    expand: true,
			    flatten: true,
			    src: ["src/assets/flexslider/*.png", "src/img/*.jpg", "src/img/*.png"],
			    dest: "build/img"
			}, {
				expand: true,
				flatten: false,
		        filter: "isFile",
		        ext: ".jpg",
				cwd: "src/img/studio-hoogeloon/",
				src: "*",
				dest: "build/img/gallery/"
			}, {
				expand: true,
				flatten: false,
				ext: ".jpg",
				cwd: "src/img/studio-hoogeloon/thumbs",
				src: "*",
				dest: "build/img/gallery/thumbs"
			}, {
			    expand: true,
			    cwd: "src/img/brands/",
			    src: "*.jpg",
			    dest: "build/img/brands"
			}]
	    },
	    assets: {
		    files: [{
			    expand: true,
			    flatten: true,
			    src: ["src/assets/**/*.js"],
			    dest: "build/js"
		    }, {
			    expand: true,
			    flatten: true,
			    src: ["src/assets/**/*.css"],
			    dest: "build/css"
		    }, {
			    expand: true,
			    flatten: true,
			    src: ["src/assets/**/*.eot", "src/assets/**/*.svg", "src/assets/**/*.ttf", "src/assets/**/*.woff"],
			    dest: "build/css/fonts"
		    }, {
                expand: true,
                flatten: true,
                src: ["src/assets/**/*.php"],
                dest: "build/php-scripts"
            }]
	    },
      press: {
        src: "src/assets/Perskit-Kid-Calloway.zip",
        dest: "build/Perskit-Kid-Calloway.zip"
      }
    },
    connect: {
	    build: {
		    options: {
			    livereload: true,
			    base: "build/",
			    port: 3412
		    }
	    },
	    docs: {
		    options: {
			    base: "docs/",
			    port: 3142
		    }
	    }
    },
    watch: {
      kit: {
	      files: ["src/kit/**/*.kit"],
	      tasks: ["kit"]
      },
      scss: {
	      files: ["src/scss/**/*.scss"],
	      tasks: ["scss", "docs:sass"],
      },
      js: {
          files: ["!src/js/scripts/*.controller.js", "!src/js/specs/*.spec.js", "src/js/**/*.js"],
	      tasks: ["js"]
      },
      controller: {
	      files: ["src/js/scripts/*.controller.js"],
	      tasks: ["jasmine", "js"]
      },
      spec: {
          files: ["src/js/specs/*.spec.js"],
          tasks: ["jasmine"]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask("kit", ["codekit"]);

  grunt.registerTask("scss", ["sass", "postcss"]);

  grunt.registerTask("js", ["test", "uglify:production"]);

  grunt.registerTask("docs", function (mode) {
	  var docList = ["sassdoc", "jsdoc"];
	  var cleanList = ["clean:sassdoc", "clean:jsdoc"];
	  var TaskList = [];

	  if (mode && mode === "sass")
	  {
		  docList.pop();
		  cleanList.pop();
	  }
	  else if (mode && mode === "js")
	  {
		  docList.shift();
		  cleanList.shift();
	  }

  	  taskList = cleanList.concat(docList);

	  grunt.task.run(taskList);
  });

  grunt.registerTask("serve", ["connect", "watch"]);

  grunt.registerTask("test", ["jshint"]);
  grunt.registerTask("build", ["clean:build", "kit", "scss", "js", "copy"]);

  grunt.registerTask("default", ["serve"]);

};
