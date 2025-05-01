import { COMPANY_DATA } from "./constants";

export default class Utils {
    static documentProperties(title = '-', author = '-', subject = '-', keywords = '-', creator = '-', producer = '-') {
        return { title, author, subject, keywords, creator, producer }
    }

    static canvasDto(type, x1, y1, x2, y2, lineWidth) {
        return { type, x1, y1, x2: x2, y2, lineWidth }
    }

    static createFooter(logoBase64) {
        return (currentPage) => {
            if (currentPage === 1) {
                return {
                    margin: [40, 2, 40, 30],
                    columns: [
                        {
                            image: logoBase64, width: 320, height: 30, alignment: "left", margin: [0, 15, 0, 0]
                        },
                        {
                            width: '*', fontSize: 8, alignment: "right",
                            text: [
                                { text: `Adres: ${COMPANY_DATA.city}\n` },
                                { text: `${COMPANY_DATA.street}\n` },
                                { color: "#00246b", text: 'T ' }, { text: `${COMPANY_DATA.phoneNumberOne}\n` },
                                { text: `${COMPANY_DATA.phoneNumberTwo}\n` },
                                { color: "#00246b", text: 'F ' }, { text: `${COMPANY_DATA.fax}\n` },
                                { text: `${COMPANY_DATA.email}` }
                            ]
                        }
                    ]
                };
            }
            return null;
        };
    }
}