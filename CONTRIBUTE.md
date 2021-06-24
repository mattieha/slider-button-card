# Contributing to the Slider button card by 

Thanks for taking the time to contribute to this card.

## Adding a new translation
Steps for adding a new translation:
### Json translation file
Translation files are located under `src/localize/languages`
1. Make a copy of `en.json`
2. Rename it to your two characters language `xx.json`       
3. Translate only the values
### Make it available
For the card to be able to use the translation it needs to be added to `src/localize/localize.ts`
1. Add an import statement: `import * as xx from './languages/xx.json';`
2. Add it to the language variable 
    ```` typescript 
   const languages: any = {
      en: en,
      he: he,
      nl: nl,
      pl: pl,
      ru: ru,
      xx: xx, // Add alphabeticly (without this comment)
    };
    ````
   
### Update Readme
Add your translation to the `README.md` under the languages section:
```markdown
- English
- Hebrew
- Nederlands (Dutch)
- Polish (polski)
- Russian
- Your new language
```

### Create a PR
Commit your changes and create a [Pull Request](https://github.com/mattieha/slider-button-card/pulls)
