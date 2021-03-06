#!/bin/bash

CD="cocoaDialog"

rv=`$CD fileselect \
	--title "This is a fileselect"\
    --text "Choose the source file for the main controller" \
    --with-extensions .c .m .cpp`
if [ -n "$rv" ]; then  ### if $rv has a non-zero length
    echo "Main source: $rv"
else
    echo "No source file selected"
fi

rv=`$CD fileselect \
	--title "This is another fileselect"\
    --text "Pick some files and/or directories" \
    --with-directory $HOME/Documents/ \
    --select-directories \
    --select-multiple`
if [ -n "$rv" ]; then
    ### Loop over lines returned by fileselect
    echo -e "$rv" | while read file; do
        ### Check if it's a directory
        if [ -d "$file" ]; then
            echo "Directory: $file"
        ### Else a regular file
        elif [ -e "$file" ]; then
            echo "Regular file: $file"
        fi
    done
else
    echo "No files chosen"
fi
