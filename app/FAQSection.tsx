import styles from "./FAQSection.module.css";

const faqs = [
  {
    question: "What does Cuppet do?",
    answer:
      "Connect the apps you already use, describe a routine in plain language, and choose a schedule. A Cuppet agent runs it for you.",
  },
  {
    question: "How is this different from a chatbot?",
    answer:
      "A chatbot waits for you to open it. Cuppet runs scheduled work without another prompt and keeps a log of what happened.",
  },
  {
    question: "What is a scheduled agent?",
    answer:
      "A saved task with a schedule, connected tools, and limits you approve. It could be a weekday morning brief or a weekly digest.",
  },
  {
    question: "Which apps can I connect?",
    answer:
      "We're building connectors for tools like Gmail, Calendar, Drive, Docs, Notion, and Slack. More are planned, and every connection is optional.",
  },
  {
    question: "Is my data private?",
    answer:
      "You control access. Choose which apps an agent can use, then review those permissions before approving them.",
  },
] as const;

export default function FAQSection() {
  return (
    <section className={styles.faqSection} id="faq" aria-labelledby="faq-heading">
      <div className={styles.faqIntro}>
        <span className="section-cross" aria-hidden="true" />
        <p>FAQ</p>
        <h2 id="faq-heading">Common questions</h2>
        <span>Quick answers about how Cuppet works, connectors, and privacy.</span>
      </div>

      <div className={styles.faqList}>
        {faqs.map(({ question, answer }, index) => (
          <details className={styles.faqItem} key={question} open={index === 0}>
            <summary>
              <span className={styles.questionNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span>{question}</span>
              <span className={styles.indicator} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
