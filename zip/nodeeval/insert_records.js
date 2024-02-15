var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "Railway_booking"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var insertRailwayBookingsQuery = `
        INSERT INTO railway_bookings (train_name, source, destination, timing)
        VALUES
        ('Train1', 'CityA', 'CityB', '2024-01-09 08:00'),
        ('Train2', 'CityB', 'CityC', '2024-01-09 10:30'),
        ('Train3', 'CityA', 'CityC', '2024-01-09 12:00');
    `;

    con.query(insertRailwayBookingsQuery, function(err, result) {
        if (err) throw err;
        console.log("Inserted 3 records into 'railway_bookings' table");
    });

    var insertPassengersQuery = `
        INSERT INTO passengers (train_name, passenger_name, seat_number)
        VALUES
        ('Train1', 'Apeksha', 'A12'),
        ('Train1', 'Bhavya', 'B08'),
        ('Train2', 'Rohit', 'C23'),
        ('Train3', 'Dhoni', 'D15');
    `;

    con.query(insertPassengersQuery, function(err, result) {
        if (err) throw err;
        console.log("Inserted 4 records into 'passengers' table");
    });

    con.end();
});
