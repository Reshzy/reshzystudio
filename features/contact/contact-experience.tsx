import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";
import { ContactIntroduction } from "./contact-introduction";
import { ContactMethods } from "./contact-methods";
import { ContactSocial } from "./contact-social";
import type { ContactPageContent, Profile } from "@/types/content";

export interface ContactExperienceProps {
  content: ContactPageContent;
  profile: Profile;
}

export function ContactExperience({
  content,
  profile,
}: ContactExperienceProps) {
  const socialLinks =
    profile.socialLinks.length > 0 ? profile.socialLinks : [];

  return (
    <div className="flex flex-1 flex-col">
      <ContactHero content={content.hero} />
      <ContactIntroduction content={content.introduction} />
      <ContactMethods
        content={content.methods}
        items={content.methodsItems}
        email={profile.email}
      />
      <ContactForm content={content.form} />
      <ContactSocial content={content.social} links={socialLinks} />
    </div>
  );
}
