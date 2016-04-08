# Create a new background image

THIS TEXT IS UNDER CONSTRUCTION!!!

![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/cardsOverview.png "Overview")

Every displayed card has two sides, a front and a back. 
The front shows you the text and numbers and a background image. 
You can change and create a new background.

## Design

All cards are designed with a hexagon background. 
The background can be viewed on desktop computers and on mobile devices. 
It will always look good and sharp (independend of the used display resolution depth). 
This is possible if every background image fulfill minimum requirements. 

Use the scalable vector image format SVG. 
I use the free software [Inkscape](https://inkscape.org) to create and edit SVG files. 
But pay attention: mobile devices render only a subset of SVG file format. 
Too complex structured designed images will look scrappy. 
Please avoid pattern and shapes, convert borders and texts to fill objects. 
No not use texts (except in city logos) - the interface should be multi-lingual.

This visualisation use four different background designs. From a simple design to more complex ones.

###Design A
![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/backgroundSimple.png "Simple background")
- One background color
- give it a visual deep and vary the hue
- simple white icon on top
- white icon, prepared for white text

###Version 2
![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/backgroundPattern.png "Pattern background")
- vary the background a little bit

###Version 3
![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/backgroundTheme.png "Thene background")
- create a unique background
- theme related
- add an icon on top
- change the text color, use the same as the icon
- pay attantion the text is fully readable

###Version 4
![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/backgroundFull.png "Full background")
- plane unique background
- without an icon

## Location

Common
- /img/

Special
- /city/
  - city
  - creator
  - CC-BY protected city special
    - icon of vienna

# Register new Background

/js/config.js
var config = config || {
	templates: [
		{
			'frontBackground': 'img/sun.svg',
			'frontColor': '#ffffff',
			'backColor': '#000000',
			'backClass': ''
		}
	]
};

JSON file
Only images in /img/
White text (mostly)

## License

CC-0
Source in commit message
