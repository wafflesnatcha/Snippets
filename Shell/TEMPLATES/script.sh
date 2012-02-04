#!/usr/bin/env bash
SCRIPT_NAME="$(basename "$0")"
SCRIPT_VERSION="0.0.1 (2012-01-26)"
SCRIPT_GETOPT_SHORT="hv"
SCRIPT_GETOPT_LONG="help,variable"

usage() {
cat <<EOF
$SCRIPT_NAME $SCRIPT_VERSION
Description of this script.

Usage: ${0##*/} [options]

Options:
 -v, --variable  Some variable
 -h, --help      Show this help
EOF
}
FAIL() { [[ $1 ]] && echo "$SCRIPT_NAME: $1" >&2; exit ${2:-1}; }

ARGS=$(getopt -s bash -o "$SCRIPT_GETOPT_SHORT" -l "$SCRIPT_GETOPT_LONG" -n "$SCRIPT_NAME" -- "$@") || exit
eval set -- "$ARGS"

while true; do
	case $1 in
		-h|--help) usage; exit 0 ;;
		-v|--variable) opt_variable=1 ;;
		*) shift; break ;;
	esac
	shift
done
