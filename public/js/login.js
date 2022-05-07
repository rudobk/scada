const button = document.getElementById('submit-btn');
button.addEventListener('click', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  login(username, password);
});

const login = async (username, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/user/login',
      data: {
        username,
        password,
      },
    });
    // console.log('OK');
    if (res.data.status === 'success') {
      alert('Đăng nhập thành công');
      window.setTimeout(() => {
        location.assign('/manage');
      }, 1500);
    }
  } catch (err) {
    alert('Tài khoản hoặc mật khẩu không chính xác!');
  }
};
