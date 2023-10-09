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
const Camera = new THREE.PerspectiveCamera(
    75,
    size.width / size.height,
    0.1,
    1000
);