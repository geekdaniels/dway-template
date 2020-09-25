$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 100) {
        $('nav').addClass('fixed-top');
    } else {
        $('nav').removeClass('fixed-top');
    }
});

//Note we need a token for geocode for dwayremit
var iptoken = '47e8ba0b4941cf';

$(function () {
    if($(".country").length){
        $(".country").countrySelect({
            initialCountry: 'auto',
            geoIpLookup: function (callback) {
                $.get(`http://ipinfo.io?token=${iptoken}`, function () {}, "jsonp").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            }
        });
    }
});

$('#individual').click(function(){
    if(!$(this).hasClass('active_state')){
        $(this).addClass('active_state');
        $('#business').removeClass('active_state');
        $('#business_wrapper').hide();
        $('#individual_wrapper').show();
    }
})

$('#business').click(function(){
    if(!$(this).hasClass('active_state')){
        $(this).addClass('active_state');
        $('#business_wrapper').show();
        $('#individual_wrapper').hide();
        $('#individual').removeClass('active_state');
    }
})

$('.upload_doc').change(function(e){
    var fileName = e.target.files[0].name;
    //    $('#passport_file_name').val(fileName);
    e.target.parentElement.previousElementSibling.children[0].value = fileName;
    console.log(e);
});


/**
 * forEach implementation for Objects/NodeLists/Arrays, automatic type loops and context options
 *
 * @private
 * @author Todd Motto
 * @link https://github.com/toddmotto/foreach
 * @param {Array|Object|NodeList} collection - Collection of items to iterate, could be an Array, Object or NodeList
 * @callback requestCallback      callback   - Callback function for each iteration.
 * @param {Array|Object|NodeList} scope=null - Object/NodeList/Array that forEach is iterating over, to use as the this value when executing callback.
 * @returns {}
 */
var forEach = function (t, o, r) {
    if ("[object Object]" === Object.prototype.toString.call(t))
        for (var c in t)
            Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
    else for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t);
};

var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
    forEach(hamburgers, function (hamburger) {
        hamburger.addEventListener(
            "click",
            function () {
                this.classList.toggle("is-active");
            },
            false
        );
    });
}

