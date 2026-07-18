    const menu = document.getElementById('ctxMenu');
    const fileInput = document.getElementById('fileInput');
    const profileImg = document.getElementById('profileImg');
    const fallback = document.getElementById('fallback');
    const video = document.getElementById('myVideo');

  // ตัวอย่าง: log เมื่อวิดีโอเล่นจบ
  video.addEventListener('ended', () => {
    console.log('วิดีโอเล่นจบแล้ว');
  });



    // Hide menu on click outside
    document.addEventListener('click', () => menu.style.display = 'none');

    // Change profile picture
    document.getElementById('changeBtn').addEventListener('click', () => {
      fileInput.click();
    });

    // Reset to original
    document.getElementById('resetBtn').addEventListener('click', () => {
      localStorage.removeItem('profileImg');
      profileImg.src = 'Pictures/น้องมัจฉะ.gif';
      profileImg.style.display = '';
      fallback.style.display = 'none';
    });

    // Load selected file
    fileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        localStorage.setItem('profileImg', base64);
        profileImg.src = base64;
        profileImg.style.display = '';
        fallback.style.display = 'none';
        fileInput.value = '';
      };
      reader.readAsDataURL(file);
      fileInput.value = '';
    });

    // ตอนผู้ใช้เลือกรูป
document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const base64 = event.target.result; 
    // ^ จะได้ "data:image/png;base64,iVBORw0..."

    // เซ็ตรูปทันที
    document.getElementById('profileImg').src = base64;

    // เก็บลง localStorage ให้คงอยู่แม้รีเฟรช
    localStorage.setItem('profileImage', base64);
  };
  reader.readAsDataURL(file); // แปลงเป็น Base64
});

// ตอนโหลดหน้า ดึงรูปที่เก็บไว้มาใส่
window.addEventListener('load', function() {
  const saved = localStorage.getItem('profileImage');
  if (saved) {
    document.getElementById('profileImg').src = saved;
  }
});
