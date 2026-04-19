
    
       
       // --- HÀM CHUYỂN ĐỔI GIỮA ĐĂNG NHẬP VÀ ĐĂNG KÝ ---
        function toggleForms(target) {
            let loginForm = document.getElementById('loginFormSection');
            let regForm = document.getElementById('registerFormSection');

            if (target === 'register') {
                loginForm.classList.remove('active');
                regForm.classList.add('active');
            } else {
                regForm.classList.remove('active');
                loginForm.classList.add('active');
            }
        }

        // --- HÀM HIỂN THỊ THÔNG BÁO ---
        function showToast(message, bgClass) {
            let toastEl = document.getElementById('sysToast');
            let toastMsg = document.getElementById('toastMessage');
            
            toastEl.className = 'toast align-items-center border-0 ' + bgClass;
            toastMsg.innerHTML = message;
            
            new bootstrap.Toast(toastEl).show();
        }

        // --- XỬ LÝ ĐĂNG KÝ ---
        function processRegister(event) {
            event.preventDefault();
            
            let email = document.getElementById('regEmail').value.trim().toLowerCase();
            let pass = document.getElementById('regPass').value;
            let passConfirm = document.getElementById('regPassConfirm').value;
            let btn = document.getElementById('btnRegister');

            // 1. Kiểm tra Email FPT
            if (!email.endsWith('@fpt.edu.vn')) {
                showToast('<i class="bi bi-shield-lock-fill me-2"></i> Chỉ chấp nhận đăng ký bằng email @fpt.edu.vn!', 'text-bg-danger');
                return;
            }

            // 2. Kiểm tra khớp mật khẩu
            if (pass !== passConfirm) {
                showToast('<i class="bi bi-exclamation-triangle-fill me-2"></i> Mật khẩu xác nhận không khớp!', 'text-bg-warning text-dark');
                return;
            }

            // Giả lập Loading tạo tài khoản
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Đang khởi tạo...';
            btn.disabled = true;

            setTimeout(() => {
                showToast('<i class="bi bi-check-circle-fill me-2"></i> Đăng ký thành công! Đang chuyển về trang Đăng nhập.', 'text-bg-success');
                btn.innerHTML = '<i class="bi bi-person-plus-fill me-2"></i> Hoàn tất Đăng ký';
                btn.disabled = false;
                
                // Reset form và tự động lật về trang Đăng nhập
                document.getElementById('regEmail').form.reset();
                setTimeout(() => { toggleForms('login'); }, 1500);
            }, 1500);
        }

        // --- XỬ LÝ ĐĂNG NHẬP (Giữ nguyên thuật toán nhận diện tự động) ---
        function processLogin(event) {
            event.preventDefault();

            let btn = document.getElementById('btnLogin');
            let user = document.getElementById('loginUsername').value.trim().toLowerCase();
            let pass = document.getElementById('loginPassword').value;

            if(user === '' || pass === '') {
                showToast('<i class="bi bi-exclamation-triangle-fill me-2"></i> Vui lòng nhập đầy đủ thông tin!', 'text-bg-warning text-dark');
                return;
            }
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Đang xử lý...';
             btn.disabled = true;    
            // const mockDatabase = [
            //     {email:'dtc23512@fpt.edu.vn',password:'123'}
            //     {email:'taint@giang.edu.vn',password:'123'}
            // ]
            setTimeout(() => {
        // Hiện thông báo thành công
        showToast('<i class="bi bi-check-circle-fill me-2"></i> Đăng nhập thành công!', 'text-bg-success');
            
                if(user.endsWith('@fpt.edu.vn')) {
                    window.location.href = '../sinhvien/sinhvien-dashboard.html';
            }
            
               else if(user.endsWith('@giangvien.edu.vn')) {
                    window.location.href = '../lichgiangday.html';}
                else if(user.endsWith('@khaothi.edu.vn')) {
                    window.location.href = '../sinhvien/khaothi-dashboard.html';}   
                else if(user.endsWith('@hoidong.edu.vn') || user.endsWith('@bgh.edu.vn')) {
                    window.location.href = '../sinhvien/hoidong-baocao.html';}
                else {
                    window.location.href = '../sinhvien/hethong-dashboard.html';}
                },1000);
          
            // if (!user.endsWith('@fpt.edu.vn')) {
            //     showToast('<i class="bi bi-shield-lock-fill me-2"></i> Truy cập bị từ chối! Yêu cầu email @fpt.edu.vn', 'text-bg-danger');
            //     return;
            // }

            // btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Đang phân quyền...';
            // btn.disabled = true;

            // setTimeout(() => {
            //     if(pass === 'sai') {
            //         showToast('<i class="bi bi-exclamation-triangle-fill me-2"></i> Mật khẩu không chính xác!', 'text-bg-danger');
            //         btn.innerHTML = '<i class="bi bi-box-arrow-in-right me-2"></i> Đăng nhập vào hệ thống';
            //         btn.disabled = false;
            //         return;
            //     }

            //     let usernamePart = user.split('@')[0];
            //     let isStudent = /\d/.test(usernamePart);

            //     if (isStudent) {
            //         window.location.href = 'sinhvien-dashboard.html';
            //     } else {
            //         if (usernamePart === 'taint' || usernamePart === 'giangvien') window.location.href = 'lophocphan.html';
            //         else if (usernamePart === 'khaothi') window.location.href = 'khaothi-dashboard.html';
            //         else if (usernamePart === 'hoidong' || usernamePart === 'bgh') window.location.href = 'hoidong-baocao.html';
            //         else window.location.href = 'hethong-dashboard.html'; 
            //     }
            // }, 1000); 
        } function xulyDangXuat(){
            localStogate.removerItem('user');
            if(confirm("Bạn có chắc muốn đăng xuất không?")) {
                windown.alert("Đăng xuất thành công!");}
            windown.location.href='../dangnhap/dangnhap.html';
           }
           function thucHienDangXuat() {
    // Tùy vào việc bạn đang ở file nào mà trỏ đường dẫn cho đúng nhé!
    // Ví dụ đang ở sinhvien-dashboard.html thì lùi 1 bước:
    window.location.href = '../dangnhap/dangnhap.html'; 
}