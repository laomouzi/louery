Meteor.publish('containers', function() {
    return Containers.find({ userId: this.userId });
});
