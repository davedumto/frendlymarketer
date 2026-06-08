'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Loader2,
  Mail,
  MailOpen,
  Trash2,
  Phone,
  Building2,
  X,
  Inbox,
} from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { token } = useAuth();

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch('/api/contact', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions);
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchSubmissions();
  }, [fetchSubmissions, token]);

  const setRead = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isRead }),
      });
      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, isRead } : s))
        );
        setUnreadCount((c) => (isRead ? Math.max(0, c - 1) : c + 1));
        if (selected?.id === id) setSelected({ ...selected, isRead });
      }
    } catch (err) {
      console.error('Failed to toggle read state:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const wasUnread = submissions.find((s) => s.id === id)?.isRead === false;
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        if (wasUnread) setUnreadCount((c) => Math.max(0, c - 1));
        if (selected?.id === id) setSelected(null);
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const openSubmission = (submission: Submission) => {
    setSelected(submission);
    if (!submission.isRead) setRead(submission.id, true);
  };

  const filtered = filter === 'unread' ? submissions.filter((s) => !s.isRead) : submissions;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    if (sameDay) {
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Messages</h1>
            <p className="text-gray-600 mt-1">
              Contact form submissions from the public site
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-accent text-dark rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border rounded-lg p-1 self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                filter === 'all' ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary'
              }`}
            >
              All ({submissions.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                filter === 'unread' ? 'bg-primary text-white' : 'text-gray-600 hover:text-primary'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>

        {/* List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {filter === 'unread' ? 'No unread messages' : 'No messages yet'}
            </h3>
            <p className="text-gray-500">
              {filter === 'unread'
                ? 'All caught up. Switch to "All" to see your message history.'
                : 'Submissions from the contact form will appear here.'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden divide-y">
            {filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => openSubmission(s)}
                className={`w-full text-left flex items-start gap-4 p-5 hover:bg-gray-50 transition-colors ${
                  !s.isRead ? 'bg-accent/5' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !s.isRead ? 'bg-accent text-dark' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {!s.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className={`font-semibold truncate ${!s.isRead ? 'text-primary' : 'text-gray-700'}`}>
                      {s.name}
                    </p>
                    <span className="text-xs text-gray-400 truncate">{s.email}</span>
                    {s.company && (
                      <span className="text-xs text-gray-400 hidden sm:inline truncate">· {s.company}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1">{s.message}</p>
                </div>

                <div className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                  {formatDate(s.createdAt)}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Detail modal */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white">
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold text-primary truncate">{selected.name}</h2>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-accent hover:underline text-sm font-medium"
                  >
                    {selected.email}
                  </a>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-500 hover:text-gray-700 ml-4 flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Meta */}
              <div className="p-6 border-b bg-gray-50 space-y-2 text-sm">
                {selected.phone && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${selected.phone}`} className="hover:text-primary">
                      {selected.phone}
                    </a>
                  </div>
                )}
                {selected.company && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    {selected.company}
                  </div>
                )}
                <div className="text-xs text-gray-500 pt-1">
                  Received {new Date(selected.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Message */}
              <div className="p-6">
                <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-3">
                  Message
                </p>
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 p-4 border-t bg-gray-50">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your message to Frendly Marqeter`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Reply by email
                </a>
                <button
                  onClick={() => setRead(selected.id, !selected.isRead)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {selected.isRead ? (
                    <>
                      <Mail className="w-4 h-4" />
                      Mark as unread
                    </>
                  ) : (
                    <>
                      <MailOpen className="w-4 h-4" />
                      Mark as read
                    </>
                  )}
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
