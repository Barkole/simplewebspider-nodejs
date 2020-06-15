import { IsInt, Max, Min } from "class-validator";
import Errlop from "errlop";
import { WritableStream } from "htmlparser2";
import { Handler } from "htmlparser2/lib/Parser";
import fetch from "node-fetch";
import stream from "stream";
import { URL } from "url";
import util from "util";
import { logger } from "../../core/logger";
import { checkValidateSync, randomInt } from "../../core/utils";
import { IExtractor } from "./IExtractor";

const pPipeline = util.promisify(stream.pipeline);

function isAbsolut(url: string): boolean {
  if (/^[a-zA-Z]:\\/.test(url)) {
    return false;
  }

  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
}

function expandUrl(url: string, baseUrl: string): string {
  if (isAbsolut(url)) {
    return url;
  }

  const newUrl = new URL(url, baseUrl);
  return newUrl.toString();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createUrlHandler(
  urls: Set<string>,
  url: string,
  urlMaxLength: number
): Partial<Handler> {
  return {
    onopentag(
      name: string,
      attribs: {
        [s: string]: string;
      }
    ): void {
      logger.silly(`OpenTag: ${name} - ${JSON.stringify(attribs)}`);
      let newUrl: string | undefined = undefined;
      // TODO Implement RSS and ATOM Feed support
      if (name === `a` && attribs && attribs[`href`]) {
        newUrl = attribs[`href`];
      } else if (name === `img` && attribs && attribs[`src`]) {
        newUrl = attribs[`src`];
      }

      if (newUrl) {
        newUrl = expandUrl(newUrl, url);
        if (isAbsolut(newUrl) && newUrl.length <= urlMaxLength) {
          urls.add(newUrl);
        }
      }
    },
  };
}

export class SimpleExctractor implements IExtractor {
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  readonly httpMaxSize: number;
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  readonly httpTimeout: number;
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  urlMaxLength: number;

  async extract(url: string): Promise<Set<string>> {
    const urls: Set<string> = new Set();
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

      // TODO Check response type. We can't process binaries only html

      const parserStream = new WritableStream(
        createUrlHandler(urls, url, this.urlMaxLength)
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
    this.urlMaxLength = 1024;
    checkValidateSync(this);
  }
}
