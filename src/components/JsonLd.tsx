/**
 * Emits a structured-data graph. Kept as a server component so the JSON ships
 * in the initial HTML, where crawlers that do not execute scripts can read it.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own typed content modules, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
