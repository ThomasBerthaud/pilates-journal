import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DDLvSHup.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { a as addHistoryEntry, b as getSessionById, $ as $$Layout } from '../../chunks/storage__4QG-K8k.mjs';
export { renderers } from '../../renderers.mjs';

function Timer({
  seconds,
  onComplete,
  size = "large",
  label,
  textColor = "text-indigo-600",
  circleColor = "#6366f1"
}) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft === 0 && onComplete) {
        onComplete();
      }
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const percentage = timeLeft / seconds * 100;
  const sizeClasses = {
    small: "text-xl",
    medium: "text-3xl",
    large: "text-5xl md:text-7xl"
  };
  const circleSize = {
    small: 120,
    medium: 180,
    large: 240
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
    label && /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-gray-700 mb-4", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "relative", style: { width: circleSize[size], height: circleSize[size] }, children: [
      /* @__PURE__ */ jsxs("svg", { className: "transform -rotate-90", width: circleSize[size], height: circleSize[size], children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: circleSize[size] / 2,
            cy: circleSize[size] / 2,
            r: circleSize[size] / 2 - 10,
            fill: "none",
            stroke: "#e5e7eb",
            strokeWidth: "8"
          }
        ),
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: circleSize[size] / 2,
            cy: circleSize[size] / 2,
            r: circleSize[size] / 2 - 10,
            fill: "none",
            stroke: circleColor,
            strokeWidth: "8",
            strokeDasharray: `${2 * Math.PI * (circleSize[size] / 2 - 10)}`,
            strokeDashoffset: `${2 * Math.PI * (circleSize[size] / 2 - 10) * (1 - percentage / 100)}`,
            className: "transition-all duration-1000 ease-linear"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx("span", { className: `font-bold ${textColor} ${sizeClasses[size]} leading-none`, children: formatTime(timeLeft) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsRunning(!isRunning),
          className: "px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors",
          children: isRunning ? "Pause" : "Démarrer"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setTimeLeft(seconds);
            setIsRunning(false);
          },
          className: "px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors",
          children: "Réinitialiser"
        }
      )
    ] })
  ] });
}

function SessionTimer({ session, onComplete }) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("exercise");
  const [startTime] = useState(() => Date.now());
  const currentExercise = session.exercises[currentExerciseIndex] || null;
  const isLastExercise = currentExerciseIndex === session.exercises.length - 1;
  const exerciseType = currentExercise?.type || "exercise";
  const handleExerciseComplete = () => {
    if (currentExercise && currentExercise.restTime > 0 && !isLastExercise) {
      setCurrentPhase("rest");
    } else {
      moveToNextExercise();
    }
  };
  const handleRestComplete = () => {
    moveToNextExercise();
  };
  const moveToNextExercise = () => {
    if (isLastExercise && currentPhase === "rest") {
      handleSessionComplete();
    } else if (isLastExercise) {
      if (currentExercise && currentExercise.restTime > 0) {
        setCurrentPhase("rest");
      } else {
        handleSessionComplete();
      }
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentPhase("exercise");
    }
  };
  const handleSessionComplete = () => {
    const endTime = Date.now();
    const totalDuration = Math.floor((endTime - startTime) / 1e3);
    addHistoryEntry({
      sessionId: session.id,
      sessionName: session.name,
      completedAt: endTime,
      totalDuration
    });
    setCurrentPhase("completed");
    setTimeout(() => {
      onComplete();
    }, 2e3);
  };
  if (currentPhase === "completed") {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "text-6xl mb-4", children: "🎉" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-2", children: "Séance terminée !" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Bravo pour avoir complété cette séance !" })
    ] });
  }
  if (!currentExercise) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Aucun exercice disponible" }) });
  }
  const progress = (currentExerciseIndex + (currentPhase === "rest" ? 1 : 0)) / (session.exercises.length * 2) * 100;
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm text-gray-600 mb-2", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "Exercice ",
          currentExerciseIndex + 1,
          " sur ",
          session.exercises.length
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          Math.round(progress),
          "% complété"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "bg-indigo-600 h-3 rounded-full transition-all duration-500",
          style: { width: `${progress}%` }
        }
      ) })
    ] }),
    currentPhase === "exercise" ? (() => {
      const getTypeStyles = () => {
        switch (exerciseType) {
          case "warmup":
            return {
              container: "bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200",
              badge: "bg-orange-600 text-white",
              badgeText: "Échauffement",
              timerColor: "text-orange-600",
              circleColor: "#ea580c"
            };
          case "stretch":
            return {
              container: "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200",
              badge: "bg-green-600 text-white",
              badgeText: "Étirement",
              timerColor: "text-green-600",
              circleColor: "#16a34a"
            };
          default:
            return {
              container: "bg-white",
              badge: "bg-indigo-600 text-white animate-pulse-slow",
              badgeText: "Exercice",
              timerColor: "text-indigo-600",
              circleColor: "#6366f1"
            };
        }
      };
      const styles = getTypeStyles();
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `${styles.container} rounded-xl shadow-xl p-8 text-center animate-slide-up`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("span", { className: `px-4 py-2 ${styles.badge} rounded-full text-sm font-semibold`, children: styles.badgeText }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-4", children: currentExercise.name }),
            /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-8 max-w-2xl mx-auto", children: currentExercise.description }),
            /* @__PURE__ */ jsx(
              Timer,
              {
                seconds: currentExercise.duration,
                onComplete: handleExerciseComplete,
                size: "large",
                textColor: styles.timerColor,
                circleColor: styles.circleColor
              }
            )
          ]
        }
      );
    })() : /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-xl p-8 text-center border-2 border-purple-200 animate-slide-up", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold", children: "Repos" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-gray-800 mb-4", children: "Temps de repos" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-8", children: "Profitez de ce moment pour récupérer" }),
      /* @__PURE__ */ jsx(Timer, { seconds: currentExercise.restTime, onComplete: handleRestComplete, size: "large" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-center gap-4", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => window.location.href = "/",
        className: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors",
        children: "Quitter"
      }
    ) })
  ] });
}

function SessionTimerWrapper({ sessionId }) {
  const [session, setSession] = useState(() => getSessionById(sessionId));
  const [loading] = useState(false);
  useEffect(() => {
    const currentSession = getSessionById(sessionId);
    setSession(currentSession);
  }, [sessionId]);
  const handleComplete = () => {
    window.location.href = "/";
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Chargement de la séance..." }) });
  }
  if (!session) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Séance introuvable" }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "text-indigo-600 hover:text-indigo-700 font-semibold", children: "Retour à l'accueil" })
    ] });
  }
  return /* @__PURE__ */ jsx(SessionTimer, { session, onComplete: handleComplete });
}

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pilates Journal - S\xE9ance" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8 max-w-7xl"> ${renderComponent($$result2, "SessionTimerWrapper", SessionTimerWrapper, { "client:load": true, "sessionId": id || "", "client:component-hydration": "load", "client:component-path": "/Users/thomasberthaud/dev/pilate-journal/src/components/SessionTimerWrapper", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/thomasberthaud/dev/pilate-journal/src/pages/session/[id].astro", void 0);

const $$file = "/Users/thomasberthaud/dev/pilate-journal/src/pages/session/[id].astro";
const $$url = "/session/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
