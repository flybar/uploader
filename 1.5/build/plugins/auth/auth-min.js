/*!build time : 2013-09-24 4:55:25 PM*/
KISSY.add("gallery/uploader/1.5/plugins/auth/auth",function(a,b,c){function d(a){var b=-1;do a/=1024,b++;while(a>99);return Math.max(a,.1).toFixed(1)+["kB","MB","GB","TB","PB","EB"][b]}function e(a){var b=this;e.superclass.constructor.call(b,a)}var f="",g=b.all,h="error";return a.extend(e,c,{pluginInitializer:function(a){if(!a)return!1;var b=this;b.set("uploader",a),b._useThemeConfig();var c=a.get("queue");b._setSwfButtonExt(),c.on("add",function(a){var c=a.file;if("restore"==c.type)return!0;var d=b.testAllowExt(c);d&&(d=b.testMaxSize(c)),d&&b.testRepeat(c),d&&b.testWidthHeight(c)}),c.on("remove",function(a){var c=a.file,d=c.status;"success"==d&&b.testMax()&&b.testRequired()}),a.on("success",function(){b.testMax()}),a.on("error",function(c){-1===c.status&&"max"==c.rule&&b._maxStopUpload(),a.set("isAllowUpload",!0)})},_useThemeConfig:function(){var b=this,c=b.get("msg");if(!a.isEmptyObject(c))return!1;var d=b.get("uploader"),e=d.get("theme");if(!e)return!1;var c=e.get("authMsg");c&&b.set("msg",c);var f=b.get("allowExts");return f||b.set("allowExts",e.get("allowExts")),b},setAllowExts:function(b){if(!a.isString(b))return!1;var c=[],d=[];return b=b.split(","),a.each(b,function(a){c.push("*."+a),d.push(a.toUpperCase())}),c=c.join(";"),d=d.join(","),{desc:d,ext:c}},testAll:function(){var a=this;return a.testRequire()&&a.testMax()},isUploaderType:function(a){var b=this,c=b.get("uploader"),d=c.get("type");return a==d},testRequired:function(){var a=this,b=a.get("uploader"),c=b.get("queue"),d=c.getFiles("success");return d.length>0},testAllowExt:function(b){function c(b,c){var d,e=!1,f=c.toLowerCase();return a.each(b,function(a){return d=new RegExp("^.+."+a+"$"),d.test(f)?e=!0:void 0}),e}function d(a){var b=a.split(".");return b[b.length-1]}if(!a.isObject(b))return!1;var e=this,f=b.name,g=e.get("allowExts");if(!g)return!0;var h=g.split(","),i=c(h,f);if(!i){var j=d(f),k=e.msg("allowExts");k=a.substitute(k,{ext:j}),e._fireUploaderError("allowExts",[g,k],b)}return i},testMax:function(){var b=this,c=b.get("max");if(c==f)return!0;var d=b.get("uploader"),e=d.get("queue"),g=e.getFiles("success"),h=g.length,i=c>h;if(i)d.set("disabled",!1),d.set("isAllowUpload",!0);else{d.set("disabled",!0),d.set("isAllowUpload",!1);var j=b.msg("max");j=a.substitute(j,{max:c}),b._fireUploaderError("max",[c,j])}return i},testMaxSize:function(b){var c=this,e=b.size,g=c.get("maxSize");if(g==f||!e)return!0;c.get("uploader"),g=1024*g;var h=g>=e;if(!h){var i=c.msg("maxSize");i=a.substitute(i,{maxSize:d(g),size:b.textSize}),c._fireUploaderError("maxSize",[g,i],b)}return h},testRepeat:function(b){if(!a.isObject(b))return!1;var c=this,d=b.name,e=c.get("allowRepeat");if(e===f)return!1;var g=c.get("uploader"),h=g.get("queue"),i=h.getFiles("success"),j=!1;return a.each(i,function(a){return a.name==d?(a.size?a.size==b.size&&c._fireUploaderError("allowRepeat",[e,c.msg("allowRepeat")],b):c._fireUploaderError("allowRepeat",[e,c.msg("allowRepeat")],b),j=!0):void 0}),j},testWidthHeight:function(b){function c(a,c){var f=e.call(d,a,c);if(f){h.set("isAllowUpload",!0);var g=h.get("queue").getFileIndex(b.id);h.upload(g)}else{var i=d.msg("widthHeight");d._fireUploaderError("widthHeight",[e,i],b)}}var d=this,e=d.get("widthHeight");if(e===f)return!0;var h=d.get("uploader");h.set("isAllowUpload",!1);var i=b.data;if(a.isEmptyObject(i)){var j=h.get("target").all("input").getDOMNode();j.select(),j.blur();var k=document.selection.createRange().text,l=g('<img style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);width:300px;visibility:hidden;"  />').appendTo("body").getDOMNode();l.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src=k;var m=l.offsetWidth,n=l.offsetHeight;c(m,n),g(l).remove()}else{var o=new FileReader;o.onload=function(a){var b=a.target.result,d=new Image;d.onload=function(){var a=d.width,b=d.height;c(a,b)},d.src=b},o.readAsDataURL(i)}},_setSwfButtonExt:function(){var a=this,b=a.get("uploader"),c=a.get("allowExts"),d=b.get("button"),e=a.isUploaderType("flash");return e&&c!==f?(c=a.setAllowExts(c),d&&d.set("fileFilters",c[0]),a):!1},_getExts:function(b){if(!a.isString(b))return!1;var c=b.split(";"),d=[],e=/^\*\./;return a.each(c,function(a){a=a.replace(e,""),d.push(a.toUpperCase())}),a.each(d,function(a){c.push(a)}),c},_fireUploaderError:function(b,c,d){var e=this,f=e.get("uploader"),g=f.get("queue"),i={status:-1,rule:b},j=-1;d&&(j=g.getFileIndex(d.id),a.mix(i,{file:d,index:j})),c&&a.mix(i,{msg:c[1],value:c[0],result:{}}),g.fileStatus(j,"error",i),e.fire(h,i),f.fire("error",i)},_maxStopUpload:function(){var b=this,c=b.get("uploader"),d=c.get("queue"),e=b.get("max"),g=c.get("curUploadIndex");if(g==f||e>g)return!1;var h=d.get("files");c.stop(),a.each(h,function(a,b){b>=g&&d.remove(a.id)}),c.set("curUploadIndex",f)},msg:function(b,c){var d=this;if(!a.isString(b))return d;var e=d.get("msg");return a.isString(c)?(e[b]=c,c):e[b]},_processRuleConfig:function(b,c){var d=this;return a.isString(b)?(a.isArray(c)&&d.msg(b,c[1]),d):d}},{ATTRS:{pluginId:{value:"auth"},uploader:{value:f},required:{value:f},max:{value:f},allowExts:{value:f},maxSize:{value:f},allowRepeat:{value:f},widthHeight:{value:f},msg:{value:{}}}}),e},{requires:["node","base"]});