<?php
/**
 * Manipulate and format a CSS color value (as defined in
 * {@link http://www.w3.org/TR/css3-color CSS Color Module Level 3})
 *
 * <code>
 * $color = new CSSColor("#9f0ba4");
 * echo $color->hsl();
 * </code>
 *
 * @author    Scott Buchanan
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @version   r2 2012-09-05
 * @link      http://wafflesnatcha.github.com
 */

/*
$test = array (
  'hex' => '#9f0bff',
  'rgb' => 'rgb(159, 11, 255)',
  'rgb_p' => 'rgb(62%, 4%, 100%)',
  'rgba' => 'rgba(159, 11, 255, 1)',
  'rgba_p' => 'rgba(62%, 4%, 100%, 1)',
  'hsl' => 'hsl(276, 100%, 52%)',
  'hsla' => 'hsla(276, 100%, 52%, 1)',
);

foreach($test as $k => $v) {
	echo "$k\n";
	$color = new CSSColor($v);
	$result = $color->all();
	echo ($result == $test)? "true" : "false";
	print_r($result);
}
*/

class CSSColor
{
	/**
	 * @var float {0,1}
	 */
	public $red;

	/**
	 * @var float {0,1}
	 */
	public $green;

	/**
	 * @var float {0,1}
	 */
	public $blue;

	/**
	 * @var float {0,1}
	 */
	public $alpha = 1;

	/**
	 * Regex pattern definitions for each color type
	 * @var array
	 */
	protected $_patterns = array(
		'hex'    => '/#?([0-9a-f]{6}|[0-9a-f]{3})/i',
		'rgb'    => '/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i',
		'rgb_p'  => '/rgb\(\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*\)/i',
		'rgba'   => '/rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*((?:[0-9]?\.)?[0-9]+)\s*\)/i',
		'rgba_p' => '/rgba\(\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*,\s*((?:[0-9]?\.)?[0-9]+)\s*\)/i',
		'hsl'    => '/hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*\)/i',
		'hsla'   => '/hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*,\s*((?:[0-9]?\.)?[0-9]+)\s*\)/i',
	);

	/**
	 * @param string $input
	 */
	public function __construct($input = null)
	{
		if ($input) {
			$this->parse($input);
		}
	}

	/**
	 * Parse a color value from a string.
	 *
	 * @param string $input
	 * @return string|boolean The color pattern used {@link $_patterns}, or false on failure.
	 */
	public function parse($input)
	{
		foreach (array_keys($this->_patterns) as $f) {
			if (method_exists($this, $f) && ($value = call_user_func(array($this, $f), $input))) {
				return $f;
			}
		}
		return false;
	}

	/**
	 * Return an associative array with every possible color format.
	 *
	 * @return array
	 */
	public function all()
	{
		$result = array();
		foreach (array_keys($this->_patterns) as $f) {
			if (method_exists($this, $f))
				$result[$f] = call_user_func(array($this, $f));
		}
		return $result;
	}

	public function hex($str = null)
	{
		if ($str) {
			if (!preg_match($this->_patterns[__FUNCTION__], $str, $m))
				return false;
			$s = $m[1];
			list($this->red, $this->green, $this->blue) = (strlen($s) == 3) ? array($s[0] . $s[0], $s[1] . $s[1], $s[2] . $s[2]) : array($s[0] . $s[1], $s[2] . $s[3], $s[4] . $s[5]);
			foreach(array('red', 'green', 'blue') as $key) {
				$this->$key = (float) intval($this->$key, 16) / 255;
			}
		}

		$c = "";
		foreach(array($this->red, $this->green, $this->blue) as $v) {
			$c.= str_pad(base_convert(round($v * 255), 10, 16), 2, "0", STR_PAD_LEFT);
		}

		// Make it a 3-digit value if possible
		if($c[0] == $c[1] && $c[2] == $c[3] && $c[4] == $c[5])
			$c = $c[0] . $c[2] . $c[5];

		return "#" . $c;
	}

	public function rgb($str = null)
	{
		if ($str) {
			if (!preg_match($this->_patterns[__FUNCTION__], $str, $m))
				return false;
			foreach(array('red' => $m[1], 'green' => $m[2], 'blue' => $m[3]) as $key => $value) {
				$this->$key = (float) intval($value) / 255;
			}
		}
		return "rgb(" . round($this->red * 255) . ", " . round($this->green * 255) . ", " . round($this->blue * 255) . ")";
	}

	public function rgb_p($str = null)
	{
		if ($str) {
			if (!preg_match($this->_patterns[__FUNCTION__], $str, $m))
				return false;
			foreach(array('red' => $m[1], 'green' => $m[2], 'blue' => $m[3]) as $key => $value) {
				$this->$key = (float) intval($value) / 100;
			}
		}
		return "rgb(" . round($this->red * 100) . "%, " . round($this->green * 100) . "%, " . round($this->blue * 100) . "%)";
	}

	public function rgba($str = null)
	{
		if ($str) {
			if (!preg_match($this->_patterns[__FUNCTION__], $str, $m))
				return false;
			foreach(array('red' => $m[1], 'green' => $m[2], 'blue' => $m[3]) as $key => $value) {
				$this->$key = (float) intval($value) / 255;
			}
			$this->alpha = (float) floatval($m[4]);
		}
		return "rgba(" . round($this->red * 255) . ", " . round($this->green * 255) . ", " . round($this->blue * 255) . ", $this->alpha)";
	}

	public function rgba_p($str = null)
	{
		if ($str) {
			if (!preg_match($this->_patterns[__FUNCTION__], $str, $m))
				return false;
			foreach(array('red' => $m[1], 'green' => $m[2], 'blue' => $m[3]) as $key => $value) {
				$this->$key = (float) intval($value) / 100;
			}
			$this->alpha = (float) floatval($m[4]);
		}
		return "rgba(" . round($this->red * 100) . "%, " . round($this->green * 100) . "%, " . round($this->blue * 100) . "%, $this->alpha)";
	}

	public function hsl($str = null)
	{
		if ($str) {
			if (preg_match($this->_patterns[__FUNCTION__], $str, $m)) {
				$arr = $this->_hsl2rgb(intval($m[1]), floatval($m[2]) / 100, floatval($m[3]) / 100);
				foreach ($arr as &$v) {
					$v =(float) $v / 255;
				}
				list($this->red, $this->green, $this->blue) = $arr;
			} else
				return false;
		}
		$hsl = $this->_rgb2hsl(array($this->red, $this->green, $this->blue));
		return "hsl(" . round($hsl[0] * 360) . ", " . round($hsl[1] * 100) . "%, " . round($hsl[2] * 100) . "%)";
	}

	public function hsla($str = null)
	{
		if ($str) {
			if (preg_match($this->_patterns[__FUNCTION__], $str, $m)) {
				$this->alpha = $m[4];
				$arr = $this->_hsl2rgb(intval($m[1]), floatval($m[2]) / 100, floatval($m[3]) / 100);
				foreach ($arr as &$v) {
					$v =(float) $v / 255;
				}
				list($this->red, $this->green, $this->blue) = $arr;
			} else
				return false;
		}
		$hsl = $this->_rgb2hsl(array($this->red, $this->green, $this->blue));
		return "hsla(" . round($hsl[0] * 360) . ", " . round($hsl[1] * 100) . "%, " . round($hsl[2] * 100) . "%, " . $this->alpha . ")";
	}

	/**
	 * Convert RGB colors array into HSL array
	 *
	 * @param array $rgb RGB colors set, each color component with range 0 to 255
	 * @return array HSL set, each color component with range 0 to 1
	 */
	private function _rgb2hsl($rgb)
	{
		$r = ($rgb[0] * 255);
		$g = ($rgb[1] * 255);
		$b = ($rgb[2] * 255);

		$min = min($r, $g, $b);
		$max = max($r, $g, $b);
		$delta = $max - $min;

		$l = ($max + $min) / 510;

		if ($delta == 0) {
			$h = 0;
			$s = 0;
		} else {
			if (0.5 > $l)
				$s = $delta / ($max + $min);
			else
				$s = $delta / (510 - $max - $min);

			if ($max == $r)
				$h = ($g - $b) / (6.0 * $delta);
			elseif ($max == $g)
				$h = 1 / 3 + ($b - $r) / (6.0 * $delta);
			else
				$h = 2 / 3 + ($r - $g) / (6.0 * $delta);

			if ($h >= 0)
				$h += 1;
			if ($h >= 1)
				$h -= 1;
		}
		return array($h, $s, $l);
	}

	/**
	 * Color space conversion
	 *
	 * (H,S,L) -> (R,G,B)
	 *
	 * H ~ <0,360>
	 * S,L ~ <0,1>
	 * R,G,B ~ <0,255>
	 *
	 * @param array|int $hsl|$h
	 * @param float $s
	 * @param float $l
	 * @return array ($r,$g,$b)
	 * @link http://pastebin.com/YSjX7HCq
	 */
	private function _hsl2rgb($hsl, $s = null, $l = null)
	{
		if (is_array($hsl) && sizeof($hsl) == 3)
			list($h, $s, $l) = $hsl;
		else
			$h = $hsl;

		if ($s == 0) {
			$r = $g = $b = round($l * 255);
		} else {
			if ($l <= 0.5) {
				$m2 = $l * ($s + 1);
			} else {
				$m2 = $l + $s - $l * $s;
			}
			$m1 = $l * 2 - $m2;
			$hue = $h / 360;

			$r = $this->_hsl2rgb_hue2rgb($m1, $m2, $hue + 1 / 3);
			$g = $this->_hsl2rgb_hue2rgb($m1, $m2, $hue);
			$b = $this->_hsl2rgb_hue2rgb($m1, $m2, $hue - 1 / 3);
		}
		return array($r, $g, $b);
	}

	private function _hsl2rgb_hue2rgb($m1, $m2, $hue)
	{
		if ($hue < 0)
			$hue += 1;
		elseif ($hue > 1)
			$hue -= 1;
		if (6 * $hue < 1)
			$v = $m1 + ($m2 - $m1) * $hue * 6;
		elseif (2 * $hue < 1)
			$v = $m2;
		elseif (3 * $hue < 2)
			$v = $m1 + ($m2 - $m1) * (2 / 3 - $hue) * 6;
		else
			$v = $m1;
		return round(255 * $v);
	}
}

