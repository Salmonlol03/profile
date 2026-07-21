const fileInput = document.getElementById('fileInput');
const fallback = document.getElementById('fallback');
const slider = document.getElementById('videoBoxs');
const avatar = document.getElementById('avatar');
const ctxMenu = document.getElementById('ctxMenu');
const changeBtn = document.getElementById('changeBtn');
const resetBtn = document.getElementById('resetBtn');

// จำรูปเริ่มต้นไว้ใช้ตอนกด "รีเซ็ต"
const defaultProfileSrc = profileImg ? profileImg.getAttribute('src') : '';

// เปิดเมนูคลิกขวาที่รูปโปรไฟล์
if (avatar && ctxMenu) {
  avatar.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    ctxMenu.style.left = `${e.pageX}px`;
    ctxMenu.style.top = `${e.pageY}px`;
    ctxMenu.style.display = 'flex';
  });

  document.addEventListener('click', () => {
    ctxMenu.style.display = 'none';
  });
}

if (changeBtn && fileInput) {
  changeBtn.addEventListener('click', () => {
    fileInput.click();
  });
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('profileImage');
    if (profileImg) {
      profileImg.src = defaultProfileSrc;
      profileImg.style.display = '';
    }
    if (fallback) fallback.style.display = 'none';
  });
}

let isDown = false;
let startX;
let scrollLeft;

if (slider) {
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // ปรับความเร็วการเลื่อนได้ตรงนี้
    slider.scrollLeft = scrollLeft - walk;
  });

  // รองรับมือถือ (touch)
  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchend', () => {
    isDown = false;
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });
}

