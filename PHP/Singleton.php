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
 * Implementation of the Singleton design pattern.
 */
abstract class Singleton
{
	/**
	 * Prevents direct creation of object.
	 *
	 * @return void
	 */
	protected function __construct()
	{
	}

	/**
	 * Prevents to clone the instance.
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

	public function __call($name, $arguments)
	{
		if ("{$name[0]}" === "_") {
			$class = get_called_class();
			$method = $class . "::" . substr($name, 1);
			if (class_exists($class) && is_callable($method))
				return call_user_func_array($method, $arguments);
			trigger_error("Cannot access method {$callback[0]}::$name in object context", E_USER_ERROR);
		}
	}

}
