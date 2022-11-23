import './style.css'
import * as THREE from 'three'
import { OrbitControl, OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
}
window.addEventListener('mousemove', function (e) {
  cursor.x = e.clientX / sizes.width - 0.5
  cursor.y = e.clientY / sizes.height - 0.5

  console.log(cursor)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 5, 5, 5), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
scene.add(mesh)

// Perspective Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000) // (FOV, width/height, near, far)

// Orthographic Camera
//const aspectRatio = sizes.width / sizes.height
//const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 1, 1000) // (left, right, top, bottom, near, far) not recommended camera

//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//controls.target.y = 1
//controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  //mesh.rotation.y = elapsedTime

  // Update camera
  //camera.position.x = cursor.x * 3
  //camera.position.y = -(cursor.y * 3)
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * Math.PI
  //   camera.position.y = Math.sin(cursor.y * Math.PI * 2) * Math.PI
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * Math.PI
  //   camera.lookAt(mesh.position)

  // Update Controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
