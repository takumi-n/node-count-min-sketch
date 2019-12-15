import test from "ava";
import doubleHashing from "../src/doubleHash";
import CountMinSketch from "../src/sketch";

test("Double-Hash function should return correct hash", t => {
  const str = "hello world";
  const h1 = doubleHashing(str, 1, 100);
  const h2 = doubleHashing(str, 2, 100);
  const h3 = doubleHashing(str, 1, 100);
  t.true(h1 !== h2);
  t.true(h1 == h3);
  t.pass();
});

test("sketch can count nearly correctly", t => {
  const testInputs = ["a", "a", "a", "a", "b", "c", "d", "d"];
  const testCases = [
    [testInputs, "a", 4],
    [testInputs, "b", 1],
    [testInputs, "c", 1],
    [testInputs, "d", 2]
  ];

  testCases.forEach(testCase => {
    const [inputs, target, expected] = testCase;

    const sketch = new CountMinSketch(3, 100);
    (inputs as string[]).forEach(input => {
      sketch.add(input);
    });

    const actual = sketch.count(target as string);
    t.true(actual === (expected as number));
  });
});
