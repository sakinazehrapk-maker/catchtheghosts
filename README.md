# Catch the ghosts 🎃

hi!! this is my halloween game for Ghost Ship by Hack Club. its made with p5.js and its a clicking game set in a spooky graveyard at night.

## what is it about

its midnight and ghosts are popping up all over the graveyard!! your job is to click them before they haunt everything. BUT there are also angry pumpkins hiding around and if you click those you lose points. so be careful!!

## how to play

1. open the game and click anywhere to start
2. you have **30 seconds**
3. click the **ghost** (the white one that fades in and out) to get **+1 point**
4. DONT click the **pumpkin** (the orange one with the mad face) or you get **-2 points**
5. the ghost and pumpkin jump to a new spot every second or so
6. the longer you play the faster they jump, so it gets really hard at the end (the timer turns red when theres 5 seconds left)
7. when time runs out you see your score and your best score. click to try again!

tip: dont panic click. the pumpkin spawns close to the ghost sometimes and it will get you 😭

## how i made it

i followed the Ghost Ship guide and started with the ghost hunt game from there. here is what i did step by step:

- **setup and draw:** made a 480 x 360 canvas with a dark purple background like the guide said
- **drawing stuff:** used `ellipse()`, `rect()`, `triangle()` and `arc()` to draw everything. the ghost has a wavy bottom made from 3 triangles and the pumpkin is 3 ovals on top of each other with a triangle face
- **game states:** i used a variable called `state` that is either `'start'`, `'play'` or `'over'` so the game knows which screen to show
- **random jumping:** `random()` picks a new spot for the ghost and pumpkin
- **clicking:** `mousePressed()` and `dist()` check if you clicked close enough to the ghost or the pumpkin
- **timer:** `millis()` counts how long the round has been going

### stuff i added myself (step 9)

-  **the pumpkin** that takes away points (it was annoying to make the eyes line up)
- **particle burst:** when you click something a bunch of little dots fly out and fade away. i keep them in an array and use `splice()` to remove them
- **gets harder over time:** i used `lerp()` to make the time between jumps go from 60 frames down to 25
- **fading ghost:** `sin()` and `map()` make the ghost go see-through and then solid again
- **shivering:** the ghost shakes a tiny bit every frame with `random()`
- **the scene:** moon with craters, stars, tombstones with RIP on them, a cross, and fog that floats side to side
- **font:** changed it to Georgia with `textFont()` because the normal one looked boring

## things that went wrong

- at first the pumpkin kept spawning right on top of the ghost so you couldnt click the ghost. i fixed it with a `while` loop that picks a new spot if its too close
- the score was going negative so now it stops at 0
- the fog was too bright and covered the tombstones so i made it way more see-through

## how to run it

**easy way:** open the link to the game and click

**p5.js editor way:**
1. go to [editor.p5js.org](https://editor.p5js.org/)
2. paste everything from `sketch.js` into the editor
3. press the play button


- made with [p5.js](https://p5js.org/)
- guide from [Ghost Ship](https://ghostship.hackclub.com/) by Hack Club
- happy halloween!! 🎃👻🦇
