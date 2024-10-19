import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.getElementById('canvas')

// 1. Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#000000')

// 2. Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5;

// 3. Object
const geometry = new THREE.BoxGeometry(1,1,2)
const material = new THREE.MeshLambertMaterial({color: '#468585',emissive: '#468585'})
const box = new THREE.Mesh(geometry, material)

scene.add(box)

// 4. Light
const light = new THREE.SpotLight(0xffffff, 100)
light.position.set(0,0,3)
scene.add(light)

// 5. Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
 

// 6. Orbit controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;  

// 7. Add animations
function animate() {
  requestAnimationFrame(animate);
  box.rotation.x += 0.001
  box.rotation.y += 0.001
  controls.update()
  renderer.render(scene, camera)
}

function handleResizeScreen() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// 8. handle window resize 
window.addEventListener('resize', handleResizeScreen)
animate()