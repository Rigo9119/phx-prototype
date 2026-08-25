import { describe, expect, it } from "vitest";
import { roleToRoutePath, routeSegmentToRole } from "./roleToRouteSegment";

describe("roleToRoutePath", () => {
  it("maps debtor to the client dashboard segment", () => {
    expect(roleToRoutePath("debtor")).toBe("/dashboard/client");
  });

  it("maps creditor to the investor dashboard segment", () => {
    expect(roleToRoutePath("creditor")).toBe("/dashboard/investor");
  });

  it("maps admin directly to /admin, not a [userType] segment", () => {
    expect(roleToRoutePath("admin")).toBe("/admin");
  });
});

describe("routeSegmentToRole", () => {
  it("maps the client segment back to debtor", () => {
    expect(routeSegmentToRole("client")).toBe("debtor");
  });

  it("maps the investor segment back to creditor", () => {
    expect(routeSegmentToRole("investor")).toBe("creditor");
  });

  it("returns undefined for an unknown segment", () => {
    expect(routeSegmentToRole("unknown")).toBeUndefined();
  });
});
