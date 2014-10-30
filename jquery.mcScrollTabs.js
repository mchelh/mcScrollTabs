/**
 * jQuery.mcScrollTabs - Scrolling multiple tabs.
 * @copyright (c) 2014 Mustapha CHELH
 * Dual licensed under MIT and GPL.
 * Date: 08/09/2014
 * @author Mustapha CHELH
 * @version 1.0
 */

 (function($){
 	var settings = {
 		'animationSpeed' : 200,
 		'marginLeft' : 20,
 		'tabWidth' : 1000,
 		'leftIcon' : "ui-icon-carat-1-w",
 		'rightIcon' : "ui-icon-carat-1-e",
 		'buttonHeight' : false,
 	}

 	$.fn.mcScrollTabs = function(options)
 	{
 		return this.each(function(){
 			var	o = $.extend({}, settings, options),
 			$tabs = $(this),
 			$tabsNav = $tabs.find('.ui-tabs-nav'),
 			$nav;
 			var rnd = Math.floor(Math.random()*10000),
 			paddingTop = $tabs.css('padding-top');

 			if(options)
			$.each(settings, function( index, value ) {
				if(options[index] != undefined)
					settings[index] = options[index];
			});

 			$tabs.css({'overflow':'hidden'});
 			$tabsNav.css({'margin-left':settings.marginLeft});
 			$tabsNav.wrap( "<div  id='mc-scroll-tab-"+rnd+"' style='width: 1000%;'></div>" );
 			$("#mc-scroll-tab-"+rnd).prepend('<button id="toleft-'+rnd+'" style="z-index: 2;position: absolute; left: 0px; top:'+paddingTop+'; width: 24px;"></button>');
 			$("#mc-scroll-tab-"+rnd).append('<button id="toright-'+rnd+'" style="z-index: 2;position: absolute; top:'+paddingTop+'; right: -2px; width: 24px;"></button>');

 			var $bLeft = $( '#toleft-'+rnd ),
 			$bRight = $( '#toright-'+rnd ),
 			height = $( '#mc-scroll-tab-'+rnd).outerHeight();

 			if(settings.buttonHeight)
 				height = settings.buttonHeight;

 			$bLeft.prop('disabled', true);

 			$bLeft.css({'height':height});
 			$bRight.css({'height':height});

 			$bLeft.button({
 				text: false,
 				icons: {
 					primary: settings.leftIcon
 				}
 			});
 			$bRight.button({
 				text: false,
 				icons: {
 					primary: settings.rightIcon
 				}
 			});


 			$bRight.on("click", function(){
 				var marginLfet = parseFloat($tabsNav.css("margin-left").replace("px", ""));
 				$tabsNav.animate({"margin-left":(marginLfet-settings.tabWidth+settings.marginLeft)+"px"}, {duration: settings.animationSpeed,
 					step: function( now, fx ) {
 						toRight();
 					}
 				});
 			});
 			function toRight(){
 				if(($tabsNav.find("li").last().position().left+$tabsNav.find("li").last().width())>($bRight.position().left))
 				{
 					$bLeft.button( "option", "disabled", false );
 				}
 				else
 				{
 					$tabsNav.stop();
 					$tabsNav.animate({"margin-left":(($bRight.position().left)-$tabsNav.find("li").last().position().left-$tabsNav.find("li").last().width())+parseFloat($tabsNav.css("margin-left"))}, settings.animationSpeed);
 					$bRight.button( "option", "disabled", true );
 					$bLeft.button( "option", "disabled", false );
 				}

 			}
 			$bLeft.on("click", function(){
 				var marginLfet = parseFloat($tabsNav.css("margin-left").replace("px", ""));
 				$tabsNav.animate({"margin-left":(marginLfet+settings.tabWidth+settings.marginLeft)+"px"}, {duration: settings.animationSpeed,
 					step: function( now, fx ) {
 						toLeft();
 					}
 				});
 			});
 			function toLeft(){
 				if(parseFloat($tabsNav.css("margin-left"))>settings.marginLeft)
 				{
 					$tabsNav.stop();
 					$tabsNav.animate({"margin-left":settings.marginLeft}, 20);
 					$bLeft.button( "option", "disabled", true );
 					$bRight.button( "option", "disabled", false );
 				}
 				else
 				{
 					$bRight.button( "option", "disabled", false );
 				}
 			}
 			$.fn.mcScrollTabs.refreshScroll = function ()
 			{	
 				if(($tabsNav.find("li").last().position().left+$tabsNav.find("li").last().width())<($bRight.position().left))
 				{
 					if(parseFloat($tabsNav.css("margin-left"))<settings.marginLeft)
 					{
 						$tabsNav.animate({"margin-left":(($bRight.position().left)-$tabsNav.find("li").last().position().left-$tabsNav.find("li").last().width())+parseFloat($tabsNav.css("margin-left"))}, {duration: settings.animationSpeed,
 							step: function( now, fx ) {
 								if(parseFloat($tabsNav.css("margin-left"))>settings.marginLeft)
 								{
 									$tabsNav.stop();
 									$tabsNav.animate({"margin-left":settings.marginLeft}, 20);
 									$bLeft.button( "option", "disabled", true );
 								}
 							}
 						});
 					}
 					$bRight.button( "option", "disabled", true );
 				}
 				else
 				{
 					$bRight.button( "option", "disabled", false );
 				}
 				if(parseFloat($tabsNav.css("margin-left"))>=settings.marginLeft)
 				{
 					$bLeft.button( "option", "disabled", true );
 				}
 				else
 				{
 					$bLeft.button( "option", "disabled", false );
 				}
 			};
			function refreshScrollResize() {
				$.fn.mcScrollTabs.refreshScroll();
			}
 			$(window).bind('resize', refreshScrollResize);
 			$.fn.mcScrollTabs.refreshScroll();
 		});

}
})(jQuery);


(function($){
   var refresh = $.ui.tabs.prototype.refresh;
   $.ui.tabs.prototype.refresh = function(){
        var self = this;
        refresh.apply(this,arguments);
        $.fn.mcScrollTabs.refreshScroll();
    }
})($);


