#!/bin/bash
# written by Kevin Hendricks 

# create a named pipe
rm -f /tmp/hpipe
mkfifo /tmp/hpipe

# create a background job which takes its input from the named pipe
CocoaDialog progressbar --indeterminate --title "My Program" --text "Please wait..." < /tmp/hpipe &

# associate file descriptor 3 with that pipe and send a character through the pipe
exec 3<> /tmp/hpipe
echo -n . >&3

# do all of your work here
sleep 3

# now turn off the progress bar by closing file descriptor 3
exec 3>&-

# wait for all background jobs to exit
wait
rm -f /tmp/hpipe
exit 0

