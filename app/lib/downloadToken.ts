import crypto from "crypto";

type Payload = {
    orderId: string;
    exp: number; // unix time (seconds)
};

// base64url без зависимостей
function base64url(input: string) {
    return Buffer.from(input)
        .toString("base64")
        .replaceAll("+", "-")
        .replaceAll("/", "_")
        .replaceAll("=", "");
}

function unbase64url(input: string) {
    const padded = input.replaceAll("-", "+").replaceAll("_", "/") + "===".slice((input.length + 3) % 4);
    return Buffer.from(padded, "base64").toString("utf-8");
}

function sign(data: string, secret: string) {
    return base64url(crypto.createHmac("sha256", secret).update(data).digest("base64"));
}

export function createDownloadToken(orderId: string, ttlSeconds = 10 * 60) {
    const secret = process.env.DOWNLOAD_SECRET!;
    const exp = Math.floor(Date.now() / 1000) + ttlSeconds;

    const payload: Payload = { orderId, exp };
    const payloadStr = JSON.stringify(payload);

    const payloadB64 = base64url(payloadStr);
    const signature = sign(payloadB64, secret);

    // token = payload.signature
    return `${payloadB64}.${signature}`;
}

export function verifyDownloadToken(token: string): Payload | null {
    const secret = process.env.DOWNLOAD_SECRET!;
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;

    const expected = sign(payloadB64, secret);
    // timing-safe compare (не критично для локалки, но правильно)
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return null;
    if (!crypto.timingSafeEqual(a, b)) return null;

    let payload: Payload;
    try {
        payload = JSON.parse(unbase64url(payloadB64));
    } catch {
        return null;
    }

    if (!payload?.orderId || !payload?.exp) return null;
    if (Math.floor(Date.now() / 1000) > payload.exp) return null;

    return payload;
}
