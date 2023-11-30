import { toNumber } from 'lodash'

const bom = [
    "Comment,Designator,Footprint,LCSC Part #",
    "0.33uF,C13 C15,C0603,C1615",
    "5n5F,C1 C5,C0402,C1538",
    "0n2nF,C1 C5,C0402,C1538",
    "6.9nF,C1 C5,C0402,C1538",
    "2k2,R9 R10 R11 R12 R26 R27 R28 R29,R0402,C25768",
    "33k,R1 R2 R3 R4 R18 R19 R20 R21,R0402,C25779",
    "78L09F,IC6,SOT89,C880736",
    "100,R13 R30,R0402,C25076",
    "100nF,C2 C3 C4 C6 C7 C9 C10 C11 C12 C16 C17,C0402,C307331",
    "TL072,IC1 IC2 IC3 IC4 IC30,TSSOP8J,C2652280",
]

// "Description,Type,Footprint,LCSC Part #,Rotationfix",
const lcscParts = [
    "2.2k,resistor,R0402,C25768,0",
    "1k,resistor,R0603,C21190,0",
    "1.8k,resistor,R0603,C4177,0",
    "3.9k,resistor,R0603,C23018,0",
    "4CH-MIXER-3364-2,other,XM8-4CH-MIXER-3364-V,,0",
    "5.6k,resistor,R0603,C23189,0",
    "10k,resistor,R0603,C25804,0",
    "12k,resistor,R0603,C22790,0",
    "18k,resistor,R0603,C25810,0",
    "22k,resistor,R0603,C31850,0",
    "27k,resistor,R0603,C22967,0",
    "33k,resistor,R0603,C4216,0",
    "47k,resistor,R0603,C25819,0",
    "49.9k,resistor,R0603,C23184,0",
    "51k,resistor,R0603,C23196,0",
    "56k,resistor,R0603,C23206,0",
    "68k,resistor,R0603,C23231,0",
    "75k,resistor,R0603,C23242,0",
    "82k,resistor,R0603,C23254,0",
    "100k,resistor,R0603,C25803,0",
    "120k,resistor,R0603,C25808,0",
    "510R,resistor,R0603,,0",
    "10u,capacitor,E2,5-5,,0",
    "22p,capacitor,C0603,C1653,0",
    "33p,capacitor,C0603,C1663,0",
    "100n,capacitor,C0603,C14663,0",
    "100p,capacitor,C0603,C14858,0",
    "DG408DJ,other,DIL16,,0",
    "DG413-SPDT-SPST-J,other,DIL16,,0",
    "SVF-CELL-V1.0V,other,XM8-SVF-CELL-V1.0V,,0",
    "SVF-CV-V1.1,other,XM8-SVF-CV-V1.1V,,0",
    "TL072JD,other,SO08,,0",

].map((line) => {
    const parts = line.split(',')
    return {
        value: parts[0],
        type: parts[1],
        footprint: parts[2],
        lcscPart: parts[3],
        rotation: parts[4],
    }
})

type LibPart = {
    value: string
    footprint: string
    lcscPart: string
    type: PartType
    rotation: 0
}

type Part = {
    value: string
    ids: string[]
    footprint: string
    lcscPart?: string
    type: PartType
    line: string
}

type PartType = 'resistor' | 'capacitor' | 'other'

const parts: Part[] = []

const footprintToTypeMap = {
    'R0402': 'resistor',
    'R0603': 'resistor',
    'R0805': 'resistor',
    'C0402': 'resistor',
    'C0603': 'resistor',
    'C0805': 'resistor',
}

// Maps all variations of a footprint to a single version
const unifiedFootprintMap = {
    'TSSOP8J': 'TSSOP8',
    'SO08J': 'SO08',
    'DIL16J': 'DIL16J',
}

function getLcscPart(value: string, footprint: string, type: PartType) {
    return lcscParts.find((libPart) => value === libPart.value &&
        type === libPart.type
        && footprint === libPart.footprint
    )
}

function getLowerUnit(unit: string, type: PartType) {
    if (unit === 'M') return 'k'
    if (unit === 'k') return type === 'resistor' ? 'R' : 'C'
    if (unit === 'R') return 'm'
    if (unit === 'C') return 'm'
    if (unit === 'm') return 'u'
    if (unit === 'u') return 'n'
    if (unit === 'n') return 'p'
    if (unit === 'p') return 'f'
    return undefined
}

function getTypeFromFootprint(footprint: string): PartType {
    return footprintToTypeMap[footprint] || 'other'
}

function getTypeFromDesignator(designator: string): PartType {
    if (designator.match(/^R[0-9]+$/)) {
        return 'resistor'
    }
    if (designator.match(/^C[0-9]+$/)) {
        return 'capacitor'
    }
    return 'other'
}

function getUnifiedFootprint(footprint: string) {
    return unifiedFootprintMap[footprint] || footprint
}

// Formats resistor and capacitor values in a standard way
function getUnifiedValue(value: string, type: PartType) {
    if (type === 'resistor' || type === 'capacitor') {
        let newVal = value
        if (newVal.endsWith('F')) {
            newVal = newVal.substring(0, newVal.length - 1)
        }
        const usesLetterAsFractionalDivider = /([0-9]+)([a-zA-Z])([0-9+])/
        const withFraction = value.match(usesLetterAsFractionalDivider)
        if (withFraction) {
            newVal = `${withFraction[1]}.${withFraction[3]}${withFraction[2]}`
        }

        const twoEndLetters = newVal.match(/[a-zA-Z]{2}$/)
        if (twoEndLetters) {
            newVal = `${value.substring(0, value.length - 1)}`
        }

        const fractional = newVal.match(/(0.[0-9]+)([a-zA-Z])$/)
        if (fractional) {
            const unit = fractional[2]
            const lowerUnit = getLowerUnit(unit, type)
            if (lowerUnit) {
                const num = Math.round(toNumber(fractional[1]) * 1000)
                newVal = `${num}${lowerUnit}`
            }
        }

        const subThousand = value.match(/^[0-9]+$/)
        if (subThousand) {
            if (type === 'resistor') {
                newVal = `${newVal}R`
            } else if (type === 'capacitor') {
                newVal = `${newVal}C`
            }
        }

        return newVal
    }
    return value
}

// Comment,Designator,Footprint,LCSC Part #
function parseBomLine(line: string) {
    const [valueString, idString, footprintString, lscsPartString] = line.split(',').map((field) => field.trim())
    if (valueString === 'Comment') {
        return
    }
    const footprint = getUnifiedFootprint(footprintString)
    const ids = idString.split(' ')
    const type = getTypeFromDesignator(ids[0])
    const value = getUnifiedValue(valueString, type)
    const lcscPart = getLcscPart(value, footprint, type)?.lcscPart || ''
    if (lcscPart === '') {
        console.log(`Could not find part for "${line}"`)
    }
    parts.push({
        value,
        ids,
        footprint,
        type,
        lcscPart,
        line
    })
}

bom.map(parseBomLine)

console.log(parts.map((part) => `${part.value},${part.ids.join(' ')},${part.footprint},${part.lcscPart}`))

