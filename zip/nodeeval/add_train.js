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

// Serve the HTML form for adding a train
app.get('/addTrain', (req, res) => {
    res.sendFile(path.join(__dirname, 'add_train.html'));
});

// Handle the form submission for adding a train
app.post('/addTrain', (req, res) => {
    const trainName = req.body.trainName;
    const source = req.body.source;
    const destination = req.body.destination;
    const timing = req.body.timing;

    console.log('Received parameters:', { trainName, source, destination, timing });

    // Check if the train already exists based on source, destination, and timing
    const checkQuery = `
        SELECT *
        FROM railway_bookings
        WHERE train_name = ? AND source = ? AND destination = ? AND timing = ?;
    `;

    pool.query(checkQuery, [trainName, source, destination, timing], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length > 0) {
            // Train already exists
            res.send('<h2>Train already exists with the same source, destination, and timing.</h2>');
        } else {
            // Add the train to the railway list
            const addQuery = `
                INSERT INTO railway_bookings (train_name, source, destination, timing)
                VALUES (?, ?, ?, ?);
            `;

            pool.query(addQuery, [trainName, source, destination, timing], (addError, addResults) => {
                if (addError) {
                    console.error('Error executing add query:', addError);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                res.send('<h2>Train added successfully to the railway list.</h2>');
            });
        }
    });
});

const PORT = 9001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
