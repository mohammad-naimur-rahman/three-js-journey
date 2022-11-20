// Any thing that is inherited from Object3D (Like camera and mesh) have this 4 properties to trasnform objects
// 1. Position
// 2. Scale
// 3. Rotation
// 4. Quaternion

import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group()
scene.add(group)

group.position.y = 2

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
group.add(cube1)

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
cube2.position.x = 1.5
group.add(cube2)

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }))
cube3.position.x = -1.5
group.add(cube3)

////////////////////// Single Box/////////////////////
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

// // Positioning
// // mesh.position.x = 1 // initially left and right
// // mesh.position.y = -2 // initially top and bottom
// // mesh.position.z = -1 // initially forward and backword

// mesh.position.set(1, -2, -1)

// // Scale
// mesh.scale.x = 3

// // Rotate (Rotation is under euler method, not vector#)
// // It works a bit differently, let's say we are rotating the mesh in x axis, imagine a stick is put through your mesh in the x axis then rotate..
// // mesh.rotation.x = -0.5
// // mesh.rotation.y = 1
// // mesh.rotation.z = 0.2

// // Rotation reorder
// // mesh.rotation.reorder('YZX')

// mesh.rotation.x = 1
// mesh.rotation.y = 1
// mesh.rotation.z = 0.4

// scene.add(mesh)

// // vector3 method
// console.log(mesh.position.length())

// mesh.position.normalize()
////////////////////// Single Box/////////////////////

// Axes helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4

//console.log(mesh.position.distanceTo(camera.position))
scene.add(camera)

//camera.lookAt(new THREE.Vector3(3, 0, 0))
//camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
