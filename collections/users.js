Users = Meteor.users;

// HOOKS
Users.before.insert(function(userId, doc) {
    doc.username = parseUserObject(doc).username;
});
