// Copied from generator, do not edit in src
export const KNOWN_DATATYPES = [
    'void', 'uint7_t', 'uint8_t', 'uint14_t', 'uint16_t', 'uint21_t', 'uint32_t'
] as const;
type DataTypeTuple = typeof KNOWN_DATATYPES;
export type DataType = DataTypeTuple[number];
export function isDataType(value: string): value is DataType {
    return KNOWN_DATATYPES.includes(value as DataType)
}

export type CvDefinition = {
    name: string
    channel: number
    description: string
}

export type EnumValue = {
    name: string,
    value: number | undefined,
    comment: string | undefined,
}

export type EnumValueWithTargets = EnumValue & {
    targets: string [],
    description: string,
}

export type EnumDef = {
    name: string,
    comment: string| undefined
    values: EnumValue[]
}

export type EnumDefWithTargets = Omit<EnumDef, 'values'> & {values: EnumValueWithTargets[]}