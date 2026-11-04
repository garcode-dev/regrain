// All Re-Green & Reclaim Africa Initiative copy and links live here.
// Edit text in this file; the components only handle layout.
// Source: copy.md (Mining NGO web copy, as supplied).

// Custom-domain email. TODO: confirm the domain once it is registered and the inbox is set up.
const EMAIL = "info@regreenreclaimafrica.org";

export const site = {
  name: "Re-Green & Reclaim Africa Initiative",
  shortName: "Re-Green & Reclaim Africa",
  meta: {
    title: "Re-Green & Reclaim Africa Initiative",
    description:
      "Re-Green & Reclaim Africa Initiative is a not-for-profit organisation reclaiming abandoned open mines across Nigeria, restoring ecosystems and supporting community health and wellbeing.",
  },
  contact: {
    email: EMAIL,
    emailHref: `mailto:${EMAIL}`,
    address: "No. 11, Banjul Street, Central Business District, FCT - Nigeria",
    phones: [
      { label: "+234 703 566 1756", href: "tel:+2347035661756" },
      { label: "+234 803 592 1128", href: "tel:+2348035921128" },
    ],
  },
  nav: [
    { label: "Who We Are", href: "#who" },
    { label: "What We Do", href: "#what" },
    { label: "Our Mission", href: "#mission" },
    { label: "Aims & Objectives", href: "#objectives" },
    { label: "Trustees", href: "#trustees" },
    { label: "Contact", href: "#contact" },
  ],
  // The Volunteer section is reached through this button, so it is not repeated in `nav`.
  navCta: { label: "Volunteer With Us", href: "#volunteer" },
} as const;

export const home = {
  hero: {
    eyebrow: "Who We Are",
    title: "Re-Green & Reclaim Africa Initiative",
    lead: "A not-for-profit organisation whose foremost objective is the reclamation of abandoned open mines across Nigeria.",
    primary: { label: "Volunteer With Us", href: "#volunteer" },
    secondary: { label: "What We Do", href: "#what" },
    // Photo file in /public/images (1920×1080). Shown automatically once the file exists.
    photo: "hero.jpg",
  },
  who: {
    eyebrow: "Who We Are",
    introStrong: "RE-GREEN & RECLAIM AFRICA INITIATIVE",
    introRest:
      " is a not-for-profit organisation whose foremost objective is the reclamation of abandoned open mines across Nigeria.",
    body:
      "Across more than 10 states in Nigeria, thousands of abandoned mines have left a tragic legacy of unrecorded illnesses and deaths. Driven by hazards like flooded pits, landslides, erosion, and pollution, this environmental crisis demands urgent action. Our goal is to reclaim these dangerous sites, restore the surrounding ecosystems, and support community health and wellbeing.",
    // Both figures come straight from the copy above.
    stats: [
      { value: "10+", label: "States in Nigeria affected by abandoned mines" },
      { value: "1000s", label: "Abandoned mines left behind" },
    ],
    hazards: ["Flooded pits", "Landslides", "Erosion", "Pollution"],
  },
  what: {
    eyebrow: "What We Do",
    title: "From neglected mine sites to thriving ecosystems.",
    lead:
      "Re-green & Reclaim Africa Initiative is committed to providing efficient and resourceful solutions to the threats abandoned mine lands pose to human health and the environment. We convert neglected mining sites closed without proper reclamation into thriving ecosystems through structured reshaping, restoration of stream channels and reforestation.",
    // Photo files in /public/images (800×600). Each shows automatically once the file exists;
    // until then the card shows its illustrated placeholder (`art`).
    methods: [
      { title: "Structured reshaping", art: "terraces", photo: "reshaping.jpg" },
      { title: "Restoration of stream channels", art: "stream", photo: "stream-channels.jpg" },
      { title: "Reforestation", art: "trees", photo: "reforestation.jpg" },
    ],
  },
  mission: {
    eyebrow: "Our Mission",
    quote: "We are passionate about reestablishing landscapes and environments negatively impacted by mining.",
    body:
      "Our core mission is to limit global warming, protect people and ecosystems, promote clean energy, reach net-zero emissions, provide clean energy and restore natural processes.",
    focus: [
      "Limit global warming",
      "Protect people & ecosystems",
      "Promote clean energy",
      "Reach net-zero emissions",
      "Restore natural processes",
    ],
  },
  objectives: {
    eyebrow: "Aims and Objectives",
    title: "What we're working towards.",
    items: [
      { text: "Reclamation of abandoned open mines for environmental restoration and community wellbeing", wide: true },
      { text: "Converting abandoned mine pits to thriving ecosystems", wide: true },
      { text: "Limit global warming" },
      { text: "Reach net-zero emissions" },
      { text: "Protect people and ecosystems" },
      { text: "Clean energy" },
      { text: "Reforestation", wide: true },
    ],
  },
  trustees: {
    eyebrow: "Our Trustees",
    title: "The people guiding our work.",
    // Portrait files in /public/images (600×750). Each shows automatically once the file exists.
    items: [
      { name: "Engr. Rex Hegen Aii PhD", role: "Board Chairman", photo: "trustee-rex-hegen-aii.jpg" },
      { name: "Mr. Benjamin Gar", role: "Board Secretary", photo: "trustee-benjamin-gar.jpg" },
    ],
  },
  volunteer: {
    eyebrow: "Get Involved",
    title: "Volunteer With Us",
    paragraphs: [
      "We consider every volunteer to be a valuable part of our goal to achieve environmental sustainability. We strive towards excellence and inclusion in our work environment. Our mission will be more attainable when you volunteer with us.",
      "If you are excited about preserving the ecosystem as we are, we would love to get you involved with our campaigns and projects.",
    ],
    button: "Contact Us",
    // Opens the contact form with "Volunteering" selected.
    buttonHref: "#contact",
    buttonInterest: "volunteer",
    // Photo file in /public/images (900×700). Shown automatically once the file exists.
    photo: "volunteer.jpg",
  },
  footer: {
    tagline: "Reclaiming abandoned open mines across Nigeria for environmental restoration and community wellbeing.",
    marquee: ["Re-Green", "Reclaim", "Africa"],
  },
} as const;

/* ======================================================================
   Contact section and form  (#contact)
   ====================================================================== */
export const contact = {
  eyebrow: "Contact Us",
  title: "Get in touch.",
  lead: "Send us a message and we'll get back to you. You can also reach us by email, phone or at our office.",
  form: {
    title: "Send us a message",
    // `value` is what links use to pre-select an option, e.g. <a href="#contact" data-interest="volunteer">
    // These options are a suggestion. Confirm them with the client.
    interests: [
      { value: "volunteer", label: "Volunteering" },
      { value: "campaigns", label: "Our campaigns and projects" },
      { value: "partnership", label: "Partnership or collaboration" },
      { value: "site", label: "An abandoned mine site in my community" },
      { value: "media", label: "Media enquiry" },
      { value: "other", label: "Something else" },
    ],
    button: "Send Message",
    confirmation: "Thank you. We've received your message and will get back to you soon.",
    error: "Sorry, your message couldn't be sent just now. Please try again, or email us directly at",
    // Where messages go by default. CONTACT_TO in the environment overrides it.
    to: EMAIL,
  },
} as const;
