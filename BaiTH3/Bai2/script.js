$(function () {
  console.log("jQuery is ready!");

  $('#register-form').on('submit', function (e) {
    e.preventDefault();
    $('.error').text(''); // Clear errors

    const fullname = $('#fullname').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();

    let hasError = false;

    if (fullname === '') {
      $('#err-fullname').text('Họ tên không được để trống.');
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $('#err-email').text('Email không hợp lệ.');
      hasError = true;
    }

    if (password.length < 6) {
      $('#err-password').text('Mật khẩu phải từ 6 ký tự trở lên.');
      hasError = true;
    }

    if (hasError) return;

    // Gửi AJAX POST
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts', // endpoint giả lập
      method: 'POST',
      data: {
        fullname: fullname,
        email: email,
        password: password
      },
      success: function (response) {
        $('#register-form').slideUp();
        $('#message').html(`<strong>Đăng ký thành công!</strong><br/>`).fadeIn();
      },
      error: function () {
        $('#message').html('<strong>Đăng ký thất bại.</strong> Vui lòng thử lại sau.').fadeIn();
      }
    });
  });
});
