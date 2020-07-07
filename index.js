import * as THREE from 'three';
import { TeapotBufferGeometry } from './TeapotBufferGeometry';

const getGuiValues = () => {
  const radInput = document.querySelector('#cameraRadiusInput');
  const rotInput = document.querySelector('#cameraRotationInput');

  return { radius: parseFloat(radInput.value), rotation: parseFloat(rotInput.value) };
};

const getCylinder = () => {
  const g = new THREE.CylinderGeometry(8, 8, 16, 30);
  const m = new THREE.MeshBasicMaterial({ color: 'yellow' });
  return new THREE.Mesh(g, m);
};

const getIcosahedron = () => {
  const g = new THREE.IcosahedronGeometry(15, 0);
  const m = new THREE.MeshBasicMaterial({
    wireframe: true,
    wireframeLinejoin: 'butt',
    wireframeLinewidth: 5,
    color: 0xffffff,
  });
  return new THREE.Mesh(g, m);
};

const getTeapot = () => {
  const g = new TeapotBufferGeometry(10);
  const m = new THREE.MeshBasicMaterial({ color: 'pink' });
  return new THREE.Mesh(g, m);
};

const getRotationPositionX = (
  targetPosition,
  radius,
  speed,
  timeElapsed,
) => targetPosition + radius * Math.cos(speed * timeElapsed);


const getRotationPositionY = (
  targetPosition,
  radius,
  speed,
  timeElapsed,
) => targetPosition + radius * Math.sin(speed * timeElapsed);


const main = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    300,
  );

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const cylinder = getCylinder();
  const icosahedron = getIcosahedron();
  const teapot = getTeapot();

  icosahedron.position.z = 30;

  scene.add(teapot);
  scene.add(cylinder);
  scene.add(icosahedron);

  const cylinderRadius = 25;
  const teapotRadius = 50;
  const sceneColor = 0x000000;

  camera.position.y = 20;

  scene.fog = new THREE.Fog(sceneColor, 8, 110);
  scene.background = new THREE.Color(sceneColor);

  const animate = (time) => {
    requestAnimationFrame(animate);

    const { radius, rotation } = getGuiValues();

    teapot.position.x = getRotationPositionX(icosahedron.position.x, teapotRadius, -0.0009, time);
    teapot.position.z = getRotationPositionY(icosahedron.position.z, teapotRadius, -0.0009, time);

    teapot.rotation.y += 0.04;

    cylinder.position.x = getRotationPositionX(icosahedron.position.x, cylinderRadius, 0.001, time);
    cylinder.position.z = getRotationPositionY(icosahedron.position.z, cylinderRadius, 0.001, time);

    cylinder.rotation.x += 0.03;
    cylinder.rotation.z += 0.03;

    camera.position.x = getRotationPositionX(icosahedron.position.x, radius, rotation, time);
    camera.position.z = getRotationPositionY(icosahedron.position.z, radius, rotation, time);
    camera.lookAt(icosahedron.position);

    renderer.render(scene, camera);
  };

  animate();
};

main();
