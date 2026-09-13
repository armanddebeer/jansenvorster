import type { TLocale } from "@/lib/i18n/locales";

/**
 * English UI copy — source of truth for the dictionary shape.
 */
export const en = {
  language: {
    choose: "Choose language",
    english: "English",
    afrikaans: "Afrikaans",
  },
  nav: {
    home: "Home",
    about: "About us",
    brands: "Brands",
    whyChoose: "Why choose us",
    services: "Our services",
    contact: "Contact us",
    getInTouch: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeAria: "Jansen & Vorster home",
  },
  hero: {
    kicker: "Jansen & Vorster Optometrists",
    titleLine1: "Eye Care",
    titleLine2: "With Knowledge",
    subtitle: "Passionate about Eye Care",
    detail:
      "More than 30 years of combined experience, with three practices in Melkbosstrand, Milnerton and Atlantis, Cape Town.",
    imageAlt:
      "Table Mountain and the Cape Town shoreline, with eyeglasses drawn over the sky",
    aria: "Hero",
  },
  important: {
    title: "Important Message",
    body:
      "We’re delighted to be expanding our practice to a new location at Paddocks Centre in Milnerton, allowing us to bring our professional eye care services to even more patients.",
  },
  who: {
    kicker: "About the practice",
    title: "Who we are",
    body:
      "Jansen Vorster Optometrists is proudly owned and managed by two qualified optometrists, Mr Frederik Jansen and Mrs Mandre Vorster. We have three practices conveniently located in Melkbosstrand, Milnerton and Atlantis, Cape Town.",
  },
  features: {
    guaranteeTitle: "One year guarantee",
    guaranteeBody: "A one-year guarantee on all manufacturer errors.",
    pensionTitle: "Pensioners packages",
    pensionBody: "Special pensioner packages available (T&C’s apply).",
    labTitle: "Onsite laboratory",
    labBody: "Fitting lab and technician available at our Melkbosstrand branch.",
    medicalTitle: "Medical aids",
    medicalBody: "We are contracted with most Medical Aid service providers.",
  },
  brands: {
    kicker: "Eyewear",
    title: "Brands",
    homeBody:
      "We stock well-known brands, personally selected by the Jansen Vorster team. We take time with each patient to find the right frame.",
    pageBody:
      "We stock well-known brands, personally selected by the Jansen Vorster team. We take time with each patient to find the right frame.",
  },
  about: {
    kicker: "Our story",
    title: "About Us",
    paragraphs: [
      "Jansen Vorster Optometrists is proudly owned and managed by two qualified optometrists, Mr Frederik Jansen and Mrs Mandre Vorster. We have three practices conveniently located in Melkbosstrand, Milnerton and Atlantis, Cape Town.",
      "We are passionate about eye care and understand the vital role your vision plays in connecting you to the world around you. That’s why we are committed to providing personalised, professional care and taking every measure to ensure that your eyes receive the attention they deserve.",
      "With more than 30 years of combined experience, we offer a comprehensive range of optometric services, including professional eye examinations, spectacle fitting & dispensing, and contact lens services.",
      "At Jansen Vorster Optometrists, we believe in going the extra mile for every patient. Our goal is not only to help you see better, but to ensure that you receive exceptional care in a welcoming and professional environment.",
    ],
    imageAlt: "Two people looking through large orange-rimmed glasses",
  },
  services: {
    kicker: "Care",
    title: "Our services",
    intro: "Jansen Vorster Optometrists offers the following services.",
    eyeAlt: "Illustrated eye seen through a magnifying glass",
    contactLensAlt: "Hand holding a contact lens in front of an illustrated eye",
    items: [
      {
        title: "Eye Screening",
        paragraphs: [
          "An eye screening determines whether you may need spectacles, by identifying possible visual impairment or eye conditions that are likely to lead to vision loss.",
          "We offer visual screenings to children and adults so problems can be found early.",
        ],
        groups: [
          {
            heading: "Available screenings",
            items: [
              "Driver’s licence screenings",
              "Forklift licence screenings",
            ],
          },
        ],
        note: "Please contact our reception for availability with one of our optometrists, so we can avoid disappointment.",
      },
      {
        title: "Eye Test / Examination",
        paragraphs: [
          "A comprehensive eye test is recommended every two years for adults, and every year for contact lens wearers and children (7 to 18 years), to monitor ocular health.",
        ],
        groups: [
          {
            heading: "The examination includes",
            items: [
              "Case history",
              "Ocular health check, including a glaucoma screening",
              "Fundus investigation with handheld fundus cameras to assess retinal health — many systemic diseases show signs in the eye",
              "Corneal topography when required, for conditions such as keratoconus and for virtual contact-lens fittings",
              "Refraction to determine a spectacle or contact-lens prescription",
              "Binocular vision testing",
            ],
          },
          {
            heading: "Afterwards",
            items: [
              "Feedback on the results and advice on corrective options, including specialist referrals when needed",
              "Education on different lens attributes",
              "Help with frame selection, lenses and quotations",
            ],
          },
        ],
      },
      {
        title: "Contact Lens Consultation",
        paragraphs: [
          "A contact lens consultation looks at the health of the eye surface and which lenses will suit you.",
        ],
        groups: [
          {
            heading: "The consultation includes",
            items: [
              "Case history",
              "Assessment of tear function",
              "Conjunctival and corneal check",
              "Fluorescein staining to assess eye health",
              "Discussion of the options available",
              "Fitting of trial lenses",
              "Instruction on caring for your eyes and lenses",
              "A trial period so you can adapt to your lenses",
            ],
          },
        ],
      },
      {
        title: "Hard Contact Lenses",
        paragraphs: [
          "Whether hard contact lenses are needed is decided during a contact lens consultation. This service is mainly provided from the Melkbosstrand branch.",
        ],
        groups: [
          {
            heading: "What to expect",
            items: [
              "A thorough discussion before a trial set of lenses is ordered",
              "Multiple consultations may be needed to finalise the fitting",
            ],
          },
        ],
      },
      {
        title: "On-Site Lens Laboratory",
        paragraphs: [
          "We have an on-site optical laboratory at the Melkbosstrand practice, where our technician and optical dispenser can help you.",
        ],
        groups: [
          {
            heading: "The laboratory offers",
            items: [
              "Fitting of spectacle lenses",
              "Spectacle maintenance and repairs",
              "Personal help with lens and frame selection",
            ],
          },
        ],
      },
      {
        title: "Low Vision",
        paragraphs: [
          "Low vision is our leading area of expertise.",
        ],
        groups: [
          {
            heading: "What we offer",
            items: [
              "A wide range of optical magnifiers from Eschenbach and Schweizer, available to view at the Melkbosstrand practice",
              "Fitting and supply of Bioptics (bioptic telescopes) — vision-enhancement lenses with extreme magnification to improve distance vision for people with impaired eyesight",
            ],
          },
        ],
      },
    ],
  },
  contact: {
    kicker: "Visit us",
    title: "Contact us",
    tel: "Tel",
    address: "Address",
    email: "Email",
    hours: "Business Hours",
    mapTitle: "map",
  },
  form: {
    contactKicker: "Contact",
    getInTouch: "Get in touch",
    intro: "Choose a practice and we will email that branch.",
    close: "Close",
    closeAria: "Close Get in touch",
    appointments: "Appointments",
    callback: "Request a callback",
    name: "Your name",
    phone: "Phone number",
    email: "Email",
    practice: "Preferred practice",
    selectBranch: "Select a branch",
    preferredTime: "Preferred time",
    selectTime: "Select a time",
    message: "How can we help?",
    send: "Send",
    request: "Request",
    sending: "Sending…",
    times: {
      "Morning (09h00–12h00)": "Morning (09h00–12h00)",
      "Afternoon (12h00–15h00)": "Afternoon (12h00–15h00)",
      "Late afternoon (15h00–17h00)": "Late afternoon (15h00–17h00)",
      "Saturday morning": "Saturday morning",
    },
    errorGeneric: "Could not send your request.",
    errorNetwork: "Network error. Please check your connection and try again.",
  },
  cookies: {
    title: "Cookies",
    body: "We use cookies to keep the site working smoothly.",
    policy: "Cookie policy",
    accept: "Accept",
    necessary: "Necessary only",
  },
  footer: {
    slogan: "Eye Care With Knowledge",
    explore: "Explore",
    privacy: "Privacy Policy",
    cookePolicy: "Cooke Policy",
    rights: "All rights reserved.",
    credit: "Website by",
  },
  hours: {
    "Monday – Thursday: 09h00-18h00": "Monday – Thursday: 09h00-18h00",
    "Friday: 09h00-18h00": "Friday: 09h00-18h00",
    "Saturday: 09h00-17h00": "Saturday: 09h00-17h00",
    "Sunday’s & Public Holidays: Closed": "Sunday’s & Public Holidays: Closed",
    "Monday – Thursday: 08h30-17h30": "Monday – Thursday: 08h30-17h30",
    "Friday: 08h00-17h00": "Friday: 08h00-17h00",
    "Saturday: 08h00-12h00": "Saturday: 08h00-12h00",
    "Monday – Friday: 09h00-17h00": "Monday – Friday: 09h00-17h00",
    "Saturday: 09h00-13h00": "Saturday: 09h00-13h00",
    "Public Holidays: 09h00-13h00": "Public Holidays: 09h00-13h00",
    "Sunday: Closed": "Sunday: Closed",
  },
} satisfies Record<string, unknown>;

export type TMessages = typeof en;

/**
 * Afrikaans UI copy. Proper names, place names, emails and phone numbers stay as-is.
 */
export const af: TMessages = {
  language: {
    choose: "Kies taal",
    english: "English",
    afrikaans: "Afrikaans",
  },
  nav: {
    home: "Tuis",
    about: "Oor ons",
    brands: "Handelsmerke",
    whyChoose: "Hoekom ons",
    services: "Ons dienste",
    contact: "Kontak ons",
    getInTouch: "Kom in verbinding",
    openMenu: "Maak kieslys oop",
    closeMenu: "Maak kieslys toe",
    homeAria: "Jansen & Vorster tuis",
  },
  hero: {
    kicker: "Jansen & Vorster Optometrists",
    titleLine1: "Oogsorg",
    titleLine2: "Met Kennis",
    subtitle: "Passievol oor oogsorg",
    detail:
      "Meer as 30 jaar se gesamentlike ervaring, met drie praktyke in Melkbosstrand, Milnerton en Atlantis, Kaapstad.",
    imageAlt:
      "Tafelberg en die Kaapstadse kuslyn, met ’n bril oor die lug geteken",
    aria: "Hoofbanner",
  },
  important: {
    title: "Belangrike boodskap",
    body:
      "Ons is bly om ons praktyk uit te brei na ’n nuwe ligging by Paddocks Centre in Milnerton, sodat ons ons professionele oogsorgdienste aan nog meer pasiënte kan bied.",
  },
  who: {
    kicker: "Oor die praktyk",
    title: "Wie ons is",
    body:
      "Jansen Vorster Optometrists word met trots besit en bestuur deur twee gekwalifiseerde optometriste, mnr. Frederik Jansen en mev. Mandre Vorster. Ons het drie praktyke gerieflik geleë in Melkbosstrand, Milnerton en Atlantis, Kaapstad.",
  },
  features: {
    guaranteeTitle: "Een jaar waarborg",
    guaranteeBody: "’n Eenjaarwaarborg op alle vervaardigerfoute.",
    pensionTitle: "Pensioenarispakkette",
    pensionBody: "Spesiale pensioenarispakkette is beskikbaar (bepalings geld).",
    labTitle: "Laboratorium ter plaatse",
    labBody: "Paslaboratorium en tegnikus by ons Melkbosstrand-tak beskikbaar.",
    medicalTitle: "Mediese fondse",
    medicalBody: "Ons is gekontrakteer met die meeste mediese fondse.",
  },
  brands: {
    kicker: "Brille",
    title: "Handelsmerke",
    homeBody:
      "Ons hou bekende handelsmerke wat persoonlik deur die Jansen Vorster-span gekies word. Ons neem tyd met elke pasiënt om die regte raam te vind.",
    pageBody:
      "Ons hou bekende handelsmerke wat persoonlik deur die Jansen Vorster-span gekies word. Ons neem tyd met elke pasiënt om die regte raam te vind.",
  },
  about: {
    kicker: "Ons storie",
    title: "Oor ons",
    paragraphs: [
      "Jansen Vorster Optometrists word met trots besit en bestuur deur twee gekwalifiseerde optometriste, mnr. Frederik Jansen en mev. Mandre Vorster. Ons het drie praktyke gerieflik geleë in Melkbosstrand, Milnerton en Atlantis, Kaapstad.",
      "Ons is passievol oor oogsorg en verstaan die belangrike rol wat jou visie speel om jou met die wêreld om jou te verbind. Daarom is ons verbind tot persoonlike, professionele sorg en doen ons alles om te verseker dat jou oë die aandag kry wat hulle verdien.",
      "Met meer as 30 jaar se gesamentlike ervaring bied ons ’n omvattende reeks optometriese dienste, insluitend professionele oogondersoeke, brilpassing en -verskaffing, en kontaklensdienste.",
      "By Jansen Vorster Optometrists glo ons daarin om die ekstra myl vir elke pasiënt te loop. Ons doel is nie net om jou beter te laat sien nie, maar om te verseker dat jy uitsonderlike sorg in ’n vriendelike en professionele omgewing ontvang.",
    ],
    imageAlt: "Twee mense wat deur groot oranje brilrame kyk",
  },
  services: {
    kicker: "Sorg",
    title: "Ons dienste",
    intro: "Jansen Vorster Optometrists bied die volgende dienste.",
    eyeAlt: "Geïllustreerde oog deur ’n vergrootglas",
    contactLensAlt: "Hand wat ’n kontaklens voor ’n geïllustreerde oog hou",
    items: [
      {
        title: "Oogsifting",
        paragraphs: [
          "’n Oogsifting bepaal of jy dalk ’n bril nodig het, deur moontlike visuele inkorting of oogtoestande te identifiseer wat tot sigverlies kan lei.",
          "Ons bied visuele siftings vir kinders en volwassenes sodat probleme vroeg opgespoor kan word.",
        ],
        groups: [
          {
            heading: "Beskikbare siftings",
            items: [
              "Bestuurslisensie-siftings",
              "Vurkheftrucklisensie-siftings",
            ],
          },
        ],
        note: "Kontak asseblief ons ontvangs vir beskikbaarheid by een van ons optometriste, sodat ons teleurstelling kan voorkom.",
      },
      {
        title: "Oogtoets / ondersoek",
        paragraphs: [
          "’n Omvattende oogtoets word elke twee jaar vir volwassenes aanbeveel, en elke jaar vir kontaklensdraers en kinders (7 tot 18 jaar), om ooggesondheid te monitor.",
        ],
        groups: [
          {
            heading: "Die ondersoek sluit in",
            items: [
              "Gevallegeskiedenis",
              "Ooggesondheidskontrole, insluitend ’n gloukoomsifting",
              "Fundusondersoek met handfonduskameras om retinale gesondheid te beoordeel — baie sistemiese siektes toon tekens in die oog",
              "Korneale topografie wanneer nodig, vir toestande soos keratoconus en vir virtuele kontaklenspassings",
              "Refraksie om ’n bril- of kontaklensvoorskrif te bepaal",
              "Binokulêre visietoetsing",
            ],
          },
          {
            heading: "Daarna",
            items: [
              "Terugvoer oor die resultate en advies oor korrektiewe opsies, insluitend verwysings na spesialiste wanneer nodig",
              "Opvoeding oor verskillende lenskenmerke",
              "Hulp met raamkeuse, lense en kwotasies",
            ],
          },
        ],
      },
      {
        title: "Kontaklenskonsultasie",
        paragraphs: [
          "’n Kontaklenskonsultasie kyk na die gesondheid van die oogoppervlak en watter lense by jou sal pas.",
        ],
        groups: [
          {
            heading: "Die konsultasie sluit in",
            items: [
              "Gevallegeskiedenis",
              "Beoordeling van traanfunksie",
              "Konjunktivale en korneale kontrole",
              "Kleuring met fluoresceïen om ooggesondheid te beoordeel",
              "Bespreking van die beskikbare opsies",
              "Passing van proeflense",
              "Instruksie oor die versorging van jou oë en lense",
              "’n Proeftydperk sodat jy aan jou lense kan gewoond raak",
            ],
          },
        ],
      },
      {
        title: "Harde kontaklense",
        paragraphs: [
          "Of harde kontaklense nodig is, word tydens ’n kontaklenskonsultasie besluit. Hierdie diens word hoofsaaklik vanaf die Melkbosstrand-tak gelewer.",
        ],
        groups: [
          {
            heading: "Wat om te verwag",
            items: [
              "’n Deeglike bespreking voordat ’n stel proeflense bestel word",
              "Verskeie konsultasies kan nodig wees om die finale lenspassing af te handel",
            ],
          },
        ],
      },
      {
        title: "Lenslaboratorium ter plaatse",
        paragraphs: [
          "Ons het ’n optiese laboratorium ter plaatse by die Melkbosstrand-praktyk, waar ons tegnikus en optiese dispenser jou kan help.",
        ],
        groups: [
          {
            heading: "Die laboratorium bied",
            items: [
              "Passing van brilense",
              "Brilonderhoud en -herstelwerk",
              "Persoonlike hulp met lens- en raamkeuse",
            ],
          },
        ],
      },
      {
        title: "Swak sig",
        paragraphs: [
          "Swak sig is ons vernaamste kundigheidsgebied.",
        ],
        groups: [
          {
            heading: "Wat ons bied",
            items: [
              "’n Wye reeks optiese vergrootglase van Eschenbach en Schweizer, beskikbaar om by die Melkbosstrand-praktyk te besigtig",
              "Passing en verskaffing van Bioptics (bioptiese teleskope) — sigversterkende lense met uiterste vergroting om afstandsig te verbeter vir mense met ingekorte sig",
            ],
          },
        ],
      },
    ],
  },
  contact: {
    kicker: "Besoek ons",
    title: "Kontak ons",
    tel: "Tel",
    address: "Adres",
    email: "E-pos",
    hours: "Besigheidsure",
    mapTitle: "kaart",
  },
  form: {
    contactKicker: "Kontak",
    getInTouch: "Kom in verbinding",
    intro: "Kies ’n praktyk en ons e-pos daardie tak.",
    close: "Sluit",
    closeAria: "Sluit Kom in verbinding",
    appointments: "Afsprake",
    callback: "Versoek ’n terugskakel",
    name: "Jou naam",
    phone: "Telefoonnommer",
    email: "E-pos",
    practice: "Voorkeurpraktyk",
    selectBranch: "Kies ’n tak",
    preferredTime: "Gewenste tyd",
    selectTime: "Kies ’n tyd",
    message: "Hoe kan ons help?",
    send: "Stuur",
    request: "Versoek",
    sending: "Stuur tans…",
    times: {
      "Morning (09h00–12h00)": "Oggend (09h00–12h00)",
      "Afternoon (12h00–15h00)": "Middag (12h00–15h00)",
      "Late afternoon (15h00–17h00)": "Laatmiddag (15h00–17h00)",
      "Saturday morning": "Saterdagoggend",
    },
    errorGeneric: "Ons kon nie jou versoek stuur nie.",
    errorNetwork: "Netwerkfout. Kontroleer asseblief jou verbinding en probeer weer.",
  },
  cookies: {
    title: "Koekies",
    body: "Ons gebruik koekies sodat die werf glad kan werk.",
    policy: "Koekiebeleid",
    accept: "Aanvaar",
    necessary: "Net noodsaaklik",
  },
  footer: {
    slogan: "Oogsorg Met Kennis",
    explore: "Verken",
    privacy: "Privaatheidsbeleid",
    cookePolicy: "Cooke Policy",
    rights: "Alle regte voorbehou.",
    credit: "Webwerf deur",
  },
  hours: {
    "Monday – Thursday: 09h00-18h00": "Maandag – Donderdag: 09h00-18h00",
    "Friday: 09h00-18h00": "Vrydag: 09h00-18h00",
    "Saturday: 09h00-17h00": "Saterdag: 09h00-17h00",
    "Sunday’s & Public Holidays: Closed": "Sondae en openbare vakansiedae: Gesluit",
    "Monday – Thursday: 08h30-17h30": "Maandag – Donderdag: 08h30-17h30",
    "Friday: 08h00-17h00": "Vrydag: 08h00-17h00",
    "Saturday: 08h00-12h00": "Saterdag: 08h00-12h00",
    "Monday – Friday: 09h00-17h00": "Maandag – Vrydag: 09h00-17h00",
    "Saturday: 09h00-13h00": "Saterdag: 09h00-13h00",
    "Public Holidays: 09h00-13h00": "Openbare vakansiedae: 09h00-13h00",
    "Sunday: Closed": "Sondag: Gesluit",
  },
};

export const messages: Record<TLocale, TMessages> = {
  en,
  af,
};
