import { describe, expect, it } from "vitest";
import { convertSalary } from "./salaryConverter";

describe("convertSalary", () => {
  it("연봉을 12개월로 나눠 월급을 계산한다", () => {
    const result = convertSalary(36_000_000, "annual");
    expect(result.annualSalary).toBe(36_000_000);
    expect(result.monthlySalary).toBe(3_000_000);
  });

  it("월급에 12를 곱해 연봉을 계산한다", () => {
    const result = convertSalary(3_000_000, "monthly");
    expect(result.annualSalary).toBe(36_000_000);
    expect(result.monthlySalary).toBe(3_000_000);
  });

  it("12로 나눠떨어지지 않으면 반올림한다", () => {
    const result = convertSalary(10_000_000, "annual");
    expect(result.monthlySalary).toBe(Math.round(10_000_000 / 12));
  });
});
