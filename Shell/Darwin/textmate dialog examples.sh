#!/usr/bin/env bash

# "$DIALOG_1"; exit
# "$DIALOG" help; exit
# for c in prototype nib alert defaults popup help images menu tooltip; do "$DIALOG" help "$c"; done; exit

# "$DIALOG" alert --alertStyle warning --title 'Delete File?' --body 'You cannot undo this action.' --button1 Delete --button2 Cancel

## Simple Notification Window

# "$DIALOG" -ac \
# 	-p '{ title = "title text"; summary = "summary text"; log = "log text"; }' \
# 	"$TM_SUPPORT_PATH/nibs/SimpleNotificationWindow.nib" \
# 	2>&1 &

# "$DIALOG" menu --items '({title = foo;}, {separator = 1;}, {header=1; title = bar;}, {title = baz;})'

# "$DIALOG" popup --suggestions '( { display = law; }, { display = laws; insert = "(${1:hello}, ${2:again})"; } )'

# "$DIALOG" prototype --register "{ SQL_New_Connection = { title = untitled; serverType = MySQL; hostName = localhost; userName = '$LOGNAME'; }; }"
# "$DIALOG" prototype --show SQL_New_Connection

# "$DIALOG" tooltip --html 'regular text' --transparent
