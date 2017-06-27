# User Documentation

`Incomplete! Work in progress.`

My project uses Amazon's _[RecognizeCelebrities](http://docs.aws.amazon.com/rekognition/latest/dg/API_RecognizeCelebrities.html)_ API — a part of the [Amazon Rekognition](https://aws.amazon.com/documentation/rekognition/) package — to take in a picture of a celebrity and queries it against the _[The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api)_ API to return a list of movies that they've been in (or an error if the celebrity isn't an actor/actress). 

The user would need to authenticate with Twitter or Facebook to use the app, and can choose to save their search results in our database. 

## APIs Used
* [RecognizeCelebrities](http://docs.aws.amazon.com/rekognition/latest/dg/API_RecognizeCelebrities.html)
* [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api) 

## Installation and Setup
I've added all the `node_modules` to `.gitignore` to keep the app simple, so you'll have to run `npm install` on first run after you clone the directory to get those set up. You'll also need to set up [`AWS CLI`](http://docs.aws.amazon.com/rekognition/latest/dg/setup-awscli.html) to use _Rekognition_. 

To configure OAuth and TMDB, you'll need to enter your API and Access Keys in a config file. I've added sample files that you can rename and fill-in, in the [`/config`](./config/) folder.

## Future Development _(Fancy talk for Known Issues)_
* I couldn't get the drag-and-drop image uploader in time, which would have been nice. [`ng-file-upload`](https://www.npmjs.com/package/ng-file-upload) looks like a nice package that could abstract a lot of that, so maybe I'll get to that eventually. I'm content using [Workflow](https://workflow.is) to upload files to my own file server for now. 
* The database 'Delete All' function is the only part of the API technically blocked by auth (and it is, you can't just hit it with [Postman](https://www.getpostman.com)), but for simplicity (laziness) I just protected the entire app with OAuth. ¯\_(ツ)_/¯ 
* **Links!** I can't believe I forgot about links until I started typing this! I parse links (using RegEx) already — it's how I move from Amazon to TMDB — but I should really be including them with Celebrity Names when I do a lookup from the database.


## Compliance with Project Guidelines
* Application runs during in-class demo: Here's hoping!
* App is configured correctly: All sensitive information is in config files and under `.gitignore`.
* REST interface is correctly implemented: I believe it is. I've done decent (well, satisfactory) testing.
* Routes are in their own files: All routes use Express.router, yes. 
* Angular used in the front-end: Yep!
* OAuth works and at least one route is protected: Database is protected, and entire app requires auth.
* Code is commented: I mean it's pretty good for two binge coding sessions... And there's lengthy documentation!
* Back-end data stored in mongoDB: Database saves in `cs591/celebs` and can be retrieved/deleted.

----

# Technical Documentation
`Incomplete! Work in progress.`

----
_Updated on June 27, 2017 by Karan Varindani._