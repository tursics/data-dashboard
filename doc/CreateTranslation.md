# Create a new translation

The data honeycombs have only one language. 
You can use just your lovely language. 
But the app itself can be translated in different languages. 
Open the folder

>```
/app/strings/
```

and copy the folder

>```
/en-US/
```

Name the folder like [Locale Codes](http://www.science.co.il/Language/Locale-codes.asp) (combination of language and country). 
Then edit the ```i18n.js``` file.

Currently only German translation is loaded. This could be changed in future. 
The ```i18n.js``` file is loaded in the ```/app/index.html``` file. 
But there is a trick: Change the URL and add the parameter ```lang=en``` to show the English translation.

- use http://datenwaben.de/?lang=en to show the English version
- use http://datenwaben.de/?lang=de to show the German version

## Multi lingual honeycomb

A multi lingual honeycomb is prepared but you can't configure it the easy way. 
There is no common interface in the editor backend. 
But you can add some lines in the honeycomb ```.js``` file like this:

>```
{
	"en-US": {
		"front": {
			"textTop": "July 17, 1943, 8:55 p.m.",
			"textBottom": "killed in an airstrike"
		},
		"back": {
			"text": "On the topic 'Amsterdam under fire in World War II' you can empathize with the history."
		}
	}
}
```

Take a look at the data honeycombs of [Amsterdam](http://datenwaben.de/index.html?city=amsterdam&page=cards&lang=de). 
All honeycombs are written in German. 
But if you change the language of the URL to [English](http://datenwaben.de/index.html?city=amsterdam&page=cards&lang=en) (using ```&lang=en```) all honeycombs are changed too.

![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/translationHoneycomb.png "Translated honeycomb")
