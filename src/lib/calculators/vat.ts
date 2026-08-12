// 부가가치세법 제30조 - 일반과세자 부가가치세율 10% (1977년 도입 이후 유지)
export const VAT_RATE = 0.1;

export type VatInputMode = "exclusive" | "inclusive";

export interface VatResult {
  supplyAmount: number; // 공급가액 (부가세 제외 금액)
  vatAmount: number; // 부가세
  totalAmount: number; // 합계금액 (부가세 포함)
}

export function calculateVat(amount: number, mode: VatInputMode): VatResult {
  if (mode === "exclusive") {
    const supplyAmount = amount;
    const vatAmount = Math.round(supplyAmount * VAT_RATE);
    return { supplyAmount, vatAmount, totalAmount: supplyAmount + vatAmount };
  }

  const totalAmount = amount;
  const supplyAmount = Math.round(totalAmount / (1 + VAT_RATE));
  const vatAmount = totalAmount - supplyAmount;
  return { supplyAmount, vatAmount, totalAmount };
}
