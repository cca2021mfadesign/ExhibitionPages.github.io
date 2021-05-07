// let names = ["Keyu Mao", "Sarah Bonnickson", "Abigayle Cosinuke", "Tingyu Zhao", "Kaiwen Liu", "Fuming Zhou", "Yashan Deng", "Qianshi Zheng", "Jason Malik", "Mengwen Yu", "Eryn Bathke", "Tiaoli Li", "Haojie Chai", "Xiaohan Hannah Liao", "Hancai Wang", "Wen Liu", "Ashlyn Jackson", "Chloe Looker", "Troy Taylor", 
// "Tin Dinh", "Shang-Te Chen", "Meg Quarton", "Dom Granato", "Danielle Kim", "Rebecca Gardea"];


let data;
let videolinks;
let cnv;
let circlesDiv = [];
let namesdiv = [];
let namea;
let circles;
let changesColors = false;
let hoverNames;
let idstring;
let particleIsStop = false;
let currentSpeedx,currentSpeedy;
let refParticles =[];
let refDiv= [];
let reflink;
let diameter;
let angle = 0;
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor() {
    this.x = random(30, width - 130);
    this.y = random(30, height - 130);
    this.r = 5;
    this.xSpeed = random(-1.5, 1.5);
    this.ySpeed = random(-1.5, 1.5);
  }

  // creation of a particle.
  createParticle(name, colors) {
    noStroke();
    // let c= color(colors);
  fill(colors);
    //text(name, this.x, this.y, 200, 30);

 // circle(this.x, this.y, this.r);
  }

  // setting the particle in motion.
  moveParticle() {
    if (this.x < width / 10 || this.x > width*0.8)
      this.xSpeed *= -1;
    if (this.y < height / 10 || this.y > height * 1.5)
      this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
    stopParticle() {
    this.x = mouseX;
    this.y = mouseY;
    this.xSpeed += 0;
    this.ySpeed += 0;
  }

  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
  joinParticles(particles) {
    particles.forEach(element => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < 150) {
        stroke('#ffff00');
        strokeWeight(0.5);
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}


// an array to add multiple particles
let particles = [];

function preload() {
  myFont = loadFont('TINY5x3-140.otf');
  data = loadTable('name-colors.csv', 'csv', 'header')
  videolinks = loadTable('articles.csv','csv', 'header');
}

function setup() {
  //cnv = createCanvas(windowWidth*0.9, windowHeight/2);
  let bkcontainer = document.getElementById('background-container');
 diameter = 50;
  cnv = createCanvas(bkcontainer.offsetWidth, windowHeight * 0.7);
  cnv.parent(bkcontainer);
 // cnv.style("z-index: 10");
  cnv.position(0,0,);
  for(let i=0; i<videolinks.getRowCount();i++){
refParticles.push(new Particle());
reflink = createElement('a');
reflink.style('background-color', '#ffff00');
refDiv.push(reflink);
}

  for (let i = 0; i < data.getRowCount(); i++) {
    particles.push(new Particle());

      namea = createElement('a');
    circles=createElement('a');
      namea.style('color', '#fff');
      circles.style('background-color','#fff');
    namesdiv.push(namea);
    circlesDiv.push(circles);
  }
  for (let n = 0; n < namesdiv.length; n++) {
    namesdiv[n].id(str(data.getColumn('names')[n]));
    circlesDiv[n].id(concat(str(data.getColumn('names')[n]), str(n)));
// document.getElementById(str(data.getColumn('names')[n])).innerText = str(data.getColumn('names')[n]);
 document.getElementById(concat(str(data.getColumn('names')[n]), str(n))).href= data.getColumn('websites')[n];

  }
 
  console.log("namesdiv#" + namesdiv.length);
  rectMode(CENTER);
  textFont(myFont);


  //console.log(names.length);
 // let pdiv = document.getElementById('page_middle');
  //cnv.parent(pdiv);
}

function draw() {
 // background('#0f0f0f');
 //background('rgba(255,255,255, 0.001)');
 clear();
let d2 = 10 + (sin(angle + PI / 2) * diameter) / 2 + diameter / 2;
//  background(100);
  //  background(100);
  for(let i= 0; i<refParticles.length; i++){
    let c= color(255,255,255);
refDiv[i].id (concat("video", str(i)));
refDiv[i].position(refParticles[i].x + 150, refParticles[i].y + 175);
document.getElementById(concat("video", str(i))).style.width = str(concat(str(d2), 'px'));
document.getElementById(concat("video", str(i))).style.height = str(concat(str(d2), 'px'));
document.getElementById(concat("video", str(i))).style.borderRadius = '50%';
document.getElementById(concat("video", str(i))).href=videolinks.getColumn('articles')[i];
document.getElementById(concat("video", str(i))).style.border = '1px solid';
document.getElementById(concat("video", str(i))).style.borderColor = '#fff000';
document.getElementById(concat("video", str(i))).style.boxShadow = '0 0 10px #ffff00';


 document.getElementById(concat("video", str(i))).onmouseover = function() {
      //circlesDiv[i].style('background-color', c);
       refParticles[i].xSpeed *= 0;
       refParticles[i].ySpeed *= 0;
  
    };
    

    document.getElementById(concat(str(data.getColumn('names')[i]), str(i))).onmouseout = function() {

    refParticles[i].ySpeed +=random(-1.5,1.5);
    refParticles[i].moveParticle(particles[i]);
    refParticles[i].joinParticles(particles.slice(i));
    };


refParticles[i].createParticle(videolinks.getColumn('')[i],c );
refParticles[i].moveParticle();
refParticles[i].joinParticles(particles.slice(i));


}

angle += 0.02;
  for (let i = 0; i < particles.length; i++) {

    // fill(c);
    let c = color(str(data.getColumn('colors')[i]));
//     particles[i].createParticle(data.getColumn('names')[i], c);
//      particles[i].moveParticle(particles[i]);
//     particles[i].joinParticles(particles.slice(i));
//     let currentSpeedx =  particles[i].xSpeed;
// let currentSpeedy =  particles[i].ySpeed;


//     //  namesdiv[i].style('color','#fff');

//     circlesDiv[i].addClass('circles');
//     circlesDiv[i].position(particles[i].x - 10, particles[i].y)
//     circlesDiv[i].style('background-color', c);
//     namesdiv[i].position(particles[i].x, particles[i].y - 20);

       document.getElementById(concat(str(data.getColumn('names')[i]), str(i))).onmouseover = function() {
        document.getElementById(concat(str(data.getColumn('names')[i]), str(i))).style.backgroundColor = c;
          document.getElementById(concat(str(data.getColumn('names')[i]), str(i))).style.border = '5px solid';
            document.getElementById(concat(str(data.getColumn('names')[i]), str(i))).style.borderColor = c;
           document.getElementById(concat(str(data.getColumn('names')[i]), str(i))).style.boxShadow = '0 0 10px #ffff00';
      //circlesDiv[i].style('background-color', c);
       particles[i].xSpeed *= 0;
       particles[i].ySpeed *= 0;
  
    };
    

    document.getElementById(concat(str(data.getColumn('names')[i]), str(i))).onmouseout = function() {
   document.getElementById(concat(str(data.getColumn('names')[i]), str(i))).style.backgroundColor = '#fff';
      document.getElementById(concat(str(data.getColumn('names')[i]), str(i))).style.borderStyle = 'none';
                 document.getElementById(concat(str(data.getColumn('names')[i]), str(i))).style.boxShadow = 'none';
    particles[i].ySpeed +=random(-1.5,1.5);
    particles[i].moveParticle(particles[i]);
    particles[i].joinParticles(particles.slice(i));
    };
    

    particles[i].createParticle(data.getColumn('names')[i], c);

    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));


    //  namesdiv[i].style('color','#fff');

    circlesDiv[i].addClass('circles');
    circlesDiv[i].position(particles[i].x + 150, particles[i].y + 175);

  // namesdiv[i].position(particles[i].x, particles[i].y - 20);
  }


 
}
function changeColors(){
  for(let i=0; i<namesdiv[i].length; i++){
  let c = color(str(data.getColumn('colors')[i]));
    namesdiv[i].style('color',c)
  }
}
function windowResized() {
   let bkcontainer = document.getElementById('background-container');
  cnv = resizeCanvas(width,height);
}