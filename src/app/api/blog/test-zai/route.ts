import { NextResponse } from "next/server";
import { createZai } from "@/lib/zai";

/**
 * Debug endpoint - Test ZAI SDK connection step by step
 */
export async function GET() {
  const results: Record<string, any> = {};

  // Step 1: Check env vars
  results.hasZaiConfig = !!process.env.ZAI_CONFIG;
  results.configPreview = process.env.ZAI_CONFIG
    ? (() => {
        try {
          const c = JSON.parse(process.env.ZAI_CONFIG);
          return { baseUrl: c.baseUrl, apiKey: c.apiKey, hasToken: !!c.token };
        } catch {
          return "invalid";
        }
      })()
    : null;

  // Step 2: Try creating ZAI instance
  try {
    const zai = await createZai();
    results.zaiCreated = true;

    // Step 3: Try a simple chat completion
    try {
      const response = await zai.chat.completions.create({
        messages: [
          { role: "user", content: "Say hello in one word" },
        ],
        max_tokens: 10,
      });
      results.chatSuccess = true;
      results.chatResponse = response.choices[0]?.message?.content || "no content";
    } catch (chatErr: any) {
      results.chatSuccess = false;
      results.chatError = chatErr.message;
      results.chatErrorStack = chatErr.stack?.substring(0, 200);
    }

    // Step 4: Try web search
    try {
      const searchResult = await zai.functions.invoke("web_search", {
        query: "test",
        num: 1,
      });
      results.searchSuccess = true;
      results.searchResult = Array.isArray(searchResult) ? `${searchResult.length} results` : "unexpected format";
    } catch (searchErr: any) {
      results.searchSuccess = false;
      results.searchError = searchErr.message;
    }
  } catch (createErr: any) {
    results.zaiCreated = false;
    results.createError = createErr.message;
  }

  // Step 5: Try direct fetch to ZAI API
  try {
    const config = JSON.parse(process.env.ZAI_CONFIG || "{}");
    const directResponse = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
        "X-Token": config.token,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 5,
        thinking: { type: "disabled" },
      }),
    });
    results.directFetchStatus = directResponse.status;
    results.directFetchOk = directResponse.ok;
    if (directResponse.ok) {
      const body = await directResponse.json();
      results.directFetchContent = body.choices?.[0]?.message?.content || "no content";
    } else {
      results.directFetchBody = (await directResponse.text()).substring(0, 200);
    }
  } catch (directErr: any) {
    results.directFetchError = directErr.message;
    results.directFetchCode = directErr.code;
    results.directFetchCause = directErr.cause?.message || null;
  }

  return NextResponse.json(results);
}
