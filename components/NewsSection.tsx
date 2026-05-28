'use client';

import React, { useState } from 'react';
import { newsItems, type NewsItem } from '@/content/news';

export default function NewsSection() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <>
      <section id="info" className="bg-gradient-light border-y">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-8">Новости компании</h2>
            <a href="#info" className="text-sm font-medium text-[var(--primary)]">Смотреть все →</a>
          </div>

          {/* Горизонтальная лента новостей */}
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 -mx-2 px-2">
            {newsItems.map((newsItem) => (
              <div 
                key={newsItem.id} 
                className="min-w-[280px] md:min-w-[320px] max-w-[340px] bg-white border rounded-3xl p-6 flex-shrink-0 snap-start hover:shadow-md transition-shadow active:scale-[0.985]"
              >
                <div className="text-xs text-slate-500 mb-2">{newsItem.date} • {newsItem.category}</div>
                <div className="font-semibold text-lg leading-tight line-clamp-3 mb-4">{newsItem.title}</div>
                <div className="text-sm text-slate-600 line-clamp-2 mb-4">{newsItem.excerpt}</div>
                <button 
                  onClick={() => setSelectedNews(newsItem)}
                  className="text-sm text-[var(--primary)] font-medium hover:underline"
                >
                  Читать полностью →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно полной новости */}
      {selectedNews && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b flex-shrink-0">
              <div>
                <div className="text-xs text-slate-500">{selectedNews.date} • {selectedNews.category}</div>
                <h3 className="text-2xl font-semibold tracking-tight mt-1 pr-8">{selectedNews.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 text-2xl leading-none"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto text-slate-700 leading-relaxed text-[15px]">
              {selectedNews.fullText}
            </div>

            <div className="border-t px-6 py-4 flex justify-end flex-shrink-0">
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
    </>
  );
}
