const COLORS = {
  red: '\u001b[31m',
  blue: '\u001b[34m',
  reset: '\u001b[0m',
};

class Logger {
  info(message: string, data?: any) {
    const timestamp = new Date().toLocaleString('pt-BR');

    if (data)
      console.info(
        `[${timestamp}] ${COLORS.blue}[INFO]${COLORS.reset} ${message}`,
        data,
      );
    else
      console.info(
        `[${timestamp}] ${COLORS.blue}[INFO]${COLORS.reset} ${message}`,
      );
  }

  dir(message: object) {
    console.dir(message);
  }

  initial(message: string) {
    const timestamp = new Date().toLocaleString('pt-BR');
    console.info(`[${timestamp}] ` + COLORS.blue + message + COLORS.reset);
  }

  error(message: string, data?: any) {
    const timestamp = new Date().toLocaleString('pt-BR');

    if (data)
      console.error(
        `[${timestamp}] ${COLORS.red}[ERROR]${COLORS.reset} ${message}`,
        data,
      );
    else
      console.error(
        `[${timestamp}] ${COLORS.red}[ERROR]${COLORS.reset} ${message}`,
      );
  }
}

export const logger = new Logger();
