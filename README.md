# TresEnRaya

## Datos del estudiante

- **Nombre:** Cesar Adrian Aybar Montes De Oca
- **Matrícula:** 100692670
- **Asignatura:** Lenguaje de Programacion III

## Descripción del juego

TresEnRaya es una versión del clásico juego de tres en raya para dos jugadores. Cada jugador utiliza un símbolo diferente y juega por turnos hasta conseguir tres símbolos consecutivos en el tablero, ya sea de forma horizontal, vertical o diagonal. Si se llenan todas las casillas sin conseguir una combinación ganadora, el juego termina en empate.

La aplicación también permite registrar los nombres de los jugadores, conservar el estado de la partida en el navegador, reiniciar el juego y mostrar el resultado de cada partida.

## Frameworks y tecnologías utilizadas

- **React:** framework utilizado para construir la interfaz mediante componentes reutilizables y manejar el estado de la partida.
- **Vite:** herramienta de desarrollo y compilación utilizada para ejecutar el proyecto y generar la versión optimizada para producción.
- **JavaScript:** lenguaje utilizado para implementar la lógica del juego.
- **CSS:** utilizado para diseñar y dar estilo a la interfaz.
- **canvas-confetti:** biblioteca utilizada para mostrar una animación de confeti cuando un jugador gana.

## Requisitos

Para ejecutar el proyecto se necesita:

- **Node.js**, preferiblemente la versión 18 o superior.
- **npm**, incluido normalmente con Node.js.
- Un navegador web moderno, como Chrome, Edge o Firefox.
- Git, si se desea clonar el repositorio desde GitHub.

## Ejecución local

1. Clona el repositorio y entra en su carpeta:

   ```bash
   git clone https://github.com/XxNatsuENDxX/TresEnRaya.git
   cd TresEnRaya
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre en el navegador la dirección mostrada por Vite, normalmente:

   <http://localhost:5173>

Para generar una versión de producción, ejecuta:

```bash
npm run build
```

Para previsualizar esa versión localmente:

```bash
npm run preview
```

## Qué aprendí

Aprendí a manejar React y a desarrollar una aplicación utilizando sus componentes, estado y efectos. Era algo que quería hacer desde hace tiempo, y este proyecto me permitió dar un paso importante en ese aprendizaje. También aprendí a organizar mejor la lógica del juego y a separar la interfaz en diferentes componentes reutilizables.

Vamos por más.

## Parte más difícil

La parte más difícil fue entender la componentización de los elementos con React. Al principio fue un reto decidir cómo dividir la aplicación en componentes y cómo compartir entre ellos la información necesaria, como el tablero, los jugadores, los turnos y el ganador.

Con la práctica pude comprender mejor cómo cada componente puede encargarse de una parte específica de la interfaz, haciendo que el código sea más organizado, fácil de mantener y reutilizable.
