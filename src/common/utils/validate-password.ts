export function validatePassword(password: string): boolean {
  // Verifica se a senha existe e se o comprimento mínimo é atendido
  const minLength = 8;

  if (!password || password.length < minLength) {
    return false; // Se a senha não existir ou for menor que o mínimo, retorna false
  }

  // Verifica se a senha contém pelo menos uma letra maiúscula
  const hasUpperCase = /[A-Z]/.test(password);

  // Verifica se a senha contém pelo menos uma letra minúscula
  const hasLowerCase = /[a-z]/.test(password);

  // Verifica se a senha contém pelo menos um número
  const hasNumbers = /[0-9]/.test(password);

  // Verifica se a senha contém pelo menos um caractere especial
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Verifica se a senha atende a todas as condições
  return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
}
