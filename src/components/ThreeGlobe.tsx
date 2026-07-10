"use client"

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 15

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Base Group to contain all objects (makes mouse rotation easy)
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // 1. Dotted Globe (High-End Tech Look)
    const globeRadius = 3.5
    const globeGeometry = new THREE.BufferGeometry()
    const positions: number[] = []
    const dotCount = 800

    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotCount)
      const theta = Math.sqrt(dotCount * Math.PI) * phi

      const x = globeRadius * Math.sin(phi) * Math.cos(theta)
      const y = globeRadius * Math.sin(phi) * Math.sin(theta)
      const z = globeRadius * Math.cos(phi)

      positions.push(x, y, z)
    }

    globeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    
    // Glowing white points material
    const globeMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    })

    const globe = new THREE.Points(globeGeometry, globeMaterial)
    mainGroup.add(globe)

    // 2. Globe Wireframe Shell (subtle accent)
    const shellGeo = new THREE.SphereGeometry(globeRadius, 16, 16)
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.05
    })
    const shellMesh = new THREE.Mesh(shellGeo, shellMat)
    mainGroup.add(shellMesh)

    // 3. Floating Talent Nodes & Connection Lines
    const nodeGroup = new THREE.Group()
    mainGroup.add(nodeGroup)

    const nodes: THREE.Mesh[] = []
    const nodeCount = 18
    const nodeGeo = new THREE.SphereGeometry(0.06, 8, 8)
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9
    })

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15
    })

    for (let i = 0; i < nodeCount; i++) {
      // Random coordinates around the globe (outside radius)
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const dist = globeRadius + 0.8 + Math.random() * 0.8

      const x = dist * Math.sin(phi) * Math.cos(theta)
      const y = dist * Math.sin(phi) * Math.sin(theta)
      const z = dist * Math.cos(phi)

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat)
      nodeMesh.position.set(x, y, z)
      nodeGroup.add(nodeMesh)
      nodes.push(nodeMesh)

      // Connection lines from node back to a random point near globe
      const points = [
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x * 0.7, y * 0.7, z * 0.7)
      ]
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(lineGeo, lineMat)
      nodeGroup.add(line)
    }

    // 4. Ambient Orbiting Particle Field
    const particleCount = 200
    const particleGeometry = new THREE.BufferGeometry()
    const particlePos: number[] = []

    for (let i = 0; i < particleCount; i++) {
      const radius = globeRadius + 2 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      particlePos.push(x, y, z)
    }

    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePos, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    mainGroup.add(particles)

    // Interactive mouse movement tracking
    let targetX = 0
    let targetY = 0
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.0003
      targetY = (e.clientY - window.innerHeight / 2) * 0.0003
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation Loop
    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Rotate Globe & Nodes
      globe.rotation.y = elapsedTime * 0.05
      shellMesh.rotation.y = elapsedTime * 0.05
      nodeGroup.rotation.y = -elapsedTime * 0.04
      particles.rotation.y = elapsedTime * 0.02

      // Subtle float animation for talent nodes
      nodes.forEach((node, idx) => {
        node.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.002
      })

      // Interpolate main group rotation with mouse offset for smooth lag effect
      mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.05
      mainGroup.rotation.x += (targetY - mainGroup.rotation.x) * 0.05

      renderer.render(scene, camera)
    }

    animate()

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full absolute inset-0 z-0 pointer-events-none opacity-80"
    />
  )
}
