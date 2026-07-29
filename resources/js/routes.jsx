import { route } from 'ziggy-js';

export function routes() {
    return {
        home: route('home'),
        about: route('about'),
        process: route('process'),
        faq: route('faq'),
        contact: route('contact'),
        login: route('login'),
        register: route('register'),
        logout: route('logout'),
        dashboard: route('dashboard'),
    };
}