<?php
/**
 * Array functions
 *
 * @author    Scott Buchanan <buchanan.sc@gmail.com>
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version   r2 2012-08-19
 * @link      http://wafflesnatcha.github.com
 */
abstract class _Array
{
	/**
	 * Returns an array stripped of blank (and whitespace) values.
	 *
	 * @param array   $array
	 * @param boolean $recursive Recursively strip values
	 * @return array
	 */
	public static function compact($array, $recursive = false)
	{
		$arr = array();
		foreach ($array as $key => $value) {
			if (is_array($value)) {
				if ($recursive) $value = call_user_func(__METHOD__, $value, $recursive);
				if (count($value) > 0) $arr[$key] = $value;
			} else if (trim($value) != "") {
				$arr[$key] = $value;
			}
		}
		return $arr;
	}

	/**
	 * Search a multidimensional array/object for a key, and return the value.
	 *
	 * The key is actually a path into the array, separated by `->`. For example:
	 * <code>
	 * $arr = array(
	 *     "key1" => array(
	 *         "subkey2" => "apples"
	 *     )
	 * );
	 * var_dump(_Array::getValue($arr, "key1->subkey2"));
	 * </code>
	 *
	 * @param mixed   $array Array to search
	 * @param unknown $key   Index to search for
	 * @return mixed
	 */
	public static function getValue($array, $key)
	{
		$keys = explode("->", $key);
		foreach ($keys as $k) {
			if (is_array($array) && isset($array[$k])) {
				$array = $array[$k];
			} else if (is_object($array) && property_exists($array, $k)) {
				$array = $array->$k;
			} else {
				$array = null;
				break;
			}
		}
		return $array;
	}

	/**
	 * Mimics in_array(), but will match single values in a needle array.
	 *
	 * @param mixed $needle   If it's anything other than an array, this function behaves identical to in_array().
	 * @param array $haystack The array to search.
	 * @return boolean True if at least one value in $needle exists in $haystack.
	 * @see http://php.net/manual/function.in-array.php
	 */
	public static function in_array($needle, $haystack)
	{
		return ((int)array_intersect((array)$needle, (array)$haystack)) ? true : false;
	}

	/**
	 * Runs trim() on all string values of an array.
	 *
	 * @param string $array
	 * @param string $charlist
	 * @return array Returns the array with string values trimmed.
	 * @see http://php.net/manual/function.trim.php
	 */
	public static function trim($array, $charlist = null)
	{
		$arr = $array;
		foreach ($arr as & $value) {
			if (is_string($value)) $value = is_string($charlist) ? trim($value, $charlist) : trim($value);
		}
		return $arr;
	}
}

/** TESTS */
// var_dump(_Array::getValue(array("key1" => array("subkey2" => "apples")), "key1->subkey2"));
