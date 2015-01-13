Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return Meteor.subscribe('containers');
    }
});

Router.route('/', {
    name: 'Home',
    template: 'home'
});
