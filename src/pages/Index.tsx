import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const heroBg = "https://cdn.poehali.dev/projects/c1b047f3-a020-4466-8933-09b7be1a6922/files/d5a01229-5e58-42e9-9c17-5cc53e61e025.jpg";

const codeRules = [
  {
    emoji: "🤫",
    title: "Чужие секреты неприкосновенны",
    text: "То, что подруга рассказала тебе в 2 ночи — остаётся между вами. Навсегда. Без исключений.",
  },
  {
    emoji: "💬",
    title: "Правда без осуждения",
    text: "Говорить честно можно и нужно, но без «ну ты и дура». Поддержка ≠ согласие с любым решением.",
  },
  {
    emoji: "🚫",
    title: "Нельзя насильно спасать",
    text: "Ты можешь предложить помощь — но нельзя заставить. Каждая сама выбирает свой путь.",
  },
  {
    emoji: "🛡️",
    title: "Поддержка девушек",
    text: "Не флиртуй с парнем подруги. Не поддерживай сплетни о ней. Ты — её тыл, не предатель.",
  },
];

const situations = [
  {
    title: "Подруга вдруг отдалилась",
    icon: "UserMinus",
    description: "Она перестала писать, игнорирует в компании...",
    options: [
      { label: "Спросить напрямую, всё ли хорошо", correct: true },
      { label: "Игнорировать её в ответ", correct: false },
      { label: "Обсудить с другими подругами за её спиной", correct: false },
    ],
    advice: "Лучший выход — спросить мягко и без обвинений: «Я заметила, что мы стали реже общаться. У тебя всё хорошо? Я здесь, если нужна.»"
  },
  {
    title: "Подруге нравится парень твоей подруги",
    icon: "Heart",
    description: "Она говорит, что влюблена в парня, который встречается с твоей лучшей подругой...",
    options: [
      { label: "Сказать ей, что это переходит черту", correct: true },
      { label: "Поддержать её чувства — это же любовь", correct: false },
      { label: "Сразу рассказать подруге про парня", correct: false },
    ],
    advice: "Важно мягко объяснить, что есть границы, которые защищают дружбу. Чувства можно понять, но действия — это выбор."
  },
  {
    title: "Тебе обесценивают успех",
    icon: "TrendingDown",
    description: "Ты рассказала подруге о своей победе, а она ответила «ну и что, подумаешь»...",
    options: [
      { label: "Сказать, что тебе важна её поддержка", correct: true },
      { label: "Перестать делиться с ней радостями", correct: false },
      { label: "Сделать вид, что всё нормально", correct: false },
    ],
    advice: "Скажи честно: «Мне важно, чтобы ты радовалась за меня, как я радуюсь за тебя.» Если паттерн повторяется — это сигнал."
  },
];

const healthyVsToxic = {
  healthy: [
    "Радуется твоим успехам искренне",
    "Уважает твои границы",
    "Может не соглашаться без осуждения",
    "Не исчезает в трудные моменты",
    "Держит твои секреты",
    "Извиняется, если обидела",
  ],
  toxic: [
    "Завидует или обесценивает твои победы",
    "Давит на тебя, чтобы ты изменилась",
    "Делится твоими секретами",
    "Только берёт, но не даёт",
    "Заставляет чувствовать себя «не такой»",
    "Никогда не признаёт ошибок",
  ],
};

const glossary = [
  {
    term: "Газлайтинг",
    emoji: "🌀",
    definition: "Когда человек заставляет тебя сомневаться в своих чувствах и восприятии реальности. «Да ты преувеличиваешь, этого не было».",
  },
  {
    term: "Френдзона",
    emoji: "💌",
    definition: "Ситуация, когда один человек хочет дружбы, а другой — романтических отношений. Это нормально, это не приговор.",
  },
  {
    term: "Пассивная агрессия",
    emoji: "😶",
    definition: "Злость, выраженная скрытно: сарказм, молчание, закатывание глаз вместо прямого разговора.",
  },
  {
    term: "Токсичность",
    emoji: "☠️",
    definition: "Поведение, которое систематически причиняет боль: унижение, манипуляции, игнорирование границ.",
  },
  {
    term: "Эмпатия",
    emoji: "🫂",
    definition: "Способность почувствовать то, что чувствует другой. Не жалеть, а понимать.",
  },
  {
    term: "Личные границы",
    emoji: "🌸",
    definition: "Правила, которые защищают твоё пространство, время и чувства. Их важно говорить вслух.",
  },
];

function useIntersection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);
  return ref;
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useIntersection();
  return (
    <div ref={ref} className={`fade-in-section ${className}`}>
      {children}
    </div>
  );
}

function SituationCard({ situation }: { situation: typeof situations[0] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-sm border border-pink-100 card-hover flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center flex-shrink-0">
          <Icon name={situation.icon as "Heart"} size={20} className="text-pink-500" fallback="HelpCircle" />
        </div>
        <h3 className="font-display text-xl font-semibold text-gray-800">{situation.title}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-5 font-body">{situation.description}</p>
      <div className="space-y-3 flex-1">
        {situation.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-body transition-all duration-300 border ${
              selected === null
                ? "border-pink-100 bg-pink-50/50 hover:bg-pink-100 hover:border-pink-200 text-gray-700"
                : selected === i
                ? opt.correct
                  ? "border-green-300 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-600"
                : opt.correct
                ? "border-green-200 bg-green-50/50 text-green-600"
                : "border-gray-100 bg-gray-50 text-gray-400"
            }`}
          >
            <span className="mr-2">
              {selected !== null ? (opt.correct ? "✅" : selected === i ? "❌" : "○") : "○"}
            </span>
            {opt.label}
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100">
          <p className="text-sm font-body text-gray-700 leading-relaxed">💡 {situation.advice}</p>
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden font-body">

      {/* ——— Hero ——— */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-16 left-10 w-56 h-56 blob animate-float"
            style={{ background: "radial-gradient(circle, rgba(244,143,177,0.45) 0%, rgba(206,147,216,0.2) 100%)" }}
          />
          <div
            className="absolute bottom-24 right-8 w-72 h-72 blob animate-float-slow"
            style={{ background: "radial-gradient(circle, rgba(255,138,101,0.25) 0%, rgba(244,143,177,0.12) 100%)", animationDelay: "3s" }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-36 h-36 blob animate-float"
            style={{ background: "radial-gradient(circle, rgba(225,190,231,0.55) 0%, transparent 70%)", animationDelay: "1.5s" }}
          />
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <style>{`
              @keyframes lineDraw { to { stroke-dashoffset: 0; } }
            `}</style>
            <path d="M -50 300 Q 200 100, 400 350 T 900 200 T 1400 300"
              fill="none" stroke="rgba(233,30,140,0.12)" strokeWidth="2"
              strokeDasharray="1000" strokeDashoffset="1000"
              style={{ animation: "lineDraw 3s ease forwards 0.5s" }} />
            <path d="M -50 500 Q 300 300, 600 550 T 1100 350 T 1500 450"
              fill="none" stroke="rgba(206,147,216,0.15)" strokeWidth="1.5"
              strokeDasharray="1000" strokeDashoffset="1000"
              style={{ animation: "lineDraw 3s ease forwards 1s" }} />
            <path d="M 200 -50 Q 400 200, 300 500 T 500 900"
              fill="none" stroke="rgba(255,138,101,0.1)" strokeWidth="2"
              strokeDasharray="1000" strokeDashoffset="1000"
              style={{ animation: "lineDraw 2.5s ease forwards 1.5s" }} />
          </svg>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1
            className="font-display text-4xl md:text-6xl font-semibold leading-tight mb-5"
            style={{ animation: "fade-up 0.7s ease forwards 0.2s", opacity: 0, color: "#e91e8c" }}
          >
            Girl code: неписанные правила женской дружбы
          </h1>
          <p
            className="font-body text-xl mb-10 max-w-lg mx-auto"
            style={{ animation: "fade-up 0.7s ease forwards 0.4s", opacity: 0, color: "#e91e8c" }}
          >
            Твоя безопасная зона о настоящей дружбе
          </p>
          <div style={{ animation: "fade-up 0.7s ease forwards 0.8s", opacity: 0 }}>
            <a
              href="#code"
              className="inline-block px-9 py-4 rounded-full text-white font-body font-medium text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #e91e8c, #ff8a65)" }}
            >
              Читать кодекс ✨
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <Icon name="ChevronDown" size={28} className="text-pink-400" />
        </div>
      </section>

      {/* ——— Кодекс чести ——— */}
      <section id="code" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <span className="text-5xl mb-4 block">👑</span>
              <h2 className="font-display text-5xl md:text-6xl font-light text-gradient mb-4">
                Кодекс чести
              </h2>
              <p className="font-body text-gray-500 text-lg">4 правила, которые делают дружбу настоящей</p>
            </div>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {codeRules.map((rule, i) => (
              <Section key={i}>
                <div className="bg-white/70 backdrop-blur rounded-3xl p-8 border border-pink-100 card-hover h-full">
                  <div className="text-4xl mb-5">{rule.emoji}</div>
                  <h3 className="font-display text-2xl font-semibold text-gray-800 mb-3">{rule.title}</h3>
                  <p className="font-body text-gray-600 leading-relaxed">{rule.text}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Ситуационная комната ——— */}
      <section
        className="py-24 px-6"
        style={{ background: "linear-gradient(180deg, transparent, rgba(243,229,245,0.5), transparent)" }}
      >
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <span className="text-5xl mb-4 block">🎭</span>
              <h2 className="font-display text-5xl md:text-6xl font-light text-gradient mb-4">
                Ситуационная комната
              </h2>
              <p className="font-body text-gray-500 text-lg">Выбери решение — узнай ответ</p>
            </div>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {situations.map((s, i) => (
              <Section key={i}>
                <SituationCard situation={s} />
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Токсичный VS Здоровый ——— */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <span className="text-5xl mb-4 block">⚖️</span>
              <h2 className="font-display text-5xl md:text-6xl font-light text-gradient mb-4">
                Здоровая vs Токсичная
              </h2>
              <p className="font-body text-gray-500 text-lg">Научись различать</p>
            </div>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Section>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 h-full card-hover">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center">
                    <Icon name="Heart" size={20} className="text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-green-700">Здоровая дружба</h3>
                </div>
                <ul className="space-y-3">
                  {healthyVsToxic.healthy.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-gray-700">
                      <span className="text-green-400 mt-0.5 flex-shrink-0 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
            <Section>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100 h-full card-hover">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-red-400" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-red-600">Тревожные сигналы</h3>
                </div>
                <ul className="space-y-3">
                  {healthyVsToxic.toxic.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 font-body text-gray-700">
                      <span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">!</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* ——— Словарь ——— */}
      <section
        className="py-24 px-6"
        style={{ background: "linear-gradient(180deg, transparent, rgba(252,228,236,0.4), transparent)" }}
      >
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <span className="text-5xl mb-4 block">📖</span>
              <h2 className="font-display text-5xl md:text-6xl font-light text-gradient mb-4">
                Словарь
              </h2>
              <p className="font-body text-gray-500 text-lg">Слова, которые важно знать</p>
            </div>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {glossary.map((item, i) => (
              <Section key={i}>
                <div className="bg-white/70 backdrop-blur rounded-3xl p-6 border border-pink-100 card-hover h-full">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="font-display text-xl font-semibold text-gray-800 mb-2">{item.term}</h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">{item.definition}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Footer ——— */}
      <footer
        className="py-20 px-6 text-center"
        style={{ background: "linear-gradient(180deg, transparent, rgba(243,229,245,0.7))" }}
      >
        <Section>
          <div className="max-w-xl mx-auto">
            <div className="polaroid inline-block mb-10 max-w-xs rotate-1">
              <img
                src={heroBg}
                alt="Girl Code"
                className="w-full rounded-sm object-cover"
                style={{ height: 180 }}
              />
              <p className="font-display text-base text-gray-500 text-center mt-3 italic leading-snug">
                «Настоящая подруга — это зеркало,<br/>в котором ты нравишься себе»
              </p>
            </div>



            <p className="mt-14 font-body text-xs text-gray-400">
              Girl Code © 2024 — Твоя безопасная зона о настоящей дружбе
            </p>
          </div>
        </Section>
      </footer>
    </div>
  );
}