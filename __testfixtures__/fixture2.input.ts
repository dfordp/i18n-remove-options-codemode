const options = {
  interpolation: {
    escapeValue: false,
  },
};

//preserve all the other pairs
i18n.init({
  lng: 'en',
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  normalize: (type, value) => {
    switch (type) {
      case 'translation':
        return value.toUpperCase(); // Custom normalization for translations
      default:
        return value;
    }
  },
  options,
});