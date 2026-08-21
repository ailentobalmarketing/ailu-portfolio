/**
 * El preloader se muestra una sola vez por sesión de pestaña. Motion.tsx lee la
 * misma clave para saber si tiene que retrasar los reveals del hero, así que
 * vive acá y no duplicada en los dos.
 */
export const PRELOADER_SEEN_KEY = "preloaderSeen";
