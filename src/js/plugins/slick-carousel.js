// src/js/plugins/slick-carousel.js

// Bạn có thể chỉ cần import và khởi tạo Slick tại đây nếu nó cần thiết cho toàn bộ ứng dụng
import 'slick-carousel';  // Sử dụng npm package của slick carousel

export function initializeSlick() {
  $(document).ready(function() {
    $('.your-slider').slick({
      slidesToShow: 3,
      autoplay: true,
    });
  });
}
