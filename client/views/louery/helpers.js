var TemplateHelpers = {
    session: function(name) {
        return Session.get(name);
    }
};

// set helpers
_.each(TemplateHelpers, function(fn, name) { Template.registerHelper(name, fn); });
