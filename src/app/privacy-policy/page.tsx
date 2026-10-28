"use client"

import React from 'react'
import Link from 'next/link'
import { Shield, Calendar, ArrowLeft, Mail, Phone, MapPin, Globe } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="relative z-10 w-full min-h-screen overflow-hidden pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background ambient subtle glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="border border-white/10 rounded-2xl p-6 sm:p-10 bg-white/[0.02] backdrop-blur-sm mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/15 bg-white/5 rounded-full text-[10px] tracking-widest uppercase text-white/80 font-mono mb-5">
            <Shield className="w-3.5 h-3.5 text-white/70" />
            <span>Legal Document</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/50 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-white/40" />
              <span>Effective Date: 26 October 2026</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <div>
              <span>Last Updated: 26 October 2026</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-white/80 leading-relaxed text-sm sm:text-base font-light">
          {/* 1. Introduction */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">01</span>
              <span>1. Introduction</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Monarch Placements (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates{' '}
                <a
                  href="https://www.monarchplacements.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                >
                  https://www.monarchplacements.in/
                </a>.
              </p>
              <p>
                We provide training, career guidance, internship opportunities, recruitment support, and placement assistance. These activities may require us to collect and process personal information from website visitors, students, job applicants, candidates, and employers.
              </p>
              <p>
                This Privacy Policy explains what information we collect, why we collect it, how we use and share it, how we protect it, and how you can contact us regarding your privacy.
              </p>
              <p>
                We aim to handle personal information responsibly and in accordance with applicable Indian data-protection and other relevant laws, including the Digital Personal Data Protection Act, 2023, and applicable rules as they come into force.
              </p>
            </div>
          </section>

          {/* 2. Information We Collect */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">02</span>
              <span>2. Information We Collect</span>
            </h2>
            <div className="space-y-6 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Depending on how you interact with us, we may collect the following categories of information.
              </p>

              {/* A */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l border-white/10">
                <h3 className="text-base font-medium text-white">A. Personal and Contact Information</h3>
                <ul className="space-y-2 pl-2">
                  {[
                    'Full name.',
                    'Email address.',
                    'Phone number.',
                    'City, state, and other location details you choose to provide.',
                    'Preferred course, service, or area of interest.',
                    'Information included in enquiries or messages.',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* B */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l border-white/10">
                <h3 className="text-base font-medium text-white">B. Education and Employment Information</h3>
                <p>When you apply for training, internships, or employment opportunities, we may collect:</p>
                <ul className="space-y-2 pl-2">
                  {[
                    'Educational qualifications and academic details.',
                    'Resume or CV.',
                    'Technical and professional skills.',
                    'Work experience and career preferences.',
                    'Portfolio, LinkedIn profile, or GitHub profile links.',
                    'Interview availability and recruitment-related information.',
                    'Application status, interview feedback, and training progress where relevant.',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* C */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l border-white/10">
                <h3 className="text-base font-medium text-white">C. Payment and Transaction Information</h3>
                <p>
                  Where a paid service is offered, we may maintain payment status, transaction references, invoices, receipts, and related administrative records.
                </p>
                <p>
                  Payment information may be processed by third-party payment providers. We do not intend to collect or store complete payment-card credentials or banking authentication credentials unless a specific, lawful, and appropriately secured arrangement requires it.
                </p>
              </div>

              {/* D */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l border-white/10">
                <h3 className="text-base font-medium text-white">D. Technical and Usage Information</h3>
                <p>
                  When you visit our website, certain technical information may be collected automatically, depending on the website configuration and tools in use. This may include:
                </p>
                <ul className="space-y-2 pl-2">
                  {[
                    'IP address and general device information.',
                    'Browser type and operating system.',
                    'Pages visited and interactions with the website.',
                    'Referral sources and approximate usage timestamps.',
                    'Cookies and similar technologies, where implemented.',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-white/60 pt-1">
                  We do not claim to use every type of tracking technology listed above. The actual collection depends on the tools enabled on our website.
                </p>
              </div>

              {/* E */}
              <div className="space-y-3 pl-2 sm:pl-4 border-l border-white/10">
                <h3 className="text-base font-medium text-white">E. Communications</h3>
                <p>
                  We may retain communications you send to us by email, phone, contact forms, or other business channels to respond to requests, provide services, and maintain necessary business records.
                </p>
                <p className="text-white/60">
                  Please do not submit passwords, banking PINs, one-time passwords, or unnecessary sensitive personal information through general enquiry forms.
                </p>
              </div>
            </div>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">03</span>
              <span>3. How We Use Your Information</span>
            </h2>
            <div className="space-y-4 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>We may use personal information for the following purposes:</p>
              <ul className="space-y-2 pl-2">
                {[
                  'Responding to enquiries and providing requested information.',
                  'Registering candidates for training programs and internships.',
                  'Managing enrollment, attendance, learning progress, and program administration.',
                  'Providing career counselling, resume support, and interview preparation.',
                  'Evaluating candidates against relevant job requirements.',
                  'Communicating suitable vacancies, interviews, and placement opportunities.',
                  'Sharing candidate profiles with relevant prospective employers when appropriately authorized and lawful.',
                  'Processing payments, maintaining financial records, and handling refund requests.',
                  'Sending important service updates and administrative notifications.',
                  'Sending promotional communications where permitted by law and subject to applicable preferences.',
                  'Maintaining website security, preventing fraud, and resolving technical issues.',
                  'Meeting applicable legal, regulatory, contractual, and recordkeeping obligations.',
                  'Establishing, exercising, or defending legal claims where necessary.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-2 text-white/60">
                We will seek consent where required by applicable law and will not treat consent for one purpose as unlimited permission to use personal information for unrelated purposes.
              </p>
            </div>
          </section>

          {/* 4. How We Share Your Information */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">04</span>
              <span>4. How We Share Your Information</span>
            </h2>
            <div className="space-y-5 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                We do not intend to sell personal information to third parties for their independent marketing purposes.
              </p>
              <p>We may share relevant information in the following circumstances:</p>

              <div className="space-y-2 pl-2 sm:pl-4 border-l border-white/10">
                <h3 className="text-base font-medium text-white">A. Prospective Employers and Recruitment Partners</h3>
                <p>
                  Where appropriate and lawful, we may share a candidate&apos;s resume, contact details, qualifications, skills, work experience, or other relevant application information with prospective employers or recruitment partners to facilitate a specific recruitment opportunity.
                </p>
                <p className="text-white/60">
                  We aim to share only information reasonably necessary for the relevant purpose. Where consent or another legal basis is required, we will obtain or establish it before sharing.
                </p>
              </div>

              <div className="space-y-2 pl-2 sm:pl-4 border-l border-white/10">
                <h3 className="text-base font-medium text-white">B. Service Providers</h3>
                <p>
                  We may use third-party providers for website hosting, email communications, form processing, analytics, payment processing, data storage, and other business operations.
                </p>
                <p className="text-white/60">
                  Such providers may process personal information on our behalf, subject to applicable arrangements and legal requirements.
                </p>
              </div>

              <div className="space-y-2 pl-2 sm:pl-4 border-l border-white/10">
                <h3 className="text-base font-medium text-white">C. Legal and Regulatory Requirements</h3>
                <p>
                  We may disclose information when required by applicable law, a valid legal process, or a competent authority, or when necessary to protect legal rights and address security or fraud concerns.
                </p>
              </div>

              <div className="space-y-2 pl-2 sm:pl-4 border-l border-white/10">
                <h3 className="text-base font-medium text-white">D. Business Reorganization</h3>
                <p>
                  If our business undergoes a merger, restructuring, or transfer, relevant information may be transferred where lawful and subject to appropriate safeguards.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Recruitment and Candidate Data */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">05</span>
              <span>5. Recruitment and Candidate Data</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Candidate information is used to support training, career development, and recruitment activities.
              </p>
              <p>
                Candidates should review the requirements of each vacancy and provide information relevant to the application.
              </p>
              <p>
                Submitting a resume does not guarantee that it will be forwarded to an employer or result in an interview or job offer.
              </p>
              <p>
                If you do not wish your profile to be considered for future opportunities, you may contact us to request an update or withdrawal, subject to applicable legal obligations and any active service arrangements.
              </p>
              <p className="pt-1 text-white/60">
                We cannot control how an employer independently handles information after lawfully receiving it. Where appropriate, candidates should consult the employer&apos;s own privacy policy.
              </p>
            </div>
          </section>

          {/* 6. Cookies and Similar Technologies */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">06</span>
              <span>6. Cookies and Similar Technologies</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Our website may use essential cookies or similar technologies required for functionality, security, and user experience. Analytics or advertising technologies may also be used if enabled.
              </p>
              <p>
                Where required, we will provide appropriate information and obtain consent before using non-essential technologies.
              </p>
              <p>
                You can manage cookies through your browser settings. Disabling certain cookies may affect some website features.
              </p>
              <p className="text-white/60">
                The specific cookies and tracking tools in use should be reviewed against the website&apos;s actual technical configuration.
              </p>
            </div>
          </section>

          {/* 7. Data Retention */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">07</span>
              <span>7. Data Retention</span>
            </h2>
            <div className="space-y-4 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including providing services, managing recruitment activities, maintaining records, resolving disputes, and meeting legal obligations.
              </p>
              <p>Retention periods may differ for:</p>
              <ul className="space-y-2 pl-2">
                {[
                  'General enquiries.',
                  'Candidate profiles and resumes.',
                  'Training and internship records.',
                  'Payment and accounting records.',
                  'Legal, security, and compliance records.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                When information is no longer required, we will take appropriate steps to delete it, anonymize it, or otherwise dispose of it securely, subject to applicable law and legitimate retention requirements.
              </p>
              <p className="text-white/60">
                You may request deletion of your information, but we may need to retain certain records where legally required or where another lawful basis applies.
              </p>
            </div>
          </section>

          {/* 8. Data Security */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">08</span>
              <span>8. Data Security</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                We take reasonable steps appropriate to our operations to protect personal information against unauthorized access, disclosure, alteration, loss, and misuse.
              </p>
              <p>
                Measures may include access restrictions, secure communications, authentication controls, and appropriate security practices for the systems we use.
              </p>
              <p className="text-white/60">
                However, no website, transmission method, or storage system can be guaranteed to be completely secure. If a personal-data breach occurs, we will take appropriate action and provide notifications where required by applicable law.
              </p>
            </div>
          </section>

          {/* 9. International Data Processing */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">09</span>
              <span>9. International Data Processing</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Some third-party service providers may store or process information outside India.
              </p>
              <p>
                Where international processing occurs, we will take the steps required by applicable Indian law and any relevant restrictions or safeguards.
              </p>
            </div>
          </section>

          {/* 10. Your Privacy Rights */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">10</span>
              <span>10. Your Privacy Rights</span>
            </h2>
            <div className="space-y-4 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>Subject to applicable law and the relevant provisions in force, you may have the right to:</p>
              <ul className="space-y-2 pl-2">
                {[
                  'Request information about the personal data we process about you.',
                  'Request correction of inaccurate or incomplete information.',
                  'Request erasure of personal information where applicable.',
                  'Withdraw consent for processing that relies on your consent.',
                  'Request an update to your recruitment or communication preferences.',
                  'Raise a grievance concerning the handling of your personal information.',
                  'Exercise any other rights available under applicable law.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-1">
                Withdrawal of consent does not invalidate processing lawfully undertaken before withdrawal. It may also affect our ability to provide certain services.
              </p>
              <p className="text-white/60">
                To exercise a right, contact us using the details below. We may need to verify your identity before responding.
              </p>
            </div>
          </section>

          {/* 11. Children's Privacy */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">11</span>
              <span>11. Children&apos;s Privacy</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Our services may be relevant to students and early-career candidates. Individuals under the age of 18 should use services requiring parental consent or other safeguards in accordance with applicable law.
              </p>
              <p>
                We will apply the age-related consent and processing requirements that are applicable to our services and in force at the relevant time.
              </p>
              <p className="text-white/60">
                Please contact us if you believe a child has provided personal information in circumstances that require our review.
              </p>
            </div>
          </section>

          {/* 12. Third-Party Websites */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">12</span>
              <span>12. Third-Party Websites</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Our website may contain links to external websites, employer platforms, social networks, or payment services.
              </p>
              <p className="text-white/60">
                We do not control the independent privacy practices of those services. Before submitting information to an external platform, review its privacy policy and terms.
              </p>
            </div>
          </section>

          {/* 13. Promotional Communications */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">13</span>
              <span>13. Promotional Communications</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                We may send service-related messages concerning registration, training schedules, applications, payments, and recruitment opportunities.
              </p>
              <p>
                Promotional communications will be sent in accordance with applicable law and your preferences. You may request that we stop sending promotional messages by contacting us or using an available unsubscribe mechanism.
              </p>
              <p className="text-white/60">
                Opting out of promotional communications will not necessarily stop essential service-related or legally required communications.
              </p>
            </div>
          </section>

          {/* 14. Changes to This Privacy Policy */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">14</span>
              <span>14. Changes to This Privacy Policy</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                We may update this Privacy Policy to reflect changes in our services, information practices, technologies, or legal obligations.
              </p>
              <p>
                The latest version will be published on this page with an updated revision date. Where required, we will provide additional notice or obtain consent for material changes.
              </p>
            </div>
          </section>

          {/* 15. Contact and Privacy Grievances */}
          <section className="border border-white/10 rounded-2xl p-6 sm:p-8 bg-white/[0.03]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">15</span>
              <span>15. Contact and Privacy Grievances</span>
            </h2>
            <p className="text-white/75 text-sm sm:text-[15px] mb-6">
              For questions, privacy requests, corrections, deletion requests, or complaints concerning personal information, contact:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-white font-medium text-sm mb-1">
                  <MapPin className="w-4 h-4 text-white/60" />
                  <span>Privacy Contact</span>
                </div>
                <p className="text-xs text-white/90 pl-6 font-medium">Monarch Placements</p>
                <p className="text-xs text-white/60 pl-6">
                  Kovilpalayam, Coimbatore, Tamil Nadu, India
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-white font-medium text-sm mb-1">
                  <Mail className="w-4 h-4 text-white/60" />
                  <span>Email</span>
                </div>
                <a
                  href="mailto:contact@monarchsoftwares.com"
                  className="text-xs text-white/80 hover:text-white pl-6 block underline underline-offset-2 decoration-white/20 hover:decoration-white transition-colors break-all"
                >
                  contact@monarchsoftwares.com
                </a>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-white font-medium text-sm mb-1">
                  <Phone className="w-4 h-4 text-white/60" />
                  <span>Phone</span>
                </div>
                <a
                  href="tel:+916385753874"
                  className="text-xs text-white/80 hover:text-white pl-6 block transition-colors"
                >
                  +91 63857 53874
                </a>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-white font-medium text-sm mb-1">
                  <Globe className="w-4 h-4 text-white/60" />
                  <span>Website</span>
                </div>
                <a
                  href="https://www.monarchplacements.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/80 hover:text-white pl-6 block underline underline-offset-2 decoration-white/20 hover:decoration-white transition-colors break-all"
                >
                  https://www.monarchplacements.in/
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs text-white/60">
              <p>
                Please include sufficient information to help us identify your enquiry. Avoid including passwords, OTPs, or unnecessary sensitive information.
              </p>
              <p>
                We will review and respond to privacy requests and grievances within the time limits required by applicable law.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
