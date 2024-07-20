export interface Sponsor {
    _id: string;
    sponsorId: string;
    sourceNumber: string;
    name: string;
    dateOfLastModification: string;
    workers: Worker[];
}

export interface Worker {
    workerName: string;
    residencyNumber: string;
    typeOfConsent: string;
    nationality: string;
    occupation: string;
    type: string;
    editMode?: boolean;
}
export interface visit {
    _id: string
    visaNo: string
    passportNo: string, // رقم جواز السفر
    code: string, //رقم السجل   
    applicationNo: string, // رقم الطلب
    name: string,
    birthDate: Date, // تاريخ الميلاد
    validFrom: Date, // صالحه اعتبارا من 
    validUntil: Date, // صالحه لغايه
    image: string,
    typeOfVisa: string, // نوع التأشيره
    durationOfStay: string, // مده الاقامه
    nationality: string, // الجنسيه  
    placeOfIssue: string, // مصدر التأشيره
    entryType: string, // عدد مرات الدخول
    purpose: string, //  الغرض
    barcodeImage: string,
}

