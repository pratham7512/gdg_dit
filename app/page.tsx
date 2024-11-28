export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentDate = new Date();
  const targetDate = new Date('2025-11-28T17:00:00+05:30'); // 5:30 PM IST on 28-11-2025

  useEffect(() => {
    (async () => {
      // const LocomotiveScroll = (await import('locomotive-scroll')).default;
      // const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  // Check if current date is before the target date
  if (currentDate < targetDate) {
    return <ComingSoon />; // Show ComingSoon if before 5:30 PM
  } else {
    return (
      <>
        <AnimatePresence mode='wait'>
          {isLoading && <Preloader />}
        </AnimatePresence>
        <AnimatePresence mode='wait'>
          {!isLoading && <Chatbot />}
        </AnimatePresence>
        <div className="pt-[4rem] lg:pt-[2.8rem] overflow-hidden bg-black bg-grid-white/[0.090]">
          <Header />
          <Hero />
          <Benefits />
          <Collaboration />
          <Roadmap />
          <Community />
          <Footer />
        </div>
        <ButtonGradient />
      </>
    );
  }
}
