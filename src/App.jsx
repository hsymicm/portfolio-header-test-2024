import { useRef, useEffect, useState } from "react";
import { cn, useWindowSize, generateRandomNumber } from "./utils";
import gsap from "gsap";

function App() {
  const orbit = useRef([]);

  const totalOfOrbit = 9;
  const orbitThickness = 1;
  const ballWidth = 14;
  const gradient =
    "conic-gradient(from 205deg at 50% 50%, rgba(255, 255, 255, 0.43) 4.392405599355698deg, rgba(255, 255, 255, 0.19) 26.433003544807434deg, #FFF 58.7471204996109deg, rgba(255, 255, 255, 0.29) 81.01170837879181deg, #FFF 122.40000128746033deg, rgba(255, 255, 255, 0.17) 160.19999742507935deg, #FFF 198.00000429153442deg, rgba(255, 255, 255, 0.48) 225deg, rgba(255, 255, 255, 0.55) 254.14423942565918deg, #FFF 274.6719789505005deg, rgba(255, 255, 255, 0.35) 291.8365502357483deg, #FFF 313.20000171661377deg, rgba(255, 255, 255, 0.43) 338.86640310287476deg)";

  const [windowWidth, windowHeight] = useWindowSize();
  const [randomRotationArr, setRandomRotationArr] = useState(
    generateRandomNumber(totalOfOrbit)
  );

  useEffect(() => {
    function animate() {
      orbit.current.forEach((e, i) => {
        gsap.fromTo(e, {rotate: randomRotationArr[i] }, {
          rotate: "+=360",
          duration: 10 + 20 * i,
          ease: "none",
          repeat: -1,
          modifiers: {
            rotate: (r) => (gsap.utils.wrap(0, 360, parseInt(r))),
          },
        });
      })

    }

    animate();
  }, [randomRotationArr]);

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center text-white font-medium">
        {windowWidth} {windowHeight}
      </div>
      <div className="absolute overflow-hidden top-0 left-0 h-screen w-screen -z-10 bg-black">
        {randomRotationArr.map((e, i) => {
          return (
            <div
              key={i}
              ref={(el) => (orbit.current[i] = el)}
              style={{
                width: `${150 + 200 * i}px`,
                background: `${gradient}, #000`,
                zIndex: totalOfOrbit - i,
              }}
              className={cn(
                "absolute aspect-square rounded-full",
                "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              )}
            >
              <div
                style={{
                  width: ballWidth + 2 * i,
                  left: -(ballWidth + 2 * i) / 2,
                  rotate: `${((e % 360) + 360) % 360}deg`,
                  transformOrigin: "top center",
                }}
                className="absolute top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-gray-500 to-white aspect-square"
              />
              <div
                style={{
                  width: `calc(100% + ${orbitThickness * 2})`,
                  margin: orbitThickness,
                }}
                className="aspect-square rounded-full bg-black"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
