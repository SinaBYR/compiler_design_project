const util = require('util');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = util.promisify(rl.question).bind(rl);

async function main() {
 	let state = 1, pos = 0;

  const term = await question("Term: ");

  w:
  while(true) {
    switch(state) {
      case 1: { // ID
        const ch = term[pos];
        if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
          state = 2;
          pos++;
        } else {
          pos = 0;
          state = 3;
        }
        break;
      }

      case 2: {
        const ch = term[pos];
        if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9')) {
          state = 2;
          pos++;
        } else if(!ch) {
          console.log('ID');
          rl.close();
          break w;
        } else {
          pos = 0;
          state = 3;
          break w;
        }
        break;
      }

      case 3: { // Floating point
        const ch = term[pos];
        if(ch >= '1' && ch <= '9') {
          state = 4;
          pos++;
        } else {
          pos = 0;
          state = 6;
        }
        break;
      }

      case 4: {
        const ch = term[pos];
        if(ch == '.') {
          state = 5;
          pos++;
        } else if(ch >= '0' && ch <= '9') {
          state = 4;
          pos++;
        } else {
          pos = 0;
          state = 6;
        }
        break;
      }

      case 5: {
        const ch = term[pos];
        if(ch >= '0' && ch <= '9') {
          state = 5;
          pos++;
        } else if(!ch) {
          console.log('Decimal');
          rl.close();
          break w;
        } else {
          pos = 0;
          state = 6;
        }
        break;
      }

      case 6: {
        const ch = term[pos];
        if(ch >= '1' && ch <= '9') {
          state = 7;
          pos++;
        } else {
          pos = 0;
          state = 8;
        }
        break;
      }

      case 7: {
        const ch = term[pos];
        if(ch >= '0' && ch <= '9') {
          state = 7;
          pos++;
        } else if(!ch) {
          console.log('Integer');
          rl.close();
          break w;
        } else {
          pos = 0;
          state = 8;
        }
        break;
      }

      case 8: {
        const ch = term[pos];
        if(!ch || ch == ' ') {
          console.log('Space');
          rl.close();
          break w;
        } else {
          console.log('Error');
          rl.close();
          break w;
        }
      }
    }
  }
}

main();
