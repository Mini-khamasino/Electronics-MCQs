// ============================================================
// Universal Build Script — Auto-discovers subjects & questions
// from the subjects/ folder structure
// 
// Run: node build.js
// ============================================================

const fs = require('fs');
const path = require('path');

const SUBJECTS_DIR = path.join(__dirname, 'subjects');

// Recognized question type folders
const RECOGNIZED_TYPES = {
  'MCQ': 'mcq',
  'Written': 'written',
  'TF': 'tf'
};

// ── Helpers ─────────────────────────────────────────────────

function readConfig(configPath) {
  const config = { name: '', icon: '📚', description: '' };
  if (!fs.existsSync(configPath)) return config;
  
  const lines = fs.readFileSync(configPath, 'utf8').split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('Name:')) config.name = trimmed.replace('Name:', '').trim();
    else if (trimmed.startsWith('Icon:')) config.icon = trimmed.replace('Icon:', '').trim();
    else if (trimmed.startsWith('Description:')) config.description = trimmed.replace('Description:', '').trim();
  });
  return config;
}

function parseMCQFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const questions = [];
  
  // Split by "Q:" to find each question block
  const blocks = content.split(/^Q:\s*/m).filter(b => b.trim());
  
  blocks.forEach((block, idx) => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 3) return;
    
    const questionText = lines[0];
    const options = [];
    let answerIdx = -1;
    let explanation = '';
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      
      // Match option lines: A) text, B) text, etc.
      const optMatch = line.match(/^([A-D])\)\s*(.+)/);
      if (optMatch) {
        options.push(optMatch[2]);
        continue;
      }
      
      // Match answer line
      const ansMatch = line.match(/^Answer:\s*([A-D])/i);
      if (ansMatch) {
        answerIdx = ansMatch[1].toUpperCase().charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
        continue;
      }
      
      // Match explanation
      const expMatch = line.match(/^Explanation:\s*(.+)/i);
      if (expMatch) {
        explanation = expMatch[1];
        continue;
      }
    }
    
    if (options.length >= 2 && answerIdx >= 0) {
      questions.push({
        q: questionText,
        options: options,
        answer: answerIdx,
        explanation: explanation || 'No explanation provided.'
      });
    }
  });
  
  return questions;
}

function parseTFFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const questions = [];
  
  const blocks = content.split(/^Q:\s*/m).filter(b => b.trim());
  
  blocks.forEach((block, idx) => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 2) return;
    
    const questionText = lines[0];
    let answer = -1;
    let explanation = '';
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const ansMatch = line.match(/^Answer:\s*(True|False)/i);
      if (ansMatch) {
        answer = ansMatch[1].toLowerCase() === 'true' ? 0 : 1;
        continue;
      }
      const expMatch = line.match(/^Explanation:\s*(.+)/i);
      if (expMatch) {
        explanation = expMatch[1];
        continue;
      }
    }
    
    if (answer >= 0) {
      questions.push({
        q: questionText,
        options: ['True', 'False'],
        answer: answer,
        explanation: explanation || 'No explanation provided.'
      });
    }
  });
  
  return questions;
}

function parseWrittenQuestion(qPath, subjectFolder, chapterName, qNum) {
  const qObj = {
    title: `Question ${qNum}`,
    description: '',
    questionImg: '',
    solutionImgs: [],
    fields: []
  };
  
  const files = fs.readdirSync(qPath);
  
  // Find question image
  const qFile = files.find(f => f.startsWith('question.'));
  if (qFile) {
    qObj.questionImg = `subjects/${subjectFolder}/Written/${chapterName}/${qNum}/${qFile}`;
  }
  
  // Find answer images (answer.png, answer1.png, answer2.png, etc.)
  const aFiles = files.filter(f => /^answer\d*\./.test(f));
  aFiles.sort();
  aFiles.forEach(aFile => {
    qObj.solutionImgs.push(`subjects/${subjectFolder}/Written/${chapterName}/${qNum}/${aFile}`);
  });
  
  // Parse fields.txt
  const fieldsPath = path.join(qPath, 'fields.txt');
  if (fs.existsSync(fieldsPath)) {
    const lines = fs.readFileSync(fieldsPath, 'utf8').split('\n');
    let parsingFields = false;
    
    lines.forEach(line => {
      const text = line.trim();
      if (!text) return;
      
      if (text.startsWith('Title:')) {
        qObj.title = text.replace('Title:', '').trim();
      } else if (text.startsWith('Description:')) {
        qObj.description = text.replace('Description:', '').trim();
      } else if (text.startsWith('Fields:')) {
        parsingFields = true;
      } else if (parsingFields) {
        // Format: Label | Unit | Answer | Tolerance
        const parts = text.split('|').map(p => p.trim());
        if (parts.length >= 3) {
          qObj.fields.push({
            label: parts[0],
            unit: parts[1] || '',
            answer: parseFloat(parts[2]),
            tolerance: parseFloat(parts[3] || '0')
          });
        }
      }
    });
  }
  
  return qObj;
}

function getTopicNameFromFilename(filename) {
  // Remove extension and clean up
  return filename.replace(/\.(txt|TXT)$/, '').replace(/ MCQs$/i, '').replace(/ TF$/i, '');
}

function getTopicIdFromFilename(filename) {
  // Create a safe ID from filename
  return filename
    .replace(/\.(txt|TXT)$/, '')
    .replace(/ MCQs$/i, '')
    .replace(/ TF$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

function getChapterMeta(chapterName) {
  // Try to extract a nice name from folder name like "ch.1", "sh.1", "lec.3"
  const chMatch = chapterName.match(/^ch\.?(\d+)/i);
  if (chMatch) return { name: `Lecture ${chMatch[1]}`, icon: '📖' };
  
  const shMatch = chapterName.match(/^sh\.?(\d+)/i);
  if (shMatch) return { name: `Sheet ${shMatch[1]}`, icon: '📋' };
  
  const lecMatch = chapterName.match(/^lec\.?(\d+)/i);
  if (lecMatch) return { name: `Lecture ${lecMatch[1]}`, icon: '📖' };
  
  return { name: chapterName, icon: '📝' };
}

// ── Main Build ──────────────────────────────────────────────

console.log('🔨 Building from subjects/ folder...\n');

if (!fs.existsSync(SUBJECTS_DIR)) {
  console.error('❌ subjects/ folder not found!');
  process.exit(1);
}

const subjectFolders = fs.readdirSync(SUBJECTS_DIR).filter(f => 
  fs.statSync(path.join(SUBJECTS_DIR, f)).isDirectory()
);

const allSubjects = [];

subjectFolders.forEach(subjectFolder => {
  const subjectPath = path.join(SUBJECTS_DIR, subjectFolder);
  const config = readConfig(path.join(subjectPath, '_config.txt'));
  
  if (!config.name) {
    config.name = subjectFolder.replace(/[-_]/g, ' ');
  }
  
  const subjectId = subjectFolder.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Scan for recognized type folders
  const typeFolders = fs.readdirSync(subjectPath).filter(f => {
    return fs.statSync(path.join(subjectPath, f)).isDirectory() && 
           Object.keys(RECOGNIZED_TYPES).includes(f);
  });
  
  let hasMCQ = false;
  let hasTF = false;
  let hasWritten = false;
  
  // ── Process MCQ folder ──
  const mcqQuestions = {};
  const mcqTopicMeta = {};
  const mcqPath = path.join(subjectPath, 'MCQ');
  
  if (fs.existsSync(mcqPath)) {
    hasMCQ = true;
    const mcqFiles = fs.readdirSync(mcqPath).filter(f => f.endsWith('.txt'));
    
    mcqFiles.forEach(file => {
      const topicId = getTopicIdFromFilename(file);
      const topicName = getTopicNameFromFilename(file);
      const filePath = path.join(mcqPath, file);
      
      const questions = parseMCQFile(filePath);
      if (questions.length > 0) {
        // Add IDs to questions
        questions.forEach((q, i) => {
          q.id = `${subjectId}_${topicId}_${i + 1}`;
        });
        mcqQuestions[topicId] = questions;
        mcqTopicMeta[topicId] = { name: topicName, icon: '📝', sheet: topicName };
        console.log(`  📝 MCQ: ${file} → ${questions.length} questions`);
      }
    });
  }
  
  // ── Process TF folder ──
  const tfQuestions = {};
  const tfTopicMeta = {};
  const tfPath = path.join(subjectPath, 'TF');
  
  if (fs.existsSync(tfPath)) {
    hasTF = true;
    const tfFiles = fs.readdirSync(tfPath).filter(f => f.endsWith('.txt'));
    
    tfFiles.forEach(file => {
      const topicId = getTopicIdFromFilename(file);
      const topicName = getTopicNameFromFilename(file);
      const filePath = path.join(tfPath, file);
      
      const questions = parseTFFile(filePath);
      if (questions.length > 0) {
        questions.forEach((q, i) => {
          q.id = `${subjectId}_tf_${topicId}_${i + 1}`;
        });
        tfQuestions[topicId] = questions;
        tfTopicMeta[topicId] = { name: topicName, icon: '✅', sheet: topicName };
        console.log(`  ✅ TF: ${file} → ${questions.length} questions`);
      }
    });
  }
  
  // ── Process Written folder ──
  const writtenQuestions = {};
  const writtenTopicMeta = {};
  const writtenPath = path.join(subjectPath, 'Written');
  
  if (fs.existsSync(writtenPath)) {
    hasWritten = true;
    const chapters = fs.readdirSync(writtenPath).filter(f => 
      fs.statSync(path.join(writtenPath, f)).isDirectory()
    );
    
    chapters.sort((a, b) => {
      // Sort chapters: ch.1, ch.2, ..., sh.1, sh.2, ...
      const aNum = parseInt(a.replace(/[^\d]/g, '')) || 0;
      const bNum = parseInt(b.replace(/[^\d]/g, '')) || 0;
      const aPrefix = a.replace(/[\d.]/g, '');
      const bPrefix = b.replace(/[\d.]/g, '');
      if (aPrefix !== bPrefix) return aPrefix.localeCompare(bPrefix);
      return aNum - bNum;
    });
    
    chapters.forEach(ch => {
      const chPath = path.join(writtenPath, ch);
      const questionDirs = fs.readdirSync(chPath).filter(f => 
        fs.statSync(path.join(chPath, f)).isDirectory()
      );
      
      // Sort question dirs numerically
      questionDirs.sort((a, b) => parseInt(a) - parseInt(b));
      
      if (questionDirs.length === 0) return;
      
      const topicId = ch.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      const chMeta = getChapterMeta(ch);
      
      writtenQuestions[topicId] = [];
      writtenTopicMeta[topicId] = { name: chMeta.name, icon: chMeta.icon, sheet: ch };
      
      questionDirs.forEach(qNum => {
        const qPath = path.join(chPath, qNum);
        const qObj = parseWrittenQuestion(qPath, subjectFolder, ch, qNum);
        qObj.id = `written_${topicId}_${qNum}`;
        writtenQuestions[topicId].push(qObj);
      });
      
      console.log(`  🧮 Written: ${ch} → ${questionDirs.length} questions`);
    });
  }
  
  // ── Generate output files ──
  const outputDir = path.join(subjectPath);
  
  // MCQ + TF combined into questions.js
  const allMCQandTF = { ...mcqQuestions, ...tfQuestions };
  const allMCQandTFMeta = { ...mcqTopicMeta, ...tfTopicMeta };
  
  if (Object.keys(allMCQandTF).length > 0) {
    let output = `// ============================================================\n`;
    output += `// AUTO-GENERATED FILE — Do not edit!\n`;
    output += `// Edit text files in subjects/${subjectFolder}/MCQ/ or TF/ and run: node build.js\n`;
    output += `// Generated: ${new Date().toISOString()}\n`;
    output += `// ============================================================\n\n`;
    output += `var QUESTIONS = ${JSON.stringify(allMCQandTF, null, 2)};\n\n`;
    output += `var TOPIC_META = ${JSON.stringify(allMCQandTFMeta, null, 2)};\n`;
    
    fs.writeFileSync(path.join(outputDir, 'questions.js'), output, 'utf8');
  }
  
  // Written into calc-questions.js
  if (Object.keys(writtenQuestions).length > 0) {
    let output = `// ============================================================\n`;
    output += `// AUTO-GENERATED FILE — Do not edit!\n`;
    output += `// Edit files in subjects/${subjectFolder}/Written/ and run: node build.js\n`;
    output += `// Generated: ${new Date().toISOString()}\n`;
    output += `// ============================================================\n\n`;
    output += `var CALC_QUESTIONS = ${JSON.stringify(writtenQuestions, null, 2)};\n\n`;
    output += `var CALC_TOPIC_META = ${JSON.stringify(writtenTopicMeta, null, 2)};\n`;
    
    fs.writeFileSync(path.join(outputDir, 'calc-questions.js'), output, 'utf8');
  }
  
  // Build subject entry
  const subjectEntry = {
    id: subjectId,
    name: config.name,
    icon: config.icon,
    description: config.description,
    folder: `subjects/${subjectFolder}`,
    dataFile: `subjects/${subjectFolder}/questions.js`,
    hasCalc: hasWritten,
    hasTF: hasTF
  };
  
  if (hasWritten) {
    subjectEntry.calcDataFile = `subjects/${subjectFolder}/calc-questions.js`;
  }
  
  allSubjects.push(subjectEntry);
  
  const totalMCQ = Object.values(mcqQuestions).reduce((a, q) => a + q.length, 0);
  const totalTF = Object.values(tfQuestions).reduce((a, q) => a + q.length, 0);
  const totalWritten = Object.values(writtenQuestions).reduce((a, q) => a + q.length, 0);
  
  console.log(`\n✅ ${config.name}: ${totalMCQ} MCQs, ${totalTF} TF, ${totalWritten} Written\n`);
});

// ── Generate subjects.js ──
let subjectsOutput = `// ============================================================\n`;
subjectsOutput += `// AUTO-GENERATED FILE — Do not edit!\n`;
subjectsOutput += `// Add/edit subject folders in subjects/ and run: node build.js\n`;
subjectsOutput += `// Generated: ${new Date().toISOString()}\n`;
subjectsOutput += `// ============================================================\n\n`;
subjectsOutput += `const SUBJECTS = ${JSON.stringify(allSubjects, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, 'subjects.js'), subjectsOutput, 'utf8');

console.log('─'.repeat(50));
console.log(`📦 Generated subjects.js with ${allSubjects.length} subject(s)`);
console.log(`\n🎉 Build complete! Open index.html to test.`);
