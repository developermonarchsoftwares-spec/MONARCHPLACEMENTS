import fs from 'node:fs/promises'
import os from 'node:os'
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

export interface HiringRequirement {
  id: string
  companyName: string
  contactPerson: string
  designation?: string
  officialEmail: string
  phoneNumber: string
  jobTitle: string
  numberOfOpenings: number
  requiredSkills: string
  candidatePreference: 'Fresher' | 'Experienced' | 'Both'
  experienceRange?: string
  workLocation: string
  workMode: 'On-site' | 'Hybrid' | 'Remote'
  joiningTimeline: string
  jobDescription?: string
  additionalRequirements?: string
  consent: boolean
  submittedAt: string
  status: 'pending' | 'reviewed' | 'contacted'
}

// Vercel's deployment filesystem is read-only, so the JSON files only live in /tmp there and
// are not a durable record. On Vercel the email notification is what delivers a submission.
const IS_SERVERLESS = Boolean(process.env.VERCEL)
const DATA_DIR = IS_SERVERLESS ? path.join(os.tmpdir(), 'monarch-data') : path.join(process.cwd(), 'data')
const DELIVERY_ERROR =
  'We could not record your submission right now. Please try again in a moment or contact us directly at hr@monarchplacements.in.'
const INTERNSHIPS_FILE = path.join(DATA_DIR, 'internships.json')
const COLLEGE_ENQUIRIES_FILE = path.join(DATA_DIR, 'college_enquiries.json')
const HIRING_REQUIREMENTS_FILE = path.join(DATA_DIR, 'hiring_requirements.json')

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

// Server-side notification forwarder. Resolves true only when the email service accepted it.
async function forwardNotification(subject: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const apiKey = process.env.WEB3FORMS_ACCESS_KEY || '4bf1d586-25ec-4be4-8df7-fbbba4d6cb78'
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: apiKey,
        subject,
        from_name: 'Monarch Placements Portal',
        ...payload,
      }),
    })
    return res.ok
  } catch (err) {
    console.error('Failed to forward email notification:', err)
    return false
  }
}

// A submission counts as received when the email went out, or (locally only) when it was saved to disk.
async function persistAndNotify<T>(
  filePath: string,
  records: T[],
  subject: string,
  payload: Record<string, unknown>
): Promise<boolean> {
  let saved = false
  try {
    await writeJsonFile(filePath, records)
    saved = true
  } catch (err) {
    console.error('Could not write submission file:', err)
  }
  const notified = await forwardNotification(subject, payload)
  return notified || (saved && !IS_SERVERLESS)
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
    const delivered = await persistAndNotify(INTERNSHIPS_FILE, existing, `New Internship Application: ${input.fullName} (${input.preferredDomain} - ${input.preferredDuration})`, { ...newRecord })
    if (!delivered) {
      return { success: false, error: DELIVERY_ERROR }
    }

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
    const delivered = await persistAndNotify(COLLEGE_ENQUIRIES_FILE, existing, `New College Partnership Request: ${input.collegeName} (${input.trainingProgram})`, { ...newRecord })
    if (!delivered) {
      return { success: false, error: DELIVERY_ERROR }
    }

    return { success: true, id: newRecord.id }
  } catch (err: unknown) {
    console.error('Error saving college enquiry:', err)
    return { success: false, error: 'Database persistence error. Please try again.' }
  }
}

export async function getCollegeEnquiries(): Promise<CollegeEnquiry[]> {
  return readJsonFile<CollegeEnquiry>(COLLEGE_ENQUIRIES_FILE)
}

export async function saveHiringRequirement(
  input: Omit<HiringRequirement, 'id' | 'submittedAt' | 'status'>
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const existing = await readJsonFile<HiringRequirement>(HIRING_REQUIREMENTS_FILE)

    // Duplicate check: same email and job title within 15 minutes
    const now = Date.now()
    const isRecentDuplicate = existing.some(item => {
      if (
        item.officialEmail.toLowerCase() === input.officialEmail.toLowerCase() &&
        item.jobTitle.toLowerCase() === input.jobTitle.toLowerCase()
      ) {
        const diffMinutes = (now - new Date(item.submittedAt).getTime()) / (1000 * 60)
        return diffMinutes < 15
      }
      return false
    })

    if (isRecentDuplicate) {
      return {
        success: false,
        error: 'A hiring requirement for this role and email was recently received. Our technical recruitment team will contact you shortly.',
      }
    }

    const newRecord: HiringRequirement = {
      ...input,
      id: `HIR-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    }

    existing.unshift(newRecord)
    const delivered = await persistAndNotify(HIRING_REQUIREMENTS_FILE, existing, `New IT Hiring Requirement: ${input.companyName} (${input.jobTitle} - ${input.numberOfOpenings} openings)`, { ...newRecord })
    if (!delivered) {
      return { success: false, error: DELIVERY_ERROR }
    }

    return { success: true, id: newRecord.id }
  } catch (err: unknown) {
    console.error('Error saving hiring requirement:', err)
    return { success: false, error: 'Database persistence error. Please try again.' }
  }
}

export async function getHiringRequirements(): Promise<HiringRequirement[]> {
  return readJsonFile<HiringRequirement>(HIRING_REQUIREMENTS_FILE)
}
