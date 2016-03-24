# Create a new translation

The data cards have only one language. You can use just your lovely language. But the app itself can be translated in different languages. Open the folder

/app/strings/

and copy the folder

/de-DE/

Name the folder like ISO language code. Then edit the i18n.js file.

Currently only German translation is loaded. This could be changed in future. The i18n.js file is loaded in the /app/index.html file. The file /app/js/app.js use hard coded German language in the function installInternationalization().
