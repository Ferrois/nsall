//returns directory reference by checking for all the keys in an array for a specific matching value

function returnDir(dir, key, value) {
  for (let i = 0; i < dir.length; i++) {
    objectKeys = Object.keys(dir[i]);
    if (objectKeys.includes(key)) {
      if (dir[i][key] == value) {
        return dir[i];
      }
    }
  }
  return "Not Found";
}

module.exports = returnDir;
