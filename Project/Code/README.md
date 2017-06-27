# User Documentation
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
* I may have inadvertently pushed code with my TMDB API Key to GitHub before abstracting it in a config file. Oops.
* If you don't upload a valid image of a celebrity, it just does nothing (instead of returning an error message). Error messages in general are essentially nonexistent in the front-end; the app just won't do anything. 


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
* `/app.js`: I edited this to require a bunch of the route files and passport auth.
* `/routes/amazon.js`: Takes in an image (S3 Object in this case) and returns a bunch of information about the celebrity (if found). I parse the  celebrity name from the response, and use RegEx to grab their IMDB URL (if exists).
* `/routes/authCheck.js`: Checks to make sure a user is logged in. 
* `/routes/authTwitter.js`: Lets you authenticate with Twitter OAuth.
* `/routes/database.js`: Lets you add, fetch, or delete records from the database. (DB: `cs591`, Collection: `celebs`)
* `/routes/download.js`: Takes in a URL (as a POST request with the key 'uri'), uses `request` to grab the image, and saves it locally as `utest.jpg` (I know, names are hard). Subsequent calls replace the original image (which is great — there's only one image on the disk at any time). This image is included in `.gitignore`.
* `/routes/tmdb.js`: Does everything that `amazon.js` does but takes that parsed IMDB URL/ID and spits out a bunch of information about the celebrity (from IMDB), which I parse to get the top three movies that IMDB claims they're known for. 
* `/routes/upload.js`: Takes in `utest.jpg` (produced by `download.js`) and uploads it to a `cs591-mean` S3 bucket. If exists, it replaces it (so there's only one image stored in S3 at any given time — awesome). Has to be run after download otherwise it'll be unable to upload anything. AWS must be configured before you can use this, obviously.

## Variables
* `utest.jpg` can be changed in `download.js`, `upload.js`, and `tmdb.js` if you would like to use something else. 
* `cs591` and `celebs` can be changed in `database.js` if you would like to use something else. 
* Both sample files in `config/` must be filled in and renamed with your own variables before app can be used. 

----
_Updated on June 27, 2017 by Karan Varindani._