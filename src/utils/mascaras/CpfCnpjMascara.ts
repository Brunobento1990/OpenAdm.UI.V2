export function cnpjMascara(cnpj?: string): string {
  if (!cnpj) return "";

  return cnpj
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function maskCpfCnpj(cpfCnpj?: string): string {
  if (!cpfCnpj) return "";

  if (clearMaskCpfCnpj(cpfCnpj ?? "")!.length > 11) return cnpjMascara(cpfCnpj);

  return cpfMascara(cpfCnpj);
}

export function cpfMascara(cpf?: string): string {
  if (!cpf) return "";

  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function clearMaskCnpj(cnpj?: string): string | undefined {
  if (!cnpj) return "";

  return cnpj
    .replaceAll(".", "")
    .replaceAll("-", "")
    .replaceAll("/", "")
    .replaceAll(" ", "");
}

export function clearMaskCpf(cpf?: string): string | undefined {
  if (!cpf) return "";

  return cpf.replaceAll(".", "").replaceAll("-", "").replaceAll(" ", "");
}

export function clearMaskCpfCnpj(value?: string): string | undefined {
  if (!value) return "";

  return clearMaskCpf(clearMaskCnpj(value));
}
