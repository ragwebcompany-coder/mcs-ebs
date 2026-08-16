import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/*
  Answer engines are a first-class audience here, not an afterthought: the
  assistant crawlers are named explicitly so their access is a deliberate,
  auditable decision rather than an accident of the wildcard rule.
*/
const answerEngines = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini grounding
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...answerEngines.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
