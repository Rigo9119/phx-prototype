import type { AuthRole } from "./authContext";

/**
 * The ONLY place the routing vocabulary (`USER_TYPES`, "client"/"investor")
 * and the auth domain vocabulary (`UserType`, "creditor"/"debtor") touch.
 *
 * Direction confirmed against app/dashboard/[userType]/page.tsx: the
 * "client" segment renders debt-focused UI (project requester / "dreamer"),
 * the "investor" segment renders portfolio/earnings UI (financier) -> debtor
 * maps to "client", creditor maps to "investor".
 */
export const ROLE_TO_DASHBOARD_SEGMENT: Record<"creditor" | "debtor", string> = {
  debtor: "client",
  creditor: "investor",
};

/**
 * Resolves the redirect target for a freshly authenticated user. `admin`
 * goes straight to `/admin` (not a `[userType]` segment); `creditor`/`debtor`
 * go to their mapped `/dashboard/[userType]` segment.
 */
export function roleToRoutePath(role: AuthRole): string {
  if (role === "admin") return "/admin";
  return `/dashboard/${ROLE_TO_DASHBOARD_SEGMENT[role]}`;
}

/**
 * Reverse lookup, kept in this same module so both directions of the
 * mapping stay in the one file where the two vocabularies are allowed to
 * touch. Used by the register flow, which starts from a known
 * `[userType]` route segment ("client"/"investor") and needs the matching
 * auth role to record on the newly created session.
 */
export function routeSegmentToRole(segment: string): "creditor" | "debtor" | undefined {
  const entry = Object.entries(ROLE_TO_DASHBOARD_SEGMENT).find(
    ([, mappedSegment]) => mappedSegment === segment
  );
  return entry?.[0] as "creditor" | "debtor" | undefined;
}
