import {server} from './server.js'

const form = document.querySelector("#form")
const input = document.querySelector("#input")
const typography = document.querySelector("#typography")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  typography.classList.add("placeholder")

  const videoURL = input.value

  if(!videoURL.includes("shorts")){
    return typography.textContent = "This video isn't a short..."
  }

  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")
  console.log(videoID)

  typography.textContent = "Getting audio transcription..."

  const transcription = await server.get("/summary/" + videoID)

  typography.textContent = "Carrrying out Summary..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  typography.textContent = summary.data.result
  typography.classList.remove("placeholder")
})
