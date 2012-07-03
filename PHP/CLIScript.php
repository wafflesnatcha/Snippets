<?php
/**
 * Command line script utility
 * 
 * @author    Scott Buchanan <buchanan.sc@gmail.com>
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version   r1 2012-07-02
 * @link      http://wafflesnatcha.github.com
 */
class CLIScript
{
	var $wrap = 80;
	
	function __construct($config)
	{
		set_error_handler(array($this, "error_handler"), E_USER_NOTICE);
		foreach ($config as $k => $v) {
			$this->$k = $v;
		}
		// Attempt to decipher version info from this file's `@version` tag
		if (!$this->version)
			$this->version = preg_filter('/.*?\/\*\*.*?[\n\r]+\s*\*\s*@version\s*([^\n\r]+).*/is', '$1', file_get_contents($_SERVER['PHP_SELF']));

		// Add -h|--help flag
		if (is_array($this->options) && !array_key_exists("help", $this->options))
			$this->options['help'] = array(
				'short' => 'h',
				'long' => 'help',
				'usage' => '-h, --help',
				'description' => 'Show this help',
			);
	}

	function error_handler($errno, $errstr, $errfile, $errline)
	{
		error_log(basename($errfile) . ": " . trim($errstr));
		exit($code);
	}

	function usage()
	{
		echo $this->name . " " . $this->version . "\n" . ($this->description ? wordwrap($this->description, $this->wrap) . "\n" : "") . ($this->usage? "\nUsage: " . $this->usage . "\n": "");
		
		if ($this->options) {
			$lines = array();
			$longest = 0;
			foreach ($this->options as $def_name => $def_array) {
				$lines[] = array(
					$def_array['usage'],
					$def_array['description'],
				);
				if (strlen($def_array['usage']) > $longest)
					$longest = strlen($def_array['usage']);
			}
			$longest = ($longest > 0) ? $longest + 2 : 0;
			echo "\nOptions:\n";
			foreach ($lines as $line) {
				printf(" %-{$longest}s%s\n", $line[0], wordwrap($line[1], $this->wrap - 1 - $longest, "\n" . str_repeat(" ", $longest + 1)));
			}
		}
		
		if ($this->help)
			echo "\n" . wordwrap($this->help, $this->wrap) . "\n";
	}

	function parseArgs()
	{
		$defs = $this->options;
		$short_opts = "";
		$long_opts = array();

		foreach ($defs as $k => $v) {
			if (isset($v['short']))
				$short_opts .= $v['short'];
			if (isset($v['long']))
				$long_opts[] = $v['long'];
		}

		$options = getopt($short_opts, $long_opts);
		$args = array();
		foreach ($options as $opt_name => $opt_value) {
			foreach ($defs as $def_name => $def_array) {
				if ($opt_name == rtrim($def_array['short'], ':') || $opt_name == rtrim($def_array['long'], ':')) {
					if ($def_array['filter'] && !$args[$def_name] = filter_var($opt_value, $def_array['filter'], $def_array['filter_options']))
						trigger_error("invalid value for " . $def_name . " '$opt_value' ");
					else
						$args[$def_name] = $opt_value;
					continue 2;
				}
			}
		}

		// Show usage
		if (isset($args['help'])) {
			$this->usage();
			exit;
		}

		return $args;
	}
}
