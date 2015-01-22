Template.containers.events({
    'click .destroy': function(event, tmpl) {
        Containers.remove(this._id);
        event.preventDefault();
    }
});

Template.createContainer.events({
    'submit #ContainerForm': function(event, tmpl) {
        var name = tmpl.find('#name').value,
            selectedApp = $('.selected').get(0),
            application = selectedApp ? Blaze.getData(selectedApp) : false;

        if (application) {
            if ($.trim(name)) {

                // notifications
                Notifications.info(name + ' installation started');

                // insert
                Containers.insert({ 
                    name: name,
                    application: _.omit(application, '_id')
                });

                // created success and not error then go to Containers page.
                Router.go('Containers');
            }
        } else {
            Notifications.error('Please select application');
        }
        event.preventDefault();
    }
});

Template.applications.events({
    'click #Applications li': function(event, t) {
        var current = $(event.currentTarget);

        // remove all selecteds and select current application
        t.$('li').removeClass('selected');
        current.addClass('selected');
    }
});
