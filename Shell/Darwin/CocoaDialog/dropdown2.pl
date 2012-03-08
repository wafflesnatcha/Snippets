#!/usr/bin/perl -w
use strict;

our $CD = "$ENV{HOME}/lib/CocoaDialog.app/Contents/MacOS/CocoaDialog";

my $rv = `$CD standard-dropdown --title "Copression Type" --no-newline \\
	--items "zip" "7z" "rar" --exit-onchange`;
my ($button, $item) = split /\n/, $rv;

if ($button == 1) {
    print "User chose: ";
	if ($item == 0) {
		print "OS X, obviously\n";
	} elsif ($item == 1) {
		print "GNU/Linux, a fine choice\n";
	} elsif ($item == 2) {
		print "Windows?!??!?\n";
	}
} else {
    print "User canceled\n";
}

