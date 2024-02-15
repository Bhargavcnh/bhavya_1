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

// Serve the HTML form for deleting a railway booking
app.get('/deleteBooking', (req, res) => {
    res.sendFile(path.join(__dirname, 'delete_booking.html'));
});

// Handle the form submission for deleting a railway booking
app.post('/deleteBooking', (req, res) => {
    const trainName = req.body.trainName;

    console.log('Received parameters:', { trainName });

    // Delete the railway booking for a specific train
    const deleteQuery = `
        DELETE FROM railway_bookings
        WHERE train_name = ?;
    `;

    pool.query(deleteQuery, [trainName], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.affectedRows > 0) {
            // Booking deleted successfully
            res.send('<h2>Railway booking deleted successfully.</h2>');
        } else {
            // Booking not found
            res.send('<h2>Railway booking not found with the specified train name.</h2>');
        }
    });
});

const PORT = 9003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
