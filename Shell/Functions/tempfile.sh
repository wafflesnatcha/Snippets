# usage: tempfile VARIABLE_NAME ...

tempfile() {
	for var in "$@"; do
		eval $var="$(mktemp -t "${0##*/}")"
		tempfile_files="$tempfile_files '${!var}'"
	done
	trap "rm -f $tempfile_files" EXIT
}

####
## Example:

tempfile temp1 temp2 temp3

echo "temp1=$temp1"
echo "temp2=$temp2"
echo "temp3=$temp3"
echo "but these files will be deleted as soon as this script ends..."
