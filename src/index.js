const WEBSITE_ORIGIN = "https://andy7208.github.io";

export default {
    async fetch(request, env) {
        const requestURL = new URL(request.url);

        const Headers = {
            "Access-Control-Allow-Origin": WEBSITE_ORIGIN,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json"
        };

        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: Headers
            });
        }

        if (requestURL.pathname === "/TestKV") {
            const testKey = "fe2_audio_io_test";

            try {
                await env.EVENTS.put(testKey, "KV is working!");

                const value = await env.EVENTS.get(testKey);

                return Response.json(
                    {
                        ok: value === "KV is working!",
                        binding: "EVENTS",
                        value: value
                    },
                    { status: 200, headers: Headers }
                );
            } catch (error) {
                return Response.json(
                    {
                        ok: false,
                        error: error.message
                    },
                    { status: 500, headers: Headers}
                );
            }
        }

        if (requestURL.pathname !== "/EventsContact") {
            return Response.json(
                { error: "Not found" },
                { status: 404, headers: Headers }
            );
        }

        if (request.method !== "POST") {
            return Response.json(
                { error: "Method not allowed" },
                { status: 405, headers: Headers }
            );
        }

        let Data;

        try {
            Data = await request.json();
        } catch {
            return Response.json(
                { error: "Invalid JSON" },
                { status: 400, headers: Headers }
            );
        }

        if (
            typeof Data.username !== "string" ||
            Data.username.trim() === ""
        ) {
            return Response.json(
                { error: "A username is required" },
                { status: 400, headers: Headers}
            );
        }

        return Response.json(
            {
                ok: true,
                event: Data.event ?? null,
                username: Data.username.trim()
            },
            { status: 200, headers: Headers}
        );
    }
};