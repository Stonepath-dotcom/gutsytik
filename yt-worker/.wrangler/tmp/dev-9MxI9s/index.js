var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
var API_KEYS = [
  "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
  "AIzaSyDZNkyC-AtROwMBpLfevIvqYk-Gfi8ZOeo",
  "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w",
  "AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc"
];
var CLIENTS = [
  {
    clientName: "ANDROID_VR",
    clientVersion: "1.60.2",
    extra: { androidSdkVersion: 34, osName: "Android", osVersion: "14" }
  },
  {
    clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
    clientVersion: "2.0",
    thirdParty: { embedUrl: "https://www.google.com" }
  },
  {
    clientName: "IOS",
    clientVersion: "19.45.4",
    extra: { deviceModel: "iPhone16,2" }
  },
  {
    clientName: "WEB_EMBEDDED_PLAYER",
    clientVersion: "1.20241217.01.00",
    thirdParty: { embedUrl: "https://www.google.com" }
  },
  {
    clientName: "WEB_CREATOR",
    clientVersion: "1.20241217.01.00"
  }
];
var src_default = {
  async fetch(request, _env, _ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400"
        }
      });
    }
    if (request.method === "GET") {
      const url = new URL(request.url);
      if (url.pathname === "/health") {
        return Response.json({ status: "ok", timestamp: Date.now() }, {
          headers: { "Access-Control-Allow-Origin": "*" }
        });
      }
      return Response.json({ error: "Use POST with { videoId, audioOnly }" }, { status: 400 });
    }
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }
    try {
      const body = await request.json();
      const { videoId, audioOnly } = body;
      if (!videoId) {
        return Response.json({ error: "videoId required" }, { status: 400 });
      }
      for (const key of API_KEYS) {
        for (const client of CLIENTS) {
          try {
            const context = {
              client: {
                clientName: client.clientName,
                clientVersion: client.clientVersion,
                hl: "en",
                gl: "US",
                ...client.extra || {}
              }
            };
            if (client.thirdParty) context.thirdParty = client.thirdParty;
            const response = await fetch(
              `https://www.youtube.com/youtubei/v1/player?prettyPrint=false&key=${key}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Origin": "https://www.youtube.com",
                  "Referer": "https://www.youtube.com/",
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
                },
                body: JSON.stringify({ videoId, context })
              }
            );
            if (!response.ok) continue;
            const data = await response.json();
            const playability = data.playabilityStatus || {};
            if (playability.status !== "OK") continue;
            const streamingData = data.streamingData || {};
            const adaptiveFormats = streamingData.adaptiveFormats || [];
            const formats = streamingData.formats || [];
            const videoDetails = data.videoDetails || {};
            const audioFormats = adaptiveFormats.filter((f) => typeof f.mimeType === "string" && f.mimeType.includes("audio") && f.url).sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
            const qualityOptions = [];
            if (audioOnly) {
              if (audioFormats.length > 0) {
                qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioFormats[0].url });
                if (audioFormats.length > 1) {
                  qualityOptions.push({ label: "Audio (Low)", resolution: "MP3", url: audioFormats[audioFormats.length - 1].url });
                }
              }
            } else {
              for (const f of formats) {
                if (f.url) {
                  const quality = f.qualityLabel || f.quality || "360p";
                  qualityOptions.push({ label: quality, resolution: quality, url: f.url });
                }
              }
              if (audioFormats.length > 0) {
                qualityOptions.push({ label: "Audio", resolution: "MP3", url: audioFormats[0].url });
              }
            }
            if (qualityOptions.length === 0) continue;
            const lengthSeconds = parseInt(videoDetails.lengthSeconds || "0") || 0;
            return Response.json({
              success: true,
              title: videoDetails.title || "Video YouTube",
              thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              duration: `${String(Math.floor(lengthSeconds / 60)).padStart(2, "0")}:${String(lengthSeconds % 60).padStart(2, "0")}`,
              author: videoDetails.author || "@unknown",
              platform: "YouTube",
              downloadUrl: qualityOptions[0].url,
              qualityOptions,
              filename: `mova_youtube_${videoId}`
            }, {
              headers: { "Access-Control-Allow-Origin": "*" }
            });
          } catch {
            continue;
          }
        }
      }
      return Response.json({ success: false, error: "All clients blocked by YouTube" }, {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    } catch (error) {
      return Response.json({ error: error.message }, {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }
  }
};

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-i5IOa6/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-i5IOa6/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
