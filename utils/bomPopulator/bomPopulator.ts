import fs from 'fs'

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

// "Description,Type,Footprint,LCSC Part #,Rotationfix",
const lcscParts = [
    "2.2R,R,R0805,C17521,0,B",
    "2.2k,R,R0402,C25768,0,B",
    "1k,R,R0603,C21190,0,B",
    "1k,R,R0805,C17513,0,B",
    "1k,R,R0402,C11702,0,B",
    "1M,R,R0805,C17514,0,B",
    "1M,R,R0402,C327799,0,E",
    "1.2k,R,R0805,C17379,0,B",
    "1.2k,R,R0402,C413082,0,E",
    "1.2M,R,R0402,C43675,0,E",
    "1.5k,R,R0402,C25867,0,B",
    "1.5k,R,R0805,C4310,0,B",
    "1.5M,R,R0805,C26110,0,E",
    "1.68k,R,R0402,C25870,0,E",
    "1.8k,R,R0603,C4177,0,B",
    "2.7k,R,R0805,C17530,0,B",
    "2.7k,R,R0402,C416505,0,E",
    "3k,R,R0402,C278590,0,E",
    "4.7k,R,R0402,C25900,0,B",
    "3.9k,R,R0603,C23018,0,B",
    "5.1k,R,R0805,C27834,0,B",
    "5.6k,R,R0603,C23189,0,B",
    "5.6k,R,R0402,C25908,0,E",
    "5.9k,R,R0805,C17730,0,E",
    "6.8k,R,R0805,C17772,0,B",
    "6.8k,R,R0402,C323629,0,E",
    "8.2k,R,R0402,C25946,0,E",
    "9.1k,R,R0805,C17855,0,E",
    "10k,R,R0603,C25804,0,B",
    "10k,R,R0402,C25744,0,B",
    "10k,R,R0805,C17414,0,B",
    "11k,R,R0402,C25749,0,E",
    "12k,R,R0402,C25752,0,B",
    "12k,R,R0603,C22790,0,B",
    "12k,R,R0805,C17444,0,B",
    "15k,R,R0402,C25756,0,B",
    "15k,R,R0805,C17475,0,B",
    "18k,R,R0603,C25810,0,B",
    "20k,R,R0402,C25765,0,B",
    "20k,R,R0805,C4328,0,B",
    "22k,R,R0603,C31850,0,B",
    "22k,R,R0402,C25768,0,B",
    "22k,R,R0805,C17560,0,B",
    "25k,R,R0402,C25874,0,E",
    "27k,R,R0603,C22967,0,B",
    "27k,R,R0805,C17593,0,B",
    "33k,R,R0603,C4216,0,B",
    "33k,R,R0402,C25779,0,B",
    "47k,R,R0603,C25819,0,B",
    "47k,R,R0402,C25792,0,B",
    "47k,R,R0805,C17713,0,B",
    "49.9k,R,R0603,C23184,0,B",
    "50k,R,R0805,C63865,0,E",
    "50k,R,R0402,C25897,0,E",
    "51k,R,R0603,C23196,0,B",
    "51R,R,R0805,C17738,0,B",
    "56k,R,R0603,C23206,0,B",
    "56k,R,R0805,C17756,0,E",
    "68k,R,R0402,C36871,0,E",
    "68k,R,R0603,C23231,0,B",
    "68k,R,R0805,C17801,0,B",
    "75k,R,R0603,C23242,0,B",
    "75k,R,R0402,C3016015,0,E",
    "82k,R,R0603,C23254,0,B",
    "82k,R,R0805,C17840,0,E",
    "100R,R,R0402,C25076,0,B",
    "100R,R,R0603,C22775,0,B",
    "100R,R,R0805,C17408,0,B",
    "100k,R,R0402,C25741,0,B",
    "100k,R,R0603,C25803,0,B",
    "100k,R,R0805,C17407,0,E",
    "105k,R,R0402,C102762,0,E",
    "120k,R,R0603,C25808,0,B",
    "120k,R,R0805,C17436,0,E",
    "150k,R,R0805,C17470,0,B",
    "180k,R,R0805,C17501,0,E",
    "180k,R,R0402,C323674,0,E",
    "200k,R,R0805,C17539,0,B",
    "200R,R,R0805,C17540,0,B",
    "200k,R,S64W,C118942,90,E",
    "220k,R,R0402,C25767,0,E",
    "270k,R,R0805,C17589,0,E",
    "300k,R,R0402,C413115,0,E",
    "390k,R,R0402,C25557,0,E",
    "470R,R,R0603,C23179,0,B",
    "510R,R,R0603,C23193,0,B",
    "510R,R,R0402,C25123,0,B",
    "560R,R,R0402,C25172,0,E",
    "560R,R,R0805,C28636,0,B",
    "1.5n,C,C0603,C1595,0,B", //X7R
    "2.2n,C,C0402,C2987940,0,E", //C0G
    "3.3n,C,C0402,C1518207,0,E", //C0G
    "5n,C,C0402,C1538,0,B", //X7R 4.7n
    "5p,C,C0402,C1569,0,E", //C0G 4.7p
    "6p,C,C0805,C67560,0,E", //C0G
    "10p,C,C0805,C1785,0,B", //C0G
    "10n,C,C0603,C76710,0,E", //C0G
    "10n,C,C0402,C3855387,0,E", //C0G
    "10u,C,E2-5,C2960200,0,E",
    "10u,O,CAPAE660X610N,C134805,0,E",
    "22p,C,C0603,C1653,0,B", //C0G
    "22n,C,C0805,C1729,0,B", //X7R
    "22n,C,C0402,C5137627,0,E", //X7R
    "33p,C,C0603,C1663,0,B", //C0G
    "33p,C,C0402,C1562,0,B", //C0G
    "47p,C,C0402,C1567,0,B", //C0G
    "100n,C,C0603,C14663,0,B", // X7R
    "100n,C,C0402,C307331,0,B", // X7R
    "100p,C,C0603,C14858,0,B", //C0G
    "100u 25V,O,CAPAE660X610N,C176675,0,E",
    "100u 25V,C,E2-5,C47873,0,E",
    "220u,O,CAPAE660X610N,C250010,0,E", //NB: Bare 6.3V!
    "220n,C,C0402,C2992619,0,E", //X7R
    "330n,C,C0603,C1615,0,E", //X7R
    "330p,C,C0603,C1664,0,B", //C0G
    "390p,C,C0603,C84719,0,E", //X7R
    "470p,C,C0603,C27694,0,E", //C0G
    "470n,C,C0402,C437527,0,E", //X7R
    "560p,C,C0603,C55393,0,E", //C0G
    "680p,C,C0603,C30816,0,E", //C0G
    "DG408DJ,O,DIL16,C72130,0,E",
    "DG408D-JD,O,DIL16,C72130,0,E",
    "DG413-SPDT-SPST-J,O,DIL16,C72130,0,E",
    "DG412-J,O,DIL16,C72130,0,E",
    "78L09F,O,SOT89,C880736,0,E",
    "79L09F,O,SOT89,C2880153,0,E",
    "CH446Q,O,LQFP-44-J,C109471,0,E",
    "AS3364D,O,DIL16,C72130,0,E",
    "CON8,O,CON8,C706871,0,E", // 8p single angled gold
    "CON16,O,CON16,C2894996,0,E", // 32p dual row angled
    "TL082,O,TSSOP8,C85346,0,E",
    "TL072JT,O,TSSOP8,C90748,90,E",
    "TL074JT,O,TSSOP14,C2652279,0,E",
    "TL072,O,TSSOP8,C90748,90,E",
    "TL072JD,O,SO08,C6961,0,B",
    "TL072,O,SO08,C6961,0,B",
    "TL074D,O,SO14,C6963,0,E",
    "MC1496DR2G,O,SO14,C7295,90,E",
    "MA06-1JC,O,MA06-1J,C6332199,0,E", // 6p single straight
    "MA07-1JP,O,SIP-PIN07-1J,C376125,0,E", // 7p single angled
    "MA07-1JN,O,SIP-PIN07-1J,C376125,0,E", // 7p single angled
    "MA07-1JN,O,SIP-PIN07-REV-1J,C376125,0,E", // 7p single angled
    "MA07-1JN,O,MA07N-1J,C376125,0,E", // 7p single angled
    "MA08-1JP,O,SIP-PIN08-1J,C492416,0,E", // 8p single angled
    "SIP-PIN08-1J,O,SIP-PIN08-1J,C492416,0,E", // 8p single angled
    "SIP-PIN09-1J,O,SIP-PIN09-1J,C2894951,0,E", // 9p single angled
    "MA11-1JP,O,SIP-PIN11-1J,C725903,0,E", // 11p single angled
    "MA15-1JP,O,SIP-PIN15-1J,C247916,0,E", // 15p single angled
    "1N4148,O,SOD323J,C2128,0,B",
    "1N4148SOD323,O,SOD323J,C2128,0,B",
    "1N41480805,O,D0805,C2128,0,B",
    "2n3904,O,SOT23-BEC,C20526,0,B",
    "4013D,O,SO14,C347580,0,E",
    "MC1496DR2G,O,SOIC127P600X175-14N,C7295,0,E",
    "BC847DS,O,SOT457,C549489,0,E", // Finnes BC847BS
    "BC847BS,O,SOT363,C5380687,0,E",
    "BC857BS,O,SOT363,C8654,-90,E",
    "DG403CSL,O,SO16-NARROW-J,C145284,0,E",
    "LM13700SL,O,SO16-NARROW-J,C174050,0,E",
    "MMBT3906,O,SOT23-BEC,C2143,90,E",
    "MMBT3906LT1SMD,O,SOT23-BEC,C2143,90,E",
    "MCP9700TT,O,SOT23J,C127949,90,E",
    "DAC8565,O,TSSOP16,C69596,0,E",
    "PCA9539PW,O,TSSOP24,C2687996,0,E",
    "4CH-MIXER-3364-2,O,XM8-4CH-MIXER-3364-V,C124407,0,E",
    "SVF-CELL-V1.0V,O,XM8-SVF-CELL-V1.XV,C2932672,0,E", // 7p x 3
    "SVF-CELL-V1.1V,O,XM8-SVF-CELL-V1.XV,C2932672,0,E",
    "SVF-CV-V1.1,O,XM8-SVF-CV-V1.1V,C2932674,0,E", // 11p
    "CONN-IDC-10PA,O,CONN-IDC10P-A,C132437,0,E",
    "WJ300V-5.0-3P,O,WJ300V-5.0-3P,C8483,0,E",
].map((line): LibPart => {
    const parts = line.split(',')
    return {
        value: parts[0],
        type: getPartType(parts[1]),
        footprint: parts[2],
        id: parts[3],
        rotation: Number.parseInt(parts[4]),
        extended: parts[5] === 'E',
    }
})

type LibPart = {
    value: string
    footprint: string
    id: string
    type: PartType
    rotation: number
    extended: boolean
}

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
    'TSSOP14J': 'TSSOP14',
    'TSSOP24J': 'TSSOP24',
    'SO08J': 'SO08',
    'LQFP-44': 'LQFP-44-J',
    'DIL16J': 'DIL16',
    'D0805-J': 'D0805',
    'C0402-J': 'C0402',
    'C0603K': 'C0603',
    'SOT457J': 'SOT457',
    'SOT363J': 'SOT363',
    'SO14J': 'SO14',
    'SOIC127P600X175-14N': 'SO14',
}

function getPartType(shortType: string): PartType {
    if (shortType === 'R') return 'resistor'
    if (shortType === 'C') return 'capacitor'
    return 'other'
}

function getLcscPart(value: string, footprint: string, type: PartType): LibPart | undefined {
    return lcscParts.find((libPart) => {
            const found = value === libPart.value &&
                type === libPart.type
                && footprint === libPart.footprint
            //console.log(value, footprint, type, libPart, found)
            return found
        }
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

const cplEntries: CplEntry[] = []

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

const multiParts = {
    'SVF-CELL-V1.1V': [{ x: -17.78, y: 0 }, { x: 17.78, y: 0 }]
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

function addMultiParts(parts: Part[], cplEntries: CplEntry[]) {
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        // @ts-ignore
        const multiPart = multiParts[part.value]
        if (multiPart) {
            console.log('fixing multipart', part)
            part.ids.forEach((id) => {
                const cplEntry = cplEntries.find((entry) => entry.designator === id)
                if (cplEntry) {
                    const cplPos: Point = { x: cplEntry.midX, y: cplEntry.midY }
                    multiPart.forEach((newPartPos: Point, index: number) => {
                        const newPartPlace = placeMultiPart(cplPos, cplEntry.rotation, newPartPos)
                        const newPartDesignator = `${cplEntry.designator}-${index}`
                        cplEntries.push({
                            ...cplEntry,
                            designator: newPartDesignator,
                            midX: newPartPlace.x,
                            midY: newPartPlace.y
                        })
                        part.ids.push(newPartDesignator)
                    })
                }
            })
        }
    }
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

bom.split('\n').map(parseBomLine)

cpl.split('\n').map(parseCplLine)

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

addMultiParts(parts, cplEntries)

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
    console.log('Extended parts:')
    extededParts.forEach((part) => console.log(`${part.ids.length} - ${part.line}${part.lcscPart?.id}`))
}