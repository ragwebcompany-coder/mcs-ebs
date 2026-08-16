import Link from "next/link";
import { Container, ButtonLink, Annot } from "@/components/ui";

/*
  A 404 on a chart is a position that cannot be fixed. Say that plainly and
  hand the reader the three routes they most likely wanted.
*/
export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh items-center overflow-hidden bg-abyss pt-32 pb-20">
      <div
        aria-hidden="true"
        className="isobath pointer-events-none absolute inset-0 opacity-40"
        style={{ "--isobath-x": "70%", "--isobath-y": "40%" } as React.CSSProperties}
      />

      <Container className="relative">
        <Annot tone="signal" className="mb-8">
          404 · Position not fixed
        </Annot>

        <h1 className="text-display max-w-3xl leading-[1.06] text-lume">
          Η σελίδα δεν βρέθηκε.
          <span className="mt-3 block text-brass italic">
            This page could not be found.
          </span>
        </h1>

        <p className="text-lede mt-8 max-w-2xl leading-relaxed text-lume-dim">
          Ο σύνδεσμος μπορεί να έχει αλλάξει ή η σελίδα να μεταφέρθηκε. Δοκιμάστε
          από την αρχική ή δείτε τα μαθήματα του προγράμματος.
          <span className="mt-2 block text-lume-faint">
            The link may have changed or the page may have moved. Start from the
            homepage, or browse the programme&rsquo;s courses.
          </span>
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <ButtonLink href="/el">Αρχική</ButtonLink>
          <ButtonLink href="/el/courses" variant="ghost">
            Μαθήματα
          </ButtonLink>
          <ButtonLink href="/el/contact" variant="ghost">
            Επικοινωνία
          </ButtonLink>
        </div>

        <p className="mt-10 text-sm text-lume-faint">
          <Link href="/en" className="link-plot hover:text-brass">
            Continue in English →
          </Link>
        </p>
      </Container>
    </div>
  );
}
