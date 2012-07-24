#!/usr/bin/python

import sys
from AppKit import *

def main():
    app = NSApplication.sharedApplication()
    imgpath = sys.argv[1].decode('utf-8')
    x = float(sys.argv[2])
    y = float(sys.argv[3])
    img =  NSImage.alloc().initWithContentsOfFile_(imgpath)
    if not img:
        print "Error: Could not load image."
        sys.exit()
    point = NSMakePoint(x, y)
    img.lockFocus()
    color = NSReadPixel(point)
    img.unlockFocus()
    print color

if __name__ == '__main__':
    main()