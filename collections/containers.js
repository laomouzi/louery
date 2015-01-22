Containers = new Mongo.Collection('containers');
Containers.helpers({});

Containers.allow({
    insert: function(userId, doc) { return userId === doc.userId; },
    update: function(userId, doc) { return userId === doc.userId; },
    remove: function(userId, doc) { return userId === doc.userId; }
});


// BEFORE INSERT
Containers.before.insert(function(userId, doc) {
    doc.userId = userId;
    doc.createdAt = new Date();

    /*
    *
    * container will begin after the completion of creation.
    * completed will be updated. 
    */
    doc.completed = false;
});


// SERVER HOOKS
if (Meteor.isServer) {
    var fs = Npm.require('fs'),
        sitesEnabledPath = '/etc/nginx/sites-enabled/';

    // AFTER INSERT
    Containers.after.insert(function(userId, doc) {

        // CREATE CONTAINER
        Lxc.create(doc._id).complete(function(err, _id) {
            if (!err) {
                Lxc.start(doc._id).complete(function() {
                    found = Meteor.setInterval(function() {
                        Lxc.info(doc._id).complete(function(info) {
                            if (_.has(info, 'ip')) {

                                // clear interval
                                Meteor.clearInterval(found);

                                // update container
                                Containers.update(_id, {
                                    $set: _.extend({ completed: true }, _.omit(info, 'name'))
                                });

                                // touch nginx file.
                                Nginx.NginxConfFile.createFromSource('', function(err, conf) {
                                    var domain = info.name + '.louery.com';

                                    // server { } line add.
                                    conf.nginx._add('server');

                                    // default lines.
                                    conf.nginx.server._add('listen', '80');
                                    conf.nginx.server._add('server_name', domain);

                                    // location / {} line add
                                    conf.nginx.server._add('location', '/');
                                    conf.nginx.server.location._add('proxy_pass http://'+ info.ip +':3000');

                                    // write file.
                                    fs.writeFile(sitesEnabledPath + domain, conf.toString());
                                });

                                // install application
                                if (doc.application) {

                                    // run application
                                    Lxc.attach(_id, 'sudo bash /var/apps/' + doc.application.name + '/run').complete(function(err) { 

                                        // Nginx reload 
                                        Nginx.reload();
                                    }); 
                                }
                            }
                        });
                    }, 500);
                });
            }
        });
    });

    // AFTER REMOVE 
    Containers.after.remove(function(userId, doc) {

        // STOP CONTAINER
        Lxc.stop(doc._id).complete(function(err) {

            // DESTROY CONTAINER
            if (!err) {
                Lxc.destroy(doc._id).complete(function(name) {
                    
                    // remove Nginx file.
                    fs.unlink(sitesEnabledPath + doc._id + '.louery.com');
                });
            }
        });
    });
}
