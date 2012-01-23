(function(a){a.fn.editable=function(d,e){if("disable"==d)a(this).data("disabled.editable",true);else if("enable"==d)a(this).data("disabled.editable",false);else if("destroy"==d)a(this).unbind(a(this).data("event.editable")).removeData("disabled.editable").removeData("event.editable");else{var b=a.extend({},a.fn.editable.defaults,{target:d},e),i=a.editable.types[b.type].plugin||function(){},j=a.editable.types[b.type].submit||function(){},o=a.editable.types[b.type].buttons||a.editable.types.defaults.buttons,
r=a.editable.types[b.type].content||a.editable.types.defaults.content,t=a.editable.types[b.type].element||a.editable.types.defaults.element,p=a.editable.types[b.type].reset||a.editable.types.defaults.reset,s=b.callback||function(){},u=b.onedit||function(){},v=b.onsubmit||function(){},w=b.onreset||function(){},x=b.onerror||p;b.tooltip&&a(this).attr("title",b.tooltip);b.autowidth="auto"==b.width;b.autoheight="auto"==b.height;return this.each(function(){var c=this,y=a(c).width(),z=a(c).height();a(this).data("event.editable",
b.event);a.trim(a(this).html())||a(this).html(b.placeholder);a(this).bind(b.event,function(k){if(true!==a(this).data("disabled.editable"))if(!c.editing)if(false!==u.apply(this,[b,c])){k.preventDefault();k.stopPropagation();b.tooltip&&a(c).removeAttr("title");if(0==a(c).width()){b.width=y;b.height=z}else{if(b.width!="none")b.width=b.autowidth?a(c).width():b.width;if(b.height!="none")b.height=b.autoheight?a(c).height():b.height}a(this).html().toLowerCase().replace(/(;|"|\/)/g,"")==b.placeholder.toLowerCase().replace(/(;|"|\/)/g,
"")&&a(this).html("");c.editing=true;c.revert=a(c).html();a(c).html("");var f=a("<form />");if(b.cssclass)"inherit"==b.cssclass?f.attr("class",a(c).attr("class")):f.attr("class",b.cssclass);if(b.style)if("inherit"==b.style){f.attr("style",a(c).attr("style"));f.css("display",a(c).css("display"))}else f.attr("style",b.style);var h=t.apply(f,[b,c]),l;if(b.loadurl){var m=setTimeout(function(){h.disabled=true;r.apply(f,[b.loadtext,b,c])},100);k={};k[b.id]=c.id;a.isFunction(b.loaddata)?a.extend(k,b.loaddata.apply(c,
[c.revert,b])):a.extend(k,b.loaddata);a.ajax({type:b.loadtype,url:b.loadurl,data:k,async:false,success:function(g){window.clearTimeout(m);l=g;h.disabled=false}})}else if(b.data){l=b.data;if(a.isFunction(b.data))l=b.data.apply(c,[c.revert,b])}else l=c.revert;r.apply(f,[l,b,c]);h.attr("name",b.name);o.apply(f,[b,c]);a(c).append(f);i.apply(f,[b,c]);a(":input:visible:enabled:first",f).focus();b.select&&h.select();h.keydown(function(g){if(g.keyCode==27){g.preventDefault();p.apply(f,[b,c])}});if("cancel"==
b.onblur)h.blur(function(){m=setTimeout(function(){p.apply(f,[b,c])},500)});else if("submit"==b.onblur)h.blur(function(){m=setTimeout(function(){f.submit()},200)});else a.isFunction(b.onblur)?h.blur(function(){b.onblur.apply(c,[h.val(),b])}):h.blur(function(){});f.submit(function(g){m&&clearTimeout(m);g.preventDefault();if(false!==v.apply(f,[b,c]))if(false!==j.apply(f,[b,c]))if(a.isFunction(b.target)){g=b.target.apply(c,[h.val(),b]);a(c).html(g);c.editing=false;s.apply(c,[c.innerHTML,b]);a.trim(a(c).html())||
a(c).html(b.placeholder)}else{g={};g[b.name]=h.val();g[b.id]=c.id;a.isFunction(b.submitdata)?a.extend(g,b.submitdata.apply(c,[c.revert,b])):a.extend(g,b.submitdata);if("PUT"==b.method)g._method="put";a(c).html(b.indicator);var q={type:"POST",data:g,dataType:"html",url:b.target,success:function(n){q.dataType=="html"&&a(c).html(n);c.editing=false;s.apply(c,[n,b]);a.trim(a(c).html())||a(c).html(b.placeholder)},error:function(n){x.apply(f,[b,c,n])}};a.extend(q,b.ajaxoptions);a.ajax(q)}a(c).attr("title",
b.tooltip);return false})}});this.reset=function(k){if(this.editing)if(false!==w.apply(k,[b,c])){a(c).html(c.revert);c.editing=false;a.trim(a(c).html())||a(c).html(b.placeholder);b.tooltip&&a(c).attr("title",b.tooltip)}}})}};a.editable={types:{defaults:{element:function(){var d=a('<input type="hidden"></input>');a(this).append(d);return d},content:function(d){a(":input:first",this).val(d)},reset:function(d,e){e.reset(this)},buttons:function(d,e){var b=this;if(d.submit){if(d.submit.match(/>$/))var i=
a(d.submit).click(function(){i.attr("type")!="submit"&&b.submit()});else{i=a('<button type="submit" class="submit"></button>');i.html("<span><span>"+d.submit+"</span></span>")}a(this).append(i)}if(d.cancel){if(d.cancel.match(/>$/))var j=a(d.cancel);else{j=a('<button type="cancel" class="cancel" />');j.html(d.cancel)}a(this).append(j);a(j).click(function(){(a.isFunction(a.editable.types[d.type].reset)?a.editable.types[d.type].reset:a.editable.types.defaults.reset).apply(b,[d,e]);return false})}}},
text:{element:function(d){var e=a("<input />");d.width!="none"&&e.width(d.width);d.height!="none"&&e.height(d.height);e.attr("autocomplete","off");a(this).append(e);return e}},textarea:{element:function(d){var e=a("<textarea />");if(d.rows)e.attr("rows",d.rows);else d.height!="none"&&e.height(d.height);if(d.cols)e.attr("cols",d.cols);else d.width!="none"&&e.width(d.width);a(this).append(e);return e}},select:{element:function(){var d=a("<select />");a(this).append(d);return d},content:function(d,e,
b){if(String==d.constructor)eval("var json = "+d);else var i=d;for(var j in i)if(i.hasOwnProperty(j))if("selected"!=j){d=a("<option />").val(j).append(i[j]);a("select",this).append(d)}a("select",this).children().each(function(){if(a(this).val()==i.selected||a(this).text()==a.trim(b.revert))a(this).attr("selected","selected")});if(!e.submit){var o=this;a("select",this).change(function(){o.submit()})}}}},addInputType:function(d,e){a.editable.types[d]=e}};a.fn.editable.defaults={name:"value",id:"id",
type:"text",width:"auto",height:"auto",event:"click.editable",onblur:"cancel",loadtype:"GET",loadtext:"Loading...",placeholder:"Click to edit",loaddata:{},submitdata:{},ajaxoptions:{}}})(jQuery);$.editable.addInputType("autogrow",{element:function(a){var d=$("<textarea />");a.rows?d.attr("rows",a.rows):d.height(a.height);a.cols?d.attr("cols",a.cols):d.width(a.width);$(this).append(d);return d},plugin:function(a){$("textarea",this).autogrow(a.autogrow)}});
