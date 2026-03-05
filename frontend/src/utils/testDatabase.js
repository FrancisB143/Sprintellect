// Test utilities for debugging Supabase database
import { 
  getCompletions, 
  getStudySessions, 
  markTodayComplete, 
  clearDatabase 
} from './database'

// Test database functionality
export async function testDatabase() {
  console.log('=== Testing Supabase Database ===')
  
  try {
    // Get completions
    const completions = await getCompletions()
    console.log('✓ Completions:', completions)
    
    // Get study sessions
    const sessions = await getStudySessions()
    console.log('✓ Study sessions:', sessions)
    
    console.log('=== Database Test Complete ===')
    return { completions, sessions }
  } catch (error) {
    console.error('✗ Database test failed:', error)
    return null
  }
}

// Add test data
export async function addTestData() {
  const now = new Date()
  const testDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const testQuestions = [
    'Test question 1?',
    'Test question 2?',
    'Test question 3?',
    'Test question 4?',
    'Test question 5?'
  ]
  const testAnswers = [
    'This is a test answer 1',
    'This is a test answer 2',
    'This is a test answer 3',
    'This is a test answer 4',
    'This is a test answer 5'
  ]
  
  try {
    await markTodayComplete(testDate, testQuestions, testAnswers, 'These are test notes from the study session.')
    console.log('✓ Test data added successfully')
    return await testDatabase()
  } catch (error) {
    console.error('✗ Failed to add test data:', error)
    return null
  }
}

// View all data in a formatted way
export async function viewAllData() {
  const sessions = await getStudySessions()
  
  if (sessions.length === 0) {
    console.log('No study sessions found')
    return
  }
  
  console.log(`Found ${sessions.length} study session(s):`)
  sessions.forEach((session, idx) => {
    console.log(`\n--- Session ${idx + 1} (${session.date}) ---`)
    for (let i = 1; i <= 5; i++) {
      console.log(`Q${i}: ${session[`question_${i}`]}`)
      console.log(`A${i}: ${session[`answer_${i}`]}`)
    }
  })
}

// Clear all data
export async function clearAllData() {
  if (confirm('Are you sure you want to clear all database data?')) {
    await clearDatabase()
    console.log('✓ All data cleared')
  }
}

// Make functions available globally for console testing
if (typeof window !== 'undefined') {
  window.dbTest = testDatabase
  window.dbAddTest = addTestData
  window.dbView = viewAllData
  window.dbClear = clearAllData
  console.log('Database test utilities loaded. Use:')
  console.log('  - dbTest() to test database')
  console.log('  - dbAddTest() to add test data')
  console.log('  - dbView() to view all data')
  console.log('  - dbClear() to clear all data')
}
