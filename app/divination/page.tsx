'use client';

import { DivinationContainer } from '../components/divination/DivinationContainer';

export default function DivinationPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-2">數字易經威力加強版</h1>
      <div className="text-sm text-gray-500 text-center mb-2">v1.1.0-betav1111</div>
      <DivinationContainer />
    </div>
  );
} 