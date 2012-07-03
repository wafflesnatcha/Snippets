<?php
/**
 * Implementation of the Singleton design pattern.
 *
 * Example:
 * <code>
 * class Test extends Singleton {
 *     static $variable_foo = "variable_foo value";
 *     var $variable_bar = "variable_bar value";
 *
 *     public static function fooStatic() {
 *         echo static::$variable_foo . "\n";
 *     }
 *
 *     public function bar() {
 *         echo $this->variable_bar . "\n";
 *     }
 * }
 *
 * $obj = Test::getInstance();
 *
 * // Calling methods normally:
 * Test::fooStatic();
 * $obj::fooStatic();
 * $obj->bar();
 *
 * // Calling methods outside of their defined context:
 * Test::_bar();
 * $obj->_fooStatic();
 * $obj::_bar();
 * </code>
 * 
 * @author    Scott Buchanan <buchanan.sc@gmail.com>
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version   r1 2012-07-02
 * @link      http://wafflesnatcha.github.com
 */

abstract class Singleton
{
	/**
	 * Prevent direct creation of object.
	 *
	 * @return void
	 * @see    getInstance
	 */
	protected function __construct()
	{
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
	 * Returns (and creates if necessary) the only object instance of this class.
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
	 * Handles non-static calls to static methods in extending classes.
	 *
	 * For example, class Foo with static method bar() can be called from the object
	 * context by prepending the method name with an underscore. For example:
	 * <code>
	 * $fooObj = Foo::getInstance();
	 * $fooObj->_bar();
	 * </code>
	 *
	 * Triggers an error of level E_USER_ERROR if the method can't be called statically,
	 * or can't be found.
	 *
	 * @param  string $name
	 * @param  mixed  $arguments
	 * @return mixed
	 * @see    __callStatic
	 * @link   http://php.net/manual/language.oop5.overloading.php#language.oop5.overloading.methods Method overloading
	 */
	public function __call($name, $arguments)
	{
		if ("{$name[0]}" === "_") {
			$class = get_called_class();
			$method = $class . "::" . substr($name, 1);
			if (class_exists($class) && is_callable($method))
				return call_user_func_array($method, $arguments);
		}
		trigger_error("Cannot access method {$callback[0]}::$name in object context", E_USER_ERROR);
	}

}
