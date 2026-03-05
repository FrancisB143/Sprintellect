import { supabase } from './supabaseClient'

// Get all completion dates
export async function getCompletions() {
  try {
    const { data, error } = await supabase
      .from('completions')
      .select('date')
      .order('date', { ascending: false })

    if (error) throw error
    return (data || []).map(row => row.date)
  } catch (error) {
    console.error('Failed to get completions:', error)
    return []
  }
}

// Mark today as completed
export async function markTodayComplete(date, questions, answers, notes) {
  try {
    // Upsert completion date (ignore if already exists)
    const { error: compError } = await supabase
      .from('completions')
      .upsert({ date }, { onConflict: 'date' })

    if (compError) throw compError

    // Insert study session with questions, answers, and notes
    const { error: sessError } = await supabase
      .from('study_sessions')
      .insert({
        date,
        notes: notes || null,
        question_1: questions[0] || null,
        answer_1: answers[0] || null,
        question_2: questions[1] || null,
        answer_2: answers[1] || null,
        question_3: questions[2] || null,
        answer_3: answers[2] || null,
        question_4: questions[3] || null,
        answer_4: answers[3] || null,
        question_5: questions[4] || null,
        answer_5: answers[4] || null,
      })

    if (sessError) throw sessError
    console.log('Study session saved successfully')
  } catch (error) {
    console.error('Failed to mark today complete:', error)
    throw error
  }
}

// Get all study sessions
export async function getStudySessions() {
  try {
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to get study sessions:', error)
    return []
  }
}

// Get all study sessions for a specific date
export async function getStudySessionByDate(date) {
  try {
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('date', date)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to get study sessions by date:', error)
    return []
  }
}

// Clear all data (for testing)
export async function clearDatabase() {
  try {
    const { error: sessError } = await supabase
      .from('study_sessions')
      .delete()
      .neq('id', 0)

    if (sessError) throw sessError

    const { error: compError } = await supabase
      .from('completions')
      .delete()
      .neq('id', 0)

    if (compError) throw compError
    console.log('Database cleared successfully')
  } catch (error) {
    console.error('Failed to clear database:', error)
    throw error
  }
}
