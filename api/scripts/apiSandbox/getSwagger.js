define([], function(){
	"use strict";
	
	function initModule(){
		//If the api has no swagger file wwe return the exampe pet store swagger file
		var petStoreSwagger= {
			  "swagger": "2.0",
			  "info": {
			    "version": "1.0.0",
			    "title": "Swagger Petstore",
			    "description": "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
			    "termsOfService": "http://swagger.io/terms/",
			    "contact": {
			      "name": "Swagger API Team"
			    },
			    "license": {
			      "name": "MIT"
			    }
			  },
			  "host": "petstore.swagger.io",
			  "basePath": "/api",
			  "schemes": [
			    "http"
			  ],
			  "consumes": [
			    "application/json"
			  ],
			  "produces": [
			    "application/json"
			  ],
			  "paths": {
			    "/pets": {
			      "get": {
			        "description": "Returns all pets from the system that the user has access to",
			        "operationId": "findPets",
			        "produces": [
			          "application/json",
			          "application/xml",
			          "text/xml",
			          "text/html"
			        ],
			        "parameters": [
			          {
			            "name": "tags",
			            "in": "query",
			            "description": "tags to filter by",
			            "required": false,
			            "type": "array",
			            "items": {
			              "type": "string"
			            },
			            "collectionFormat": "csv"
			          },
			          {
			            "name": "limit",
			            "in": "query",
			            "description": "maximum number of results to return",
			            "required": false,
			            "type": "integer",
			            "format": "int32"
			          }
			        ],
			        "responses": {
			          "200": {
			            "description": "pet response",
			            "schema": {
			              "type": "array",
			              "items": {
			                "$ref": "#/definitions/Pet"
			              }
			            }
			          },
			          "default": {
			            "description": "unexpected error",
			            "schema": {
			              "$ref": "#/definitions/ErrorModel"
			            }
			          }
			        }
			      },
			      "post": {
			        "description": "Creates a new pet in the store.  Duplicates are allowed",
			        "operationId": "addPet",
			        "produces": [
			          "application/json"
			        ],
			        "parameters": [
			          {
			            "name": "pet",
			            "in": "body",
			            "description": "Pet to add to the store",
			            "required": true,
			            "schema": {
			              "$ref": "#/definitions/NewPet"
			            }
			          }
			        ],
			        "responses": {
			          "200": {
			            "description": "pet response",
			            "schema": {
			              "$ref": "#/definitions/Pet"
			            }
			          },
			          "default": {
			            "description": "unexpected error",
			            "schema": {
			              "$ref": "#/definitions/ErrorModel"
			            }
			          }
			        }
			      }
			    },
			    "/pets/{id}": {
			      "get": {
			        "description": "Returns a user based on a single ID, if the user does not have access to the pet",
			        "operationId": "findPetById",
			        "produces": [
			          "application/json",
			          "application/xml",
			          "text/xml",
			          "text/html"
			        ],
			        "parameters": [
			          {
			            "name": "id",
			            "in": "path",
			            "description": "ID of pet to fetch",
			            "required": true,
			            "type": "integer",
			            "format": "int64"
			          }
			        ],
			        "responses": {
			          "200": {
			            "description": "pet response",
			            "schema": {
			              "$ref": "#/definitions/Pet"
			            }
			          },
			          "default": {
			            "description": "unexpected error",
			            "schema": {
			              "$ref": "#/definitions/ErrorModel"
			            }
			          }
			        }
			      },
			      "delete": {
			        "description": "deletes a single pet based on the ID supplied",
			        "operationId": "deletePet",
			        "parameters": [
			          {
			            "name": "id",
			            "in": "path",
			            "description": "ID of pet to delete",
			            "required": true,
			            "type": "integer",
			            "format": "int64"
			          }
			        ],
			        "responses": {
			          "204": {
			            "description": "pet deleted"
			          },
			          "default": {
			            "description": "unexpected error",
			            "schema": {
			              "$ref": "#/definitions/ErrorModel"
			            }
			          }
			        }
			      }
			    }
			  },
			  "definitions": {
			    "Pet": {
			      "type": "object",
			      "allOf": [
			        {
			          "$ref": "#/definitions/NewPet"
			        },
			        {
			          "required": [
			            "id"
			          ],
			          "properties": {
			            "id": {
			              "type": "integer",
			              "format": "int64"
			            }
			          }
			        }
			      ]
			    },
			    "NewPet": {
			      "type": "object",
			      "required": [
			        "name"
			      ],
			      "properties": {
			        "name": {
			          "type": "string"
			        },
			        "tag": {
			          "type": "string"
			        }
			      }
			    },
			    "ErrorModel": {
			      "type": "object",
			      "required": [
			        "code",
			        "message"
			      ],
			      "properties": {
			        "code": {
			          "type": "integer",
			          "format": "int32"
			        },
			        "message": {
			          "type": "string"
			        }
			      }
			    }
			  }
			};




		
		function swaggerAjax(postData, phpSource, onLoad) {
		    var xhr = new XMLHttpRequest();
		    xhr.open("POST", phpSource, true);
		    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    xhr.onreadystatechange = function() {//Call a function when the state changes.
		        if(this.readyState == XMLHttpRequest.DONE) {
		            onLoad(this);
		        }
		    }
		    xhr.send(postData); 

		}

		/*Retrieves the swagger text from the api row of the current api. If the swagger file is null false is returned instead*/
		this.getSwagger = function(apiId, onLoad){
			swaggerAjax("randomId="+apiId, "/StoreFront/api/php/getApiSwaggerFile.php", function(response){
				//console.log(response.responseText);
				if(response.status == 200){
					if(response.responseText == ""){
						onLoad(petStoreSwagger);
						return;
						document.getElementById("sandboxButton").style.display = "none";
						return;
					}
					var swaggerObject = JSON.parse(response.responseText);
					//console.log(swaggerObject);
					onLoad(swaggerObject);
				}else{
					onLoad(false);
				}
			});
		}



		

		

	}return{
		init: initModule
	}


});