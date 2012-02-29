#!/bin/bash
#
# Call this with the URL of a public dropbox photo gallery as the first
# argument, a destination directory as the second argument, and optionally
# give a size (thumbnail|large|extralarge|original) for the third argument
# (defaults to original)
#
# Initial version written 1st June 2010, by Andrew Scheller
#
# Added quoting (so it works if urls or paths contain spaces) on 10th July 2010
#
# Tweaked to use either wget or curl, 17th January 2011
#

# get binary locations
WGET=$(which wget)
CURL=$(which curl)
if [ -z "$WGET" ] && [ -z "$CURL" ]
then
  echo "Please install either wget or curl" >&2
  exit 1
fi

if [ -z "$1" ]
then
  echo "Required argument (gallery URL) not given"
  exit 1
fi
GALLERY_URL=$1
if [ -z "$2" ]
then
  echo "Required argument (destination dir) not given"
  exit 1
else
  if [ ! -d "$2" ]
  then
    echo "Destination dir '$2' doesn't exist"
    exit 1
  fi
fi
DESTDIR=$2
SIZE=original
if [ ! -z "$3" ]
then
  if [[ "$3" == "thumbnail" || "$3" == "large" || "$3" == "extralarge" || "$3" == "original" ]]
  then
    SIZE=$3
  else
    echo "Size must be one of (thumbnail|large|extralarge|original)"
    exit 1
  fi
fi

TEMP=$(mktemp)
if [ "$WGET" ]
then
  "$WGET" -q "$GALLERY_URL" -O "$TEMP"
elif [ "$CURL" ]
then
  "$CURL" "$GALLERY_URL" -o "$TEMP" -s
fi
if [ $? -ne 0 ]
then
  echo "Something went wrong! Couldn't download the gallery index page"
  rm "$TEMP"
  exit 1
fi
IFS='
'
FILENAMES=( $(grep "'filename': " "$TEMP" | cut -d"'" -f4) )
IMAGE_URLS=( $(grep "'$SIZE': " "$TEMP" | cut -d'"' -f2) )
rm "$TEMP"
TOTAL_FILENAMES=${#FILENAMES[@]}
TOTAL_IMAGES=${#IMAGE_URLS[@]}
if [ $TOTAL_FILENAMES -ne $TOTAL_IMAGES ]
then
  echo "Something went wrong! Got list of $TOTAL_FILENAMES filenames but $TOTAL_IMAGES images"
  exit 1
fi

for ((i=0;i<$TOTAL_IMAGES;i++))
do
  echo "Downloading ${FILENAMES[$i]} ($(($i + 1))/$TOTAL_IMAGES)"
  if [ "$WGET" ]
  then
    "$WGET" -q "${IMAGE_URLS[$i]}" -O "$DESTDIR/${FILENAMES[$i]}"
  elif [ "$CURL" ]
  then
    "$CURL" "${IMAGE_URLS[$i]}" -o "$DESTDIR/${FILENAMES[$i]}" -s
  fi
done
exit 0
