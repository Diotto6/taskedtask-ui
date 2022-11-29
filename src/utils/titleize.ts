export function titleize(text: string) {
  let loweredText = text.toString().toLowerCase();
  let words = loweredText.split(" ");

  for (let a = 0; a < words.length; a++) {
    let w = words[a];

    let firstLetter = w[0];
    w = firstLetter.toUpperCase() + w.slice(1);

    words[a] = w;
  }
  return words.join(" ");
}
