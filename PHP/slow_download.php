<?php
/**
 * Simulate the slow downloading of a file
 * 
 * Use with curl:
 * <code>
 * curl http://www.example.com/path/to/slow-download.php -o /dev/null
 * </code>
 *
 * @author darklaunch <darklaunch@darklaunch.com>
 * @link   http://darklaunch.com/2010/07/15/php-simulate-a-slow-download-of-a-file-curl-o-dev-null
 */

// 1 megabyte
$content_length = 1000000;

// download binary file
header('Content-Type: application/octet-stream');
header('Content-Length: ' . $content_length);
header('Content-Disposition: attachment; filename="somefile.bin"');

$bytes = 1000;
$length = $content_length / $bytes;
$str = str_repeat('.', $bytes);
$micro_seconds = 20000;

for ($i = 0; $i < $length; $i++) {
	echo $str;
	
	// slow the download
	usleep($micro_seconds);
}
