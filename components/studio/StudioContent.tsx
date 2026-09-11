'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  KeyRound,
  Database,
  CloudCheck,
  RefreshCw,
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Save,
  Star,
  Camera,
  X,
} from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { Project, Experience, Education, Skill, DeveloperInfo } from '@/types/portfolio';

// External store subscription for sessionStorage auth token
const getAuthSnapshot = () => {
  return typeof window !== 'undefined' && sessionStorage.getItem('studio_auth_token') === 'authorized';
};
const getAuthServerSnapshot = () => false;
const subscribeAuth = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('studio_auth_change', callback);
  return () => window.removeEventListener('studio_auth_change', callback);
};

// -----------------------------------------------------------------
// Child Component: Profile Form Tab
// -----------------------------------------------------------------
interface ProfileTabFormProps {
  initialData: DeveloperInfo;
  onSave: (info: DeveloperInfo) => Promise<{ success: boolean; error?: string }>;
  showToast: (text: string, type?: 'success' | 'error') => void;
}

function ProfileTabForm({ initialData, onSave, showToast }: ProfileTabFormProps) {
  const [profileForm, setProfileForm] = useState<DeveloperInfo>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await onSave(profileForm);
    setIsSaving(false);
    if (res.success) {
      showToast('Profil berhasil disimpan!');
    } else {
      showToast(`Gagal menyimpan: ${res.error}`, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full glass-panel p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-5 h-5 text-neon-blue" />
          Developer Profile Information
        </h2>
        <button
          type="submit"
          disabled={isSaving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Menyimpan...' : 'Save Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
            Name
          </label>
          <input
            type="text"
            value={profileForm.name}
            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
            Professional Title
          </label>
          <input
            type="text"
            value={profileForm.title}
            onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
            Tagline (Hero Header)
          </label>
          <input
            type="text"
            value={profileForm.tagline}
            onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
            Subtagline / Short Bio
          </label>
          <textarea
            rows={2}
            value={profileForm.subTagline}
            onChange={(e) => setProfileForm({ ...profileForm, subTagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue resize-none"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
            About Me (Full Bio)
          </label>
          <textarea
            rows={4}
            value={profileForm.about}
            onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
            Email Address
          </label>
          <input
            type="email"
            value={profileForm.email}
            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
            GitHub URL
          </label>
          <input
            type="text"
            value={profileForm.github}
            onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
            LinkedIn URL
          </label>
          <input
            type="text"
            value={profileForm.linkedin}
            onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
            Twitter / X URL
          </label>
          <input
            type="text"
            value={profileForm.twitter}
            onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
          />
        </div>
      </div>
    </form>
  );
}

// -----------------------------------------------------------------
// Main Studio Content Component
// -----------------------------------------------------------------
export default function StudioContent() {
  const {
    developerInfo,
    projects,
    experiences,
    educationList,
    skills,
    isLoading,
    isConfigured,
    fetchData,
    updateProfile,
    saveProject,
    deleteProject,
    saveExperience,
    deleteExperience,
    saveEducation,
    deleteEducation,
    saveSkill,
    deleteSkill,
    exportBackupJSON,
    importBackupJSON,
  } = usePortfolioStore();

  // Authentication via useSyncExternalStore
  const isAuthenticated = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getAuthServerSnapshot);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'projects' | 'experience' | 'education' | 'skills' | 'backup'>('overview');

  // Notification toast
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Custom Professional Confirmation Dialog (No native alert/confirm)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const expectedPin = process.env.NEXT_PUBLIC_ADMIN_PIN || '888888';
    if (pinInput.trim() === expectedPin.trim()) {
      sessionStorage.setItem('studio_auth_token', 'authorized');
      window.dispatchEvent(new Event('studio_auth_change'));
      setAuthError(false);
      setPinInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('studio_auth_token');
    window.dispatchEvent(new Event('studio_auth_change'));
    setPinInput('');
  };

  // -------------------------------------------------------------
  // Modals & Form States
  // -------------------------------------------------------------
  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: '',
    title: '',
    description: '',
    longDescription: '',
    technologies: [],
    category: 'frontend',
    image: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    demoUrl: '',
    githubUrl: '',
    featured: false,
  });
  const [techInput, setTechInput] = useState('');
  const [imageUploadMode, setImageUploadMode] = useState<'upload' | 'url'>('upload');
  const [isCompressingImage, setIsCompressingImage] = useState(false);

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      showToast('Ukuran file maksimal 8MB', 'error');
      return;
    }

    setIsCompressingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = Math.round(width);
        canvas.height = Math.round(height);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/webp', 0.85);
          setProjectForm((prev) => ({ ...prev, image: dataUrl }));
          showToast('Screenshot berhasil diproses!');
        }
        setIsCompressingImage(false);
      };
      img.onerror = () => {
        setIsCompressingImage(false);
        showToast('Gagal memproses file gambar', 'error');
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setIsCompressingImage(false);
      showToast('Gagal membaca file gambar', 'error');
    };
    reader.readAsDataURL(file);
  };

  // Experience Modal State
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [expForm, setExpForm] = useState<Partial<Experience>>({
    id: '',
    role: '',
    company: '',
    period: '',
    description: [],
  });
  const [expBulletInput, setExpBulletInput] = useState('');

  // Education Modal State
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [eduForm, setEduForm] = useState<Partial<Education>>({
    id: '',
    degree: '',
    school: '',
    period: '',
    description: [],
  });
  const [eduBulletInput, setEduBulletInput] = useState('');

  // Skill Modal State
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [skillForm, setSkillForm] = useState<Skill>({
    name: '',
    level: 85,
    category: 'frontend',
  });

  // Close any open modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (confirmDialog.isOpen) setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        else if (isProjectModalOpen) setIsProjectModalOpen(false);
        else if (isExpModalOpen) setIsExpModalOpen(false);
        else if (isEduModalOpen) setIsEduModalOpen(false);
        else if (isSkillModalOpen) setIsSkillModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmDialog.isOpen, isProjectModalOpen, isExpModalOpen, isEduModalOpen, isSkillModalOpen]);

  // -------------------------------------------------------------
  // CRUD Handlers
  // -------------------------------------------------------------
  const openProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm(proj);
      setImageUploadMode(
        proj.image && proj.image.startsWith('http') ? 'url' : 'upload'
      );
    } else {
      setEditingProject(null);
      setProjectForm({
        id: `proj-${Date.now()}`,
        title: '',
        description: '',
        longDescription: '',
        technologies: ['React', 'Next.js', 'Tailwind CSS'],
        category: 'frontend',
        image: '',
        demoUrl: '',
        githubUrl: '',
        featured: false,
      });
      setImageUploadMode('upload');
    }
    setTechInput('');
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      showToast('Judul dan deskripsi wajib diisi', 'error');
      return;
    }

    const projectData: Project = {
      id: projectForm.id || `proj-${Date.now()}`,
      title: projectForm.title || '',
      description: projectForm.description || '',
      longDescription: projectForm.longDescription || '',
      technologies: projectForm.technologies || [],
      category: projectForm.category as 'frontend' | 'backend' | 'fullstack',
      image: projectForm.image || 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      demoUrl: projectForm.demoUrl || '',
      githubUrl: projectForm.githubUrl || '',
      featured: Boolean(projectForm.featured),
    };

    const res = await saveProject(projectData);
    if (res.success) {
      showToast('Project berhasil disimpan!');
      setIsProjectModalOpen(false);
    } else {
      showToast(`Gagal: ${res.error}`, 'error');
    }
  };

  const handleDeleteProject = (id: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Project',
      message: `Apakah Anda yakin ingin menghapus project "${title}"? Tindakan ini tidak dapat dibatalkan.`,
      confirmLabel: 'Hapus Project',
      onConfirm: async () => {
        const res = await deleteProject(id);
        if (res.success) showToast('Project berhasil dihapus!');
        else showToast(`Gagal: ${res.error}`, 'error');
      },
    });
  };

  // Experience handlers
  const openExpModal = (exp?: Experience) => {
    if (exp) {
      setEditingExp(exp);
      setExpForm(exp);
    } else {
      setEditingExp(null);
      setExpForm({
        id: `exp-${Date.now()}`,
        role: '',
        company: '',
        period: '',
        description: [],
      });
    }
    setExpBulletInput('');
    setIsExpModalOpen(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.role || !expForm.company) {
      showToast('Role dan Perusahaan wajib diisi', 'error');
      return;
    }
    const expData: Experience = {
      id: expForm.id || `exp-${Date.now()}`,
      role: expForm.role || '',
      company: expForm.company || '',
      period: expForm.period || '',
      description: expForm.description || [],
    };
    const res = await saveExperience(expData);
    if (res.success) {
      showToast('Pengalaman kerja disimpan!');
      setIsExpModalOpen(false);
    } else {
      showToast(`Gagal: ${res.error}`, 'error');
    }
  };

  const handleDeleteExp = (id: string, role: string, company: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Pengalaman Kerja',
      message: `Apakah Anda yakin ingin menghapus posisi "${role} @ ${company}"?`,
      confirmLabel: 'Hapus Pengalaman',
      onConfirm: async () => {
        const res = await deleteExperience(id);
        if (res.success) showToast('Pengalaman berhasil dihapus!');
        else showToast(`Gagal: ${res.error}`, 'error');
      },
    });
  };

  // Education handlers
  const openEduModal = (edu?: Education) => {
    if (edu) {
      setEditingEdu(edu);
      setEduForm(edu);
    } else {
      setEditingEdu(null);
      setEduForm({
        id: `edu-${Date.now()}`,
        degree: '',
        school: '',
        period: '',
        description: [],
      });
    }
    setEduBulletInput('');
    setIsEduModalOpen(true);
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.degree || !eduForm.school) {
      showToast('Gelar dan Institusi wajib diisi', 'error');
      return;
    }
    const eduData: Education = {
      id: eduForm.id || `edu-${Date.now()}`,
      degree: eduForm.degree || '',
      school: eduForm.school || '',
      period: eduForm.period || '',
      description: eduForm.description || [],
    };
    const res = await saveEducation(eduData);
    if (res.success) {
      showToast('Pendidikan berhasil disimpan!');
      setIsEduModalOpen(false);
    } else {
      showToast(`Gagal: ${res.error}`, 'error');
    }
  };

  const handleDeleteEdu = (id: string, degree: string, school: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Riwayat Pendidikan',
      message: `Apakah Anda yakin ingin menghapus data "${degree} @ ${school}"?`,
      confirmLabel: 'Hapus Pendidikan',
      onConfirm: async () => {
        const res = await deleteEducation(id);
        if (res.success) showToast('Pendidikan berhasil dihapus!');
        else showToast(`Gagal: ${res.error}`, 'error');
      },
    });
  };

  // Skill handlers
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name) {
      showToast('Nama skill wajib diisi', 'error');
      return;
    }
    const res = await saveSkill(skillForm);
    if (res.success) {
      showToast(`Skill ${skillForm.name} disimpan!`);
      setIsSkillModalOpen(false);
    } else {
      showToast(`Gagal: ${res.error}`, 'error');
    }
  };

  const handleDeleteSkill = (name: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Keahlian Teknis',
      message: `Apakah Anda yakin ingin menghapus skill "${name}" dari daftar keahlian portofolio Anda?`,
      confirmLabel: 'Hapus Skill',
      onConfirm: async () => {
        const res = await deleteSkill(name);
        if (res.success) showToast(`Skill "${name}" berhasil dihapus!`);
        else showToast(`Gagal: ${res.error}`, 'error');
      },
    });
  };

  // Backup & Restore
  const handleExportJSON = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON berhasil diunduh!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = await importBackupJSON(content);
        if (res.success) {
          showToast('Data portofolio berhasil dipulihkan dari backup!');
        } else {
          showToast(`Gagal memulihkan: ${res.error}`, 'error');
        }
      }
    };
    reader.readAsText(file);
  };

  // -------------------------------------------------------------
  // Render: Login Gate
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-panel p-8 md:p-10 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-neon-blue via-neon-purple to-neon-blue animate-pulse" />

          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center text-neon-blue shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Studio Access Gate
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                Enter your secret Passcode to manage portfolio data
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Passcode / PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setAuthError(false);
                  }}
                  placeholder="••••••••"
                  autoFocus
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-950/70 border text-slate-900 dark:text-white font-mono tracking-widest text-center focus:outline-none transition-all ${
                    authError
                      ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'border-slate-300 dark:border-slate-800 focus:border-neon-blue focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  }`}
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              {authError && (
                <p className="text-xs text-red-500 font-mono flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  Passcode salah. Periksa variabel ADMIN_PIN Anda.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-mono font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 transition-all shadow-[0_0_20px_rgba(59,130,246,0.25)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              Unlock Studio
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-500">
              Default PIN lokal: <code className="text-neon-blue">888888</code> (Atur <code className="text-neon-purple">ADMIN_PIN</code> di .env.local)
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render: Authenticated Studio Dashboard
  // -------------------------------------------------------------
  return (
    <div className="w-full space-y-8 py-6 md:py-10">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl border font-mono text-xs shadow-2xl flex items-center gap-2.5 backdrop-blur-md ${
              toastMessage.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                : 'bg-red-950/90 border-red-500 text-red-300 shadow-[0_0_25px_rgba(239,68,68,0.3)]'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Studio Header & Status Bar */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Portfolio Studio
            </h1>
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
              Admin Control
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time content management for projects, resume, skills, and profile.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Cloud sync status indicator */}
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border text-[11px] sm:text-xs font-mono ${
              isConfigured
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
            }`}
          >
            {isConfigured ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Supabase Active</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Local Fallback</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                fetchData();
                showToast('Data disinkronkan ulang!');
              }}
              disabled={isLoading}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-neon-blue/40 text-slate-600 dark:text-slate-400 hover:text-neon-blue transition-all cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 text-xs font-mono transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: Sparkles },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'projects', label: `Projects (${projects.length})`, icon: FolderGit2 },
          { id: 'experience', label: `Experience (${experiences.length})`, icon: Briefcase },
          { id: 'education', label: `Education (${educationList.length})`, icon: GraduationCap },
          { id: 'skills', label: `Skills (${skills.length})`, icon: Database },
          { id: 'backup', label: 'Backup & Restore', icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-linear-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/40 text-neon-blue dark:text-neon-blue-light shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="w-full space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono text-slate-500 uppercase">Projects</span>
              <p className="text-3xl font-extrabold text-neon-blue mt-1">{projects.length}</p>
              <span className="text-[10px] text-slate-400 font-mono">
                {projects.filter((p) => p.featured).length} Featured
              </span>
            </div>
            <div className="p-5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono text-slate-500 uppercase">Work Exp</span>
              <p className="text-3xl font-extrabold text-neon-purple mt-1">{experiences.length}</p>
              <span className="text-[10px] text-slate-400 font-mono">Total Positions</span>
            </div>
            <div className="p-5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono text-slate-500 uppercase">Education</span>
              <p className="text-3xl font-extrabold text-emerald-500 mt-1">{educationList.length}</p>
              <span className="text-[10px] text-slate-400 font-mono">Degrees & Programs</span>
            </div>
            <div className="p-5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono text-slate-500 uppercase">Skills</span>
              <p className="text-3xl font-extrabold text-pink-500 mt-1">{skills.length}</p>
              <span className="text-[10px] text-slate-400 font-mono">Tech Stack Items</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CloudCheck className="w-5 h-5 text-neon-blue" />
              Database Status & Info
            </h2>
            {isConfigured ? (
              <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <p>
                  ✅ <strong className="text-emerald-400">Supabase Connected:</strong> Setiap perubahan yang Anda buat di tab manapun akan langsung disimpan ke database Supabase dan tampil otomatis di halaman publik portofolio tanpa perlu deploy ulang!
                </p>
              </div>
            ) : (
              <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <p>
                  ⚠️ <strong>Mode Fallback Aktif:</strong> Supabase URL atau Anon Key belum disetel di file <code className="text-neon-blue font-mono">.env.local</code>.
                </p>
                <p className="text-xs text-slate-500">
                  Untuk mengaktifkan sinkronisasi database cloud, jalankan skrip SQL di file <code className="text-neon-purple font-mono">supabase_schema.sql</code> pada Supabase SQL Editor Anda, lalu isi URL & Anon Key di <code className="text-neon-blue font-mono">.env.local</code> dan Vercel.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: PROFILE */}
      {activeTab === 'profile' && (
        <ProfileTabForm
          key={`${developerInfo.name}-${developerInfo.title}-${developerInfo.email}`}
          initialData={developerInfo}
          onSave={updateProfile}
          showToast={showToast}
        />
      )}

      {/* Tab 3: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-neon-blue" />
                Manage Projects
              </h2>
              <p className="text-xs text-slate-500">
                Tambah, edit, atau hapus proyek dan screenshot portofolio Anda.
              </p>
            </div>
            <button
              onClick={() => openProjectModal()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  {/* Thumbnail Preview if available */}
                  {proj.image &&
                  (proj.image.startsWith('http') ||
                    proj.image.startsWith('data:image') ||
                    proj.image.startsWith('/')) ? (
                    <div className="w-full h-36 rounded-xl overflow-hidden mb-3.5 border border-slate-200 dark:border-slate-800 bg-slate-950 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                        Screenshot
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                        {proj.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5 flex items-center gap-1.5">
                        {proj.title}
                        {proj.featured && (
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        )}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openProjectModal(proj)}
                        className="p-2 rounded-lg text-slate-400 hover:text-neon-blue hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id, proj.title)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-900">
                  {proj.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: EXPERIENCE */}
      {activeTab === 'experience' && (
        <div className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-neon-purple" />
                Work Experience
              </h2>
              <p className="text-xs text-slate-500">
                Kelola riwayat karir dan pengalaman profesional Anda.
              </p>
            </div>
            <button
              onClick={() => openExpModal()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <span className="text-neon-blue font-semibold text-sm">@ {exp.company}</span>
                  </div>
                  <span className="inline-block text-xs font-mono text-slate-500">
                    {exp.period}
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                    {exp.description.map((d, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-1 shrink-0 self-end md:self-start">
                  <button
                    onClick={() => openExpModal(exp)}
                    className="p-2 rounded-lg text-slate-400 hover:text-neon-blue hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteExp(exp.id, exp.role, exp.company)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: EDUCATION */}
      {activeTab === 'education' && (
        <div className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-500" />
                Education & Certifications
              </h2>
              <p className="text-xs text-slate-500">
                Kelola riwayat pendidikan formal dan sertifikasi keahlian.
              </p>
            </div>
            <button
              onClick={() => openEduModal()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>

          <div className="space-y-4">
            {educationList.map((edu) => (
              <div
                key={edu.id}
                className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <span className="text-emerald-500 font-semibold text-sm">@ {edu.school}</span>
                  </div>
                  <span className="inline-block text-xs font-mono text-slate-500">
                    {edu.period}
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                    {edu.description.map((d, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-1 shrink-0 self-end md:self-start">
                  <button
                    onClick={() => openEduModal(edu)}
                    className="p-2 rounded-lg text-slate-400 hover:text-neon-blue hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEdu(edu.id, edu.degree, edu.school)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: SKILLS */}
      {activeTab === 'skills' && (
        <div className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-pink-500" />
                Technical Skills
              </h2>
              <p className="text-xs text-slate-500">
                Kelola daftar keahlian teknologi dan persentase kemahiran Anda.
              </p>
            </div>
            <button
              onClick={() => {
                setSkillForm({ name: '', level: 85, category: 'frontend' });
                setIsSkillModalOpen(true);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((s) => (
              <div
                key={s.name}
                className="glass-panel p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
              >
                <div>
                  <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                    {s.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 uppercase">
                      {s.category}
                    </span>
                    <span className="text-xs font-mono text-neon-blue font-bold">{s.level}%</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSkill(s.name)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                  title="Delete Skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: BACKUP & RESTORE */}
      {activeTab === 'backup' && (
        <div className="w-full glass-panel p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-neon-blue" />
              Backup & Restore Data Portofolio
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Simpan seluruh data portofolio Anda ke komputer atau pulihkan dari file backup kapan pun diperlukan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            {/* Export */}
            <div className="p-5 rounded-xl bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-neon-blue" />
                Unduh Cadangan (Export JSON)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Download file JSON lengkap berisi biodata, seluruh project, riwayat pengalaman, pendidikan, dan skills.
              </p>
              <button
                onClick={handleExportJSON}
                className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download portfolio-backup.json
              </button>
            </div>

            {/* Import */}
            <div className="p-5 rounded-xl bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-neon-purple" />
                Pulihkan Data (Import JSON)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Upload file backup JSON yang pernah Anda unduh untuk menimpa/memperbarui data portofolio.
              </p>
              <label className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 flex items-center justify-center gap-2 transition-all cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                Pilih File JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* MODALS */}
      {/* ----------------------------------------------------------- */}

      {/* 1. PROJECT MODAL */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div
            onClick={() => setIsProjectModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[88vh] flex flex-col overflow-hidden bg-white dark:bg-slate-950"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.title || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. Modern SaaS Platform"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Category
                    </label>
                    <select
                      value={projectForm.category}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          category: e.target.value as 'frontend' | 'backend' | 'fullstack',
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="fullstack">Fullstack</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 flex items-center pt-2 sm:pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(projectForm.featured)}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, featured: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-neon-blue border-slate-700 bg-slate-900"
                      />
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
                        Featured Project ⭐
                      </span>
                    </label>
                  </div>

                  {/* Screenshot Demo Image Section */}
                  <div className="space-y-3 md:col-span-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-neon-blue" />
                          Screenshot Demo Proyek
                        </label>
                        <p className="text-[11px] text-slate-500">
                          Unggah screenshot demo atau tempel URL gambar langsung
                        </p>
                      </div>

                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setImageUploadMode('upload')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                            imageUploadMode === 'upload'
                              ? 'bg-white dark:bg-slate-800 text-neon-blue shadow-xs font-bold'
                              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageUploadMode('url')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                            imageUploadMode === 'url'
                              ? 'bg-white dark:bg-slate-800 text-neon-blue shadow-xs font-bold'
                              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          URL Gambar
                        </button>
                      </div>
                    </div>

                    {projectForm.image &&
                    (projectForm.image.startsWith('http') ||
                      projectForm.image.startsWith('data:image') ||
                      projectForm.image.startsWith('/')) ? (
                      <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={projectForm.image}
                          alt="Screenshot Preview"
                          className="w-full h-44 sm:h-52 object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-wrap items-center justify-center gap-2.5 p-4 backdrop-blur-xs">
                          <label className="px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800 text-xs font-mono font-bold text-slate-900 dark:text-white hover:brightness-110 cursor-pointer flex items-center gap-1.5 shadow-lg">
                            <Upload className="w-3.5 h-3.5" />
                            Ganti Gambar
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileUpload}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setProjectForm({ ...projectForm, image: '' })}
                            className="px-3 py-1.5 rounded-lg bg-red-600 text-xs font-mono font-bold text-white hover:bg-red-500 cursor-pointer flex items-center gap-1.5 shadow-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Hapus Screenshot
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                          ✓ Screenshot Demo Aktif
                        </div>
                      </div>
                    ) : (
                      <div>
                        {imageUploadMode === 'upload' ? (
                          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-neon-blue/50 rounded-xl p-6 cursor-pointer bg-slate-50 dark:bg-slate-950/40 hover:bg-neon-blue/5 transition-all group">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileUpload}
                              disabled={isCompressingImage}
                              className="hidden"
                            />
                            {isCompressingImage ? (
                              <div className="flex items-center gap-2 text-neon-blue text-xs font-mono">
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Mengompresi dan memproses gambar...</span>
                              </div>
                            ) : (
                              <>
                                <div className="p-3 rounded-full bg-neon-blue/10 text-neon-blue group-hover:scale-110 transition-transform mb-2">
                                  <Upload className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 text-center">
                                  Klik untuk unggah screenshot demo
                                </span>
                                <span className="text-[11px] text-slate-400 mt-0.5 text-center">
                                  PNG, JPG, WebP (otomatis dioptimasi untuk web)
                                </span>
                              </>
                            )}
                          </label>
                        ) : (
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              value={projectForm.image || ''}
                              onChange={(e) =>
                                setProjectForm({ ...projectForm, image: e.target.value })
                              }
                              placeholder="https://... URL gambar screenshot langsung"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue font-mono"
                            />
                            <p className="text-[11px] text-slate-500">
                              Bisa gunakan URL gambar publik dari GitHub raw, hosting gambar, Unsplash, dll.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Short Description *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={projectForm.description || ''}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      placeholder="Brief overview of what this project does..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue resize-none"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Long Description (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={projectForm.longDescription || ''}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, longDescription: e.target.value })
                      }
                      placeholder="Extended details, technical highlights, etc."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue resize-none"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Technologies (Tekan Enter untuk menambah)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (techInput.trim()) {
                              setProjectForm({
                                ...projectForm,
                                technologies: [
                                  ...(projectForm.technologies || []),
                                  techInput.trim(),
                                ],
                              });
                              setTechInput('');
                            }
                          }
                        }}
                        placeholder="e.g. Next.js"
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (techInput.trim()) {
                            setProjectForm({
                              ...projectForm,
                              technologies: [
                                ...(projectForm.technologies || []),
                                techInput.trim(),
                              ],
                            });
                            setTechInput('');
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(projectForm.technologies || []).map((t, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono bg-neon-blue/10 border border-neon-blue/30 text-neon-blue"
                        >
                          {t}
                          <button
                            type="button"
                            onClick={() =>
                              setProjectForm({
                                ...projectForm,
                                technologies: projectForm.technologies?.filter((_, i) => i !== idx),
                              })
                            }
                            className="hover:text-red-400 cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Live Demo URL
                    </label>
                    <input
                      type="text"
                      value={projectForm.demoUrl || ''}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, demoUrl: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      GitHub Repo URL
                    </label>
                    <input
                      type="text"
                      value={projectForm.githubUrl || ''}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, githubUrl: e.target.value })
                      }
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Pinned Footer */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/70 dark:bg-slate-950/70">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 cursor-pointer shadow-md text-center"
                >
                  Save Project
                </button>
              </div>
            </form>
          </motion.div>
        </div>
        )}
      </AnimatePresence>

      {/* 2. EXPERIENCE MODAL */}
      <AnimatePresence>
        {isExpModalOpen && (
          <div
            onClick={() => setIsExpModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[88vh] flex flex-col overflow-hidden bg-white dark:bg-slate-950"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {editingExp ? 'Edit Experience' : 'Add Experience'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsExpModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveExp} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Role / Position *
                    </label>
                    <input
                      type="text"
                      required
                      value={expForm.role || ''}
                      onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                      placeholder="e.g. Front-End Developer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={expForm.company || ''}
                      onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                      placeholder="e.g. PT Arkatama Multi Solusindo"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Period
                    </label>
                    <input
                      type="text"
                      value={expForm.period || ''}
                      onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                      placeholder="e.g. Feb 2024 - Jun 2024"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Key Responsibilities / Bullets
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={expBulletInput}
                        onChange={(e) => setExpBulletInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (expBulletInput.trim()) {
                              setExpForm({
                                ...expForm,
                                description: [...(expForm.description || []), expBulletInput.trim()],
                              });
                              setExpBulletInput('');
                            }
                          }
                        }}
                        placeholder="Tambahkan poin tanggung jawab..."
                        className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (expBulletInput.trim()) {
                            setExpForm({
                              ...expForm,
                              description: [...(expForm.description || []), expBulletInput.trim()],
                            });
                            setExpBulletInput('');
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    <ul className="space-y-1.5 mt-2">
                      {(expForm.description || []).map((b, idx) => (
                        <li
                          key={idx}
                          className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs"
                        >
                          <span className="flex-1">{b}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setExpForm({
                                ...expForm,
                                description: expForm.description?.filter((_, i) => i !== idx),
                              })
                            }
                            className="text-slate-400 hover:text-red-400 cursor-pointer"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pinned Footer */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/70 dark:bg-slate-950/70">
                  <button
                    type="button"
                    onClick={() => setIsExpModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 cursor-pointer shadow-md text-center"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. EDUCATION MODAL */}
      <AnimatePresence>
        {isEduModalOpen && (
          <div
            onClick={() => setIsEduModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[88vh] flex flex-col overflow-hidden bg-white dark:bg-slate-950"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {editingEdu ? 'Edit Education' : 'Add Education'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEduModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdu} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Degree / Program *
                    </label>
                    <input
                      type="text"
                      required
                      value={eduForm.degree || ''}
                      onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                      placeholder="e.g. Bachelor of Informatics"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      School / University *
                    </label>
                    <input
                      type="text"
                      required
                      value={eduForm.school || ''}
                      onChange={(e) => setEduForm({ ...eduForm, school: e.target.value })}
                      placeholder="e.g. Universitas Jember"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Period
                    </label>
                    <input
                      type="text"
                      value={eduForm.period || ''}
                      onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                      placeholder="e.g. 2021 - 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Achievements / Description Bullets
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={eduBulletInput}
                        onChange={(e) => setEduBulletInput(e.target.value)}
                        placeholder="Tambahkan poin pencapaian..."
                        className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (eduBulletInput.trim()) {
                            setEduForm({
                              ...eduForm,
                              description: [...(eduForm.description || []), eduBulletInput.trim()],
                            });
                            setEduBulletInput('');
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    <ul className="space-y-1.5 mt-2">
                      {(eduForm.description || []).map((b, idx) => (
                        <li
                          key={idx}
                          className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs"
                        >
                          <span className="flex-1">{b}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setEduForm({
                                ...eduForm,
                                description: eduForm.description?.filter((_, i) => i !== idx),
                              })
                            }
                            className="text-slate-400 hover:text-red-400 cursor-pointer"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pinned Footer */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/70 dark:bg-slate-950/70">
                  <button
                    type="button"
                    onClick={() => setIsEduModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 cursor-pointer shadow-md text-center"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. SKILL MODAL */}
      <AnimatePresence>
        {isSkillModalOpen && (
          <div
            onClick={() => setIsSkillModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[88vh] flex flex-col overflow-hidden bg-white dark:bg-slate-950"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Add / Update Skill
                </h3>
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveSkill} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 min-h-0">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Skill Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      placeholder="e.g. Next.js, Docker, Python"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                      Category
                    </label>
                    <select
                      value={skillForm.category}
                      onChange={(e) =>
                        setSkillForm({
                          ...skillForm,
                          category: e.target.value as 'frontend' | 'backend' | 'tools',
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 text-sm focus:outline-none focus:border-neon-blue"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="tools">Tools</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
                        Proficiency Level
                      </label>
                      <span className="text-xs font-mono text-neon-blue font-bold">
                        {skillForm.level}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={skillForm.level}
                      onChange={(e) =>
                        setSkillForm({ ...skillForm, level: parseInt(e.target.value, 10) })
                      }
                      className="w-full accent-neon-blue cursor-pointer"
                    />
                  </div>
                </div>

                {/* Pinned Footer */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50/70 dark:bg-slate-950/70">
                  <button
                    type="button"
                    onClick={() => setIsSkillModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-linear-to-r from-neon-blue to-neon-purple hover:brightness-110 cursor-pointer shadow-md text-center"
                  >
                    Save Skill
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. CUSTOM CONFIRMATION DIALOG (No native browser alert/confirm) */}
      <AnimatePresence>
        {confirmDialog.isOpen && (
          <div
            onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="p-5 sm:p-6 rounded-2xl max-w-md w-full bg-white/95 dark:bg-slate-950/90 border border-red-500/30 dark:border-red-500/20 shadow-2xl backdrop-blur-md relative overflow-hidden"
            >
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="p-2.5 sm:p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
                    {confirmDialog.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    {confirmDialog.message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer -mr-1 -mt-1"
                  title="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer text-center"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    confirmDialog.onConfirm();
                    setConfirmDialog({ ...confirmDialog, isOpen: false });
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all cursor-pointer text-center"
                >
                  {confirmDialog.confirmLabel || 'Ya, Hapus'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
