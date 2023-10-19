// Copied from generator, do not edit in src
export const KNOWN_DATATYPES = [
    'void', 'uint7_t', 'uint8_t', 'uint14_t', 'uint16_t', 'uint21_t', 'uint32_t'
] as const;
type DataTypeTuple = typeof KNOWN_DATATYPES;
export type DataType = DataTypeTuple[number];
export function isDataType(value: string): value is DataType {
    return KNOWN_DATATYPES.includes(value as DataType)
}