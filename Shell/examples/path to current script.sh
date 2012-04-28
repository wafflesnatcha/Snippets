#!/usr/bin/env bash

SCRIPT_PATH="$(readlink -f "$0" 2>/dev/null || greadlink -f "$0")"
SCRIPT_FILE="${SCRIPT_PATH##*/}"
SCRIPT_FILENAME="${SCRIPT_FILE%.*}"
SCRIPT_FILEEXT="$(echo "$SCRIPT_FILE" | cut -d . -f2 -s)"
SCRIPT_DIR="$(dirname "${SCRIPT_PATH}")"

echo SCRIPT_PATH=$SCRIPT_PATH
echo SCRIPT_FILE=$SCRIPT_FILE
echo SCRIPT_FILENAME=$SCRIPT_FILENAME
echo SCRIPT_FILEEXT=$SCRIPT_FILEEXT
echo SCRIPT_DIR=$SCRIPT_DIR