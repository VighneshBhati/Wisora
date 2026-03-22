import { supabase } from '@/integrations/supabase/client';

// Pure local search — no API call needed, saves tokens
export async function resolveEntityId(
  userMessage: string,
  entityType: 'course' | 'lesson',
  instructorId: string
): Promise<string | null> {
  if (entityType !== 'course') return null;

  try {
    const { data: courses, error } = await supabase
      .from('courses')
      .select('id, title')
      .eq('instructor_id', instructorId);

    if (error || !courses?.length) return null;

    const input = userMessage.toLowerCase();

    // Score each course by how well it matches the input
    let best: { id: string; score: number } | null = null;

    for (const course of courses) {
      const title = course.title.toLowerCase();
      let score = 0;

      if (title === input) score = 100;
      else if (input.includes(title)) score = 80;
      else if (title.includes(input)) score = 70;
      else {
        // Word overlap score
        const titleWords = title.split(/\s+/).filter(w => w.length > 2);
        const inputWords = input.split(/\s+/).filter(w => w.length > 2);
        const matches = titleWords.filter(tw => inputWords.some(iw => iw.includes(tw) || tw.includes(iw)));
        score = matches.length > 0 ? (matches.length / titleWords.length) * 60 : 0;
      }

      if (score > 0 && (!best || score > best.score)) {
        best = { id: course.id, score };
      }
    }

    return best ? best.id : null;
  } catch {
    return null;
  }
}
