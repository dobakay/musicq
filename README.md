# Musicq

## Mission
Create a mediocre client/server system for home usage,
using the wi-fi so that the guests of the host can choose
(curriate) the music and set the party mood.

NOTES
===========================================================
* Using tutorial from [here](http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WTa8GGiGNhE) 
    and [here](http://brianflove.com/2016/11/08/typescript-2-express-node/)
    to build the Express server.

* Using tutorial from [here](http://pauldbergeron.com/articles/streaming-youtube-to-mp3-audio-in-nodejs.html)
    to build the youtube-stream.

* For youtube-dl to work for Windows users:
    1. download [youtube-dl](https://rg3.github.io/youtube-dl/)
    2. [install ffmpeg in prefered folder](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg)
    3. place contents of ffmpeg/bin/ folder where the youtube-dl.exe is.
    4. run ".\youtube-dl.exe --extract-audio --audio-format mp3 https://www.youtube.com/watch?v=VIDEO_ID" in prompt

* Using Gulp 4 for the new feature - the `gulp.series` (running sequentially tasks) requires instalation
    from the git repo running the command `npm install --save-dev gulpjs/gulp.git#4.0` and instalation of
    the gulp cli running the command `npm i -g gulp-cli`