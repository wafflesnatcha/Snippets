#!/usr/bin/env bash
# Usage: temp_file NAME...
#
# Generate a temporary file, saving its path in variable NAME. Automatically
# deletes the file when the current script/program ends.
#
# Example:
# ```bash
#     temp_file temp1 temp2 temp3
#     echo "temp1=$temp1"
#     echo "temp2=$temp2"
#     echo "temp3=$temp3"
#     echo "but these files will be deleted as soon as this script ends..."
# ```
temp_file() {
	local _temp_file_var
	for _temp_file_var in "$@"; do
		eval $_temp_file_var=\"$(mktemp -t "${0##*/}")\"
		_temp_file_files="$_temp_file_files '${!_temp_file_var}'"
	done
	trap "rm -f $_temp_file_files" EXIT
}
