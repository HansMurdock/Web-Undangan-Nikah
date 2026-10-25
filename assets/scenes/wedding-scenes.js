// Symphonic Rock Romance — Fajar & Salsa
// Scroll-scrubbed First-to-Last Frame Scenes built on tasteskill Stage (GSAP + ScrollTrigger + Lenis)

(() => {
  if (!window.Stage || !window.Scenes) return;

  // SCENE 1: Hero Ignition — First Frame (Monochrome Pine Night) to Last Frame (Glowing Amber Willys 1954)
  window.Scenes['hero-ignition'] = (root, opts = {}) =>
    window.Stage.scene(root, {
      hold: opts.hold ?? 1.5,
      scrub: 0.35,
      beats: 4,
      phone: {
        hold: 1.2,
        build(tl, { q }) {
          const f1 = q('.hero-seq-1');
          const f2 = q('.hero-seq-2');
          const f3 = q('.hero-seq-3');
          const f4 = q('.hero-seq-4');
          const bar = q('.hero-scrubber-fill');

          tl.fromTo(f1, { scale: 1 }, { scale: 1.06, duration: 0.34 }, 0)
            .fromTo(f2, { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 0.28 }, 0.16)
            .fromTo(f3, { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 0.28 }, 0.46)
            .fromTo(f4, { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.28 }, 0.72)
            .fromTo(bar, { scaleX: 0.1 }, { scaleX: 1, duration: 1 }, 0);
        },
      },
      build(tl, { q }) {
        const aperture = q('.hero-aperture');
        const f1 = q('.hero-seq-1');
        const f2 = q('.hero-seq-2');
        const f3 = q('.hero-seq-3');
        const f4 = q('.hero-seq-4');
        const bar = q('.hero-scrubber-fill');

        tl.fromTo(
          aperture,
          { clipPath: 'inset(4% 4% 4% 4%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.35 },
          0
        )
          .fromTo(f1, { scale: 1 }, { scale: 1.07, duration: 0.35 }, 0)
          .fromTo(f2, { autoAlpha: 0, scale: 1.07 }, { autoAlpha: 1, scale: 1, duration: 0.28 }, 0.16)
          .fromTo(f3, { autoAlpha: 0, scale: 1.07 }, { autoAlpha: 1, scale: 1, duration: 0.28 }, 0.46)
          .fromTo(f4, { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.28 }, 0.72)
          .fromTo(bar, { scaleX: 0.08 }, { scaleX: 1, duration: 1 }, 0);
      },
    });

  // SCENE 2: Forest Chronicle — First Frame (Kabin Senja) -> Mid Frame (Salam Rock) -> Last Frame (Lampu Malam)
  window.Scenes['forest-chronicle'] = (root, opts = {}) =>
    window.Stage.scene(root, {
      hold: opts.hold ?? 1.6,
      scrub: 0.35,
      beats: 3,
      phone: {
        hold: 1.3,
        build(tl, { q }) {
          const p1 = q('.chronicle-pair-1');
          const p2 = q('.chronicle-pair-2');
          const p3 = q('.chronicle-pair-3');
          const bar = q('.chronicle-scrubber-fill');

          tl.to(p1, { yPercent: -6, autoAlpha: 0, duration: 0.26 }, 0.24)
            .fromTo(
              p2,
              { yPercent: 8, autoAlpha: 0, scale: 1.04 },
              { yPercent: 0, autoAlpha: 1, scale: 1, duration: 0.28 },
              0.24
            )
            .to(p2, { yPercent: -6, autoAlpha: 0, duration: 0.26 }, 0.64)
            .fromTo(
              p3,
              { yPercent: 8, autoAlpha: 0, scale: 1.04 },
              { yPercent: 0, autoAlpha: 1, scale: 1, duration: 0.28 },
              0.64
            )
            .fromTo(bar, { scaleX: 0.12 }, { scaleX: 1, duration: 1 }, 0);
        },
      },
      build(tl, { q }) {
        const p1 = q('.chronicle-pair-1');
        const p2 = q('.chronicle-pair-2');
        const p3 = q('.chronicle-pair-3');
        const bar = q('.chronicle-scrubber-fill');

        tl.to(p1, { yPercent: -8, autoAlpha: 0, duration: 0.28 }, 0.24)
          .fromTo(
            p2,
            { yPercent: 10, autoAlpha: 0, scale: 1.05 },
            { yPercent: 0, autoAlpha: 1, scale: 1, duration: 0.3 },
            0.24
          )
          .to(p2, { yPercent: -8, autoAlpha: 0, duration: 0.28 }, 0.64)
          .fromTo(
            p3,
            { yPercent: 10, autoAlpha: 0, scale: 1.05 },
            { yPercent: 0, autoAlpha: 1, scale: 1, duration: 0.3 },
            0.64
          )
          .fromTo(bar, { scaleX: 0.1 }, { scaleX: 1, duration: 1 }, 0);
      },
    });
})();
