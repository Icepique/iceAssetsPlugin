/*
Author: Ruslanas Balčiūnas
http://bilty.googlecode.com
*/

function bitlyDataHandler() {
    // .. void
}

bitlyDataHandler.prototype.proccess = function(data) {
    if( data.statusCode == 'OK') {
        this.onSuccess( data.results);
    } else {
        this.onError( data.errorCode, data.errorMessage);
    }
    return true;
};

bitlyDataHandler.prototype.onSuccess = function(data) {
    try {
        console.info(data);
    } catch(e) {
        // .. ignore
    }
};

bitlyDataHandler.prototype.onError = function(code, message) {
    // break if firebug enabled
    try {
        console.error('Bitly error: ' + code + '\n' + message);
    } catch(e) {
        // .. ignore
    }
};

jQuery.fn.bitly = function(action, func, options) {
    var opts = jQuery.extend({}, jQuery.fn.bitly.defaults, options);
    var dh = new bitlyDataHandler();
    if( typeof(func) == 'function') {
        dh.onSuccess = func;
    }
    var urls = new Array();
    this.each( function() {
        var elm = jQuery(this);
        var message = elm.val();
        if( !message) {
            message = elm.attr('href');
        }
        urls.push(message);
    });
    var xhr = jQuery.post( opts.url, {
        'action' : action,
        'url' : urls.join(',')
    }, function(data) {
        return dh.proccess(data);
    }, 'json');
    return xhr;
};

jQuery.fn.bitly.defaults = {
    url: '/bitly/bitly.php'
};

jQuery.fn.shortenUrl = function(func) {
    return this.each( function(){
        var elm = jQuery(this);

        elm.bitly('shorten', function(data) {
            var re = new RegExp("http://[^( |$|\\]|\")]+", 'g');
            var urls = elm.val().match(re);
            if(urls) {
                for(var i=0;i<urls.length;i++) {
                    var url = urls[i];
                    if( typeof( data[url]) != 'undefined') {
                        var shortUrl = data[url].shortUrl;
                        elm.val( elm.val().replace(url, shortUrl));
                    }
                }
            }
            if( typeof(func) == 'function') {
                func(data);
            }
        });
    });
};

jQuery.fn.addPreview = function(func, options) {
    var opts = jQuery.extend({}, jQuery.fn.addPreview.defaults, options);
    var xOffset = opts.xOffset;
    var yOffset = opts.yOffset;
    var xhr;
    jQuery(this).hover( function() {
        var url = $(this).attr('href');
        if( !url) {
            return false;
        }
        jQuery('body').append('<div id="preview"/>');
        var box = jQuery('#preview')
            .css('position', 'absolute')
            .append('<em>' + opts.message + '</em>')
            .fadeIn();
        xhr = jQuery(this).bitly('info', function(d) {
                box.children().remove();
                func(d);
        });
    }, function() {
        xhr.abort();
        jQuery('#preview').fadeOut().remove();
    })
    .mousemove( function(e) {
        var left = e.pageX + xOffset;
        var top = e.pageY + yOffset;
        jQuery("#preview").css("top", top + "px").css("left", left + "px");
    });
};

jQuery.fn.addPreview.defaults = {
    'xOffset': 10,
    'yOffset': 10,
    'message': 'Loading...'
};

