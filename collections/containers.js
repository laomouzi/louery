Containers = new Mongo.Collection('containers');
Containers.helpers({});

// SERVER HOOKS
if (Meteor.isServer) {

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

    // AFTER INSERT
    Containers.after.insert(function(userId, doc) {

        // CREATE CONTAINER
        Lxc.create(doc._id).complete(function(err, _id) {
            if (!err) {
                Containers.update(_id, {
                    $set: {
                        completed: true
                    }
                });
            }
        });
    });

    // AFTER REMOVE 
    Containers.after.remove(function(userId, doc) {
        
        // DESTROY CONTAINER
        Lxc.destroy(doc._id);
    });
}
