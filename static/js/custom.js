$(document).ready(function() {
    $('#jqtest').html('<h2>Jwuery Ready</h2>')
    $("#category").change(function() {
        var val = $(this).val();
        if (val == "other") {
            $("#subcategory").html('<option value="birds">Birds</option><option value="reptiles">Reptiles</option><option value="fish">Fish</option><option value="hamsters">Hamsters</option><option value="other">Other</option>')
        } else {
            $("#subcategory").html('<option value="general">General</option><option value="health">Health</option><option value="training">Training</option><option value="adoptions">Adoption</option><option value="other">Other</option>')
        }; 
    });

});