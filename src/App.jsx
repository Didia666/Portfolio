import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null)
  const [projectImageIndex, setProjectImageIndex] = useState(0)
  const [skillIndex, setSkillIndex] = useState(0)
  const [certificateSearch, setCertificateSearch] = useState('')
  const [certificateFilter, setCertificateFilter] = useState('All')

  const skillCategories = [
    ['Web Development', 'HTML', 'CSS', 'JavaScript', 'React'],
    ['Data', 'MySQL', 'Database Design', 'SQL'],
    ['AI / Machine Learning', 'Python', 'ML Systems', 'Face Recognition'],
    ['Application Dev', 'Electron', 'React', 'Desktop Apps'],
    ['Creative / Other', 'Ren’Py', 'GameMaker'],
  ]
  const visibleSkills = [
    ...skillCategories.slice(skillIndex),
    ...skillCategories.slice(0, skillIndex),
  ]
  const certificates = [
    {
      title: 'Introduction to SQL',
      issuer: 'DataCamp',
      completed: 'November 22, 2026',
      category: 'Data & Databases',
      description: 'Completed a short, hands-on introduction to SQL, covering foundational queries for retrieving and working with relational data.',
      file: 'certificates/certificate.pdf',
    },
    {
      title: 'Design Thinking Workshop',
      issuer: 'SHE++ Empowerment Program for Women in Tech',
      completed: 'June 3, 2025',
      category: 'Workshops',
      description: 'Completed the SHE++ Design Thinking workshop hosted at Pamantasan ng Lungsod ng Pasig, focused on applying a structured, human-centered approach to problem solving.',
      file: 'certificates/she-design-thinking.pdf',
    },
    {
      title: 'Stand Out in the Digital Crowd',
      issuer: 'SHE++ Career Development Webinar Series',
      completed: 'June 11, 2025',
      category: 'Professional Development',
      description: 'Participated in a career development webinar about building a professional presence through LinkedIn and other online platforms.',
      file: 'certificates/she-linkedin-presence.pdf',
    },
    {
      title: 'Feel the Vibes: Unleash the Power of Vibe Coding',
      issuer: 'SHE++ Career Development Webinar Series',
      completed: 'July 18, 2025',
      category: 'Professional Development',
      description: 'Participated in a webinar exploring vibe coding and its role in modern software creation.',
      file: 'certificates/she-vibe-coding.pdf',
    },
    
  ]
  const certificateCategories = ['All', ...new Set(certificates.map((certificate) => certificate.category))]
  const visibleCertificates = certificates.filter((certificate) => {
    const matchesCategory = certificateFilter === 'All' || certificate.category === certificateFilter
    const searchText = `${certificate.title} ${certificate.issuer} ${certificate.category} ${certificate.completed} ${certificate.description}`.toLowerCase()
    return matchesCategory && searchText.includes(certificateSearch.toLowerCase())
  })

  const faceRecognitionImages = [
    ['images/face_recog/Dashboard.png', 'Dashboard', 'Provides an overview of employees, events, logs, and attendance activity.'],
    ['images/face_recog/Face_.png', 'Facial Recognition', 'Captures and identifies a person through the system camera interface.'],
    ['images/face_recog/Add_Emp.png', 'Add Employee', 'Registers employee details and prepares a record for face enrollment.'],
    ['images/face_recog/Setup_Emp.png', 'Face Enrollment', 'Guides the employee through the facial data setup process.'],
    ['images/face_recog/Emp_tab.png', 'Employee Directory', 'Displays registered employees and their relevant information.'],
    ['images/face_recog/Emp_Archive_tab.png', 'Employee Archive', 'Stores and manages inactive or archived employee records.'],
    ['images/face_recog/Creating_Event.png', 'Create Event', 'Allows authorized users to create a new attendance event.'],
    ['images/face_recog/Event_tab.png', 'Event Management', 'Lists active events and their configured attendance details.'],
    ['images/face_recog/Event_Aechive_tab.png', 'Event Archive', 'Keeps completed events available for review and record management.'],
    ['images/face_recog/logs.png', 'Attendance Logs', 'Shows captured attendance records with employee and event details.'],
    ['images/face_recog/manual.png', 'Manual Attendance', 'Provides a fallback option for recording attendance manually.'],
    ['images/face_recog/qr_code.png', 'QR Attendance', 'Supports quick attendance verification using a QR code.'],
    ['images/face_recog/Setting_Branding.png', 'Branding Settings', 'Customizes the application name and visual branding.'],
    ['images/face_recog/Setting_Pos.png', 'Position Settings', 'Manages employee positions used throughout the system.'],
    ['images/face_recog/Setting_Loc.png', 'Location Settings', 'Configures available locations for employee and event records.'],
    ['images/face_recog/Setting_Dept.png', 'Department Settings', 'Organizes employees by department for easier system management.'],
  ]

  const malwareDetectionImages = [
    ['images/AYAWrus/Dashboard.png', 'Security Dashboard', 'Displays protection status, system threats, and key security activity at a glance.'],
    ['images/AYAWrus/Scan.png', 'Malware Scan', 'Runs a system scan to detect suspicious files and potential malicious activity.'],
    ['images/AYAWrus/Quarantine_tab.png', 'Quarantine Management', 'Shows detected threats isolated safely from the rest of the system.'],
    ['images/AYAWrus/ProtectionHistory_tab.png', 'Protection History', 'Records previous detections, actions, scans, and protection events.'],
    ['images/AYAWrus/Exclusion_tab.png', 'Security Exclusions', 'Manages trusted files or folders that should be excluded from future scans.'],
    ['images/AYAWrus/Settings_tab.png', 'Protection Settings', 'Configures scan behavior and security options for the detection system.'],
    ['images/AYAWrus/Explain.png', 'Threat Explanation', 'Provides users with a clear explanation of a detected threat and the recommended action.'],
    ['images/AYAWrus/Mobile_Dashboard.png', 'Mobile Dashboard', 'Provides a compact mobile view of protection and detection status.'],
    ['images/AYAWrus/Mobile_History.png', 'Mobile History', 'Lets users review protection and detection history from a mobile interface.'],
    ['images/AYAWrus/Remote_Quarantine.png', 'Remote Quarantine', 'Allows an administrator to remotely isolate or remove threats from a protected device.'],

  ]

  const ecommerceImages = [
    ['images/Grace_Street/User_Shop.png', 'Online Store', 'Browse the product catalog, explore product details, and add items to a shopping cart.'],
    ['images/Grace_Street/User_Dashboard.png', 'Customer Dashboard', 'A customer home screen with quick access to shopping and account features.'],
    ['images/Grace_Street/Authentication.png', 'Authentication', 'Sign-in and account access screens for customers and system users.'],
    ['images/Grace_Street/User_Cart.png', 'Shopping Cart', 'Review selected products and quantities before placing an order.'],
    ['images/Grace_Street/User_Checkout.png', 'Checkout', 'Confirm order details and provide the information needed to complete a purchase.'],
    ['images/Grace_Street/User_Order.png', 'Order History', 'Review previous and current customer orders.'],
    ['images/Grace_Street/User_Order_Details.png', 'Order Details', 'View the items, quantities, and status associated with an individual order.'],
    ['images/Grace_Street/User_Track_Shipment.png', 'Shipment Tracking', 'Follow the progress of an order through its delivery stages.'],
    ['images/Grace_Street/User_Wishlist.png', 'Wishlist', 'Save products to revisit or purchase later.'],
    ['images/Grace_Street/User_Reviews.png', 'Product Reviews', 'Read or submit customer feedback about products.'],
    ['images/Grace_Street/User_Profile.png', 'Customer Profile', 'View and manage customer account information.'],
    ['images/Grace_Street/User_Get_In_Touch.png', 'Contact the Store', 'Send questions or messages to the store team.'],
    ['images/Grace_Street/Admin_Dashboard.png', 'Admin Dashboard', 'A summary view for administrators to monitor store operations.'],
    ['images/Grace_Street/Admin_User_manage.png', 'User Management', 'Manage customer and staff accounts from the administration area.'],
    ['images/Grace_Street/Admin_Lock_acc.png', 'Account Security', 'Review or manage locked accounts as part of store administration.'],
    ['images/Grace_Street/Admin_Logs.png', 'Admin Activity Logs', 'Review recorded administrative actions and system activity.'],
    ['images/Grace_Street/Admin_Profile.png', 'Admin Profile', 'View and update the administrator account profile.'],
    ['images/Grace_Street/Admin_Settings.png', 'Store Settings', 'Configure settings used to manage the e-commerce platform.'],
    ['images/Grace_Street/Adlin_Seller_manage.png', 'Seller Management', 'Manage seller accounts and their store access.'],
    ['images/Grace_Street/Supplier_Dashboard.png', 'Supplier Dashboard', 'A supplier overview for products, orders, and related activity.'],
    ['images/Grace_Street/Supplier_Orders.png', 'Supplier Orders', 'Review orders assigned to or managed by a supplier.'],
    ['images/Grace_Street/Supplier_Order_Details.png', 'Supplier Order Details', 'View line items and fulfillment information for a supplier order.'],
    ['images/Grace_Street/Supplier_Product.png', 'Supplier Products', 'Manage product information provided by a supplier.'],
    ['images/Grace_Street/Supplier_Logs.png', 'Supplier Activity Logs', 'Review supplier-side activity and order-related actions.'],
    ['images/Grace_Street/Courier_Dashboard.png', 'Courier Dashboard', 'A courier overview of delivery tasks and shipment activity.'],
    ['images/Grace_Street/Courier_Ready_For_PickUp.png', 'Ready for Pickup', 'Shows orders prepared for courier pickup and delivery.'],
    ['images/Grace_Street/Courier_Profile.png', 'Courier Profile', 'View courier account and profile information.'],
  ]

  const mediSyncImages = [
    ['images/MediSync/Admin_Dashboard.png', 'Administrator Dashboard', 'The central overview for administrators to monitor inventory and move between key management areas.'],
    ['images/MediSync/Admin_Inventory.png', 'Medicine Inventory', 'Browse and manage stocked medicines, with inventory records organized for day-to-day stock control.'],
    ['images/MediSync/Admin_Add_Item.png', 'Add Inventory Item', 'Enter a new medicine or supply into the catalog so it can be tracked as part of the inventory.'],
    ['images/MediSync/Admin_View_Batch.png', 'Batch Details', 'Inspect a selected inventory batch, helping staff distinguish stock by its batch-level details.'],
    ['images/MediSync/Admin_Inventory_Report.png', 'Inventory Report', 'Review a report of current inventory to support stock checks and administrative oversight.'],
    ['images/MediSync/Admin_Expired_Report.png', 'Expired Items Report', 'Identify expired inventory in a dedicated report so staff can review items requiring attention.'],
    ['images/MediSync/Admin_Request_List.png', 'Request List', 'Review submitted supply requests in one place before processing or making an approval decision.'],
    ['images/MediSync/Admin_Acc.png', 'Account Management', 'View and manage existing system accounts from the administrator side.'],
    ['images/MediSync/Admin_NewAcc.png', 'Create Account', 'Add a new user account to provide the appropriate people access to the inventory system.'],
    ['images/MediSync/Admin_Setting_Category.png', 'Category Settings', 'Maintain inventory categories to keep medicine and supply records organized consistently.'],
    ['images/MediSync/Admin_Setting_Unit.png', 'Unit Settings', 'Configure measurement or packaging units used when recording inventory quantities.'],
    ['images/MediSync/Supplier_Dashboard.png', 'Supplier Dashboard', 'A supplier-facing overview for accessing supplier tasks and request activity.'],
    ['images/MediSync/Supplier_Requests.png', 'Supplier Requests', 'Review incoming requests shared with the supplier and their current status.'],
    ['images/MediSync/Supplier_Approve_Requests.png', 'Approve Requests', 'Process a request decision from the supplier workflow and communicate its outcome.'],
  ]

  const parkingImages = [
    ['images/Parking/Admin_Dashboard.png', 'Administrator Dashboard', 'An administrative overview with navigation to employee, parking-record, service, and system-management areas.'],
    ['images/Parking/Admin_Emp_Regis.png', 'Employee Registration', 'Register an employee by entering their details so the system can associate staff with parking operations.'],
    ['images/Parking/Admin_Edit_Emp.png', 'Edit Employee', 'Update an existing employee record when staff details need to be corrected or changed.'],
    ['images/Parking/Admin_Emo_Data.png', 'Employee Data', 'Review employee information managed by the administrator for the parking system.'],
    ['images/Parking/Admin_Parking_Records.png', 'Parking Records', 'Review stored parking activity to support monitoring and record keeping.'],
    ['images/Parking/Admin_Services.png', 'Parking Services', 'View the parking services and information presented by the system.'],
    ['images/Parking/Guard_Entry.png', 'Vehicle Entry', 'Give guards an entry workflow for recording vehicles arriving at the parking area.'],
    ['images/Parking/Guard_Active_Vehicle.png', 'Active Vehicles', 'Review vehicles currently recorded as active in the parking area.'],
    ['images/Parking/Login.png', 'Account Login', 'Sign in to access the parking system’s role-specific features.'],
    ['images/Parking/FAQ.png', 'Frequently Asked Questions', 'Find answers to common questions about using the parking system.'],
    ['images/Parking/Contact.png', 'Contact', 'Find contact information or send an inquiry to the parking service team.'],
  ]

  const projects = [
    ['Face Recognition System', 'React, Electron, Python', 'Web', 'A desktop attendance and employee-management system that combines face enrollment and camera-based recognition with event setup, attendance logs, QR check-in, and manual attendance tools.', 'https://github.com/KitChi139/Employee-Detection-System', 'images/face_recog/home.png', faceRecognitionImages],
    ['Malware Detection System', 'Python, Machine Learning', 'Machine Learning', 'A desktop and mobile security application for scanning systems, reviewing potential detections, managing quarantined items, and checking protection history and settings.', 'https://github.com/Didia666/AYAWrus', 'images/AYAWrus/Dashboard.png', malwareDetectionImages],
    ['Secure E-Commerce System', 'HTML, CSS, JavaScript', 'Web', 'A multi-role online store connecting customer shopping and checkout with order tracking, supplier product and order workflows, courier fulfillment, and administrator account and store management.', 'https://github.com/KitChi139/E-Commerce-System', 'images/Grace_Street/User_Shop.png', ecommerceImages],
    ['Institutional Parking System', 'Parking Management, Database', 'Database', 'A role-based parking management system with administrator tools for employee registration and record management, plus guard workflows for recording vehicle entry and monitoring active vehicles. It also includes service information, FAQs, and a contact page.', 'https://github.com/', 'images/Parking/Admin_Dashboard.png', parkingImages],
    ['Hospital Inventory Management', 'Inventory Management, MySQL', 'Database', 'MediSync is a hospital inventory and supplier-request management system. Administrators can maintain medicine records, review batches and stock reports, identify expired items, manage accounts and inventory categories, while suppliers review and approve incoming requests.', 'https://github.com/KitChi139/Inventory_Management', 'images/MediSync/Admin_Dashboard.png', mediSyncImages],
  ]
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project[2] === filter)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (selectedGalleryImage) setSelectedGalleryImage(null)
        else setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedGalleryImage])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const interval = window.setInterval(() => {
      setProjectImageIndex((current) => current + 1)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const interval = window.setInterval(() => {
      setSkillIndex((current) => (current + 1) % 5)
    }, 3200)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [filter])

  useEffect(() => {
    const hero = document.querySelector('.hero')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (!hero || prefersReducedMotion || isCoarsePointer) return undefined

    const handlePointerMove = (event) => {
      const bounds = hero.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width) * 100
      const y = ((event.clientY - bounds.top) / bounds.height) * 100
      hero.style.setProperty('--pointer-x', `${x}%`)
      hero.style.setProperty('--pointer-y', `${y}%`)
    }
    const resetPointer = () => {
      hero.style.setProperty('--pointer-x', '50%')
      hero.style.setProperty('--pointer-y', '45%')
    }

    hero.addEventListener('pointermove', handlePointerMove)
    hero.addEventListener('pointerleave', resetPointer)
    return () => {
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerleave', resetPointer)
    }
  }, [])

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu}>Patricia Diane R. Cruz</a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}</button>
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a><a href="#skills" onClick={closeMenu}>Skills</a><a href="#about" onClick={closeMenu}>About</a><a href="#experience" onClick={closeMenu}>Experience</a><a href="#certificates" onClick={closeMenu}>Credentials</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="connect-button" href="#contact">Let's Connect</a>
      </header>
      <section className="hero" id="home">
        <div className="code-cloud" aria-hidden="true"><span>const solve = (problem) =&gt;</span><span>SELECT * FROM ideas</span><span>model.fit(X_train)</span><span>npm run build</span><span>electron . --dev</span></div>
        <div className="hero-copy reveal-on-scroll"><p className="eyebrow"><i /> AVAILABLE FOR INTERNSHIPS &amp; FREELANCE</p><h1>Building practical<br />software<br /><strong>with code, data, and<br />intelligent systems.</strong></h1><p className="hero-description">I'm an aspiring software developer with hands-on experience in web development, databases, React, desktop applications, Python, machine learning, and system development.</p><div className="hero-actions"><a className="primary-button" href="#work">View My Work</a><a className="outline-button" href="#contact">Let's Connect</a><a className="outline-button" href={assetUrl('Resume.png')} download="Patricia-Diane-Cruz-Resume.png">Download Resume</a></div><span className="scroll-hint">— &nbsp; scroll</span></div>
      </section>
      <section className="skills" id="skills"><div className="skills-track" key={skillIndex}>{visibleSkills.map(([title, ...items]) => <div className="skill" key={title}><p>{title}</p><div>{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></section>
      <section className="work" id="work"><div className="section-heading reveal-on-scroll"><p className="eyebrow">Selected Work</p><h2>What I've Built</h2><p>A collection of systems, experiments, and applications I've built while learning and solving real problems.</p></div><div className="filters">{['All', 'Web', 'Machine Learning', 'Database'].map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="project-grid">{visibleProjects.map((project, index) => { const [title, tags, , description, , image, gallery] = project; const cardImage = gallery?.length ? gallery[(projectImageIndex + index) % gallery.length][0] : image; return <button className={`project-card project-${index + 1} reveal-on-scroll`} style={{ '--reveal-delay': `${Math.min(index * 70, 350)}ms` }} key={title} type="button" onClick={() => setSelectedProject(project)}><div className="project-image"><img key={cardImage} className="project-image-slide" src={assetUrl(cardImage)} alt={`${title} preview`} /><small>{index < 3 ? 'Featured' : 'View Case Study →'}</small></div><div className="tag-row">{tags.split(', ').map((tag) => <span key={tag}>{tag}</span>)}</div><h3>{title}</h3><p>{description}</p></button> })}</div></section>
      {selectedProject && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setSelectedProject(null) }}>
        <div className={`project-modal${selectedProject[6] ? ' has-gallery' : ''}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
          <button className="modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">×</button>
          <button className="modal-image modal-image-button" type="button" onClick={() => setSelectedGalleryImage({ src: assetUrl(selectedProject[5]), title: selectedProject[0], description: selectedProject[3] })} aria-label={`Expand ${selectedProject[0]} image`}><img src={assetUrl(selectedProject[5])} alt={`${selectedProject[0]} preview`} /></button>
          <div className="tag-row">{selectedProject[1].split(', ').map((tag) => <span key={tag}>{tag}</span>)}</div>
          <h2 id="project-modal-title">{selectedProject[0]}</h2>
          <p>{selectedProject[3]}</p>
          {selectedProject[6] && <details className="image-gallery">
            <summary>View Images</summary>
            <div className="gallery-grid">{selectedProject[6].map(([src, title, description]) => <figure key={title}>
              <button className="gallery-image-button" type="button" onClick={() => setSelectedGalleryImage({ src: assetUrl(src), title, description })} aria-label={`Expand ${title} image`}><img src={assetUrl(src)} alt={title} /></button>
              <figcaption><strong>{title}</strong><span>{description}</span></figcaption>
              <button className="gallery-action" type="button" onClick={() => setSelectedGalleryImage({ src, title, description })}>View details <span aria-hidden="true">↗</span></button>
            </figure>)}</div>
          </details>}
          <a className="modal-github" href={selectedProject[4]} target="_blank" rel="noreferrer"><span className="github-mark">◉</span> View on GitHub ↗</a>
          {selectedGalleryImage && <div className="image-lightbox-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setSelectedGalleryImage(null) }}>
            <div className="image-lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
              <button className="lightbox-close" type="button" onClick={() => setSelectedGalleryImage(null)} aria-label="Close enlarged image">×</button>
              <img className="lightbox-image" src={selectedGalleryImage.src} alt={selectedGalleryImage.title} />
              <div className="lightbox-caption"><h3 id="lightbox-title">{selectedGalleryImage.title}</h3><p>{selectedGalleryImage.description}</p></div>
            </div>
          </div>}
        </div>
      </div>}
      <section className="credentials reveal-on-scroll" id="certificates">
        <div className="section-heading"><p className="eyebrow">Learning &amp; Milestones</p><h2>Certificates &amp; Credentials</h2><p>A collection of certificates and learning milestones.</p></div>
        <div className="credential-controls">
          <div className="credential-filters">{certificateCategories.map((category) => <button className={certificateFilter === category ? 'active' : ''} key={category} type="button" onClick={() => setCertificateFilter(category)}>{category}</button>)}</div>
          <label className="credential-search"><span aria-hidden="true">⌕</span><input type="search" value={certificateSearch} onChange={(event) => setCertificateSearch(event.target.value)} placeholder="Search certificates..." aria-label="Search certificates" /></label>
        </div>
        <div className="credential-grid">{visibleCertificates.map((certificate) => <article className="credential-card" key={certificate.file}>
          <div className={`credential-preview${certificate.protected ? ' is-protected' : ''}`}>
            {certificate.protected
              ? <div className="credential-protected"><span aria-hidden="true">▣</span><small>Password-protected PDF</small></div>
              : <iframe className="credential-preview-frame" src={`${assetUrl(certificate.file)}#page=1&view=FitH&toolbar=0&navpanes=0`} title={`${certificate.title} certificate preview`} loading="lazy" />}
            {!certificate.protected && <span className="credential-preview-label">Certificate preview</span>}
          </div>
          <div className="credential-info">
            <span className="credential-category">{certificate.category}</span>
            <h3>{certificate.title}</h3>
            <p>{certificate.description}</p>
            <p className="credential-meta">Issued by <strong>{certificate.issuer}</strong><br />Completed {certificate.completed}</p>
            <div className="credential-actions"><a className="primary-button" href={assetUrl(certificate.file)} target="_blank" rel="noreferrer">View Certificate ↗</a><a className="credential-download" href={assetUrl(certificate.file)} download>Download</a></div>
          </div>
        </article>)}</div>
        {visibleCertificates.length === 0 && <p className="credential-empty">No certificates match your search.</p>}
      </section>
      <section className="experience reveal-on-scroll" id="experience"><p className="eyebrow">Experience &amp; Learning</p><div className="timeline"><div><span>AUGUST 2026 — PRESENT</span><h3>Freelance Developer <small>Remote</small></h3><p>Designed and deployed a web-based logistics monitoring system for a client, developing backend functionality, REST APIs, MySQL databases, and cloud deployment configurations.</p></div><div><span>WORK IMMERSION</span><h3>Organizational Support</h3><p>Assisted with organizational records, data encoding, and digital documentation.</p></div></div></section>
      <footer className="site-footer reveal-on-scroll" id="contact">
        <div className="footer-main">
          <section className="footer-about" id="about">
            <p className="eyebrow">About Me</p>
            <div className="footer-about-content">
              <div className="about-photo"><img src={assetUrl('picture.png')} alt="Patricia Diane Cruz" /></div>
              <div>
                <h2>Curious by nature.<br /><strong>Builder by practice.</strong></h2>
                <p>I'm an aspiring software developer focused on creating practical, reliable, and meaningful systems. I enjoy understanding how things work, breaking down complex problems, and building solutions that are both functional and thoughtfully designed.</p>
                <p>My work spans web development, desktop applications, databases, and machine learning. I'm constantly learning, experimenting, and looking for better ways to turn ideas into working software.</p>
              </div>
            </div>
          </section>
          <section className="footer-contact" aria-labelledby="contact-title">
            <p className="eyebrow">Get In Touch</p>
            <h2 id="contact-title">Have a project, internship<br />opportunity, or idea?</h2>
            <h3>Let's build something useful.</h3>
            <p className="contact-copy">I'm currently available for internships and freelance work. If you have a problem worth<br className="desktop-break" /> solving, I'd like to hear about it.</p>
            <div className="contact-actions"><a className="contact-button primary-button" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=patriciadianecruz@gmail.com&amp;body=Hi%20Patricia%2C%0A%0A" target="_blank" rel="noreferrer" aria-label="Email Patricia Diane Cruz">Email Me</a><a className="contact-button outline-button" href="https://github.com/Didia666" target="_blank" rel="noreferrer"><span className="github-mark">◉</span> GitHub</a><a className="contact-button outline-button" href="https://www.linkedin.com/in/diane-cruz-665213416/" target="_blank" rel="noreferrer">LinkedIn</a></div>
            <a className="download-link" href={assetUrl('Resume.png')} download="Patricia-Diane-Cruz-Resume.png">Download Resume ↓</a>
          </section>
        </div>
        <div className="footer-bottom"><span>© 2026 Patricia Diane Cruz</span><span>GitHub &nbsp; LinkedIn</span><span>Built with React</span></div>
      </footer>
    </main>    
  )
}
  
export default App
