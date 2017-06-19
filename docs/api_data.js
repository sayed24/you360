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
            "field": "id",
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
            "field": "id",
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
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Users-ID.</p>"
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
            "field": "id",
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
            "field": "id",
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
  }
] });
