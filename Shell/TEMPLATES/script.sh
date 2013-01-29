#!/usr/bin/env bash
# `script.sh` by Scott Buchanan <http://wafflesnatcha.github.com>
SCRIPT_NAME="$(basename "$0")"
SCRIPT_VERSION="r0 2013-01-01"

usage() { cat <<EOF
$SCRIPT_NAME $SCRIPT_VERSION
Description of this script.

Usage: ${0##*/} [OPTION]...

Options:
 -f, --flag            Some flag
 -v, --variable VALUE  Some variable
 -h, --help            Show this help
EOF
}

ERROR() { [[ $1 ]] && echo "$SCRIPT_NAME: $1" 1>&2; [[ $2 > -1 ]] && exit $2; }

while (($#)); do
	case $1 in
		-f|--flag)
			opt_flag=1 ;;
		-v*|--variable)
			[[ $1 =~ ^\-[a-z].+$ ]] && opt_variable="${1:2}" || { opt_variable=$2; shift; }
			;;

		-h|--help) usage; exit 0 ;;
		--) shift; break ;;
		-*|--*) ERROR "unknown option ${1}" 1 ;;
		*) break ;;
	esac
	shift
done
