import fs from 'node:fs'
import path from 'node:path'

type Job = {
    source: string
    output: string
    prefix: string
    label: string
}

type ParsedWave = {
    name: string
    values: number[]
}

const DEFAULT_JOBS: Job[] = [
    { source: 'ppg.h', output: 'ppg.ts', prefix: 'ppgWave', label: 'PPG' },
    { source: 'prophetVs.h', output: 'prophetVs.ts', prefix: 'pvsWave', label: 'Prophet VS' },
]

const normalizeArgKey = (key: string) =>
    key
        .replace(/-([a-z])/g, (_, ch: string) => ch.toUpperCase())
        .replace(/^./, (ch) => ch.toLowerCase())

const parseArgs = (argv: string[]) => {
    const result: Record<string, string> = {}
    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i]
        if (!arg.startsWith('--')) continue
        const key = normalizeArgKey(arg.slice(2))
        const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : ''
        result[key] = value
        if (value) i += 1
    }
    return result
}

const parseWaveformArrays = (sourceText: string, prefix: string): ParsedWave[] => {
    const regex = /(?:inline|static)?\s*(?:const\s+)?(?:int16_t|int32_t|short|int)\s+([A-Za-z_]\w*)\s*\[[^\]]*\]\s*=\s*\{/g
    const matches: ParsedWave[] = []

    for (const match of sourceText.matchAll(regex)) {
        const name = match[1]
        if (!name.startsWith(prefix)) continue

        const start = sourceText.indexOf('{', match.index ?? 0)
        if (start === -1) continue

        let cursor = start + 1
        let depth = 1
        while (cursor < sourceText.length && depth > 0) {
            const char = sourceText[cursor]
            if (char === '{') depth += 1
            if (char === '}') depth -= 1
            cursor += 1
        }

        const body = sourceText.slice(start + 1, cursor - 1)
        const values = Array.from(body.matchAll(/[-+]?(?:0x[0-9A-Fa-f]+|\d+)/g), (m) => Number.parseInt(m[0], 0))
        if (values.length > 0) {
            matches.push({ name, values })
        }
    }

    matches.sort((a, b) => {
        const aIndex = Number.parseInt(a.name.slice(prefix.length), 10)
        const bIndex = Number.parseInt(b.name.slice(prefix.length), 10)
        return Number.isNaN(aIndex) || Number.isNaN(bIndex) ? a.name.localeCompare(b.name) : aIndex - bIndex
    })

    return matches
}

const formatArrayBlock = (values: number[], columns = 16) => {
    const chunks: string[] = []
    for (let i = 0; i < values.length; i += columns) {
        const chunk = values.slice(i, i + columns)
        chunks.push(`  ${chunk.join(', ')}`)
    }
    return chunks.join(',\n')
}

const renderTsFile = (sourceFile: string, prefix: string, arrays: ParsedWave[]) => {
    const lines = [
        `// Generated from ${sourceFile}. Do not edit by hand.`,
        '',
        ...arrays.flatMap(({ name, values }) => [
            `export const ${name}: number[] = [`,
            `${formatArrayBlock(values)},`,
            `]`,
            '',
        ]),
    ]

    return `${lines.join('\n')}`
}

const main = () => {
    const args = parseArgs(process.argv.slice(2))
    const sourceDir = args.from ?? args.input
    const outputDir = args.outDir ?? args.output ?? process.cwd()

    if (!sourceDir) {
        console.error('Usage: tsx utils/convertWavetableTables.ts --from <source-dir> [--out-dir <output-dir>]')
        console.error('Optional: --source ppg.h --prefix ppgWave --output ppg.ts')
        process.exit(1)
    }

    const jobs: Job[] = []

    if (args.source && args.output && args.prefix) {
        jobs.push({
            source: args.source,
            output: args.output,
            prefix: args.prefix,
            label: args.label ?? args.prefix,
        })
    } else {
        for (const job of DEFAULT_JOBS) {
            const sourcePath = path.join(sourceDir, job.source)
            if (!fs.existsSync(sourcePath)) {
                console.warn(`Skipping ${job.source}: file not found at ${sourcePath}`)
                continue
            }
            jobs.push({ ...job, source: sourcePath })
        }
    }

    if (jobs.length === 0) {
        console.error(`No source files found in ${sourceDir}`)
        process.exit(1)
    }

    const resolvedOutputDir = path.resolve(outputDir)
    fs.mkdirSync(resolvedOutputDir, { recursive: true })

    for (const job of jobs) {
        const sourcePath = path.resolve(job.source)
        const sourceText = fs.readFileSync(sourcePath, 'utf8')
        const arrays = parseWaveformArrays(sourceText, job.prefix)

        if (arrays.length === 0) {
            console.warn(`No arrays matched prefix '${job.prefix}' in ${sourcePath}`)
            continue
        }

        const outputPath = path.join(resolvedOutputDir, job.output)
        const fileBody = renderTsFile(path.basename(sourcePath), job.prefix, arrays)
        fs.writeFileSync(outputPath, `${fileBody}\n`, 'utf8')
        console.log(`Wrote ${arrays.length} arrays to ${outputPath}`)
    }
}

main()
