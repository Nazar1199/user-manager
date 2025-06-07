import type { UserRecordType } from "./UserRecordType";

export interface User {
    id: number;
    labels: string[];
    login: string;
    password?: string;
    recordType: UserRecordType;
}