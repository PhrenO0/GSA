import Carousel from "@/components/Carousel";
import SiteNav from "@/components/SiteNav";

export default function Page() {
  return (
    <>
      {/* Held back until the ring has finished drawing itself — the entry is
          six seconds of the page introducing itself and the nav has no
          business talking over it. */}
      <SiteNav delay={6.4} />
      <Carousel />
    </>
  );
}
