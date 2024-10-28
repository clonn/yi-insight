// hexagrams.test.js
const hexagrams64 = require('../hexagram/hexagram_64.json'); // 替換成 hexagrams64.json 的實際路徑

describe('Hexagrams 64 Test', () => {
  test('should have 64 unique hexagrams', () => {
    expect(hexagrams64).toHaveLength(64);

    const uniqueSequences = new Set(hexagrams64.map(h => h.sequence));
    expect(uniqueSequences.size).toBe(64);
  });

  test('each hexagram should have a valid upperTrigram, lowerTrigram, and meaning', () => {
    hexagrams64.forEach(hexagram => {
      const { sequence, name, upperTrigram, lowerTrigram, meaning } = hexagram;

      expect(sequence).toBeGreaterThanOrEqual(1);
      expect(sequence).toBeLessThanOrEqual(64);
      expect(name).not.toBe(undefined);
      expect(name).not.toBe('');
      expect(upperTrigram).not.toBe(undefined);
      expect(upperTrigram).not.toBe('');
      expect(lowerTrigram).not.toBe(undefined);
      expect(lowerTrigram).not.toBe('');
      expect(meaning).not.toBe(undefined);
      expect(meaning).not.toBe('');
    });
  });

  test('should not contain any unknown trigram or meaning', () => {
    const validTrigrams = ['乾', '坤', '震', '巽', '坎', '離', '艮', '兌'];
    
    hexagrams64.forEach(hexagram => {
      const { upperTrigram, lowerTrigram } = hexagram;

      expect(validTrigrams).toContain(upperTrigram);
      expect(validTrigrams).toContain(lowerTrigram);
    });
  });

  test('should cover all 64 combinations of trigrams', () => {
    const combinations = new Set(hexagrams64.map(h => `${h.upperTrigram}-${h.lowerTrigram}`));
    expect(combinations.size).toBe(64);
  });
});
