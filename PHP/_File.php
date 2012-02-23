<?php
/**
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
 * @version   1.0.0 2012-02-22
 */

/**
 * File system functions
 */
abstract class _File
{
	/**
	 * List directory contents
	 *
	 * @param  string $path Path to look in
	 * @return array  List of file/folder names
	 */
	public static function getDirectoryContents($path = ".")
	{
		$files = array();
		if ($handle = opendir($path)) {
			while ($filename = readdir($handle)) {
				if ($filename != "." && $filename != "..") {
					$files[] = $filename;
				}
			}
			closedir($handle);
		}
		return $files;
	}

	/**
	 * Get a list of files from a directory
	 *
	 * Same as {self::getDirectoryContents()} but returns only real files
	 *
	 * @param  string $path Path to look in
	 * @param  string $ext  Limit to files with this file extension
	 * @return array  List of file names
	 */
	public static function getDirectoryFiles($path = ".", $ext = null)
	{
		$files = array();
		if ($handle = opendir($path)) {
			while ($filename = readdir($handle)) {
				$file = $path . "/" . $filename;
				if (is_file($file) && (!$ext || $ext == substr(strrchr($file, "."), 1))) {
					$files[] = $filename;
				}
			}
			closedir($handle);
		}
		return $files;
	}

	/**
	 * Return the resulting output of an included PHP file
	 *
	 * @param  string       $filename Path to file
	 * @return string|false Returns false on failure
	 */
	public static function getIncludeContents($filename)
	{
		if (!is_file($filename))
			return false;
		ob_start();
		include $filename;
		$contents = ob_get_contents();
		ob_end_clean();
		return $contents;
	}

	/**
	 * The opposite of realpath()
	 *
	 * @param  string $path      Path to relativize
	 * @param  string $compareTo What to relativize $path against
	 * @return string The $path relative to $compareTo
	 * @link   http://us3.php.net/manual/en/function.realpath.php#97885
	 */
	public static function getRelativePath($path, $compareTo)
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
