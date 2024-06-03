export type PartType = 'resistor' | 'capacitor' | 'other'

export type LibPart = {
    value: string
    footprint: string
    id: string
    type: PartType
    rotation: number
    extended: boolean
}

export type MultiPart = {
    // offsets from part origo
    x: number,
    y: number,
    // lcsc part num
    id: string,
}

// "Description,Type,Footprint,LCSC Part #,Rotationfix",
export const lcscParts = [
    "2.2R,R,R0805,C17521,0,B",
    "2.2k,R,R0402,C25768,0,B",
    "1k,R,R0603,C21190,0,B",
    "1k,R,R0805,C17513,0,B",
    "1k,R,R0402,C11702,0,B",
    "1M,R,R0805,C17514,0,B",
    "1M,R,R0603,C22935,0,B",
    "1M,R,R0402,C327799,0,E",
    "1.2k,R,R0805,C17379,0,B",
    "1.2k,R,R0603,C22765,0,B",
    "1.2k,R,R0402,C413082,0,E",
    "1.2M,R,R0402,C43675,0,E",
    "1.2M,R,R0603,C325657,0,E",
    "1.5k,R,R0603,C22843,0,B",
    "1.5k,R,R0402,C25867,0,B",
    "1.5k,R,R0805,C4310,0,B",
    "1.5M,R,R0805,C26110,0,E",
    "1.5M,R,R0402,C138034,0,E",
    "1.68k,R,R0402,C25870,0,E",
    "1.8k,R,R0603,C4177,0,B",
    "1.8k,R,R0402,C25871,0,E",
    "2.7k,R,R0805,C17530,0,B",
    "2.7k,R,R0603,C13167,0,B",
    "2.7k,R,R0402,C416505,0,E",
    "3k,R,R0402,C278590,0,E",
    "4.7k,R,R0402,C25900,0,B",
    "4.7k,R,R0603,C23162,0,B",
    "4.99k,R,R0603,C23046,0,B",
    "3.3k,R,R0402,C25890,0,B",
    "3.3k,R,R0603,C22978,0,B",
    "3.9k,R,R0603,C23018,0,B",
    "5.1k,R,R0805,C27834,0,B",
    "5.1k,R,R0603,C23186,0,B",
    "5.6k,R,R0603,C23189,0,B",
    "5.6k,R,R0402,C25908,0,E",
    "5.9k,R,R0805,C17730,0,E",
    "5.9k,R,R0603,C403290,0,E",
    "6.8k,R,R0805,C17772,0,B",
    "6.8k,R,R0603,C23212,0,B",
    "6.8k,R,R0402,C323629,0,E",
    "8.2k,R,R0402,C25946,0,E",
    "8.2k,R,R0603,C25981,0,B",
    "9.1k,R,R0805,C17855,0,E",
    "10k,R,R0603,C25804,0,B",
    "10k,R,R0402,C25744,0,B",
    "10k,R,R0805,C17414,0,B",
    "10k,R,S64W,C330445,0,E",
    "11k,R,R0402,C25749,0,E",
    "12k,R,R0402,C25752,0,B",
    "12k,R,R0603,C22790,0,B",
    "12k,R,R0805,C17444,0,B",
    "15k,R,R0402,C25756,0,B",
    "15k,R,R0603,C22809,0,B",
    "15k,R,R0805,C17475,0,B",
    "18k,R,R0603,C25810,0,B",
    "20k,R,R0402,C25765,0,B",
    "20k,R,R0603,C4184,0,B",
    "20k,R,R0805,C4328,0,B",
    "22k,R,R0603,C31850,0,B",
    "22k,R,R0402,C25768,0,B",
    "22k,R,R0805,C17560,0,B",
    "24k,R,R0402,C5141071,0,E",
    "24k,R,R0603,C23352,0,B",
    "25k,R,R0402,C25874,0,E",
    "25k,R,R0603,C2828637,0,E",
    "27k,R,R0603,C22967,0,B",
    "27k,R,R0805,C17593,0,B", // Finnes basic 24k i andre str.
    "30k,R,R0603,C22984,0,B",
    "30k,R,R0402,C352437,0,E",
    "33k,R,R0603,C4216,0,B",
    "33k,R,R0402,C25779,0,B",
    "39k,R,R0603,C23153,0,B",
    "47k,R,R0603,C25819,0,B",
    "47k,R,R0402,C25792,0,B",
    "47k,R,R0805,C17713,0,B",
    "49.9k,R,R0603,C23184,0,B",
    "50k,R,R0805,C63865,0,E",
    "50k,R,R0603,C23184,0,B", //49.9k
    "50k,R,R0402,C25897,0,E",
    "51k,R,R0603,C23196,0,B",
    "51R,R,R0603,C23197,0,B",
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
    "105k,R,R0603,C141685,0,B",
    "120k,R,R0603,C25808,0,B",
    "120k,R,R0805,C17436,0,E",
    "135k,R,R0603,C2984324,0,E",
    "150k,R,R0805,C17470,0,B",
    "150k,R,R0603,C22807,0,B",
    "180k,R,R0805,C17501,0,E",
    "180k,R,R0402,C323674,0,E",
    "200k,R,R0805,C17539,0,B",
    "200k,R,R0603,C25811,0,B",
    "200R,R,R0603,C8218,0,B",
    "200R,R,R0805,C17540,0,B",
    "200k,R,S64W,C118942,90,E",
    "200k,R,RTRIM3296W,C118942,0,E",
    "220R,R,R0603,C22962,0,B",
    "220k,R,R0402,C25767,0,E",
    "220k,R,R0603,C22961,0,B",
    "270k,R,R0805,C17589,0,E",
    "270k,R,R0402,C416506,0,E",
    "300k,R,R0402,C413021,0,E",
    "330k,R,R0603,C23137,0,B",
    "390k,R,R0402,C25557,0,E",
    "470R,R,R0603,C23179,0,B",
    "470R,R,R0402,C25117,0,B",
    "470k,R,R0603,C23178,0,B",
    "500R,R,R0603,C137714,0,E",
    "510R,R,R0603,C23193,0,B",
    "510R,R,R0402,C25123,0,B",
    "560R,R,R0402,C25172,0,E",
    "560R,R,R0603,C23204,0,B",
    "560R,R,R0805,C28636,0,B",
    "820k,R,R0603,C23252,0,E",
    "1n,C,C0402,C1523,0,B", //X7R
    "1n,C,C0603,C507408,0,B", //C0G 1%
    "1u,C,C0402,C694272,0,B", //X5R
    "1u,C,C0603,C15849,0,B", //X5R
    "1.5n,C,C0603,C1595,0,B", //X7R
    "2.2n,C,C0402,C2987940,0,E", //C0G
    "3.3n,C,C0402,C1518207,0,E", //C0G
    "3p,C,C0603,C318663,0,E", //C0G
    "5n,C,C0402,C1538,0,B", //X7R 4.7n
    "5p,C,C0402,C1569,0,E", //C0G 4.7p
    "5p,C,C0603,C313086,0,E", //C0G 4.7p
    "6p,C,C0805,C67560,0,E", //C0G
    "6p,C,C0402,C437444,0,E", //C0G
    "10p,C,C0805,C1785,0,B", //C0G
    "10p,C,C0603,C1634,0,B", //C0G
    "10n,C,C0603,C76710,0,E", //C0G
    "10n,C,C0402,C3855387,0,E", //C0G
    "10u,C,C0603,C96446,0,B", //X5R, 25V
    "10u,C,E2-5,C2960200,0,E",
    "10u,O,CAPAE660X610N,C134805,0,E",
    "22p,C,C0603,C1653,0,B", //C0G
    "22n,C,C0805,C1729,0,B", //X7R
    "22n,C,C0402,C5137627,0,E", //X7R
    "22u,C,C0805,C45783,0,E", //X5R, 25V
    "30p,C,C0603,C1658,0,B", //C0G
    "33p,C,C0603,C1663,0,B", //C0G
    "33p,C,C0402,C1562,0,B", //C0G
    "47p,C,C0402,C1567,0,B", //C0G
    "47p,C,C0603,C1671,0,B", //C0G
    "47p,C,C0805,C14857,0,B", //C0G
    "47u,C,C1206,C403725,0,E", //X5R
    "68p,C,C0603,C1680,0,E", //C0G
    "100n,C,C0603,C14663,0,B", // X7R
    "100n,C,C0402,C307331,0,B", // X7R
    "100p,C,C0603,C14858,0,B", //C0G
    "100u 25V,O,CAPAE660X610N,C176675,0,E",
    "100u 25V,C,E2-5,C47873,0,E",
    "100uF/6.3V,C,C1206,C15008,0,E",
    "220u,O,CAPAE660X610N,C250010,0,E", //NB: Bare 6.3V!
    "220n,C,C0402,C16772,0,E", //X7R
    "220p,C,C0402,C3831616,0,E", //C0G
    "270p,C,C0402,C541426,0,E", //NP0
    "330n,C,C0603,C1615,0,E", //X7R
    "330p,C,C0603,C1664,0,B", //C0G
    "390p,C,C0603,C84719,0,E", //X7R
    "470p,C,C0603,C27694,0,E", //C0G
    "470n,C,C0402,C437527,0,E", //X7R
    "560p,C,C0603,C55393,0,E", //C0G
    "680p,C,C0603,C30816,0,E", //C0G
    "820p,C,C0603,C519567,0,E", //NP0
    "DG408DJ,O,DIL16,C72130,0,E",
    "DG408D-JD,O,DIL16,C72130,0,E",
    "DG413-J,O,DIL16,C72130,0,E",
    "DG413-SPDT-J,O,DIL16,C72130,0,E",
    "DG413-SPDT-SPST-J,O,DIL16,C72130,0,E",
    "DG412-J,O,DIL16,C72130,0,E",
    "DG419DJD,O,SO08,C6581,0,E",
    "78L09F,O,SOT89,C880736,0,E",
    "79L05F,O,SOT89, C2891834,90,E",
    "79L09F,O,SOT89,C2880153,0,E",
    "CH446Q,O,LQFP-44-J,C109471,0,E",
    "AS3364D,O,DIL16,C72130,0,E",
    "CEM3340J,O,DIL16,C72130,0,E",
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
    "MA03-2-127J,O,MA03-2-127J,C2935951,0,E",
    "MA06-1JC,O,MA06-1J,C6332199,0,E", // 6p single straight
    "MA06-1JC-ANGLED,O,MA06-1J,C7501293,0,E", // 6p single straight
    "MA07-1JC-ANGLED,O,MA07-1J,C225493,180,E", // 7p single angled
    "MA07-1JP,O,SIP-PIN07-1J,C376125,0,E", // 7p single angled
    "MA07-1JN,O,SIP-PIN07-1J,C376125,0,E", // 7p single angled
    "MA07-1JN,O,SIP-PIN07-REV-1J,C376125,0,E", // 7p single angled
    "MA07-1JN,O,MA07N-1J,C376125,0,E", // 7p single angled
    "MA08-1JP,O,SIP-PIN08-1J,C492416,0,E", // 8p single angled
    "SIP-PIN08-1J,O,SIP-PIN08-1J,C492416,0,E", // 8p single angled
    "MA09-1JC-ANGLED,O,MA09-1J,C492417,0,E",
    "SIP-PIN09-1J,O,SIP-PIN09-1J,C2894951,0,E", // 9p single angled
    "MA11-1JP,O,SIP-PIN11-1J,C725903,0,E", // 11p single angled
    "MA15-1JP,O,SIP-PIN15-1J,C247916,0,E", // 15p single angled
    "MA15-1JC-ANGLED,O,MA15-1J,C247916,0,E",
    "MA15-1JN-ANGLED,O,MA15N-1J,C247916,0,E",
    "MA16-1JP-FEMALE-ANGLED,O,SIP-PIN16-1J,C2897398,0,E",
    "MA16-1JP,O,SIP-PIN16-1J,C7501270,0,E",
    "MA16-1JP-ANGLED,O,SIP-PIN16-1J,C2894958,0,E",
    "MA16-1JN,O,MA16N-1J,C7501270,0,E",
    "MA22N-1J,O,MA22N-1J,C725954,0,E",
    "1N4148,O,SOD323J,C2128,0,B",
    "1N4148SOD323,O,SOD323J,C2128,0,B",
    "1N41480805,O,D0805,C2128,0,B",
    "2n3904,O,SOT23-BEC,C20526,90,B",
    "4013D,O,SO14,C347580,0,E",
    "4013T,O,TSSOP14,C406860,0,E",
    "4043D,O,SO16,C40131,0,E",
    "MC1496DR2G,O,SOIC127P600X175-14N,C7295,0,E",
    "BC847DS,O,SOT457,C549489,0,E", // Finnes BC847BS
    "BC847BS,O,SOT363,C5380687,180,E",
    "BC857BS,O,SOT363,C8654,0,E",
    "DG403CSL,O,SO16-NARROW-J,C145284,0,E",
    "DG403C-JSL,O,SO16-NARROW-J,C145284,0,E",
    "LM13700SL,O,SO16-NARROW-J,C174050,0,E",
    "MMBT3906,O,SOT23-BEC,C2143,90,E",
    "MMBT3906LT1SMD,O,SOT23-BEC,C2143,90,E",
    "MCP9700TT,O,SOT23J,C127949,90,E",
    "ADS1115,O,MSOP10,C37593,0,E",
    "DAC8565,O,TSSOP16,C69596,0,E",
    "PCA9539PW,O,TSSOP24,C2687996,0,E",
    "LM311D,0,SO08,C12597,0,E",
    "LM311T,0,TSSOP8,C2876875,90,E", // Veldig få på lager
    "TCA9539PW,O,TSSOP24,C2687996,0,E", // PCA is cheaper. May reconsider and use real TCA instead.
    "4CH-MIXER-3364-2,O,XM8-4CH-MIXER-3364-V,C124407,0,E",
    "SVF-CELL-V1.0V,O,XM8-SVF-CELL-V1.XV,C2932672,0,E", // 7p x 3
    "SVF-CELL-V1.1V,O,XM8-SVF-CELL-V1.XV,MULTI,0,E",
    "SVF-CV-V1.1,O,XM8-SVF-CV-V1.1V,C2932674,0,E", // 11p
    "CONN-IDC-10PA,O,CONN-IDC10P-A,C132437,0,E",
    "WJ300V-5.0-3P,O,WJ300V-5.0-3P,C8483,0,E",
    "25k,O,RTRIM3296X_J,C111789,180,E",
    "500R,O,RTRIM3296X,C330441,0,E",
    "CHIP-LED0603,O,CHIP-LED0603,C2286,90,B",
    "2516-5,O,PAK100/2500-5-16,C146623,180,E",
    "WAVESHAPER-V2.2HR,O,XM8-WAVESHAPER-V2.2HR,C7499337,0,E",
    "MOOG-VCF-V1.2,O,XM8-MOOG-VCF-V1.2H-TOP,C66987,0,E",
    "RM-NOISE-DIST-V1.1,O,XM8-RM-NOISE-DIST-V1.1N,MULTI,0,E",
    "SVF-V2.0,O,XM8-SVF-V2.0R,C66987,0,E",
    "VCO-V2.0,O,XM8-CEM3340-V2.0,MULTI,0,E",
    "BUS-MIXER-V1.3,IC30,XM8-BUX-MIX-V1.3V,MULTI,0,E",
    "JUNO-VCF-V1.2BD,O,XM8-JUNO-VCF-V1.2H-BOTTOM-DUAL,C97095,180,E",
    "BITCRUSHER-V1.0,O,XM8-BITCRUSHER-V1.0,MULTI,0,E"
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

export const multiParts: Record<string, MultiPart[]> = {
    'SVF-CELL-V1.1V': [{ x: -17.78, y: 0, id: 'C2932672' }, { x: 17.78, y: 0, id: 'C2932672' }],
    'RM-NOISE-DIST-V1.1': [{ x: 0, y: -7.62, id: 'C7499326' }, { x: 0, y: 7.62, id: 'C7499326' }],
    'VCO-V2.0': [{ x: 0, y: -7.62, id: 'C7499326' }, { x: 0, y: 7.62, id: 'C7499326' }],
    'BUS-MIXER-V1.3': [{ x: -21.59, y: 0, id: 'C7499334' }, { x: 21.59, y: 0, id: 'C7499334' }],
    'BITCRUSHER-V1.0': [{ x: 0, y: -7.62, id: 'C52711' }, { x: 0, y: 7.62, id: 'C52711' }],
}

function getPartType(shortType: string): PartType {
    if (shortType === 'R') return 'resistor'
    if (shortType === 'C') return 'capacitor'
    return 'other'
}

export function getLcscPart(value: string, footprint: string, type: PartType): LibPart | undefined {
    return lcscParts.find((libPart) => {
            const found = value === libPart.value &&
                type === libPart.type
                && footprint === libPart.footprint
            //console.log(value, footprint, type, libPart, found)
            return found
        }
    )
}