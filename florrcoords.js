// ==UserScript==
// @name         Florrio Pos Displayer
// @author       ABC
// @namespace    Tracks and displays values in the memory throughout time
// @description  Tracks and displays values in the memory throughout time
// @match        https://florr.io/
// @run-at       document-start
// @grant        none
// ==/UserScript==

const state = {
    address: -1,
    memory: new Float32Array(4)
};

let posArray, startingTime, log;
log = false;

const _instWasm = window.WebAssembly.instantiate;
window.WebAssembly.instantiate = function(bin, imports) {
    state.memory = new Float32Array(imports.env.memory.buffer);
    return _instWasm(bin, imports);
}

function drawPos() {
    if (state.address === -1) return;
    if (log) posArray.push(state.memory[state.address - 1].toFixed(8),
        state.memory[state.address].toFixed(8),
        Date.now() - startingTime
    );
    const ctx = document.querySelector('#canvas').getContext('2d');
    ctx.font = 'bold 30px Ubuntu';
    const text = `(${state.memory[state.address - 1].toFixed(8)}, ${state.memory[state.address].toFixed(8)})`;
    const textMeasurements = ctx.measureText(text);

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.strokeText(
        text,
        (window.innerWidth - 10) * window.devicePixelRatio - textMeasurements.width,
        (window.innerHeight - 10) * window.devicePixelRatio
    );
    ctx.fillText(
        text,
        (window.innerWidth - 10) * window.devicePixelRatio - textMeasurements.width,
        (window.innerHeight - 10) * window.devicePixelRatio
    );
}

const _animFrame = window.requestAnimationFrame;
window.requestAnimationFrame = function(drawFrame) {
    _animFrame(t => {
        drawFrame(t);
        drawPos();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('button');
    btn.innerText = 'Track Pos';
    btn.style.position = 'absolute';
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        btn.innerText = 'ReTrack Pos';
        state.address = state.memory.indexOf(-2000);
    });
});

window.addEventListener("keydown", k => {
    if (k.code === "KeyM") {
        if (log === false) {
            log = true;
            startingTime = Date.now();
            posArray = [];
        } else {
            if (posArray) console.log(`${posArray}`);
            log = false;
        }
    }
});