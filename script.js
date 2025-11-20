// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Form Submission
const form = document.getElementById('tailorForm');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will contact you shortly.');
        form.reset();
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if(nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Dark Mode Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeIcon = darkModeToggle.querySelector('i');
    const themeText = darkModeToggle.querySelector('.theme-text');
    
    // Check for saved theme preference or prefer OS setting
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark Mode';
    }
    
    // Toggle theme when button is clicked
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
        }
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'Light Mode';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'Dark Mode';
            }
        }
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');

// Sample search data
const searchData = [
    { title: 'Custom Shirts', category: 'Gents Wear', link: '#services' },
    { title: 'Tailored Pants', category: 'Gents Wear', link: '#services' },
    { title: 'Kurta Pajamas', category: 'Traditional Wear', link: '#services' },
    { title: 'School Uniforms', category: 'School & Job Dresses', link: '#services' },
    { title: 'Lakhani Shirts', category: 'Premium Collection', link: '#services' },
    { title: 'Shirt Alterations', category: 'Alterations & Fitting', link: '#services' },
    { title: 'Pant Fitting', category: 'Alterations & Fitting', link: '#services' },
    { title: 'Waist Fitting', category: 'Custom Fitting', link: '#services' },
    { title: 'Narrow Pants', category: 'Custom Fitting', link: '#services' },
    { title: 'Job Uniforms', category: 'School & Job Dresses', link: '#services' }
];

// Search function
function performSearch(query) {
    if (!query.trim()) {
        searchResults.style.display = 'none';
        return;
    }

    const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );

    displaySearchResults(filteredResults);
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = 'search-result-item';
        noResult.textContent = 'No results found';
        searchResults.appendChild(noResult);
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <strong>${result.title}</strong>
                <div style="font-size: 0.8rem; opacity: 0.7;">${result.category}</div>
            `;
            resultItem.addEventListener('click', () => {
                window.location.href = result.link;
                searchResults.style.display = 'none';
                searchInput.value = '';
            });
            searchResults.appendChild(resultItem);
        });
    }
    
    searchResults.style.display = 'block';
}

// Search event listeners
searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
});

searchBtn.addEventListener('click', () => {
    performSearch(searchInput.value);
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

// Language Converter
const languageSelect = document.getElementById('languageSelect');

// Language translations
const translations = {
    en: {
        // Navigation
        home: "Home",
        services: "Services",
        about: "About",
        process: "Process",
        gallery: "Gallery",
        contact: "Contact",
        
        // Hero Section
        heroTitle: "Premium Custom Tailoring for Men & Kids",
        heroSubtitle: "With over 17 years of experience in creating exceptional custom clothing.",
        heroButton: "Book a Consultation",
        
        // Services
        servicesTitle: "Our Services",
        servicesSubtitle: "We offer a wide range of tailoring services to meet your specific needs and preferences.",
        
        // Search
        searchPlaceholder: "Search services...",
        
        // Profile
        profile: "Profile",
        myAccount: "My Account",
        favorites: "Favorites",
        orderHistory: "Order History",
        settings: "Settings",
        logout: "Logout"
    },
    hi: {
        // Navigation
        home: "होम",
        services: "सेवाएं",
        about: "हमारे बारे में",
        process: "प्रक्रिया",
        gallery: "गैलरी",
        contact: "संपर्क",
        
        // Hero Section
        heroTitle: "पुरुषों और बच्चों के लिए प्रीमियम कस्टम टेलरिंग",
        heroSubtitle: "असाधारण कस्टम कपड़े बनाने में 17 से अधिक वर्षों का अनुभव।",
        heroButton: "परामर्श बुक करें",
        
        // Services
        servicesTitle: "हमारी सेवाएं",
        servicesSubtitle: "हम आपकी विशिष्ट आवश्यकताओं और प्राथमिकताओं को पूरा करने के लिए टेलरिंग सेवाओं की एक विस्तृत श्रृंखला प्रदान करते हैं।",
        
        // Search
        searchPlaceholder: "सेवाएं खोजें...",
        
        // Profile
        profile: "प्रोफाइल",
        myAccount: "मेरा खाता",
        favorites: "पसंदीदा",
        orderHistory: "आदेश इतिहास",
        settings: "सेटिंग्स",
        logout: "लॉगआउट"
    },
    pa: {
        // Navigation
        home: "ਹੋਮ",
        services: "ਸੇਵਾਵਾਂ",
        about: "ਸਾਡੇ ਬਾਰੇ",
        process: "ਪ੍ਰਕਿਰਿਆ",
        gallery: "ਗੈਲਰੀ",
        contact: "ਸੰਪਰਕ",
        
        // Hero Section
        heroTitle: "ਮਰਦਾਂ ਅਤੇ ਬੱਚਿਆਂ ਲਈ ਪ੍ਰੀਮੀਅਮ ਕਸਟਮ ਟੇਲਰਿੰਗ",
        heroSubtitle: "ਸ਼ਾਨਦਾਰ ਕਸਟਮ ਕੱਪੜੇ ਬਣਾਉਣ ਵਿੱਚ 17 ਸਾਲ ਤੋਂ ਵੱਧ ਦਾ ਤਜਰਬਾ।",
        heroButton: "ਸਲਾਹ-ਮਸ਼ਵਰਾ ਬੁਕ ਕਰੋ",
        
        // Services
        servicesTitle: "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ",
        servicesSubtitle: "ਅਸੀਂ ਤੁਹਾਡੀਆਂ ਖਾਸ ਲੋੜਾਂ ਅਤੇ ਤਰਜੀਹਾਂ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਟੇਲਰਿੰਗ ਸੇਵਾਵਾਂ ਦੀ ਇੱਕ ਵਿਸ਼ਾਲ ਰੇਂਜ ਪੇਸ਼ ਕਰਦੇ ਹਾਂ।",
        
        // Search
        searchPlaceholder: "ਸੇਵਾਵਾਂ ਖੋਜੋ...",
        
        // Profile
        profile: "ਪ੍ਰੋਫਾਈਲ",
        myAccount: "ਮੇਰਾ ਖਾਤਾ",
        favorites: "ਪਸੰਦੀਦਾ",
        orderHistory: "ਆਰਡਰ ਇਤਿਹਾਸ",
        settings: "ਸੈਟਿੰਗਜ਼",
        logout: "ਲਾਗਆਉਟ"
    },
    bn: {
        // Navigation
        home: "হোম",
        services: "সেবা",
        about: "আমাদের সম্পর্কে",
        process: "প্রক্রিয়া",
        gallery: "গ্যালারি",
        contact: "যোগাযোগ",
        
        // Hero Section
        heroTitle: "পুরুষ ও শিশুদের জন্য প্রিমিয়াম কাস্টম টেইলরিং",
        heroSubtitle: "অসাধারণ কাস্টম পোশাক তৈরি করতে ১৭ বছরেরও বেশি অভিজ্ঞতা নিয়ে।",
        heroButton: "পরামর্শ বুক করুন",
        
        // Services
        servicesTitle: "আমাদের সেবা",
        servicesSubtitle: "আপনার নির্দিষ্ট প্রয়োজন এবং পছন্দ মেটাতে আমরা টেইলরিং সেবার একটি বিস্তৃত পরিসর অফার করি।",
        
        // Search
        searchPlaceholder: "সেবা খুঁজুন...",
        
        // Profile
        profile: "প্রোফাইল",
        myAccount: "আমার অ্যাকাউন্ট",
        favorites: "প্রিয়",
        orderHistory: "অর্ডার ইতিহাস",
        settings: "সেটিংস",
        logout: "লগআউট"
    }
};

// Language change function
function changeLanguage(language) {
    const translation = translations[language];
    
    // Update navigation
    document.querySelectorAll('nav a').forEach((link, index) => {
        const keys = ['home', 'services', 'about', 'process', 'gallery', 'contact'];
        if (translation[keys[index]]) {
            link.textContent = translation[keys[index]];
        }
    });
    
    // Update hero section
    const heroTitle = document.querySelector('.hero h2');
    const heroSubtitle = document.querySelector('.hero p');
    const heroButton = document.querySelector('.hero .btn');
    
    if (heroTitle && translation.heroTitle) heroTitle.textContent = translation.heroTitle;
    if (heroSubtitle && translation.heroSubtitle) heroSubtitle.textContent = translation.heroSubtitle;
    if (heroButton && translation.heroButton) heroButton.textContent = translation.heroButton;
    
    // Update services section
    const servicesTitle = document.querySelector('.services .section-title h2');
    const servicesSubtitle = document.querySelector('.services .section-title p');
    
    if (servicesTitle && translation.servicesTitle) servicesTitle.textContent = translation.servicesTitle;
    if (servicesSubtitle && translation.servicesSubtitle) servicesSubtitle.textContent = translation.servicesSubtitle;
    
    // Update search placeholder
    if (searchInput && translation.searchPlaceholder) {
        searchInput.placeholder = translation.searchPlaceholder;
    }
    
    // Update profile text
    const profileText = document.querySelector('.profile-text');
    if (profileText && translation.profile) {
        profileText.textContent = translation.profile;
    }
    
    // Save language preference
    localStorage.setItem('preferredLanguage', language);
}

// Language selector event listener
languageSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

// Load saved language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    languageSelect.value = savedLanguage;
    changeLanguage(savedLanguage);
});

// Profile functionality
const profileBtn = document.querySelector('.profile-btn');
const profileMenu = document.querySelector('.profile-menu');

// Toggle profile menu
profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
});

// Close profile menu when clicking outside
document.addEventListener('click', () => {
    profileMenu.style.display = 'none';
});

// Prevent profile menu from closing when clicking inside
profileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Sample profile actions
document.querySelectorAll('.profile-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (item.classList.contains('logout')) {
            if (confirm('Are you sure you want to logout?')) {
                alert('Logged out successfully!');
                profileMenu.style.display = 'none';
            }
        } else {
            alert(`Navigating to: ${item.textContent}`);
            profileMenu.style.display = 'none';
        }
    });
});
