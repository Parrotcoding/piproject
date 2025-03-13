const zoomLevels = [
    { start: 3.0, end: 4.0, interval: 0.1, decimals: 1 },
    { start: 3.1, end: 3.2, interval: 0.01, decimals: 2 },
    { start: 3.14, end: 3.15, interval: 0.001, decimals: 3 },
    { start: 3.141, end: 3.142, interval: 0.0001, decimals: 4 },
    { start: 3.1415, end: 3.1416, interval: 0.00001, decimals: 5 },
    { start: 3.14159, end: 3.14160, interval: 0.000001, decimals: 6 },
    { start: 3.141592, end: 3.141593, interval: 0.0000001, decimals: 7 },
    { start: 3.1415926, end: 3.1415927, interval: 0.00000001, decimals: 8 },
    { start: 3.14159265, end: 3.14159266, interval: 0.000000001, decimals: 9 },
    { start: 3.141592653, end: 3.141592654, interval: 0.0000000001, decimals: 10 }
];

let zoomIndex = 0;
const numberLine = document.getElementById("numberLine");

function drawNumberLine() {
    numberLine.innerHTML = ""; // Clear previous ticks

    let { start, end, interval, decimals } = zoomLevels[zoomIndex];
    let width = numberLine.clientWidth;

    // Simulate zoom illusion by reducing the spacing between tick marks
    let maxTicks = 20;
    let step = Math.max(1, Math.floor((end - start) / interval / maxTicks));

    for (let i = start; i <= end; i += interval * step) {
        let position = ((i - start) / (end - start)) * width;
        
        // Create tick mark
        let tick = document.createElement("div");
        tick.className = "tick";
        tick.style.left = position + "px";

        // Create tick label
        let label = document.createElement("div");
        label.className = "tick-label";
        label.style.left = position + "px";
        label.textContent = i.toFixed(decimals);
        label.style.opacity = 0; // Fade-in effect

        setTimeout(() => {
            label.style.opacity = 1;
        }, 200);

        numberLine.appendChild(tick);
        numberLine.appendChild(label);
    }

    // Add π symbol at the correct position
    let pi = 3.1415926535;
    let piPosition = ((pi - start) / (end - start)) * width;
    let piSymbol = document.createElement("div");
    piSymbol.className = "pi-symbol";
    piSymbol.style.left = piPosition + "px";
    piSymbol.textContent = "π";

    numberLine.appendChild(piSymbol);
}

function zoomIn() {
    if (zoomIndex < zoomLevels.length - 1) {
        zoomIndex++;
        drawNumberLine();
    }
}

function zoomOut() {
    if (zoomIndex > 0) {
        zoomIndex--;
        drawNumberLine();
    }
}

// Initial draw
drawNumberLine();
