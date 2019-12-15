import doubleHashing from "./doubleHash";

export default class CountMinSketch {
  numOfHashFunction: number;
  tableSize: number;
  hashTable: number[][];

  constructor(numOfHashFunction: number, tableSize: number) {
    this.numOfHashFunction = numOfHashFunction;
    this.tableSize = tableSize;
    this.hashTable = [[]];
  }

  add(element: string) {
    for (let index = 0; index < this.numOfHashFunction; index++) {
      const h = doubleHashing(element, index, this.tableSize);
      if (!this.hashTable[index]) {
        this.hashTable[index] = [];
      }
      if (!this.hashTable[index][h]) {
        this.hashTable[index][h] = 0;
      }
      this.hashTable[index][h] += 1;
    }
  }

  count(element: string) {
    let min = Infinity;

    for (let index = 0; index < this.numOfHashFunction; index++) {
      const h = doubleHashing(element, index, this.tableSize);
      min = Math.min(this.hashTable[index][h], min);
    }

    return min;
  }
}
