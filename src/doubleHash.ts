import crypto from "crypto";

export default function doubleHashing(
  elem: string,
  i: number,
  sizeOfTable: number
): number {
  const md5 = calcMD5(elem);
  const [part1, part2] = [
    parseInt(md5.slice(0, md5.length / 2), 16),
    parseInt(md5.slice(0, md5.length / 2), 16)
  ];

  return _doubleHashing(part1, part2, i, sizeOfTable);
}

function calcMD5(str: string): string {
  const md5 = crypto.createHash("md5");
  return md5.update(str, "utf8").digest("hex");
}

function _doubleHashing(
  hash1: number,
  hash2: number,
  idx: number,
  max: number
): number {
  const newHash = hash1 + hash2 * idx;
  return newHash % max;
}
