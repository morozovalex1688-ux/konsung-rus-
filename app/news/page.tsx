'use client';

import React, { useState } from 'react';
import { newsItems, type NewsItem } from '@/content/news';
import Link from 'next/link';

export default function AllNewsPage() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.webp" alt="Консунг Рус" className="h-10" />
          </Link>
          <Link 
            href="/" 
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← На главную
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">Все новости компании</h1>
        <p className="text-slate-600 mb-8">Актуальные новости, статьи и полезные материалы от ООО «Консунг Рус»</p>

        <div className="space-y-4">
          {newsItems.map((newsItem) => (
            <div 
              key={newsItem.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-md transition-all cursor-pointer active:scale-[0.995]"
              onClick={() => setSelectedNews(newsItem)}
            >
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span>{newsItem.date}</span>
                <span className="text-slate-300">•</span>
                <span className="text-[#013CC6] font-medium">{newsItem.category}</span>
              </div>

              <h3 className="font-semibold text-xl leading-tight mb-3 pr-4">
                {newsItem.title}
              </h3>

              <p className="text-slate-600 mb-4 leading-relaxed">
                {newsItem.excerpt}
              </p>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNews(newsItem);
                }}
                className="text-sm text-[#013CC6] font-medium hover:underline inline-flex items-center gap-1"
              >
                Читать полностью →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>

      {/* Модальное окно полной новости */}
      {selectedNews && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b flex-shrink-0">
              <div>
                <div className="text-xs text-slate-500">{selectedNews.date} • {selectedNews.category}</div>
                <h3 className="text-2xl font-semibold tracking-tight mt-1 pr-8">{selectedNews.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-2 -mr-2 text-2xl leading-none"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto text-slate-700 leading-relaxed text-[15px]">
              {selectedNews.fullText}
            </div>

            <div className="border-t px-6 py-4 flex justify-end flex-shrink-0 bg-white">
              <button 
                onClick={() => setSelectedNews(null)}
                className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
