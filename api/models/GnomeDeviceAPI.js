/**
 * GnomeDeviceAPI.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //Serial # of device
    serial:{
    type:'string',
    size:'128',
    required: true
    },

    //Nickname of device
    nickname:{
      type:'string',
      size:'128',
      required: true
    },

    //Is device on or off
    status:{
      type:'boolean',
      required: true
    },

    alive:{
      type:'boolean'
    },

    //Owner (user) of device
    owner:{
        model:'gnomeUsersAPI'
    }
  }
};

