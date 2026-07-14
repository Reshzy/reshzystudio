import { SectionHeading } from "@/design-system/composites";
import { Link, Reveal, Section, Text } from "@/design-system/primitives";
import type { ContactPageContent, SocialLink } from "@/types/content";

export interface ContactSocialProps {
  content: ContactPageContent["social"];
  links: SocialLink[];
}

export function ContactSocial({ content, links }: ContactSocialProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="contact-social-heading"
      width="prose"
      className="border-t border-border-subtle"
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Presence"
            title={content.headline}
            titleId="contact-social-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="flex flex-col gap-6" aria-label="Social links">
            {links.map((link) => (
              <li
                key={link.url}
                className="border-t border-border-subtle pt-6"
              >
                <Text variant="metadata" as="p">
                  {link.platform}
                </Text>
                <Link
                  href={link.url}
                  variant="accent"
                  external
                  target="_blank"
                  className="mt-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
