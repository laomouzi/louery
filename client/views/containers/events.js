Template.containers.events({ });

Template.createContainer.events({
    'click .create': function(event, t) {
        var name = t.find('#name').value,
            selectedElement = $('.selected').get(0),
            application = selectedElement ? Blaze.getData(selectedElement) : false;

        // Trim name value
        if ($.trim(name) && application) {

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

        event.preventDefault();
    }
});
