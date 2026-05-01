#!/usr/bin/env python3
"""
================================================================================
ELECTRONICS II QUESTION EXTRACTION TOOL
================================================================================

Purpose:
  Automate extraction of written problem questions from lecture PDFs,
  including screenshot capture and JSON generation for the MultiQuiz app.

Requirements:
  pip install pdfplumber pdf2image pillow

Usage:
  python extract_questions.py --lecture 7 --examples 3.4,3.5,3.7,3.10
  python extract_questions.py --audit             # Check all questions
  python extract_questions.py --generate-json --lecture 7

================================================================================
"""

import argparse
import json
import os
import sys
from pathlib import Path
from typing import List, Dict, Tuple
import re

try:
    import pdfplumber
except ImportError:
    print("ERROR: pdfplumber not installed. Run: pip install pdfplumber pdf2image")
    sys.exit(1)

try:
    from pdf2image import convert_from_path
except ImportError:
    print("ERROR: pdf2image not installed. Run: pip install pdf2image")
    sys.exit(1)

try:
    from PIL import Image, ImageDraw, ImageOps
except ImportError:
    print("ERROR: Pillow not installed. Run: pip install pillow")
    sys.exit(1)


# ============================================================================
# CONFIGURATION
# ============================================================================

CONFIG = {
    "base_dir": Path(__file__).parent / "Electronics-2",
    "questions_data_dir": "Electronics-2/questions_data",
    "dpi": 200,
    "crop_margin": 30,  # pixels to keep around extracted content
    "lecture_files": {
        1: "Electronics2 - Lec1.pdf",
        2: "Electronics2 - Lec2.pdf",
        3: "Electronics2 - Lec3.pdf",
        4: "Electronics2 - Lec4.pdf",
        5: "Electronics2 - Lec5.pdf",
        6: "Electronics2 - Lec6.pdf",
        7: "Electronics2 - Lec7.pdf",
    },
    "expected_questions": {
        1: {1, 2, 3, 4},
        2: {1, 2},
        3: {1, 2},
        4: {1, 2, 3, 4},
        6: {1, 2, 3},
        7: {1, 2, 3, 4, 5, 6, 7, 8, 9, 10},  # Should have 10 examples
    }
}


# ============================================================================
# CORE EXTRACTION FUNCTIONS
# ============================================================================

class QuestionExtractor:
    """Extract questions from PDF and generate structured data"""

    def __init__(self, base_dir: Path = None):
        self.base_dir = base_dir or CONFIG["base_dir"]
        self.extracted_questions = []

    def extract_from_pdf(self, lecture: int, examples: List[float] = None,
                        dpi: int = 200) -> Dict:
        """
        Extract questions from a lecture PDF.
        
        Args:
            lecture: Lecture number (1-7)
            examples: List of example numbers to extract (e.g., [3.4, 3.5])
            dpi: DPI for PDF rendering
            
        Returns:
            Dict with extracted question data
        """
        pdf_file = self.base_dir / CONFIG["lecture_files"][lecture]
        
        if not pdf_file.exists():
            print(f"ERROR: PDF not found: {pdf_file}")
            return {}

        print(f"\n📖 Processing: {pdf_file.name}")
        print(f"   Looking for examples: {examples}")

        extracted = {}
        
        # Use pdfplumber for text extraction
        with pdfplumber.open(pdf_file) as pdf:
            all_text = ""
            page_map = {}  # Map text content to page numbers
            
            for page_num, page in enumerate(pdf.pages):
                text = page.extract_text()
                all_text += text
                
                # Build page map to find example locations
                for match in re.finditer(r"Example\s+(\d+\.\d+)", text):
                    example_num = float(match.group(1))
                    if page_num not in page_map:
                        page_map[page_num] = []
                    page_map[page_num].append(example_num)

        # Find page numbers for requested examples
        if not examples:
            # Extract all examples found
            examples = set()
            for example_list in page_map.values():
                examples.update(example_list)
            examples = sorted(list(examples))

        print(f"\n✓ Found examples: {examples}")
        
        return {
            "lecture": lecture,
            "pdf_file": str(pdf_file),
            "examples_found": sorted(list(set(e for pages in page_map.values() for e in pages))),
            "page_map": page_map,
            "requested_examples": examples
        }

    def find_example_in_text(self, pdf_path: str, example_num: float) -> Dict:
        """Find specific example in PDF and extract context"""
        result = {
            "example": example_num,
            "title": None,
            "description": None,
            "page_range": None,
            "content_snippet": None
        }

        pattern = rf"Example\s+{re.escape(str(example_num))}\s*[–:-]?\s*(.+?)(?=Example|\Z)"
        
        with pdfplumber.open(pdf_path) as pdf:
            full_text = ""
            page_num = 0
            
            for page_num, page in enumerate(pdf.pages):
                text = page.extract_text()
                full_text += text

            match = re.search(pattern, full_text, re.IGNORECASE | re.DOTALL)
            if match:
                content = match.group(0)
                
                # Extract title (first line with example)
                title_match = re.search(r"Example\s+[\d.]+\s*[–:-]?\s*(.{0,80})", content)
                if title_match:
                    result["title"] = title_match.group(1).strip()

                # Extract description (next 150 chars after title)
                desc_match = re.search(
                    r"(?:Given|Determine|Calculate|Find|For).{20,150}?[.!?]",
                    content,
                    re.IGNORECASE
                )
                if desc_match:
                    result["description"] = desc_match.group(0).strip()

                result["content_snippet"] = content[:250]

        return result

    def screenshot_page_region(self, pdf_path: str, page_num: int,
                              output_path: Path, dpi: int = 200) -> bool:
        """
        Convert PDF page region to image.
        
        Args:
            pdf_path: Path to PDF
            page_num: Page number (0-indexed)
            output_path: Where to save PNG
            dpi: DPI for rendering
            
        Returns:
            True if successful
        """
        try:
            images = convert_from_path(pdf_path, first_page=page_num+1,
                                      last_page=page_num+1, dpi=dpi)
            if images:
                output_path.parent.mkdir(parents=True, exist_ok=True)
                images[0].save(output_path, "PNG")
                return True
        except Exception as e:
            print(f"ERROR taking screenshot: {e}")
        return False

    def generate_json_template(self, lecture: int, example_num: float,
                              title: str = None, description: str = None,
                              fields: List[Dict] = None) -> Dict:
        """Generate JSON template for a question"""
        chapter = int(example_num)
        sub_example = example_num - chapter
        
        # Map example numbers to question IDs
        # Lecture examples use progression, e.g., 3.4 → Example 3.4
        question_id = f"written_ch{chapter}_{int(example_num * 10) % 10}"
        
        return {
            "id": question_id,
            "title": title or f"Example {example_num} — [Topic Name]",
            "description": description or "Analyze the shown circuit/system and determine the requested values.",
            "questionImg": f"Electronics-2/questions_data/ch{chapter}/{int(sub_example*10) % 10}/question.png",
            "solutionImgs": [
                f"Electronics-2/questions_data/ch{chapter}/{int(sub_example*10) % 10}/answer.png"
            ],
            "fields": fields or [
                {
                    "label": "Variable",
                    "unit": "units",
                    "answer": 0.0,
                    "tolerance": 0.0
                }
            ]
        }


# ============================================================================
# AUDIT & VERIFICATION
# ============================================================================

class QuestionAuditor:
    """Verify question coverage and completeness"""

    def audit_all_lectures(self, questions_file: Path = None) -> Dict:
        """Check which questions are missing"""
        if questions_file is None:
            questions_file = CONFIG["base_dir"] / "calc-questions.js"

        audit_results = {}
        
        with open(questions_file, 'r', encoding='utf-8') as f:
            content = f.read()

        for lecture, expected_examples in CONFIG["expected_questions"].items():
            found_examples = set()
            
            # Look for question IDs in the file
            pattern = rf'"lec{lecture}":\s*\[(.*?)\]'
            match = re.search(pattern, content, re.DOTALL)
            
            if match:
                section = match.group(1)
                # Find all example numbers referenced
                for example_match in re.finditer(r'"Example\s+([\d.]+)', section):
                    found_examples.add(float(example_match.group(1)))

            missing = expected_examples - found_examples
            audit_results[f"lecture_{lecture}"] = {
                "expected": sorted(list(expected_examples)),
                "found": sorted(list(found_examples)),
                "missing": sorted(list(missing)),
                "complete": len(missing) == 0
            }

        return audit_results

    def print_audit_report(self, audit_results: Dict):
        """Print formatted audit report"""
        print("\n" + "="*70)
        print("QUESTION AUDIT REPORT")
        print("="*70)
        
        total_missing = 0
        for lecture_key, data in sorted(audit_results.items()):
            lecture_num = int(lecture_key.split("_")[1])
            status = "✓" if data["complete"] else "✗"
            missing_count = len(data["missing"])
            total_missing += missing_count
            
            print(f"\n{status} Lecture {lecture_num}:")
            print(f"  Found: {len(data['found'])} questions")
            print(f"  Expected: {len(data['expected'])} questions")
            
            if data["missing"]:
                print(f"  MISSING: {data['missing']}")

        print("\n" + "="*70)
        if total_missing == 0:
            print("✓ All questions present!")
        else:
            print(f"✗ {total_missing} questions missing across all lectures")
        print("="*70 + "\n")


# ============================================================================
# COMMAND-LINE INTERFACE
# ============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="Extract written questions from Electronics II PDFs",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Extract specific examples from Lecture 7
  python extract_questions.py --lecture 7 --examples 3.4,3.5,3.7,3.10
  
  # Audit all questions to find missing ones
  python extract_questions.py --audit
  
  # Generate JSON templates for manual entry
  python extract_questions.py --generate-json --lecture 7 --examples 3.4
        """
    )

    parser.add_argument("--lecture", type=int, choices=[1,2,3,4,5,6,7],
                       help="Lecture number to process")
    parser.add_argument("--examples", type=str,
                       help="Comma-separated example numbers (e.g., 3.4,3.5,3.7)")
    parser.add_argument("--audit", action="store_true",
                       help="Audit all questions for completeness")
    parser.add_argument("--generate-json", action="store_true",
                       help="Generate JSON templates instead of extracting images")
    parser.add_argument("--dpi", type=int, default=200,
                       help="DPI for PDF rendering (default: 200)")
    parser.add_argument("--output-dir", type=Path,
                       help="Output directory (default: Electronics-2/questions_data/)")

    args = parser.parse_args()

    # Run audit if requested
    if args.audit:
        auditor = QuestionAuditor()
        results = auditor.audit_all_lectures()
        auditor.print_audit_report(results)
        return

    # Extract questions
    if args.lecture:
        extractor = QuestionExtractor()
        
        # Parse example numbers
        examples = None
        if args.examples:
            examples = [float(x.strip()) for x in args.examples.split(",")]

        # Run extraction
        result = extractor.extract_from_pdf(args.lecture, examples, args.dpi)
        
        if args.generate_json:
            print("\n" + "="*70)
            print("JSON TEMPLATES (for manual data entry)")
            print("="*70)
            
            for example in result.get("requested_examples", []):
                info = extractor.find_example_in_text(
                    str(CONFIG["base_dir"] / CONFIG["lecture_files"][args.lecture]),
                    example
                )
                template = extractor.generate_json_template(
                    args.lecture,
                    example,
                    title=info.get("title"),
                    description=info.get("description")
                )
                print(json.dumps(template, indent=2))
                print("\n" + "-"*70 + "\n")
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
