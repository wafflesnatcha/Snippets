#!/usr/bin/perl -w
use strict;

our $CD = "$ENV{HOME}/lib/CocoaDialog.app/Contents/MacOS/CocoaDialog";

my $rv = `$CD dropdown --title "Preferred OS" --no-newline \\
	---text "What is your favorite OS?" \\
	--items "Mac OS X" "GNU/Linux" "Windows" --button1 'That one!' \\
	--button2 Nevermind`;
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

