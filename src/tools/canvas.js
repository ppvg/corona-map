const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#fff';
    ctx.fill();
};

const draw = function(ctx, regions, settings) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';


    for (let region of regions) {
        drawRegion(ctx, region, settings);
    }
};

const drawRegion = function(ctx, region, settings) {
    ctx.fillStyle = region.color;
    for (let city of region.getCities()) {
        drawCity(ctx, city, settings);
    }
};

const drawCity = function(ctx, city, settings) {
    for (let path of city.paths) {
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
    drawRegion,
    drawCity
}