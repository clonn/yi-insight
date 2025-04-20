declare module '@/app/data/hexagram_8.json' {
  interface TrigramInfo {
    binary: string;
    icon: string;
    property: string;
    color: string;
    role: string;
  }

  const hexagrams8: Record<string, TrigramInfo>;
  export default hexagrams8;
}

declare module '@/app/data/hexagram_64.json' {
  interface Hexagram {
    name: string;
    lowerTrigram: string;
    upperTrigram: string;
    meaning: string;
  }

  const hexagrams64: Hexagram[];
  export default hexagrams64;
} 