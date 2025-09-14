export function getProducts() {
    return [
        {
            id: 'remera-magic-3',
            name: 'Remera Magic Código 3',
            description: 'Remera de algodón con diseño exclusivo "Magic Código 3". Disponible en blanco, negro y azul.',
            category: 'Remeras',
            images: [
                './images/remeras/magic-3-negra.png',
                './images/remeras/magic-3-blanca.png',
                './images/remeras/magic-3-azul.png'
            ],
            variants: [
                {
                    sku: 'remera-magic-3-negro',
                    style: 'Magic',
                    color: 'Negro',
                    size: 'S',
                    price_gs: 120000,
                    stock: 5
                },
                {
                    sku: 'remera-magic-3-blanco',
                    style: 'Magic',
                    color: 'Blanco',
                    size: 'M',
                    price_gs: 120000,
                    stock: 8
                },
                {
                    sku: 'remera-magic-3-azul',
                    style: 'Magic',
                    color: 'Azul',
                    size: 'L',
                    price_gs: 120000,
                    stock: 3
                }
            ]
        },
        {
            id: 'remera-x',
            name: 'Remera X',
            description: 'Remera básica con estilo "X". Comodidad y versatilidad para el día a día. Colores: rojo, blanco y celeste.',
            category: 'Remeras',
            images: [
                './images/remeras/remera-x-roja.png',
                './images/remeras/remera-x-blanca.png',
                './images/remeras/remera-x-celeste.png'
            ],
            variants: [
                {
                    sku: 'remera-x-rojo',
                    style: 'X',
                    color: 'Rojo',
                    size: 'S',
                    price_gs: 110000,
                    stock: 4
                },
                {
                    sku: 'remera-x-blanco',
                    style: 'X',
                    color: 'Blanco',
                    size: 'M',
                    price_gs: 110000,
                    stock: 6
                },
                {
                    sku: 'remera-x-celeste',
                    style: 'X',
                    color: 'Celeste',
                    size: 'L',
                    price_gs: 110000,
                    stock: 2
                }
            ]
        },
        {
            id: 'gorra-con-m',
            name: 'Gorra con M',
            description: 'Gorra ajustable con el logo bordado "M". Un accesorio imprescindible. Disponible en rojo, blanco y azul.',
            category: 'Gorras',
            images: [
                './images/gorras/gorra-con-m-roja.png',
                './images/gorras/gorra-con-m-blanca.png',
                './images/gorras/gorra-con-m-azul.png'
            ],
            variants: [
                {
                    sku: 'gorra-con-m-roja-unica',
                    style: 'con M',
                    color: 'Rojo',
                    size: 'Única',
                    price_gs: 85000,
                    stock: 10
                },
                {
                    sku: 'gorra-con-m-blanca-unica',
                    style: 'con M',
                    color: 'Blanco',
                    size: 'Única',
                    price_gs: 85000,
                    stock: 7
                },
                {
                    sku: 'gorra-con-m-azul-unica',
                    style: 'con M',
                    color: 'Azul',
                    size: 'Única',
                    price_gs: 85000,
                    stock: 5
                }
            ]
        },
        {
            id: 'gafas-sol-pilot',
            name: 'Gafas de Sol Pilot',
            description: 'Clásicas gafas de sol estilo aviador, con protección UV400. Único color: negro.',
            category: 'Gafas',
            images: [
                './images/gafas/gafas-pilot-1.png',
                './images/gafas/gafas-pilot-2.png'
            ],
            variants: [
                {
                    sku: 'gafas-pilot-negro',
                    style: 'Pilot',
                    color: 'Negro',
                    size: 'Única',
                    price_gs: 150000,
                    stock: 7
                }
            ]
        },
        {
            id: 'sudadera-mally-blanca',
            name: 'Sudadera Mally Blanca',
            description: 'Sudadera moderna y abrigada con el logo MallyWear. Ideal para un estilo urbano y cómodo.',
            category: 'Sudaderas',
            images: [
                './images/sudaderas/sudadera-blanca-1.png',
                './images/sudaderas/sudadera-blanca-2.png'
            ],
            variants: [
                {
                    sku: 'sudadera-blanca-m',
                    style: 'MallyWear',
                    color: 'Blanco',
                    size: 'M',
                    price_gs: 250000,
                    stock: 4
                },
                {
                    sku: 'sudadera-blanca-l',
                    style: 'MallyWear',
                    color: 'Blanco',
                    size: 'L',
                    price_gs: 250000,
                    stock: 6
                }
            ]
        },
        {
            id: 'zapatillas-urbanas',
            name: 'Zapatillas Urbanas',
            description: 'Zapatillas de diseño moderno y suela cómoda, ideales para el uso diario.',
            category: 'Zapatillas',
            images: [
                './images/zapatillas/zapatillas-urbanas-1.png',
                './images/zapatillas/zapatillas-urbanas-2.png'
            ],
            variants: [
                {
                    sku: 'zapatillas-38',
                    color: 'Blanco/Negro',
                    size: '38',
                    price_gs: 320000,
                    stock: 3
                },
                {
                    sku: 'zapatillas-39',
                    color: 'Blanco/Negro',
                    size: '39',
                    price_gs: 320000,
                    stock: 5
                },
                {
                    sku: 'zapatillas-40',
                    color: 'Blanco/Negro',
                    size: '40',
                    price_gs: 320000,
                    stock: 2
                }
            ]
        }
    ];
}