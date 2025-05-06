$(function () {
  $(".datepicker")
    .datepicker({
      dateFormat: "D, M d, yy",
      altField: function () {
        return $(this).next(".datepicker-alt");
      },
      altFormat: "yy-mm-dd",
    })
    .datepicker("setDate", new Date());

  $(".datepicker").each(function () {
    const $input = $(this);
    const $icon = $input.siblings(".icon-updown");

    $input.on("focus", function () {
      $icon.addClass("icon-updown__open");
    });

    $input.on("blur", function () {
      setTimeout(() => {
        if (!$input.is(":focus")) {
          $icon.removeClass("icon-updown__open");
        }
      }, 100);
    });
  });
});
