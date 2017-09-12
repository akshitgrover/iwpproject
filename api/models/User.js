/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name:{
  		type:'string',
  		required:true
  	},
    admin:{
      type:'boolean'
    },
    email:{
      type:'string'
    },
  	phoneno:{
  		type:'string',
  	},
  	orders:{
  		type:'array',
  		defaultsTo:[]
  	},
  	admin:{
  		type:'boolean',
  		defaultsTo:false
  	},
    password:{
      type:'string',
    },
    confirmpassword:{
      type:'string',
    }
  }
};

