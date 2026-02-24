import type { CVData } from '../../components/types';
import profileImage from '../assets/daniel.jpg?inline';

export const cvData: CVData = {
    profile: {
        name: "Daniel Barber",
        title: "Business & Technology Professional • Data & AI",
        email: "daniel_barber23@hotmail.com",
        phone: "+41 79 257 55 74",
        location: "Baden AG, Schweiz",
        linkedin: "https://www.linkedin.com/in/daniel-robert-barber/",
        github: undefined,
        website: "https://daniel-barber.github.io/digital-cv/",
        profileImage: profileImage,
    },

    summary:
        "Business und Technology Professional bei IBM mit Erfahrung in Data und AI Initiativen bei Schweizer Enterprise Kunden. Schwerpunkt auf der Strukturierung komplexer Fragestellungen sowie der Abstimmung zwischen Business und technischen Stakeholdern in funktionsübergreifenden Umgebungen.",

    experience: [
        {
            company: "IBM Schweiz AG",
            position: "Technology Sales – Data & AI (Bachelor@IBM)",
            period: "Jan 2026 - Heute",
            description: [
                "Zusammenarbeit mit Schweizer Enterprise Account Teams bei Data und AI Opportunities; Strukturierung von Kundengesprächen in klar definierte Use Cases und nächste Schritte.",
                "Erstellung und Weiterentwicklung von Unterlagen für Kundentermine sowie interne Abstimmungen zwischen Business und technischen Stakeholdern.",
                "Verbesserung der Transparenz von Opportunities und der Koordination zwischen Account Teams durch strukturierte Salesforce Reports und klare Tracking Standards.",
                "Unterstützung von Design Thinking Workshops und AI Demos zur Überführung des IBM Portfolios in konkrete Proof of Concept Ansätze.",
                "Mitorganisation der IBM watsonx Student Challenge Schweiz mit 150 Studierenden und 10 Enterprise Partnern inklusive Stakeholder Koordination und Event Logistik.",
            ],
        },

        {
            company: "IBM Schweiz AG",
            position: "Customer Success Manager – Data & AI (Bachelor@IBM)",
            period: "Sep 2024 - Dez 2025",
            description: [
                "Unterstützung von Enterprise Kunden bei der Konzeption und Umsetzung von Generative AI Use Cases auf IBM watsonx mit Ausrichtung an Business Zielen und technischer Machbarkeit.",
                "Erstellung von Reporting und Forecasting Unterlagen zur Projektsteuerung und Sicherstellung der Transparenz gegenüber Stakeholdern.",
                "Koordination zwischen Sales, technischen und Delivery Teams während Implementierungsphasen zur Sicherstellung einer konsistenten Abstimmung.",
                "Mitorganisation einer DACH User Group mit Enterprise Kunden und IBM Produktteams zum Austausch von Feedback und Adoption Erfahrungen.",
            ],
        },

        {
            company: "Möbel Pfister AG",
            position: "Search Engine Advertising Manager",
            period: "Aug 2020 - Aug 2024",
            description: [
                "Verantwortung für Planung und Optimierung von Search und Shopping Kampagnen über Google und Bing mit Fokus auf Performance Verbesserung.",
                "Erstellung von Performance Dashboards in Looker Studio zur Unterstützung von Budgetallokation und Entscheidungsprozessen.",
                "Planung und Kontrolle von SEA Budgets sowie Abstimmung mit Display und Social Media Teams.",
                "Verantwortung für Produktdaten Feeds und Sicherstellung der Datenqualität über E Commerce Kanäle hinweg.",
            ],
        },

        {
            company: "Möbel Pfister AG",
            position: "Mediamatiker EFZ (Lehre)",
            period: "Aug 2016 - Jul 2020",
            description: [
                "First Level IT Support sowie Mitarbeit an internen Digitalisierungsprojekten im Bereich Organisation und IT.",
                "Unterstützung des E Commerce Teams bei Landingpages, Produktdatenpflege und Shop Funktionalitäten.",
                "Erstellung von Newslettern, Print und Social Media Inhalten zur Sicherstellung einer konsistenten Markenkommunikation.",
            ],
        },

        {
            company: "Mürset Restaurants",
            position: "Koch EFZ (Lehre)",
            period: "Aug 2012 - Jul 2015",
            description: [
                "Abschluss der Ausbildung zum Koch EFZ mit Entwicklung von Präzision, Teamfähigkeit und Belastbarkeit in einem dynamischen Arbeitsumfeld.",
            ],
        },
    ],

    projects: [
        {
            title: "Use Case Definition und PoC Facilitation",
            context: "Rock with IBM Partner Enablement Series",
            period: "2026",
            description: [
                "Moderation von Design Thinking Workshops mit IBM Business Partnern zur Strukturierung von Kunden Use Cases und Definition des Lösungsumfangs.",
                "Überführung von Business Herausforderungen in klar definierte Proof of Concept Szenarien im Kontext von Data und AI.",
                "Abstimmung zwischen Business und technischen Stakeholdern hinsichtlich Machbarkeit, Annahmen und weiteren Schritten.",
            ],
        },

        {
            title: "Empathische Conversational AI im Gesundheitskontext",
            context: "Universitäres Forschungsprojekt",
            period: "2025",
            description: [
                "Definition von Nutzeranforderungen, Rahmenbedingungen und ethischen Aspekten für AI basierte Patientenunterstützung in klinischen Studien.",
                "Konzeption und prototypische Umsetzung eines Conversational Agents mit iterativer Test und Verbesserungsphase.",
                "Evaluation von Usability und Empathie Kriterien sowie Dokumentation von Risiken in sensiblen Anwendungsfeldern.",
            ],
        },
    ],

    education: [
        {
            school: "FHNW – Hochschule für Technik, Brugg Windisch",
            degree: "Bachelor of Science",
            field: "Informatik (Design & Management)",
            period: "2022 - 2026",
            details: "Notenschnitt 5.3 / 6.0 – Top 10 Prozent des Jahrgangs",
        },
        {
            school: "HKV Aarau",
            degree: "Mediamatiker EFZ mit Berufsmaturität",
            period: "2016 - 2020",
            details: "Abschlussnote 5.7 / 6.0",
        },
        {
            school: "Berufsschule Aarau",
            degree: "Koch EFZ",
            period: "2012 - 2015",
            details: "Abschlussnote 5.2 / 6.0",
        },
    ],

    skills: [
        {
            category: "Fachliche Kompetenzen",
            skills: [
                "Business Analyse",
                "Workshop Moderation",
                "Requirements Engineering",
                "Stakeholder Management",
                "Use Case Strukturierung",
                "Agile / Scrum",
            ],
        },
        {
            category: "Technische Kompetenzen",
            skills: [
                "Python",
                "SQL",
                "Salesforce",
                "Datenvisualisierung",
                "Power BI / Looker Studio",
                "Git",
                "Docker",
                "Figma",
                "React / TypeScript",
                "Streamlit",
            ],
        },
    ],

    languages: [
        { language: "Englisch", proficiency: "Muttersprache", level: 5 },
        { language: "Deutsch", proficiency: "Muttersprache", level: 5 },
        { language: "Französisch", proficiency: "B2", level: 3 },
        { language: "Spanisch", proficiency: "A1", level: 1 },
    ],

    volunteer: [
        {
            organization: "IBM Schweiz",
            role: "Co Lead LGBTQ Switzerland Business Resource Group",
            period: "Jul 2025 - Heute",
            description: [
                "Mitverantwortung für Planung und Durchführung von Mitarbeiterevents und Kommunikationsformaten in der Schweiz.",
                "Koordination von Referierenden und Stakeholdern sowie Organisation von Veranstaltungen zur Förderung von Engagement und Austausch.",
            ],
        },
        {
            organization: "du bist du (Sexuelle Gesundheit Zürich)",
            role: "Peer Berater und Website Verantwortlicher",
            period: "Nov 2016 - Heute",
            description: [
                "Beratung junger LGBT Personen zu sexueller und romantischer Orientierung.",
                "Unterstützung von Präventions und Aufklärungsinitiativen.",
                "Weiterentwicklung und Pflege der Website zur Verbesserung von Zugänglichkeit und Reichweite.",
            ],
        },
    ],
};