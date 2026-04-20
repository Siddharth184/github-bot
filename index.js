// const jsonfile = require("jsonfile");
// const moment = require("moment");
// const simpleGit = require("simple-git");
// const random = require("random");

// const FILE_PATH = "./data.json";

// const git = simpleGit();

// const makeCommit = n  => {
//     if (n===0) return git.push();
//     const x = Math.floor(Math.random() * 55); // generates integer between 0-54 inclusive
//     const y = Math.floor(Math.random() * 7);  // generates integer between 0-6 inclusive
//   const DATE = moment()
//     .subtract(1, "y")
//     .add(1, "d")
//     .add(x, "w")
//     .add(y, "d")
//     .format();

//   const data = {
//     date: DATE,
//   };

//   console.log(DATE);
//   jsonfile.writeFile(FILE_PATH, data, () => {
//     simpleGit().add([FILE_PATH]).commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n));
//   });
// };

// makeCommit(1000);




const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const FILE_PATH = "./data.json";
const git = simpleGit();

const randomDateInRange = () => {
  const start = moment("2026-01-20");
  const end = moment("2026-03-04");
  const diffDays = end.diff(start, 'days');
  const randomDays = Math.floor(Math.random() * (diffDays + 1));
  return start.add(randomDays, 'days').format();
};

const makeCommit = (n) => {
  if (n === 0) return git.push();

  const DATE = randomDateInRange();

  const data = { date: DATE };

  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, () => {
    git.add([FILE_PATH])
       .commit(DATE, { "--date": DATE }, () => makeCommit(--n));
  });
};

makeCommit(1000);
