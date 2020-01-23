const tech = [
    'ReactJs',
    "NestJs",
    'C puro raiz',
    'Java'
]

let result = [];

result = tech.filter(t => t.length > 5).map(t => t.toUpperCase())

console.log(result);