import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  DeveloperInfo,
  Project,
  Experience,
  Education,
  Skill,
} from '@/types/portfolio';
import {
  getFullPortfolioData,
  defaultProfile,
  updateProfileInSupabase,
  upsertProjectInSupabase,
  deleteProjectFromSupabase,
  upsertExperienceInSupabase,
  deleteExperienceFromSupabase,
  upsertEducationInSupabase,
  deleteEducationFromSupabase,
  upsertSkillInSupabase,
  deleteSkillFromSupabase,
} from '@/lib/portfolioService';
import { isSupabaseConfigured } from '@/lib/supabase';

interface PortfolioState {
  developerInfo: DeveloperInfo;
  projects: Project[];
  experiences: Experience[];
  educationList: Education[];
  skills: Skill[];
  isLoading: boolean;
  isSynced: boolean;
  isConfigured: boolean;

  fetchData: () => Promise<void>;
  updateProfile: (info: DeveloperInfo) => Promise<{ success: boolean; error?: string }>;
  saveProject: (project: Project) => Promise<{ success: boolean; error?: string }>;
  deleteProject: (id: string) => Promise<{ success: boolean; error?: string }>;
  saveExperience: (exp: Experience) => Promise<{ success: boolean; error?: string }>;
  deleteExperience: (id: string) => Promise<{ success: boolean; error?: string }>;
  saveEducation: (edu: Education) => Promise<{ success: boolean; error?: string }>;
  deleteEducation: (id: string) => Promise<{ success: boolean; error?: string }>;
  saveSkill: (skill: Skill) => Promise<{ success: boolean; error?: string }>;
  deleteSkill: (name: string) => Promise<{ success: boolean; error?: string }>;
  exportBackupJSON: () => string;
  importBackupJSON: (jsonString: string) => Promise<{ success: boolean; error?: string }>;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      developerInfo: defaultProfile,
      projects: [],
      experiences: [],
      educationList: [],
      skills: [],
      isLoading: false,
      isSynced: false,
      isConfigured: isSupabaseConfigured(),

      fetchData: async () => {
        set({ isLoading: true, isConfigured: isSupabaseConfigured() });
        try {
          const data = await getFullPortfolioData();
          set({
            developerInfo: data.developerInfo,
            projects: data.projects,
            experiences: data.experiences,
            educationList: data.educationList,
            skills: data.skills,
            isSynced: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to sync portfolio data:', error);
          set({ isLoading: false });
        }
      },

      updateProfile: async (info: DeveloperInfo) => {
        set({ developerInfo: info });
        if (isSupabaseConfigured()) {
          return await updateProfileInSupabase(info);
        }
        return { success: true };
      },

      saveProject: async (project: Project) => {
        const { projects } = get();
        const existingIndex = projects.findIndex((p) => p.id === project.id);
        let updatedProjects: Project[];

        if (existingIndex >= 0) {
          updatedProjects = [...projects];
          updatedProjects[existingIndex] = project;
        } else {
          updatedProjects = [project, ...projects];
        }

        set({ projects: updatedProjects });

        if (isSupabaseConfigured()) {
          const orderIndex = existingIndex >= 0 ? existingIndex : 0;
          return await upsertProjectInSupabase(project, orderIndex);
        }
        return { success: true };
      },

      deleteProject: async (id: string) => {
        const { projects } = get();
        set({ projects: projects.filter((p) => p.id !== id) });

        if (isSupabaseConfigured()) {
          return await deleteProjectFromSupabase(id);
        }
        return { success: true };
      },

      saveExperience: async (exp: Experience) => {
        const { experiences } = get();
        const existingIndex = experiences.findIndex((e) => e.id === exp.id);
        let updated: Experience[];

        if (existingIndex >= 0) {
          updated = [...experiences];
          updated[existingIndex] = exp;
        } else {
          updated = [exp, ...experiences];
        }

        set({ experiences: updated });

        if (isSupabaseConfigured()) {
          return await upsertExperienceInSupabase(exp, existingIndex >= 0 ? existingIndex : 0);
        }
        return { success: true };
      },

      deleteExperience: async (id: string) => {
        const { experiences } = get();
        set({ experiences: experiences.filter((e) => e.id !== id) });

        if (isSupabaseConfigured()) {
          return await deleteExperienceFromSupabase(id);
        }
        return { success: true };
      },

      saveEducation: async (edu: Education) => {
        const { educationList } = get();
        const existingIndex = educationList.findIndex((e) => e.id === edu.id);
        let updated: Education[];

        if (existingIndex >= 0) {
          updated = [...educationList];
          updated[existingIndex] = edu;
        } else {
          updated = [edu, ...educationList];
        }

        set({ educationList: updated });

        if (isSupabaseConfigured()) {
          return await upsertEducationInSupabase(edu, existingIndex >= 0 ? existingIndex : 0);
        }
        return { success: true };
      },

      deleteEducation: async (id: string) => {
        const { educationList } = get();
        set({ educationList: educationList.filter((e) => e.id !== id) });

        if (isSupabaseConfigured()) {
          return await deleteEducationFromSupabase(id);
        }
        return { success: true };
      },

      saveSkill: async (skill: Skill) => {
        const { skills } = get();
        const existingIndex = skills.findIndex((s) => s.name.toLowerCase() === skill.name.toLowerCase());
        let updated: Skill[];

        if (existingIndex >= 0) {
          updated = [...skills];
          updated[existingIndex] = skill;
        } else {
          updated = [...skills, skill];
        }

        set({ skills: updated });

        if (isSupabaseConfigured()) {
          return await upsertSkillInSupabase(skill, undefined, existingIndex >= 0 ? existingIndex : skills.length);
        }
        return { success: true };
      },

      deleteSkill: async (name: string) => {
        const { skills } = get();
        set({ skills: skills.filter((s) => s.name.toLowerCase() !== name.toLowerCase()) });

        if (isSupabaseConfigured()) {
          return await deleteSkillFromSupabase(name);
        }
        return { success: true };
      },

      exportBackupJSON: () => {
        const { developerInfo, projects, experiences, educationList, skills } = get();
        return JSON.stringify(
          {
            exportedAt: new Date().toISOString(),
            developerInfo,
            projects,
            experiences,
            educationList,
            skills,
          },
          null,
          2
        );
      },

      importBackupJSON: async (jsonString: string) => {
        try {
          const parsed = JSON.parse(jsonString);
          if (!parsed.developerInfo || !parsed.projects) {
            return { success: false, error: 'Format file JSON tidak valid' };
          }

          set({
            developerInfo: parsed.developerInfo || defaultProfile,
            projects: parsed.projects || [],
            experiences: parsed.experiences || [],
            educationList: parsed.educationList || [],
            skills: parsed.skills || [],
          });

          // If Supabase is configured, sync everything
          if (isSupabaseConfigured()) {
            await updateProfileInSupabase(parsed.developerInfo);
            for (let i = 0; i < (parsed.projects || []).length; i++) {
              await upsertProjectInSupabase(parsed.projects[i], i);
            }
            for (let i = 0; i < (parsed.experiences || []).length; i++) {
              await upsertExperienceInSupabase(parsed.experiences[i], i);
            }
            for (let i = 0; i < (parsed.educationList || []).length; i++) {
              await upsertEducationInSupabase(parsed.educationList[i], i);
            }
            for (let i = 0; i < (parsed.skills || []).length; i++) {
              await upsertSkillInSupabase(parsed.skills[i], undefined, i);
            }
          }

          return { success: true };
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : 'Unknown error';
          return { success: false, error: errorMsg };
        }
      },
    }),
    {
      name: 'portfolio-cache-v2',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        developerInfo: state.developerInfo,
        projects: state.projects,
        experiences: state.experiences,
        educationList: state.educationList,
        skills: state.skills,
      }),
    }
  )
);
