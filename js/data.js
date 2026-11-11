/* ==========================================================
   Banana Sees: idiom data
   ----------------------------------------------------------
   To add a new idiom, copy one block below and edit it.
   - id            : short ascii word, used in the page link (#crow)
   - idiom         : the proverb itself (Malayalam)
   - question*     : the "what happens if…" question
   - hint          : a subtle clue (never say "drag"; let players discover it)
   - dragItem      : emoji the player drags
   - dragTarget    : emoji it must be dropped on
   - resultEmoji   : what actually happens (shown big)
   - expectedEmoji : what people expected (shown faded, crossed out)
   - options       : four choices (A–D), each with its own reply
   - correct       : index of the right option (0 = A, 1 = B, …)
   ========================================================== */

/* ==========================================================
   Site details shown on the About / Contact page.
   Fill in the ones you want. Empty ones are simply hidden.
   ========================================================== */
const SITE = {
  owner: "Your Name",              // shown in the footer: © year owner
  creator: "The Banana Team",
  linkedin: "",     // e.g. "https://linkedin.com/in/yourname"
  github: "",       // e.g. "https://github.com/yourname"
  email: "",        // e.g. "hello@example.com"
  instagram: "",    // e.g. "https://instagram.com/yourname"
  website: ""       // e.g. "https://yoursite.com"
};

const IDIOMS = [
  {
    id: "crow",
    emoji: "🐦‍⬛",
    idiom: "കാക്ക കുളിച്ചാൽ കൊക്കാകുമോ?",
    questionMl: "ഒരു കാക്ക നന്നായി കുളിച്ചാൽ കൊക്കായി മാറുമോ?",
    questionEn: "Will a crow turn into a crane if it takes a bath?",
    hint: "One of these is grubby. The other is wet. Funny how that works.",
    dragItem: "🐦‍⬛",
    dragTarget: "🛁",
    resultEmoji: "🐦‍⬛",
    expectedEmoji: "🦢",
    resultMl: "പ്ലിം! തൂവൽ കിടുക്കി, പക്ഷേ കൊക്കാകാൻ നോക്കിയ ആള് ഇപ്പോഴും നമ്മുടെ പഴയ കാക്ക തന്നെ, നനഞ്ഞൊലിച്ച് നിൽപ്പുണ്ട്.",
    resultEn: "Squeaky clean. Same beak, same attitude, same crow. The tub did its best and lost.",
    meaningMl: "പുറമേ എത്ര തേച്ചുമിനുക്കിയാലും ഉള്ളിലെ സ്വഭാവം പോകില്ല മോനേ. കാക്ക കുളിച്ചാലും കാക്ക തന്നെ.",
    meaningEn: "Scrub the outside all you want. The personality stays on, uninvited and dripping.",
    options: [
      {
        textMl: "കൊക്കായി മാറും 🦢",
        textEn: "It becomes a crane",
        replyMl: "കൊക്കോ? സോപ്പിട്ടാൽ കൊക്കാകുമെങ്കിൽ ഞാൻ കുളിച്ചിറങ്ങുമ്പോ സിനിമാനടനായേനെ. ഒന്നും നടന്നില്ലല്ലോ ചേട്ടാ.",
        replyEn: "A little soap and it’s a crane. By that logic my shower is a talent agency."
      },
      {
        textMl: "കാക്ക തന്നെ, പക്ഷേ വൃത്തിയുള്ളത്",
        textEn: "Still a crow, just cleaner",
        replyMl: "ആഹാ, പൊളി! കാക്ക കാക്ക തന്നെ. തലയിലെ ഒരു ബൾബ് കത്തിയല്ലേ? ഇനി അതും കൊണ്ട് അഹങ്കരിക്കണ്ട.",
        replyEn: "Well, look at that. A crow stayed a crow. One brain cell clocked in. Don’t throw it a party."
      },
      {
        textMl: "പെൻഗ്വിനായി മാറും 🐧",
        textEn: "It becomes a penguin",
        replyMl: "പെൻഗ്വിനോ? ഇത് നമ്മുടെ ബാത്ത്റൂമാടാ, അന്റാർട്ടിക്ക അല്ല. ഫ്രിഡ്ജ് തുറന്ന് കിടന്നോ?",
        replyEn: "A penguin. Unless this bathroom grew icebergs, that’s a crow having an identity crisis."
      },
      {
        textMl: "സോപ്പ് കമ്പനി തുടങ്ങും",
        textEn: "It starts a soap company",
        replyMl: "സോപ്പ് കമ്പനി! നല്ല പിച്ചാണ്, പക്ഷേ ചോദ്യം കാക്കയെ കുറിച്ചാ, ഷെയർ മാർക്കറ്റിനെ കുറിച്ചല്ല.",
        replyEn: "It founds a soap empire. Inspiring deck. The crow is still standing there, dripping, unemployed."
      }
    ],
    correct: 1
  },
  {
    id: "elephant",
    emoji: "🐘",
    idiom: "ആന വായിൽ അമ്പഴങ്ങ",
    questionMl: "വിശന്ന ആനയ്ക്ക് ഒരു അമ്പഴങ്ങ കിട്ടിയാൽ വയറു നിറയുമോ?",
    questionEn: "Does a hungry elephant get full from one tiny hog plum?",
    hint: "Someone here is very hungry. Someone else is very small.",
    dragItem: "🫐",
    dragTarget: "🐘",
    resultEmoji: "🐘",
    expectedEmoji: "😋",
    resultMl: "ഗ്ലപ്പ്! അമ്പഴങ്ങ അകത്ത്, ആനയുടെ വിശപ്പ് പഴയതുപോലെ തന്നെ. ആന അതറിഞ്ഞത് പോലുമില്ല.",
    resultEn: "Down the hatch. The elephant has already forgotten you existed.",
    meaningMl: "വല്യ വിശപ്പിന് ഒരു കുഞ്ഞു അമ്പഴങ്ങ കൊടുത്തിട്ട് എന്ത് കാര്യം? സഹായം ഉണ്ട്, പക്ഷേ ആനയ്ക്ക് അതൊരു തമാശയാ.",
    meaningEn: "A giant hunger, one tiny fruit. Nice gesture. The stomach didn’t even clock it.",
    options: [
      {
        textMl: "വയറു നിറഞ്ഞ് ഉറങ്ങും 😴",
        textEn: "Tummy full, nap time",
        replyMl: "ഒരു അമ്പഴങ്ങ കൊണ്ട് ആന നിറഞ്ഞ് ഉറങ്ങുമെന്നോ? എന്നാൽ ഞാൻ ഒരു കപ്പലണ്ടി കൊണ്ട് ഓണസദ്യ കഴിച്ചേക്കാം.",
        replyEn: "Full, then a nap. One plum. I’ll pay the landlord with a raisin and a smile."
      },
      {
        textMl: "അമ്പഴങ്ങ മരമായി വളരും",
        textEn: "The plum grows into a tree",
        replyMl: "അമ്പഴങ്ങ ആനയുടെ വയറ്റിൽ മരമായി വളരുമെന്നോ? ഏത് കൃഷിഭവനാ ഇത് പറഞ്ഞത് മോനേ?",
        replyEn: "It grows into a tree. Inside the elephant. Agriculture has left the group chat."
      },
      {
        textMl: "ആനയ്ക്ക് ഒന്നും തോന്നില്ല, വിശപ്പ് അങ്ങനെ തന്നെ",
        textEn: "Feels nothing, still hungry",
        replyMl: "അതെ, ആന അറിഞ്ഞതുപോലുമില്ല. കല്യാണസദ്യക്ക് ഒരു കപ്പലണ്ടി വിളമ്പിയ പോലെ. ശരിയാ, കേട്ടോ.",
        replyEn: "Correct, annoyingly. Still starving. One peanut and you called it catering."
      },
      {
        textMl: "ആന പരാതി കൊടുക്കും",
        textEn: "The elephant files a complaint",
        replyMl: "പരാതിയോ? ആന അടുത്ത അമ്പഴങ്ങ എവിടെ എന്ന് നോക്കി നടക്കുവാ, വില്ലേജ് ഓഫീസിൽ പോകാൻ നേരമില്ല.",
        replyEn: "Files a complaint. The elephant is hunting a meal, not a village office."
      }
    ],
    correct: 2
  },
  {
    id: "rice",
    emoji: "🍙",
    idiom: "ഉരുളയ്ക്ക് ഉപ്പേരി",
    questionMl: "ഒരു ചോറുരുള എറിഞ്ഞാൽ തിരിച്ചു എന്ത് വരും?",
    questionEn: "You throw a rice ball. What comes flying back?",
    hint: "Somebody over there just can’t resist replying.",
    dragItem: "🍙",
    dragTarget: "😎",
    resultEmoji: "🍛",
    expectedEmoji: "🤐",
    resultMl: "ചോറുരുള അകത്ത്, ഉപ്പേരി പുറത്ത്! നീ പറഞ്ഞു തീരുംമുമ്പേ മറുപടി റെഡി.",
    resultEn: "Rice ball in, curry flying back. Your sentence didn’t even find a chair.",
    meaningMl: "എന്ത് പറഞ്ഞാലും അപ്പോൾത്തന്നെ നല്ല കിടിലൻ തിരിച്ചടി. വാ അടയ്ക്കും മുൻപേ മറുപടി കിട്ടും.",
    meaningEn: "Say anything. A sharp reply lands before your mouth shuts. Silence is not on the menu.",
    options: [
      {
        textMl: "ചൂടൻ ഉപ്പേരിയുമായി ഒരു മറുപടി",
        textEn: "A hot curry of a comeback",
        replyMl: "ശരിയാ! ചൂടൻ മറുപടി, കൃത്യസമയത്ത്. ഒരു പ്രാവശ്യം കിട്ടി, ഇനി അങ്ങനെ തുള്ളിച്ചാടണ്ട.",
        replyEn: "A hot comeback, right on time. You got one. The parade stays cancelled."
      },
      {
        textMl: "മൗനം 🤐",
        textEn: "Silence",
        replyMl: "മൗനമോ? ഇയാൾ മിണ്ടാതിരിക്കുന്ന ദിവസം കലണ്ടറിൽ ചുവപ്പ് മഷികൊണ്ട് അടയാളപ്പെടുത്തണം.",
        replyEn: "Silence. From the comeback machine. That’s not an answer, that’s fan fiction."
      },
      {
        textMl: "ഒരു ബൂമറാങ്",
        textEn: "A boomerang",
        replyMl: "ബൂമറാങ്! തിരിച്ചു വരുന്നത് വടിയല്ല മോനേ, ചൂടൻ ഉപ്പേരിയാ, നെഞ്ചത്തോട്ട്.",
        replyEn: "A boomerang. Cute. This one comes back dripping, and it remembers your name."
      },
      {
        textMl: "പിസ്സ 🍕",
        textEn: "A pizza",
        replyMl: "പിസ്സയോ! കറിവേപ്പില മൂലയ്ക്ക് ഇരുന്ന് കരയുന്നത് കേൾക്കുന്നില്ലേ?",
        replyEn: "Pizza. The curry leaves have started a support group and you’re not invited."
      }
    ],
    correct: 0
  },
  {
    id: "jackfruit",
    emoji: "🍈",
    idiom: "ചക്കിനു വച്ചത് കൊക്കിനു കൊണ്ടു",
    questionMl: "ചക്കയ്ക്ക് ഉന്നം വച്ചാൽ ശരിക്കും എന്തിൽ കൊള്ളും?",
    questionEn: "You aim at a jackfruit. What does the arrow actually hit?",
    hint: "The jackfruit looks nervous. Probably nothing.",
    dragItem: "🏹",
    dragTarget: "🍈",
    resultEmoji: "🦢",
    expectedEmoji: "🍈",
    resultMl: "ചക്കയ്ക്ക് ഒരു പോറലുമില്ല. അമ്പ് നേരെ പോയി ഒരു പാവം കൊക്കിന്. ഉന്നം ഒരാളെ, പണി കിട്ടിയത് വേറൊരാൾക്ക്.",
    resultEn: "The jackfruit is unbothered. The crane is filing a complaint with fate.",
    meaningMl: "ഒരാൾക്ക് വച്ചത് വഴിതെറ്റി വേറൊരാൾക്ക് കൊള്ളും. ഉന്നം ശരിയാ, പക്ഷേ ഇര തെറ്റി.",
    meaningEn: "You lined up one target. Someone else collected the bruise and went home limping.",
    options: [
      {
        textMl: "ചക്കയിൽ തന്നെ, കിറുകൃത്യം 🎯",
        textEn: "The jackfruit, perfect shot",
        replyMl: "കിറുകൃത്യം ചക്കയിലെന്നോ? അമ്പ് അത്ര നേരെ പോയിരുന്നെങ്കിൽ ഈ പഴഞ്ചൊല്ല് പട്ടിണി കിടന്നേനെ.",
        replyEn: "Bullseye. If arrows behaved, this proverb would be unemployed and bitter."
      },
      {
        textMl: "ചന്ദ്രനിൽ 🌙",
        textEn: "The moon",
        replyMl: "ചന്ദ്രനോ! ഭൂമിയിലെ ഒരു കൊക്കിനെ പോലും ഒഴിവാക്കാൻ പറ്റാത്ത അമ്പ് ചന്ദ്രനിൽ പോകാനോ?",
        replyEn: "The moon. The arrow can’t clear a bird and you’ve booked a launch."
      },
      {
        textMl: "ദേഷ്യം പിടിച്ച തേനീച്ചയിൽ 🐝",
        textEn: "An angry bee",
        replyMl: "തേനീച്ച! അവർക്ക് ഇന്ന് ലീവാ. കൊക്ക് ഡ്യൂട്ടിയിലുണ്ടായിരുന്നു, പാവം.",
        replyEn: "An angry bee. They had the day off. The crane was tragically available."
      },
      {
        textMl: "ഒന്നുമറിയാത്ത ഒരു കൊക്കിൽ",
        textEn: "An innocent crane",
        replyMl: "അതന്നെ! ചക്ക ചിരിച്ചോണ്ട് നിന്നു, അടി കിട്ടിയത് കൊക്കിന്. നീതിക്ക് ഇന്ന് ലീവാ. നീ ശരിയാക്കി, പൊങ്ങച്ചം വേണ്ട.",
        replyEn: "There it is. Jackfruit walked, crane paid. You noticed. Try not to glow."
      }
    ],
    correct: 3
  },
  {
    id: "squirrel",
    emoji: "🐿️",
    idiom: "അണ്ണാറക്കണ്ണനും തന്നാലായത്",
    questionMl: "അണ്ണാൻ ഒരു ചെറിയ കല്ലു കൊണ്ടുവന്നാൽ പാലത്തിന് എന്ത് പ്രയോജനം?",
    questionEn: "A squirrel brings one tiny stone. Any use for the bridge?",
    hint: "Little paws, big plans. The squirrel has its eye on something.",
    dragItem: "🪨",
    dragTarget: "🐿️",
    resultEmoji: "🌉",
    expectedEmoji: "🤷",
    resultMl: "ഒരു കല്ല്, പിന്നൊരു കല്ല്… ആരും അറിയാതെ ഒരു പാലം പൊങ്ങി. അണ്ണാൻ ശമ്പളം പോലും ചോദിച്ചില്ല.",
    resultEn: "Pebble, then another. Rude of a whole bridge to show up without a committee.",
    meaningMl: "എല്ലാവരും കഴിയുന്നത് ചേർത്താൽ വലിയ കാര്യമാകും. ചെറിയ കല്ലും ചെറുതല്ല കേട്ടോ.",
    meaningEn: "Whatever you can carry still counts. Bridges are built by people who didn’t wait to be important.",
    options: [
      {
        textMl: "ഒരു പ്രയോജനവുമില്ല, വീട്ടിൽ പോ",
        textEn: "Totally useless, go home",
        replyMl: "ഒരു പ്രയോജനവുമില്ലെന്നോ? രാമായണത്തിലെ അണ്ണാനോട് ഇത് പറഞ്ഞു നോക്ക്, ഞാൻ നിന്റെ ചെരുപ്പ് പിടിക്കാം.",
        replyEn: "Useless, go home. Say that to the Ramayana squirrel. I’ll hold your slippers."
      },
      {
        textMl: "ചെറിയ സഹായവും വിലയുള്ളതാണ്",
        textEn: "Small help is valuable too",
        replyMl: "ആഹാ, ചെറിയ കല്ലിനും വിലയുണ്ട്. മനസ്സിലായല്ലോ. ഇത് ഫ്രെയിം ചെയ്ത് വയ്ക്കാനൊന്നും പോകണ്ട.",
        replyEn: "Fine. Small stones count. Mildly annoying that you knew. Don’t laminate it."
      },
      {
        textMl: "അണ്ണാൻ വിരമിക്കും",
        textEn: "The squirrel retires",
        replyMl: "ആദ്യത്തെ കല്ലിട്ടിട്ട് വിരമിക്കുന്നോ? പാലം പകുതിയിൽ, അണ്ണാൻ ബീച്ചിൽ. കൊള്ളാം.",
        replyEn: "Retirement after stone one. The bridge would like a word with HR."
      },
      {
        textMl: "ശമ്പളം ചോദിക്കും 💸",
        textEn: "It asks for a salary",
        replyMl: "ശമ്പളമോ! പാലം ഇല്ല, യൂണിയൻ റെഡി. ആദ്യം ഒരു കല്ല് കൂടി വയ്ക്ക്, ചർച്ച പിന്നെ.",
        replyEn: "A salary already. The ink on the first pebble isn’t dry. Sit down, contractor."
      }
    ],
    correct: 1
  },
  {
    id: "onam",
    emoji: "🍽️",
    idiom: "കാണം വിറ്റും ഓണം ഉണ്ണണം",
    questionMl: "ഓണം വന്നു, പോക്കറ്റ് കാലി. ഇനി എന്ത് ചെയ്യും?",
    questionEn: "Onam is here and the pocket is empty. Now what?",
    hint: "The feast is calling. The dealer is waiting. Your move.",
    dragItem: "🏡",
    dragTarget: "🧑‍💼",
    resultEmoji: "🍽️",
    expectedEmoji: "😢",
    resultMl: "വീട് പോയി, സദ്യ വന്നു! വിലാസം ഇല്ല, പാൽപ്പായസം കിടിലം. മുൻഗണന ക്ലിയർ.",
    resultEn: "House traded in. Sadya secured. No address, excellent payasam. Priorities, unhinged and clear.",
    meaningMl: "വലിയ ആഘോഷം വില നോക്കാതെ നടത്തും. ഓണത്തിന് മുന്നിൽ കീശ ഒരു ഒഴികഴിവല്ല.",
    meaningEn: "The feast gets paid even when the house is the payment. The occasion does not negotiate.",
    options: [
      {
        textMl: "ഓണം വേണ്ട, ഇരുന്ന് വിഷമിക്കും",
        textEn: "Skip Onam, sit and sulk",
        replyMl: "ഓണം വേണ്ടെന്ന് വച്ച് ഇരുന്ന് വിഷമിക്കുന്നോ? സദ്യ ഇലയിൽ ഇരുന്ന് കരയുവാ.",
        replyEn: "Skip the feast and sulk. The sadya has judged you and left the group."
      },
      {
        textMl: "പഴ്സ് തിന്നും 👛",
        textEn: "Eat the wallet",
        replyMl: "പഴ്സ് തിന്നുമെന്നോ? നല്ല ഐഡിയ, ദഹിക്കാൻ ഭയങ്കര എളുപ്പമായിരിക്കും.",
        replyEn: "Eat the wallet. Crunchy, expensive, and still emptier than the plan."
      },
      {
        textMl: "ഭൂമി വിറ്റും സദ്യ ഉണ്ണും",
        textEn: "Sell the land, eat the feast",
        replyMl: "അതെ! ഭൂമി വിറ്റും സദ്യ ഉണ്ണും. ഇതാണ് ശരിക്കുള്ള മലയാളി മുൻഗണന, അഭിനന്ദനങ്ങൾ.",
        replyEn: "Sell the land, eat the sadya. You understood. Please keep your actual house."
      },
      {
        textMl: "പിസ്സ ഓർഡർ ചെയ്യും 🍕",
        textEn: "Order a pizza",
        replyMl: "തിരുവോണത്തിന് പിസ്സയോ? പൂർവികർ നിന്നെ അൺഫോളോ ചെയ്തു മോനേ.",
        replyEn: "Pizza on Thiruvonam. The ancestors changed the Wi-Fi password out of spite."
      }
    ],
    correct: 2
  },
  {
    id: "monkey",
    emoji: "🐒",
    idiom: "കുരങ്ങന്റെ കയ്യിൽ പൂമാല",
    questionMl: "ഒരു കുരങ്ങന്റെ കയ്യിൽ വിലപിടിപ്പുള്ള പൂമാല കിട്ടിയാൽ എന്താകും?",
    questionEn: "What happens when a monkey gets something precious?",
    hint: "A delicate thing and a curious paw. What could go wrong?",
    dragItem: "💐",
    dragTarget: "🐒",
    resultEmoji: "🐒",
    expectedEmoji: "💐",
    resultMl: "പൂമാലയ്ക്ക് ആയുസ് അഞ്ച് സെക്കൻഡ്. ബാക്കി കാട്ടിൽ പൂമഴ. പൂക്കൾക്ക് ഒരു വക്കീൽ വേണം.",
    resultEn: "Five seconds of glory, then jungle confetti. The flowers would like a lawyer.",
    meaningMl: "വിലയറിയാത്തവന്റെ കയ്യിൽ കിട്ടിയാൽ വിലപ്പെട്ടതും പാഴാകും. കയ്യിൽ കിട്ടിയാൽ പോര, സൂക്ഷിക്കാനും അറിയണം.",
    meaningEn: "Something precious in careless hands doesn’t stay precious. It becomes a mess with a story.",
    options: [
      {
        textMl: "മാല ഭംഗിയായി കഴുത്തിലിടും",
        textEn: "It wears the garland beautifully",
        replyMl: "ഭംഗിയായി കഴുത്തിലിടുമെന്നോ? ആ കുരങ്ങൻ ഇൻസ്റ്റഗ്രാം ഇൻഫ്ലുവൻസർ ഒന്നുമല്ല മോനേ.",
        replyEn: "Wears it beautifully. The monkey’s fashion week was cancelled by the monkey."
      },
      {
        textMl: "മാല പൊട്ടിച്ച് കളയും",
        textEn: "It tears the garland apart",
        replyMl: "അതെ, പൊട്ടിച്ച് ഒരു വഴിക്കാക്കി. വിലയറിയാത്ത കയ്യിൽ വിലപിടിപ്പുള്ളത് കിട്ടിയാൽ ഇതൊക്കെ തന്നെ.",
        replyEn: "Torn to bits, as expected. The flowers are furious. You can stop looking pleased."
      },
      {
        textMl: "മാല കൊണ്ട് വീട് അലങ്കരിക്കും",
        textEn: "It decorates its home",
        replyMl: "വീട് അലങ്കരിക്കുമോ? കുരങ്ങന് ഇന്റീരിയർ ഡിസൈനിങ് അറിയാമായിരുന്നെങ്കിൽ ഇതൊരു ഷോ ആയേനെ.",
        replyEn: "Home décor. Step one was ‘don’t shred it’. We are still stuck on step one."
      },
      {
        textMl: "മാലയ്ക്ക് ഇൻഷുറൻസ് എടുക്കും",
        textEn: "It insures the garland",
        replyMl: "മാലയ്ക്ക് ഇൻഷുറൻസോ! ആ കുരങ്ങന് ഇൻഷുറൻസ് എന്താണെന്ന് പോലും അറിയില്ല ചേട്ടാ.",
        replyEn: "Insures the garland. The claim died in the time it took to find a pen."
      }
    ],
    correct: 1
  },
  {
    id: "elephantfall",
    emoji: "🐘",
    idiom: "അടി തെറ്റിയാൽ ആനയും വീഴും",
    questionMl: "ഒരു വലിയ ആനയ്ക്ക് അടി തെറ്റിയാൽ എന്ത് സംഭവിക്കും?",
    questionEn: "Can even an elephant fall after one wrong step?",
    hint: "That log looks a bit wobbly. That elephant looks a bit heavy.",
    dragItem: "🐘",
    dragTarget: "🪵",
    resultEmoji: "🐘",
    expectedEmoji: "💥",
    resultMl: "അടി തെറ്റി! വല്യ ആന, അതേ നിലം. വലുപ്പം ഇൻഷുറൻസ് ഒന്നുമല്ല മോനേ.",
    resultEn: "One bad step. Big elephant. Same floor as everyone else. Loud, and fair.",
    meaningMl: "എത്ര വലിയവനായാലും ഒരു ചുവട് തെറ്റിയാൽ വീഴും. ആരും വീഴ്ചയ്ക്ക് മുകളിലല്ല.",
    meaningEn: "Nobody is too big for a bad step. Power doesn’t come with a handrail.",
    options: [
      {
        textMl: "ആന ഒരിക്കലും വീഴില്ല",
        textEn: "An elephant never falls",
        replyMl: "ആന ഒരിക്കലും വീഴില്ലെന്നോ? ഗ്രാവിറ്റി അങ്ങനെ VIP കളെ വിടാറില്ല മോനേ.",
        replyEn: "Never falls. Gravity would like that in writing, signed and stamped by the elephant."
      },
      {
        textMl: "ആനയ്ക്കും വീഴാം",
        textEn: "Even an elephant can fall",
        replyMl: "അതെ, ആനയ്ക്കും വീഴാം. വലുപ്പം ഒരു കൈപ്പിടിയല്ലല്ലോ. ആഹാ, ശരിയായി കേട്ടോ.",
        replyEn: "Even the elephant hits the floor. One point. The crown stays in the box."
      },
      {
        textMl: "ആന പറന്നു രക്ഷപ്പെടും",
        textEn: "It flies away",
        replyMl: "ആന പറന്ന് രക്ഷപ്പെടുമെന്നോ? ഡംബോയുടെ ചെവിയൊന്നും ഇവിടെ വിലപ്പോവില്ല.",
        replyEn: "Flies off to safety. Ears are not rotors. Please sit with that for a moment."
      },
      {
        textMl: "മരം പേടിച്ച് ഓടും",
        textEn: "The log runs away in fear",
        replyMl: "മരം പേടിച്ച് ഓടുമെന്നോ? മരത്തിന് കാലില്ലല്ലോ ചേട്ടാ.",
        replyEn: "The log sprints away. If timber could flee, carpenters would be out of a job."
      }
    ],
    correct: 1
  },
  {
    id: "gold",
    emoji: "✨",
    idiom: "മിന്നുന്നതെല്ലാം പൊന്നല്ല",
    questionMl: "തിളങ്ങുന്ന ഒരു കല്ല് കണ്ടാൽ അത് പൊന്നാണെന്ന് ഉറപ്പിക്കാമോ?",
    questionEn: "Is everything shiny actually made of gold?",
    hint: "Something shiny is under suspicion. The glass keeps staring.",
    dragItem: "🪨",
    dragTarget: "✨",
    resultEmoji: "🪨",
    expectedEmoji: "💎",
    resultMl: "തിളങ്ങുന്നുണ്ട്, പക്ഷേ പൊന്നല്ല. കണ്ണ് ചതിച്ചു, പോക്കറ്റ് തൽക്കാലം രക്ഷപ്പെട്ടു.",
    resultEn: "Plenty of sparkle. Zero gold. Your eyes fell for it. Your wallet doesn’t have to.",
    meaningMl: "തിളങ്ങുന്നതെല്ലാം പൊന്നല്ല. പുറം കണ്ട് കാശ് കൊടുത്താൽ പിന്നെ നോക്കി നിൽക്കേണ്ടി വരും.",
    meaningEn: "Shine is a costume. Believe it after you check, not before you pay.",
    options: [
      {
        textMl: "തിളങ്ങുന്നതെല്ലാം പൊന്നാണ്",
        textEn: "Everything shiny is gold",
        replyMl: "തിളങ്ങുന്നതെല്ലാം പൊന്നാണെന്നോ? എങ്കിൽ എന്റെ പഴയ സ്റ്റീൽ പാത്രം ലോക്കറിൽ വയ്ക്കണം.",
        replyEn: "Everything shiny is gold. The firefly locker is downstairs. Rent is due."
      },
      {
        textMl: "അത് ഒരു നിധിയാണ്",
        textEn: "It's a treasure",
        replyMl: "നിധിയോ! ഇത് പുരാണത്തിലെ ഗുഹയൊന്നുമല്ല മോനേ, വെറും ഒരു കല്ലാ.",
        replyEn: "It’s treasure. Sparkle isn’t a lab report. Sit down, treasure hunter."
      },
      {
        textMl: "തിളക്കം കണ്ടാൽ മാത്രം തീരുമാനിക്കാനാവില്ല",
        textEn: "You can't judge by its shine alone",
        replyMl: "കറക്റ്റ്! തിളക്കം കണ്ട് മാത്രം തീരുമാനിക്കാനാവില്ല. ഇത്തവണ പണം പോകാതെ രക്ഷപ്പെട്ടു.",
        replyEn: "You refused the sparkle. We’re suspicious of you. That was, irritatingly, correct."
      },
      {
        textMl: "കല്ല് കണ്ണാടി വാങ്ങിയതാണ്",
        textEn: "The stone bought a mirror",
        replyMl: "കല്ല് കണ്ണാടി വാങ്ങിയതോ? ഇതൊരു ഒന്നൊന്നര കഥയാ, ഭാവന കൊള്ളാം.",
        replyEn: "The stone went shopping for a mirror. Rocks don’t run errands. This answer does."
      }
    ],
    correct: 2
  },
  {
    id: "fence",
    emoji: "🌾",
    idiom: "വേലി തന്നെ വിളവ് തിന്നുക",
    questionMl: "വിള സംരക്ഷിക്കേണ്ട വേലി തന്നെ വിളവ് തിന്നാൽ എന്താകും?",
    questionEn: "What if the fence starts eating the crops it protects?",
    hint: "That fence looks hungry. The corn looks innocent.",
    dragItem: "🌽",
    dragTarget: "🪵",
    resultEmoji: "🌽",
    expectedEmoji: "😋",
    resultMl: "വേലി വിള തിന്നു. കാവൽക്കാരന്റെ വയറു നിറഞ്ഞു. ചോദ്യം ചെയ്യാൻ വിള ബാക്കിയില്ല.",
    resultEn: "The protector ate the crop. Security update: the lock was hungry.",
    meaningMl: "കാത്തുസൂക്ഷിക്കേണ്ടവൻ തന്നെ നശിപ്പിച്ചാൽ പിന്നെ ആരെ വിശ്വസിക്കും? കാവൽക്കാരനെ ആര് കാക്കും?",
    meaningEn: "The guard became the damage. If the fence looks full, ask who you hired.",
    options: [
      {
        textMl: "വിളവ് സുരക്ഷിതമായിരിക്കും",
        textEn: "The crops stay safe",
        replyMl: "വിളവ് സുരക്ഷിതമെന്നോ? വേലി കയ്യിൽ ഫോർക്കുമായി നിൽക്കുന്നത് കണ്ടില്ലേ?",
        replyEn: "Perfectly safe. The crops disagree, from inside the fence."
      },
      {
        textMl: "വേലി കർഷകനാകും",
        textEn: "The fence becomes a farmer",
        replyMl: "വേലി കർഷകനാകുമെന്നോ? അത് കർഷകന്റെ പണിയാ, ക്രെഡിറ്റ് എടുക്കണ്ട.",
        replyEn: "Career change to farmer. It skipped the interview and ate the evidence."
      },
      {
        textMl: "സംരക്ഷിക്കേണ്ട വേലി തന്നെ വിളവ് തിന്നും",
        textEn: "The fence eats the crops it's meant to protect",
        replyMl: "കറക്റ്റ്! കാക്കേണ്ടവൻ തന്നെ തിന്നു. ഇതാണ് നാട്ടുനടപ്പ് മോനേ.",
        replyEn: "The guard ate the crop. You caught the plot. The corn is still gone."
      },
      {
        textMl: "വിളവ് വേലി ചാടി രക്ഷപ്പെടും",
        textEn: "The crops jump over the fence and escape",
        replyMl: "വിള വേലി ചാടി രക്ഷപ്പെടുമെന്നോ? ചോളത്തിന് കാലില്ല ചേട്ടാ.",
        replyEn: "The corn hurdles the fence. If vegetables sprint, hire a coach, not a proverb."
      }
    ],
    correct: 2
  },
  {
    id: "crowchick",
    emoji: "🐦",
    idiom: "കാക്കയ്ക്കും തൻ കുഞ്ഞ് പൊൻകുഞ്ഞ്",
    questionMl: "കാക്കയ്ക്ക് സ്വന്തം കുഞ്ഞ് എങ്ങനെയായിരിക്കും?",
    questionEn: "Does every parent think their own chick is the cutest?",
    hint: "Someone is waiting to be very proud of something very small.",
    dragItem: "🐣",
    dragTarget: "🐦‍⬛",
    resultEmoji: "🐦‍⬛",
    expectedEmoji: "❤️",
    resultMl: "അമ്മയുടെ കണ്ണിൽ പൊൻകുഞ്ഞ്. ബാക്കി ലോകം പതുക്കെ പറയും: അത് ഒരു കാക്കക്കുഞ്ഞാ.",
    resultEn: "The parent sees gold. Everyone else sees a chick. Love brought its own lighting.",
    meaningMl: "സ്വന്തം കുഞ്ഞ് എത്ര കറുത്താലും അമ്മയ്ക്ക് പൊന്ന്. ആ കണ്ണട ആരും അഴിച്ചുമാറ്റില്ല.",
    meaningEn: "Your own people come with a filter. It’s biased, devoted, and not coming off.",
    options: [
      {
        textMl: "ലോകത്തിലെ ഏറ്റവും സുന്ദരമായ കുഞ്ഞ്",
        textEn: "The cutest chick in the world",
        replyMl: "ലോകത്തിലെ ഏറ്റവും സുന്ദരൻ എന്നോ? അമ്മയ്ക്ക് അതെ, ബാക്കി ലോകത്തിന് കാക്കക്കുഞ്ഞ്.",
        replyEn: "Cutest on earth. The judge is the parent and the trophy was engraved last week."
      },
      {
        textMl: "മറ്റുള്ളവരുടെ കുഞ്ഞിനെക്കാൾ മോശം",
        textEn: "Less lovely than other chicks",
        replyMl: "മറ്റുള്ളവരുടെ കുഞ്ഞിനെക്കാൾ മോശമെന്നോ? അമ്മ കേട്ടാൽ ചൂല് എടുക്കും.",
        replyEn: "Worse than the others. No parent writes that review and means it. Name one."
      },
      {
        textMl: "സ്വന്തം കുഞ്ഞ് പൊന്നുപോലെ വിലപ്പെട്ടത്",
        textEn: "As precious as gold",
        replyMl: "അതെ, പൊന്നുപോലെ! സ്വന്തം കുഞ്ഞ് ആയാൽ ഫിൽറ്റർ ഓൺ. കണ്ണട അഴിക്കാൻ ആരും പറയണ്ട.",
        replyEn: "Precious, in that nest. You spotted the filter. A small, suspicious smile is permitted."
      },
      {
        textMl: "കുഞ്ഞിനെ വാടകയ്ക്ക് കൊടുക്കും",
        textEn: "It rents out the chick",
        replyMl: "വാടകയ്ക്ക് കൊടുക്കുമെന്നോ? അമ്മക്കാക്ക ഇത് കേട്ടാൽ നിന്റെ തലയിൽ കൊത്തും.",
        replyEn: "Rents the chick out. The parent won’t look away, and you’ve drafted a business model."
      }
    ],
    correct: 2
  }
];