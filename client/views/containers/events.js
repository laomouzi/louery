Template.containers.events({
    'click .destroy': function(event, tmpl) {
        Containers.remove(this._id);
        event.preventDefault();
    }
});

Template.createContainer.events({
    'submit #ContainerForm': function(event, tmpl) {
        var name = tmpl.find('#name').value;

        // new Container
        if ($.trim(name)) {

            // insert
            Containers.insert({ name: name });

            // created success and not error then go to Containers page.
            Router.go('Containers');
        }
        event.preventDefault();
    }
});
