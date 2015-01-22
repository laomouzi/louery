Applications = new Mongo.Collection('applications');
Applications.helpers({});

// default insert, update remove is false
Applications.allow({ });

// SERVER HOOKS
if (Meteor.isServer) { }
