import store from '@/store/store';

const addBackground = function(ctx, width, height) {
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#fff';
    ctx.fill();
};

const draw = function(ctx, settings) {
    let areas = store.getters['areas'];
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#555';

    for (let area of areas) {
        drawArea(ctx, area, settings);
    }
};

const drawArea = function(ctx, area, settings) {
    let paths = area.getPaths();
    for (let path of paths) {
        ctx.fillStyle = area.color;
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
    drawArea
}