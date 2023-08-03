export { default } from 'next-auth/middleware';
export const config = {
    // Redireccionar todas las paginas dentro de dashboard matcher: ['/dashboard:path*']
    matcher: ['/dashboard/profile']
}