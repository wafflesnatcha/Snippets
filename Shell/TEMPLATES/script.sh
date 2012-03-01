#!/usr/bin/env bash
SCRIPT_NAME="$(basename "$0")"
SCRIPT_VERSION="0.0.1 (2012-02-28)"

usage() {
cat <<EOF
$SCRIPT_NAME $SCRIPT_VERSION
Description of this script.

Usage: ${0##*/} [options]

Options:
 -f, --flag            Some flag
 -v, --variable VALUE  Some variable
 -h, --help            Show this help
EOF
}
FAIL() { [[ $1 ]] && echo "$SCRIPT_NAME: $1" >&2; exit ${2:-1}; }

while (($#)); do
	case $1 in
        -h|--help) usage; exit 0 ;;
		-f|--flag) echo opt_flag=1 ;;
        -v|--variable) echo opt_variable=$2; shift ;;
		-*|--*) FAIL "unknown option ${1}" ;;
        *) break ;;
	esac
	shift
done
