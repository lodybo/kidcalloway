module.exports = function(grunt) {

  grunt.initConfig({
    // HTML
    codekit: {
	    dist: {
		    src: ["src/kit/**/*.kit"],
		    dest: ["build/"]
	    }
    },
    
    // Sass
    sass: {
	    options: {
		    sourceMap: true,
		    includePaths: require("node-neat").includePaths
	    },
	    dist: {
		    src: ["src/scss/kid.scss"],
		    dest: ["build/css/styles.css"]
	    }
    },
    autoprefixer: {
	    options: {
		    browsers: ['last 3 versions', 'ie9', 'ie10'],
		    map: true
	    },
	    dist: {
		    src: ["<%= sass.dist.src %>"],
		    dest: ["<%= sass.dist.src %>"]
	    }
    },
    sassdoc: {
	    options: {
		    dest: ["docs/sassdoc/"]
	    },	    
	    src: ["src/scss/**/*.scss"]
    },
    
    // JS
    
    // GENERIC
    clean: {
	    build: ["build"],
	    sassdoc: ["docs/sassdoc"],
	    jsdoc: ["docs/jsdoc"],
	    test: ["test"]
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
	      files: ["src/scss/**/*.kit"],
	      tasks: ["scss", "docs:sass"],
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask("kit", ["codekit"]);
  
  grunt.registerTask("scss", ["sass", "autoprefixer"]);
  
  grunt.registerTask("js", []);
  
  grunt.registerTask("docs", function (mode) {
	  var taskList = ["sassdoc", "jsdoc"];
	  var cleanList = ["clean:sassdoc", "clean:jsdoc"];
	  
	  if (mode && mode === "sass")
	  {
		  taskList.pop();
		  cleanList.pop();
	  }
	  else if (mode && mode === "js")
	  {
		  taskList.shift();
		  cleanList.shift();
	  }
	  
	  grunt.tasks.run(cleanList);
	  grunt.tasks.run(taskList);
  });
  
  grunt.registerTask("serve", ["connect:build", "watch"]);
  
  grunt.registerTask("default", ["serve"]);

}; 