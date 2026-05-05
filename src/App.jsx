import { useState, useEffect, useRef } from "react";

// ─── CURRICULUM DATA ───────────────────────────────────────────
const CURRICULUM = {
  5: {
    label:"5-сынып",
    darynNote:"5-сынып Daryn олимпиадасы: артикльдер (10-12 сұрақ), Present Simple шағы (8-10 сұрақ), демеуліктер мен сөздік қор.",
    topics:[
      {
        id:"g5a", title:"Артикльдер", subtitle:"a, an, the, нөл артикль", icon:"📖", color:"#6366f1",
        darynNote:"Daryn 5-сынып тесті: артикль бойынша шамамен 10–12 сұрақ.",
        explanation:{
          intro:`Ағылшын тілінде 3 артикль бар: a, an және the. Daryn олимпиадасының 5-сынып тапсырмаларында артикль ең жиі кездесетін тақырып.`,
          sections:[
            { title:"🔵 A артиклі — бейтаныс зат, дауыссыз дыбыс", text:`A артиклі дауыссыз дыбыстан басталатын зат есімдерден бұрын қолданылады.`, tag:"Дауыссыз дыбыс → A", examples:["a book — кітап","a cat — мысық","a teacher — мұғалім","a university — /yoo/ дыбысы = дауыссыз!"] },
            { title:"🟢 AN артиклі — дауысты дыбыс", text:`AN артиклі дауысты дыбыстан (a, e, i, o, u) басталатын зат есімдерден бұрын қолданылады.`, tag:"Дауысты дыбыс → AN", examples:["an apple — алма","an elephant — піл","an umbrella — қолшатыр","an hour — сағат (h оқылмайды!)"] },
            { title:"🟡 THE артиклі — нақты, белгілі зат", text:`THE артиклі нақты, белгілі зат есімдерден бұрын қолданылады.`, tag:"Белгілі зат → THE", examples:["The sun, the moon — жерде жалғыз","The Nile — өзен атаулары","The United States — 'United' бар","She bought a book. The book was great."] },
            { title:"⚪ Нөл артикль — артикль жоқ", text:`Кейбір жағдайларда артикль мүлдем қолданылмайды.`, tag:"Жалпы мағына → НӨЛ артикль", examples:["Тілдер: English, Kazakh, French","Спорт: football, basketball","Тамақ: breakfast, lunch, dinner","Қалалар: Almaty, London, Paris"] },
          ],
          tips:["💡 A/AN — бейтаныс зат. THE — таныс зат.","💡 Үстеулік дәрежемен МІНДЕТТІ ТҮРДЕ the: the best, the worst.","💡 'hour' → AN hour (h оқылмайды). 'university' → A university."],
          mistakes:["❌ a honest man → ✅ an honest man","❌ the english → ✅ English (тілдерде артикль жоқ)","❌ a best student → ✅ the best student"]
        },
        questions:[
          {id:"g5a1",diff:"easy",text:"Tom has ___ dog.",opts:["a","an","the","—"],ans:"a",exp:"'Dog' дауыссыз дыбысынан басталады. Бейтаныс → A dog."},
          {id:"g5a2",diff:"easy",text:"She ate ___ orange for breakfast.",opts:["a","an","the","—"],ans:"an",exp:"'Orange' дауысты дыбысынан басталады → AN orange."},
          {id:"g5a3",diff:"easy",text:"___ sun rises in the east.",opts:["A","An","The","—"],ans:"The",exp:"Күн — жерде жалғыз нәрсе → THE sun."},
          {id:"g5a4",diff:"easy",text:"I am ___ student.",opts:["a","an","the","—"],ans:"a",exp:"'Student' дауыссыз дыбысынан басталады → A student."},
          {id:"g5a5",diff:"easy",text:"She has ___ cat and ___ dog.",opts:["a / a","an / a","a / an","the / the"],ans:"a / a",exp:"Екеуі де бейтаныс → A cat, A dog."},
          {id:"g5a6",diff:"medium",text:"He is ___ honest person.",opts:["a","an","the","—"],ans:"an",exp:"'Honest' сөзінде 'h' оқылмайды. /ɒ/ дауысты → AN honest person."},
          {id:"g5a7",diff:"medium",text:"She plays ___ piano beautifully.",opts:["a","an","the","—"],ans:"the",exp:"Музыкалық аспаптар алдында THE: the piano."},
          {id:"g5a8",diff:"medium",text:"___ dogs are loyal animals.",opts:["A","An","The","—"],ans:"—",exp:"Жалпы мағынадағы көпше зат есімге артикль жоқ."},
          {id:"g5a9",diff:"medium",text:"We have ___ breakfast at 7 o'clock.",opts:["a","an","the","—"],ans:"—",exp:"Тамақ атауларына артикль қолданылмайды."},
          {id:"g5a10",diff:"medium",text:"Ali is ___ best student in our class.",opts:["a","an","the","—"],ans:"the",exp:"Үстеулік дәрежемен (best) міндетті THE."},
          {id:"g5a11",diff:"hard",text:"She is learning ___ English at school.",opts:["a","an","the","—"],ans:"—",exp:"Тіл атауларына артикль жоқ: English, Kazakh."},
          {id:"g5a12",diff:"hard",text:"He saw ___ cat in the garden. ___ cat was black.",opts:["a / The","an / The","the / A","— / The"],ans:"a / The",exp:"Алғаш рет: A cat (бейтаныс). Екінші рет: The cat."},
          {id:"g5a13",diff:"hard",text:"They live in ___ United Kingdom.",opts:["a","an","the","—"],ans:"the",exp:"'United' бар мемлекеттерде THE."},
          {id:"g5a14",diff:"hard",text:"He plays ___ football every Saturday.",opts:["a","an","the","—"],ans:"—",exp:"Спорт түрлеріне артикль жоқ."},
          {id:"g5a15",diff:"hard",text:"Read: 'Sarah has ___ cat and ___ dog. ___ cat is white. She has ___ umbrella.'\n\nBlanks 1,2,3,4:",opts:["a, a, The, an","the, the, A, a","a, the, A, an","an, a, The, a"],ans:"a, a, The, an",exp:"1,2 — бейтаныс (a). 3 — белгілі (The cat). 4 — an umbrella (u-дауысты)."},
        ]
      },
      {
        id:"g5b", title:"Present Simple", subtitle:"Жалпы шақ (5-сынып)", icon:"⏱️", color:"#059669",
        darynNote:"Daryn 5-сынып: Present Simple бойынша 8–10 сұрақ. She/He/It үшін -s/-es жалғауы.",
        explanation:{
          intro:`Present Simple — қазіргі уақыттағы тұрақты әрекеттер, әдет-дағды, жалпы шындықтар үшін.`,
          sections:[
            { title:"✅ Болымды сөйлем", text:`Subject + V1\n\nHe, She, It үшін → -s/-es`, tag:"He/She/It → -s/-es", examples:["I/We/You/They work.","He/She/It works.","She goes to school. (go→goes)","He watches TV. (watch→watches)"] },
            { title:"❌ Болымсыз сөйлем", text:`Subject + do/does + not + V1`, tag:"He/She → does not + V1", examples:["I don't like coffee.","She doesn't eat meat.","He doesn't watch TV. (НЕ: doesn't watches!)"] },
            { title:"❓ Сұраулы сөйлем", text:`Do/Does + Subject + V1?`, tag:"Does + Subject + V1?", examples:["Do you like pizza?","Does she go to school?","Does he play football?"] },
            { title:"🕐 Белгі сөздер", text:`Present Simple-ді анықтайтын сөздер:`, tag:"Белгі сөздер", examples:["always — әрқашан","usually — әдетте","often — жиі","sometimes — кейде","never — ешқашан","every day/week — күн сайын"] },
          ],
          tips:["💡 He/She/It үшін does → бастапқы етістік өзгермейді: Does she WORK?","💡 Doesn't/Don't жалғанса, V1-де қалады: He doesn't PLAY.","💡 Go→goes, Do→does, Have→has (ережеден тыс)"],
          mistakes:["❌ She don't like → ✅ She doesn't like","❌ Does she works? → ✅ Does she work?","❌ He play football → ✅ He plays football"]
        },
        questions:[
          {id:"g5b1",diff:"easy",text:"She ___ (go) to school every day.",opts:["go","goes","is going","went"],ans:"goes",exp:"She = 3-жақ жекеше → Goes. (go→goes)"},
          {id:"g5b2",diff:"easy",text:"They ___ (play) football on weekends.",opts:["play","plays","is playing","played"],ans:"play",exp:"They = 3-жақ көпше → Play (жалғаусыз)."},
          {id:"g5b3",diff:"easy",text:"He ___ (not/eat) meat.",opts:["don't eat","doesn't eat","doesn't eats","not eat"],ans:"doesn't eat",exp:"He = 3-жақ болымсыз → Doesn't + V1."},
          {id:"g5b4",diff:"easy",text:"___ you ___ (like) pizza?",opts:["Do / like","Does / like","Do / likes","Does / likes"],ans:"Do / like",exp:"You → Do you + V1?"},
          {id:"g5b5",diff:"easy",text:"My mother ___ (cook) dinner every evening.",opts:["cook","cooks","is cooking","cooked"],ans:"cooks",exp:"My mother = 3-жақ жекеше → Cooks."},
          {id:"g5b6",diff:"medium",text:"___ she ___ (speak) English?",opts:["Do / speak","Does / speak","Does / speaks","Do / speaks"],ans:"Does / speak",exp:"She = 3-жақ → Does she speak?"},
          {id:"g5b7",diff:"medium",text:"He ___ (watch) TV every night.",opts:["watch","watchs","watches","is watching"],ans:"watches",exp:"Watch → watches (-ch соңына -es)."},
          {id:"g5b8",diff:"medium",text:"The sun ___ (rise) in the east.",opts:["rise","rises","is rising","rose"],ans:"rises",exp:"Жалпы шындық → Present Simple."},
          {id:"g5b9",diff:"medium",text:"My sister ___ (not/speak) French.",opts:["don't speak","doesn't speak","doesn't speaks","not speaks"],ans:"doesn't speak",exp:"My sister = She → Doesn't + V1."},
          {id:"g5b10",diff:"medium",text:"What time ___ school ___ (start)?",opts:["do / start","does / start","does / starts","do / starts"],ans:"does / start",exp:"School = It → Does school start?"},
          {id:"g5b11",diff:"hard",text:"Every morning, Anna ___ (wake up) at 7, ___ (have) breakfast and ___ (go) to school.",opts:["wakes up / has / goes","wake up / have / go","wakes up / have / goes","wakes / has / go"],ans:"wakes up / has / goes",exp:"Anna = She → wakes up, has, goes. Үш етістік де -s/-es."},
          {id:"g5b12",diff:"hard",text:"Where ___ your father ___ (work)?",opts:["do / work","does / work","does / works","is / work"],ans:"does / work",exp:"Your father = He → Does your father work?"},
          {id:"g5b13",diff:"hard",text:"___ your parents ___ (live) in Almaty?",opts:["Does / live","Do / live","Do / lives","Does / lives"],ans:"Do / live",exp:"Your parents = They → Do your parents live?"},
          {id:"g5b14",diff:"hard",text:"He never ___ (miss) a lesson. He always ___ (arrive) on time.",opts:["misses / arrives","miss / arrive","misses / arrive","miss / arrives"],ans:"misses / arrives",exp:"He = 3-жақ → misses, arrives."},
          {id:"g5b15",diff:"hard",text:"Find the ERROR in: 'Lisa studies at school. She likes English and Maths. She doesn't like P.E. Her brother plays basketball.'",opts:["She studies at school","She likes English","She doesn't like P.E.","Her brother plays basketball"],ans:"She likes English",exp:"Барлық сөйлемдер дұрыс!"},
        ]
      },
      {
        id:"g5c", title:"Демеуліктер", subtitle:"Prepositions of place & time", icon:"📍", color:"#d97706",
        darynNote:"Daryn 5-сынып: in/on/at/under/next to — орын демеуліктері. In/on/at — уақыт демеуліктері.",
        explanation:{
          intro:`Демеуліктер — заттардың орнын немесе уақытын көрсетеді.`,
          sections:[
            { title:"📍 Орын демеуліктері", text:`Заттардың бір-біріне қатысты орнын көрсетеді.`, tag:"Where?", examples:["in — ішінде: The cat is IN the box.","on — үстінде: The book is ON the table.","under — астында: The bag is UNDER the chair.","next to — қасында: NEXT TO the park.","between — арасында: BETWEEN Ali and Sara."] },
            { title:"🕐 Уақыт демеуліктері", text:`Уақытты білдіретін демеуліктер:`, tag:"When?", examples:["IN — ай, жыл: in May, in 2024, in the morning","ON — күн: on Monday, on my birthday","AT — нақты уақыт: at 7 o'clock, at night"] },
          ],
          tips:["💡 IN the morning/afternoon/evening, BUT AT night!","💡 ON Monday, ON my birthday","💡 AT нақты уақыт: AT 3 o'clock"],
          mistakes:["❌ in Monday → ✅ on Monday","❌ at the morning → ✅ in the morning","❌ on night → ✅ at night"]
        },
        questions:[
          {id:"g5c1",diff:"easy",text:"The book is ___ the table.",opts:["in","on","under","at"],ans:"on",exp:"Стол үстінде = ON the table."},
          {id:"g5c2",diff:"easy",text:"The cat is ___ the box.",opts:["on","in","under","next to"],ans:"in",exp:"Жәшіктің ішінде = IN the box."},
          {id:"g5c3",diff:"easy",text:"I wake up ___ 7 o'clock.",opts:["in","on","at","—"],ans:"at",exp:"Нақты уақыт алдында AT."},
          {id:"g5c4",diff:"easy",text:"My birthday is ___ March.",opts:["in","on","at","—"],ans:"in",exp:"Ай атауы алдында IN."},
          {id:"g5c5",diff:"easy",text:"We have English class ___ Monday.",opts:["in","on","at","—"],ans:"on",exp:"Апта күні алдында ON."},
          {id:"g5c6",diff:"medium",text:"The dog is ___ the chair.",opts:["on","in","under","between"],ans:"under",exp:"Орындықтың астында = UNDER."},
          {id:"g5c7",diff:"medium",text:"She was born ___ 2014.",opts:["in","on","at","—"],ans:"in",exp:"Жыл алдында IN."},
          {id:"g5c8",diff:"medium",text:"The shop is ___ the school and the park.",opts:["next to","behind","between","in front of"],ans:"between",exp:"Екеуінің арасында = BETWEEN X and Y."},
          {id:"g5c9",diff:"medium",text:"I study ___ the morning.",opts:["in","on","at","—"],ans:"in",exp:"In the morning/afternoon/evening."},
          {id:"g5c10",diff:"medium",text:"He goes to bed ___ night.",opts:["in","on","at","—"],ans:"at",exp:"AT night — ерекше жағдай!"},
          {id:"g5c11",diff:"hard",text:"She sits ___ Ali ___ Sara.",opts:["between / and","next to / and","behind / and","in front of / and"],ans:"between / and",exp:"BETWEEN X AND Y."},
          {id:"g5c12",diff:"hard",text:"My birthday is ___ 15th March.",opts:["in","on","at","—"],ans:"on",exp:"Нақты күн алдында ON."},
          {id:"g5c13",diff:"hard",text:"We celebrate Nauryz ___ spring, ___ March.",opts:["in / in","on / in","in / on","at / in"],ans:"in / in",exp:"Маусым → IN spring. Ай → IN March."},
          {id:"g5c14",diff:"hard",text:"The bank is ___ the post office.",opts:["next to","between","under","behind"],ans:"next to",exp:"Пошта кеңсесінің жанында = NEXT TO."},
          {id:"g5c15",diff:"hard",text:"Choose the CORRECT sentence:",opts:["I was born in Monday","She works at a school","He sleeps on the night","The cat is in front the house"],ans:"She works at a school",exp:"'At a school' дұрыс. Monday → on; night → at; in front OF."},
        ]
      },
      {
        id:"g5d", title:"Present Continuous", subtitle:"Қазіргі үдемелі шақ", icon:"🎬", color:"#0891b2",
        darynNote:"Daryn 5-сынып: Present Continuous (am/is/are + V-ing) — Look!/Now белгілерімен.",
        explanation:{
          intro:`Present Continuous — ДЕЛ ОСЫ СӘТТЕ болып жатқан іс-әрекеттер.`,
          sections:[
            { title:"📐 Формасы", text:`Subject + am/is/are + V-ing\n\nI→am, He/She/It→is, We/You/They→are`, tag:"am/is/are + V-ing", examples:["I am reading. — Оқып отырмын.","She is watching TV.","They are playing football.","He is not sleeping.","Are you listening?"] },
            { title:"✏️ -ing жалғау ережелері", text:`-ing жалғанғанда өзгерістер:`, tag:"Spelling", examples:["Жай: read→reading, play→playing","'e'-мен аяқталса: write→writing, make→making","Қысқа сөзде еселенеді: run→running, swim→swimming, sit→sitting","'ie'→'y': lie→lying"] },
            { title:"🕐 Белгі сөздер", text:`Present Continuous белгілері:`, tag:"Белгі сөздер", examples:["now — қазір","at the moment","Look! Listen!","right now"] },
          ],
          tips:["💡 Look!/Listen!/Watch! → Present Continuous.","💡 Every day/always → Present Simple.","💡 swim→swimming, run→running — соңғы дауыссыз еселенеді!"],
          mistakes:["❌ She is read → ✅ She is reading","❌ I am listen → ✅ I am listening","❌ He is makeing → ✅ He is making"]
        },
        questions:[
          {id:"g5d1",diff:"easy",text:"Look! The children ___ (play) in the garden.",opts:["play","plays","are playing","is playing"],ans:"are playing",exp:"Look! = PC белгісі. They → are playing."},
          {id:"g5d2",diff:"easy",text:"She ___ (watch) TV at the moment.",opts:["watch","watches","is watching","are watching"],ans:"is watching",exp:"At the moment = PC. She → is watching."},
          {id:"g5d3",diff:"easy",text:"I ___ (not/listen) to music right now.",opts:["don't listen","am not listening","isn't listening","not listening"],ans:"am not listening",exp:"PC болымсыз: I + am not + V-ing."},
          {id:"g5d4",diff:"easy",text:"___ your brother ___ (sleep) now?",opts:["Does / sleep","Is / sleeping","Are / sleeping","Do / sleep"],ans:"Is / sleeping",exp:"PC сұраулы: Is + he + V-ing?"},
          {id:"g5d5",diff:"easy",text:"They ___ (swim) in the pool right now.",opts:["swim","swims","are swimming","is swimming"],ans:"are swimming",exp:"They → are + swim→swimming (м еселенеді)."},
          {id:"g5d6",diff:"medium",text:"She ___ (make) a cake for the party.",opts:["makes","is making","is makeing","are making"],ans:"is making",exp:"She → is + make→making (e түсіріледі)."},
          {id:"g5d7",diff:"medium",text:"He ___ (run) in the park every morning, but now he ___ (sit) at home.",opts:["runs / is sitting","is running / sits","run / is sitting","runs / sits"],ans:"runs / is sitting",exp:"Every morning = PS (runs). Now = PC (is sitting)."},
          {id:"g5d8",diff:"medium",text:"Listen! Someone ___ (knock) at the door.",opts:["knocks","knocked","is knocking","are knocking"],ans:"is knocking",exp:"Listen! = PC белгісі."},
          {id:"g5d9",diff:"medium",text:"What ___ you ___ (do) now?",opts:["do / do","are / doing","do / doing","are / do"],ans:"are / doing",exp:"PC сұраулы: What are you doing?"},
          {id:"g5d10",diff:"medium",text:"My parents ___ (have) dinner at the moment.",opts:["have","has","are having","is having"],ans:"are having",exp:"My parents = They → are having."},
          {id:"g5d11",diff:"hard",text:"He usually ___ (walk) to school, but today he ___ (ride) his bike.",opts:["walks / is riding","walk / rides","is walking / rides","walks / rides"],ans:"walks / is riding",exp:"Usually = PS (walks). Today = PC (is riding)."},
          {id:"g5d12",diff:"hard",text:"___ it ___ (snow) outside right now?",opts:["Is / snowing","Does / snow","Are / snowing","Is / snow"],ans:"Is / snowing",exp:"It → Is + snow-ing? Right now = PC."},
          {id:"g5d13",diff:"hard",text:"The baby ___ (sleep), so please be quiet!",opts:["sleeps","is sleeping","are sleeping","was sleeping"],ans:"is sleeping",exp:"Дел қазір → is sleeping."},
          {id:"g5d14",diff:"hard",text:"Choose: 'The sun ___ in the east' vs 'Look! The sun ___!'",opts:["rises / is setting","rise / sets","is rising / setting","rises / setting"],ans:"rises / is setting",exp:"Жалпы шындық = PS (rises). Look! = PC (is setting)."},
          {id:"g5d15",diff:"hard",text:"Find the INCORRECT sentence:",opts:["She is reading a book now.","They are swiming in the pool.","He is making a sandwich.","I am writing a letter."],ans:"They are swiming in the pool.",exp:"ҚАТЕ: swiming → ДҰРЫС: swimming (m еселенеді)."},
        ]
      },
      {
        id:"g5e", title:"Сөздік қор", subtitle:"Мектеп, отбасы, жануарлар, тамақ", icon:"📝", color:"#7c3aed",
        darynNote:"Daryn 5-сынып сөздік: мектеп заттары, отбасы мүшелері, үй жануарлары, тамақ-ас.",
        explanation:{
          intro:`Daryn 5-сынып тестінде сөздік қор тапсырмалары маңызды орын алады.`,
          sections:[
            { title:"🏫 Мектеп (School)", text:`Мектеппен байланысты негізгі сөздер:`, tag:"School vocabulary", examples:["classroom, blackboard, ruler, scissors","subject — пән, timetable — кесте","break — үзіліс, homework — үй тапсырмасы","exam/test — емтихан/тест"] },
            { title:"👨‍👩‍👧‍👦 Отбасы (Family)", text:`Отбасы мүшелерінің атаулары:`, tag:"Family members", examples:["grandparents — ата-әже","nephew / niece — жиен (ер/қыз)","cousin — немере аға/іні/апа","stepmother / stepfather — өгей ана/әке"] },
            { title:"🐾 Жануарлар (Animals)", text:`Үй және жабайы жануарлар:`, tag:"Animals", examples:["rabbit — қоян, hamster — хомяк","parrot — тоты құс, dolphin — дельфин","whale — кит, giraffe — жираф","butterfly — көбелек, penguin — пингвин"] },
            { title:"🍎 Тамақ-ас (Food)", text:`Тамақ пен сусын атаулары:`, tag:"Food", examples:["vegetables: carrot, cucumber, onion","fruit: strawberry, watermelon, peach","drinks: juice, lemonade, milkshake","meals: scrambled eggs, pancakes, soup"] },
          ],
          tips:["💡 Cousin — немере (gender neutral ағылшынша!).","💡 Vegetables — санауға болмайтын: some vegetables.","💡 Subject (пән) vs Object (нысан) — мағынасын ажырат."],
          mistakes:["❌ I have homeworks → ✅ I have homework","❌ My cousin brother → ✅ My cousin","❌ She is my grand mother → ✅ grandmother"]
        },
        questions:[
          {id:"g5e1",diff:"easy",text:"What do you call the person who teaches you at school?",opts:["student","teacher","doctor","librarian"],ans:"teacher",exp:"Teacher = мұғалім."},
          {id:"g5e2",diff:"easy",text:"Your mother's mother is your ___.",opts:["aunt","grandmother","cousin","niece"],ans:"grandmother",exp:"Анаңның анасы = grandmother."},
          {id:"g5e3",diff:"easy",text:"Which animal can you keep as a pet?",opts:["lion","elephant","rabbit","tiger"],ans:"rabbit",exp:"Rabbit — үй жануары."},
          {id:"g5e4",diff:"easy",text:"What do you use to draw a straight line?",opts:["scissors","ruler","eraser","pencil case"],ans:"ruler",exp:"Ruler = сызғыш."},
          {id:"g5e5",diff:"easy",text:"Which is a vegetable?",opts:["strawberry","peach","carrot","banana"],ans:"carrot",exp:"Carrot = сәбіз — көкөніс."},
          {id:"g5e6",diff:"medium",text:"Your father's brother is your ___.",opts:["grandfather","cousin","uncle","nephew"],ans:"uncle",exp:"Әкеңнің бауыры = uncle."},
          {id:"g5e7",diff:"medium",text:"'Big' and '___ ' are antonyms.",opts:["large","huge","small","tall"],ans:"small",exp:"Big ↔ Small."},
          {id:"g5e8",diff:"medium",text:"Which word is a SYNONYM for 'happy'?",opts:["sad","angry","joyful","tired"],ans:"joyful",exp:"Happy = Joyful (қуанышты)."},
          {id:"g5e9",diff:"medium",text:"What subject do you study numbers in?",opts:["History","Science","Maths","Literature"],ans:"Maths",exp:"Maths = математика."},
          {id:"g5e10",diff:"medium",text:"A ___ is a large sea animal that breathes air.",opts:["shark","dolphin","whale","jellyfish"],ans:"whale",exp:"Whale = кит. Ауамен тыныс алады."},
          {id:"g5e11",diff:"hard",text:"Which sentence uses 'homework' CORRECTLY?",opts:["I have many homeworks.","She did her homework.","He forgot his homeworks.","They have a homework."],ans:"She did her homework.",exp:"'Homework' санауға болмайды!"},
          {id:"g5e12",diff:"hard",text:"Your mother's sister's son is your ___.",opts:["nephew","brother","cousin","uncle"],ans:"cousin",exp:"Анаңның апасының баласы = cousin."},
          {id:"g5e13",diff:"hard",text:"The school ___ shows when each lesson starts.",opts:["timetable","homework","classroom","textbook"],ans:"timetable",exp:"Timetable = сабақ кестесі."},
          {id:"g5e14",diff:"hard",text:"What do you call a young cat?",opts:["cub","puppy","kitten","calf"],ans:"kitten",exp:"Kitten = мысықтың баласы."},
          {id:"g5e15",diff:"hard",text:"Choose the CORRECTLY spelled word for 'шөлмек':",opts:["bottel","bottle","botle","bottl"],ans:"bottle",exp:"Bottle = шөлмек. b-o-t-t-l-e."},
        ]
      },
    ]
  },
  6: {
    label:"6-сынып",
    darynNote:"6-сынып Daryn: Past Simple (10+ сұрақ), Comparatives/Superlatives (8+ сұрақ), Modal verbs (6+).",
    topics:[
      {
        id:"g6a", title:"Past Simple", subtitle:"Өткен шақ", icon:"📅", color:"#dc2626",
        darynNote:"Daryn 6-сынып: дұрыс/бұрыс етістіктер, did/didn't — ең маңызды тақырып.",
        explanation:{
          intro:`Past Simple — өткен уақытта болып, аяқталған іс-әрекеттер.`,
          sections:[
            { title:"✅ Дұрыс етістіктер (Regular)", text:`Дұрыс етістіктер -ed жалғамасын алады.`, tag:"V + -ed", examples:["work→worked, play→played","like→liked, stop→stopped","study→studied (y→i+ed)"] },
            { title:"⚡ Бұрыс етістіктер (Irregular)", text:`Бұрыс етістіктер V2 формасын жаттап алу керек!`, tag:"V2 — жаттап алу!", examples:["go→went, see→saw, have→had","eat→ate, come→came, buy→bought","take→took, write→wrote"] },
            { title:"❌ Болымсыз", text:`didn't + V1 (барлық жақтарда)`, tag:"didn't + V1", examples:["She didn't go to school.","They didn't eat breakfast."] },
            { title:"❓ Сұраулы", text:`Did + Subject + V1?`, tag:"Did + Subject + V1?", examples:["Did you go to school?","Did she see the film?"] },
          ],
          tips:["💡 Didn't жалғанса, V1: She didn't COME (came емес!).","💡 Did жалғанса: Did she GO? (went емес!)"],
          mistakes:["❌ She didn't went → ✅ She didn't go","❌ Did he went? → ✅ Did he go?","❌ Yesterday I go → ✅ Yesterday I went"]
        },
        questions:[
          {id:"g6a1",diff:"easy",text:"She ___ (visit) London last year.",opts:["visit","visits","visited","was visit"],ans:"visited",exp:"Regular verb + -ed. Last year — өткен шақ."},
          {id:"g6a2",diff:"easy",text:"They ___ (play) football yesterday.",opts:["play","plays","played","were playing"],ans:"played",exp:"Regular: play + -ed = played."},
          {id:"g6a3",diff:"easy",text:"He ___ (go) to the cinema last night.",opts:["go","goes","goed","went"],ans:"went",exp:"Irregular: go → went."},
          {id:"g6a4",diff:"easy",text:"She ___ (not/eat) breakfast this morning.",opts:["didn't eat","didn't ate","doesn't eat","not ate"],ans:"didn't eat",exp:"Болымсыз: didn't + V1."},
          {id:"g6a5",diff:"easy",text:"___ you ___ (see) that film?",opts:["Did / see","Did / saw","Does / see","Do / see"],ans:"Did / see",exp:"Past Simple сұраулы: Did + V1?"},
          {id:"g6a6",diff:"medium",text:"I ___ (buy) a new phone two days ago.",opts:["buy","buyed","bought","have bought"],ans:"bought",exp:"Irregular: buy → bought."},
          {id:"g6a7",diff:"medium",text:"She ___ (not/come) to school yesterday.",opts:["didn't came","didn't come","doesn't come","not come"],ans:"didn't come",exp:"Болымсыз: didn't + V1 (come, came емес!)."},
          {id:"g6a8",diff:"medium",text:"Where ___ you ___ (go) last weekend?",opts:["did / go","did / went","do / go","were / go"],ans:"did / go",exp:"Did + V1? Went емес!"},
          {id:"g6a9",diff:"medium",text:"He ___ (write) a letter last week.",opts:["write","writes","wrote","writed"],ans:"wrote",exp:"Irregular: write → wrote."},
          {id:"g6a10",diff:"medium",text:"___ she ___ (have) a good time at the party?",opts:["Did / have","Did / had","Does / have","Was / have"],ans:"Did / have",exp:"Did she have? 'Had' емес, 'have'!"},
          {id:"g6a11",diff:"hard",text:"Yesterday she ___ (wake up) early, ___ (have) breakfast and ___ (take) the bus.",opts:["woke up / had / took","waked up / had / took","woke up / have / took","woke up / had / taked"],ans:"woke up / had / took",exp:"Барлығы irregular: wake→woke, have→had, take→took."},
          {id:"g6a12",diff:"hard",text:"He ___ (not/know) the answer, so he ___ (ask) his teacher.",opts:["didn't know / asked","didn't knew / asked","didn't know / ask","not know / asked"],ans:"didn't know / asked",exp:"didn't + know (V1). asked (regular, -ed)."},
          {id:"g6a13",diff:"hard",text:"In 1969, astronauts ___ (land) on the moon.",opts:["land","lands","landed","have landed"],ans:"landed",exp:"In 1969 — нақты өткен. Regular: land + -ed."},
          {id:"g6a14",diff:"hard",text:"___ your parents ___ (travel) abroad last summer?",opts:["Did / travel","Did / travelled","Do / travel","Were / travel"],ans:"Did / travel",exp:"Did + V1? 'Travelled' емес!"},
          {id:"g6a15",diff:"hard",text:"Find the INCORRECT sentence:",opts:["She went to London last year.","Did you saw the film?","He didn't come to school.","They bought a new car."],ans:"Did you saw the film?",exp:"ҚАТЕ: 'Did you saw' → ДҰРЫС: 'Did you see?'"},
        ]
      },
      {
        id:"g6b", title:"Салыстырмалы дәрежелер", subtitle:"Comparative & Superlative", icon:"📊", color:"#7c3aed",
        darynNote:"Daryn 6-сынып: -er/-est, more/most, irregular forms (good-better-best).",
        explanation:{
          intro:`Салыстырмалы дәрежелер — екі немесе одан көп нәрсені салыстыру.`,
          sections:[
            { title:"📈 Салыстырмалы (Comparative)", text:`Қысқа (1-2 буын): -er + than\nҰзын (3+ буын): more + adj + than`, tag:"…er than / more…than", examples:["tall→taller than","big→bigger than","happy→happier than","beautiful→more beautiful than"] },
            { title:"🏆 Үстеулік (Superlative)", text:`Қысқа: the + -est\nҰзын: the most + adj`, tag:"the…est / the most…", examples:["tall→the tallest","big→the biggest","beautiful→the most beautiful"] },
            { title:"⚡ Ережеден тыс (Irregular)", text:`Жаттап алу керек!`, tag:"Irregular forms", examples:["good→better→the best","bad→worse→the worst","many/much→more→the most","little→less→the least"] },
          ],
          tips:["💡 Бір буынды -er/-est: tall→taller.","💡 'e'-мен аяқталса: large→larger.","💡 Good-better-best, bad-worse-worst!"],
          mistakes:["❌ more tall → ✅ taller","❌ the most good → ✅ the best","❌ more better → ✅ better"]
        },
        questions:[
          {id:"g6b1",diff:"easy",text:"Ali is ___ (tall) than his brother.",opts:["tall","taller","more tall","tallest"],ans:"taller",exp:"Қысқа (1 буын): tall + -er."},
          {id:"g6b2",diff:"easy",text:"This film is ___ (interesting) than that one.",opts:["interestinger","most interesting","more interesting","interesting than"],ans:"more interesting",exp:"Ұзын: more + interesting."},
          {id:"g6b3",diff:"easy",text:"She is ___ (good) student in the class.",opts:["good","better","the best","the goodest"],ans:"the best",exp:"good → the best (ережеден тыс!)."},
          {id:"g6b4",diff:"easy",text:"Today is ___ (hot) than yesterday.",opts:["hot","hotter","more hot","hottest"],ans:"hotter",exp:"Hot — соңғы дауыссыз еселенеді: hotter."},
          {id:"g6b5",diff:"easy",text:"This is ___ (expensive) shop in the city.",opts:["expensive","more expensive","the most expensive","expensivest"],ans:"the most expensive",exp:"Ұзын үстеулік: the most expensive."},
          {id:"g6b6",diff:"medium",text:"My bag is ___ (heavy) than yours.",opts:["heavy","heavier","more heavy","heaviest"],ans:"heavier",exp:"heavy → heavier (y→i+er)."},
          {id:"g6b7",diff:"medium",text:"He runs ___ (fast) than his friends.",opts:["fast","faster","more fast","the fastest"],ans:"faster",exp:"Fast + -er = faster."},
          {id:"g6b8",diff:"medium",text:"This is ___ (bad) film I have ever seen.",opts:["bad","worse","the worst","the baddest"],ans:"the worst",exp:"bad → the worst (ережеден тыс)."},
          {id:"g6b9",diff:"medium",text:"Mount Everest is ___ (high) mountain in the world.",opts:["high","higher","the highest","most high"],ans:"the highest",exp:"Үстеулік + THE: the highest."},
          {id:"g6b10",diff:"medium",text:"Kazakhstan is ___ (big) than Germany, but Russia is ___ (big) country in the world.",opts:["bigger / the biggest","more big / the biggest","bigger / biggest","bigger / the most big"],ans:"bigger / the biggest",exp:"Comparative: bigger. Superlative: the biggest."},
          {id:"g6b11",diff:"hard",text:"He is ___ (little) experienced than his colleague.",opts:["lesser","less","littler","the least"],ans:"less",exp:"little → less (comparative)."},
          {id:"g6b12",diff:"hard",text:"The weather today is ___ (bad) than yesterday.",opts:["worse","more bad","the worst","baddest"],ans:"worse",exp:"bad → worse (comparative)."},
          {id:"g6b13",diff:"hard",text:"She speaks English ___ (fluently) than her sister.",opts:["fluently","more fluently","fluenter","most fluently"],ans:"more fluently",exp:"Үстеу comparative: more + fluently."},
          {id:"g6b14",diff:"hard",text:"Which is more difficult: English or Maths? I think Maths is ___ (difficult).",opts:["more difficult","the most difficult","difficulter","most difficult"],ans:"more difficult",exp:"Екі пән салыстырылады → more difficult."},
          {id:"g6b15",diff:"hard",text:"Find the CORRECT sentence:",opts:["She is more tall than him.","This is the most best film.","He runs faster than his brother.","It is the expensivest car."],ans:"He runs faster than his brother.",exp:"Дұрыс: fast→faster. ҚАТЕ: more tall→taller; most best→the best; expensivest→the most expensive."},
        ]
      },
      {
        id:"g6c", title:"Modal Verbs", subtitle:"can, must, should, may", icon:"🔑", color:"#0891b2",
        darynNote:"Daryn 6-сынып: can/can't, must/mustn't, should/shouldn't.",
        explanation:{
          intro:`Modal Verbs — мүмкіндік, міндеттілік, кеңес. Modal verb кейін БАСТАПҚЫ ЕТІСТІК (V1), to жоқ!`,
          sections:[
            { title:"💪 CAN / CAN'T", text:`Can = мүмкін/біледі. Can't = мүмкін емес.`, tag:"Can + V1", examples:["I can swim.","She can speak English.","He can't play piano."] },
            { title:"⚠️ MUST / MUSTN'T", text:`Must = міндетті. Mustn't = тыйым!`, tag:"Must + V1", examples:["You must wear a seatbelt.","You mustn't smoke here. — Тыйым!"] },
            { title:"💡 SHOULD / SHOULDN'T", text:`Should = кеңес. Shouldn't = кеңес бермеу.`, tag:"Should + V1", examples:["You should eat vegetables.","You shouldn't eat too much sugar."] },
            { title:"🔓 MAY / MIGHT", text:`May = рұқсат/мүмкіндік. Might = аз мүмкіндік.`, tag:"May + V1", examples:["May I come in? — рұқсат","It may rain tomorrow.","She might be late."] },
          ],
          tips:["💡 БАРЛЫҚ modal verbs кейін V1 (to жоқ!).","💡 Mustn't = тыйым. Don't have to = міндетті емес."],
          mistakes:["❌ She can to swim → ✅ She can swim","❌ He musts go → ✅ He must go","❌ You should to study → ✅ You should study"]
        },
        questions:[
          {id:"g6c1",diff:"easy",text:"She ___ speak three languages.",opts:["can","musts","cans","to can"],ans:"can",exp:"Can = іскерлік. Modal өзгермейді!"},
          {id:"g6c2",diff:"easy",text:"You ___ wear a helmet when cycling.",opts:["can","should","may","musts"],ans:"should",exp:"Should = кеңес."},
          {id:"g6c3",diff:"easy",text:"Students ___ be quiet during the exam.",opts:["can","should","mustn't","must"],ans:"must",exp:"Must = міндеттілік."},
          {id:"g6c4",diff:"easy",text:"___ I use your pen, please?",opts:["Must","Should","May","Can't"],ans:"May",exp:"May I…? = сыпайы рұқсат сұрау."},
          {id:"g6c5",diff:"easy",text:"He ___ swim. He is afraid of water.",opts:["can","can't","must","should"],ans:"can't",exp:"Can't = іскерлік жоқ."},
          {id:"g6c6",diff:"medium",text:"You ___ eat in the library. It's not allowed.",opts:["should","can","mustn't","might"],ans:"mustn't",exp:"Mustn't = тыйым."},
          {id:"g6c7",diff:"medium",text:"You look tired. You ___ go to bed early.",opts:["must","can","should","may"],ans:"should",exp:"Should = кеңес."},
          {id:"g6c8",diff:"medium",text:"It ___ rain tomorrow. Take an umbrella.",opts:["must","can","may","should"],ans:"may",exp:"May = мүмкіндік."},
          {id:"g6c9",diff:"medium",text:"She ___ play piano very well. She practises every day.",opts:["must","can","should","may"],ans:"can",exp:"Can = іскерлік."},
          {id:"g6c10",diff:"medium",text:"You ___ touch that! It's dangerous.",opts:["should","can","mustn't","might"],ans:"mustn't",exp:"Mustn't = тыйым."},
          {id:"g6c11",diff:"hard",text:"He is a doctor. He ___ work long hours. He ___ take rest too.",opts:["must / should","should / must","can / should","must / can"],ans:"must / should",exp:"Must = жұмыс міндеті. Should = кеңес."},
          {id:"g6c12",diff:"hard",text:"___ you speak louder? I ___ hear you.",opts:["Can / can't","Must / mustn't","Should / shouldn't","May / might not"],ans:"Can / can't",exp:"Can you…? = өтіну. Can't = ести алмаймын."},
          {id:"g6c13",diff:"hard",text:"Students ___ use their phones in class. It's the school rule.",opts:["must","should","mustn't","can"],ans:"mustn't",exp:"Мектеп ережесі = тыйым → Mustn't."},
          {id:"g6c14",diff:"hard",text:"You ___ eat more vegetables. But you ___ eat too many sweets.",opts:["should / shouldn't","must / mustn't","can / can't","may / might not"],ans:"should / shouldn't",exp:"Денсаулық кеңесі → Should/Shouldn't."},
          {id:"g6c15",diff:"hard",text:"Find the INCORRECT sentence:",opts:["She can play tennis.","You must to wear a uniform.","May I open the window?","You shouldn't stay up late."],ans:"You must to wear a uniform.",exp:"ҚАТЕ: 'must to wear' → 'must wear'. Modal + to жоқ!"},
        ]
      },
    ]
  },
  7: {
    label:"7-сынып",
    darynNote:"7-сынып Daryn: Present Perfect (just/already/yet), Passive Voice, First Conditional.",
    topics:[
      {
        id:"g7a", title:"Present Perfect", subtitle:"Аяқталған шақ", icon:"⭐", color:"#7c3aed",
        darynNote:"Daryn 7-сынып: just/already/yet/ever/never/since/for белгілерімен — 10+ сұрақ.",
        explanation:{
          intro:`Present Perfect — өткен уақытта болған, ҚАЗІРГІ УАҚЫТПЕН БАЙЛАНЫСЫ БАР іс-әрекеттер.`,
          sections:[
            { title:"📐 Формасы", text:`Subject + have/has + V3\n\nI/We/You/They → have + V3\nHe/She/It → has + V3`, tag:"have/has + V3", examples:["I have visited Paris.","She has finished her homework.","They have just arrived.","He has never eaten sushi."] },
            { title:"🔑 Белгі сөздер", text:`Present Perfect белгілері:`, tag:"Белгі сөздер", examples:["just — жаңа ғана","already — қазірдің өзінде","yet — әлі (сұрауда/болымсызда)","ever — өмірде кезінде","never — ешқашан","since — белгілі уақыттан бері","for — ұзақтық"] },
            { title:"⚖️ PP vs Past Simple", text:`Present Perfect — қашан болғаны белгісіз.\nPast Simple — нақты өткен уақытта.`, tag:"PP vs PS", examples:["I have visited London. (Когда? маңызды емес)","I visited London in 2020. (нақты → Past Simple!)","She has lost her keys. (нәтиже: кілті жоқ!)"] },
          ],
          tips:["💡 Just/already/yet/ever/never → Present Perfect!","💡 Yesterday/last week/in 2020 → Past Simple!","💡 Since + нақты уақыт нүктесі. For + ұзақтық."],
          mistakes:["❌ I have seen him yesterday → ✅ I saw him yesterday","❌ She has went → ✅ She has gone","❌ Have you ever went? → ✅ Have you ever been?"]
        },
        questions:[
          {id:"g7a1",diff:"easy",text:"She ___ (just/finish) her homework.",opts:["just finished","has just finished","have just finished","just finish"],ans:"has just finished",exp:"Just = PP белгісі. She → has + V3."},
          {id:"g7a2",diff:"easy",text:"I ___ (never/be) to Japan.",opts:["never been","have never been","has never been","never was"],ans:"have never been",exp:"Never = PP. I → have never been."},
          {id:"g7a3",diff:"easy",text:"___ you ___ (ever/eat) sushi?",opts:["Did you ever eat","Have you ever eaten","Has you ever eaten","Do you ever eat"],ans:"Have you ever eaten",exp:"Ever = PP. Have you ever + V3?"},
          {id:"g7a4",diff:"easy",text:"He ___ (already/do) his chores.",opts:["already did","has already done","have already done","already does"],ans:"has already done",exp:"Already = PP. He → has + done."},
          {id:"g7a5",diff:"easy",text:"They ___ (not/arrive) yet.",opts:["didn't arrive","haven't arrived","hasn't arrived","not arrive"],ans:"haven't arrived",exp:"Yet болымсыз = PP. They → haven't + V3."},
          {id:"g7a6",diff:"medium",text:"She ___ in Kazakhstan ___ 2015.",opts:["has lived / since","has lived / for","lived / since","lives / since"],ans:"has lived / since",exp:"Since + нақты уақыт → PP."},
          {id:"g7a7",diff:"medium",text:"I ___ him ___ years.",opts:["have known / for","have known / since","knew / for","know / since"],ans:"have known / for",exp:"For + ұзақтық → PP."},
          {id:"g7a8",diff:"medium",text:"She ___ Paris ___ 2020.",opts:["has visited","visited","visits","is visiting"],ans:"visited",exp:"'In 2020' = нақты өткен → Past Simple."},
          {id:"g7a9",diff:"medium",text:"___ you finished your project yet?",opts:["Have","Has","Did","Are"],ans:"Have",exp:"Yet болымсыз/сұраулы + PP."},
          {id:"g7a10",diff:"medium",text:"She ___ (lose) her phone. She can't find it.",opts:["lost","has lost","have lost","loses"],ans:"has lost",exp:"Нәтиже қазір маңызды → Present Perfect."},
          {id:"g7a11",diff:"hard",text:"I ___ (see) that film twice. I ___ (see) it first in 2021.",opts:["have seen / saw","saw / have seen","have seen / have seen","saw / saw"],ans:"have seen / saw",exp:"PP (тәжірибе). Содан кейін PS (in 2021 — нақты)."},
          {id:"g7a12",diff:"hard",text:"This is the most interesting book I ___ (ever/read).",opts:["ever read","have ever read","ever has read","ever have read"],ans:"have ever read",exp:"Superlative + have ever + V3."},
          {id:"g7a13",diff:"hard",text:"She ___ (work) here ___ five years.",opts:["has worked / for","has worked / since","worked / for","is working / for"],ans:"has worked / for",exp:"For + ұзақтық → PP."},
          {id:"g7a14",diff:"hard",text:"___ anyone ___ (call) while I was out?",opts:["Has / called","Have / called","Did / call","Does / call"],ans:"Did / call",exp:"'While I was out' = нақты өткен → Past Simple."},
          {id:"g7a15",diff:"hard",text:"Find the CORRECT sentence:",opts:["She has went to school.","Have you seen him yesterday?","I have never eaten Japanese food.","He has worked here since five years."],ans:"I have never eaten Japanese food.",exp:"Дұрыс: never + PP. ҚАТЕ: went→gone; yesterday→PS; since→for."},
        ]
      },
      {
        id:"g7b", title:"Passive Voice", subtitle:"Ырықсыз етіс", icon:"🔄", color:"#059669",
        darynNote:"Daryn 7-сынып: Present Simple Passive (is/are+V3), Past Simple Passive (was/were+V3).",
        explanation:{
          intro:`Ырықсыз етіс — іс-әрекет кімнің орындағаны белгісіз немесе маңызды емес.`,
          sections:[
            { title:"📐 Формасы", text:`Subject + be (шаққа қарай) + V3`, tag:"be + V3", examples:["Active: They build houses.","→ Passive: Houses ARE BUILT.","Active: She wrote the letter.","→ The letter WAS WRITTEN by her."] },
            { title:"🕐 Шақтарда Passive", text:`Шақ бойынша формалар:`, tag:"Шақ формалары", examples:["Present Simple: is/are + V3","Past Simple: was/were + V3","Future: will be + V3","Present Perfect: has/have been + V3","Modal: can/must + be + V3"] },
          ],
          tips:["💡 Active→Passive: object→subject, verb→be+V3.","💡 Орындаушыны айту: by + agent."],
          mistakes:["❌ The book was write → ✅ was written","❌ English are spoken → ✅ is spoken","❌ They are build → ✅ are built"]
        },
        questions:[
          {id:"g7b1",diff:"easy",text:"English ___ (speak) all over the world.",opts:["speaks","is spoken","are spoken","speak"],ans:"is spoken",exp:"Present Simple Passive: IS spoken."},
          {id:"g7b2",diff:"easy",text:"The Eiffel Tower ___ (build) in 1889.",opts:["built","was built","is built","were built"],ans:"was built",exp:"Past Simple Passive: was + V3."},
          {id:"g7b3",diff:"easy",text:"These cars ___ (make) in Germany.",opts:["makes","make","is made","are made"],ans:"are made",exp:"Cars (көпше) → ARE made."},
          {id:"g7b4",diff:"easy",text:"My phone ___ (steal) yesterday.",opts:["stole","was stolen","were stolen","is stolen"],ans:"was stolen",exp:"Past Simple Passive: was stolen."},
          {id:"g7b5",diff:"easy",text:"The results ___ (announce) tomorrow.",opts:["will announce","will be announced","is announced","are announce"],ans:"will be announced",exp:"Future Passive: will be + V3."},
          {id:"g7b6",diff:"medium",text:"Active: They clean the classrooms every day.\nPassive: The classrooms ___ every day.",opts:["clean","are cleaned","is cleaned","were cleaned"],ans:"are cleaned",exp:"Present Simple Passive: are + cleaned."},
          {id:"g7b7",diff:"medium",text:"Active: Scientists discovered a new planet.\nPassive: A new planet ___ by scientists.",opts:["discovered","was discovered","is discovered","were discovered"],ans:"was discovered",exp:"Past Simple Passive: was discovered."},
          {id:"g7b8",diff:"medium",text:"The homework ___ (must/submit) by Friday.",opts:["must submit","must be submitted","must be submitting","is must submitted"],ans:"must be submitted",exp:"Modal Passive: must be + V3."},
          {id:"g7b9",diff:"medium",text:"Thousands of books ___ (publish) every year.",opts:["publish","publishes","are published","is published"],ans:"are published",exp:"books (көпше) → are published."},
          {id:"g7b10",diff:"medium",text:"The bridge ___ (repair) at the moment.",opts:["repaired","is being repaired","was repaired","repairs"],ans:"is being repaired",exp:"Present Continuous Passive: is being + V3."},
          {id:"g7b11",diff:"hard",text:"Active: The teacher gave us a lot of homework.\nPassive: A lot of homework ___.",opts:["was given us","was given to us","were given to us","gave to us"],ans:"was given to us",exp:"Passive + жанама толықтауыш: was given TO us."},
          {id:"g7b12",diff:"hard",text:"The new hospital ___ (build) for two years already.",opts:["has built","has been built","have been built","was built"],ans:"has been built",exp:"Present Perfect Passive: has been + V3."},
          {id:"g7b13",diff:"hard",text:"English, Kazakh and Russian ___ (speak) in Kazakhstan.",opts:["speaks","are spoken","is spoken","were spoken"],ans:"are spoken",exp:"Үш тіл (көпше) → are spoken."},
          {id:"g7b14",diff:"hard",text:"Find the INCORRECT passive sentence:",opts:["The letter was written by her.","These books are sell in every shop.","English is spoken worldwide.","The car was stolen last night."],ans:"These books are sell in every shop.",exp:"ҚАТЕ: 'sell' → ДҰРЫС: 'are sold' (V3 керек!)."},
          {id:"g7b15",diff:"hard",text:"Active: People use smartphones to take photos.\nPassive: Smartphones ___.",opts:["are used to take photos","is used to take photos","are used for taking photos","use to take photos"],ans:"are used to take photos",exp:"Smartphones (көпше) → are used + to + V1."},
        ]
      },
      {
        id:"g7c", title:"First Conditional", subtitle:"1-ші шартты сөйлем", icon:"🌿", color:"#d97706",
        darynNote:"Daryn 7-сынып: If + Present Simple, … will. Unless, when, as soon as.",
        explanation:{
          intro:`First Conditional — болуы мүмкін, шынайы болашақ жағдайлар.`,
          sections:[
            { title:"📐 Формасы", text:`If + Present Simple, ... will + V1\n\n⚠️ If-бөлімінде WILL қолданылмайды!`, tag:"If + Present Simple, will + V1", examples:["If it rains, we will stay at home.","If she studies hard, she will pass.","If you don't hurry, you will miss the bus."] },
            { title:"🔄 Unless = If not", text:`Unless = If...not`, tag:"Unless", examples:["Unless you study, you won't pass.","= If you don't study, you won't pass."] },
            { title:"⏰ When / As soon as", text:`When/As soon as — болашақта да Present Simple:`, tag:"When + Present Simple", examples:["When she arrives, I will call you.","As soon as the lesson ends, we will go."] },
          ],
          tips:["💡 If-бөлімінде ЕШҚАШАН will жоқ!","💡 Unless = if not.","💡 When/As soon as + Present Simple (will емес!)."],
          mistakes:["❌ If it will rain → ✅ If it rains","❌ If she will study → ✅ If she studies","❌ Unless you will come → ✅ Unless you come"]
        },
        questions:[
          {id:"g7c1",diff:"easy",text:"If it ___ (rain) tomorrow, we ___ (stay) at home.",opts:["rains / will stay","will rain / will stay","rains / stay","rain / will stay"],ans:"rains / will stay",exp:"If + Present Simple, will + V1."},
          {id:"g7c2",diff:"easy",text:"She ___ (pass) if she ___ (study) hard.",opts:["will pass / studies","will pass / will study","passes / will study","will pass / study"],ans:"will pass / studies",exp:"will + V1 + if + Present Simple."},
          {id:"g7c3",diff:"easy",text:"If you ___ (not/hurry), you ___ (miss) the bus.",opts:["don't hurry / will miss","won't hurry / will miss","don't hurry / miss","didn't hurry / will miss"],ans:"don't hurry / will miss",exp:"If + болымсыз PS + will."},
          {id:"g7c4",diff:"easy",text:"If the weather ___ (be) nice, we ___ (go) to the park.",opts:["is / will go","will be / will go","is / go","are / will go"],ans:"is / will go",exp:"If + is, will go."},
          {id:"g7c5",diff:"easy",text:"___ you call me if you ___ (need) help?",opts:["Will / need","Will / will need","Do / need","Would / need"],ans:"Will / need",exp:"Will you…? + if + PS."},
          {id:"g7c6",diff:"medium",text:"___ you hurry, you will miss the train.",opts:["Unless","If","When","As soon as"],ans:"Unless",exp:"Unless = if not. Unless you hurry = If you don't hurry."},
          {id:"g7c7",diff:"medium",text:"She will call you ___ she arrives.",opts:["if","when","unless","after"],ans:"when",exp:"When = болашақта болатын уақыт."},
          {id:"g7c8",diff:"medium",text:"As soon as the bell ___ (ring), students ___ (leave).",opts:["rings / will leave","will ring / will leave","rings / leave","ring / will leave"],ans:"rings / will leave",exp:"As soon as + PS, will + V1."},
          {id:"g7c9",diff:"medium",text:"If you ___ (not/take) your medicine, you ___ (not/get) better.",opts:["don't take / won't get","won't take / won't get","don't take / don't get","didn't take / won't get"],ans:"don't take / won't get",exp:"If + don't take, won't get."},
          {id:"g7c10",diff:"medium",text:"What ___ (happen) if we ___ (not/save) energy?",opts:["will happen / don't save","happens / don't save","will happen / won't save","happen / don't save"],ans:"will happen / don't save",exp:"What will happen? + if + don't save."},
          {id:"g7c11",diff:"hard",text:"___ we don't protect the environment, many animals ___ become extinct.",opts:["If / will","Unless / will","If / won't","When / will"],ans:"If / will",exp:"If we don't protect → will become extinct."},
          {id:"g7c12",diff:"hard",text:"I'll lend you money ___ you ___ (promise) to pay me back.",opts:["if / promise","unless / promise","when / will promise","if / will promise"],ans:"if / promise",exp:"If + Present Simple (promise)."},
          {id:"g7c13",diff:"hard",text:"Unless ___ (study), she won't pass the exam.",opts:["she studies","she will study","she studied","she would study"],ans:"she studies",exp:"Unless + Present Simple."},
          {id:"g7c14",diff:"hard",text:"If he doesn't apologize, she ___ forgive him.",opts:["will","won't","would","wouldn't"],ans:"won't",exp:"If + болымсыз PS → won't (болымсыз нәтиже)."},
          {id:"g7c15",diff:"hard",text:"Find the INCORRECT sentence:",opts:["If she studies, she will pass.","Unless you hurry, you'll be late.","If it will rain, take an umbrella.","I'll call you when I arrive."],ans:"If it will rain, take an umbrella.",exp:"ҚАТЕ: 'If it will rain' → ДҰРЫС: 'If it rains'."},
        ]
      },
    ]
  },
  8: {
    label:"8-сынып",
    darynNote:"8-сынып Daryn: 2nd/3rd Conditionals, Reported Speech, Word Formation. Сөздік: ғылым, қоғам.",
    topics:[
      {
        id:"g8a", title:"2nd & 3rd Conditionals", subtitle:"Шындыққа жанаспайтын шарттар", icon:"🌐", color:"#dc2626",
        darynNote:"Daryn 8-сынып: 2nd Conditional (were/would), 3rd Conditional (had+V3/would have+V3).",
        explanation:{
          intro:`2nd және 3rd Conditional — шындыққа жанаспайтын жағдайлар.`,
          sections:[
            { title:"2nd Conditional — ҚАЗІРГІ ШЫНАЙЫ ЕМЕС", text:`If + Past Simple, would + V1\n\n⚠️ Be барлық жақта WERE!`, tag:"If + Past Simple, would + V1", examples:["If I were rich, I would travel. (Бай емеспін)","If she knew, she would tell us.","If I were you, I would apologize."] },
            { title:"3rd Conditional — ӨТКЕНДЕ ШЫНАЙЫ ЕМЕС", text:`If + Past Perfect, would have + V3`, tag:"If + Past Perfect, would have + V3", examples:["If I had studied harder, I would have passed.","If she hadn't been late, she would have caught the train."] },
            { title:"⚖️ Барлық шарттар салыстыру", text:`Жылдам салыстыру:`, tag:"0/1/2/3", examples:["0: If you heat ice, it melts. (Шындық)","1st: If it rains, I will take an umbrella.","2nd: If I were rich, I would buy a yacht.","3rd: If I had studied, I would have passed."] },
          ],
          tips:["💡 2nd-те БАРЛЫҚ жақта 'were' (was емес, ресми!).","💡 3rd болымсыз: If she HADN'T come… wouldn't HAVE come."],
          mistakes:["❌ If I was rich → ✅ If I were rich","❌ If he had come, he will see → ✅ would have seen","❌ If she would study → ✅ If she studied"]
        },
        questions:[
          {id:"g8a1",diff:"easy",text:"If I ___ (be) a doctor, I ___ (help) people.",opts:["was / would help","were / would help","am / will help","were / will help"],ans:"were / would help",exp:"2nd Conditional: were + would."},
          {id:"g8a2",diff:"easy",text:"If she ___ (study) harder, she ___ (pass).",opts:["studied / would pass","studies / would pass","studied / will pass","had studied / would pass"],ans:"studied / would pass",exp:"2nd Cond: Past Simple + would."},
          {id:"g8a3",diff:"easy",text:"If I ___ (be) you, I ___ (apologize) immediately.",opts:["am / will","were / would","was / would","be / would"],ans:"were / would",exp:"'If I were you' — классикалық 2nd Cond."},
          {id:"g8a4",diff:"easy",text:"If he ___ (study) last night, he ___ (pass) the test.",opts:["studied / would pass","had studied / would have passed","has studied / would pass","studied / would have passed"],ans:"had studied / would have passed",exp:"3rd Cond: Past Perfect + would have + V3."},
          {id:"g8a5",diff:"easy",text:"If there ___ (be) no pollution, our planet ___ (be) healthier.",opts:["is / will be","were / would be","was / would be","were / will be"],ans:"were / would be",exp:"2nd Cond: were + would be."},
          {id:"g8a6",diff:"medium",text:"She ___ (not/miss) the bus if she ___ (wake up) earlier.",opts:["wouldn't miss / woke up","wouldn't have missed / had woken up","won't miss / wakes up","wouldn't miss / had woken up"],ans:"wouldn't have missed / had woken up",exp:"3rd Cond: wouldn't have missed + had woken up."},
          {id:"g8a7",diff:"medium",text:"If I ___ (know) her number, I ___ (call) her yesterday.",opts:["knew / would call","had known / would have called","knew / would have called","had known / would call"],ans:"had known / would have called",exp:"3rd Cond: had known + would have called."},
          {id:"g8a8",diff:"medium",text:"What ___ you ___ (do) if you ___ (find) a wallet?",opts:["would you do / found","will you do / find","would you do / had found","would you have done / found"],ans:"would you do / found",exp:"2nd Cond сұраулы: What would you do if you found?"},
          {id:"g8a9",diff:"medium",text:"If the weather ___ (not/be) so cold, we ___ (go) swimming.",opts:["weren't / would go","wasn't / would go","hadn't been / would have gone","weren't / will go"],ans:"weren't / would go",exp:"2nd Cond: weren't + would go."},
          {id:"g8a10",diff:"medium",text:"If we ___ (save) energy, our planet ___ (be) healthier.",opts:["saved / would be","had saved / would be","save / would be","saved / will be"],ans:"saved / would be",exp:"2nd Cond: saved + would be."},
          {id:"g8a11",diff:"hard",text:"If Columbus ___ (not/discover) America, history ___ (be) very different today.",opts:["didn't discover / would be","hadn't discovered / would be","hadn't discovered / would have been","didn't discover / would have been"],ans:"hadn't discovered / would be",exp:"Mixed: 3rd Cond (өткен) + 2nd Cond (қазіргі нәтиже)."},
          {id:"g8a12",diff:"hard",text:"She ___ (not/be) so tired now if she ___ (not/work) so hard last week.",opts:["wouldn't be / hadn't worked","wouldn't have been / didn't work","weren't / hadn't worked","wouldn't be / didn't work"],ans:"wouldn't be / hadn't worked",exp:"Mixed: wouldn't be (қазір) + hadn't worked (өткен)."},
          {id:"g8a13",diff:"hard",text:"If I ___ (be) taller, I ___ (become) a basketball player.",opts:["were / would become","am / will become","had been / would have become","was / would become"],ans:"were / would become",exp:"2nd Cond: If I WERE taller, would become."},
          {id:"g8a14",diff:"hard",text:"He would have come to the party if he ___ invited.",opts:["has been","were","had been","was"],ans:"had been",exp:"3rd Cond passive: had been invited (Past Perfect Passive)."},
          {id:"g8a15",diff:"hard",text:"Choose the CORRECT sentence:",opts:["If I would have more time, I'd help you.","If she had come, we would have been happy.","If he studied yesterday, he would passed.","If they would listen, they would understand."],ans:"If she had come, we would have been happy.",exp:"Дұрыс: 3rd Cond. ҚАТЕ: would have→had; passed→have passed; would listen→listened."},
        ]
      },
      {
        id:"g8b", title:"Reported Speech", subtitle:"Жанама сөйлем", icon:"💬", color:"#7c3aed",
        darynNote:"Daryn 8-сынып: жанама сөйлем (statements, questions, commands). Шақтар ауысуы.",
        explanation:{
          intro:`Reported Speech — біреудің айтқанын басқаша жеткізу.`,
          sections:[
            { title:"📝 Баяндауыш сөйлемдер", text:`Said/told that + шақ бір кейін ығысады:\nPresent→Past, Past→Past Perfect, will→would`, tag:"Шақтар ығысады", examples:["'I like pizza.' → She said she LIKED pizza.","'I will come.' → She said she WOULD come.","'I have finished.' → He said he HAD finished.","'I went.' → She said she HAD GONE."] },
            { title:"❓ Сұраулы сөйлемдер", text:`asked + if/whether (Yes/No)\nasked + wh-word (Wh-)`, tag:"if/whether | wh-word", examples:["'Are you tired?' → He asked IF I WAS tired.","'Where do you live?' → She asked WHERE I LIVED."] },
            { title:"⚡ Бұйрықты сөйлемдер", text:`Told + Object + to + V1\nBolymsy: told not to + V1`, tag:"told + to/not to", examples:["'Sit down!' → He told me TO SIT DOWN.","'Don't run!' → She told us NOT TO RUN."] },
            { title:"🔄 Өзгетін сөздер", text:`Сілтеу сөздер де өзгереді:`, tag:"this→that, now→then", examples:["this→that, these→those","now→then, here→there","today→that day, yesterday→the day before","tomorrow→the next day"] },
          ],
          tips:["💡 Said vs Told: told + кімге (told me, told us).","💡 Yes/No → if/whether. Wh- → wh-сөз.","💡 Reported question: Subject + Verb (сұраулы емес!)."],
          mistakes:["❌ She said me → ✅ She told me","❌ He asked where did I live → ✅ where I lived","❌ She said she will come → ✅ she would come"]
        },
        questions:[
          {id:"g8b1",diff:"easy",text:"'I like English.' → She said she ___ English.",opts:["likes","liked","would like","has liked"],ans:"liked",exp:"Present Simple → Past Simple."},
          {id:"g8b2",diff:"easy",text:"'I am tired.' → He said he ___ tired.",opts:["is","was","were","has been"],ans:"was",exp:"am → was."},
          {id:"g8b3",diff:"easy",text:"'I will help you.' → She said she ___ help me.",opts:["will","would","can","could"],ans:"would",exp:"will → would."},
          {id:"g8b4",diff:"easy",text:"'Sit down!' → The teacher told the students ___ down.",opts:["sat","sit","to sit","sitting"],ans:"to sit",exp:"Бұйрық → told + to + V1."},
          {id:"g8b5",diff:"easy",text:"'Don't be late!' → He told me ___ late.",opts:["not be","to not be","not to be","don't be"],ans:"not to be",exp:"Болымсыз бұйрық → not to + V1."},
          {id:"g8b6",diff:"medium",text:"'Are you hungry?' → She asked me if I ___ hungry.",opts:["am","was","were","be"],ans:"was",exp:"Yes/No → asked if. am → was."},
          {id:"g8b7",diff:"medium",text:"'Where do you live?' → He asked me where I ___.",opts:["live","do live","lived","does live"],ans:"lived",exp:"Wh- → asked where + Subject + Verb. lived."},
          {id:"g8b8",diff:"medium",text:"'I have finished my homework.' → She said she ___ her homework.",opts:["has finished","finished","had finished","was finishing"],ans:"had finished",exp:"Present Perfect → Past Perfect."},
          {id:"g8b9",diff:"medium",text:"'Did you see the film?' → He asked me if I ___ the film.",opts:["saw","had seen","have seen","see"],ans:"had seen",exp:"Past Simple → Past Perfect."},
          {id:"g8b10",diff:"medium",text:"'Please open the window.' → She asked me ___ the window.",opts:["open","to open","opening","opened"],ans:"to open",exp:"Өтіну → asked + to + V1."},
          {id:"g8b11",diff:"hard",text:"'I went to Paris last year.' → He said he ___ to Paris ___ year.",opts:["went / last","had gone / the previous","has gone / last","went / the previous"],ans:"had gone / the previous",exp:"Past Simple → Past Perfect. last year → the previous year."},
          {id:"g8b12",diff:"hard",text:"'What time will the train arrive?' → She asked what time the train ___.",opts:["will arrive","would arrive","arrives","had arrived"],ans:"would arrive",exp:"will → would. Wh-сұрақ баяндауыш ретімен."},
          {id:"g8b13",diff:"hard",text:"'I can't swim.' → He said he ___ swim.",opts:["can't","couldn't","wasn't able","didn't can"],ans:"couldn't",exp:"can → could."},
          {id:"g8b14",diff:"hard",text:"'This is my book.' → She said ___ was ___ book.",opts:["this / her","that / her","this / hers","that / hers"],ans:"that / her",exp:"this→that. my→her."},
          {id:"g8b15",diff:"hard",text:"Find the CORRECT reported sentence for: 'We are studying for exams now.'",opts:["They said they are studying now.","They said they were studying then.","They said they studied then.","They said they had been studying now."],ans:"They said they were studying then.",exp:"Present Continuous → Past Continuous. now→then."},
        ]
      },
      {
        id:"g8c", title:"Word Formation", subtitle:"Сөз тудыру", icon:"🔤", color:"#059669",
        darynNote:"Daryn 8-сынып: noun/adjective/adverb тудыру, prefix (un-/dis-/mis-) және suffix (-tion/-ness/-ful/-less).",
        explanation:{
          intro:`Word Formation — бір сөзден жұрнақ арқылы басқа сөз жасау.`,
          sections:[
            { title:"📌 Зат есім жұрнақтары", text:` `, tag:"-tion, -ness, -ment, -ity, -er", examples:["-tion: educate→education, decide→decision","-ness: happy→happiness, dark→darkness","-ment: improve→improvement","-er/-or: teach→teacher, direct→director","-ity: creative→creativity"] },
            { title:"🎨 Сын есім жұрнақтары", text:` `, tag:"-ful, -less, -ous, -al, -ive, -able", examples:["-ful: care→careful, success→successful","-less: care→careless, hope→hopeless","-ous: danger→dangerous, fame→famous","-able: understand→understandable"] },
            { title:"🔴 Теріс мағына жалғаулары", text:` `, tag:"un-, dis-, im-/in-, mis-", examples:["un-: happy→unhappy, fair→unfair","dis-: agree→disagree, honest→dishonest","im-: possible→impossible, polite→impolite","mis-: understand→misunderstand"] },
            { title:"💨 Үстеу жұрнағы", text:`Adjective + -ly = Adverb`, tag:"-ly → Adverb", examples:["quick→quickly, careful→carefully","happy→happily (y→i+ly)"] },
          ],
          tips:["💡 Сөйлемде бостың типін анықта (noun/adj/adverb/verb).","💡 Теріс мағына керек пе? un-/dis-/im-/in-."],
          mistakes:["❌ He showed great create → ✅ creativity","❌ She was disappoint → ✅ disappointed","❌ It is impossibly → ✅ impossible"]
        },
        questions:[
          {id:"g8c1",diff:"easy",text:"The scientist made an important ___ (discover).",opts:["discover","discoverer","discovery","discovering"],ans:"discovery",exp:"Important + [noun]: discovery."},
          {id:"g8c2",diff:"easy",text:"She was very ___ (disappoint) with the results.",opts:["disappoint","disappointment","disappointed","disappointing"],ans:"disappointed",exp:"was + [adj]: disappointed."},
          {id:"g8c3",diff:"easy",text:"He showed great ___ (creative) in his project.",opts:["creative","creation","creatively","creativity"],ans:"creativity",exp:"great [noun]: creativity."},
          {id:"g8c4",diff:"easy",text:"It is ___ (possible) to learn quickly.",opts:["possible","impossible","possibly","impossibly"],ans:"impossible",exp:"Теріс + adj: impossible."},
          {id:"g8c5",diff:"easy",text:"She spoke very ___ (confident) at the presentation.",opts:["confidence","confident","confidently","unconfident"],ans:"confidently",exp:"Spoke + [adverb]: confidently."},
          {id:"g8c6",diff:"medium",text:"The ___ (educate) system is changing rapidly.",opts:["educate","education","educational","educationally"],ans:"educational",exp:"System алдында adj: educational."},
          {id:"g8c7",diff:"medium",text:"His ___ (behave) at school was unacceptable.",opts:["behave","behaviour","behavioural","behaving"],ans:"behaviour",exp:"His [noun]: behaviour."},
          {id:"g8c8",diff:"medium",text:"The instructions were completely ___ (understand).",opts:["understand","understandable","understanding","misunderstand"],ans:"understandable",exp:"were completely [adj]: understandable."},
          {id:"g8c9",diff:"medium",text:"She was ___ (honest) about what happened.",opts:["honest","dishonest","honesty","honestly"],ans:"dishonest",exp:"Теріс мағына: dishonest."},
          {id:"g8c10",diff:"medium",text:"The government needs to ___ (modern) the system.",opts:["modern","modernity","modernize","modernly"],ans:"modernize",exp:"needs to [verb]: modernize."},
          {id:"g8c11",diff:"hard",text:"His ___ (responsible) behaviour caused problems. He acted ___ (responsible).",opts:["irresponsible / irresponsibly","irresponsibility / irresponsible","irresponsible / responsible","responsible / irresponsibly"],ans:"irresponsible / irresponsibly",exp:"1) adj (behaviour): irresponsible. 2) adverb (acted): irresponsibly."},
          {id:"g8c12",diff:"hard",text:"The ___ (beautiful) of nature is truly ___ (breathtake).",opts:["beauty / breathtaking","beautiful / breathtaking","beauty / breathtaken","beautifulness / breathtaking"],ans:"beauty / breathtaking",exp:"The [noun]: beauty. truly [adj]: breathtaking."},
          {id:"g8c13",diff:"hard",text:"Scientists need ___ (creative) and ___ (curious) to make discoveries.",opts:["creativity / curiosity","creative / curious","creation / curiosity","creativity / curiousness"],ans:"creativity / curiosity",exp:"need [nouns]: creativity, curiosity."},
          {id:"g8c14",diff:"hard",text:"The new policy was ___ (effect). Its ___ (effective) was praised.",opts:["effective / effectiveness","effectively / effectiveness","effective / effectivity","effectful / effective"],ans:"effective / effectiveness",exp:"was [adj]: effective. Its [noun]: effectiveness."},
          {id:"g8c15",diff:"hard",text:"'The ___ (invent) of the telephone was a ___ (revolution) moment. Bell's ___ (invent) changed ___ (communicate) forever.'\n\nBlanks 1,2,3,4:",opts:["invention / revolutionary / invention / communication","inventor / revolution / invent / communicating","invention / revolutionary / inventor / communication","invent / revolutionize / invention / communication"],ans:"invention / revolutionary / invention / communication",exp:"1) The [noun]: invention. 2) [adj] moment: revolutionary. 3) Bell's [noun]: invention. 4) changed [noun]: communication."},
        ]
      },
    ]
  }
};

// ─── HELPERS ─────────────────────────────────────────────────
const medal = (pct) => {
  if(pct>=90) return {e:"🥇",msg:"Керемет! Республикалық кезеңге дайынсыз!",c:"#d97706"};
  if(pct>=75) return {e:"🥈",msg:"Өте жақсы! Аздаған жаттығу жетіспейді.",c:"#6b7280"};
  if(pct>=55) return {e:"🥉",msg:"Жаман емес! Дайындықты жалғастырыңыз.",c:"#b45309"};
  return {e:"📚",msg:"Тоқтамаңыз — жаттығу жеңіске жеткізеді!",c:"#6b7280"};
};

// ─── HOME ────────────────────────────────────────────────────
function Home({grade, setGrade, setScreen, scores}) {
  const cur = CURRICULUM[grade];
  const total = cur.topics.reduce((s,t)=>s+(scores[t.id]?.total||0),0);
  const corr  = cur.topics.reduce((s,t)=>s+(scores[t.id]?.correct||0),0);
  const done  = cur.topics.filter(t=>scores[t.id]).length;
  return (
    <div className="screen">
      <div className="hero">
        <div className="eyebrow">🏆 Daryn Olimpiada Prep</div>
        <h1 className="hero-title">Ағылшын тілі<br/>Олимпиада Дайындығы</h1>
        <p className="hero-sub">Daryn.kz форматына сәйкес терең дайындық жүйесі</p>
        <div className="grade-lbl">Сыныпты таңдаңыз</div>
        <div className="grades">
          {[5,6,7,8].map(g=>(
            <button key={g} className={`gpill${grade===g?" on":""}`} onClick={()=>setGrade(g)}>{g}</button>
          ))}
        </div>
        <div className="daryn-tag">📋 {cur.darynNote.slice(0,80)}…</div>
      </div>
      {total>0 && (
        <div className="stats-row">
          <div className="stat"><div className="stat-n">{done}/{cur.topics.length}</div><div className="stat-l">Тақырып</div></div>
          <div className="stat"><div className="stat-n">{total>0?Math.round(corr/total*100):0}%</div><div className="stat-l">Нәтиже</div></div>
          <div className="stat"><div className="stat-n">{corr}/{total}</div><div className="stat-l">Балл</div></div>
        </div>
      )}
      <div className="sec-hdr">
        <h2>{grade}-сынып тақырыптары</h2>
        <small>{cur.topics.length} тақырып · {cur.topics.length*15} сұрақ</small>
      </div>
      <div className="tgrid">
        {cur.topics.map(t=>{
          const sc = scores[t.id];
          const pct = sc ? Math.round(sc.correct/sc.total*100) : 0;
          return (
            <div key={t.id} className="tcard" style={{"--c":t.color}} onClick={()=>setScreen({v:"lesson",topic:t})}>
              <div className="tcard-ico">{t.icon}</div>
              <div className="tcard-ttl">{t.title}</div>
              <div className="tcard-sub">{t.subtitle}</div>
              <div className="tcard-bar"><div className="tcard-fill" style={{width:`${pct}%`}}/></div>
              <div className="tcard-sc">{sc?`${sc.correct}/${sc.total} (${pct}%)`:"Жаттықпаған"}</div>
            </div>
          );
        })}
      </div>
      <div className="qa-row">
        <button className="qa-btn qa-p" onClick={()=>setScreen({v:"mock"})}>📝 Мок-Олимпиада</button>
        <button className="qa-btn qa-s" onClick={()=>setScreen({v:"ai"})}>🤖 AI Мұғалім</button>
      </div>
    </div>
  );
}

// ─── LESSON ──────────────────────────────────────────────────
function Lesson({topic, setScreen, setScores}) {
  const [tab, setTab] = useState("theory");
  const [qi, setQi]   = useState(0);
  const [sel, setSel] = useState({});
  const [done, setDone] = useState(false);
  const questions = topic.questions;
  const q = questions[qi] || questions[0];
  const chosen = sel[q.id];
  const answered = chosen !== undefined;
  const correct = questions.filter(qq=>sel[qq.id]===qq.ans).length;
  const pct = Math.round(correct/questions.length*100);

  function choose(opt) {
    if(answered) return;
    const next = {...sel, [q.id]: opt};
    setSel(next);
    if(qi === questions.length-1) {
      const c = questions.filter(qq=>next[qq.id]===qq.ans).length;
      setScores(p=>({...p, [topic.id]:{correct:c, total:questions.length}}));
    }
  }
  function reset() { setSel({}); setQi(0); setDone(false); }
  function goNext() {
    if(qi < questions.length-1) setQi(qi+1);
    else setDone(true);
  }
  function optStyle(opt) {
    if(!answered) return "opt";
    if(opt===q.ans) return "opt opt-correct";
    if(opt===chosen) return "opt opt-wrong";
    return "opt opt-other";
  }
  const th = topic.explanation;
  return (
    <div className="screen">
      <button className="back-btn" onClick={()=>setScreen({v:"home"})}>← Артқа</button>
      <div style={{padding:"10px 20px 0",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:26}}>{topic.icon}</span>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#1e2740"}}>{topic.title}</div>
          <div style={{fontSize:12,color:"#94a3b8"}}>{topic.subtitle}</div>
        </div>
      </div>
      <div className="tabs" style={{marginTop:12}}>
        <button className={`tab${tab==="theory"?" on":""}`} onClick={()=>setTab("theory")}>📖 Теория</button>
        <button className={`tab${tab==="practice"?" on":""}`} onClick={()=>setTab("practice")}>✏️ Тест ({questions.length} сұрақ)</button>
      </div>

      {/* ── THEORY TAB ── */}
      {tab==="theory" && (
        <div className="th-wrap">
          <div className="analysis-box"><strong>📋 Daryn талдауы:</strong> {topic.darynNote}</div>
          <div className="intro-box">{th.intro}</div>
          {th.sections.map((s,i)=>(
            <div key={i} className="rule-card">
              <div className="rule-card-hdr"><div className="rule-card-title">{s.title}</div></div>
              <div className="rule-card-body">
                {s.text && <div className="rule-text">{s.text}</div>}
                <div className="rule-tag">{s.tag}</div>
                <div className="eg-list">
                  {s.examples.map((ex,j)=><div key={j} className="eg">{ex}</div>)}
                </div>
              </div>
            </div>
          ))}
          {th.tips && (
            <div className="tips-box">
              <div className="tips-ttl">💡 Пайдалы кеңестер</div>
              {th.tips.map((t,i)=><div key={i} className="tip"><span>{t}</span></div>)}
            </div>
          )}
          {th.mistakes && (
            <div className="mistakes-box">
              <div className="mistakes-ttl">⚠️ Жиі кездесетін қателер</div>
              {th.mistakes.map((m,i)=><div key={i} className="mistake"><span>{m}</span></div>)}
            </div>
          )}
          <button className="start-btn" onClick={()=>setTab("practice")}>
            ✏️ Тестті бастау — {questions.length} сұрақ →
          </button>
        </div>
      )}

      {/* ── PRACTICE TAB — QUESTIONS ── */}
      {tab==="practice" && !done && (
        <div>
          <div className="pbar" style={{"--c":topic.color}}>
            <span className="pbar-txt">Сұрақ {qi+1}/{questions.length}</span>
            <div className="pbar-track"><div className="pbar-fill" style={{width:`${((qi+1)/questions.length)*100}%`}}/></div>
            <span className="pbar-txt" style={{color:"#10b981"}}>{correct} ✓</span>
          </div>
          <div className="qdots">
            {questions.map((qq,i)=>{
              let cls="qdot";
              if(i===qi) cls+=" cur";
              else if(sel[qq.id]!==undefined) cls+=sel[qq.id]===qq.ans?" ok2":" fail";
              return <button key={i} className={cls} onClick={()=>setQi(i)}>{i+1}</button>;
            })}
          </div>
          <div className="q-wrap">
            <div className="q-meta">
              <span className="q-num">Сұрақ {qi+1}</span>
              <span className={`diff ${q.diff==="easy"?"diff-easy":q.diff==="medium"?"diff-mid":"diff-hard"}`}>
                {q.diff==="easy"?"Оңай":q.diff==="medium"?"Орташа":"Қиын"}
              </span>
            </div>
            <div className="q-text">{q.text}</div>
            <div className="opts">
              {q.opts.map((opt,oi)=>(
                <button key={oi} className={optStyle(opt)} onClick={()=>choose(opt)}>{opt}</button>
              ))}
            </div>
            {answered && (
              <div className={`fb ${chosen===q.ans?"ok":"bad"}`}>
                {chosen===q.ans ? "✅ Дұрыс! " : `❌ Дұрыс жауап: «${q.ans}». `}
                <strong>Түсіндірме:</strong> {q.exp}
              </div>
            )}
          </div>
          <div className="nav">
            <button className="nbtn" onClick={()=>setQi(Math.max(0,qi-1))} style={{opacity:qi===0?0.3:1}}>← Алдыңғы</button>
            {answered && (
              <button className="nbtn pri" onClick={goNext}>
                {qi===questions.length-1 ? "Нәтиже →" : "Келесі →"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── PRACTICE TAB — RESULTS ── */}
      {tab==="practice" && done && (
        <div className="res-wrap">
          {(()=>{
            const m = medal(pct);
            return (
              <>
                <div className="medal">{m.e}</div>
                <div className="res-pct" style={{color:m.c}}>{pct}%</div>
                <div className="res-lbl">{correct}/{questions.length} дұрыс жауап</div>
                <div className="res-msg">{m.msg}</div>
                <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginTop:20,marginBottom:24}}>
                  <button className="nbtn" onClick={reset}>🔄 Қайтадан</button>
                  <button className="nbtn" onClick={()=>setTab("theory")}>📖 Теория</button>
                  <button className="nbtn pri" onClick={()=>setScreen({v:"home"})}>← Тізімге</button>
                </div>
                <div className="rev-hdr">Толық талдау</div>
                {questions.map((qq,i)=>{
                  const ok = sel[qq.id]===qq.ans;
                  return (
                    <div key={i} className="rev-item">
                      <div className="rev-q">{i+1}. {qq.text.split("\n")[0]}</div>
                      <div className={`rev-st ${ok?"rev-ok":"rev-fail"}`}>
                        {ok?"✅ Дұрыс":`❌ «${sel[qq.id]||"—"}» → «${qq.ans}»`}
                      </div>
                      {!ok && <div className="rev-exp">{qq.exp}</div>}
                    </div>
                  );
                })}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// ─── MOCK TEST ───────────────────────────────────────────────
function Mock({grade, setScreen}) {
  const cur = CURRICULUM[grade];
  const allQ = cur.topics.flatMap(t=>t.questions);
  const [phase, setPhase] = useState("intro");
  const [qi, setQi]       = useState(0);
  const [sel, setSel]     = useState({});
  const [tl, setTl]       = useState(45*60);
  const timerRef = useRef(null);
  const q = allQ[qi];
  const chosen = sel[q?.id];
  const answered = chosen !== undefined;
  const correct = allQ.filter(qq=>sel[qq.id]===qq.ans).length;
  const pct = Math.round(correct/allQ.length*100);
  const mm = String(Math.floor(tl/60)).padStart(2,"0");
  const ss = String(tl%60).padStart(2,"0");

  useEffect(()=>{
    if(phase==="test") {
      timerRef.current = setInterval(()=>{
        setTl(t=>{
          if(t<=1){ clearInterval(timerRef.current); setPhase("results"); return 0; }
          return t-1;
        });
      },1000);
    }
    return ()=>clearInterval(timerRef.current);
  },[phase]);

  function choose(opt) {
    if(answered) return;
    setSel(p=>({...p,[q.id]:opt}));
  }
  function optStyle(opt) {
    if(!answered) return "opt";
    if(opt===q.ans) return "opt opt-correct";
    if(opt===chosen) return "opt opt-wrong";
    return "opt opt-other";
  }
  function finish() { clearInterval(timerRef.current); setPhase("results"); }
  function restart() { setSel({}); setQi(0); setTl(45*60); setPhase("intro"); }

  if(phase==="intro") return (
    <div className="screen">
      <button className="back-btn" onClick={()=>setScreen({v:"home"})}>← Артқа</button>
      <div className="mock-cover">
        <div style={{fontSize:46,marginBottom:10}}>📝</div>
        <div className="mock-ttl">Мок-Олимпиада</div>
        <div className="mock-sub">{grade}-сынып · Daryn форматы · {allQ.length} сұрақ</div>
        <div className="mock-rules">
          <div className="mrule"><span className="mrule-ico">⏱</span>Уақыт: <strong>45 минут</strong></div>
          <div className="mrule"><span className="mrule-ico">📋</span>Барлық тақырыптардан {allQ.length} сұрақ</div>
          <div className="mrule"><span className="mrule-ico">🎯</span>75%+ = Облыстық кезеңге дайын</div>
          <div className="mrule"><span className="mrule-ico">💡</span>Нөмірлерге басып кез-келген сұраққа оралуға болады</div>
        </div>
        <button className="start-btn" onClick={()=>setPhase("test")}>Тестті бастау →</button>
      </div>
    </div>
  );

  if(phase==="results") {
    const m = medal(pct);
    return (
      <div className="screen">
        <button className="back-btn" onClick={()=>setScreen({v:"home"})}>← Артқа</button>
        <div className="res-wrap">
          <div className="medal">{m.e}</div>
          <div className="res-pct" style={{color:m.c}}>{pct}%</div>
          <div className="res-lbl">{correct}/{allQ.length} дұрыс жауап</div>
          <div className="res-msg">{m.msg}</div>
          {cur.topics.map(t=>{
            const sc = t.questions.filter(qq=>sel[qq.id]===qq.ans).length;
            return (
              <div key={t.id} style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,padding:"10px 15px",display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:13,color:"#64748b"}}>{t.icon} {t.title}</span>
                <span style={{fontWeight:700,color:"#6366f1"}}>{sc}/{t.questions.length}</span>
              </div>
            );
          })}
          <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:20,marginBottom:24}}>
            <button className="nbtn" onClick={restart}>🔄 Қайтадан</button>
            <button className="nbtn pri" onClick={()=>setScreen({v:"home"})}>← Артқа</button>
          </div>
          <div className="rev-hdr">Толық нәтиже</div>
          {cur.topics.map(t=>(
            <div key={t.id}>
              <div className="sdiv">{t.icon} {t.title}</div>
              {t.questions.map((qq,i)=>{
                const ok = sel[qq.id]===qq.ans;
                return (
                  <div key={i} className="rev-item">
                    <div className="rev-q">{qq.text.split("\n")[0].slice(0,90)}{qq.text.length>90?"…":""}</div>
                    <div className={`rev-st ${ok?"rev-ok":"rev-fail"}`}>
                      {ok?"✅ Дұрыс":`❌ «${sel[qq.id]||"—"}» → «${qq.ans}»`}
                    </div>
                    {!ok && <div className="rev-exp">{qq.exp}</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Test phase
  const topicOfQ = cur.topics.find(t=>t.questions.some(qq=>qq.id===q.id));
  return (
    <div className="screen">
      <div className="pbar" style={{"--c":topicOfQ?.color||"#6366f1"}}>
        <span className="pbar-txt">{qi+1}/{allQ.length}</span>
        <div className="pbar-track"><div className="pbar-fill" style={{width:`${((qi+1)/allQ.length)*100}%`}}/></div>
        <span className={`timer${tl<300?" warn":""}`}>{mm}:{ss}</span>
      </div>
      <div className="qdots">
        {allQ.map((qq,i)=>{
          let cls="qdot";
          if(i===qi) cls+=" cur";
          else if(sel[qq.id]!==undefined) cls+=sel[qq.id]===qq.ans?" ok2":" fail";
          return <button key={i} className={cls} onClick={()=>setQi(i)}>{i+1}</button>;
        })}
      </div>
      <div style={{padding:"4px 20px",fontSize:11,color:"#94a3b8"}}>
        {topicOfQ?.icon} {topicOfQ?.title}
      </div>
      <div className="q-wrap">
        <div className="q-meta">
          <span className="q-num">Сұрақ {qi+1}</span>
          <span className={`diff ${q.diff==="easy"?"diff-easy":q.diff==="medium"?"diff-mid":"diff-hard"}`}>
            {q.diff==="easy"?"Оңай":q.diff==="medium"?"Орташа":"Қиын"}
          </span>
        </div>
        <div className="q-text">{q.text}</div>
        <div className="opts">
          {q.opts.map((opt,oi)=>(
            <button key={oi} className={optStyle(opt)} onClick={()=>choose(opt)}>{opt}</button>
          ))}
        </div>
        {answered && (
          <div className={`fb ${chosen===q.ans?"ok":"bad"}`}>
            {chosen===q.ans ? "✅ Дұрыс! " : `❌ Дұрыс жауап: «${q.ans}». `}
            <strong>Түсіндірме:</strong> {q.exp}
          </div>
        )}
      </div>
      <div className="nav">
        <button className="nbtn" onClick={()=>setQi(Math.max(0,qi-1))} style={{opacity:qi===0?0.3:1}}>← Алдыңғы</button>
        <div style={{display:"flex",gap:8}}>
          {qi < allQ.length-1
            ? <button className="nbtn pri" onClick={()=>setQi(qi+1)}>Келесі →</button>
            : <button className="nbtn pri" onClick={finish}>Аяқтау ✓</button>
          }
        </div>
      </div>
    </div>
  );
}

// ─── AI TEACHER ──────────────────────────────────────────────
function AIScreen({grade, setScreen}) {
  const cur = CURRICULUM[grade];
  const chips = [
    "Артикль бойынша мысалдар бер",
    "Present Perfect пен Past Simple айырмасы",
    "2nd Conditional-ды түсіндір",
    "Passive Voice-ты қалай жасаймын?",
    "Word Formation жаттығулары",
    "Reported Speech ережелері",
    "Олимпиадаға қандай кеңес бересің?",
  ];
  const [msgs, setMsgs] = useState([
    {r:"a", t:`Сәлем! Мен ${grade}-сынып ағылшын тілі олимпиадасының AI мұғалімімін.\n\nТақырыптарым: ${cur.topics.map(t=>t.title).join(", ")}.\n\nКез-келген сұрақ қоя аласыз — қазақша түсіндіремін!`}
  ]);
  const [inp, setInp] = useState("");
  const [load, setLoad] = useState(false);
  const endRef = useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  async function send(text) {
    const t = (text||inp).trim();
    if(!t||load) return;
    setInp("");
    setMsgs(m=>[...m,{r:"u",t}]);
    setLoad(true);
    try {
      const history = msgs.map(m=>({role:m.r==="a"?"assistant":"user",content:m.t}));
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:`Сен ${grade}-сынып оқушыларына арналған ағылшын тілі олимпиада мұғаліміссің (Daryn.kz Қазақстан). Ағымдағы тақырыптар: ${cur.topics.map(t=>t.title).join(", ")}. Барлық жауаптарды ҚАЗАҚША жаз. Ағылшынша мысалдар міндетті — қазақша аудармасымен бер. Грамматика ережелерін нақты, мысалдарға сүйеніп түсіндір. Жаттығу сұрақтарды сұрасаларда — 4 опциялы MCQ форматында жаса. Нақты, ықшам, пайдалы бол.`,
          messages:[...history,{role:"user",content:t}]
        })
      });
      const d = await res.json();
      const reply = d.content?.map(c=>c.text||"").join("") || "Кешіріңіз, қате шықты.";
      setMsgs(m=>[...m,{r:"a",t:reply}]);
    } catch(e) {
      setMsgs(m=>[...m,{r:"a",t:"Байланыс қатесі. Қайта көріңіз."}]);
    }
    setLoad(false);
  }

  return (
    <div className="screen ai-wrap">
      <button className="back-btn" onClick={()=>setScreen({v:"home"})}>← Артқа</button>
      <div className="ai-hdr">
        <div className="ai-hdr-t">🤖 AI Мұғалім — {grade}-сынып</div>
        <div className="ai-hdr-s">Кез-келген тақырып бойынша қазақша түсіндірме</div>
      </div>
      <div className="ai-chips">
        {chips.map(c=>(
          <button key={c} className="aichip" onClick={()=>send(c)}>{c}</button>
        ))}
      </div>
      <div className="msgs">
        {msgs.map((m,i)=>(
          <div key={i} className={`msg ${m.r}`}>{m.t}</div>
        ))}
        {load && (
          <div className="msg a">
            <div className="dotrow"><div className="d"/><div className="d"/><div className="d"/></div>
          </div>
        )}
        <div ref={endRef}/>
      </div>
      <div className="ai-bar">
        <input className="ai-inp" value={inp} onChange={e=>setInp(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Сұрағыңызды жазыңыз…"/>
        <button className="ai-send" onClick={()=>send()} disabled={load||!inp.trim()}>Жіберу</button>
      </div>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#f0f4ff;color:#1e2740;font-family:'DM Sans',sans-serif;min-height:100vh;}
::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:#c7d0f0;border-radius:3px;}
.app{min-height:100vh;background:linear-gradient(160deg,#eef2ff 0%,#f5f0ff 50%,#fff0f9 100%);}
.screen{animation:up .22s ease both;}
@keyframes up{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.hero{padding:48px 20px 28px;text-align:center;position:relative;}
.hero::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 0%,rgba(139,92,246,.10) 0%,transparent 70%);pointer-events:none;}
.eyebrow{display:inline-flex;align-items:center;gap:6px;background:rgba(139,92,246,.12);border:1.5px solid rgba(139,92,246,.30);border-radius:50px;padding:5px 16px;font-size:11px;color:#7c3aed;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:18px;font-weight:600;}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(26px,6vw,46px);font-weight:700;line-height:1.1;margin-bottom:10px;background:linear-gradient(135deg,#1e2740 0%,#7c3aed 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.hero-sub{color:#6b7a99;font-size:14px;line-height:1.6;max-width:400px;margin:0 auto 24px;}
.grade-lbl{font-size:10px;color:#a0aec0;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;}
.grades{display:flex;gap:10px;justify-content:center;margin-bottom:8px;}
.gpill{min-width:60px;height:50px;border-radius:14px;border:2px solid #e2e8f0;background:#fff;color:#94a3b8;font-size:17px;font-weight:700;cursor:pointer;transition:all .18s;font-family:'DM Sans',sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.06);}
.gpill:hover{border-color:#a78bfa;color:#7c3aed;background:#faf5ff;}
.gpill.on{border-color:#7c3aed;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;box-shadow:0 4px 18px rgba(124,58,237,.30);}
.daryn-tag{display:inline-flex;align-items:center;gap:6px;margin:10px 0 6px;background:#fffbeb;border:1.5px solid #fcd34d;border-radius:10px;padding:5px 13px;font-size:11px;color:#92400e;font-weight:500;}
.stats-row{display:flex;margin:0 16px 20px;background:#fff;border-radius:18px;box-shadow:0 2px 16px rgba(0,0,0,.07);overflow:hidden;}
.stat{flex:1;padding:14px 8px;text-align:center;border-right:1px solid #f1f5f9;}
.stat:last-child{border-right:none;}
.stat-n{font-family:'Playfair Display',serif;font-size:22px;color:#7c3aed;font-weight:700;}
.stat-l{font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.8px;margin-top:2px;}
.sec-hdr{padding:4px 20px 12px;display:flex;align-items:baseline;justify-content:space-between;}
.sec-hdr h2{font-family:'Playfair Display',serif;font-size:20px;color:#1e2740;}
.sec-hdr small{font-size:11px;color:#94a3b8;}
.tgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 16px 18px;}
@media(min-width:560px){.tgrid{grid-template-columns:repeat(3,1fr);}}
.tcard{background:#fff;border:2px solid transparent;border-radius:18px;padding:18px 14px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.07);}
.tcard::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--c);border-radius:3px 3px 0 0;}
.tcard:hover{border-color:var(--c);transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.12);}
.tcard-ico{font-size:26px;margin-bottom:9px;}
.tcard-ttl{font-size:13px;font-weight:700;color:#1e2740;margin-bottom:2px;}
.tcard-sub{font-size:11px;color:#94a3b8;margin-bottom:10px;line-height:1.4;}
.tcard-bar{height:4px;background:#f1f5f9;border-radius:3px;overflow:hidden;}
.tcard-fill{height:100%;border-radius:3px;background:var(--c);transition:width .4s;}
.tcard-sc{font-size:10px;color:#94a3b8;margin-top:5px;}
.qa-row{display:flex;gap:10px;padding:0 16px 24px;}
.qa-btn{flex:1;padding:14px;border-radius:15px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;transition:all .2s;}
.qa-p{background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;box-shadow:0 4px 16px rgba(124,58,237,.30);}
.qa-p:hover{box-shadow:0 6px 22px rgba(124,58,237,.40);transform:translateY(-1px);}
.qa-s{background:#fff;border:2px solid #e2e8f0 !important;color:#64748b;box-shadow:0 2px 8px rgba(0,0,0,.06);}
.qa-s:hover{border-color:#a78bfa !important;color:#7c3aed;}
.back-btn{display:flex;align-items:center;gap:6px;background:none;border:none;color:#94a3b8;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;padding:16px 20px 6px;transition:color .2s;}
.back-btn:hover{color:#7c3aed;}
.tabs{display:flex;border-bottom:2px solid #e2e8f0;padding:0 20px;background:#fff;margin-top:4px;}
.tab{padding:12px 18px;font-size:13px;font-weight:600;color:#94a3b8;cursor:pointer;border:none;background:none;border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .2s;font-family:'DM Sans',sans-serif;}
.tab.on{color:#7c3aed;border-bottom-color:#7c3aed;}
.th-wrap{padding:16px 16px 80px;}
.analysis-box{background:#fffbeb;border:1.5px solid #fcd34d;border-radius:14px;padding:14px 16px;margin-bottom:14px;font-size:12px;color:#92400e;line-height:1.65;font-weight:500;}
.intro-box{background:#f5f3ff;border:1.5px solid #ddd6fe;border-radius:14px;padding:14px 16px;margin-bottom:14px;font-size:13px;color:#5b21b6;line-height:1.8;white-space:pre-line;}
.rule-card{background:#fff;border:2px solid #e2e8f0;border-radius:16px;margin-bottom:11px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.05);}
.rule-card-hdr{padding:13px 16px 10px;background:#fafafa;}
.rule-card-title{font-size:14px;font-weight:700;color:#1e2740;}
.rule-card-body{padding:0 16px 14px;}
.rule-text{font-size:13px;color:#475569;line-height:1.75;white-space:pre-line;margin-bottom:9px;}
.rule-tag{font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px;background:#ede9fe;color:#7c3aed;display:inline-block;margin-bottom:10px;letter-spacing:.4px;}
.eg-list{display:flex;flex-direction:column;gap:6px;}
.eg{display:flex;align-items:baseline;gap:8px;padding:8px 12px;background:#f8fafc;border-radius:9px;font-size:12px;color:#334155;font-family:monospace;border-left:3px solid #a78bfa;}
.eg::before{content:'▸';color:#7c3aed;flex-shrink:0;}
.tips-box{background:#f0fdf4;border:1.5px solid #86efac;border-radius:14px;padding:14px 16px;margin-top:12px;}
.tips-ttl{font-size:11px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}
.tip{font-size:13px;color:#166534;line-height:1.65;margin-bottom:6px;display:flex;gap:8px;}
.mistakes-box{background:#fff1f2;border:1.5px solid #fda4af;border-radius:14px;padding:14px 16px;margin-top:10px;}
.mistakes-ttl{font-size:11px;font-weight:700;color:#be123c;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}
.mistake{font-size:13px;color:#9f1239;line-height:1.65;margin-bottom:6px;display:flex;gap:8px;}
.start-btn{width:100%;padding:15px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#a78bfa);border:none;color:#fff;font-size:15px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;margin-top:16px;transition:all .2s;box-shadow:0 4px 18px rgba(124,58,237,.30);}
.start-btn:hover{box-shadow:0 6px 24px rgba(124,58,237,.40);transform:translateY(-1px);}
.pbar{display:flex;align-items:center;gap:10px;padding:10px 20px;background:#fff;border-bottom:1px solid #e2e8f0;}
.pbar-txt{font-size:11px;color:#94a3b8;white-space:nowrap;font-weight:600;}
.pbar-track{flex:1;height:5px;background:#e2e8f0;border-radius:3px;overflow:hidden;}
.pbar-fill{height:100%;border-radius:3px;background:var(--c,#7c3aed);transition:width .3s;}
.qdots{display:flex;flex-wrap:wrap;gap:5px;padding:10px 16px;}
.qdot{width:28px;height:28px;border-radius:8px;border:2px solid #e2e8f0;background:#fff;font-size:10px;font-weight:700;color:#94a3b8;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;}
.qdot.cur{border-color:#7c3aed;color:#7c3aed;background:#f5f3ff;}
.qdot.ok2{border-color:#22c55e;background:#dcfce7;color:#15803d;}
.qdot.fail{border-color:#f43f5e;background:#fff1f2;color:#be123c;}
.diff{font-size:10px;font-weight:700;padding:3px 9px;border-radius:7px;text-transform:uppercase;letter-spacing:.8px;}
.diff-easy{background:#dcfce7;color:#15803d;}
.diff-mid{background:#fef3c7;color:#92400e;}
.diff-hard{background:#fee2e2;color:#be123c;}
.q-wrap{padding:14px 16px 6px;}
.q-meta{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.q-num{font-size:11px;color:#94a3b8;font-weight:600;}
.q-text{font-size:15px;color:#1e2740;line-height:1.85;margin-bottom:18px;white-space:pre-line;font-weight:500;}
.opts{display:flex;flex-direction:column;gap:9px;}
.opt{padding:13px 16px;border-radius:13px;border:2px solid #e2e8f0;background:#fff;cursor:pointer;font-size:14px;color:#475569;transition:all .15s;text-align:left;font-family:'DM Sans',sans-serif;width:100%;font-weight:500;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.opt:hover{border-color:#a78bfa;color:#7c3aed;background:#faf5ff;}
.opt-correct{border-color:#22c55e !important;background:#dcfce7 !important;color:#15803d !important;cursor:default;}
.opt-wrong{border-color:#f43f5e !important;background:#fff1f2 !important;color:#be123c !important;cursor:default;}
.opt-other{border-color:#f1f5f9 !important;background:#fafafa !important;color:#cbd5e1 !important;cursor:default;}
.fb{margin-top:13px;padding:13px 16px;border-radius:13px;font-size:13px;line-height:1.7;font-weight:500;}
.fb.ok{background:#dcfce7;border:1.5px solid #86efac;color:#15803d;}
.fb.bad{background:#fff1f2;border:1.5px solid #fda4af;color:#be123c;}
.nav{display:flex;justify-content:space-between;align-items:center;padding:14px 16px 28px;}
.nbtn{padding:10px 20px;border-radius:11px;border:2px solid #e2e8f0;background:#fff;color:#64748b;font-size:13px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .18s;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.nbtn:hover{border-color:#a78bfa;color:#7c3aed;}
.nbtn.pri{background:linear-gradient(135deg,#7c3aed,#a78bfa);border-color:transparent;color:#fff;box-shadow:0 3px 14px rgba(124,58,237,.30);}
.nbtn.pri:hover{box-shadow:0 5px 20px rgba(124,58,237,.40);}
.res-wrap{padding:28px 16px 60px;text-align:center;}
.medal{font-size:56px;margin-bottom:8px;}
.res-pct{font-family:'Playfair Display',serif;font-size:64px;line-height:1;font-weight:700;}
.res-lbl{color:#94a3b8;font-size:13px;margin:4px 0 10px;font-weight:600;}
.res-msg{font-size:14px;color:#475569;max-width:320px;margin:0 auto 6px;line-height:1.6;}
.rev-hdr{padding:14px 20px;font-family:'Playfair Display',serif;font-size:17px;border-top:2px solid #f1f5f9;text-align:left;color:#1e2740;}
.rev-item{padding:12px 20px;border-bottom:1px solid #f8fafc;}
.rev-q{font-size:12px;color:#64748b;margin-bottom:4px;}
.rev-st{font-size:13px;font-weight:700;display:flex;align-items:center;gap:5px;}
.rev-ok{color:#15803d;}.rev-fail{color:#be123c;}
.rev-exp{font-size:11px;color:#94a3b8;margin-top:3px;line-height:1.5;}
.mock-cover{padding:28px 16px;text-align:center;}
.mock-ttl{font-family:'Playfair Display',serif;font-size:28px;margin-bottom:6px;color:#1e2740;}
.mock-sub{font-size:13px;color:#94a3b8;margin-bottom:22px;font-weight:600;}
.mock-rules{background:#fff;border:2px solid #e2e8f0;border-radius:18px;padding:20px;margin-bottom:22px;text-align:left;display:flex;flex-direction:column;gap:12px;box-shadow:0 2px 12px rgba(0,0,0,.06);}
.mrule{display:flex;gap:9px;font-size:13px;color:#475569;font-weight:500;}
.mrule-ico{color:#7c3aed;flex-shrink:0;font-size:15px;}
.timer{font-family:monospace;font-size:17px;color:#1e2740;background:#f5f3ff;padding:7px 14px;border-radius:10px;font-weight:700;border:2px solid #ddd6fe;}
.timer.warn{color:#be123c;background:#fff1f2;border-color:#fda4af;animation:bl 1s infinite;}
@keyframes bl{0%,100%{opacity:1;}50%{opacity:.5;}}
.sdiv{padding:7px 20px;font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;background:#f8fafc;border-top:1px solid #f1f5f9;font-weight:600;}
.ai-wrap{padding-bottom:80px;background:#f8fafc;min-height:100vh;}
.ai-hdr{padding:16px 20px 12px;border-bottom:2px solid #e2e8f0;background:#fff;}
.ai-hdr-t{font-family:'Playfair Display',serif;font-size:20px;margin-bottom:2px;color:#1e2740;}
.ai-hdr-s{font-size:12px;color:#94a3b8;font-weight:600;}
.ai-chips{display:flex;flex-wrap:wrap;gap:8px;padding:12px 16px;}
.aichip{padding:8px 13px;border-radius:10px;border:2px solid #e2e8f0;background:#fff;color:#475569;font-size:12px;cursor:pointer;transition:all .17s;font-family:'DM Sans',sans-serif;font-weight:600;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.aichip:hover{border-color:#a78bfa;color:#7c3aed;background:#faf5ff;}
.msgs{padding:0 16px;display:flex;flex-direction:column;gap:12px;}
.msg{padding:13px 16px;border-radius:16px;font-size:13px;line-height:1.78;white-space:pre-wrap;font-weight:500;}
.msg.u{background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;align-self:flex-end;max-width:88%;border-radius:16px 16px 4px 16px;box-shadow:0 3px 14px rgba(124,58,237,.30);}
.msg.a{background:#fff;border:2px solid #e2e8f0;color:#334155;border-radius:16px 16px 16px 4px;box-shadow:0 2px 8px rgba(0,0,0,.06);}
.dotrow{display:flex;gap:5px;padding:2px 0;}
.d{width:6px;height:6px;border-radius:50%;background:#cbd5e1;animation:jmp .7s infinite ease;}
.d:nth-child(2){animation-delay:.12s;}.d:nth-child(3){animation-delay:.24s;}
@keyframes jmp{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
.ai-bar{position:fixed;bottom:0;left:0;right:0;padding:12px 16px;background:rgba(255,255,255,.97);backdrop-filter:blur(14px);border-top:2px solid #e2e8f0;display:flex;gap:9px;}
.ai-inp{flex:1;background:#f8fafc;border:2px solid #e2e8f0;border-radius:12px;padding:11px 14px;color:#1e2740;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .2s;font-weight:500;}
.ai-inp:focus{border-color:#a78bfa;background:#fff;}
.ai-inp::placeholder{color:#cbd5e1;}
.ai-send{padding:11px 18px;background:linear-gradient(135deg,#7c3aed,#a78bfa);border:none;border-radius:12px;color:#fff;font-weight:700;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;box-shadow:0 3px 12px rgba(124,58,237,.30);}
.ai-send:disabled{opacity:.40;cursor:not-allowed;}
`;

// ─── ROOT ────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState({v:"home"});
  const [grade,  setGrade]  = useState(7);
  const [scores, setScores] = useState({});

  useEffect(()=>{
    const el = document.createElement("style");
    el.textContent = STYLES;
    document.head.appendChild(el);
    return ()=>document.head.removeChild(el);
  },[]);

  return (
    <div className="app">
      {screen.v==="home"   && <Home grade={grade} setGrade={setGrade} setScreen={setScreen} scores={scores}/>}
      {screen.v==="lesson" && <Lesson topic={screen.topic} setScreen={setScreen} setScores={setScores}/>}
      {screen.v==="mock"   && <Mock grade={grade} setScreen={setScreen}/>}
      {screen.v==="ai"     && <AIScreen grade={grade} setScreen={setScreen}/>}
    </div>
  );
}
