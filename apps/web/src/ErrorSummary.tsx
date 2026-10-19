import type { RefObject } from "react";
export interface FieldError {
  field: string;
  message: string;
}
export function ErrorSummary({
  errors,
  summaryRef,
}: {
  errors: FieldError[];
  summaryRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={summaryRef}
      className="error-summary"
      role="region"
      aria-labelledby="error-summary-title"
      tabIndex={-1}
    >
      <div role="alert">
        <h2 id="error-summary-title">There is a problem</h2>
        <ul>
          {errors.map((error) => (
            <li key={error.field}>
              <a
                href={`#${error.field}`}
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById(error.field)?.focus();
                }}
              >
                {error.message}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
