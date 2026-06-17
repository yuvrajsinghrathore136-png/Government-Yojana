// ==========================================
// DUMMY DATA STRUCTURES (Simulating API JSON Data)
// ==========================================

const schemesData = [
    {
        name: "PM E-Shram Scheme",
        category: "Employment",
        ministry: "Ministry of Labour & Employment",
        description: "National Database of Uncategorized Workers created to provide welfare benefits and social security identification.",
        eligibility: "Unorganized sector workers aged 16-59 years.",
        benefits: "Accidental insurance coverage and access to various direct-benefit social relief projects.",
        link: "https://eshram.gov.in"
    },
    {
        name: "PM-Kisan Samman Nidhi",
        category: "Agriculture",
        ministry: "Ministry of Agriculture & Farmers Welfare",
        description: "An initiative by the government of India that provides an assured minimum income support to all small landholding farmers.",
        eligibility: "All small and marginal landholding farmer families across the nation.",
        benefits: "Direct income support of ₹6,000 per year in three equal instalments.",
        link: "https://pmkisan.gov.in"
    },
    {
        name: "Ayushman Bharat (PM-JAY)",
        category: "Healthcare",
        ministry: "Ministry of Health & Family Welfare",
        description: "The largest health assurance scheme in the world aiming to provide free secondary and tertiary healthcare coverage.",
        eligibility: "Identified poor, vulnerable families based on SECC census criteria.",
        benefits: "Health cover of ₹5 Lakhs per family per year for secondary and tertiary hospitalizations.",
        link: "https://pmjay.gov.in"
    },
    {
        name: "Pradhan Mantri Mudra Yojana",
        category: "Business",
        ministry: "Ministry of Finance",
        description: "Provides loans to non-corporate, non-farm small/micro enterprises to scale and fund local entrepreneurial activity.",
        eligibility: "Any Indian citizen with a legitimate business plan for a non-farm income-generating activity.",
        benefits: "Collateral-free business development loans up to ₹10 Lakhs categorized under Shishu, Kishor, and Tarun classes.",
        link: "https://www.mudra.org.in"
    },
    {
        name: "Post Matric Scholarship Scheme",
        category: "Education",
        ministry: "Ministry of Social Justice & Empowerment",
        description: "Financial assistance provided to marginalized students to pursue higher secondary education post matriculation.",
        eligibility: "Students belonging to scheduled or socio-economically backwards statuses with low parental household income.",
        benefits: "Complete coverage of non-refundable tuition fees and maintenance allowance payments.",
        link: "https://scholarships.gov.in"
    },
    {
        name: "Pradhan Mantri Awas Yojana",
        category: "Housing",
        ministry: "Ministry of Housing and Urban Affairs",
        description: "An initiative intended to provide affordable housing to the urban and rural poor with an emphasis on sustainable infrastructure.",
        eligibility: "Families without an all-weather permanent house or falling within specific economic metrics.",
        benefits: "Subsidies on home purchase loan interest rates ranging up to ₹2.67 lakhs.",
        link: "https://pmaymis.gov.in"
    }
];

const directoryData = [
    { name: "india.gov.in", description: "The single-window lookup access to services and data updates distributed across all Indian public sector bodies.", url: "https://india.gov.in" },
    { name: "mygov.in", description: "Citizen engagement and crowdsourcing digital system allowing the public to advise and interface with core governance projects.", url: "https://mygov.in" },
    { name: "uidai.gov.in", description: "Official online operational structure for the Unique Identification Authority of India running identity issuance frameworks.", url: "https://uidai.gov.in" },
    { name: "digilocker.gov.in", description: "Secure cloud filing environment for issuance, physical validation, and systemic tracking of vital authentic digital records.", url: "https://digilocker.gov.in" },
    { name: "passportindia.gov.in", description: "The web workspace designed to facilitate quick application scheduling and tracking for global travel documents.", url: "https://passportindia.gov.in" }
];

const newsData = [
    { headline: "Digital India Phase Expansion Approved", date: "June 15, 2026", ministry: "Ministry of Electronics & IT", text: "New financial allocations cleared to extend rural broadband fiber infrastructure networks across all remote tier-3 sectors." },
    { headline: "New Agri-Tech Fund Launched for Startups", date: "June 12, 2026", ministry: "Ministry of Agriculture", text: "A funding framework established to promote remote drone surveillance and AI mapping systems in sustainable farming operations." }
];

// ==========================================
// RENDERING ENGINES
// ==========================================

function displaySchemes(schemes) {
    const grid = document.getElementById('schemes-grid');
    grid.innerHTML = schemes.length ? '' : `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No schemes match your criteria.</p>`;
    
    schemes.forEach(scheme => {
        const card = document.createElement('div');
        card.className = 'card glass-card';
        card.innerHTML = `
            <span class="category-tag">${scheme.category}</span>
            <h3>${scheme.name}</h3>
            <span class="ministry-tag">${scheme.ministry}</span>
            <p>${scheme.description}</p>
            <div class="details-box">
                <strong>Eligibility:</strong> ${scheme.eligibility}<br><br>
                <strong>Benefits:</strong> ${scheme.benefits}
            </div>
            <a href="${scheme.link}" target="_blank" class="btn">Visit Website <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        `;
        grid.appendChild(card);
    });
}

function displayDirectory(sites) {
    const grid = document.getElementById('directory-grid');
    grid.innerHTML = sites.length ? '' : `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No matching platforms found.</p>`;
    
    sites.forEach(site => {
        const initial = site.name.charAt(0).toUpperCase();
        const card = document.createElement('div');
        card.className = 'card glass-card';
        card.innerHTML = `
            <div class="directory-logo">${initial}</div>
            <h3>${site.name}</h3>
            <p>${site.description}</p>
            <a href="${site.url}" target="_blank" class="btn">Open Platform</a>
        `;
        grid.appendChild(card);
    });
}

function displayNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
    newsData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'news-card glass-card';
        div.innerHTML = `
            <div class="news-meta"><span>${item.date}</span><span>${item.ministry}</span></div>
            <h3>${item.headline}</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin: 10px 0 15px;">${item.text}</p>
            <a href="#" class="btn" style="padding: 6px 12px; font-size: 0.85rem;">Read More</a>
        `;
        container.appendChild(div);
    });
}

// ==========================================
// LIVE SEARCH & FILTER CONTROLLER
// ==========================================

function filterContent() {
    const searchQuery = document.getElementById('main-search').value.toLowerCase();
    const activeCategory = document.querySelector('#categoryFilter .active').getAttribute('data-category');

    // Filter Schemes
    const filteredSchemes = schemesData.filter(scheme => {
        const matchesSearch = scheme.name.toLowerCase().includes(searchQuery) ||
                              scheme.ministry.toLowerCase().includes(searchQuery) ||
                              scheme.category.toLowerCase().includes(searchQuery);
        
        const matchesCategory = (activeCategory === 'all') || 
                                (scheme.category.toLowerCase() === activeCategory.toLowerCase());
        
        return matchesSearch && matchesCategory;
    });

    // Filter Directory
    const filteredDirectory = directoryData.filter(site => {
        return site.name.toLowerCase().includes(searchQuery) || site.description.toLowerCase().includes(searchQuery);
    });

    displaySchemes(filteredSchemes);
    displayDirectory(filteredDirectory);
}

// ==========================================
// INTERFACE EVENT LISTENERS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    displaySchemes(schemesData);
    displayDirectory(directoryData);
    displayNews();

    // Live Search Trigger
    document.getElementById('main-search').addEventListener('input', filterContent);

    // Sidebar Category Filter Trigger
    const categories = document.querySelectorAll('#categoryFilter li');
    categories.forEach(item => {
        item.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('active'));
            item.classList.add('active');
            filterContent();
        });
    });

    // Dark/Light Theme Switching Engine
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        }
    });

    // Mobile Navigation Slide Drawer Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Accordion Expansion Mechanics
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    // Scroll To Top Execution Node
    const topBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Handle Dummy Contact Form Submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your query has been logged successfully inside our placeholder context.');
        e.target.reset();
    });
});