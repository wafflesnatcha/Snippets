<?php
/**
 * Simulate a slow file download.
 *
 * Usage:
 *   http://example.com/slow_proxy.php?SECONDS,URL
 *
 * Example:
 *   http://example.com/slow_proxy.php?3,some/file.html
 *   http://example.com/slow_proxy.php?6.3,http://google.com
 */
if (!isset($_SERVER["QUERY_STRING"]) || $_SERVER["QUERY_STRING"] == "") {
	if (!headers_sent()) header('Content-Type: text/plain');
	echo file_get_contents(__FILE__);
	exit(2);
}

$parts = explode(",", $_SERVER["QUERY_STRING"]);
$delay = array_shift($parts);
$url = implode(",", $parts);

if (!$contents = @file_get_contents($url)) {
	die();
}

$chunks = str_split($contents, 100);
$sleep = floatval($delay * 1000000) / count($chunks);

foreach ($chunks as $chunk) {
	echo $chunk;
	flush();
	usleep($sleep);
}
