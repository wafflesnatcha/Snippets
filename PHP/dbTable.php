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
 * @author    Scott Buchanan
 * @copyright 2012 Scott Buchanan
 * @license   http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link      http://wafflesnatcha.github.com
 */

/**
 * A database abstraction class.
 *
 * Not to be instantiated directly, used mostly by other classes
 * extending this to gain easier direct database access.
 */
class dbTable
{
	/**
	 * MDB2 Database Object
	 * @var object 
	 * @access private
	 */
	var $_db = null;

	/**
	 * Name of represented table
	 * @var string 
	 * @access private
	 */
	var $_table = null;

	/**
	 * Name of the unique column in the table
	 * @var string 
	 * @access private
	 */
	var $_unique_key = "id";

	/**
	 * Column names
	 * @var array  
	 * @access private
	 */
	var $_columns = null;

	/**
	 * Raw data either from a load event or provided by another function
	 * @var array 
	 * @access public
	 */
	var $rawdata = null;

	/**
	 * False to allow {self::$_unique_key} to be non-numeric
	 * @var boolean
	 * @access private
	 */
	var $_keyNumeric = true;

	/**
	 * False to allow the {self::$_unique_key} to be less than zero
	 * @var boolean
	 * @access private
	 */
	var $_keyPositive = true;

	/**
	 * Saves the last error message
	 * @var unknown
	 * @access private
	 */
	var $_lastErrorMsg = null;

	/**
	 * Initialize the database portion
	 *
	 * @param object  &$db MDB2 database object
	 * @param string  $t   The table name
	 * @param boolean $u   Name of the unique column
	 * @return void   
	 * @access public 
	 */
	function __construct(&$db, $t = null, $u = null)
	{
		$this->_db         = $db;
		$this->_table      = $t !== null ? $t : $this->_table;
		$this->_unique_key = $u !== null ? $u : $this->_unique_key;
	}

	/**
	 * Used to catch access outside writing to private vars (which shouldn't be
	 * happening in production)
	 *
	 * @param string $name 
	 * @param mixed  $value
	 * @return mixed 
	 * @access public
	 */
	public function __set($name, $value)
	{
		//throw new Exception('Writing to inaccessible variable', 80011);
		return $this->$name = $value;
	}

	/**
	 * @param string $name
	 * @return mixed 
	 * @access public
	 */
	public function __get($name)
	{
		//throw new Exception('Accessing inaccessible variable', 80012);
		if ($this->name) 
			return $this->$name;
	}

	/**
	 * Calls {self::getColumns} and loads the result into {self::$_columns}
	 *
	 * @return void  
	 * @access public
	 */
	function loadColumns()
	{
		if ($this->_columns === null) 
			$this->_columns = $this->getColumns();
	}

	/**
     * Returns a list of column names for the table name stored in {self::$_table}
     *
     * @return array
     * @access public
     */
	function getColumns()
	{
		return $this->_db->listTableFields($this->_table);
	}

	/**
	 * Checks to see if a unique key has been set in {self::$_unique_key} and then
	 * calls {self::load} on this object.
	 *
	 * @return boolean Successful or not
	 * @access public 
	 */
	function reload()
	{
		$k = $this->_unique_key;
		if ($this->$k) 
			return $this->load($this->$k);
		else 
			return false;
	}

	/**
	 * Checks a variable to make sure is qualifies as a candidate for the
	 * table's unique key.
	 *
	 * @param mixed $id The unique key to validate
	 * @return boolean true is valid, false otherwise
	 * @access public 
	 */
	function checkKey($id)
	{
		if ($this->_keyNumeric) {
			if (!is_numeric($id) || ($this->_keyPositive && $id < 0)) 
				return false;
		}
		return true;
	}

	/**
	 * Loads a specified row from the table specified by the passed unique key
	 *
	 * @param mixed   $id The value of the row's unique key (as stored in {self::$_unique_key})
	 * @return boolean True on success, false on failure
	 * @access public 
	 */
	function load($id)
	{
		if (!$this->checkKey($id)) 
			return false;
		if ($id) {
			$result = $this->_db->query("SELECT * FROM " . $this->_table . " WHERE " . $this->_unique_key . "=" . $id);
			if (!$result || $this->queryError($result) || !$row = $result->fetchRow()) 
				return false;
			foreach ($row as $key => $value) 
				$this->$key = $value;
			return true;
		} else 
			return false;
	}

	/**
	 * Similar to {self::load}, except it uses passed values instead of
	 * loading them from the database.
	 *
	 * @param array  &$data An associative array of key=>value combinations to
	 *                       store as properties of this object.
	 * @return void  
	 * @access public
	 */
	function loadRawData(&$data)
	{
		$this->rawdata = $data;
		foreach ($data as $key => $value) {
			if (property_exists($this, $key)) 
				$this->$key = $value;
		}
	}

	/**
	 * Call abstractly with an array of data
	 *
	 * @param unknown &$data
	 * @return object  New dbTable object
	 * @access public 
	 */
	static

	function create(&$data)
	{
		if (!isset($this)) {
			$c = __CLASS__;
			$me = new $c;
		} else 
			$me = $this;
		$this->loadRawData($data);
		return $me;
	}

	/**
	 * Returns this objects properties as an associative array.
	 *
	 * @param array $fields Explicity defines the fields you wish 
	 *                               returned (false for all)
	 * @return array|boolean the objects properties (or false on failure)
	 * @access public       
	 */
	function asArray($fields = null)
	{
		$data = get_object_vars($this);
		if ($fields === null) 
			return $data;
		elseif (is_array($fields)) {
			$pdata = array();
			foreach ($fields as $f) {
				$pdata[$f] = $data[$f];
			}
			return $pdata;
		} else 
			return false;
	}

	/**
	 * Attempts to fill this objects parameters with fields found in the
	 * $_REQUEST server environment variable.
	 *
	 * @return void  
	 * @access public
	 */
	function update_from_request()
	{
		foreach ($_REQUEST as $key => $value) {
			if (property_exists($this, $key)) 
				$this->$key = stripslashes($value);
		}
	}

	/**
	 * Saves the object into the database.
	 *
	 * Calls {self::insert} or {self::update} depending on if the objects unique
	 * key property has been set.
	 *
	 * @return string|boolean Return description (if any) ...
	 * @access public        
	 */
	function save()
	{
		$this->loadColumns();
		$ukey         = $this->_unique_key;
		$vals         = get_object_vars($this);
		$valid_fields = array();
		foreach ($this->_columns as $c) {
			$valid_fields[$c] = $vals[$c];
		}
		unset($valid_fields[$ukey]);
		foreach ($valid_fields as &$v) {
			if (is_numeric($v)) 
				$v = (float) $v;
		}
		if ($this->$ukey > 0) 
			$res = $this->update($valid_fields);
		else {
			$res = $this->insert($valid_fields);
			$this->$ukey = $this->_db->lastInsertID($this->_table, $this->ukey);
		}
		$msg = $this->queryError($res);
		if ($msg !== false) 
			return $msg;
		else 
			return true;
	}

	/**
	 * Called by {self::save}, updates an already existing table row
	 *
	 * Long description (if any) ...
	 *
	 * @param array $values An associative array of values to store into the database
	 * @return object MDB2 Result Object - The result of an MDB2::autoExecute query
	 * @access public 
	 */
	function update($values)
	{
		$evals = array();
		$ukey = $this->_unique_key;
		return $this->_db->autoExecute($this->_table, $values, MDB2_AUTOQUERY_UPDATE, '[' . $ukey . '] = ' . $this->$ukey);
	}

	/**
	 * Called by {self::save}, inserts a new row into the table
	 *
	 * @param array  $values An associative array of values ([column] => [value]) to insert as a new row into the table
	 * @return object MDB2 Result Object - The result of an MDB2::autoExecute query
	 * @access public
	 */
	function insert($values)
	{
		$this->id = $this->_db->getBeforeID($this->_table);
		// remove any values explicitly set to null for INSERT commands
		foreach ($values as $key => $val) {
			if ($val === null) 
				unset($values[$key]);
		}
		return $this->_db->autoExecute($this->_table, $values, MDB2_AUTOQUERY_INSERT);
	}

	/**
	 * Checks whether a result object contains an error
	 *
	 * @param object  $res
	 * @param string  $extra
	 * @return string|boolean Returns the error message on true, or false if no error exists
	 * @access public 
	 */
	function queryError($res, $extra = null)
	{
		if (PEAR::isError($res)) {
			$msg = $res->getMessage() . ($extra ? ": " . $extra : "");
			return $msg;
		}
		return false;
	}

	/**
	 * Returns all table rows as an array of objects.
	 * 
	 * Can be called statically.
	 *
	 * @param object  &$db   The MDB2 database
	 * @param string $class The class to instantiate with result objects
	 * @param string $table Table name
	 * @param string $u     Column name of the tables primary key, will index the result array by this field
	 * @param string  $extra Adds this to the end of the sql SELECT query
	 * @return array An associative array of objects indexed by the key provided in $u
	 * @access public 
	 */
	function fetchAllTableRows(&$db, $class, $table, $u = null, $extra = null)
	{
		$sql = "SELECT * FROM [$table] " . $extra;
		$res = $db->queryAll($sql);
		if (PEAR::isError($res)) {
			die($res->getMessage() . " [$sql]");
		}
		$rows = array();
		foreach ($res as $row) {
			$r = new $class($row);
			if ($u) 
				$rows[$row[$u]] = $r;
			else 
				$rows[] = $r;
		}
		return $rows;
	}

	/**
	 * Alias to simplify {self::fetchAllTableRows}
	 *
	 * @param string $table Table name
	 * @param string $class Class name
	 * @return array An array of $class objects
	 * @access public 
	 */
	function getAll($table, $class)
	{
		return self::fetchAllTableRows(Bom::$_db, $class, $table);
	}

	/**
	 * Sets the error message in the event of a database error
	 *
	 * @param string $msg The error message
	 * @param string $code An optional error code for your reference
	 * @return void   
	 * @access public 
	 */
	function setError($msg, $code = null)
	{
		$this->_lastErrorMsg = $msg;
	}

	/**
	 * Returns the most recent error message
	 *
	 * @return string The last error message OR null if none exists
	 * @access public 
	 */
	function getErrorMsg()
	{
		return $this->_lastErrorMsg;
	}

	/**
	 * Retrieve the value of a variable
	 *
	 * @param string $var Variable name
	 * @return mixed Resulting value
	 * @access public 
	 */
	function get($var)
	{
		if (isset($this) && isset($this->$var)) 
			return $this->$var;
	}
}
?>