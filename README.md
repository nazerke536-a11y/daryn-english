# 🏆 Daryn English — Олимпиада Дайындығы

Daryn.kz олимпиадасына ағылшын тілінен дайындық жүйесі (5-8 сынып).

## ✨ Мүмкіндіктер
- 📖 **Теория** — толық грамматика ережелері қазақша түсіндірмемен
- ✏️ **Тест** — 15 сұрақ (оңай/орташа/қиын деңгейлермен)
- 📝 **Мок-олимпиада** — 45 минуттық таймерлі толық имитация
- 🤖 **AI Мұғалім** — Claude AI-мен қазақша сұхбат

## 🚀 GitHub-қа жүктеу

### 1-қадам: GitHub-та жаңа репозиторий жасаңыз
1. [github.com](https://github.com) сайтына кіріңіз
2. **"New repository"** басыңыз
3. Атауы: `daryn-english` (немесе өзіңіз таңдаңыз)
4. **Public** таңдаңыз
5. **"Create repository"** басыңыз

### 2-қадам: Жергілікті Git орнату
```bash
# Жоба папкасына кіріңіз
cd daryn-english

# Git инициализация
git init
git add .
git commit -m "Initial commit: Daryn English Olympiad App"

# GitHub-қа байланыстыру (YOUR_USERNAME-ді өзіңіздікіне ауыстырыңыз)
git remote add origin https://github.com/YOUR_USERNAME/daryn-english.git
git branch -M main
git push -u origin main
```

## 🌐 Vercel-ге деплой жасау

### 1-тәсіл: GitHub арқылы (ұсынылады)
1. [vercel.com](https://vercel.com) — GitHub аккаунтымен кіріңіз
2. **"New Project"** → GitHub репозиторийді таңдаңыз
3. **"Deploy"** басыңыз — бітті! ✅

### 2-тәсіл: Vercel CLI арқылы
```bash
npm install -g vercel
vercel login
vercel
```

## 🔧 Жергілікті орнату

```bash
npm install
npm run dev
# http://localhost:3000 ашыңыз
```

## 📁 Жоба құрылымы

```
daryn-english/
├── src/
│   ├── App.jsx       # Негізгі компонент (барлық логика)
│   └── main.jsx      # Кіріс нүктесі
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## 📚 Тақырыптар

| Сынып | Тақырыптар |
|-------|------------|
| 5-сынып | Артикльдер, Present Simple, Демеуліктер, Present Continuous, Сөздік |
| 6-сынып | Past Simple, Салыстырмалы дәрежелер, Modal Verbs |
| 7-сынып | Present Perfect, Passive Voice, First Conditional |
| 8-сынып | 2nd/3rd Conditionals, Reported Speech, Word Formation |

## ⚠️ Ескертпе
AI Мұғалім функциясы Anthropic API-ды пайдаланады. Standalone deployment-та жұмыс істеу үшін backend proxy қосу қажет болуы мүмкін.
