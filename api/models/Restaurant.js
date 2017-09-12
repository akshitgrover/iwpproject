/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name:{
      type:'string'
    },
    admin:{
      type:'string'
    },
    address:{
      type:'string'
    },
    menu:{
      type:'array',
      defaultsTo:[]
    },
    phoneno:{
      type:'string'
    },
    ord:{
      type:'array'
    }
  }
};

