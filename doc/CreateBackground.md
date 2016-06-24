# Create a new background image

![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/cardsOverview.png "Overview")

Every displayed honeycomb has two sides, a front and a back. 
The front shows you the text and numbers and a background image. 
You can change and create a new background.

## Design

All honeycombs are designed with a hexagon background. 
The background can be viewed on desktop computers and on mobile devices. 
It will always look good and sharp (independend of the used display resolution depth). 
This is possible if every background image fulfill minimum requirements. 

Use the scalable vector image format SVG. 
I use the free software [Inkscape](https://inkscape.org) to create and edit SVG files. 
But pay attention: mobile devices render only a subset of SVG file format. 
Too complex structured designed images will look scrappy. 
Please avoid pattern, transparency and shapes, convert borders and texts to fill objects. 
No not use texts (except in city logos) - the interface should be multi-lingual.

This visualisation use four different background designs. 
From a simple design to more complex ones.

###Simple Design
![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/backgroundSimple.png "Simple background")

This design based on a hexagonal single colored background. 
E.g. use a green color for a tree background.
Give this visual a deep and vary the luminosity: 
Switch the displayed colorspace in Inkscape from RGB to HSL. 
The tree background has the colors H 68, S 255 and L 85. 
Change the L value to 80, 75 and 70 to make the background color darker. 
The used hexagon background is splitted in six pieces and you can change the L value clock wise to 85, 80, 75, 70, 75 an 80.

Use a background color that will match perfectly to a white text and icon. 
Place a simple white icon on top of the background. 
Use an icon height of 40px, a vertical position of 127px and center the icon horizontaly.

###Pattern Design
![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/backgroundPattern.png "Pattern background")

This design is a modification of the first design above. 
Add some darker elements to the background. 
See some inspiration here.

###Theme Design
![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/backgroundTheme.png "Thene background")

Create an unique background that display a theme. 
Also add an icon on top. 
You can also change the color of the text and the icon (but use the same for text and icon). 
Pay attention that the text is fully readable (check the contrast to the background).

###Full Design
![alt text](https://raw.githubusercontent.com/tursics/data-dashboard/master/doc/backgroundFull.png "Full background")

Create an unique background like above but without the icon. 
You can be most creative!

## Location

Most icons are located in the commons ```/app/img``` folder.

>```
/app/img/*.svg
```

Some special icons located in the ```/app/city``` subfolder. 
Use this location if the icon should be used only once, in one city. 
And use this folder if you need to contribute to a special license.

>```
// icon of the city data portal
/app/vienna/data.wien.gv.at.svg
```
>```
// icon of the creator of the cards
/app/berlin/codeforberlin.svg
```
>```
// a CC-BY copyright image
/app/vienna/fd3b5bee-bef4-4acd-8ea8-fc9d24aa024f.svg
```

# Register new Background

When you are finished with the creation of the new background file you must register it to the system. 
All background images in the common ```/app/img``` folder are registered in the JSON file ```/app/js/config.js```.

>```
/app/js/config.js
```

>```
var config = config || {
	templates: [
		{
			'frontBackground': 'img/tree.svg',
			'frontColor': '#ffffff',
			'backColor': '#000000',
			'backClass': ''
		}
	]
};
```

Create an entry (just copy an existing entry) in the ```config.templates``` array. 
Enter your image path to the ```frontBackground``` property. 
Leave all other values untouched. 
If you want to change the text color from white to another color, change the property ```frontColor```.

## License

Create a new background image with the CC-0 license. 
If you use an existing icon or existing image elements these must also in CC-0 license (or equal). 
Please document the used image sources in the git commit message.
