import { leads } from "@/db/schema";
import { getDb } from "@/db";

const CONSENT_VERSION = "2026-07-24";

type LeadPayload = {
  leadType?: unknown;
  source?: unknown;
  product?: unknown;
  name?: unknown;
  phone?: unknown;
  consent?: unknown;
  marketingConsent?: unknown;
  chatSummary?: unknown;
  pageUrl?: unknown;
  utm?: {
    source?: unknown;
    medium?: unknown;
    campaign?: unknown;
    content?: unknown;
    term?: unknown;
  };
};

function bounded(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function normalizePhone(value: unknown) {
  if (typeof value !== "string") return "";
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11 || !["7", "8"].includes(digits[0])) return "";
  return `+7${digits.slice(1)}`;
}

export async function POST(request: Request) {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ error: "Некорректный формат заявки." }, { status: 400 });
  }

  const contactName = bounded(payload.name, 80);
  const phone = normalizePhone(payload.phone);
  if (contactName.length < 2 || !phone || payload.consent !== true) {
    return Response.json(
      { error: "Нужны имя, корректный номер и согласие." },
      { status: 422 },
    );
  }

  const leadType = bounded(payload.leadType, 50) || "consultation";
  const source = bounded(payload.source, 80) || "website";
  const id = crypto.randomUUID();

  try {
    const db = await getDb();
    await db
      .insert(leads)
      .values({
        id,
        createdAt: new Date().toISOString(),
        leadType,
        source,
        product: bounded(payload.product, 100),
        contactName,
        phone,
        chatSummary: bounded(payload.chatSummary, 3000),
        consentVersion: CONSENT_VERSION,
        marketingConsent: payload.marketingConsent === true,
        pageUrl: bounded(payload.pageUrl, 500),
        utmSource: bounded(payload.utm?.source, 100),
        utmMedium: bounded(payload.utm?.medium, 100),
        utmCampaign: bounded(payload.utm?.campaign, 150),
        utmContent: bounded(payload.utm?.content, 150),
        utmTerm: bounded(payload.utm?.term, 150),
        status: "new",
      });
  } catch (error) {
    console.error("Lead persistence failed", error);
    return Response.json(
      { error: "Заявка временно не принимается." },
      { status: 503 },
    );
  }

  return Response.json({ ok: true, id }, { status: 201 });
}
