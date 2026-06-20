// ==========================================
// 1. DATA STRUCTURE MODULES (JSON Placeholders)
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
// 2. LOGIC CONTROLLER (Filter, Highlight, Auto-Scroll)
// ==========================================

let searchDebounceTimeout;

// Safeguarded text node highlight processor
function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

function filterContent() {
    const searchInput = document.getElementById('main-search');
    const clearBtn = document.getElementById('clear-search');
    const previewDisplay = document.getElementById('search-preview-display');
    
    const searchQuery = searchInput.value.toLowerCase().trim();
    const rawSearchValue = searchInput.value;
    const activeCategory = document.querySelector('#categoryFilter .active').getAttribute('data-category');

    if (clearBtn) {
        clearBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
    }

    // Filter Scheme Cards Matrix
    const filteredSchemes = schemesData.filter(scheme => {
        const matchesSearch = scheme.name.toLowerCase().includes(searchQuery) ||
                              scheme.ministry.toLowerCase().includes(searchQuery) ||
                              scheme.category.toLowerCase().includes(searchQuery) ||
                              scheme.description.toLowerCase().includes(searchQuery);
        
        const matchesCategory = (activeCategory === 'all') || 
                                (scheme.category.toLowerCase() === activeCategory.toLowerCase());
        
        return matchesSearch && matchesCategory;
    });

    // Filter Directory Grid Matrix
    const filteredDirectory = directoryData.filter(site => {
        return site.name.toLowerCase().includes(searchQuery) || 
               site.description.toLowerCase().includes(searchQuery);
    });

    // Synchronize Real-time Preview Banner
    const totalMatches = filteredSchemes.length + filteredDirectory.length;
    if (previewDisplay) {
        if (searchQuery.length > 0) {
            previewDisplay.innerHTML = `
                <div class="search-monitor-banner glass-card">
                    <p>
                        <i class="fa-solid fa-keyboard" style="margin-right: 8px; opacity: 0.7;"></i>
                        Active Search: <span class="live-term">"${rawSearchValue}"</span>
                    </p>
                    <span class="match-badge">${totalMatches} results found</span>
                </div>
            `;
        } else {
            previewDisplay.innerHTML = '';
        }
    }

    renderHighlightedSchemes(filteredSchemes, searchQuery);
    renderHighlightedDirectory(filteredDirectory, searchQuery);
}

// Debounce wrapper managing visual states and the auto-scroll mechanic
function handleSearchInput() {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.classList.add('is-searching');
    }
    
    clearTimeout(searchDebounceTimeout);
    searchDebounceTimeout = setTimeout(() => {
        filterContent();
        
        if (searchContainer) {
            searchContainer.classList.remove('is-searching');
        }

        // --- AUTO-SCROLL EXECUTION NODE ---
        const searchInput = document.getElementById('main-search');
        const previewDisplay = document.getElementById('search-preview-display');
        
        if (searchInput && searchInput.value.trim().length > 0 && previewDisplay) {
            previewDisplay.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, 550); // Balanced latency window allowing non-disruptive mid-word typing pauses
}

// ==========================================
// 3. UI RENDERING ENGINES
// ==========================================

function renderHighlightedSchemes(schemes, query) {
    const grid = document.getElementById('schemes-grid');
    if (!grid) return;
    grid.innerHTML = schemes.length ? '' : `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No schemes match your criteria.</p>`;
    
    schemes.forEach(scheme => {
        const card = document.createElement('div');
        card.className = 'card glass-card';
        card.innerHTML = `
            <span class="category-tag">${highlightText(scheme.category, query)}</span>
            <h3>${highlightText(scheme.name, query)}</h3>
            <span class="ministry-tag">${highlightText(scheme.ministry, query)}</span>
            <p>${highlightText(scheme.description, query)}</p>
            <div class="details-box">
                <strong>Eligibility:</strong> ${scheme.eligibility}<br><br>
                <strong>Benefits:</strong> ${scheme.benefits}
            </div>
            <a href="${scheme.link}" target="_blank" class="btn">Visit Website <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        `;
        grid.appendChild(card);
    });
}

function renderHighlightedDirectory(sites, query) {
    const grid = document.getElementById('directory-grid');
    if (!grid) return;
    grid.innerHTML = sites.length ? '' : `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No matching platforms found.</p>`;
    
    sites.forEach(site => {
        const initial = site.name.charAt(0).toUpperCase();
        const card = document.createElement('div');
        card.className = 'card glass-card';
        card.innerHTML = `
            <div class="directory-logo">${initial}</div>
            <h3>${highlightText(site.name, query)}</h3>
            <p>${highlightText(site.description, query)}</p>
            <a href="${site.url}" target="_blank" class="btn">Open Platform</a>
        `;
        grid.appendChild(card);
    });
}

function displayNews() {
    const container = document.getElementById('news-container');
    if (!container) return;
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
// 4. LIFECYCLE INITIALIZATION LISTENERS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    displayNews();
    filterContent(); 

    const searchInput = document.getElementById('main-search');
    const clearBtn = document.getElementById('clear-search');

    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }

    if (clearBtn && searchInput) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            filterContent();
            searchInput.focus();
        });
    }

    const categories = document.querySelectorAll('#categoryFilter li');
    categories.forEach(item => {
        item.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('active'));
            item.classList.add('active');
            filterContent();
            
            // Force contextual layout adjustment on category filter selections
            const previewDisplay = document.getElementById('search-preview-display');
            if (previewDisplay) {
                previewDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
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
    }

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                faqItems.forEach(i => i.classList.remove('open'));
                if (!isOpen) item.classList.add('open');
            });
        }
    });

    const topBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (topBtn) {
            if (window.scrollY > 300) {
                topBtn.classList.add('show');
            } else {
                topBtn.classList.remove('show');
            }
        }
    });
    
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form processing complete within static dashboard context boundaries.');
            e.target.reset();
        });
    }
});