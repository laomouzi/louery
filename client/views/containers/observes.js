Meteor.startup(function() {
    Containers.find({ userId: Meteor.userId() }).observe({
        changed: function(doc) { }
    });
});
