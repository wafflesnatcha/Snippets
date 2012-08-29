# TinyURL URL
# Shorten a URL using the TinyURL.com URL Shortener service.
TinyURL() {
	curl -qsSL "http://tinyurl.com/create.php?url=$(echo "$1" | ruby -pe '$_.gsub!(/([^a-zA-Z0-9_\.\-]+)/n) { "%" + $1.unpack("H2" * $1.size).join("%").upcase }')" | 
	perl -pe 'BEGIN{undef $/;} s/.*href=["'\'']?(http:\/\/tinyurl.com\/[\w]+).*/$1/smg'
}