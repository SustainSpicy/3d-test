import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "lil-gui";
import { DoubleSide, Object3D } from "three";

/**
 * Debug
 */
const gui = new dat.GUI({ closed: true, width: 400 });
const parameters = {
  color: 0xd6d6d6,
};
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xeeeeee);

scene.fog = new THREE.Fog(0xeeeeee, 10, 50);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const matcapTexture = textureLoader.load("/textures/matcaps/2.png");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");
const anotherRoughTexture = textureLoader.load("/textures/roughness.png");
const anotherNormalTexture = textureLoader.load("/textures/normal.png");
const wornShinyMetalRoughness = textureLoader.load(
  "/textures/worm/wornShinyMetalRoughness.png"
);
const rustedironBasecolor = textureLoader.load(
  "/textures/rustediron/rustedironBasecolor.png"
);
const rustedironNormal = textureLoader.load(
  "/textures/rustediron/rustediron2_normal.png"
);

const rustedironRoughness = textureLoader.load(
  "/textures/rustediron/rustediron2_roughness.png"
);
const rustedironMetal = textureLoader.load(
  "/textures/rustediron/rustediron2_metallic.png"
);

const ornateBrassAlbedo = textureLoader.load(
  "/textures/ornatebrass/ornateBrassAlbedo.png"
);
const ornateBrassAlbedoNormal = textureLoader.load(
  "/textures/ornatebrass/ornate-brass_normal-ogl.png"
);
const ornateBrassAlbedoAo = textureLoader.load(
  "/textures/ornatebrass/ornate-brass_ao.png"
);
const ornateBrassAlbedoMetal = textureLoader.load(
  "/textures/ornatebrass/ornate-brass_metallic.png"
);
const ornateBrassAlbedoRoughness = textureLoader.load(
  "/textures/ornatebrass/ornate-brass_roughness.png"
);

const fancyBrass = textureLoader.load(
  "/textures/fancybrass/fancy-brass-pattern1_albedo.png"
);
const fancyBrassNormal = textureLoader.load(
  "/textures/fancybrass/fancy-brass-pattern1_normal-ogl.png"
);
const fancyBrassAo = textureLoader.load(
  "/textures/fancybrass/fancy-brass-pattern1_ao.png"
);
const fancyBrassMetal = textureLoader.load(
  "/textures/fancybrass/fancy-brass-pattern1_metallic.png"
);
const fancyBrassRoughness = textureLoader.load(
  "/textures/fancybrass/fancy-brass-pattern1_roughness.png"
);

const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/1/px.jpg",
  "/textures/environmentMaps/1/nx.jpg",
  "/textures/environmentMaps/1/py.jpg",
  "/textures/environmentMaps/1/ny.jpg",
  "/textures/environmentMaps/1/pz.jpg",
  "/textures/environmentMaps/1/nz.jpg",
]);

const myObject = {
  myBoolean: true,
  myFunction: function () {},
  myString: "lil-gui",
  myNumber: 1,
};
const myObject1 = {
  myBoolean: false,
  myFunction: function () {
    material.map = rustedironBasecolor;
    material.aoMap = "";
    material.roughnessMap = rustedironRoughness;
    // material.metalnessMap = rustedironMetal;
    material.normalMap = rustedironNormal;
  },
  myString: "lil-gui",
  myNumber: 1,
};
const myObject2 = {
  myBoolean: false,
  myFunction: function () {
    material.map = ornateBrassAlbedo;
    material.aoMap = ornateBrassAlbedoAo;
    material.roughnessMap = ornateBrassAlbedoRoughness;
    // material.metalnessMap = ornateBrassAlbedoMetal;
    material.normalMap = ornateBrassAlbedoNormal;
  },
  myString: "lil-gui",
  myNumber: 1,
};
const myObject3 = {
  myBoolean: false,
  myFunction: function () {
    material.map = fancyBrass;
    material.aoMap = fancyBrassAo;
    // material.metalnessMap = fancyBrassMetal;
    material.roughnessMap = fancyBrassRoughness;
    material.normalMap = fancyBrassNormal;
  },
  myString: "lil-gui",
  myNumber: 1,
};
const material = new THREE.MeshStandardMaterial({ color: parameters.color });
console.log(material);
material.metalness = 0.9988;

material.roughness = -3.881;
material.side = DoubleSide;
material.envMap = environmentMapTexture;
material.map = rustedironBasecolor;
material.aoMap = "";
material.roughnessMap = rustedironRoughness;
// material.metalnessMap = rustedironMetal;
material.normalMap = rustedironNormal;

// material.matcap = anotherNormalTexture;

gui
  .add(material.normalScale, "y")
  .min(-100)
  .max(100)
  .step(0.01)
  .name("normalScaley");
gui
  .add(material.normalScale, "x")
  .min(-100)
  .max(100)
  .step(0.01)
  .name("normalScalex");
gui.add(material, "wireframe");

gui
  .add(myObject, "myBoolean")
  .name("Environmental map")
  .onChange((value) => {
    if (value) {
      material.envMap = environmentMapTexture;
    } else {
      material.envMap = "";
    }
  });
gui
  .add(myObject, "myBoolean")
  .name("Transparent")
  .onChange((value) => {
    if (value) {
      material.alphaMap = ornateBrassAlbedo;
      material.transparent = true;
    } else {
      material.alphaMap = "";
      material.transparent = false;
    }
  });
gui.add(material, "metalness").min(0.9877).max(1).step(0.0001);
gui.add(material, "roughness").min(-5).max(0.3604).step(0.0001);

gui.add(myObject1, "myFunction").name("Rustediron");

gui.add(myObject2, "myFunction").name("OrnateBrass");
gui.add(myObject3, "myFunction").name("FancyBrass");

material.shininess = 1000;
// material.specular = new THREE.Color(0x1188ff);

// material.displacementScale = 0.05;
//

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#444444",
    metalness: 0,
    roughness: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = -1;
// scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 1;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 15, 5);
// scene.add(directionalLight);

/**
 * Models
 */
const gltfLoader = new GLTFLoader();
// gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
//   scene.add(gltf.scene);
// });
let logoMesh = new THREE.Object3D();
gltfLoader.load("/models/setup01.glb", async (gltf) => {
  logoMesh = gltf.scene.children[6];
  //   console.log(gltf);
  logoMesh.getObjectByName("test_03").material = material;

  //   new THREE.BufferAttribute(logoMesh.geometry.attributes.uv.array, 10);

  //   logoMesh.position.x = 1;

  //   gltf.scene.scale.set(0.025, 0.025, 0.025);
  //   gltf.scene.rotation.y += 20;

  scene.add(gltf.scene);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(2, 2, 8);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  //   logoMesh.rotation.y = 0.1 * elapsedTime;
  //   logoMesh.rotation.y = (elapsedTime * Math.PI) / 142;
  camera.lookAt(logoMesh);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
