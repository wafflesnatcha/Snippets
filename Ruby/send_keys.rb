#!/usr/bin/env ruby
# send your ssh keys to a server for passwordless authentication...

if ARGV[0].nil?
    puts "Usage: send_keys.rb <hostname>"
    exit
end

cmd = "ssh #{ARGV[0]} 'test -d .ssh || mkdir -m 0700 .ssh ; cat >> .ssh/authorized_keys && chmod 0600 .ssh/*' < ~/.ssh/id_rsa.pub"

system cmd
