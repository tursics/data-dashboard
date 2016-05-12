# Create a new city

**THIS TEXT IS UNDER CONSTRUCTION!!!**

Ich dachte eine neue Stadt wäre in ein paar Schritten erstellt. 
Meine Erfahrungen vom [#ODDMO16](https://twitter.com/hashtag/oddmo16?src=hash) haben diese These wiederlegt.
Eröffne einfach ein Issue auf github und ich bereite alles vor.

Bis dahin arbeite ich an einer einfacheren Lösung - und an der Doku hier.

### Some notes

Version 1: City CKAN

|City name|Data portal links|Enable CORS|
|:---|:---|:---|
|Aachen |http://offenedaten.aachen.de/|No|
|       |[/api/3/action/current_package_list_with_resources](http://offenedaten.aachen.de/api/3/action/current_package_list_with_resources)||
|       |[/api/3/action/package_show?id=**ID**](http://offenedaten.aachen.de/api/3/action/package_show?id=)||
|       |[/dataset/**ID**](http://offenedaten.aachen.de/dataset/)||
|Bonn   |http://opendata.bonn.de/|No|
|       |[/api/3/action/current_package_list_with_resources](http://opendata.bonn.de/api/3/action/current_package_list_with_resources)||
|Cologne|http://offenedaten-koeln.de/|No|
|       |[/api/3/action/current_package_list_with_resources](http://offenedaten-koeln.de/api/3/action/current_package_list_with_resources)||
|       |[/api/3/action/package_show?id=**ID**](http://offenedaten-koeln.de/api/3/action/package_show?id=)||

Version 2: Subset CKAN

|City name|Data portal links|Enable CORS|
|:---|:---|:---|
|Amsterdam  |http://data.amsterdam.nl/|No|
|       |[/api/3/action/package_list](http://data.amsterdam.nl/api/3/action/package_list)||
|       |[/api/3/action/package_show?id=**ID**](http://data.amsterdam.nl/api/3/action/package_show?id=)||
|       |[/dataset/**ID**](http://data.amsterdam.nl/dataset/)||

Version 3: Common CKAN with multiple cities

|City name|Data portal links|Enable CORS|
|:---|:---|:---|
|Moers  |https://www.offenesdatenportal.de/|No|
|       |[/api/3/action/organization_activity_list?id=moers](https://www.offenesdatenportal.de/api/3/action/organization_activity_list?id=moers)||
|       |[/api/3/action/package_show?id=**ID**](https://www.offenesdatenportal.de/api/3/action/package_show?id=)||
|       |[/dataset/**ID**](http://offenesdatenportal.de/dataset/)||
|NRW    |https://open.nrw/|Yes|
|       |[/api/3/action/organization_activity_list?id=nrw](https://open.nrw/api/3/action/organization_activity_list?id=nrw)||
|       |[/api/3/action/package_show?id=**ID**](https://open.nrw/api/3/action/package_show?id=)||
|       |[/dataset/**ID**](https://open.nrw/dataset/)||
|Vienna |https://www.data.gv.at/|Yes|
|       |[/katalog/api/3/action/organization_activity_list?id=stadt-wien](https://www.data.gv.at/katalog/api/3/action/organization_activity_list?id=stadt-wien)||
|       |[/katalog/api/3/action/package_show?id=**ID**](https://www.data.gv.at/katalog/api/3/action/package_show?id=)||
|       |[/katalog/api/dataset/**ID**](https://www.data.gv.at/katalog/api/dataset/)||

Version 4: Hidden CKAN

|City name|Data portal links|Enable CORS|
|:---|:---|:---|
|Berlin |http://daten.berlin.de/datensaetze/rss.xml|No|

?limit=400
