#!/usr/bin/env bash
# Example of a y/n prompt with y as the default

read -en1 -p "Would you like to continue? [y/n] (y): "


if [[ ! "$REPLY" || "$REPLY" =~ Y|y ]]; then
	echo -e "\nreplied yes"
else
	echo -e "\nreplied no"
fi
