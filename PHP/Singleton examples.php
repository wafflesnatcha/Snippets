<?php
require_once "Singleton.php";

class Foo extends Singleton {

	function bar() {
		echo " == function bar()";
		echo "\n    __CLASS__          : " . __CLASS__;
		echo "\n    get_called_class() : " . get_called_class();
		if(isset($this)) echo "\n    get_class(\$this)   : " . get_class($this);
		echo "\n";
	}
	
	static function other_bar() {
		echo " == static function other_bar()";
		echo "\n    __CLASS__          : " . __CLASS__;
		echo "\n    get_called_class() : " . get_called_class();
		if(isset($this)) echo "\n    get_class(\$this)   : " . get_class($this);
		echo "\n";
	}
}
echo 'Foo::bar()'; Foo::bar();
echo 'Foo::_bar()'; Foo::_bar();

echo 'Foo::other_bar()'; Foo::other_bar();
echo 'Foo::_other_bar()'; Foo::_other_bar();

$obj = Foo::getInstance();

echo '$obj->bar()'; $obj->bar();
echo '$obj->_bar()'; $obj->_bar();
echo '$obj::bar()'; $obj::bar();
echo '$obj::_bar()'; $obj::_bar();

echo '$obj->other_bar()'; $obj->other_bar();
echo '$obj->_other_bar()'; $obj->_other_bar();
echo '$obj::other_bar()'; $obj::other_bar();
echo '$obj::_other_bar()'; $obj::_other_bar();
