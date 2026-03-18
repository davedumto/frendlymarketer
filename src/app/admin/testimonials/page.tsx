'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  MessageSquare,
  Star,
} from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  clientPosition: string | null;
  clientCompany: string | null;
  content: string;
  rating: number;
  order: number;
  isActive: boolean;
}

interface FormData {
  clientName: string;
  clientPosition: string;
  clientCompany: string;
  content: string;
  rating: number;
  order: number;
  isActive: boolean;
}

const initialFormData: FormData = {
  clientName: '',
  clientPosition: '',
  clientCompany: '',
  content: '',
  rating: 5,
  order: 0,
  isActive: true,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { token } = useAuth();

  const fetchTestimonials = useCallback(async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        setTestimonials(await response.json());
      }
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData(initialFormData);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      clientName: item.clientName,
      clientPosition: item.clientPosition || '',
      clientCompany: item.clientCompany || '',
      content: item.content,
      rating: item.rating,
      order: item.order,
      isActive: item.isActive,
    });
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(initialFormData);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const url = editingItem ? `/api/testimonials/${editingItem.id}` : '/api/testimonials';
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchTestimonials();
        closeModal();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save testimonial');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        await fetchTestimonials();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Testimonials</h1>
            <p className="text-gray-600 mt-1">Manage client testimonials shown on the website</p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Testimonial
          </button>
        </div>

        {/* List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No testimonials yet</h3>
            <p className="text-gray-500 mb-6">Add your first client testimonial</p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Testimonial
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-primary">{item.clientName}</h3>
                      {item.clientPosition && (
                        <span className="text-sm text-accent">{item.clientPosition}</span>
                      )}
                      {item.clientCompany && (
                        <span className="text-sm text-gray-500">· {item.clientCompany}</span>
                      )}
                      <span className={`px-2 py-0.5 text-xs ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    {/* Star rating */}
                    <div className="flex gap-0.5 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${star <= item.rating ? 'text-accent fill-accent' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">&ldquo;{item.content}&rdquo;</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex items-center gap-1.5 px-3 py-2 text-primary border border-primary hover:bg-primary hover:text-white transition-colors text-sm"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center justify-center px-3 py-2 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold text-primary">
                  {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
                </h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    required
                    placeholder="e.g. Jane Doe"
                    className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.clientPosition}
                      onChange={(e) => setFormData({ ...formData, clientPosition: e.target.value })}
                      placeholder="e.g. CEO"
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.clientCompany}
                      onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                      placeholder="e.g. Acme Ltd"
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonial *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    rows={5}
                    placeholder="What the client said..."
                    className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* Star rating picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${star <= formData.rating ? 'text-accent fill-accent' : 'text-gray-300 hover:text-accent/50'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-gray-700">Active</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Saving...</>
                    ) : (
                      <><Save className="w-4 h-4" />{editingItem ? 'Update' : 'Create'}</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
