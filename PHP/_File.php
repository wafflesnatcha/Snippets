<?php
/**
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * + Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * + Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation and/or
 * other materials provided with the distribution.
 * + Neither the name of the <ORGANIZATION> nor the names of its contributors
 * may be used to endorse or promote products derived
 * from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author    Scott Buchanan <buchanan.sc@gmail.com>
 * @copyright 2011 Scott Buchanan
 * @license   http://www.opensource.org/licenses/bsd-license.php The BSD License
 * @version   SVN: $Id:$
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
	public static function getDirectoryContents($path)
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
	public static function getDirectoryFiles($path, $ext = null)
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
