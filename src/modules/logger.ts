interface LoggerOptions {
  levels: string[] | string;
  colors: string[] | string; 
}

export class Logger {
  constructor(options?: LoggerOptions) {
    options.levels;
    options.colors;
  }
}

const logger = new Logger({
  levels: 'lel',
  colors: 'lel'
});