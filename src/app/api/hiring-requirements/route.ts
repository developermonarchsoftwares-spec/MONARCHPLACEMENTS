import { NextResponse } from 'next/server'
import { saveHiringRequirement, getHiringRequirements } from '@/lib/storage'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      companyName,
      contactPerson,
      designation,
      officialEmail,
      phoneNumber,
      jobTitle,
      numberOfOpenings,
      requiredSkills,
      candidatePreference,
      experienceRange,
      workLocation,
      workMode,
      joiningTimeline,
      jobDescription,
      additionalRequirements,
      consent,
    } = body

    // Validation
    if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter a valid company name.' }, { status: 400 })
    }

    if (!contactPerson || typeof contactPerson !== 'string' || contactPerson.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter the contact person name.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!officialEmail || typeof officialEmail !== 'string' || !emailRegex.test(officialEmail.trim())) {
      return NextResponse.json({ success: false, error: 'Please enter a valid official work email address.' }, { status: 400 })
    }

    const cleanPhone = (phoneNumber || '').toString().replace(/[\s-]/g, '')
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ success: false, error: 'Please provide a valid 10-digit phone number.' }, { status: 400 })
    }

    if (!jobTitle || typeof jobTitle !== 'string' || jobTitle.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please specify the job title / role.' }, { status: 400 })
    }

    const openingsNum = Number(numberOfOpenings)
    if (isNaN(openingsNum) || openingsNum <= 0) {
      return NextResponse.json({ success: false, error: 'Number of openings must be greater than zero.' }, { status: 400 })
    }

    if (!requiredSkills || typeof requiredSkills !== 'string' || requiredSkills.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please list the primary technical skills required.' }, { status: 400 })
    }

    const validPreferences = ['Fresher', 'Experienced', 'Both']
    if (!candidatePreference || !validPreferences.includes(candidatePreference)) {
      return NextResponse.json({ success: false, error: 'Please select candidate preference (Fresher, Experienced, or Both).' }, { status: 400 })
    }

    if (!workLocation || typeof workLocation !== 'string' || workLocation.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please specify the work location / city.' }, { status: 400 })
    }

    const validModes = ['On-site', 'Hybrid', 'Remote']
    if (!workMode || !validModes.includes(workMode)) {
      return NextResponse.json({ success: false, error: 'Please select a valid work mode (On-site, Hybrid, or Remote).' }, { status: 400 })
    }

    if (!joiningTimeline || typeof joiningTimeline !== 'string' || joiningTimeline.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please select your expected joining timeline.' }, { status: 400 })
    }

    if (!consent) {
      return NextResponse.json({ success: false, error: 'Please acknowledge authorization to submit this hiring requirement.' }, { status: 400 })
    }

    const result = await saveHiringRequirement({
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      designation: (designation || '').trim(),
      officialEmail: officialEmail.trim().toLowerCase(),
      phoneNumber: cleanPhone.trim(),
      jobTitle: jobTitle.trim(),
      numberOfOpenings: openingsNum,
      requiredSkills: requiredSkills.trim(),
      candidatePreference: candidatePreference as 'Fresher' | 'Experienced' | 'Both',
      experienceRange: (experienceRange || '').trim(),
      workLocation: workLocation.trim(),
      workMode: workMode as 'On-site' | 'Hybrid' | 'Remote',
      joiningTimeline: joiningTimeline.trim(),
      jobDescription: (jobDescription || '').trim(),
      additionalRequirements: (additionalRequirements || '').trim(),
      consent: Boolean(consent),
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Failed to submit requirement.' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Hiring requirement received successfully. Our technical recruitment team will review and contact you within 24 business hours.',
    })
  } catch (err: unknown) {
    console.error('Hiring requirements API error:', err)
    return NextResponse.json({ success: false, error: 'An unexpected server error occurred. Please try again.' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const exportFormat = url.searchParams.get('format')
    const requirements = await getHiringRequirements()

    if (exportFormat === 'csv') {
      const headers = ['ID,Company Name,Contact Person,Designation,Official Email,Phone Number,Job Title,Openings,Skills,Preference,Exp Range,Location,Work Mode,Joining Timeline,Submitted At,Status']
      const rows = requirements.map(r => 
        `"${r.id}","${r.companyName.replace(/"/g, '""')}","${r.contactPerson.replace(/"/g, '""')}","${(r.designation || '').replace(/"/g, '""')}","${r.officialEmail}","${r.phoneNumber}","${r.jobTitle.replace(/"/g, '""')}","${r.numberOfOpenings}","${r.requiredSkills.replace(/"/g, '""')}","${r.candidatePreference}","${(r.experienceRange || '').replace(/"/g, '""')}","${r.workLocation.replace(/"/g, '""')}","${r.workMode}","${r.joiningTimeline}","${r.submittedAt}","${r.status}"`
      )
      const csv = [headers, ...rows].join('\n')
      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="hiring-requirements.csv"',
        },
      })
    }

    return NextResponse.json({ success: true, count: requirements.length, requirements })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch hiring requirements.' }, { status: 500 })
  }
}
