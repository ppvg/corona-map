let regions, RD;
regions = [];

// rijksdriehoek
RD = true;

$.getJSON( "regions.json", function( data ) {
    for (let item of data.features) {
        let region, paths;
        region = {};
        region.id = regions.length + 1;
        region.title = item.properties.STADSDEELNAAM;
        region.identifier = item.properties.STADSDEELNAAM;
        region.area = item.properties.OPPERVLAKTE;
        //console.log(region);
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
                if (RD) {
                    return RdToGws(...coordinate);
                } else {
                    return {
                        x: coordinate[0],
                        y: coordinate[1]
                    }
                }


            })
        });

        regions.push(region);
    }
    //console.log(regions);
    console.log(JSON.stringify(regions));
});