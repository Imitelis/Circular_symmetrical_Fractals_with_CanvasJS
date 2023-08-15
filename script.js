window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // canvas settings
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    
    // fractal settings
    let single = false;
    let simple = true;
    let odd = false;
    const maxLevel = 4;
    const branches = 2;

    let spread = 0.7;
    let sides = 9;
    let scale = 0.5;
    let lineWidth = 12;
    let size = 125;
    let color = 'hsl(148, 100%, 50%)';
    
    // controls
    const randomButton = document.getElementById("random-button");
    const sliderSpread = document.getElementById("spread");
    const labelSpread = document.querySelector('[for="spread"]');
    const sliderSides = document.getElementById("sides");
    const labelSides = document.querySelector('[for="sides"]');
    const sliderScale = document.getElementById("scale");
    const labelScale = document.querySelector('[for="scale"]');
    const sliderLineWidth = document.getElementById("line-width");
    const labelLineWidth = document.querySelector('[for="line-width"]');
    const sliderSize = document.getElementById("size");
    const labelSize = document.querySelector('[for="size"]');
    const radioSingle = document.getElementById("single");
    const radioDoubled = document.getElementById("doubled");
    const radioSimple = document.getElementById("simple");
    const radioDotted = document.getElementById("dotted");
    const radioOdd = document.getElementById("odd");
    const radioEven = document.getElementById("even");
    const resetButton = document.getElementById("reset-button");
    
    radioDoubled.checked = true;
    radioSimple.checked = true;
    radioEven.checked = true;

    // functions
    function drawBranch(level) {
        if (level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();        
        
        if (single) {
            for (let i = 0; i < branches; i++) {
                ctx.save();
                ctx.translate(size - (size/branches) * i, spread);
                ctx.scale(scale, scale)
                
                ctx.save()
                ctx.rotate(spread);
                drawBranch(level + 1);
                ctx.restore();
    
                ctx.restore();
            }
        } else {
            for (let i = 0; i < branches; i++) {
                ctx.save();
                ctx.translate(size - (size/branches) * i, spread);
                ctx.scale(scale, scale)
                
                ctx.save()
                ctx.rotate(spread);
                drawBranch(level + 1);
                ctx.restore();
    
                ctx.save();    
                ctx.rotate(-spread);
                drawBranch(level + 1);
                ctx.restore();
    
                ctx.restore();
            }
        }

        if (!simple && odd) {
            ctx.beginPath();
            ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
            ctx.fill();
            
        } else if (!simple && !odd) {
            ctx.beginPath();
            ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(0, -size, size * 0.1, 0, Math.PI * 2);
            ctx.fill();
        }      
    };

    function drawFractal() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.translate(canvas.width/2, canvas.height/2);
        for (let i = 0; i < sides; i++) {        
            ctx.rotate((Math.PI * 2)/sides);
            drawBranch(0);
        } 
        ctx.restore();
    };

    function randomizeFractal(){
        spread = Math.floor(Math.random() * 8 + 2) * 0.1;
        sides = Math.floor(Math.random() * 22 + 2);
        scale = Math.floor(Math.random() * 4 + 4) * 0.1;
        color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        lineWidth = Math.floor(Math.random() * 30 + 5);
        size = canvas.height < canvas.width ? Math.min(Math.floor(canvas.height * 0.25), Math.floor(Math.random() * 75 + 75)): Math.min(Math.floor(canvas.width * 0.25), Math.floor(Math.random() * 75 + 75));
        simple = Math.random() < 0.5;
        single = Math.random() < 0.5;
        odd = Math.random() < 0.5;
    };

    function updateSliders(){
        sliderSpread.value = spread;
        labelSpread.innerText = Number(spread).toFixed(2) + ' rads';
        sliderSides.value = sides;
        labelSides.innerText = Number(sides);
        sliderScale.value = scale;
        labelScale.innerText = Number(scale).toFixed(2);
        sliderLineWidth.value = lineWidth;
        labelLineWidth.innerText = Number(lineWidth) + ' px';
        sliderSize.value = size;
        labelSize.innerText = Number(size) + ' px';
        radioSingle.checked = single;
        radioDoubled.checked = !single;
        radioSimple.checked = simple;
        radioDotted.checked = !simple;
        radioOdd.checked = odd;
        radioEven.checked = !odd;
    };

    drawFractal();
    updateSliders();

    // eventListeners
    randomButton.addEventListener('click', function(){
        randomizeFractal();
        updateSliders();
        drawFractal();
    });

    resetButton.addEventListener('click', function(){
        sides = 9;
        scale = 0.5;
        spread = 0.7;
        color = 'hsl(148, 100%, 50%)';
        lineWidth = 12;
        size = 125;
        single = false;
        radioSingle.checked = false;
        radioDoubled.checked = true;
        simple = true;
        radioSimple.checked = true;
        radioDotted.checked = false;
        odd = false;
        radioOdd.checked = false;
        radioEven.checked = true;
        updateSliders();
        drawFractal();
    });

    sliderSpread.addEventListener('change', function(event) {
        spread = event.target.value;
        updateSliders();
        drawFractal();        
    });

    sliderSides.addEventListener('change', function(event) {
        sides = event.target.value;
        updateSliders();
        drawFractal();        
    });

    sliderScale.addEventListener('change', function(event) {
        scale = event.target.value;
        updateSliders();
        drawFractal();        
    });

    sliderLineWidth.addEventListener('change', function(event) {
        lineWidth = event.target.value;
        updateSliders();
        drawFractal();        
    });

    sliderSize.addEventListener('change', function(event) {
        size = event.target.value;
        updateSliders();
        drawFractal();        
    });

    radioSingle.addEventListener('click', function(){
        single = true;
        radioSingle.checked = true;
        radioDoubled.checked = false;
        drawFractal();
    });

    radioDoubled.addEventListener('click', function(){
        single = false;
        radioSingle.checked = false;
        radioDoubled.checked = true;
        drawFractal();
    });

    radioSimple.addEventListener('click', function(){
        simple = true;
        radioSimple.checked = true;
        radioDotted.checked = false;
        drawFractal();
    });

    radioDotted.addEventListener('click', function(){
        simple = false;
        radioSimple.checked = false;
        radioDotted.checked = true;
        drawFractal();
    });

    radioOdd.addEventListener('click', function(){
        odd = true;
        radioOdd.checked = true;
        radioEven.checked = false;
        drawFractal();
    });

    radioEven.addEventListener('click', function(){
        odd = false;
        radioOdd.checked = false;
        radioEven.checked = true;
        drawFractal();
    });

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        size = canvas.height < canvas.width ? Math.min(Math.floor(canvas.height * 0.25), 125): Math.min(Math.floor(canvas.width * 0.25), 125);
        updateSliders();
        drawFractal();
    });

})