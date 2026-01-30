// Dữ liệu giả lập (Danh sách môn học đầu vào)
// Trạng thái: 100% nghĩa là dữ liệu đầy đủ, sẵn sàng chạy AI
let inputData = [
    { id: 1, name: "Kiểm thử và đảm bảo chất lượng PM", code: "KTPM.K22A.D1.K2.N01", teacher: "Nguyễn Lan Oanh", room: "F301", credits: 3, weeks: "8/9", score: "100%" },
    { id: 2, name: "Lập trình ứng dụng Java", code: "MOB1023.K22A.N02", teacher: "Tô Hữu Nguyên", room: "F302", credits: 4, weeks: "7/12", score: "100%" },
    { id: 3, name: "Phân tích yêu cầu phần mềm", code: "AMS431.K22A.N01", teacher: "Phạm Thị Thương", room: "P201", credits: 3, weeks: "5/9", score: "100%" },
    { id: 4, name: "Phương pháp phát triển PM HĐT", code: "KTPM.K22A.D1.K2.N01", teacher: "Nguyễn Văn Núi", room: "Online", credits: 3, weeks: "8/9", score: "100%" },
    { id: 5, name: "Quản lý dự án CNTT", code: "PRO101.K22A.N03", teacher: "Bùi Ngọc Tuấn", room: "Online", credits: 3, weeks: "7/9", score: "100%" },
];

// --- 1. Render Danh Sách Đầu Vào ---
function renderInputList() {
    const container = document.getElementById('inputListContainer');
    container.innerHTML = '';

    inputData.forEach(item => {
        const html = `
            <div class="course-item" onclick="openModal(${item.id})">
                <div class="circle-progress">${item.score}</div>
                <div class="course-info">
                    <div class="course-name">${item.name}</div>
                    <div class="course-code">${item.code} - ${item.id}</div>
                    <div class="course-sub">
                        <span><i class="fa-solid fa-user-tie"></i> ${item.teacher}</span>
                        <span><i class="fa-solid fa-location-dot"></i> ${item.room}</span>
                    </div>
                </div>
                <div class="course-stats">
                    <div class="stat-box">
                        <h4>${item.credits}</h4>
                        <span>Tín chỉ</span>
                    </div>
                    <div class="stat-box">
                        <h4>${item.weeks}</h4>
                        <span>Tuần</span>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Gọi hàm này ngay khi trang web tải xong
document.addEventListener('DOMContentLoaded', () => {
    renderInputList();
});


// --- 2. Xử lý Chuyển Tab (Wizard) ---
function goToAI() {
    // Chuyển sang tab AI
    document.getElementById('section-input').classList.remove('active');
    document.getElementById('section-ai').classList.add('active');
    document.getElementById('step2-nav').classList.add('active');

    // Giả lập chạy AI trong 3 giây
    setTimeout(() => {
        document.getElementById('section-ai').classList.remove('active');
        document.getElementById('section-result').classList.add('active');
        document.getElementById('step3-nav').classList.add('active');
        
        // Render kết quả (Ở đây mình demo hiển thị lại list cũ thôi, thực tế sẽ là list mới)
        const resultContainer = document.getElementById('resultListContainer');
        resultContainer.innerHTML = document.getElementById('inputListContainer').innerHTML;
    }, 3000);
}


// --- 3. Xử lý Modal (Xem & Sửa chi tiết) ---
let currentId = null;

function openModal(id) {
    const item = inputData.find(c => c.id === id);
    if (!item) return;

    currentId = id;
    
    // Đổ dữ liệu vào Form
    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-code').value = item.code;
    document.getElementById('edit-teacher').value = item.teacher;
    document.getElementById('edit-room').value = item.room;
    document.getElementById('edit-credits').value = item.credits;
    document.getElementById('edit-weeks').value = item.weeks;

    // Hiện Modal
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveChanges() {
    // Lưu dữ liệu từ form vào mảng
    const newName = document.getElementById('edit-name').value;
    const newTeacher = document.getElementById('edit-teacher').value;
    const newRoom = document.getElementById('edit-room').value;

    const index = inputData.findIndex(c => c.id === currentId);
    if (index !== -1) {
        inputData[index].name = newName;
        inputData[index].teacher = newTeacher;
        inputData[index].room = newRoom;
        
        // Render lại danh sách để thấy thay đổi
        renderInputList();
    }
    
    closeModal();
    alert("Đã cập nhật dữ liệu môn học!");
}

// Đóng modal khi bấm ra ngoài
window.onclick = function(event) {
    if (event.target == document.getElementById('editModal')) {
        closeModal();
    }
}
