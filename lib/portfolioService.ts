import { supabase, isSupabaseConfigured } from './supabase';
import {
  DeveloperInfo,
  Project,
  Experience,
  Education,
  Skill,
} from '@/types/portfolio';

export const defaultProfile: DeveloperInfo = {
  name: 'Prazz',
  title: 'Creative Web Developer',
  tagline: 'Crafting Modern Web Experiences',
  subTagline: 'Building high-performance, visually stunning, and highly interactive interfaces using Next.js, TypeScript, and modern design principles.',
  about: 'Informatics graduate with hands-on experience in front-end development through MSIB programs and software engineering projects. Proficient in building responsive web interfaces using HTML, CSS, JavaScript, React.js, Next.js, and Tailwind CSS. Experienced in translating design concepts into functional landing pages, collaborating with Digital Marketing teams, and applying basic SEO practices.',
  email: 'prasetiawahyu22@gmail.com',
  github: 'https://github.com/Pras00',
  linkedin: 'https://www.linkedin.com/in/prasetia-wahyu-ramadhan-188919220/',
  twitter: 'https://twitter.com',
};

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
      developerInfo: defaultProfile,
      projects: [],
      experiences: [],
      educationList: [],
      skills: [],
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
          name: profileRes.data.name || defaultProfile.name,
          title: profileRes.data.title || defaultProfile.title,
          tagline: profileRes.data.tagline || defaultProfile.tagline,
          subTagline: profileRes.data.sub_tagline || defaultProfile.subTagline,
          about: profileRes.data.about || defaultProfile.about,
          email: profileRes.data.email || defaultProfile.email,
          github: profileRes.data.github || defaultProfile.github,
          linkedin: profileRes.data.linkedin || defaultProfile.linkedin,
          twitter: profileRes.data.twitter || defaultProfile.twitter,
        }
      : defaultProfile;

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
        : [];

    const experiences: Experience[] =
      experiencesRes.data && experiencesRes.data.length > 0
        ? experiencesRes.data.map((e) => ({
            id: e.id,
            role: e.role,
            company: e.company,
            period: e.period,
            description: Array.isArray(e.description) ? e.description : [],
          }))
        : [];

    const educationList: Education[] =
      educationRes.data && educationRes.data.length > 0
        ? educationRes.data.map((ed) => ({
            id: ed.id,
            degree: ed.degree,
            school: ed.school,
            period: ed.period,
            description: Array.isArray(ed.description) ? ed.description : [],
          }))
        : [];

    const skills: Skill[] =
      skillsRes.data && skillsRes.data.length > 0
        ? skillsRes.data.map((s) => ({
            name: s.name,
            level: s.level,
            category: s.category,
          }))
        : [];

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
      developerInfo: defaultProfile,
      projects: [],
      experiences: [],
      educationList: [],
      skills: [],
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
