import { useEffect, useState } from "react";

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Check if the session start time is already saved in localStorage
    let sessionStartTime = localStorage.getItem("sessionStartTime");

    if (!sessionStartTime) {
      // Save the current time as the session start time
      sessionStartTime = new Date().getTime();
      localStorage.setItem("sessionStartTime", sessionStartTime);
    }

    const targetDate = new Date(
      Number(sessionStartTime) + 14 * 24 * 60 * 60 * 1000
    );

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        localStorage.removeItem("sessionStartTime"); // Clear session start time if expired
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section__container deals__container">
      <img
        src="https://www.hgdco.com.au/cdn/shop/collections/pl132-ctn-8.jpg?crop=center&height=500&v=1717390298&width=600"
        alt="Deals of the Month"
        loading="lazy"
        className="w-full h-auto object-cover"
      />

      <div className="deals__content">
        <h5 className="uppercase">Get up to 50% discount</h5>
        <h4>Deals of the Month</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
          voluptas adipisci neque esse quis architecto odio labore rerum!
          Voluptas accusantium id eveniet nisi sed praesentium nulla iusto
          facilis. Eveniet, itaque!
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>{timeLeft.days}</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{timeLeft.hours}</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{timeLeft.minutes}</h4>
            <p>Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>{timeLeft.seconds}</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
