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

//box
const boxGeometry = new THREE.BoxGeometry(7, 7, 7);

//mesh-plane
const plane = new THREE.Mesh(planeGeometry, material);
plane.rotation.x = -Math.PI * 0.5;
plane.receiveShadow = true;
scene.add(plane);

//mesh-box
const box = new THREE.Mesh(boxGeometry, material);
box.position.y = 3.5;
box.castShadow = true;
scene.add(box);

//pointLight
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 15, -5);
pointLight.castShadow = true;

console.log(pointLight.shadow);
//pointLight.shadow.radius= 10;

pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

pointLight.shadow.camera.near = 6;

scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 3);
scene.add(pointLightHelper);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

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

window.addEventListener("resize", () => {
    // Update sizes
    size.width = window.innerWidth;
    size.height = window.innerHeight;
  
    // Update camera
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  
    // Update renderer
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  animate();
  
