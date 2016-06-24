# Create a new translation

The data honeycombs have only one language. You can use just your lovely language. But the app itself can be translated in different languages. Open the folder

>```
/app/strings/
```

and copy the folder

>```
/de-DE/
```

Name the folder like [Locale Codes](http://www.science.co.il/Language/Locale-codes.asp) (combination of language and country). Then edit the i18n.js file.

Currently only German translation is loaded. This could be changed in future. 
The i18n.js file is loaded in the /app/index.html file. 
The file /app/js/app.js use hard coded German language in the function ```installInternationalization()```.
