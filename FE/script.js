const btn = document.getElementById('findMeBtn');
const statusText = document.getElementById('status');
const resultBox = document.getElementById('result');

btn.addEventListener('click', () => {
    // 1. Kiểm tra trình duyệt có hỗ trợ GPS không
    if (!navigator.geolocation) {
        statusText.textContent = "Trình duyệt của bạn không hỗ trợ định vị.";
        return;
    }

    statusText.textContent = "Đang lấy tọa độ...";
    btn.disabled = true;

    // 2. Lấy tọa độ
    navigator.geolocation.getCurrentPosition(success, error);
});

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    statusText.textContent = `Đã có tọa độ (${lat.toFixed(4)}, ${lon.toFixed(4)}). Đang gửi về Server...`;
    
    // 3. Gửi tọa độ về Server Python (API)
    sendToBackend(lat, lon);
}

function error() {
    statusText.textContent = "Không thể lấy vị trí. Hãy bật GPS hoặc cấp quyền.";
    btn.disabled = false;
}

async function sendToBackend(lat, lon) {
    try {
        const response = await fetch('https://testdeploy-be-enfr.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lat: lat, lon: lon })
        });

        const data = await response.json();

        if (response.ok) {
            // 4. Hiển thị kết quả trả về từ Python
            document.getElementById('coords').textContent = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
            document.getElementById('city-name').textContent = data.city;
            document.getElementById('full-addr').textContent = data.full_address;
            
            resultBox.classList.remove('hidden');
            statusText.textContent = "Hoàn tất!";
        } else {
            statusText.textContent = "Lỗi Server: " + data.error;
        }

    } catch (err) {
        console.error(err);
        statusText.textContent = "Không kết nối được với Server Python!";
    } finally {
        btn.disabled = false;
    }
}