"use client";

import { useEffect } from "react";
import { Button, Container, Text } from "@/design-system/primitives";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col justify-center py-24"
      role="alert"
      aria-labelledby="error-heading"
    >
      <Container width="prose" className="flex flex-col gap-6">
        <Text variant="metadata" as="p">
          Error
        </Text>
        <Text variant="heading" as="h1" id="error-heading">
          Something went wrong
        </Text>
        <Text variant="body" as="p" className="text-text-secondary">
          An unexpected error occurred. You can try again, or return later.
        </Text>
        <div>
          <Button type="button" variant="secondary" onClick={reset}>
            Try again
          </Button>
        </div>
      </Container>
    </main>
  );
}
