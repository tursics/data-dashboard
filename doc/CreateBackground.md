# Create a new background image

![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/cardsOverview.png "Overview")

THIS TEXT IS UNDER CONSTRUCTION!!!

## Location

Common
- /img/

Special
- /city/
  - city
  - creator
  - CC-BY protected city special
    - icon of vienna

## Design

Scalable SVG
Use free Inkscape
Not too complex (no shapes)
Border to Fill
Text to Fill
Try to avoid text -> multilingual (city logo?)
Hexagon

###Version 1
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
