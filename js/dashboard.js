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

