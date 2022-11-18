import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75, 800 / 600)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.c') })
renderer.setSize(800, 600)
renderer.render(scene, camera)
