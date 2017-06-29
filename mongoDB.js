ObjectId = require('mongodb').ObjectID;

module.exports = {

    listUser: function (db, callback) {

        if(callback)
            callback();

        db.collection("usercollection").find({}).toArray(function(err, docs){
            var arrs = [];
            for(var i =0;i<docs.length;i++)
            {
                var obj = {};
                obj.userid = docs[i].userid;
                obj.username = docs[i].username;
                obj.type = docs[i].type;
                obj.id = docs[i]._id;
                obj.useremail = docs[i].userEmail;
                arrs.push(obj);
            }
            callback(arrs);
        });

    },

    addUsers: function (db, username, userid, useremail, type, callback) {
        if(callback)
            callback();
        console.log(useremail);
        db.collection('usercollection').insert({
            "userid": userid,
            "username": username,
            "type": type,
            "userEmail": useremail

        }, {w: 1}, function (err, records) {

            if (records != null) {
                callback("yes");
            }
            else {
                callback("no");
            }
        });

    },
    deleteUsers: function (db,id, callback) {
        if(callback)
            callback();
        console.log(id);
        db.collection("usercollection").removeMany({"_id":ObjectId(id)});
        callback("yes");

    }



};
