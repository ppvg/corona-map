const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#fff';
    ctx.fill();
};

const draw = function(ctx, regionContainers, settings) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';

    for (let regionContainer of regionContainers) {
        drawRegionContainer(ctx, regionContainer, settings);
    }
};

const drawRegionContainer = function(ctx, regionContainer, settings) {
    ctx.fillStyle = regionContainer.color;
    for (let region of regionContainer.getRegions()) {
        drawRegion(ctx, region, settings);
    }
};

const drawRegion = function(ctx, region, settings) {
    for (let path of region.paths) {
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
    drawRegionContainer,
    drawRegion
}