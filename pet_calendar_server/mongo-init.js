db = db.getSiblingDB("admin");

db.createUser({
    user: "pet_user",
    pwd: "woofwoofmew456",
    roles: [
        { role: "readWrite", db: "pet_calendar" }
    ]
});

db = db.getSiblingDB("pet_calendar");

