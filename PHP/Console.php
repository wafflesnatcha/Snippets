<?php
/**
 * Debug console
 *
 * Example:
 * <code>
 * Console::_logfile("path/to/file.log");
 * Console::_target(Console::TARGET_FILE);
 * Console::_enable();
 * </code>
 *
 * @author    Scott Buchanan <buchanan.sc@gmail.com>
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version   r3 2012-07-02
 * @link      http://wafflesnatcha.github.com
 */

class Console
{
	/**
	 * Console enabled or not
	 * @var boolean
	 */
	private $enabled = false;

	/**
	 * Microtime at the point this Object was created
	 * @var float
	 */
	private $time_start;

	/**
	 * Our output that is destined for display
	 * @var array
	 */
	private $output;

	/**
	 * The default priority
	 */
	const LOG = 1;

	/**
	 * Priority "Debug"
	 */
	const DEBUG = 2;

	/**
	 * Priority "Info"
	 */
	const INFO = 3;

	/**
	 * Priority "Error"
	 */
	const ERROR = 4;

	/**
	 * Priority "Notice"
	 */
	const NOTICE = 5;

	/**
	 * Priority "Time"
	 */
	const TIME = 6;

	/**
	 * Priority "Warn"
	 */
	const WARN = 7;

	/**
	 * Priority "WTF"
	 * (in case of fire, break glass)
	 */
	const WTF = 8;

	/**
	 * For failed assertions
	 */
	const ASSERT = 9;

	/**
	 * Display output to the screen/console
	 */
	const TARGET_SCREEN = 1;

	/**
	 * Write output to a file
	 */
	const TARGET_FILE = 2;

	/**
	 * @var array Console settings
	 */
	private $_config = 	array(
		/**
		 * Path to application root directory.
		 * Used when displaying errors and their corresponding source files.
		 * @var string
		 */
		'path_root' => null,
		/**
		 * Path to file to write output to
		 * @var string
		 */
		'path_log' => null,
		/**
		 * Decimal places for times
		 * @var int
		 */
		'time_precision' => 4,
		/**
		 * Target output
		 * @var int
		 */
		'target' => self::TARGET_SCREEN,
		/**
		 * @var string
		 */
		'indent' => "  ",
		/**
		 * @var int
		 */
		'error_reporting' => E_ALL,
	);

	/**
	 * @return void
	 */
	protected function __construct()
	{
		$this->time_start = microtime(true);
		$this->_config['path_root'] = dirname(realpath($_SERVER['PHP_SELF']));
	}

	/**
	 * Prevent cloning the instance.
	 *
	 * @return void
	 */
	final private function __clone()
	{
		trigger_error('Clone is not allowed.', E_USER_ERROR);
	}

	/**
	 * Retrieves the only object instance of this class
	 *
	 * Gets a single instance of the class the static method is called in. See the
	 * {@link http://php.net/lsb Late Static Bindings} feature for more information.
	 *
	 * @return object Returns a single instance of the class.
	 */
	public static function getInstance()
	{
		static $instance = null;
		return $instance ? : $instance = new static;
	}

	/**
	 * Handles static calls to non-static methods in extending classes.
	 *
	 * For example, class Foo with non-static method bar() can be called statically
	 * as <code>Foo::_bar()</code>. Simply prepend the method name with an underscore.
	 *
	 * Triggers an error of level E_USER_ERROR if the method can't be called statically,
	 * or can't be found.
	 *
	 * @param  string $name
	 * @param  mixed  $arguments
	 * @return mixed
	 * @link   http://php.net/manual/language.oop5.overloading.php#language.oop5.overloading.methods Method overloading
	 */
	public static function __callStatic($name, $arguments)
	{
		if ("{$name[0]}" === "_") {
			$callback = array(static::getInstance(), substr($name, 1));
			if (method_exists($callback[0], $callback[1]))
				return call_user_func_array($callback, $arguments);
		}
		trigger_error("Cannot access method " . __CLASS__ . "->$name statically", E_USER_ERROR);
	}

	/**
	 * Enable the debug console
	 *
	 * @return void
	 */
	public function enable()
	{
		error_reporting($this->_config['error_reporting']);
		ini_set("display_errors", 1);
		set_error_handler(array($this, "phpErrorHandler"), $this->_config['error_reporting']);
		set_exception_handler(array($this, "phpExceptionHandler"));

		/*
		assert_options(ASSERT_ACTIVE, 1);
		assert_options(ASSERT_WARNING, 0);
		assert_options(ASSERT_QUIET_EVAL, 1);
		assert_options(ASSERT_CALLBACK, array($this, "assertCallback"));
		*/
		$this->enabled = true;
	}

	/**
	 * A relay to process() using DEBUG as the first argument
	 *
	 * @return void
	 */
	public function debug()
	{
		$this->process(self::DEBUG, func_get_args());
	}

	/**
	 * A relay to process() using ERROR as the first argument
	 *
	 * @return void
	 */
	public function error()
	{
		$this->process(self::ERROR, func_get_args());
	}

	/**
	 * A relay to process() using INFO as the first argument
	 *
	 * @return void
	 */
	public function info()
	{
		$this->process(self::INFO, func_get_args());
	}

	/**
	 * A relay to process() using LOG as the first argument
	 *
	 * @return void
	 */
	public function log()
	{
		$this->process(self::LOG, func_get_args());
	}

	/**
	 * A relay to process() using NOTICE as the first argument
	 *
	 * @return void
	 */
	public function notice()
	{
		$this->process(self::NOTICE, func_get_args());
	}

	/**
	 * A relay to process() using WARN as the first argument
	 *
	 * @return void
	 */
	public function warn()
	{
		$this->process(self::WARN, func_get_args());
	}

	/**
	 * A relay to process() using WTF as the first argument
	 *
	 * @return void
	 */
	public function wtf()
	{
		$this->process(self::WTF, func_get_args());
	}

	/**
	 * Log a backtrace
	 *
	 * @return void
	 */
	public function backtrace()
	{
		$backtrace = $this->get_debug_print_backtrace(2);
		$this->process(self::DEBUG, $backtrace);
		return $backtrace;
	}

	/**
	 * Show elapsed time
	 *
	 * Logs (and returns) the seconds passed since the Console was first
	 * activated. Optionally followed by a label of your choosing.
	 *
	 * @return float Seconds passed
	 */
	public function time()
	{
		$t = number_format(round((float) microtime(true) - $this->time_start, $this->_config['time_precision']), $this->_config['time_precision']);
		$args = func_get_args();
		array_unshift($args, $t);
		$this->process(self::TIME, $args);
		return $t;
	}

	/**
	 * Output the console
	 *
	 * This will write the currently stored output to the target medium. If the
	 * first parameter is empty, it will use the value in {$this->_config['target']};
	 * and if that is empty/invalid, defaults to {self::TARGET_SCREEN}
	 *
	 * @param  int  $target {Console::TARGET_SCREEN}|{Console::TARGET_FILE}
	 * @return void
	 */
	public function output($target = null)
	{
		if ($this->enabled) {
			switch ($this->target($target)) {
				case self::TARGET_FILE:
					$this->output_file();
					break;
				case self::TARGET_SCREEN:
				default:
					$this->output_screen();
					break;
			}
		}
	}

	/**
	 * Get/set the log file
	 *
	 * This will retrieve the path to the log file. If the first argument is not
	 * empty, then it will be used as the new path to the log file.
	 *
	 * @param  string New path to use as the log file
	 * @return string Path to the log file
	 */
	public function logfile($path = false)
	{
		if ($path !== false) {
			if ((file_exists($path) && is_writable($path)) || is_writable(dirname($path)))
				$this->_config['path_log'] = $path;
		}
		return $this->_config['path_log'];
	}

	/**
	 * Get/set the output target
	 *
	 * @param  int $new_target
	 * @return int The current target
	 */
	public function target($new_target = null)
	{
		if ($new_target)
			$this->_config['target'] = $new_target;
		return $this->_config['target'];
	}

	/**
	 * Called on failed assertions
	 *
	 * @param  string $file
	 * @param  int    $line Parameter description (if any) ...
	 * @param  string $code
	 * @return void
	 */
	public function assertCallback($file, $line, $code)
	{
		$this->process(self::ASSERT, "$file:$line $code");
	}

	/**
	 * @return void
	 * @see    http://www.php.net/set-error-handler
	 */
	public function phpErrorHandler($errno, $errstr, $errfile, $errline, $errcontext)
	{
		$file = static::getRelativePath($errfile, $this->_config['path_root']);
		$msg = "$file:$errline - $errstr";
		switch ($errno) {
			case E_ERROR:
			case E_USER_ERROR:
				$this->process(self::ERROR, $msg);
				exit(self::ERROR);
				break;
			case E_WARNING:
			case E_USER_WARNING:
				$this->process(self::WARN, $msg);
				break;
			case E_NOTICE:
			case E_USER_NOTICE:
				$this->process(self::NOTICE, $msg);
				break;
			case E_STRICT:
				$this->process(self::DEBUG, $msg);
				break;
			default:
				$this->process(self::WTF, "UNKNOWN ERROR TYPE " . $msg);
		}
		return false;
	}

	/**
	 * @return void
	 * @see    http://www.php.net/set-exception-handler
	 */
	public function phpExceptionHandler($exception)
	{
		$this->process(self::DEBUG, array($exception->getMessage(), @$exception->getTrace()));
	}

	/**
	 * Process a console message
	 *
	 * @param  int   $priority self::DEBUG|self::ERROR|self::INFO|self::LOG|self::NOTICE|self::TIME|self::WARN
	 * @param  mixed $args     What to log
	 * @return void
	 */
	private function process($priority = self::LOG, $args)
	{
		static $prefixes = array(
			self::DEBUG => "%mDEBUG",
			self::ERROR => "%rERROR",
			self::INFO => "%bINFO",
			self::LOG => "%gLOG",
			self::NOTICE => "%wNOTICE",
			self::TIME => "%cTIME",
			self::WARN => "%yWARN",
			self::WTF => "%y%bW%gT%rF%c",
			self::ASSERT => "%rASSERT",
		);

		if ($prefixes[$priority]) {
			$prefix = $prefixes[$priority] . "%n ";
		}

		$args = (array) $args;
		foreach ($args as &$a) {
			$a = $this->process_arg($a);
		}

		$str = implode(" ", $args);
		$this->output[] = $prefix . $str;
	}

	/**
	 * Clean up a log entry, make it SUPER KAWAII!!!!11 ^_^
	 *
	 * @param  string $str A single console entry
	 * @return string A cleaner looking version of $str
	 */
	private function process_arg($arg)
	{
		if (is_array($arg)) {
			$arg = var_export($arg, true);
			$arg = preg_replace('/array \([\s]*\)/i', 'array ()', $arg);
		} elseif (is_object($arg)) {
			$arg = var_export($arg, true);
		} elseif (is_bool($arg)) {
			$arg = ($arg === true) ? "TRUE" : "FALSE";
		} elseif (is_string($arg)) {
			// $arg = '"' . $arg . '"';
		}
		$arg = str_replace("\n", "\n" . $this->_config['indent'], $arg);
		return $arg;
	}

	/**
	 * Output to file.
	 *
	 * @return void
	 */
	private function output_file()
	{
		if (!$this->_config['path_log'])
			return;

		$out = $this->output;
		array_unshift($out, "# " . date("r"));
		$out = $this->colorConvert($out, false);

		$fp = fopen($this->_config['path_log'], "a");
		fwrite($fp, implode("\n", $out) . "\n");
		fclose($fp);
	}

	/**
	 * Output to screen. (stderr in cli)
	 *
	 * @return void
	 */
	private function output_screen()
	{
		$out = $this->colorConvert(implode("\n", $this->output)) . "\n";
		if(php_sapi_name() == "cli" && $h = fopen("php://stderr", "w")) {
			fwrite($h, $out);
			fclose($h);
		} else {
			echo $out;
		}
	}

	/**
	 * Converts (or strips) color codes in output into ansi control codes.
	 *
	 * The applies only Console_Color is installed, otherwise
	 *
	 * @param  string  $string  String to format
	 * @param  boolean $colored True to convert color codes, false to strip them. If Console_Color is not installed this will always be false
	 * @return mixed   Return description (if any) ...
	 */
	private function colorConvert($string, $colored = true)
	{
		if (!$colored || !isset($_SERVER['TERM']) || !in_array($_SERVER['TERM'], array("xterm-color", "xterm-256color"))) {
			return preg_replace("/([^%]?)(%[kK0rR1gG2yY3bB4mM5pPcC6wW7FU8_9n])/", "$1", $string);
		}
		$colors = $this->colorCode();
		foreach ($colors as $k => $v) {
			$string = str_replace($k, $v, $string);
		}
		return $string;
	}

	/**
	 * Return the ansi escape code for a color code
	 *
	 * @param  boolean      $code color code
	 * @return string|array Returns an array all codes if no $code is specified
	 */
	private function colorCode($code = false)
	{
		static $codes_ansi = array(
			"%n" => "\033[0m",
			"%k" => "\033[30m",
			"%r" => "\033[31m",
			"%g" => "\033[32m",
			"%y" => "\033[33m",
			"%b" => "\033[34m",
			"%m" => "\033[35m",
			"%c" => "\033[36m",
			"%w" => "\033[37m",
			"%K" => "\033[40m",
			"%R" => "\033[41m",
			"%G" => "\033[42m",
			"%Y" => "\033[43m",
			"%B" => "\033[44m",
			"%M" => "\033[45m",
			"%C" => "\033[46m",
			"%W" => "\033[47m",
		);
		if ($code !== false)
			return $codes_ansi[$code];
		return $codes_ansi;
	}

	/**
	 * Nearly identical to {@see debug_print_backtrace} but returns the result
	 * instead of printing it.
	 *
	 * @param  number $traces_to_ignore
	 * @return string
	 * @author Chris Kistner <chris.kistner@gmail.com>
	 * @link   http://www.php.net/manual/en/function.debug-print-backtrace.php#97101
	 */
	private function get_debug_print_backtrace($traces_to_ignore = 1)
	{
		$traces = debug_backtrace();
		$ret = array();
		foreach ($traces as $i => $call) {
			if ($i < $traces_to_ignore) {
				continue;
			}
			$object = '';
			if (isset($call['class'])) {
				$object = $call['class'] . $call['type'];
				if (is_array($call['args'])) {
					foreach ($call['args'] as &$arg) {
						$this->get_arg($arg);
					}
				}
			}
			$call['file'] = $call['file'] ? $this->getRelativePath($call['file'], $this->path_root) : "";
			$l = "#" . str_pad($i - $traces_to_ignore, 3, " ") . $object . $call['function'] . "(" . implode(", ", $call['args']) . ")" . ($call['file'] ? " called at [" . $call['file'] . ":" . $call['line'] . "]" : "");
			$ret[] = $l;
		}
		return implode("\n", $ret);
	}

	/**
	 * @param  mixed &$arg
	 * @return void
	 * @author Chris Kistner <chris.kistner@gmail.com>
	 * @link   http://www.php.net/manual/en/function.debug-print-backtrace.php#97101
	 */
	private function get_arg(&$arg)
	{
		if (is_object($arg)) {
			$arr =(array) $arg;
			$args = array();
			foreach ($arr as $key => $value) {
				if (strpos($key, chr(0)) !== false)
					$key = '';
				// $args[] = '[' . $key . '] => ' . $this->get_arg($value);
				$args[] = '[' . $key . '] => ' . call_user_func(__METHOD__, $value);
			}
			$arg = get_class($arg) . ' Object (' . implode(',', $args) . ')';
		}
	}

	/**
	 * The opposite of realpath()
	 *
	 * @param  string $path      Path to relativize
	 * @param  string $compareTo What to relativize $path against
	 * @return string The $path relative to $compareTo
	 * @link   http://us3.php.net/manual/en/function.realpath.php#97885
	 */
	private function getRelativePath($path, $compareTo)
	{
		$path = trim($path, '/');
		$compareTo = trim($compareTo, '/');
		if (strpos($path, $compareTo) === 0) {
			$offset = strlen($compareTo) + 1;
			return substr($path, $offset);
		}
		$relative = array();
		$pathParts = explode('/', $path);
		$compareToParts = explode('/', $compareTo);
		foreach ($compareToParts as $index => $part) {
			if (isset($pathParts[$index]) && $pathParts[$index] == $part)
				continue;
			$relative[] = '..';
		}
		foreach ($pathParts as $index => $part) {
			if (isset($compareToParts[$index]) && $compareToParts[$index] == $part)
				continue;
			$relative[] = $part;
		}
		return implode('/', $relative);
	}
}
