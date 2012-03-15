#!/usr/bin/env bash

# "$DIALOG_1"; exit

# "$DIALOG" help
# "$DIALOG" help prototype
# "$DIALOG" help nib
# "$DIALOG" help alert
# "$DIALOG" help defaults
# "$DIALOG" help popup
# "$DIALOG" help help
# "$DIALOG" help images
# "$DIALOG" help menu
# "$DIALOG" help tooltip

# "$DIALOG" alert --alertStyle warning --title 'Delete File?' --body 'You cannot undo this action.' --button1 Delete --button2 Cancel

"$DIALOG" -ac \
	-p '{ title = "title text"; summary = "summary text"; log = "log text"; }' \
	"$TM_SUPPORT_PATH/nibs/SimpleNotificationWindow.nib" \
	2>&1 &

# "$DIALOG" nib --load "$TM_SUPPORT_PATH/nibs/SimpleNotificationWindow.nib"
# "$DIALOG" nib --update «token» [«options»]
# "$DIALOG" nib --wait «token»
# "$DIALOG" nib --dispose «token»
# "$DIALOG" nib --list

# "$DIALOG" menu --items '({title = foo;}, {separator = 1;}, {header=1; title = bar;}, {title = baz;})'

# "$DIALOG" popup --suggestions '( { display = law; }, { display = laws; insert = "(${1:hello}, ${2:again})"; } )'

# "$DIALOG" prototype --register "{ SQL_New_Connection = { title = untitled; serverType = MySQL; hostName = localhost; userName = '$LOGNAME'; }; }"
# "$DIALOG" prototype --show SQL_New_Connection

# "$DIALOG" tooltip --html 'regular text' --transparent