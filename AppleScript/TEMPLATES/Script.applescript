(*
-- description
--
-- @requires lib.scpt
-- @author Scott Buchanan
-- @link http://wafflesnatcha.github.com
*)

property lib : load script POSIX path of (path to scripts folder) & "lib/lib.scpt"

on run argv
	return my process(argv)
end run

on open argv
	return my process(argv)
end open

on process(argv)



	return
end process
