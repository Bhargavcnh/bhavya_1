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

// Serve the HTML form using a route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'retrieve.html'));
});

// Handle the form submission
app.get('/search', (req, res) => {
    const source = req.query.source;
    const destination = req.query.destination;

    console.log('Received parameters:', { source, destination });

    // Query to retrieve railway bookings based on source and destination
    const query = `
        SELECT *
        FROM railway_bookings
        WHERE source = ? AND destination = ?;
    `;

    // Using connection pool to handle multiple queries
    pool.query(query, [source, destination], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Render the results in a structured HTML table
        const renderedResults = renderResults(results);

        // Send the HTML response
        res.send(`<h2>Railway Bookings</h2>${renderedResults}`);
    });
});

// Function to render results in a structured HTML table
const renderResults = (results) => {
    if (results.length === 0) {
        return '<p>No railway bookings found for the specified source and destination.</p>';
    }

    const tableHeader = '<tr><th>Train Name</th><th>Source</th><th>Destination</th><th>Timing</th></tr>';

    const tableRows = results.map((booking) => {
        return `<tr>
                    <td>${booking.train_name}</td>
                    <td>${booking.source}</td>
                    <td>${booking.destination}</td>
                    <td>${booking.timing}</td>
                </tr>`;
    }).join('');

    return `<table>${tableHeader}${tableRows}</table>`;
};

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

