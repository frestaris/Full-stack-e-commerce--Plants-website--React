const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      <img
        src="https://www.hgdco.com.au/cdn/shop/collections/pl132-ctn-8.jpg?crop=center&height=500&v=1717390298&width=600"
        alt=""
      />

      <div className="deals__content">
        <h5 className="uppercase">get up to 50% discount</h5>
        <h4>Deals of the Mont</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
          voluptas adipisci neque esse quis architecto odio labore rerum!
          Voluptas accusantium id eveniet nisi sed praesentium nulla iusto
          facilis. Eveniet, itaque!
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>15</h4>
            <p>Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>05</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
