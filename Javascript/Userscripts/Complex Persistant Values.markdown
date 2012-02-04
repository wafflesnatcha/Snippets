This code allows you to persistently store complex objects, rather than just simple types like strings that GM_set and GM_get support.
Because of problems with long integers, it also translates integers into strings and back.

<pre class='sample'>
function Settingsobject(){
  this.prefix="";
  this.default={};
}
Settingsobject.prototype.set=function(name, value){
  if(typeof value == "boolean")
    value = value ? "{b}1" : "{b}0";
  else if(typeof value == "string")
    value = "{s}" + value;
  else if(typeof value == "number")
    value = "{n}" + value;
  else
    value = "{o}" + value.toSource();
  GM_setValue(this.prefix+""+name, value);
}
Settingsobject.prototype.get=function(name){
  var value=GM_getValue(this.prefix+""+name, this.default[name] || "{b}0")
  if(!value.indexOf)
    return value;
  if(value.indexOf("{o}")==0){
    try{
      return eval("("+value.substr(3)+")");
    }catch(e){
      GM_log("Error while calling variable "+name+" while translating into an object: \n\n"+e+"\n\ncode:\n"+value.substr(3))
      return false;
    }
  }
  if(value.indexOf("{b}")==0)
    return !!parseInt(value.substr(3));
  if(value.indexOf("{n}")==0)
    return parseFloat(value.substr(3));
  if(value.indexOf("{s}")==0)
    return value.substr(3);
  return value;
}
Settingsobject.prototype.register=function(name, defaultvalue){
  this.default[name]=defaultvalue;
  return true;
}
</pre>

Example usage:

<pre class='sample'>
var globalSettings=new Settingsobject();
globalSettings.prefix="global.";
</pre>

The prefix is good for separating between accounts.

<pre class='sample'>
globalSettings.register("x", 0);
globalSettings.set("x",1);
</pre>

You do not have to register a variable, but so you can set a default value and you have an overview over all variables in your Settings.default object.