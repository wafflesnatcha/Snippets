<?php
$delay = 10000;
$file = $_SERVER["QUERY_STRING"];
if(!is_file($file)) die();
$chunks = str_split(file_get_contents($file), 5);
foreach($chunks as $chunk) {
	echo $chunk;	
	usleep($delay);
}
