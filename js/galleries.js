/*
 * Site content. Edit this file to change contact details or photos.
 *
 * To add a photo: put the full image in photos/<folder>/ and a square 600px
 * crop with the same name in photos/<folder>/thumbs/, then raise that
 * gallery's `count`. Files are named 01.jpg, 02.jpg, ... in display order.
 * To add a gallery: add another { title, label, folder, count } entry.
 */
window.SITE = {
  contact: {
    email: "annguyen12427@gmail.com",
    instagram: "asianaan",
    phone: "6828125915", // digits only, US number
  },

  pages: {
    home: {
      message: ["WHERE COLORS BECOME", "A LANGUAGE."],
      collections: [
        { title: "PORTRAITS", label: "2026", href: "portraits.html" },
        { title: "STILLS", label: "2026", href: "stills.html" },
        { title: "FILM", label: "2026", href: "film.html" },
        { title: "UNIVERSITY", label: "2026", href: "university.html" },
      ],
    },

    portraits: {
      message: ["TURNING FRAMES", "INTO EMOTIONS."],
      galleries: [
        { title: "Crazy Rich Asians", label: "2025", folder: "crazy-rich-asians", count: 12 },
        { title: "Portales", label: "2025", folder: "portales", count: 11 },
        { title: "Oceans 4", label: "2026", folder: "oceans-4", count: 9 },
        { title: "Oceans 8", label: "2026", folder: "oceans-8", count: 6 },
        { title: "Tran", label: "2024", folder: "tran", count: 9 },
      ],
    },

    stills: {
      message: ["TURNING FRAMES", "INTO EMOTIONS."],
      galleries: [
        { title: "Japan", label: "Osaka", folder: "japan", count: 6 },
      ],
    },

    // No photos in the design yet: these render a "coming soon" note.
    film: {
      message: ["TURNING FRAMES", "INTO EMOTIONS."],
      galleries: [],
    },
    university: {
      message: ["TURNING FRAMES", "INTO EMOTIONS."],
      galleries: [],
    },
  },
};
