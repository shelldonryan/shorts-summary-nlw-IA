import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoID) => new Promise((resolve, reject) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoID

  console.log("Starting the download... Shorts: " + videoURL)

  ytdl(videoURL, {quality: "lowestaudio", filter: "audioonly"})
  .on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000
    
    if(seconds > 60) {
      throw new Error("The duration of this video is bigger than 60 seconds")
    }
  })
  .on("end", () => {
    console.log("Finished Downloading")
    resolve()
  })
  .on("error", (error) => {
    console.log("It wasn't possible to download this video", error)
    reject(error)
  }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})