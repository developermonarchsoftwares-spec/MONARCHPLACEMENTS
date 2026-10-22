import fs from 'node:fs/promises'
import path from 'node:path'

export interface InternshipApplication {
  id: string
  fullName: string
  contactNumber: string
  email: string
  collegeName: string
  courseAndYear: string
  preferredDomain: string
  preferredDuration: '15 Days' | '1 Month' | '2 Months' | '3 Months' | '6 Months'
  submittedAt: string
  status: 'pending' | 'reviewed' | 'contacted'
}

export interface CollegeEnquiry {
  id: string
  contactPerson: string
  collegeName: string
  officialEmail: string
  contactNumber: string
  department: string
  trainingProgram: string
  preferredSchedule: string
  additionalRequirements?: string
  submittedAt: string
  status: 'pending' | 'reviewed' | 'proposal_sent'
}

const DATA_DIR = path.join(process.cwd(), 'data')
const INTERNSHIPS_FILE = path.join(DATA_DIR, 'internships.json')
const COLLEGE_ENQUIRIES_FILE = path.join(DATA_DIR, 'college_enquiries.json')

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {
    // ignore if already exists
  }
}

async function readJsonFile<T>(filePath: string): Promise<T[]> {
  await ensureDataDir()
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as T[]
  } catch {
    return []
  }
}

async function writeJsonFile<T>(filePath: string, data: T[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// Optional server-side notification forwarder
async function forwardNotification(subject: string, payload: Record<string, unknown>) {
  try {
    const apiKey = process.env.WEB3FORMS_ACCESS_KEY || '4bf1d586-25ec-4be4-8df7-fbbba4d6cb78'
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: apiKey,
        subject,
        from_name: 'Monarch Placements Portal',
        ...payload,
      }),
    })
  } catch (err) {
    console.error('Failed to forward email notification:', err)
  }
}

export async function saveInternshipApplication(
  input: Omit<InternshipApplication, 'id' | 'submittedAt' | 'status'>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const existing = await readJsonFile<InternshipApplication>(INTERNSHIPS_FILE)

    // Duplicate check: same email and duration within the last 15 minutes
    const now = Date.now()
    const isRecentDuplicate = existing.some(item => {
      if (item.email.toLowerCase() === input.email.toLowerCase() && item.preferredDuration === input.preferredDuration) {
        const diffMinutes = (now - new Date(item.submittedAt).getTime()) / (1000 * 60)
        return diffMinutes < 15
      }
      return false
    })

    if (isRecentDuplicate) {
      return {
        success: false,
        error: 'An application with this email and duration was recently submitted. Our team will contact you shortly.',
      }
    }

    const newRecord: InternshipApplication = {
      ...input,
      id: `INT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    }

    existing.unshift(newRecord)
    await writeJsonFile(INTERNSHIPS_FILE, existing)

    // Forward notification server-side
    await forwardNotification(`New Internship Application: ${input.fullName} (${input.preferredDomain} - ${input.preferredDuration})`, {
      ...newRecord,
    })

    return { success: true, id: newRecord.id }
  } catch (err: unknown) {
    console.error('Error saving internship application:', err)
    return { success: false, error: 'Database persistence error. Please try again.' }
  }
}

export async function getInternshipApplications(): Promise<InternshipApplication[]> {
  return readJsonFile<InternshipApplication>(INTERNSHIPS_FILE)
}

export async function saveCollegeEnquiry(
  input: Omit<CollegeEnquiry, 'id' | 'submittedAt' | 'status'>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const existing = await readJsonFile<CollegeEnquiry>(COLLEGE_ENQUIRIES_FILE)

    // Duplicate check
    const now = Date.now()
    const isRecentDuplicate = existing.some(item => {
      if (item.officialEmail.toLowerCase() === input.officialEmail.toLowerCase() && item.trainingProgram === input.trainingProgram) {
        const diffMinutes = (now - new Date(item.submittedAt).getTime()) / (1000 * 60)
        return diffMinutes < 15
      }
      return false
    })

    if (isRecentDuplicate) {
      return {
        success: false,
        error: 'An institutional enquiry from this email was recently received. Our institutional coordinator will reach out shortly.',
      }
    }

    const newRecord: CollegeEnquiry = {
      ...input,
      id: `COL-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    }

    existing.unshift(newRecord)
    await writeJsonFile(COLLEGE_ENQUIRIES_FILE, existing)

    // Forward notification server-side
    await forwardNotification(`New College Partnership Request: ${input.collegeName} (${input.trainingProgram})`, {
      ...newRecord,
    })

    return { success: true, id: newRecord.id }
  } catch (err: unknown) {
    console.error('Error saving college enquiry:', err)
    return { success: false, error: 'Database persistence error. Please try again.' }
  }
}

export async function getCollegeEnquiries(): Promise<CollegeEnquiry[]> {
  return readJsonFile<CollegeEnquiry>(COLLEGE_ENQUIRIES_FILE)
}
