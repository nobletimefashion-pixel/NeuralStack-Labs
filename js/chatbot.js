/* ==========================================================================
   NeauralStack Labs — scripted assistant ("Ask NeauralStack")

   A small, deterministic Q&A bot. No AI API, no data leaves the browser.
   It answers a fixed set of intents (services, budget, timeline, process,
   team, contact) and hands off to a human for anything else.

   OWNER EDIT: update BUDGET_RANGES below with your real indicative numbers.
   Ranges must stay described as planning estimates, never fixed quotes.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     OWNER-EDITABLE CONFIG
     ------------------------------------------------------------------ */
  var CONFIG = {
    contactEmail: "ferroshes@gmail.com",
    contactUrl: "contact.html",
    fiverrUrl: "https://www.fiverr.com/sellers/ibrahim5665",

    // Indicative budget bands (USD). Replace with your own confirmed ranges.
    // These are planning estimates only — always shown with a disclaimer.
    budgetRanges: [
      {
        service: "AI / ML prototyping",
        range: "$2k – $6k",
        note: "small demo or proof-of-concept",
      },
      {
        service: "Business automation / workflows",
        range: "$1.5k – $5k",
        note: "single-workflow build or integration",
      },
      {
        service: "Networking & IT setup",
        range: "$1k – $4k",
        note: "design, setup or migration for a small team",
      },
      {
        service: "Web / software development",
        range: "$2k – $8k+",
        note: "depends on scope and integrations",
      },
      {
        service: "Ongoing support / retainer",
        range: "$300 – $1k / month",
        note: "part-time maintenance and improvements",
      },
    ],

    disclaimer:
      "Budgets shown are planning ranges only — final quotes are confirmed after a short discovery call.",

    services: [
      { name: "AI / Machine Learning", anchor: "services.html#ai-ml" },
      { name: "Business Automation", anchor: "services.html#automation" },
      { name: "Networking & IT", anchor: "services.html#networking" },
      { name: "Programming & Development", anchor: "services.html#programming" },
    ],
  };

  /* ------------------------------------------------------------------
     Intent matching
     Each intent: match keywords, reply builder, optional quick chips.
     ------------------------------------------------------------------ */
  function buildServicesReply() {
    var lines = [
      "We offer four service tracks:",
      CONFIG.services
        .map(function (s) {
          return "• " + s.name + " — " + s.anchor;
        })
        .join("\n"),
      "Want scope and deliverables for one? Ask me about that service, or open the Services page.",
    ];
    return lines.join("\n\n");
  }

  function buildBudgetReply() {
    var lines = ["Here are our current planning ranges:"];
    CONFIG.budgetRanges.forEach(function (b) {
      lines.push("• " + b.service + ": " + b.range + " (" + b.note + ")");
    });
    lines.push("ℹ " + CONFIG.disclaimer);
    lines.push(
      "For a firm number, tell me which service you need — or start a brief on the contact page: " +
        CONFIG.contactUrl
    );
    return lines.join("\n");
  }

  function buildBudgetForServiceReply(text) {
    var match = null;
    CONFIG.budgetRanges.forEach(function (b) {
      var key = b.service.toLowerCase().split(/[ /&]/).filter(function (w) {
        return w.length > 3;
      });
      if (key.some(function (k) { return text.indexOf(k) !== -1; })) match = b;
    });
    if (!match) return null;
    return (
      match.service +
      " typically falls in the " +
      match.range +
      " planning range (" +
      match.note +
      ").\n\nℹ " +
      CONFIG.disclaimer +
      "\n\nShare a few project details on " +
      CONFIG.contactUrl +
      " and we'll confirm a quote."
    );
  }

  var INTENTS = [
    {
      id: "budget",
      keywords: [
        "budget", "price", "pricing", "cost", "costs", "how much", "rate",
        "rates", "quote", "estimate", "expensive", "charges", "fee", "usd",
        "$", "afford",
      ],
      reply: function (text) {
        return buildBudgetForServiceReply(text) || buildBudgetReply();
      },
      chips: ["What does AI cost?", "Automation budget", "Retainer pricing"],
    },
    {
      id: "services",
      keywords: [
        "service", "services", "what do you", "offer", "provide", "do you do",
        "capability", "capabilities", "ai", "ml", "machine learning",
        "automation", "network", "networking", "software", "development",
        "web", "programming",
      ],
      reply: buildServicesReply,
      chips: ["AI / ML", "Automation", "Networking", "Development"],
    },
    {
      id: "timeline",
      keywords: [
        "timeline", "how long", "how fast", "turnaround", "delivery time",
        "deadline", "time to", "weeks", "when can", "schedule", "duration",
      ],
      reply: function () {
        return [
          "Typical timelines:",
          "• Small automation or script: 1–2 weeks",
          "• AI / ML proof-of-concept: 2–4 weeks",
          "• Web or software build: 3–8 weeks (scope dependent)",
          "• Networking / IT setup: 3–10 days",
          "",
          "Exact dates are set after we review your requirements. Send a brief via " +
            CONFIG.contactUrl +
            " and we'll give you a realistic schedule.",
        ].join("\n");
      },
      chips: ["Start a project", "How you work"],
    },
    {
      id: "process",
      keywords: [
        "process", "how do you work", "workflow", "steps", "approach",
        "methodology", "engage", "kickoff", "how it works", "discovery",
      ],
      reply: function () {
        return [
          "Our process has five steps:",
          "1. Discovery — short call to understand goals, scope and constraints",
          "2. Proposal — plan, timeline and a clear fixed quote",
          "3. Build — iterative development with regular updates",
          "4. Review — testing and feedback rounds with you",
          "5. Handover — delivery, documentation and optional support",
          "",
          "Details: approach.html (section: How we work).",
        ].join("\n");
      },
      chips: ["How long does it take?", "Talk to a human"],
    },
    {
      id: "team",
      keywords: [
        "team", "who", "founder", "ceo", "people", "developers", "engineers",
        "about you", "background", "experience", "ibrahim",
      ],
      reply: function () {
        return [
          "NeauralStack Labs is a small hands-on engineering team led by Khan Ibrahim (CEO),",
          "with specialists across AI/ML, automation, networking and software development.",
          "",
          "Profiles and roles: about.html",
        ].join("\n");
      },
      chips: ["Are you on Fiverr?", "How you work"],
    },
    {
      id: "fiverr",
      keywords: ["fiverr", "hire you on", "gig", "marketplace", "profile"],
      reply: function () {
        return [
          "Yes — you can hire us through our Fiverr seller profile:",
          CONFIG.fiverrUrl,
          "",
          "Or contact us directly at " + CONFIG.contactEmail + " (fastest for detailed briefs).",
        ].join("\n");
      },
      chips: ["Email you", "What do you charge?"],
    },
    {
      id: "contact",
      keywords: [
        "contact", "email", "reach", "call", "talk to", "human", "person",
        "support", "hello", "hi", "hey", "start a project", "brief", "hire",
        "book", "meeting",
      ],
      reply: function () {
        return [
          "We'd love to hear about your project.",
          "• Email: " + CONFIG.contactEmail,
          "• Contact form: " + CONFIG.contactUrl,
          "• Fiverr: " + CONFIG.fiverrUrl,
          "",
          "Include your goal, rough timeline and budget range and we'll reply with next steps.",
        ].join("\n");
      },
      chips: ["What does it cost?", "See services"],
    },
  ];

  /* ------------------------------------------------------------------
     UI wiring
     ------------------------------------------------------------------ */
  function initChatbot() {
    var fab = document.querySelector("[data-chat-toggle]");
    var panel = document.querySelector("[data-chat-panel]");
    if (!fab || !panel) return;

    var log = panel.querySelector("[data-chat-log]");
    var form = panel.querySelector("[data-chat-form]");
    var input = panel.querySelector("[data-chat-input]");
    var chipsBar = panel.querySelector("[data-chat-chips]");
    if (!log || !form || !input) return;

    var opened = false;
    var busy = false;

    function setOpen(open) {
      opened = open;
      fab.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
      if (open) {
        if (!log.children.length) greet();
        input.focus();
      }
    }

    fab.addEventListener("click", function () {
      setOpen(!opened);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && opened) {
        setOpen(false);
        fab.focus();
      }
    });

    function scrollLog() {
      log.scrollTop = log.scrollHeight;
    }

    function appendMessage(text, who) {
      var msg = document.createElement("div");
      msg.className = "chat-msg chat-msg--" + who;
      msg.textContent = text;
      log.appendChild(msg);
      scrollLog();
      return msg;
    }

    function showTyping() {
      var typing = document.createElement("div");
      typing.className = "chat-msg chat-msg--typing chat-msg--bot";
      typing.setAttribute("aria-hidden", "true");
      typing.innerHTML = "<span></span><span></span><span></span>";
      log.appendChild(typing);
      scrollLog();
      return typing;
    }

    function setChips(list) {
      if (!chipsBar) return;
      chipsBar.innerHTML = "";
      (list || []).forEach(function (label) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chat-chip";
        chip.textContent = label;
        chip.addEventListener("click", function () {
          handleUserMessage(label);
        });
        chipsBar.appendChild(chip);
      });
    }

    function botReply(text, chips) {
      busy = true;
      var typing = showTyping();
      var delay = Math.min(900, 300 + text.length * 4);
      setTimeout(function () {
        typing.remove();
        appendMessage(text, "bot");
        setChips(chips);
        busy = false;
      }, delay);
    }

    function matchIntent(text) {
      var lower = text.toLowerCase();
      var best = null;
      var bestScore = 0;
      INTENTS.forEach(function (intent) {
        var score = 0;
        intent.keywords.forEach(function (kw) {
          // Word-boundary match so short keywords ("ai", "usd") don't hit inside words.
          var pattern = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          var re = new RegExp("(^|[^a-z0-9])" + pattern + "([^a-z0-9]|$)", "i");
          if (re.test(lower)) score += kw.length;
        });
        if (score > bestScore) {
          bestScore = score;
          best = intent;
        }
      });
      return best;
    }

    function handleUserMessage(raw) {
      var text = (raw || "").trim();
      if (!text || busy) return;
      appendMessage(text, "user");
      input.value = "";

      var intent = matchIntent(text);
      if (intent) {
        botReply(intent.reply(text.toLowerCase()), intent.chips);
      } else {
        botReply(
          [
            "I don't have an automated answer for that yet — I'm a scripted assistant, not a full AI.",
            "",
            "Try one of the topics below, or write to a human at " +
              CONFIG.contactEmail +
              " / " +
              CONFIG.contactUrl +
              " and we'll get back to you.",
          ].join("\n"),
          ["What do you charge?", "See services", "Talk to a human"]
        );
      }
    }

    function greet() {
      appendMessage(
        [
          "Hi! I'm the NeauralStack assistant — an automated helper, not a person.",
          "",
          "Ask me about our services, budget ranges, timelines or process.",
        ].join("\n"),
        "bot"
      );
      setChips(["See services", "What does it cost?", "How you work", "Talk to a human"]);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handleUserMessage(input.value);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
