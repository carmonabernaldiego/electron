//REFERENCIAS HTML
const article = document.querySelector('#contenido')
const inputBuscar = document.querySelector('#inputBuscar');

const series = [
    {
        h3: "Marvel's Inhumans",
        img: 'assets/img/inhumans.jpg',
        span: 'Marvel',
        p: 'Black Bolt es el rey de Attilan y su voz es tan poderosa que un simple susurro podría devastar una ciudad. Sin embargo, un golpe de estado lo obliga a escapar a Hawái con su esposa, su hermano y rival, sus primos y su cuñada.',
    },
    {
        h3: 'Moon Knight',
        img: 'assets/img/moonknight.jpg',
        span: 'Marvel',
        p: 'La serie sigue a Steven Grant (Oscar Isaac), un empleado de una tienda de regalos que padece de afecciones en la memoria, quedándose en blanco o trayéndole recuerdos de otra vida. Steven descubre que tiene un trastorno de identidad disociativo, y que comparte cuerpo con el mercenario Marc Spector.',
    },
    {
        h3: 'What If...?',
        img: 'assets/img/whatif.webp',
        span: 'Marvel',
        p: 'What If...? le da un gran giro al UCM al reimaginar eventos famosos de las películas de formas inesperadas. La primera serie animada de Marvel Studios se centra en diferentes héroes del UCM, con un elenco de voces que incluye a varias estrellas retomando sus papeles.',
    },
    {
        h3: 'Malcolm in the Middle',
        img: 'assets/img/malcolm.jpg',
        span: 'Comedia',
        p: 'Este chico es un joven adolescente superdotado que intenta sobrevivir en una torpe familia disfuncional. Malcolm tendrá que hacer frente a sus problemas en la escuela y a las batallas organizadas por sus hermanos en casa; en un continuo y confuso debate entre la niñez y la adolescencia.',
    },
    {
        h3: 'Gotham',
        img: 'assets/img/gotham.webp',
        span: 'Drama',
        p: 'El detective James Gordon se desenvuelve por el mundo peligrosamente corrupto de Gotham City, mientras que un joven Bruce Wayne encuentra su camino para convertirse en un héroe.',
    },
    {
        h3: 'The Flash',
        img: 'assets/img/flash.jpg',
        span: 'Accion',
        p: "Nueve meses después de que el laboratorio S.T.A.R. explotara, Barry despierta del coma y descubre que tiene el poder de la súper velocidad. Con la ayuda de su nuevo equipo, Barry, denominado ahora `Flash'luchará contra el crimen en Ciudad Central.",
    },
    {
        h3: 'Peaky Blinders',
        img: 'assets/img/peaky.jpg',
        span: 'Accion',
        p: 'Gran Bretaña vive la posguerra. Los soldados regresan, se acuñan nuevas revoluciones y nacen bandas criminales en una nación agitada. En Birmingham, una pandilla de gánsters callejeros asciende hasta convertirse en los reyes de la clase obrera.',
    },
    {
        h3: 'Better Call Saul',
        img: 'assets/img/bettercallsaul.jpg',
        span: 'Comedia',
        p: 'La serie narra los acontecimientos que llevan a McGuill a convertirse en Saul antes de trabajar con Walter White (Bryan Cranston), más conocido como Heisenberg, el narcotraficante más temido de Nuevo México.',
    },
    {
        h3: 'Hawkeye',
        img: 'assets/img/hawkeye.jpg',
        span: 'Marvel',
        p: 'Ojo de Halcón es una serie de Marvel que se centra en la historia del superhéroe Clint Barton que se encuentra en Nueva York junto a sus hijos tras los acontecimientos de Vengadores: Endgame, justo después del trágico Lapso.',
    },
    {
        h3: 'Love, Death & Robots',
        img: 'assets/img/lovedeathrobots.jpg',
        span: 'Comedia',
        p: 'Una mujer llamada Sonnie controla remotamente a un monstruo genéticamente diseñado para batallas clandestinas de gladiadores. Un hombre rico le ofrece mucho dinero para perder, pero ella se niega. Después de que ella gana el combate, él regresa para hacerla pagar, solo para descubrir que él tiene las cosas complicadas.',
    }
];

const ingresarSeries = () => {
    article.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        let texto =
            `
        <div class="pelicula">
            <h3>${series[i].h3}</h3>
            <img src="${series[i].img}">
            <span>${series[i].span}</span>
            <p>${series[i].p}</p>                   
        </div>
        `;
        article.innerHTML += texto;
    }
}

ingresarSeries(); //AQUI ESTA LLAMADA DE FORMA INDIVIDUAL, SE TIENE QUE INICIALIZAR AL CARGAR LA PAGINA

const filtrarCategoria = (categoria) => {
    article.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        let texto = '';
        if (series[i].span === categoria) {
            let texto =
                `
            <div class="pelicula">
                <h3>${series[i].h3}</h3>
                <img src="${series[i].img}">
                <span>${series[i].span}</span>
                <p>${series[i].p}</p>                   
            </div>
            `;
            article.innerHTML += texto;
        }
    }
}

const buscarSeries = () => {
    let textoBuscar = inputBuscar.value;
    article.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        let texto = '';
        if (series[i].h3.toLowerCase().search(textoBuscar.toLowerCase()) != -1) {
            let texto =
                `
            <div class="pelicula">
                <h3>${series[i].h3}</h3>
                <img src="${series[i].img}">
                <span>${series[i].span}</span>
                <p>${series[i].p}</p>                   
            </div>
            `;
            article.innerHTML += texto;
        }
    }
}

inputBuscar.addEventListener('change', (event) => {
    buscarSeries();
});