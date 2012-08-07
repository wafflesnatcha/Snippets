<?php
/**
 * Array functions
 *
 * @author    Scott Buchanan <buchanan.sc@gmail.com>
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version   r1 2012-08-07
 * @link      http://wafflesnatcha.github.com
 */

abstract class _Array
{
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
		return((int) array_intersect((array) $needle,(array) $haystack)) ? true : false;
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
		foreach ($arr as &$value) {
			if (is_string($value)) 
				$value = is_string($charlist) ? trim($value, $charlist) : trim($value);
		}
		return $arr;
	}
}
