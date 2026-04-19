document.addEventListener('DOMContentLoaded', () => {
    const btnAdd = document.getElementById('btnAddSubject');
    const tbody = document.getElementById('subjectBody');
    const form = document.getElementById('programForm');

    // Logic 1: Thêm dòng môn học mới khi bấm nút "+"
    btnAdd.addEventListener('click', () => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="sub-name" placeholder="VD: Phân tích thiết kế UML" required></td>
            <td><input type="number" class="sub-credit" min="1" max="5" value="3" required></td>
            <td>
                <select class="sub-type">
                    <option value="Bắt buộc">Bắt buộc</option>
                    <option value="Tự chọn">Tự chọn</option>
                </select>
            </td>
            <td><button type="button" class="btn-delete" onclick="removeRow(this)">Xóa</button></td>
        `;
        tbody.appendChild(tr);
    });

    // Logic 2: Gom dữ liệu khi bấm nút "Lưu"
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn trang bị load lại

        // Lấy thông tin chung
        const programData = {
            name: document.getElementById('programName').value,
            level: document.getElementById('programLevel').value,
            subjects: [] // Mảng chứa các môn học
        };

        // Quét từng dòng trong bảng để lấy danh sách môn
        const rows = document.querySelectorAll('#subjectBody tr');
        rows.forEach(row => {
            const subject = {
                subjectName: row.querySelector('.sub-name').value,
                credits: parseInt(row.querySelector('.sub-credit').value),
                type: row.querySelector('.sub-type').value
            };
            programData.subjects.push(subject);
        });

        // Log ra console để bạn xem cấu trúc JSON sẽ gửi đi
        console.log("Dữ liệu JSON sẽ gửi xuống Spring Boot:", JSON.stringify(programData, null, 2));

        // Code thực tế gửi API sẽ viết ở đây (dùng fetch)
        alert("Đã gom dữ liệu xong! Bật F12 lên xem cấu trúc JSON ở tab Console nhé.");
    });
});

// Logic 3: Xóa một dòng môn học
function removeRow(btn) {
    const row = btn.closest('tr');
    // Không cho xóa nếu chỉ còn 1 dòng
    if (document.querySelectorAll('#subjectBody tr').length > 1) {
        row.remove();
    } else {
        alert("Phải có ít nhất 1 môn học trong chương trình!");
    }
}