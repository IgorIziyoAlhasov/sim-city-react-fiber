const BUILDING_MAX_LEVEL = 4;
export const TERRAIN_TYPES = {
    'grass': 0x00aa00,
    'dirt': 0x9b7653,
    'sand': 0xc2b280,
    'water': 0x0000ff
};
export const STRUCTURE_TYPES = {
    'rezidential': 0xccbbff,
    'commercial': 0x666666,
    'industrial': 0xbcfa1d,
    'road': 0x000000,
    // "buldoze":0xffffff
    
};

const City = ({ size }) => {
    let data = []

    const initCity = () => {
        // console.log(TERRAIN_TYPES[Math.floor(Math.random() * 3)]);
        for (let x = 0; x < size; x++) {
            const column = []
            for (let y = 0; y < size; y++) {
                const tileData = makeTile(x, y);

                tileData.terrain = Object.keys(TERRAIN_TYPES)[0];

                //fill neighbours coordinates;
                tileData.neighboursCoordimates = {
                    top: { x: (x - 1), y },
                    bottom: { x: (x + 1), y },
                    left: { x, y: (y - 1) },
                    right: { x, y: (y + 1) }
                }


                column.push(tileData);
            }
            data.push(column);
        }

        // console.trace(data);
    }

    const updateCity = () => {
        // console.log(this);

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                data[x][y].update();
            }
        }

        return data;
    }

    const updateCityData = (freshData) => {
        data = freshData;
    }

    const getTilesWitStructureType = (type) => {
        return flattenedData().filter(tile => tile.structure === type);
    }

    const getTilesWitStructures = () => {
        return flattenedData().filter(tile => tile.structure != null);
    }

    const flattenedData = (inputData) => {
        if(inputData) return inputData.reduce((acc, col) => acc.concat(col), []);
        return data.reduce((acc, col) => acc.concat(col), []);
    }

    const makeTile = (x, y) => {
        return {
            x,
            y,
            terrain: undefined,
            structure: undefined,
            level: 1,
            isInteractive: true,
            neighboursCoordimates: {
                top: null,
                bottom: null,
                left: null,
                right: null
            },
            update() {
                // const chance = Math.random();
                // if (chance < 0.01) {
                //     if (this.structure === undefined) {
                //         this.structure = STRUCTURE_TYPES[0];
                //         return;
                //     }

                // }

                // if (chance < 0.005) {
                //     if (this.structure === STRUCTURE_TYPES[0] && this.level < 4) {
                //         this.level++;
                //     }
                // }
            }
        }
    }

    initCity();

    return {
        data,
        flattenedData,
        getTilesWitStructureType,
        getTilesWitStructures,
        updateCity,
        updateCityData
    }
}

export default City;