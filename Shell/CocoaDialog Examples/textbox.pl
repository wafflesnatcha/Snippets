#!/usr/bin/perl -w
use strict;

our $CD = "$ENV{HOME}/bin/Darwin/CocoaDialog.app/Contents/MacOS/CocoaDialog";

my $rv;

### Non-editable example
if (-e "COPYING") {
    $rv = `$CD textbox --title "License" --no-newline \\
        --informative-text "Do you agree with the terms of this license?" \\
        --text-from-file COPYING --button1 Ok --button2 Cancel`;
} else {
    $rv = `$CD textbox --title "License" --no-newline \\
        --informative-text "Do you agree with the terms of this license?" \\
        --text "This is the text of the license...." \\
        --button1 Ok --button2 Cancel`;
}
if ($rv == 1) {
    print "User agrees\n";
} else {
    print "User canceled\n";
}

### Editable example
$rv = `$CD textbox --title "Tell me a story" \\
    --informative-text "Write up a story..." \\
    --button1 "Echo" \\
    --button2 "Cancel" \\
    --text "Whatever you want" \\
    --selected \\
    --scroll-top top \\
    --editable`;
# First line is the button value, the rest is the textbox
my ($button_rv, $text) = split /\n/, $rv, 2;
if ($button_rv == 1) {
    print $text;
} elsif ($button_rv == 2) {
    print "User hit cancel\n";
}

