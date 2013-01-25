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
 * @author    Scott Buchanan
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version   r3 2012-10-04
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
	protected function __construct() {}

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
	 * Handles static calls to non-static methods in extending classes.
	 *
	 * For example, class Foo with non-static method bar() can be called
	 * statically as <code>Foo::_bar()</code>. Simply prepend the method name
	 * with an underscore. If the method name already starts with an underscore,
	 * then simply remove it.
	 *
	 * Triggers an error of level E_USER_ERROR if the method either cannot be
	 * called statically, or cannot be found.
	 *
	 * @param  string $name
	 * @param  mixed  $args
	 * @return mixed
	 * @link   http://php.net/manual/language.oop5.overloading.php#language.oop5.overloading.methods Method overloading
	 */
	public static function __callStatic($name, $args)
	{
		$object = static::getInstance();
		$method = "{$name[0]}" === "_" ? substr($name, 1) : "_$name";
		if (!method_exists($object, $method)) trigger_error("Cannot access method " . get_class($object) . "->$name statically", E_USER_ERROR);
		return call_user_func_array(array($object, $method), $args);
	}

	/**
	 * Handles non-static calls to static methods in extending classes.
	 *
	 * For example, class Foo with static method bar() can be called from the
	 * object context by prepending the method name with an underscore.
	 *
	 * For example:
	 * <code>
	 * $fooObj = Foo::getInstance();
	 * $fooObj->_bar();
	 * </code>
	 *
	 * Triggers an error of level E_USER_ERROR if the method either cannot be
	 * called statically, or cannot be found.
	 *
	 * @param  string $name
	 * @param  mixed  $args
	 * @return mixed
	 * @see    __callStatic
	 * @link   http://php.net/manual/language.oop5.overloading.php#language.oop5.overloading.methods Method overloading
	 */
	public function __call($name, $args)
	{
		$class = get_called_class();
		if (!class_exists($class)) trigger_error("Class $class doesn't exist", E_USER_ERROR);
		$method = $class . "::" . ("{$name[0]}" === "_" ? substr($name, 1) : "_$name");
		if (!is_callable($method)) trigger_error("$method cannot be called from the object context", E_USER_ERROR);
		return call_user_func_array($method, $args);
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
}
