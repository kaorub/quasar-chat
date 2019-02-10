export default function createNameFromId(id = '') {
  return id.toString().substr(0, 5);
}
