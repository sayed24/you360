define({ "api": [
  {
    "type": "post",
    "url": "/api/forgot-password",
    "title": "forget password",
    "name": "PostForgetPassword",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "EmailExistError",
            "description": "<p>email address is already in use error.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "return",
            "description": "<p>Object is without name.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "return.message",
            "description": "<p>success message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "Login api",
    "name": "PostLogin",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user data object.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>user email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>user email.</p>"
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
            "field": "PaswordError",
            "description": "<p>Minimum of 8 characters and Maximum 20 characters required.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "return",
            "description": "<p>Object is without name.</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return.status",
            "description": "<p>response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return.token",
            "description": "<p>user token.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "return.user",
            "description": "<p>user info onbject</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user._id",
            "description": "<p><code>userId</code>,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user.firstName",
            "description": "<p>User firstName,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user.lastName",
            "description": "<p>rUser lastName,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user.email",
            "description": "<p>User email,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user.role",
            "description": "<p>User role,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user.image",
            "description": "<p>Userimage</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Registration",
    "name": "PostRegistration",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user data object.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>User email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>User email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.firstName",
            "description": "<p>User firstName,</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.lastName",
            "description": "<p>User lastName,</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "PaswordError",
            "description": "<p>Minimum of 8 characters and Maximum 20 characters required.</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "EmailNotfoundError",
            "description": "<p>email address is required .</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "FirstnameNotfoundError",
            "description": "<p>firstname is required.</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "LastnameNotfoundError",
            "description": "<p>lasttname is required.</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "EmailExistError",
            "description": "<p>email address is already in use error.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "return",
            "description": "<p>Object is without name.</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return.status",
            "description": "<p>response status.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "return.token",
            "description": "<p>user token.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "return.user",
            "description": "<p>user info onbject</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user._id",
            "description": "<p><code>userId</code>,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user.firstName",
            "description": "<p>User firstName,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user.lastName",
            "description": "<p>rUser lastName,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user.email",
            "description": "<p>User email,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user.role",
            "description": "<p>User role,</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return.user.image",
            "description": "<p>Userimage</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/reset-password/:token",
    "title": "reset password",
    "name": "PostResetPassword",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>new password</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ExpiedTokenError",
            "description": "<p>token is expired</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "return",
            "description": "<p>Object is without name.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "return.message",
            "description": "<p>success message.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "delete",
    "url": "/api/categories/:categoryId",
    "title": "Delete Category.",
    "name": "DeleteCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>The Category-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "CategoryNotfound",
            "description": "<p>Error The <code>categoryId</code>  of the Category was not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ModifingCategoryError",
            "description": "<p>Error while retriving data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/category.js",
    "groupTitle": "Category",
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
  },
  {
    "type": "get",
    "url": "/api/categories/:categoryId",
    "title": "Request Category information",
    "name": "GetCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>The Category-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "CategoryNotfound",
            "description": "<p>Error The <code>categoryId</code>  of the Category was not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingCategoryError",
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
            "type": "Object",
            "optional": false,
            "field": "docs",
            "description": "<p>category information.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.name",
            "description": "<p>category name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.description",
            "description": "<p>category Description.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/api/:categoryId/videos",
    "title": "Request videos related to certain category information",
    "name": "GetCategoryVideos",
    "group": "Category",
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingVideoError",
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
    "filename": "app/controllers/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/api/categories",
    "title": "Request videos information",
    "name": "Getcategories",
    "group": "Category",
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingCategoryError",
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
            "description": "<p>List of all categories.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.name",
            "description": "<p>category name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "docs.description",
            "description": "<p>category Description.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/api/categories",
    "title": "Create a new Category",
    "name": "Postcategories",
    "group": "Category",
    "version": "0.0.0",
    "filename": "app/controllers/category.js",
    "groupTitle": "Category",
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "nameRequired",
            "description": "<p>Name is Required.</p>"
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
  },
  {
    "type": "put",
    "url": "/api/categories/:categoryId",
    "title": "Delete Category.",
    "name": "PutCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>The Category-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "CategoryNotfound",
            "description": "<p>Error The <code>categoryId</code>  of the Category was not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "ModifingCategoryError",
            "description": "<p>Error while retriving data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/category.js",
    "groupTitle": "Category",
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
  },
  {
    "type": "get",
    "url": "/api/reports/:reportId",
    "title": "Request Report information",
    "name": "GetReport",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reportId",
            "description": "<p>The Report-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ReportNotfound",
            "description": "<p>Error The <code>reportId</code> of the Report was not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingdataError",
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
            "type": "Object",
            "optional": false,
            "field": "report",
            "description": "<p>report object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "get",
    "url": "/api/reports",
    "title": "Retrive Reports data",
    "name": "Getreports",
    "group": "Report",
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingCategoryError",
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
            "type": "Object",
            "optional": false,
            "field": "reports",
            "description": "<p>list of reports.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "post",
    "url": "/api/reports/:reportId/approve",
    "title": "Request Report information",
    "name": "PostApprove",
    "group": "Report",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reportId",
            "description": "<p>The Report-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "ReportNotfound",
            "description": "<p>Error The <code>reportId</code> of the Report was not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingdataError",
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
    },
    "version": "0.0.0",
    "filename": "app/controllers/report.js",
    "groupTitle": "Report"
  },
  {
    "type": "post",
    "url": "/api/reports",
    "title": "Create a new Report",
    "name": "Postreport",
    "group": "Report",
    "version": "0.0.0",
    "filename": "app/controllers/report.js",
    "groupTitle": "Report",
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "videoRequired",
            "description": "<p>video is Required.</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "emailRequired",
            "description": "<p>email is Required.</p>"
          },
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
            "description": "<p>description is Required.</p>"
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
  },
  {
    "type": "post",
    "url": "/api/search",
    "title": "full text search in videos",
    "name": "PostSearch",
    "group": "Search",
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingdataError",
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
            "description": "<p>List of matched videos.</p>"
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
    "filename": "app/controllers/search.js",
    "groupTitle": "Search"
  },
  {
    "type": "get",
    "url": "/api/tags",
    "title": "Request all tags",
    "name": "GetTags",
    "group": "Tag",
    "error": {
      "fields": {
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingTagError",
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
            "type": "String[]",
            "optional": false,
            "field": "list",
            "description": "<p>of tags.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/tag.js",
    "groupTitle": "Tag"
  },
  {
    "type": "delete",
    "url": "/api/users/:userId",
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
    "url": "/api/users/:userId",
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
    "url": "/api/users/:userId/videos",
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
    "url": "/api/users",
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
    "url": "/api/users",
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
    "url": "/api/users/:userId",
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
    "type": "delete",
    "url": "/api/videos/:videoId",
    "title": "Delete video.",
    "name": "DeleteVideo",
    "group": "Video",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "videoId",
            "description": "<p>The Video-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "VideoNotFound",
            "description": "<p>The <code>VideoId</code> of the Video was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/video.js",
    "groupTitle": "Video",
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
  },
  {
    "type": "get",
    "url": "/api/videos/videoId",
    "title": "Request video information",
    "name": "GetVideo",
    "group": "Video",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "videoId",
            "description": "<p>The Video-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "RetrivingVideoError",
            "description": "<p>Error while retriving data.</p>"
          },
          {
            "group": "404",
            "optional": false,
            "field": "VideoNotfound",
            "description": "<p>Error Video Not found.</p>"
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
            "field": "docs",
            "description": "<p>Video information</p>"
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
    "type": "get",
    "url": "/api/videos",
    "title": "Request videos information",
    "name": "GetVideos",
    "group": "Video",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "RetrivingVideoError",
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
    "url": "/api/videos/:videoId/like",
    "title": "like video",
    "name": "PostLike",
    "group": "Video",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "VideoNotfound",
            "description": "<p>Error Video Not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingVideoError",
            "description": "<p>Error while retriving data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/video.js",
    "groupTitle": "Video",
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
  },
  {
    "type": "post",
    "url": "/api/videos/:videoId/stream",
    "title": "Striming Video",
    "name": "PostStreamVideo",
    "group": "Video",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFoundError",
            "description": "<p>file not found.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "return",
            "description": "<p>Object is without name.</p>"
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
    "url": "/api/videos/upload",
    "title": "upload a new Video",
    "name": "PostUploadVideo",
    "group": "Video",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "UploadError",
            "description": "<p>any error durnig upload video.</p>"
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
            "field": "return.filename",
            "description": "<p>uploaded video name.</p>"
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
    "url": "/api/videos",
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
  },
  {
    "type": "post",
    "url": "/api/videos/:videoId/video",
    "title": "add views video record.",
    "name": "PostViews",
    "group": "Video",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "VideoNotfound",
            "description": "<p>Error Video Not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingVideoError",
            "description": "<p>Error while retriving data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/video.js",
    "groupTitle": "Video",
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
  },
  {
    "type": "post",
    "url": "/api/videos/:videoId/dislike",
    "title": "dislike video",
    "name": "PostdisLike",
    "group": "Video",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "VideoNotfound",
            "description": "<p>Error Video Not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingVideoError",
            "description": "<p>Error while retriving data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/video.js",
    "groupTitle": "Video",
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
  },
  {
    "type": "get",
    "url": "/api/videos/:videoId/similar",
    "title": "Retrive similar videos.",
    "name": "PostsimilarVideos",
    "group": "Video",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "VideoNotfound",
            "description": "<p>Error Video Not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingVideoError",
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
            "description": "<p>Video information</p>"
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
    "type": "put",
    "url": "/api/videos/:videoId",
    "title": "Change Video date.",
    "name": "PutVideo",
    "group": "Video",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "videoId",
            "description": "<p>The Video-ID.</p>"
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
            "field": "ModifingVidepError",
            "description": "<p>Error while retriving data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "VideoNotFound",
            "description": "<p>The <code>videoId</code> of the Video was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/video.js",
    "groupTitle": "Video",
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
  },
  {
    "type": "delete",
    "url": "/api/videos/:videoId/comments/:commentId",
    "title": "Delete comment.",
    "name": "DeleteComment",
    "group": "Video_Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "videoId",
            "description": "<p>The Video-ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>The Comment-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "VideoNotFound",
            "description": "<p>The <code>VideoId</code> of the Video was not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingdataError",
            "description": "<p>Error while retriving data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/video.js",
    "groupTitle": "Video_Comments",
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
  },
  {
    "type": "post",
    "url": "/api/videos/:videoId/comments",
    "title": "Create a new comment",
    "name": "PostComment",
    "group": "Video_Comments",
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "VideoNotfound",
            "description": "<p>Error Video Not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingVideoError",
            "description": "<p>Error while retriving data.</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "commentRequired",
            "description": "<p>Comment is Required.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/video.js",
    "groupTitle": "Video_Comments",
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
  },
  {
    "type": "put",
    "url": "/api/videos/:videoId/comments/:commentId",
    "title": "Edit comment.",
    "name": "PutComment",
    "group": "Video_Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "videoId",
            "description": "<p>The Video-ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "commentId",
            "description": "<p>The Comment-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "VideoNotFound",
            "description": "<p>The <code>VideoId</code> of the Video was not found.</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "RetrivingdataError",
            "description": "<p>Error while retriving data.</p>"
          },
          {
            "group": "422",
            "optional": false,
            "field": "commentRequired",
            "description": "<p>Comment is Required.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/video.js",
    "groupTitle": "Video_Comments",
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
