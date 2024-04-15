function parsePhoneNumber(phone) {
    let defaultCountryCode = "+45";
    let countryCodeReg = /(\+\d+(?=\)))/;
    let replaceReg = /(\(\+\d+\))/;
    let countryCode = countryCodeReg.test(phone) ? countryCodeReg.exec(phone)[0] : "";

    if (!countryCode) {
        let phoneWithCCReg = /^(\+\d+)/;

        if (!phoneWithCCReg.test(phone)) {
            countryCode = defaultCountryCode;
        }
    }

    if (typeof phone === "number") {
        return countryCode + phone.toString().replace(replaceReg, "").replace(/\s/g, "");
    }

    if (typeof phone === "string" && phone.length) {
        phone = phone.replace(replaceReg, "").replace(/\s/g, "");

        return countryCode + phone;
    }

    return null;
}