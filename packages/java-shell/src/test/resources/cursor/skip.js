// before
db.coll.remove({});
db.coll.insertOne({a: 1});
db.coll.insertOne({a: 2});
db.coll.insertOne({a: 3});
// command
db.coll.find().skip(1);
// clear
db.coll.drop();
