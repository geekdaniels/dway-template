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
