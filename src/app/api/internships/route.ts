import { NextResponse } from 'next/server'
import { saveInternshipApplication, getInternshipApplications } from '@/lib/storage'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      fullName,
      contactNumber,
      email,
      collegeName,
      courseAndYear,
      preferredDomain,
      preferredDuration,
    } = body

    // Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please provide a valid full name.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 })
    }

    const phoneClean = (contactNumber || '').toString().replace(/[\s-]/g, '')
    if (!phoneClean || phoneClean.length < 10) {
      return NextResponse.json({ success: false, error: 'Please provide a valid 10-digit WhatsApp or contact number.' }, { status: 400 })
    }

    if (!collegeName || typeof collegeName !== 'string' || collegeName.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter your college name.' }, { status: 400 })
    }

    if (!courseAndYear || typeof courseAndYear !== 'string' || courseAndYear.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter your course and year of study.' }, { status: 400 })
    }

    if (!preferredDomain || typeof preferredDomain !== 'string') {
      return NextResponse.json({ success: false, error: 'Please select your preferred internship domain.' }, { status: 400 })
    }

    const validDurations = ['15 Days', '1 Month', '2 Months', '3 Months', '6 Months']
    if (!preferredDuration || !validDurations.includes(preferredDuration)) {
      return NextResponse.json({ success: false, error: 'Please choose a valid internship duration (15 Days, 1 Month, 2 Months, 3 Months, or 6 Months).' }, { status: 400 })
    }

    const result = await saveInternshipApplication({
      fullName: fullName.trim(),
      contactNumber: phoneClean.trim(),
      email: email.trim().toLowerCase(),
      collegeName: collegeName.trim(),
      courseAndYear: courseAndYear.trim(),
      preferredDomain: preferredDomain.trim(),
      preferredDuration,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Failed to submit application.' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Application received successfully. Our team will contact you regarding next steps.',
    })
  } catch (err: unknown) {
    console.error('Internship submission API error:', err)
    return NextResponse.json({ success: false, error: 'An unexpected server error occurred. Please try again.' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const exportFormat = url.searchParams.get('format')
    const applications = await getInternshipApplications()

    if (exportFormat === 'csv') {
      const headers = ['ID,Full Name,Contact Number,Email,College,Course & Year,Domain,Duration,Submitted At,Status']
      const rows = applications.map(a => 
        `"${a.id}","${a.fullName}","${a.contactNumber}","${a.email}","${a.collegeName}","${a.courseAndYear}","${a.preferredDomain}","${a.preferredDuration}","${a.submittedAt}","${a.status}"`
      )
      const csv = [headers, ...rows].join('\n')
      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="internship-applications.csv"',
        },
      })
    }

    return NextResponse.json({ success: true, count: applications.length, applications })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch applications.' }, { status: 500 })
  }
}
