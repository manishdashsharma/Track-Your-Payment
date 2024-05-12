const paymentStatus = {
    PROCESSING : "PROCESSING",
    FAILED : "FAILED",
    PAID : "PAID",
    UNPAID : "UNPAID",
}

const paymentMethod = {
    CREDIT_CARD : "CREDIT_CARD",
    DEBIT_CARD : "DEBIT_CARD",
    PAYPAL : "PAYPAL",
    WALLET : "WALLET",
    BANK_TRANSFER : "BANK_TRANSFER",
    CASH : "CASH",
    UPI: "UPI",
    OTHERS : "OTHERS"
}

const paymentType = {
    DAILY : "DAILY",
    WEEKLY : "WEEKLY",
    MONTHLY : "MONTHLY",
    YEARLY : "YEARLY",
    ONCE : "ONCE"
}

const currency = {
    INR : "INR",
    DOLLER : "DOLLER",
    POUND : "POUND"
}
export { 
    paymentStatus,
    paymentType,
    paymentMethod,
    currency
}