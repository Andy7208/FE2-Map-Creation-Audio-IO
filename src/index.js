const WEBSITE_ORIGIN = "https://andy7208.github.io";

const JSON_HEADERS = {
    "Access-Control-Allow-Origin": WEBSITE_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
};

function JSON_Response(Data, status = 200) {
    return Response.json(
        Data,
        {
            status: status,
            headers: JSON_HEADERS
        }
    );
}

async function TestKV(env) {
    const testKey = "fe2_audio_io_test";

    try {
        await env.EVENTS.put(testKey, "KV is working!");

        const value = await env.EVENTS.get(testKey);

        return JSON_Response({
            ok: value === "KV is working!",
            binding: "EVENTS",
            value: value
        });
    } catch (Error) {
        return JSON_Response({
            ok: false,
            error: Error.message
        }, 500);
    }
}

async function Check_RobloxAccount(request)
{
    let Data;

    try {
        Data = await request.json();
    } catch(Error) {
        return JSON_Response({
            ok: false,
            error: "Invalid JSON request."
        }, 400);
    }

    if (typeof Data?.username !== "string" || Data.username.trim() === "") {
        return JSON_Response({
            ok: false,
            error: "Roblox username is required."
        });
    }

    const username = Data.username?.trim();

    return JSON_Response({
        ok: false,
        username: username,
        error: "Roblox account verification is not implemented yet."
    }, 501);
}

async function EventsContact(request)
{
    let Data;

    try {
        Data = await request.json();
    } catch(Error) {
        return JSON_Response({
            ok: false,
            error: "Invalid JSON request."
        }, 400);
    }

    if (typeof Data?.username !== "string" || Data.username.trim() === "") {
        return JSON_Response({
            ok: false,
            error: "A username is required."
        }, 400);
    }

    return JSON_Response({
        ok: true,
        event: Data.event ?? null,
        username: Data.username.trim()
    });
}

async function CustomData(request) {
    let Data;

    try {
        Data = await request.json();
    } catch {
        return JSON_Response({
            ok: false,
            error: "Invalid JSON request."
        }, 400);
    }

    return JSON_Response({
        ok: true,
        data: Data
    });
}

export default {
    async fetch(request, env) {
        const requestURL = new URL(request.url);

        const pathname = requestURL.pathname;
        const method = request.method;

        if (method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: JSON_HEADERS
            });
        }

        if (method !== "POST") {
            return JSON_Response({
                error: "Method not allowed"
            }, 405);
        }

        switch(pathname) {
            case "/TestKV":
                return await TestKV(env);
            case "/Check_RobloxAccount":
                return await Check_RobloxAccount(request);
            case "/EventsContact":
                return await EventsContact(request);
            case "/Custom":
                return await CustomData(request);
            default:
                return JSON_Response({
                    ok: false,
                    error: "Endpoint not found"
                }, 404);
        }
    }
};