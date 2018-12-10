export function getFromStorage(key) {
  if (!key) {
    return null;
  }
  try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) {
      return JSON.parse(valueStr);
    }
    return null;
  } catch (err) {
    return null;
  }
}

export function setInStorage(key, obj) {
  console.log('heee, there was an error in setInStorage');
  if (!key) {
    console.error('Error: Key is missing');
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
}

export function reomveFromStorage(key) {
  if (!key) {
    console.error('Error: Key is missing');
  }
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}