<?php
/**
 * String functions
 *
 * @author    Scott Buchanan <buchanan.sc@gmail.com>
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version   r1 2012-08-19
 * @link      http://wafflesnatcha.github.com
 */
abstract class _String
{
    /**
	 * Generate a random string of uppercase letters and numbers
	 * 
	 * @param integer $length length of generated string
	 */
    public static function rand($length = 7)
    {
        $str = "";
        for ($i = 1; $i <= $length; $i++) {
            $str.= (rand(1, 2) === 1) ? chr(rand(65, 90)) : rand(0, 9);
        }
        return $str;
    }
}
