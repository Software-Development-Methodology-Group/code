// Data giả lập (Mô phỏng dữ liệu AI trả về)
let courses = [
    { id: 1, name: "Kiểm thử và đảm bảo chất lượng PM", classCode: "KTPM.K22A.D1.K2.N01", teacher: "Nguyễn Lan Oanh", room: "F301", shift: "Ca 1", days: "2-4-6", credits: 3, weeks: "8/9", score: "100%" },
    { id: 2, name: "Lập trình ứng dụng Java", classCode: "MOB1023.K22A.N02", teacher: "Tô Hữu Nguyên", room: "F302", shift: "Ca 2", days: "3-5-7", credits: 4, weeks: "7/12", score: "98%" },
    { id: 3, name: "Phân tích yêu cầu phần mềm", classCode: "AMS431.K22A.N01", teacher: "Phạm Thị Thương", room: "P201", shift: "Ca 3", days: "2-4-6", credits: 3, weeks: "5/9", score: "100%" },
    { id: 4, name: "Quản lý dự án CNTT", classCode: "PRO101.K22A.N03", teacher: "Bùi Ngọc Tuấn", room: "Online", shift: "Ca 4", days: "3-5-7", credits: 3, weeks: "7/9", score: "95%" },
];

// --- Navigation Logic ---
function switchSection(id) {
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.step-item').forEach(el => el.classList.remove('active'));
    
    document.getElementById('section-' + id).classList.add('active');
    
    // Update steps visual
    if(id === 'input') document.getElementById('step1-nav').classList.add('active');
    if(id === 'ai') document.getElementById('step2-nav').classList.add('active');
    if(id === 'result') {
        document.getElementById('step1-nav').classList.add('active');
        document.getElementById('step2-nav').classList.add('active');
        document.getElementById('step3-nav').classList.add('active');
    }
}

function goToAI() {
    switchSection('ai');
    setTimeout(() => {
        renderList();
        switchSection('result');
    }, 2000); // Giả lập AI chạy 2 giây
}

// --- Render List Function ---
function renderList() {
    const container = document.getElementById('courseListContainer');
    container.innerHTML = '';

    courses.forEach(c => {
        const html = `
            <div class="course-item" onclick="openModal(${c.id})">
                <div class="score-circle">${c.score}</div>
                <div class="course-info">
                    <div class="course-name">${c.name}</div>
                    <div class="course-meta">
                        <strong>${c.classCode}</strong> - GV: ${c.teacher} <br>
                        <span style="color: #e67e22"><i class="fa-solid fa-location-dot"></i> ${c.room}</span> | 
                        <span><i class="fa-regular fa-clock"></i> ${c.shift} (${c.days})</span>
                    </div>
                </div>
                <div class="course-stats">
                    <div class="stat-box">
                        <h4>${c.credits}</h4>
                        <span>Tín chỉ</span>
                    </div>
                    <div class="stat-box">
                        <h4>${c.weeks}</h4>
                        <span>Tuần</span>
                    </div>
                    <div class="stat-box">
                        <h4>0</h4>
                        <span>Xung đột</span>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// --- Modal Edit Logic ---
let currentEditingId = null;

function openModal(id) {
    const course = courses.find(c => c.id === id);
    currentEditingId = id;

    // Fill data to form
    document.getElementById('edit-name').value = course.name + " (" + course.classCode + ")";
    document.getElementById('edit-teacher').value = course.teacher; 
    document.getElementById('edit-room').value = course.room;
    document.getElementById('edit-shift').value = course.shift;
    document.getElementById('edit-days').value = course.days;

    // Show Modal
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveChanges() {
    // Update data array
    const newTeacher = document.getElementById('edit-teacher').value;
    const newRoom = document.getElementById('edit-room').value;
    const newShift = document.getElementById('edit-shift').value;
    const newDays = document.getElementById('edit-days').value;

    const idx = courses.findIndex(c => c.id === currentEditingId);
    if (idx !== -1) {
        courses[idx].teacher = newTeacher;
        courses[idx].room = newRoom;
        courses[idx].shift = newShift;
        courses[idx].days = newDays;
        
        // Giả lập tính toán lại AI Score khi đổi dữ liệu
        courses[idx].score = "Manual"; 
    }

    renderList(); // Re-render list
    closeModal();
    alert("Đã cập nhật thông tin lớp học!");
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == document.getElementById('editModal')) {
        closeModal();
    }
}
