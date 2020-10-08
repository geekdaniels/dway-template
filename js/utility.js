$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 100) {
        $('nav').addClass('fixed-top');
    } else {
        $('nav').removeClass('fixed-top');
    }
});

//Note we need a token for geocode for dwayremit
var iptoken = '';

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


// set endpoint and your API key
apiKey = 'd884e934364c264fa566';

//Set defaults

defaultAmount = $('#sender_value').val();
defaultFrom = $("#sender_currency").val();
defaultTo = $("#receiver_currency").val();

$("#sender_currency").change(function(){
    var senderCurrency = $(this).children("option:selected").val();
    var receiverCurrency = $("#receiver_currency").val();

    var amount = $('#sender_value').val();

    convert(senderCurrency,receiverCurrency,amount);
});

$("#receiver_currency").change(function(){
    var receiverCurrency = $(this).children("option:selected").val();
    var senderCurrency = $("#sender_currency").val();

    var amount = $('#sender_value').val();

    convert(senderCurrency,receiverCurrency,amount);
});

//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 2000;  //time in ms, 5 second for example
var $input = $('.input');

//on keyup, start the countdown
$input.on('keyup', function (e) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping(e), doneTypingInterval);
});

//on keydown, clear the countdown
$input.on('keydown', function () {
    clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping (e) {
    console.log(e.currentTarget.value);
    console.log('hi');
    var receiverCurrency = $("#receiver_currency").val();
    var senderCurrency = $("#sender_currency").val();

    var amount = $('#sender_value').val();

    convert(senderCurrency,receiverCurrency,amount);
}

function convert(from, to , amount) {
    console.log(from,to,amount)
    var currVal = $("#receiver_value");
    currVal.val("");

    var query = from + "_" + to;

    currVal.attr("placeholder", "Converting...");
    $.getJSON(`https://free.currconv.com/api/v7/convert?q=${query}&compact=y&apiKey=${apiKey}&callback=?`,
              function(data){
        console.log(data);
        try {
            var currencyAmount = parseFloat(amount);
            currVal.val(numeral(currencyAmount * data[query].val).format("0,0.00[0]"));
        } catch (e) {
            alert("Please enter a number in the Amount field.");
        }

        currVal.attr("placeholder", "Press Convert button");
    });
}

convert(defaultFrom, defaultTo , defaultAmount);


