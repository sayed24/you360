define({ "api": [
  {
    "type": "delete",
    "url": "/users/:userId",
    "title": "Delete User.",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The Users-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>userId</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/user.js",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>flag of success data insertion.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/:userId",
    "title": "Read data of a User",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The Users-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RetrivingUserError",
            "description": "<p>Error while retriving data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>userId</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>The User information.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:userId/videos",
    "title": "Request User videos information",
    "name": "GetUserVideos",
    "group": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RetrivingVideosError",
            "description": "<p>Error while retriving data.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "videos",
            "description": "<p>Array of user Videos</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Request Users information",
    "name": "GetUsers",
    "group": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RetrivingUserError",
            "description": "<p>Error while retriving data.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>Array of user information.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create a new User",
    "name": "PostUser",
    "group": "User",
    "version": "0.0.0",
    "filename": "app/controllers/user.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PaswordError",
            "description": "<p>Minimum of 8 characters and Maximum 20 characters required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidEmail",
            "description": "<p>Invalid Email.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "firstnameRequired",
            "description": "<p>First Name is Required.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "lastnameRequired",
            "description": "<p>First Name is Required.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>flag of success data insertion.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/users/:userId",
    "title": "Change User date.",
    "name": "PutUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The Users-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ModifingUserError",
            "description": "<p>Error while retriving data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>userId</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/user.js",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>flag of success data insertion.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success message.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/videos",
    "title": "Request videos information",
    "name": "GetVideos",
    "group": "Video",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "RetrivingUserError",
            "description": "<p>Error while retriving data.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "docs",
            "description": "<p>List of videos.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.name",
            "description": "<p>Video name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.description",
            "description": "<p>Video Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.category",
            "description": "<p>Video category id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.filename",
            "description": "<p>Video filename.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "docs.views",
            "description": "<p>Number of view video.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.owner",
            "description": "<p>Video owner id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "docs.tags",
            "description": "<p>Tags name array.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "docs.comments",
            "description": "<p>Video comments</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.comments.comment",
            "description": "<p>Comment body.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.comments.owner",
            "description": "<p>Comment owner.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "docs.dislikes",
            "description": "<p>Array of dislike <code>usersId</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "docs.likes",
            "description": "<p>Array of likes <code>usersId</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.path",
            "description": "<p>Video path</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.stream",
            "description": "<p>Video stream</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.thumb",
            "description": "<p>Video thumb</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "docs.liked",
            "description": "<p>flag for loggin user liked video</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "docs.disliked",
            "description": "<p>flag for loggin user disliked video</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/video.js",
    "groupTitle": "Video"
  },
  {
    "type": "post",
    "url": "/videos",
    "title": "Create a new Video",
    "name": "PostVideo",
    "group": "Video",
    "version": "0.0.0",
    "filename": "app/controllers/video.js",
    "groupTitle": "Video",
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "nameRequired",
            "description": "<p>Name is Required.</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "descriptionRequired",
            "description": "<p>Descriptionis Required.</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "categoryRequired",
            "description": "<p>Category is Required.</p>"
          }
        ],
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "return",
            "description": "<p>Object is without name.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "return.success",
            "description": "<p>success flag of success data insertion.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.message",
            "description": "<p>success message.</p>"
          }
        ]
      }
    }
  }
] });
