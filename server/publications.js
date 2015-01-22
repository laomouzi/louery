Meteor.publish('containers', function() {
    return Containers.find({ userId: this.userId });
});

Meteor.publish('applications', function() {
    return Applications.find({});
});
