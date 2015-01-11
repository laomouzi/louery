Router.configure({
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'Home',
    template: 'home'
});
