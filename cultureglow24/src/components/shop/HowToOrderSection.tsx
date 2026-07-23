interface HowToOrderSectionProps {
  section: {
    label: string;
    title: string;
    desc: string;
    steps: { number: number; title: string; desc: string }[];
  };
}

export default function HowToOrderSection({ section }: HowToOrderSectionProps) {
  return (
    <section className="how-to-order">
      <p className="section-label">{section.label}</p>
      <h2 className="section-title">{section.title}</h2>
      <p className="how-to-order-desc">{section.desc}</p>
      <div className="steps-row">
        {section.steps.map((step) => (
          <div key={step.number} className="step-item">
            <div className="step-number">{step.number}</div>
            <p className="step-title">{step.title}</p>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
