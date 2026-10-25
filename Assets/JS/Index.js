// NHAP SO

let input = "";

const boxes = document.querySelectorAll('.box');
const buttons = document.querySelectorAll('.button');

function updateBoxes() {
    boxes.forEach((box, index) => {
        box.textContent = index < input.length ? "●" : "";
    });
}
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            THONGBAO.hidden = true;
            if (input.length < 4) {
                input += button.textContent;
                updateBoxes();
            }
        });
    });
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            input = input.slice(0, -1);
            updateBoxes();
        });
    })
// END NHAP SO

// KIEM TRA MAT KHAU

const PASSCODE = "3010";
const unlockButton = document.getElementById('unlock');
const THONGBAO = document.getElementById('tb');



unlockButton.addEventListener('click', () => {
    
    if (input === PASSCODE) {
        THONGBAO.hidden = true;
        setTimeout(() => {
        document.getElementById("passcode").classList.add("hidden");
        document.getElementById("main").classList.remove("hidden");
        document.getElementById("music").play();
        setTimeout(() => fire(500), 1000);
        }, 800);
    } else {
        THONGBAO.hidden = false;
        THONGBAO.textContent = 'Sai mật khẩu! Thử lại nhé.'
        const boxesWrap = document.getElementById("box");
        boxesWrap.classList.add("shake");
        setTimeout(() => boxesWrap.classList.remove("shake"), 500);
        input = "";
        updateBoxes();
    }
});




// END KIEM TRA MAT KHAU


// MAIN
const svg = document.getElementById("cake");
    const NS = "http://www.w3.org/2000/svg";

    function addCandles(fromX, toX, baseY, count, color, delayStart) {
    for (let i = 0; i < count; i++) {
      const x = fromX + (toX - fromX) * i / (count - 1);

    const candle = document.createElementNS(NS, "rect");
    candle.setAttribute("x", x - 4);
    candle.setAttribute("y", baseY - 14);
    candle.setAttribute("width", 8);
    candle.setAttribute("height", 14);
    candle.setAttribute("rx", 2);
    candle.setAttribute("fill", color);
    svg.appendChild(candle);

    const flame = document.createElementNS(NS, "ellipse");
        flame.setAttribute("class", "flame");
        flame.setAttribute("cx", x);
        flame.setAttribute("cy", baseY - 21);
        flame.setAttribute("rx", 4);
        flame.setAttribute("ry", 7);
        flame.setAttribute("fill", "#ffe14d");
        flame.style.animationDelay = (delayStart + i) * 0.2 + "s";
        svg.appendChild(flame);
    }
    }

        addCandles(70, 330, 274, 9, "#74b9ff", 0);   // tầng dưới
        addCandles(110, 290, 204, 7, "#55efc4", 9);  // tầng giữa

    const banner = document.getElementById('banner');

    function addFlags(pathId, letters, w, gap) {
        const path = document.getElementById(pathId);
        const len = path.getTotalLength();
        const total = letters.length;

    for (let i = 0; i < total; i++) {
        const d = len * (0.5 + (i - (total - 1) / 2) * gap);
        const p = path.getPointAtLength(d);
        const q = path.getPointAtLength(d + 1);
        const angle = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;

    const h = w * 1.2;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${angle})`);
    g.innerHTML = `
    <polygon fill="#f08090"
        points="${-w/2},0 ${w/2},0 ${w/2},${h} 0,${h*0.7} ${-w/2},${h}"/>
    <text x="0" y="${h*0.4}" fill="white" font-size="${w*0.6}"
        font-weight="bold" text-anchor="middle" dominant-baseline="middle">
        ${letters[i]}
    </text>`;
    banner.appendChild(g);
    }
}
    addFlags('string1', 'HAPPY', 80, 0.12);
    addFlags('string2', 'BIRTHDAY', 70, 0.09);



const CARD = '#thiep';   

const cv = document.getElementById('confetti');
const ctx = cv.getContext('2d');
let W, H, parts = [], running = false;

function resize() {
    const d = devicePixelRatio || 1;
    W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
}
resize();
addEventListener('resize', resize);

const COLORS = ['#ff8fb1', '#ffe08a', '#9fd3ff', '#cdb4ff', '#a8ecd0', '#ffffff'];

// dir = 1: bắn chéo sang phải, dir = -1: bắn chéo sang trái
function burst(x, y, dir, count) {
    for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + dir * (0.15 + Math.random() * 0.9);
        const land = W > H;  
        const speed = (H / (land ? 24 : 38)) * (0.6 + Math.random() * 0.9);
        parts.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            w: 6 + Math.random() * 6,
            h: 4 + Math.random() * 5,
            rot: Math.random() * 6,
            vr: (Math.random() - .5) * .3,
            tilt: Math.random() * 6,
            c: COLORS[Math.floor(Math.random() * COLORS.length)],
            life: 1
        });
    }
}

function loop() {
    ctx.clearRect(0, 0, W, H);
    parts = parts.filter(p => p.y < H + 20 && p.life > 0);
    for (const p of parts) {
        p.vx *= .999;
        p.vy = p.vy * .99 + .3;
        p.x += p.vx; p.y += p.vy;
        p.rot += p.vr; p.tilt += .15;
        p.life -= .004;
        ctx.save();
        ctx.globalAlpha = Math.min(1, p.life * 2);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, Math.cos(p.tilt));
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
    }
    if (parts.length) requestAnimationFrame(loop);
    else running = false;
}

// bắn từ 2 hộp quà ở góc dưới
function fire(count) {
    burst(W * 0.1, H * 0.88, 1, count);
    burst(W * 0.9, H * 0.88, -1, count);
    if (!running) { running = true; requestAnimationFrame(loop); }
}

// Lần 1: 2 giây sau khi mở trang
// setTimeout(() => fire(100), 2000);

// Lần 2: bấm thiệp -> giấy trồi lên -> lời chúc hiện ra thì bắn
const letter = document.getElementById('letter');
document.querySelector(CARD).addEventListener('click', () => {
    if (letter.classList.contains('show')) return;
    letter.classList.add('show');
    setTimeout(() => fire(500), 500);   // 0.5s: lúc giấy đã trồi lên gần hết
});


document.addEventListener('click', (e) => {
    if (e.target.closest('#thiep')) return;   
    letter.classList.remove('show');
})
const music = document.getElementById("music");
const volBtn = document.getElementById("volBtn");

volBtn.addEventListener("click", () => {
    music.muted = !music.muted;
    volBtn.textContent = music.muted ? "🔇" : "🔊";
});


    