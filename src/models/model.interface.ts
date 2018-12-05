export interface Credentials {
    email: string;  
    password: string;
}

export interface StudentModel {
    StudentModelID: string;
    strSchoolName: string;
    strAdmissionNo: string;
    strAcNo: string;
    strStudentName: string;
    strFatherName: string;
    strMotherName: string;
    strClass: string;
    strSex: string;
    numMobileNoForSms: string;
    SectionModelid: string;
}

export interface LedgerModel {
    LedgerSumaryModelID: string;
    TotalDue: string;
    TotalPaid: string;
    TotalBalance: string;
    StudentModelID: string;
}

export interface LedgerDetailModel {
    LedgerDetailModelID: string;
    strPeriod: string;
    numTotalDue: string;
    numTotalPaid: string;
    numTotalBalance: string;
    StudentModelID: string;
}

export interface AcademicModel {
    AcademicModelID: string;
    TermModelid: Number;
    strSubject: string;
    strMarks: string;
    StudentModelID: string;
}

export interface NotificationScheduleModel {
    NotificationScheduleModelid: string;
    notificationsentdate: Date;
    classname: string;
    isPublished: boolean;
    remarks: string;
    BlogModelid: string;
    BlogDetail: BlogModel;
}

export interface BlogModel {
    BlogModelid: string;
    title: string;
    description: string;
    imagepath: string;
    filetype: string;
    isPublished: boolean;
    remarks: string;
    BlogType: BlogTypeModel;
    SubjectModelid: string;
}

export interface BlogTypeModel {
    BlogTypeModelid: string;
    BlogTypeName: string;
    isPublished: boolean;
    remarks: string;
}

export interface FeedbackModel {
    FeedbackType: string;
    FeedbackDate: string;
    FeedbackMessage: string;
    StudentModelID: string;
}

export interface OnlinePaymentModel {
    StudentModelID: string;
    feeamount: number;
    remarks: string;
}






