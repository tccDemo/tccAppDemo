import { Injectable } from '@angular/core';

import { Logger } from "angular2-logger/core";

@Injectable()
export class UtilLogService {
  constructor(private logger: Logger) {}

  private toLogText(logType: string, logMsg: string, logContext?: object, logModule?: string, logFunc?: string) {
    var LogText: Array<string> = [];
      
    LogText.push(`[${logType}]`);

    if (logModule) {
      if (logFunc) {
        LogText.push(`[${logModule}::${logFunc}]`);
      } else {
        LogText.push(`[${logModule}]`);
      }
    }

    LogText.push(` ${logMsg}`);

    if (logContext) {
      LogText.push(` [context: ${JSON.stringify(logContext)}]`);
    }

    return LogText.join('');
  }

  public log(logMsg: string, logContext?: object, logModule?: string, logFunc?: string) {
    this.logger.log(this.toLogText('LOG', logMsg, logContext, logModule, logFunc));
  }

  public debug(logMsg: string, logContext?: object, logModule?: string, logFunc?: string) {
    this.logger.debug(this.toLogText('DEBUG', logMsg, logContext, logModule, logFunc));
  }

  public info(logMsg: string, logContext?: object, logModule?: string, logFunc?: string) {
    this.logger.info(this.toLogText('INFO', logMsg, logContext, logModule, logFunc));
  }

  public warn(logMsg: string, logContext?: object, logModule?: string, logFunc?: string) {
    this.logger.warn(this.toLogText('WARN', logMsg, logContext, logModule, logFunc));
  }

  public error(logMsg: string, logContext?: object, logModule?: string, logFunc?: string) {
    this.logger.error(this.toLogText('ERROR', logMsg, logContext, logModule, logFunc));
  }

}