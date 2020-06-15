import { IExtractor } from "./IExtractor";
import { randomInt, checkValidateSync } from "../../core/utils";
import fetch from "node-fetch";
import { IsInt, Min, Max } from "class-validator";
import { logger } from "../../core/logger";
import Errlop from "errlop";
import util from "util";
import stream from "stream";
import { WritableStream } from "htmlparser2";

const pPipeline = util.promisify(stream.pipeline);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// class StringTransformer extends stream.Transform {
//   _transform(
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     chunk: any,
//     _encoding: BufferEncoding,
//     callback: stream.TransformCallback
//   ): void {
//     const data = new String(chunk).toString();
//     callback(null, data);
//   }

//   _flush(callback: stream.TransformCallback): void {
//     callback(null, null);
//   }

//   constructor(opts?: stream.TransformOptions) {
//     super(opts);
//   }
// }

export class SimpleExctractor implements IExtractor {
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  readonly httpMaxSize: number;
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  readonly httpTimeout: number;

  async extract(url: string): Promise<string[]> {
    const urls: string[] = [];
    try {
      // TODO Implement this
      await sleep(randomInt(1000, 10000));
      const response = await fetch(url, {
        size: this.httpMaxSize,
        timeout: this.httpTimeout,
      });
      if (!response.ok) {
        throw new Errlop(
          `Request failed[url = ${url}, status = ${response.status}, statusText = ${response.statusText}]`
        );
      }

      const parserStream = new WritableStream(
        {
          onopentag(
            name: string,
            attribs: {
              [s: string]: string;
            }
          ): void {
            logger.silly(`OpenTag: ${name} - ${JSON.stringify(attribs)}`);
            if (name === `a` && attribs && attribs[`href`]) {
              logger.debug(`OpenTag: ${name} - ${JSON.stringify(attribs)}`);
              urls.push(attribs[`href`]);
            } else if (name === `img` && attribs && attribs[`src`]) {
              logger.debug(`OpenTag: ${name} - ${JSON.stringify(attribs)}`);
              urls.push(attribs[`src`]);
            }
          },
        },
        { decodeEntities: false }
      );

      await pPipeline(response.body, parserStream);
    } catch (e) {
      logger.warn(`Failed to extract[url = ${url}]`, e);
    }

    return urls;
  }
  constructor() {
    // TODO Create config
    this.httpMaxSize = 10 * 1024 * 1024;
    this.httpTimeout = 60 * 1000;
    checkValidateSync(this);
  }
}
