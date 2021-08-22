import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import elect from "../../assets/electronics/leon-seibert-LGZFr5bUw7M-unsplash.png";
import home from "../../assets/homes/nathan-fertig-FBXuXp57eM0-unsplash1.jpg";
import books from "../../assets/books/morgan-housel-aZ_MmSmAcjg-unsplash.jpg";
import fashion from "../../assets/fashion/s-o-c-i-a-l-c-u-t-7QjF0V8NOms-unsplash.jpg";

const Title = props => {
  const [pause, setPause] = React.useState(false);
  const timer = React.useRef();
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    duration: 3000,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
  });

  React.useEffect(() => {
    sliderRef.current.addEventListener("mouseover", () => {
      setPause(true);
    });
    sliderRef.current.addEventListener("mouseout", () => {
      setPause(false);
    });
  }, [sliderRef]);

  React.useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 5000);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider]);

  return (
    <>
      <div ref={sliderRef} className="keen-slider title">
        <div className="keen-slider__slide number-slide1">
          <div className="title__brand">iDCom</div>
          <div className="title__section">Electronics</div>
          <div className="title__image">
            <img src={elect} alt="by Leon Seibert Unplash,com" />
          </div>
        </div>
        <div className="keen-slider__slide number-slide2">
          <div className="title__brand">iDCom</div>
          <div className="title__section">Homes</div>
          <div className="title__image">
            <img src={home} alt="by Leon Seibert Unplash,com" />
          </div>
        </div>
        <div className="keen-slider__slide number-slide3">
          <div className="title__brand">iDCom</div>
          <div className="title__section">Books</div>
          <div className="title__image">
            <img src={books} alt="by Leon Seibert Unplash,com" />
          </div>
        </div>
        <div className="keen-slider__slide number-slide3">
          <div className="title__brand">iDCom</div>
          <div className="title__section">Fashion</div>
          <div className="title__image">
            <img src={fashion} alt="by Leon Seibert Unplash,com" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
