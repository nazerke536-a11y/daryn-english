import { useState, useEffect, useRef } from "react";
// ─── CURRICULUM DATA ────────────────────────────────────────────
const CURRICULUM = {
5: {
label:"5-сынып",
darynNote:"5-сынып Daryn олимпиадасы: артикльдер (10-12 сұрақ), Present Simple шағы (8-10 сұрақ), демеуліктер мен сөздік қор. Сөздік тақырыптары: мектеп, үй, жануарлар, түстер, сандар, тамақ.",
topics:[
{
id:"g5a", title:"Артикльдер", subtitle:"a, an, the, нөл артикль",
icon:"📖", color:"#6366f1",
darynNote:"Daryn 5-сынып тесті: артикль бойынша шамамен 10--12 сұрақ. a/an таңдау, the/нөл артикль — ең жиі кездесетін тақырып.",
explanation:{
intro:`Ағылшын тілінде 3 артикль бар: a, an және the. Қазақ тілінде артикльдің баламасы жоқ, сондықтан оларды ережемен жаттап алу керек. Daryn олимпиадасының 5-сынып тапсырмаларында артикль ең жиі кездесетін тақырып болып табылады.`,
sections:[
{ title:"🔵 A артиклі — бейтаныс зат, дауыссыз дыбыс",
text:`A артиклі дауыссыз дыбыстан басталатын зат есімдерден бұрын қолданылады. Бейтаныс немесе алғаш рет айтылатын зат туралы сөз болғанда A қолданылады.`,
tag:"Дауыссыз дыбыс → A",
examples:["a book — кітап (b = дауыссыз)","a cat — мысық","a teacher — мұғалім","a university — /yoo/ дыбысы = дауыссыз!","a European country — /y/ дыбысы"]
},
{ title:"🟢 AN артиклі — дауысты дыбыс",
text:`AN артиклі дауысты дыбыстан (a, e, i, o, u) басталатын зат есімдерден бұрын қолданылады.\n⚠️ Назар аударыңыз: жазылуы емес, АЙТЫЛАТЫН ДЫБЫСЫ маңызды!`,
tag:"Дауысты дыбыс → AN",
examples:["an apple — алма (/æ/ дауысты)","an elephant — піл (/e/ дауысты)","an umbrella — қолшатыр (/ʌ/ дауысты)","an hour — сағат (h оқылмайды → /aʊ/ дауысты!)","an honest boy — h дауыссыз оқылмайды"]
},
{ title:"🟡 THE артиклі — нақты, белгілі зат",
text:`THE артиклі нақты, белгілі зат есімдерден бұрын қолданылады. Сөйлеуші де, тыңдаушы да сол затты біледі.`,
tag:"Белгілі зат → THE",
examples:["The sun, the moon — жерде жалғыз нәрселер","The Nile, the Amazon — өзен атаулары","The United States, the UK — 'United' бар мемлекеттер","She bought a book. The book was great. — 2-рет айтылды","He is the best student. — Үстеулік дәреже"]
},
{ title:"⚪ Нөл артикль — артикль жоқ",
text:`Кейбір жағдайларда артикль мүлдем қолданылмайды:`,
tag:"Жалпы мағына → НӨЛ артикль",
examples:["Тілдер: English, Kazakh, French, Russian","Спорт: football, basketball, tennis","Тамақ: breakfast, lunch, dinner","Жалпы мағына: Dogs are loyal. Books are useful.","Қалалар: Almaty, London, Paris","Елдер (жалпы): Kazakhstan, France, Germany"]
},
],
tips:[
"💡 A/AN — бейтаныс зат (алғаш рет айтылады). THE — таныс зат (алдын-ала белгілі).",
"💡 Үстеулік дәрежемен МІНДЕТТІ ТҮРДЕ the: the best, the worst, the most beautiful.",
"💡 Музыкалық аспаптарда the: she plays the piano, the violin, the guitar.",
"💡 'hour' → AN hour (h оқылмайды). 'university' → A university (/yoo/ дыбысы).",
],
mistakes:[
"❌ a honest man → ✅ an honest man (h оқылмайды)",
"❌ the english → ✅ English (тілдерде артикль жоқ)",
"❌ a best student → ✅ the best student (үстеулікте the)",
]
},
questions:[
{id:"g5a1",diff:"easy",text:"Tom has ___ dog.",opts:["a","an","the","—"],ans:"a",exp:"'Dog' d-дауыссыз дыбысынан басталады. Бейтаныс ит туралы айтылып отыр → A dog."},
{id:"g5a2",diff:"easy",text:"She ate ___ orange for breakfast.",opts:["a","an","the","—"],ans:"an",exp:"'Orange' о-дауысты дыбысынан басталады → AN orange."},
{id:"g5a3",diff:"easy",text:"___ sun rises in the east.",opts:["A","An","The","—"],ans:"The",exp:"Күн — жерде жалғыз нәрсе. Нақты белгілі зат → THE sun."},
{id:"g5a4",diff:"easy",text:"I am ___ student.",opts:["a","an","the","—"],ans:"a",exp:"'Student' st-дауыссыз дыбысынан басталады. Жалпы оқушы → A student."},
{id:"g5a5",diff:"easy",text:"She has ___ cat and ___ dog.",opts:["a / a","an / a","a / an","the / the"],ans:"a / a",exp:"Екеуі де бейтаныс, алғаш рет айтылатын заттар → A cat, A dog."},
{id:"g5a6",diff:"medium",text:"He is ___ honest person.",opts:["a","an","the","—"],ans:"an",exp:"'Honest' сөзінде 'h' оқылмайды. /ɒ/ дауысты дыбыс → AN honest person."},
{id:"g5a7",diff:"medium",text:"She plays ___ piano beautifully.",opts:["a","an","the","—"],ans:"the",exp:"Музыкалық аспаптар алдында THE қолданылады: the piano, the violin, the guitar."},
{id:"g5a8",diff:"medium",text:"___ dogs are loyal animals.",opts:["A","An","The","—"],ans:"—",exp:"Жалпы мағынадағы көпше зат есімге артикль қолданылмайды. Иттер жалпы туралы → НӨЛ артикль."},
{id:"g5a9",diff:"medium",text:"We have ___ breakfast at 7 o'clock.",opts:["a","an","the","—"],ans:"—",exp:"Тамақ атауларына (breakfast, lunch, dinner) артикль қолданылмайды."},
{id:"g5a10",diff:"medium",text:"Ali is ___ best student in our class.",opts:["a","an","the","—"],ans:"the",exp:"Үстеулік дәрежемен (best, worst, most...) міндетті түрде THE."},
{id:"g5a11",diff:"hard",text:"She is learning ___ English at school.",opts:["a","an","the","—"],ans:"—",exp:"Тіл атауларына артикль қолданылмайды: English, Kazakh, French, German."},
{id:"g5a12",diff:"hard",text:"He saw ___ cat in the garden. ___ cat was black.",opts:["a / The","an / The","the / A","— / The"],ans:"a / The",exp:"Алғаш рет: A cat (бейтаныс). Екінші рет: The cat (оқырман/тыңдаушы біледі)."},
{id:"g5a13",diff:"hard",text:"They live in ___ United Kingdom.",opts:["a","an","the","—"],ans:"the",exp:"'United' бар мемлекеттерде THE: the United Kingdom, the United States, the UAE."},
{id:"g5a14",diff:"hard",text:"He plays ___ football every Saturday.",opts:["a","an","the","—"],ans:"—",exp:"Спорт түрлеріне артикль қолданылмайды: football, basketball, tennis, volleyball."},
{id:"g5a15",diff:"hard",text:"Read:\n'Sarah has ___ cat and ___ dog. ___ cat is white and ___ dog is brown. She also has ___ umbrella that is green.'\n\nBlanks 1,2,3,4,5 — қайсысы дұрыс?",opts:["a, a, The, the, an","the, the, A, a, a","a, the, A, the, an","an, a, The, a, an"],ans:"a, a, The, the, an",exp:"1,2 — бейтаныс (a cat, a dog). 3 — белгілі (The cat = алдында айтылды). 4 — белгілі (the dog). 5 — an umbrella (u-дауысты)."},
]
},
{
id:"g5b", title:"Present Simple", subtitle:"Жалпы шақ (5-сынып)",
icon:"⏱️", color:"#059669",
darynNote:"Daryn 5-сынып: Present Simple бойынша 8--10 сұрақ. She/He/It үшін -s/-es жалғауы, do/does сұраулы сөйлем — жиі кездеседі.",
explanation:{
intro:`Present Simple (Жалпы шақ) — қазіргі уақыттағы тұрақты әрекеттер, әдет-дағды, жалпы шындықтар үшін қолданылады. 5-сынып деңгейінде бұл шақты жете меңгеру міндетті.`,
sections:[
{ title:"✅ Болымды сөйлем (Affirmative)",
text:`Жалпы ережесі: Subject + V1 (етістіктің бастапқы түрі)\n\n⚠️ He, She, It үшін етістікке -s немесе -es жалғанады!`,
tag:"He/She/It → -s/-es",
examples:["I/We/You/They work. — Жұмыс істейміз.","He/She/It works. — Жұмыс істейді.","She goes to school. (go → goes)","He watches TV. (watch → watches)","My sister likes music. (like → likes)"]
},
{ title:"❌ Болымсыз сөйлем (Negative)",
text:`Subject + do/does + not + V1\n\nI/We/You/They → do not (don't)\nHe/She/It → does not (doesn't)`,
tag:"He/She → does not + V1",
examples:["I don't like coffee.","She doesn't eat meat.","They don't play tennis.","He doesn't watch TV. (НЕ: doesn't watches!)"]
},
{ title:"❓ Сұраулы сөйлем (Question)",
text:`Do/Does + Subject + V1?\n\nI/We/You/They → Do...?\nHe/She/It → Does...?`,
tag:"Does + Subject + V1?",
examples:["Do you like pizza?","Does she go to school?","Do they speak English?","Does he play football?"]
},
{ title:"🕐 Белгі сөздер (Signal words)",
text:`Present Simple-ді анықтайтын сөздер:`,
tag:"Белгі сөздер",
examples:["always — әрқашан","usually — әдетте","often — жиі","sometimes — кейде","never — ешқашан","every day/week/year — күн сайын..."]
},
],
tips:[
"💡 He/She/It үшін does → бастапқы етістік өзгермейді: Does she WORK? (works емес!)",
"💡 Doesn't/Don't жалғанса, етістік V1-де қалады: He doesn't PLAY (plays емес!)",
"💡 Go → goes, Do → does, Have → has (ережеден тыс)",
],
mistakes:[
"❌ She don't like → ✅ She doesn't like",
"❌ Does she works? → ✅ Does she work?",
"❌ He play football → ✅ He plays football",
]
},
questions:[
{id:"g5b1",diff:"easy",text:"She ___ (go) to school every day.",opts:["go","goes","is going","went"],ans:"goes",exp:"She = 3-жақ жекеше → Goes. (go → goes)"},
{id:"g5b2",diff:"easy",text:"They ___ (play) football on weekends.",opts:["play","plays","is playing","played"],ans:"play",exp:"They = 3-жақ көпше → Play (жалғаусыз)."},
{id:"g5b3",diff:"easy",text:"He ___ (not/eat) meat.",opts:["don't eat","doesn't eat","doesn't eats","not eat"],ans:"doesn't eat",exp:"He = 3-жақ жекеше болымсыз → Doesn't + V1. 'Eats' емес, 'eat'!"},
{id:"g5b4",diff:"easy",text:"___ you ___ (like) pizza?",opts:["Do / like","Does / like","Do / likes","Does / likes"],ans:"Do / like",exp:"You → Do you + V1? Сұраулы сөйлемде V1 өзгермейді."},
{id:"g5b5",diff:"easy",text:"My mother ___ (cook) dinner every evening.",opts:["cook","cooks","is cooking","cooked"],ans:"cooks",exp:"My mother = 3-жақ жекеше → Cooks."},
{id:"g5b6",diff:"medium",text:"___ she ___ (speak) English?",opts:["Do / speak","Does / speak","Does / speaks","Do / speaks"],ans:"Does / speak",exp:"She = 3-жақ жекеше → Does she speak? (V1 өзгермейді)"},
{id:"g5b7",diff:"medium",text:"He ___ (watch) TV every night.",opts:["watch","watchs","watches","is watching"],ans:"watches",exp:"Watch → watches (-ch, -sh, -ss, -x, -o соңына -es жалғанады)."},
{id:"g5b8",diff:"medium",text:"The sun ___ (rise) in the east.",opts:["rise","rises","is rising","rose"],ans:"rises",exp:"Жалпы шындық (scientific fact) → Present Simple. The sun rises."},
{id:"g5b9",diff:"medium",text:"My sister ___ (not/speak) French.",opts:["don't speak","doesn't speak","doesn't speaks","not speaks"],ans:"doesn't speak",exp:"My sister = She → Doesn't + V1 (speak)."},
{id:"g5b10",diff:"medium",text:"What time ___ school ___ (start)?",opts:["do / start","does / start","does / starts","do / starts"],ans:"does / start",exp:"School = It → Does school start? (V1 өзгермейді)"},
{id:"g5b11",diff:"hard",text:"Every morning, Anna ___ (wake up) at 7, ___ (have) breakfast and ___ (go) to school.",opts:["wakes up / has / goes","wake up / have / go","wakes up / have / goes","wakes / has / go"],ans:"wakes up / has / goes",exp:"Anna = She → wakes up, has, goes. Үш етістік де -s/-es алады."},
{id:"g5b12",diff:"hard",text:"Where ___ your father ___ (work)?",opts:["do / work","does / work","does / works","is / work"],ans:"does / work",exp:"Your father = He → Does your father work? (V1 өзгермейді)"},
{id:"g5b13",diff:"hard",text:"___ your parents ___ (live) in Almaty?",opts:["Does / live","Do / live","Do / lives","Does / lives"],ans:"Do / live",exp:"Your parents = They → Do your parents live? (V1 өзгермейді)"},
{id:"g5b14",diff:"hard",text:"He never ___ (miss) a lesson. He always ___ (arrive) on time.",opts:["misses / arrives","miss / arrive","misses / arrive","miss / arrives"],ans:"misses / arrives",exp:"He = 3-жақ → misses, arrives. (miss → misses, arrive → arrives)"},
{id:"g5b15",diff:"hard",text:"Read:\n'Lisa is 10. She ___ (study) at school No.5. She ___ (like) English and Maths. She ___ (not/like) P.E. Her brother ___ (play) basketball.'\n\nFind the ERROR:",opts:["She studies at school","She likes English","She doesn't like P.E.","Her brother plays basketball"],ans:"She likes English",exp:"Барлық сөйлемдер дұрыс. Бұл сұрақта қате жоқ — барлығы дұрыс!"},
]
},
{
id:"g5c", title:"Демеуліктер", subtitle:"Prepositions of place & time",
icon:"📍", color:"#d97706",
darynNote:"Daryn 5-сынып: in/on/at/under/next to — орын демеуліктері. In/on/at — уақыт демеуліктері де тексеріледі.",
explanation:{
intro:`Демеуліктер (Prepositions) — заттардың орнын немесе уақытын көрсетеді. Ағылшын тілінде демеуліктерді дұрыс қолдану өте маңызды, себебі олар Daryn 5-сынып тапсырмаларында жиі кездеседі.`,
sections:[
{ title:"📍 Орын демеуліктері (Place)",
text:`Заттардың бір-біріне қатысты орнын көрсетеді.`,
tag:"Where? — Қай жерде?",
examples:["in — ішінде: The cat is IN the box.","on — үстінде: The book is ON the table.","under — астында: The bag is UNDER the chair.","next to — қасында: The school is NEXT TO the park.","between — арасында: I sit BETWEEN Ali and Sara.","in front of — алдында: The car is IN FRONT OF the house.","behind — артында: The dog is BEHIND the door."]
},
{ title:"🕐 Уақыт демеуліктері (Time)",
text:`Уақытты білдіретін демеуліктер:`,
tag:"When? — Қашан?",
examples:["IN — ай, жыл, маусым, ертеңгі/кешкі: in May, in 2024, in summer, in the morning","ON — күн, мереке: on Monday, on my birthday, on 15 March","AT — нақты уақыт, мерекелер: at 7 o'clock, at night, at Christmas","AT + night/noon/midnight — ерекше қолданыс"]
},
],
tips:[
"💡 IN the morning/afternoon/evening, BUT AT night (ерекше!)",
"💡 ON дейктік: ON Monday, ON my birthday, ON Christmas Day",
"💡 AT нақты уақыт: AT 3 o'clock, AT noon, AT midnight",
],
mistakes:[
"❌ in Monday → ✅ on Monday",
"❌ at the morning → ✅ in the morning",
"❌ on night → ✅ at night",
]
},
questions:[
{id:"g5c1",diff:"easy",text:"The book is ___ the table.",opts:["in","on","under","at"],ans:"on",exp:"Стол үстінде = ON the table (беткейде жатқан нәрсе)."},
{id:"g5c2",diff:"easy",text:"The cat is ___ the box.",opts:["on","in","under","next to"],ans:"in",exp:"Жәшіктің ішінде = IN the box."},
{id:"g5c3",diff:"easy",text:"I wake up ___ 7 o'clock.",opts:["in","on","at","—"],ans:"at",exp:"Нақты уақыт алдында AT: at 7 o'clock, at 3 pm."},
{id:"g5c4",diff:"easy",text:"My birthday is ___ March.",opts:["in","on","at","—"],ans:"in",exp:"Ай атауы алдында IN: in March, in July, in December."},
{id:"g5c5",diff:"easy",text:"We have English class ___ Monday.",opts:["in","on","at","—"],ans:"on",exp:"Апта күні алдында ON: on Monday, on Friday, on Saturday."},
{id:"g5c6",diff:"medium",text:"The dog is ___ the chair.",opts:["on","in","under","between"],ans:"under",exp:"Орындықтың астында = UNDER the chair."},
{id:"g5c7",diff:"medium",text:"She was born ___ 2014.",opts:["in","on","at","—"],ans:"in",exp:"Жыл алдында IN: in 2014, in 2020."},
{id:"g5c8",diff:"medium",text:"The shop is ___ the school and the park.",opts:["next to","behind","between","in front of"],ans:"between",exp:"Мектеп пен парктің арасында = BETWEEN X and Y."},
{id:"g5c9",diff:"medium",text:"I study ___ the morning.",opts:["in","on","at","—"],ans:"in",exp:"Күннің бөлімдері: in the morning, in the afternoon, in the evening. (НО: at night!)"},
{id:"g5c10",diff:"medium",text:"He goes to bed ___ night.",opts:["in","on","at","—"],ans:"at",exp:"Night алдында AT: at night (ерекше жағдай!)."},
{id:"g5c11",diff:"hard",text:"She sits ___ Ali ___ Sara.",opts:["between / and","next to / and","behind / and","in front of / and"],ans:"between / and",exp:"Екі нәрсенің арасы = BETWEEN X AND Y."},
{id:"g5c12",diff:"hard",text:"The bank is ___ the post office.",opts:["next to","between","under","behind"],ans:"next to",exp:"Пошта кеңсесінің жанында = NEXT TO."},
{id:"g5c13",diff:"hard",text:"My birthday is ___ 15th March.",opts:["in","on","at","—"],ans:"on",exp:"Нақты күн (15th March) алдында ON: on 15th March."},
{id:"g5c14",diff:"hard",text:"We celebrate Nauryz ___ spring, ___ March.",opts:["in / in","on / in","in / on","at / in"],ans:"in / in",exp:"Маусым (spring) → IN spring. Ай (March) → IN March."},
{id:"g5c15",diff:"hard",text:"Choose the CORRECT sentence:",opts:["I was born in Monday","She works at a school","He sleeps on the night","The cat is in front the house"],ans:"She works at a school",exp:"'At a school' дұрыс. Monday → on Monday. At night (on night емес). In front OF (of жоқ қате)."},
]
},
{
id:"g5d", title:"Present Continuous", subtitle:"Қазіргі үдемелі шақ",
icon:"🎬", color:"#0891b2",
darynNote:"Daryn 5-сынып: Present Continuous (am/is/are + V-ing) — Look! / Now / at the moment белгілерімен. Spelling ережелері де тексеріледі.",
explanation:{
intro:`Present Continuous (Қазіргі үдемелі шақ) — ДЕЛ ОСЫ СӘТТЕ болып жатқан іс-әрекеттерді білдіреді. Daryn 5-сынып тестінде Present Simple-мен қосымша тексеріледі.`,
sections:[
{ title:"📐 Формасы (Structure)",
text:`Subject + am/is/are + V-ing\n\nI → am + V-ing\nHe/She/It → is + V-ing\nWe/You/They → are + V-ing`,
tag:"am/is/are + V-ing",
examples:["I am reading a book. — Кітап оқып отырмын.","She is watching TV. — Ол теледидар көріп отыр.","They are playing football. — Олар футбол ойнап жатыр.","He is not sleeping. — Ол ұйықтамай отыр.","Are you listening? — Тыңдап отырсың ба?"]
},
{ title:"✏️ -ing жалғау ережелері (Spelling)",
text:`-ing жалғанғанда кейбір өзгерістер болады:`,
tag:"Spelling ережелері",
examples:["Жай: read→reading, play→playing, eat→eating","'e'-мен аяқталса e түсіріледі: write→writing, make→making, dance→dancing","Қысқа сөзде дауыссыз еселенеді: run→running, swim→swimming, sit→sitting, get→getting","'ie' → 'y': lie→lying, die→dying"]
},
{ title:"🕐 Белгі сөздер (Signal words)",
text:`Present Continuous-ті анықтайтын сөздер:`,
tag:"Белгі сөздер",
examples:["now — қазір","at the moment — осы сәтте","Look! — Қара!","Listen! — Тыңда!","currently — қазіргі уақытта","right now — дәл қазір"]
},
{ title:"⚖️ Present Simple vs Present Continuous",
text:``,
tag:"Айырмасы",
examples:["She reads every day. (PS — әдет, күнде)","She is reading now. (PC — дел қазір)","He plays football on Sundays. (PS — жалпы)","He is playing football right now. (PC — қазір)"]
},
],
tips:[
"💡 Look! / Listen! / Watch! — сигнал сөздер → Present Continuous қолдан.",
"💡 Every day / always / never → Present Simple қолдан.",
"💡 swim→swimming, run→running — соңғы дауыссыз еселенеді!",
],
mistakes:[
"❌ She is read a book → ✅ She is reading a book",
"❌ I am listen to music → ✅ I am listening to music",
"❌ He is makeing → ✅ He is making (e түсіріледі)",
]
},
questions:[
{id:"g5d1",diff:"easy",text:"Look! The children ___ (play) in the garden.",opts:["play","plays","are playing","is playing"],ans:"are playing",exp:"Look! = Present Continuous белгісі. They (children) → are playing."},
{id:"g5d2",diff:"easy",text:"She ___ (watch) TV at the moment.",opts:["watch","watches","is watching","are watching"],ans:"is watching",exp:"At the moment = PC белгісі. She → is watching."},
{id:"g5d3",diff:"easy",text:"I ___ (not/listen) to music right now.",opts:["don't listen","am not listening","isn't listening","not listening"],ans:"am not listening",exp:"PC болымсыз: I + am not + V-ing. Right now = PC белгісі."},
{id:"g5d4",diff:"easy",text:"___ your brother ___ (sleep) now?",opts:["Does / sleep","Is / sleeping","Are / sleeping","Do / sleep"],ans:"Is / sleeping",exp:"PC сұраулы: Is + he + V-ing? Your brother = He → Is he sleeping?"},
{id:"g5d5",diff:"easy",text:"They ___ (swim) in the pool right now.",opts:["swim","swims","are swimming","is swimming"],ans:"are swimming",exp:"They → are + swim→swimming (м еселенеді). Right now = PC."},
{id:"g5d6",diff:"medium",text:"She ___ (make) a cake for the party.",opts:["makes","is making","is makeing","are making"],ans:"is making",exp:"She → is + make→making (e түсіріледі). Дел қазір үдеріс."},
{id:"g5d7",diff:"medium",text:"He ___ (run) in the park every morning, but now he ___ (sit) at home.",opts:["runs / is sitting","is running / sits","run / is sitting","runs / sits"],ans:"runs / is sitting",exp:"Every morning = PS (runs). Now = PC (is sitting — t еселенеді)."},
{id:"g5d8",diff:"medium",text:"Listen! Someone ___ (knock) at the door.",opts:["knocks","knocked","is knocking","are knocking"],ans:"is knocking",exp:"Listen! = PC белгісі. Someone = It → is knocking."},
{id:"g5d9",diff:"medium",text:"What ___ you ___ (do) now?",opts:["do / do","are / doing","do / doing","are / do"],ans:"are / doing",exp:"PC сұраулы: What are you doing? You → are + do-ing."},
{id:"g5d10",diff:"medium",text:"My parents ___ (have) dinner at the moment.",opts:["have","has","are having","is having"],ans:"are having",exp:"My parents = They → are having. (have кейде PC-де қолданылады)"},
{id:"g5d11",diff:"hard",text:"He usually ___ (walk) to school, but today he ___ (ride) his bike.",opts:["walks / is riding","walk / rides","is walking / rides","walks / rides"],ans:"walks / is riding",exp:"Usually = PS (walks). Today = PC (is riding — бүгін ғана)."},
{id:"g5d12",diff:"hard",text:"___ it ___ (snow) outside right now?",opts:["Is / snowing","Does / snow","Are / snowing","Is / snow"],ans:"Is / snowing",exp:"It → Is + snow-ing? Right now = PC. Ауа-райы етістіктері PC-де де қолданылады."},
{id:"g5d13",diff:"hard",text:"The baby ___ (sleep), so please be quiet!",opts:["sleeps","is sleeping","are sleeping","was sleeping"],ans:"is sleeping",exp:"Дел қазір жатқан үдеріс (implied now) → is sleeping."},
{id:"g5d14",diff:"hard",text:"Choose: 'The sun ___ in the east' vs 'Look! The sun ___!'",opts:["rises / is setting","rise / sets","is rising / setting","rises / setting"],ans:"rises / is setting",exp:"Жалпы шындық = PS (rises). Look! = PC (is setting)."},
{id:"g5d15",diff:"hard",text:"Find the INCORRECT sentence:",opts:["She is reading a book now.","They are swiming in the pool.","He is making a sandwich.","I am writing a letter."],ans:"They are swiming in the pool.",exp:"ҚАТЕ: swiming → ДҰРЫС: swimming (m еселенеді: swim→swimming)."},
]
},
{
id:"g5e", title:"Сөздік қор", subtitle:"Мектеп, отбасы, жануарлар, тамақ",
icon:"📝", color:"#7c3aed",
darynNote:"Daryn 5-сынып сөздік: мектеп заттары, отбасы мүшелері, үй жануарлары, тамақ-ас, дене мүшелері, түстер, сандар 1-100. Синоним/антоним да тексеріледі.",
explanation:{
intro:`Daryn 5-сынып тестінде сөздік қор тапсырмалары маңызды орын алады. Мектеп, отбасы, жануарлар, тамақ-ас, дене мүшелері тақырыптары бойынша сөздерді жатқа білу керек.`,
sections:[
{ title:"🏫 Мектеп (School)",
text:`Мектеппен байланысты негізгі сөздер:`,
tag:"School vocabulary",
examples:["classroom — сынып бөлмесі","blackboard — тақта","ruler — сызғыш","scissors — қайшы","subject — пән","timetable — сабақ кестесі","break — үзіліс","homework — үй тапсырмасы","exam/test — емтихан/тест"]
},
{ title:"👨‍👩‍👧‍👦 Отбасы (Family)",
text:`Отбасы мүшелерінің атаулары:`,
tag:"Family members",
examples:["grandparents — ата-әже","grandfather / grandmother — ата / әже","nephew / niece — жиен (ер/қыз)","cousin — немере аға/іні/апа/қарындас","stepmother / stepfather — өгей ана/әке","only child — жалғыз бала"]
},
{ title:"🐾 Жануарлар (Animals)",
text:`Үй және жабайы жануарлар:`,
tag:"Animals vocabulary",
examples:["rabbit — қоян","hamster — хомяк","parrot — тоты құс","dolphin — дельфин","whale — кит","giraffe — жираф","kangaroo — кенгуру","penguin — пингвин","butterfly — көбелек"]
},
{ title:"🍎 Тамақ-ас (Food & Drinks)",
text:`Тамақ пен сусын атаулары:`,
tag:"Food vocabulary",
examples:["vegetables: carrot, cucumber, onion, pepper, cabbage","fruit: strawberry, watermelon, peach, cherry, grape","drinks: juice, lemonade, milkshake, herbal tea","meals: scrambled eggs, pancakes, porridge, soup"]
},
],
tips:[
"💡 Subject (пән) vs Object (нысан/зат) — мағынасын ажырат.",
"💡 Cousin — немере аға/іні/апа/қарындас (gender neutral ағылшынша!).",
"💡 Vegetables — санауға болмайтын: some vegetables (ЕМЕС: a vegetable — тек 1 нақты болса ғана).",
],
mistakes:[
"❌ I have homeworks → ✅ I have homework (санауға болмайды!)",
"❌ My cousin brother → ✅ My cousin (ағылшынша бір сөз!)",
"❌ She is my grand mother → ✅ She is my grandmother (бір сөз)",
]
},
questions:[
{id:"g5e1",diff:"easy",text:"What do you call the person who teaches you at school?",opts:["student","teacher","doctor","librarian"],ans:"teacher",exp:"Teacher = мұғалім. Сабақ беретін адам."},
{id:"g5e2",diff:"easy",text:"Your mother's mother is your ___.",opts:["aunt","grandmother","cousin","niece"],ans:"grandmother",exp:"Анаңның анасы = grandmother (әже)."},
{id:"g5e3",diff:"easy",text:"Which animal can you keep as a pet at home?",opts:["lion","elephant","rabbit","tiger"],ans:"rabbit",exp:"Rabbit (қоян) — үй жануары. Қалғандары жабайы хайуандар."},
{id:"g5e4",diff:"easy",text:"What do you use to draw a straight line?",opts:["scissors","ruler","eraser","pencil case"],ans:"ruler",exp:"Ruler = сызғыш. Түзу сызық сызу үшін қолданылады."},
{id:"g5e5",diff:"easy",text:"Which is a vegetable?",opts:["strawberry","peach","carrot","banana"],ans:"carrot",exp:"Carrot = сәбіз — жидек, жеміс емес, көкөніс."},
{id:"g5e6",diff:"medium",text:"Your father's brother is your ___.",opts:["grandfather","cousin","uncle","nephew"],ans:"uncle",exp:"Әкеңнің бауыры = uncle (нағашы/жезде/ата жағынан аға-іні)."},
{id:"g5e7",diff:"medium",text:"'Big' and '___ ' are antonyms (opposites).",opts:["large","huge","small","tall"],ans:"small",exp:"Антоним = қарама-қарсы мағына. Big ↔ Small."},
{id:"g5e8",diff:"medium",text:"Which word is a SYNONYM for 'happy'?",opts:["sad","angry","joyful","tired"],ans:"joyful",exp:"Синоним = бірдей мағына. Happy = Joyful (қуанышты)."},
{id:"g5e9",diff:"medium",text:"What subject do you study numbers and equations in?",opts:["History","Science","Maths","Literature"],ans:"Maths",exp:"Maths (Mathematics) = математика. Сандар мен теңдеулер."},
{id:"g5e10",diff:"medium",text:"A ___ is a large sea animal that breathes air.",opts:["shark","dolphin","whale","jellyfish"],ans:"whale",exp:"Whale = кит. Ауамен тыныс алады (сүтқоректі), балық емес."},
{id:"g5e11",diff:"hard",text:"Which sentence uses 'homework' CORRECTLY?",opts:["I have many homeworks.","She did her homework.","He forgot his homeworks.","They have a homework."],ans:"She did her homework.",exp:"'Homework' санауға болмайтын зат есім: a homework / homeworks дұрыс ЕМЕС!"},
{id:"g5e12",diff:"hard",text:"Your mother's sister's son is your ___.",opts:["nephew","brother","cousin","uncle"],ans:"cousin",exp:"Анаңның апасының/сіңлісінің баласы = cousin (немере)."},
{id:"g5e13",diff:"hard",text:"The school ___ shows when each lesson starts and ends.",opts:["timetable","homework","classroom","textbook"],ans:"timetable",exp:"Timetable = сабақ кестесі. Сабақ уақытын көрсетеді."},
{id:"g5e14",diff:"hard",text:"What do you call a young cat?",opts:["cub","puppy","kitten","calf"],ans:"kitten",exp:"Kitten = мысықтың баласы. Puppy = ит баласы. Cub = аю/арыстан баласы. Calf = бұзау."},
{id:"g5e15",diff:"hard",text:"Choose the CORRECTLY spelled word for 'шөлмек':",opts:["bottel","bottle","botle","bottl"],ans:"bottle",exp:"Bottle = шөлмек. b-o-t-t-l-e. Екі 't' жазылады."},
]
},
{
id:"g5f", title:"Есімдіктер", subtitle:"Pronouns: her, him, ours, indefinite",
icon:"👤", color:"#7c3aed",
darynNote:"Daryn 5-сынып: жеке есімдіктер (I/me/my/mine), жалпылама есімдіктер (something/anything/nothing/everybody). Тест тапсырмаларында толықтыруда жиі кездеседі.",
explanation:{
intro:`Есімдіктер (Pronouns) — зат есімнің орнына қолданылатын сөздер. Ағылшын тілінде есімдіктердің бірнеше түрі бар. Daryn 5-сынып тестінде жеке есімдіктер мен жалпылама есімдіктер жиі тексеріледі.`,
sections:[
{ title:"👤 Жеке есімдіктер (Personal Pronouns)",
text:`Ағылшын тілінде есімдіктердің 4 формасы бар:`,
tag:"Subject / Object / Possessive adj / Possessive pronoun",
examples:[
"I → me → my → mine (мен / маған / менің / менікі)",
"you → you → your → yours (сен / саған / сенің / сенікі)",
"he → him → his → his (ол/ер → оған → оның → оныкі)",
"she → her → her → hers (ол/әй → оған → оның → оныкі)",
"we → us → our → ours (біз → бізге → біздің → біздікі)",
"they → them → their → theirs (олар → оларға → олардың → олардыкі)",
]
},
{ title:"📍 Қай жерде қолданылады?",
text:`Subject (бастауыш): сөйлем басында\nObject (толықтауыш): етістіктен кейін\nPossessive adj: зат есімнің алдында\nPossessive pronoun: жалғыз тұрады, зат есімсіз`,
tag:"Мысалдар арқылы",
examples:[
"SHE is my friend. (Subject — бастауыш)",
"I love HER. (Object — толықтауыш)",
"This is HER book. (Possessive adj — зат есім алдында)",
"This book is HERS. (Possessive pronoun — жалғыз)",
"HE gave HIM HIS pen. (Subject / Object / Possessive adj)",
]
},
{ title:"🔮 Жалпылама есімдіктер (Indefinite Pronouns)",
text:`some- / any- / no- / every- + -thing / -body / -one / -where`,
tag:"something / anything / nothing / everybody...",
examples:[
"something — бірдеңе (болымды сөйлемде)",
"anything — ештеңе / бірдеңе (болымсыз/сұраулыда)",
"nothing — ештеңе жоқ (болымды форма + теріс мағына)",
"everything — бәрі / барлық нәрсе",
"somebody/someone — бір адам",
"anybody/anyone — ешкім / біреу",
"nobody/no one — ешкім жоқ",
"everybody/everyone — бәрі / барлық адам",
"somewhere — бір жерде",
"nowhere — ешқайда жоқ",
]
},
{ title:"⚠️ Something vs Anything",
text:`Болымды сөйлемде → something/somebody\nБолымсыз/сұраулы сөйлемде → anything/anybody`,
tag:"Маңызды ереже!",
examples:[
"I want something to eat. (болымды) ✅",
"I don't want anything to eat. (болымсыз) ✅",
"Is there anything in the box? (сұраулы) ✅",
"Nobody came to the party. (nobody = болымды форма + теріс мағына) ✅",
"Nothing is wrong. (болымды форма) ✅",
]
},
],
tips:[
"💡 Her = оған (object) ДА, оның (possessive adj) ДА — контекстке қара!",
"💡 Nobody/nothing + болымды етістік: Nobody KNOWS (knows emec knows not!)",
"💡 Possessive pronoun жалғыз тұрады: 'Whose pen? — Mine.' (my pen емес!)",
"💡 Everyone/everybody + жекеше етістік: Everyone IS here (are емес!)",
],
mistakes:[
"❌ I love she → ✅ I love her (object form!)",
"❌ This is my. → ✅ This is mine. (possessive pronoun)",
"❌ Nobody don't know → ✅ Nobody knows (double negative дұрыс емес!)",
]
},
questions:[
{id:"g5f1",diff:"easy",text:"This is my book. And that is ___. (Ali's book туралы)",opts:["he","his","him","her"],ans:"his",exp:"Ali's book → оның (еркек) possessive pronoun: his. Жалғыз тұрады, зат есімсіз."},
{id:"g5f2",diff:"easy",text:"She gave ___ a present. (маған)",opts:["I","my","me","mine"],ans:"me",exp:"Give + object. 'Маған' = me (object form of I)."},
{id:"g5f3",diff:"easy",text:"There is ___ in the room. (ешкім жоқ)",opts:["somebody","anybody","nobody","everyone"],ans:"nobody",exp:"Ешкім жоқ = nobody. Nobody + болымды етістік (is)."},
{id:"g5f4",diff:"easy",text:"I want ___ to drink, please.",opts:["anything","nothing","something","everything"],ans:"something",exp:"Болымды сөйлемде + өтіну → something. 'Бірдеңе' ішкім келеді."},
{id:"g5f5",diff:"easy",text:"Is there ___ wrong with your phone?",opts:["something","nothing","anything","everything"],ans:"anything",exp:"Сұраулы сөйлемде → anything. 'Бірдеңе бар ма?' = Is there anything?"},
{id:"g5f6",diff:"medium",text:"The car is ___. (Sara мен Alinікі)",opts:["their","theirs","them","they"],ans:"theirs",exp:"Possessive pronoun (жалғыз, зат есімсіз): theirs (олардыкі)."},
{id:"g5f7",diff:"medium",text:"___ knows the answer. The class is silent.",opts:["Somebody","Nobody","Anybody","Everybody"],ans:"Nobody",exp:"Ешкім білмейді = Nobody. Nobody + knows (болымды форма)."},
{id:"g5f8",diff:"medium",text:"I didn't eat ___ this morning.",opts:["something","nothing","anything","everything"],ans:"anything",exp:"Болымсыз сөйлем (didn't) + → anything. Didn't eat anything = ештеңе жеген жоқ."},
{id:"g5f9",diff:"medium",text:"He showed ___ his new bicycle. (бізге)",opts:["we","our","us","ours"],ans:"us",exp:"Showed + object. 'Бізге' = us (object form of we)."},
{id:"g5f10",diff:"medium",text:"Everyone ___ happy about the results.",opts:["are","were","is","be"],ans:"is",exp:"Everyone/everybody + жекеше етістік: Everyone IS. (are емес!)"},
{id:"g5f11",diff:"hard",text:"'Whose jacket is this?' — 'It's ___.'",opts:["her","hers","she","his"],ans:"hers",exp:"Whose? → Possessive pronoun жалғыз тұрады: hers (оныкі, әйел)."},
{id:"g5f12",diff:"hard",text:"She told ___ about the surprise. (оларға)",opts:["they","their","theirs","them"],ans:"them",exp:"Told + object. 'Оларға' = them (object form of they)."},
{id:"g5f13",diff:"hard",text:"___ called while you were out, but they didn't leave a message.",opts:["Nobody","Somebody","Anybody","Everybody"],ans:"Somebody",exp:"Болымды сөйлем, белгісіз адам → somebody. Кім екені белгісіз — somebody called."},
{id:"g5f14",diff:"hard",text:"Find the CORRECT sentence:",opts:["This pen is my.","I saw she in the park.","Nobody knows the answer.","Everybody are here."],ans:"Nobody knows the answer.",exp:"Дұрыс: nobody + knows (жекеше). ҚАТЕ: my→mine; she→her; Everybody are→is."},
{id:"g5f15",diff:"hard",text:"He didn't say ___ to ___ about the plan.",opts:["anything / anybody","something / somebody","nothing / nobody","everything / everybody"],ans:"anything / anybody",exp:"Болымсыз сөйлем (didn't) → anything + anybody. Ештеңе айтқан жоқ, ешкімге."},
]
},
{
id:"g5g", title:"Саналатын/Сансыз зат есімдер", subtitle:"much, many, a few, a little",
icon:"🔢", color:"#059669",
darynNote:"Daryn 5-сынып: much/many/a few/a little/a lot of — тест тапсырмаларында жиі кездеседі. Some/any да осы тақырыпта тексеріледі.",
explanation:{
intro:`Ағылшын тілінде зат есімдер екіге бөлінеді: саналатын (countable — санауға болатын) және сансыз (uncountable — санауға болмайтын). Олармен қолданылатын сөздер әртүрлі болады.`,
sections:[
{ title:"📦 Саналатын зат есімдер (Countable)",
text:`Санауға болатын заттар: a book, two cats, three apples\nJекеше (singular) → Көпше (plural): book → books`,
tag:"Countable: a/an + singular | plural + -s/-es",
examples:[
"a book — books (кітап/кітаптар)",
"an apple — apples (алма/алмалар)",
"a child — children (бала/балалар — ережеден тыс)",
"a person — people (адам/адамдар — ережеден тыс)",
"many books ✅ | much books ❌",
"a few books ✅ (бірнеше) | a little books ❌",
]
},
{ title:"💧 Сансыз зат есімдер (Uncountable)",
text:`Санауға болмайтын заттар. Көпше түрі жоқ! A/An алмайды!`,
tag:"Uncountable: жекеше форма ғана",
examples:[
"water (су) — waters ❌ | some water ✅",
"milk, juice, tea, coffee — сусындар",
"bread, rice, sugar, salt — тамақ",
"money, music, information, advice — абстракт",
"homework, weather, news, luggage — жиі ұмытылатындар",
"much water ✅ | many water ❌",
"a little water ✅ (аздап) | a few water ❌",
]
},
{ title:"📊 Қолдану кестесі",
text:``,
tag:"many / much / a few / a little / a lot of",
examples:[
"MANY + countable plural: many books, many students",
"MUCH + uncountable: much water, much time",
"A FEW + countable plural (аздап, бар): a few friends",
"A LITTLE + uncountable (аздап, бар): a little milk",
"FEW + countable (аз, жетіспейді): few friends (аз!)",
"LITTLE + uncountable (аз, жетіспейді): little time (аз!)",
"A LOT OF / LOTS OF — екеуімен де: a lot of books / water",
]
},
{ title:"🔵 Some / Any",
text:`Some — болымды сөйлемде, өтінуде\nAny — болымсыз/сұраулы сөйлемде`,
tag:"some (болымды) / any (болымсыз/сұраулы)",
examples:[
"I have some milk. (болымды) ✅",
"I don't have any milk. (болымсыз) ✅",
"Do you have any questions? (сұраулы) ✅",
"Would you like some tea? (өтіну/ұсыну) ✅",
]
},
],
tips:[
"💡 Advice, information, news, homework, luggage — сансыз! (advice-s ❌)",
"💡 A few = бірнеше (жеткілікті). Few = аз (жетіспейді). Мағыналары БАСҚА!",
"💡 A lot of = many/much екеуімен де қолданылады.",
"💡 How much? (uncountable) vs How many? (countable)",
],
mistakes:[
"❌ many water → ✅ much water (uncountable)",
"❌ an information → ✅ information (uncountable, article жоқ!)",
"❌ a few money → ✅ a little money (money = uncountable)",
]
},
questions:[
{id:"g5g1",diff:"easy",text:"There are ___ students in our class.",opts:["much","many","a little","a lot"],ans:"many",exp:"Students — саналатын (countable) → many students."},
{id:"g5g2",diff:"easy",text:"I don't have ___ time today.",opts:["many","a few","much","some"],ans:"much",exp:"Time — сансыз (uncountable) → much time. (many time ❌)"},
{id:"g5g3",diff:"easy",text:"She has ___ friends in her new school.",opts:["much","a little","a few","little"],ans:"a few",exp:"Friends — саналатын → a few friends (бірнеше досы бар)."},
{id:"g5g4",diff:"easy",text:"Would you like ___ tea?",opts:["any","many","some","a few"],ans:"some",exp:"Ұсыну/өтіну → some. Would you like some tea?"},
{id:"g5g5",diff:"easy",text:"Is there ___ milk in the fridge?",opts:["some","many","a few","much"],ans:"much",exp:"Сұраулы + uncountable → much. Is there much milk? (any да мүмкін)"},
{id:"g5g6",diff:"medium",text:"He gave me ___ advice. It was very helpful.",opts:["an","a few","some","many"],ans:"some",exp:"Advice — сансыз зат есім. An advice / many advices ❌. Some advice ✅."},
{id:"g5g7",diff:"medium",text:"I only have ___ money left. It's not enough.",opts:["a little","a few","many","much"],ans:"a little",exp:"Money — uncountable + аз/жетіспейтін мағына → a little money."},
{id:"g5g8",diff:"medium",text:"There is ___ information on this topic online.",opts:["many","a few","a lot of","a little"],ans:"a lot of",exp:"Information — uncountable → a lot of information. (many information ❌)"},
{id:"g5g9",diff:"medium",text:"___ people came to the concert — the hall was almost empty.",opts:["A little","Much","Few","A few"],ans:"Few",exp:"Few (without 'a') = аз, жетіспейді. Концертке аз адам келді — зал бос болды."},
{id:"g5g10",diff:"medium",text:"Do you have ___ homework today?",opts:["many","a few","some","a lot"],ans:"some",exp:"Болымды сұраулы ұсыныс → some. Homework — uncountable."},
{id:"g5g11",diff:"hard",text:"There is ___ bread left — just enough for one sandwich.",opts:["a few","many","a little","few"],ans:"a little",exp:"Bread — uncountable. A little = аздап бар (жеткілікті). Little = өте аз (жетіспейді)."},
{id:"g5g12",diff:"hard",text:"She has ___ friends, so she is often lonely.",opts:["a few","few","little","a little"],ans:"few",exp:"Few (without 'a') = аз, жетіспейді → сондықтан жалғыз. A few болса жаман мағына болмас еді."},
{id:"g5g13",diff:"hard",text:"How ___ sugar do you take in your tea?",opts:["many","few","much","a few"],ans:"much",exp:"How much? — uncountable. How many? — countable. Sugar = uncountable → How much sugar?"},
{id:"g5g14",diff:"hard",text:"Find the INCORRECT sentence:",opts:["I have a few books.","She doesn't have any money.","There is many water.","He gave me some advice."],ans:"There is many water.",exp:"ҚАТЕ: many water → ДҰРЫС: much water. Water — uncountable → much, not many."},
{id:"g5g15",diff:"hard",text:"Choose ALL the correct words: '___ of the students passed the test.'",opts:["Much","Many","A lot","All of these can work: Many / A lot"],ans:"All of these can work: Many / A lot",exp:"Students — countable → Many students passed / A lot of students passed. Both correct!"},
]
},
{
id:"g5h", title:"Сұрау сөздері & Жалғаулықтар", subtitle:"Wh- words, because, when, so",
icon:"❓", color:"#d97706",
darynNote:"Daryn 5-сынып: where/when/why/who/what/how сұрау сөздері + because/when/but/so жалғаулықтары. Сөз тәртібі де тексеріледі.",
explanation:{
intro:`Сұрау сөздері (Question words) мен жалғаулықтар (Conjunctions) — сөйлемдерді байланыстыру және сұрақ қоюда өте маңызды. Daryn 5-сынып тестінде осы тақырыптан жиі тапсырмалар кездеседі.`,
sections:[
{ title:"❓ Сұрау сөздері (Question Words / Wh- words)",
text:``,
tag:"What / Who / Where / When / Why / How",
examples:[
"WHAT — не, қандай: What is your name? / What time is it?",
"WHO — кім: Who is your teacher? / Who called you?",
"WHERE — қай жерде: Where do you live? / Where is my bag?",
"WHEN — қашан: When is your birthday? / When did he arrive?",
"WHY — неге, неліктен: Why are you late? / Why did she cry?",
"HOW — қалай: How are you? / How do you go to school?",
"HOW OLD — жасы: How old are you?",
"HOW MANY/MUCH — қанша: How many brothers do you have?",
]
},
{ title:"🔗 Жалғаулықтар (Conjunctions)",
text:`Жалғаулықтар екі сөйлемді немесе ойды байланыстырады.`,
tag:"and / but / or / because / so / when / although",
examples:[
"AND — және, да/де: She sings AND dances.",
"BUT — бірақ: I like tea, BUT I don't like coffee.",
"OR — немесе: Do you want tea OR coffee?",
"BECAUSE — себебі, өйткені: I was late BECAUSE I missed the bus.",
"SO — сондықтан: It was cold, SO I wore a coat.",
"WHEN — ...кезде: WHEN she arrived, we ate dinner.",
"ALTHOUGH — дегенмен: ALTHOUGH it was cold, we went out.",
]
},
{ title:"📐 Ағылшын сөйлемінің сөз тәртібі",
text:`Ағылшын тілінде сөз тәртібі өте маңызды — ол өзгермейді!`,
tag:"Subject + Verb + Object + (Place) + (Time)",
examples:[
"She reads books every evening. ✅",
"Every evening reads she books. ❌",
"He goes to school by bus. ✅",
"Why do you like English? ✅ (Wh- + aux + S + V)",
"Where does she live? ✅",
"When did they arrive? ✅",
]
},
],
tips:[
"💡 Why? → Because (себебі). Why сұраққа Because деп жауап береміз.",
"💡 So = сондықтан (нәтиже). Because = өйткені (себеп).",
"💡 Сұраулы сөйлем тәртібі: Wh- + do/does/did + Subject + Verb?",
"💡 Although + сөйлем, + сөйлем (But-тан айырмасы осы).",
],
mistakes:[
"❌ Because I was tired, so I slept → ✅ I was tired, so I slept. (немесе: Because I was tired, I slept.)",
"❌ Where you live? → ✅ Where do you live?",
"❌ Why she is crying? → ✅ Why is she crying?",
]
},
questions:[
{id:"g5h1",diff:"easy",text:"___ is your favourite subject at school?",opts:["Where","Who","What","When"],ans:"What",exp:"Пән туралы сұрақ → What. What is your favourite subject?"},
{id:"g5h2",diff:"easy",text:"___ are you late? — Because I missed the bus.",opts:["Where","What","When","Why"],ans:"Why",exp:"Себеп сұрауда → Why. Жауабы Because-пен басталады."},
{id:"g5h3",diff:"easy",text:"I was tired, ___ I went to bed early.",opts:["because","but","so","although"],ans:"so",exp:"So = сондықтан (нәтиже). Шаршадым → сондықтан ертерек ұйықтадым."},
{id:"g5h4",diff:"easy",text:"She likes tennis ___ she doesn't like football.",opts:["and","so","or","but"],ans:"but",exp:"But = бірақ (қарама-қарсы ой). Теннис ұнайды, бірақ футбол ұнамайды."},
{id:"g5h5",diff:"easy",text:"___ does your mother work?",opts:["What","Who","Where","Why"],ans:"Where",exp:"Жұмыс орны туралы сұрақ → Where. Where does she work?"},
{id:"g5h6",diff:"medium",text:"He didn't go to school ___ he was ill.",opts:["so","but","because","although"],ans:"because",exp:"Because = себебі/өйткені. Мектепке бармады, СЕБЕБІ ауырып қалды."},
{id:"g5h7",diff:"medium",text:"___ old is your brother?",opts:["What","How","Who","Where"],ans:"How",exp:"Жас туралы сұрақ → How old. How old is he?"},
{id:"g5h8",diff:"medium",text:"___ did you arrive? — At 7 o'clock.",opts:["Why","Where","When","Who"],ans:"When",exp:"Уақыт туралы сұрақ → When. Жауабы уақытпен (at 7 o'clock)."},
{id:"g5h9",diff:"medium",text:"___ it was raining, they played football outside.",opts:["So","Because","Although","But"],ans:"Although",exp:"Although = дегенмен (қарама-қайшы жағдай). Жаңбыр жауса да, футбол ойнады."},
{id:"g5h10",diff:"medium",text:"Choose the CORRECT word order:",opts:["She every day goes to school.","Every day she goes to school.","She goes to school every day.","Goes she to school every day."],ans:"She goes to school every day.",exp:"Дұрыс тәртіп: Subject + Verb + Object + Time. 'Every day' соңында (немесе басында)."},
{id:"g5h11",diff:"hard",text:"___ teacher is very strict ___ the students respect her.",opts:["Although our / but","Our / but","Although our / ,","Our / so"],ans:"Although our / ,",exp:"Although our teacher is very strict, the students respect her. (although + қарама-қайшы нәтиже)"},
{id:"g5h12",diff:"hard",text:"Find the CORRECT question:",opts:["Where she lives?","Where does she lives?","Where does she live?","Where do she live?"],ans:"Where does she live?",exp:"Where + does (she/3жақ) + she + V1 (live, lives емес!). Does жалғанса V1 өзгермейді."},
{id:"g5h13",diff:"hard",text:"She studied hard ___ she wanted to pass the exam. She ___ passed with a great score.",opts:["because / so","so / because","but / and","although / but"],ans:"because / so",exp:"Себеп → because. Нәтиже → so. She studied because... She so passed ✅"},
{id:"g5h14",diff:"hard",text:"___ many students are in your class?",opts:["How much","What","How many","How"],ans:"How many",exp:"Саналатын зат есім (students) → How many. How much money / How many students."},
{id:"g5h15",diff:"hard",text:"Reorder: 'usually / she / to school / goes / at 8 / in the morning'",opts:["She usually goes to school at 8 in the morning.","Usually she goes to school in the morning at 8.","She goes usually to school at 8 in the morning.","She usually goes to school in the morning at 8."],ans:"She usually goes to school at 8 in the morning.",exp:"S + usually + V + place + time. Usually — етістік алдында (go алдында). At 8 in the morning — нақтыдан жалпыға."},
]
},
{
id:"g5i", title:"Функционалдық тіл", subtitle:"Кеңес, рұқсат, ұсыныс, себеп",
icon:"💬", color:"#dc2626",
darynNote:"Daryn 5-сынып: should (кеңес), may (рұқсат), because/so (себеп-нәтиже), ұсынысқа жауап беру үлгілері. Диалог форматындағы тапсырмалар жиі кездеседі.",
explanation:{
intro:`Функционалдық тіл — нақты өмірлік жағдайларда қолданылатын сөйлеу үлгілері. Daryn 5-сынып тестінде диалог форматындағы тапсырмаларда кеңес беру, рұқсат сұрау, ұсыныс жасау тексеріледі.`,
sections:[
{ title:"💡 Кеңес беру (Giving Advice) — SHOULD",
text:`Should = кеңес (жасаған дұрыс болады деген ұсыным)\nShouldn't = кеңес бермеу`,
tag:"You should / shouldn't + V1",
examples:[
"You should drink more water. (Суды көбірек ішкенің жөн.)",
"She should see a doctor. (Дәрігерге барғаны дұрыс.)",
"You shouldn't stay up late. (Кеш ұйықтамауың керек.)",
"He should study harder. (Жақсырақ оқуы керек.)",
]
},
{ title:"🔓 Рұқсат сұрау (Asking Permission) — MAY / CAN",
text:`May I...? — сыпайы рұқсат сұрау\nCan I...? — бейресми рұқсат сұрау`,
tag:"May I / Can I + V1?",
examples:[
"May I come in? — Кіруге бола ма? (сыпайы)",
"May I borrow your pen? — Қаламыңызды алуға бола ма?",
"Can I go to the toilet? — Туалетке барсам бола ма? (бейресми)",
"Of course! / Sure! / I'm sorry, you can't. — жауап үлгілері",
]
},
{ title:"🎵 Лексика: Музыка, Кітап, Фильм түрлері",
text:``,
tag:"Genres vocabulary",
examples:[
"MUSIC: pop, rock, classical, jazz, hip-hop, folk",
"BOOKS: biography (өмірбаян), detective (детектив), fantasy, romance, science fiction (ғылыми фантастика), adventure",
"FILMS/MOVIES: musical (мюзикл), comedy, thriller, animation, documentary (деректі фильм), horror",
]
},
{ title:"🤝 Ұсынысқа жауап беру",
text:`Ұсыныс жасау және оған жауап беру үлгілері:`,
tag:"Suggestions & Responses",
examples:[
"Shall we...? / Let's...! / Why don't we...? / How about...? — ұсыныс",
"That sounds great! / Good idea! / I'd love to! — қабылдау",
"I'm sorry, I can't. / I'd rather not. / Maybe another time. — бас тарту",
"Would you like to...? — шақыру",
"Yes, I'd love to! / No, thank you. — жауап",
]
},
],
tips:[
"💡 Should кеңес, must міндет. 'You should rest' ≠ 'You must rest'.",
"💡 May I...? — мектепте дұрыс нұсқа. Can I...? — достармен бейресми.",
"💡 'Let's go!' — 1-жақ көпше ұсыныс (Shall we go? баламасы).",
"💡 Because = себеп. So = нәтиже. Екеуін бір сөйлемде қолданба!",
],
mistakes:[
"❌ You should to study → ✅ You should study (to жоқ!)",
"❌ May I to come in? → ✅ May I come in?",
"❌ Because I was tired, so I slept → ✅ I was tired, so I slept.",
]
},
questions:[
{id:"g5i1",diff:"easy",text:"'I have a headache.' — 'You ___ see a doctor.'",opts:["must","may","should","can"],ans:"should",exp:"Should = кеңес (жасаған дұрыс болады). Бас ауырса — дәрігерге барғаның жөн."},
{id:"g5i2",diff:"easy",text:"'___ I open the window, please?' — 'Of course!'",opts:["Must","Should","May","Will"],ans:"May",exp:"May I...? = сыпайы рұқсат сұрау. 'Of course!' = рұқсат беру."},
{id:"g5i3",diff:"easy",text:"She likes reading stories about real people's lives. She reads ___.",opts:["fantasy","biography","detective","musical"],ans:"biography",exp:"Biography = өмірбаян (нақты адамдардың өмірі туралы кітап)."},
{id:"g5i4",diff:"easy",text:"'Let's go to the cinema tonight!' — '___!'",opts:["I'm sorry, I can't.","That sounds great","May I come?","You should go."],ans:"That sounds great",exp:"Ұсынысты қабылдау → That sounds great! / Good idea!"},
{id:"g5i5",diff:"easy",text:"I didn't go to school ___ I was ill.",opts:["so","but","although","because"],ans:"because",exp:"Because = себебі. Мектепке бармадым, СЕБЕБІ ауырып қалдым."},
{id:"g5i6",diff:"medium",text:"A film with songs and dancing is called a ___.",opts:["thriller","documentary","musical","biography"],ans:"musical",exp:"Musical = мюзикл (ән мен биі бар фильм)."},
{id:"g5i7",diff:"medium",text:"'Why don't we go for a walk?' — '___. I need some fresh air.'",opts:["I'd rather not","Good idea","You should go","May I come"],ans:"Good idea",exp:"'Good idea!' = ұсынысты қабылдау. Таза ауа керек деп қосады — ризашылығы."},
{id:"g5i8",diff:"medium",text:"You ___ eat so many sweets. It's bad for your teeth.",opts:["should","may","must","shouldn't"],ans:"shouldn't",exp:"Shouldn't = кеңес бермеу (жасамауың дұрыс). Тәтті жемеуің керек."},
{id:"g5i9",diff:"medium",text:"A film based on real events and facts is a ___.",opts:["fantasy","comedy","musical","documentary"],ans:"documentary",exp:"Documentary = деректі фильм (нақты оқиғаларға негізделген)."},
{id:"g5i10",diff:"medium",text:"'___ you like to join us for dinner?' — 'I'd love to!'",opts:["May","Should","Would","Must"],ans:"Would",exp:"Would you like to...? = шақыру үлгісі. I'd love to! = қуанышпен қабылдаймын."},
{id:"g5i11",diff:"hard",text:"'I don't know what to give my friend for her birthday.' — '___ give her a book. She loves reading.'",opts:["You may","You should","You must","May you"],ans:"You should",exp:"Should = кеңес. 'Кітап берсең дұрыс болады' — ұсыным."},
{id:"g5i12",diff:"hard",text:"He studied hard, ___ he passed all his exams.",opts:["because","although","but","so"],ans:"so",exp:"So = сондықтан (нәтиже). Қатты оқыды → СОНДЫҚТАН барлық емтихандарды тапсырды."},
{id:"g5i13",diff:"hard",text:"'Shall we watch a film tonight?' — '___, I'm busy with homework.'",opts:["That sounds great","Good idea","I'd love to","I'm sorry, I can't"],ans:"I'm sorry, I can't",exp:"Ұсынысты сыпайы бас тарту: I'm sorry, I can't. + себеп (busy with homework)."},
{id:"g5i14",diff:"hard",text:"She loves exciting stories with mysteries and crimes. Her favourite genre is ___.",opts:["musical","biography","detective","fantasy"],ans:"detective",exp:"Detective (детектив жанры) = жұмбақ пен қылмысқа толы оқиғалар."},
{id:"g5i15",diff:"hard",text:"Find the CORRECT sentence:",opts:["You should to rest more.","May I to open the door?","He shouldn't eat so much sugar.","She must to wear a uniform."],ans:"He shouldn't eat so much sugar.",exp:"Дұрыс: shouldn't + V1 (eat). ҚАТЕ: should to rest→should rest; May I to→May I; must to→must."},
]
},
{
id:"g5j", title:"Оқылым (Reading)", subtitle:"Мәтін түсіну, негізгі ой, себеп-салдар",
icon:"📖", color:"#0891b2",
darynNote:"Daryn 5-сынып оқылым бөлімі: 150-250 сөздік мәтін. Негізгі ой, мәтіндегі нақты ақпарат, сөздің мағынасы, себеп-салдар — 4-5 сұрақ болады.",
explanation:{
intro:`Daryn 5-сынып олимпиадасының оқылым бөлімінде қысқа мәтін беріліп, одан сұрақтар қойылады. Мәтінді дұрыс түсіну үшін арнайы стратегия қолдану маңызды.`,
sections:[
{ title:"📖 1-қадам: Skimming (Жылдам оқу)",
text:`Мәтінді бірінші рет жылдам оқып, жалпы мазмұнды түсін. Барлық сөзді түсінбесең де болады.`,
tag:"Негізгі ой қайда? → Бірінші & соңғы абзацта",
examples:[
"Мәтінге дейін сұрақтарды оқы!",
"Тақырыпты (Title) оқы — ол мазмұнды айтады.",
"Бірінші сөйлем — topic sentence (негізгі ой).",
"Соңғы сөйлем — қорытынды.",
]
},
{ title:"🔍 2-қадам: Scanning (Нақты ақпарат іздеу)",
text:`Сұрақтағы кілт сөзді алып, мәтіннен сол сөзді іздей. Барлығын қайта оқымай.`,
tag:"Кілт сөзді таб → сол жерден оқы",
examples:[
"When? → уақыт сөздерін іздей (in 2010, last year, on Monday)",
"Where? → орын сөздерін іздей (in Kazakhstan, at school)",
"Who? → адам есімдерін іздей (capital letter)",
"How many? → сандарды іздей (3, fifteen, dozens)",
]
},
{ title:"💭 3-қадам: Inference (Астарлы мағына)",
text:`Кейбір сұрақтарда жауап мәтінде тікелей жоқ — контекстен ойлап тап.`,
tag:"'We can understand that...' / 'It is likely that...'",
examples:[
"Мәтін: 'She looked at the clock and ran.' → Inference: She was late.",
"Мәтін: 'He smiled and said Thank you.' → Inference: He was happy.",
"Антонимдер/синонимдер арқылы сөз мағынасын анықта.",
]
},
{ title:"⚠️ 5-сынып оқылым стратегиясы",
text:``,
tag:"Дұрыс жауап ережесі",
examples:[
"1. Мәтіннен тікелей жауап тап — жалпы білімге сүйенбе!",
"2. 'According to the text' → мәтінде бар ақпарат.",
"3. Тым жалпы немесе тым нақты жауаптардан сақтан.",
"4. Мәтінде жоқ сөздер бар жауаптан аулақ бол.",
]
},
],
tips:[
"💡 Сұрақтарды алдымен оқы, содан кейін мәтінді оқы — уақытты үнемдейсің!",
"💡 'Main idea' сұрақта → Тым жалпы немесе тым нақты жауаптан сақтан.",
"💡 'The word X means...' → контексттен анықта, сөздікке сенбе.",
"💡 Because/so/since/as → себеп-нәтиже байланысы.",
],
mistakes:[
"❌ Мәтіндегі сөзді байқамай жауап беру",
"❌ Жалпы білімге сүйену (мәтіннен ал!)",
"❌ 'All of the above' — барлық дұрыс деп ойлау",
]
},
questions:[
{id:"g5j1",diff:"easy",text:"TEXT: 'Asel is 11 years old and lives in Almaty. She goes to school No. 15. Her favourite subject is English. She also likes music and plays the piano every evening.'\n\nWhat is Asel's favourite subject?",opts:["Music","Maths","English","Piano"],ans:"English",exp:"Scanning: 'Her favourite subject is English' — мәтінде тікелей айтылған."},
{id:"g5j2",diff:"easy",text:"From the same text, when does Asel play the piano?",opts:["Every morning","At school","Every evening","On weekends"],ans:"Every evening",exp:"Scanning: 'plays the piano every evening' — мәтінде тікелей."},
{id:"g5j3",diff:"easy",text:"TEXT: 'Dogs are great pets. They are loyal and friendly. Dogs need daily walks and regular feeding. With proper care, a dog can live up to 15 years.'\n\nWhat is the MAIN idea of this text?",opts:["Dogs live 15 years","Dogs need food","Dogs make great pets and need care","Dogs are friendly animals"],ans:"Dogs make great pets and need care",exp:"Main idea = жалпы мазмұн. Мәтін иттер — жақсы үй жануарлары ЖӘНЕ күтім керек екенін айтады."},
{id:"g5j4",diff:"easy",text:"From the same text, how long can a dog live?",opts:["5 years","10 years","Up to 15 years","20 years"],ans:"Up to 15 years",exp:"Scanning: 'can live up to 15 years' — мәтінде тікелей."},
{id:"g5j5",diff:"easy",text:"TEXT: 'Nauryz is celebrated on March 21. Families visit each other and eat traditional food like nauryz-kozhe. Children wear colourful national clothes.'\n\nWhen is Nauryz?",opts:["21 January","21 February","21 March","21 April"],ans:"21 March",exp:"Scanning: 'celebrated on March 21' — мәтінде тікелей."},
{id:"g5j6",diff:"medium",text:"TEXT: 'Ali was nervous before his presentation. His hands were shaking, and he kept looking at his notes. However, when he started speaking, his voice became clear and confident.'\n\nHow did Ali feel BEFORE the presentation?",opts:["Happy","Confident","Nervous","Angry"],ans:"Nervous",exp:"Scanning: 'Ali was nervous before his presentation' — тікелей."},
{id:"g5j7",diff:"medium",text:"From the same text, what happened when Ali started speaking?",opts:["He stopped","He became nervous","His voice became clear and confident","He looked at his notes"],ans:"His voice became clear and confident",exp:"Scanning + However (бірақ) → қарама-қарсы. 'His voice became clear and confident'."},
{id:"g5j8",diff:"medium",text:"TEXT: 'The Amazon River is the largest river in the world by water volume. It flows through South America, mostly through Brazil. Thousands of animal species live in and around it.'\n\nWhere is the Amazon River?",opts:["Africa","Asia","North America","South America"],ans:"South America",exp:"Scanning: 'flows through South America' — мәтінде тікелей."},
{id:"g5j9",diff:"medium",text:"From the same text, the word 'volume' most likely means:",opts:["noise level","amount of water","length","speed"],ans:"amount of water",exp:"Контекст: 'largest by water volume' = судың мөлшері (ең көп су). Volume = мөлшер/көлем."},
{id:"g5j10",diff:"medium",text:"TEXT: 'Sara didn't have an umbrella. She looked at the grey sky and then at her white dress. She decided to wait inside the café.'\n\nWhy did Sara wait inside?",opts:["She was hungry","She was afraid of the dark","She thought it would rain","She was meeting a friend"],ans:"She thought it would rain",exp:"Inference: Grey sky (бұлтты аспан) + white dress (кірлеп қалмасын) → жаңбыр жауады деп ойлады."},
{id:"g5j11",diff:"hard",text:"TEXT: 'Exercise is essential for good health. It strengthens muscles, improves mood, and helps control weight. Doctors recommend at least 30 minutes of physical activity every day. Even a short walk can make a big difference.'\n\nWhat is the BEST title for this text?",opts:["How to Lose Weight","The Benefits of Exercise","Why Doctors Are Important","Walking in the Park"],ans:"The Benefits of Exercise",exp:"Main idea: жаттығудың денсаулыққа пайдасы (strengthens, improves, helps). Best title = The Benefits of Exercise."},
{id:"g5j12",diff:"hard",text:"From the same exercise text, the word 'essential' most likely means:",opts:["optional","helpful","very important","dangerous"],ans:"very important",exp:"Essential = өте маңызды, қажетті. Контекст: денсаулық үшін жаттығу essential = міндетті/маңызды."},
{id:"g5j13",diff:"hard",text:"TEXT: 'Malika loves animals. She has two cats, a dog, and a fish. Every day she feeds them before school. On weekends, she volunteers at the local animal shelter.'\n\nWhat can we UNDERSTAND about Malika?",opts:["She doesn't go to school","She only likes cats","She is very caring and responsible","She works at a pet shop"],ans:"She is very caring and responsible",exp:"Inference: Күн сайын тамақтандырады + демалыс күні волонтер = жауапкершілікті, қамқор адам."},
{id:"g5j14",diff:"hard",text:"From the same text, how often does Malika volunteer at the shelter?",opts:["Every day","Every morning","On weekends","After school"],ans:"On weekends",exp:"Scanning: 'On weekends, she volunteers' — мәтінде тікелей."},
{id:"g5j15",diff:"hard",text:"TEXT: 'Social media lets people connect with friends and family instantly. However, too much time on social media can cause anxiety, poor sleep, and distraction from studies. Experts suggest using it for no more than one hour a day.'\n\nWhat is the MAIN PROBLEM with social media according to the text?",opts:["It is expensive","It helps people connect","Too much use can harm health and studies","Experts don't like it"],ans:"Too much use can harm health and studies",exp:"However → негатив бөлімі: anxiety, poor sleep, distraction. Main problem = too much use is harmful."},
]
},
]
},
6: {
label:"6-сынып",
darynNote:"6-сынып Daryn олимпиадасы: Past Simple (10+ сұрақ), Comparatives/Superlatives (8+ сұрақ), Modal verbs (6+ сұрақ). Сөздік: тамақ, ауа-райы, саяхат, дене мүшелері.",
topics:[
{
id:"g6a", title:"Past Simple", subtitle:"Өткен шақ",
icon:"📅", color:"#dc2626",
darynNote:"Daryn 6-сынып: дұрыс/бұрыс етістіктер (regular/irregular verbs), did/didn't сұраулы/болымсыз — ең маңызды тақырып.",
explanation:{
intro:`Past Simple (Өткен шақ) — өткен уақытта болып, аяқталған іс-әрекеттерді білдіреді. Daryn 6-сынып тестінде бұл шаққа байланысты сұрақтар ең көп болады.`,
sections:[
{ title:"✅ Болымды сөйлем — Дұрыс етістіктер (Regular)",
text:`Дұрыс етістіктер өткен шақта -ed жалғамасын алады.`,
tag:"V + -ed (дұрыс етістіктер)",
examples:["work → worked (жұмыс істеді)","play → played (ойнады)","like → liked (ұнатты)","stop → stopped (тоқтады)","study → studied (оқыды — y→i+ed)"]
},
{ title:"⚡ Бұрыс етістіктер (Irregular verbs)",
text:`Бұрыс етістіктер өткен шақта өз формасын жаттап алу керек!`,
tag:"V2 — жаттап алу керек!",
examples:["go → went","see → saw","have → had","eat → ate","come → came","buy → bought","take → took","write → wrote"]
},
{ title:"❌ Болымсыз сөйлем",
text:`Subject + did not (didn't) + V1\nБарлық жақтар үшін бірдей: didn't + бастапқы етістік!`,
tag:"didn't + V1",
examples:["She didn't go to school. (went емес!)","They didn't eat breakfast.","He didn't watch TV yesterday."]
},
{ title:"❓ Сұраулы сөйлем",
text:`Did + Subject + V1?\nДид жалғанса, бастапқы етістік өзгермейді!`,
tag:"Did + Subject + V1?",
examples:["Did you go to school?","Did she see the film?","Did they buy a car?"]
},
{ title:"🕐 Белгі сөздер (Signal words)",
text:`Past Simple-ді анықтайтын сөздер:`,
tag:"Өткен уақытты білдіретін сөздер",
examples:["yesterday — кеше","last week/month/year — өткен апта...","ago — бұрын (2 days ago)","in 2020 — 2020 жылы","this morning (егер аяқталса)"]
},
],
tips:[
"💡 Didn't жалғанса, V1-ді қолдан: She didn't COME (came емес!)",
"💡 Did жалғанса: Did she GO? (went емес!)",
"💡 Бұрыс етістіктерді (go-went, see-saw, have-had) жатқа білу міндетті!",
],
mistakes:[
"❌ She didn't went → ✅ She didn't go",
"❌ Did he went? → ✅ Did he go?",
"❌ Yesterday I go → ✅ Yesterday I went",
]
},
questions:[
{id:"g6a1",diff:"easy",text:"She ___ (visit) London last year.",opts:["visit","visits","visited","was visit"],ans:"visited",exp:"Regular verb. Past Simple: visit + -ed = visited. Last year — өткен шақ белгісі."},
{id:"g6a2",diff:"easy",text:"They ___ (play) football yesterday.",opts:["play","plays","played","were playing"],ans:"played",exp:"Regular verb: play + -ed = played. Yesterday — өткен шақ белгісі."},
{id:"g6a3",diff:"easy",text:"He ___ (go) to the cinema last night.",opts:["go","goes","goed","went"],ans:"went",exp:"Irregular verb: go → went (бұрыс етістік, -ed жалғанбайды!)."},
{id:"g6a4",diff:"easy",text:"She ___ (not/eat) breakfast this morning.",opts:["didn't eat","didn't ate","doesn't eat","not ate"],ans:"didn't eat",exp:"Болымсыз: didn't + V1. 'Ate' емес, 'eat'!"},
{id:"g6a5",diff:"easy",text:"___ you ___ (see) that film?",opts:["Did / see","Did / saw","Does / see","Do / see"],ans:"Did / see",exp:"Past Simple сұраулы: Did + Subject + V1? 'Saw' емес, 'see'!"},
{id:"g6a6",diff:"medium",text:"I ___ (buy) a new phone two days ago.",opts:["buy","buyed","bought","have bought"],ans:"bought",exp:"Irregular verb: buy → bought. 'Two days ago' — өткен шақ белгісі."},
{id:"g6a7",diff:"medium",text:"She ___ (not/come) to school yesterday.",opts:["didn't came","didn't come","doesn't come","not come"],ans:"didn't come",exp:"Болымсыз: didn't + V1. 'Came' емес, 'come'!"},
{id:"g6a8",diff:"medium",text:"Where ___ you ___ (go) last weekend?",opts:["did / go","did / went","do / go","were / go"],ans:"did / go",exp:"Past Simple сұраулы: Did + Subject + V1? Went емес, go!"},
{id:"g6a9",diff:"medium",text:"He ___ (write) a letter to his friend last week.",opts:["write","writes","wrote","writed"],ans:"wrote",exp:"Irregular verb: write → wrote (бұрыс етістік)."},
{id:"g6a10",diff:"medium",text:"___ she ___ (have) a good time at the party?",opts:["Did / have","Did / had","Does / have","Was / have"],ans:"Did / have",exp:"Past Simple сұраулы: Did she have? 'Had' емес, 'have'!"},
{id:"g6a11",diff:"hard",text:"Yesterday morning, she ___ (wake up) early, ___ (have) breakfast and ___ (take) the bus to school.",opts:["woke up / had / took","waked up / had / took","woke up / have / took","woke up / had / taked"],ans:"woke up / had / took",exp:"Барлығы irregular: wake→woke, have→had, take→took."},
{id:"g6a12",diff:"hard",text:"He ___ (not/know) the answer, so he ___ (ask) his teacher.",opts:["didn't know / asked","didn't knew / asked","didn't know / ask","not know / asked"],ans:"didn't know / asked",exp:"Болымсыз: didn't + know (V1). Болымды: asked (regular, -ed)."},
{id:"g6a13",diff:"hard",text:"In 1969, astronauts ___ (land) on the moon for the first time.",opts:["land","lands","landed","have landed"],ans:"landed",exp:"In 1969 — нақты өткен уақыт. Regular verb: land + -ed = landed."},
{id:"g6a14",diff:"hard",text:"___ your parents ___ (travel) abroad last summer?",opts:["Did / travel","Did / travelled","Do / travel","Were / travel"],ans:"Did / travel",exp:"Past Simple сұраулы: Did + they + V1? 'Travelled' емес, 'travel'!"},
{id:"g6a15",diff:"hard",text:"Find the INCORRECT sentence:",opts:["She went to London last year.","Did you saw the film?","He didn't come to school.","They bought a new car."],ans:"Did you saw the film?",exp:"ҚАТЕ: 'Did you saw' → ДҰРЫС: 'Did you see?' (Did жалғанса V1 қолданылады, saw емес!)"},
]
},
{
id:"g6b", title:"Салыстырмалы дәрежелер", subtitle:"Comparative & Superlative",
icon:"📊", color:"#7c3aed",
darynNote:"Daryn 6-сынып: -er/-est, more/most, irregular forms (good-better-best). Қысқа/ұзын сын есімдер — жиі тексеріледі.",
explanation:{
intro:`Салыстырмалы дәрежелер (Comparatives & Superlatives) — екі немесе одан көп нәрсені салыстыруда қолданылады. Daryn олимпиадасының 6-сынып тестінде бұл тақырып өте жиі кездеседі.`,
sections:[
{ title:"📈 Салыстырмалы дәреже (Comparative)",
text:`Екі нәрсені салыстыру. Формасы:\n• Қысқа сын есімдер (1-2 буын): -er + than\n• Ұзын сын есімдер (3+ буын): more + adj + than`,
tag:"...er than / more...than",
examples:["tall → taller than (биіктеу)","big → bigger than (үлкенірек)","happy → happier than (бақыттырақ)","beautiful → more beautiful than","interesting → more interesting than","expensive → more expensive than"]
},
{ title:"🏆 Үстеулік дәреже (Superlative)",
text:`Үш немесе одан көп нәрсе арасында ең... болғанды білдіру.\n• Қысқа: the + -est\n• Ұзын: the most + adj`,
tag:"the ...est / the most...",
examples:["tall → the tallest (ең биік)","big → the biggest","happy → the happiest","beautiful → the most beautiful","interesting → the most interesting"]
},
{ title:"⚡ Ережеден тыс формалар (Irregular)",
text:`Кейбір сын есімдер мүлде өзгеше форма алады — жаттап алу керек!`,
tag:"Жаттап алу міндетті!",
examples:["good → better → the best","bad → worse → the worst","far → farther/further → the farthest/furthest","many/much → more → the most","little → less → the least"]
},
],
tips:[
"💡 Бір буынды сын есімдер -er/-est алады: tall→taller, small→smaller.",
"💡 'e'-мен аяқталса тек -r/-st: large→larger→largest.",
"💡 Дауыссыз+дауысты+дауыссыз → соңғы дауыссыз қосылады: big→bigger, hot→hotter.",
"💡 Good-better-best, bad-worse-worst — жаттап алыңыз!",
],
mistakes:[
"❌ more tall → ✅ taller",
"❌ the most good → ✅ the best",
"❌ more better → ✅ better (already comparative!)",
]
},
questions:[
{id:"g6b1",diff:"easy",text:"Ali is ___ (tall) than his brother.",opts:["tall","taller","more tall","tallest"],ans:"taller",exp:"Қысқа сын есім (1 буын) салыстырмалы: tall + -er = taller."},
{id:"g6b2",diff:"easy",text:"This film is ___ (interesting) than that one.",opts:["interestinger","most interesting","more interesting","interesting than"],ans:"more interesting",exp:"Ұзын сын есім (4 буын) салыстырмалы: more + interesting + than."},
{id:"g6b3",diff:"easy",text:"She is ___ (good) student in the class.",opts:["good","better","the best","the goodest"],ans:"the best",exp:"Үстеулік дәреже (ең жақсы): good → the best (ережеден тыс форма!)."},
{id:"g6b4",diff:"easy",text:"Today is ___ (hot) than yesterday.",opts:["hot","hotter","more hot","hottest"],ans:"hotter",exp:"Hot — қысқа сын есім + соңғы дауыссыз екі еселенеді: hot → hotter."},
{id:"g6b5",diff:"easy",text:"This is ___ (expensive) shop in the city.",opts:["expensive","more expensive","the most expensive","expensivest"],ans:"the most expensive",exp:"Ұзын сын есім үстеулік: the most + expensive."},
{id:"g6b6",diff:"medium",text:"My bag is ___ (heavy) than yours.",opts:["heavy","heavier","more heavy","heaviest"],ans:"heavier",exp:"Happy/heavy → y→i+er: heavy → heavier."},
{id:"g6b7",diff:"medium",text:"He runs ___ (fast) than his friends.",opts:["fast","faster","more fast","the fastest"],ans:"faster",exp:"Fast — бір буынды: fast + -er = faster."},
{id:"g6b8",diff:"medium",text:"This is ___ (bad) film I have ever seen.",opts:["bad","worse","the worst","the baddest"],ans:"the worst",exp:"Үстеулік: bad → the worst (ережеден тыс форма)."},
{id:"g6b9",diff:"medium",text:"She speaks English ___ (fluently) than her sister.",opts:["fluently","more fluently","fluenter","most fluently"],ans:"more fluently",exp:"Үстеу (adverb) salyctyrmaly: more + fluently."},
{id:"g6b10",diff:"medium",text:"Mount Everest is ___ (high) mountain in the world.",opts:["high","higher","the highest","most high"],ans:"the highest",exp:"Үстеулік дәреже + THE: the highest. Бір буынды → -est."},
{id:"g6b11",diff:"hard",text:"Kazakhstan is ___ (big) than Germany, but Russia is ___ (big) country in the world.",opts:["bigger / the biggest","more big / the biggest","bigger / biggest","bigger / the most big"],ans:"bigger / the biggest",exp:"Салыстырмалы: bigger. Үстеулік (ең): the biggest."},
{id:"g6b12",diff:"hard",text:"Which is ___: English or Maths? I think Maths is ___ (difficult).",opts:["the difficult / more difficult","more difficult / the most difficult","difficulter / most difficult","difficult / most difficult"],ans:"more difficult / the most difficult",exp:"'Which is more difficult?' — 2 пән салыстырылады. 'The most difficult' — барлық пәндер арасында."},
{id:"g6b13",diff:"hard",text:"The weather today is ___ (bad) than yesterday. It was ___ (bad) storm ___ year.",opts:["worse / the worst / last","more bad / baddest / last","worse / the baddest / last","the worse / worst / the last"],ans:"worse / the worst / last",exp:"bad→worse (салыстырмалы), the worst (үстеулік). Last year — артикль жоқ."},
{id:"g6b14",diff:"hard",text:"He is ___ (little) experienced than his colleague.",opts:["lesser","less","littler","the least"],ans:"less",exp:"Little → less (салыстырмалы) → the least (үстеулік). Тәжірибесіздеу = less experienced."},
{id:"g6b15",diff:"hard",text:"Find the CORRECT sentence:",opts:["She is more tall than him.","This is the most best film.","He runs faster than his brother.","It is the expensivest car."],ans:"He runs faster than his brother.",exp:"Дұрыс: fast → faster (қысқа). ҚАТЕ: more tall→taller; most best→the best; expensivest→the most expensive."},
]
},
{
id:"g6c", title:"Modal Verbs", subtitle:"can, must, should, may",
icon:"🔑", color:"#0891b2",
darynNote:"Daryn 6-сынып: can/can't (мүмкіндік/іскерлік), must/mustn't (міндет/тыйым), should/shouldn't (кеңес). Кейде may/might.",
explanation:{
intro:`Modal Verbs (Модальды етістіктер) — мүмкіндік, міндеттілік, кеңес, рұқсат беруді білдіреді. Олардың маңызды ерекшелігі: modal verb кейін БАСТАПҚЫ ЕТІСТІК (V1) келеді, to жоқ!`,
sections:[
{ title:"💪 CAN / CAN'T — іскерлік/мүмкіндік",
text:`Can = мүмкін / біледі / жасай алады\nCan't = мүмкін емес / білмейді`,
tag:"Can + V1 (to жоқ!)",
examples:["I can swim. — Жүзе аламын.","She can speak English. — Ағылшынша біледі.","He can't play piano. — Пианино ойнай алмайды.","Can you help me? — Маған көмектесе аласыз ба?"]
},
{ title:"⚠️ MUST / MUSTN'T — міндет/тыйым",
text:`Must = міндетті, тиіс (strong obligation)\nMustn't = тыйым (prohibition — жасауға болмайды!)`,
tag:"Must + V1 (strong)",
examples:["You must wear a seatbelt. — Міндетті.","Students must do homework.","You mustn't smoke here. — Тыйым!","You mustn't run in the corridor."]
},
{ title:"💡 SHOULD / SHOULDN'T — кеңес",
text:`Should = кеңес (it's a good idea)\nShouldn't = кеңес бермеу`,
tag:"Should + V1 (advice)",
examples:["You should eat vegetables. — Жегенің жөн.","She should sleep early.","You shouldn't eat too much sugar.","He shouldn't watch TV all day."]
},
{ title:"🔓 MAY / MIGHT — рұқсат/мүмкіндік",
text:`May = рұқсат сұрау немесе мүмкіндік\nMight = аз мүмкіндік`,
tag:"May + V1",
examples:["May I come in? — Кіруге болады ма?","It may rain tomorrow. — Жаңбыр жауып қалуы мүмкін.","She might be late."]
},
],
tips:[
"💡 БАРЛЫҚ modal verbs кейін V1 (to жоқ!): She can SWIM (to swim емес!).",
"💡 Must ≠ Should: Must = міндетті. Should = кеңес.",
"💡 Mustn't = жасауға болмайды (тыйым). Don't have to = міндетті емес (ерікті).",
],
mistakes:[
"❌ She can to swim → ✅ She can swim",
"❌ He musts go → ✅ He must go (modal-ға -s/-es жалғанбайды!)",
"❌ You should to study → ✅ You should study",
]
},
questions:[
{id:"g6c1",diff:"easy",text:"She ___ speak three languages.",opts:["can","musts","cans","to can"],ans:"can",exp:"Can = іскерлік/мүмкіндік. Modal verbs өзгермейді: can (cans емес!)."},
{id:"g6c2",diff:"easy",text:"You ___ wear a helmet when cycling.",opts:["can","should","may","musts"],ans:"should",exp:"Should = кеңес, ұсыным ('It's a good idea to wear a helmet')."},
{id:"g6c3",diff:"easy",text:"Students ___ be quiet during the exam.",opts:["can","should","mustn't","must"],ans:"must",exp:"Must = міндеттілік (strong obligation). Емтихан кезінде тыныш болу міндетті."},
{id:"g6c4",diff:"easy",text:"___ I use your pen, please?",opts:["Must","Should","May","Can't"],ans:"May",exp:"May =礼貌 сұрау (рұқсат сұрау). 'May I...' — сыпайы нұсқа."},
{id:"g6c5",diff:"easy",text:"He ___ swim. He is afraid of water.",opts:["can","can't","must","should"],ans:"can't",exp:"Can't = іскерлік жоқ. Ол жүзе алмайды."},
{id:"g6c6",diff:"medium",text:"You ___ eat in the library. It's not allowed.",opts:["should","can","mustn't","might"],ans:"mustn't",exp:"Mustn't = тыйым (prohibition). 'Not allowed' = рұқсат жоқ."},
{id:"g6c7",diff:"medium",text:"You look tired. You ___ go to bed early.",opts:["must","can","should","may"],ans:"should",exp:"Should = кеңес. 'You look tired' — кеңес беруді білдіреді."},
{id:"g6c8",diff:"medium",text:"It ___ rain tomorrow. Take an umbrella.",opts:["must","can","may","should"],ans:"may",exp:"May = мүмкіндік (maybe). Жаңбыр жауып қалуы мүмкін."},
{id:"g6c9",diff:"medium",text:"She ___ play piano very well. She practises every day.",opts:["must","can","should","may"],ans:"can",exp:"Can = іскерлік. Ол пианино ойнай алады."},
{id:"g6c10",diff:"medium",text:"You ___ touch that! It's dangerous.",opts:["should","can","mustn't","might"],ans:"mustn't",exp:"Mustn't = тыйым. Қауіпті нәрсені ұстауға болмайды."},
{id:"g6c11",diff:"hard",text:"He is a doctor. He ___ work long hours. He ___ take enough rest too.",opts:["must / should","should / must","can / should","must / can"],ans:"must / should",exp:"Must = жұмыс саат міндеті. Should = кеңес (дем алу)."},
{id:"g6c12",diff:"hard",text:"___ you speak louder? I ___ hear you very well.",opts:["Can / can't","Must / mustn't","Should / shouldn't","May / might not"],ans:"Can / can't",exp:"Can you...? = өтіну. Can't hear = ести алмаймын (іскерлік жоқ)."},
{id:"g6c13",diff:"hard",text:"Students ___ use their phones in class. It's the school rule.",opts:["must","should","mustn't","can"],ans:"mustn't",exp:"Мектеп ережесі = тыйым → Mustn't."},
{id:"g6c14",diff:"hard",text:"You ___ eat more vegetables. They're good for health. But you ___ eat too many sweets.",opts:["should / shouldn't","must / mustn't","can / can't","may / might not"],ans:"should / shouldn't",exp:"Денсаулыққа байланысты кеңес → Should/Shouldn't."},
{id:"g6c15",diff:"hard",text:"Find the INCORRECT sentence:",opts:["She can play tennis.","You must to wear a uniform.","May I open the window?","You shouldn't stay up late."],ans:"You must to wear a uniform.",exp:"ҚАТЕ: 'must to wear' → ДҰРЫС: 'must wear'. Modal verbs кейін to жоқ!"},
]
},
{
id:"g6d", title:"Future Simple & Going to", subtitle:"Болашақ шақ",
icon:"🚀", color:"#059669",
darynNote:"Daryn 6-сынып: will (болжам/шешім) және be going to (жоспар/алдын-ала белгілі). Екеуінің айырмасы да тексеріледі.",
explanation:{
intro:`Болашақ шақты ағылшынша екі жолмен білдіруге болады: WILL (жылдам шешім, болжам) және BE GOING TO (жоспарлаған іс, алдын-ала белгілі). Daryn 6-сынып тестінде бұл екеуін ажырата білу маңызды.`,
sections:[
{ title:"🔮 WILL — жылдам шешім / болжам / уәде",
text:`Will — сол сәтте жасалған шешім немесе болжам.\n\nSubject + will + V1`,
tag:"will + V1",
examples:["'I'm cold.' — 'I'll close the window.' (жылдам шешім)","I think it will rain tomorrow. (болжам)","I will help you with your homework. (уәде)","Will you come to the party? (сұраулы)","She won't be late. (болымсыз = will not)"]
},
{ title:"📅 BE GOING TO — жоспар / алдын-ала белгілі",
text:`Be going to — алдын-ала жоспарланған іс немесе алдын-ала белгілі болашақ.\n\nSubject + am/is/are + going to + V1`,
tag:"am/is/are going to + V1",
examples:["She is going to study medicine. (жоспар)","Look at those clouds! It's going to rain. (алдын-ала белгілі)","They are going to visit London next summer. (жоспар)","Are you going to watch the film? (сұраулы)"]
},
{ title:"⚖️ Will vs Going to айырмасы",
text:``,
tag:"Айырмасы — маңызды!",
examples:["Жылдам шешім → WILL: 'The phone is ringing!' — 'I'll answer it!'","Жоспар → GOING TO: 'I'm going to call him tonight.' (алдын-ала ойлаған)","Болжам (дәлел жоқ) → WILL: I think she will win.","Болжам (дәлел бар) → GOING TO: Look! She is going to win! (жеңіп келе жатыр)"]
},
],
tips:[
"💡 'I think...' / 'probably' / 'maybe' → WILL.",
"💡 Look! / Watch! + болашақ болжам → GOING TO.",
"💡 Жоспар (алдын-ала шешілген) → GOING TO.",
"💡 Won't = will not (болымсыз). Aren't going to (болымсыз going to).",
],
mistakes:[
"❌ She will to come → ✅ She will come (to жоқ!)",
"❌ I am going study → ✅ I am going TO study",
"❌ He gos to play → ✅ He is going to play",
]
},
questions:[
{id:"g6d1",diff:"easy",text:"'The phone is ringing!' — 'I ___ answer it.'",opts:["am going to","will","going to","am will"],ans:"will",exp:"Жылдам шешім (сол сәтте) → WILL. 'I'll answer it!'"},
{id:"g6d2",diff:"easy",text:"She ___ (go) to London next summer. She has already bought the tickets.",opts:["will go","is going to go","goes","go"],ans:"is going to go",exp:"Алдын-ала жоспарланған (билет сатып алды) → BE GOING TO."},
{id:"g6d3",diff:"easy",text:"I think it ___ (be) cold tomorrow.",opts:["is","will be","is going to be","be"],ans:"will be",exp:"'I think' + болжам (дәлел жоқ) → WILL."},
{id:"g6d4",diff:"easy",text:"___ you ___ (help) me with my homework, please?",opts:["Will / help","Are / going help","Do / will help","Are / going to help"],ans:"Will / help",exp:"Өтіну (request) → Will you + V1?"},
{id:"g6d5",diff:"easy",text:"Look at those dark clouds! It ___ (rain).",opts:["will rain","is going to rain","rains","rained"],ans:"is going to rain",exp:"Look! + дәлел (қара бұлт) → GOING TO. Алдын-ала белгілі."},
{id:"g6d6",diff:"medium",text:"She ___ (not/come) to school tomorrow. She is ill.",opts:["won't come","isn't going to come","doesn't come","both A and B"],ans:"both A and B",exp:"Жоспарланған (болмайды) немесе болжам ретінде Won't ЖӘНЕ Isn't going to екеуі де дұрыс."},
{id:"g6d7",diff:"medium",text:"'There's no milk.' — 'Don't worry, I ___ buy some.'",opts:["am going to","will","am about to","both A and B"],ans:"will",exp:"Дүкенге барудың жоспары жоқ болатын — сол сәтте жасалған шешім → WILL."},
{id:"g6d8",diff:"medium",text:"___ she ___ (study) at university next year?",opts:["Will / study","Is / going to study","Does / study","both A and B"],ans:"both A and B",exp:"Will she study? немесе Is she going to study? — екеуі де болашақ сұраулы сөйлем ретінде дұрыс."},
{id:"g6d9",diff:"medium",text:"He has decided: he ___ (become) a doctor.",opts:["will become","is going to become","becomes","both A and B"],ans:"is going to become",exp:"Алдын-ала шешілген жоспар → GOING TO. 'He has decided' деген нақты мысал."},
{id:"g6d10",diff:"medium",text:"I think electric cars ___ (replace) petrol cars soon.",opts:["replace","will replace","are going to replace","replaced"],ans:"will replace",exp:"'I think' + болжам (дәлел жоқ) → WILL replace."},
{id:"g6d11",diff:"hard",text:"She looks pale. She ___ (faint)!",opts:["will faint","is going to faint","faints","is fainting"],ans:"is going to faint",exp:"Look! + дәлел бар (pale/солғын) → GOING TO. Алдын-ала белгілі нәтиже."},
{id:"g6d12",diff:"hard",text:"'My bag is too heavy!' — 'Give it to me. I ___ carry it for you.'",opts:["am going to","will","carry","both are fine"],ans:"will",exp:"Жылдам шешім (сол сәтте) → WILL. Going to болмайды (жоспарланбаған)."},
{id:"g6d13",diff:"hard",text:"Next year, our school ___ (build) a new sports hall.",opts:["will build","is going to build","builds","both A and B"],ans:"both A and B",exp:"Жоспар (алдын-ала белгілі) → going to. Болжам → will. Контекстсіз екеуі де дұрыс."},
{id:"g6d14",diff:"hard",text:"Find the INCORRECT future sentence:",opts:["I will help you tomorrow.","She is going to visit her grandmother.","He will to call you later.","They aren't going to come."],ans:"He will to call you later.",exp:"ҚАТЕ: 'will to call' → ДҰРЫС: 'will call'. Will кейін to жоқ!"},
{id:"g6d15",diff:"hard",text:"Choose the BEST option:\n'Look at the score! Our team ___win the match!'",opts:["will","is going to","won't","might"],ans:"is going to",exp:"Look! + нақты дәлел (счет) → GOING TO. Алдын-ала белгілі нәтиже."},
]
},
{
id:"g6e", title:"Сөздік қор", subtitle:"Ауа-райы, денсаулық, саяхат",
icon:"🌍", color:"#d97706",
darynNote:"Daryn 6-сынып сөздік: ауа-райы (weather), ауырулар мен денсаулық (health/illness), саяхат (travel/transport), сан есімдер (ordinal numbers), түстер мен сипаттамалар.",
explanation:{
intro:`Daryn 6-сынып тестінде сөздік қор тапсырмаларын дұрыс орындау үшін ауа-райы, денсаулық, саяхат тақырыптары бойынша сөздерді меңгеру керек.`,
sections:[
{ title:"🌤️ Ауа-райы (Weather)",
text:``,
tag:"Weather vocabulary",
examples:["sunny — күн шуақты","cloudy — бұлтты","foggy — тұманды","snowy — қарлы","stormy — дауылды","drizzle — сүйретпе жаңбыр","hail — бұршақ","breeze — жеңіл желсамал","humid — ылғалды","chilly — сәл суық"]
},
{ title:"🏥 Денсаулық (Health & Illness)",
text:``,
tag:"Health vocabulary",
examples:["headache — бас ауыру","stomachache — іш ауыру","toothache — тіс ауыру","sore throat — тамақ ауыру","fever — температура","sneeze — түшкіру","cough — жөтелу","pharmacy — дәріхана","prescription — рецепт","symptom — белгі"]
},
{ title:"✈️ Саяхат (Travel & Transport)",
text:``,
tag:"Travel vocabulary",
examples:["departure — ұшу/жүру уақыты","arrival — келу уақыты","boarding pass — посадка билеті","luggage/baggage — жүк/сумка","customs — кеден","platform — перрон","fare — жол ақысы","journey — ұзақ саяхат","trip — қысқа саяхат","destination — мақсатты орын"]
},
{ title:"🔢 Реттік сандар (Ordinal Numbers)",
text:``,
tag:"1st to 31st",
examples:["1st=first, 2nd=second, 3rd=third","4th=fourth, 5th=fifth, 8th=eighth","9th=ninth, 12th=twelfth","20th=twentieth, 21st=twenty-first","Күн жазуда: on 15th March / on March 15th"]
},
],
tips:[
"💡 Journey (ұзақ, ресми) vs Trip (қысқа, бейресми) — айырмасын бел.",
"💡 I have a headache / stomachache (have + ауру атауы).",
"💡 8th = eighth (ерекше жазылуы). 12th = twelfth.",
],
mistakes:[
"❌ I have headache → ✅ I have A headache",
"❌ He is sick of fever → ✅ He has a fever",
"❌ 21th → ✅ 21st (twenty-first)",
]
},
questions:[
{id:"g6e1",diff:"easy",text:"When there is no sun and the sky is grey, we say it is ___.",opts:["sunny","windy","cloudy","stormy"],ans:"cloudy",exp:"Cloudy = бұлтты. Күн жоқ, аспан сұр."},
{id:"g6e2",diff:"easy",text:"She has a pain in her head. She has a ___.",opts:["stomachache","headache","toothache","backache"],ans:"headache",exp:"Head pain = headache (бас ауыру)."},
{id:"g6e3",diff:"easy",text:"You need this document to get on a plane:",opts:["passport","platform","luggage","boarding pass"],ans:"boarding pass",exp:"Boarding pass = посадка талоны. Ұшаққа мінуге қажет."},
{id:"g6e4",diff:"easy",text:"What is 5th in words?",opts:["fiveth","fifth","fifeth","fiftieth"],ans:"fifth",exp:"5th = fifth (ережесіз форма, жаттап алу керек)."},
{id:"g6e5",diff:"easy",text:"The medicine you take when you are ill:",opts:["symptom","prescription","pharmacy","tablet"],ans:"tablet",exp:"Tablet = таблетка (дәрі). Pharmacy = дәріхана (дүкен)."},
{id:"g6e6",diff:"medium",text:"Small, light rain that is not heavy is called ___.",opts:["hail","drizzle","storm","blizzard"],ans:"drizzle",exp:"Drizzle = сүйретпе (майда) жаңбыр. Hail = бұршақ. Storm = дауыл."},
{id:"g6e7",diff:"medium",text:"What is the difference between 'journey' and 'trip'?",opts:["No difference","Journey=short, trip=long","Journey=long/formal, trip=short/informal","Trip=formal, journey=informal"],ans:"Journey=long/formal, trip=short/informal",exp:"Journey — ұзақ, ресми саяхат. Trip — қысқа, бейресми сапар."},
{id:"g6e8",diff:"medium",text:"The place where you check your bags at the airport:",opts:["platform","customs","check-in","departure"],ans:"check-in",exp:"Check-in = тіркеу орны (сумканы тапсырасың). Customs = кеден тексерісі."},
{id:"g6e9",diff:"medium",text:"The doctor wrote a ___ for some medicine.",opts:["symptom","prescription","recipe","fare"],ans:"prescription",exp:"Prescription = дәрігердің рецепті. Recipe = тамақ рецепті (басқа!)."},
{id:"g6e10",diff:"medium",text:"It's ___ today — very wet air but no rain.",opts:["foggy","humid","drizzling","stormy"],ans:"humid",exp:"Humid = ылғалды ауа (жаңбырсыз). Foggy = тұман."},
{id:"g6e11",diff:"hard",text:"Choose the CORRECT sentence about health:",opts:["I have a fever.","I have fever.","I am have headache.","She has the stomachache."],ans:"I have a fever.",exp:"Have + a + ауру атауы: I have A fever. Headache → a headache. Stomachache → a stomachache (the емес!)."},
{id:"g6e12",diff:"hard",text:"The correct ordinal for '22':",opts:["22th","22nd","22st","twentytwo-th"],ans:"22nd",exp:"22nd = twenty-second. 2-мен аяқталатын сандар: -nd (2nd, 22nd, 32nd)."},
{id:"g6e13",diff:"hard",text:"The price you pay for a bus or train ticket:",opts:["fee","fare","bill","fine"],ans:"fare",exp:"Fare = транспорт жол ақысы (bus fare, train fare). Fee = кәсіби қызмет ақысы. Fine = айыппұл."},
{id:"g6e14",diff:"hard",text:"At the airport, your bags are checked here for security:",opts:["customs","check-in desk","security check","departure gate"],ans:"security check",exp:"Security check = қауіпсіздік тексерісі (металл детектор, сумка рентгені)."},
{id:"g6e15",diff:"hard",text:"Which sentence is CORRECT?",opts:["We went in a long journey.","We took a long journey.","We made a long journey.","We did a long journey."],ans:"We took a long journey.",exp:"Take a journey/trip — дұрыс коллокация. Make немесе go on да қолданылады. Go in — дұрыс ЕМЕС."},
]
},
{
id:"g6f", title:"Шақтардың айырмасы", subtitle:"PS vs PC vs PP vs Future",
icon:"⏱️", color:"#7c3aed",
darynNote:"Daryn 6-сынып: I lost vs I have lost vs I was losing — шақтардың нақты айырмасы ең жиі тапсырма. Signal words арқылы анықтау дағдысы тексеріледі.",
explanation:{
intro:`Ағылшын тілінің ең қиын тақырыбы — Past Simple, Past Continuous, Present Perfect шақтарының айырмасы. Daryn 6-сынып олимпиадасында осы шақтарды ажырата білу міндетті.`,
sections:[
{ title:"📊 Шақтардың жылдам салыстырмасы",
text:``,tag:"Signal words арқылы ажырат",
examples:["PAST SIMPLE: аяқталған нақты өткен → yesterday, ago, last week, in 2020","PAST CONTINUOUS: үдерісте болды (was/were+ing) → while, when, at 3 pm","PRESENT PERFECT: өткен+қазір байланысты → just, already, yet, ever, never, since, for","FUTURE WILL: жылдам шешім/болжам → I think, probably","FUTURE GOING TO: жоспар/дәлел → Look! / She has decided to..."]
},
{ title:"🔵 Past Simple vs Present Perfect",
text:`I LOST my keys. → Жоғалттым (нақты өткен, қашан? белгісіз)\nI HAVE LOST my keys. → Жоғалттым (қазір де жоқ — нәтиже бар!)`,
tag:"нақты уақыт → PS | нәтиже/тәжірибе → PP",
examples:["She VISITED Paris in 2019. (in 2019 → Past Simple!)","She HAS VISITED Paris. (тәжірибе, қашан? маңызды емес → PP)","I SAW him yesterday. (yesterday → Past Simple!)","I HAVE JUST SEEN him. (just → Present Perfect!)","Did you eat? (жалпы сұрақ) vs Have you eaten yet? (yet → PP)"]
},
{ title:"🟡 Past Simple vs Past Continuous",
text:`WAS DOING = үдерісте болды (ұзақ, фон)\nDID = кесіп өтті немесе жылдам оқиға`,
tag:"While + PC | When + PS кесіп өтті",
examples:["She WAS READING when the phone RANG.","While he WAS SLEEPING, she COOKED dinner.","They WERE PLAYING at 5 pm. (нақты уақытта үдеріс)"]
},
],
tips:["💡 Yesterday/ago/in 2020 → МІНДЕТТІ ТҮРДЕ Past Simple.","💡 Just/already/yet/ever/never/since/for → Present Perfect.","💡 While/when + үдеріс → Past Continuous. When + нақты → Past Simple."],
mistakes:["❌ I have seen him yesterday → ✅ I saw him yesterday (yesterday → PS!)","❌ She was cook → ✅ She was cooking (-ing!)","❌ When I arrived she cooked → ✅ she was cooking (үдеріс фон)"]
},
questions:[
{id:"g6f1",diff:"easy",text:"I ___ (lose) my phone. I can't find it anywhere!",opts:["lost","have lost","was losing","lose"],ans:"have lost",exp:"Нәтиже қазір маңызды (қазір де жоқ) → Present Perfect: have lost."},
{id:"g6f2",diff:"easy",text:"She ___ (visit) Paris in 2021.",opts:["visited","has visited","was visiting","visits"],ans:"visited",exp:"Нақты өткен уақыт 'in 2021' → Past Simple: visited."},
{id:"g6f3",diff:"easy",text:"While she ___ (cook), her sister ___ (call).",opts:["cooked / called","was cooking / called","cooked / was calling","was cooking / was calling"],ans:"was cooking / called",exp:"While + үдеріс (was cooking) кесіп өтті (called). While + PC, PS."},
{id:"g6f4",diff:"easy",text:"I ___ (just / finish) my homework.",opts:["just finished","have just finished","was finishing","just finish"],ans:"have just finished",exp:"Just → Present Perfect: have just finished."},
{id:"g6f5",diff:"easy",text:"'The phone is ringing!' — 'I ___ answer it.'",opts:["am going to","will","going to","am"],ans:"will",exp:"Жылдам шешім (сол сәтте) → will. I'll answer it!"},
{id:"g6f6",diff:"medium",text:"___ you ever ___ (try) sushi?",opts:["Did / try","Have / tried","Were / trying","Do / try"],ans:"Have / tried",exp:"Ever → Present Perfect: Have you ever tried? V3 (tried)."},
{id:"g6f7",diff:"medium",text:"They ___ (play) football at 4 pm yesterday.",opts:["played","have played","were playing","play"],ans:"were playing",exp:"Нақты уақытта (at 4 pm) жүріп жатқан үдеріс → Past Continuous: were playing."},
{id:"g6f8",diff:"medium",text:"She ___ (not/see) him since last Monday.",opts:["didn't see","hasn't seen","wasn't seeing","doesn't see"],ans:"hasn't seen",exp:"Since → Present Perfect болымсыз: hasn't seen."},
{id:"g6f9",diff:"medium",text:"I ___ (meet) him tomorrow at 6. We arranged it last week.",opts:["will meet","am going to meet","am meeting","meet"],ans:"am meeting",exp:"Алдын-ала белгіленген кездесу (уақыт+орын белгілі) → Present Continuous."},
{id:"g6f10",diff:"medium",text:"When I ___ (arrive), she ___ (already/leave).",opts:["arrived / already left","arrived / had already left","was arriving / left","arrived / has already left"],ans:"arrived / had already left",exp:"Arrived (PS) кезінде ол бұрын кеткен → Past Perfect: had already left."},
{id:"g6f11",diff:"hard",text:"Find the sentence with the WRONG tense:",opts:["She has visited London twice.","I saw him yesterday.","They have arrived last night.","He was sleeping when I called."],ans:"They have arrived last night.",exp:"'Last night' → нақты өткен → Past Simple: They ARRIVED last night. (PP + last night = қате!)"},
{id:"g6f12",diff:"hard",text:"'Why are you tired?' — 'I ___ (run) for an hour.'",opts:["ran","was running","have been running","run"],ans:"have been running",exp:"Жаңа ғана аяқталған, нәтиже бар (шаршаған) → Present Perfect Continuous: have been running."},
{id:"g6f13",diff:"hard",text:"She ___ to London before, so she ___ where to go.",opts:["has been / knew","has been / knows","went / knows","went / knew"],ans:"has been / knows",exp:"PP тәжірибе (has been). Сол тәжірибе қазір де маңызды → knows (Present Simple)."},
{id:"g6f14",diff:"hard",text:"Look at those black clouds! It ___ (rain).",opts:["will rain","is going to rain","rains","is raining"],ans:"is going to rain",exp:"Look! + дәлел бар (қара бұлт) → going to. Алдын-ала белгілі болжам."},
{id:"g6f15",diff:"hard",text:"Choose ALL correct sentences:",opts:["I have seen him yesterday.","She was cooking when he arrived.","They have just left.","B and C are both correct."],ans:"B and C are both correct.",exp:"B дұрыс: was cooking+arrived. C дұрыс: have just left (just+PP). A ҚАТЕ: yesterday → Past Simple!"},
]
},
{
id:"g6g", title:"Gerund vs Infinitive", subtitle:"like doing / want to do",
icon:"🔤", color:"#059669",
darynNote:"Daryn 6-сынып олимпиадасы: Gerund (-ing) vs Infinitive (to+V1) — ең жиі кездесетін тақырып. Қай етістіктен кейін не келеді — жаттап алу керек.",
explanation:{
intro:`Gerund (V-ing) және Infinitive (to+V1) — ағылшын тілінің маңызды тақырыбы. Қай етістіктен кейін қайсысы келетінін жаттап алу олимпиада тапсырмаларын дұрыс орындаудың кілті.`,
sections:[
{ title:"🔴 Gerund (-ing) алатын етістіктер",text:``,tag:"+ V-ing",
examples:["enjoy: I enjoy swimming.","finish: She finished reading.","mind: Do you mind waiting?","avoid: He avoids eating sugar.","suggest: She suggested going out.","keep: Keep trying!","miss: I miss living in Almaty.","consider: She's considering leaving."]
},
{ title:"🔵 Infinitive (to+V1) алатын етістіктер",text:``,tag:"+ to + V1",
examples:["want: I want to eat.","decide: She decided to leave.","promise: He promised to help.","agree: They agreed to come.","refuse: She refused to answer.","hope: I hope to see you.","learn: She learned to drive.","plan: They plan to visit."]
},
{ title:"🟡 Екі формамен + мағынасы өзгеретіндер",text:``,tag:"remember/stop/try — мағынасы ӨЗГЕРЕДІ!",
examples:["REMEMBER to call. (ұмытпа — болашақ) ≠ I remember calling. (есімде — өткен)","STOP smoking. (тастады) ≠ He stopped to smoke. (тоқтап тартты)","TRY adding salt. (байқап көр) ≠ Try to open it. (ашуға тырыс)"]
},
{ title:"📌 Демеуліктен кейін — міндетті -ing",text:`Preposition + V-ing МІНДЕТТІ!`,tag:"Preposition + V-ing",
examples:["interested IN reading","good AT swimming","afraid OF flying","tired OF waiting","before leaving / after arriving"]
},
],
tips:["💡 Enjoy/finish/mind/avoid/suggest/keep → МІНДЕТТІ ТҮРДЕ -ing.","💡 Want/decide/promise/agree/refuse/hope → МІНДЕТТІ ТҮРДЕ to.","💡 Preposition + -ing: interested IN doing (to do ❌)."],
mistakes:["❌ I enjoy to swim → ✅ I enjoy swimming","❌ She refused going → ✅ She refused to go","❌ interested to learn → ✅ interested in learning"]
},
questions:[
{id:"g6g1",diff:"easy",text:"I enjoy ___ (swim) in the sea.",opts:["swim","to swim","swimming","to swimming"],ans:"swimming",exp:"Enjoy + Gerund (-ing): enjoy swimming."},
{id:"g6g2",diff:"easy",text:"She promised ___ (help) me.",opts:["helping","help","to help","to helping"],ans:"to help",exp:"Promise + Infinitive: promised to help."},
{id:"g6g3",diff:"easy",text:"He avoided ___ (look) at her.",opts:["to look","look","looking","to looking"],ans:"looking",exp:"Avoid + Gerund: avoided looking."},
{id:"g6g4",diff:"easy",text:"They decided ___ (go) to London.",opts:["going","go","to going","to go"],ans:"to go",exp:"Decide + Infinitive: decided to go."},
{id:"g6g5",diff:"easy",text:"She is good ___ (play) chess.",opts:["to play","at playing","in playing","for play"],ans:"at playing",exp:"Good AT + Gerund: good at playing. (Preposition + -ing)"},
{id:"g6g6",diff:"medium",text:"Do you mind ___ the window?",opts:["to open","open","opening","opened"],ans:"opening",exp:"Mind + Gerund: Do you mind opening?"},
{id:"g6g7",diff:"medium",text:"She kept ___ even though she was tired.",opts:["to run","run","running","to running"],ans:"running",exp:"Keep + Gerund: kept running (жалғастырды)."},
{id:"g6g8",diff:"medium",text:"Remember ___ your homework tomorrow!",opts:["doing","do","to do","done"],ans:"to do",exp:"Remember to do = ұмытпа (болашақ). Remember doing = есімде (өткен)."},
{id:"g6g9",diff:"medium",text:"He stopped ___ when the teacher came in.",opts:["talk","to talk","talking","talked"],ans:"talking",exp:"Stop + Gerund = сөйлеуді тоқтатты. Stop to talk = тоқтап сөйлеуге кетті."},
{id:"g6g10",diff:"medium",text:"I'm interested ___ learning more about AI.",opts:["in","to","of","at"],ans:"in",exp:"Interested IN + Gerund. Preposition 'in' — -ing міндетті."},
{id:"g6g11",diff:"hard",text:"She suggested ___ a film, but he refused ___ stay in.",opts:["watching / to","to watch / to","watching / to not","to watch / to not"],ans:"watching / to",exp:"Suggest + -ing (watching). Refused + to (refused to stay in)."},
{id:"g6g12",diff:"hard",text:"I'll never forget ___ the Northern Lights for the first time.",opts:["to see","see","seeing","seen"],ans:"seeing",exp:"Forget + -ing = ұмытпаймын (өткен тәжірибе). Forget to do = ұмытып қалдым."},
{id:"g6g13",diff:"hard",text:"He tried ___ the box, but it was too heavy. Then he tried ___ a screwdriver.",opts:["lifting / to use","to lift / using","lifting / using","to lift / to use"],ans:"to lift / using",exp:"Try to lift = тырысты (бірақ болмады). Try using = байқап көр (ұсыным)."},
{id:"g6g14",diff:"hard",text:"Find the INCORRECT sentence:",opts:["She enjoys painting.","He agreed to come.","They are tired of waiting.","I hope seeing you soon."],ans:"I hope seeing you soon.",exp:"Hope + Infinitive: I hope TO SEE you soon. (hope + -ing = ҚАТЕ)"},
{id:"g6g15",diff:"hard",text:"After ___ the exam, she felt relieved. Before ___ home, she called her mum.",opts:["finishing / going","to finish / going","finishing / to go","to finish / to go"],ans:"finishing / going",exp:"After/Before + Gerund: after finishing, before going. Preposition + -ing міндетті!"},
]
},
{
id:"g6h", title:"Артикльдер & Демеуліктер", subtitle:"the sun / Christmas / afraid of / good at",
icon:"📎", color:"#d97706",
darynNote:"Daryn 6-сынып: артикльдер (the sun/Christmas/at school) + тұрақты демеулік тіркестер (afraid of/interested in/good at) + too/enough/adjective vs adverb.",
explanation:{
intro:`Артикльдер мен демеуліктер — ағылшын тілінің ең күрделі тақырыптарының бірі. Daryn 6-сынып тестінде ерекше жағдайларды және тұрақты тіркестерді жаттап алу міндетті.`,
sections:[
{ title:"🔵 THE — ерекше жағдайлар",text:``,tag:"THE міндетті болатын жерлер",
examples:["THE + жерде жалғыз: the sun, the moon, the Earth, the sky","THE + өзен/теңіз: the Nile, the Atlantic, the Pacific","THE + United/States бар елдер: the USA, the UK, the UAE","THE + үстеулік дәреже: the best, the most beautiful","THE + музыкалық аспаптар: the piano, the guitar, the violin"]
},
{ title:"⚪ НӨЛДІК артикль (Zero Article)",text:``,tag:"Артикль жоқ — жаттап алу!",
examples:["Мерекелер: Christmas, Nauryz, Easter (the Christmas ❌)","Тамақтану: at breakfast, after lunch","Мекемелер (мақсат): at school, in hospital, at work, in bed","Тіл/спорт/пән: English, football, Maths","Қалалар: Almaty, London (the Almaty ❌)"]
},
{ title:"🔗 Тұрақты демеулік тіркестер",text:`Жаттап алу — ережесі жоқ!`,tag:"Adjective/Verb + Preposition",
examples:["afraid OF: afraid of dogs","good AT: good at Maths","interested IN: interested in art","fond OF: fond of music","tired OF: tired of waiting","insist ON: insist on leaving","on TV / on the radio / at home / at work"]
},
{ title:"💡 Adjective vs Adverb + Too/Enough",text:``,tag:"quick/quickly | too/enough",
examples:["quick (adj) → quickly (adv): He runs quickly. (goodly ❌ → well ✅)","TOO + adj + to: too expensive to buy","adj + ENOUGH + to: warm enough to swim","NOT + adj + ENOUGH: not fast enough"]
},
],
tips:["💡 Christmas, Easter, Nauryz — артикль жоқ! (the Christmas ❌)","💡 At school (мақсат) ≠ at the school (ғимарат алдында)","💡 Good/well — She speaks English WELL (goodly ❌)","💡 Too = тым (жағымсыз). Enough = жеткілікті."],
mistakes:["❌ the Christmas → ✅ Christmas","❌ good in Maths → ✅ good AT Maths","❌ He runs good → ✅ He runs well"]
},
questions:[
{id:"g6h1",diff:"easy",text:"___ sun is a star at the centre of our solar system.",opts:["A","An","The","—"],ans:"The",exp:"The sun — жерде жалғыз → THE міндетті."},
{id:"g6h2",diff:"easy",text:"We always give presents at ___.",opts:["the Christmas","a Christmas","Christmas","an Christmas"],ans:"Christmas",exp:"Мерекелерде артикль жоқ: Christmas, Nauryz (the Christmas ❌)."},
{id:"g6h3",diff:"easy",text:"She is afraid ___ dogs.",opts:["from","of","at","about"],ans:"of",exp:"Afraid OF — тұрақты тіркес."},
{id:"g6h4",diff:"easy",text:"He is very good ___ basketball.",opts:["in","at","on","of"],ans:"at",exp:"Good AT — тұрақты тіркес."},
{id:"g6h5",diff:"easy",text:"She runs very ___.",opts:["quick","good","fastly","quickly"],ans:"quickly",exp:"Етістікті сипаттайды → үстеу (adverb): quickly."},
{id:"g6h6",diff:"medium",text:"This film is ___ boring to watch.",opts:["enough","too","very","so"],ans:"too",exp:"TOO + adj = тым (жағымсыз нәтиже): too boring to watch."},
{id:"g6h7",diff:"medium",text:"She didn't buy the dress. It wasn't cheap ___.",opts:["enough","too","very","so"],ans:"enough",exp:"Adj + ENOUGH = жеткілікті. Not cheap enough = жеткілікті арзан емес."},
{id:"g6h8",diff:"medium",text:"My brother is in ___ United Kingdom now.",opts:["the","a","—","an"],ans:"the",exp:"The UK (United бар елдер) → the міндетті."},
{id:"g6h9",diff:"medium",text:"I saw it ___ TV last night. It was ___ best programme.",opts:["on / the","in / a","on / a","at / the"],ans:"on / the",exp:"On TV — тұрақты тіркес. The best — үстеулік дәреже → the."},
{id:"g6h10",diff:"medium",text:"She plays ___ piano beautifully.",opts:["the","a","—","an"],ans:"the",exp:"Музыкалық аспапта → the piano міндетті."},
{id:"g6h11",diff:"hard",text:"He speaks English ___ for a beginner. He's ___ to start a conversation.",opts:["enough well / good enough","well enough / good enough","good enough / well enough","enough / good"],ans:"well enough / good enough",exp:"Speaks → adverb: well enough. Is → adjective: good enough. Орналасу: adv/adj + enough."},
{id:"g6h12",diff:"hard",text:"She is very ___ ___ learning new languages.",opts:["interested / in","interested / at","too / in","enough / in"],ans:"interested / in",exp:"Interested IN — тұрақты тіркес. Very = өте (алдында)."},
{id:"g6h13",diff:"hard",text:"Find the INCORRECT sentence:",opts:["He is tired of waiting.","She is good at singing.","They are afraid of the dark.","I am interested at history."],ans:"I am interested at history.",exp:"ҚАТЕ: interested at → ДҰРЫС: interested IN history."},
{id:"g6h14",diff:"hard",text:"The bag is ___ heavy for me to carry. I need something light ___.",opts:["too / enough","enough / too","too / too","enough / enough"],ans:"too / enough",exp:"Too heavy (тым ауыр). Light enough (жеткілікті жеңіл)."},
{id:"g6h15",diff:"hard",text:"'___ Amazon is ___ longest river in South America.'",opts:["The / the","A / a","The / a","— / the"],ans:"The / the",exp:"The Amazon (өзен → the). The longest (үстеулік → the міндетті)."},
]
},
{
id:"g6i", title:"Сын есім тәртібі & Modal verbs", subtitle:"big red Italian bag | must/may/don't have to",
icon:"🔑", color:"#dc2626",
darynNote:"Daryn 6-сынып: Modal verbs нақты айырмасы (mustn't≠don't have to, can't=мүмкін емес) + бірнеше сын есімнің дұрыс реттілігі (OSASCOMP).",
explanation:{
intro:`Осы тақырыпта маңызды екі ереже: модальді етістіктердің нақты айырмасы және бірнеше сын есімнің дұрыс реттілігі (OSASCOMP).`,
sections:[
{ title:"⚠️ Modal verbs — нақты айырмасы",text:``,tag:"must/mustn't/have to/don't have to",
examples:["MUST = ішкі міндет: I must study. (өзімнің шешімім)","HAVE TO = сыртқы міндет (ереже): I have to wear a uniform.","MUSTN'T = тыйым: You mustn't smoke here. (болмайды!)","DON'T HAVE TO = міндет жоқ: You don't have to come. (ерікті)","MAY = рұқсат/мүмкіндік: You may leave. / It may rain.","MIGHT = аз мүмкіндік: She might be late.","CAN'T = логикалық мүмкін емес: He can't be home — I saw him at school!"]
},
{ title:"📐 Сын есімдердің реттілігі (OSASCOMP)",text:`Opinion → Size → Age → Shape → Colour → Origin → Material`,tag:"Opinion-Size-Age-Shape-Colour-Origin-Material",
examples:["a beautiful big old round brown Italian leather bag","a lovely small new red French silk scarf","an ugly little old square yellow Chinese wooden box"]
},
{ title:"👥 Both / Either / Neither",text:``,tag:"Both(екеуі де) / Either(бірі) / Neither(екеуі де емес)",
examples:["BOTH of the students passed. (екеуі де)","EITHER of the answers is correct. (кез-келгені — жекеше!)","NEITHER of them came. (екеуі де емес — жекеше!)","Both...AND | Either...OR | Neither...NOR"]
},
],
tips:["💡 Mustn't (тыйым) ≠ Don't have to (міндет жоқ) — ҮЛКЕН айырма!","💡 Can't = мүмкін емес (логика).","💡 Сын есім тәртібі: Opinion алдымен, Material соңында.","💡 Either/Neither + жекеше: Neither of them IS (are ❌)."],
mistakes:["❌ don't have to + тыйым → ✅ mustn't + тыйым","❌ a red big old car → ✅ a big old red car (Size-Age-Colour)","❌ Neither of them are → ✅ Neither of them IS"]
},
questions:[
{id:"g6i1",diff:"easy",text:"You ___ be quiet in the library. It's a rule.",opts:["mustn't","don't have to","must","might"],ans:"must",exp:"Ереже/міндет → must. Кітапханада тыныш болу міндетті."},
{id:"g6i2",diff:"easy",text:"It's Saturday! You ___ go to school.",opts:["mustn't","must","don't have to","can't"],ans:"don't have to",exp:"Don't have to = міндет жоқ (сенбіде мектеп жоқ, бірақ тыйым да жоқ)."},
{id:"g6i3",diff:"easy",text:"You ___ smoke in the hospital. It's forbidden.",opts:["don't have to","mustn't","might not","can"],ans:"mustn't",exp:"Mustn't = тыйым (forbidden). Ауруханада темекі тартуға болмайды."},
{id:"g6i4",diff:"easy",text:"Choose the correct order: 'She wore a ___ dress.'",opts:["long beautiful red","beautiful long red","red long beautiful","long red beautiful"],ans:"beautiful long red",exp:"Opinion(beautiful) → Size(long) → Colour(red). OSASCOMP тәртібі."},
{id:"g6i5",diff:"easy",text:"___ of the students passed the exam. They both did well.",opts:["Either","Neither","Both","Some"],ans:"Both",exp:"Both = екеуі де. Екеуі де тапсырды → Both of the students passed."},
{id:"g6i6",diff:"medium",text:"She ___ be at home — I just saw her at the market!",opts:["mustn't","can't","might not","doesn't have to"],ans:"can't",exp:"Can't = логикалық мүмкін емес. Базарда көрдім → үйде болуы мүмкін емес!"},
{id:"g6i7",diff:"medium",text:"It ___ rain tomorrow — take an umbrella just in case.",opts:["must","can't","might","doesn't have to"],ans:"might",exp:"Might = аз мүмкіндік (белгісіз). 'Just in case' = мүмкін болса."},
{id:"g6i8",diff:"medium",text:"Choose the CORRECT order: 'He bought a ___ table.'",opts:["wooden round small old","small old round wooden","old small round wooden","round small old wooden"],ans:"small old round wooden",exp:"Size(small) → Age(old) → Shape(round) → Material(wooden). OSASCOMP."},
{id:"g6i9",diff:"medium",text:"___ of the answers is correct — you can choose either one.",opts:["Both","Neither","Either","None"],ans:"Either",exp:"Either = екеуінің кез-келгені. Either of the answers IS correct (жекеше)."},
{id:"g6i10",diff:"medium",text:"___ of the restaurants was good. We were very disappointed.",opts:["Both","Either","Neither","All"],ans:"Neither",exp:"Neither = екеуі де емес (екеуі де жаман). Neither + жекеше: was."},
{id:"g6i11",diff:"hard",text:"You ___ bring a gift — it's not required. But you ___ be late — it's very rude.",opts:["don't have to / mustn't","mustn't / don't have to","must / can't","might not / mustn't"],ans:"don't have to / mustn't",exp:"Don't have to = міндет жоқ (сыйлық ерікті). Mustn't = тыйым (кешігу өрескел)."},
{id:"g6i12",diff:"hard",text:"'___ she NOR her sister came to the party.' Fill in:",opts:["Neither","Either","Both","Nor"],ans:"Neither",exp:"Neither...NOR: Neither she NOR her sister came. Екеуі де келмеді."},
{id:"g6i13",diff:"hard",text:"Find the CORRECT adjective order:",opts:["a new beautiful small Italian red car","a beautiful small new red Italian car","a small old beautiful blue French car","a beautiful small new Italian red car"],ans:"a beautiful small new red Italian car",exp:"Opinion(beautiful) Size(small) Age(new) Colour(red) Origin(Italian) = beautiful small new red Italian car."},
{id:"g6i14",diff:"hard",text:"He ___ be the thief — he was on holiday abroad when it happened.",opts:["mustn't","can't","doesn't have to","might not"],ans:"can't",exp:"Can't = логикалық мүмкін емес. Шетелде болды → ұры болуы мүмкін емес."},
{id:"g6i15",diff:"hard",text:"Find the sentence with CORRECT usage:",opts:["You don't have to smoke here — it's forbidden.","Neither of the answers are correct.","She might be late, so let's wait.","Both of them must to come tomorrow."],ans:"She might be late, so let's wait.",exp:"Дұрыс: might (мүмкіндік). ҚАТЕ: don't have to→mustn't; are→is; must to→must."},
]
},
{
id:"g6j", title:"Phrasal Verbs & Idioms", subtitle:"look after / my cup of tea / bear in mind",
icon:"🌟", color:"#7c3aed",
darynNote:"Daryn 6-сынып: phrasal verbs (look after/switch on/turn down/give up) + idioms (my cup of tea/Indian summer/bear in mind/once in a blue moon) — олимпиадада айырмашылық жасайтын тақырып.",
explanation:{
intro:`Phrasal Verbs мен Idioms — Daryn 6-сынып олимпиадасында жоғары балл алуға мүмкіндік беретін тақырыптар. Мағынасымен жаттап алу керек.`,
sections:[
{ title:"🔧 Phrasal Verbs — жиі кездесетіндер",text:``,tag:"Verb + Particle = жаңа мағына",
examples:["look after = күту: She looks after her brother.","look for = іздеу: I'm looking for my keys.","look forward to = күту (жақсы сезіммен): I look forward to seeing you.","switch on/off = қосу/өшіру: Switch on the light.","turn down = азайту / бас тарту: Turn down the music. / She turned down the offer.","give up = тастау: He gave up smoking.","take off = шешу / ұшу: Take off your shoes. / The plane took off.","find out = анықтау: I found out the truth."]
},
{ title:"💫 Idioms — мағынасымен",text:`Сөзбе-сөз аудармаға сәйкес келмейді!`,tag:"Идиома → Мағынасы",
examples:["my cup of tea = ұнату: Football is not my cup of tea.","Indian summer = қоңыр күз (күзде жылы ауа-райы)","bear in mind = есте сақтау: Bear in mind that exams start tomorrow.","once in a blue moon = өте сирек","under the weather = өзін нашар сезіну","break a leg! = Сәттілік! (театр тілінде)","hit the books = оқуға кіру"]
},
{ title:"🤝 Real-life English",text:``,tag:"Келісу / Келіспеу / Дүкен тілі",
examples:["Келісу: You're right. / Absolutely! / I agree. / Exactly!","Келіспеу: I don't think so. / Not at all. / I'm afraid I disagree.","Дүкенде: How much is it? / Can I try it on? / Do you have it in blue?","downtown = city centre | attend = go to | sensible = байыпты | exhausted = өте шаршаған"]
},
],
tips:["💡 Look after ≠ look for ≠ look forward to — бәрінің мағынасы басқа!","💡 Look forward TO + -ing (to = preposition → -ing!)","💡 Turn down = азайту (volume) ДА, бас тарту (offer) ДА.","💡 Sensible = байыпты (ЕМЕС sensitive = сезімтал!)"],
mistakes:["❌ look forward to see → ✅ look forward to SEEING","❌ gave up to smoke → ✅ gave up smoking","❌ Not my cup of tea (ұнатса) → ✅ My cup of tea (ұнатса)"]
},
questions:[
{id:"g6j1",diff:"easy",text:"She ___ her little sister while their parents were out.",opts:["looked for","looked after","looked at","looked forward to"],ans:"looked after",exp:"Look after = күту (take care of)."},
{id:"g6j2",diff:"easy",text:"'Football is not my ___ of tea.' What does this mean?",opts:["He likes football","He doesn't like football","He plays badly","He wants tea"],ans:"He doesn't like football",exp:"Not my cup of tea = ұнамайды."},
{id:"g6j3",diff:"easy",text:"Please ___ the TV. I'm trying to sleep.",opts:["switch on","turn down","look after","give up"],ans:"turn down",exp:"Turn down = дыбысты азайту. Ұйықтап жатыр → азайт."},
{id:"g6j4",diff:"easy",text:"___ in mind that the exam starts at 9 am.",opts:["Keep","Bear","Take","Hold"],ans:"Bear",exp:"Bear in mind = есте сақтау. Тұрақты идиома."},
{id:"g6j5",diff:"easy",text:"He ___ smoking after his doctor's advice.",opts:["gave up","put on","took off","switched on"],ans:"gave up",exp:"Give up = тастау. He gave up smoking = темекіні тастады."},
{id:"g6j6",diff:"medium",text:"'She visits us ___ — maybe twice a year.'",opts:["under the weather","once in a blue moon","my cup of tea","bear in mind"],ans:"once in a blue moon",exp:"Once in a blue moon = өте сирек."},
{id:"g6j7",diff:"medium",text:"I'm really ___ the school trip next week!",opts:["looking for","looking after","looking forward to","looking at"],ans:"looking forward to",exp:"Look forward to = жақсы сезіммен күту."},
{id:"g6j8",diff:"medium",text:"The word 'exhausted' means:",opts:["a little tired","very very tired","bored","nervous"],ans:"very very tired",exp:"Exhausted = өте шаршаған (extreme fatigue)."},
{id:"g6j9",diff:"medium",text:"'How much ___ this jacket?' — 'It's 15,000 tenge.'",opts:["is","does","are","do"],ans:"is",exp:"How much IS it/this? — бағаны сұраудың стандартты үлгісі."},
{id:"g6j10",diff:"medium",text:"She turned ___ the job offer because the salary was too low.",opts:["on","off","down","up"],ans:"down",exp:"Turn down = бас тарту (refuse). Turn down an offer."},
{id:"g6j11",diff:"hard",text:"'I'm feeling a bit ___ the weather today.' He means:",opts:["He is outside","He is not feeling well","He loves rain","He is excited"],ans:"He is not feeling well",exp:"Under the weather = өзін нашар сезіну."},
{id:"g6j12",diff:"hard",text:"I look forward to ___ from you soon.",opts:["hear","to hear","heard","hearing"],ans:"hearing",exp:"Look forward TO + Gerund (-ing). 'To' мұнда preposition → -ing!"},
{id:"g6j13",diff:"hard",text:"A 'sensible' person is someone who:",opts:["is emotional","makes good practical decisions","is funny","is brave"],ans:"makes good practical decisions",exp:"Sensible = байыпты, ақылды. Sensitive = сезімтал (басқа!)."},
{id:"g6j14",diff:"hard",text:"'___ a leg at your performance!' This means:",opts:["Be careful","Good luck","Be strong","Run fast"],ans:"Good luck",exp:"Break a leg! = Сәттілік! (театр идиомасы)"},
{id:"g6j15",diff:"hard",text:"Find the INCORRECT sentence:",opts:["She gave up eating fast food.","He looks forward to meeting her.","I found out the answer online.","They look after to the children."],ans:"They look after to the children.",exp:"ҚАТЕ: 'look after to' → ДҰРЫС: look after + object (to жоқ!)."},
]
},
{
id:"g6k", title:"Сөзжасам & Синоним/Антоним", subtitle:"danger→dangerous | brave↔coward",
icon:"📚", color:"#059669",
darynNote:"Daryn 6-сынып: -ous/-al/-ive/-ful жұрнақтары, B1 сөздік (sensible/exhausted/clumsy). Synonym/antonym + логикалық сөз тізбегі тапсырмалары.",
explanation:{
intro:`Сөзжасам (Word Formation), синоним/антоним және B1 сөздік қор — Daryn 6-сынып олимпиадасының лексикалық бөлімі. Жұрнақтарды үйреніп, контексте дұрыс форма таңдай білу маңызды.`,
sections:[
{ title:"📌 Жиі қолданылатын жұрнақтар",text:``,tag:"Noun → Adjective",
examples:["-OUS: danger→dangerous, fame→famous, humour→humorous","-AL: tradition→traditional, nation→national, nature→natural","-IVE: create→creative, effect→effective, attract→attractive","-FUL: care→careful, success→successful, power→powerful","-LESS: care→careless, hope→hopeless, harm→harmless","-LY (adverb): quick→quickly, careful→carefully"]
},
{ title:"🔄 Синоним & Антоним",text:``,tag:"B1 деңгей",
examples:["brave ↔ coward (батыл ↔ қорқақ)","like = be fond of = enjoy (ұнату)","exhausted = worn out = shattered (өте шаршаған)","sensible ↔ foolish (байыпты ↔ ақымақ)","clumsy ↔ graceful (сылбыр ↔ сылаң)","attend = go to | ancient = old ↔ modern"]
},
{ title:"🎯 B1 маңызды сөздер",text:``,tag:"Daryn 6-сынып сөздігі",
examples:["sensible — байыпты, ақылды","clumsy — сылбыр (drops things)","stubborn — қыңыр (doesn't change opinion)","generous — қайырымды","reliable — сенімді","exhausted — өте шаршаған","downtown = city centre | attend = go to"]
},
],
tips:["💡 Sensible ≠ Sensitive: sensible=ақылды, sensitive=сезімтал.","💡 Clumsy ↔ graceful. Exhausted = worn out.","💡 attend school = go to school (ресми баламасы)."],
mistakes:["❌ She is very fame → ✅ She is famous (fame=noun, famous=adj)","❌ He speaks careful → ✅ He speaks carefully","❌ It was danger → ✅ It was dangerous"]
},
questions:[
{id:"g6k1",diff:"easy",text:"The road is very ___. Be careful! (danger)",opts:["danger","dangerously","dangerous","dangered"],ans:"dangerous",exp:"Danger(noun) → dangerous(adjective). After 'is very' → adjective."},
{id:"g6k2",diff:"easy",text:"She is a very ___ student — she never drops anything. (grace)",opts:["graceful","grace","gracefully","graceous"],ans:"graceful",exp:"Grace → graceful (adjective). A graceful student."},
{id:"g6k3",diff:"easy",text:"What is the ANTONYM of 'brave'?",opts:["courageous","coward","bold","fearless"],ans:"coward",exp:"Brave (батыл) ↔ Coward (қорқақ)."},
{id:"g6k4",diff:"easy",text:"'I am ___ of music.' = 'I love music.'",opts:["tired","afraid","fond","bored"],ans:"fond",exp:"Fond of = like/love. Be fond of music."},
{id:"g6k5",diff:"easy",text:"Which word does NOT belong? apple / banana / carrot / grape",opts:["apple","banana","carrot","grape"],ans:"carrot",exp:"Apple, banana, grape — жеміс. Carrot — көкөніс. Logical series."},
{id:"g6k6",diff:"medium",text:"He is ___ — always makes the right decision. (sense)",opts:["sensible","sensitive","senseless","sensibly"],ans:"sensible",exp:"Sensible = байыпты, ақылды. (Sensitive = сезімтал — басқа!)"},
{id:"g6k7",diff:"medium",text:"His ___ (humour) speech made everyone laugh.",opts:["humour","humorous","humorously","humouring"],ans:"humorous",exp:"Humour(noun) → humorous(adj, -ous). A humorous speech."},
{id:"g6k8",diff:"medium",text:"After running 10 km, she was completely ___.",opts:["tired","exhausted","bored","upset"],ans:"exhausted",exp:"Exhausted = өте шаршаған (extreme). 10 km жүгіргеннен кейін."},
{id:"g6k9",diff:"medium",text:"Which word is a SYNONYM for 'attend'?",opts:["avoid","miss","go to","leave"],ans:"go to",exp:"Attend = go to (қатысу). Attend school = go to school."},
{id:"g6k10",diff:"medium",text:"She played the piano ___.",opts:["beautiful","beauty","beautifully","beautify"],ans:"beautifully",exp:"Played (verb) → adverb: beautifully (beautiful + ly)."},
{id:"g6k11",diff:"hard",text:"'She is ___.' — she often breaks or drops things:",opts:["sensible","clumsy","stubborn","reliable"],ans:"clumsy",exp:"Clumsy = сылбыр (неловкий). Antonym: graceful."},
{id:"g6k12",diff:"hard",text:"Her ___ (create) work impressed everyone.",opts:["create","creative","creation","creatively"],ans:"creative",exp:"Adjective before 'work': creative (create → creative, -ive suffix)."},
{id:"g6k13",diff:"hard",text:"Which does NOT fit? doctor / nurse / surgeon / pharmacist / architect",opts:["doctor","nurse","pharmacist","architect"],ans:"architect",exp:"Doctor, nurse, surgeon, pharmacist — медицина. Architect — сәулетші (басқа сала)."},
{id:"g6k14",diff:"hard",text:"'He is very ___.' — very difficult to change his mind:",opts:["generous","reliable","stubborn","clumsy"],ans:"stubborn",exp:"Stubborn = қыңыр. Reliable=сенімді, generous=қайырымды."},
{id:"g6k15",diff:"hard",text:"The ___ (tradition) festival is celebrated every year.",opts:["tradition","traditional","traditionally","traditioned"],ans:"traditional",exp:"Tradition(noun) → traditional(adjective, -al). Before 'festival'."},
]
},
{
id:"g6l", title:"Оқылым & Real-life English", subtitle:"Мәтін + коммуникация дағдылары",
icon:"📖", color:"#0891b2",
darynNote:"Daryn 6-сынып оқылым: 200-300 сөздік мәтін, inference, vocabulary in context. Real-life: келісу/келіспеу, дүкен тілі, мәдени сөздер.",
explanation:{
intro:`Daryn 6-сынып оқылым бөлімі — мәтінді тез түсіну, астарлы мағынаны анықтау дағдыларын тексереді. Real-life English тақырыбы күнделікті коммуникация дағдыларын тексереді.`,
sections:[
{ title:"📖 Оқылым стратегиялары",text:``,tag:"Skimming → Scanning → Inference",
examples:["1. Сұрақтарды алдымен оқы, кілт сөздерді белгіле.","2. Skimming: бірінші & соңғы абзац + тақырыптық сөйлемдер.","3. Scanning: нақты факт іздегенде кілт сөзді іздей.","4. Inference: 'What does the author imply?' → контекстен ойла.","5. However/but=contrast; therefore/so=result; for example=мысал."]
},
{ title:"🤝 Келісу / Келіспеу / Дүкен тілі",text:``,tag:"Real-life English",
examples:["Келісу: You're right. / Absolutely! / I agree. / Exactly!","Жарым-жартылай: I see what you mean, but...","Келіспеу: I don't think so. / Not at all. / I'm afraid I disagree.","Дүкенде: How much is it? / Can I try it on? / Do you have it in blue?","downtown = city centre | attend = participate"]
},
],
tips:["💡 Сұрақтарды алдымен оқы, содан кейін мәтінді оқы.","💡 'According to the text' → тікелей мәтіннен. 'We can infer' → астарлы.","💡 'Not at all' — мүлдем жоқ (бас тарту) немесе 'оқасы жоқ'."],
mistakes:["❌ Жалпы білімге сүйену (мәтіннен ал!)","❌ How much are this? → How much IS this?"]
},
questions:[
{id:"g6l1",diff:"easy",text:"TEXT: 'Almaty is Kazakhstan's largest city. It is home to many museums and universities. The Tian Shan mountains surround the city, making it one of the most beautiful cities in Central Asia.'\n\nWhere is Almaty located?",opts:["Near the sea","By a river","Near the Tian Shan mountains","In the desert"],ans:"Near the Tian Shan mountains",exp:"Scanning: 'The Tian Shan mountains surround the city' — тікелей."},
{id:"g6l2",diff:"easy",text:"From the same text, 'surround' most likely means:",opts:["destroy","are around","are inside","visit"],ans:"are around",exp:"Surround = айналасында болу. Mountains surround = таулар айналасында."},
{id:"g6l3",diff:"easy",text:"'That's a great idea!' — '___. Let's do it!'",opts:["Not at all","I'm afraid I disagree","Absolutely!","I'd rather not"],ans:"Absolutely!",exp:"Absolutely! = толық келісу (complete agreement)."},
{id:"g6l4",diff:"easy",text:"'How ___ is this jacket?' — 'It's 12,000 tenge.'",opts:["many","much","often","long"],ans:"much",exp:"How much = бағаны сұрау. How much is it/this?"},
{id:"g6l5",diff:"easy",text:"'Do you have this in ___?' — asking about colour in a shop:",opts:["size M","blue","cheaper","large"],ans:"blue",exp:"'Do you have it in blue?' = Көк түсі бар ма? Стандартты дүкен тіркесі."},
{id:"g6l6",diff:"medium",text:"TEXT: 'Although social media connects people, experts warn that excessive use leads to anxiety and low self-esteem, especially among teenagers. They recommend limiting screen time to two hours daily.'\n\nWhat do experts recommend?",opts:["Using more social media","Stopping completely","Limiting to 2 hours","Talking to teenagers"],ans:"Limiting to 2 hours",exp:"Scanning: 'recommend limiting screen time to two hours daily' — тікелей."},
{id:"g6l7",diff:"medium",text:"From the same text, 'excessive' use means:",opts:["very little","too much","regular","healthy"],ans:"too much",exp:"Excessive = тым көп (too much)."},
{id:"g6l8",diff:"medium",text:"What can we INFER about teenagers from the text?",opts:["They love social media","Social media can harm mental health","They don't use social media","They disagree with experts"],ans:"Social media can harm mental health",exp:"Inference: anxiety + low self-esteem + especially teenagers → зиян."},
{id:"g6l9",diff:"medium",text:"'I think we should go by train.' — 'I see what you mean, ___ flying is much faster.'",opts:["so","because","but","although"],ans:"but",exp:"I see your point BUT... = жарым-жартылай келіспеу."},
{id:"g6l10",diff:"medium",text:"'Shall I carry that for you?' — '___, thank you. It's quite heavy.'",opts:["Not at all","I'd rather not","That would be great","I'm afraid I disagree"],ans:"That would be great",exp:"Ұсынысты қабылдау: That would be great = Керемет болар еді."},
{id:"g6l11",diff:"hard",text:"TEXT: 'The sharing economy, where people rent goods instead of buying them, is growing rapidly. Apps like Airbnb and Uber lead the way. Critics argue it harms traditional businesses, while supporters say it reduces waste.'\n\nThe main purpose of this text is to:",opts:["Advertise Airbnb","Explain and discuss the sharing economy","Criticise technology","Encourage sharing"],ans:"Explain and discuss the sharing economy",exp:"Main purpose: мәтін sharing economy-ді түсіндіреді (explain) + екі пікір береді (discuss)."},
{id:"g6l12",diff:"hard",text:"From the text, 'critics argue it harms traditional businesses' — who are 'critics'?",opts:["Sharing economy supporters","People who oppose sharing economy","Technology companies","Customers"],ans:"People who oppose sharing economy",exp:"Critics = сынаушылар, қарсылар. 'Harms' → олар sharing economy-ге қарсы."},
{id:"g6l13",diff:"hard",text:"'I'm ___ I disagree with you on that point.' — What tone is this?",opts:["Rude disagreement","Polite disagreement","Full agreement","Surprise"],ans:"Polite disagreement",exp:"'I'm afraid I disagree' = сыпайы келіспеу. 'I'm afraid' сыпайылық белгісі."},
{id:"g6l14",diff:"hard",text:"'She ___ evening classes at the community centre.'",opts:["goes","attends","visits","watches"],ans:"attends",exp:"Attend classes/events = қатысу (ресми B1 сөз). Go to да дұрыс, attends = ресми нұсқа."},
{id:"g6l15",diff:"hard",text:"TEXT: 'Despite the rain, the market was full. Street musicians played cheerful tunes, and the smell of fresh bread filled the air. Children ran between stalls, laughing.'\n\nWhat is the OVERALL mood?",opts:["Gloomy and sad","Lively and cheerful","Quiet and peaceful","Strange and confusing"],ans:"Lively and cheerful",exp:"Despite rain + full of people + cheerful tunes + children laughing = lively and cheerful."},
]
},
]
},
7: {
label:"7-сынып",
darynNote:"7-сынып Daryn олимпиадасы: Present Perfect (just/already/yet/ever/never), Passive Voice (Present/Past), First Conditional. Сөздік: қоршаған орта, денсаулық, технологиялар.",
topics:[
{
id:"g7a", title:"Present Perfect", subtitle:"Аяқталған шақ",
icon:"⭐", color:"#7c3aed",
darynNote:"Daryn 7-сынып: just/already/yet/ever/never/since/for белгілерімен Present Perfect — 10+ сұрақ. Past Simple-мен айырмасы да тексеріледі.",
explanation:{
intro:`Present Perfect — өткен уақытта болған, бірақ ҚАЗІРГІ УАҚЫТПЕН БАЙЛАНЫСЫ БАР іс-әрекеттер. Daryn 7-сынып тестінде бұл шақты Past Simple-мен салыстыра білу өте маңызды.`,
sections:[
{ title:"📐 Формасы (Structure)",
text:`Subject + have/has + V3 (Past Participle)\n\nI/We/You/They → have + V3\nHe/She/It → has + V3`,
tag:"have/has + V3",
examples:["I have visited Paris. — Париж барған едім (тәжірибе).","She has finished her homework. — Аяқтады (нәтиже бар).","They have just arrived. — Жаңа ғана келді.","He has never eaten sushi."]
},
{ title:"🔑 Белгі сөздер (Signal words)",
text:`Present Perfect-ті анықтайтын сөздер:`,
tag:"Белгі сөздер",
examples:["just — жаңа ғана: I have just eaten.","already — қазірдің өзінде: She has already left.","yet — әлі (сұрауда/болымсызда): Have you eaten yet? / I haven't finished yet.","ever — өмірде кезінде: Have you ever been to London?","never — ешқашан: He has never tried sushi.","since — белгілі уақыттан бері: since 2020, since Monday","for — ұзақтық: for 3 years, for a long time"]
},
{ title:"⚖️ Present Perfect vs Past Simple",
text:`Present Perfect — қашан болғаны белгісіз немесе маңызды емес.\nPast Simple — нақты өткен уақытта болған.`,
tag:"PP vs PS айырмасы",
examples:["I have visited London. (Когда? Маңызды емес.)","I visited London in 2020. (Нақты уақыт — Past Simple!)","She has lost her keys. (Нәтиже: кілті жоқ!)","She lost her keys yesterday. (Кеше = Past Simple)"]
},
],
tips:[
"💡 Just/already/yet/ever/never → Present Perfect (Past Simple ЕМЕС!)",
"💡 Yesterday/last week/in 2020/ago → Past Simple (нақты уақыт).",
"💡 Since + уақыт нүктесі: since 2020, since Monday.",
"💡 For + ұзақтық: for three years, for a long time.",
],
mistakes:[
"❌ I have seen him yesterday → ✅ I saw him yesterday (yesterday → Past Simple!)",
"❌ She has went → ✅ She has gone (V3 = gone!)",
"❌ Have you ever went? → ✅ Have you ever been?",
]
},
questions:[
{id:"g7a1",diff:"easy",text:"She ___ (just / finish) her homework.",opts:["just finished","has just finished","have just finished","just finish"],ans:"has just finished",exp:"Just = Present Perfect белгісі. She (3-жақ) → has + V3 (finished)."},
{id:"g7a2",diff:"easy",text:"I ___ (never / be) to Japan.",opts:["never been","have never been","has never been","never was"],ans:"have never been",exp:"Never = PP белгісі. I → have + never + V3 (been). Be → been (V3)."},
{id:"g7a3",diff:"easy",text:"___ you ___ (ever / eat) sushi?",opts:["Did you ever eat","Have you ever eaten","Has you ever eaten","Do you ever eat"],ans:"Have you ever eaten",exp:"Ever = PP белгісі. You → Have you ever + V3 (eaten)?"},
{id:"g7a4",diff:"easy",text:"He ___ (already / do) his chores.",opts:["already did","has already done","have already done","already does"],ans:"has already done",exp:"Already = PP белгісі. He → has + already + V3 (done). Do → done."},
{id:"g7a5",diff:"easy",text:"They ___ (not / arrive) yet.",opts:["didn't arrive","haven't arrived","hasn't arrived","not arrive"],ans:"haven't arrived",exp:"Yet (болымсыз) = PP белгісі. They → haven't + V3 (arrived)."},
{id:"g7a6",diff:"medium",text:"She ___ in Kazakhstan ___ 2015.",opts:["has lived / since","has lived / for","lived / since","lives / since"],ans:"has lived / since",exp:"Since + нақты уақыт нүктесі → Present Perfect. Since 2015."},
{id:"g7a7",diff:"medium",text:"I ___ him ___ years.",opts:["have known / for","have known / since","knew / for","know / since"],ans:"have known / for",exp:"For + ұзақтық → Present Perfect. For + years."},
{id:"g7a8",diff:"medium",text:"She ___ Paris ___ 2020. She really enjoyed it.",opts:["has visited","visited","visits","is visiting"],ans:"visited",exp:"'In 2020' = нақты өткен уақыт → Past Simple (visited)."},
{id:"g7a9",diff:"medium",text:"___ you finished your project yet?",opts:["Have","Has","Did","Are"],ans:"Have",exp:"Yet болымсыз/сұраулы + PP → Have you + V3?"},
{id:"g7a10",diff:"medium",text:"She ___ (lose) her phone. She can't find it.",opts:["lost","has lost","have lost","loses"],ans:"has lost",exp:"Нәтиже қазір маңызды (phone жоқ) → Present Perfect: has lost."},
{id:"g7a11",diff:"hard",text:"I ___ (see) that film twice. I ___ (see) it first in 2021.",opts:["have seen / saw","saw / have seen","have seen / have seen","saw / saw"],ans:"have seen / saw",exp:"Алдымен PP (тәжірибе: екі рет). Содан кейін PS (нақты уақыт: in 2021)."},
{id:"g7a12",diff:"hard",text:"This is the most interesting book I ___ (ever / read).",opts:["ever read","have ever read","ever read","ever have read"],ans:"have ever read",exp:"Superlative + have ever + V3 — Present Perfect. Read → read (V3 өзгермейді)."},
{id:"g7a13",diff:"hard",text:"She ___ (work) at this company ___ five years now.",opts:["has worked / for","has worked / since","worked / for","is working / for"],ans:"has worked / for",exp:"For + ұзақтық (5 years) → PP. Now = қазір де жалғасуда → PP."},
{id:"g7a14",diff:"hard",text:"___ anyone ___ (call) while I was out?",opts:["Has / called","Have / called","Did / call","Does / call"],ans:"Did / call",exp:"'While I was out' = нақты өткен уақыт → Past Simple: Did + V1?"},
{id:"g7a15",diff:"hard",text:"Find the CORRECT sentence:",opts:["She has went to school.","Have you seen him yesterday?","I have never eaten Japanese food.","He has worked here since five years."],ans:"I have never eaten Japanese food.",exp:"Дұрыс: never + PP. ҚАТЕ: went→gone; yesterday→Past Simple; since→for."},
]
},
{
id:"g7b", title:"Passive Voice", subtitle:"Ырықсыз етіс",
icon:"🔄", color:"#059669",
darynNote:"Daryn 7-сынып: Present Simple Passive (is/are+V3) және Past Simple Passive (was/were+V3). Активтен пассивке айналдыру — жиі тапсырма.",
explanation:{
intro:`Ырықсыз етіс (Passive Voice) — іс-әрекет кімнің орындағаны белгісіз, маңызды емес немесе атамаған жағдайда қолданылады. Ағылшынша жиі кездеседі.`,
sections:[
{ title:"📐 Формасы",
text:`Subject + be (шаққа қарай) + V3 (Past Participle)\n\nАктив → Пассив:\nObject → Subject болады\nSubject 'by + agent' болады`,
tag:"be + V3",
examples:["Active: They build houses. → Passive: Houses ARE BUILT.","Active: She wrote the letter. → The letter WAS WRITTEN by her.","Active: People speak English. → English IS SPOKEN worldwide."]
},
{ title:"🕐 Шақтарда Passive",
text:``,
tag:"Шақ бойынша форма",
examples:["Present Simple: is/are + V3 — English is spoken here.","Past Simple: was/were + V3 — The bridge was built in 1990.","Future Simple: will be + V3 — The letter will be sent.","Present Perfect: has/have been + V3 — It has been repaired.","Modal: can/must + be + V3 — It must be done."]
},
{ title:"💡 Қашан Passive қолданамыз?",
text:``,
tag:"Қолдану жағдайлары",
examples:["Орындаушы белгісіз: My phone was stolen. (кім алды — белгісіз)","Орындаушы маңызды емес: The book was published in 2020.","Ресми/ғылыми жазу: The experiment was conducted...","Орындаушы анық: English is spoken all over the world."]
},
],
tips:[
"💡 Active-тен Passive-ке: object → subject, verb → be+V3.",
"💡 Present Simple Passive: is/are + V3. Past Simple Passive: was/were + V3.",
"💡 Орындаушыны айту керек болса: by + agent (by them, by scientists).",
],
mistakes:[
"❌ The book was write → ✅ The book was written (V3!)",
"❌ English are spoken → ✅ English is spoken (жекеше)",
"❌ They are build → ✅ They are built",
]
},
questions:[
{id:"g7b1",diff:"easy",text:"English ___ (speak) all over the world.",opts:["speaks","is spoken","are spoken","speak"],ans:"is spoken",exp:"Present Simple Passive: English (жекеше) → IS spoken. Жалпы шындық."},
{id:"g7b2",diff:"easy",text:"The Eiffel Tower ___ (build) in 1889.",opts:["built","was built","is built","were built"],ans:"was built",exp:"Past Simple Passive: was + V3 (built). 1889 — нақты өткен уақыт."},
{id:"g7b3",diff:"easy",text:"These cars ___ (make) in Germany.",opts:["makes","make","is made","are made"],ans:"are made",exp:"Present Simple Passive: cars (көпше) → ARE made."},
{id:"g7b4",diff:"easy",text:"My phone ___ (steal) yesterday.",opts:["stole","was stolen","were stolen","is stolen"],ans:"was stolen",exp:"Past Simple Passive: was + V3 (stolen). Yesterday — өткен шақ."},
{id:"g7b5",diff:"easy",text:"The results ___ (announce) tomorrow.",opts:["will announce","will be announced","is announced","are announce"],ans:"will be announced",exp:"Future Passive: will be + V3 (announced)."},
{id:"g7b6",diff:"medium",text:"Active: They clean the classrooms every day.\nPassive: The classrooms ___ every day.",opts:["clean","are cleaned","is cleaned","were cleaned"],ans:"are cleaned",exp:"Present Simple Passive: classrooms (көпше) + are + cleaned."},
{id:"g7b7",diff:"medium",text:"Active: Scientists discovered a new planet.\nPassive: A new planet ___ by scientists.",opts:["discovered","was discovered","is discovered","were discovered"],ans:"was discovered",exp:"Past Simple Passive: was + discovered. Discovered → discovered (V3)."},
{id:"g7b8",diff:"medium",text:"The homework ___ (must / submit) by Friday.",opts:["must submit","must be submitted","must be submitting","is must submitted"],ans:"must be submitted",exp:"Modal Passive: must be + V3 (submitted)."},
{id:"g7b9",diff:"medium",text:"Thousands of books ___ (publish) every year.",opts:["publish","publishes","are published","is published"],ans:"are published",exp:"Present Simple Passive: books (көпше) → are + published."},
{id:"g7b10",diff:"medium",text:"The bridge ___ (repair) at the moment.",opts:["repaired","is being repaired","was repaired","repairs"],ans:"is being repaired",exp:"Present Continuous Passive: is being + V3 — қазір жүргізілуде."},
{id:"g7b11",diff:"hard",text:"Active: The teacher gave us a lot of homework.\nPassive (focusing on 'homework'): A lot of homework ___.",opts:["was given us","was given to us","were given to us","gave to us"],ans:"was given to us",exp:"Passive: A lot of homework + was given + to us. Жанама толықтауышпен."},
{id:"g7b12",diff:"hard",text:"The new hospital ___ (build) for two years already.",opts:["has built","has been built","have been built","was built"],ans:"has been built",exp:"Present Perfect Passive: has been + V3. 'For two years' + PP."},
{id:"g7b13",diff:"hard",text:"English, Kazakh and Russian ___ (speak) in Kazakhstan.",opts:["speaks","are spoken","is spoken","were spoken"],ans:"are spoken",exp:"Үш тіл = subject (көпше) → are spoken."},
{id:"g7b14",diff:"hard",text:"Find the INCORRECT passive sentence:",opts:["The letter was written by her.","These books are sell in every shop.","English is spoken worldwide.","The car was stolen last night."],ans:"These books are sell in every shop.",exp:"ҚАТЕ: 'sell' → ДҰРЫС: 'are sold'. Passive-те V3 керек (sold)."},
{id:"g7b15",diff:"hard",text:"Active: People use smartphones to take photos.\nPassive: Smartphones ___.",opts:["are used to take photos","is used to take photos","are used for taking photos","use to take photos"],ans:"are used to take photos",exp:"Smartphones (көпше) → are used + to + V1. 'Are used to take' немесе 'are used for taking'."},
]
},
{
id:"g7c", title:"First Conditional", subtitle:"1-ші шартты сөйлем",
icon:"🌿", color:"#d97706",
darynNote:"Daryn 7-сынып: бірінші шартты сөйлем (If + Present Simple, ... will). Unless, when, as soon as — де тексеріледі.",
explanation:{
intro:`First Conditional (Бірінші шартты сөйлем) — болуы мүмкін, шынайы болашақ жағдайларды білдіреді. Daryn 7-сынып тестінде бұл тақырып өте жиі кездеседі.`,
sections:[
{ title:"📐 Формасы",
text:`If + Present Simple, ... will + V1\n\nНемесе: ... will + V1 if + Present Simple\n\n⚠️ If-бөлімінде WILL қолданылмайды!`,
tag:"If + Present Simple, will + V1",
examples:["If it rains, we will stay at home.","If she studies hard, she will pass the exam.","He will be happy if you help him.","If you don't hurry, you will miss the bus."]
},
{ title:"🔄 Unless = If...not",
text:`Unless = If...not (егер...болмаса)`,
tag:"Unless = If not",
examples:["Unless you study, you won't pass. = If you don't study, you won't pass.","Unless it rains, we will go to the park. = If it doesn't rain...","I'll come unless I'm busy. = I'll come if I'm not busy."]
},
{ title:"⏰ When / As soon as",
text:`When немесе As soon as — болашақ кезде де Present Simple:`,
tag:"When/As soon as + Present Simple",
examples:["When she arrives, I will call you.","As soon as the lesson ends, we will go.","I will tell him when I see him."]
},
],
tips:[
"💡 If-бөлімінде ЕШҚАШАН will қолданылмайды: If it RAINS (will rain емес!).",
"💡 Unless = if...not: Unless you hurry = If you don't hurry.",
"💡 Негізгі бөлімде will/won't + V1.",
"💡 When/As soon as + Present Simple (will емес!)",
],
mistakes:[
"❌ If it will rain, we will stay → ✅ If it rains, we will stay",
"❌ If she will study → ✅ If she studies",
"❌ Unless you will come → ✅ Unless you come",
]
},
questions:[
{id:"g7c1",diff:"easy",text:"If it ___ (rain) tomorrow, we ___ (stay) at home.",opts:["rains / will stay","will rain / will stay","rains / stay","rain / will stay"],ans:"rains / will stay",exp:"If + Present Simple, will + V1. If-бөлімінде will қолданылмайды!"},
{id:"g7c2",diff:"easy",text:"She ___ (pass) the exam if she ___ (study) hard.",opts:["will pass / studies","will pass / will study","passes / will study","will pass / study"],ans:"will pass / studies",exp:"will + V1 + if + Present Simple. If-бөлімінде: studies (will емес)."},
{id:"g7c3",diff:"easy",text:"If you ___ (not/hurry), you ___ (miss) the bus.",opts:["don't hurry / will miss","won't hurry / will miss","don't hurry / miss","didn't hurry / will miss"],ans:"don't hurry / will miss",exp:"If + Present Simple болымсыз: don't hurry. Нәтиже: will miss."},
{id:"g7c4",diff:"easy",text:"___ you call me if you ___ (need) help?",opts:["Will / need","Will / will need","Do / need","Would / need"],ans:"Will / need",exp:"Сұраулы: Will you...? + if + Present Simple (need)."},
{id:"g7c5",diff:"easy",text:"If the weather ___ (be) nice, we ___ (go) to the park.",opts:["is / will go","will be / will go","is / go","are / will go"],ans:"is / will go",exp:"If + is (Present Simple), will go (нәтиже)."},
{id:"g7c6",diff:"medium",text:"___ you eat too much, you ___ feel sick.",opts:["If / will","Unless / will","If / won't","Unless / won't"],ans:"If / will",exp:"If = егер. Тым көп жесең, жаман сезінесің. If...will."},
{id:"g7c7",diff:"medium",text:"___ you hurry, you will miss the train.",opts:["Unless / —","If / —","When / —","As soon as / —"],ans:"Unless / —",exp:"Unless = if not. Unless you hurry = If you don't hurry, you will miss."},
{id:"g7c8",diff:"medium",text:"She will call you ___ she arrives.",opts:["if","when","unless","after"],ans:"when",exp:"When = болашақта болатын уақытты білдіреді. When + Present Simple."},
{id:"g7c9",diff:"medium",text:"___ he doesn't apologize, she won't forgive him.",opts:["When","Unless","If","As soon as"],ans:"If",exp:"If + болымсыз = егер...болмаса. If he doesn't apologize."},
{id:"g7c10",diff:"medium",text:"As soon as the bell ___ (ring), the students ___ (leave) the class.",opts:["rings / will leave","will ring / will leave","rings / leave","ring / will leave"],ans:"rings / will leave",exp:"As soon as + Present Simple, will + V1. As soon as rings."},
{id:"g7c11",diff:"hard",text:"If you ___ (not/take) your medicine, you ___ (not/get) better.",opts:["don't take / won't get","won't take / won't get","don't take / don't get","didn't take / won't get"],ans:"don't take / won't get",exp:"If + don't take (болымсыз PS), won't get (болымсыз нәтиже)."},
{id:"g7c12",diff:"hard",text:"What ___ (happen) if we ___ (not/save) energy?",opts:["will happen / don't save","happens / don't save","will happen / won't save","happen / don't save"],ans:"will happen / don't save",exp:"What will happen? (сұраулы) + if + don't save (PS болымсыз)."},
{id:"g7c13",diff:"hard",text:"___ we don't protect the environment, many animals ___ become extinct.",opts:["If / will","Unless / will","If / won't","When / will"],ans:"If / will",exp:"If we don't protect = егер қорғамасақ. Нәтиже: will become extinct."},
{id:"g7c14",diff:"hard",text:"I'll lend you money ___ you ___ (promise) to pay me back.",opts:["if / promise","unless / promise","when / will promise","if / will promise"],ans:"if / promise",exp:"If + Present Simple (promise). Шарт: сен қайтарамын деп уәде берсең."},
{id:"g7c15",diff:"hard",text:"Find the INCORRECT sentence:",opts:["If she studies, she will pass.","Unless you hurry, you'll be late.","If it will rain, take an umbrella.","I'll call you when I arrive."],ans:"If it will rain, take an umbrella.",exp:"ҚАТЕ: 'If it will rain' → ДҰРЫС: 'If it rains'. If-бөлімінде will қолданылмайды!"},
]
},
{
id:"g7d", title:"Second Conditional", subtitle:"Шынайы емес жағдайлар (қазір)",
icon:"🌙", color:"#dc2626",
darynNote:"Daryn 7-сынып (жоғарғы деңгей): 2nd Conditional — If + Past Simple, would + V1. 'If I were you' сөзтіркесі жиі тапсырма болады.",
explanation:{
intro:`Second Conditional (2-ші шартты сөйлем) — қазіргі уақытта шынайы емес, болуы алыс немесе мүмкін емес жағдайларды білдіреді. Олимпиадада 1st vs 2nd Conditional айырмасын білу өте маңызды.`,
sections:[
{ title:"📐 Формасы",
text:`If + Past Simple, would/could/might + V1\n\n⚠️ If-бөлімінде WOULD қолданылмайды!\n⚠️ BE етістігі барлық жақта WERE (was емес, ресми тілде!)`,
tag:"If + Past Simple, would + V1",
examples:["If I were rich, I would buy a big house. (Бай емеспін — шынайы емес)","If she knew the answer, she would tell us. (Білмейді)","If I were you, I wouldn't say that. (Кеңес — If I were you)","If he had more time, he could help us. (could = мүмкін болатын)"]
},
{ title:"⚖️ 1st vs 2nd Conditional айырмасы",
text:``,
tag:"Маңызды айырма!",
examples:["1st: If it rains tomorrow, I will take my umbrella. (Нақты мүмкіндік — жаңбыр жауып қалуы мүмкін)","2nd: If I lived on Mars, I would need a spacesuit. (Шынайы емес — Марста тұрмаймын)","1st: If she studies, she will pass. (Оқи алады — реалды)","2nd: If I were a bird, I would fly south. (Мен құс емеспін — ойдан шығарылған)"]
},
{ title:"💡 Could / Might / Should + 2nd Conditional",
text:`Would-тың орнына could (мүмкіндік) немесе might (аз мүмкіндік) де келе алады:`,
tag:"would / could / might",
examples:["If I had a car, I could drive to work. (Мүмкіндік болар еді)","If they tried harder, they might win. (Мүмкін болар еді)","If I were you, I would/should apologize. (Кеңес)"]
},
],
tips:[
"💡 'If I were you...' = ең жиі 2nd Conditional тіркесі. Were — барлық жақта!",
"💡 Жалпы өмірлік мүмкін емес жағдай → 2nd Conditional.",
"💡 Реалды болашақ → 1st. Ойдан шығарылған → 2nd.",
],
mistakes:[
"❌ If I was you → ✅ If I were you (ресми/стандартты)",
"❌ If she would know → ✅ If she knew",
"❌ If I had money, I will buy → ✅ I would buy",
]
},
questions:[
{id:"g7d1",diff:"easy",text:"If I ___ (have) wings, I ___ (fly) over the mountains.",opts:["have / will fly","had / would fly","had / will fly","have / would fly"],ans:"had / would fly",exp:"2nd Conditional: ойдан шығарылған (қанатым жоқ). If + had, would + fly."},
{id:"g7d2",diff:"easy",text:"If I ___ (be) you, I ___ (study) harder.",opts:["am / will","were / would","was / would","be / would"],ans:"were / would",exp:"'If I were you' — классикалық 2nd Conditional кеңес формасы."},
{id:"g7d3",diff:"easy",text:"She ___ (travel) more if she ___ (not/be) so busy.",opts:["would travel / weren't","will travel / isn't","would travel / isn't","would travel / wasn't"],ans:"would travel / weren't",exp:"2nd Cond: would travel + if + weren't (барлық жақта were, ресми)."},
{id:"g7d4",diff:"easy",text:"Which is 2nd Conditional?",opts:["If she comes, we will eat.","If she came, we would eat.","If she has come, we eat.","She eats if she comes."],ans:"If she came, we would eat.",exp:"2nd Conditional: If + Past Simple (came), would + V1 (eat). Шынайы емес."},
{id:"g7d5",diff:"easy",text:"If he ___ (live) in a big city, he ___ (have) more opportunities.",opts:["lives / will have","lived / would have","lived / will have","lives / would have"],ans:"lived / would have",exp:"2nd Conditional: lived (PS), would have (would+V1). Шынайы емес жағдай."},
{id:"g7d6",diff:"medium",text:"What ___ you ___ (do) if you ___ (find) a magic lamp?",opts:["would you do / found","will you do / find","would you do / find","would you have done / found"],ans:"would you do / found",exp:"2nd Conditional сұраулы: What would you do + if you found? (PS)."},
{id:"g7d7",diff:"medium",text:"If there ___ (be) no pollution, our planet ___ (be) much healthier.",opts:["is / will be","were / would be","was / would be","were / will be"],ans:"were / would be",exp:"2nd Cond: ойдан шығарылған. Were + would be."},
{id:"g7d8",diff:"medium",text:"'I can't help you.' → If I ___ (can) help, I ___.",opts:["can / would","could / would","could / will","would / could"],ans:"could / would",exp:"Can → could (PS-ке айналады 2nd Cond-те). If I could help, I would."},
{id:"g7d9",diff:"medium",text:"Айырмасын тап:\n'If it rains, I will stay home.' vs\n'If it rained, I would stay home.'",opts:["Айырмасы жоқ","1-сі реалды, 2-сі ойдан шығарылған","1-сі өткен, 2-сі қазіргі","1-сі болашақ, 2-сі шарт"],ans:"1-сі реалды, 2-сі ойдан шығарылған",exp:"1st Cond: нақты мүмкіндік. 2nd Cond: шынайы емес/алыс мүмкіндік."},
{id:"g7d10",diff:"medium",text:"If animals ___ (can) speak, what ___ they ___ (say)?",opts:["can / would / say","could / would / say","could / will / say","can / will / say"],ans:"could / would / say",exp:"2nd Conditional: can→could (PS). What would they say?"},
{id:"g7d11",diff:"hard",text:"If I ___ (not/be) so shy, I ___ (make) more friends.",opts:["weren't / would make","wasn't / would make","didn't be / would make","weren't / will make"],ans:"weren't / would make",exp:"2nd Cond болымсыз: If I weren't (ресми) so shy, I would make."},
{id:"g7d12",diff:"hard",text:"She ___ (might/do) better if she ___ (concentrate) more.",opts:["might do / concentrated","might do / concentrates","would do / had concentrated","might have done / concentrated"],ans:"might do / concentrated",exp:"2nd Cond + might (аз мүмкіндік): might do + if + concentrated (PS)."},
{id:"g7d13",diff:"hard",text:"Choose: 1st or 2nd Conditional?\n'If humans stopped polluting, the Earth would recover.'",opts:["1st Conditional","2nd Conditional","0 Conditional","3rd Conditional"],ans:"2nd Conditional",exp:"Stopped (Past Simple) + would recover = 2nd Conditional. Шынайы емес/болуы алыс жағдай."},
{id:"g7d14",diff:"hard",text:"Find the CORRECT sentence:",opts:["If I would know, I would tell you.","If she studied, she would passed.","If we had more time, we could help.","If I was you, I'll apologize."],ans:"If we had more time, we could help.",exp:"Дұрыс: had (PS) + could (modal). ҚАТЕ: would know→knew; passed→pass; was→were, 'll→would."},
{id:"g7d15",diff:"hard",text:"Complete: 'If everyone ___ renewable energy, we ___ the planet ___.'",opts:["used / would save / better","uses / will save / well","used / would save / well","use / would save / better"],ans:"used / would save / well",exp:"2nd Cond: used (PS), would save (would+V1). 'Save the planet well' — үстеу well."},
]
},
{
id:"g7e", title:"Сөздік қор", subtitle:"Қоршаған орта, технологиялар, денсаулық",
icon:"🌱", color:"#059669",
darynNote:"Daryn 7-сынып сөздік: экология (pollution/recycling), технологиялар (social media/AI), денсаулық (symptoms/treatment), БАҚ. Коллокациялар да тексеріледі.",
explanation:{
intro:`Daryn 7-сынып сөздік тапсырмалары жоғары деңгейдегі тақырыптық сөздерді, синонимдерді, коллокацияларды және мәтіндегі сөздің мағынасын анықтауды тексереді.`,
sections:[
{ title:"🌿 Қоршаған орта (Environment)",
text:``,
tag:"Environmental vocabulary",
examples:["pollution — ластану (air/water/noise pollution)","greenhouse effect — парниктік эффект","renewable energy — жаңартылатын энергия","solar panel — күн панелі","deforestation — ормандардың кесілуі","endangered species — жойылу қаупіндегі түрлер","recycling — қайта өңдеу","carbon footprint — көміртек ізі","sustainable — тұрақты (sustainable development)"]
},
{ title:"💻 Технологиялар (Technology)",
text:``,
tag:"Technology vocabulary",
examples:["artificial intelligence — жасанды интеллект","virtual reality — виртуалды шынайылық","cyberbullying — желідегі зорлық","social media — әлеуметтік желі","algorithm — алгоритм","download/upload — жүктеу/жариялау","bandwidth — өткізу қабілеті","device — құрылғы","app (application) — қолданба","privacy — жеке өмір жасырындылығы"]
},
{ title:"🏥 Медицина мен денсаулық (Health)",
text:``,
tag:"Health & Medical vocabulary",
examples:["diagnosis — диагноз","treatment — емдеу","surgery — операция","recovery — қалпына келу","vaccine — вакцина","epidemic — эпидемия","mental health — психикалық денсаулық","nutrition — тамақтану","obesity — семіздік","immune system — иммундық жүйе"]
},
],
tips:[
"💡 'Pollution' — санауға болмайды. 'A type of pollution' (a pollution емес!).",
"💡 Do/make коллокациялар: do research, make a discovery, do exercise, make progress.",
"💡 'Sustainable' = тұрақты (болашақ үшін зиянсыз). Үйреніп қал!",
],
mistakes:[
"❌ make exercise → ✅ do exercise",
"❌ a pollution → ✅ pollution (санауға болмайды)",
"❌ do a discovery → ✅ make a discovery",
]
},
questions:[
{id:"g7e1",diff:"easy",text:"The cutting down of forests is called ___.",opts:["recycling","deforestation","pollution","erosion"],ans:"deforestation",exp:"Deforestation = ормандарды кесу. Forest + -ation."},
{id:"g7e2",diff:"easy",text:"Energy from the sun is called ___ energy.",opts:["wind","nuclear","solar","hydro"],ans:"solar",exp:"Solar = күн. Solar energy = күн энергиясы."},
{id:"g7e3",diff:"easy",text:"Animals that might disappear from Earth are called ___ species.",opts:["extinct","endangered","domestic","wild"],ans:"endangered",exp:"Endangered species = жойылу қаупіндегі түрлер."},
{id:"g7e4",diff:"easy",text:"Which is a TECHNOLOGY word?",opts:["vaccination","deforestation","algorithm","greenhouse"],ans:"algorithm",exp:"Algorithm = алгоритм (компьютер ғылымы). Қалғандары басқа салалар."},
{id:"g7e5",diff:"easy",text:"When you bully someone online, it is called ___.",opts:["hacking","cyberbullying","phishing","spam"],ans:"cyberbullying",exp:"Cyberbullying = желідегі зорлық (online harassment)."},
{id:"g7e6",diff:"medium",text:"The correct collocation: 'Scientists ___ a new discovery.'",opts:["did","made","found","created"],ans:"made",exp:"Make a discovery — дұрыс коллокация. (Do a discovery ЕМЕС!)"},
{id:"g7e7",diff:"medium",text:"'The ___ of the patient was slow but complete.' (ауруды емдеуден кейін):",opts:["treatment","surgery","recovery","diagnosis"],ans:"recovery",exp:"Recovery = қалпына келу (ауырғаннан кейін). Treatment = емдеу процесі."},
{id:"g7e8",diff:"medium",text:"___ development means meeting today's needs without harming future generations.",opts:["Renewable","Sustainable","Industrial","Economic"],ans:"Sustainable",exp:"Sustainable development = тұрақты даму (болашаққа зиян келтірмейтін)."},
{id:"g7e9",diff:"medium",text:"Choose the CORRECT collocation with 'research':",opts:["make research","do research","have research","take research"],ans:"do research",exp:"Do research = зерттеу жүргізу. Make research ЕМЕС (жиі қате)."},
{id:"g7e10",diff:"medium",text:"Харламов: 'AI will ___ jobs in the future.' — Most likely missing word:",opts:["create","replace","reduce","improve"],ans:"replace",exp:"Replace = орнын басу. AI replaces human jobs — жиі кездесетін тақырып."},
{id:"g7e11",diff:"hard",text:"The synonym of 'illness' is ___.",opts:["treatment","disease","symptom","recovery"],ans:"disease",exp:"Disease = illness — екеуі де ауру мағынасын береді. Symptom = белгі. Treatment = емдеу."},
{id:"g7e12",diff:"hard",text:"'Carbon ___ ' measures the amount of CO₂ a person produces.",opts:["print","footprint","mark","trace"],ans:"footprint",exp:"Carbon footprint = көміртек ізі. Тұрақты тіркес (fixed collocation)."},
{id:"g7e13",diff:"hard",text:"Which sentence uses 'nutrition' correctly?",opts:["She has a good nutrition.","Good nutrition is important for health.","He takes nutritions every day.","Nutritions help the body."],ans:"Good nutrition is important for health.",exp:"Nutrition — санауға болмайды (uncountable). A nutrition / nutritions ДҰРЫС ЕМЕС."},
{id:"g7e14",diff:"hard",text:"'Virtual reality' technology creates a ___ world that feels real.",opts:["simulated","polluted","endangered","recycled"],ans:"simulated",exp:"Simulated = модельденген/жасанды. VR creates a simulated (fake but real-feeling) world."},
{id:"g7e15",diff:"hard",text:"Find the CORRECT sentence:",opts:["We must make more exercises to stay fit.","Deforestation have a bad effect on climate.","The immune system protects us from disease.","Scientists did an important discovery."],ans:"The immune system protects us from disease.",exp:"Дұрыс: immune system + protects (3-жақ -s). ҚАТЕ: make exercises→do; have→has; did→made a discovery."},
]
},
]
},
8: {
label:"8-сынып",
darynNote:"8-сынып Daryn олимпиадасы: барлық шартты сөйлемдер (2nd, 3rd), жанама сөйлем (Reported Speech), сөз тудыру (Word Formation). Сөздік: ғылым, қоғам, жаһандық мәселелер.",
topics:[
{
id:"g8a", title:"2nd & 3rd Conditionals", subtitle:"Шындыққа жанаспайтын шарттар",
icon:"🌐", color:"#dc2626",
darynNote:"Daryn 8-сынып олимпиадасы: 2nd Conditional (were/would), 3rd Conditional (had+V3/would have+V3) — биыл ерекше назар аударылады.",
explanation:{
intro:`Second and Third Conditional (2-ші және 3-ші шартты сөйлемдер) — шындыққа жанаспайтын, ойдан шығарылған жағдайларды білдіреді. Daryn 8-сынып олимпиадасының ең күрделі тақырыбы.`,
sections:[
{ title:"2nd Conditional — ҚАЗІРГІ УАҚЫТТА ШЫНАЙЫ ЕМЕС",
text:`Қазір немесе болашақта болуы мүмкін емес (немесе мүмкін, бірақ алыс) жағдайлар.\n\nIf + Past Simple, would/could/might + V1`,
tag:"If + Past Simple, would + V1",
examples:["If I were a millionaire, I would travel the world. (Мен миллионер емеспін.)","If she knew the answer, she would tell us. (Ол білмейді.)","If it weren't so cold, we would go outside.","If I were you, I would apologize. ('If I were' — барлық жақта were!)"]
},
{ title:"3rd Conditional — ӨТКЕН УАҚЫТТА ШЫНАЙЫ ЕМЕС",
text:`Өткен уақытта болмаған, өкінішті жағдайлар.\n\nIf + Past Perfect, would have + V3`,
tag:"If + Past Perfect, would have + V3",
examples:["If I had studied harder, I would have passed. (Жеткілікті оқымадым — сынақтан өтпедім.)","If she hadn't been late, she would have caught the train.","If they had listened to me, things would have been different.","If I had known, I would have helped."]
},
{ title:"⚖️ Барлық шартты сөйлемдер салыстырмасы",
text:``,
tag:"Жылдам салыстыру",
examples:["0: If you heat ice, it melts. (Шындық)","1st: If it rains, I will take an umbrella. (Болуы мүмкін)","2nd: If I were rich, I would buy a yacht. (Шынайы емес, қазір)","3rd: If I had studied, I would have passed. (Шынайы емес, өткенде)"]
},
],
tips:[
"💡 2nd Cond-те БАРЛЫҚ жақта 'were': If I/he/she/it WERE (was емес, ресми!)",
"💡 3rd Cond болымсыз: If she HADN'T come... / She wouldn't HAVE come.",
"💡 Mixed: If I had saved money (3rd), I would be rich now (2nd). Аралас болуы мүмкін!",
],
mistakes:[
"❌ If I was rich (2nd) → ✅ If I were rich",
"❌ If he had come, he will see → ✅ If he had come, he would have seen",
"❌ If she would study → ✅ If she studied (2nd) / had studied (3rd)",
]
},
questions:[
{id:"g8a1",diff:"easy",text:"If I ___ (be) a doctor, I ___ (help) people.",opts:["was / would help","were / would help","am / will help","were / will help"],ans:"were / would help",exp:"2nd Conditional: If + were (барлық жақта), would + V1. Шынайы емес жағдай."},
{id:"g8a2",diff:"easy",text:"If she ___ (study) harder, she ___ (pass) the exam.",opts:["studied / would pass","studies / would pass","studied / will pass","had studied / would pass"],ans:"studied / would pass",exp:"2nd Conditional: If + Past Simple (studied), would + V1 (pass)."},
{id:"g8a3",diff:"easy",text:"If they ___ (listen) to the teacher, they ___ (understand) the lesson.",opts:["listened / would understand","had listened / would have understood","listened / will understand","listen / would understand"],ans:"listened / would understand",exp:"2nd Conditional: listened (PS), would understand (would+V1)."},
{id:"g8a4",diff:"easy",text:"If I ___ (be) you, I ___ (apologize) immediately.",opts:["am / will","were / would","was / would","be / would"],ans:"were / would",exp:"'If I were you' — классикалық 2nd Conditional сөзтіркесі."},
{id:"g8a5",diff:"easy",text:"If he ___ (study) last night, he ___ (pass) the test.",opts:["studied / would pass","had studied / would have passed","has studied / would pass","studied / would have passed"],ans:"had studied / would have passed",exp:"3rd Conditional: өткен оқи алмады → сынақтан өте алмады. Past Perfect + would have + V3."},
{id:"g8a6",diff:"medium",text:"She ___ (not/miss) the bus if she ___ (wake up) earlier.",opts:["wouldn't miss / woke up","wouldn't have missed / had woken up","won't miss / wakes up","wouldn't miss / had woken up"],ans:"wouldn't have missed / had woken up",exp:"3rd Conditional (өткенде болған): wouldn't have missed + had woken up."},
{id:"g8a7",diff:"medium",text:"If we ___ (save) energy, our planet ___ (be) healthier.",opts:["saved / would be","had saved / would be","save / would be","saved / will be"],ans:"saved / would be",exp:"2nd Conditional: saved (PS), would be (would+V1). Жалпы ойдан шығарылған жағдай."},
{id:"g8a8",diff:"medium",text:"If I ___ (know) her number, I ___ (call) her yesterday.",opts:["knew / would call","had known / would have called","knew / would have called","had known / would call"],ans:"had known / would have called",exp:"3rd Conditional: кеше (өткен) → had known + would have called."},
{id:"g8a9",diff:"medium",text:"What ___ you ___ (do) if you ___ (find) a wallet in the street?",opts:["would you do / found","will you do / find","would you do / had found","would you have done / found"],ans:"would you do / found",exp:"2nd Conditional сұраулы: What would you do if you found? (PS)."},
{id:"g8a10",diff:"medium",text:"If the weather ___ (not/be) so cold, we ___ (go) swimming.",opts:["weren't / would go","wasn't / would go","hadn't been / would have gone","weren't / will go"],ans:"weren't / would go",exp:"2nd Conditional: If it weren't (ресми) so cold, we would go."},
{id:"g8a11",diff:"hard",text:"If Columbus ___ (not/discover) America, history ___ (be) very different today.",opts:["didn't discover / would be","hadn't discovered / would be","hadn't discovered / would have been","didn't discover / would have been"],ans:"hadn't discovered / would be",exp:"Mixed Conditional: 3rd Cond (өткенде болмаған) + 2nd Cond (қазірдегі нәтиже)."},
{id:"g8a12",diff:"hard",text:"She ___ (not/be) so tired now if she ___ (not/work) so hard last week.",opts:["wouldn't be / hadn't worked","wouldn't have been / didn't work","weren't / hadn't worked","wouldn't be / didn't work"],ans:"wouldn't be / hadn't worked",exp:"Mixed: wouldn't be (қазір, 2nd) + hadn't worked (өткенде, 3rd)."},
{id:"g8a13",diff:"hard",text:"If I ___ (be) taller, I ___ (become) a basketball player.",opts:["were / would become","am / will become","had been / would have become","was / would become"],ans:"were / would become",exp:"2nd Conditional: If I WERE (барлық жақта ресми форма) taller, would become."},
{id:"g8a14",diff:"hard",text:"He would have come to the party if he ___ invited.",opts:["has been","were","had been","was"],ans:"had been",exp:"3rd Conditional passive: if he HAD BEEN invited (Past Perfect Passive)."},
{id:"g8a15",diff:"hard",text:"Choose the CORRECT sentence:",opts:["If I would have more time, I'd help you.","If she had come, we would have been happy.","If he studied yesterday, he would passed.","If they would listen, they would understand."],ans:"If she had come, we would have been happy.",exp:"Дұрыс: 3rd Conditional. ҚАТЕ: would have→had; passed→have passed; would listen→listened."},
]
},
{
id:"g8b", title:"Reported Speech", subtitle:"Жанама сөйлем",
icon:"💬", color:"#7c3aed",
darynNote:"Daryn 8-сынып: жанама сөйлем (statements, questions, commands). Шақтардың ауысуы (backshift), сілтеу есімдіктерінің өзгеруі — жиі тапсырма.",
explanation:{
intro:`Reported Speech (Жанама сөйлем) — біреудің айтқанын басқаша жеткізу. Daryn 8-сынып тестінде бұл тақырып ерекше маңызды.`,
sections:[
{ title:"📝 Баяндауыш сөйлемдер (Statements)",
text:`Said/told that + шақ бір кейін ығысады:\nPresent Simple → Past Simple\nPast Simple → Past Perfect\nPresent Perfect → Past Perfect\nwill → would`,
tag:"Шақтар бір кейін ығысады",
examples:["'I like pizza.' → She said she LIKED pizza.","'I am tired.' → He said he WAS tired.","'I will come.' → She said she WOULD come.","'I have finished.' → He said he HAD finished.","'I went.' → She said she HAD GONE."]
},
{ title:"❓ Сұраулы сөйлемдер (Questions)",
text:`Asked + if/whether (Yes/No сұрақтар)\nAsked + сұраулы сөз (Wh- сұрақтар)\n\n⚠️ Сұраулы ретпен ЕМЕС, баяндауыш ретпен!`,
tag:"if/whether (Yes/No) | wh-word (Wh-)",
examples:["'Are you tired?' → He asked if I WAS tired.","'Where do you live?' → She asked where I LIVED.","'Did you see him?' → He asked if I HAD SEEN him.","'What time is it?' → She asked what time IT WAS."]
},
{ title:"⚡ Бұйрықты сөйлемдер (Commands)",
text:`Told/asked + Object + to + V1\nBolymsy: told not to + V1`,
tag:"told + to/not to + V1",
examples:["'Sit down!' → He told me TO SIT DOWN.","'Don't run!' → She told us NOT TO RUN.","'Please help me.' → He asked her TO HELP him.","'Be quiet!' → The teacher told the students TO BE QUIET."]
},
{ title:"🔄 Өзгетін сөздер",
text:`Сілтеу есімдіктер мен уақыт/орын сөздері де өзгереді:`,
tag:"Сілтеу сөздер өзгереді",
examples:["this → that / these → those","here → there","now → then","today → that day","yesterday → the day before","tomorrow → the next day","last week → the previous week"]
},
],
tips:[
"💡 Said vs Told: said (бір адамға) / told + кімге (told me, told us).",
"💡 Yes/No сұрақ → if/whether. Wh-сұрақ → wh-сөз.",
"💡 Reported question-да сөз тәртібі: Subject + Verb (сұраулы емес!).",
],
mistakes:[
"❌ She said me → ✅ She told me / She said to me",
"❌ He asked where did I live → ✅ He asked where I lived",
"❌ She said she will come → ✅ She said she would come",
]
},
questions:[
{id:"g8b1",diff:"easy",text:"'I like English.' → She said she ___ English.",opts:["likes","liked","would like","has liked"],ans:"liked",exp:"Present Simple → Past Simple. She said (that) she liked English."},
{id:"g8b2",diff:"easy",text:"'I am tired.' → He said he ___ tired.",opts:["is","was","were","has been"],ans:"was",exp:"Present Simple to be → Past Simple to be. He said he was tired."},
{id:"g8b3",diff:"easy",text:"'I will help you.' → She said she ___ help me.",opts:["will","would","can","could"],ans:"would",exp:"Will → Would (Reported Speech-те). She said she would help me."},
{id:"g8b4",diff:"easy",text:"'Sit down!' → The teacher told the students ___ down.",opts:["sat","sit","to sit","sitting"],ans:"to sit",exp:"Бұйрықты сөйлем → told + to + V1: to sit down."},
{id:"g8b5",diff:"easy",text:"'Don't be late!' → He told me ___ late.",opts:["not be","to not be","not to be","don't be"],ans:"not to be",exp:"Болымсыз бұйрық → told + not to + V1: not to be late."},
{id:"g8b6",diff:"medium",text:"'Are you hungry?' → She asked me if I ___ hungry.",opts:["am","was","were","be"],ans:"was",exp:"Yes/No сұрақ → asked if. Am → was (шақ ығысады)."},
{id:"g8b7",diff:"medium",text:"'Where do you live?' → He asked me where I ___.",opts:["live","do live","lived","does live"],ans:"lived",exp:"Wh-сұрақ → asked where + Subject + Verb. Do live → lived (шақ ығысады)."},
{id:"g8b8",diff:"medium",text:"'I have finished my homework.' → She said she ___ her homework.",opts:["has finished","finished","had finished","was finishing"],ans:"had finished",exp:"Present Perfect → Past Perfect (had + V3)."},
{id:"g8b9",diff:"medium",text:"'Did you see the film?' → He asked me if I ___ the film.",opts:["saw","had seen","have seen","see"],ans:"had seen",exp:"Past Simple → Past Perfect (had + V3). Сұраулы форма жоқ!"},
{id:"g8b10",diff:"medium",text:"'Please open the window.' → She asked me ___ the window.",opts:["open","to open","opening","opened"],ans:"to open",exp:"Өтіну (please) → asked + to + V1: to open the window."},
{id:"g8b11",diff:"hard",text:"'I went to Paris last year.' → He said he ___ to Paris ___ year.",opts:["went / last","had gone / the previous","has gone / last","went / the previous"],ans:"had gone / the previous",exp:"Past Simple → Past Perfect: had gone. Last year → the previous year."},
{id:"g8b12",diff:"hard",text:"'What time will the train arrive?' → She asked what time the train ___.",opts:["will arrive","would arrive","arrives","had arrived"],ans:"would arrive",exp:"Will → would. Wh-сұрақ баяндауыш ретімен: what time the train would arrive."},
{id:"g8b13",diff:"hard",text:"'I can't swim.' → He said he ___ swim.",opts:["can't","couldn't","wasn't able","didn't can"],ans:"couldn't",exp:"Can → could (шақ ығысады). He said he couldn't swim."},
{id:"g8b14",diff:"hard",text:"'This is my book.' → She said ___ was ___ book.",opts:["this / her","that / her","this / hers","that / hers"],ans:"that / her",exp:"This → that (алыс). My → her (3-жақ). That was her book."},
{id:"g8b15",diff:"hard",text:"Find the CORRECT reported sentence:\nDirect: 'We are studying for exams now.'",opts:["They said they are studying for exams now.","They said they were studying for exams then.","They said they studied for exams then.","They said they had been studying for exams now."],ans:"They said they were studying for exams then.",exp:"Present Continuous → Past Continuous (were studying). Now → then."},
]
},
{
id:"g8c", title:"Word Formation", subtitle:"Сөз тудыру",
icon:"🔤", color:"#059669",
darynNote:"Daryn 8-сынып: noun/adjective/adverb/verb тудыру, prefix (un-/dis-/mis-/im-) және suffix (-tion/-ness/-ful/-less/-ly/-ive). Мәтіндегі бос орынға дұрыс форма — ең маңызды тапсырма.",
explanation:{
intro:`Word Formation (Сөз тудыру) — бір сөзден жұрнақ немесе жалғаулар арқылы басқа сөз жасау. Daryn 8-сынып тестінде берілген бастапқы сөзден дұрыс форманы таңдау немесе жасау керек.`,
sections:[
{ title:"📌 Зат есім жұрнақтары (Noun suffixes)",
text:``,
tag:"-tion, -sion, -ness, -ment, -er/-or, -ity, -ance/-ence",
examples:["-tion/-sion: educate→education, decide→decision","-(i)ty: creative→creativity, active→activity","-ness: happy→happiness, dark→darkness","-ment: improve→improvement, develop→development","-er/-or: teach→teacher, direct→director","-ance/-ence: important→importance, differ→difference"]
},
{ title:"🎨 Сын есім жұрнақтары (Adjective suffixes)",
text:``,
tag:"-ful, -less, -ous, -al, -ive, -able/-ible, -ent/-ant",
examples:["-ful: care→careful, success→successful","-less: care→careless, hope→hopeless","-ous: danger→dangerous, fame→famous","-al: nation→national, tradition→traditional","-ive: create→creative, effect→effective","-able/-ible: understand→understandable, respond→responsible"]
},
{ title:"🔴 Жалғаулар — теріс мағына (Negative prefixes)",
text:``,
tag:"un-, dis-, im-/in-/ir-/il-, mis-",
examples:["un-: happy→unhappy, lucky→unlucky, fair→unfair","dis-: agree→disagree, honest→dishonest","im-: possible→impossible, polite→impolite","in-: correct→incorrect, visible→invisible","ir-: regular→irregular, responsible→irresponsible","mis-: understand→misunderstand, behave→misbehave"]
},
{ title:"💨 Үстеу жұрнағы (Adverb suffix)",
text:`Adjective + -ly = Adverb`,
tag:"-ly → Adverb",
examples:["quick→quickly, careful→carefully","happy→happily (y→i+ly)","possible→possibly","automatic→automatically"]
},
],
tips:[
"💡 Сөйлемде бостың алдындағы сөзге қара: what type of word is needed? (noun/adj/adverb/verb)",
"💡 Great + [noun]: great creativity (not 'creative').",
"💡 'Was/were + [adj]': was disappointed, was careful.",
"💡 Теріс мағына керек пе? un-/dis-/im-/in- жалға.",
],
mistakes:[
"❌ He showed great create → ✅ He showed great creativity",
"❌ She was disappoint → ✅ She was disappointed",
"❌ It is impossibly → ✅ It is impossible (adjective, not adverb)",
]
},
questions:[
{id:"g8c1",diff:"easy",text:"The scientist made an important ___ (discover).",opts:["discover","discoverer","discovery","discovering"],ans:"discovery",exp:"'Important' сын есімінен кейін зат есім керек. Discover + -y = discovery."},
{id:"g8c2",diff:"easy",text:"She was very ___ (disappoint) with the results.",opts:["disappoint","disappointment","disappointed","disappointing"],ans:"disappointed",exp:"'Was' + [adj]. Disappointed = адамның сезімі (сын есім)."},
{id:"g8c3",diff:"easy",text:"He showed great ___ (creative) in his project.",opts:["creative","creation","creatively","creativity"],ans:"creativity",exp:"'Great' [зат есім]. Creative + -ity = creativity."},
{id:"g8c4",diff:"easy",text:"It is ___ (possible) to learn a language quickly.",opts:["possible","impossible","possibly","impossibly"],ans:"impossible",exp:"Теріс мағына + сын есім: im- + possible = impossible."},
{id:"g8c5",diff:"easy",text:"She spoke very ___ (confident) at the presentation.",opts:["confidence","confident","confidently","unconfident"],ans:"confidently",exp:"'Spoke' = verb → үстеу (adverb) керек. Confident + -ly = confidently."},
{id:"g8c6",diff:"medium",text:"The ___ (educate) system in Kazakhstan is changing rapidly.",opts:["educate","education","educational","educationally"],ans:"educational",exp:"System алдында сын есім керек: education + -al = educational."},
{id:"g8c7",diff:"medium",text:"His ___ (behave) at school was unacceptable.",opts:["behave","behaviour","behavioural","behaving"],ans:"behaviour",exp:"His [зат есім]. Behave → behaviour (зат есім)."},
{id:"g8c8",diff:"medium",text:"The instructions were completely ___ (understand).",opts:["understand","understandable","understanding","misunderstand"],ans:"understandable",exp:"'Were completely' + [сын есім]. Under + stand + -able = understandable."},
{id:"g8c9",diff:"medium",text:"She was ___ (honest) about what happened.",opts:["honest","dishonest","honesty","honestly"],ans:"dishonest",exp:"Теріс мағына (нəтиже жасырды): dis- + honest = dishonest."},
{id:"g8c10",diff:"medium",text:"The government needs to ___ (modern) the education system.",opts:["modern","modernity","modernize","modernly"],ans:"modernize",exp:"'Needs to' + verb. Modern + -ize = modernize (етістік)."},
{id:"g8c11",diff:"hard",text:"His ___ (responsible) behaviour caused serious problems. He acted very ___ (responsible).",opts:["irresponsible / irresponsibly","irresponsibility / irresponsible","irresponsible / responsible","responsible / irresponsibly"],ans:"irresponsible / irresponsibly",exp:"1) сын есім (behaviour алдында): irresponsible. 2) үстеу (acted): irresponsibly."},
{id:"g8c12",diff:"hard",text:"The ___ (beautiful) of Kazakhstan's nature is truly ___ (breathtake).",opts:["beauty / breathtaking","beautiful / breathtaking","beauty / breathtaken","beautifulness / breathtaking"],ans:"beauty / breathtaking",exp:"The [зат есім]: beauty. 'Is truly' + [сын есім]: breathtaking."},
{id:"g8c13",diff:"hard",text:"Scientists need ___ (creative) and ___ (curious) to make new discoveries.",opts:["creativity / curiosity","creative / curious","creation / curiosity","creativity / curiousness"],ans:"creativity / curiosity",exp:"Need [зат есім]: creativity (creative→ity). Curiosity (curious→ity)."},
{id:"g8c14",diff:"hard",text:"The new policy was ___ (effect) in reducing crime. Its ___ (effective) was praised.",opts:["effective / effectiveness","effectively / effectiveness","effective / effectivity","effectful / effective"],ans:"effective / effectiveness",exp:"Was [сын есім]: effective. Its [зат есім]: effectiveness (effective→ness)."},
{id:"g8c15",diff:"hard",text:"Read: 'The ___ (invent) of the telephone was a ___ (revolution) moment. Alexander Bell's ___ (invent) changed ___ (communicate) forever.'\n\nBlanks 1,2,3,4:",opts:["invention / revolutionary / invention / communication","inventor / revolution / invent / communicating","invention / revolutionary / inventor / communication","invent / revolutionize / invention / communication"],ans:"invention / revolutionary / invention / communication",exp:"1) The [noun]: invention. 2) [adj] moment: revolutionary. 3) Bell's [noun]: invention. 4) changed [noun]: communication."},
]
},
{
id:"g8d", title:"Аралас шақтар", subtitle:"Mixed Tenses — жан-жақты қайталау",
icon:"⚡", color:"#0891b2",
darynNote:"Daryn 8-сынып финал: барлық шақтарды (PS, PP, PC, Past Perf, Future, Passive) бір тексте қолдана білу — ең жоғары деңгей тапсырмасы.",
explanation:{
intro:`Daryn 8-сынып олимпиадасының ең күрделі грамматикалық тапсырмасы — бір мәтінде БАРЛЫҚ шақтарды дұрыс қолдану. Мұнда контекстке қарап дұрыс шақты таңдау қабілеті тексеріледі.`,
sections:[
{ title:"📊 Шақтар жылдам кестесі (Quick Reference)",
text:``,
tag:"Барлық шақтар — белгі сөздер",
examples:["Present Simple: always/usually/every day → She works","Present Continuous: now/at the moment/Look! → She is working","Past Simple: yesterday/ago/last week → She worked","Past Continuous: was/were + ing (үдерісте болды) → She was working","Present Perfect: just/already/yet/ever/never/since/for → She has worked","Past Perfect: by the time/already (өткенде) → She had worked","Future (will): I think/probably → She will work","Future (going to): жоспар/Look! → She is going to work","Passive: is/are/was/were + V3 → She was asked"]
},
{ title:"🔄 Passive шақтар кестесі",
text:``,
tag:"Passive — барлық шақтар",
examples:["Pres. Simple: is/are + V3 — 'English is spoken here'","Past Simple: was/were + V3 — 'The book was written in 1990'","Future: will be + V3 — 'The exam will be held tomorrow'","Pres. Perf: has/have been + V3 — 'It has been repaired'","Modal: can/must/should be + V3 — 'It must be done'"]
},
{ title:"💡 Шақты анықтау стратегиясы",
text:`Берілген сөйлемде шақты анықтау үшін:`,
tag:"Стратегия",
examples:["1️⃣ Белгі сөздерді тап (yesterday / now / just / by the time...)","2️⃣ Контекстке қара (өткен? қазір? болашақ?)","3️⃣ Active немесе Passive? (орындаушы бар ма?)","4️⃣ Шарт бар ма? (if + тип анықта)","5️⃣ Жалғасып жатқан үдеріс пе? (-ing форма қарастыр)"]
},
],
tips:[
"💡 'By the time she arrived...' → Past Perfect (had + V3).",
"💡 'While he was reading...' → Past Continuous + another past action.",
"💡 'Since 2020' → Present Perfect (has/have + V3).",
"💡 Passive-те орындаушы маңызды емес немесе белгісіз.",
],
mistakes:[
"❌ She was arrive → ✅ She arrived (arrive PC-де қолданылмайды)",
"❌ By the time I came, he left → ✅ he had left (Past Perfect)",
"❌ Since 3 years → ✅ For 3 years (since + нақты уақыт; for + ұзақтық)",
]
},
questions:[
{id:"g8d1",diff:"easy",text:"By the time she arrived, they ___ (already/leave).",opts:["already left","have already left","had already left","were already leaving"],ans:"had already left",exp:"By the time + Past Simple → Past Perfect. Had already left."},
{id:"g8d2",diff:"easy",text:"She ___ (live) in Almaty since 2018.",opts:["lives","lived","has lived","had lived"],ans:"has lived",exp:"Since + Present Perfect: has lived. Қазірге дейін жалғасып келеді."},
{id:"g8d3",diff:"easy",text:"While he ___ (read), the phone rang.",opts:["read","was reading","has read","reads"],ans:"was reading",exp:"While + Past Continuous (үдеріс) + Past Simple (кесіп өткен оқиға)."},
{id:"g8d4",diff:"easy",text:"The new bridge ___ (open) next month.",opts:["opens","will be opened","is opening","has opened"],ans:"will be opened",exp:"Future Passive: will be + V3. Bridge орындаушы емес → Passive."},
{id:"g8d5",diff:"easy",text:"She ___ (just/finish) her report when the boss walked in.",opts:["just finished","has just finished","had just finished","was just finishing"],ans:"had just finished",exp:"When + Past Simple → Past Perfect (бұрын болған). Had just finished."},
{id:"g8d6",diff:"medium",text:"Scientists ___ (discover) a new planet. They ___ (announce) it yesterday.",opts:["have discovered / announced","discovered / have announced","have discovered / have announced","had discovered / announced"],ans:"have discovered / announced",exp:"Recent news → PP (have discovered). Нақты уақыт (yesterday) → PS (announced)."},
{id:"g8d7",diff:"medium",text:"By 2030, electric cars ___ (replace) most petrol cars.",opts:["will replace","will have replaced","are replacing","replaced"],ans:"will have replaced",exp:"By 2030 + Future → Future Perfect (will have + V3). Болашаққа дейін аяқталады."},
{id:"g8d8",diff:"medium",text:"The letter ___ (send) before she arrived.",opts:["sent","has been sent","had been sent","was sent"],ans:"had been sent",exp:"Before she arrived → бұрынырақ болды → Past Perfect Passive: had been sent."},
{id:"g8d9",diff:"medium",text:"He ___ (work) for this company for 10 years when he ___ (retire).",opts:["has worked / retired","was working / retired","had been working / retired","worked / has retired"],ans:"had been working / retired",exp:"Ұзақ үдеріс (10 years) бітпес бұрын → Past Perf Continuous + PS."},
{id:"g8d10",diff:"medium",text:"She ___ (not/see) him since they ___ (graduate) from university.",opts:["hasn't seen / graduated","didn't see / graduated","hasn't seen / have graduated","hadn't seen / graduated"],ans:"hasn't seen / graduated",exp:"Since → PP: hasn't seen. Белгілі өткен уақыт (graduated) → PS."},
{id:"g8d11",diff:"hard",text:"The report ___ (write) by the time the meeting starts.",opts:["will write","will be written","has been written","is written"],ans:"will be written",exp:"By the time + болашақ → Future Perfect Passive: will be written (will have been written)."},
{id:"g8d12",diff:"hard",text:"Read: 'When I arrived at the station, the train ___ (already/leave). I ___ (wait) for an hour, so I ___ (be) very tired.'\n\nBlanks 1,2,3:",opts:["had already left / had waited / was","already left / waited / were","had already left / have waited / was","was already leaving / waited / was"],ans:"had already left / had waited / was",exp:"1) Past Perf (бұрын болған). 2) Past Perf (ұзақ үдеріс бітті). 3) Past Simple нәтиже."},
{id:"g8d13",diff:"hard",text:"The new law ___ (introduce) last year. Since then, crime rates ___ (fall) significantly.",opts:["was introduced / have fallen","introduced / have fallen","was introduced / fell","introduced / fell"],ans:"was introduced / have fallen",exp:"Last year → Past Passive: was introduced. Since then → PP: have fallen."},
{id:"g8d14",diff:"hard",text:"She ___ (study) medicine for 6 years. She ___ (just/pass) her final exams and ___ (become) a doctor next month.",opts:["has been studying / has just passed / will become","studied / just passed / becomes","has studied / just passed / is becoming","was studying / has passed / will become"],ans:"has been studying / has just passed / will become",exp:"For 6 years (қазірге дейін) → PP Cont. Just → PP. Next month → will."},
{id:"g8d15",diff:"hard",text:"Find the sentence with ALL tenses CORRECT:",opts:["By the time he called, she has already left.","While they are playing, it started raining.","The report was written before the meeting had started.","She has lived here since 2019, and she plans to stay."],ans:"She has lived here since 2019, and she plans to stay.",exp:"Дұрыс: PP (has lived) + since + PS (plans). ҚАТЕ: has→had left; are playing→were; had started→started."},
]
},
{
id:"g8e", title:"Оқылым (Reading Comprehension)", subtitle:"Мәтінді талдау стратегиялары",
icon:"📖", color:"#7c3aed",
darynNote:"Daryn 8-сынып олимпиадасы: 300-500 сөздік мәтін + 5-8 сұрақ. Skimming, scanning, inference (астарлы мағына), vocabulary in context — негізгі дағдылар.",
explanation:{
intro:`Daryn олимпиадасының оқылым бөлімі (Reading Comprehension) — мәтінді тез және дұрыс түсіну қабілетін тексереді. 8-сынып деңгейінде мәтіндер күрделі, сұрақтар да аналитикалық сипатта болады.`,
sections:[
{ title:"⚡ Skimming — жылдам оқу (Main idea)",
text:`Мәтінді жылдам оқып, жалпы мазмұнды түсіну. Бірінші және соңғы абзацтарға, тақырып сөйлемдеріне назар аудар.`,
tag:"What is the main idea?",
examples:["What is the main topic of the text?","What is the best title for the passage?","What does the author mainly discuss?","What is the purpose of the text?"]
},
{ title:"🔍 Scanning — нақты ақпарат іздеу",
text:`Нақты сұраққа жауап іздеу. Барлық мәтінді оқымай, сұрақтағы кілт сөздерді іздеп тап.`,
tag:"Find specific facts/dates/names",
examples:["When did the event happen?","How many people participated?","Who discovered this?","According to the text, which country...?"]
},
{ title:"💭 Inference — астарлы мағына",
text:`Мәтінде тікелей айтылмаған, бірақ контекстен шығаруға болатын ақпарат.`,
tag:"What can we infer? What does the author imply?",
examples:["What can we infer from paragraph 2?","What does the author imply about...?","It can be concluded from the text that...","The author's attitude towards X is..."]
},
{ title:"📝 Vocabulary in Context — контексттен сөз мағынасы",
text:`Сөздің мәтіндегі мағынасын контекст арқылы анықтау.`,
tag:"'X' in paragraph N most likely means...",
examples:["Қарама-қарсы мағына белгілері: but, however, although, yet","Ұқсас мағына белгілері: and, also, similarly, in addition","Мысал белгілері: for example, such as, like","Нәтиже белгілері: therefore, as a result, consequently"]
},
],
tips:[
"💡 Сұрақтарды алдымен оқы, содан кейін мәтінді оқы.",
"💡 'According to the text' → тікелей мәтіннен. 'We can infer' → астарлы.",
"💡 'The word X most likely means' → контексттен анықта, сөздікке сүйенбе.",
"💡 Мәтінде 'however/but' болса — контраст бар, мағынасы өзгереді!",
],
mistakes:[
"❌ Жалпы білімге сүйену (мәтіннен алу керек!)",
"❌ Тым нақты деталь (main idea сұраққа)",
"❌ Мәтінде жоқ ақпаратты таңдау",
]
},
questions:[
{id:"g8e1",diff:"easy",text:"TEXT: 'Nauryz is the most important holiday in Kazakhstan. It is celebrated on March 21st and marks the beginning of spring and the New Year according to the ancient Eastern calendar. Families come together, cook traditional dishes like nauryz-kozhe, and wish each other happiness.'\n\nWhen is Nauryz celebrated?",opts:["21st January","21st March","1st March","21st April"],ans:"21st March",exp:"Scanning: 'celebrated on March 21st' — мәтінде тікелей айтылған."},
{id:"g8e2",diff:"easy",text:"From the same text, Nauryz marks the beginning of ___.",opts:["winter","autumn","spring","summer"],ans:"spring",exp:"Scanning: 'marks the beginning of spring' — мәтінде тікелей."},
{id:"g8e3",diff:"easy",text:"TEXT: 'Despite being one of the smallest countries in Europe, Luxembourg has one of the highest GDPs per capita in the world. Its economy relies heavily on banking and financial services.'\n\nThe main idea of this text:",opts:["Luxembourg's geography","Luxembourg's economic success","European banking systems","Small countries in Europe"],ans:"Luxembourg's economic success",exp:"Main idea: Luxemburg — кішкентай, бірақ экономикасы күшті. GDP + banking = economic success."},
{id:"g8e4",diff:"medium",text:"TEXT: 'The Amazon rainforest produces 20% of the world's oxygen and is home to 10% of all species on Earth. However, deforestation is destroying it at an alarming rate — an area the size of a football pitch every single minute.'\n\nWhat can we INFER from this text?",opts:["The Amazon is not important","Deforestation is not a serious problem","Losing the Amazon could have major global consequences","Football is popular in the Amazon"],ans:"Losing the Amazon could have major global consequences",exp:"Астарлы мағына: 20% оттегі + 10% түр + жойылу → жойылса салдары үлкен болады."},
{id:"g8e5",diff:"medium",text:"From the same text, 'alarming rate' means:",opts:["a slow, gradual pace","a speed that causes concern","a natural, expected rate","an incredibly slow pace"],ans:"a speed that causes concern",exp:"Alarming = сигнал беретін, алаңдататын. 'Alarming rate' = алаңдататын жылдам қарқын."},
{id:"g8e6",diff:"medium",text:"TEXT: 'Social media has transformed the way we communicate. While it connects people across the globe, critics argue that it also promotes superficial relationships and reduces face-to-face interaction.'\n\nThe author's view on social media is:",opts:["Completely positive","Completely negative","Balanced — both positive and negative","Neutral — no opinion given"],ans:"Balanced — both positive and negative",exp:"'Connects' (позитив) + 'but critics argue' (негатив) → автор екі жақты пікір береді."},
{id:"g8e7",diff:"medium",text:"From the same text, 'superficial' relationships most likely means:",opts:["deep and meaningful","based only on the surface, not deep","international","online"],ans:"based only on the surface, not deep",exp:"Superficial = беткей, тереңсіз. Контекст: face-to-face interaction reduces = тереңдік жоқ."},
{id:"g8e8",diff:"hard",text:"TEXT: 'Marie Curie was the first woman to win a Nobel Prize and remains the only person to have won in two different scientific fields — Physics (1903) and Chemistry (1911). Born in Poland in 1867, she later moved to Paris, where she conducted her groundbreaking research on radioactivity despite facing significant gender discrimination.'\n\nWhat does 'groundbreaking' mean in context?",opts:["dangerous and risky","physically breaking the ground","revolutionary and innovative","difficult to understand"],ans:"revolutionary and innovative",exp:"Groundbreaking = жаңашыл, революциялық. Nobel Prize алды = зерттеу өте маңызды болды."},
{id:"g8e9",diff:"hard",text:"From the Marie Curie text, what can we infer about her challenges?",opts:["She had financial problems only","She faced both gender bias and scientific difficulties","She was not accepted by the Nobel committee","She disliked chemistry"],ans:"She faced both gender bias and scientific difficulties",exp:"'Despite gender discrimination' → жынысы үшін кедергі. Nobel алу = ғылыми қиындықтарды жеңді."},
{id:"g8e10",diff:"hard",text:"TEXT: 'Although renewable energy is becoming more affordable, many governments still subsidise fossil fuels. This inconsistency makes the transition to clean energy slower than necessary, according to environmental scientists.'\n\nThe word 'inconsistency' here refers to:",opts:["The high cost of solar panels","Governments supporting fossil fuels while promoting renewables","Scientists disagreeing with each other","The slow speed of renewable energy growth"],ans:"Governments supporting fossil fuels while promoting renewables",exp:"Inconsistency = қарама-қайшылық. Жаңартылатын энергияны қолдай отырып, fossil fuels-ке субсидия беру."},
{id:"g8e11",diff:"hard",text:"From the renewable energy text, 'subsidise' means:",opts:["ban and prohibit","financially support","use in large quantities","study and research"],ans:"financially support",exp:"Subsidise = қаржылай қолдау (grant money to). Governments subsidise = ақша бөледі."},
{id:"g8e12",diff:"hard",text:"TEXT: 'Artificial intelligence is no longer science fiction. From medical diagnostics to self-driving cars, AI is reshaping every sector of society. Yet, experts warn that without proper regulation, AI could lead to job displacement, privacy violations, and even autonomous weapons.'\n\nThe author's main purpose:",opts:["To celebrate AI's achievements","To oppose AI development completely","To present AI's benefits and warn about its risks","To explain how AI works technically"],ans:"To present AI's benefits and warn about its risks",exp:"'Is reshaping' (позитив) + 'Yet, experts warn' (негатив) → екі жақты мақсат."},
{id:"g8e13",diff:"hard",text:"From the AI text, 'job displacement' most likely means:",opts:["creating new jobs","people losing jobs due to AI","moving jobs to other countries","improving working conditions"],ans:"people losing jobs due to AI",exp:"Displacement = орнынан ығыстыру. Job displacement = AI адамдардың жұмысын алып кетуі."},
{id:"g8e14",diff:"hard",text:"TEXT: 'The Great Barrier Reef, stretching over 2,300 kilometres along Australia's coast, is the world's largest coral reef ecosystem. Alarmingly, rising ocean temperatures due to climate change have caused widespread coral bleaching, threatening the reef's survival.'\n\nWhich statement is NOT supported by the text?",opts:["The reef is over 2,000 km long","Climate change is threatening the reef","The reef has completely disappeared","Coral bleaching is a problem for the reef"],ans:"The reef has completely disappeared",exp:"Мәтінде 'threatening survival' дейді — жойылып кетті деп айтылмаған. Бұл тексте жоқ ақпарат."},
{id:"g8e15",diff:"hard",text:"From the Great Barrier Reef text, 'coral bleaching' is caused by:",opts:["Fishing activities","Rising ocean temperatures","Plastic pollution","Tourist activities"],ans:"Rising ocean temperatures",exp:"Scanning + inference: 'rising ocean temperatures due to climate change have caused widespread coral bleaching' — тікелей байланыс."},
]
},
]
}
};
// ─── HELPERS ──────────────────────────────────────────────────
const medal = (pct) => {
if(pct>=90) return {e:"🥇",msg:"Керемет! Республикалық кезеңге дайынсыз!",c:"#f0b232"};
if(pct>=75) return {e:"🥈",msg:"Өте жақсы! Аздаған жаттығу жетіспейді.",c:"#9ca3af"};
if(pct>=55) return {e:"🥉",msg:"Жаман емес! Дайындықты жалғастырыңыз.",c:"#b45309"};
return {e:"📚",msg:"Тоқтамаңыз — жаттығу сізді жеңіске жеткізеді!",c:"#6b7280"};
};
// ─── HOME ─────────────────────────────────────────────────────
function Home({grade,setGrade,setScreen,scores}){
const cur = CURRICULUM[grade];
const total = cur.topics.reduce((s,t)=>s+(scores[t.id]?.total||0),0);
const corr  = cur.topics.reduce((s,t)=>s+(scores[t.id]?.correct||0),0);
const done  = cur.topics.filter(t=>scores[t.id]).length;
return(
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
<div className="daryn-tag">📋 {cur.darynNote.slice(0,80)}...</div>
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
const sc  = scores[t.id];
const pct = sc ? Math.round(sc.correct/sc.total*100) : 0;
return(
<div key={t.id} className="tcard" style={{"--c":t.color}}
onClick={()=>setScreen({v:"lesson",topic:t})}>
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
<div className="qa-row" style={{marginTop:0}}>
<button className="qa-btn qa-prog" onClick={()=>setScreen({v:"progress"})}>📊 Менің Прогресім</button>
</div>
</div>
);
}
// ─── LESSON ───────────────────────────────────────────────────
function Lesson({topic,setScreen,setScores}){
const [tab, setTab]   = useState("theory");
const [qi,  setQi]   = useState(0);
const [sel, setSel]  = useState({});   // {questionId: chosenOption}
const [done,setDone] = useState(false);
const questions = topic.questions;
const q         = questions[qi] || questions[0];
const chosen    = sel[q.id];          // undefined if not yet answered
const answered  = chosen !== undefined;
const correct   = questions.filter(qq => sel[qq.id] === qq.ans).length;
const pct       = Math.round(correct / questions.length * 100);
function choose(opt){
if(answered) return;                // already answered this question
const next = {...sel, [q.id]: opt};
setSel(next);
// if last question save score
if(qi === questions.length - 1){
const c = questions.filter(qq=>next[qq.id]===qq.ans).length;
setScores(p=>({...p,[topic.id]:{correct:c,total:questions.length}}));
}
}
function reset(){
setSel({});
setQi(0);
setDone(false);
}
function goNext(){
if(qi < questions.length-1) setQi(qi+1);
else setDone(true);
}
// Coloring for options
function optStyle(opt){
if(!answered) return "opt";
if(opt === q.ans) return "opt opt-correct";
if(opt === chosen) return "opt opt-wrong";
return "opt opt-other";
}
const th = topic.explanation;
return(
<div className="screen">
<button className="back-btn" onClick={()=>setScreen({v:"home"})}>← Артқа</button>
<div style={{padding:"10px 20px 0",display:"flex",alignItems:"center",gap:12}}>
<span style={{fontSize:26}}>{topic.icon}</span>
<div>
<div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#e4ddd0"}}>{topic.title}</div>
<div style={{fontSize:12,color:"#3d4a60"}}>{topic.subtitle}</div>
</div>
</div>
{/* TABS */}
<div className="tabs" style={{marginTop:12}}>
<button className={`tab${tab==="theory"?" on":""}`} onClick={()=>setTab("theory")}>📖 Теория</button>
<button className={`tab${tab==="practice"?" on":""}`} onClick={()=>{setTab("practice");}}>✏️ Тест ({questions.length} сұрақ)</button>
</div>
{/* ── THEORY TAB ── */}
{tab==="theory" && (
<div className="th-wrap">
<div className="analysis-box">
<strong>📋 Daryn талдауы:</strong> {topic.darynNote}
</div>
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
{/* Progress bar */}
<div className="pbar" style={{"--c":topic.color}}>
<span className="pbar-txt">Сұрақ {qi+1}/{questions.length}</span>
<div className="pbar-track">
<div className="pbar-fill" style={{width:`${((qi+1)/questions.length)*100}%`}}/>
</div>
<span className="pbar-txt" style={{color:"#10b981"}}>{correct} ✓</span>
</div>
{/* Question number dots */}
<div className="qdots">
{questions.map((qq,i)=>{
let cls = "qdot";
if(i===qi) cls += " cur";
else if(sel[qq.id]!==undefined) cls += sel[qq.id]===qq.ans ? " ok2" : " fail";
return(
<button key={i} className={cls} onClick={()=>setQi(i)}>{i+1}</button>
);
})}
</div>
{/* Question card */}
<div className="q-wrap">
<div className="q-meta">
<span className="q-num">Сұрақ {qi+1}</span>
<span className={`diff ${q.diff==="easy"?"diff-easy":q.diff==="medium"?"diff-mid":"diff-hard"}`}>
{q.diff==="easy"?"Оңай":q.diff==="medium"?"Орташа":"Қиын"}
</span>
</div>
<div className="q-text">{q.text}</div>
{/* Options — NOT disabled, styled via className only */}
<div className="opts">
{q.opts.map((opt,oi)=>(
<button key={oi} className={optStyle(opt)}
onClick={()=>choose(opt)}>
{opt}
</button>
))}
</div>
{/* Feedback after answering */}
{answered && (
<div className={`fb ${chosen===q.ans?"ok":"bad"}`}>
{chosen===q.ans
? "✅ Дұрыс! "
: `❌ Дұрыс жауап: «${q.ans}». `
}
<strong>Түсіндірме:</strong> {q.exp}
</div>
)}
</div>
{/* Navigation */}
<div className="nav">
<button className="nbtn"
onClick={()=>setQi(Math.max(0,qi-1))}
style={{opacity:qi===0?0.3:1}}>
← Алдыңғы
</button>
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
return(
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
return(
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
// ─── MOCK TEST ─────────────────────────────────────────────────
function Mock({grade,setScreen}){
const cur = CURRICULUM[grade];
const allQ = cur.topics.flatMap(t=>t.questions);
const [phase, setPhase] = useState("intro");
const [qi,    setQi]   = useState(0);
const [sel,   setSel]  = useState({});
const [tl,    setTl]   = useState(45*60);
const timerRef = useRef(null);
const q       = allQ[qi];
const chosen  = sel[q?.id];
const answered= chosen !== undefined;
const correct = allQ.filter(qq=>sel[qq.id]===qq.ans).length;
const pct     = Math.round(correct/allQ.length*100);
const mm      = String(Math.floor(tl/60)).padStart(2,"0");
const ss      = String(tl%60).padStart(2,"0");
useEffect(()=>{
if(phase==="test"){
timerRef.current = setInterval(()=>{
setTl(t=>{
if(t<=1){ clearInterval(timerRef.current); setPhase("results"); return 0; }
return t-1;
});
},1000);
}
return()=>clearInterval(timerRef.current);
},[phase]);
function choose(opt){
if(answered) return;
setSel(p=>({...p,[q.id]:opt}));
}
function optStyle(opt){
if(!answered) return "opt";
if(opt===q.ans) return "opt opt-correct";
if(opt===chosen) return "opt opt-wrong";
return "opt opt-other";
}
function finish(){ clearInterval(timerRef.current); setPhase("results"); }
function restart(){ setSel({}); setQi(0); setTl(45*60); setPhase("intro"); }
if(phase==="intro") return(
<div className="screen">
<button className="back-btn" onClick={()=>setScreen({v:"home"})}>← Артқа</button>
<div className="mock-cover">
<div style={{fontSize:46,marginBottom:10}}>📝</div>
<div className="mock-ttl">Мок-Олимпиада</div>
<div className="mock-sub">{grade}-сынып · Daryn форматы · {allQ.length} сұрақ</div>
<div className="mock-rules">
<div className="mrule"><span className="mrule-ico">⏱</span>Уақыт: <strong style={{color:"#e4ddd0"}}>45 минут</strong></div>
<div className="mrule"><span className="mrule-ico">📋</span>Барлық тақырыптардан {allQ.length} сұрақ</div>
<div className="mrule"><span className="mrule-ico">🎯</span>75%+ = Облыстық кезеңге дайын</div>
<div className="mrule"><span className="mrule-ico">💡</span>Жоғарыдағы нөмірлерге басып кері оралуға болады</div>
</div>
<button className="start-btn" onClick={()=>setPhase("test")}>Тестті бастау →</button>
</div>
</div>
);
if(phase==="results"){
const m = medal(pct);
return(
<div className="screen">
<button className="back-btn" onClick={()=>setScreen({v:"home"})}>← Артқа</button>
<div className="res-wrap">
<div className="medal">{m.e}</div>
<div className="res-pct" style={{color:m.c}}>{pct}%</div>
<div className="res-lbl">{correct}/{allQ.length} дұрыс жауап</div>
<div className="res-msg">{m.msg}</div>
{cur.topics.map(t=>{
const sc = t.questions.filter(qq=>sel[qq.id]===qq.ans).length;
return(
<div key={t.id} style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:"10px 15px",display:"flex",justifyContent:"space-between",marginBottom:8}}>
<span style={{fontSize:13,color:"#8898b0"}}>{t.icon} {t.title}</span>
<span style={{fontWeight:700,color:"#818cf8"}}>{sc}/{t.questions.length}</span>
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
return(
<div key={i} className="rev-item">
<div className="rev-q">{qq.text.split("\n")[0].slice(0,90)}{qq.text.length>90?"...":""}</div>
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
return(
<div className="screen">
{/* Top bar */}
<div className="pbar" style={{"--c":topicOfQ?.color||"#6366f1"}}>
<span className="pbar-txt">{qi+1}/{allQ.length}</span>
<div className="pbar-track">
<div className="pbar-fill" style={{width:`${((qi+1)/allQ.length)*100}%`}}/>
</div>
<span className={`timer${tl<300?" warn":""}`}>{mm}:{ss}</span>
</div>
{/* Dot navigator */}
<div className="qdots">
{allQ.map((qq,i)=>{
let cls="qdot";
if(i===qi) cls+=" cur";
else if(sel[qq.id]!==undefined) cls+=sel[qq.id]===qq.ans?" ok2":" fail";
return <button key={i} className={cls} onClick={()=>setQi(i)}>{i+1}</button>;
})}
</div>
{/* Topic label */}
<div style={{padding:"4px 20px",fontSize:11,color:"#3d4a60"}}>
{topicOfQ?.icon} {topicOfQ?.title}
</div>
{/* Question */}
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
{/* Navigation */}
<div className="nav">
<button className="nbtn" onClick={()=>setQi(Math.max(0,qi-1))}
style={{opacity:qi===0?0.3:1}}>← Алдыңғы</button>
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
// ─── AI TEACHER ────────────────────────────────────────────────
function AIScreen({grade,setScreen}){
const cur = CURRICULUM[grade];
const chips = [
"Артикль бойынша мысалдар бер",
"Present Perfect пен Past Simple айырмасы",
"2nd Conditional-ды түсіндір",
"Word Formation жаттығулары",
"Passive Voice-ты қалай жасаймын?",
"Олимпиадаға қандай кеңес бересің?",
"Reported Speech ережелері",
];
const [msgs, setMsgs] = useState([
{r:"a", t:`Сәлем! Мен ${grade}-сынып ағылшын тілі олимпиадасының AI мұғалімімін.\n\nТақырыптарым: ${cur.topics.map(t=>t.title).join(", ")}.\n\nКез-келген сұрақ қоя аласыз — қазақша түсіндіремін!`}
]);
const [inp,  setInp]  = useState("");
const [load, setLoad] = useState(false);
const endRef = useRef(null);
useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);
async function send(text){
const t = (text||inp).trim();
if(!t||load) return;
setInp("");
setMsgs(m=>[...m,{r:"u",t}]);
setLoad(true);
try{
const history = msgs.map(m=>({role:m.r==="a"?"assistant":"user",content:m.t}));
const res = await fetch("/api/chat",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
model:"claude-sonnet-4-20250514",
max_tokens:1000,
system:`Сен ${grade}-сынып оқушыларына арналған ағылшын тілі олимпиада мұғаліміссің (Daryn.kz Қазақстан).
Ағымдағы тақырыптар: ${cur.topics.map(t=>t.title).join(", ")}.
Барлық жауаптарды ҚАЗАҚША жаз. Ағылшынша мысалдар міндетті — қазақша аудармасымен бер.
Грамматика ережелерін нақты, мысалдарға сүйеніп түсіндір.
Жаттығу сұрақтарды сұрасаларда — 4 опциялы MCQ форматында жаса, жауаптармен бер.
Нақты, ықшам, пайдалы бол.`,
messages:[...history,{role:"user",content:t}]
})
});
const d = await res.json();
const reply = d.content?.map(c=>c.text||"").join("") || "Кешіріңіз, қате шықты.";
setMsgs(m=>[...m,{r:"a",t:reply}]);
} catch(e){
setMsgs(m=>[...m,{r:"a",t:"Байланыс қатесі. Қайта көріңіз."}]);
}
setLoad(false);
}
return(
<div className="screen ai-wrap">
<button className="back-btn" onClick={()=>setScreen({v:"home"})}>← Артқа</button>
<div className="ai-hdr">
<div className="ai-hdr-t">🤖 AI Мұғалім — {grade}-сынып</div>
<div className="ai-hdr-s">Кез-келген тақырып бойынша қазақша түсіндірме және жаттығулар</div>
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
<div className="dotrow">
<div className="d"/><div className="d"/><div className="d"/>
</div>
</div>
)}
<div ref={endRef}/>
</div>
<div className="ai-bar">
<input className="ai-inp" value={inp}
onChange={e=>setInp(e.target.value)}
onKeyDown={e=>e.key==="Enter"&&send()}
placeholder="Сұрағыңызды жазыңыз..."/>
<button className="ai-send" onClick={()=>send()} disabled={load||!inp.trim()}>
Жіберу
</button>
</div>
</div>
);
}

// ─── STUDENT LOGIN ────────────────────────────────────────────
function StudentLogin({onLogin}){
const [name, setName] = useState("");
const [cls, setCls]   = useState("");
const [err, setErr]   = useState("");
function submit(){
if(!name.trim()||!cls.trim()){setErr("Атыңызды және сынып атауын толтырыңыз!"); return;}
onLogin(name.trim(), cls.trim());
}
return(
<div className="screen" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"24px 20px"}}>
<div style={{textAlign:"center",marginBottom:32}}>
<div style={{fontSize:52,marginBottom:12}}>🏆</div>
<div style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:"#1e2740",fontWeight:700,marginBottom:6}}>Daryn English</div>
<div style={{fontSize:13,color:"#94a3b8"}}>Олимпиада дайындығы жүйесі</div>
</div>
<div style={{background:"#fff",borderRadius:20,padding:"24px 20px",boxShadow:"0 4px 24px rgba(0,0,0,.10)",maxWidth:360,margin:"0 auto",width:"100%"}}>
<div style={{fontWeight:700,fontSize:15,color:"#1e2740",marginBottom:16}}>Кіру</div>
<div style={{marginBottom:14}}>
<label style={{fontSize:12,color:"#94a3b8",fontWeight:600,display:"block",marginBottom:6}}>АТ-ЖӨНІҢІЗ</label>
<input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}
placeholder="Мысалы: Айгерім Сейткали"
style={{width:"100%",padding:"11px 14px",border:"2px solid #e2e8f0",borderRadius:12,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",color:"#1e2740"}}/>
</div>
<div style={{marginBottom:14}}>
<label style={{fontSize:12,color:"#94a3b8",fontWeight:600,display:"block",marginBottom:6}}>СЫНЫП (мысалы: 7А, 8Б)</label>
<input value={cls} onChange={e=>setCls(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}
placeholder="Мысалы: 7А"
style={{width:"100%",padding:"11px 14px",border:"2px solid #e2e8f0",borderRadius:12,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",color:"#1e2740"}}/>
</div>
{err && <div style={{color:"#be123c",fontSize:12,marginBottom:10}}>{err}</div>}
<button onClick={submit} style={{width:"100%",padding:14,borderRadius:13,background:"linear-gradient(135deg,#7c3aed,#a78bfa)",border:"none",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 16px rgba(124,58,237,.30)"}}>
Бастау →
</button>
</div>
<div style={{textAlign:"center",marginTop:20}}>
<button onClick={()=>onLogin("__teacher__","__teacher__")} style={{background:"none",border:"none",color:"#94a3b8",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
🔑 Мұғалім режимі
</button>
</div>
</div>
);
}

// ─── TEACHER DASHBOARD ───────────────────────────────────────
function TeacherDashboard({setScreen,onLogout}){
const [step, setStep]       = useState("login"); // login | dashboard
const [pwd, setPwd]         = useState("");
const [err, setErr]         = useState("");
const [students, setStudents] = useState([]);
const [classes, setClasses]   = useState([]);
const [filter, setFilter]     = useState("all");
const [loading, setLoading]   = useState(false);
const GRADES=[5,6,7,8];

async function login(){
if(!pwd.trim()){setErr("Құпиясөзді енгізіңіз"); return;}
setLoading(true);
try{
const r = await fetch("/api/get-progress",{
method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({password:pwd,className:"all"})
});
const d = await r.json();
if(!r.ok){setErr(d.error||"Қате"); setLoading(false); return;}
setStudents(d.students||[]);
setClasses(d.classes||[]);
setStep("dashboard");
}catch(e){setErr("Байланыс қатесі");}
setLoading(false);
}

async function refresh(){
setLoading(true);
try{
const r = await fetch("/api/get-progress",{
method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({password:pwd,className:filter})
});
const d = await r.json();
if(r.ok){setStudents(d.students||[]);}
}catch(e){}
setLoading(false);
}

const filtered = filter==="all"?students:students.filter(s=>s.className===filter);
const avgPct = filtered.length>0 ? Math.round(filtered.reduce((s,st)=>s+(st.totalPct||0),0)/filtered.length) : 0;

if(step==="login") return(
<div className="screen" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"24px 20px"}}>
<button className="back-btn" onClick={onLogout}>← Артқа</button>
<div style={{background:"#fff",borderRadius:20,padding:"24px 20px",boxShadow:"0 4px 24px rgba(0,0,0,.10)",maxWidth:360,margin:"40px auto 0",width:"100%"}}>
<div style={{fontSize:32,textAlign:"center",marginBottom:12}}>🔑</div>
<div style={{fontFamily:"'Playfair Display',serif",fontSize:20,textAlign:"center",marginBottom:16,color:"#1e2740"}}>Мұғалім панелі</div>
<input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()}
placeholder="Құпиясөзді енгізіңіз"
style={{width:"100%",padding:"11px 14px",border:"2px solid #e2e8f0",borderRadius:12,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",marginBottom:10}}/>
{err&&<div style={{color:"#be123c",fontSize:12,marginBottom:8}}>{err}</div>}
<button onClick={login} disabled={loading} style={{width:"100%",padding:13,borderRadius:12,background:"linear-gradient(135deg,#0891b2,#06b6d4)",border:"none",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
{loading?"Жүктелуде...":"Кіру →"}
</button>
</div>
</div>
);

return(
<div className="screen">
<div style={{background:"#fff",borderBottom:"2px solid #e2e8f0",padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div>
<div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:"#1e2740"}}>📊 Мұғалім панелі</div>
<div style={{fontSize:11,color:"#94a3b8"}}>{filtered.length} оқушы · Орташа: {avgPct}%</div>
</div>
<div style={{display:"flex",gap:8}}>
<button onClick={refresh} style={{padding:"7px 12px",borderRadius:9,border:"2px solid #e2e8f0",background:"#fff",fontSize:12,cursor:"pointer",fontWeight:600}}>🔄</button>
<button onClick={onLogout} style={{padding:"7px 12px",borderRadius:9,border:"none",background:"#fee2e2",color:"#be123c",fontSize:12,cursor:"pointer",fontWeight:600}}>Шығу</button>
</div>
</div>

{classes.length>0 && (
<div style={{padding:"10px 16px",display:"flex",gap:8,flexWrap:"wrap",background:"#f8fafc",borderBottom:"1px solid #e2e8f0"}}>
<button onClick={()=>setFilter("all")} style={{padding:"5px 12px",borderRadius:8,border:`2px solid ${filter==="all"?"#7c3aed":"#e2e8f0"}`,background:filter==="all"?"#ede9fe":"#fff",color:filter==="all"?"#7c3aed":"#64748b",fontSize:12,cursor:"pointer",fontWeight:600}}>Барлығы</button>
{classes.map(c=>(
<button key={c} onClick={()=>setFilter(c)} style={{padding:"5px 12px",borderRadius:8,border:`2px solid ${filter===c?"#7c3aed":"#e2e8f0"}`,background:filter===c?"#ede9fe":"#fff",color:filter===c?"#7c3aed":"#64748b",fontSize:12,cursor:"pointer",fontWeight:600}}>{c}</button>
))}
</div>
)}

{filtered.length===0?(
<div style={{padding:40,textAlign:"center",color:"#94a3b8"}}>
<div style={{fontSize:40,marginBottom:12}}>👨‍🎓</div>
<div style={{fontSize:14}}>Әлі оқушы деректері жоқ</div>
<div style={{fontSize:12,marginTop:6}}>Оқушылар тапсырма орындаған соң осында көрінеді</div>
</div>
):(
<div style={{padding:"12px 16px 80px"}}>
{filtered.map((st,i)=>{
const pct=st.totalPct||0;
const gradeScores=st.scores||{};
return(
<div key={i} style={{background:"#fff",borderRadius:16,padding:"14px",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,.06)",border:`2px solid ${pct>=75?"#86efac":pct>=55?"#fcd34d":"#e2e8f0"}`}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
<div>
<div style={{fontWeight:700,fontSize:14,color:"#1e2740"}}>{st.studentName}</div>
<div style={{fontSize:11,color:"#94a3b8"}}>{st.className} сынып · {st.grade}-сынып деңгейі</div>
</div>
<div style={{textAlign:"right"}}>
<div style={{fontSize:22,fontWeight:700,color:pct>=75?"#15803d":pct>=55?"#d97706":"#94a3b8"}}>{pct}%</div>
<div style={{fontSize:10,color:"#94a3b8"}}>{new Date(st.updatedAt).toLocaleDateString("ru")}</div>
</div>
</div>
<div style={{height:6,background:"#f1f5f9",borderRadius:3,overflow:"hidden",marginBottom:8}}>
<div style={{height:"100%",borderRadius:3,background:pct>=75?"#22c55e":pct>=55?"#f59e0b":"#e2e8f0",width:`${pct}%`}}/>
</div>
<div style={{display:"flex",flexWrap:"wrap",gap:5}}>
{GRADES.flatMap(g=>(CURRICULUM[g]?.topics||[]).map(t=>{
const sc=(gradeScores[g]||{})[t.id];
if(!sc) return null;
const tpct=Math.round(sc.correct/sc.total*100);
return(
<span key={t.id} style={{fontSize:10,padding:"3px 8px",borderRadius:6,background:tpct>=75?"#dcfce7":tpct>=55?"#fef3c7":"#fff1f2",color:tpct>=75?"#15803d":tpct>=55?"#92400e":"#be123c",fontWeight:600}}>
{t.icon}{tpct}%
</span>
);
})).filter(Boolean)}
</div>
</div>
);
})}
</div>
)}
</div>
);
}

// ─── ROOT ──────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#f0f4ff;color:#1e2740;font-family:'DM Sans',sans-serif;min-height:100vh;}
::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:#c7d0f0;border-radius:3px;}
.app{min-height:100vh;background:linear-gradient(160deg,#eef2ff 0%,#f5f0ff 50%,#fff0f9 100%);}
.screen{animation:up .22s ease both;}
@keyframes up{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
/* ── HERO ── */
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
/* ── STATS ── */
.stats-row{display:flex;margin:0 16px 20px;background:#fff;border-radius:18px;box-shadow:0 2px 16px rgba(0,0,0,.07);overflow:hidden;}
.stat{flex:1;padding:14px 8px;text-align:center;border-right:1px solid #f1f5f9;}
.stat:last-child{border-right:none;}
.stat-n{font-family:'Playfair Display',serif;font-size:22px;color:#7c3aed;font-weight:700;}
.stat-l{font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.8px;margin-top:2px;}
/* ── TOPIC GRID ── */
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
/* ── NAV / BACK ── */
.back-btn{display:flex;align-items:center;gap:6px;background:none;border:none;color:#94a3b8;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;padding:16px 20px 6px;transition:color .2s;}
.back-btn:hover{color:#7c3aed;}
.tabs{display:flex;border-bottom:2px solid #e2e8f0;padding:0 20px;background:#fff;margin-top:4px;}
.tab{padding:12px 18px;font-size:13px;font-weight:600;color:#94a3b8;cursor:pointer;border:none;background:none;border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .2s;font-family:'DM Sans',sans-serif;}
.tab.on{color:#7c3aed;border-bottom-color:#7c3aed;}
/* ── THEORY ── */
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
/* ── PRACTICE ── */
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
/* ── RESULTS ── */
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
/* ── MOCK ── */
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
/* ── AI ── */
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
.qa-prog{background:linear-gradient(135deg,#0891b2,#06b6d4);color:#fff;box-shadow:0 4px 16px rgba(8,145,178,.25);border:none;}
.qa-prog:hover{box-shadow:0 6px 22px rgba(8,145,178,.35);transform:translateY(-1px);}

`;

// ─── PROGRESS TRACKER ────────────────────────────────────────
function Progress({grade,setGrade,setScreen,scores,allScores}){
const grades=[5,6,7,8];
return(
<div className="screen">
<button className="back-btn" onClick={()=>setScreen({v:"home"})}>← Артқа</button>
<div style={{padding:"16px 20px 8px"}}>
<div style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:"#1e2740",marginBottom:4}}>📊 Менің Прогресім</div>
<div style={{fontSize:12,color:"#94a3b8"}}>Барлық сыныптар бойынша нәтижелер</div>
</div>
{grades.map(g=>{
const cur=CURRICULUM[g];
const gScores=allScores[g]||{};
const total=cur.topics.reduce((s,t)=>s+(gScores[t.id]?.total||0),0);
const corr=cur.topics.reduce((s,t)=>s+(gScores[t.id]?.correct||0),0);
const done=cur.topics.filter(t=>gScores[t.id]).length;
const pct=total>0?Math.round(corr/total*100):0;
const m=pct>=90?"🥇":pct>=75?"🥈":pct>=55?"🥉":"📚";
return(
<div key={g} style={{margin:"0 16px 12px",background:"#fff",borderRadius:18,padding:"16px",boxShadow:"0 2px 12px rgba(0,0,0,.07)",border:"2px solid #e2e8f0"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
<div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:"#1e2740"}}>{g}-сынып</div>
<div style={{display:"flex",alignItems:"center",gap:8}}>
<span style={{fontSize:20}}>{m}</span>
<span style={{fontWeight:700,fontSize:18,color:pct>=75?"#15803d":pct>=55?"#d97706":"#94a3b8"}}>{pct}%</span>
</div>
</div>
<div style={{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden",marginBottom:8}}>
<div style={{height:"100%",borderRadius:4,background:pct>=75?"#22c55e":pct>=55?"#f59e0b":"#e2e8f0",width:`${pct}%`,transition:"width .4s"}}/>
</div>
<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#94a3b8",marginBottom:10}}>
<span>{done}/{cur.topics.length} тақырып</span>
<span>{corr}/{total} дұрыс</span>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
{cur.topics.map(t=>{
const sc=gScores[t.id];
const tpct=sc?Math.round(sc.correct/sc.total*100):0;
return(
<div key={t.id} style={{background:sc?"#f0fdf4":"#f8fafc",border:`1.5px solid ${sc?"#86efac":"#e2e8f0"}`,borderRadius:10,padding:"8px 10px",cursor:"pointer"}}
onClick={()=>{setGrade(g);setScreen({v:"lesson",topic:t});}}>
<div style={{fontSize:11,fontWeight:700,color:sc?"#15803d":"#94a3b8",marginBottom:2}}>{t.icon} {t.title}</div>
<div style={{fontSize:10,color:sc?"#16a34a":"#cbd5e1"}}>{sc?`${tpct}% (${sc.correct}/${sc.total})`:"Жаттықпаған"}</div>
</div>
);
})}
</div>
</div>
);
})}
<div style={{padding:"0 16px 30px"}}>
<div style={{background:"#f5f3ff",border:"2px solid #ddd6fe",borderRadius:16,padding:"16px"}}>
<div style={{fontWeight:700,color:"#7c3aed",marginBottom:8,fontSize:13}}>🎯 Daryn Олимпиада дайындығы деңгейі</div>
{(()=>{
const allT=grades.flatMap(g=>CURRICULUM[g].topics);
const allDone=allT.filter(t=>(allScores[t.grade]||allScores[grades.find(g=>CURRICULUM[g].topics.some(tt=>tt.id===t.id))]||{})[t.id]);
const totalQ=allT.reduce((s,t)=>s+t.questions.length,0);
const totalCorr=grades.reduce((s,g)=>{
const gs=allScores[g]||{};
return s+CURRICULUM[g].topics.reduce((ts,t)=>ts+(gs[t.id]?.correct||0),0);
},0);
const totalAns=grades.reduce((s,g)=>{
const gs=allScores[g]||{};
return s+CURRICULUM[g].topics.reduce((ts,t)=>ts+(gs[t.id]?.total||0),0);
},0);
const ovPct=totalAns>0?Math.round(totalCorr/totalAns*100):0;
return(
<div>
<div style={{fontSize:28,fontFamily:"'Playfair Display',serif",color:"#7c3aed",fontWeight:700}}>{ovPct}%</div>
<div style={{fontSize:12,color:"#6b7a99",marginTop:4}}>Жалпы нәтиже · {totalCorr}/{totalAns} дұрыс жауап</div>
<div style={{fontSize:12,color:"#7c3aed",marginTop:6,fontWeight:600}}>
{ovPct>=90?"🥇 Республикалық кезеңге дайынсыз!":ovPct>=75?"🥈 Облыстық кезеңге дайынсыз!":ovPct>=55?"🥉 Аудандық кезеңге дайынсыз!":"📚 Дайындықты жалғастырыңыз!"}
</div>
</div>
);
})()}
</div>
</div>
</div>
);
}

export default function App(){
const [screen, setScreen]     = useState({v:"home"});
const [grade,  setGrade]      = useState(7);
const [student, setStudent]   = useState(null); // {name, className}
const [isTeacher, setIsTeacher] = useState(false);
const [allScores, setAllScores] = useState({5:{},6:{},7:{},8:{}});
const scores = allScores[grade]||{};

function setScores(fn){
setAllScores(prev=>{
const cur=prev[grade]||{};
const next=typeof fn==="function"?fn(cur):fn;
const updated={...prev,[grade]:next};
// Auto-save to server
if(student){
const totalCorr=Object.values(updated).flatMap(g=>Object.values(g)).reduce((s,sc)=>s+(sc.correct||0),0);
const totalAns=Object.values(updated).flatMap(g=>Object.values(g)).reduce((s,sc)=>s+(sc.total||0),0);
const totalPct=totalAns>0?Math.round(totalCorr/totalAns*100):0;
fetch("/api/save-progress",{
method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({studentName:student.name,className:student.className,grade,scores:updated,totalPct})
}).catch(()=>{});
}
return updated;
});
}

function handleLogin(name,cls){
if(name==="__teacher__"){setIsTeacher(true); return;}
setStudent({name,className:cls});
const savedGrade=localStorage.getItem(`daryn_grade_${name}`);
if(savedGrade) setGrade(parseInt(savedGrade));
const saved=localStorage.getItem(`daryn_scores_${name}`);
if(saved) try{setAllScores(JSON.parse(saved));}catch(e){}
}

function handleLogout(){setStudent(null);setIsTeacher(false);}

useEffect(()=>{
if(student) localStorage.setItem(`daryn_scores_${student.name}`,JSON.stringify(allScores));
},[allScores,student]);

useEffect(()=>{
if(student) localStorage.setItem(`daryn_grade_${student.name}`,String(grade));
},[grade,student]);

useEffect(()=>{
const el = document.createElement("style");
el.textContent = STYLES;
document.head.appendChild(el);
return ()=>document.head.removeChild(el);
},[]);

if(!student && !isTeacher) return <StudentLogin onLogin={handleLogin}/>;
if(isTeacher) return <TeacherDashboard setScreen={setScreen} onLogout={handleLogout}/>;

return(
<div className="app">
<div style={{background:"#fff",borderBottom:"1px solid #f1f5f9",padding:"8px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{fontSize:12,color:"#64748b",fontWeight:600}}>👤 {student.name} · {student.className}</div>
<button onClick={handleLogout} style={{background:"none",border:"none",fontSize:11,color:"#94a3b8",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Шығу</button>
</div>
{screen.v==="home"     && <Home grade={grade} setGrade={setGrade} setScreen={setScreen} scores={scores}/>}
{screen.v==="lesson"   && <Lesson topic={screen.topic} setScreen={setScreen} setScores={setScores}/>}
{screen.v==="mock"     && <Mock grade={grade} setScreen={setScreen}/>}
{screen.v==="ai"       && <AIScreen grade={grade} setScreen={setScreen}/>}
{screen.v==="progress" && <Progress grade={grade} setGrade={setGrade} setScreen={setScreen} scores={scores} allScores={allScores}/>}
</div>
);
}
