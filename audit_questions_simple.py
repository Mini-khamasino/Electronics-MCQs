#!/usr/bin/env python3
"""
================================================================================
SIMPLE QUESTION AUDIT TOOL (No Dependencies Required)
================================================================================

Purpose:
  Audit calc-questions.js to find missing written questions.
  Pure Python - no external libraries needed.

Usage:
  python audit_questions_simple.py

Output:
  Lists all missing questions and where to extract them from.

================================================================================
"""

import re
import json
from pathlib import Path
from typing import Dict, List, Set, Tuple

class SimpleAuditor:
    """Audit questions without external dependencies"""
    
    # Expected question examples for each lecture/chapter
    # Maps lecture_number -> expected example numbers from that lecture's PDF
    EXPECTED_QUESTIONS = {
        1: [1.1, 1.2, 1.3, 1.4],                           # Lec 1: 4 questions
        2: [1.5, 1.6],                                      # Lec 2: 2 questions  
        3: [2.1, 2.2],                                      # Lec 3: 2 questions
        4: [2.3, 2.4, 2.5, 2.6],                           # Lec 4: 4 questions
        6: [3.1, 3.2, 3.3],                                # Lec 6: 3 questions
        7: [3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10],          # Lec 7: 7 questions
    }
    
    def __init__(self, calc_questions_file: Path):
        self.file = calc_questions_file
        self.found_questions = {}
        self.missing_questions = {}
        
    def load_and_parse(self) -> bool:
        """Parse calc-questions.js to extract Example numbers"""
        try:
            with open(self.file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find all "title": "Example X.Y — ..." entries
            pattern = r'"title":\s*"Example\s+([\d.]+)\s*[–-]?'
            matches = re.findall(pattern, content)
            
            print(f"✓ Found {len(matches)} questions in calc-questions.js")
            
            # Group by chapter
            for match in matches:
                example_num = float(match)
                chapter = int(example_num)
                
                if chapter not in self.found_questions:
                    self.found_questions[chapter] = []
                self.found_questions[chapter].append(example_num)
            
            # Sort each chapter's questions
            for chapter in self.found_questions:
                self.found_questions[chapter].sort()
                
            return True
            
        except Exception as e:
            print(f"✗ Error reading file: {e}")
            return False
    
    def find_missing(self):
        """Identify missing questions"""
        for chapter, expected in self.EXPECTED_QUESTIONS.items():
            found = set(self.found_questions.get(chapter, []))
            expected_set = set(expected)
            missing = sorted(expected_set - found)
            
            if missing:
                self.missing_questions[chapter] = missing
    
    def print_report(self):
        """Print formatted audit report"""
        print("\n" + "="*80)
        print(" "*20 + "QUESTION AUDIT REPORT")
        print("="*80)
        
        total_expected = sum(len(v) for v in self.EXPECTED_QUESTIONS.values())
        total_found = sum(len(v) for v in self.found_questions.values())
        total_missing = sum(len(v) for v in self.missing_questions.values())
        
        print(f"\nOVERALL STATISTICS:")
        print(f"  Expected: {total_expected} questions")
        print(f"  Found:    {total_found} questions")
        print(f"  Missing:  {total_missing} questions")
        print(f"  Coverage: {(total_found/total_expected*100):.1f}%")
        
        print("\n" + "-"*80)
        print("CHAPTER-BY-CHAPTER BREAKDOWN:")
        print("-"*80)
        
        for chapter in sorted(self.EXPECTED_QUESTIONS.keys()):
            expected = self.EXPECTED_QUESTIONS[chapter]
            found = self.found_questions.get(chapter, [])
            missing = self.missing_questions.get(chapter, [])
            
            status = "✓" if not missing else "✗"
            pct = (len(found) / len(expected) * 100) if expected else 0
            
            print(f"\n{status} CHAPTER {chapter} (Examples {expected[0]}-{expected[-1]}):")
            print(f"    Found:   {len(found):2d}/{len(expected):2d} ({pct:5.1f}%)  {found}")
            
            if missing:
                print(f"    Missing: {len(missing):2d}      Examples: {missing}")
                print(f"    Action:  Need to extract and add these examples")
        
        print("\n" + "="*80)
        
        if total_missing == 0:
            print("✓ ALL QUESTIONS PRESENT - FULLY COMPLETE!")
        else:
            print(f"⚠ {total_missing}/{total_expected} QUESTIONS MISSING - EXTRACTION NEEDED")
            self.print_extraction_guide()
        
        print("="*80 + "\n")
    
    def print_extraction_guide(self):
        """Print guide for extracting missing questions"""
        print("\nEXTRACTION GUIDE:")
        print("-"*80)
        
        for chapter in sorted(self.missing_questions.keys()):
            missing = self.missing_questions[chapter]
            print(f"\nLecture {chapter} - Missing Examples:")
            
            for example_num in missing:
                print(f"  → Example {example_num}")
                print(f"      Source: Electronics2 - Lec{chapter}.pdf")
                print(f"      Output: Electronics-2/questions_data/ch{chapter}/{int(example_num*10)%10}/")
                print(f"      Steps:")
                print(f"        1. Open PDF and find Example {example_num}")
                print(f"        2. Screenshot the problem statement → question.png")
                print(f"        3. Screenshot the solution → answer.png")
                print(f"        4. Extract values, units, and answers manually")
                print(f"        5. Add JSON entry to calc-questions.js 'lec{chapter}' array")


def main():
    """Main entry point"""
    
    # Find the calc-questions.js file
    calc_file = Path(__file__).parent / "Electronics-2" / "calc-questions.js"
    
    if not calc_file.exists():
        print(f"ERROR: {calc_file} not found")
        return 1
    
    # Run audit
    auditor = SimpleAuditor(calc_file)
    
    if not auditor.load_and_parse():
        return 1
    
    auditor.find_missing()
    auditor.print_report()
    
    return 0


if __name__ == "__main__":
    exit(main())
