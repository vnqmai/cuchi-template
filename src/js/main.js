$(function () {
  // DATEPICKER
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

  // SLICK: https://kenwheeler.github.io/slick/
  $(".cucci-slick").slick({
    centerMode: true,
    centerPadding: "20%",
    prevArrow: $('.cucci-slick-prev'),
    nextArrow: $('.cucci-slick-next'),
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
  $(".cucci-slick-2").slick({
    nextArrow: $('.cucci-slick-next'),
    slidesToShow: 1,
  });
  $(".cucci-slick-3").slick({
    prevArrow: $('.cucci-slick-3-prev'),
    nextArrow: $('.cucci-slick-3-next'),
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          slidesToShow: 1,
        },
      },
    ],
  });

  $("#header-more-button").on("click", function () {
    $("#header-more-button").toggleClass("hide");
    $("#header-drawer").toggleClass("show");
  });

  $("#header-close-button").on("click", function () {
    $("#header-more-button").toggleClass("hide");
    $("#header-drawer").toggleClass("show");
  });
});
