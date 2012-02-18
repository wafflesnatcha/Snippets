#! /usr/bin/ruby

# the open4 rubygem makes using the progressbar extremely simple... get it here
# http://rubygems.org/gems/open4



require "rubygems"
require "open4"

# Initial invocation of you progressbar
cocoaProgressString = '/Applications/CocoaDialog.app/Contents/MacOS/CocoaDialog progressbar --title "Your Title" --text "Initial Message text"'

pid, stdin, stdout, stderr = Open4::popen4 cocoaProgressString 
sleep 2

stdin.puts '10 update 1'
sleep 2

stdin.puts '20 update 2'
sleep 2

#don't wanna write all that
(3..10).each {|i| stdin.puts "#{i}0 update #{i}"; sleep 2; i+1}