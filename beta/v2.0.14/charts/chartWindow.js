define(["jquery","windows/windows","text!charts/chartWindow.html","jquery.dialogextend"],function(a,b,c){"use strict";function d(){a(this).find(".chartSubContainer").width(a(this).width()-10),a(this).find(".chartSubContainer").height(a(this).height()-15);var b="#"+a(this).find(".chartSubContainer").attr("id");require(["charts/charts"],function(a){a.triggerReflow(b)})}return{addNewWindow:function(e){e=a.extend({title:e.instrumentName+" ("+e.timePeriod+")",close:function(){var b=a(this).attr("id"),c=a("#"+b+"_chart"),d=c.data("timePeriod"),e=c.data("instrumentCode");a(this).dialog("destroy"),require(["charts/charts"],function(a){a.destroy({containerIDWithHash:"#"+b+"_chart",timePeriod:d,instrumentCode:e})})},resize:d},e);var f=b.createBlankWindow(c,e),g=f.attr("id");return f.find("div.chartSubContainerHeader").attr("id",g+"_header").end().find("div.chartSubContainer").attr("id",g+"_chart").end(),require(["charts/charts"],function(a){a.drawChart("#"+g+"_chart",e,e.resize.bind(f)),require(["charts/chartOptions","charts/tableView"],function(a,b){var c=b.init(f);a.init(g,e.timePeriod,e.type,c.show)}),require(["charts/chartExport"],function(a){a.init(g)})}),f.dialog("open"),f},totalWindows:function(){return a("div.webtrader-dialog").length},triggerResizeEffects:function(a){d.call(a)}}});