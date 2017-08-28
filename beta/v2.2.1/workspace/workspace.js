define(["exports","text!./workspace-menu.html","text!./workspace.html","../common/rivetsExtra","jquery","../websockets/binary_websockets","../windows/windows","../windows/tracker","jquery-growl","css!./workspace-menu.css","css!./workspace.css"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.tileDialogs=a.events=a.addDialog=a.init=void 0;var j=i(b),k=i(c),l=i(d),m=i(e),n=i(f),o=i(g),p=i(h),q="my-workspace-1";!function(){var a=local_storage.get("states");a&&!a.name&&(a.name=q,local_storage.set("states",a))}();var r=function(a){return JSON.parse(JSON.stringify(a))},s={route:"active",closeAll:function(){return m["default"](".webtrader-dialog").dialog("close")},workspaces:local_storage.get("workspaces")||[],dialogs:[],update_route:function(a){return s.route=a},tileDialogs:function(){return z()},workspace:{remove:function(a){var b=s.workspaces.indexOf(a);-1!==b&&s.workspaces.splice(b,1),local_storage.set("workspaces",s.workspaces)},show:function(a){var b=a.tradeDialog&&a.tradeDialog.length;return b=b||a.portfolio||a.statement||a.profitTable||a.deposit||a.withdraw,b&&!n["default"].is_authenticated()?void m["default"].growl.notice({message:"Please log in to see your saved workspace.".i18n()}):(s.closeAll(),t.dialog("close"),void _.delay(function(){s.current_workspace.name=a.name,local_storage.set("states",a),p["default"].reopen(r(a))},500))},perv_name:"",save_name:function(a){return s.workspace.perv_name=a.name},blur:function(a){return a.blur()},rename:function(a){var b=s.workspace.perv_name,c=s.current_workspace;if((!a.name||s.workspaces.filter(function(b){return b.name===a.name}).length>=2)&&(a.name=s.workspace.perv_name),local_storage.set("workspaces",s.workspaces),c.name===b){c.name=a.name;var d=local_storage.get("states");d.name=a.name,local_storage.set("states",d)}}},current_workspace:{name:(local_storage.get("states")||{}).name||"workspace-1",name_perv_value:"",is_saved:function(){var a=-1!==_.findIndex(s.workspaces,{name:s.current_workspace.name});return a},save:function(){var a=s.current_workspace,b=a.name,c=a.is_saved;if(!c())return s.saveas.show();var d=local_storage.get("states");d.name=b;var e=_.findIndex(s.workspaces,{name:d.name});s.workspaces[e]=d,s.workspaces=r(s.workspaces),local_storage.set("workspaces",s.workspaces),m["default"].growl.notice({message:"Workspace changes saved".i18n()})}},rename:{show:function(){s.current_workspace.name_perv_value=s.current_workspace.name,s.route="rename"},apply:function(){var a=s.current_workspace,b=a.name,c=a.name_perv_value;if(!b||b===c)return s.rename.cancel();if(_.find(s.workspaces,{name:b})){var d=b.match(/\d+$/),e=d?parseInt(d[0]):0;for(b=b.replace(/\d+$/,"");_.find(s.workspaces,{name:b+e});)e+=1;b+=e}var f=_.find(s.workspaces,{name:c});f&&(f.name=b,s.workspaces=s.workspaces,local_storage.set("workspaces",s.workspaces));var g=local_storage.get("states");g.name=b,local_storage.set("states",g),s.current_workspace.name=b,s.route="active"},cancel:function(){s.current_workspace.name=s.current_workspace.name_perv_value,s.route="active"}},saveas:{show:function(){s.current_workspace.name_perv_value=s.current_workspace.name,s.route="saveas"},apply:function(){{var a=s.current_workspace,b=a.name;a.name_perv_value}if(!b)return s.saveas.cancel();if(_.find(s.workspaces,{name:b})){var c=b.match(/\d+$/),d=c?parseInt(c[0]):0;for(b=b.replace(/\d+$/,"");_.find(s.workspaces,{name:b+d});)d+=1;b+=d}var e=local_storage.get("states");e.name=b,s.workspaces.push(e),local_storage.set("workspaces",s.workspaces),s.current_workspace.name=b,s.route="active"},cancel:function(){return s.rename.cancel()}},file:{hash_code:function(a){return JSON.stringify(a).split("").reduce(function(a,b){return a=(a<<5)-a+b.charCodeAt(0),a&a},0)},open_selector:function(a){var b=m["default"](a.target).closest(".workspace-manager-dialog");b.find("input[type=file]").click()},upload:function(a){var b=a.target.files[0];if(a.target.value=null,b){var c=new FileReader;c.onload=function(a){var b=a.target.result,c=null;try{c=JSON.parse(b);var d=c.random;if(delete c.random,d!==s.file.hash_code(c))throw"Invalid JSON file".i18n();if("workspace-template"!==c.template_type)throw"Invalid template type.".i18n()}catch(a){return void m["default"].growl.error({message:a})}if(_.find(s.workspaces,{name:c.name})){{name.match(/\d+$/)}return void m["default"].growl.error({message:"Template name already exists".i18n()})}delete c.template_type,delete c.random,s.workspaces.push(c),local_storage.set("workspaces",s.workspaces),s.workspace.show(c),m["default"].growl.notice({message:"Successfully added workspace as ".i18n()+"<b>"+c.name+"</b>"})},c.readAsText(b)}},download:function(a){var b=a.name,c=_.findIndex(s.workspaces,{name:b}),d=-1!==c?s.workspaces[c]:local_storage.get("states");d.name=b,d.template_type="workspace-template",d.random=s.file.hash_code(d);var e=JSON.stringify(d);download_file_in_browser(d.name+".json","text/json;charset=utf-8;",e),m["default"].growl.notice({message:"Downloading workspace as %1".i18n().replace("%1","<b>"+d.name+".json</b>")})}}};s.current_workspace.root=s;var t=null,u=null,v=function(){var a=m["default"](k["default"]).i18n(),b=function(){u&&u.unbind(),u=null,t&&t.destroy(),t=null};t=o["default"].createBlankWindow(a,{title:"Manage".i18n(),width:400,height:250,resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,draggable:!1,modal:!0,close:b,ignoreTileAction:!0,"data-authorized":!0,create:function(){return m["default"]("body").css({overflow:"hidden"})},beforeClose:function(){return m["default"]("body").css({overflow:"inherit"})}}),u=l["default"].bind(a[0],s),t.dialog("open")},w=a.init=function(a){var b={closeAll:function(){return m["default"](".webtrader-dialog").dialog("close")},tileDialogs:function(){return z()},showWorkspaceManager:function(){v()}},c=m["default"](j["default"]);a.append(c),l["default"].bind(c[0],b)},x=a.addDialog=function(a,b,c){var d={name:a,click:function(){t&&t.dialog("close"),b()},remove:function(){e(),c()}},e=function(){var a=s.dialogs.indexOf(d);-1!==a&&s.dialogs.splice(a,1)};return s.dialogs.push(d),e},y=a.events=m["default"]("<div/>"),z=function(){for(var a=function(a){for(var b=void 0,c=void 0,d=a.length;d>0;)c=Math.floor(Math.random()*d),--d,b=a[d],a[d]=a[c],a[c]=b;return a},b=m["default"](".webtrader-dialog").filter(function(a,b){var c=m["default"](b);return c.hasClass("ui-dialog-content")&&c.dialog("isOpen")&&!c.hasClass("ui-dialog-minimized")&&m["default"](window).width()>=c.dialog("option","width")}),c=function(a,b){var c=0,d=m["default"](window).width(),e=115;m["default"]("#msg-notification").is(":visible")&&(e=150);for(var f=0;f<a.length;){for(var g=f,h=0,i=0;f!=a.length;){var j=m["default"](a[f]),k=j.dialog("option","width"),l=j.dialog("option","height");if(h=Math.max(h,l),!(d>=i+k))break;i+=k,++f}var n=d>i?d-i:0,o=d>i?(d-i)/(f-g+1):0;f!=a.length&&(c+=n),0===i&&m["default"](a[f]).dialog("option","width")>d&&(++f,o=0),i=0;for(var p=g;f>p;++p){i+=o;{var q=m["default"](a[p]),r=q.dialog("option","width");q.dialog("option","height")}b&&q.dialog("widget").animate({left:i+"px",top:e+"px"},1500,q.trigger.bind(q,"animated")),q.dialog("option","position",{my:i,at:e}),i+=r}e+=h+20}return c},d=null,e=1e6,f=0;100>f;++f){a(b);var g=c(b,!1);e>g&&(d=b.slice(),e=g)}var h=m["default"](".webtrader-dialog").filter(function(a,b){var c=m["default"](b);return c.hasClass("ui-dialog-content")&&c.dialog("isOpen")&&!c.hasClass("ui-dialog-minimized")&&m["default"](window).width()<c.dialog("option","width")});_(h).forEach(function(a){d.push(a)}),c(d,!0),setTimeout(function(){return y.trigger("tile")},1600)};a.tileDialogs=z,a["default"]={init:w,addDialog:x,events:y,tileDialogs:z}});