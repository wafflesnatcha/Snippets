# tempfile VARIABLE ...
# Generate a temporary file, storing its path in VARIABLE
# Automatically deletes the file when the current script/program ends
# 
# Example:
# $ tempfile temp1 temp2 temp3
# $ echo "temp1=$temp1"
# $ echo "temp2=$temp2"
# $ echo "temp3=$temp3"
# $ echo "but these files will be deleted as soon as this script ends..."
tempfile() {
	for var in "$@"; do
		eval $var="$(mktemp -t "${0##*/}")"
		tempfile_files="$tempfile_files '${!var}'"
	done
	trap "rm -f $tempfile_files" EXIT
}