const COLORS = {
  red: '\u001b[31m',
  blue: '\u001b[34m',
  reset: '\u001b[0m',
};

class Logger {
  log(message: string, data?: any) {
    const timestamp = new Date().toLocaleString('pt-BR');
    console.log(
      `[${timestamp}] ${COLORS.blue}[INFO]${COLORS.reset} ${message}`,
      data,
    );
  }

  dir(message: object) {
    console.dir(message);
  }

  initial(message: string) {
    const timestamp = new Date().toLocaleString('pt-BR');
    console.log(`[${timestamp}] ` + COLORS.blue + message + COLORS.reset);
  }

  error(message: string, data?: any) {
    const timestamp = new Date().toLocaleString('pt-BR');
    console.log(
      `[${timestamp}] ${COLORS.red}[ERROR]${COLORS.reset} ${message}`,
      data,
    );
  }
}

export const logger = new Logger();
