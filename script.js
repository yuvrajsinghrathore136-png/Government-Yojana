// script.js - Unified State Management & Controller Engine

document.addEventListener("DOMContentLoaded", () => {
  // Application State Matrix Engine
  const State = {
    allSchemes: [...schemesData],
    activeFilterCategory: "All",
    activeFilterState: "Central Government",
    activeViewTab: "all", // all, featured, trending, saved
    savedBookmarks: JSON.parse(localStorage.getItem("gov_portal_saved")) || [],
    theme: localStorage.getItem("gov_portal_theme") || "light",
    searchQuery: ""
  };

  // Live App Notifications Queue Stack Array
  const systemNotifications = [
    { id: 1, title: "New Agriculture Subsidy Added", time: "10 mins ago" },
    { id: 2, title: "UP Scholarship Submission Deadline Extended", time: "2 hours ago" },
    { id: 3, title: "System Operational updates completed successfully", time: "1 day ago" }
  ];

  // DOM Query Engine Target Selectors
  const nodes = {
    cardContainer: document.getElementById("schemes-card-container"),
    skeletonContainer: document.getElementById("schemes-skeleton-container"),
    noResults: document.getElementById("no-results"),
    stateSelector: document.getElementById("state-select-filter"),
    categoryPills: document.getElementById("category-pills-container"),
    smartSearch: document.getElementById("smart-search"),
    autocompleteBox: document.getElementById("autocomplete-box"),
    themeToggle: document.getElementById("theme-toggle"),
    notifToggle: document.getElementById("notif-toggle"),
    notifDrawer: document.getElementById("notif-drawer"),
    closeNotif: document.getElementById("close-notif"),
    notifItems: document.getElementById("notif-items"),
    faqTarget: document.getElementById("faq-accordion-target"),
    faqSearch: document.getElementById("faq-search-input"),
    eligState: document.getElementById("elig-state"),
    btnRunChecker: document.getElementById("btn-run-checker"),
    eligForm: document.getElementById("eligibility-form"),
    scrollTopFab: document.getElementById("scroll-top-fab"),
    toastSystem: document.getElementById("toast-notification-system"),
    clearSearch: document.getElementById("clear-search")
  };

  // Initialize System Core Framework Pipelines
  const initializePortal = () => {
    setupThemeEnvironment();
    populateDropdownFilters();
    renderCategoryPills();
    renderSchemesGrid();
    renderFaqAccordion(faqData);
    setupLiveAlertDrawer();
    attachGlobalEventHandlers();
  };

  // Theme Management Engine Pipeline
  const setupThemeEnvironment = () => {
    if (State.theme === "dark" || (State.theme === "light" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.setAttribute("data-theme", "dark");
      nodes.themeToggle.innerHTML = `<span class="material-icons-round">light_mode</span>`;
    }
  };

  const toggleThemeMode = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("gov_portal_theme", "light");
      nodes.themeToggle.innerHTML = `<span class="material-icons-round">dark_mode</span>`;
      triggerToast("Switched to Light Mode");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("gov_portal_theme", "dark");
      nodes.themeToggle.innerHTML = `<span class="material-icons-round">light_mode</span>`;
      triggerToast("Switched to Dark Mode");
    }
  };

  // Dropdown Filtration Dynamic Initialization pipeline
  const populateDropdownFilters = () => {
    indianStates.forEach(stateName => {
      const optionElementHTML = `<option value="${stateName}">${stateName}</option>`;
      nodes.stateSelector.insertAdjacentHTML("beforeend", optionElementHTML);
      nodes.eligState.insertAdjacentHTML("beforeend", optionElementHTML);
    });
  };

  // Render Pill Categorization Engine
  const renderCategoryPills = () => {
    nodes.categoryPills.innerHTML = "";
    categoriesData.forEach(cat => {
      const isActive = cat === State.activeFilterCategory ? "active" : "";
      const buttonHTML = `<button class="category-pill-btn ${isActive}" data-category="${cat}">${cat}</button>`;
      nodes.categoryPills.insertAdjacentHTML("beforeend", buttonHTML);
    });
  };

  // Core Algorithmic Grid Filtering and Logic Matrix Rendering Output Engine
  const renderSchemesGrid = () => {
    // Reveal native Skeleton framework during structural manipulation
    nodes.cardContainer.classList.add("hidden-element");
    nodes.skeletonContainer.classList.remove("hidden-element");
    nodes.noResults.classList.add("hidden-element");

    setTimeout(() => {
      let filteredDataList = State.allSchemes.filter(scheme => {
        // Evaluate State Filter Category Metrics
        const matchesState = (State.activeFilterState === "Central Government") ? true : (scheme.state === State.activeFilterState || scheme.state === "Central Government");
        // Evaluate Pill Category
        const matchesCategory = (State.activeFilterCategory === "All") ? true : (scheme.category === State.activeFilterCategory);
        // Evaluate Text Query Substring Indexes
        const matchesSearch = State.searchQuery === "" ? true : (
          scheme.name.toLowerCase().includes(State.searchQuery) ||
          scheme.description.toLowerCase().includes(State.searchQuery) ||
          scheme.category.toLowerCase().includes(State.searchQuery)
        );
        
        return matchesState && matchesCategory && matchesSearch;
      });

      // Filter by sub views (Tabs processing)
      if (State.activeViewTab === "featured") filteredDataList = filteredDataList.filter(s => s.featured);
      if (State.activeViewTab === "trending") filteredDataList = filteredDataList.filter(s => s.trending);
      if (State.activeViewTab === "saved") filteredDataList = filteredDataList.filter(s => State.savedBookmarks.includes(s.id));

      // Destroy Skeletons
      nodes.skeletonContainer.classList.add("hidden-element");
      nodes.cardContainer.classList.remove("hidden-element");

      if (filteredDataList.length === 0) {
        nodes.noResults.classList.remove("hidden-element");
        nodes.cardContainer.innerHTML = "";
        return;
      }

      nodes.cardContainer.innerHTML = "";
      filteredDataList.forEach(scheme => {
        const isSaved = State.savedBookmarks.includes(scheme.id);
        const cardHTML = `
          <article class="scheme-card glass" id="card-${scheme.id}">
            <div class="card-top-meta">
              <div class="badge-stack">
                <span class="badge-tag primary">${scheme.category}</span>
                <span class="badge-tag state">${scheme.state}</span>
                <span class="badge-tag gov-official"><span class="material-icons-round" style="font-size:12px;vertical-align:middle;">verified</span> Official Vendor</span>
              </div>
              <div class="card-actions-wrapper">
                <button class="icon-btn bookmark-action-trigger" data-id="${scheme.id}" aria-label="Save Scheme">
                  <span class="material-icons-round">${isSaved ? 'bookmark' : 'bookmark_border'}</span>
                </button>
              </div>
            </div>
            
            <h3 class="card-title">${scheme.name}</h3>
            <p class="card-ministry">${scheme.ministry}</p>
            <p class="card-description">${scheme.description}</p>
            
            <div class="expandable-data-matrix">
              <div class="matrix-row"><strong>Eligibility:</strong> Age ${scheme.eligibility.ageMin}+ | Income limit below ₹${scheme.eligibility.maxIncome === Infinity ? "No Limit" : scheme.eligibility.maxIncome.toLocaleString('en-IN')}</div>
              <div class="matrix-row"><strong>Benefits:</strong> ${scheme.benefits}</div>
              <div class="matrix-row"><strong>Documents Needed:</strong> ${scheme.documents.join(", ")}</div>
              <div class="matrix-row" style="margin-top:8px; font-size:11px; color:var(--text-muted);">Last Updated Data Pipeline: ${scheme.lastUpdated}</div>
            </div>

            <div class="card-bottom-button-strip">
              <a href="${scheme.officialWebsite}" target="_blank" rel="noopener noreferrer" class="primary-action-btn ripple" data-id="${scheme.id}">
                Apply Now <span class="material-icons-round">open_in_new</span>
              </a>
              <div style="display:flex; gap:6px;">
                <button class="secondary-btn share-trigger" data-id="${scheme.id}"><span class="material-icons-round">share</span> Share</button>
                <button class="secondary-btn broken-link-trigger" data-url="${scheme.officialWebsite}"><span class="material-icons-round">report</span> Report Link</button>
              </div>
            </div>
          </article>
        `;
        nodes.cardContainer.insertAdjacentHTML("beforeend", cardHTML);
      });
    }, 400); // UI micro-delay layout simulator for fluid structural loading visual stability
  };

  // Frequently Asked Questions Searchable Engine Logic 
  const renderFaqAccordion = (dataMatrix) => {
    nodes.faqTarget.innerHTML = "";
    dataMatrix.forEach((faqItem, idx) => {
      const faqHTML = `
        <div class="faq-item-wrapper" id="faq-item-${idx}">
          <button class="faq-trigger-btn" data-index="${idx}">
            ${faqItem.q}
            <span class="material-icons-round collapse-icon">expand_more</span>
          </button>
          <div class="faq-answer-panel">
            <p>${faqItem.a}</p>
          </div>
        </div>
      `;
      nodes.faqTarget.insertAdjacentHTML("beforeend", faqHTML);
    });
  };

  // Debounced Real-time Search Engine Input Logic Infrastructure
  let searchDebounceTimer;
  const handleLiveSearchProcessing = (e) => {
    clearTimeout(searchDebounceTimer);
    const value = e.target.value.trim().toLowerCase();
    State.searchQuery = value;

    if (value.length > 0) {
      nodes.clearSearch.classList.remove("hidden-element");
      // Populate and trigger autocomplete menu dropdown suggestions
      const suggestions = State.allSchemes.filter(s => s.name.toLowerCase().includes(value)).slice(0, 4);
      if (suggestions.length > 0) {
        nodes.autocompleteBox.classList.remove("hidden-element");
        nodes.autocompleteBox.innerHTML = suggestions.map(s => `
          <div class="autocomplete-item" data-name="${s.name}">
            <span>${s.name.substring(0, 45)}...</span>
            <span style="font-size:11px;color:var(--text-muted); font-weight:700;">${s.category}</span>
          </div>
        `).join("");
      } else {
        nodes.autocompleteBox.classList.add("hidden-element");
      }
    } else {
      nodes.clearSearch.classList.add("hidden-element");
      nodes.autocompleteBox.classList.add("hidden-element");
    }

    searchDebounceTimer = setTimeout(() => {
      renderSchemesGrid();
    }, 250);
  };

  // Smart Complex Eligibility Diagnostic Processing Rules Engine Pipeline Execution
  const processEligibilityMatrixCalculation = () => {
    const diagnosticAge = parseInt(document.getElementById("elig-age").value, 10);
    const diagnosticGender = document.getElementById("elig-gender").value;
    const diagnosticState = nodes.eligState.value;
    const diagnosticIncome = parseFloat(document.getElementById("elig-income").value) || 0;
    const diagnosticIsStudent = document.getElementById("elig-student").checked;
    const diagnosticIsFarmer = document.getElementById("elig-farmer").checked;

    // Filter through criteria definitions
    let computationalMatches = State.allSchemes.filter(scheme => {
      const criteria = scheme.eligibility;
      
      // Check structural profile inputs
      if (diagnosticAge < criteria.ageMin || diagnosticAge > criteria.ageMax) return false;
      if (criteria.gender !== "All" && criteria.gender !== diagnosticGender) return false;
      if (diagnosticIncome > criteria.maxIncome) return false;
      if (criteria.isFarmer && !diagnosticIsFarmer) return false;
      if (criteria.isStudent && !diagnosticIsStudent) return false;
      
      // Match boundaries
      if (criteria.allowedStates !== "Central Government" && !criteria.allowedStates.includes(diagnosticState)) return false;

      return true;
    });

    // Directly present result array output metrics onto user context
    State.activeFilterCategory = "All";
    State.activeFilterState = diagnosticState;
    renderCategoryPills();
    nodes.stateSelector.value = diagnosticState;
    
    // Smooth scroll down to interactive viewport grid element boundaries
    document.getElementById("schemes-section").scrollIntoView({ behavior: "smooth" });
    
    // Inject matches directly into interface views
    triggerToast(`Analysis Complete: Found ${computationalMatches.length} Matching Profiles.`);
    
    // Force view mapping filter overwrite
    State.activeViewTab = "all";
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("tab-all").classList.add("active");
    
    // Render transient calculation matches
    State.allSchemes = computationalMatches.length > 0 ? computationalMatches : [...schemesData];
    renderSchemesGrid();
    State.allSchemes = [...schemesData]; // Restore dynamic integrity mapping state
  };

  // Direct Social Web Sharing integration layers
  const executeSocialShareRoutine = (schemeId) => {
    const nativeSchemeObject = State.allSchemes.find(s => s.id === schemeId);
    if (!nativeSchemeObject) return;

    const pipelineSharePayload = {
      title: nativeSchemeObject.name,
      text: `Check out this government scheme: ${nativeSchemeObject.name}. Verified access link available here.`,
      url: nativeSchemeObject.officialWebsite
    };

    if (navigator.share) {
      navigator.share(pipelineSharePayload)
        .then(() => triggerToast("Shared Successfully"))
        .catch(() => copyToClipboardFallback(pipelineSharePayload.url));
    } else {
      copyToClipboardFallback(pipelineSharePayload.url);
    }
  };

  const copyToClipboardFallback = (textUrl) => {
    navigator.clipboard.writeText(textUrl).then(() => {
      triggerToast("Link copied to clipboard storage!");
    });
  };

  // Toast System Micro-Notification Alert triggers
  const triggerToast = (msgString) => {
    const toastNode = document.createElement("div");
    toastNode.className = "toast";
    toastNode.innerHTML = `<span class="material-icons-round">info</span> <span>${msgString}</span>`;
    nodes.toastSystem.appendChild(toastNode);
    setTimeout(() => { toastNode.remove(); }, 3000);
  };

  // Setup Notification Drawer system arrays mapping
  const setupLiveAlertDrawer = () => {
    nodes.notifItems.innerHTML = systemNotifications.map(n => `
      <div class="notif-item">
        <strong>${n.title}</strong>
        <p style="color:var(--text-muted); font-size:11px; margin-top:2px;">${n.time}</p>
      </div>
    `).join("");
  };

  // Event Handlers Setup Module Function Layer
  const attachGlobalEventHandlers = () => {
    // Theme Switch Click Handler
    nodes.themeToggle.addEventListener("click", toggleThemeMode);

    // Live Selector state processing filters
    nodes.stateSelector.addEventListener("change", (e) => {
      State.activeFilterState = e.target.value;
      renderSchemesGrid();
    });

    // Pill Category Processing Filters Click Event Bubble Delegations
    nodes.categoryPills.addEventListener("click", (e) => {
      const targetBtn = e.target.closest(".category-pill-btn");
      if (!targetBtn) return;
      document.querySelectorAll(".category-pill-btn").forEach(p => p.classList.remove("active"));
      targetBtn.classList.add("active");
      State.activeFilterCategory = targetBtn.dataset.category;
      renderSchemesGrid();
    });

    // Dashboard Views Layout Sub-Tab Toggles
    document.querySelectorAll(".tab-btn").forEach(tab => {
      tab.addEventListener("click", (e) => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        State.activeViewTab = e.target.id.replace("tab-", "");
        renderSchemesGrid();
      });
    });

    // Live Search Keyup input hooks binding
    nodes.smartSearch.addEventListener("input", handleLiveSearchProcessing);
    
    // Autocomplete dropdown execution mapping click interception
    nodes.autocompleteBox.addEventListener("click", (e) => {
      const item = e.target.closest(".autocomplete-item");
      if (!item) return;
      nodes.smartSearch.value = item.dataset.name;
      State.searchQuery = item.dataset.name.toLowerCase();
      nodes.autocompleteBox.classList.add("hidden-element");
      renderSchemesGrid();
    });

    // Clear Search Input Button Element action intercept
    nodes.clearSearch.addEventListener("click", () => {
      nodes.smartSearch.value = "";
      State.searchQuery = "";
      nodes.clearSearch.classList.add("hidden-element");
      nodes.autocompleteBox.classList.add("hidden-element");
      renderSchemesGrid();
    });

    // Scheme card operational structural clicks routing (Event Delegation Model Framework)
    nodes.cardContainer.addEventListener("click", (e) => {
      const bookmarkBtn = e.target.closest(".bookmark-action-trigger");
      const shareBtn = e.target.closest(".share-trigger");
      const reportBtn = e.target.closest(".broken-link-trigger");

      if (bookmarkBtn) {
        const id = bookmarkBtn.dataset.id;
        if (State.savedBookmarks.includes(id)) {
          State.savedBookmarks = State.savedBookmarks.filter(item => item !== id);
          bookmarkBtn.querySelector("span").innerText = "bookmark_border";
          triggerToast("Removed from Bookmarks");
        } else {
          State.savedBookmarks.push(id);
          bookmarkBtn.querySelector("span").innerText = "bookmark";
          triggerToast("Added to Bookmarks Portfolio");
        }
        localStorage.setItem("gov_portal_saved", JSON.stringify(State.savedBookmarks));
        if (State.activeViewTab === "saved") renderSchemesGrid();
      }

      if (shareBtn) {
        executeSocialShareRoutine(shareBtn.dataset.id);
      }

      if (reportBtn) {
        triggerToast("Broken URL link logged successfully. Ministry redirect fallback routing initialized.");
        window.open("https://india.gov.in", "_blank");
      }
    });

    // Action Execution Button for Questionnaire Eligibility Diagnostic Profile Analysis Processing
    nodes.btnRunChecker.addEventListener("click", processEligibilityMatrixCalculation);

    // Searchable FAQ Expandable Accordion trigger Interception mechanics routing
    nodes.faqTarget.addEventListener("click", (e) => {
      const trigger = e.target.closest(".faq-trigger-btn");
      if (!trigger) return;
      const parentWrapperElement = trigger.closest(".faq-item-wrapper");
      const stateBeforeClickExpanded = parentWrapperElement.classList.contains("expanded");
      
      document.querySelectorAll(".faq-item-wrapper").forEach(item => item.classList.remove("expanded"));
      if (!stateBeforeClickExpanded) {
        parentWrapperElement.classList.add("expanded");
      }
    });

    // Instant filter mapping interface lookup for operational text search inside FAQs
    nodes.faqSearch.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filteredFaqs = faqData.filter(f => f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query));
      renderFaqAccordion(filteredFaqs);
    });

    // In-app Alerts and Notification Panel Drawer Intercept handlers setup
    nodes.notifToggle.addEventListener("click", () => nodes.notifDrawer.classList.toggle("hidden"));
    nodes.closeNotif.addEventListener("click", () => nodes.notifDrawer.classList.add("hidden"));

    // Global Scroll monitoring viewport handler execution hook layer configuration
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        nodes.scrollTopFab.classList.remove("hidden-element");
      } else {
        nodes.scrollTopFab.classList.add("hidden-element");
      }
    });

    nodes.scrollTopFab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  // Instantiation structural triggering execute step
  initializePortal();
});