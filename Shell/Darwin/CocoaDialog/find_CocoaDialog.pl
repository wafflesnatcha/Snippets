#!/usr/bin/perl -w
use strict;

our $COCOA_DIALOG = undef;
for my $path (('/Applications', "$ENV{HOME}/Applications", "$ENV{HOME}/bin", "$ENV{HOME}/lib")) {
	if (-d "$path/CocoaDialog.app") {
	    $COCOA_DIALOG = "$path/CocoaDialog.app/Contents/MacOS/CocoaDialog";
	    last;
	}
}
unless (defined $COCOA_DIALOG) {
	die "Could not find CocoaDialog.app";
}