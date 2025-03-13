const PI_100_DIGITS = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

let zoomLevels = [...Array.from({ length: 100 }, (_, i) => {
    const decimals = i + 1;
    const piValue = parseFloat(PI_100_DIGITS.substring(0, decimals + 2));
    return {
        start: piValue - Math.pow(10, -decimals),
        end: piValue + Math.pow(10, -decimals),
        interval: Math.pow(10, -decimals),
        decimals: decimals
    };
})];

let zoomIndex = 0;
const numberLine = document.getElementById("numberLine");

function drawNumberLine() {
    numberLine.innerHTML = ""; // Clear previous ticks

    let { start, end, interval, decimals } = zoomLevels[zoomIndex];
    let width = numberLine.clientWidth;

    // Draw tick marks and labels
    for (let i = start; i <= end; i += interval) {
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

        numberLine.appendChild(tick);
        numberLine.appendChild(label);
    }

    // Add π symbol at the correct position
    let pi = parseFloat(PI_100_DIGITS.substring(0, decimals + 2));
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
