import React from "react";

const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.3, 
  numCircles = 8
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/10 [mask-image:linear-gradient(to_bottom,white,transparent)]"> 
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.08}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full bg-black/25 shadow-xl border [--i:${i}]`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
              borderWidth: "1px",
              borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)"
            }}
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";

export default Ripple;
