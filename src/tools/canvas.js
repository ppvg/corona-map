const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#fff';
    ctx.fill();
};

const draw = function(ctx, cities, settings) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#555';

    for (let city of cities) {
        drawCity(ctx, city, settings);
    }
};

const drawCity = function(ctx, city, settings) {
    for (let path of city.paths) {
        ctx.fillStyle = city.color;
        drawPath(ctx, path, settings);
    }
};

const drawPath = function(ctx, path, settings) {
    if (!path.storedPaths[settings.key]) {
        path.create(settings);
    }
    if (settings.fill) {
        ctx.fill(path.storedPaths[settings.key]);
    }
    ctx.stroke(path.storedPaths[settings.key]);
};

export default {
    addBackground,
    draw,
    drawCity
}