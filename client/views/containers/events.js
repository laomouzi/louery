Template.containers.events({
    'click .destroy': function(event, tmpl) {
        var name = this.name;
        Containers.remove(this._id, function() {
            // notifications
            Notifications.success(name + ' removed');
        });
        event.preventDefault();
    }
});

Template.createContainer.events({
    'submit #ContainerForm': function(event, tmpl) {
        var name = tmpl.find('#name').value;

        // new Container
        if ($.trim(name)) {

            // notifications
            Notifications.info(name + ' installation started');

            // insert
            Containers.insert({ name: name });

            // created success and not error then go to Containers page.
            Router.go('Containers');
        }
        event.preventDefault();
    },

});

Template.applications.events({
    'click .applications li': function(event, tmpl) {
        var current = $(event.currentTarget);

        // current selected 
        tmpl.$('li').removeClass('selected');
        current.addClass('selected');
    } 
});
