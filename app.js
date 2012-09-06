/**
 * Spawn a child process which
 * tails MAMP website log.
 */
var file = '/Applications/MAMP/logs/sparrow.unesco/sparrow.unesco.access.log'
  , spawn = require('child_process').spawn
  , tail = spawn('tail', ['-f', file]);

// Interpret output as a string...
tail.stdout.setEncoding();


/**
 * Create a TCP server...
 */
var server = require('net').createServer(function(conn) {
  console.log('Connection opened');

  // Set encoding to UTF-8...
  conn.setEncoding();

  conn.on('end', function() {
    console.log('Connection closed');
  });

  // Output data we recieve...
  conn.on('data', function(data){
    console.log(data);
  });

  // Output logs to connection
  tail.stdout.on('data', function(data) {
    console.log('Logfile updated');
    conn.write(data);
  });

});


/**
 * Server can be reached on port 4001.
 */
server.listen(4001, function() {
  console.log('Server bound to port 4001');
})