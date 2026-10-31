let ghost;
let pumpkin;
let score = 0;
let best = 0;
let duration = 30;
let startTime;
let state = 'start';
let lastSpawn = 0;
let bits = []; // little particles
let stars = [];
let msg = '';
let msgTimer = 0;

function setup() {
  createCanvas(480, 360);
  textFont('Georgia');

  for (let i = 0; i < 30; i++) {
    stars.push({ x: random(width), y: random(200), s: random(1, 3) });
  }

  spawnGhost();
  spawnPumpkin();
}

function draw() {
  drawScene();

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255, 120, 20);
    textSize(40);
    text('GRAVEYARD BOO!', width / 2, 110);
    fill(255);
    textSize(15);
    text('Catch the ghosts before midnight ends!', width / 2, 165);
    text('But stay away from the angry pumpkins...', width / 2, 188);
    fill(200, 255, 210);
    textSize(22);
    text('Click to start', width / 2, 250);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(220, 30, 30);
    textSize(40);
    text('GAME OVER', width / 2, 100);
    fill(255);
    textSize(22);
    text('Score: ' + score, width / 2, 160);
    text('Best: ' + best, width / 2, 192);
    fill(200, 255, 210);
    textSize(18);
    text('Click to retry', width / 2, 250);
    return;
  }

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);

  if (timeLeft <= 0) {
    state = 'over';
    if (score > best) {
      best = score;
    }
    return;
  }

  let spawnEvery = lerp(60, 25, elapsed / duration);
  if (frameCount - lastSpawn >= spawnEvery) {
    spawnGhost();
    spawnPumpkin();
    lastSpawn = frameCount;
  }

  let shakeX = random(-2, 2);
  let shakeY = random(-2, 2);

  drawPumpkin(pumpkin.x, pumpkin.y);
  drawGhost(ghost.x + shakeX, ghost.y + shakeY);

  for (let i = bits.length - 1; i >= 0; i--) {
    let b = bits[i];
    b.x += b.vx;
    b.y += b.vy;
    b.life -= 8;
    noStroke();
    fill(b.r, b.g, b.b, b.life);
    ellipse(b.x, b.y, 6, 6);
    if (b.life <= 0) {
      bits.splice(i, 1);
    }
  }

  if (msgTimer > 0) {
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, msgTimer * 8);
    textSize(24);
    text(msg, width / 2, 60);
    msgTimer--;
  }

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  if (timeLeft <= 5) {
    fill(255, 60, 60); 
  }
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    bits = [];
    startTime = millis();
    lastSpawn = frameCount;
    spawnGhost();
    spawnPumpkin();
    return;
  }

  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 33) {
    score++;
    boom(ghost.x, ghost.y, 200, 255, 230);
    msg = 'BOO! +1';
    msgTimer = 25;
    spawnGhost();
    spawnPumpkin();
    lastSpawn = frameCount;
  }

  else if (dist(mouseX, mouseY, pumpkin.x, pumpkin.y) < 26) {
    score = score - 2;
    if (score < 0) {
      score = 0;
    }
    boom(pumpkin.x, pumpkin.y, 255, 120, 20);
    msg = 'OUCH! -2';
    msgTimer = 25;
    spawnPumpkin();
  }
}

function boom(x, y, r, g, b) {
  for (let i = 0; i < 15; i++) {
    bits.push({
      x: x,
      y: y,
      vx: random(-3, 3),
      vy: random(-3, 3),
      life: 255,
      r: r,
      g: g,
      b: b
    });
  }
}

function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(60, 280) };
}

function spawnPumpkin() {
  pumpkin = { x: random(40, width - 40), y: random(60, 280) };
  // dont let it spawn on top of the ghost
  while (dist(pumpkin.x, pumpkin.y, ghost.x, ghost.y) < 80) {
    pumpkin = { x: random(40, width - 40), y: random(60, 280) };
  }
}

function drawGhost(x, y) {
  noStroke();


  let a = map(sin(frameCount * 0.1), -1, 1, 150, 255);

  fill(220, 255, 230, a);
  ellipse(x, y, 60, 60);
  rect(x - 30, y, 60, 26);
 
  triangle(x - 30, y + 26, x - 20, y + 42, x - 10, y + 26);
  triangle(x - 10, y + 26, x, y + 42, x + 10, y + 26);
  triangle(x + 10, y + 26, x + 20, y + 42, x + 30, y + 26);

  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);

  ellipse(x, y + 12, 12, 16);
}

function drawPumpkin(x, y) {
  noStroke();
  
  fill(255, 120, 20);
  ellipse(x, y, 52, 44);
  fill(235, 100, 10);
  ellipse(x - 14, y, 22, 42);
  ellipse(x + 14, y, 22, 42);
  fill(255, 120, 20);
  ellipse(x, y, 24, 44);
  
  fill(40, 120, 40);
  rect(x - 3, y - 30, 7, 12);
  
  fill(30, 10, 0);
  triangle(x - 15, y - 10, x - 5, y - 10, x - 10, y - 2);
  triangle(x + 5, y - 10, x + 15, y - 10, x + 10, y - 2);
  triangle(x - 12, y + 6, x + 12, y + 6, x, y + 16);
  fill(255, 120, 20);
  triangle(x - 4, y + 6, x + 4, y + 6, x, y + 11);
}

function drawScene() {
  background(15, 10, 25);
  noStroke();

  
  fill(255);
  for (let i = 0; i < stars.length; i++) {
    ellipse(stars[i].x, stars[i].y, stars[i].s, stars[i].s);
  }


  fill(255, 240, 200);
  ellipse(400, 60, 60, 60);
  fill(235, 215, 170);
  ellipse(390, 52, 12, 12);
  ellipse(410, 70, 9, 9);
  ellipse(402, 48, 6, 6);


  fill(40, 30, 50);
  rect(0, 300, 480, 60);


  drawTomb(40, 270);
  drawTomb(150, 280);
  drawTomb(330, 272);
  drawTomb(430, 282);


  fill(80);
  rect(245, 262, 6, 40);
  rect(236, 272, 24, 6);


  fill(200, 200, 230, 25);
  ellipse(120 + sin(frameCount * 0.01) * 40, 315, 180, 30);
  ellipse(360 + cos(frameCount * 0.01) * 40, 330, 200, 30);
}

function drawTomb(x, y) {
  fill(90, 90, 105);
  rect(x, y, 34, 40);
  arc(x + 17, y, 34, 34, PI, TWO_PI);
  fill(60, 60, 75);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('RIP', x + 17, y + 10);
}
