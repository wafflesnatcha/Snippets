(function() {

try {
    var factory;
    if (typeof GearsFactory != 'undefined') {
        factory = new GearsFactory();
    } else {
        factory = new ActiveXObject('Gears.Factory');
    }

    var srv = factory.create('beta.localserver', '1.0');

} catch (e){
    alert('You need to install/enable Google Gears if you want this to work');
    return;
}

var store_name = document.location.href.toString().replace(/\W/g,'');

srv.removeStore(store_name);

})();