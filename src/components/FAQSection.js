function FAQSection({ faqs }) {
  return (
    <>
      {faqs &&
        faqs.map((faq) => (
          <div key={faq.id} className="faq-section mb-4">
            <div className="card rounded">
              <div className="card-body">
                <p className="card-text mb-0">{faq.answer}</p>
                {faq.imageUrl && (
                  <img
                    src={faq.imageUrl}
                    alt="faq"
                    className="faq-image img-fluid mt-3"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default FAQSection;
