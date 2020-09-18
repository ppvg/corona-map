let regions = [];

$.getJSON( "regions.json", function( data ) {
    for (let item of data.features) {
        let region, paths;
        region = {};
        region.title = item.properties.Stadsdeel;
        region.area = item.properties.Opp_m2;

        if (item.geometry.type === 'MultiPolygon') {
            paths = [];
            for (let set of item.geometry.coordinates) {
                for (let path of set) {
                    paths.push(path);
                }
            }
            // item.geometry.coordinates.map(arr => {
            //     return arr[0];
            // });
        } else {
            paths = item.geometry.coordinates;
        }

        region.paths = paths.map(path => {
            return path.map(coordinate => {
                return {
                    x: coordinate[0],
                    y: coordinate[1]
                }
            })
        });
        if (region.title !== 'Westpoort') {
            regions.push(region);
        }
    }
    //console.log(regions);
    console.log(JSON.stringify(regions));
});