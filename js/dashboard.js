// A $( document ).ready() block.
$(document).ready(function () {
    var color = "20A354"
    document.documentElement.style.setProperty('--theme-color', `#${color}`);
    console.log('set')
    $('.navbar-toggler').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('body').toggleClass('no-scroll');
    });
    $('#sidebarCollapse-1').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#navbar').addClass('d-block');
    });
    $('#add_user').click(function () {
        $('#show_user_form').show("slow")
    })
    $('#close').click(function () {
        $('#show_user_form').hide("slow")
    })

    if($('.myUploader').length){
        var myUpload = new FileUploadWithPreview('myUploader', {
            text: {
                chooseFile: 'Upload Photo..'
                , browse: 'Upload'
                , selectedCount: 'files selected'
            }
        })
        }

});



if($('.file_name').length){
    $('input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;
        console.log(fileName);
        console.log(e);
        e.currentTarget.parentElement.previousElementSibling.children[0].value = fileName ;
    });
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#logo_placeholder').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#logo_image").change(function() {
    readURL(this);
});


$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})



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


