import fs from 'fs'
import { getLcscPart, LibPart, MultiPart, multiParts, PartType } from './lcscParts'

const testBom = [
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
/*
JP6:
Could not find part for "MA16-1JN,U$3,MA16N-1J,"

Juno:
Could not find part for "230k,R22,R0603," // TODO: FINNES IKKE
Could not find part for "560R posistor,R18,R0805,"

Moog:
Could not find part for "1k tempco,R18,R0805,"
 */



type Part = {
    value: string
    ids: string[]
    footprint: string
    lcscPart?: LibPart
    type: PartType
    line: string
}

type CplEntry = {
    designator: string,
    midX: number,
    midY: number,
    layer: string,
    rotation: number
}


let parts: Part[] = []
let cplEntries: CplEntry[] = []

const footprintToTypeMap: Record<string, PartType> = {
    'R0402': 'resistor',
    'R0603': 'resistor',
    'R0805': 'resistor',
    'C0402': 'resistor',
    'C0603': 'resistor',
    'C0805': 'resistor',
}

// Maps all variations of a footprint to a single version
const unifiedFootprintMap: Record<string, string> = {
    'TSSOP8J': 'TSSOP8',
    'TSSOP14J': 'TSSOP14',
    'TSSOP24J': 'TSSOP24',
    'SO08J': 'SO08',
    'LQFP-44': 'LQFP-44-J',
    'DIL16J': 'DIL16',
    'D0805-J': 'D0805',
    'C0402-J': 'C0402',
    'C0603-J': 'C0603',
    'R0603-J': 'R0603',
    'C0603K': 'C0603',
    'SOT457J': 'SOT457',
    'SOT363J': 'SOT363',
    'SO14J': 'SO14',
    'SOIC127P600X175-14N': 'SO14',
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

function getTypeFromFootprint(footprint: string): PartType | undefined {
    return footprintToTypeMap[footprint]
}

function getTypeFromDesignator(designator: string): PartType | undefined {
    if (designator.match(/^R[0-9]+$/)) {
        return 'resistor'
    }
    if (designator.match(/^C[0-9]+$/)) {
        return 'capacitor'
    }
    return undefined
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
                const num = Math.round(Number.parseInt(fractional[1]) * 1000)
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
    if (line.trim() === '') return

    try {
        const [valueString, idString, footprintString, lscsPartString] = line.split(',').map((field) => field.trim())
        if (valueString === 'Comment') {
            return
        }
        if(valueString.endsWith('DNM')){
            console.log(`Removing "Do not mount" part ${idString}`)
            idString.split(' ').forEach((id) => {
                const cplEntry = cplEntries.find((entry) => entry.designator === id)
                if (cplEntry) {
                    // remove cplEntry as it has no corresponding part
                    console.log(`Removing CPL entry for ${id}`)
                    const index = cplEntries.indexOf(cplEntry)
                    cplEntries.splice(index, 1)
                }
            })
        }
        const footprint = getUnifiedFootprint(footprintString)
        const ids = idString?.split(' ') || []
        const type = getTypeFromDesignator(ids[0]) || getTypeFromFootprint(footprint) || 'other'
        const value = getUnifiedValue(valueString, type)
        const lcscPart = getLcscPart(value, footprint, type) || undefined
        if (lcscPart === undefined) {
            console.log(`Could not find part for "${line}"`)
        }
        if (lcscPart?.id === '') {
            console.log(`Found no part id for "${line}"`, lcscPart)
        }
        parts.push({
            value,
            ids,
            footprint,
            type,
            lcscPart,
            line
        })
    } catch (err) {
        console.log(`Failed to parse "${line}"`, err)
    }
}

function parseCplLine(line: string) {
    if (line.trim() === '') return

    try {
        const [designator, midX, midY, layer, rotation] = line.split(',').map((field) => field.trim())
        if (designator === 'Designator') {
            return
        }
        cplEntries.push({
            designator,
            midX: Number.parseFloat(midX),
            midY: Number.parseFloat(midY),
            layer,
            rotation: Number.parseInt(rotation)
        })
    } catch (err) {
        console.log(`Failed to parse "${line}"`, err)
    }
}


type Point = { x: number, y: number }

function cos(deg: number) {
    return Math.cos((deg * Math.PI) / 180)
}

function sin(deg: number) {
    return Math.sin((deg * Math.PI) / 180)
}

function sum(p1: Point, p2: Point) {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    }
}

function rotatePoint(point: Point, rotation: number): Point {
    return {
        x: Math.round(100 * (point.x * cos(rotation) - point.y * sin(rotation))) / 100,
        y: Math.round(100 * (point.y * cos(rotation) + point.x * sin(rotation))) / 100,
    }
}


function placeMultiPart(stemPos: Point, stemRotation: number, offset: Point): Point {
    if (stemRotation == 0) {
        return sum(stemPos, offset)
    } else {
        console.log('rorat', rotatePoint(offset, stemRotation))
        return sum(stemPos, rotatePoint(offset, stemRotation))
    }
}

function updateMultiParts() {
    const newParts: Part[] = []
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        // @ts-ignore
        console.log(`Looking for ${part.value}`)
        const multiPart = multiParts[part.value]
        if (multiPart) {
            const originalPartIds = part.ids;

            const newMultiParts: Record<string, string[]> = {}

            // remove existing part ids as they will be replaced with the ones from multipart
            part.ids = [];
            console.log('fixing multipart', part)

            originalPartIds.forEach((id) => {
                const cplEntry = cplEntries.find((entry) => entry.designator === id)
                if (cplEntry) {
                    // remove existing cplEntry as it will be replaced with the ones from multipart
                    const index = cplEntries.indexOf(cplEntry)
                    cplEntries.splice(index, 1)

                    const cplPos: Point = { x: cplEntry.midX, y: cplEntry.midY }
                    multiPart.forEach(({ x, y, id }: MultiPart, index: number) => {
                        const newPartPlace = placeMultiPart(cplPos, cplEntry.rotation, { x, y })
                        const newPartDesignator = `${cplEntry.designator}-${index}`
                        cplEntries.push({
                            ...cplEntry,
                            designator: newPartDesignator,
                            midX: newPartPlace.x,
                            midY: newPartPlace.y
                        })

                        if(!newMultiParts[id]){
                            newMultiParts[id] = []
                        }
                        newMultiParts[id].push(newPartDesignator)
                    })
                }
            })

            // generate new bom entries for the  multi part parts.
            Object.entries(newMultiParts).forEach(([lcscPartNum, designators], index) => {
                const value = `${part.value}_${index}`
                const footprint =`${part.value}_${index}`
                newParts.push({
                    value,
                    ids: designators,
                    footprint,
                    lcscPart: {
                        value,
                        footprint,
                        id: lcscPartNum,
                        type: part.type,
                        rotation: 0,
                        extended: true // TODO: Not correct
                    },
                    type: part.type,
                    line: '' + part.line,
                })
            })
        }
    }
    parts = [...parts.filter((part => part.ids.length > 0)), ...newParts]
}

const writeToFile = (path: string, contents: string) => {
    console.log(`writing ${contents.length} bytes to ${path}`)
    fs.writeFileSync(path, contents)
}

const bomPath = process.argv[2]
const cplPath = bomPath.replace('_bom', '_cpl')

const newBomPath = bomPath.replace('.csv', '_populated.csv')
const newCplPath = cplPath.replace('.csv', '_populated.csv')

const bom = fs.readFileSync(bomPath, { encoding: 'utf8', flag: 'r' })
const cpl = fs.readFileSync(cplPath, { encoding: 'utf8', flag: 'r' })

cpl.split('\n').map(parseCplLine)

bom.split('\n').map(parseBomLine)


// Correct rotations
parts.forEach((part) => {
    part.ids.forEach((designator) => {
        const entryToRotate = cplEntries.find((cplEntry) => cplEntry.designator === designator)
        if (entryToRotate && part.lcscPart && part.lcscPart.rotation !== 0) {
            const newRotation = entryToRotate.rotation - part.lcscPart.rotation
            console.log(`Rotating ${entryToRotate.designator} ${part.lcscPart.rotation} from ${entryToRotate.rotation} to ${newRotation}`)
            entryToRotate.rotation = newRotation
        }
    })
})

updateMultiParts()

const bomNewLines = parts.map((part) => `${part.value},${part.ids.join(' ')},${part.footprint},${part.lcscPart?.id}`)
const bomFileContents = `Comment,Designator,Footprint,LCSC Part #\n${bomNewLines.join('\n')}`
fs.writeFileSync(newBomPath, bomFileContents)
console.log('BOM generated')

const cplNewLines = cplEntries.map((cplEntry) =>
    `${cplEntry.designator},${Math.round(100 * cplEntry.midX) / 100},${Math.round(100 * cplEntry.midY) / 100},${cplEntry.layer},${cplEntry.rotation}`)
const cplFileContents = `Designator,Mid X,Mid Y,Layer,Rotation\n${cplNewLines.join('\n')}`
fs.writeFileSync(newCplPath, cplFileContents)
console.log('\nCPL generated')

const extededParts = parts.filter((part) => part.lcscPart?.extended)
if(extededParts){
    // TODO: This is inaccurate when it comes to multiParts
    console.log('Extended parts:')
    extededParts.forEach((part) => console.log(`${part.ids.length} - ${part.line}${part.lcscPart?.id}`))
}