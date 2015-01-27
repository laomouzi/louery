Meteor.publishComposite('containers', function() {
    return {
        find: function() {
            return Containers.find({ userId: this.userId });
        }
    };
});

Meteor.publishComposite('applications', function() {
    return {
        find: function() {
            return Applications.find({ userId: this.userId });
        }
    };
});
