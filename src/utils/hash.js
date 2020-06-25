/*
 * Source : https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */

function hash(string) {
  var hash = 0, i, chr;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(16);
}

export default hash