import { type ShallowRef, onMounted } from "vue";
import type { EnumType } from "typescript";
import type { ITwoDCoords } from "../models/Interfaces";

var classUniqnessCounter: number = 0
export function createCssClass(content: string): string {
    const style = document.createElement('style');
    const className = `my-dynamic-class-${classUniqnessCounter++}`
    style.textContent = `.${className} { ${content} }`;
    document.head.appendChild(style); // adds to css

    return className
}

export function onScrollIntoView(elementRef: Readonly<ShallowRef<HTMLDivElement>>, classToAdd: string) {
    onMounted(() => {
        console.log(elementRef.value);
        console.log(classToAdd);
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                observer.disconnect() // Remove if you only want it to play once
                elementRef.value.classList.add(classToAdd)
            }
        })

        // adding observer
        if (elementRef.value) {
            observer.observe(elementRef.value)
        }
    })
}

export function getDistance(point1: ITwoDCoords, point2: ITwoDCoords) {
    var x = point1.x - point2.x;
    var y = point1.y - point2.y;

    return Math.sqrt(x*x + y*y);
}

export function loopThroughEnums<T extends { [key: string]: string | number }>(
  enumType: T,
  callback: (value: T[keyof T] & number) => void
): void {
  const values = Object.values(enumType).filter(v => typeof v === "number") as (T[keyof T] & number)[];
  for (const value of values) {
    callback(value);
  }
}