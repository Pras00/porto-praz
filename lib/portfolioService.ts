import { supabase, isSupabaseConfigured } from './supabase';
import {
  DeveloperInfo,
  Project,
  Experience,
  Education,
  Skill,
  developerInfo as fallbackInfo,
  projects as fallbackProjects,
  experiences as fallbackExperiences,
  educationList as fallbackEducation,
  skills as fallbackSkills,
} from '@/data/portfolioData';

export interface FullPortfolioData {
  developerInfo: DeveloperInfo;
  projects: Project[];
  experiences: Experience[];
  educationList: Education[];
  skills: Skill[];
}

// Fetch all portfolio data with graceful fallback
export async function getFullPortfolioData(): Promise<FullPortfolioData> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      developerInfo: fallbackInfo,
      projects: fallbackProjects,
      experiences: fallbackExperiences,
      educationList: fallbackEducation,
      skills: fallbackSkills,
    };
  }

  try {
    const [profileRes, projectsRes, experiencesRes, educationRes, skillsRes] =
      await Promise.all([
        supabase.from('portfolio_profile').select('*').eq('id', 'main').single(),
        supabase.from('portfolio_projects').select('*').order('order_index', { ascending: true }),
        supabase.from('portfolio_experiences').select('*').order('order_index', { ascending: true }),
        supabase.from('portfolio_education').select('*').order('order_index', { ascending: true }),
        supabase.from('portfolio_skills').select('*').order('order_index', { ascending: true }),
      ]);

    const developerInfo: DeveloperInfo = profileRes.data
      ? {
          name: profileRes.data.name || fallbackInfo.name,
          title: profileRes.data.title || fallbackInfo.title,
          tagline: profileRes.data.tagline || fallbackInfo.tagline,
          subTagline: profileRes.data.sub_tagline || fallbackInfo.subTagline,
          about: profileRes.data.about || fallbackInfo.about,
          email: profileRes.data.email || fallbackInfo.email,
          github: profileRes.data.github || fallbackInfo.github,
          linkedin: profileRes.data.linkedin || fallbackInfo.linkedin,
          twitter: profileRes.data.twitter || fallbackInfo.twitter,
        }
      : fallbackInfo;

    const projects: Project[] =
      projectsRes.data && projectsRes.data.length > 0
        ? projectsRes.data.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            longDescription: p.long_description,
            technologies: Array.isArray(p.technologies) ? p.technologies : [],
            category: p.category,
            image: p.image || '',
            demoUrl: p.demo_url || '',
            githubUrl: p.github_url || '',
            featured: Boolean(p.featured),
          }))
        : fallbackProjects;

    const experiences: Experience[] =
      experiencesRes.data && experiencesRes.data.length > 0
        ? experiencesRes.data.map((e) => ({
            id: e.id,
            role: e.role,
            company: e.company,
            period: e.period,
            description: Array.isArray(e.description) ? e.description : [],
          }))
        : fallbackExperiences;

    const educationList: Education[] =
      educationRes.data && educationRes.data.length > 0
        ? educationRes.data.map((ed) => ({
            id: ed.id,
            degree: ed.degree,
            school: ed.school,
            period: ed.period,
            description: Array.isArray(ed.description) ? ed.description : [],
          }))
        : fallbackEducation;

    const skills: Skill[] =
      skillsRes.data && skillsRes.data.length > 0
        ? skillsRes.data.map((s) => ({
            name: s.name,
            level: s.level,
            category: s.category,
          }))
        : fallbackSkills;

    return {
      developerInfo,
      projects,
      experiences,
      educationList,
      skills,
    };
  } catch (err) {
    console.error('Error fetching data from Supabase, using fallback:', err);
    return {
      developerInfo: fallbackInfo,
      projects: fallbackProjects,
      experiences: fallbackExperiences,
      educationList: fallbackEducation,
      skills: fallbackSkills,
    };
  }
}

// Update Profile
export async function updateProfileInSupabase(info: DeveloperInfo): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase is not configured' };

  const { error } = await supabase.from('portfolio_profile').upsert({
    id: 'main',
    name: info.name,
    title: info.title,
    tagline: info.tagline,
    sub_tagline: info.subTagline,
    about: info.about,
    email: info.email,
    github: info.github,
    linkedin: info.linkedin,
    twitter: info.twitter,
    updated_at: new Date().toISOString(),
  });

  return { success: !error, error: error?.message };
}

// Save Project (Insert / Update)
export async function upsertProjectInSupabase(project: Project, orderIndex = 0): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase is not configured' };

  const { error } = await supabase.from('portfolio_projects').upsert({
    id: project.id,
    title: project.title,
    description: project.description,
    long_description: project.longDescription,
    technologies: project.technologies,
    category: project.category,
    image: project.image,
    demo_url: project.demoUrl,
    github_url: project.githubUrl,
    featured: project.featured,
    order_index: orderIndex,
    updated_at: new Date().toISOString(),
  });

  return { success: !error, error: error?.message };
}

// Delete Project
export async function deleteProjectFromSupabase(id: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase is not configured' };
  const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
  return { success: !error, error: error?.message };
}

// Save Experience
export async function upsertExperienceInSupabase(exp: Experience, orderIndex = 0): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase is not configured' };

  const { error } = await supabase.from('portfolio_experiences').upsert({
    id: exp.id,
    role: exp.role,
    company: exp.company,
    period: exp.period,
    description: exp.description,
    order_index: orderIndex,
    updated_at: new Date().toISOString(),
  });

  return { success: !error, error: error?.message };
}

// Delete Experience
export async function deleteExperienceFromSupabase(id: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase is not configured' };
  const { error } = await supabase.from('portfolio_experiences').delete().eq('id', id);
  return { success: !error, error: error?.message };
}

// Save Education
export async function upsertEducationInSupabase(edu: Education, orderIndex = 0): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase is not configured' };

  const { error } = await supabase.from('portfolio_education').upsert({
    id: edu.id,
    degree: edu.degree,
    school: edu.school,
    period: edu.period,
    description: edu.description,
    order_index: orderIndex,
    updated_at: new Date().toISOString(),
  });

  return { success: !error, error: error?.message };
}

// Delete Education
export async function deleteEducationFromSupabase(id: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase is not configured' };
  const { error } = await supabase.from('portfolio_education').delete().eq('id', id);
  return { success: !error, error: error?.message };
}

// Save Skill
export async function upsertSkillInSupabase(skill: Skill, id?: string, orderIndex = 0): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase is not configured' };

  const skillId = id || `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const { error } = await supabase.from('portfolio_skills').upsert({
    id: skillId,
    name: skill.name,
    level: skill.level,
    category: skill.category,
    order_index: orderIndex,
    updated_at: new Date().toISOString(),
  });

  return { success: !error, error: error?.message };
}

// Delete Skill
export async function deleteSkillFromSupabase(skillName: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) return { success: false, error: 'Supabase is not configured' };
  const { error } = await supabase.from('portfolio_skills').delete().eq('name', skillName);
  return { success: !error, error: error?.message };
}
