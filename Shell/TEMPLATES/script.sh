#!/usr/bin/env bash
# `script.sh` by Scott Buchanan <buchanan.sc@gmail.com> http://wafflesnatcha.github.com
SCRIPT_NAME="$(basename "$0")"
SCRIPT_VERSION="r0 2012-02-28"

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
		-h|--help)
			usage; exit 0 ;;
		-f|--flag)
			opt_flag=1 ;;
		-v|--variable)
			opt_variable=$2; shift ;;

		--) shift; break ;;
		-*|--*) ERROR "unknown option ${1}" 1 ;;
		*) break ;;
	esac
	shift
done
