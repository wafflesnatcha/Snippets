# uniquefile PATH [SEPARATOR]
# like mktemp but supports a numbered sequence of files
#
# Makes sure file doesn't already exist in specified path. If it does, ".#" is
# appended to the end of the given filename, before the extension.
# (# being the next number in a sequence of files that already exist)
#
# Example: (assuming "path/to/file.txt" and "path/to/file.2.txt" already exist)
# $ filename=$(uniquefile "path/to/file.txt")
# $ echo $filename
# path/to/file.3.txt
#
# You can specify a separator using the second parameter (defaults to .)
# Example:
# $ filename=$(uniquefile "path/to/file.txt" " copy ")
# $ echo $filename
# path/to/file copy 3.txt
uniquefile() {
	local i=1
	local dirname="$(dirname "$1")"
	local basename="$(basename "$1")"
	local name="$basename"
	local ext=
	[ ! -d "$1" ] && { name="${basename%.*}"; ext=".${basename##*.}"; }
	local try="$name"
	while [ -e "$dirname/$try$ext" ]; do
		((i++)) && try="${name}${2:- }${i}"
	done
	echo "$dirname/$try$ext"
}
