import { type ShallowRef, onMounted } from "vue";
import type { TwoDCoords } from "./Hex";

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

export function getDistance(point1: TwoDCoords, point2: TwoDCoords) {
    var x = point1.x - point2.x;
    var y = point1.y - point2.y;

    return Math.sqrt(x*x + y*y);
}