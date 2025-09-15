export let userConfig = {
    "theme": localStorage.getItem("theme") || "dark",
    "name": localStorage.getItem("name") || "Stranger",
}

export const greetings = [
  "Is this drama-circle about me, right now?",
];

export const selectRandomGreeting = function hstSelectRandomGreeting() {
  let greeting = "👋";
  let randomIndex = Math.floor(Math.random() * greetings.length);
  greeting = greetings[randomIndex];
  return greeting;
}
