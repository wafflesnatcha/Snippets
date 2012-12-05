# Bookmarklets

A collection of bookmarklets, some are mine, others are not.

## Building a Bookmarklet

### Requirements:

* [uglifyjs](https://github.com/mishoo/UglifyJS/)
* Ruby or PHP must also be installed and available on the command line (for URL encoding)

### Building:

To build a bookmarklet from source, use `bookmarklet.sh` from the command line.

For example:

    bookmarklet.sh "Source/View Styles.js"

On Mac you can copy it straight to your clipboard with:

    bookmarklet.sh "Source/View Styles.js" | pbcopy
    

***Note:***  
>The URL encoding is a Safari thing (it's picky about quotes).
>Most other browsers will allow unencoded bookmarklets.