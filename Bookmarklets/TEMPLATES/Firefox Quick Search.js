/**
 * Firefox Quick Search template
 * 
 * Add as a firefox bookmark and set the keyword. Then whenever you use that
 * keyword in the URL bar, it will go to a different URL depending on if you
 * added a search query after the keyword.
 *
 * Example (adding a suffix to the URL):
 * javascript:location='http://www.youtube.com/'+('%s'?'results?search_query=%s':'')
 * 
 * Example (two completely different URLs):
 * javascript:location=(('%s')?'https://developer.mozilla.org/search?q=%s':'http://www.mozilla.org/')
 */

javascript:location=''+('%s'?'':'')
javascript:location=(('%s')?'https://developer.mozilla.org/search?q=%s':'http://www.mozilla.org/')
