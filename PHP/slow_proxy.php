<?php
/**
 * Usage: http://website.com/slow_proxy.php?3,some/file.html
 */
$parts = explode(",", $_SERVER["QUERY_STRING"]);
$delay = array_shift($parts);
$url = implode(",", $parts);

if(!$contents = @file_get_contents($url)) die();

$chunks = str_split($contents, 10);
$sleep = ($delay * 1000000) / count($chunks);
foreach($chunks as $chunk) {
	echo $chunk;	
	flush();
	usleep($sleep);
}
