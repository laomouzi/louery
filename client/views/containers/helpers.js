Template.containers.helpers({
    containers: function() {
        return Containers.find({ });
    }
});

Template.applications.helpers({
    applications: function() {
        return Applications.find({});
    }
});
