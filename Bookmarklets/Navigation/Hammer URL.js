(function(p) {
	open('', '', p).document.write('<body id=1><nobr id=2></nobr><hr><nobr id=3></nobr><hr><a href="#"onclick="return!(c=t)">Force</a><script>function i(n){return d.getElementById(n)}function z(){c+=0.2;if(c>=t){c=0;e.location=u;r++}x()}function x(){s=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0||c/t>2/3?"fcc":c/t<1/3?"cfc":"ffc");i(2).innerHTML="Reloads: "+r;i(3).innerHTML="Time: "+m+":"+(s<10?"0"+s:s)}c=r=0;d=document;e=opener.top;u=prompt("URL",e.location.href);t=u?prompt("Seconds",60):0;setInterval("z()",200);if(!t){window.close()}</script></body>')
})('status=0,scrollbars=0,width=100,height=115,left=1,top=1')
