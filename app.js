// ============================================================
// Review Platform — Application Logic
// ============================================================

(function () {
  "use strict";

  // ── Storage & State ───────────────────────────────────────
  const STORAGE_KEYS = {
    theme: "cleanslate_theme",
    mistakes: "reviewapp_mistakes"
  };

  let state = {
    currentSubject: null,
    currentCategory: null,
    currentQuestionIndex: 0,
    questionQueue: [], // The list of questions currently being practiced
    mistakes: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.mistakes) || "[]"))
  };

  // ── DOM Refs ─────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const views = {
    home: $("#view-home"),
    subject: $("#view-subject"),
    category: $("#view-category"),
    flashcard: $("#view-flashcard"),
    mistakes: $("#view-mistakes")
  };

  // ── Theme ────────────────────────────────────────────────
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    if (saved === "light") {
      document.documentElement.classList.add("light");
      $("#theme-toggle").textContent = "☀️";
    }
  }

  $("#theme-toggle").addEventListener("click", () => {
    const isLight = document.documentElement.classList.toggle("light");
    localStorage.setItem(STORAGE_KEYS.theme, isLight ? "light" : "dark");
    $("#theme-toggle").textContent = isLight ? "☀️" : "🌙";
  });

  // ── Navigation ───────────────────────────────────────────
  function switchView(viewId) {
    $$(".nav-tab").forEach(t => t.classList.toggle("active", t.dataset.view === viewId));
    
    Object.values(views).forEach(v => v.classList.remove("active"));
    const activeView = views[viewId];
    if (activeView) {
      activeView.classList.add("active");
      // Trigger reflow for animation
      activeView.style.animation = "none";
      activeView.offsetHeight; 
      activeView.style.animation = "";
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // View-specific initialization
    if (viewId === 'home') renderSubjects();
    if (viewId === 'mistakes') renderMistakes();
  }

  $("#nav-home").addEventListener("click", () => switchView("home"));
  $("#nav-mistakes").addEventListener("click", () => switchView("mistakes"));
  $("#nav-logo-home").addEventListener("click", () => switchView("home"));

  $("#btn-back-home").addEventListener("click", () => switchView("home"));
  $("#btn-back-subject").addEventListener("click", () => {
    renderSubject(state.currentSubject);
    switchView("subject");
  });
  $("#btn-back-category").addEventListener("click", () => {
    if (state.isReviewingMistakes) {
      switchView("mistakes");
    } else {
      renderCategory(state.currentCategory);
      switchView("category");
    }
  });

  // ── UI Rendering ─────────────────────────────────────────

  function createCard(title, subtitle, icon, onClick, disabled = false) {
    const div = document.createElement("div");
    div.className = `action-card ${disabled ? 'disabled' : ''}`;
    div.innerHTML = `
      <div class="card-icon">${icon}</div>
      <div class="card-content">
        <h3>${title}</h3>
        <p>${subtitle}</p>
      </div>
    `;
    if (!disabled) div.addEventListener("click", onClick);
    return div;
  }

  function renderSubjects() {
    const container = $("#subjects-grid");
    container.innerHTML = "";
    SUBJECTS.forEach(sub => {
      container.appendChild(createCard(
        sub.name, 
        sub.description, 
        sub.icon, 
        () => {
          state.currentSubject = sub;
          renderSubject(sub);
          switchView("subject");
        },
        !sub.hasQuestions
      ));
    });
  }

  function renderSubject(subject) {
    $("#subject-title").textContent = subject.name;
    $("#subject-desc").textContent = subject.description;
    $("#back-subject-name").textContent = subject.name;
    
    const container = $("#categories-grid");
    container.innerHTML = "";
    
    if (!subject.categories || subject.categories.length === 0) {
      container.style.display = "none";
      $("#coming-soon-msg").style.display = "block";
    } else {
      container.style.display = "grid";
      $("#coming-soon-msg").style.display = "none";
      
      subject.categories.forEach(cat => {
        container.appendChild(createCard(
          cat.name,
          `${cat.questions.length} Questions`,
          cat.icon,
          () => {
            state.currentCategory = cat;
            renderCategory(cat);
            switchView("category");
          }
        ));
      });

      // Add "Practice All Shuffled" card
      let allQuestions = [];
      subject.categories.forEach(c => allQuestions.push(...c.questions));
      if (allQuestions.length > 0) {
        container.appendChild(createCard(
          "Practice All (Shuffled)",
          `${allQuestions.length} Mixed Questions`,
          "🔀",
          () => {
            const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
            state.currentCategory = { name: "Practice All (Shuffled)", questions: shuffled };
            state.isReviewingMistakes = false;
            startPractice(shuffled, 0);
          }
        ));
      }
    }
  }

  function renderCategory(category) {
    $("#category-title").textContent = category.name;
    
    const container = $("#questions-list");
    container.innerHTML = "";
    
    category.questions.forEach((q, idx) => {
      const isMistake = state.mistakes.has(q.id);
      
      const div = document.createElement("div");
      div.className = "list-item";
      div.innerHTML = `
        <div class="list-item-content">
          <h4>${q.label}</h4>
          <p>${q.summary}</p>
        </div>
        <div class="list-item-actions">
          ${isMistake ? '<span class="badge badge-warning">Review Needed</span>' : ''}
          <button class="btn btn-secondary">Practice</button>
        </div>
      `;
      div.addEventListener("click", () => {
        state.isReviewingMistakes = false;
        startPractice([q], 0);
      });
      container.appendChild(div);
    });

    $("#btn-practice-all").onclick = () => {
      state.isReviewingMistakes = false;
      startPractice(category.questions, 0);
    };
  }

  function renderMistakes() {
    const container = $("#mistakes-list");
    container.innerHTML = "";
    
    const mistakeQuestions = [];
    SUBJECTS.forEach(s => {
      s.categories.forEach(c => {
        c.questions.forEach(q => {
          if (state.mistakes.has(q.id)) {
            mistakeQuestions.push({...q, subjectName: s.name, categoryName: c.name});
          }
        });
      });
    });

    if (mistakeQuestions.length === 0) {
      $("#no-mistakes-msg").style.display = "block";
      container.style.display = "none";
    } else {
      $("#no-mistakes-msg").style.display = "none";
      container.style.display = "flex";
      
      // Add a "Practice All Mistakes" button at the top
      const topActions = document.createElement("div");
      topActions.className = "list-actions-top";
      topActions.innerHTML = `<button class="btn btn-primary w-full" style="margin-bottom: 20px;">Practice All Mistakes (${mistakeQuestions.length})</button>`;
      topActions.querySelector("button").addEventListener("click", () => {
        state.isReviewingMistakes = true;
        startPractice(mistakeQuestions, 0);
      });
      container.appendChild(topActions);

      mistakeQuestions.forEach((q, idx) => {
        const div = document.createElement("div");
        div.className = "list-item";
        div.innerHTML = `
          <div class="list-item-content">
            <div class="text-xs text-muted mb-1">${q.subjectName} > ${q.categoryName}</div>
            <h4>${q.label}</h4>
            <p>${q.summary}</p>
          </div>
          <div class="list-item-actions">
            <button class="btn btn-secondary">Practice</button>
          </div>
        `;
        div.addEventListener("click", () => {
          state.isReviewingMistakes = true;
          startPractice(mistakeQuestions, idx);
        });
        container.appendChild(div);
      });
    }
  }

  // ── Flashcard Logic ──────────────────────────────────────

  function startPractice(questions, startIndex) {
    state.questionQueue = questions;
    state.currentQuestionIndex = startIndex;
    showFlashcard();
    switchView("flashcard");
  }

  function showFlashcard() {
    const q = state.questionQueue[state.currentQuestionIndex];
    if (!q) return;

    // Reset UI state
    $("#fc-answer-side").style.display = "none";
    $("#btn-show-answer").style.display = "block";
    
    // Update progress
    $("#fc-current").textContent = state.currentQuestionIndex + 1;
    $("#fc-total").textContent = state.questionQueue.length;
    
    // Set content
    $("#fc-title").textContent = q.label;
    $("#fc-summary").textContent = q.summary;
    $("#fc-q-img").src = q.questionImg;
    $("#fc-a-img").src = q.answerImg[0];
  }

  $("#btn-show-answer").addEventListener("click", () => {
    $("#btn-show-answer").style.display = "none";
    $("#fc-answer-side").style.display = "block";
    
    // Scroll so answer is visible
    $("#fc-answer-side").scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  function saveMistakes() {
    localStorage.setItem(STORAGE_KEYS.mistakes, JSON.stringify(Array.from(state.mistakes)));
  }

  function handleResult(isGotIt) {
    const q = state.questionQueue[state.currentQuestionIndex];
    
    if (isGotIt) {
      state.mistakes.delete(q.id);
    } else {
      state.mistakes.add(q.id);
    }
    saveMistakes();

    if (state.currentQuestionIndex < state.questionQueue.length - 1) {
      state.currentQuestionIndex++;
      showFlashcard();
    } else {
      // Finished queue
      if (state.isReviewingMistakes) {
        switchView("mistakes");
      } else {
        renderCategory(state.currentCategory);
        switchView("category");
      }
    }
  }

  $("#btn-mark-gotit").addEventListener("click", () => handleResult(true));
  $("#btn-mark-review").addEventListener("click", () => handleResult(false));

  // ── Init ─────────────────────────────────────────────────
  initTheme();
  renderSubjects();
  console.log("🚀 Review Platform initialized.");
})();
