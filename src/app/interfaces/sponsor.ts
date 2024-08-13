

export interface Worker {
    workerName: string;
    residencyNumber: string;
    typeOfConsent: string;
    nationality: string;
    occupation: string;
    type: string;
    editMode?: boolean;
}

export interface Sponsor {
    _id: string
    sponsorId: string;
    sourceNumber: string;
    name: string;
    dateOfLastModification: string;
    workers: Worker[];
    searchCount: number;
    device: string;
}

export interface User {
    _id: string
    IdNumber: string;
    outgoingNumber: string;
    transactionNumber: string;
    userOccupation: string;
    userSerialNumber: string;
    name: string;
    releaseDate: string;
    image: string;
    dateBoking: string;
    WifeSerialNumber: string;
    wifeName: string;
    type: string;
    condition: string;
    nationality: string;
    occupationCategory: string;
    searchCountMerage: number;
    searchCountTransaction: number;
    deviceMerageSearch: string;
    deviceTransactionSearch: string;
}

export interface Visit {
    _id: string
    visaNo: string;
    passportNo: string;
    code: string;
    applicationNo: string;
    name: string;
    birthDate: string;
    validFrom: string;
    validUntil: string;
    image: string;
    typeOfVisa: string;
    durationOfStay: string;
    nationality: string;
    placeOfIssue: string;
    entryType: string;
    purpose: string;
    barcodeImage: string;
    searchCount: number;
    device: string;
}

