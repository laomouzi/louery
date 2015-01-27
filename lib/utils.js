var root = this;

root.parseUserObject = function(doc) {
    var user = doc || Meteor.user(),
        email = user.emails[0].address;
    return {
        email: email,
        username: email.split('@')[0]
    }
};
