// ============================================================
// MultiQuiz Practice Platform — Application Logic
// ============================================================

(function () {
  "use strict";

  // ── Storage Keys ─────────────────────────────────────────
  const STORAGE_KEYS = {
    mistakes: "multiquiz_mistakes",
    stats: "multiquiz_stats",
    theme: "multiquiz_theme",
    lastSubject: "multiquiz_last_subject"
  };

  // ── State ────────────────────────────────────────────────
  let currentView = "home";
  let currentSubject = null;
  let currentTopic = null;
  let currentQuestions = [];
  let currentIndex = 0;
  let answeredMap = {}; // { questionId: { selected, isCorrect } }
  let isReviewMode = false;

  // ── DOM Refs ─────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // Nav
  const navTabs = $$(".nav-tab");
  const views = $$(".view");
  const navPractice = $("#nav-practice");

  // Home
  const subjectGrid = $("#subject-grid");

  // Practice
  const topicSelector = $("#topic-selector");
  const topicGrid = $("#topic-grid");
  const quizArea = $("#quiz-area");
  const questionCard = $("#question-card");
  const questionNumber = $("#question-number");
  const questionText = $("#question-text");
  const optionsList = $("#options-list");
  const feedbackBar = $("#feedback-bar");
  const feedbackIcon = $("#feedback-icon");
  const feedbackText = $("#feedback-text");
  const quizProgressFill = $("#quiz-progress-fill");
  const quizCounter = $("#quiz-counter");
  const btnPrev = $("#btn-prev");
  const btnNext = $("#btn-next");
  const backToTopics = $("#back-to-topics");
  const backToSubjects = $("#back-to-subjects");
  const resultsScreen = $("#results-screen");

  // ── Utility ──────────────────────────────────────────────
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function loadJSON(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || null;
    } catch {
      return null;
    }
  }

  function saveJSON(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

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
  function switchView(view) {
    currentView = view;
    navTabs.forEach((t) => t.classList.toggle("active", t.dataset.view === view));
    views.forEach((v) => {
      v.classList.remove("active");
      if (v.id === `view-${view}`) {
        v.classList.add("active");
        v.style.animation = "none";
        v.offsetHeight; 
        v.style.animation = "";
      }
    });

    if (view === "home") renderSubjects();
    if (view === "review") renderReviewList();
    if (view === "stats") renderStats();
    
    // Auto-scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  $("#nav-logo-home").addEventListener("click", () => switchView("home"));

  // ── Subject Management ───────────────────────────────────
  function renderSubjects() {
    subjectGrid.innerHTML = "";
    SUBJECTS.forEach(sub => {
      const card = document.createElement("button");
      card.className = "topic-card subject-card";
      card.innerHTML = `
        <div class="topic-icon">${sub.icon}</div>
        <h3>${sub.name}</h3>
        <p>${sub.description}</p>
        <div class="topic-meta">
           <span class="progress-pill" id="subject-progress-${sub.id}">0%</span>
        </div>
      `;
      card.addEventListener("click", () => loadSubject(sub));
      subjectGrid.appendChild(card);
    });
    updateSubjectProgress();
  }

  async function loadSubject(subject) {
    currentSubject = subject;
    localStorage.setItem(STORAGE_KEYS.lastSubject, subject.id);
    
    // Show loading state if needed
    // In a real app we'd fetch questions.js here. 
    // Since it's a script tag that defines global QUESTIONS, we need to load it.
    
    // Remove old script if exists
    const oldScript = document.getElementById("subject-data-script");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = "subject-data-script";
    script.src = subject.dataFile;
    
    script.onload = () => {
      $("#current-subject-name").textContent = subject.name;
      $("#current-subject-desc").textContent = subject.description;
      navPractice.style.display = "inline-flex";
      switchView("practice");
      renderTopics();
    };
    
    document.body.appendChild(script);
  }

  function renderTopics() {
    topicGrid.innerHTML = "";
    
    // Add "All Questions" topic
    const allCount = Object.values(QUESTIONS).reduce((acc, q) => acc + q.length, 0);
    const allCard = createTopicCard("all", "🎯", "All Questions", `Mixed practice — all ${allCount} MCQs shuffled randomly`, allCount);
    topicGrid.appendChild(allCard);

    // Add individual topics
    Object.keys(QUESTIONS).forEach(key => {
      const meta = TOPIC_META[key] || { name: key, icon: "📝" };
      const card = createTopicCard(key, meta.icon, meta.name, meta.sheet || "", QUESTIONS[key].length);
      topicGrid.appendChild(card);
    });

    updateTopicProgress();
  }

  function createTopicCard(id, icon, title, desc, count) {
    const card = document.createElement("button");
    card.className = "topic-card";
    card.dataset.topic = id;
    card.innerHTML = `
      <div class="topic-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="topic-meta">
          <span class="q-count">${count} Questions</span>
          <span class="progress-pill" id="progress-${id}">0%</span>
      </div>
    `;
    card.addEventListener("click", () => startQuiz(id));
    return card;
  }

  function startQuiz(topic, questions = null) {
    currentTopic = topic;
    isReviewMode = !!questions;

    if (questions) {
      currentQuestions = questions;
    } else if (topic === "all") {
      currentQuestions = shuffle(Object.values(QUESTIONS).flat());
    } else {
      currentQuestions = shuffle([...QUESTIONS[topic]]);
    }

    currentIndex = 0;
    answeredMap = {};
    topicSelector.style.display = "none";
    quizArea.style.display = "block";
    resultsScreen.style.display = "none";
    questionCard.style.display = "block";
    $(".quiz-nav").style.display = "flex";

    renderQuestion();
  }

  // ── Navigation Buttons ───────────────────────────────────
  backToTopics.addEventListener("click", () => {
    quizArea.style.display = "none";
    topicSelector.style.display = "block";
    updateTopicProgress();
  });

  backToSubjects.addEventListener("click", () => {
    switchView("home");
  });

  // ── Render Question ──────────────────────────────────────
  function renderQuestion() {
    const q = currentQuestions[currentIndex];
    if (!q) return;

    // Header
    questionNumber.textContent = `Question ${currentIndex + 1}`;
    questionText.textContent = q.q;

    // Progress
    const pct = ((currentIndex + 1) / currentQuestions.length) * 100;
    quizProgressFill.style.width = `${pct}%`;
    quizCounter.textContent = `${currentIndex + 1} / ${currentQuestions.length}`;

    // Options
    const letters = ["A", "B", "C", "D"];
    optionsList.innerHTML = "";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.dataset.index = i;
      btn.innerHTML = `
        <span class="option-letter">${letters[i]}</span>
        <span class="option-text">${opt}</span>
        <span class="option-result-icon"></span>
      `;

      const answered = answeredMap[q.id];
      if (answered) {
        btn.classList.add("disabled");
        if (i === q.answer) {
          btn.classList.add("correct");
          btn.querySelector(".option-result-icon").textContent = "✓";
        }
        if (i === answered.selected && !answered.isCorrect) {
          btn.classList.add("wrong");
          btn.querySelector(".option-result-icon").textContent = "✗";
        }
      } else {
        btn.addEventListener("click", () => handleAnswer(i));
      }

      optionsList.appendChild(btn);
    });

    // Feedback
    const answered = answeredMap[q.id];
    if (answered) {
      showFeedback(answered.isCorrect, q.explanation);
    } else {
      feedbackBar.style.display = "none";
    }

    // Nav buttons
    btnPrev.disabled = currentIndex === 0;
    btnNext.textContent =
      currentIndex === currentQuestions.length - 1 ? "Finish 🏁" : "Next →";

    questionCard.style.animation = "none";
    questionCard.offsetHeight;
    questionCard.style.animation = "";
  }

  // ── Handle Answer ────────────────────────────────────────
  function handleAnswer(selectedIndex) {
    const q = currentQuestions[currentIndex];
    const isCorrect = selectedIndex === q.answer;

    answeredMap[q.id] = { selected: selectedIndex, isCorrect };

    // Update option visuals
    const btns = optionsList.querySelectorAll(".option-btn");
    btns.forEach((btn, i) => {
      btn.classList.add("disabled");
      const clone = btn.cloneNode(true);
      btn.parentNode.replaceChild(clone, btn);

      if (i === q.answer) {
        clone.classList.add("correct");
        clone.querySelector(".option-result-icon").textContent = "✓";
      }
      if (i === selectedIndex && !isCorrect) {
        clone.classList.add("wrong");
        clone.querySelector(".option-result-icon").textContent = "✗";
      }
    });

    showFeedback(isCorrect, q.explanation);

    if (!isCorrect) {
      saveMistake(q, selectedIndex);
    } else {
      removeMistake(q.id);
    }

    updateStats(q, isCorrect);
    updateMistakesBadge();
  }

  function showFeedback(isCorrect, explanation) {
    feedbackBar.style.display = "flex";
    feedbackBar.className = `feedback-bar ${isCorrect ? "correct" : "wrong"}`;
    feedbackIcon.textContent = isCorrect ? "🎉" : "💡";
    feedbackText.innerHTML = `
      <strong>${isCorrect ? "Correct!" : "Not quite!"}</strong>
      ${explanation}
    `;

    feedbackBar.style.animation = "none";
    feedbackBar.offsetHeight;
    feedbackBar.style.animation = "";
  }

  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  });

  btnNext.addEventListener("click", () => {
    if (currentIndex < currentQuestions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      showResults();
    }
  });

  // ── Results Screen ───────────────────────────────────────
  function showResults() {
    questionCard.style.display = "none";
    $(".quiz-nav").style.display = "none";
    resultsScreen.style.display = "block";

    const total = currentQuestions.length;
    let correct = 0, wrong = 0, skipped = 0;

    currentQuestions.forEach((q) => {
      const a = answeredMap[q.id];
      if (!a) skipped++;
      else if (a.isCorrect) correct++;
      else wrong++;
    });

    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    $("#results-emoji").textContent = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "👍" : pct >= 30 ? "💪" : "📚";
    $("#results-title").textContent = pct >= 90 ? "Outstanding!" : pct >= 70 ? "Great Job!" : pct >= 50 ? "Good Effort!" : pct >= 30 ? "Keep Practicing!" : "Time to Study!";

    const circumference = 2 * Math.PI * 52;
    const offset = circumference - (pct / 100) * circumference;
    const fill = $("#score-fill");
    fill.style.strokeDasharray = circumference;
    fill.style.strokeDashoffset = circumference;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.strokeDashoffset = offset;
      });
    });

    animateNumber($("#score-text"), 0, pct, 1200, (v) => `${v}%`);
    $("#stat-correct").textContent = correct;
    $("#stat-wrong").textContent = wrong;
    $("#stat-skipped").textContent = skipped;

    if (pct >= 70) launchConfetti();
  }

  function animateNumber(el, from, to, duration, format) {
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(from + (to - from) * eased);
      el.textContent = format ? format(value) : value;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  $("#btn-review-mistakes").addEventListener("click", () => switchView("review"));
  $("#btn-retry").addEventListener("click", () => startQuiz(currentTopic));
  $("#btn-back-home").addEventListener("click", () => {
    quizArea.style.display = "none";
    topicSelector.style.display = "block";
    resultsScreen.style.display = "none";
    updateTopicProgress();
  });

  // ── Mistakes Management ──────────────────────────────────
  function getMistakes() {
    return loadJSON(STORAGE_KEYS.mistakes) || [];
  }

  function saveMistake(question, selectedIndex) {
    const mistakes = getMistakes();
    const existingIdx = mistakes.findIndex((m) => m.id === question.id);
    const entry = {
      ...question,
      selected: selectedIndex,
      subjectId: currentSubject?.id,
      subjectName: currentSubject?.name,
      timestamp: Date.now(),
    };

    if (existingIdx >= 0) mistakes[existingIdx] = entry;
    else mistakes.push(entry);

    saveJSON(STORAGE_KEYS.mistakes, mistakes);
  }

  function removeMistake(questionId) {
    let mistakes = getMistakes();
    mistakes = mistakes.filter((m) => m.id !== questionId);
    saveJSON(STORAGE_KEYS.mistakes, mistakes);
  }

  function updateMistakesBadge() {
    const count = getMistakes().length;
    const badge = $("#mistakes-badge");
    if (count > 0) {
      badge.style.display = "inline-flex";
      badge.textContent = count;
    } else {
      badge.style.display = "none";
    }
  }

  function renderReviewList() {
    const mistakes = getMistakes();
    const list = $("#review-list");
    const empty = $("#review-empty");
    const practiceBtn = $("#btn-practice-mistakes");
    const clearBtn = $("#btn-clear-mistakes");

    if (mistakes.length === 0) {
      list.innerHTML = "";
      list.appendChild(empty.cloneNode(true));
      practiceBtn.style.display = "none";
      clearBtn.style.display = "none";
      $("#review-subtitle").textContent = "Questions you got wrong are saved here for revision";
      return;
    }

    practiceBtn.style.display = "inline-flex";
    clearBtn.style.display = "inline-flex";
    $("#review-subtitle").textContent = `${mistakes.length} question${mistakes.length !== 1 ? "s" : ""} to review`;

    const letters = ["A", "B", "C", "D"];
    list.innerHTML = mistakes
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(m => `
      <div class="review-item">
        <div class="review-item-header">
          <span class="review-topic-badge">📚 ${m.subjectName || "Unknown"}</span>
          <button class="review-remove-btn" onclick="window.removeReviewItem('${m.id}')" title="Remove">✕</button>
        </div>
        <div class="review-question">${m.q}</div>
        <div class="review-answers">
          ${m.options.map((opt, i) => {
            let cls = "";
            if (i === m.selected && i !== m.answer) cls = "your-answer";
            if (i === m.answer) cls = "correct-answer";
            const prefix = i === m.selected && i !== m.answer ? "Your answer: " : i === m.answer ? "Correct: " : "";
            return `<div class="review-answer ${cls}"><span>${letters[i]})</span> ${prefix ? `<strong>${prefix}</strong>` : ""}${opt}</div>`;
          }).join("")}
        </div>
        <div class="review-explanation">💡 ${m.explanation}</div>
      </div>
    `).join("");
  }

  window.removeReviewItem = (id) => {
    removeMistake(id);
    updateMistakesBadge();
    renderReviewList();
  };

  $("#btn-practice-mistakes").addEventListener("click", () => {
    const questions = shuffle(getMistakes());
    if (questions.length === 0) return;
    switchView("practice");
    startQuiz("review", questions);
  });

  $("#btn-clear-mistakes").addEventListener("click", () => {
    if (confirm("Clear all saved mistakes?")) {
      saveJSON(STORAGE_KEYS.mistakes, []);
      updateMistakesBadge();
      renderReviewList();
    }
  });

  // ── Stats ────────────────────────────────────────────────
  function getStats() {
    return loadJSON(STORAGE_KEYS.stats) || {
      totalAttempted: 0,
      totalCorrect: 0,
      bestStreak: 0,
      currentStreak: 0,
      subjects: {}, // { subjectId: { attempted, correct } }
    };
  }

  function updateStats(question, isCorrect) {
    const stats = getStats();
    stats.totalAttempted++;
    if (isCorrect) {
      stats.totalCorrect++;
      stats.currentStreak++;
      if (stats.currentStreak > stats.bestStreak) stats.bestStreak = stats.currentStreak;
    } else {
      stats.currentStreak = 0;
    }

    const subId = currentSubject?.id || "unknown";
    if (!stats.subjects[subId]) stats.subjects[subId] = { attempted: 0, correct: 0 };
    stats.subjects[subId].attempted++;
    if (isCorrect) stats.subjects[subId].correct++;

    saveJSON(STORAGE_KEYS.stats, stats);
  }

  function renderStats() {
    const stats = getStats();
    $("#total-attempted").textContent = stats.totalAttempted;
    $("#total-correct").textContent = stats.totalCorrect;
    const accuracy = stats.totalAttempted > 0 ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100) : 0;
    $("#overall-accuracy").textContent = `${accuracy}%`;
    $("#best-streak").textContent = stats.bestStreak;

    const subStats = $("#subject-stats");
    subStats.innerHTML = "";

    SUBJECTS.forEach(sub => {
      const s = stats.subjects[sub.id] || { attempted: 0, correct: 0 };
      const pct = s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0;
      subStats.innerHTML += `
        <div class="topic-stat-row">
          <span class="topic-stat-icon">${sub.icon}</span>
          <div class="topic-stat-info">
            <div class="topic-stat-name">${sub.name} <span style="color:var(--text-muted);font-weight:400;font-size:0.8rem;">(${s.attempted} attempted)</span></div>
            <div class="topic-stat-bar"><div class="topic-stat-bar-fill" style="width:${pct}%"></div></div>
          </div>
          <span class="topic-stat-pct">${pct}%</span>
        </div>
      `;
    });
  }

  $("#btn-reset-stats").addEventListener("click", () => {
    if (confirm("Reset ALL data?")) {
      localStorage.clear();
      location.reload();
    }
  });

  // ── Progress Pills ─────────────────────────────────
  function updateSubjectProgress() {
    const stats = getStats();
    SUBJECTS.forEach(sub => {
      const s = stats.subjects[sub.id] || { attempted: 0, correct: 0 };
      const pct = s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0;
      const pill = $(`#subject-progress-${sub.id}`);
      if (pill) pill.textContent = `${pct}%`;
    });
  }

  function updateTopicProgress() {
    // Note: In this version, we don't track per-topic stats across sessions easily 
    // unless we change the storage format. Keeping it simple for now.
  }

  // ── Confetti ─────────────────────────────────────────────
  function launchConfetti() {
    let canvas = document.getElementById("confetti-canvas") || document.createElement("canvas");
    canvas.id = "confetti-canvas";
    if (!canvas.parentNode) document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const particles = [];
    const colors = ["#6366f1", "#8b5cf6", "#a78bfa", "#22c55e", "#f59e0b", "#ec4899", "#3b82f6"];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: -20 - Math.random() * 200,
        w: 6 + Math.random() * 6, h: 4 + Math.random() * 4,
        vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 10, opacity: 1,
      });
    }
    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.opacity <= 0) return; alive = true;
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.rotation += p.rotSpeed;
        if (p.y > canvas.height + 20) { p.opacity = 0; return; }
        if (frame > 80) p.opacity -= 0.015;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity); ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
      });
      frame++;
      if (alive && frame < 200) requestAnimationFrame(animate);
      else canvas.remove();
    }
    requestAnimationFrame(animate);
  }

  // ── Keyboard ─────────────────────────────────────────────
  document.addEventListener("keydown", (e) => {
    if (currentView !== "practice" || quizArea.style.display === "none" || resultsScreen.style.display !== "none") return;
    const q = currentQuestions[currentIndex]; if (!q) return;
    const keyMap = { a: 0, b: 1, c: 2, d: 3 };
    const key = e.key.toLowerCase();
    if (keyMap[key] !== undefined && !answeredMap[q.id] && keyMap[key] < q.options.length) handleAnswer(keyMap[key]);
    if (e.key === "ArrowRight" || e.key === "Enter") {
      if (currentIndex < currentQuestions.length - 1) { currentIndex++; renderQuestion(); }
      else if (Object.keys(answeredMap).length > 0) showResults();
    }
    if (e.key === "ArrowLeft" && currentIndex > 0) { currentIndex--; renderQuestion(); }
  });

  // ── Init ─────────────────────────────────────────────────
  initTheme();
  renderSubjects();
  updateMistakesBadge();
})();
