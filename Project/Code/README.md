# User Documentation

`Incomplete! Work in progress.`

My project uses Amazon's _[RecognizeCelebrities](http://docs.aws.amazon.com/rekognition/latest/dg/API_RecognizeCelebrities.html)_ API — a part of the [Amazon Rekognition](https://aws.amazon.com/documentation/rekognition/) package — to take in a picture of a celebrity and queries it against the _[The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api)_ API to return a list of movies that they've been in (or an error if the celebrity isn't an actor/actress). 

The user would need to authenticate with Twitter or Facebook to use the app, and can choose to save their search results in our database. 

## APIs Used
* [RecognizeCelebrities](http://docs.aws.amazon.com/rekognition/latest/dg/API_RecognizeCelebrities.html)
* [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api) 

## Installation and Setup
I've added all the `node_modules` to `.gitignore` to keep the app simple, so you'll have to run `npm install` on first run after you clone the directory to get those set up. You'll also need to set up `[AWS CLI](http://docs.aws.amazon.com/rekognition/latest/dg/setup-awscli.html)` to use _Rekognition_. 

To configure OAuth and TMDB, you'll need to enter your API and Access Keys in a config file. I've added sample files that you can rename and fill-in.

----
_Updated on June 27, 2017 by Karan Varindani._