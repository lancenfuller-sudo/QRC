/* Flow Fund — tools.js
   Educational illustrative examples only. No live balances, no returns promises. */
(function () {
  "use strict";

  var PROFILES = {
    mc: {
      id: "mc",
      segment: "Middle class",
      name: "Example: Dual-income household — Orlando metro",
      shortName: "Rivera household (illustrative)",
      blurb:
        "A dual-earner Orlando-metro household with a home, retirement accounts, and modest taxable savings. Figures are invented for teaching — not a real client.",
      vessels: [
        { name: "Cash buffer", note: "Emergency reserves in bank / HYSA" },
        { name: "Taxable brokerage", note: "Small liquid sleeve" },
        { name: "Retirement (401k / IRA)", note: "Primary long-horizon vessel" },
        { name: "Home equity", note: "Illiquid primary residence" }
      ],
      income: {
        grossAnnual: 145000,
        takeHomeMonthly: 9200,
        otherMonthly: 0
      },
      balance: {
        cash: 18000,
        taxable: 35000,
        retirement: 220000,
        homeEquity: 180000,
        otherAssets: 0,
        studentLoan: 28000,
        carLoan: 12000,
        mortgage: 0,
        otherLiabilities: 0
      },
      cashflow: {
        takeHome: 9200,
        housing: 2400,
        food: 1100,
        transport: 650,
        insurance: 480,
        debtMin: 720,
        utilities: 320,
        childcare: 0,
        misc: 430,
        subscriptions: 95,
        diningOut: 420,
        memberships: 85,
        otherDrag: 0
      },
      burn: {
        baseCategories: [
          { id: "housing", label: "Housing / rent equivalent", amount: 2400, drag: false },
          { id: "food", label: "Groceries", amount: 900, drag: false },
          { id: "transport", label: "Transport / fuel", amount: 650, drag: false },
          { id: "insurance", label: "Insurance premiums", amount: 480, drag: false },
          { id: "debt", label: "Debt minimums", amount: 720, drag: false },
          { id: "utilities", label: "Utilities", amount: 320, drag: false },
          { id: "misc", label: "Household misc", amount: 430, drag: false }
        ],
        dragCategories: [
          { id: "subs", label: "Subscriptions (streaming, apps)", amount: 95, cutDefault: 40 },
          { id: "dining", label: "Dining out / delivery", amount: 520, cutDefault: 200 },
          { id: "memberships", label: "Unused memberships", amount: 85, cutDefault: 85 },
          { id: "impulse", label: "Impulse / lifestyle drag", amount: 200, cutDefault: 100 },
          { id: "sol_above_earn", label: "Standard of living above value earned", amount: 650, cutDefault: 325, note: "Lifestyle spend that outruns earned capacity — educational drag, not judgment." }
        ],
        takeHome: 9200,
        surplusHint: "Roughly $800–1,400/mo may open after intentional burn-down, including closing the gap where standard of living sits above value earned.",
        readiness: {
          curveFundingMonthly: 2500,
          sustainThrough: 75,
          tie: "Closing dining, memberships, impulse spend, and lifestyle-above-earn drag feeds the Water sleeve instead of letting it leak away."
        }
      },
      allocation: [
        { id: "cash", label: "Cash / reserves", pct: 8, band: "ice", role: "Preserve — liquidity for shocks" },
        { id: "equity", label: "Public equity (growth sleeve)", pct: 28, band: "steam", role: "Grow — long horizon" },
        { id: "quality", label: "Quality / value balance-sheet", pct: 22, band: "water", role: "Compound — steadier sleeve" },
        { id: "retirement", label: "Retirement vessels (401k/IRA)", pct: 35, band: "water", role: "Compound — tax-advantaged" },
        { id: "giving", label: "Giving vehicles", pct: 2, band: "overflow", role: "Overflow — small or none yet" },
        { id: "illiquid", label: "Home equity (illiquid)", pct: 5, band: "ice", role: "Preserve — not for trading" }
      ],
      riskNotes: {
        horizon: "Working decades ahead — surplus can favor compound/grow sleeves once reserves are sound.",
        liquidity: "Cash buffer ~2 months of spend in this example; strengthening the reservoir is often the first lesson.",
        overflow: "Giving is aspirational overflow after the vessel holds. Not a required allocation."
      },
      timeline: {
        current: "steward",
        currentLabel: "Steward Current (illustrative lean)",
        years: [
          { label: "Now", note: "Fill Ice — build cash reserves; start Water in retirement vessels.", bands: { ice: 40, water: 45, steam: 15, overflow: 0 } },
          { label: "+5y", note: "Ice sound; Water compounds; introduce Steam only with surplus.", bands: { ice: 25, water: 45, steam: 28, overflow: 2 } },
          { label: "+10y", note: "Peak earning years — Steam can rise; Water stays the spine.", bands: { ice: 15, water: 40, steam: 40, overflow: 5 } },
          { label: "+20y", note: "Horizon shortens — dial Steam down; thicken Water & Ice.", bands: { ice: 22, water: 48, steam: 22, overflow: 8 } },
          { label: "+30y", note: "Preserve & compound; Overflow if the vessel is full.", bands: { ice: 30, water: 45, steam: 12, overflow: 13 } }
        ]
      }
    },
    fo: {
      id: "fo",
      segment: "Family office",
      name: "Example: Multi-entity family office",
      shortName: "Harbor Family Office (illustrative)",
      blurb:
        "An illustrative multi-entity family office with liquid investable capital across vessels plus notional illiquid operating equity. Invented for education — not a real office or offer.",
      vessels: [
        { name: "Taxable brokerage", note: "Primary liquid investable sleeve" },
        { name: "IRAs / retirement", note: "Tax-advantaged accounts" },
        { name: "Donor-advised fund (DAF)", note: "Giving vessel / overflow" },
        { name: "Irrevocable trust", note: "Multi-generational structure" },
        { name: "LLC cash", note: "Entity operating cash" },
        { name: "OpCo equity (illiquid)", note: "Illustrative / notional — not marked to market here" }
      ],
      income: {
        grossAnnual: 2800000,
        takeHomeMonthly: 120000,
        otherMonthly: 0,
        note: "Distributions + portfolio cash flow (illustrative annualized)"
      },
      balance: {
        cash: 2500000,
        taxable: 22000000,
        retirement: 4500000,
        homeEquity: 0,
        daf: 1800000,
        trust: 9000000,
        llcCash: 1200000,
        otherAssets: 4000000,
        opcoIlliquid: 20000000,
        studentLoan: 0,
        carLoan: 0,
        mortgage: 0,
        otherLiabilities: 800000
      },
      cashflow: {
        takeHome: 120000,
        housing: 45000,
        food: 8000,
        transport: 8000,
        insurance: 10000,
        debtMin: 0,
        utilities: 5000,
        childcare: 0,
        misc: 12000,
        subscriptions: 0,
        diningOut: 0,
        memberships: 0,
        otherDrag: 0,
        distributionsAnnual: 1200000,
        philanthropyTarget: 800000
      },
      burn: {
        baseCategories: [
          { id: "distributions", label: "Family distributions / lifestyle", amount: 55000, drag: false },
          { id: "properties", label: "Properties & maintenance", amount: 14000, drag: false },
          { id: "staff", label: "Household / office support", amount: 10000, drag: false },
          { id: "insurance", label: "Insurance & protection", amount: 6000, drag: false },
          { id: "travel_base", label: "Core travel & logistics", amount: 5000, drag: false }
        ],
        dragCategories: [
          { id: "lifestyle_entities", label: "Overlapping lifestyle entities", amount: 12000, cutDefault: 5000 },
          { id: "duplicate_services", label: "Duplicate advisors / services", amount: 8000, cutDefault: 4000 },
          { id: "unmanaged_fees", label: "Unmanaged layered fees", amount: 6000, cutDefault: 3000 },
          { id: "discretionary", label: "Unscoped discretionary spend", amount: 9000, cutDefault: 4000 },
          { id: "sol_above_earn", label: "Standard of living above value earned", amount: 15000, cutDefault: 7500, note: "Lifestyle / distribution level above sustainable earned + portfolio capacity — educational drag." }
        ],
        takeHome: 120000,
        surplusHint: "Educational: reclaiming drag — including standard of living above value earned — can fund DAF overflow or reserves. Not a performance claim.",
        annualSpend: 1200000,
        philanthropyTarget: 800000,
        readiness: {
          curveFundingMonthly: 2800,
          sustainThrough: 70,
          tie: "Closing overlapping entities, duplicate services, layered fees, and lifestyle-above-earn drag feeds Water and trust sleeves before earlier overflow."
        }
      },
      allocation: [
        { id: "cash", label: "Cash / reserves / LLC cash", pct: 8, band: "ice", role: "Preserve — liquidity & ops" },
        { id: "equity", label: "Public equity (growth)", pct: 28, band: "steam", role: "Grow — multi-year horizon" },
        { id: "quality", label: "Quality / value balance-sheet", pct: 22, band: "water", role: "Compound — core sleeve" },
        { id: "alts", label: "Alternatives / illiquid (ex-OpCo)", pct: 12, band: "steam", role: "Grow — lower liquidity" },
        { id: "trust", label: "Trust & structured vessels", pct: 18, band: "water", role: "Compound — stewardship" },
        { id: "giving", label: "DAF / giving vehicles", pct: 7, band: "overflow", role: "Overflow — philanthropy target" },
        { id: "opco", label: "OpCo equity (illiquid, illustrative)", pct: 5, band: "ice", role: "Preserve framing — notional only" }
      ],
      riskNotes: {
        horizon: "Multi-generational — allocation maps purpose (preserve / compound / grow / overflow), not a promised rate.",
        liquidity: "Illiquid OpCo is labeled illustrative and excluded from “spendable” framing.",
        overflow: "Philanthropy target ~$800k/yr as overflow once vessels and distributions are intentional."
      },
      timeline: {
        current: "open",
        currentLabel: "Open Current (illustrative lean)",
        years: [
          { label: "Now", note: "Ice for ops; Water core; Steam growth sleeve; Overflow via DAF.", bands: { ice: 18, water: 40, steam: 32, overflow: 10 } },
          { label: "+5y", note: "Scale Steam carefully; keep Water trust/quality spine.", bands: { ice: 14, water: 38, steam: 36, overflow: 12 } },
          { label: "+10y", note: "Multi-entity balance — Steam for growth vessels, Water for stewardship.", bands: { ice: 12, water: 36, steam: 36, overflow: 16 } },
          { label: "+20y", note: "Next-gen handoff — more Water structure; Overflow rises with capacity.", bands: { ice: 15, water: 40, steam: 25, overflow: 20 } },
          { label: "+30y", note: "Generational preserve + Overflow mission; Steam selective.", bands: { ice: 20, water: 42, steam: 18, overflow: 20 } }
        ]
      }
    }
  };


  /* ---------- Lifetime compounding (illustrative teaching curves) ---------- */
  var LIFETIME_PATHS = {
    rivera: {
      id: "rivera",
      profileId: "mc",
      label: "Rivera path",
      lean: "Steward lean",
      blurb:
        "Middle-class household example: mid-career surplus into retirement vessels, then a calm sustain band, then handoff to trust.",
      startAge: 35,
      endAge: 105,
      startIndex: 100,
      growth: 0.05,
      handoffAge: 88,
      lifestyleNeed: 28,
      lifestyleLabel: "Illustrative household lifestyle need",
      stages: [
        { id: "build", label: "Build", range: "≈30–45", from: 35, to: 45 },
        { id: "compound", label: "Compound", range: "≈45–60", from: 45, to: 60 },
        { id: "sustain", label: "Sustain / 4% teaching band", range: "≈60–75", from: 60, to: 75 },
        { id: "longevity", label: "Longevity → first generation", range: "≈75–88", from: 75, to: 88 },
        { id: "handoff", label: "Handoff to trust", range: "≈88", from: 88, to: 92 },
        { id: "generational", label: "Generational wealth", range: "next vessels", from: 92, to: 105 }
      ],
      contrib: function (age) {
        if (age >= 35 && age < 45) return 6;
        if (age >= 45 && age < 60) return 10;
        if (age >= 60 && age < 67) return 2;
        return 0;
      }
    },
    harbor: {
      id: "harbor",
      profileId: "fo",
      label: "Harbor path",
      lean: "Open lean",
      blurb:
        "Family-office style example: earlier overflow capacity and earlier trust planning, with the same teaching 4% heuristic.",
      startAge: 35,
      endAge: 105,
      startIndex: 220,
      growth: 0.055,
      handoffAge: 76,
      lifestyleNeed: 55,
      lifestyleLabel: "Illustrative family lifestyle need",
      stages: [
        { id: "build", label: "Build", range: "≈30–45", from: 35, to: 45 },
        { id: "compound", label: "Compound", range: "≈45–55", from: 45, to: 55 },
        { id: "sustain", label: "Sustain / 4% teaching band", range: "≈55–70", from: 55, to: 70 },
        { id: "longevity", label: "Longevity → first generation", range: "≈70–76", from: 70, to: 76 },
        { id: "handoff", label: "Handoff to trust", range: "≈76", from: 76, to: 82 },
        { id: "generational", label: "Generational wealth", range: "next vessels", from: 82, to: 105 }
      ],
      contrib: function (age) {
        if (age >= 35 && age < 45) return 20;
        if (age >= 45 && age < 55) return 25;
        if (age >= 55 && age < 62) return 10;
        return 0;
      }
    }
  };

  function buildLifetimePoints(path) {
    var pts = [];
    var v = path.startIndex;
    var age;
    for (age = path.startAge; age <= path.endAge; age++) {
      pts.push({
        age: age,
        vessel: v,
        spendCap: v * 0.04,
        afterHandoff: age >= path.handoffAge
      });
      var g = age < path.handoffAge ? path.growth : path.growth * 0.95;
      var c = age < path.handoffAge ? path.contrib(age) : 0;
      v = v * (1 + g) + c;
    }
    return pts;
  }

  function money(n, opts) {
    opts = opts || {};
    var abs = Math.abs(Number(n) || 0);
    var formatted;
    if (opts.compact && abs >= 1e6) {
      formatted = "$" + (abs / 1e6).toFixed(abs >= 1e7 ? 1 : 2).replace(/\.?0+$/, "") + "M";
    } else if (opts.compact && abs >= 1e4) {
      formatted = "$" + Math.round(abs / 1000) + "k";
    } else {
      formatted = abs.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      });
    }
    return (n < 0 ? "−" : "") + formatted;
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function getStoredProfile() {
    try {
      var v = sessionStorage.getItem("flowfund_tool_profile");
      if (v === "fo" || v === "mc") return v;
    } catch (e) {}
    return "mc";
  }

  function setStoredProfile(id) {
    try {
      sessionStorage.setItem("flowfund_tool_profile", id);
    } catch (e) {}
  }

  /* ---------- Shared chrome: profile switcher + banner helpers ---------- */
  function bindProfileSwitcher(onChange) {
    var root = qs("[data-profile-switcher]");
    if (!root) return getStoredProfile();

    var current = getStoredProfile();
    qsa("[data-profile]", root).forEach(function (btn) {
      var id = btn.getAttribute("data-profile");
      var active = id === current;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
      btn.addEventListener("click", function () {
        if (id === current) return;
        current = id;
        setStoredProfile(id);
        qsa("[data-profile]", root).forEach(function (b) {
          var on = b.getAttribute("data-profile") === current;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        onChange(current);
      });
    });
    return current;
  }

  function updateProfileMeta(profile) {
    var nameEl = qs("[data-profile-name]");
    var blurbEl = qs("[data-profile-blurb]");
    var segEl = qs("[data-profile-segment]");
    if (nameEl) nameEl.textContent = profile.name;
    if (blurbEl) blurbEl.textContent = profile.blurb;
    if (segEl) segEl.textContent = profile.segment + " · " + profile.shortName;
  }

  /* ===================== Level-Set ===================== */
  function initLevelSet() {
    var state = { profileId: "mc", data: null };

    function load(id) {
      state.profileId = id;
      state.data = clone(PROFILES[id]);
      updateProfileMeta(state.data);
      render();
    }

    function totals(d) {
      var b = d.balance;
      var liquidAssets =
        (b.cash || 0) +
        (b.taxable || 0) +
        (b.retirement || 0) +
        (b.daf || 0) +
        (b.trust || 0) +
        (b.llcCash || 0) +
        (b.otherAssets || 0) +
        (b.homeEquity || 0);
      var illiquid = b.opcoIlliquid || 0;
      var liabilities =
        (b.studentLoan || 0) + (b.carLoan || 0) + (b.mortgage || 0) + (b.otherLiabilities || 0);
      var cf = d.cashflow;
      var outflow =
        (cf.housing || 0) +
        (cf.food || 0) +
        (cf.transport || 0) +
        (cf.insurance || 0) +
        (cf.debtMin || 0) +
        (cf.utilities || 0) +
        (cf.childcare || 0) +
        (cf.misc || 0) +
        (cf.subscriptions || 0) +
        (cf.diningOut || 0) +
        (cf.memberships || 0) +
        (cf.otherDrag || 0);
      var inflow = cf.takeHome || d.income.takeHomeMonthly || 0;
      return {
        assets: liquidAssets,
        illiquid: illiquid,
        liabilities: liabilities,
        net: liquidAssets - liabilities,
        netInclIlliquid: liquidAssets + illiquid - liabilities,
        outflow: outflow,
        inflow: inflow,
        surplus: inflow - outflow
      };
    }

    function renderVessels(d) {
      var el = qs("[data-vessels]");
      if (!el) return;
      el.innerHTML = d.vessels
        .map(function (v) {
          return (
            '<li class="tool-vessel"><strong>' +
            escapeHtml(v.name) +
            "</strong><span>" +
            escapeHtml(v.note) +
            "</span></li>"
          );
        })
        .join("");
    }

    function numInput(path, label, value, hint) {
      return (
        '<div class="tool-field">' +
        '<label>' +
        escapeHtml(label) +
        (hint ? '<span class="hint">' + escapeHtml(hint) + "</span>" : "") +
        "</label>" +
        '<input type="number" inputmode="numeric" data-path="' +
        path +
        '" value="' +
        Math.round(value) +
        '" step="100" min="0">' +
        "</div>"
      );
    }

    function render() {
      var d = state.data;
      var t = totals(d);
      var isFo = state.profileId === "fo";
      var compact = isFo;

      renderVessels(d);

      var isEl = qs("[data-statement='is']");
      var bsEl = qs("[data-statement='bs']");
      var cfEl = qs("[data-statement='cf']");

      if (isEl) {
        isEl.innerHTML =
          '<header class="tool-stmt-head"><h3>Income statement <span class="tool-tag">Illustrative</span></h3>' +
          "<p>Annual gross and monthly take-home — edit to explore sensitivity.</p></header>" +
          '<div class="tool-fields">' +
          numInput("income.grossAnnual", "Gross household income (annual)", d.income.grossAnnual) +
          numInput("income.takeHomeMonthly", "Take-home / available (monthly)", d.income.takeHomeMonthly) +
          (isFo
            ? numInput(
                "cashflow.distributionsAnnual",
                "Annual distributions (illustrative)",
                d.cashflow.distributionsAnnual || 0
              ) +
              numInput(
                "cashflow.philanthropyTarget",
                "Philanthropy target (annual)",
                d.cashflow.philanthropyTarget || 0
              )
            : "") +
          "</div>" +
          '<dl class="tool-totals">' +
          "<div><dt>Monthly available</dt><dd>" +
          money(d.income.takeHomeMonthly) +
          "</dd></div>" +
          "<div><dt>Gross (annual)</dt><dd>" +
          money(d.income.grossAnnual, { compact: compact }) +
          "</dd></div>" +
          "</dl>";
      }

      if (bsEl) {
        var assetFields =
          numInput("balance.cash", "Cash / reserves", d.balance.cash) +
          numInput("balance.taxable", "Taxable brokerage", d.balance.taxable) +
          numInput("balance.retirement", "Retirement (401k / IRA)", d.balance.retirement);
        if (isFo) {
          assetFields +=
            numInput("balance.daf", "Donor-advised fund", d.balance.daf || 0) +
            numInput("balance.trust", "Irrevocable trust", d.balance.trust || 0) +
            numInput("balance.llcCash", "LLC cash", d.balance.llcCash || 0) +
            numInput("balance.otherAssets", "Other liquid / near-liquid", d.balance.otherAssets || 0) +
            numInput(
              "balance.opcoIlliquid",
              "OpCo equity (illiquid, illustrative)",
              d.balance.opcoIlliquid || 0,
              "Notional — not a live mark"
            );
        } else {
          assetFields += numInput("balance.homeEquity", "Home equity", d.balance.homeEquity);
        }
        var liabFields = isFo
          ? numInput("balance.otherLiabilities", "Other liabilities", d.balance.otherLiabilities || 0)
          : numInput("balance.studentLoan", "Student loan", d.balance.studentLoan) +
            numInput("balance.carLoan", "Car loan", d.balance.carLoan) +
            numInput("balance.mortgage", "Mortgage balance (if any)", d.balance.mortgage || 0);

        bsEl.innerHTML =
          '<header class="tool-stmt-head"><h3>Balance sheet <span class="tool-tag">Illustrative</span></h3>' +
          "<p>What the vessel holds — assets, liabilities, and net position.</p></header>" +
          '<div class="tool-bs-grid">' +
          '<div><h4 class="tool-subhead">Assets</h4><div class="tool-fields">' +
          assetFields +
          "</div></div>" +
          '<div><h4 class="tool-subhead">Liabilities</h4><div class="tool-fields">' +
          liabFields +
          "</div></div>" +
          "</div>" +
          '<dl class="tool-totals">' +
          "<div><dt>Assets (ex-illiquid OpCo)</dt><dd>" +
          money(t.assets, { compact: compact }) +
          "</dd></div>" +
          (t.illiquid
            ? "<div><dt>Illiquid OpCo (illustrative)</dt><dd>" +
              money(t.illiquid, { compact: true }) +
              "</dd></div>"
            : "") +
          "<div><dt>Liabilities</dt><dd>" +
          money(t.liabilities, { compact: compact }) +
          "</dd></div>" +
          "<div class=\"accent\"><dt>Net (ex-illiquid)</dt><dd>" +
          money(t.net, { compact: compact }) +
          "</dd></div>" +
          "</dl>";
      }

      if (cfEl) {
        cfEl.innerHTML =
          '<header class="tool-stmt-head"><h3>Cash flow <span class="tool-tag">Monthly · illustrative</span></h3>' +
          "<p>Inflow versus outflow. Drag items appear again in Burn-Down.</p></header>" +
          '<div class="tool-fields tool-fields-3">' +
          numInput("cashflow.takeHome", "Inflow (take-home)", d.cashflow.takeHome) +
          numInput("cashflow.housing", "Housing", d.cashflow.housing) +
          numInput("cashflow.food", "Food / groceries", d.cashflow.food) +
          numInput("cashflow.transport", "Transport", d.cashflow.transport) +
          numInput("cashflow.insurance", "Insurance", d.cashflow.insurance) +
          numInput("cashflow.debtMin", "Debt minimums", d.cashflow.debtMin) +
          numInput("cashflow.utilities", "Utilities", d.cashflow.utilities) +
          numInput("cashflow.misc", "Misc / other", d.cashflow.misc) +
          (isFo
            ? ""
            : numInput("cashflow.subscriptions", "Subscriptions", d.cashflow.subscriptions) +
              numInput("cashflow.diningOut", "Dining out", d.cashflow.diningOut) +
              numInput("cashflow.memberships", "Memberships", d.cashflow.memberships)) +
          "</div>" +
          '<dl class="tool-totals">' +
          "<div><dt>Monthly inflow</dt><dd>" +
          money(t.inflow) +
          "</dd></div>" +
          "<div><dt>Monthly outflow</dt><dd>" +
          money(t.outflow) +
          "</dd></div>" +
          '<div class="accent"><dt>Implied surplus / (gap)</dt><dd>' +
          money(t.surplus) +
          "</dd></div>" +
          "</dl>";
      }

      bindEditors();
    }

    function setPath(obj, path, value) {
      var parts = path.split(".");
      var cur = obj;
      for (var i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      if (path === "income.takeHomeMonthly") {
        obj.cashflow.takeHome = value;
      }
      if (path === "cashflow.takeHome") {
        obj.income.takeHomeMonthly = value;
      }
    }

    function bindEditors() {
      qsa("[data-path]").forEach(function (input) {
        input.addEventListener("change", onEdit);
        input.addEventListener("input", onEdit);
      });
    }

    function onEdit(e) {
      var input = e.target;
      var path = input.getAttribute("data-path");
      var val = Math.max(0, Number(input.value) || 0);
      setPath(state.data, path, val);
      var selStart = input.selectionStart;
      var selEnd = input.selectionEnd;
      render();
      var again = qs('[data-path="' + path + '"]');
      if (again) {
        again.focus();
        try {
          again.setSelectionRange(selStart, selEnd);
        } catch (err) {}
      }
    }

    var resetBtn = qs("[data-reset-example]");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        load(state.profileId);
      });
    }



    var initial = bindProfileSwitcher(load);
    load(initial);
  }

  /* ===================== Burn-Down ===================== */
  function initBurnDown() {
    var state = { profileId: "mc", cuts: {}, listBuilt: false };

    function calc() {
      var burn = PROFILES[state.profileId].burn;
      var baseTotal = burn.baseCategories.reduce(function (s, c) { return s + c.amount; }, 0);
      var dragFull = burn.dragCategories.reduce(function (s, c) { return s + c.amount; }, 0);
      var cutTotal = burn.dragCategories.reduce(function (s, c) { return s + (state.cuts[c.id] || 0); }, 0);
      var spendBefore = baseTotal + dragFull;
      var spendAfter = baseTotal + (dragFull - cutTotal);
      var surplusBefore = burn.takeHome - spendBefore;
      var surplusAfter = burn.takeHome - spendAfter;
      var maxSurplus = Math.max(burn.takeHome * 0.35, Math.abs(surplusAfter), 1);
      var fillPct = Math.max(0, Math.min(100, (Math.max(0, surplusAfter) / maxSurplus) * 100));
      return { burn: burn, cutTotal: cutTotal, spendAfter: spendAfter, surplusBefore: surplusBefore, surplusAfter: surplusAfter, fillPct: fillPct };
    }

    function updateMeter() {
      var c = calc();
      var burn = c.burn;
      var meter = qs("[data-reservoir]");
      if (meter) {
        meter.innerHTML =
          '<div class="reservoir" role="img" aria-label="Surplus reservoir fill ' +
          Math.round(c.fillPct) +
          '%">' +
          '<div class="reservoir-tank">' +
          '<div class="reservoir-fill" style="height:' + c.fillPct + '%"></div>' +
          '<div class="reservoir-wave"></div>' +
          "</div>" +
          '<div class="reservoir-meta">' +
          '<p class="eyebrow">Reservoir surplus</p>' +
          '<p class="reservoir-value">' + money(Math.max(0, c.surplusAfter)) + "<span>/mo</span></p>" +
          '<p class="tool-hint">Before cuts: ' + money(c.surplusBefore) + "/mo · Drag reclaimed: " + money(c.cutTotal) + "/mo</p>" +
          '<p class="tool-hint">' + escapeHtml(burn.surplusHint) + "</p>" +
          (burn.philanthropyTarget
            ? '<p class="tool-hint">Illustrative philanthropy target: ' +
              money(burn.philanthropyTarget, { compact: true }) +
              "/yr overflow.</p>"
            : "") +
          "</div></div>";
      }
      var summary = qs("[data-burn-summary]");
      if (summary) {
        summary.innerHTML =
          '<dl class="tool-totals">' +
          "<div><dt>Take-home / available</dt><dd>" + money(burn.takeHome) + "</dd></div>" +
          "<div><dt>Spend after burn-down</dt><dd>" + money(c.spendAfter) + "</dd></div>" +
          '<div class="accent"><dt>Surplus to reservoir</dt><dd>' + money(Math.max(0, c.surplusAfter)) + "</dd></div>" +
          "</dl>";
      }
      /* Update cut labels without rebuilding sliders */
      qsa("[data-cut-label]").forEach(function (el) {
        var id = el.getAttribute("data-cut-label");
        var cat = burn.dragCategories.filter(function (x) { return x.id === id; })[0];
        if (!cat) return;
        el.textContent = money(cat.amount) + " → cut " + money(state.cuts[id] || 0);
      });
    }

    function buildList() {
      var burn = PROFILES[state.profileId].burn;
      var list = qs("[data-burn-list]");
      if (!list) return;
      var html = "";
      html += '<h4 class="tool-subhead">Core monthly outflow</h4><ul class="burn-cats">';
      burn.baseCategories.forEach(function (c) {
        html +=
          '<li class="burn-cat"><span class="burn-label">' +
          escapeHtml(c.label) +
          '</span><span class="burn-amt">' +
          money(c.amount) +
          "</span></li>";
      });
      html += "</ul>";
      html += '<h4 class="tool-subhead">Lifestyle drag <span class="tool-tag">Adjust cuts</span></h4>';
      html += '<p class="tool-hint">Educational categories — not an accusation. Slide to reclaim surplus into the reservoir, including where standard of living sits above value earned.</p>';
      html += '<ul class="burn-cats burn-drag">';
      burn.dragCategories.forEach(function (c) {
        var cut = state.cuts[c.id] || 0;
        html +=
          '<li class="burn-cat is-drag' + (c.id === "sol_above_earn" ? " is-sol" : "") + '">' +
          '<div class="burn-cat-top">' +
          '<span class="burn-label">' + escapeHtml(c.label) + "</span>" +
          '<span class="burn-amt" data-cut-label="' + c.id + '">' +
          money(c.amount) + " → cut " + money(cut) +
          "</span></div>" +
          (c.note ? '<p class="burn-note">' + escapeHtml(c.note) + "</p>" : "") +
          '<label class="burn-slider-label"><span class="sr-only">Cut ' + escapeHtml(c.label) + "</span>" +
          '<input type="range" min="0" max="' + c.amount + '" step="5" value="' + cut +
          '" data-cut="' + c.id + '"></label></li>';
      });
      html += "</ul>";
      list.innerHTML = html;
      qsa("[data-cut]", list).forEach(function (slider) {
        slider.addEventListener("input", function () {
          state.cuts[slider.getAttribute("data-cut")] = Number(slider.value) || 0;
          updateMeter();
        });
      });
    }

    function load(id) {
      state.profileId = id;
      var p = PROFILES[id];
      state.cuts = {};
      p.burn.dragCategories.forEach(function (c) {
        state.cuts[c.id] = c.cutDefault;
      });
      updateProfileMeta(p);
      buildList();
      updateMeter();
    }

    var initial = bindProfileSwitcher(load);
    load(initial);
  }

  /* ===================== Risk–Reward ===================== */
  function initRiskReward() {
    function load(id) {
      var p = PROFILES[id];
      updateProfileMeta(p);
      render(p);
    }

    function bandLabel(band) {
      if (band === "ice") return { title: "Ice · Preserve", phase: "preserve" };
      if (band === "water") return { title: "Water · Compound", phase: "compound" };
      if (band === "steam") return { title: "Steam · Grow", phase: "grow" };
      if (band === "overflow") return { title: "Overflow · Give", phase: "overflow" };
      return { title: band, phase: band };
    }

    function render(p) {
      var map = qs("[data-alloc-map]");
      if (map) {
        var html = '<div class="alloc-bars" role="list">';
        p.allocation.forEach(function (a) {
          var b = bandLabel(a.band);
          html +=
            '<div class="alloc-row" role="listitem" data-band="' +
            a.band +
            '">' +
            '<div class="alloc-label">' +
            "<strong>" +
            escapeHtml(a.label) +
            '</strong><span class="alloc-band">' +
            escapeHtml(b.title) +
            "</span>" +
            '<span class="alloc-role">' +
            escapeHtml(a.role) +
            "</span></div>" +
            '<div class="alloc-track" aria-hidden="true"><span class="alloc-fill band-' +
            a.band +
            '" style="width:' +
            a.pct +
            '%"></span></div>' +
            '<div class="alloc-pct">' +
            a.pct +
            "%</div>" +
            "</div>";
        });
        html += "</div>";
        html +=
          '<p class="tool-hint">Percentages are an educational map of roles — not a recommended portfolio, model delivery, or projected return.</p>';
        map.innerHTML = html;
      }

      var framing = qs("[data-risk-framing]");
      if (framing) {
        framing.innerHTML =
          '<div class="risk-cards">' +
          '<article class="risk-card"><h3>Horizon</h3><p>' +
          escapeHtml(p.riskNotes.horizon) +
          "</p></article>" +
          '<article class="risk-card"><h3>Liquidity need</h3><p>' +
          escapeHtml(p.riskNotes.liquidity) +
          "</p></article>" +
          '<article class="risk-card"><h3>Overflow goal</h3><p>' +
          escapeHtml(p.riskNotes.overflow) +
          "</p></article>" +
          "</div>";
      }

      var legend = qs("[data-phase-legend]");
      if (legend) {
        legend.innerHTML =
          '<ul class="phase-legend">' +
          '<li class="band-ice"><strong>Ice</strong> Preserve capital &amp; optionality</li>' +
          '<li class="band-water"><strong>Water</strong> Compound with balance-sheet quality</li>' +
          '<li class="band-steam"><strong>Steam</strong> Grow with higher variability</li>' +
          '<li class="band-overflow"><strong>Overflow</strong> Give when the vessel is sound</li>' +
          "</ul>" +
          '<p class="tool-hint mb-0">Qualitative bands only — no promised rates of return.</p>';
      }

      renderTimeline(p);
      renderLifetimeChart(p);
    }

    function bandBar(bands) {
      return (
        '<div class="timeline-bands" aria-hidden="true">' +
        '<span class="b-ice" style="width:' + bands.ice + '%"></span>' +
        '<span class="b-water" style="width:' + bands.water + '%"></span>' +
        '<span class="b-steam" style="width:' + bands.steam + '%"></span>' +
        '<span class="b-overflow" style="width:' + bands.overflow + '%"></span>' +
        "</div>"
      );
    }

    function renderTimeline(p) {
      var el = qs("[data-risk-timeline]");
      if (!el || !p.timeline) return;
      var otherId = p.id === "mc" ? "fo" : "mc";
      var other = PROFILES[otherId];
      var years = p.timeline.years;
      var html = "";
      html += "<div class=\"risk-timeline\">";
      html += "<h3>Horizon timeline</h3>";
      html +=
        '<p class="timeline-lede">How Ice / Water / Steam / Overflow emphasis can shift by year — for this example and across Steward vs Open currents. Qualitative teaching aid only; not a schedule of returns.</p>';
      html +=
        '<div class="timeline-currents">' +
        '<div class="timeline-current steward"><h4>Steward Current</h4><p>Purpose-led household and stewardship framing — often more Ice early, Water as spine, Steam only with surplus, Overflow when the vessel holds.</p></div>' +
        '<div class="timeline-current open"><h4>Open Current</h4><p>Broader multi-entity / growth framing — Steam can sit larger earlier, with Water structures and Overflow (e.g. DAF) as capacity grows.</p></div>' +
        "</div>";
      html +=
        '<ul class="risk-timeline-legend" aria-label="Band colors">' +
        '<li><i class="sw-ice"></i> Ice · Preserve</li>' +
        '<li><i class="sw-water"></i> Water · Compound</li>' +
        '<li><i class="sw-steam"></i> Steam · Grow</li>' +
        '<li><i class="sw-overflow"></i> Overflow · Give</li>' +
        "</ul>";
      html += '<div class="timeline-axis"><span></span>';
      years.forEach(function (y) {
        html += "<span>" + escapeHtml(y.label) + "</span>";
      });
      html += "</div>";

      function trackRow(label, tl) {
        var row = '<div class="timeline-track"><div class="timeline-track-label">' + escapeHtml(label) + "</div>";
        tl.years.forEach(function (y) {
          row +=
            '<div class="timeline-cell">' +
            bandBar(y.bands) +
            '<p class="yr-note">' +
            escapeHtml(y.note) +
            "</p></div>";
        });
        row += "</div>";
        return row;
      }

      html += trackRow(p.shortName.replace(" (illustrative)", ""), p.timeline);
      html += trackRow(other.shortName.replace(" (illustrative)", ""), other.timeline);
      html +=
        '<p class="timeline-footnote">Active example leans <strong>' +
        escapeHtml(p.timeline.currentLabel) +
        "</strong>. Compare both rows to see how the same year marks can look different by vessel size and current. Percent bars are emphasis weights — not portfolio weights or forecast returns.</p>";
      html += "</div>";
      el.innerHTML = html;
    }


    function renderLifetimeChart(p) {
      var el = qs("[data-lifetime-chart]");
      if (!el) return;
      var pathId = p.id === "fo" ? "harbor" : "rivera";
      var path = LIFETIME_PATHS[pathId];
      var otherId = pathId === "rivera" ? "harbor" : "rivera";
      var other = LIFETIME_PATHS[otherId];
      var pts = buildLifetimePoints(path);
      var W = 720;
      var H = 420;
      var pad = { t: 40, r: 58, b: 78, l: 54 };
      var plotW = W - pad.l - pad.r;
      var plotH = H - pad.t - pad.b;
      var maxVessel = 0;
      var maxSpend = path.lifestyleNeed;
      pts.forEach(function (pt) {
        if (pt.vessel > maxVessel) maxVessel = pt.vessel;
        if (pt.spendCap > maxSpend) maxSpend = pt.spendCap;
      });
      maxVessel *= 1.08;
      maxSpend *= 1.15;
      var x0 = path.startAge;
      var x1 = path.endAge;
      function xScale(age) {
        return pad.l + ((age - x0) / (x1 - x0)) * plotW;
      }
      function yVessel(v) {
        return pad.t + plotH - (v / maxVessel) * plotH;
      }
      function ySpend(s) {
        return pad.t + plotH - (s / maxSpend) * plotH;
      }
      function seriesPath(filterFn, yFn) {
        var d = "";
        var n = 0;
        pts.forEach(function (pt) {
          if (!filterFn(pt)) return;
          var x = xScale(pt.age);
          var y = yFn(pt);
          d += (n === 0 ? "M" : " L") + x.toFixed(1) + " " + y.toFixed(1);
          n += 1;
        });
        return d;
      }
      var vesselSolid = seriesPath(function (pt) { return pt.age <= path.handoffAge; }, function (pt) { return yVessel(pt.vessel); });
      var vesselTrust = seriesPath(function (pt) { return pt.age >= path.handoffAge; }, function (pt) { return yVessel(pt.vessel); });
      var spendSolid = seriesPath(function (pt) { return pt.age <= path.handoffAge; }, function (pt) { return ySpend(pt.spendCap); });
      var spendTrust = seriesPath(function (pt) { return pt.age >= path.handoffAge; }, function (pt) { return ySpend(pt.spendCap); });
      var needY = ySpend(path.lifestyleNeed);
      var handoffX = xScale(path.handoffAge);
      var crossAge = null;
      pts.forEach(function (pt) {
        if (crossAge === null && pt.spendCap >= path.lifestyleNeed) crossAge = pt.age;
      });

      var grid = "";
      var i;
      for (i = 0; i <= 4; i++) {
        var vv = (maxVessel * i) / 4;
        var yy = yVessel(vv);
        grid +=
          '<line x1="' + pad.l + '" y1="' + yy.toFixed(1) + '" x2="' + (pad.l + plotW) + '" y2="' + yy.toFixed(1) + '" stroke="rgba(11,31,51,0.06)" stroke-width="1"/>';
        grid +=
          '<text x="' + (pad.l - 8) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end" class="lt-axis">' + Math.round(vv) + "</text>";
        var ss = (maxSpend * i) / 4;
        var ys = ySpend(ss);
        grid +=
          '<text x="' + (pad.l + plotW + 8) + '" y="' + (ys + 3).toFixed(1) + '" text-anchor="start" class="lt-axis lt-axis-r">' + Math.round(ss) + "</text>";
      }

      var stageMarks = "";
      path.stages.forEach(function (st, idx) {
        var sx = xScale(st.from);
        stageMarks +=
          '<line x1="' + sx.toFixed(1) + '" y1="' + pad.t + '" x2="' + sx.toFixed(1) + '" y2="' + (pad.t + plotH) + '" stroke="rgba(11,31,51,0.08)" stroke-width="1"/>';
        var mid = xScale((st.from + Math.min(st.to, x1)) / 2);
        var ly = pad.t + plotH + 18 + (idx % 2) * 14;
        stageMarks +=
          '<text x="' + mid.toFixed(1) + '" y="' + ly + '" text-anchor="middle" class="lt-stage-label">' + escapeHtml(st.label) + "</text>";
      });

      var crossMark = "";
      if (crossAge !== null) {
        var cx = xScale(crossAge);
        var cy = ySpend(path.lifestyleNeed);
        crossMark =
          '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="4.5" fill="#C7A15A" stroke="#0B1F33" stroke-width="1.2"/>' +
          '<text x="' + (cx + 8).toFixed(1) + '" y="' + (cy - 10).toFixed(1) + '" class="lt-anno">Meet &amp; exceed · age ~' + crossAge + "</text>";
      }

      var vesselLabelPt = pts.filter(function (pt) { return pt.age === (path.id === "harbor" ? 46 : 49); })[0];
      var spendLabelPt = pts.filter(function (pt) { return pt.age === (path.id === "harbor" ? 66 : 70); })[0];
      var seriesLabels =
        '<text x="' + (xScale(vesselLabelPt.age) + 8).toFixed(1) + '" y="' + (yVessel(vesselLabelPt.vessel) - 11).toFixed(1) + '" class="lt-anno lt-anno-vessel">Vessel compounds</text>' +
        '<text x="' + (xScale(spendLabelPt.age) + 8).toFixed(1) + '" y="' + (ySpend(spendLabelPt.spendCap) + 18).toFixed(1) + '" class="lt-anno lt-anno-gold">4% spending capacity</text>';

      var handoffAnno =
        '<line x1="' + handoffX.toFixed(1) + '" y1="' + pad.t + '" x2="' + handoffX.toFixed(1) + '" y2="' + (pad.t + plotH) + '" stroke="#C7A15A" stroke-width="1.5" stroke-dasharray="4 4"/>' +
        '<path d="M' + handoffX.toFixed(1) + " " + (pad.t + 16) + " L" + (handoffX + 38).toFixed(1) + " " + (pad.t + 16) +
        " M" + (handoffX + 32).toFixed(1) + " " + (pad.t + 10) + " L" + (handoffX + 38).toFixed(1) + " " + (pad.t + 16) +
        " L" + (handoffX + 32).toFixed(1) + " " + (pad.t + 22) + '" fill="none" stroke="#C7A15A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<text x="' + (handoffX + 42).toFixed(1) + '" y="' + (pad.t + 20) + '" class="lt-anno lt-anno-gold">Death → trust handoff → generational</text>';

      var growthNote = path.id === "harbor" ? "5.5" : "5";

      var svg =
        '<svg class="lifetime-svg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Illustrative lifetime vessel compounding for ' + escapeHtml(path.label) + '">' +
        "<title>Illustrative lifetime vessel path — not a forecast</title>" +
        grid +
        stageMarks +
        '<line x1="' + pad.l + '" y1="' + needY.toFixed(1) + '" x2="' + (pad.l + plotW) + '" y2="' + needY.toFixed(1) + '" stroke="#5A6B76" stroke-width="1.4" stroke-dasharray="2 5"/>' +
        '<text x="' + (pad.l + 6) + '" y="' + (needY - 6).toFixed(1) + '" class="lt-anno">Lifestyle need (illustrative)</text>' +
        '<path d="' + spendSolid + '" fill="none" stroke="#C7A15A" stroke-width="1.8" stroke-dasharray="6 5"/>' +
        '<path d="' + spendTrust + '" fill="none" stroke="#C7A15A" stroke-width="1.5" stroke-dasharray="2 4" opacity="0.75"/>' +
        '<path d="' + vesselSolid + '" fill="none" stroke="#2BA8A0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="' + vesselTrust + '" fill="none" stroke="#0B1F33" stroke-width="2.2" stroke-dasharray="5 5" stroke-linecap="round"/>' +
        seriesLabels +
        handoffAnno +
        crossMark +
        '<text x="' + pad.l + '" y="' + (pad.t - 16) + '" class="lt-axis-title">Vessel index (illustrative)</text>' +
        '<text x="' + (pad.l + plotW) + '" y="' + (pad.t - 16) + '" text-anchor="end" class="lt-axis-title">Spending capacity · 4% teaching line</text>' +
        "</svg>";

      var html = "";
      html += '<div class="lifetime-chart">';
      html += '<p class="eyebrow lifetime-eyebrow">Longevity teaching map</p>';
      html += "<h3>4% spending capacity across a compounding lifetime</h3>";
      html +=
        '<p class="lifetime-lede"><strong>The 4% rule is a historical teaching heuristic:</strong> an initial withdrawal of roughly 4% of a diversified portfolio is often discussed as a retirement-spending starting point. Here, it is a line for learning how a vessel might meet lifestyle need through sustain, longevity, and handoff — never a guarantee or recommendation.</p>';
      html +=
        '<div class="lifetime-path-switch" role="group" aria-label="Lifetime path example">' +
        '<button type="button" data-lifetime-path="rivera"' +
        (pathId === "rivera" ? ' class="is-active" aria-pressed="true"' : ' aria-pressed="false"') +
        ">Rivera · Steward lean</button>" +
        '<button type="button" data-lifetime-path="harbor"' +
        (pathId === "harbor" ? ' class="is-active" aria-pressed="true"' : ' aria-pressed="false"') +
        ">Harbor · Open lean</button>" +
        "</div>";
      html +=
        '<p class="lifetime-path-meta"><strong>' +
        escapeHtml(path.label) +
        "</strong> · " +
        escapeHtml(path.lean) +
        " — " +
        escapeHtml(path.blurb) +
        "</p>";
      html += '<div class="lifetime-svg-wrap">' + svg + "</div>";
      html +=
        '<ul class="lifetime-legend" aria-label="Chart legend">' +
        '<li><i class="lg-vessel"></i> Vessel / portfolio (illustrative index)</li>' +
        '<li><i class="lg-vessel-trust"></i> Trust sleeve continuation (after handoff)</li>' +
        '<li><i class="lg-four"></i> 4% rule teaching line (spending capacity)</li>' +
        '<li><i class="lg-need"></i> Flat lifestyle need (illustrative)</li>' +
        "</ul>";
      html += '<ol class="lifetime-stages">';
      path.stages.forEach(function (st) {
        html +=
          "<li><strong>" +
          escapeHtml(st.label) +
          "</strong> <span>" +
          escapeHtml(st.range) +
          "</span></li>";
      });
      html += "</ol>";
      html +=
        '<p class="lifetime-footnote"><strong>Disclaimer:</strong> Illustrative hypothetical only — not a forecast, not advice, not a guarantee. The “4% rule” is a historical teaching heuristic, not a promise. Growth shown is an illustrative ' +
        growthNote +
        "% real teaching curve with invented surplus additions — not an expected return. Index starts at 100 (Rivera) or 220 (Harbor) at age 35. Spending capacity = 4% of that year’s vessel index. Compare the " +
        escapeHtml(other.label) +
        " via the toggle.</p>";

      var burn = p.burn;
      var baseTotal = burn.baseCategories.reduce(function (sum, c) { return sum + c.amount; }, 0);
      var dragTotal = burn.dragCategories.reduce(function (sum, c) { return sum + c.amount; }, 0);
      var plannedCuts = burn.dragCategories.reduce(function (sum, c) { return sum + c.cutDefault; }, 0);
      var plannedSurplus = burn.takeHome - (baseTotal + dragTotal - plannedCuts);
      var readiness = burn.readiness;
      var fundingRatio = Math.max(0, plannedSurplus) / readiness.curveFundingMonthly;
      var readinessBand = fundingRatio < 0.7 ? "under" : fundingRatio <= 1.2 ? "path" : "resilient";
      var readinessLabel = readinessBand === "under" ? "Under-fueled" : readinessBand === "path" ? "On the path" : "Resilient overflow";
      var markerLeft = Math.max(4, Math.min(96, fundingRatio < 0.7 ? fundingRatio / 0.7 * 31 : fundingRatio <= 1.2 ? 34 + ((fundingRatio - 0.7) / 0.5) * 32 : 69 + Math.min(1, (fundingRatio - 1.2) / 0.8) * 27));
      var sustainStage = path.stages.filter(function (st) { return st.id === "sustain"; })[0];
      var crossingCopy = crossAge !== null && crossAge <= sustainStage.to
        ? "On the smooth teaching curve, 4% capacity meets lifestyle need around age " + crossAge + " in the sustain band, then remains above the need line through the illustrated longevity period."
        : "On the smooth teaching curve, 4% capacity does not meet lifestyle need within the sustain band; burn-down would need to deepen or lifestyle need would need to fall.";

      html += '<section class="goal-readiness" aria-labelledby="goal-readiness-title">';
      html += '<div class="goal-readiness-head"><div><p class="eyebrow">Burn-Down → Risk–Reward</p><h4 id="goal-readiness-title">Illustrative goal readiness</h4></div><span class="goal-readiness-status is-' + readinessBand + '">' + readinessLabel + "</span></div>";
      html += '<p class="goal-readiness-callout"><strong>Burn-Down fills the vessel;</strong> Risk–Reward maps whether that vessel can meet the 4% teaching line through longevity and handoff.</p>';
      html += '<div class="goal-readiness-meter" role="img" aria-label="Illustrative readiness: ' + readinessLabel + '"><div class="goal-readiness-segments"><span class="is-under">Under-fueled</span><span class="is-path">On the path</span><span class="is-resilient">Resilient overflow</span></div><i class="goal-readiness-marker" style="left:' + markerLeft.toFixed(1) + '%" aria-hidden="true"></i></div>';
      html += '<div class="goal-readiness-summary"><div><span>Planned burn-down surplus</span><strong>' + money(Math.max(0, plannedSurplus)) + '/mo</strong><small>' + money(plannedCuts) + '/mo of default drag cuts</small></div><div><span>Teaching-curve funding lane</span><strong>' + money(readiness.curveFundingMonthly) + '/mo</strong><small>Illustrative input—not a return target</small></div><div><span>Sustain read</span><strong>' + (crossAge !== null ? "Age ~" + crossAge : "Below need") + '</strong><small>4% capacity meets lifestyle need</small></div></div>';
      html += '<p class="goal-readiness-profile"><strong>' + escapeHtml(p.shortName.replace(" (illustrative)", "")) + " · " + readinessLabel + ".</strong> " + escapeHtml(readiness.tie) + " " + escapeHtml(crossingCopy) + "</p>";
      html += '<div class="goal-readiness-bands"><article class="' + (readinessBand === "under" ? "is-active" : "") + '"><strong>1 · Under-fueled</strong><p>Surplus is too thin; 4% capacity stays below need. Burn-Down must deepen or need must fall.</p></article><article class="' + (readinessBand === "path" ? "is-active" : "") + '"><strong>2 · On the path</strong><p>Surplus roughly funds the teaching curve; capacity meets need in the sustain band.</p></article><article class="' + (readinessBand === "resilient" ? "is-active" : "") + '"><strong>3 · Resilient overflow</strong><p>Surplus runs ahead of need, creating illustrative room for trust or overflow earlier.</p></article></div>';
      html += '<div class="goal-readiness-actions"><a class="btn btn-turquoise" href="/tools/burn-down/">Open Burn-Down plan</a><p>Qualitative scenario readiness only—not a probability, Monte Carlo result, success rate, or financial advice.</p></div>';
      html += "</section>";
      html += "</div>";
      el.innerHTML = html;

      qsa("[data-lifetime-path]", el).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-lifetime-path");
          var mapped = id === "harbor" ? "fo" : "mc";
          var switcherBtn = qs('[data-profile-switcher] [data-profile="' + mapped + '"]');
          if (switcherBtn) switcherBtn.click();
        });
      });
    }

    var initial = bindProfileSwitcher(load);
    load(initial);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- Boot ---------- */
  function boot() {
    var root = qs("[data-tool]");
    if (!root) return;
    var tool = root.getAttribute("data-tool");
    if (tool === "level-set") initLevelSet();
    else if (tool === "burn-down") initBurnDown();
    else if (tool === "risk-reward") initRiskReward();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
