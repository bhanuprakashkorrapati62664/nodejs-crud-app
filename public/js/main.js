$(document).ready(function () {
  $(".delete-user").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $target = $(e.target);
    var id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/user/" + id,
      success: function (res) {
        alert("Deleting user data");
        window.location.href = "/";
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
