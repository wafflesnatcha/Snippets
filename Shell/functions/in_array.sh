#!/usr/bin/env bash
# Usage: in_array NEEDLE HAYSTACK...
#
# Example:
# $ haystack=("Mac" "NT" "Irix" "Linux")
# $ if in_array "Irix" "${haystack[@]}"; then echo "found"; fi
in_array() {
	local needle="$1"
	shift
	while (($#)); do
		[[ "$1" = "$needle" ]] && return 0
		shift
	done
	return 1
}
