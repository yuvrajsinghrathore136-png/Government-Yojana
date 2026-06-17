// data.js - Comprehensive Schemes Dataset
const schemesData = [
  {
    id: "PM-KISAN-001",
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    category: "Agriculture",
    state: "Central Government",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    description: "An initiative by the government of India that provides up to ₹6,000 per year in three equal installments to all small and marginal farmers.",
    eligibility: {
      ageMin: 18,
      ageMax: 100,
      gender: "All",
      isFarmer: true,
      isStudent: false,
      maxIncome: Infinity,
      allowedStates: ["Central Government"]
    },
    benefits: "₹6,000 per annum directly transferred to bank accounts in 3 tranches.",
    documents: ["Aadhaar Card", "Land Holding Papers", "Bank Account Details", "Citizenship Certificate"],
    officialWebsite: "https://pmkisan.gov.in",
    lastUpdated: "2026-05-10",
    tags: ["farmers", "agriculture", "income support", "central"],
    trending: true,
    featured: true
  },
  {
    id: "PM-AWAS-002",
    name: "Pradhan Mantri Awas Yojana (PMAY-U)",
    category: "Housing",
    state: "Central Government",
    ministry: "Ministry of Housing and Urban Affairs",
    description: "Provides affordable housing to the urban poor with a target of building 2 crore affordable houses by providing interest subsidies.",
    eligibility: {
      ageMin: 18,
      ageMax: 70,
      gender: "All",
      isFarmer: false,
      isStudent: false,
      maxIncome: 1800000,
      allowedStates: ["Central Government"]
    },
    benefits: "Interest subsidy up to 6.5% on home loans for EWS, LIG, and MIG categories.",
    documents: ["Aadhaar Card", "Income Certificate", "Identity Proof", "Property Valuation Documents"],
    officialWebsite: "https://pmaymis.gov.in",
    lastUpdated: "2026-06-01",
    tags: ["housing", "urban", "subsidy", "central"],
    trending: true,
    featured: false
  },
  {
    id: "MAHA-JYOTI-003",
    name: "Jyotirao Phule Shetkari Karjmukti Yojna",
    category: "Agriculture",
    state: "Maharashtra",
    ministry: "Department of Agriculture, Maharashtra",
    description: "Crop loan waiver scheme for distressed farmers in Maharashtra providing relief up to ₹2 Lakhs.",
    eligibility: {
      ageMin: 18,
      ageMax: 90,
      gender: "All",
      isFarmer: true,
      isStudent: false,
      maxIncome: Infinity,
      allowedStates: ["Maharashtra"]
    },
    benefits: "Loan waiver up to ₹2,00,000 for short-term crop loans.",
    documents: ["Aadhaar Card", "Loan Passbook", "7/12 Extract", "Voter ID"],
    officialWebsite: "https://mjpsky.maharashtra.gov.in",
    lastUpdated: "2026-04-15",
    tags: ["maharashtra", "farmers", "loan waiver", "state"],
    trending: false,
    featured: true
  },
  {
    id: "UP-SCHOLAR-004",
    name: "UP Post Matric Scholarship",
    category: "Scholarships",
    state: "Uttar Pradesh",
    ministry: "Social Welfare Department, Uttar Pradesh",
    description: "Financial assistance for Gen, OBC, SC, ST, and Minority students pursuing higher education.",
    eligibility: {
      ageMin: 15,
      ageMax: 30,
      gender: "All",
      isFarmer: false,
      isStudent: true,
      maxIncome: 250000,
      allowedStates: ["Uttar Pradesh"]
    },
    benefits: "Complete tuition fee reimbursement and monthly maintenance allowance.",
    documents: ["Income Certificate", "Caste Certificate", "Marksheets", "Fee Receipt", "Aadhaar Card"],
    officialWebsite: "https://scholarship.up.gov.in",
    lastUpdated: "2026-06-12",
    tags: ["uttar pradesh", "students", "scholarships", "education"],
    trending: true,
    featured: true
  },
  {
    id: "KA-GRY-005",
    name: "Gruha Lakshmi Scheme",
    category: "Women",
    state: "Karnataka",
    ministry: "Women and Child Development, Karnataka",
    description: "Financial empowerment program providing monthly assistance to the woman head of households.",
    eligibility: {
      ageMin: 18,
      ageMax: 100,
      gender: "Female",
      isFarmer: false,
      isStudent: false,
      maxIncome: Infinity,
      allowedStates: ["Karnataka"]
    },
    benefits: "Direct Benefit Transfer of ₹2,000 every month to eligible women heads.",
    documents: ["Aadhaar Card of Self & Husband", "Ration Card", "Bank Account Linked with Aadhaar"],
    officialWebsite: "https://sevasindhugs.karnataka.gov.in",
    lastUpdated: "2026-06-14",
    tags: ["karnataka", "women", "welfare", "financial aid"],
    trending: true,
    featured: true
  }
];

const faqData = [
  {
    q: "How do I know if I am eligible for a particular scheme?",
    a: "You can use our interactive 'Smart Eligibility Checker' on the homepage. Enter your age, occupation, income, and location parameters to instantly view matching schemes."
  },
  {
    q: "Are the links provided here safe and secure?",
    a: "Yes. This portal strictly displays and forwards users directly to official government domains terminating in '.gov.in' or '.nic.in'."
  },
  {
    q: "What should I do if an official application link fails?",
    a: "Every scheme card contains a 'Report Broken Link' button. Clicking it instantly alerts our system, and we provide you with options to navigate to the fallback root ministry portal."
  }
];

const indianStates = [
  "Central Government", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry"
];

const categoriesData = [
  "All", "Students", "Farmers", "Women", "Senior Citizens", "Education", "Housing", "Scholarships", "Agriculture", "Business"
];