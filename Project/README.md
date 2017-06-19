# Project Overview

My project uses Amazon's _[RecognizeCelebrities](http://docs.aws.amazon.com/rekognition/latest/dg/API_RecognizeCelebrities.html)_ API — a part of the [Amazon Rekognition](https://aws.amazon.com/documentation/rekognition/) package — to take in a picture of a celebrity and queries it against the _[The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api)_ API to return a list of movies that they've been in (or an error if the celebrity isn't an actor/actress). 

The user would need to authenticate with Twitter or Facebook to use the app, and can choose to save their search results in our database. 

## APIs Used
* [RecognizeCelebrities](http://docs.aws.amazon.com/rekognition/latest/dg/API_RecognizeCelebrities.html)
* [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api) 

----
_Updated on June 18, 2017 by Karan Varindani._