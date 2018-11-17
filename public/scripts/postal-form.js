$(function () {
    $("#idForm").on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action');

        $.ajax({
            type: "GET",
            url: url,
            data: form.serialize(),
            success: function (data) {
                $('#result').html(data);
                alert(data);
            }
        });

         // avoid to execute the actual submit of the form.
    });
});
