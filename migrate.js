const fs = require('fs');
const path = require('path');

// Read the calc-questions.js file
const jsCode = fs.readFileSync('Electronics-2/calc-questions.js', 'utf8');

// Extract the CALC_QUESTIONS object
let calcQuestionsStr = jsCode.match(/var CALC_QUESTIONS = (\{[\s\S]*?\n\};)/)[1];
// Strip trailing semicolon
calcQuestionsStr = calcQuestionsStr.replace(/;$/, '');

let CALC_QUESTIONS;
try {
  // Using new Function is a safe way to evaluate object literals without full eval if formatted like JSONish
  CALC_QUESTIONS = new Function('return ' + calcQuestionsStr)();
} catch (e) {
  console.error("Failed to parse CALC_QUESTIONS", e);
  process.exit(1);
}

const baseTargetDir = 'Electronics-2/questions_data';
if (!fs.existsSync(baseTargetDir)) {
  fs.mkdirSync(baseTargetDir, { recursive: true });
}

let qCounter = 1;

for (const [lecKey, questions] of Object.entries(CALC_QUESTIONS)) {
  // e.g. lecKey = 'lec1', let's make it 'ch1'
  const chName = lecKey.replace('lec', 'ch');
  const chDir = path.join(baseTargetDir, chName);
  if (!fs.existsSync(chDir)) {
    fs.mkdirSync(chDir, { recursive: true });
  }

  let localCounter = 1;

  for (const q of questions) {
    const qDir = path.join(chDir, localCounter.toString());
    if (!fs.existsSync(qDir)) {
      fs.mkdirSync(qDir, { recursive: true });
    }

    // 1. Copy Question Image
    if (q.questionImg && fs.existsSync(q.questionImg)) {
      const ext = path.extname(q.questionImg);
      fs.copyFileSync(q.questionImg, path.join(qDir, 'question' + ext));
    }

    // 2. Copy Answer Images
    if (q.solutionImgs && q.solutionImgs.length > 0) {
      if (q.solutionImgs.length === 1) {
        const ext = path.extname(q.solutionImgs[0]);
        if (fs.existsSync(q.solutionImgs[0])) {
          fs.copyFileSync(q.solutionImgs[0], path.join(qDir, 'answer' + ext));
        }
      } else {
        q.solutionImgs.forEach((ansPath, idx) => {
          if (fs.existsSync(ansPath)) {
            const ext = path.extname(ansPath);
            fs.copyFileSync(ansPath, path.join(qDir, 'answer' + (idx + 1) + ext));
          }
        });
      }
    }

    // 3. Create fields.txt and meta.txt
    let fieldsContent = '';
    // Let's save the title and description in fields.txt or a separate meta.txt
    // Format: 
    // Title: Find the BJT
    // Description: Look at the circuit...
    // 
    // Fields:
    // IB | μA | 20.5 | 0.5
    
    fieldsContent += `Title: ${q.title}\n`;
    fieldsContent += `Description: ${q.description}\n\n`;
    
    if (q.fields && q.fields.length > 0) {
      fieldsContent += `Fields:\n`;
      q.fields.forEach(f => {
        fieldsContent += `${f.label} | ${f.unit || ''} | ${f.answer} | ${f.tolerance}\n`;
      });
    }

    fs.writeFileSync(path.join(qDir, 'fields.txt'), fieldsContent, 'utf8');

    localCounter++;
  }
}

console.log("Migration complete!");
