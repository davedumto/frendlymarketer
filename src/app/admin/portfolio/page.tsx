'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  Globe,
  Palette,
  ExternalLink,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';

interface WebProject {
  id: string;
  name: string;
  url: string;
  description: string;
  image: string | null;
  order: number;
  isActive: boolean;
}

interface GraphicProject {
  id: string;
  title: string | null;
  image: string;
  order: number;
  isActive: boolean;
}

type TabType = 'web' | 'graphic';

export default function AdminPortfolioPage() {
  const [activeTab, setActiveTab] = useState<TabType>('web');
  const [webProjects, setWebProjects] = useState<WebProject[]>([]);
  const [graphicProjects, setGraphicProjects] = useState<GraphicProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WebProject | GraphicProject | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Web project form
  const [webForm, setWebForm] = useState({
    name: '',
    url: '',
    description: '',
    image: '',
    order: 0,
    isActive: true,
  });

  // Graphic project form
  const [graphicForm, setGraphicForm] = useState({
    title: '',
    image: '',
    order: 0,
    isActive: true,
  });

  const { token } = useAuth();

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const [webRes, graphicRes] = await Promise.all([
        fetch('/api/portfolio/web'),
        fetch('/api/portfolio/graphic'),
      ]);

      if (webRes.ok) {
        const webData = await webRes.json();
        setWebProjects(webData);
      }

      if (graphicRes.ok) {
        const graphicData = await graphicRes.json();
        setGraphicProjects(graphicData);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openCreateModal = () => {
    setEditingItem(null);
    setWebForm({ name: '', url: '', description: '', image: '', order: 0, isActive: true });
    setGraphicForm({ title: '', image: '', order: 0, isActive: true });
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: WebProject | GraphicProject) => {
    setEditingItem(item);
    if (activeTab === 'web') {
      const webItem = item as WebProject;
      setWebForm({
        name: webItem.name,
        url: webItem.url,
        description: webItem.description,
        image: webItem.image || '',
        order: webItem.order,
        isActive: webItem.isActive,
      });
    } else {
      const graphicItem = item as GraphicProject;
      setGraphicForm({
        title: graphicItem.title || '',
        image: graphicItem.image,
        order: graphicItem.order,
        isActive: graphicItem.isActive,
      });
    }
    setError('');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const uploadFormData = new window.FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', `frendlymarketer/portfolio/${activeTab}`);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (response.ok) {
        const data = await response.json();
        if (activeTab === 'web') {
          setWebForm({ ...webForm, image: data.url });
        } else {
          setGraphicForm({ ...graphicForm, image: data.url });
        }
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const isWeb = activeTab === 'web';
      const url = isWeb
        ? editingItem ? `/api/portfolio/web/${editingItem.id}` : '/api/portfolio/web'
        : editingItem ? `/api/portfolio/graphic/${editingItem.id}` : '/api/portfolio/graphic';
      const method = editingItem ? 'PUT' : 'POST';
      const payload = isWeb ? webForm : graphicForm;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchProjects();
        closeModal();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, type: TabType) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/portfolio/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchProjects();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Network error. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Portfolio Management</h1>
            <p className="text-gray-600 mt-1">Manage your web and graphic design projects</p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('web')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'web'
              ? 'bg-primary text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
          >
            <Globe className="w-5 h-5" />
            Web Projects ({webProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('graphic')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'graphic'
              ? 'bg-primary text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
          >
            <Palette className="w-5 h-5" />
            Graphic Design ({graphicProjects.length})
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : activeTab === 'web' ? (
          /* Web Projects Grid */
          webProjects.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No web projects yet</h3>
              <p className="text-gray-500 mb-6">Add your first web project to showcase</p>
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Web Project
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    {project.image ? (
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                    ) : (
                      <Globe className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-primary">{project.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${project.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {project.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline flex items-center gap-1 mb-4"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {project.url}
                    </a>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, 'web')}
                        className="flex items-center justify-center px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Graphic Projects Grid */
          graphicProjects.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No graphic projects yet</h3>
              <p className="text-gray-500 mb-6">Add your first graphic design project</p>
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Graphic Project
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {graphicProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden group"
                >
                  <div className="aspect-square bg-gray-200 relative">
                    {project.image ? (
                      <img src={project.image} alt={project.title || 'Graphic design'} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Palette className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-2 bg-white rounded-full text-primary hover:bg-accent hover:text-white transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, 'graphic')}
                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {project.title && (
                    <div className="p-3">
                      <p className="text-sm font-medium text-primary truncate">{project.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold text-primary">
                  {editingItem ? 'Edit' : 'Add'} {activeTab === 'web' ? 'Web Project' : 'Graphic Project'}
                </h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {activeTab === 'web' ? (
                  /* Web Project Form */
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={webForm.name}
                        onChange={(e) => setWebForm({ ...webForm, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
                      <input
                        type="url"
                        value={webForm.url}
                        onChange={(e) => setWebForm({ ...webForm, url: e.target.value })}
                        required
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                      <textarea
                        value={webForm.description}
                        onChange={(e) => setWebForm({ ...webForm, description: e.target.value })}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>

                      {/* Image Preview */}
                      {webForm.image && (
                        <div className="relative mb-3 inline-block">
                          <img
                            src={webForm.image}
                            alt="Project preview"
                            className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => setWebForm({ ...webForm, image: '' })}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Upload Button */}
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              Upload Image
                            </>
                          )}
                        </button>
                        <span className="text-sm text-gray-500">or</span>
                      </div>

                      {/* URL Input */}
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={webForm.image}
                          onChange={(e) => setWebForm({ ...webForm, image: e.target.value })}
                          placeholder="Paste image URL..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                        <input
                          type="number"
                          value={webForm.order}
                          onChange={(e) => setWebForm({ ...webForm, order: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={webForm.isActive}
                            onChange={(e) => setWebForm({ ...webForm, isActive: e.target.checked })}
                            className="w-4 h-4 text-primary rounded focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">Active</span>
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Graphic Project Form */
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title (optional)</label>
                      <input
                        type="text"
                        value={graphicForm.title}
                        onChange={(e) => setGraphicForm({ ...graphicForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Design Image *</label>

                      {/* Image Preview */}
                      {graphicForm.image && (
                        <div className="relative mb-3 inline-block">
                          <img
                            src={graphicForm.image}
                            alt="Design preview"
                            className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => setGraphicForm({ ...graphicForm, image: '' })}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Upload Button */}
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              Upload Image
                            </>
                          )}
                        </button>
                        <span className="text-sm text-gray-500">or</span>
                      </div>

                      {/* URL Input */}
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={graphicForm.image}
                          onChange={(e) => setGraphicForm({ ...graphicForm, image: e.target.value })}
                          required
                          placeholder="Paste image URL..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                        <input
                          type="number"
                          value={graphicForm.order}
                          onChange={(e) => setGraphicForm({ ...graphicForm, order: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={graphicForm.isActive}
                            onChange={(e) => setGraphicForm({ ...graphicForm, isActive: e.target.checked })}
                            className="w-4 h-4 text-primary rounded focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">Active</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        {editingItem ? 'Update' : 'Create'}
                      </>
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
