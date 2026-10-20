import type { Catalog } from "./locale";

export function LanguageStatus({ catalog }: { catalog: Catalog }) {
  const translated =
    Object.keys(catalog.messages).length - catalog.fallback_keys.length;
  return (
    <details className="language-status" lang="en-IN" dir="ltr">
      <summary>
        <span lang={catalog.locale} dir={catalog.dir}>
          {catalog.name}
        </span>{" "}
        · English guidance · Review pending
      </summary>
      <div>
        <p>
          23 languages are selectable. This is a language coverage preview, not
          complete translated support. {translated} of{" "}
          {Object.keys(catalog.messages).length} navigation labels have draft
          translations in this language. Page guidance, service details, consent
          and safety instructions use English.
        </p>
        <p>
          Human language and safeguarding review are pending, including English.
          Speech recognition, automatic transcription and video interpretation
          are unavailable. Symbol choices use English labels. Do not rely on
          draft labels to decide eligibility.
        </p>
        <p>
          Need a different way to explain a concern? Choose symbols or a public
          concern in Find support. You can continue without a story. If you need
          a human interpreter, ask the service whether it can offer one; Sakhi
          has no interpreter connection.
        </p>
      </div>
    </details>
  );
}
