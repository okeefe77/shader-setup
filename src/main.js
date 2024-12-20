import vertexShader from '/src/shaders/vertex.glsl';
import fragmentShader from '/src/shaders/fragment.glsl';
import * as THREE from 'three';

const container = document.getElementById('container');
const camera = new THREE.Camera();
const scene = new THREE.Scene();
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer();
const uniforms = {};


const init = () => {
    camera.position.z = 1;
    const geometry = new THREE.PlaneGeometry(2, 2);

    uniforms.u_time = { type: 'f', value: 1.0 };
    uniforms.u_resolution = { type: 'v2', value: new THREE.Vector2() };
    uniforms.u_mouse = { type: 'v2', value: new THREE.Vector2() };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    resize();
    window.addEventListener('resize', resize, false);

    document.addEventListener('mousemove', e => {
        uniforms.u_mouse.value.x = e.pageX;
        uniforms.u_mouse.value.y = e.pageY;
    })
};

const resize = e => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
};

const animate = () => {
    requestAnimationFrame(animate);
    render();
};

const render = () => {
    uniforms.u_time.value += clock.getDelta();
    renderer.render(scene, camera);
}



init();
animate();
