<?php

$scripts = $_REQUEST['files'];
$type = $_REQUEST['type'];

header($type);

foreach ($scripts as $script) {
	echo "/* " . $script . " */\n";
	if (file_exists($script)) 
		echo file_get_contents($script);
	else 
		echo "/* Script Not Found! */\n";
	echo "\n";
}
