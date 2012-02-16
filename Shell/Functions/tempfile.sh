# usage: tempfile VARIABLE_NAME ...

tempfile() {
	for var in "$@"; do
		eval $var=$(mktemp -t "${0##*/}")
		tempfile_exit="$tempfile_exit rm -f '${!var}';"
	done	
	trap "{ $tempfile_exit }" EXIT
}