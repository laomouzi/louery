Template.applications.helpers({
    applications: function() {
        return Applications.find({ }, { sort: { sort: 1 }});
    }
});
