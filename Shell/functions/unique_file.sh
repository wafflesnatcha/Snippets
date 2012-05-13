# unique_file PATH [SEPARATOR]
# like mktemp but supports a numbered sequence of files
#
# This function makes sure a file doesn't already exist in a specified path. If
# it does, a suitable alternative file name (that doesn't yet exist) is found.
# 
# By default, `.#` is appended to the end of the given filename, (before the 
# extension). And "#" will be the next number in a numbered sequence of files
# that already exist.
#
# Example: (assuming "path/to/file.txt" and "path/to/file.2.txt" already exist)
# $ filename=$(unique_file "path/to/file.txt")
# $ echo $filename
# path/to/file.3.txt
#
# You can specify a separator using the second parameter (defaults to .)
# Example:
# $ filename=$(unique_file "path/to/file.txt" " copy ")
# $ echo $filename
# path/to/file copy 3.txt
unique_file() {
	local i=1
	local dirname="$(dirname "$1")"
	local basename="$(basename "$1")"
	local name="$basename"
	local ext=

	# File has an extension
	if [[ ! -d "$1" && "$name" =~ ^..*\...* ]]; then
		name="${basename%.*}"
		ext=".${basename##*.}"
	fi

	local try="$name"
	while [ -e "$dirname/$try$ext" ]; do
		((i++))
		try="${name}${2:- }${i}"
	done

	echo "$dirname/$try$ext"
}
