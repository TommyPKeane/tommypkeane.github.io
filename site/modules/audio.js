//  Custom Audio Tools Module
//
//
// References:
// - https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API

export const AudioContext = window.AudioContext || window.webkitAudioContext;


let falseStr = "false"
let trueStr = "true"
let playStr = "▶️"
let pauseStr = "⏸"


export function insertAudioElement(
    containerElm,
    srcPath,
) {
    let newAudioElm = document.createElement("audio");
    newAudioElm.setAttribute("src", srcPath);
    containerElm.appendChild(newAudioElm);
    return newAudioElm;
}

export function stopStartAudio(
    htmlButtonElm,
    crntAudioContext,
    htmlAudioElm,
) {
    if (crntAudioContext.state === "suspended") {
      crntAudioContext.resume();
    } else {}

    if (htmlButtonElm.dataset.playing === falseStr) {
      htmlAudioElm.play();
      htmlButtonElm.dataset.playing = trueStr;
    } else if (htmlButtonElm.dataset.playing === trueStr) {
      htmlAudioElm.pause();
      htmlButtonElm.dataset.playing = falseStr;
    } else {
        console.warn(`Doing Nothing | Unknown Button State: ${htmlButtonElm.dataset.playing}`);
    }
    return;
}

export function insertAudioPlayButtonElement(
    containerElm,
    audioElm,
    crntAudioContext,
) {
    const track = crntAudioContext.createMediaElementSource(audioElm);
    track.connect(crntAudioContext.destination);
    let newButtonElm = document.createElement("button");
    newButtonElm.setAttribute("data-playing", falseStr);
    newButtonElm.setAttribute("role", "switch");
    newButtonElm.setAttribute("aria-checked", falseStr);
    let newButtonContentsElm = document.createElement("span");
    newButtonContentsElm.innerHTML = playStr;
    const playButtonObserver = new MutationObserver(
        (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === "childList") {
                    // pass
                } else if (mutation.type === "attributes") {
                    console.log(mutation);
                    if (mutation.attributeName == "data-playing") {
                        newButtonContentsElm.innerHTML = (
                            (mutation.target.dataset.playing === trueStr)
                            ? pauseStr
                            : playStr
                        );
                    } else {}
                } else {}

            }
        },
    );
    playButtonObserver.observe(
        newButtonElm,
        {
            "attributes": true,
        },
    );
    newButtonElm.addEventListener(
        "click",
        () => {
            stopStartAudio(newButtonElm, crntAudioContext, audioElm);
        },
        false,
    );
    newButtonElm.addEventListener(
        "ended",
        () => {newButtonElm.dataset.playing = falseStr;},
        false,
    );
    let newButtonDocFrag = document.createDocumentFragment();
    let nestedButtonElm = newButtonDocFrag.appendChild(newButtonElm).appendChild(newButtonContentsElm);
    containerElm.appendChild(newButtonDocFrag);
    return nestedButtonElm;
}
