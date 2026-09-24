async function loadTranslations(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();
    return translations;
  } catch (error) {
    console.error('Error loading translations:', error);
    return null;
  }
}

async function setLanguage(lang) {
  localStorage.setItem('preferredLang', lang);
  const translations = await loadTranslations(lang);
  
  if (!translations) return;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[key]) {
      if (element.tagName === 'INPUT' && element.type === 'placeholder') {
        element.placeholder = translations[key];
      } else {
        element.textContent = translations[key];
      }
    }
  });
  
  document.documentElement.lang = lang;
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  const langSelect = document.getElementById('lang-select');
  
  if (langSelect) {
    langSelect.value = savedLang;
    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }

  setLanguage(savedLang);
});
