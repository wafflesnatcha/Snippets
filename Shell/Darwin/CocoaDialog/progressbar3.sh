#!/bin/bash
res=$({
    sleep 3
    echo "That's all folks!"
} 2> >(CocoaDialog progressbar --indeterminate --title "My Program"))

echo "Got back: $res"
