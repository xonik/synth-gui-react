export function rotateAround(point: [number, number], center: [number, number], angle: number): [number, number] {
    const radians = angle * (Math.PI / 180);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx = (cos * (point[0] - center[0])) - (sin * (point[1] - center[1])) + center[0];
    const ny = (sin * (point[0] - center[0])) + (cos * (point[1] - center[1])) + center[1];
    return [nx, ny];
}