<?php
/**
 * String functions
 *
 * @author    Scott Buchanan
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version   r2 2013-01-24
 * @link      http://wafflesnatcha.github.com
 */
abstract class _String
{
    /**
	 * Generate a random string composed of [A-Z], [a-z], and [0-9].
	 * 
	 * @param  integer $length Length of the generated string.
	 * @return string
	 */
    public static function rand($length = 7)
    {
        $str = "";
        for ($i = 0; $i < $length; $i++) {
			switch (rand(1,3)) {
				case 1:
					$str.= rand(0, 9);
					break;
				case 2:
					$str.= chr(rand(65, 90));
					break;
				default:
					$str.= chr(rand(97, 122));
			}
        }
        return $str;
    }
}
