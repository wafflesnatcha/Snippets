if [ $UID -ne 0 ]; then
	echo "Superuser privileges are required to run this script."
	echo "e.g. \"sudo $0\""
	exit 1
fi