(function () {
  /* Reveal — soft scroll-triggered rise-in. <Reveal delay={120}>…</Reveal> */
  function Reveal({ delay = 0, y = 26, style = {}, children }) {
    const ref = React.useRef(null);
    const [on, setOn] = React.useState(false);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
      );
      io.observe(el);
      return () => io.disconnect();
    }, []);
    return (
      <div
        ref={ref}
        style={{
          opacity: on ? 1 : 0,
          transform: on ? "none" : `translateY(${y}px)`,
          transition: `opacity 850ms var(--ease-out) ${delay}ms, transform 850ms var(--ease-out) ${delay}ms`,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
  window.Reveal = Reveal;
})();
