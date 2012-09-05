# function_stdin
# Allows you to accept STDIN to a function call.
# 
# Example:
# fn() { echo "${@:-$(function_stdin)}"; }; fn "testing"; echo "testing" | fn
function_stdin() {
	local line oldIFS=$IFS
	IFS=$'\n'
	while read -r line; do
		echo -e "$line"
	done
	IFS=$oldIFS
}
export -f function_stdin
