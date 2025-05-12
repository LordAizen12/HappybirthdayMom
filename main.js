const container = document.getElementById('scene-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

camera.position.z = 50;

const particleCount = 2000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
  const radius = 20 + Math.random() * 30;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos((Math.random() * 2) - 1);
  positions[i] = radius * Math.sin(phi) * Math.cos(theta);
  positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
  positions[i + 2] = radius * Math.cos(phi);
  const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.5);
  colors[i] = color.r;
  colors[i + 1] = color.g;
  colors[i + 2] = color.b;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.5,
  vertexColors: true,
  transparent: true,
  opacity: 0.8
});

const particleSystem = new THREE.Points(particles, material);
scene.add(particleSystem);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 0, 20);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

let time = 0;
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;

  particleSystem.rotation.y += 0.002;
  particleSystem.rotation.x += 0.001;

  const positions = particleSystem.geometry.attributes.position.array;
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] += Math.sin(time + positions[i]) * 0.02;
    positions[i + 1] += Math.cos(time + positions[i + 1]) * 0.02;
    positions[i + 2] += Math.sin(time + positions[i + 2]) * 0.02;
  }
  particleSystem.geometry.attributes.position.needsUpdate = true;

  camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
  camera.position.y += (mouseY * 10 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();