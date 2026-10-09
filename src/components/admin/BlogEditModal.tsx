import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { BlogPostItem } from '../../types';

interface BlogEditModalProps {
  isOpen: boolean;
  post: BlogPostItem | null;
  onClose: () => void;
  onSave: (postData: Omit<BlogPostItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const BlogEditModal: React.FC<BlogEditModalProps> = ({
  isOpen,
  post,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Networking');
  const [author, setAuthor] = useState('Techlink Engineering Desk');
  const [readTime, setReadTime] = useState('5 min read');
  const [status, setStatus] = useState<'published' | 'draft' | 'archived'>('published');
  const [tagsText, setTagsText] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState('/images/devops_cloud_datacenter_1791521539556.jpg');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setCategory(post.category);
      setAuthor(post.author);
      setReadTime(post.readTime);
      setStatus(post.status);
      setTagsText(post.tags.join(', '));
      setSeoTitle(post.seoTitle || post.title);
      setSeoDescription(post.seoDescription || post.excerpt);
      setFeaturedImage(post.featuredImage);
    } else {
      setTitle('');
      setSlug('');
      setExcerpt('');
      setContent('');
      setCategory('Networking');
      setAuthor('Techlink Engineering Desk');
      setReadTime('5 min read');
      setStatus('published');
      setTagsText('');
      setSeoTitle('');
      setSeoDescription('');
      setFeaturedImage('/images/devops_cloud_datacenter_1791521539556.jpg');
    }
  }, [post, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const autoSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      slug: autoSlug,
      excerpt: excerpt.trim(),
      content: content.trim() || excerpt.trim(),
      category: category.trim(),
      author: author.trim(),
      readTime: readTime.trim(),
      status,
      featuredImage: featuredImage.trim() || '/images/devops_cloud_datacenter_1791521539556.jpg',
      tags: tags.length ? tags : ['Technology', 'Guides'],
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || excerpt.trim(),
      publishedAt: post?.publishedAt || new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-1">
          {post ? 'Edit Knowledge Hub Post' : 'Create New Article'}
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Publish guides, technical tutorials, and manage SEO metadata.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Post Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. MikroTik RouterOS v7 BGP Configuration Guide"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. mikrotik-routeros-v7-bgp-guide"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Networking, DevOps, Linux"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Publication Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft' | 'archived')}
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              >
                <option value="published">Published</option>
                <option value="draft">Draft (Private)</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Tags (Comma separated)</label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="MikroTik, BGP, Routing, Cisco"
                className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-white min-h-[40px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Excerpt / Brief Summary *</label>
            <textarea
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Teaser snippet shown on blog listing..."
              className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Full Article Content (Markdown or Text)</label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Full guide, code blocks, and instructions..."
              className="w-full rounded bg-slate-950 border border-slate-800 p-2.5 text-white font-mono text-[11px]"
            />
          </div>

          {/* SEO Metadata */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-semibold text-white text-xs">SEO Metadata</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">SEO Title Tag</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Defaults to Post Title"
                  className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-white text-[11px]"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">SEO Meta Description</label>
                <input
                  type="text"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Defaults to Excerpt"
                  className="w-full rounded bg-slate-900 border border-slate-800 px-2.5 py-1.5 text-white text-[11px]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white rounded-lg transition-colors min-h-[40px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors min-h-[40px]"
            >
              <Check className="h-4 w-4" />
              <span>{post ? 'Save Article' : 'Publish Article'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
