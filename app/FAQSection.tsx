import styles from "./FAQSection.module.css";

const faqs = [
  {
    question: "What does Cuppet do?",
    answer:
      "You connect apps you already use, describe a routine in plain language, and an agent runs it on the schedule you set.",
  },
  {
    question: "How is this different from a chatbot?",
    answer:
      "A chatbot waits for you to open it. Cuppet is for work that should run without another prompt, with a clear log of what happened.",
  },
  {
    question: "What is a scheduled agent?",
    answer:
      "A saved task with a time, connected tools, and limits you approve—like a weekday morning brief or a weekly digest.",
  },
  {
    question: "Which apps can I connect?",
    answer:
      "We are building connectors for tools like Gmail, Calendar, Drive, Docs, Notion, and Slack. More will land over time; each connection is optional.",
  },
  {
    question: "Is my data private?",
    answer:
      "Access is permission-based. You pick which apps an agent can use and review that access before approving it.",
  },
] as const;

export default function FAQSection() {
  return (
    <section className={styles.faqSection} id="faq" aria-labelledby="faq-heading">
      <div className={styles.faqIntro}>
        <span className="section-cross" aria-hidden="true" />
        <p>FAQ</p>
        <h2 id="faq-heading">Common questions</h2>
        <span>Short answers on how Cuppet works, connectors, and privacy.</span>
      </div>

      <div className={styles.faqList}>
        {faqs.map(({ question, answer }, index) => (
          <details className={styles.faqItem} key={question} open={index === 0}>
            <summary>
              <span className={styles.questionNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span>{question}</span>
              <span className={styles.indicator} aria-hidden="true">
                <i className={styles.plus}>+</i>
                <i className={styles.minus}>−</i>
              </span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
