(*
-- Script.applescript
-- description
*)

property lib : load script POSIX path of (path to scripts folder) & "lib/lib.scpt"

on run argv
	my process(argv)
end run

on open argv
	my process(argv)
end open

on process(argv)



end process

