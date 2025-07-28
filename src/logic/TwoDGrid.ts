import { ref } from "vue";
import { Hex, type TwoDCoords } from "./Hex";

export class TwoDGrid {
    size: TwoDCoords;
    tileSize: number;
    tiles!: Hex[][];

    constructor(size: TwoDCoords, tileSize: number) {
        this.size = size
        this.tileSize = tileSize
        this.generate2DTileArray();
    }

    generate2DTileArray() {
        this.tiles = []

        for (let y = 0; y < this.size.y; y++) {
            // need to make array in each row and only then put values into that array
            this.tiles[y] = []
            for (let x = 0; x < this.size.x; x++) {
                this.tiles[y][x] = new Hex({x, y}, this.tileSize)
            }
        }
    }

    setTilePositions() {

    }
}