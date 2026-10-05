const reports = [

    {
        id: "RPT-1001",

        userId: "SEED-USR-001",

        submittedBy: {
            name: "Amina N.",
            email: "amina.demo@example.com"
        },

        title:
            "Bank account verification message",

        category:
            "Phishing",

        platform:
            "SMS",

        sender:
            "Unknown number",

        suspiciousLink:
            "https://account-check.example",

        description:
            "I received a message claiming that my bank account would be suspended unless I verified my details through the provided link.",

        warningSigns: [
            "Urgent language",
            "Suspicious link",
            "Requested credentials",
            "Impersonation"
        ],

        status:
            "Pending",

        submittedAt:
            "2026-09-28T08:15:00.000Z",

        reviewedAt:
            null,

        reviewedBy:
            null

    },


    {
        id: "RPT-1002",

        userId: "SEED-USR-002",

        submittedBy: {
            name: "Kevin M.",
            email: "kevin.demo@example.com"
        },

        title:
            "Fake remote job offer",

        category:
            "Fake Job Offer",

        platform:
            "WhatsApp",

        sender:
            "Recruitment Manager",

        suspiciousLink:
            "",

        description:
            "Someone contacted me claiming to represent an international company. They offered me a remote job immediately but asked me to pay a registration fee before receiving the contract.",

        warningSigns: [
            "Requested payment",
            "Urgent language",
            "Impersonation"
        ],

        status:
            "Suspicious",

        submittedAt:
            "2026-09-27T14:22:00.000Z",

        reviewedAt:
            "2026-09-28T07:30:00.000Z",

        reviewedBy:
            "Ngao Safety Analyst"

    },


    {
        id: "RPT-1003",

        userId: "SEED-USR-003",

        submittedBy: {
            name: "Grace W.",
            email: "grace.demo@example.com"
        },

        title:
            "Social media prize notification",

        category:
            "Prize / Giveaway Scam",

        platform:
            "Instagram",

        sender:
            "Prize account",

        suspiciousLink:
            "https://claim-reward.example",

        description:
            "An account sent me a direct message saying that I had won a smartphone. I had not entered any competition and they wanted me to open a link to claim the prize.",

        warningSigns: [
            "Suspicious link",
            "Urgent language"
        ],

        status:
            "Reviewed",

        submittedAt:
            "2026-09-26T11:40:00.000Z",

        reviewedAt:
            "2026-09-27T09:10:00.000Z",

        reviewedBy:
            "Ngao Safety Analyst"

    },


    {
        id: "RPT-1004",

        userId: "SEED-USR-004",

        submittedBy: {
            name: "Brian K.",
            email: "brian.demo@example.com"
        },

        title:
            "Mobile money reversal request",

        category:
            "Payment Scam",

        platform:
            "SMS",

        sender:
            "Unknown mobile number",

        suspiciousLink:
            "",

        description:
            "The sender claimed they had accidentally transferred money to my number and asked me to send money back to a different number. I could not confirm any incoming transaction.",

        warningSigns: [
            "Requested payment",
            "Urgent language"
        ],

        status:
            "Pending",

        submittedAt:
            "2026-09-28T09:05:00.000Z",

        reviewedAt:
            null,

        reviewedBy:
            null

    },


    {
        id: "RPT-1005",

        userId: "SEED-USR-005",

        submittedBy: {
            name: "Sarah T.",
            email: "sarah.demo@example.com"
        },

        title:
            "Email pretending to be company IT support",

        category:
            "Impersonation",

        platform:
            "Email",

        sender:
            "IT Support",

        suspiciousLink:
            "https://mail-security-update.example",

        description:
            "The email claimed that my company mailbox had exceeded its storage limit and asked me to sign in through an unfamiliar website to prevent the account from being disabled.",

        warningSigns: [
            "Requested credentials",
            "Suspicious link",
            "Impersonation",
            "Urgent language"
        ],

        status:
            "Suspicious",

        submittedAt:
            "2026-09-25T16:12:00.000Z",

        reviewedAt:
            "2026-09-26T08:45:00.000Z",

        reviewedBy:
            "Ngao Safety Analyst"

    },


    {
        id: "RPT-1006",

        userId: "SEED-USR-006",

        submittedBy: {
            name: "David O.",
            email: "david.demo@example.com"
        },

        title:
            "Investment group promising guaranteed returns",

        category:
            "Investment Scam",

        platform:
            "Facebook",

        sender:
            "Online investment group",

        suspiciousLink:
            "",

        description:
            "I was invited to a private investment group promising guaranteed daily profits. Members were encouraged to deposit money immediately to qualify for a limited offer.",

        warningSigns: [
            "Requested payment",
            "Urgent language"
        ],

        status:
            "Pending",

        submittedAt:
            "2026-09-28T06:50:00.000Z",

        reviewedAt:
            null,

        reviewedBy:
            null

    },


    {
        id: "RPT-1007",

        userId: "SEED-USR-007",

        submittedBy: {
            name: "Lydia P.",
            email: "lydia.demo@example.com"
        },

        title:
            "Unexpected delivery payment request",

        category:
            "Payment Scam",

        platform:
            "WhatsApp",

        sender:
            "Delivery Agent",

        suspiciousLink:
            "",

        description:
            "A person claiming to be a delivery agent said there was a parcel waiting for me and requested a payment before delivery. I am not expecting any parcel.",

        warningSigns: [
            "Requested payment",
            "Impersonation"
        ],

        status:
            "Reviewed",

        submittedAt:
            "2026-09-24T10:30:00.000Z",

        reviewedAt:
            "2026-09-25T12:00:00.000Z",

        reviewedBy:
            "Ngao Safety Analyst"

    },


    {
        id: "RPT-1008",

        userId: "SEED-USR-008",

        submittedBy: {
            name: "John R.",
            email: "john.demo@example.com"
        },

        title:
            "Account login warning from unknown sender",

        category:
            "Phishing",

        platform:
            "Email",

        sender:
            "Account Security Team",

        suspiciousLink:
            "https://verify-login.example",

        description:
            "I received an unexpected security alert claiming that someone had accessed my account. The message asked me to sign in through a link within twenty minutes.",

        warningSigns: [
            "Suspicious link",
            "Requested credentials",
            "Urgent language",
            "Impersonation"
        ],

        status:
            "Pending",

        submittedAt:
            "2026-09-28T10:18:00.000Z",

        reviewedAt:
            null,

        reviewedBy:
            null

    }

];



export function getAllReports() {

    return reports;

}



export function getReportsByUserId(
    userId
) {

    return reports.filter(
        (report) =>
            report.userId ===
            userId
    );

}



export function findReportById(
    reportId
) {

    return reports.find(
        (report) =>
            report.id ===
            reportId
    );

}



export function createReport(
    report
) {

    reports.unshift(
        report
    );


    return report;

}



export function updateReportStatus(
    reportId,
    status,
    analystName
) {

    const report =
        findReportById(
            reportId
        );


    if (!report) {

        return null;

    }


    report.status =
        status;


    report.reviewedAt =
        new Date()
            .toISOString();


    report.reviewedBy =
        analystName;


    return report;

}