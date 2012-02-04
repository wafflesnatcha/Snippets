#!/usr/bin/env perl
# Dumps all environment variables.

print "Content-type: text/html \n\n";
print "<html><HEAD><Title>Dump all environment variables</Title></Head><body>\n";
print "<h2>Dump of Environment variables</h2>\n";
print "<ul>\n";

foreach $key (sort(keys %ENV)) {
	print "<li><strong>", $key, "</strong> = <ul>", $ENV{$key}, "</ul>\n";
}

print "</ul></body></html>\n";

exit;