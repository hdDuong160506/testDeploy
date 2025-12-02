document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('testBtn');
    const msg = document.getElementById('status-msg');

    btn.addEventListener('click', () => {
        msg.textContent = "✅ JavaScript hoạt động tốt trên Vercel!";
        msg.style.color = "green";
        
        // Hiệu ứng pháo hoa nhỏ (đổi màu nút)
        btn.textContent = "Đã kiểm tra!";
        btn.style.backgroundColor = "#28a745";
        btn.disabled = true;
    });
});