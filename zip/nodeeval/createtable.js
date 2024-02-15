var mysql = require('mysql2');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "Railway_booking"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    // Create 'railway_bookings' table
    var createRailwayBookingsTable = `
    CREATE TABLE IF NOT EXISTS railway_bookings (
        train_name VARCHAR(50) PRIMARY KEY,
        source VARCHAR(50),
        destination VARCHAR(50),
        timing DATETIME
    );
    
    `;

    con.query(createRailwayBookingsTable, function (err, result) {
        if (err) throw err;
        console.log("Railway_bookings table created");
    });

    // Create 'passengers' table
    var createPassengersTable = `
    CREATE TABLE IF NOT EXISTS passengers (
        passenger_id INT AUTO_INCREMENT PRIMARY KEY,
        train_name VARCHAR(50),
        passenger_name VARCHAR(50),
        seat_number VARCHAR(10),
        FOREIGN KEY (train_name) REFERENCES railway_bookings(train_name)
    );
    
    `;

    con.query(createPassengersTable, function (err, result) {
        if (err) throw err;
        console.log("Passengers table created");
    });

    con.end();
});
