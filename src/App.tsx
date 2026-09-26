import { useState } from 'react'
import termsOfUseMarkdown from './imports/termsofuse.md?raw'

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="arrow-icon"
  >
    {diagonal ? (
      <>
        <path d="M5 19 19 5" />
        <path d="M9 5h10v10" />
      </>
    ) : (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    )}
  </svg>
)

const MotionMark = () => (
  <svg aria-hidden="true" viewBox="0 0 42 42" className="logo-mark">
    <circle cx="21" cy="21" r="19" fill="none" stroke="currentColor" strokeWidth="2" />
    <path
      d="M7 22c4.5 0 4.5-8 9-8s4.5 15 9 15 4.5-10 10-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    />
  </svg>
)

const Wave = () => (
  <svg aria-hidden="true" viewBox="0 0 900 120" preserveAspectRatio="none" className="wave">
    <path
      d="M0 62c42 0 42-35 84-35s42 67 84 67 42-53 84-53 42 36 84 36 42-55 84-55 42 78 84 78 42-68 84-68 42 54 84 54 42-48 84-48 42 29 84 29 42-40 84-40 42 35 84 35"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
)

const features = [
  {
    number: '01',
    title: 'Gesture recognition',
    copy: 'Automatically identify complex movements across workouts, sports, and everyday motion.',
  },
  {
    number: '02',
    title: 'Form intelligence',
    copy: 'Turn raw sensor data into precise, actionable feedback on quality, timing, and range.',
  },
  {
    number: '03',
    title: 'Multi-platform',
    copy: 'A single motion engine built to perform across mobile, wearables, and connected screens.',
  },
]

type TermsBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

type TermsSection = {
  heading?: string
  blocks: TermsBlock[]
}

function parseTerms(markdown: string): TermsSection[] {
  const body = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
  const lines = body.split('\n')
  const sections: TermsSection[] = [{ blocks: [] }]
  let paragraph: string[] = []
  let list: string[] = []

  const currentSection = () => sections[sections.length - 1]
  const flushParagraph = () => {
    if (paragraph.length) {
      currentSection().blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
      paragraph = []
    }
  }
  const flushList = () => {
    if (list.length) {
      currentSection().blocks.push({ type: 'list', items: list })
      list = []
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      flushList()
    } else if (line.startsWith('# ')) {
      flushParagraph()
      flushList()
    } else if (line.startsWith('## ')) {
      flushParagraph()
      flushList()
      sections.push({ heading: line.slice(3), blocks: [] })
    } else if (line.startsWith('### ')) {
      flushParagraph()
      flushList()
      currentSection().blocks.push({ type: 'heading', text: line.slice(4) })
    } else if (line.startsWith('- ')) {
      flushParagraph()
      list.push(line.slice(2))
    } else if (list.length) {
      list[list.length - 1] += ` ${line}`
    } else {
      paragraph.push(line)
    }
  }

  flushParagraph()
  flushList()
  return sections.filter((section) => section.heading || section.blocks.length)
}

const termsSections = parseTerms(termsOfUseMarkdown)

function LinkedText({ text }: { text: string }) {
  return text.split(/(support@vimo\.co|http:\/\/vimo\.co)/g).map((part, index) => {
    if (part === 'support@vimo.co') {
      return (
        <a href="mailto:support@vimo.co" key={`${part}-${index}`}>
          {part}
        </a>
      )
    }
    if (part === 'http://vimo.co') {
      return (
        <a href="http://vimo.co" key={`${part}-${index}`}>
          {part}
        </a>
      )
    }
    return part
  })
}

function PrivacyPage() {
  return (
    <div className="site-shell privacy-page">
      <header className="site-header privacy-header">
        <a className="brand" href="/" aria-label="Vimo Labs home">
          <MotionMark />
          <span>VIMO LABS</span>
        </a>
        <a className="privacy-back" href="/">
          Back to home <Arrow />
        </a>
      </header>

      <main className="privacy-main">
        <div className="privacy-hero">
          <span className="section-index light">LEGAL / PRIVACY</span>
          <h1>Privacy Policy</h1>
          <p>Last updated December 31, 2022</p>
        </div>

        <article className="privacy-content">
          <p className="privacy-intro">
            This privacy policy governs your use of the software applications Gymatic
            (“Application”) for mobile devices that was created by Vimo Labs Inc. The Application
            is the first and only Apple Watch app that auto tracks your workout, by auto identifying
            exercise and auto counting repetitions.
          </p>

          <section>
            <h2>What Information Does The Application Obtain And How Is It Used?</h2>
            <h3>User Provided Information</h3>
            <p>
              The Application obtains the information you provide when you download and register
              the Application. Registration with us is optional. However, please keep in mind that
              you may not be able to use some of the features offered by the Application unless you
              register with us.
            </p>
            <p>
              When you register with us and use the Application, you generally provide (a) your
              name, email address, user name, password and other registration information; (b)
              transaction-related information, such as when you make purchases, respond to any
              offers, or download or use applications from us; (c) information you provide us when
              you contact us for help; (d) personal information, including birthday, weight, gender
              which are only used to calculate calories burned, and; (e) information you enter into
              our system when using the Application, such as contact information and project
              management information.
            </p>
            <p>
              We may also use the information you provided us to contact your from time to time to
              provide you with important information, required notices and marketing promotions.
            </p>

            <h3>Automatically Collected Information</h3>
            <p>
              In addition, the Application may collect certain information automatically,
              including, but not limited to, the type of mobile device you use, your mobile devices
              unique device ID, the IP address of your mobile device, your mobile operating system,
              the type of mobile Internet browsers you use, and information about the way you use
              the Application.
            </p>

            <h3>HealthKit Data</h3>
            <p>If you granted permission, the Application collects the following information from HealthKit:</p>
            <ul>
              <li><strong>Active Energy.</strong> It is only used to calculate calories burned.</li>
              <li><strong>Heart Rate.</strong> It is used to track your heart rate response for each individual exercise.</li>
              <li><strong>Weight.</strong> It is only used to calculate calories burned.</li>
              <li><strong>Date of Birth.</strong> It is only used to calculate calories burned.</li>
              <li><strong>Sex.</strong> It is only used to calculate calories burned.</li>
              <li><strong>Activity.</strong> It is used to give you a summary of your day.</li>
            </ul>
            <p>If you granted permission, the Application writes the following information into HealthKit:</p>
            <ul>
              <li><strong>Active Energy.</strong> Write calories burned during workout.</li>
              <li><strong>Heart Rate.</strong> It may update heart rate data when bluetooth heart rate strap is used.</li>
              <li><strong>Weight.</strong> Update your weight when you use the weight tracker feature built-in the Application.</li>
              <li><strong>Workouts.</strong> Update details of your workout.</li>
            </ul>
          </section>

          <section>
            <h2>Does The Application Collect Precise Real Time Location Information Of The Device?</h2>
            <p>This Application does not collect precise information about the location of your mobile device.</p>
          </section>

          <section>
            <h2>Do Third Parties See And/Or Have Access To Information Obtained By The Application?</h2>
            <p>
              Only aggregated, anonymized data may be periodically transmitted to external services
              to help us improve the Application and our service. We will share your information
              with third parties only in the ways that are described in this privacy statement.
            </p>
            <p>We may disclose User Provided and Automatically Collected Information:</p>
            <ul>
              <li>as required by law, such as to comply with a subpoena, or similar legal process;</li>
              <li>when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;</li>
              <li>with our trusted services providers who work on our behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
              <li>if Vimo Labs Inc. is involved in a merger, acquisition, or sale of all or a portion of its assets, you will be notified via email and/or a prominent notice on our Web site of any change in ownership or uses of this information, as well as any choices you may have regarding this information.</li>
            </ul>
          </section>

          <section>
            <h2>What Are My Opt-Out Rights?</h2>
            <p>
              You can stop all collection of information by the Application easily by uninstalling
              the Application. You may use the standard uninstall processes as may be available as
              part of your mobile device or via the mobile application marketplace or network. You
              can also request to opt-out via email, at <a href="mailto:support@vimo.co">support@vimo.co</a>.
            </p>
          </section>

          <section>
            <h2>Data Retention Policy, Managing Your Information</h2>
            <p>
              We will retain User Provided data for as long as you use the Application and for a
              reasonable time thereafter. We will retain Automatically Collected information for up
              to 24 months and thereafter may store it in aggregate. If you’d like us to delete User
              Provided Data that you have provided via the Application, please contact us at{' '}
              <a href="mailto:support@vimo.co">support@vimo.co</a> and we will respond in a
              reasonable time. Please note that some or all of the User Provided Data may be
              required in order for the Application to function properly.
            </p>
          </section>

          <section>
            <h2>Children</h2>
            <p>
              We do not use the Application to knowingly solicit data from or market to children
              under the age of 13. If a parent or guardian becomes aware that his or her child has
              provided us with information without their consent, he or she should contact us at{' '}
              <a href="mailto:support@vimo.co">support@vimo.co</a>. We will delete such information
              from our files within a reasonable time.
            </p>
          </section>

          <section>
            <h2>Security</h2>
            <p>
              We are concerned about safeguarding the confidentiality of your information. We
              provide physical, electronic, and procedural safeguards to protect information we
              process and maintain. For example, we limit access to this information to authorized
              employees and contractors who need to know that information in order to operate,
              develop or improve our Application. Please be aware that, although we endeavor provide
              reasonable security for information we process and maintain, no security system can
              prevent all potential security breaches.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              This Privacy Policy may be updated from time to time for any reason. We will notify
              you of any changes to our Privacy Policy by posting the new Privacy Policy here and
              informing you via email or text message. You are advised to consult this Privacy
              Policy regularly for any changes, as continued use is deemed approval of all changes.
              You can check the history of this policy by clicking here.
            </p>
          </section>

          <section>
            <h2>Your Consent</h2>
            <p>
              By using the Application, you are consenting to our processing of your information as
              set forth in this Privacy Policy now and as amended by us. “Processing,” means using
              cookies on a computer/hand held device or using or touching information in any way,
              including, but not limited to, collecting, storing, deleting, using, combining and
              disclosing information, all of which activities will take place in the United States.
              If you reside outside the United States your information will be transferred,
              processed and stored there under United States privacy standards.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions regarding privacy while using the Application, or have
              questions about our practices, please contact us via email at{' '}
              <a href="mailto:support@vimo.co">support@vimo.co</a>.
            </p>
          </section>
        </article>
      </main>

      <footer className="privacy-footer">
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Vimo Labs</span>
          <a href="/">Back to vimo.co</a>
        </div>
      </footer>
    </div>
  )
}

function UserDeletionPage() {
  return (
    <div className="site-shell privacy-page">
      <header className="site-header privacy-header">
        <a className="brand" href="/" aria-label="Vimo Labs home">
          <MotionMark />
          <span>VIMO LABS</span>
        </a>
        <a className="privacy-back" href="/">
          Back to home <Arrow />
        </a>
      </header>

      <main className="privacy-main">
        <div className="privacy-hero">
          <span className="section-index light">SUPPORT / ACCOUNT</span>
          <h1>User Deletion instruction</h1>
          <p>Last updated December 31, 2022</p>
        </div>

        <article className="privacy-content user-deletion-content">
          <section className="user-deletion-note">
            <span className="section-index">DELETE YOUR ACCOUNT</span>
            <p>
              Please email our support team{' '}
              <a href="mailto:support@vimo.co">support@vimo.co</a> if you wish to delete your user
              account.
            </p>
            <a className="button button-primary" href="mailto:support@vimo.co">
              Email support <Arrow />
            </a>
          </section>
        </article>
      </main>

      <footer className="privacy-footer">
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Vimo Labs</span>
          <a href="/">Back to vimo.co</a>
        </div>
      </footer>
    </div>
  )
}

function TermsOfUsePage() {
  return (
    <div className="site-shell privacy-page">
      <header className="site-header privacy-header">
        <a className="brand" href="/" aria-label="Vimo Labs home">
          <MotionMark />
          <span>VIMO LABS</span>
        </a>
        <a className="privacy-back" href="/">
          Back to home <Arrow />
        </a>
      </header>

      <main className="privacy-main">
        <div className="privacy-hero">
          <span className="section-index light">LEGAL / TERMS</span>
          <h1>{'Terms and Conditions ("Terms")'}</h1>
          <p>Last updated December 31, 2022</p>
        </div>

        <article className="privacy-content terms-content">
          {termsSections.map((section, sectionIndex) => (
            <section
              className={section.heading ? undefined : 'terms-preamble'}
              key={section.heading ?? 'preamble'}
            >
              {section.heading && <h2>{section.heading}</h2>}
              {section.blocks.map((block, blockIndex) => {
                if (block.type === 'heading') {
                  return <h3 key={`${block.text}-${blockIndex}`}>{block.text}</h3>
                }
                if (block.type === 'list') {
                  return (
                    <ul key={`list-${sectionIndex}-${blockIndex}`}>
                      {block.items.map((item, itemIndex) => (
                        <li key={`${item}-${itemIndex}`}>
                          <LinkedText text={item} />
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={`paragraph-${sectionIndex}-${blockIndex}`}>
                    <LinkedText text={block.text} />
                  </p>
                )
              })}
            </section>
          ))}
        </article>
      </main>

      <footer className="privacy-footer">
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Vimo Labs</span>
          <a href="/">Back to vimo.co</a>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const pathname = window.location.pathname.replace(/\/+$/, '')

  if (pathname === '/privacy') {
    return <PrivacyPage />
  }

  if (pathname === '/userdeletion') {
    return <UserDeletionPage />
  }

  if (pathname === '/termsofuse') {
    return <TermsOfUsePage />
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Vimo Labs home">
          <MotionMark />
          <span>VIMO LABS</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#technology" onClick={closeMenu}>
            Technology
          </a>
          <a href="#applications" onClick={closeMenu}>
            Applications
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a className="header-cta" href="#download" onClick={closeMenu}>
            Explore our apps <Arrow diagonal />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" />
                Motion intelligence platform
              </div>
              <h1>
                Human motion.
                <br />
                <span>Decoded.</span>
              </h1>
              <p>
                Vimo Labs transforms movement into meaningful insight—automatically recognizing
                gestures and analyzing performance in real time.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#technology">
                  Discover the technology <Arrow />
                </a>
                <a className="text-link" href="#applications">
                  View applications <Arrow diagonal />
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <img src="/assets/landingPage.jpeg" alt="Runner in motion wearing a smart watch" />
              <div className="target target-one">
                <span />
              </div>
              <div className="target target-two">
                <span />
              </div>
              <div className="analysis-card">
                <div className="analysis-head">
                  <span>LIVE ANALYSIS</span>
                  <i />
                </div>
                <div className="analysis-value">98.4%</div>
                <div className="analysis-label">Gesture confidence</div>
                <div className="mini-chart">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="axis-label">MOTION / 001</div>
            </div>
          </div>
          <div className="hero-wave">
            <span>01</span>
            <Wave />
            <span>04</span>
          </div>
        </section>

        <section className="technology section" id="technology">
          <div className="section-heading">
            <div>
              <span className="section-index">01 / TECHNOLOGY</span>
              <h2>Built to understand every move.</h2>
            </div>
            <p>
              From a golf swing to a split squat, our proprietary motion engine recognizes,
              interprets, and evaluates movement—without getting in the way.
            </p>
          </div>

          <div className="tech-showcase">
            <div className="tech-copy">
              <div className="metric">
                <strong>100k+</strong>
                <span>movements analyzed</span>
              </div>
              <div className="metric">
                <strong>Real-time</strong>
                <span>on-device feedback</span>
              </div>
              <a className="text-link dark" href="#applications">
                See it in action <Arrow />
              </a>
            </div>
            <div className="movement-frame">
              <img src="/assets/split_squat.png" alt="Athlete performing a split squat" />
              <div className="movement-tag tag-a">KNEE ANGLE 91°</div>
              <div className="movement-tag tag-b">FORM / OPTIMAL</div>
              <div className="scan-line" />
            </div>
          </div>

          <div className="feature-list">
            {features.map((feature) => (
              <article key={feature.number}>
                <span>{feature.number}</span>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="applications" id="applications">
          <div className="application-image">
            <img src="/assets/golf_image.png" alt="Golfer at the top of a swing" />
            <div className="swing-note">
              <span>SWING DETECTED</span>
              <strong>0.82s</strong>
            </div>
          </div>
          <div className="application-copy">
            <span className="section-index light">02 / APPLICATIONS</span>
            <h2>One engine.<br />Limitless motion.</h2>
            <p>
              We build intelligent experiences for fitness and sports—from automatic rep counting
              to detailed swing analysis.
            </p>
            <div className="application-tags">
              <span>Fitness</span>
              <span>Golf</span>
              <span>Wearables</span>
              <span>Connected TV</span>
            </div>
            <a className="button button-light" href="#download">
              Explore our products <Arrow />
            </a>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="about-intro">
            <span className="section-index">03 / OUR MISSION</span>
            <h2>We turn motion into momentum.</h2>
          </div>
          <div className="about-grid">
            <div className="about-image">
              <img src="/assets/team-min.jpg" alt="Athlete wearing a smart watch after a workout" />
              <span>Designed for real life</span>
            </div>
            <div className="about-copy">
              <p>
                Our mission is simple: make high-quality movement insights available to everyone.
                Vimo Labs combines applied AI, sensor intelligence, and human-centered design to
                help people understand how they move.
              </p>
              <div className="quote-line" />
              <p className="small-copy">
                Technology should disappear into the experience—leaving only clear, useful
                feedback behind.
              </p>
            </div>
          </div>
        </section>

        <section className="download section" id="download">
          <div className="download-heading">
            <span className="section-index light">04 / DOWNLOADS</span>
            <h2>Move smarter, starting now.</h2>
            <p>Experience Vimo Labs technology through our motion-powered apps.</p>
          </div>
          <div className="app-list">
            <a
              href="https://apps.apple.com/us/app/gymatic-workout-tracker/id1036069872"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/gymaticicon.jpeg" alt="" />
              <div>
                <span>WORKOUT TRACKING</span>
                <h3>Gymatic</h3>
                <p>Automatic exercise recognition and rep counting.</p>
              </div>
              <Arrow diagonal />
            </a>
            <a
              href="https://apps.apple.com/us/app/golf-gps/id1377275459"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/golfgpsicon.png" alt="" />
              <div>
                <span>SWING ANALYSIS</span>
                <h3>Golf GPS</h3>
                <p>Automatic swing capture with performance insights.</p>
              </div>
              <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <a className="brand footer-brand" href="#top">
            <MotionMark />
            <span>VIMO LABS</span>
          </a>
          <p>Motion intelligence for better human performance.</p>
          <a className="back-top" href="#top">
            Back to top <Arrow />
          </a>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Vimo Labs</span>
          <a href="/privacy">Privacy</a>
          <a href="/termsofuse">Terms</a>
          <a href="/userdeletion">Account deletion</a>
          <span>Santa Clara, California</span>
        </div>
      </footer>
    </div>
  )
}
