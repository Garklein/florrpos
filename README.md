# florrpos
## How to use
* Paste the javascript file into a new Greasyfork script 
* Go to florr.io on Chrome (might work on other browsers but doesn't on Firefox)
* Go to the top of the map
* Click the button
* It will update your position 60 times a second
* Press m to start and stop recording positions
* When recording has finished, it will log all the information in the console as an array 
* Array pattern is x, y, timestamp relative to record starting
* To graph it, download the html file, paste in the points to an array, modify the parsePoints function, and run it for each array
* The sample parsePoints function graphs change in the X axis
