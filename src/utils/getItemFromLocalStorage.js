export default function getItemFromLocalStroage(LOCALSTORAGE_KEY) {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
}
