import { defineMiddleware } from "astro:middleware";
import { createProxyMiddleware } from "http-proxy-middleware";
import axios from "axios";

const apiProxy = createProxyMiddleware({
    target: "http://192.168.12.1/TMI/v1/",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
});

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
    if (context.url.pathname.startsWith('/api')) {
        console.log({context})
        // const request = new Request(context.request.url, {
        //     method: context.request.method,
        //     headers: context.request.headers,
        //     body: context.request.body,
        //     duplex: 'half',
        //     // redirect: 'manual',
        // });
        // const req = new IncomingMessage(request);
        const url = new URL("http://192.168.12.1/TMI/v1/");
        url.pathname = url.pathname + context.url.pathname.replace(/^\/api\//, '');
        try {
            const res = await axios({
                method: context.request.method,
                url: url.toString(),
                headers: {
                    ...Object.fromEntries(context.request.headers.entries()),
                },
                data: context.request.body,
            })
            // return res;
            const response = new Response(res.data,{
                status: res.status,
                statusText: res.statusText,
                headers: res.headers,
                body: res.data,
            })
            
            // await apiProxy(request, response, next);
            console.log({response})
            return response;
        } catch (error) {
            console.error("Error in API proxy:", error);
            return new Response("Internal Server Error", { status: 500 });
        }
    }
    return next()
});
