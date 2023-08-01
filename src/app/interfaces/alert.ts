export interface InHouseAlert {
    type: 'NOTIFICATION' | 'CAUTION' | 'WARNING';
    message: string;
    duration?: number;
}
