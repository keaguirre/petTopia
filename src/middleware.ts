import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(['/play(.*)', '/settings', '/profile']);
export const onRequest = clerkMiddleware((auth, context) => {
    const { userId, redirectToSignIn } = auth();


    if (isProtectedRoute(context.request) && !userId) {
        return redirectToSignIn();
    }
});