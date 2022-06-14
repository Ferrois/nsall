// const returnDate = new Date("December 17, 2021 03:24:00")
// const returnDate2 = returnDate - 0
// console.log(JSON.stringify(returnDate2))

async function main() {
  const scores = await fetch(
    `https://ippt.vercel.app/api?age=18&situps=12&pushups=33&run=750`
  );
  console.log(scores);
}

main()