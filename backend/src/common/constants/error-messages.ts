export const ErrorMessages = {
  api: {
    rateLimit: {
      exceeded: (region: string) => `Rate limit exceeded for region ${region}`,
      retrying: (region: string, delay: number) =>
        `Rate limit hit for region ${region}. Retrying after ${delay}ms`,
    },
    fetch: {
      failed: (url: string, status: number, message: string) =>
        `HTTP error ${status} while fetching ${url}: ${message}`,
      invalidResponse: (url: string) => `Invalid response received from ${url}`,
      noData: (url: string) => `No data received from ${url}`,
    },
    region: {
      invalid: (region: string) => `Invalid region specified: ${region}`,
      noMapping: (region: string) =>
        `No match region mapping found for region: ${region}`,
    },
  },

  database: {
    insert: {
      failed: (entity: string, id: string) =>
        `Failed to insert ${entity} with ID ${id}`,
      duplicate: (entity: string, id: string) =>
        `${entity} with ID ${id} already exists`,
    },
    update: {
      failed: (entity: string, id: string) =>
        `Failed to update ${entity} with ID ${id}`,
      notFound: (entity: string, id: string) =>
        `${entity} with ID ${id} not found`,
    },
    query: {
      failed: (entity: string, params: string) =>
        `Failed to query ${entity} with parameters: ${params}`,
    },
  },

  player: {
    fetch: {
      failed: (summonerId: string, region: string) =>
        `Failed to fetch player data for summonerId ${summonerId} in ${region}`,
      notFound: (summonerId: string, region: string) =>
        `Player not found with summonerId ${summonerId} in ${region}`,
    },
    update: {
      failed: (summonerId: string, region: string) =>
        `Failed to update player data for summonerId ${summonerId} in ${region}`,
    },
    process: {
      failed: (puuid: string) =>
        `Failed to process player data for puuid ${puuid}`,
    },
  },

  match: {
    fetch: {
      failed: (matchId: string, region: string) =>
        `Failed to fetch match ${matchId} in ${region}`,
      notFound: (matchId: string) => `Match not found with ID ${matchId}`,
    },
    process: {
      failed: (matchId: string) =>
        `Failed to process match data for match ${matchId}`,
      participant: (summonerName: string, matchId: string) =>
        `Failed to process participant ${summonerName} in match ${matchId}`,
    },
  },

  stats: {
    champion: {
      update: {
        failed: (championId: string) =>
          `Failed to update champion stats for championId ${championId}`,
      },
      timeBucket: {
        failed: (championId: string, timeBucket: string) =>
          `Failed to update time bucket stats for championId ${championId} in bucket ${timeBucket}`,
      },
    },
    item: {
      process: {
        failed: (matchPlayerId: string) =>
          `Failed to process items for matchPlayerId ${matchPlayerId}`,
      },
      update: {
        failed: (championId: string, itemId: string) =>
          `Failed to update item stats for championId ${championId} and itemId ${itemId}`,
      },
    },
  },

  general: {
    validation: {
      required: (field: string) => `${field} is required`,
      invalid: (field: string) => `Invalid ${field} provided`,
    },
    unexpected: (message: string) => `An unexpected error occurred: ${message}`,
    notImplemented: (feature: string) => `${feature} is not implemented yet`,
  },
};

export const formatError = (message: string, stack?: string): string => {
  return stack ? `${message}\n${stack}` : message;
};

export const createError = (message: string, code?: string) => {
  const error = new Error(message);
  if (code) {
    (error as any).code = code;
  }
  return error;
};

export const HttpErrorMessages = {
  badRequest: {
    invalidInput: (field: string) => `Invalid input provided for ${field}`,
    missingField: (field: string) => `Missing required field: ${field}`,
    invalidRegion: (region: string) => `Invalid region provided: ${region}`,
    invalidTier: (tier: string) => `Invalid tier provided: ${tier}`,
    invalidDivision: (division: string) =>
      `Invalid division provided: ${division}`,
  },
  unauthorized: {
    missingToken: "Missing API token",
    invalidToken: "Invalid API token provided",
    expired: "API token has expired",
  },
  forbidden: {
    insufficientPermissions: "Insufficient permissions to perform this action",
    rateLimitExceeded: (region: string) =>
      `Rate limit exceeded for region ${region}`,
  },
  notFound: {
    player: (id: string) => `Player with ID ${id} not found`,
    match: (id: string) => `Match with ID ${id} not found`,
    resource: (resource: string) => `${resource} not found`,
  },
  tooManyRequests: {
    default: (retryAfter: number) =>
      `Too many requests. Please try again after ${retryAfter} seconds`,
  },
  internal: {
    default: "An internal server error occurred",
    database: (operation: string) =>
      `Database error occurred during ${operation}`,
    external: (service: string) => `External service error: ${service}`,
  },
  conflict: {
    userExists: (email: string) => `User with email ${email} already exists`,
    resourceExists: (resource: string) => `${resource} already exists`,
  },
};
