#!/usr/bin/env bash

# Emulates (GNU) realpath -f
# http://stackoverflow.com/questions/1055671/how-can-i-get-the-behavior-of-gnus-readlink-f-on-a-mac#1116890

target="$@"
cd "$(dirname "$target")" 2>&1 1>/dev/null || exit
target="$(basename "$target")"

while [ -L "$target" ]; do
    target="$(readlink "$target")"
    cd "$(dirname "$target")" 2>&1 1>/dev/null || exit
    target="$(basename "$target")"
done

echo "$(pwd -P)/$target"

