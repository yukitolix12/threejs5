import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

//size
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    0.1,
    1000
);
camera.position.set(0, 3, 65);

//material
const material = new THREE.MeshStandardMaterial({
    color: "gray",
});

//plane
const planeGeometry = new THREE.PlaneGeometry(70, 70);

//mesh
const plane = new THREE.Mesh(planeGeometry, material);
scene.add(plane);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.append(renderer.domElement);

//Control
const control = new OrbitControls(camera, renderer.domElement);
control.enableDamping = true;

const clock = new THREE.Clock();

//animation
function animate() {
    const elapsedTime = clock.getElapsedTime();

    control.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}