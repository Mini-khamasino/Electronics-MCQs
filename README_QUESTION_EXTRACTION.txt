================================================================================
AI-FRIENDLY QUESTION EXTRACTION TOOLKIT
================================================================================

For: Other AI models (and humans) trying to extract written questions from
      Electronics II lecture PDFs and add them to the MultiQuiz web app

Created: April 27, 2026
Status: Ready to use

================================================================================
QUICK START
================================================================================

If you're just trying to add missing Lecture 7 questions (3.4, 3.5, 3.7, 3.10):

1. Read: LECTURE7_MISSING_QUESTIONS_TEMPLATE.txt
2. Get the PDF: Electronics2 - Lec7.pdf
3. Follow the step-by-step instructions in the template
4. Save screenshots to correct directories
5. Extract answer values
6. Create JSON objects and add to calc-questions.js
7. Run: python audit_questions_simple.py
8. Test in browser at http://localhost:8000

For complete documentation, see files below.

================================================================================
FILES IN THIS TOOLKIT
================================================================================

📄 README.md (this file)
   Overview of all tools
   Quick start guide
   Architecture explanation
   
📄 QUESTION_EXTRACTION_STRATEGY.txt
   Comprehensive extraction methodology
   Stage-by-stage workflow
   Complete audit process
   Full checklist before deployment
   Important notes for AI models
   
📄 LECTURE7_MISSING_QUESTIONS_TEMPLATE.txt
   Focused guide for adding missing Lecture 7 questions
   Step-by-step extraction for Examples 3.4, 3.5, 3.7, 3.10
   Templates for each question
   Formatting rules for calc-questions.js
   Tolerance extraction guide
   
🐍 audit_questions_simple.py
   Python audit script (NO dependencies required)
   Reads calc-questions.js and identifies missing questions
   Generates extraction guide with PDF source files
   Validates question coverage across all chapters
   
   Usage:
     python audit_questions_simple.py
     
   Output:
     - Lists all missing questions
     - Shows which PDFs contain them
     - Provides extraction instructions
     
🐍 extract_questions.py
   Advanced extraction script (requires dependencies)
   Can read PDFs and extract text
   Generates JSON templates automatically
   
   Dependencies:
     pip install pdfplumber pdf2image pillow
     
   Usage:
     python extract_questions.py --audit
     python extract_questions.py --lecture 7 --examples 3.4,3.5,3.7,3.10
     

================================================================================
PROBLEM WE'RE SOLVING
================================================================================

Current Status:
  ✓ Electronics II written practice questions: 18/22 complete
  ✓ Lecture 1-6: All questions present
  ✗ Lecture 7: Only 3/7 questions present

Missing Questions:
  Lecture 7 - Examples 3.4, 3.5, 3.7, 3.10 (4 questions)
  
Why This Matters:
  - Students can't practice all topics from Lecture 7
  - Coverage is incomplete at 81.8% instead of 100%
  - These are important op-amp application examples

================================================================================
ARCHITECTURE OF THE DATA
================================================================================

Questions are stored in: Electronics-2/calc-questions.js

Structure:
  var CALC_QUESTIONS = {
    "lec1": [ 4 questions ],
    "lec2": [ 2 questions ],
    "lec3": [ 2 questions ],
    "lec4": [ 4 questions ],
    "lec6": [ 3 questions ],
    "lec7": [ 3 questions - MISSING 4 ]  ← NEED TO ADD
  };

Each question object contains:
  {
    "id": "written_ch7_4",           // Unique identifier
    "title": "Example 3.4 — ...",    // Topic from PDF
    "description": "Determine...",   // What to calculate
    "questionImg": "path/to/image",  // Screenshot of problem
    "solutionImgs": ["path/..."],    // Screenshot(s) of solution
    "fields": [                       // Values student must calculate
      {
        "label": "Vo",               // Variable name
        "unit": "V",                 // Unit of measurement
        "answer": 5.25,              // Correct answer
        "tolerance": 0.25            // Acceptable range: ±0.25
      }
    ]
  }

Directory Structure for Images:
  Electronics-2/
  └── questions_data/
      ├── ch1/
      │   ├── 1/
      │   │   ├── question.png
      │   │   └── answer.png
      │   ├── 2/
      │   │   ├── question.png
      │   │   └── answer.png
      │   ...
      ├── ch7/
      │   ├── 1/
      │   │   ├── question.png
      │   │   └── answer.png
      │   ├── 2/, ├── 3/  (existing)
      │   ├── 4/          ← NEW (Example 3.4)
      │   ├── 5/          ← NEW (Example 3.5)
      │   ├── 7/          ← NEW (Example 3.7)
      │   └── 10/         ← NEW (Example 3.10)

================================================================================
STEP-BY-STEP EXTRACTION WORKFLOW
================================================================================

PHASE 1: PREPARATION
  1. Get the lecture PDF (e.g., Electronics2 - Lec7.pdf)
  2. Read LECTURE7_MISSING_QUESTIONS_TEMPLATE.txt
  3. Create output directories as needed
  
PHASE 2: SCREENSHOT CAPTURE
  1. Open PDF in a reader (Adobe Reader, Preview, etc.)
  2. Find Example 3.4 in the PDF
  3. Take clean screenshot of:
     - Problem statement (question.png)
     - Solution steps (answer.png)
  4. Save to correct directory:
     Electronics-2/questions_data/ch7/4/question.png
     Electronics-2/questions_data/ch7/4/answer.png
  5. Repeat for Examples 3.5, 3.7, 3.10
  
PHASE 3: DATA EXTRACTION
  For each question, manually extract:
  1. Title: Read "Example 3.X — [Title]" from PDF
  2. Description: Read the problem statement
  3. Input values: What's GIVEN in the problem
  4. Output variables: What needs to CALCULATE
  5. Units: What are the measurement units?
  6. Answers: Calculate or find in solution
  7. Tolerance: Use extracted or default values
  
PHASE 4: JSON GENERATION
  1. Use template from LECTURE7_MISSING_QUESTIONS_TEMPLATE.txt
  2. Fill in extracted data
  3. Create JSON object
  4. Add to calc-questions.js in "lec7" array
  
PHASE 5: VALIDATION
  1. Verify JSON syntax (use jsonlint.com)
  2. Check all image paths exist
  3. Test in browser: python -m http.server 8000
  4. Open http://localhost:8000 in browser
  5. Navigate to Electronics II → Problems & Written
  6. Click on each new question and test
  7. Run audit: python audit_questions_simple.py

================================================================================
FOR OTHER AI MODELS - KEY TIPS
================================================================================

1. PDF EXTRACTION IS HARD
   - PDFs are not structured data
   - Text coordinates don't always work
   - Use OCR if needed: pytesseract, EasyOCR
   - Screenshot method is most reliable
   
2. IMAGE HANDLING
   - Save at 150-200 DPI minimum
   - Use PNG format (lossless)
   - Exclude headers, footers, page numbers
   - Keep consistent margins
   
3. DATA VALIDATION
   - Always check answer is numeric
   - Verify units are consistent
   - Test tolerance range (answer ± tolerance)
   - Consider real-world measurement error
   
4. JSON STRUCTURE REQUIREMENTS
   - Every question needs an ID (unique per lecture)
   - Every field needs: label, unit, answer, tolerance
   - All field values must be numbers (JSON spec)
   - Units can be empty string "" for dimensionless
   
5. TESTING IS CRITICAL
   - Always test in browser after changes
   - Verify images load
   - Test answer submission with correct/incorrect values
   - Check that tolerance validation works
   - Ensure solution images appear
   
6. AUTOMATION ADVICE
   - Text extraction: Use pdfplumber (best for PDFs)
   - Image extraction: pdf2image library
   - Screenshot: PIL/Pillow for image processing
   - JSON validation: python -m json.tool
   - Browser testing: selenium, playwright for automation
   
7. COMMON MISTAKES TO AVOID
   ✗ Wrong directory names (ch7/1/ instead of ch7/10/)
   ✗ Mismatched ID numbering
   ✗ Broken image paths
   ✗ Invalid JSON syntax (trailing commas, wrong quotes)
   ✗ Non-numeric answer values
   ✗ Negative tolerance values
   ✗ Missing required fields
   ✓ Always validate before deploying

================================================================================
USING THE PYTHON SCRIPTS
================================================================================

SCRIPT 1: audit_questions_simple.py
  Purpose: Find missing questions without any dependencies
  
  Command: python audit_questions_simple.py
  
  Output: Report showing:
    - Questions found vs expected
    - Missing examples by chapter
    - Step-by-step extraction guide
    - PDF source files for each missing question
  
  No dependencies needed!

SCRIPT 2: extract_questions.py (Advanced)
  Purpose: Automated extraction from PDFs
  
  Prerequisites:
    pip install pdfplumber pdf2image pillow
  
  Commands:
    # Show what's missing
    python extract_questions.py --audit
    
    # Extract specific examples as JSON templates
    python extract_questions.py --lecture 7 --examples 3.4,3.5,3.7,3.10 --generate-json
    
    # Extract and save images
    python extract_questions.py --lecture 7 --examples 3.4,3.5 --dpi 200
  
  Note: This script generates JSON TEMPLATES - you still need to:
    - Verify it correctly parsed the PDF
    - Manually check extracted answers
    - Fill in any missing fields
    - Test thoroughly

================================================================================
COMPLETE CHECKLIST FOR ADDING QUESTIONS
================================================================================

PRE-EXTRACTION:
  □ Read all strategy documents
  □ Have PDF open and accessible
  □ Create output directories if needed
  □ Have text editor ready for JSON
  
SCREENSHOT CAPTURE:
  □ Find Example 3.4 in PDF
  □ Take clear screenshot of question
  □ Take clear screenshot of solution
  □ Save to correct directories with correct names
  □ Repeat for Examples 3.5, 3.7, 3.10
  
DATA EXTRACTION:
  □ Read problem title and store
  □ Read problem description
  □ Identify all variables to calculate
  □ Find correct answer values
  □ Determine appropriate units
  □ Establish tolerance ranges
  
JSON CREATION:
  □ Use template structure from guide
  □ Fill in all required fields
  □ Verify JSON syntax is valid
  □ Check image paths are correct
  □ Ensure IDs are unique
  
FILE UPDATES:
  □ Add all four question objects to "lec7" array
  □ Maintain proper JSON formatting (commas)
  □ Backup original calc-questions.js
  □ Validate updated JSON syntax
  
BROWSER TESTING:
  □ Start local server: python -m http.server 8000
  □ Navigate to Electronics II → Problems & Written
  □ Click on each new question
  □ Verify images load correctly
  □ Test answer submission (correct and incorrect)
  □ Test tolerance validation
  □ Click "View Solution" button
  □ Verify all images display properly
  
FINAL VALIDATION:
  □ Run: python audit_questions_simple.py
  □ Verify "Chapter 7: 7/7 (100%)" shows COMPLETE
  □ Test with other browser if possible
  □ Check console for JavaScript errors
  □ Test on different screen sizes if possible
  □ Confirm answers round to expected precision

================================================================================
EXAMPLE WALKTHROUGH - Adding Example 3.4
================================================================================

1. LOCATE EXAMPLE IN PDF
   Open: Electronics2 - Lec7.pdf
   Search: "Example 3.4"
   Note page number: ___
   
2. SCREENSHOT QUESTION
   Select the problem statement area
   Take screenshot → save as:
   Electronics-2/questions_data/ch7/4/question.png
   
3. SCREENSHOT SOLUTION
   Scroll to solution section
   Take screenshot(s) of solution steps
   Save as: Electronics-2/questions_data/ch7/4/answer.png
   (or answer1.png, answer2.png if multiple pages)
   
4. READ AND EXTRACT DATA
   From problem:
     Title: "Example 3.4 — Differentiator Circuit"
     Description: "For a differentiator with..."
     What to find: "Determine Vo for Vi = 1V"
   
   From solution:
     Vo = 5.5V
     (Search for final answer in solution)
   
5. CREATE JSON
   {
     "id": "written_ch7_4",
     "title": "Example 3.4 — Differentiator Circuit",
     "description": "For the differentiator circuit, determine...",
     "questionImg": "Electronics-2/questions_data/ch7/4/question.png",
     "solutionImgs": [
       "Electronics-2/questions_data/ch7/4/answer.png"
     ],
     "fields": [
       {
         "label": "Vo",
         "unit": "V",
         "answer": 5.5,
         "tolerance": 0.25
       }
     ]
   }

6. ADD TO CALC-QUESTIONS.JS
   Find the "lec7" array (around line 500+)
   Add the JSON object after written_ch7_1
   Don't forget the comma!
   
7. VALIDATE
   Run: python -m json.tool Electronics-2/calc-questions.js
   Should show no errors
   
8. TEST
   Start server: python -m http.server 8000
   Open http://localhost:8000
   Navigate to Electronics II → Problems & Written → Op-Amp Applications
   Click on "Example 3.4" and test the question
   
9. VERIFY
   If all works, repeat for Examples 3.5, 3.7, 3.10
   Then run: python audit_questions_simple.py
   Should show 7/7 complete for Chapter 7

================================================================================
TROUBLESHOOTING
================================================================================

"Questions don't load in browser"
  → Check image paths in JSON (should start with "Electronics-2/")
  → Verify image files actually exist
  → Check browser console for JavaScript errors (F12)
  → May need to reload page or clear browser cache

"JSON is invalid"
  → Use online validator: jsonlint.com
  → Check for missing commas between objects
  → Check for trailing commas (not allowed after last item)
  → Ensure all strings use double quotes, not single quotes
  → Run: python -m json.tool to check syntax

"Images won't display"
  → Verify file paths are correct
  → Check image file extensions (.png not .PNG if case-sensitive)
  → Try opening image file directly in browser
  → Check file permissions
  → May need to convert image format

"Answer validation is wrong"
  → Check tolerance range: answer ± tolerance
  → Example: answer=5.5, tolerance=0.25 → accepts 5.25-5.75
  → Make tolerance realistic but not too loose
  → Verify numeric answer is correct in first place

"Screenshot is too blurry"
  → Use higher DPI when capturing (150-200 minimum)
  → Use full-resolution screenshots from PDF viewer
  → Zoom in on PDF before taking screenshot
  → Use quality-preserving tools (not phone photos)

"Can't find example in PDF"
  → Make sure correct PDF file (Lec7, not Lec6)
  → Try searching for "3.4" in PDF viewer
  → Check index/table of contents
  → May be late in document
  → If truly missing, check if it's in different PDF file

================================================================================
SUPPORT REFERENCES
================================================================================

Online Tools:
  - JSON Validator: https://jsonlint.com/
  - Python JSON: python -m json.tool <file>
  - PDF Screenshot Tools: Use built-in tools in PDF reader
  - Image Optimization: TinyPNG (online compressor)

Python Libraries:
  - pdfplumber: Advanced PDF text extraction
  - pdf2image: Convert PDF pages to images  
  - Pillow: Image processing and manipulation
  - pytesseract: OCR for scanned PDFs

Browser DevTools:
  - F12 or Ctrl+Shift+I: Open developer console
  - Check "Console" tab for JavaScript errors
  - Check "Network" tab to verify images load
  - Check "Sources" tab to debug script issues

Testing Tools:
  - http.server: Local testing server (built-in Python)
  - Browser refresh: Ctrl+F5 (hard refresh)
  - Clear cache: Ctrl+Shift+Delete
  - Incognito/Private mode: Fresh page load

================================================================================
FINAL NOTES
================================================================================

This toolkit is designed for AI models and humans who are "not that smart"
(per user request!) to extract writing questions without needing deep 
technical knowledge.

Key Principles:
  ✓ Step-by-step guidance for every task
  ✓ No obscure technical jargon
  ✓ Automation where possible, manual where needed
  ✓ Validation at every step
  ✓ Multiple documentation formats
  ✓ Real examples and templates
  ✓ Troubleshooting for common issues

Remember:
  - This is domain-specific but not rocket science
  - If stuck, re-read the relevant section
  - Testing in browser is your best friend
  - When in doubt, check image files exist
  - Validate JSON before anything else

Good luck! 🚀

================================================================================
