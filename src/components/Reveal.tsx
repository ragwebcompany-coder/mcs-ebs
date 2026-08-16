"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Reveals its children once, when they first enter the viewport.
 * The CSS in globals.css handles the transition and the reduced-motion opt-out;
 * this only flips the data attribute.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "shown");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
