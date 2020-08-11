const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#fff';
    ctx.fill();
};

const draw = function(ctx, cities) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#555';

    for (let city of cities) {
        drawCity(ctx, city);
    }
};

const drawCity = function(ctx, city) {
    for (let path of city.paths) {
        ctx.fillStyle = city.color;
        drawPath(ctx, path);
    }
};

const drawPath = function(ctx, path) {
    if (!path.ctxPath) {
        path.init();
    }
    ctx.fill(path.ctxPath);
    ctx.stroke(path.ctxPath);
};

export default {
    addBackground,
    draw
}