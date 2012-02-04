/*
 * File:        event-loader.js
 * CVS:         $Id$
 * Description: Load up Rule
 * Author:			Allan Jardine
 * Created:		  25-8-07
 * Modified:		$Date$ by $Author$
 * Language:		JavaScript
 * Project:		  Event
 * 
 * Copyright 2007-2010 Allan Jardine. All rights reserved.
 * 
 */


/*
 * If visual event is already defined then we can toggle the display - giving the effect of
 * starting it up and shutting it down when using the loader. Note it's preferable to do this in
 * the bookmarklet code (and is now - but is it for backwards compatability)
 */
if ( typeof VisualEvent != 'undefined' )
{
	if ( document.getElementById('Event_display') )
	{
		VisualEvent.fnClose();
	}
	else
	{
		VisualEvent.fnInit();
	}
}


if ( typeof EventLoader == 'undefined' )
{

/*
 * Object:  EventLoader
 * Purpose:	EventLoader constructor
 * Returns:	-
 */
var EventLoader = {
	/*
	 * Variable: bLoadingComplete
	 * Purpose:	 Inidicate if the loading is finished or not
	 */
	bLoadingComplete: false,
	
	/*
	 * Variable: toInfo
	 * Purpose:  Timeout var for the info
	 */
	toInfo: false,


	/*
	 * Function: EventLoader.fnLoadFile
	 * Purpose:  Load a new file into the DOM
	 * Returns:  -
	 * Inputs:   
	 *  string:sFile - file to load 
	 *  string:sType - type of file 'css' or 'js'
	 * Notes:    -
	 */
	fnLoadFile: function ( sFile, sType )
	{
		var nElement;
		
		if ( sType == 'css' )
		{   
			nElement = document.createElement('link');
			nElement.type = 'text/css';
			nElement.rel = 'stylesheet';
			nElement.href = sFile;
			nElement.media = 'screen';
			document.getElementsByTagName('head')[0].appendChild( nElement );
		}
		else if ( sType == 'image' )
		{
			var imImage = new Image( 1, 1 );
			imImage.src = sFile;
		}
		else
		{
			nElement = document.createElement( 'script' );
			nElement.setAttribute( 'language', 'JavaScript' );
			nElement.setAttribute( 'src', sFile );
			document.body.appendChild( nElement );
		}
	},
	
	
	/*
	 * Function: EventLoader.fnPollReady
	 * Purpose:  Wait for everything to be available
	 * Returns:  -
	 * Inputs:   -
	 * Notes:    -
	 */
	fnPollReady: function ( sFile, sType )
	{
		if ( typeof VisualEvent == 'object' &&
		 		 typeof VisEventSyntaxHighlighter == 'object' )
		{
		  VisualEvent.fnInit();
			this.fnComplete();
		}
		else
		{
			setTimeout( function() { EventLoader.fnPollReady(); }, 100 );
		}	
	},
	
	
	/*
	 * Function: EventLoader.fnComplete
	 * Purpose:  Loading complete
	 * Returns:  -
	 * Inputs:   -
	 * Notes:    -
	 */
	fnComplete: function ()
	{
		this.bLoadingComplete = true;
		var nInfo = document.getElementById('EventLoading');
		nInfo.innerHTML = '<span class="Event_header">Visual Event</span> (v.10) - by Allan Jardine<br>'+
			'Information about events assigned on this page.<br>'+
			'Press escape to quit. Note that jQuery, jQuery live, YUI 2,<br>'+
			'MooTools, Prototype, JAK and Glow are currently supported<br>'+
			'along with DOM level 0 events.<br>'+
			'<div><a href="http://www.sprymedia.co.uk/article/Visual+Event" target="_blank">'+
			'Click here for further information</a></div>'
		
		EventLoader.toInfo = setTimeout( function() {
			document.body.removeChild( nInfo );
		}, 3000 );
		
		jQuery(nInfo).mouseover( function() {
			clearTimeout( EventLoader.toInfo );
		} );
		
		jQuery(nInfo).mouseout( function() {
			EventLoader.toInfo = setTimeout( function() {
				document.body.removeChild( nInfo );
			}, 3000 );
		} );
	},
	
	
	/*
	 * Function: EventLoader.fnLoad
	 * Purpose:  Start the loading
	 * Returns:  -
	 * Inputs:   -
	 * Notes:    -
	 */
	fnLoad: function ()
	{
		/* Check to see if already loaded */
		if ( this.bLoadingComplete == true )
		{
			return 0;
		}
		
		var nLoading = document.createElement( 'div' );
		nLoading.style.position = 'absolute';
		nLoading.style.top = '0';
		nLoading.style.left = '0';
		nLoading.style.color = 'white';
		nLoading.style.padding = '5px 10px';
		nLoading.style.fontSize = '11px';
		nLoading.style.fontFamily = '"Lucida Grande", Verdana, Arial, Helvetica, sans-serif';
		nLoading.style.zIndex = '55999';
		nLoading.style.backgroundColor = '#a2392d';
		nLoading.setAttribute( 'id', 'EventLoading' );
		nLoading.appendChild( document.createTextNode( 'Loading Visual Event...' ) );
		
		document.getElementsByTagName('body')[0].insertBefore( 
			nLoading, document.body.childNodes[0] );
		
		if ( typeof VisualEvent == 'object' )
		{
			EventLoader.fnPollReady();
		}
		else
		{
			setTimeout( function () { EventLoader.fnPollReady(); }, 1000 );
		}
		
		/* Deploy */
		EventLoader.fnLoadFile( 'http://www.sprymedia.co.uk/design/event/media-0.10/css/event.css',        'css' );
		
		if ( typeof jQuery == 'undefined' )
		{
			EventLoader.jQueryPreLoaded = false;
			EventLoader.fnLoadFile( 'http://www.sprymedia.co.uk/design/event/media-0.10/js/event-complete-jquery.js', 'js' );
		}
		else
		{
			EventLoader.jQueryPreLoaded = true;
			EventLoader.fnLoadFile( 'http://www.sprymedia.co.uk/design/event/media-0.10/js/event-complete.js', 'js' );
		}
		
		/* Localhost testing */
		//var sAddress = "192.168.1.72";
		//EventLoader.fnLoadFile( 'http://'+sAddress+'/design/event/media/css/event.css', 'css' );
		//EventLoader.fnLoadFile( 'http://'+sAddress+'/design/event/media/css/shCore.css', 'css' );
		//EventLoader.fnLoadFile( 'http://'+sAddress+'/design/event/media/css/shThemeEvent.css', 'css' );
		//
		//if ( typeof jQuery == 'undefined' )
		//{
		//	EventLoader.fnLoadFile( 'http://'+sAddress+'/design/event/media/js/jquery.js', 'js' );
		//}
		//EventLoader.fnLoadFile( 'http://'+sAddress+'/design/event/media/js/shCore.js', 'js' );
		//EventLoader.fnLoadFile( 'http://'+sAddress+'/design/event/media/js/shBrushJScript.js', 'js' );
		//EventLoader.fnLoadFile( 'http://'+sAddress+'/design/event/media/js/event.js', 'js' );
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation - poll until all the required objects are available and 
 *   then initalise Event Control.
 */
EventLoader.fnLoad();


};