import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

function FAQSection({ videoId }) {
  const [faqs, setFAQs] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const faqsRef = collection(db, "FAQs");
    const q = query(faqsRef, where("videoId", "==", videoId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const faqsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFAQs(faqsData);
    });

    return () => unsubscribe();
  }, [videoId]);

  return (
    <>
      {faqs &&
        faqs.length > 0 &&
        faqs.map((faq) => (
          <div key={faq.id} className="faq-section mb-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">{faqs.answer}</p>
                {faqs.imageUrl && (
                  <img
                    src={faqs.imageUrl}
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
