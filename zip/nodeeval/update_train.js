const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();

// Create a connection pool
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'Railway_booking',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(express.urlencoded({ extended: true }));

// Serve the HTML form for updating train details
app.get('/updateTrain', (req, res) => {
    res.sendFile(path.join(__dirname, 'update_train.html'));
});

// Handle the form submission for updating train details
app.post('/updateTrain', (req, res) => {
    const trainName = req.body.trainName;
    const newSource = req.body.source;
    const newDestination = req.body.destination;
    const newTiming = req.body.timing;

    console.log('Received parameters:', { trainName, newSource, newDestination, newTiming });

    // Update the railway list for a specific train
    const updateQuery = `
        UPDATE railway_bookings
        SET source = ?, destination = ?, timing = ?
        WHERE train_name = ?;
    `;

    pool.query(updateQuery, [newSource, newDestination, newTiming, trainName], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.affectedRows > 0) {
            // Train updated successfully
            res.send('<h2>Train details updated successfully.</h2>');
        } else {
            // Train not found
            res.send('<h2>Train not found with the specified name.</h2>');
        }
    });
});

const PORT = 9002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
