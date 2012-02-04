try {
    if (!window.openDatabase) {
        alert('not supported');
    } else {
        var shortName = 'mydatabase';
        var version = '1.0';
        var displayName = 'My Important Database';
        var maxSize = 65536; // in bytes
        var mydb = openDatabase(shortName, version, displayName, maxSize);
 
        // You should have a database instance in mydb.
    }
} catch(e) {
    // Error handling code goes here.
    if (e == INVALID_STATE_ERR) {
        // Version number mismatch.
        alert("Invalid database version.");
    } else {
        alert("Unknown error "+e+".");
    }
    return;
}

alert("Database is: "+mydb);

/*
CREATE TABLE $1 (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    $2 TEXT NOT NULL DEFAULT "",
);
*/