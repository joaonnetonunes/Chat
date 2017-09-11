//Tables
$(function () {
    $('#viewConversations').footable();
});
//Alerts
$('.user-delete').click(function () {
    let id = $(this).data('id');
    swal({
            title: "Are you sure?",
            text: "You won't be able to revert this action!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {
                swal("Being deleted!", "This conversation is going to be deleted now.", "success");
                setTimeout(() => {
                    $(`#${id}`).submit();
                }, 1000);
            } else {
                swal("Cancelled", "This conversation is safe :)", "error");
            }
        });
});
