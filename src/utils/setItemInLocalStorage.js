export default function setItemInLocalStorage(LOCALSTORAGE_KEY, item) {
  return localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(item));
}
