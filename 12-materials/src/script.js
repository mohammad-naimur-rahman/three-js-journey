import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// Loaders
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json', font => {
  const textGeometry = new THREE.TextBufferGeometry('Naimur Rahman', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
  })

  // Bounding
  // textGeometry.computeBoundingBox()
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  // )

  textGeometry.center()

  const material = new THREE.MeshMatcapMaterial({
    matcap: matchcapTexture1,
  })
  const text = new THREE.Mesh(textGeometry, material)
  scene.add(text)

  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)

  for (let i = 0; i <= 200; i++) {
    const donut = new THREE.Mesh(donutGeometry, material)

    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()

    donut.scale.set(scale, scale, scale)

    scene.add(donut)
  }
})

// Textures
const doorcolorTexture = textureLoader.load('/textures/door/color.jpg')
const dooralphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorheightTexture = textureLoader.load('/textures/door/height.jpg')
const doormetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorroughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doornormalTexture = textureLoader.load('/textures/door/normal.jpg')

const matchcapTexture1 = textureLoader.load('/textures/matcaps/3.png')

const gradientsTexture1 = textureLoader.load('/textures/gradients/5.jpg')

gradientsTexture1.minFilter = THREE.NearestFilter
gradientsTexture1.magFilter = THREE.NearestFilter
gradientsTexture1.generateMipmaps = false

// Environment map
const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
])

/**
 * Objects
 */
//const material = new THREE.MeshBasicMaterial()
// material.map = doorcolorTexture
// material.side = THREE.DoubleSide
//material.color = new THREE.Color(0xff0000)
//material.wireframe = true
//material.opacity = 0.5
// material.transparent = true
// material.alphaMap = dooralphaTexture

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matchcapTexture1

// const material = new THREE.MeshDepthMaterial()

//const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xff00ff)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientsTexture1

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
// material.map = doorcolorTexture
// material.aoMap = doorambientOcclusionTexture
// material.aoMapIntensity = 2
// material.displacementMap = doorheightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doormetalnessTexture
// material.roughnessMap = doormetalnessTexture
// material.normalMap = doornormalTexture
// material.normalScale.set(1, 1)
// material.alphaMap = dooralphaTexture
// material.transparent = true

material.envMap = environmentMapTexture

gui.add(material, 'metalness').min(0).max(1).step(0.05)
gui.add(material, 'roughness').min(0).max(1).step(0.05)
gui.add(material, 'aoMapIntensity').min(1).max(100).step(0.05)
gui.add(material, 'displacementScale').min(0).max(1).step(0.05)

const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 500, 500), material)

sphere.position.x = -1.5

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material)

const torus = new THREE.Mesh(new THREE.TorusBufferGeometry(0.5, 0.2, 16, 32), material)

torus.position.x = 1.5

// uv2
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

//scene.add(sphere, plane, torus)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = elapsedTime * 0.1
  plane.rotation.y = elapsedTime * 0.1
  torus.rotation.y = elapsedTime * 0.1

  sphere.rotation.x = elapsedTime * 0.15
  plane.rotation.x = elapsedTime * 0.15
  torus.rotation.x = elapsedTime * 0.15

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
