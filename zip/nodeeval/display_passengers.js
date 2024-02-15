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

// Serve the HTML form for displaying passengers
app.get('/displayPassengers', (req, res) => {
    res.sendFile(path.join(__dirname, 'display_passengers.html'));
});

// Handle the form submission for displaying passengers
app.post('/displayPassengers', (req, res) => {
    const trainName = req.body.trainName;

    console.log('Received parameters:', { trainName });

    // Query to retrieve passengers for a specific train
    const query = `
        SELECT *
        FROM passengers
        WHERE train_name = ?;
    `;

    pool.query(query, [trainName], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Render the results in a structured HTML table
        const renderedResults = renderResults(results);

        // Send the HTML response
        res.send(`<h2>List of Passengers for ${trainName}</h2>${renderedResults}`);
    });
});

// Function to render results in a structured HTML table
const renderResults = (results) => {
    if (results.length === 0) {
        return '<p>No passengers found for the specified train.</p>';
    }

    const tableHeader = '<tr><th>Passenger ID</th><th>Train Name</th><th>Passenger Name</th><th>Seat Number</th></tr>';

    const tableRows = results.map((passenger) => {
        return `<tr>
                    <td>${passenger.passenger_id}</td>
                    <td>${passenger.train_name}</td>
                    <td>${passenger.passenger_name}</td>
                    <td>${passenger.seat_number}</td>
                </tr>`;
    }).join('');

    return `<table>${tableHeader}${tableRows}</table>`;
};

const PORT = 9004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

