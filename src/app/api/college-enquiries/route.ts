import { NextResponse } from 'next/server'
import { saveCollegeEnquiry, getCollegeEnquiries } from '@/lib/storage'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      contactPerson,
      collegeName,
      officialEmail,
      contactNumber,
      department,
      trainingProgram,
      preferredSchedule,
      additionalRequirements,
    } = body

    // Validation
    if (!contactPerson || typeof contactPerson !== 'string' || contactPerson.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter the contact person name.' }, { status: 400 })
    }

    if (!collegeName || typeof collegeName !== 'string' || collegeName.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter the institution / college name.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!officialEmail || typeof officialEmail !== 'string' || !emailRegex.test(officialEmail.trim())) {
      return NextResponse.json({ success: false, error: 'Please enter a valid official email address.' }, { status: 400 })
    }

    const phoneClean = (contactNumber || '').toString().replace(/[\s-]/g, '')
    if (!phoneClean || phoneClean.length < 10) {
      return NextResponse.json({ success: false, error: 'Please provide a valid 10-digit contact number.' }, { status: 400 })
    }

    if (!department || typeof department !== 'string' || department.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter the target department(s).' }, { status: 400 })
    }

    if (!trainingProgram || typeof trainingProgram !== 'string') {
      return NextResponse.json({ success: false, error: 'Please select an interested training program.' }, { status: 400 })
    }

    if (!preferredSchedule || typeof preferredSchedule !== 'string') {
      return NextResponse.json({ success: false, error: 'Please provide your preferred schedule or duration.' }, { status: 400 })
    }

    const result = await saveCollegeEnquiry({
      contactPerson: contactPerson.trim(),
      collegeName: collegeName.trim(),
      officialEmail: officialEmail.trim().toLowerCase(),
      contactNumber: phoneClean.trim(),
      department: department.trim(),
      trainingProgram: trainingProgram.trim(),
      preferredSchedule: preferredSchedule.trim(),
      additionalRequirements: (additionalRequirements || '').trim(),
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Failed to submit proposal request.' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Institutional training enquiry received. Our academic coordinator will contact you with a customized proposal.',
    })
  } catch (err: unknown) {
    console.error('College enquiry API error:', err)
    return NextResponse.json({ success: false, error: 'An unexpected server error occurred. Please try again.' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const exportFormat = url.searchParams.get('format')
    const enquiries = await getCollegeEnquiries()

    if (exportFormat === 'csv') {
      const headers = ['ID,Contact Person,College Name,Official Email,Contact Number,Department,Program,Schedule,Requirements,Submitted At,Status']
      const rows = enquiries.map(e => 
        `"${e.id}","${e.contactPerson}","${e.collegeName}","${e.officialEmail}","${e.contactNumber}","${e.department}","${e.trainingProgram}","${e.preferredSchedule}","${(e.additionalRequirements || '').replace(/"/g, '""')}","${e.submittedAt}","${e.status}"`
      )
      const csv = [headers, ...rows].join('\n')
      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="college-enquiries.csv"',
        },
      })
    }

    return NextResponse.json({ success: true, count: enquiries.length, enquiries })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch college enquiries.' }, { status: 500 })
  }
}
