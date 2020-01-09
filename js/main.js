'use strict';
/*!
 * js scripts for GameR main page
 *
 Jakub Kwarciński - http://jakubkwarcinski.pl/
 *
 * this file has to be included only for main page of GameR template
 * you can edit this file for specific goals
 */
(function() {

    var $window = $(window);
    var $document = $(document);

    $window.on('load', function() {

        //scrolling to the specific hash code start
        var offsetTop = 121;
        var navbarBorder = 10;
        var hash = window.location.hash;
        if (hash) {
            if ($(hash).length > 0) {
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - offsetTop + navbarBorder
                }, 500);
            }
        }
        //scrolling to the specific hash code end

        //skorllr plugin initialize - only for no-touch devices - code start
        if (($('body').data('skrollr')) && (!Modernizr.touchevents) && (Modernizr.csstransitions)) {
            var skrollrObj = skrollr.init({
                forceHeight: false,
                edgeStrategy: 'set',
                easing: {
                    WTF: Math.random,
                    inverted: function(p) {
                        return 1-p;
                    }
                }
            });
        }
        $('.panel-collapse').on('hidden.bs.collapse shown.bs.collapse', function () {
            skrollr.get().refresh();
        });
        $window.on('resize', function() {
            skrollr.get().refresh();
        });
        //skorllr plugin initialize - only for no-touch devices - code end

    });

    $document.ready(function(){

        //background parallax code start
        if (!Modernizr.touchevents) {
            $('#home').parallax("0%", 0.2, true);
            $('#buy').parallax("0%", 0.2, true);
            $('#flow').parallax("0%", 0.2, true);
            $('#portfolio').parallax("0%", 0.2, true);
            $('#comingsoon').parallax("0%", 0.2, true);
            $('#partners').parallax("0%", 0.2, true);
            $('#send-us-message').parallax("0%", 0.2, true);
        }
        //background parallax code end

        //refresh scrollspy on resize code start
        $window.on('resize', function() {
            $('[data-spy="scroll"]').each(function () {
                var $spy = $(this).scrollspy('refresh')
            });
        });
        //refresh scrollspy on resize code end


        /* Navigation - code start */

        var navbarBorder = 10;
        var offsetTop = 121;
        var homeHeight = $('#home').outerHeight() - offsetTop;

        //main menu navigation code start
        $('#main-menu a').not('.dropdown-toggle, .single-page').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $('html, body').stop(true, true).animate({
                scrollTop: $(target).offset().top - offsetTop + navbarBorder
            }, 500);
        });
        //main menu navigation code end

        //resize navbar code start
        function resizeNavbar() {
            if($window.scrollTop() >= homeHeight){
                $(".navbar-inverse").addClass("basic");
            } else {
                $(".navbar-inverse").removeClass("basic");
            }
        }
        resizeNavbar();
        $window.on('scroll', function(){
            resizeNavbar();
        });
        //resize navbar code end

        /* Navigation - code end */


        /* morris charts code start */

        //helper function to convert rgb to hex code start
        function rgb2hex(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
        //helper function to convert rgb to hex code end

        //helper function to make color lighter or darker code start
        function lightenDarkenColor(color, percent) {
            var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
            return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
        }
        //helper function to make color lighter or darker code start
    })

    //google maps code start
    var markerImage = 'img/marker.png';
    function initialize() {
        var map_canvas = document.getElementById('map');
        var map_options = {
            center: new google.maps.LatLng(50.0559661,19.9308796),
            zoom: 17,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
        }
        var map = new google.maps.Map(map_canvas, map_options)
        var myLatlng = new google.maps.LatLng(50.0559661,19.9308796);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title:"Gamer office",
            icon: markerImage
        });
        marker.setMap(map);
    }
    window.initMap = initialize;
    //google maps code end

})();
