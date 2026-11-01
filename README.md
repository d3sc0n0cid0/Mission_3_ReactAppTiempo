# Mission_3_ReactAppTiempo
## Descripción
    Se trata de una página web que es capaz de dar el tiempo de las 70 localidades más importantes de España, pero esta vez en React

## Uso de IA
He usado la IA de gemini

1.  En día, tuve que pedir ayuda debido a que usando lo que sabía y usé para la mission anterior
no funcionaba. Estuvimos viendo que podría estar mal y finalmente y me acabó dando la solución de en vez de cambiar el día, lo actualizase por los milisegundos donde si funcionó.
Al parecer el React no siempre se entera de cuando cambia una fecha

2. Pregunté si para la API tenía que re hacer un jsx, pero me dijo que podía usar los js que tenía del trabajo anterior tanto para storage cómo para la api de la AEMET, aunque luego le tuve que añadir lo del abortion

## Autopsia
Las 2 decisiones más discutibles de tu código y qué alternativa descartaste en cada una.

1. Comencé a hacer el código pasando las variables, pero tras hacer unas cuantas cosas me dí cuenta de que estaba haciendo Prop Drilling, así que me tocó mirar como usar el useContext e implementarlo en mi código, tarde un rato. Pero avlió completamente la pena

2. Investigué más sobre los datos de la AEMET, entonces al parecer el número que me dan con la descripción de la imagen sirve para sacar una imagen de una web y lo implementé. Porque así no tenía que descargar una imagen por cada tipo de clima si no que podía usar la web. Que era uno de los problemas que tuve en la anterior misión
