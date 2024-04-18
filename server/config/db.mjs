import mysql from 'mysql';

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_management'
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Define query function for database interactions
function query(sql, values, callback) {
    connection.query(sql, values, callback);
}

export { query };
