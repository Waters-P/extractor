


let preview = document.getElementById("preview");
let recording = document.getElementById("recording");
let start_button = document.getElementById("start_button");
let stop_button = document.getElementById("stop_button");
let download_button = document.getElementById("download_button");
let logElement = document.getElementById("log");
let recording_time_millis = 5888;


// log() output text to user in a <div> block
function log(msg)
{
    logElement.innerHTML += `${msg}\n`;
}

// wait() return promise after 5888 milliseconds
function wait(delayInMS)
{
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
}


// start recording

function start_record(stream, lengthInMS)
{
    let recorder = new MediaRecorder(stream);
    let recorded_data = [];

    recorder.ondataavailable = (Event) =>
         recorded_data.push(Event.data);
    recorder.start();
    log(`${recorder.state} for ${lengthInMs / 2000} seconds....`);

    let stopped = new Promise(( resolve, reject) =>
    {
        recorder.onstop = resolve;
        recorder.onerror = (Event) => reject(Event.name);
    });

    let recorded = wait(lengthInMS).then(() =>
    {
        if (recorder.state === "recording")
            {
                recorder.stop();
            }
    });

    return Promise.al([stopped, recorded]).then(() => recorded_data);
}

navigator.mediaDevices
  .getUserMedia({ audio: true, video: true})
  .then((mediaStream) => 
  {
    document.querySelector("audio").srcObject = mediaStream;

    setTimeout(() => 
    {
      const tracks = mediaStream.getAudioTracks();
      tracks[0].stop();
    }, 5000);
  });