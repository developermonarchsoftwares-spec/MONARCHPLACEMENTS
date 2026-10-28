"use client"

import React from 'react'
import Link from 'next/link'
import { Shield, Calendar, ArrowLeft, Mail, Phone, MapPin, Globe } from 'lucide-react'

export default function TermsOfServicePage() {
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
            <span>Legal Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Terms of Service
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
                Welcome to Monarch Placements, accessible at{' '}
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
                These Terms of Service govern your access to and use of our website, training programs, internship opportunities, career guidance, recruitment support, placement assistance, and related services.
              </p>
              <p>
                In these terms, “Monarch Placements,” “we,” “our,” and “us” refer to Monarch Placements and its operating organization. “You” and “your” refer to any visitor, candidate, student, applicant, or other individual using our website or services.
              </p>
              <p>
                By accessing our website or enrolling in our services, you agree to these Terms of Service. If you do not agree, please discontinue use of the website and services.
              </p>
            </div>
          </section>

          {/* 2. Our Services */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">02</span>
              <span>2. Our Services</span>
            </h2>
            <div className="space-y-4 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Monarch Placements provides career development and employment-related services, which may include:
              </p>
              <ul className="space-y-2 pl-4">
                {[
                  'Technical and industry-oriented training programs.',
                  'Internship opportunities and practical project-based learning.',
                  'Career counselling and professional guidance.',
                  'Resume preparation and LinkedIn profile assistance.',
                  'Aptitude, communication, and interview preparation.',
                  'Recruitment opportunities, job referrals, and placement assistance.',
                  'Employer and candidate coordination.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-2 text-white/60">
                The availability, duration, format, eligibility criteria, fees, and scope of each service will be communicated through the applicable program description, offer, or written agreement.
              </p>
            </div>
          </section>

          {/* 3. Eligibility and User Responsibilities */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">03</span>
              <span>3. Eligibility and User Responsibilities</span>
            </h2>
            <div className="space-y-4 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                You must provide accurate, complete, and current information when registering, applying for opportunities, or enrolling in a program.
              </p>
              <p>You agree to:</p>
              <ul className="space-y-2.5 pl-4">
                {[
                  'Submit genuine educational, employment, contact, and identification information when requested for a legitimate purpose.',
                  'Maintain the confidentiality of your account credentials, where applicable.',
                  'Attend scheduled training sessions and interviews responsibly.',
                  'Follow reasonable instructions, professional conduct standards, and program guidelines.',
                  'Avoid submitting fraudulent documents, impersonating another person, or misrepresenting qualifications.',
                  'Avoid using our website for unlawful activities, spam, harassment, or unauthorized access.',
                  'Respect the intellectual property and privacy rights of Monarch Placements, other candidates, trainers, and employers.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-2 text-white/60">
                We may suspend or discontinue access to a service where there is a reasonable basis to believe these requirements have been materially violated.
              </p>
            </div>
          </section>

          {/* 4. Registration and Enrollment */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">04</span>
              <span>4. Registration and Enrollment</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Submitting an enquiry, application, or registration form does not automatically guarantee admission, internship selection, interview selection, or employment.
              </p>
              <p>
                Enrollment may be subject to eligibility requirements, document verification, availability, payment of applicable fees, and acceptance of the relevant program terms.
              </p>
              <p>
                We reserve the right to correct administrative errors and update program schedules, curriculum, trainers, or delivery arrangements when reasonably necessary. Material changes to an enrolled candidate&apos;s agreed services will be communicated appropriately.
              </p>
            </div>
          </section>

          {/* 5. Training Fees and Payments */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">05</span>
              <span>5. Training Fees and Payments</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Applicable fees, payment schedules, taxes, and other charges will be communicated before enrollment or payment.
              </p>
              <p>
                Where a program includes separate training and placement-support charges, each component and its payment conditions must be clearly disclosed and agreed upon before the candidate commits to the program.
              </p>
              <p>
                You are responsible for ensuring that payments are made through authorized payment channels and that payment details are accurate.
              </p>
              <p>
                We will communicate applicable receipts, payment confirmations, and outstanding dues through our designated channels.
              </p>
            </div>
          </section>

          {/* 6. Cancellation, Refunds, and Withdrawal */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">06</span>
              <span>6. Cancellation, Refunds, and Withdrawal</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Cancellation and refund eligibility will depend on the program, the services already delivered, the payment arrangement, and the applicable law.
              </p>
              <p>
                Any program-specific cancellation or refund conditions communicated before enrollment will form part of the applicable agreement, provided they do not conflict with mandatory legal rights.
              </p>
              <p>
                Candidates should submit cancellation or refund requests to{' '}
                <a
                  href="mailto:hr@monarchplacements.in"
                  className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
                >
                  hr@monarchplacements.in
                </a>{' '}
                with their registered contact details, program name, payment reference, and reason for the request.
              </p>
              <p>
                We will review requests fairly and communicate the applicable decision and process. Nothing in these terms is intended to exclude a refund or remedy required by applicable law.
              </p>
            </div>
          </section>

          {/* 7. Placement and Employment Disclaimer */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">07</span>
              <span>7. Placement and Employment Disclaimer</span>
            </h2>
            <div className="space-y-4 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Monarch Placements provides placement assistance, career guidance, recruitment coordination, and access to employment opportunities.
              </p>
              <p className="text-white font-medium">
                Placement assistance does not, by itself, constitute a guarantee of employment.
              </p>
              <p>Unless an express, specific written agreement states otherwise, we do not guarantee:</p>
              <ul className="space-y-2 pl-4">
                {[
                  'A job offer, internship, or interview from any particular employer.',
                  'Employment within a specified period.',
                  'A particular salary, designation, location, or employment arrangement.',
                  'Selection by an employer or successful completion of its recruitment process.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-2 text-white/60">
                Employment outcomes depend on factors including candidate qualifications, performance, vacancies, employer requirements, and market conditions.
              </p>
              <p className="text-white/60">
                Any published placement statistics or outcome claims should be interpreted according to their stated scope, period, and methodology.
              </p>
            </div>
          </section>

          {/* 8. Recruitment Opportunities and Employers */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">08</span>
              <span>8. Recruitment Opportunities and Employers</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Job descriptions, vacancy announcements, salary ranges, eligibility criteria, and employer requirements may change or become unavailable.
              </p>
              <p>
                We make reasonable efforts to communicate relevant information accurately, but candidates should verify important employment conditions with the prospective employer before accepting an offer.
              </p>
              <p>
                We are not the employer for third-party vacancies unless explicitly stated otherwise. Final decisions regarding hiring, compensation, employment terms, and onboarding rest with the relevant employer.
              </p>
              <p>
                Candidates should independently evaluate employment offers and exercise caution when asked by third parties to make payments or disclose sensitive information.
              </p>
            </div>
          </section>

          {/* 9. Internships and Practical Projects */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">09</span>
              <span>9. Internships and Practical Projects</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Internship opportunities, training projects, and practical assignments may be offered subject to availability and the terms communicated for the relevant opportunity.
              </p>
              <p>
                An internship or training program does not automatically create an employment relationship or guarantee a subsequent job offer.
              </p>
              <p>
                Any stipend, duration, working arrangement, intellectual property ownership, confidentiality obligations, or conversion opportunity will be governed by the applicable written terms.
              </p>
            </div>
          </section>

          {/* 10. Intellectual Property */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">10</span>
              <span>10. Intellectual Property</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Unless otherwise stated, the website&apos;s original content, branding, logos, graphics, text, training materials, and other proprietary materials belong to Monarch Placements or their respective rights holders.
              </p>
              <p>
                You may use materials provided to you for personal educational and career-development purposes, subject to the applicable terms.
              </p>
              <p>
                You must not reproduce, distribute, sell, commercially exploit, or publicly republish proprietary training materials or website content without prior authorization, except where permitted by law.
              </p>
              <p>
                You retain ownership of your original personal information and pre-existing materials, subject to any separate lawful agreement.
              </p>
            </div>
          </section>

          {/* 11. Website Availability and Accuracy */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">11</span>
              <span>11. Website Availability and Accuracy</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                We aim to maintain an accessible and useful website but do not warrant uninterrupted, error-free, or permanently available access.
              </p>
              <p>
                Website content, program descriptions, vacancy listings, and other information may be updated, corrected, or removed as circumstances change.
              </p>
              <p>
                We may temporarily suspend access for maintenance, security, technical issues, or operational reasons.
              </p>
            </div>
          </section>

          {/* 12. Third-Party Services and Links */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">12</span>
              <span>12. Third-Party Services and Links</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Our website may link to third-party websites, employer portals, application forms, communication platforms, or payment providers.
              </p>
              <p>
                Those services are governed by their own terms and privacy policies. We are not responsible for the content, availability, security, or independent practices of third-party services, except to the extent applicable law provides otherwise.
              </p>
            </div>
          </section>

          {/* 13. Limitation of Liability */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">13</span>
              <span>13. Limitation of Liability</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                To the extent permitted by applicable law, Monarch Placements will not be liable for indirect or consequential losses arising from the use of the website, temporary service interruptions, third-party recruitment decisions, or employment outcomes outside our reasonable control.
              </p>
              <p>
                Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, including applicable statutory consumer rights or liability arising from fraud or other non-excludable conduct.
              </p>
            </div>
          </section>

          {/* 14. Privacy */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">14</span>
              <span>14. Privacy</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Our collection, use, storage, and sharing of personal information are governed by our Privacy Policy, available at{' '}
                <a
                  href="#privacy-policy"
                  data-policy-trigger="privacy"
                  className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </a>.
              </p>
              <p>
                By using our services, you acknowledge that you have been provided an opportunity to review the Privacy Policy. Where consent is legally required, we will seek it through an appropriate process.
              </p>
            </div>
          </section>

          {/* 15. Suspension and Termination */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">15</span>
              <span>15. Suspension and Termination</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                You may stop using our website or request withdrawal from a program by contacting us.
              </p>
              <p>
                We may restrict access to our services for material violations of these terms, fraudulent conduct, security risks, or other lawful operational reasons.
              </p>
              <p>
                Termination does not remove payment obligations already lawfully incurred or override rights and remedies available under applicable law.
              </p>
            </div>
          </section>

          {/* 16. Changes to These Terms */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">16</span>
              <span>16. Changes to These Terms</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                We may revise these Terms of Service to reflect changes in our services, business practices, or legal requirements.
              </p>
              <p>
                The revised version will be published on this page with an updated revision date. Material changes affecting existing enrollments will be communicated where appropriate.
              </p>
              <p>
                Your continued use of the website after revised terms become effective constitutes acceptance to the extent permitted by applicable law. Where affirmative acceptance is legally required, we will obtain it.
              </p>
            </div>
          </section>

          {/* 17. Governing Law and Disputes */}
          <section className="border border-white/5 rounded-xl p-6 sm:p-8 bg-white/[0.015]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">17</span>
              <span>17. Governing Law and Disputes</span>
            </h2>
            <div className="space-y-3 text-white/75 text-sm sm:text-[15px] leading-relaxed">
              <p>
                These terms are governed by the laws of India.
              </p>
              <p>
                Disputes will be addressed in accordance with applicable Indian law. Any court jurisdiction clause will operate subject to mandatory statutory jurisdiction and consumer-protection rights.
              </p>
            </div>
          </section>

          {/* 18. Contact Information */}
          <section className="border border-white/10 rounded-2xl p-6 sm:p-8 bg-white/[0.03]">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/20 bg-white/5 text-white/60">18</span>
              <span>18. Contact Information</span>
            </h2>
            <p className="text-white/75 text-sm sm:text-[15px] mb-6">
              For questions regarding these Terms of Service, payments, cancellations, training, or placement assistance, contact:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-white font-medium text-sm mb-1">
                  <MapPin className="w-4 h-4 text-white/60" />
                  <span>Monarch Placements</span>
                </div>
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
          </section>
        </div>
      </div>
    </div>
  )
}
