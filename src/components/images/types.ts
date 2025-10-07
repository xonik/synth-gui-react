export type IconProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    className?: string;
    centered?: boolean;
}

export type IconBaseProps = IconProps & {
    path: string
}

export type WaveformIconType = (props: IconProps) => React.ReactNode