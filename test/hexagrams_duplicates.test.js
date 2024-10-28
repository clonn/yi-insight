// test/hexagrams_duplicates.test.js
const hexagrams64 = require('../src/hexagram/hexagram_64.json'); // 替換成 hexagrams64.json 的實際路徑

describe('Hexagrams 64 Duplicates Test', () => {
  test('should not have duplicate upperTrigram-lowerTrigram combinations', () => {
    const seenCombinations = new Map();
    const duplicates = [];

    hexagrams64.forEach((hexagram) => {
      const combination = `${hexagram.upperTrigram}-${hexagram.lowerTrigram}`;

      if (seenCombinations.has(combination)) {
        duplicates.push({
          combination,
          names: [seenCombinations.get(combination).name, hexagram.name]
        });
      } else {
        seenCombinations.set(combination, hexagram);
      }
    });

    console.log('Duplicate hexagrams:', duplicates.map(d => d.names));
    expect(duplicates.length).toBe(0);
  });
});
