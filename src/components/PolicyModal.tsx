"use client"

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, Mail, Phone, Globe } from 'lucide-react'

export type PolicyModalType = 'privacy' | 'terms' | null

interface PolicyModalProps {
  type: PolicyModalType
  isOpen: boolean
  onClose: () => void
}

export default function PolicyModal({ type, isOpen, onClose }: PolicyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Prevent background scrolling when modal is open and handle Escape key
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !type) return null

  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-modal-title"
      >
        {/* Dimmed & blurred backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 flex flex-col w-full max-w-3xl max-h-[85vh] rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Fixed Header */}
          <div className="flex items-center justify-between px-5 py-3.5 sm:px-8 sm:py-5 border-b border-white/10 bg-[#0c0c0e] shrink-0">
            <div className="min-w-0 pr-4">
              <h2
                id="policy-modal-title"
                className="text-lg sm:text-xl font-bold tracking-tight text-white truncate"
              >
                {title}
              </h2>
              <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 mt-0.5">
                <Calendar className="w-3 h-3 text-white/30 shrink-0" />
                <span>Effective: 26 October 2026</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              suppressHydrationWarning
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Vertically Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6 text-white/80 text-sm sm:text-[15px] leading-relaxed font-light space-y-6 sm:space-y-8 select-text">
            {type === 'terms' ? (
              <TermsOfServiceContent />
            ) : (
              <PrivacyPolicyContent />
            )}
          </div>

          {/* Fixed Footer */}
          <div className="flex items-center justify-end px-5 py-3 sm:px-8 sm:py-4 border-t border-white/10 bg-[#0c0c0e] shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white border border-white transition-all duration-300 shadow-sm"
              suppressHydrationWarning
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function TermsOfServiceContent() {
  return (
    <div className="space-y-6">
      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">1. Introduction</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>
            Welcome to Monarch Placements, accessible at{' '}
            <a
              href="https://www.monarchplacements.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:decoration-white transition-colors"
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
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">2. Our Services</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>Monarch Placements provides career development and employment-related services, which may include:</p>
          <ul className="space-y-1.5 pl-4 list-disc text-white/70">
            <li>Technical and industry-oriented training programs.</li>
            <li>Internship opportunities and practical project-based learning.</li>
            <li>Career counselling and professional guidance.</li>
            <li>Resume preparation and LinkedIn profile assistance.</li>
            <li>Aptitude, communication, and interview preparation.</li>
            <li>Recruitment opportunities, job referrals, and placement assistance.</li>
            <li>Employer and candidate coordination.</li>
          </ul>
          <p className="pt-1 text-white/60">
            The availability, duration, format, eligibility criteria, fees, and scope of each service will be communicated through the applicable program description, offer, or written agreement.
          </p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">3. Eligibility and User Responsibilities</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>You must provide accurate, complete, and current information when registering, applying for opportunities, or enrolling in a program.</p>
          <p>You agree to:</p>
          <ul className="space-y-1.5 pl-4 list-disc text-white/70">
            <li>Submit genuine educational, employment, contact, and identification information when requested for a legitimate purpose.</li>
            <li>Maintain the confidentiality of your account credentials, where applicable.</li>
            <li>Attend scheduled training sessions and interviews responsibly.</li>
            <li>Follow reasonable instructions, professional conduct standards, and program guidelines.</li>
            <li>Avoid submitting fraudulent documents, impersonating another person, or misrepresenting qualifications.</li>
            <li>Avoid using our website for unlawful activities, spam, harassment, or unauthorized access.</li>
            <li>Respect the intellectual property and privacy rights of Monarch Placements, other candidates, trainers, and employers.</li>
          </ul>
          <p className="pt-1 text-white/60">
            We may suspend or discontinue access to a service where there is a reasonable basis to believe these requirements have been materially violated.
          </p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">4. Registration and Enrollment</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>Submitting an enquiry, application, or registration form does not automatically guarantee admission, internship selection, interview selection, or employment.</p>
          <p>Enrollment may be subject to eligibility requirements, document verification, availability, payment of applicable fees, and acceptance of the relevant program terms.</p>
          <p>We reserve the right to correct administrative errors and update program schedules, curriculum, trainers, or delivery arrangements when reasonably necessary. Material changes to an enrolled candidate&apos;s agreed services will be communicated appropriately.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">5. Training Fees and Payments</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>Applicable fees, payment schedules, taxes, and other charges will be communicated before enrollment or payment.</p>
          <p>Where a program includes separate training and placement-support charges, each component and its payment conditions must be clearly disclosed and agreed upon before the candidate commits to the program.</p>
          <p>You are responsible for ensuring that payments are made through authorized payment channels and that payment details are accurate.</p>
          <p>We will communicate applicable receipts, payment confirmations, and outstanding dues through our designated channels.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">6. Cancellation, Refunds, and Withdrawal</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>Cancellation and refund eligibility will depend on the program, the services already delivered, the payment arrangement, and the applicable law.</p>
          <p>Any program-specific cancellation or refund conditions communicated before enrollment will form part of the applicable agreement, provided they do not conflict with mandatory legal rights.</p>
          <p>
            Candidates should submit cancellation or refund requests to{' '}
            <a href="mailto:hr@monarchplacements.in" className="text-white underline underline-offset-2">
              hr@monarchplacements.in
            </a>{' '}
            with their registered contact details, program name, payment reference, and reason for the request.
          </p>
          <p>We will review requests fairly and communicate the applicable decision and process. Nothing in these terms is intended to exclude a refund or remedy required by applicable law.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">7. Placement and Employment Disclaimer</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>Monarch Placements provides placement assistance, career guidance, recruitment coordination, and access to employment opportunities.</p>
          <p className="font-medium text-white">Placement assistance does not, by itself, constitute a guarantee of employment.</p>
          <p>Unless an express, specific written agreement states otherwise, we do not guarantee:</p>
          <ul className="space-y-1.5 pl-4 list-disc text-white/70">
            <li>A job offer, internship, or interview from any particular employer.</li>
            <li>Employment within a specified period.</li>
            <li>A particular salary, designation, location, or employment arrangement.</li>
            <li>Selection by an employer or successful completion of its recruitment process.</li>
          </ul>
          <p className="pt-1 text-white/60">Employment outcomes depend on factors including candidate qualifications, performance, vacancies, employer requirements, and market conditions.</p>
          <p className="text-white/60">Any published placement statistics or outcome claims should be interpreted according to their stated scope, period, and methodology.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">8. Recruitment Opportunities and Employers</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>Job descriptions, vacancy announcements, salary ranges, eligibility criteria, and employer requirements may change or become unavailable.</p>
          <p>We make reasonable efforts to communicate relevant information accurately, but candidates should verify important employment conditions with the prospective employer before accepting an offer.</p>
          <p>We are not the employer for third-party vacancies unless explicitly stated otherwise. Final decisions regarding hiring, compensation, employment terms, and onboarding rest with the relevant employer.</p>
          <p>Candidates should independently evaluate employment offers and exercise caution when asked by third parties to make payments or disclose sensitive information.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">9. Internships and Practical Projects</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>Internship opportunities, training projects, and practical assignments may be offered subject to availability and the terms communicated for the relevant opportunity.</p>
          <p>An internship or training program does not automatically create an employment relationship or guarantee a subsequent job offer.</p>
          <p>Any stipend, duration, working arrangement, intellectual property ownership, confidentiality obligations, or conversion opportunity will be governed by the applicable written terms.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">10. Intellectual Property</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>Unless otherwise stated, the website&apos;s original content, branding, logos, graphics, text, training materials, and other proprietary materials belong to Monarch Placements or their respective rights holders.</p>
          <p>You may use materials provided to you for personal educational and career-development purposes, subject to the applicable terms.</p>
          <p>You must not reproduce, distribute, sell, commercially exploit, or publicly republish proprietary training materials or website content without prior authorization, except where permitted by law.</p>
          <p>You retain ownership of your original personal information and pre-existing materials, subject to any separate lawful agreement.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">11. Website Availability and Accuracy</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>We aim to maintain an accessible and useful website but do not warrant uninterrupted, error-free, or permanently available access.</p>
          <p>Website content, program descriptions, vacancy listings, and other information may be updated, corrected, or removed as circumstances change.</p>
          <p>We may temporarily suspend access for maintenance, security, technical issues, or operational reasons.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">12. Third-Party Services and Links</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>Our website may link to third-party websites, employer portals, application forms, communication platforms, or payment providers.</p>
          <p>Those services are governed by their own terms and privacy policies. We are not responsible for the content, availability, security, or independent practices of third-party services, except to the extent applicable law provides otherwise.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">13. Limitation of Liability</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>To the extent permitted by applicable law, Monarch Placements will not be liable for indirect or consequential losses arising from the use of the website, temporary service interruptions, third-party recruitment decisions, or employment outcomes outside our reasonable control.</p>
          <p>Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited, including applicable statutory consumer rights or liability arising from fraud or other non-excludable conduct.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">14. Privacy</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>
            Our collection, use, storage, and sharing of personal information are governed by our Privacy Policy, accessible directly via the policy modal.
          </p>
          <p>By using our services, you acknowledge that you have been provided an opportunity to review the Privacy Policy. Where consent is legally required, we will seek it through an appropriate process.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">15. Suspension and Termination</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>You may stop using our website or request withdrawal from a program by contacting us.</p>
          <p>We may restrict access to our services for material violations of these terms, fraudulent conduct, security risks, or other lawful operational reasons.</p>
          <p>Termination does not remove payment obligations already lawfully incurred or override rights and remedies available under applicable law.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">16. Changes to These Terms</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>We may revise these Terms of Service to reflect changes in our services, business practices, or legal requirements.</p>
          <p>The revised version will be published with an updated revision date. Material changes affecting existing enrollments will be communicated where appropriate.</p>
          <p>Your continued use of the website after revised terms become effective constitutes acceptance to the extent permitted by applicable law.</p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">17. Governing Law and Disputes</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>These terms are governed by the laws of India.</p>
          <p>Disputes will be addressed in accordance with applicable Indian law. Any court jurisdiction clause will operate subject to mandatory statutory jurisdiction and consumer-protection rights.</p>
        </div>
      </div>

      <div className="border border-white/10 rounded-xl p-5 bg-white/[0.03]">
        <h3 className="text-base font-semibold text-white mb-2">18. Contact Information</h3>
        <p className="text-xs sm:text-sm text-white/75 mb-3">
          For questions regarding these Terms of Service, payments, cancellations, training, or placement assistance, contact:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="w-3.5 h-3.5 text-white/50 shrink-0" />
            <span>Kovilpalayam, Coimbatore, Tamil Nadu, India</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Mail className="w-3.5 h-3.5 text-white/50 shrink-0" />
            <a href="mailto:contact@monarchsoftwares.com" className="hover:underline">contact@monarchsoftwares.com</a>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Phone className="w-3.5 h-3.5 text-white/50 shrink-0" />
            <a href="tel:+916385753874" className="hover:underline">+91 63857 53874</a>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Globe className="w-3.5 h-3.5 text-white/50 shrink-0" />
            <a href="https://www.monarchplacements.in/" target="_blank" rel="noopener noreferrer" className="hover:underline">www.monarchplacements.in</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function PrivacyPolicyContent() {
  return (
    <div className="space-y-6">
      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">1. Introduction</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>
            Monarch Placements (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates{' '}
            <a
              href="https://www.monarchplacements.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:decoration-white transition-colors"
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
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">2. Information We Collect</h3>
        <div className="space-y-3 text-white/75 text-xs sm:text-sm">
          <p>Depending on how you interact with us, we may collect the following categories of information.</p>
          
          <div className="space-y-1.5 pt-1">
            <h4 className="text-white/90 font-medium">A. Personal and Contact Information</h4>
            <ul className="space-y-1 pl-4 list-disc text-white/70">
              <li>Full name.</li>
              <li>Email address.</li>
              <li>Phone number.</li>
              <li>City, state, and other location details you choose to provide.</li>
              <li>Preferred course, service, or area of interest.</li>
              <li>Information included in enquiries or messages.</li>
            </ul>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="text-white/90 font-medium">B. Education and Employment Information</h4>
            <p className="text-white/70">When you apply for training, internships, or employment opportunities, we may collect:</p>
            <ul className="space-y-1 pl-4 list-disc text-white/70">
              <li>Educational qualifications and academic details.</li>
              <li>Resume or CV.</li>
              <li>Technical and professional skills.</li>
              <li>Work experience and career preferences.</li>
              <li>Portfolio, LinkedIn profile, or GitHub profile links.</li>
              <li>Interview availability and recruitment-related information.</li>
              <li>Application status, interview feedback, and training progress where relevant.</li>
            </ul>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="text-white/90 font-medium">C. Payment and Transaction Information</h4>
            <p>
              Where a paid service is offered, we may maintain payment status, transaction references, invoices, receipts, and related administrative records.
            </p>
            <p>
              Payment information may be processed by third-party payment providers. We do not intend to collect or store complete payment-card credentials or banking authentication credentials unless a specific, lawful, and appropriately secured arrangement requires it.
            </p>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="text-white/90 font-medium">D. Technical and Usage Information</h4>
            <p>
              When you visit our website, certain technical information may be collected automatically, depending on the website configuration and tools in use. This may include:
            </p>
            <ul className="space-y-1 pl-4 list-disc text-white/70">
              <li>IP address and general device information.</li>
              <li>Browser type and operating system.</li>
              <li>Pages visited and interactions with the website.</li>
              <li>Referral sources and approximate usage timestamps.</li>
              <li>Cookies and similar technologies, where implemented.</li>
            </ul>
            <p className="pt-1 text-white/60">
              We do not claim to use every type of tracking technology listed above. The actual collection depends on the tools enabled on our website.
            </p>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="text-white/90 font-medium">E. Communications</h4>
            <p>
              We may retain communications you send to us by email, phone, contact forms, or other business channels to respond to requests, provide services, and maintain necessary business records.
            </p>
            <p className="text-white/60">
              Please do not submit passwords, banking PINs, one-time passwords, or unnecessary sensitive personal information through general enquiry forms.
            </p>
          </div>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">3. How We Use Your Information</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>We may use personal information for the following purposes:</p>
          <ul className="space-y-1.5 pl-4 list-disc text-white/70">
            <li>Responding to enquiries and providing requested information.</li>
            <li>Registering candidates for training programs and internships.</li>
            <li>Managing enrollment, attendance, learning progress, and program administration.</li>
            <li>Providing career counselling, resume support, and interview preparation.</li>
            <li>Evaluating candidates against relevant job requirements.</li>
            <li>Communicating suitable vacancies, interviews, and placement opportunities.</li>
            <li>Sharing candidate profiles with relevant prospective employers when appropriately authorized and lawful.</li>
            <li>Processing payments, maintaining financial records, and handling refund requests.</li>
            <li>Sending important service updates and administrative notifications.</li>
            <li>Sending promotional communications where permitted by law and subject to applicable preferences.</li>
            <li>Maintaining website security, preventing fraud, and resolving technical issues.</li>
            <li>Meeting applicable legal, regulatory, contractual, and recordkeeping obligations.</li>
            <li>Establishing, exercising, or defending legal claims where necessary.</li>
          </ul>
          <p className="pt-1 text-white/60">
            We will seek consent where required by applicable law and will not treat consent for one purpose as unlimited permission to use personal information for unrelated purposes.
          </p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">4. How We Share Your Information</h3>
        <div className="space-y-3 text-white/75 text-xs sm:text-sm">
          <p>
            We do not intend to sell personal information to third parties for their independent marketing purposes.
          </p>
          <p>We may share relevant information in the following circumstances:</p>

          <div className="space-y-1 pl-1">
            <h4 className="text-white/90 font-medium">A. Prospective Employers and Recruitment Partners</h4>
            <p>
              Where appropriate and lawful, we may share a candidate&apos;s resume, contact details, qualifications, skills, work experience, or other relevant application information with prospective employers or recruitment partners to facilitate a specific recruitment opportunity.
            </p>
            <p className="text-white/60">
              We aim to share only information reasonably necessary for the relevant purpose. Where consent or another legal basis is required, we will obtain or establish it before sharing.
            </p>
          </div>

          <div className="space-y-1 pl-1">
            <h4 className="text-white/90 font-medium">B. Service Providers</h4>
            <p>
              We may use third-party providers for website hosting, email communications, form processing, analytics, payment processing, data storage, and other business operations.
            </p>
            <p className="text-white/60">
              Such providers may process personal information on our behalf, subject to applicable arrangements and legal requirements.
            </p>
          </div>

          <div className="space-y-1 pl-1">
            <h4 className="text-white/90 font-medium">C. Legal and Regulatory Requirements</h4>
            <p>
              We may disclose information when required by applicable law, a valid legal process, or a competent authority, or when necessary to protect legal rights and address security or fraud concerns.
            </p>
          </div>

          <div className="space-y-1 pl-1">
            <h4 className="text-white/90 font-medium">D. Business Reorganization</h4>
            <p>
              If our business undergoes a merger, restructuring, or transfer, relevant information may be transferred where lawful and subject to appropriate safeguards.
            </p>
          </div>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">5. Recruitment and Candidate Data</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
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
          <p className="text-white/60">
            We cannot control how an employer independently handles information after lawfully receiving it. Where appropriate, candidates should consult the employer&apos;s own privacy policy.
          </p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">6. Cookies and Similar Technologies</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
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
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">7. Data Retention</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>
            We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including providing services, managing recruitment activities, maintaining records, resolving disputes, and meeting legal obligations.
          </p>
          <p>Retention periods may differ for:</p>
          <ul className="space-y-1 pl-4 list-disc text-white/70">
            <li>General enquiries.</li>
            <li>Candidate profiles and resumes.</li>
            <li>Training and internship records.</li>
            <li>Payment and accounting records.</li>
            <li>Legal, security, and compliance records.</li>
          </ul>
          <p>
            When information is no longer required, we will take appropriate steps to delete it, anonymize it, or otherwise dispose of it securely, subject to applicable law and legitimate retention requirements.
          </p>
          <p className="text-white/60">
            You may request deletion of your information, but we may need to retain certain records where legally required or where another lawful basis applies.
          </p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">8. Data Security</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
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
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">9. International Data Processing</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>
            Some third-party service providers may store or process information outside India.
          </p>
          <p>
            Where international processing occurs, we will take the steps required by applicable Indian law and any relevant restrictions or safeguards.
          </p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">10. Your Privacy Rights</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>Subject to applicable law and the relevant provisions in force, you may have the right to:</p>
          <ul className="space-y-1.5 pl-4 list-disc text-white/70">
            <li>Request information about the personal data we process about you.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>Request erasure of personal information where applicable.</li>
            <li>Withdraw consent for processing that relies on your consent.</li>
            <li>Request an update to your recruitment or communication preferences.</li>
            <li>Raise a grievance concerning the handling of your personal information.</li>
            <li>Exercise any other rights available under applicable law.</li>
          </ul>
          <p>
            Withdrawal of consent does not invalidate processing lawfully undertaken before withdrawal. It may also affect our ability to provide certain services.
          </p>
          <p className="pt-1 text-white/60">
            To exercise a right, contact us using the details below. We may need to verify your identity before responding.
          </p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">11. Children&apos;s Privacy</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
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
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">12. Third-Party Websites</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>
            Our website may contain links to external websites, employer platforms, social networks, or payment services.
          </p>
          <p className="text-white/60">
            We do not control the independent privacy practices of those services. Before submitting information to an external platform, review its privacy policy and terms.
          </p>
        </div>
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">13. Promotional Communications</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
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
      </div>

      <div className="border border-white/5 rounded-xl p-5 bg-white/[0.015]">
        <h3 className="text-base font-semibold text-white mb-2">14. Changes to This Privacy Policy</h3>
        <div className="space-y-2 text-white/75 text-xs sm:text-sm">
          <p>
            We may update this Privacy Policy to reflect changes in our services, information practices, technologies, or legal obligations.
          </p>
          <p className="text-white/60">
            The latest version will be published on this page with an updated revision date. Where required, we will provide additional notice or obtain consent for material changes.
          </p>
        </div>
      </div>

      <div className="border border-white/10 rounded-xl p-5 bg-white/[0.03]">
        <h3 className="text-base font-semibold text-white mb-2">15. Contact and Privacy Grievances</h3>
        <p className="text-xs sm:text-sm text-white/75 mb-3">
          For questions, privacy requests, corrections, deletion requests, or complaints concerning personal information, contact:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="w-3.5 h-3.5 text-white/50 shrink-0" />
            <span>Kovilpalayam, Coimbatore, Tamil Nadu, India</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Mail className="w-3.5 h-3.5 text-white/50 shrink-0" />
            <a href="mailto:contact@monarchsoftwares.com" className="hover:underline">contact@monarchsoftwares.com</a>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Phone className="w-3.5 h-3.5 text-white/50 shrink-0" />
            <a href="tel:+916385753874" className="hover:underline">+91 63857 53874</a>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Globe className="w-3.5 h-3.5 text-white/50 shrink-0" />
            <a href="https://www.monarchplacements.in/" target="_blank" rel="noopener noreferrer" className="hover:underline">www.monarchplacements.in/</a>
          </div>
        </div>
        <p className="text-[11px] sm:text-xs text-white/60 border-t border-white/5 pt-2">
          Please include sufficient information to help us identify your enquiry. Avoid including passwords, OTPs, or unnecessary sensitive information. We will review and respond to privacy requests and grievances within the time limits required by applicable law.
        </p>
      </div>
    </div>
  )
}
