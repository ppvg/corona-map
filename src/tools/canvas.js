import store from '@/store/store';

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

const drawRegionContainer = function(ctx, parent, settings) {
    let currentMap, regionType, pathsOriginSetting, pathsOrigin, children;

    currentMap = store.state.maps.current;
    regionType = parent.regionType;

    ctx.fillStyle = parent.color;

    pathsOriginSetting = currentMap.settings.pathOrigins.find(region => region.type === regionType);
    if (pathsOriginSetting) {
        pathsOrigin = pathsOriginSetting.paths;
    } else {
        pathsOrigin = 'self';
    }
    children = parent.getRegionsForPaths(pathsOrigin);
    settings.hideStroke = true;
    for (let child of children) {
        drawRegion(ctx, child, settings);
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
    if (!settings.hideStroke) {
        ctx.stroke(path.storedPaths[settings.key]);
    }
};

export default {
    addBackground,
    draw,
    drawRegionContainer,
    drawRegion
}