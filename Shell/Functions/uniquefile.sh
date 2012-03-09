# uniquefile PATH [SEPARATOR]
# like mktemp but supports a numbered sequence of files
# 
# Makes sure file doesn't already exist in specified path. If it does, ".#" is 
# appended to the end of the given filename, before the extension.
# (# being the next number in a sequence of files that already exist)
# 
# Usage: (assuming "path/to/file.txt" and "path/to/file.2.txt" already exist)
# $ filename=$(uniquefile "path/to/file.txt")
# path/to/file.3.txt
# 
# You can specify a separator using the second parameter (defaults to .)
# Usage:
# $ filename=$(uniquefile "path/to/file.txt" " copy ")
# path/to/file copy 3.txt

uniquefile() {
	local i=1
	local dir="$(dirname "$1")"
	local file="$(basename "$1")"
	local name="${file%.*}"
	local ext="${file##*.}"
	local try="$name"
	while [[ -e "$dir/$try.$ext" ]]; do
		i=$(($i+1)); try="${name}${2:-.}${i}";
	done
	echo "$dir/$try.$ext"
}
