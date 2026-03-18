'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import {
  Plus, Pencil, Trash2, X, Save, Loader2, Users,
  Instagram, Linkedin, Upload, ChevronDown, ChevronUp, Check,
} from 'lucide-react';

interface Department { id: string; name: string; order: number; }
interface TeamMember {
  id: string; name: string; role: string; description: string;
  image: string | null; instagram: string | null; linkedin: string | null;
  order: number; isActive: boolean; departmentId: string | null;
  department: Department | null;
}
interface MemberFormData {
  name: string; role: string; description: string; image: string;
  instagram: string; linkedin: string; order: number; isActive: boolean; departmentId: string;
}

const initialFormData: MemberFormData = {
  name: '', role: '', description: '', image: '',
  instagram: '', linkedin: '', order: 0, isActive: true, departmentId: '',
};

export default function AdminTeamPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<MemberFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState('');
  const [sectionsOpen, setSectionsOpen] = useState(true);
  const [newSectionName, setNewSectionName] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [savingSection, setSavingSection] = useState(false);
  const [sectionError, setSectionError] = useState('');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionName, setEditingSectionName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();

  const fetchAll = useCallback(async () => {
    try {
      const [deptRes, memberRes] = await Promise.all([fetch('/api/departments'), fetch('/api/team')]);
      if (deptRes.ok) setDepartments(await deptRes.json());
      if (memberRes.ok) setTeamMembers(await memberRes.json());
    } catch (err) { console.error('Fetch error:', err); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleAddSection = async () => {
    if (!newSectionName.trim()) return;
    setSavingSection(true); setSectionError('');
    try {
      const res = await fetch('/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newSectionName.trim(), order: departments.length + 1 }),
      });
      const data = await res.json();
      if (res.ok) { setDepartments(prev => [...prev, data]); setNewSectionName(''); setIsAddingSection(false); }
      else setSectionError(data.error || 'Failed to add section');
    } catch { setSectionError('Network error'); }
    finally { setSavingSection(false); }
  };

  const handleRenameSection = async (id: string) => {
    if (!editingSectionName.trim()) return;
    setSavingSection(true); setSectionError('');
    try {
      const res = await fetch(`/api/departments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: editingSectionName.trim() }),
      });
      const data = await res.json();
      if (res.ok) { setDepartments(prev => prev.map(d => d.id === id ? data : d)); setEditingSectionId(null); }
      else setSectionError(data.error || 'Failed to rename section');
    } catch { setSectionError('Network error'); }
    finally { setSavingSection(false); }
  };

  const handleDeleteSection = async (id: string, name: string) => {
    const memberCount = teamMembers.filter(m => m.departmentId === id).length;
    if (memberCount > 0) { alert(`Cannot delete "${name}" — ${memberCount} member(s) assigned. Reassign them first.`); return; }
    if (!confirm(`Delete section "${name}"?`)) return;
    try {
      const res = await fetch(`/api/departments/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setDepartments(prev => prev.filter(d => d.id !== id));
      else { const data = await res.json(); alert(data.error || 'Failed to delete section'); }
    } catch { alert('Network error'); }
  };

  const openCreateModal = () => { setEditingMember(null); setFormData(initialFormData); setFormError(''); setIsModalOpen(true); };
  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({ name: member.name, role: member.role, description: member.description,
      image: member.image || '', instagram: member.instagram || '', linkedin: member.linkedin || '',
      order: member.order, isActive: member.isActive, departmentId: member.departmentId || '' });
    setFormError(''); setIsModalOpen(true);
  };
  const closeModal = () => { setIsModalOpen(false); setEditingMember(null); setFormData(initialFormData); setFormError(''); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith('image/')) { setFormError('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { setFormError('Image size must be less than 5MB'); return; }
    setIsUploading(true); setFormError('');
    try {
      const fd = new FormData(); fd.append('file', file); fd.append('folder', 'frendlymarketer/team');
      const response = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (response.ok) { const data = await response.json(); setFormData(prev => ({ ...prev, image: data.url })); }
      else { const data = await response.json(); setFormError(data.error || 'Failed to upload image'); }
    } catch { setFormError('Failed to upload image. Please try again.'); }
    finally { setIsUploading(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setFormError(''); setIsSubmitting(true);
    try {
      const url = editingMember ? `/api/team/${editingMember.id}` : '/api/team';
      const method = editingMember ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, departmentId: formData.departmentId || null }),
      });
      if (response.ok) { await fetchAll(); closeModal(); }
      else { const data = await response.json(); setFormError(data.error || 'Failed to save team member'); }
    } catch { setFormError('Network error. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    try {
      const response = await fetch(`/api/team/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (response.ok) setTeamMembers(prev => prev.filter(m => m.id !== id));
      else { const data = await response.json(); alert(data.error || 'Failed to delete team member'); }
    } catch { alert('Network error. Please try again.'); }
  };

  const grouped = departments.map(dept => ({ dept, members: teamMembers.filter(m => m.departmentId === dept.id) }));
  const unassigned = teamMembers.filter(m => !m.departmentId);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Team Management</h1>
            <p className="text-gray-600 mt-1">Manage team members and department sections</p>
          </div>
          <button onClick={openCreateModal} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors">
            <Plus className="w-5 h-5" /> Add Team Member
          </button>
        </div>

        {/* Sections panel */}
        <div className="bg-white border border-gray-200 mb-8">
          <button
            onClick={() => setSectionsOpen(p => !p)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary">Department Sections</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{departments.length}</span>
            </div>
            {sectionsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          {sectionsOpen && (
            <div className="px-6 pb-6 border-t border-gray-100">
              {sectionError && <p className="text-red-600 text-sm mt-4 mb-2">{sectionError}</p>}
              <div className="mt-4 space-y-1">
                {departments.map(dept => (
                  <div key={dept.id} className="flex items-center gap-2 group py-1">
                    {editingSectionId === dept.id ? (
                      <>
                        <input autoFocus value={editingSectionName}
                          onChange={e => setEditingSectionName(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') handleRenameSection(dept.id); if (e.key === 'Escape') setEditingSectionId(null); }}
                          className="flex-1 px-3 py-1.5 border border-primary text-sm outline-none" />
                        <button onClick={() => handleRenameSection(dept.id)} disabled={savingSection}
                          className="p-1.5 bg-primary text-white hover:bg-primary/90 transition-colors">
                          {savingSection ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => setEditingSectionId(null)} className="p-1.5 text-gray-400 hover:text-gray-600"><X className="w-3.5 h-3.5" /></button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 text-sm text-gray-800">
                          {dept.name}
                          <span className="ml-2 text-xs text-gray-400">({teamMembers.filter(m => m.departmentId === dept.id).length} members)</span>
                        </span>
                        <button onClick={() => { setEditingSectionId(dept.id); setEditingSectionName(dept.name); setSectionError(''); }}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-primary border border-primary hover:bg-primary hover:text-white transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteSection(dept.id, dept.name)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {isAddingSection ? (
                <div className="flex items-center gap-2 mt-3">
                  <input autoFocus value={newSectionName} onChange={e => setNewSectionName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleAddSection(); if (e.key === 'Escape') { setIsAddingSection(false); setNewSectionName(''); } }}
                    placeholder="Section name…"
                    className="flex-1 px-3 py-1.5 border border-gray-300 text-sm outline-none focus:border-primary" />
                  <button onClick={handleAddSection} disabled={savingSection || !newSectionName.trim()}
                    className="px-3 py-1.5 bg-primary text-white text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
                    {savingSection ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add'}
                  </button>
                  <button onClick={() => { setIsAddingSection(false); setNewSectionName(''); }}
                    className="px-3 py-1.5 border border-gray-200 text-gray-600 text-sm hover:bg-gray-50">Cancel</button>
                </div>
              ) : (
                <button onClick={() => { setIsAddingSection(true); setSectionError(''); }}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                  <Plus className="w-4 h-4" /> Add Section
                </button>
              )}
            </div>
          )}
        </div>

        {/* Members grouped */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
        ) : teamMembers.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No team members yet</h3>
            <p className="text-gray-500 mb-6">Add your first team member</p>
            <button onClick={openCreateModal} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" /> Add Team Member
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {[...grouped, ...(unassigned.length > 0 ? [{ dept: null, members: unassigned }] : [])].map(({ dept, members }) =>
              members.length === 0 ? null : (
                <div key={dept?.id ?? 'unassigned'}>
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <span className="text-xs font-semibold tracking-widest uppercase text-accent/70 block mb-0.5">{dept ? 'Section' : 'Unassigned'}</span>
                      <h2 className="text-lg font-bold text-primary">
                        {dept?.name ?? 'No Section'}
                        <span className="ml-2 text-sm font-normal text-gray-400">({members.length})</span>
                      </h2>
                    </div>
                    <div className="flex-1 h-px bg-primary/10" />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map(member => (
                      <MemberCard key={member.id} member={member} onEdit={() => openEditModal(member)} onDelete={() => handleDelete(member.id)} />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold text-primary">{editingMember ? 'Edit Team Member' : 'Add Team Member'}</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {formError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{formError}</div>}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <select value={formData.departmentId} onChange={e => setFormData({ ...formData, departmentId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
                    <option value="">— No Section —</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required
                    className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <input type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required
                    placeholder="e.g. Creative Director"
                    className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required rows={3}
                    className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                  {formData.image && (
                    <div className="mb-3 relative inline-block">
                      <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover border" />
                      <button type="button" onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white flex items-center justify-center hover:bg-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                    <label htmlFor="image-upload"
                      className={`inline-flex items-center gap-2 px-3 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50 text-sm transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {isUploading ? <><Loader2 className="w-4 h-4 animate-spin" />Uploading...</> : <><Upload className="w-4 h-4" />Upload</>}
                    </label>
                    <span className="text-xs text-gray-400">or</span>
                    <input type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste image URL"
                      className="flex-1 px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                    <input type="url" value={formData.instagram} onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="https://instagram.com/..."
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                    <input type="url" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 text-primary" />
                      <span className="text-sm text-gray-700">Active</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" disabled={isSubmitting || isUploading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50">
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />{editingMember ? 'Update' : 'Create'}</>}
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

function MemberCard({ member, onEdit, onDelete }: { member: TeamMember; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="h-36 bg-gray-100 flex items-center justify-center overflow-hidden">
        {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> : <Users className="w-12 h-12 text-gray-300" />}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <h3 className="font-semibold text-primary truncate">{member.name}</h3>
            <p className="text-xs text-accent font-medium truncate">{member.role}</p>
          </div>
          <span className={`flex-shrink-0 px-2 py-0.5 text-xs ${member.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {member.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{member.description}</p>
        <div className="flex items-center gap-1 mb-3">
          {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500"><Instagram className="w-3.5 h-3.5" /></a>}
          {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600"><Linkedin className="w-3.5 h-3.5" /></a>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-primary border border-primary hover:bg-primary hover:text-white transition-colors text-sm">
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
          <button onClick={onDelete} className="p-1.5 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
