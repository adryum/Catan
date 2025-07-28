import { Hex, type TwoDCoords } from "./Hex";

export class TwoDGrid {
    size: TwoDCoords;
    tileSize: number;
    tiles: Map<TwoDCoords, Hex>;

    constructor(size: TwoDCoords, tileSize: number) {
        this.size = size
        this.tileSize = tileSize,
        this.tiles = new Map<TwoDCoords, Hex>()
    }

    createGrid() {
        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) { 
                // create element

                this.tiles.set({x: x, y: y}, new Hex())
            }
        }
    }
}