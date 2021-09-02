const cacheDOM = {
    clearBtn: document.querySelector('.clearBtn'),
    recognizeBtn: document.querySelector('.recognizeBtn'),
    drawBoard: document.querySelector('.drawBoard'),
    allPix: document.querySelectorAll('.pix'),
};

const drawFunctionality = {
    isDrawing: false,

    drawStart: function (e) {
        if (!e.target.closest('.pix')) return;
        drawFunctionality.isDrawing = true;
    },

    draw: function (e) {
        if (!drawFunctionality.isDrawing) return;
        e.target.style.backgroundColor = 'black';
    },

    drawEnd: function (e) {
        drawFunctionality.isDrawing = false;
    },

    clear: function (e) {
        cacheDOM.allPix.forEach((p) => (p.style.backgroundColor = 'white'));
    },
};

//draw with mouse
cacheDOM.drawBoard.addEventListener('mousedown', drawFunctionality.drawStart);
cacheDOM.drawBoard.addEventListener('mousemove', drawFunctionality.draw);
cacheDOM.drawBoard.addEventListener('mouseup', drawFunctionality.drawEnd);

//draw on touch screen
cacheDOM.drawBoard.addEventListener('touchstart', drawFunctionality.drawStart);
cacheDOM.drawBoard.addEventListener('touchmove', drawFunctionality.draw);
cacheDOM.drawBoard.addEventListener('touchend', drawFunctionality.drawEnd);

//buttons
cacheDOM.clearBtn.addEventListener('click', drawFunctionality.clear);
cacheDOM.recognizeBtn.addEventListener('click', (e) => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('height', '28');
    canvas.setAttribute('width', '28');
    var ctx = canvas.getContext('2d');
    cacheDOM.allPix.forEach((pix, i) => {
        const x = i < 28 ? i : i % 28;
        const y = i < 28 ? 0 : Math.floor(i / 28);
        ctx.fillStyle =
            pix.style.backgroundColor === 'black' ? 'white' : 'black';
        ctx.fillRect(x, y, 1, 1);
    });

    const dataURL = canvas
        .toDataURL('image/jpeg', 1.0)
        .replace('image/jpeg', 'image/octet-stream');

    var a = document.createElement('a');
    a.href = dataURL;
    a.download = 'my-canvas.jpeg';
    a.click();
});
