const listDev = [
    {
        'login': 'fabio',
        'password': '123',
        name: 'Fabio',
        age: 25
    },
    {
        'login': 'layla',
        'password': '123',
        name: 'Layla',
        age: 26
    },
    {
        'login': 'julia',
        'password': '123',
        name: 'julia',
        age: 28
    }
];

const older = listDev.filter(u => u.age > 25)

//console.log(older)

const found = listDev.find(u => u.name === 'Fabio')

//console.log(found)

//Iterando a lista e cada objeto tenha suas propriedades e alterar a propriedade nome
const newDevs = listDev.map(u => {
    return {...u , name: u.name.toUpperCase() }
})


//console.log(newDevs)

const listSalary = [
    1000,
    2000,
    3000,
    4000,
    5000
]

const newSalary = listSalary.map(s => 1.03 * s);



console.log(newSalary)

