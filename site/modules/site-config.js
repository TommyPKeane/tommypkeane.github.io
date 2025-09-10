export let userConfig = {
    "theme": localStorage.getItem("theme") || "dark",
    "name": localStorage.getItem("name") || "Stranger",
}

export const greetings = [
  "Hiya! It's me. I'm the Tommy. It's me.",
];

export const selectRandomGreeting = function hstSelectRandomGreeting() {
  let greeting = "👋";
  let randomIndex = Math.floor(Math.random() * greetings.length);
  greeting = greetings[randomIndex];
  return greeting;
}
