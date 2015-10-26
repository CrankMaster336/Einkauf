$(document).ready(function () {
    /*************************************/
    /*           Startup                 */
    /*************************************/
    /*Gobal vars*/
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var defaultWidthBong = 280;
    var defaultWidth = windowWidth - defaultWidthBong - 10;
    var width = $('.contentWrapper').width();
    var newwidth = width - defaultWidth;
    var windowHeight = $(window).height();
	var widthScroller = 0;
	var curItemWidth;

    $('.contentWrapper').css('width', newwidth);
    abrechnungHeight = windowHeight - 64; 			// Die höhe Für rechts die Abrechnung 
    $('.Abrechnung').css('height', abrechnungHeight);
    bongitemHeight = windowHeight - 164; 			// Die höhe Für rechts die Abrechnung was in dem Bong steht
    $('.bongitem').css('height', bongitemHeight);

    scrollerwidth = windowHeight - 120; 				//
    $('.scroller').css('width', scrollerwidth);
    $('.itemwrapper').css('width', scrollerwidth);
    $('.items').css('width', scrollerwidth);

    $('.scroller').css('height', defaultWidth + 3);         // Dies ist eigentlich scroller width

    scrollerpos = -(defaultWidth - scrollerwidth + 3) / 2 + 56;
    $('.scroller').css('top', scrollerpos); 				// Dies ist eigentlich scroller width

    scrollerLeft = (scrollerwidth - defaultWidth + 3) / 2;
    $('.scroller').css('left', -scrollerLeft); 		// Dies ist eigentlich scroller width

    cat = windowHeight - 101;
    $('.Category').css('top', cat);

    $('.suche').css('width', defaultWidth - 2);
    $('.Category').css('width', defaultWidth);

    $('.rightwrapper').css('width', defaultWidthBong);
    $('.Abrechnung').css('width', defaultWidthBong);
    $('.Summe').css('width', defaultWidthBong);

    $('.widthMaker').change(function () {
        var defaultWidthBong = $(this).val();
        var defaultWidth = windowWidth - defaultWidthBong - 10;
        scrollerpos = -(defaultWidth - scrollerwidth + 3) / 2 + 56;
        scrollerLeft = (scrollerwidth - defaultWidth + 3) / 2;
        $('.scroller').css('height', defaultWidth + 3);
        $('.suche').css('width', defaultWidth - 2);
        $('.Category').css('width', defaultWidth);
        $('.rightwrapper').css('width', defaultWidthBong);
        $('.Abrechnung').css('width', defaultWidthBong);
        $('.Summe').css('width', defaultWidthBong);
        $('.scroller').css('top', scrollerpos); 				// Dies ist eigentlich scroller width    
        $('.scroller').css('left', -scrollerLeft); 		// Dies ist eigentlich scroller width
        $('.settings').css('width', windowWidth - defaultWidthBong);
    });


    var bongeinstellungheight = $('.bongeinstellung').height();
    $('.bongitem').css({ 'margin-top': bongeinstellungheight });


    $('.settings').css('top', -windowHeight);
    $('.settings').css('width', windowWidth - defaultWidthBong);
    $(document).on('click', '.settingsIcon', function () {
        $('.settings').animate({ top: "0" });
    });
    $(document).on('click', '.closeIcon', function () {
        $('.settings').animate({ top: -windowHeight });
    });
	
	$('.catscroller > ul > li').each(function (){
		curItemWidth = $(this).width();
		widthScroller = widthScroller + curItemWidth;
	});
	widthScroller = widthScroller + 50;
	$('.catscroller > ul').width(widthScroller);

    /*************************************/
    /*           Functions               */
    /*************************************/

    function styleDel() {
        $('.item').css({ 'border': 'solid 3px red', 'height': '110px', 'width': '110px' })
        $('.item').addClass("delet");
        $('.DEL').addClass("deleteItem");
    }
    function removeStyleDel() {
        $('.item').css({ 'border': 'solid 0px red', 'height': '116px', 'width': '116px' })
        $('.item').removeClass("delet");
        $('.DEL').removeClass("deleteItem");
    }
    function del() {
        $('.item').click(function () {
            if ($(this).hasClass("delet")) {
                $(this).remove();
            }
        });
    }
    /*************************************/
    /*           Add new Item            */
    /*************************************/
    var counter = 1;
    var itemNr = 1
    var i = 0;
    var scrollerHeight = 0;
    var scrollerWidth = 0;
    var wrapperWidth = 0;
    var y = 0;
    var done = true
    $(document).on('click', '#addNew', function () {
        var wrapperWidth = $('.itemwrapper').width() / 3 - 10;
        name = $('.name').val();
        preis = $('.preis').val();
        type = $('.type').val();
        if (type == "Essen") {
            type = "foot"
            typebg = "footbg"
        } else if (type == "Trinken Nicht Alkoholisch") {
            type = "water"
            typebg = "waterbg"
        } else {
            type = "waterAlk"
            typebg = "waterAlkbg"
        }
        i++;
        $('#Items').append('<div class="item ' + type + '" data-js="' + type + '|' + preis + '|' + itemNr + '|' + name + '" id="Item" style="transform:rotate(90deg);"><div class="' + typebg + '"></div><span>' + name + '</span><div class="productPrice">' + preis + '€</div><div class="DEL"></div></div>');
        $('.item').css('width', wrapperWidth);
        $('.item').css('height', wrapperWidth);
        itemNr++;

    });

    $(document).on("click", ".blockUIClose", function () {
        $('.blockUI').velocity({ opacity: 0 }, { display: "none" });
        $('.saveLayer').velocity({left: -300});
        $('.loadLayer').velocity({left: -300});
        $('.addLayer').velocity({left: -300});        
    });
    $(document).on("click", ".blockUIBackground", function () {
        $('.blockUI').velocity({ opacity: 0 }, { display: "none" });
        $('.loadLayer').velocity({left: -300});
        $('.addLayer').velocity({left: -300});
        $('.saveLayer').velocity({left: -300});
    });
    $(document).on("click", ".addNewIcon", function () {
        $('.blockUI').velocity({ opacity: 1 }, { display: "block" });
        $('.addLayer').css({left: "-300px"});
        $('.addLayer').velocity({left: 0});
        $('.addLayer').show();
    });



    /*************************************/
    /*           Remove Item             */
    /*************************************/
    $('#addNew').click(function () {
        removeStyleDel();
    });
    $(document).on("click", ".remove", function () {
        styleDel();
        del();
        $('.removeIcon').removeClass('remove');
        $('.removeIcon').addClass('removeS');

    });
    $(document).on("click", ".removeS", function () {
        removeStyleDel();
        $('.removeIcon').addClass('remove');
        $('.removeIcon').removeClass('removeS');
    });


    /*************************************/
    /*          Kaufen                   */
    /*************************************/
    var anzahl = 0;
    $(document).on('click', '.item', function (e) {
        anzahl++;
        e.preventDefault();
        data = $(this).attr("data-js");
        data = data.split("|");
        $('#Bongitem').append("<tr data-js='" + data[0] + "|" + data[1] + "|" + anzahl + "|" + data[2] + "|" + data[3] + "'><td style='text-transform:uppercase' class='price'>" + data[3] + "</td><td><br>" + data[1] + "€</td></tr>");

        i = 0;
        data = new Array();
        var price = 0;

        $('.price').each(function () {
            test = $(this).parent().attr("data-js").split("|");
            data[i] = test
            price = price + parseFloat(data[i][1]);
            $('.Gessumme').html(price.toFixed(2) + '€')
            i++;
        });
    });

    /***************************************************/
    /*                       SAVE                      */
    /***************************************************/
    $(document).on('click', '.Save', function () {
        
        
        $('.blockUI').velocity({ opacity: 1 }, { display: "block" });
        $('.saveLayer').css({left: "-300px"});
        $('.saveLayer').velocity({left: 0});
        $('.saveLayer').show();
        
        $('.saveList').html("");
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var value = localStorage[key];
            var split = key.split("_");
            if (split[0] == "KaufSafe") {
                $('.saveList').append('<div class="saveItem"><div class="loadIconLeft"><div class="triggerLoad" data_js="' + split[1] + '"></div></div><p>' + split[1] + '</p></div>');
            }
        }
    });



    $(document).on('click', '.saveItem', function () {
        var getHtml = $('#Items').html();
        var fileName = $(this).children().children().attr('data_js');
        console.log(fileName);
        var obj = {
            content: getHtml,
            lastItemNr: itemNr
        };
        localStorage.setItem('KaufSafe_' + fileName, JSON.stringify(obj));
		$('.status').show();
        $('.status').css('background-color', '#8CC154').html("Erfolgreich gespeichert!").velocity({bottom: 0});
		setTimeout(function () {
			$('.status').hide();
		}, 2000);
    });
	


    $(document).on('click', '.saveName', function () {
        var getHtml = $('#Items').html();
        var fileName = $('.fileName').val();
        var obj = {
            content: getHtml,
            lastItemNr: itemNr
        };
        if (fileName != "") {
			$('.status').show();
            $('.status').css('background-color', '#8CC154').html("Erfolgreich gespeichert!").velocity({bottom: 0});
			setTimeout(function () {
				$('.status').hide();
			}, 2000);
            localStorage.setItem('KaufSafe_' + fileName, JSON.stringify(obj));
            $('.saveName').animate({ 'top': '-=100px' });
            $('.fileName').animate({ 'top': '-=100px' });
            $('.Save').removeClass('StopSave');
            $('.saveIcon').css('background-image', 'url(img/save.png)');
        } else {
			$('.status').show();
            $('.status').css('background-color', '#e74c3c').html('Bitte geben sie einen Namen ein.').animate({ 'top': '+=50px' });
            setTimeout(function () {
                $('.status').hide();
            }, 2000);
        }
    });

    /***************************************************/
    /*                       LOAD                      */
    /***************************************************/

    $(document).on("click", ".Load", function () {
        $('.blockUI').velocity({ opacity: 1 }, { display: "block" });
        $('.loadLayer').css({left: "-300px"});
        $('.loadLayer').velocity({left: 0});
        $('.loadLayer').show();
    });

    $(document).on('click', '.Load', function () {
        $('.loadContent').html("");
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var value = localStorage[key];
            var split = key.split("_");
            if (split[0] == "KaufSafe") {
                $('.loadContent').append('<div class="loadItem"><div class="loadIconLeft"><div class="triggerLoad" data_js="' + split[1] + '">' + split[1] + '<div></div></div>');
            }
        }

    });
    $(document).on('click', '.loadItem', function () {
        var getData = $(this).children().children().attr("data_js");
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var key = localStorage.key(i);
            var value = localStorage[key];
            if (key == "KaufSafe_" + getData) {
                unparsed = value;
                var parsed = JSON.parse(unparsed);
                console.log(parsed['content']);
                $('#Items').html(parsed['content']);
                itemNr = parsed['lastItemNr'];
            }
        }
		$('.status').show();
		$('.status').css('background-color', '#8CC154').html("Erfolgreich geladen!").velocity({bottom: 0});
		setTimeout(function () {
			$('.status').hide();
		}, 2000);
    });
    /***************************************************/
    /*                 Produkt Suche                   */
    /***************************************************/

    $('.suche').keyup(function () {
        var inputText = $(this).val();
        $('.item').each(function () {
            var contain = $(this).children('span:contains("' + inputText + '")');
            var notempty = $.makeArray(contain);
            if (notempty == "") {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
    /***************************************************/
    /*                 On Change                       */
    /***************************************************/

    $('.iconWidth').change(function () {
        var iconswidth = $(this).val();
        var bongeinstellungheight = $('.bongeinstellung').height();
        var abrechnungHeight = $('.Abrechnung').height();
        var bongitemHeihgt = $('.bongitem').height();
        var test = abrechnungHeight - bongeinstellungheight;
        console.log(test);
        $('.bongitem').css({ 'margin-top': bongeinstellungheight, 'height': test - 55 })
        $('.settingsIcon').css({ 'width': iconswidth + 'px', 'height': iconswidth + 'px', 'background-size': iconswidth + 'px ' + iconswidth + 'px' });
        $('.loadIcon').css({ 'width': iconswidth + 'px', 'height': iconswidth + 'px', 'background-size': iconswidth + 'px ' + iconswidth + 'px' });
        $('.saveIcon').css({ 'width': iconswidth + 'px', 'height': iconswidth + 'px', 'background-size': iconswidth + 'px ' + iconswidth + 'px' });
        $('.removeIcon').css({ 'width': iconswidth + 'px', 'height': iconswidth + 'px', 'background-size': iconswidth + 'px ' + iconswidth + 'px' });
        $('.addNewIcon').css({ 'width': iconswidth + 'px', 'height': iconswidth + 'px', 'background-size': iconswidth + 'px ' + iconswidth + 'px' });
        $('.Del').css({ 'width': iconswidth + 'px', 'height': iconswidth + 'px', 'background-size': iconswidth + 'px ' + iconswidth + 'px' });
    });
	/***************************************************/
    /*                 On Clear                        */
    /***************************************************/
	
	$(document).on('click', '.clearItems', function (){
		$('#Bongitem').html("");
		$('.Gessumme').html("0.00€")
	});
});




/*********DEBUG*******/


	function callStatus(Text) {
		$('.status').show();
		$('.status').css('background-color', '#8CC154').html(Text).velocity({bottom: 0});
		setTimeout(function () {
			$('.status').hide();
		}, 2000);
	}	
		