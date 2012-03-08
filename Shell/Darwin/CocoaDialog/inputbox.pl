#!/usr/bin/perl -w
use strict;

our $CD = "cocoaDialog";

my $rv = `$CD inputbox --title "Search" --no-newline \\
    --informative-text "Enter your search term" \\
    --text "foobar" \\
    --button1 "Search" --button2 "Search all" \\
    --width 600`;

my ($button_rv, $term) = split /\n/, $rv, 2;
if ($button_rv == 1) {
    print "Search for '$term'\n";
} elsif ($button_rv == 2) {
    print "Search all files for '$term'\n";
}
