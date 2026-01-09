import { HeaderV2 } from "./v2/HeaderV2";
import { HeroV2 } from "./v2/HeroV2";
import { ServicesV2 } from "./v2/ServicesV2";
import { WorkV2 } from "./v2/WorkV2";
import { ContactV2 } from "./v2/ContactV2";
import { FooterV2 } from "./v2/FooterV2";

export function Version2() {
  return (
    <div className="min-h-screen">
      <HeaderV2 />
      <HeroV2 />
      <ServicesV2 />
      <WorkV2 />
      <ContactV2 />
      <FooterV2 />
    </div>
  );
}