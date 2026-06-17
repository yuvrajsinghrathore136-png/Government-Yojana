/**
 * Global Real-World Scheme Mock Database Layer
 */
const DATA_SCHEMES_INDEX = [
    {
        id: "sch-01",
        nameEn: "Pradhan Mantri Matsya Sampada Yojana",
        nameHi: "प्रधानमंत्री मत्स्य संपदा योजना",
        origin: "CENTRAL",
        stateId: "",
        ministryEn: "Ministry of Fisheries, Animal Husbandry",
        departmentEn: "Department of Fisheries",
        descriptionEn: "Ecological strategy designed to expand development of the sustainable fisheries harvest segment.",
        descriptionHi: "मत्स्य पालन क्षेत्र के सतत विकास को बढ़ावा देने के लिए योजना।",
        category: "Agriculture",
        minAge: 18,
        maxAge: 65,
        genders: ["ALL"],
        incomeLimit: null,
        isDisabledRequired: false,
        officialUrl: "https://pmmsy.dahd.nic.in"
    },
    {
        id: "sch-02",
        nameEn: "Post Matric Scholarship Scheme",
        nameHi: "उत्तर मैट्रिक छात्रवृत्ति योजना",
        origin: "STATE",
        stateId: "up",
        ministryEn: "Social Welfare Department",
        departmentEn: "Scholarship Division",
        descriptionEn: "Financial assistance architecture supporting matriculation execution for structural minority segments.",
        descriptionHi: "मैट्रिक के बाद पढ़ रहे छात्रों के लिए वित्तीय सहायता योजना।",
        category: "Education",
        minAge: 16,
        maxAge: 30,
        genders: ["ALL"],
        incomeLimit: 250000,
        isDisabledRequired: false,
        officialUrl: "https://scholarship.up.gov.in"
    }
];

const DATA_INDIAN_STATES = [
    { id: 'ap', nameEn: 'Andhra Pradesh', nameHi: 'आंध्र प्रदेश' },
    { id: 'br', nameEn: 'Bihar', nameHi: 'बिहार' },
    { id: 'mp', nameEn: 'Madhya Pradesh', nameHi: 'मध्य प्रदेश' },
    { id: 'up', nameEn: 'Uttar Pradesh', nameHi: 'उत्तर प्रदेश' },
    { id: 'wb', nameEn: 'West Bengal', nameHi: 'पश्चिम बंगाल' }
];

const LOCALIZATION_DICTIONARY = {
    en: {
        navTitle: "Government Schemes Portal",
        navEligibility: "Check Eligibility",
        heroTitle: "Discover Public Schemes Instantly",
        heroSubtitle: "Access simplified parameters, required document check-lists, and direct pathways to official administrative application portals.",
        btnSearch: "Search",
        statTotal: "Total Indexed",
        statCentral: "Central Schemes",
        statState: "State Managed",
        filterHeading: "Filters Directory",
        lblOrigin: "Administrative Scope",
        lblState: "Specific State Territory",
        lblCat: "Target Sector",
        btnDetails: "Security Access Matrix",
        badgeOfficial: "Verified Gov Link",
        modalTitle: "Security Routing Intercept",
        modalCountdown: "Auto-navigating in 5 seconds..."
    },
    hi: {
        navTitle: "सरकारी योजना पोर्टल",
        navEligibility: "पात्रता जांचें",
        heroTitle: "सार्वजनिक योजनाओं की खोज करें",
        heroSubtitle: "सरलीकृत मापदंडों, आवश्यक दस्तावेजों की सूची और आधिकारिक सरकारी पोर्टलों तक सीधे पहुंच प्राप्त करें।",
        btnSearch: "खोजें",
        statTotal: "कुल अनुक्रमित",
        statCentral: "केंद्रीय योजनाएं",
        statState: "राज्य प्रबंधित",
        filterHeading: "फ़िल्टर निर्देशिका",
        lblOrigin: "प्रशासनिक दायरा",
        lblState: "विशिष्ट राज्य क्षेत्र",
        lblCat: "लक्षित क्षेत्र",
        btnDetails: "सुरक्षा विवरण देखें",
        badgeOfficial: "सत्यापित सरकारी लिंक",
        modalTitle: "सुरक्षा रूटिंग इंटरसेप्ट",
        modalCountdown: "5 सेकंड में स्वतः रीडायरेक्ट..."
    }
};

/**
 * Platform Architectural Core State Engine Instance
 */
class PortalStateEngine {
    constructor() {
        this.currentLang = localStorage.getItem('user-pref-lang') || 'en';
        this.currentTheme = localStorage.getItem('user-pref-theme') || 'light';
        this.activeFilters = { q: '', origin: '', stateId: '', category: '' };
        this.modalTimer = null;
    }

    initialize() {
        this.applyThemeState();
        this.hydrateDOMSelectors();
        this.bindEvents();
        this.renderCatalog();
        this.computeCounters();
    }

    applyThemeState() {
        if (this.currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    hydrateDOMSelectors() {
        const stateSelects = [document.getElementById('filter-state'), document.getElementById('elig-state')];
        stateSelects.forEach(select => {
            if (!select) return;
            DATA_INDIAN_STATES.forEach(st => {
                const opt = document.createElement('option');
                opt.value = st.id;
                opt.textContent = this.currentLang === 'en' ? st.nameEn : st.nameHi;
                select.appendChild(opt);
            });
        });

        const langSelect = document.getElementById('lang-select');
        if (langSelect) langSelect.value = this.currentLang;
    }

    bindEvents() {
        // Theme toggle action
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('user-pref-theme', this.currentTheme);
            this.applyThemeState();
        });

        // Language toggle event listener
        document.getElementById('lang-select')?.addEventListener('change', (e) => {
            this.currentLang = e.target.value;
            localStorage.setItem('user-pref-lang', this.currentLang);
            this.localizeUINodes();
            this.renderCatalog();
        });

        // Filter event listeners
        document.querySelectorAll('.origin-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.origin-btn').forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
                if (this.activeFilters.origin === e.target.dataset.origin) {
                    this.activeFilters.origin = '';
                } else {
                    this.activeFilters.origin = e.target.dataset.origin;
                    e.target.classList.add('bg-indigo-600', 'text-white');
                }
                this.renderCatalog();
            });
        });

        document.getElementById('filter-state')?.addEventListener('change', (e) => {
            this.activeFilters.stateId = e.target.value;
            this.renderCatalog();
        });

        document.getElementById('filter-category')?.addEventListener('change', (e) => {
            this.activeFilters.category = e.target.value;
            this.renderCatalog();
        });

        document.getElementById('search-trigger')?.addEventListener('click', () => {
            this.activeFilters.q = document.getElementById('global-search').value.toLowerCase().trim();
            this.renderCatalog();
        });

        document.getElementById('filter-reset')?.addEventListener('click', () => {
            this.activeFilters = { q: '', origin: '', stateId: '', category: '' };
            const stateFilter = document.getElementById('filter-state');
            const catFilter = document.getElementById('filter-category');
            const searchInput = document.getElementById('global-search');
            if (stateFilter) stateFilter.value = '';
            if (catFilter) catFilter.value = '';
            if (searchInput) searchInput.value = '';
            document.querySelectorAll('.origin-btn').forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
            this.renderCatalog();
        });

        // Eligibility computation listener
        document.getElementById('eligibility-form')?.addEventListener('submit', (e) => this.handleEligibilityEvaluation(e));

        // Modal dismissal action
        document.getElementById('modal-cancel')?.addEventListener('click', () => this.terminateRedirectSequence());
    }

    localizeUINodes() {
        const dictionary = LOCALIZATION_DICTIONARY[this.currentLang];
        Object.keys(dictionary).forEach(key => {
            const node = document.getElementById(this.camelToKebab(key));
            if (node) {
                if (node.tagName === 'INPUT') {
                    node.placeholder = dictionary[key];
                } else {
                    node.textContent = dictionary[key];
                }
            }
        });
    }

    computeCounters() {
        const total = DATA_SCHEMES_INDEX.length;
        const central = DATA_SCHEMES_INDEX.filter(s => s.origin === 'CENTRAL').length;
        const state = total - central;

        if (document.getElementById('count-total')) {
            document.getElementById('count-total').textContent = total;
            document.getElementById('count-central').textContent = central;
            document.getElementById('count-state').textContent = state;
        }
    }

    renderCatalog() {
        const container = document.getElementById('schemes-container');
        if (!container) return;

        const subset = DATA_SCHEMES_INDEX.filter(item => {
            if (this.activeFilters.origin && item.origin !== this.activeFilters.origin) return false;
            if (this.activeFilters.stateId && item.stateId !== this.activeFilters.stateId) return false;
            if (this.activeFilters.category && item.category !== this.activeFilters.category) return false;
            if (this.activeFilters.q) {
                const matchesText = item.nameEn.toLowerCase().includes(this.activeFilters.q) || 
                                    item.nameHi.includes(this.activeFilters.q) || 
                                    item.ministryEn.toLowerCase().includes(this.activeFilters.q);
                if (!matchesText) return false;
            }
            return true;
        });

        const metaText = document.getElementById('results-meta');
        if (metaText) metaText.textContent = `Showing ${subset.length} verified structural configurations matching parameters`;

        container.innerHTML = subset.map(sch => this.generateSchemeCardMarkup(sch)).join('');
    }

    generateSchemeCardMarkup(sch) {
        const title = this.currentLang === 'en' ? sch.nameEn : sch.nameHi;
        const description = this.currentLang === 'en' ? sch.descriptionEn : sch.descriptionHi;
        const labelOfficial = LOCALIZATION_DICTIONARY[this.currentLang].badgeOfficial;
        const labelDetails = LOCALIZATION_DICTIONARY[this.currentLang].btnDetails;

        return `
            <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <span class="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-500">${sch.origin}</span>
                        <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded flex items-center gap-1">
                            🛡️ ${labelOfficial}
                        </span>
                    </div>
                    <h4 class="font-bold text-lg text-slate-900 dark:text-white mb-2 leading-snug">${title}</h4>
                    <p class="text-xs text-slate-400 font-medium mb-4">${sch.ministryEn}</p>
                    <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-6">${description}</p>
                </div>
                <div class="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-4">
                    <span class="text-xs font-mono text-slate-400">ID: ${sch.id}</span>
                    <button onclick="globalEngineInstance.triggerSecureRedirect('${sch.officialUrl}')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all">
                        ${labelDetails} →
                    </button>
                </div>
            </div>
        `;
    }

    handleEligibilityEvaluation(e) {
        e.preventDefault();
        const age = parseInt(document.getElementById('elig-age').value) || null;
        const gender = document.getElementById('elig-gender').value;
        const state = document.getElementById('elig-state').value;
        const income = parseFloat(document.getElementById('elig-income').value) || null;
        const pwd = document.getElementById('elig-pwd').checked;

        const filtered = DATA_SCHEMES_INDEX.filter(sch => {
            if (age && sch.minAge && age < sch.minAge) return false;
            if (age && sch.maxAge && age > sch.maxAge) return false;
            if (gender !== 'ALL' && !sch.genders.includes('ALL') && !sch.genders.includes(gender)) return false;
            if (state && sch.stateId && sch.stateId !== state) return false;
            if (income && sch.incomeLimit && income > sch.incomeLimit) return false;
            if (sch.isDisabledRequired && sch.isDisabledRequired !== pwd) return false;
            return true;
        });

        const resultsContainer = document.getElementById('eligibility-results');
        const cardsContainer = document.getElementById('elig-schemes-container');
        
        if (!resultsContainer || !cardsContainer) return;

        cardsContainer.innerHTML = filtered.map(sch => this.generateSchemeCardMarkup(sch)).join('');
        resultsContainer.classList.remove('hidden');
        
        if (filtered.length === 0) {
            cardsContainer.innerHTML = `<p class="col-span-full text-center text-sm text-slate-400 py-6">No matching parameters tracked in local simulation database.</p>`;
        }
    }

    /**
     * Intercept validation handler enforcing secure routing controls (.gov.in / .nic.in verification checks)
     */
    triggerSecureRedirect(destinationUrl) {
        const modal = document.getElementById('redirect-modal');
        const modalBox = document.getElementById('modal-box');
        const targetLabel = document.getElementById('modal-target-url');
        const countdownLabel = document.getElementById('modal-countdown');
        const proceedBtn = document.getElementById('modal-proceed');

        if (!modal || !targetLabel) return;

        // Domain Validation Security Sandbox Execution Check
        const urlObj = new URL(destinationUrl);
        const isValidGovDomain = urlObj.hostname.endsWith('.gov.in') || urlObj.hostname.endsWith('.nic.in');

        targetLabel.textContent = destinationUrl;
        proceedBtn.href = destinationUrl;
        
        modal.classList.remove('invisible', 'opacity-0');
        modalBox.classList.remove('scale-95');
        
        if (!isValidGovDomain) {
            targetLabel.className = "my-4 rounded-xl bg-red-50 border border-red-100 p-3 font-mono text-xs text-red-600 dark:bg-red-950/40 dark:text-red-400 break-all";
            countdownLabel.textContent = "Security Notice: This target path is blocked.";
            proceedBtn.classList.add('hidden');
            return;
        }

        // Standard countdown routine
        let timeRemaining = 5;
        countdownLabel.textContent = this.currentLang === 'en' ? `Auto-navigating in ${timeRemaining} seconds...` : `${timeRemaining} सेकंड में स्वतः रीडायरेक्ट...`;
        
        this.modalTimer = setInterval(() => {
            timeRemaining--;
            countdownLabel.textContent = this.currentLang === 'en' ? `Auto-navigating in ${timeRemaining} seconds...` : `${timeRemaining} सेकंड में स्वतः रीडायरेक्ट...`;
            
            if (timeRemaining <= 0) {
                this.terminateRedirectSequence();
                window.open(destinationUrl, '_blank', 'noopener,noreferrer');
            }
        }, 1000);
    }

    terminateRedirectSequence() {
        clearInterval(this.modalTimer);
        const modal = document.getElementById('redirect-modal');
        const modalBox = document.getElementById('modal-box');
        if (modal) {
            modal.classList.add('invisible', 'opacity-0');
            modalBox.classList.add('scale-95');
        }
    }

    camelToKebab(str) {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }
}

// Global Orchestration Initialization Lifecycle Hook
const globalEngineInstance = new PortalStateEngine();
document.addEventListener('DOMContentLoaded', () => globalEngineInstance.initialize());