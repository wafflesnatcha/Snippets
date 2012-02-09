(function () {
	if (window.__dlaudio_player_isSliding && window.__dlaudio_player_isSliding === true) {} else if (window.__dlaudio_display && window.__dlaudio_display.offsetWidth) {
		window.__dlaudio_close();
	} else {
		reg = new RegExp(/['"]([^'"]*?)\.(mp3|wav|mp4|wma|ogg|flac)['"]/mgi);
		m = [];
		max = 100;
		while ((g = reg.exec(document.body.innerHTML)) && m.length < max) {
			if (m.indexOf(unescape(g[1] + '.' + g[2])) == -1) m.push(unescape(g[1] + '.' + g[2]));
		} /**/
		if (m.length > 0) {
			e = window.__dlaudio_display = document.createElement('div');
			e.style.cssText = 'display:block;position:' + ((navigator.userAgent.toLowerCase().indexOf('msie') > -1 && parseFloat(navigator.appVersion) < 7) ? 'absolute' : 'fixed') + ';z-index:999;overflow:visible;left:-301px;top:0;height:100%;width:300px;background:#000;opacity:0.95;' + ((navigator.userAgent.toLowerCase().indexOf('msie') > -1 && parseFloat(navigator.appVersion) < 8) ? 'filter:alpha(opacity=95);' : '') + 'border:none;border-right:1px solid #259;font:11px/1.21 arial,helvetica,sans;';
			e.innerHTML = '<div style="color:#148;font-weight:bold;font:16px/1.21 arial,helveitca,sans;letter-spacing:0.2em;text-decoration:none;text-align:center;display:block;margin:5px 0;padding:0;">Audio</div>';
			for (y = 0; y < m.length; y++) {
				d = document.createElement('div');
				d._origFile = m[y];
				d.onselectstart = function () {
					return false;
				};
				d.onmousedown = function () {
					return false;
				};
				d.onclick = function () {
					if (window.__dlaudio_player && window.__dlaudio_player.parentNode) {
						window.__dlaudio_player.parentNode.removeChild(window.__dlaudio_player);
						window.__dlaudio_current.childNodes[0].style.display = 'none';
						window.__dlaudio_current.childNodes[1].style.display = 'none';
						window.__dlaudio_player = null;
						if (window.__dlaudio_current == this) {
							window.__dlaudio_current = null;
							return false;
						}
					}
					if (this._di && this._di === true) {
						return false;
					}
					if (!this._file) {
						i = document.createElement("a");
						i.setAttribute("href", this._origFile);
						document.body.appendChild(i);
						this._file = i.href;
						document.body.removeChild(i);
					}
					v = document.createElement("div");
					v.style.cssText = "display:block;width:300px;height:30px;position:absolute;left:0;bottom:0;border-top:1px solid #666;";
					v.innerHTML = "<embed style=\"display:block;width:300px;margin:0 auto;\" width=\"300\" height=\"30\" src=\"http://media-19.amoebaos.com/include/mpf2.swf?file=" + this._file + "\" bgcolor=\"111111\" flashvars=\"fontColor=BBBBBB&defaultText=" + this.childNodes[2].innerHTML + "\"><param name=\"flashvars\" value=\"fontColor=BBBBBB&defaultText=" + this.childNodes[2].innerHTML + "\" /><param name=\"bgcolor\" value=\"111111\" /></embed>";
					window.__dlaudio_player = v;
					window.__dlaudio_current = this;
					this.childNodes[1].style.display = 'inline';
					this._loader = new Image();
					this._loader.parent = this;
					this._loader._v = v;
					this._loader.onload = this._loader.onerror = function () {
						this.parent.childNodes[1].style.display = 'none';
						this.parent.childNodes[0].style.display = 'inline';
						this.parent.parentNode.appendChild(this._v);
					};
					this._loader.src = "";
					return false;
				};
				d.style.cssText = "font:11px/1.21 arial,helvetica,sans;font-weight:normal;text-decoration:none;color:#888;border:1px solid #000;border-width:1px 0;margin:0;padding:1px 0;position:relative;overflow:hidden;display:block;width:100%;height:1.2em;text-align:left;text-indent:20px;cursor:default;";
				d.onmouseover = function () {
					this.style.borderColor = '#259';
					this.style.background = '#333';
					this.style.color = '#FFF';
					this.style.paddingRight = '1px';
					this.style.overflow = 'visible';
				};
				d.onmouseout = function () {
					this.style.borderColor = '#000';
					this.style.background = 'none';
					this.style.color = '#888';
					this.style.paddingRight = '0';
					this.style.overflow = 'hidden';
				};
				d.innerHTML = "<span style=\"color:#37C;position:absolute;left:-15px;top:1px;display:none;\">♫</span><span style=\"color:#8FEF66;position:absolute;left:-15px;top:1px;display:none;\">...</span><span>" + m[y].replace(/\.[a-z]+$/mgi, '').substring(m[y].lastIndexOf('/') + 1, m[y].length).substring(0, 45) + "</span><a href=\"" + m[y] + "\" target=\"_blank\" style=\"text-indent:0;padding:8px 12px;margin:0;position:absolute;left:300px;top:-7px;background:#000;color:#8FEF66;border:none;opacity:85;cursor:pointer;text-decoration:none;font-weight:normal;z-index:999;\" onclick=\"window.open(this.href);return false;\" onmouseover=\"this.parentNode._di=true;\" onmouseout=\"this.parentNode._di=false;\">↓ " + m[y].substring(m[y].lastIndexOf('.') + 1, m[y].length).toUpperCase() + "</a>";
				e.appendChild(d);
			}
			document.body.appendChild(e);
			ec = document.createElement('span');
			ec.onmousedown = function () {
				return false;
			};
			ec.onclick = function () {
				window.__dlaudio_close();
			};
			ec.style.cssText = 'position:absolute;top:2px;right:2px;color:#999;background:#333;padding:0 0.4em;font-size:11px;font-weight:normal;cursor:pointer;';
			ec.innerHTML = '×';
			e.appendChild(ec);
			window.__dlaudio_player_isSliding = true;
			for (i = 1; i <= 25; i += 1) {
				window.setTimeout('window.__dlaudio_display.style.left="-' + ((Math.sin(Math.PI * (i / 25 + 1 / 2)) + 1) * 300 / 2) + 'px";' + (i == 25 ? 'window.__dlaudio_player_isSliding=null;' : ''), i * 18 + 150);
			}
			window.__dlaudio_close = function () {
				if (window.__dlaudio_player && window.__dlaudio_player.childNodes) {
					for (u = 0; u < window.__dlaudio_player.childNodes.length; u++) window.__dlaudio_player.removeChild(window.__dlaudio_player.childNodes[u]);
					window.__dlaudio_player.parentNode.removeChild(window.__dlaudio_player);
				}
				window.__dlaudio_player_isSliding = true;
				for (i = 1; i <= 25; i += 1) {
					window.setTimeout('window.__dlaudio_display.style.left="-' + (300 - (Math.sin(Math.PI * (i / 25 + 1 / 2)) + 1) * 300 / 2) + 'px";', i * 18 + 150);
				}
				window.setTimeout('window.__dlaudio_display.parentNode.removeChild(window.__dlaudio_display);window.__dlaudio_display=null;window.__dlaudio_current=null;window.__dlaudio_player=null;window.__dlaudio_player_isSliding=null;', 26 * 18 + 150);
			};
		} else {
			alert('No audio files were found.');
		}
	}
})();
