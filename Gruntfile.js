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
    autoprefixer: {
	    options: {
		    browsers: ['last 3 versions', 'ie9', 'ie10'],
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
    
    // GENERIC
    clean: {
	    build: "build",
	    sassdoc: "docs/sassdoc",
	    jsdoc: "docs/jsdoc"
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
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask("kit", ["codekit"]);
  
  grunt.registerTask("scss", ["sass", "autoprefixer"]);
  
  grunt.registerTask("js", []);
  
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
  
  grunt.registerTask("default", ["serve"]);

}; 