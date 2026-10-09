import React, { useState } from 'react';
import { Search, Clock, Calendar, ArrowRight, Share2, Tag, BookOpen } from 'lucide-react';
import { BlogPostItem } from '../../types';
import { handleImageError } from '../../utils/imageFallback';
import { AdBanner } from '../common/AdBanner';

interface BlogPageProps {
  posts: BlogPostItem[];
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);

  const categories = ['all', 'Networking', 'Linux & DevOps', 'DevOps & Cloud'];

  const filteredPosts = posts.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-900">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Technical Knowledge Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Techlink Assist Blog & Guides
          </h1>
          <p className="text-sm text-slate-400">
            Field-tested guides, configuration walk-throughs, and infrastructure runbooks authored by our practicing network and DevOps engineers.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, tags..."
            className="w-full rounded-lg bg-slate-900 border border-slate-800 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedPost(null);
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat === 'all' ? 'All Knowledge Hub Articles' : cat}
          </button>
        ))}
      </div>

      {/* Single Article Reader View */}
      {selectedPost ? (
        <article className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-10 space-y-6 shadow-2xl animate-fade-in">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            ← Back to all articles
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span className="text-blue-400 font-medium">{selectedPost.category}</span>
              <span>·</span>
              <span>{selectedPost.readTime}</span>
              <span>·</span>
              <span>Published {selectedPost.publishedAt}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {selectedPost.title}
            </h1>

            <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
              <span>Author: {selectedPost.author}</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800">
            <img
              src={selectedPost.featuredImage}
              alt={selectedPost.title}
              className="w-full h-64 object-cover"
              referrerPolicy="no-referrer"
              onError={handleImageError}
            />
          </div>

          {/* Article Prose */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4 whitespace-pre-line font-sans">
            {selectedPost.content}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-300">Topics:</span>
            {selectedPost.tags.map((t, idx) => (
              <span key={idx} className="font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                #{t}
              </span>
            ))}
          </div>

          {/* Advertisement under blog article */}
          <div className="pt-4 border-t border-slate-800">
            <AdBanner placement="blog_bottom" />
          </div>
        </article>
      ) : (
        /* Blog Post Cards Grid */
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="h-44 bg-slate-950 overflow-hidden relative">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                    <div className="absolute top-3 left-3 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-950/90 text-blue-400 border border-slate-800">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{post.readTime}</span>
                      <span>·</span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{post.author}</span>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Advertisement at bottom of blog catalog */}
          <AdBanner placement="blog_bottom" />
        </div>
      )}
    </div>
  );
};
