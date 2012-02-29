#!/usr/bin/perl -w
use strict;

our $CD = "$ENV{HOME}/lib/cocoaDialog.app/Contents/MacOS/cocoaDialog";

my $rv = `$CD standard-inputbox --title "Your Name" --no-newline \\
    --informative-text "Enter your name"`;

my ($button_rv, $name) = split /\n/, $rv, 2;
if ($button_rv == 1) {
    print "Hello $name\n";
} elsif ($button_rv == 2) {
    print "No name given\n";
}
