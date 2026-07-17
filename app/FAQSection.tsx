import styles from "./FAQSection.module.css";

const faqs = [
  {
    question: "What does Cuppet actually do?",
    answer:
      "Cuppet helps with useful work that comes back every day. You can connect the apps you already use, describe a routine in plain language, and have an agent handle it on the schedule you choose.",
  },
  {
    question: "How is this different from a normal AI chatbot?",
    answer:
      "A chatbot waits for you to open it and ask. Cuppet is designed for work that should keep moving without another prompt, while still giving you a clear view of what the agent did and where the result came from.",
  },
  {
    question: "What are scheduled agents?",
    answer:
      "A scheduled agent is a saved task with a time, a set of connected tools, and boundaries you approve. It might prepare a morning brief on weekdays, check a recurring deadline, or organize new information before you need it.",
  },
  {
    question: "Which apps can I connect?",
    answer:
      "We are building connectors for everyday tools such as Gmail, Google Calendar, Drive, Docs, Notion, Slack, and common work platforms. Connector availability will grow as the product develops, and each connection will be optional.",
  },
  {
    question: "Is my data private?",
    answer:
      "Connections are permission-based. You choose which apps an agent can use and review the access it needs before approving it. We are building these controls into the product from the start, not adding them later.",
  },
] as const;

export default function FAQSection() {
  return (
    <section className={styles.faqSection} id="faq" aria-labelledby="faq-heading">
      <div className={styles.faqIntro}>
        <span className="section-cross" aria-hidden="true" />
        <p>FAQ</p>
        <h2 id="faq-heading">Common Questions</h2>
        <span>Clear answers about Cuppet, connected apps, privacy, and launch plans.</span>
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
