<?php
/**
 * PHP Version 5.3.0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author    Scott Buchanan <buchanan.sc@gmail.com>
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version   2012-02-22
 * @link      http://wafflesnatcha.github.com
 */

/**
 * Debug console
 */
class Console
{
	/**
	 * Console enabled or not
	 * @var boolean
	 */
	private $enabled = false;

	/**
	 * Application root directory
	 * Used when displaying errors and their corresponding source files
	 * @var string
	 */
	private $path_root;

	/**
	 * Path to file to write output to
	 * @var string
	 */
	private $path_log;

	/**
	 * Target output
	 * @var int TARGET_SCREEN|TARGET_FILE
	 */
	private $target;

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
	 * Display output to the screen/console
	 */
	const TARGET_SCREEN = 1;

	/**
	 * Write output to a file
	 */
	const TARGET_FILE = 2;

	/**
	 * @return void
	 */
	protected function __construct()
	{
		$this->time_start = microtime(true);
		$this->path_root = dirname(realpath($_SERVER['PHP_SELF']));
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
			$callback = array(
				static::getInstance(),
				substr($name,
				1),
			);
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
		error_reporting(E_ALL| E_STRICT);
		ini_set("display_errors", 1);
		set_error_handler(array($this, "phpErrorHandler"), E_ALL| E_STRICT);
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
		$t = round((float) microtime(true) - $this->time_start, 5);
		$args = func_get_args();
		array_unshift($args, $t);
		$this->process(self::TIME, $args);
		return $t;
	}

	/**
	 * Display the console
	 *
	 * This will write the currently stored output to the target medium. If the
	 * first parameter is empty, it will use the value in {self::$target};
	 * and if that is empty/invalid, defaults to {self::TARGET_SCREEN}
	 * $target is supplied,
	 *
	 * @param  int  $target {TARGET_SCREEN}|{TARGET_FILE}
	 * @return void
	 */
	public function display($target = null)
	{
		if (!$this->enabled)
			return false;
		$t = $this->target($target);
		switch ($t) {
			case self::TARGET_FILE:
				$this->displayToFile();
				break;
			case self::TARGET_SCREEN:
			default:
				$this->displayToScreen();
				break;
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
				$this->path_log = $path;
		}
		return $this->path_log;
	}

	/**
	 * Get/set the output target
	 *
	 * @param  boolean $new_target Parameter description (if any) ...
	 * @return boolean Return description (if any) ...
	 */
	public function target($new_target = null)
	{
		if ($new_target)
			$this->target = $new_target;
		return $this->target;
	}

	/**
	 * Short description for function
	 *
	 * @param  unknown $file Parameter description (if any) ...
	 * @param  unknown $line Parameter description (if any) ...
	 * @param  unknown $code Parameter description (if any) ...
	 * @return void
	 */
	public function assertCallback($file, $line, $code)
	{
		$this->process(self::DEBUG, "$file:$line:$code");
	}

	/**
	 * @return void
	 * @see    http://www.php.net/set-error-handler
	 */
	public function phpErrorHandler($errno, $errstr, $errfile, $errline, $errcontext)
	{
		$exit_after = false;
		switch ($errno) {
			case E_ERROR:
			case E_USER_ERROR:
				$priority = self::ERROR;
				$exit_after = true;
				break;
			case E_WARNING:
			case E_USER_WARNING:
				$priority = self::WARN;
				break;
			case E_NOTICE:
			case E_USER_NOTICE:
				$priority = self::NOTICE;
				break;
			case E_STRICT:
				$priority = self::DEBUG;
				break;
			default:
				$message = "UNKNOWN ERROR TYPE " . $message;
				$priority = self::WTF;
		}
		$rel_file = static::getRelativePath($errfile, $this->path_root);
		$message = "$rel_file:$errline - $errstr";
		$this->process($priority, "$rel_file:$errline - $errstr");
		if ($exit_after)
			exit(2);
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
	 * Are we being run in a color-supported terminal?
	 *
	 * @return boolean
	 */
	public function isColorTerm()
	{
		return(isset($_SERVER['TERM']) && ( $_SERVER['TERM'] == "xterm-color" || $_SERVER['TERM'] == "xterm-256color" || ( isset($_SERVER['CLICOLOR']) && $_SERVER['CLICOLOR'] != 0 )));
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
		);
		if ($prefixes[$priority])
			$prefix = $prefixes[$priority] . "%n ";
		$args =(array) $args;
		foreach ($args as &$a) {
			if (is_array($a) || is_object($a))
				$a = var_export($a, true);
			elseif (is_bool($a))
				$a = ($a === true) ? "TRUE" : "FALSE";
		}
		$str = implode(", ", $args);
		$str = $this->cleanLogEntry($str);
		$this->output[] = $prefix . $str;
	}

	/**
	 * Clean up a log entry, make it SUPER KAWAII!!!!11 ^_^
	 *
	 * @param  string $str A single console entry
	 * @return string A cleaner looking version of $str
	 */
	private function cleanLogEntry($str)
	{
		$clean_me = array(
			// 'pattern' => 'replacement',
			'/array \([\s]*\)/i' => "array (EMPTY)",
		);
		$preg = array(
			"patterns" => array(),
			"replacements" => array(),
		);
		foreach ($clean_me as $p => $r) {
			$preg['patterns'][] = $p;
			$preg['replacements'][] = $r;
		}
		return preg_replace($preg['patterns'], $preg['replacements'], $str);
	}

	/**
	 * Outputs to file
	 *
	 * @return void
	 */
	private function displayToFile()
	{
		if (!$this->path_log)
			return;
		$fp = fopen($this->path_log, "a");
		$out = $this->output;
		array_unshift($out, "# " . date("r"));
		$out = $this->colorConvert($out, false);
		fwrite($fp, implode("\n", $out) . "\n");
		fclose($fp);
	}

	/**
	 * Outputs to screen
	 *
	 * @return void
	 */
	private function displayToScreen()
	{
		$out = implode("\n", $this->output);
		$out = $this->colorConvert($out);
		print $out . "\n";
	}

	/**
	 * Converts (or strips) color codes in output into ansi control codes.
	 *
	 * The applies only Console_Color is installed, otherwise
	 *
	 * @param  unknown $string  String to format
	 * @param  boolean $colored True to convert color codes, false to strip them. If Console_Color is not installed this will always be false
	 * @return mixed   Return description (if any) ...
	 */
	private function colorConvert($string, $colored = true)
	{
		if (!$this->isColorTerm() || !$colored)
			return preg_replace("/([^%]?)(%[kK0rR1gG2yY3bB4mM5pPcC6wW7FU8_9n])/", "$1", $string);
		$colors = $this->colorCode();
		foreach ($colors as $k => $v) {
			$string = str_replace($k, $v, $string);
		}
		return $string;
		//return Console_Color::convert($string, $colored);
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
