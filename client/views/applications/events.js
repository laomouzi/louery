Template.applications.events({
    'click .applications li': function(e, t) {
        t.$('li').removeClass('selected');
        $(e.currentTarget).addClass('selected');
    }
});
