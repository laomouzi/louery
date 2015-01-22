Router.route('/containers', {
    name: 'Containers',
    template: 'containers'
});

Router.route('/containers/create', {
    name: 'CreateContainer',
    template: 'createContainer',
    waitOn: function() {
        return Meteor.subscribe('applications');
    }
});
