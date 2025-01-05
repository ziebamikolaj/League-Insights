import { Injectable, Logger } from "@nestjs/common";
import Bottleneck from "bottleneck";

@Injectable()
export class RateLimiterService {
  private readonly logger = new Logger(RateLimiterService.name);
  private readonly limiterGroup: Bottleneck.Group;

  constructor() {
    this.limiterGroup = new Bottleneck.Group();
    this.limiterGroup.on("created", (limiter, key) => {
      const rateLimits = this.getRateLimitsForRegion();
      limiter.updateSettings({
        reservoir: rateLimits.requestsPerWindow,
        reservoirRefreshAmount: rateLimits.requestsPerWindow,
        reservoirRefreshInterval: rateLimits.windowMs,
        minTime: rateLimits.minTime,
        maxConcurrent: rateLimits.maxConcurrent,
      });
      limiter.on("failed", async (error, jobInfo) => {
        const retryCount = jobInfo.retryCount || 0;
        if (error.message.includes("429") && retryCount < 3) {
          const delay = 1000 * Math.pow(2, retryCount);
          this.logger.warn(
            `Rate limit hit for region ${key}. Retrying in ${delay}ms. Attempt ${
              retryCount + 1
            }`,
          );
          return delay;
        }
      });
      limiter.on("error", (error) => {
        this.logger.error(
          `Error in limiter for region ${key}: ${error.message}`,
          error.stack,
        );
      });
    });
  }

  getLimiterForRegion(region: string): Bottleneck {
    return this.limiterGroup.key(region);
  }

  private getRateLimitsForRegion(): {
    requestsPerWindow: number;
    windowMs: number;
    minTime: number;
    maxConcurrent: number;
  } {
    return {
      requestsPerWindow: 100,
      windowMs: 120000,
      minTime: 100,
      maxConcurrent: 10,
    };
  }
}
