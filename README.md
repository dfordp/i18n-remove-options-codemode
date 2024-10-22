Modification of the InterpolationOptions type. In version 23.0.0, the ns property within InterpolationOptions is now constrained to be of type Namespace instead of being a string or a readonly string[]. This change requires you to adjust your code accordingly.


### Before

```ts
const options = {
  interpolation: {
    escapeValue: false,
  },
};
//remove the options object property and keep all other relevant properties
i18n.init({
  options,
});
```

### After

```ts
i18n.init({});
```
,This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
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
```

### After

```ts
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
});
```
,This codemod turns X into Y. It also does Z.
Note: this is a contrived example. Please modify it.

### Before

```ts
i18n.init({
  fallbackLng: 'en',
  lng: 'en',
  defaultNS: 'uwave',
  interpolation: {
    escapeValue: false,
  },
});
//remove interpolation key-object pair
```

### After

```ts
i18n.init({
  fallbackLng: 'en',
  lng: 'en',
  defaultNS: 'uwave',
});
```

