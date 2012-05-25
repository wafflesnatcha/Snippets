# temp_file VARIABLE_NAME...
# Generate a temporary file, saving its path in a variable named `VARIABLE_NAME`.
#
# Automatically deletes the file when the current script/program ends.
#
# Example:
# $ temp_file temp1 temp2 temp3
# $ echo "temp1=$temp1"
# $ echo "temp2=$temp2"
# $ echo "temp3=$temp3"
# $ echo "but these files will be deleted as soon as this script ends..."
temp_file() {
	local var
	for var in "$@"; do
		eval $var=\"$(mktemp -t "${0##*/}")\"
		temp_file__files="$temp_file__files '${!var}'"
	done
	trap "rm -f $temp_file__files" EXIT
}
