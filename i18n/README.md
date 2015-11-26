Internationalization, and Localization
======================================

- i18n is short for internationalization.  The 18 represents the number of 
characters in the word "internationalization" that are between the first "i",
and the last "n"

- i18n is the process of designing, and building applications that facilitate
localization (l10n)

- l10n is short for localization.  The ten represents the middle characters
between the "l", and the "n"

- l10n is the cultural, and linguistic adaptation of an i18n application to two
or more culturally distinct markets


## i18n Complexity 

Internationalization can affect entire applications, and all project members
need to be aware of it on some level, from designers to engineers, to QA.
The process includes all of the following:

- Languages
- Number formats, date formats, time formats, eg 1,000.00 vs 1.000,00
- Currency
- Text direction (left to right, right to left...)
- Symbols, graphics, and more

Complexity of the internationalization process can vary from relatively simple,
to quite complex.  One example of a relatively simple case would be two
languages with similar character sets, and the same text orientation.  An
example of a complex case would be several different languages with different
text orientations, and different character sets.

Unfortunately, even relatively simple internationalization can sometimes
dramatically change application text, and layout.  

Consider the following:

    
    Language | Message | Text Length | Expansion
    ---------|---------|-------------|----------
    English  | Set the power switch to 0. | 26 chars | -
    French   | Placez l'interrupteur de tension à 0. | 37 chars | 42% more characters
    Spanish  | Ponga el interruptor de alimentación de corriente en 0.| 55 chars | 112% more characters


## i18n in Angular (1.4+)

- Starts, and ends with HTML templates, and/or JSON
- Can be done dynamically (no page reloads)
- Styles can be tested _while_ translators translate

Angular version 1.4x features a module called [Angular Translate][ngTranslate]
which adds a robust translation workflow to Angular. The Angular Translate
workflow looks like
  
  
![Angular Translate Workflow](img/i18n-process.png "i18n Workflow")

In the workflow diagram the smiling face represents the translators.  There is
also a computer tower represented as a translator.  The best practice is to
have the development/design team work in their native language, _and_ a made
up "gibberish" language. 

This practice evolved out of the fact that _good_ translation takes time.
However, as was illustrated in the previous section, translations _will likely_
affect application layout.  The "gibberish" language can be generated as a
build step, and development/design can get near instant feedback on how
localization will affect the application.

### i18n Angular HTML Templates

Workflow begins, and ends with HTML, or in some cases JSON.  This HTML is _not_
quite the same as monolingual HTML.  There are a variety of reasons for this:

- Translators do not necessarily know Angular, or HTML
- Designers/Developers do not necessarily know the target languages
- Translators require _context_ in order to produce high quality translations

Here is some HTML, and JS for a [simple Angular translate demo][demoBasic]
HTML:

```html

    <div ng-app="translateDemo">
      <h1>{{ 'TITLE' | translate }}</h1>
      <p>{{ 'BODY' | translate }}</p>
  
        <select ng-controller="DemoLang as lang"
                ng-model="lang.current"
                ng-change="lang.change(lang.current)">
        <option value='en'>English</option>
        <option value='fr'>French</option>
      </select>
    </div>

```

JS:

```js

    angular.module('translateDemo', ['pascalprecht.translate']).

    config(function($translateProvider) {

      $translateProvider.useSanitizeValueStrategy('escape');

      $translateProvider.determinePreferredLanguage();
      $translateProvider.translations('en', {
        TITLE: 'My Cool Demo',
        BODY: 'In English, and French'
      });

      $translateProvider.translations('fr', {
        TITLE: 'Ma Démo Fraîche',
        BODY: 'En anglais et en français'
      })
    }).

    controller('DemoLang', function($translate) {
      this.current = $translate.use();
      this.change = $translate.use;
  
      // "normalize" auto-detected language for example 'en_US' becomes 'en'
      if (this.current.length > 2) {
        this.current = this.current.slice(0, 2);
        $translate.use(this.current);
     }
    });
```


[ngTranslate]:https://github.com/angular-translate/angular-translate "Angular Translate Module"
[demoBasic]:http://codepen.io/bennett000/pen/PPrEve/ "Simple English/French Angular Translate Example"
