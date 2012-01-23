(function(d){function o(e){e=parseInt(e).toString(16);return e.length<2?"0"+e:e}function w(e){for(;e&&e.nodeName.toLowerCase()!="html";e=e.parentNode){var a=d.css(e,"backgroundColor");if(a!="rgba(0, 0, 0, 0)"){if(a.indexOf("rgb")>=0){e=a.match(/\d+/g);return"#"+o(e[0])+o(e[1])+o(e[2])}if(a&&a!="transparent")return a}}return"#ffffff"}function x(e,a,b){switch(e){case "round":return Math.round(b*(1-Math.cos(Math.asin(a/b))));case "cool":return Math.round(b*(1+Math.cos(Math.asin(a/b))));case "sharp":return Math.round(b*
(1-Math.cos(Math.acos(a/b))));case "bite":return Math.round(b*Math.cos(Math.asin((b-a-1)/b)));case "slide":return Math.round(b*Math.atan2(a,b/a));case "jut":return Math.round(b*Math.atan2(b,b-a-1));case "curl":return Math.round(b*Math.atan(a));case "tear":return Math.round(b*Math.cos(a));case "wicked":return Math.round(b*Math.tan(a));case "long":return Math.round(b*Math.sqrt(a));case "sculpt":return Math.round(b*Math.log(b-a-1,b));case "dog":return a&1?a+1:b;case "dog2":return a&2?a+1:b;case "dog3":return a&
3?a+1:b;case "fray":return a%2*b;case "notch":return b;case "bevel":return a+1}}var r=navigator.userAgent,k=d.browser.mozilla&&/gecko/i.test(r),s=d.browser.safari&&/Safari\/[5-9]/.test(r),t=d.browser.msie&&function(){var e=document.createElement("div");try{e.style.setExpression("width","0+0");e.style.removeExpression("width")}catch(a){return false}return true}();d.fn.corner=function(e){if(this.length==0){if(!d.isReady&&this.selector){var a=this.selector,b=this.context;d(function(){d(a,b).corner(e)})}return this}return this.each(function(){var g=
d(this),c=[e||"",g.attr(d.fn.corner.defaults.metaAttr)||""].join(" ").toLowerCase(),p=/keep/.test(c),i=(c.match(/cc:(#[0-9a-f]+)/)||[])[1],h=(c.match(/sc:(#[0-9a-f]+)/)||[])[1],j=parseInt((c.match(/(\d+)px/)||[])[1])||10,u=(c.match(/round|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dog/)||["round"])[0],v={T:0,B:1};c={TL:/top|tl|left/.test(c),TR:/top|tr|right/.test(c),BL:/bottom|bl|left/.test(c),BR:/bottom|br|right/.test(c)};if(!c.TL&&!c.TR&&!c.BL&&!c.BR)c={TL:1,
TR:1,BL:1,BR:1};if(d.fn.corner.defaults.useNative&&u=="round"&&(k||s)&&!i&&!h){if(c.TL)g.css(k?"-moz-border-radius-topleft":"-webkit-border-top-left-radius",j+"px");if(c.TR)g.css(k?"-moz-border-radius-topright":"-webkit-border-top-right-radius",j+"px");if(c.BL)g.css(k?"-moz-border-radius-bottomleft":"-webkit-border-bottom-left-radius",j+"px");if(c.BR)g.css(k?"-moz-border-radius-bottomright":"-webkit-border-bottom-right-radius",j+"px")}else{g=document.createElement("div");g.style.overflow="hidden";
g.style.height="1px";g.style.backgroundColor=h||"transparent";g.style.borderStyle="solid";h={T:parseInt(d.css(this,"paddingTop"))||0,R:parseInt(d.css(this,"paddingRight"))||0,B:parseInt(d.css(this,"paddingBottom"))||0,L:parseInt(d.css(this,"paddingLeft"))||0};if(typeof this.style.zoom!=undefined)this.style.zoom=1;if(!p)this.style.border="none";g.style.borderColor=i||w(this.parentNode);p=d.curCSS(this,"height");for(var m in v)if((i=v[m])&&(c.BL||c.BR)||!i&&(c.TL||c.TR)){g.style.borderStyle="none "+
(c[m+"R"]?"solid":"none")+" none "+(c[m+"L"]?"solid":"none");var l=document.createElement("div");d(l).addClass("jquery-corner");var f=l.style;i?this.appendChild(l):this.insertBefore(l,this.firstChild);if(i&&p!="auto"){if(d.css(this,"position")=="static")this.style.position="relative";f.position="absolute";f.bottom=f.left=f.padding=f.margin="0";if(t)f.setExpression("width","this.parentNode.offsetWidth");else f.width="100%"}else if(!i&&d.browser.msie){if(d.css(this,"position")=="static")this.style.position=
"relative";f.position="absolute";f.top=f.left=f.right=f.padding=f.margin="0";if(t){var n=(parseInt(d.css(this,"borderLeftWidth"))||0)+(parseInt(d.css(this,"borderRightWidth"))||0);f.setExpression("width","this.parentNode.offsetWidth - "+n+'+ "px"')}else f.width="100%"}else{f.position="relative";f.margin=!i?"-"+h.T+"px -"+h.R+"px "+(h.T-j)+"px -"+h.L+"px":h.B-j+"px -"+h.R+"px -"+h.B+"px -"+h.L+"px"}for(f=0;f<j;f++){n=Math.max(0,x(u,f,j));var q=g.cloneNode(false);q.style.borderWidth="0 "+(c[m+"R"]?
n:0)+"px 0 "+(c[m+"L"]?n:0)+"px";i?l.appendChild(q):l.insertBefore(q,l.firstChild)}}}})};d.fn.uncorner=function(){if(k||s)this.css(k?"-moz-border-radius":"-webkit-border-radius",0);d("div.jquery-corner",this).remove();return this};d.fn.corner.defaults={useNative:true,metaAttr:"data-corner"}})(jQuery);
