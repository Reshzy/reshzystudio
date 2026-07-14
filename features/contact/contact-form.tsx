"use client";

import { useActionState, useId } from "react";
import {
  FormField,
  FormStatus,
  SectionHeading,
} from "@/design-system/composites";
import {
  Button,
  Input,
  Reveal,
  Section,
  Text,
  Textarea,
} from "@/design-system/primitives";
import type { ContactFormContent } from "@/types/content";
import { submitContactMessage } from "./actions";
import { initialContactActionState } from "./contact-form-state";

export interface ContactFormProps {
  content: ContactFormContent;
}

export function ContactForm({ content }: ContactFormProps) {
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;
  const statusId = `${formId}-status`;

  const [state, formAction, pending] = useActionState(
    submitContactMessage,
    initialContactActionState,
  );

  if (state.status === "success") {
    return (
      <Section
        aria-labelledby="contact-form-heading"
        width="prose"
        className="border-t border-border-subtle"
        id="contact-form"
      >
        <div className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Message"
              title={content.headline}
              titleId="contact-form-heading"
              supporting={content.supporting}
            />
          </Reveal>
          <Reveal delay={0.06}>
            <FormStatus
              tone="success"
              titleId={statusId}
              title={content.successTitle}
              body={content.successBody}
            />
          </Reveal>
        </div>
      </Section>
    );
  }

  return (
    <Section
      aria-labelledby="contact-form-heading"
      width="prose"
      className="border-t border-border-subtle"
      id="contact-form"
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Message"
            title={content.headline}
            titleId="contact-form-heading"
            supporting={content.supporting}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <form action={formAction} className="flex flex-col gap-8" noValidate>
            <div
              className="absolute -left-[9999px] h-px w-px overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor={`${formId}-company`}>Company</label>
              <input
                id={`${formId}-company`}
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <FormField
              id={nameId}
              label={content.nameLabel}
              error={state.fieldErrors?.name}
            >
              <Input
                id={nameId}
                name="name"
                type="text"
                autoComplete="name"
                required
                disabled={pending}
                invalid={Boolean(state.fieldErrors?.name)}
                aria-describedby={
                  state.fieldErrors?.name ? `${nameId}-error` : undefined
                }
              />
            </FormField>

            <FormField
              id={emailId}
              label={content.emailLabel}
              error={state.fieldErrors?.email}
            >
              <Input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                disabled={pending}
                invalid={Boolean(state.fieldErrors?.email)}
                aria-describedby={
                  state.fieldErrors?.email ? `${emailId}-error` : undefined
                }
              />
            </FormField>

            <FormField
              id={messageId}
              label={content.messageLabel}
              error={state.fieldErrors?.message}
            >
              <Textarea
                id={messageId}
                name="message"
                required
                disabled={pending}
                invalid={Boolean(state.fieldErrors?.message)}
                aria-describedby={
                  state.fieldErrors?.message
                    ? `${messageId}-error`
                    : undefined
                }
              />
            </FormField>

            {state.status === "error" ? (
              <FormStatus
                tone="error"
                titleId={statusId}
                title={content.errorTitle}
                body={content.errorBody}
              />
            ) : null}

            {state.status === "invalid" && state.message ? (
              <Text
                variant="caption"
                as="p"
                role="alert"
                className="text-state-error"
              >
                {state.message}
              </Text>
            ) : null}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="submit" disabled={pending}>
                {pending ? content.submittingLabel : content.submitLabel}
              </Button>
              {pending ? (
                <Text
                  variant="caption"
                  as="p"
                  aria-live="polite"
                  className="text-text-muted"
                >
                  {content.submittingLabel}
                </Text>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
