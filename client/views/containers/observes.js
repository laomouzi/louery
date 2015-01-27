Meteor.startup(function() {
    Containers.find({ userId: Meteor.userId() }).observe({
        changed: function(doc) {
            if (doc.completed) {
                Notifications.success(doc.name + ' installation completed');
            }
        }
    });
});
