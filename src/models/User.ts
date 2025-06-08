import type { UserRecordType } from "./UserRecordType";
import type { UserLabel } from "./UserLabel";

export interface User {
    id: number;
    labels: UserLabel[];
    login: string;
    password?: string;
    recordType: UserRecordType;
}